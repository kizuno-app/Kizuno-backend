import { baseTemplate, divider, statusBadge } from './base.template';

/**
 * Organization Rejected Template
 * Sent when an organization application is rejected by platform admin.
 */
export function orgRejectedTemplate(data: { orgName: string; applicantName?: string; reason?: string }): string {
  const greeting = data.applicantName ? `Hi ${data.applicantName}` : 'Hello';

  const body = `
    <!-- SVG Onboarding Rejection Illustration -->
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto 24px auto;">
      <rect x="5" y="5" width="90" height="90" fill="#faf9fc" stroke="#edeaf4" stroke-width="2" />
      <circle cx="50" cy="50" r="32" fill="#fffbeb" />
      <rect x="36" y="28" width="28" height="38" fill="#ffffff" stroke="#b45309" stroke-width="2" />
      <rect x="43" y="24" width="14" height="6" fill="#fffbeb" stroke="#b45309" stroke-width="2" />
      <!-- Draw warning sign inside document -->
      <line x1="50" y1="40" x2="50" y2="52" stroke="#b45309" stroke-width="2.5" stroke-linecap="round" />
      <circle cx="50" cy="59" r="1.5" fill="#b45309" />
    </svg>

    <!-- Greeting -->
    <h2 class="email-text" style="margin: 0 0 10px 0; font-size: 22px; font-weight: 800; color: #1b1833; text-align: center; letter-spacing: -0.5px;">
      Application Status Update
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 24px 0; font-size: 14px; color: #575366; line-height: 1.7; text-align: center;">
      ${greeting}, we've reviewed the application for <strong style="color: #1b1833;">${data.orgName}</strong>.
    </p>

    ${divider()}

    <!-- Status Badge -->
    ${statusBadge('Requires Revision', 'warning')}

    ${data.reason ? `
    <div style="background-color: #faf9fc; border-left: 4px solid #f59e0b; border-top: 1px solid #edeaf4; border-bottom: 1px solid #edeaf4; border-right: 1px solid #edeaf4; padding: 20px; margin-top: 20px; border-radius: 0px;">
      <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 700; color: #8c899c; text-transform: uppercase; letter-spacing: 0.8px;">
        Feedback
      </p>
      <p style="margin: 0; font-size: 13px; color: #575366; line-height: 1.6;">
        ${data.reason}
      </p>
    </div>
    ` : ''}

    <p class="email-text-secondary" style="margin: 24px 0 0 0; font-size: 14px; color: #575366; line-height: 1.7;">
      Your application requires revision. Please review the feedback above, make the necessary changes, and resubmit your application. We'd love to have you on Kizuna!
    </p>

    <p class="email-text-secondary" style="margin: 16px 0 0 0; font-size: 13px; color: #b2b5c7;">
      If you have questions about this decision, please contact our support team.
    </p>
  `;

  return baseTemplate(body, { previewText: `Update on your ${data.orgName} application` });
}

