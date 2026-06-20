import { EmailTemplate, EmailTemplateType } from '../constants/email.constants';
import { SecurityAlertDataType, EventInvitationDataType } from '../dto/email.dto';

// Template imports
import { verificationTemplate } from '../templates/verification.template';
import { otpTemplate } from '../templates/otp.template';
import { forgotPasswordTemplate } from '../templates/forgot-password.template';
import { passwordChangedTemplate } from '../templates/password-changed.template';
import { welcomeTemplate } from '../templates/welcome.template';
import { orgApplicationReceivedTemplate } from '../templates/org-application-received.template';
import { orgApprovedTemplate } from '../templates/org-approved.template';
import { orgRejectedTemplate } from '../templates/org-rejected.template';
import { securityAlertTemplate } from '../templates/security-alert.template';
import { orgRegistrationReminderTemplate } from '../templates/org-registration-reminder.template';
import { config } from '../../../shared/config';

/**
 * Email Template Service
 * Renders the correct HTML template based on template name and data.
 */
export class EmailTemplateService {

  static render(template: EmailTemplateType, data: Record<string, any>): string {
    switch (template) {
      case EmailTemplate.VERIFICATION:
        return verificationTemplate({
          name: data.name,
          verificationUrl: data.verificationUrl,
          expiryHours: data.expiryHours,
        });

      case EmailTemplate.OTP:
        return otpTemplate({
          name: data.name,
          otp: data.otp,
          purpose: data.purpose,
          expiryMinutes: data.expiryMinutes,
        });

      case EmailTemplate.FORGOT_PASSWORD:
        return forgotPasswordTemplate({
          name: data.name,
          resetUrl: data.resetUrl,
          expiryMinutes: data.expiryMinutes,
        });

      case EmailTemplate.PASSWORD_CHANGED:
        return passwordChangedTemplate({
          name: data.name,
          device: data.device,
          browser: data.browser,
          time: data.time,
          ip: data.ip,
        });

      case EmailTemplate.WELCOME:
        return welcomeTemplate({
          name: data.name,
        });

      case EmailTemplate.ORG_APPLICATION_RECEIVED:
        return orgApplicationReceivedTemplate({
          orgName: data.orgName,
          applicantName: data.applicantName,
        });

      case EmailTemplate.ORG_APPROVED:
        return orgApprovedTemplate({
          orgName: data.orgName,
          applicantName: data.applicantName,
        });

      case EmailTemplate.ORG_REJECTED:
        return orgRejectedTemplate({
          orgName: data.orgName,
          applicantName: data.applicantName,
          reason: data.reason,
        });

      case EmailTemplate.SECURITY_ALERT:
        return securityAlertTemplate({
          name: data.name,
          alertType: data.alertType,
          device: data.device,
          browser: data.browser,
          ip: data.ip,
          time: data.time,
          location: data.location,
        });

      case EmailTemplate.ORG_REGISTRATION_REMINDER:
        return orgRegistrationReminderTemplate({
          orgName: data.orgName,
          applicantName: data.applicantName,
          clientUrl: config.clientUrl,
        });

      default:
        throw new Error(`[EmailTemplateService] Unknown template: ${template}`);
    }
  }
}
