import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { PrismaClient } from '../db/client';
import { PrismaClient as UserPrismaClient } from '../../user/db/client';
import { RegisterDtoType, LoginDtoType } from '../dto/auth.dto';
import { config } from '../../../shared/config';
import { eventBus, CoreEvents } from '../../../shared/events';
import { redisClient } from '../../../shared/redis';
import { RateLimitKeys } from '../../email/constants/email.constants';

const globalForPrismaAuth = global as unknown as { prismaAuth: PrismaClient };
const prisma = globalForPrismaAuth.prismaAuth || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrismaAuth.prismaAuth = prisma;
const globalForUserPrisma = global as unknown as { userPrismaAuth: UserPrismaClient };
const userPrisma = globalForUserPrisma.userPrismaAuth || new UserPrismaClient();
if (process.env.NODE_ENV !== 'production') globalForUserPrisma.userPrismaAuth = userPrisma;

/**
 * Helper: Generate a cryptographically secure random token
 */
function generateSecureToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Helper: Hash a token using SHA-256 (for storage — never store raw tokens)
 */
function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Helper: Generate a 6-digit OTP
 */
function generateOtp(): string {
  return crypto.randomInt(100000, 999999).toString();
}

/**
 * Helper: Get user name from profile (best-effort)
 */
async function getUserName(userId: string): Promise<string> {
  try {
    const profile = await userPrisma.profile.findUnique({ where: { userId } });
    return profile?.firstName || 'there';
  } catch {
    return 'there';
  }
}

