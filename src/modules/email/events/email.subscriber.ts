import { eventBus, CoreEvents } from '../../../shared/events';
import { EmailService } from '../services/email.service';

/**
 * Email Event Subscriber
 * Listens to all email-related CoreEvents and dispatches to EmailService.
 * This is the only coupling point — other modules publish events, email reacts.
 */
export function setupEmailEventSubscribers() {
  // Email Verification
  eventBus.subscribe(CoreEvents.EMAIL_VERIFICATION_REQUESTED, async (data: {
    email: string;
    name: string;
    verificationUrl: string;
  }) => {
    try {
      await EmailService.sendVerificationEmail(data.email, data.name, data.verificationUrl);
      console.log(`[EmailModule] Verification email enqueued for ${data.email}`);
    } catch (error) {
      console.error(`[EmailModule] Failed to enqueue verification email:`, error);
    }
  });

  // Password Reset
  eventBus.subscribe(CoreEvents.PASSWORD_RESET_REQUESTED, async (data: {
    email: string;
    name: string;
    resetUrl: string;
  }) => {
    try {
      await EmailService.sendForgotPasswordEmail(data.email, data.name, data.resetUrl);
      console.log(`[EmailModule] Password reset email enqueued for ${data.email}`);
    } catch (error) {
      console.error(`[EmailModule] Failed to enqueue password reset email:`, error);
    }
  });

  // Password Changed
  eventBus.subscribe(CoreEvents.PASSWORD_CHANGED, async (data: {
    email: string;
    name: string;
    device?: string;
    browser?: string;
    ip?: string;
  }) => {
    try {
      await EmailService.sendPasswordChangedEmail(data.email, data.name, {
        device: data.device,
        browser: data.browser,
        ip: data.ip,
      });
      console.log(`[EmailModule] Password changed email enqueued for ${data.email}`);
    } catch (error) {
      console.error(`[EmailModule] Failed to enqueue password changed email:`, error);
    }
  });

  // Welcome Email
  eventBus.subscribe(CoreEvents.WELCOME_EMAIL_REQUESTED, async (data: {
    email: string;
    name: string;
  }) => {
    try {
      await EmailService.sendWelcomeEmail(data.email, data.name);
      console.log(`[EmailModule] Welcome email enqueued for ${data.email}`);
    } catch (error) {
      console.error(`[EmailModule] Failed to enqueue welcome email:`, error);
    }
  });

  // Security Alert
  eventBus.subscribe(CoreEvents.SECURITY_ALERT, async (data: {
    email: string;
    name: string;
    alertType: string;
    device?: string;
    browser?: string;
    ip?: string;
    time?: string;
    location?: string;
  }) => {
    try {
      await EmailService.sendSecurityAlertEmail(data.email, data.name, {
        alertType: data.alertType,
        device: data.device,
        browser: data.browser,
        ip: data.ip,
        time: data.time,
        location: data.location,
      });
      console.log(`[EmailModule] Security alert email enqueued for ${data.email}`);
    } catch (error) {
      console.error(`[EmailModule] Failed to enqueue security alert email:`, error);
    }
  });

  // OTP
  eventBus.subscribe(CoreEvents.OTP_REQUESTED, async (data: {
    email: string;
    name: string;
    otp: string;
    purpose: string;
  }) => {
    try {
      await EmailService.sendOtpEmail(data.email, data.name, data.otp, data.purpose);
      console.log(`[EmailModule] OTP email enqueued for ${data.email}`);
    } catch (error) {
      console.error(`[EmailModule] Failed to enqueue OTP email:`, error);
    }
  });

  // Organization Application Submitted
  eventBus.subscribe(CoreEvents.ORG_APPLICATION_SUBMITTED, async (data: {
    email: string;
    orgName: string;
    applicantName?: string;
  }) => {
    try {
      await EmailService.sendOrgApplicationReceivedEmail(data.email, data.orgName, data.applicantName);
      console.log(`[EmailModule] Org application received email enqueued for ${data.email}`);
    } catch (error) {
      console.error(`[EmailModule] Failed to enqueue org application email:`, error);
    }
  });

  // Organization Approved
  eventBus.subscribe(CoreEvents.ORG_APPROVED, async (data: {
    email: string;
    orgName: string;
    applicantName?: string;
  }) => {
    try {
      await EmailService.sendOrgApprovedEmail(data.email, data.orgName, data.applicantName);
      console.log(`[EmailModule] Org approved email enqueued for ${data.email}`);
    } catch (error) {
      console.error(`[EmailModule] Failed to enqueue org approved email:`, error);
    }
  });

  // Organization Rejected
  eventBus.subscribe(CoreEvents.ORG_REJECTED, async (data: {
    email: string;
    orgName: string;
    applicantName?: string;
    reason?: string;
  }) => {
    try {
      await EmailService.sendOrgRejectedEmail(data.email, data.orgName, data.applicantName, data.reason);
      console.log(`[EmailModule] Org rejected email enqueued for ${data.email}`);
    } catch (error) {
      console.error(`[EmailModule] Failed to enqueue org rejected email:`, error);
    }
  });

  console.log('[EmailModule] All email event subscribers registered');
}
