/**
 * Email Service Constants
 * Centralized constants for the email module
 */

// Email Queue
export const EMAIL_QUEUE_NAME = 'emailQueue';

// Email Statuses
export const EmailStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SENT: 'SENT',
  FAILED: 'FAILED',
  RETRYING: 'RETRYING',
} as const;

export type EmailStatusType = (typeof EmailStatus)[keyof typeof EmailStatus];

// Template Names
export const EmailTemplate = {
  VERIFICATION: 'VERIFICATION',
  OTP: 'OTP',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  PASSWORD_CHANGED: 'PASSWORD_CHANGED',
  WELCOME: 'WELCOME',
  ORG_APPLICATION_RECEIVED: 'ORG_APPLICATION_RECEIVED',
  ORG_APPROVED: 'ORG_APPROVED',
  ORG_REJECTED: 'ORG_REJECTED',
  SECURITY_ALERT: 'SECURITY_ALERT',
  EVENT_INVITATION: 'EVENT_INVITATION',
  ORG_REGISTRATION_REMINDER: 'ORG_REGISTRATION_REMINDER',
} as const;

export type EmailTemplateType = (typeof EmailTemplate)[keyof typeof EmailTemplate];

// OTP Purposes
export const OtpPurpose = {
  EMAIL_VERIFICATION: 'EMAIL_VERIFICATION',
  SENSITIVE_ACTION: 'SENSITIVE_ACTION',
  TWO_FACTOR_AUTH: 'TWO_FACTOR_AUTH',
} as const;

export type OtpPurposeType = (typeof OtpPurpose)[keyof typeof OtpPurpose];

// Rate Limit Key Prefixes (for Redis)
export const RateLimitKeys = {
  VERIFICATION_RESEND: 'ratelimit:verification:',
  PASSWORD_RESET: 'ratelimit:password_reset:',
  OTP_RESEND: 'ratelimit:otp:',
} as const;

// Queue Configuration
export const EMAIL_QUEUE_CONFIG = {
  maxRetries: 3,
  backoff: {
    type: 'exponential' as const,
    delay: 1000, // 1 second base delay
  },
} as const;