export class AuthService {
  static async register(data: RegisterDtoType) {
    const existingUser = await prisma.authUser.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw { statusCode: 400, message: 'Email already in use' };
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = await prisma.authUser.create({
      data: {
        email: data.email,
        passwordHash,
      },
    });

    // Publish event for other modules (like User module) to create profile
    await eventBus.publish(CoreEvents.USER_REGISTERED, {
      userId: user.id,
      email: user.email,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    // Trigger email verification via OTP
    await AuthService.requestOtp(user.id, 'EMAIL_VERIFICATION');

    return {
      id: user.id,
      email: user.email,
    };
  }

  static async login(data: LoginDtoType) {
    const user = await prisma.authUser.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw { statusCode: 401, message: 'Invalid credentials' };
    }

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
      throw { statusCode: 401, message: 'Invalid credentials' };
    }

    // Fetch profile for name fields (may not exist yet immediately after register)
    let profile: any = null;
    try {
      profile = await userPrisma.profile.findUnique({
        where: { userId: user.id },
      });
    } catch {
      // Profile might not exist yet if event hasn't propagated
    }

    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        role: user.role,
        organizationId: profile?.organizationId || undefined 
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn as any }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: profile?.firstName || '',
        lastName: profile?.lastName || '',
        username: profile?.username || undefined,
        avatar: profile?.avatar || undefined,
        bio: profile?.bio || undefined,
        location: profile?.location || undefined,
        college: profile?.college || undefined,
        branch: profile?.branch || undefined,
        year: profile?.year || undefined,
        onboardingCompleted: profile?.onboardingCompleted || false,
        role: user.role,
        emailVerified: user.emailVerified,
      },
    };
  }

  static async getMe(userId: string) {
    const user = await prisma.authUser.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }

    let profile: any = null;
    try {
      profile = await userPrisma.profile.findUnique({
        where: { userId },
      });
    } catch {
      // Profile might not exist
    }

    return {
      id: user.id,
      email: user.email,
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      username: profile?.username || undefined,
      avatar: profile?.avatar || undefined,
      bio: profile?.bio || undefined,
      location: profile?.location || undefined,
      college: profile?.college || undefined,
      branch: profile?.branch || undefined,
      year: profile?.year || undefined,
      onboardingCompleted: profile?.onboardingCompleted || false,
      role: user.role,
      emailVerified: user.emailVerified,
    };
  }

  // ─── Email Verification ─────────────────────────────────────────────

  /**
   * Generate a verification token and publish EMAIL_VERIFICATION_REQUESTED event
   */
  static async requestEmailVerification(userId: string, email: string, name?: string): Promise<void> {
    // Invalidate any existing unused tokens for this user
    await prisma.verificationToken.updateMany({
      where: { userId, usedAt: null },
      data: { usedAt: new Date() },
    });

    const rawToken = generateSecureToken();
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + config.email.verificationTokenExpiry);

    await prisma.verificationToken.create({
      data: { userId, tokenHash, expiresAt },
    });

    const verificationUrl = `${config.clientUrl}/verify-email?token=${rawToken}`;
    const displayName = name || await getUserName(userId);

    await eventBus.publish(CoreEvents.EMAIL_VERIFICATION_REQUESTED, {
      email,
      name: displayName,
      verificationUrl,
    });

    console.log(`[AuthService] Verification requested for user ${userId}`);
  }

  /**
   * Verify a user's email with the token from the URL
   */
  static async verifyEmail(token: string) {
    const tokenHash = hashToken(token);

    const record = await prisma.verificationToken.findUnique({
      where: { tokenHash },
    });

    if (!record) {
      throw { statusCode: 400, message: 'Invalid verification token' };
    }

    if (record.usedAt) {
      throw { statusCode: 400, message: 'This verification link has already been used' };
    }

    if (new Date() > record.expiresAt) {
      throw { statusCode: 400, message: 'Verification link has expired. Please request a new one.' };
    }

    // Mark token as used
    await prisma.verificationToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    });

    // Activate user account
    const user = await prisma.authUser.update({
      where: { id: record.userId },
      data: { emailVerified: true, emailVerifiedAt: new Date() },
    });

    // Send welcome email
    const displayName = await getUserName(user.id);
    await eventBus.publish(CoreEvents.WELCOME_EMAIL_REQUESTED, {
      email: user.email,
      name: displayName,
    });

    console.log(`[AuthService] Email verified for user ${user.id}`);
    return { message: 'Email verified successfully' };
  }

  /**
   * Resend verification email with rate limiting
   */
  static async resendVerification(email: string) {
    // Rate limit check
    const cooldownKey = `${RateLimitKeys.VERIFICATION_RESEND}${email}`;
    const exists = await redisClient.get(cooldownKey);
    if (exists) {
      throw { statusCode: 429, message: 'Please wait before requesting another verification email' };
    }

    const user = await prisma.authUser.findUnique({ where: { email } });
    if (!user) {
      // Return success even if user not found (prevent email enumeration)
      return { message: 'If the email exists, a verification link has been sent' };
    }

    if (user.emailVerified) {
      throw { statusCode: 400, message: 'Email is already verified' };
    }

    // Set cooldown
    await redisClient.set(cooldownKey, '1', 'EX', config.email.verificationResendCooldown);

    await AuthService.requestOtp(user.id, 'EMAIL_VERIFICATION');

    return { message: 'If the email exists, a verification code has been sent' };
  }

  // ─── Password Reset ─────────────────────────────────────────────────

  /**
   * Request a password reset token
   */
  static async requestPasswordReset(email: string) {
    // Rate limit check
    const cooldownKey = `${RateLimitKeys.PASSWORD_RESET}${email}`;
    const exists = await redisClient.get(cooldownKey);
    if (exists) {
      throw { statusCode: 429, message: 'Please wait before requesting another password reset' };
    }

    const user = await prisma.authUser.findUnique({ where: { email } });
    if (!user) {
      // Return success even if not found (prevent email enumeration)
      return { message: 'If the email exists, a password reset link has been sent' };
    }

    // Invalidate existing tokens
    await prisma.passwordResetToken.updateMany({
      where: { userId: user.id, usedAt: null },
      data: { usedAt: new Date() },
    });

    const rawToken = generateSecureToken();
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + config.email.passwordResetTokenExpiry);

    await prisma.passwordResetToken.create({
      data: { userId: user.id, tokenHash, expiresAt },
    });

    // Set cooldown
    await redisClient.set(cooldownKey, '1', 'EX', config.email.passwordResetCooldown);

    const resetUrl = `${config.clientUrl}/reset-password?token=${rawToken}`;
    const displayName = await getUserName(user.id);

    await eventBus.publish(CoreEvents.PASSWORD_RESET_REQUESTED, {
      email: user.email,
      name: displayName,
      resetUrl,
    });

    console.log(`[AuthService] Password reset requested for user ${user.id}`);
    return { message: 'If the email exists, a password reset link has been sent' };
  }

  /**
   * Reset password using the token
   */
  static async resetPassword(token: string, newPassword: string) {
    const tokenHash = hashToken(token);

    const record = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });

    if (!record) {
      throw { statusCode: 400, message: 'Invalid or expired reset token' };
    }

    if (record.usedAt) {
      throw { statusCode: 400, message: 'This reset link has already been used' };
    }

    if (new Date() > record.expiresAt) {
      throw { statusCode: 400, message: 'Reset link has expired. Please request a new one.' };
    }

    // Mark token as used
    await prisma.passwordResetToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    });

    // Update password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    const user = await prisma.authUser.update({
      where: { id: record.userId },
      data: { passwordHash },
    });

    // Notify about password change
    const displayName = await getUserName(user.id);
    await eventBus.publish(CoreEvents.PASSWORD_CHANGED, {
      email: user.email,
      name: displayName,
    });

    console.log(`[AuthService] Password reset completed for user ${user.id}`);
    return { message: 'Password has been reset successfully' };
  }

  // ─── OTP ────────────────────────────────────────────────────────────

  /**
   * Generate and send a 6-digit OTP
   * Stored in both DB (audit) and Redis (fast lookup + TTL)
   */
  static async requestOtp(userId: string, purpose: string) {
    const user = await prisma.authUser.findUnique({ where: { id: userId } });
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }

    // Rate limit check
    const cooldownKey = `${RateLimitKeys.OTP_RESEND}${userId}:${purpose}`;
    const exists = await redisClient.get(cooldownKey);
    if (exists) {
      throw { statusCode: 429, message: 'Please wait before requesting another OTP' };
    }

    const otp = generateOtp();
    const otpHash = hashToken(otp);
    const expiresAt = new Date(Date.now() + config.email.otpExpiry * 1000);

    // Store in DB for audit
    await prisma.otpToken.create({
      data: { userId, otpHash, purpose, expiresAt },
    });

    // Store in Redis for fast lookup with automatic expiry
    const redisKey = `otp:${userId}:${purpose}`;
    await redisClient.set(redisKey, otpHash, 'EX', config.email.otpExpiry);

    // Set resend cooldown
    await redisClient.set(cooldownKey, '1', 'EX', config.email.otpResendCooldown);

    // Send OTP email
    const displayName = await getUserName(userId);
    await eventBus.publish(CoreEvents.OTP_REQUESTED, {
      email: user.email,
      name: displayName,
      otp,
      purpose,
    });

    console.log(`[AuthService] OTP requested for user ${userId}, purpose: ${purpose}`);
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[AuthService] [DEVELOPMENT] OTP Code for ${user.email} is: ${otp}`);
    }
    return { message: 'OTP sent to your email' };
  }

  /**
   * Verify an OTP
   * Checks Redis first (fast), then validates and marks used in DB (audit)
   */
  static async verifyOtp(userId: string, otp: string, purpose: string) {
    const otpHash = hashToken(otp);
    const redisKey = `otp:${userId}:${purpose}`;

    // Check Redis first for fast validation
    const storedHash = await redisClient.get(redisKey);
    
    if (!storedHash) {
      // Check if OTP exists in DB but expired
      const dbRecord = await prisma.otpToken.findFirst({
        where: { userId, purpose, usedAt: null },
        orderBy: { createdAt: 'desc' },
      });

      if (dbRecord && new Date() > dbRecord.expiresAt) {
        throw { statusCode: 400, message: 'OTP has expired. Please request a new one.' };
      }

      if (process.env.NODE_ENV !== 'production' && otp === '000000') {
        // Allow bypass in dev
      } else {
        throw { statusCode: 400, message: 'Invalid or expired OTP' };
      }
    }

    if (storedHash !== otpHash && !(process.env.NODE_ENV !== 'production' && otp === '000000')) {
      // Increment attempt counter in DB for audit/brute-force protection
      const dbRecord = await prisma.otpToken.findFirst({
        where: { userId, purpose, usedAt: null },
        orderBy: { createdAt: 'desc' },
      });

      if (dbRecord) {
        const newAttempts = dbRecord.attempts + 1;
        await prisma.otpToken.update({
          where: { id: dbRecord.id },
          data: { attempts: newAttempts },
        });

        // Lock out after 5 failed attempts
        if (newAttempts >= 5) {
          await redisClient.del(redisKey);
          await prisma.otpToken.update({
            where: { id: dbRecord.id },
            data: { usedAt: new Date() },
          });
          throw { statusCode: 400, message: 'Too many failed attempts. Please request a new OTP.' };
        }
      }

      throw { statusCode: 400, message: 'Invalid OTP' };
    }

    // OTP is valid — clean up
    await redisClient.del(redisKey);

    // Mark as used in DB for audit
    const dbRecord = await prisma.otpToken.findFirst({
      where: { userId, purpose, otpHash, usedAt: null },
      orderBy: { createdAt: 'desc' },
    });

    if (dbRecord) {
      await prisma.otpToken.update({
        where: { id: dbRecord.id },
        data: { usedAt: new Date() },
      });
    }

    if (purpose === 'EMAIL_VERIFICATION') {
      // Activate user account
      const user = await prisma.authUser.update({
        where: { id: userId },
        data: { emailVerified: true, emailVerifiedAt: new Date() },
      });

      // Send welcome email
      const displayName = await getUserName(user.id);
      await eventBus.publish(CoreEvents.WELCOME_EMAIL_REQUESTED, {
        email: user.email,
        name: displayName,
      });
    }

    console.log(`[AuthService] OTP verified for user ${userId}, purpose: ${purpose}`);
    return { message: 'OTP verified successfully', verified: true };
  }
}
