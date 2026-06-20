import { baseTemplate, divider, infoRow } from './base.template';

/**
 * Security Alert Email Template
 * Sent for security-related account events:
 * - Password changed
 * - New login device
 * - Suspicious login
 * - Email changed
 * - Important account actions
 */
export function securityAlertTemplate(data: {
  name: string;
  alertType: string;
  device?: string;
  browser?: string;
  ip?: string;
  time?: string;
  location?: string;
}): string {
  const alertLabels: Record<string, { title: string; description: string; icon: string }> = {
    NEW_LOGIN_DEVICE: {
      title: 'New Login Device Detected',
      description: 'Your account was accessed from a new device.',
      icon: '🖥️',
    },
    SUSPICIOUS_LOGIN: {
      title: 'Suspicious Login Attempt',
      description: 'We detected an unusual login attempt on your account.',
      icon: '🚨',
    },
    EMAIL_CHANGED: {
      title: 'Email Address Changed',
      description: 'The email address associated with your account was changed.',
      icon: '📧',
    },
    PASSWORD_CHANGED: {
      title: 'Password Changed',
      description: 'Your account password was successfully changed.',
      icon: '🔑',
    },
    ACCOUNT_ACTION: {
      title: 'Important Account Action',
      description: 'An important action was performed on your account.',
      icon: '⚡',
    },
  };

  const alert = alertLabels[data.alertType] || alertLabels.ACCOUNT_ACTION;

  const body = `
    <!-- Alert icon -->
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="display: inline-block; background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 50%; width: 64px; height: 64px; line-height: 64px; font-size: 28px;">
        ${alert.icon}
      </div>
    </div>

    <!-- Title -->
    <h2 class="email-text" style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #1e1b4b; text-align: center;">
      ${alert.title}
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 24px 0; font-size: 15px; color: #6b7280; line-height: 1.6; text-align: center;">
      Hi <strong style="color: #1e1b4b;">${data.name}</strong>, ${alert.description.toLowerCase()}
    </p>

    ${divider()}

    <!-- Details card -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px;">
      <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">
        Activity Details
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        ${data.time ? infoRow('Time', data.time) : ''}
        ${data.device ? infoRow('Device', data.device) : ''}
        ${data.browser ? infoRow('Browser', data.browser) : ''}
        ${data.ip ? infoRow('IP Address', data.ip) : ''}
        ${data.location ? infoRow('Location', data.location) : ''}
      </table>
    </div>

    <!-- Warning -->
    <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 16px 20px; margin-top: 24px;">
      <p class="email-text-secondary" style="margin: 0; font-size: 13px; color: #dc2626; line-height: 1.5;">
        ⚠️ If this wasn't you, please <strong>change your password immediately</strong> and contact our support team at <a href="mailto:support@kizuna.app" style="color: #dc2626; text-decoration: underline;">support@kizuna.app</a>
      </p>
    </div>
  `;

  return baseTemplate(body, { previewText: `Security alert: ${alert.title}` });
}
