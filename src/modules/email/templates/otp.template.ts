import { baseTemplate, divider } from './base.template';

/**
 * OTP Email Template
 * Sent for email verification, sensitive actions, and 2FA.
 */
export function otpTemplate(data: { name: string; otp: string; purpose: string; expiryMinutes?: number }): string {
  const expiryText = data.expiryMinutes ? `${data.expiryMinutes} minutes` : '10 minutes';

  const purposeLabels: Record<string, string> = {
    EMAIL_VERIFICATION: 'verify your email address',
    SENSITIVE_ACTION: 'confirm a sensitive action',
    TWO_FACTOR_AUTH: 'complete two-factor authentication',
  };

  const purposeText = purposeLabels[data.purpose] || 'complete your request';

  const body = `
    <!-- Greeting -->
    <h2 class="email-text" style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #1e1b4b;">
      Your Verification Code
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 28px 0; font-size: 15px; color: #6b7280; line-height: 1.6;">
      Hi <strong style="color: #1e1b4b;">${data.name}</strong>, use the code below to ${purposeText}.
    </p>

    <!-- OTP Code -->
    <div style="text-align: center; margin: 0 0 28px 0;">
      <div class="otp-code" style="display: inline-block; background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border: 2px solid #ddd6fe; border-radius: 14px; padding: 20px 40px; letter-spacing: 10px; font-size: 36px; font-weight: 800; color: #4c1d95; font-family: 'Courier New', monospace;">
        ${data.otp}
      </div>
    </div>

    ${divider()}

    <!-- Expiry notice -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 10px; padding: 16px 20px;">
      <p class="email-text-secondary" style="margin: 0; font-size: 13px; color: #6b21a8; line-height: 1.5;">
        ⏰ This code expires in <strong>${expiryText}</strong>. Do not share this code with anyone.
      </p>
    </div>

    <p class="email-text-secondary" style="margin: 24px 0 0 0; font-size: 13px; color: #9ca3af;">
      If you didn't request this code, please ignore this email or contact support if you're concerned about your account security.
    </p>
  `;

  return baseTemplate(body, { previewText: `Your Kizuna verification code: ${data.otp}` });
}
