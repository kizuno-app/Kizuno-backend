import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../db/client';
import { PrismaClient as UserPrismaClient } from '../../user/db/client';
import { RegisterDtoType, LoginDtoType } from '../dto/auth.dto';
import { config } from '../../../shared/config';
import { eventBus, CoreEvents } from '../../../shared/events';

const globalForPrismaAuth = global as unknown as { prismaAuth: PrismaClient };
const prisma = globalForPrismaAuth.prismaAuth || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrismaAuth.prismaAuth = prisma;
const globalForUserPrisma = global as unknown as { userPrismaAuth: UserPrismaClient };
const userPrisma = globalForUserPrisma.userPrismaAuth || new UserPrismaClient();
if (process.env.NODE_ENV !== 'production') globalForUserPrisma.userPrismaAuth = userPrisma;

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
      { userId: user.id, email: user.email },
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
      },
    };
  }
}

