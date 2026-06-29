import { baseTemplate, divider, verificationCodeLayout } from './base.template';

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
    <!-- SVG Security Illustration -->
    <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto 24px auto;">
      <rect x="10" y="10" width="100" height="100" fill="#faf9fc" stroke="#edeaf4" stroke-width="2" />
      <path d="M60 25C75 25 85 30 85 30V62C85 80 60 92 60 92C60 92 35 80 35 62V30C35 30 45 25 60 25Z" fill="#f5f3ff" stroke="#6366f1" stroke-width="2.5" stroke-linejoin="round" />
      <path d="M52 58L58 64L68 50" stroke="#6366f1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="28" cy="40" r="3" fill="#818cf8" />
      <circle cx="92" cy="76" r="4" fill="#a78bfa" />
    </svg>

    <!-- Greeting -->
    <h2 class="email-text" style="margin: 0 0 10px 0; font-size: 22px; font-weight: 800; color: #1b1833; letter-spacing: -0.5px;">
      Verification Code
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 28px 0; font-size: 14px; color: #575366; line-height: 1.6;">
      Hi <strong style="color: #1b1833;">${data.name}</strong>, use the code below to ${purposeText}.
    </p>

    <!-- OTP Code Grid -->
    <div style="text-align: center; margin: 32px 0;">
      <p class="email-text-secondary" style="margin: 0 0 12px 0; font-size: 12px; color: #8c899c; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;">
        Your Verification Code
      </p>
      ${verificationCodeLayout(data.otp)}
    </div>

    ${divider()}

    <!-- Expiry notice (Bolder design, no clock, no round corners) -->
    <div style="background-color: #faf9fc; border-left: 4px solid #6366f1; border-top: 1px solid #edeaf4; border-bottom: 1px solid #edeaf4; border-right: 1px solid #edeaf4; padding: 16px 20px; margin: 20px 0; border-radius: 0px;">
      <p class="email-text-secondary" style="margin: 0; font-size: 13px; color: #6366f1; line-height: 1.5; font-weight: 600;">
        This code expires in <strong>${expiryText}</strong>. Do not share this code with anyone.
      </p>
    </div>

    <p class="email-text-secondary" style="margin: 24px 0 0 0; font-size: 13px; color: #b2b5c7;">
      If you didn't request this code, please ignore this email or contact support if you're concerned about your account security.
    </p>
  `;

  return baseTemplate(body, { previewText: `Your Kizuna verification code: ${data.otp}` });
}

