import { baseTemplate, divider } from './base.template';

/**
 * Organization Rejected Template
 * Sent when an organization application is rejected by platform admin.
 */
export function orgRejectedTemplate(data: { orgName: string; applicantName?: string; reason?: string }): string {
  const greeting = data.applicantName ? `Hi ${data.applicantName}` : 'Hello';

  const body = `
    <!-- Icon -->
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="display: inline-block; background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%); border-radius: 50%; width: 64px; height: 64px; line-height: 64px; font-size: 28px;">
        📝
      </div>
    </div>

    <!-- Greeting -->
    <h2 class="email-text" style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #1e1b4b; text-align: center;">
      Organization Application Update
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 24px 0; font-size: 15px; color: #6b7280; line-height: 1.7; text-align: center;">
      ${greeting}, we've reviewed the application for <strong style="color: #1e1b4b;">${data.orgName}</strong>.
    </p>

    ${divider()}

    <!-- Status card -->
    <div style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border: 1px solid #fed7aa; border-radius: 12px; padding: 24px; text-align: center;">
      <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #c2410c; text-transform: uppercase; letter-spacing: 1px;">
        Status
      </p>
      <p style="margin: 0; font-size: 20px; font-weight: 800; color: #ea580c;">
        Requires Revision
      </p>
    </div>

    ${data.reason ? `
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin-top: 20px;">
      <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">
        Feedback
      </p>
      <p style="margin: 0; font-size: 14px; color: #334155; line-height: 1.6;">
        ${data.reason}
      </p>
    </div>
    ` : ''}

    <p class="email-text-secondary" style="margin: 24px 0 0 0; font-size: 14px; color: #6b7280; line-height: 1.7;">
      Your application requires revision. Please review the feedback above, make the necessary changes, and resubmit your application. We'd love to have you on Kizuna!
    </p>

    <p class="email-text-secondary" style="margin: 16px 0 0 0; font-size: 13px; color: #9ca3af;">
      If you have questions about this decision, please contact our support team.
    </p>
  `;

  return baseTemplate(body, { previewText: `Update on your ${data.orgName} application` });
}
