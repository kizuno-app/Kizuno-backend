import { baseTemplate, ctaButton, divider } from './base.template';
import { config } from '../../../shared/config';

/**
 * Welcome Email Template
 * Sent after a user successfully verifies their email address.
 */
export function welcomeTemplate(data: { name: string }): string {
  const clientUrl = config.clientUrl;

  const body = `
    <!-- SVG Welcome Illustration -->
    <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto 24px auto;">
      <rect x="5" y="5" width="110" height="90" fill="#faf9fc" stroke="#edeaf4" stroke-width="2" />
      <circle cx="60" cy="50" r="32" fill="#f3f0ff" />
      <!-- Overlapping chat bubbles representing Kizuna -->
      <rect x="40" y="32" width="34" height="24" fill="#ffffff" stroke="#6366f1" stroke-width="2" />
      <path d="M46 56L43 61L50 56H46Z" fill="#ffffff" stroke="#6366f1" stroke-width="2" stroke-linejoin="round" />
      
      <rect x="58" y="44" width="34" height="24" fill="#ffffff" stroke="#818cf8" stroke-width="2" />
      <path d="M78 68L81 73L74 68H78Z" fill="#ffffff" stroke="#818cf8" stroke-width="2" stroke-linejoin="round" />
      <!-- Stars -->
      <path d="M98 25L99 28L102 29L99 30L98 33L97 30L94 29L97 28L98 25Z" fill="#a78bfa" />
      <path d="M22 62L23 65L26 66L23 67L22 70L21 67L18 66L21 65L22 62Z" fill="#818cf8" />
    </svg>

    <!-- Greeting -->
    <h2 class="email-text" style="margin: 0 0 10px 0; font-size: 22px; font-weight: 800; color: #1b1833; text-align: center; letter-spacing: -0.5px;">
      Welcome to Kizuna!
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 28px 0; font-size: 15px; color: #575366; line-height: 1.7; text-align: center;">
      Hey <strong style="color: #6366f1;">${data.name}</strong>, we're thrilled to have you! Your account is verified and you're all set to start your journey on Kizuna.
    </p>

    ${divider()}

    <!-- Feature cards -->
    <p class="email-text" style="margin: 0 0 20px 0; font-size: 15px; font-weight: 700; color: #1b1833;">
      Here's what you can do next:
    </p>

    <!-- Card 1: Complete Profile -->
    <div style="background-color: #faf9fc; border: 1px solid #edeaf4; border-radius: 0px; padding: 20px; margin-bottom: 12px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td width="52" valign="top">
            <div style="background-color: #f3f0ff; border: 1px solid #e2dbfc; border-radius: 0px; width: 38px; height: 38px; line-height: 38px; text-align: center; font-size: 18px;">
              👤
            </div>
          </td>
          <td>
            <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #6366f1;">Complete Your Profile</p>
            <p style="margin: 0; font-size: 13px; color: #575366; line-height: 1.5;">Add your photo, bio, college, and interests to stand out in the community.</p>
          </td>
        </tr>
      </table>
    </div>

    <!-- Card 2: Discover -->
    <div style="background-color: #faf9fc; border: 1px solid #edeaf4; border-radius: 0px; padding: 20px; margin-bottom: 12px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td width="52" valign="top">
            <div style="background-color: #f3f0ff; border: 1px solid #e2dbfc; border-radius: 0px; width: 38px; height: 38px; line-height: 38px; text-align: center; font-size: 18px;">
              🔍
            </div>
          </td>
          <td>
            <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #6366f1;">Discover Communities</p>
            <p style="margin: 0; font-size: 13px; color: #575366; line-height: 1.5;">Find and join organizations, clubs, and groups that match your interests.</p>
          </td>
        </tr>
      </table>
    </div>

    <!-- Card 3: Connect -->
    <div style="background-color: #faf9fc; border: 1px solid #edeaf4; border-radius: 0px; padding: 20px; margin-bottom: 28px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td width="52" valign="top">
            <div style="background-color: #f3f0ff; border: 1px solid #e2dbfc; border-radius: 0px; width: 38px; height: 38px; line-height: 38px; text-align: center; font-size: 18px;">
              🤝
            </div>
          </td>
          <td>
            <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #6366f1;">Start Connecting</p>
            <p style="margin: 0; font-size: 13px; color: #575366; line-height: 1.5;">Follow people, share your thoughts, and build meaningful connections.</p>
          </td>
        </tr>
      </table>
    </div>

    <!-- CTA -->
    <div style="margin-top: 32px;">
      ${ctaButton('Get Started', clientUrl)}
    </div>
  `;


  return baseTemplate(body, { previewText: `Welcome to Kizuna, ${data.name}! Your account is verified.` });
}
