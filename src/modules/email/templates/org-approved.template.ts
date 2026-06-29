import { baseTemplate, ctaButton, divider, statusBadge } from './base.template';
import { config } from '../../../shared/config';

/**
 * Organization Approved Template
 * Sent when an organization application is approved by platform admin.
 */
export function orgApprovedTemplate(data: { orgName: string; applicantName?: string }): string {
  const greeting = data.applicantName ? `Hi ${data.applicantName}` : 'Hello';
  const clientUrl = config.clientUrl;

  const body = `
    <!-- SVG Onboarding Success Illustration -->
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto 24px auto;">
      <rect x="5" y="5" width="90" height="90" fill="#faf9fc" stroke="#edeaf4" stroke-width="2" />
      <circle cx="50" cy="50" r="32" fill="#f0fdf4" />
      <rect x="36" y="28" width="28" height="38" fill="#ffffff" stroke="#15803d" stroke-width="2" />
      <rect x="43" y="24" width="14" height="6" fill="#f0fdf4" stroke="#15803d" stroke-width="2" />
      <path d="M44 48L48 52L56 44" stroke="#15803d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

    <!-- Greeting -->
    <h2 class="email-text" style="margin: 0 0 10px 0; font-size: 22px; font-weight: 800; color: #1b1833; text-align: center; letter-spacing: -0.5px;">
      Organization Approved!
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 24px 0; font-size: 14px; color: #575366; line-height: 1.7; text-align: center;">
      ${greeting}, congratulations! <strong style="color: #6366f1;">${data.orgName}</strong> is now verified and active on Kizuna.
    </p>

    ${divider()}

    <!-- Status Badge (No emoji) -->
    ${statusBadge('Verified & Active', 'success')}

    <p class="email-text-secondary" style="margin: 24px 0 24px 0; font-size: 14px; color: #575366; line-height: 1.7;">
      Your organization can now create posts, manage members, and engage with the Kizuna community. Welcome aboard!
    </p>

    <!-- CTA -->
    <div style="margin-top: 32px;">
      ${ctaButton('Go to Dashboard', clientUrl)}
    </div>
  `;

  return baseTemplate(body, { previewText: `${data.orgName} has been approved on Kizuna!` });
}

