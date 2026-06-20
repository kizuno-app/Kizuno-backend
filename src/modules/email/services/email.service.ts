import { PrismaClient } from '../db/client';
import { EmailTemplate, EmailTemplateType, EmailStatus } from '../constants/email.constants';
import { EmailTemplateService } from './email-template.service';
import { emailQueue } from '../queue/email.queue';
import { SecurityAlertDataType } from '../dto/email.dto';
import { config } from '../../../shared/config';

const globalForPrismaEmail = global as unknown as { prismaEmail: PrismaClient };
const prisma = globalForPrismaEmail.prismaEmail || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrismaEmail.prismaEmail = prisma;

/**
 * Email Service
 * Core service responsible for all email operations.
 * Renders templates, creates audit logs, and enqueues emails via BullMQ.
 */
export class EmailService {

  /**
   * Internal: Create email log entry and enqueue the email job
   */
  private static async enqueueEmail(
    to: string,
    subject: string,
    template: EmailTemplateType,
    templateData: Record<string, any>,
    from?: string
  ): Promise<string> {
    // Render HTML
    const html = EmailTemplateService.render(template, templateData);

    // Create audit log
    const log = await prisma.emailLog.create({
      data: {
        recipient: to,
        subject,
        template,
        status: EmailStatus.PENDING,
      },
    });

    // Enqueue
    await emailQueue.add(`email-${template}-${Date.now()}`, {
      to,
      subject,
      html,
      template,
      logId: log.id,
      from,
    });

    console.log(`[EmailService] Enqueued ${template} email to ${to}. LogID: ${log.id}`);
    return log.id;
  }

  // ─── Public Methods ─────────────────────────────────────────────────

  /**
   * Send Verification Email
   */
  static async sendVerificationEmail(email: string, name: string, verificationUrl: string): Promise<string> {
    return this.enqueueEmail(
      email,
      'Verify Your Email — Kizuna',
      EmailTemplate.VERIFICATION,
      { name, verificationUrl, expiryHours: 24 },
      config.email.fromAuth
    );
  }

  /**
   * Send OTP Email
   */
  static async sendOtpEmail(email: string, name: string, otp: string, purpose: string): Promise<string> {
    return this.enqueueEmail(
      email,
      'Your Verification Code — Kizuna',
      EmailTemplate.OTP,
      { name, otp, purpose, expiryMinutes: 10 },
      config.email.fromAuth
    );
  }

  /**
   * Send Forgot Password Email
   */
  static async sendForgotPasswordEmail(email: string, name: string, resetUrl: string): Promise<string> {
    return this.enqueueEmail(
      email,
      'Reset Your Password — Kizuna',
      EmailTemplate.FORGOT_PASSWORD,
      { name, resetUrl, expiryMinutes: 60 },
      config.email.fromAuth
    );
  }

  /**
   * Send Password Changed Confirmation
   */
  static async sendPasswordChangedEmail(
    email: string, 
    name: string, 
    deviceInfo?: { device?: string; browser?: string; ip?: string }
  ): Promise<string> {
    return this.enqueueEmail(
      email,
      'Password Changed — Kizuna',
      EmailTemplate.PASSWORD_CHANGED,
      { name, ...deviceInfo, time: new Date().toUTCString() },
      config.email.fromSecurity
    );
  }

  /**
   * Send Welcome Email
   */
  static async sendWelcomeEmail(email: string, name: string): Promise<string> {
    return this.enqueueEmail(
      email,
      'Welcome to Kizuna! 🎉',
      EmailTemplate.WELCOME,
      { name },
      config.email.fromGeneral
    );
  }

  /**
   * Send Organization Application Received Email
   */
  static async sendOrgApplicationReceivedEmail(email: string, orgName: string, applicantName?: string): Promise<string> {
    return this.enqueueEmail(
      email,
      'Application Received — Kizuna',
      EmailTemplate.ORG_APPLICATION_RECEIVED,
      { orgName, applicantName },
      config.email.fromOrg
    );
  }

  /**
   * Send Organization Approved Email
   */
  static async sendOrgApprovedEmail(email: string, orgName: string, applicantName?: string): Promise<string> {
    return this.enqueueEmail(
      email,
      'Organization Approved! — Kizuna',
      EmailTemplate.ORG_APPROVED,
      { orgName, applicantName },
      config.email.fromOrg
    );
  }

  /**
   * Send Organization Rejected Email
   */
  static async sendOrgRejectedEmail(email: string, orgName: string, applicantName?: string, reason?: string): Promise<string> {
    return this.enqueueEmail(
      email,
      'Organization Application Update — Kizuna',
      EmailTemplate.ORG_REJECTED,
      { orgName, applicantName, reason },
      config.email.fromOrg
    );
  }

  /**
   * Send Security Alert Email
   */
  static async sendSecurityAlertEmail(email: string, name: string, alertData: SecurityAlertDataType): Promise<string> {
    return this.enqueueEmail(
      email,
      'Security Alert — Kizuna',
      EmailTemplate.SECURITY_ALERT,
      { name, ...alertData },
      config.email.fromSecurity
    );
  }

  /**
   * Send Organization Registration Reminder Email
   */
  static async sendOrgRegistrationReminderEmail(email: string, orgName: string, applicantName: string): Promise<string> {
    return this.enqueueEmail(
      email,
      'Complete Your Organization Registration — Kizuna',
      EmailTemplate.ORG_REGISTRATION_REMINDER,
      { orgName, applicantName },
      config.email.fromOrg
    );
  }
}
