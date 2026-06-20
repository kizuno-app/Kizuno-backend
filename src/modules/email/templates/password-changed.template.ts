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
    <!-- Icon -->
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="display: inline-block; background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 50%; width: 64px; height: 64px; line-height: 64px; font-size: 28px;">
        🔒
      </div>
    </div>

    <!-- Greeting -->
    <h2 class="email-text" style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #1e1b4b; text-align: center;">
      Password Changed Successfully
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 24px 0; font-size: 15px; color: #6b7280; line-height: 1.6; text-align: center;">
      Hi <strong style="color: #1e1b4b;">${data.name}</strong>, your Kizuna account password was changed successfully.
    </p>

    ${divider()}

    <!-- Device info -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px;">
      <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">
        Change Details
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        ${data.time ? infoRow('Time', data.time) : ''}
        ${data.device ? infoRow('Device', data.device) : ''}
        ${data.browser ? infoRow('Browser', data.browser) : ''}
        ${data.ip ? infoRow('IP Address', data.ip) : ''}
      </table>
    </div>

    <!-- Warning -->
    <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 16px 20px; margin-top: 24px;">
      <p class="email-text-secondary" style="margin: 0; font-size: 13px; color: #dc2626; line-height: 1.5;">
        ⚠️ If you didn't make this change, please <strong>reset your password immediately</strong> and contact our support team.
      </p>
    </div>
  `;

  return baseTemplate(body, { previewText: 'Your Kizuna password was changed' });
}
