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
    <!-- SVG Security Illustration -->
    <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto 24px auto;">
      <rect x="10" y="10" width="100" height="100" fill="#faf9fc" stroke="#edeaf4" stroke-width="2" />
      <path d="M60 25C75 25 85 30 85 30V62C85 80 60 92 60 92C60 92 35 80 35 62V30C35 30 45 25 60 25Z" fill="#f5f3ff" stroke="#6366f1" stroke-width="2.5" stroke-linejoin="round" />
      <path d="M52 58L58 64L68 50" stroke="#6366f1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="28" cy="40" r="3" fill="#818cf8" />
      <circle cx="92" cy="76" r="4" fill="#a78bfa" />
    </svg>

    <!-- Title -->
    <h2 class="email-text" style="margin: 0 0 10px 0; font-size: 22px; font-weight: 800; color: #1b1833; text-align: center; letter-spacing: -0.5px;">
      ${alert.title}
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 24px 0; font-size: 14px; color: #575366; line-height: 1.6; text-align: center;">
      Hi <strong style="color: #1b1833;">${data.name}</strong>, ${alert.description.toLowerCase()}
    </p>

    ${divider()}

    <!-- Details card (Rectangular design) -->
    <div style="background-color: #faf9fc; border: 1px solid #edeaf4; border-radius: 0px; padding: 24px;">
      <p style="margin: 0 0 16px 0; font-size: 11px; font-weight: 700; color: #8c899c; text-transform: uppercase; letter-spacing: 0.8px;">
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

    <!-- Warning callout (Bolder design, no clock, no round corners) -->
    <div style="background-color: #fffbfb; border-left: 4px solid #ef4444; border-top: 1px solid #fde8e8; border-bottom: 1px solid #fde8e8; border-right: 1px solid #fde8e8; padding: 16px 20px; margin-top: 24px; border-radius: 0px;">
      <p class="email-text-secondary" style="margin: 0; font-size: 13px; color: #b91c1c; line-height: 1.5; font-weight: 600;">
        If this wasn't you, please <strong>change your password immediately</strong> and contact our support team at <a href="mailto:support@kizuna.app" style="color: #b91c1c; text-decoration: none; font-weight: 700;">support@kizuna.app</a>
      </p>
    </div>
  `;

  return baseTemplate(body, { previewText: `Security alert: ${alert.title}` });
}

