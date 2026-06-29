import { baseTemplate, divider, infoRow } from './base.template';

/**
 * Password Changed Confirmation Template
 * Sent when a user successfully changes their password.
 */
export function passwordChangedTemplate(data: { 
  name: string; 
  device?: string; 
  browser?: string; 
  time?: string; 
  ip?: string;
}): string {
  const body = `
    <!-- SVG Security Illustration -->
    <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto 24px auto;">
      <rect x="10" y="10" width="100" height="100" fill="#faf9fc" stroke="#edeaf4" stroke-width="2" />
      <path d="M60 25C75 25 85 30 85 30V62C85 80 60 92 60 92C60 92 35 80 35 62V30C35 30 45 25 60 25Z" fill="#f5f3ff" stroke="#6366f1" stroke-width="2.5" stroke-linejoin="round" />
      <path d="M52 58L58 64L68 50" stroke="#6366f1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="28" cy="40" r="3" fill="#818cf8" />
      <circle cx="92" cy="76" r="4" fill="#a78bfa" />
    </svg>

    <!-- Greeting -->
    <h2 class="email-text" style="margin: 0 0 10px 0; font-size: 22px; font-weight: 800; color: #1b1833; text-align: center; letter-spacing: -0.5px;">
      Password Changed
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 24px 0; font-size: 14px; color: #575366; line-height: 1.6; text-align: center;">
      Hi <strong style="color: #1b1833;">${data.name}</strong>, your Kizuna account password was changed successfully.
    </p>

    ${divider()}

    <!-- Device info (Rectangular design) -->
    <div style="background-color: #faf9fc; border: 1px solid #edeaf4; border-radius: 0px; padding: 24px;">
      <p style="margin: 0 0 16px 0; font-size: 11px; font-weight: 700; color: #8c899c; text-transform: uppercase; letter-spacing: 0.8px;">
        Change Details
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        ${data.time ? infoRow('Time', data.time) : ''}
        ${data.device ? infoRow('Device', data.device) : ''}
        ${data.browser ? infoRow('Browser', data.browser) : ''}
        ${data.ip ? infoRow('IP Address', data.ip) : ''}
      </table>
    </div>

    <!-- Warning callout (Bolder design, no clock, no round corners) -->
    <div style="background-color: #fffbfb; border-left: 4px solid #ef4444; border-top: 1px solid #fde8e8; border-bottom: 1px solid #fde8e8; border-right: 1px solid #fde8e8; padding: 16px 20px; margin-top: 24px; border-radius: 0px;">
      <p class="email-text-secondary" style="margin: 0; font-size: 13px; color: #b91c1c; line-height: 1.5; font-weight: 600;">
        If you didn't make this change, please <strong>reset your password immediately</strong> and contact our support team.
      </p>
    </div>
  `;

  return baseTemplate(body, { previewText: 'Your Kizuna password was changed' });
}

