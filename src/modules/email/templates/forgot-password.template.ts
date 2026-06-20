import { baseTemplate, ctaButton, divider } from './base.template';

/**
 * Forgot Password Email Template
 * Sent when a user requests a password reset.
 */
export function forgotPasswordTemplate(data: { name: string; resetUrl: string; expiryMinutes?: number }): string {
  const expiryText = data.expiryMinutes ? `${data.expiryMinutes} minutes` : '60 minutes';

  const body = `
    <!-- Greeting -->
    <h2 class="email-text" style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #1e1b4b;">
      Reset Your Password
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 24px 0; font-size: 15px; color: #6b7280; line-height: 1.6;">
      Hi <strong style="color: #1e1b4b;">${data.name}</strong>, we received a request to reset the password for your Kizuna account. Click the button below to set a new password.
    </p>

    <!-- CTA -->
    ${ctaButton('Reset Password', data.resetUrl)}

    ${divider()}

    <!-- Alt link -->
    <p class="email-text-secondary" style="margin: 0 0 12px 0; font-size: 13px; color: #6b7280; line-height: 1.6;">
      If the button doesn't work, copy and paste this link into your browser:
    </p>
    <p style="margin: 0 0 24px 0; word-break: break-all;">
      <a href="${data.resetUrl}" style="font-size: 13px; color: #7c3aed; text-decoration: underline;">${data.resetUrl}</a>
    </p>

    <!-- Expiry notice -->
    <div style="background-color: #fff7ed; border: 1px solid #fed7aa; border-radius: 10px; padding: 16px 20px;">
      <p class="email-text-secondary" style="margin: 0; font-size: 13px; color: #c2410c; line-height: 1.5;">
        ⏰ This link expires in <strong>${expiryText}</strong>. After that, you'll need to request a new reset link.
      </p>
    </div>

    <p class="email-text-secondary" style="margin: 24px 0 0 0; font-size: 13px; color: #9ca3af;">
      If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
    </p>
  `;

  return baseTemplate(body, { previewText: 'Reset your Kizuna password' });
}
