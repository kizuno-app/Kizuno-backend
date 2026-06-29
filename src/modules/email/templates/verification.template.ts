import { baseTemplate, ctaButton, divider } from './base.template';

/**
 * Email Verification Template
 * Sent when a user registers and needs to verify their email address.
 */
export function verificationTemplate(data: { name: string; verificationUrl: string; expiryHours?: number }): string {
  const expiryText = data.expiryHours ? `${data.expiryHours} hours` : '24 hours';

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
      Verify Your Email
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 24px 0; font-size: 14px; color: #575366; line-height: 1.6;">
      Hi <strong style="color: #1b1833;">${data.name}</strong>, welcome to Kizuna! Please verify your email address to activate your account and start connecting.
    </p>

    <!-- CTA -->
    <div style="margin: 32px 0;">
      ${ctaButton('Verify My Email', data.verificationUrl)}
    </div>

    ${divider()}

    <!-- Alt link -->
    <p class="email-text-secondary" style="margin: 0 0 8px 0; font-size: 13px; color: #8c899c; line-height: 1.6;">
      If the button doesn't work, copy and paste this link into your browser:
    </p>
    <p style="margin: 0 0 24px 0; word-break: break-all;">
      <a href="${data.verificationUrl}" style="font-size: 13px; color: #6366f1; text-decoration: none; font-weight: 500;">${data.verificationUrl}</a>
    </p>

    <!-- Expiry notice (Bolder design, no clock, no round corners) -->
    <div style="background-color: #faf9fc; border-left: 4px solid #6366f1; border-top: 1px solid #edeaf4; border-bottom: 1px solid #edeaf4; border-right: 1px solid #edeaf4; padding: 16px 20px; margin: 20px 0; border-radius: 0px;">
      <p class="email-text-secondary" style="margin: 0; font-size: 13px; color: #6366f1; line-height: 1.5; font-weight: 600;">
        This verification link expires in <strong>${expiryText}</strong>. If it expires, you can request a new one from the login page.
      </p>
    </div>

    <p class="email-text-secondary" style="margin: 24px 0 0 0; font-size: 13px; color: #b2b5c7;">
      If you didn't create a Kizuna account, please ignore this email.
    </p>
  `;

  return baseTemplate(body, { previewText: 'Verify your email to get started on Kizuna' });
}

