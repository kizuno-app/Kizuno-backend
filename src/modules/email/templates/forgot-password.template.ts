import { baseTemplate, ctaButton, divider } from './base.template';

/**
 * Forgot Password Email Template
 * Sent when a user requests a password reset.
 */
export function forgotPasswordTemplate(data: { name: string; resetUrl: string; expiryMinutes?: number }): string {
  const expiryText = data.expiryMinutes ? `${data.expiryMinutes} minutes` : '60 minutes';

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
      Reset Your Password
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 24px 0; font-size: 14px; color: #575366; line-height: 1.6;">
      Hi <strong style="color: #1b1833;">${data.name}</strong>, we received a request to reset the password for your Kizuna account. Click the button below to set a new password.
    </p>

    <!-- CTA -->
    <div style="margin: 32px 0;">
      ${ctaButton('Reset Password', data.resetUrl)}
    </div>

    ${divider()}

    <!-- Alt link -->
    <p class="email-text-secondary" style="margin: 0 0 8px 0; font-size: 13px; color: #8c899c; line-height: 1.6;">
      If the button doesn't work, copy and paste this link into your browser:
    </p>
    <p style="margin: 0 0 24px 0; word-break: break-all;">
      <a href="${data.resetUrl}" style="font-size: 13px; color: #6366f1; text-decoration: none; font-weight: 500;">${data.resetUrl}</a>
    </p>

    <!-- Expiry notice (Bolder design, no clock, no round corners) -->
    <div style="background-color: #fffdf5; border-left: 4px solid #f59e0b; border-top: 1px solid #fef3c7; border-bottom: 1px solid #fef3c7; border-right: 1px solid #fef3c7; padding: 16px 20px; margin: 20px 0; border-radius: 0px;">
      <p class="email-text-secondary" style="margin: 0; font-size: 13px; color: #b45309; line-height: 1.5; font-weight: 600;">
        This link expires in <strong>${expiryText}</strong>. After that, you'll need to request a new reset link.
      </p>
    </div>

    <p class="email-text-secondary" style="margin: 24px 0 0 0; font-size: 13px; color: #b2b5c7;">
      If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
    </p>
  `;

  return baseTemplate(body, { previewText: 'Reset your Kizuna password' });
}

