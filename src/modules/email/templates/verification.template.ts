import { baseTemplate, ctaButton, divider } from './base.template';

/**
 * Email Verification Template
 * Sent when a user registers and needs to verify their email address.
 */
export function verificationTemplate(data: { name: string; verificationUrl: string; expiryHours?: number }): string {
  const expiryText = data.expiryHours ? `${data.expiryHours} hours` : '24 hours';

  const body = `
    <!-- Greeting -->
    <h2 class="email-text" style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #1e1b4b;">
      Verify Your Email
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 24px 0; font-size: 15px; color: #6b7280; line-height: 1.6;">
      Hi <strong style="color: #1e1b4b;">${data.name}</strong>, welcome to Kizuna! Please verify your email address to activate your account and start connecting.
    </p>

    <!-- CTA -->
    ${ctaButton('Verify My Email', data.verificationUrl)}

    ${divider()}

    <!-- Alt link -->
    <p class="email-text-secondary" style="margin: 0 0 12px 0; font-size: 13px; color: #6b7280; line-height: 1.6;">
      If the button doesn't work, copy and paste this link into your browser:
    </p>
    <p style="margin: 0 0 24px 0; word-break: break-all;">
      <a href="${data.verificationUrl}" style="font-size: 13px; color: #7c3aed; text-decoration: underline;">${data.verificationUrl}</a>
    </p>

    <!-- Expiry notice -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 10px; padding: 16px 20px;">
      <p class="email-text-secondary" style="margin: 0; font-size: 13px; color: #6b21a8; line-height: 1.5;">
        ⏰ This verification link expires in <strong>${expiryText}</strong>. If it expires, you can request a new one from the login page.
      </p>
    </div>

    <p class="email-text-secondary" style="margin: 24px 0 0 0; font-size: 13px; color: #9ca3af;">
      If you didn't create a Kizuna account, please ignore this email.
    </p>
  `;

  return baseTemplate(body, { previewText: 'Verify your email to get started on Kizuna' });
}
