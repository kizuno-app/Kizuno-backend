import { baseTemplate, divider, statusBadge } from './base.template';

/**
 * Organization Application Received Template
 * Sent when an organization submits an application to join Kizuna.
 */
export function orgApplicationReceivedTemplate(data: { orgName: string; applicantName?: string }): string {
  const greeting = data.applicantName ? `Hi ${data.applicantName}` : 'Hello';

  const body = `
    <!-- SVG Onboarding Illustration -->
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto 24px auto;">
      <rect x="5" y="5" width="90" height="90" fill="#faf9fc" stroke="#edeaf4" stroke-width="2" />
      <circle cx="50" cy="50" r="32" fill="#f3f0ff" />
      <rect x="36" y="28" width="28" height="38" fill="#ffffff" stroke="#6366f1" stroke-width="2" />
      <rect x="43" y="24" width="14" height="6" fill="#f3f0ff" stroke="#6366f1" stroke-width="2" />
      <line x1="42" y1="39" x2="58" y2="39" stroke="#6366f1" stroke-width="2" stroke-linecap="round" />
      <line x1="42" y1="45" x2="58" y2="45" stroke="#6366f1" stroke-width="2" stroke-linecap="round" />
      <line x1="42" y1="51" x2="52" y2="51" stroke="#6366f1" stroke-width="2" stroke-linecap="round" />
    </svg>

    <!-- Greeting -->
    <h2 class="email-text" style="margin: 0 0 10px 0; font-size: 22px; font-weight: 800; color: #1b1833; text-align: center; letter-spacing: -0.5px;">
      Application Received
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 24px 0; font-size: 14px; color: #575366; line-height: 1.7; text-align: center;">
      ${greeting}, thank you for applying to register <strong style="color: #6366f1;">${data.orgName}</strong> on Kizuna.
    </p>

    ${divider()}

    <!-- Status Badge (No emoji) -->
    ${statusBadge('Under Review', 'pending')}

    <p class="email-text-secondary" style="margin: 24px 0 0 0; font-size: 14px; color: #575366; line-height: 1.7;">
      Your organization is currently under review by our team. We'll notify you once a decision has been made. This usually takes 1–3 business days.
    </p>

    <p class="email-text-secondary" style="margin: 16px 0 0 0; font-size: 13px; color: #b2b5c7;">
      If you have questions, feel free to reach out to our support team.
    </p>
  `;

  return baseTemplate(body, { previewText: `Your application for ${data.orgName} has been received` });
}

