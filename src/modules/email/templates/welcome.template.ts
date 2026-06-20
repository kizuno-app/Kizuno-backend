import { baseTemplate, ctaButton, divider } from './base.template';
import { config } from '../../../shared/config';

/**
 * Welcome Email Template
 * Sent after a user successfully verifies their email address.
 */
export function welcomeTemplate(data: { name: string }): string {
  const clientUrl = config.clientUrl;

  const body = `
    <!-- Celebration icon -->
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="display: inline-block; font-size: 48px; line-height: 1;">
        🎉
      </div>
    </div>

    <!-- Greeting -->
    <h2 class="email-text" style="margin: 0 0 8px 0; font-size: 26px; font-weight: 800; color: #1e1b4b; text-align: center;">
      Welcome to Kizuna!
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 28px 0; font-size: 16px; color: #6b7280; line-height: 1.7; text-align: center;">
      Hey <strong style="color: #7c3aed;">${data.name}</strong>, we're thrilled to have you! Your account is verified and you're all set to start your journey on Kizuna.
    </p>

    ${divider()}

    <!-- Feature cards -->
    <p class="email-text" style="margin: 0 0 20px 0; font-size: 16px; font-weight: 700; color: #1e1b4b;">
      Here's what you can do next:
    </p>

    <!-- Card 1: Complete Profile -->
    <div style="background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border-radius: 12px; padding: 20px; margin-bottom: 12px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td width="40" valign="top" style="font-size: 24px;">👤</td>
          <td>
            <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: #4c1d95;">Complete Your Profile</p>
            <p style="margin: 0; font-size: 13px; color: #6b7280; line-height: 1.5;">Add your photo, bio, college, and interests to stand out in the community.</p>
          </td>
        </tr>
      </table>
    </div>

    <!-- Card 2: Discover -->
    <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 20px; margin-bottom: 12px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td width="40" valign="top" style="font-size: 24px;">🔍</td>
          <td>
            <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: #1e40af;">Discover Communities</p>
            <p style="margin: 0; font-size: 13px; color: #6b7280; line-height: 1.5;">Find and join organizations, clubs, and groups that match your interests.</p>
          </td>
        </tr>
      </table>
    </div>

    <!-- Card 3: Connect -->
    <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 20px; margin-bottom: 28px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td width="40" valign="top" style="font-size: 24px;">🤝</td>
          <td>
            <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: #166534;">Start Connecting</p>
            <p style="margin: 0; font-size: 13px; color: #6b7280; line-height: 1.5;">Follow people, share your thoughts, and build meaningful connections.</p>
          </td>
        </tr>
      </table>
    </div>

    <!-- CTA -->
    ${ctaButton('Get Started', clientUrl)}
  `;

  return baseTemplate(body, { previewText: `Welcome to Kizuna, ${data.name}! Your account is verified.` });
}
