import { baseTemplate, divider } from './base.template';

/**
 * Organization Application Received Template
 * Sent when an organization submits an application to join Kizuna.
 */
export function orgApplicationReceivedTemplate(data: { orgName: string; applicantName?: string }): string {
  const greeting = data.applicantName ? `Hi ${data.applicantName}` : 'Hello';

  const body = `
    <!-- Icon -->
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="display: inline-block; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 50%; width: 64px; height: 64px; line-height: 64px; font-size: 28px;">
        📋
      </div>
    </div>

    <!-- Greeting -->
    <h2 class="email-text" style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #1e1b4b; text-align: center;">
      Application Received
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 24px 0; font-size: 15px; color: #6b7280; line-height: 1.7; text-align: center;">
      ${greeting}, thank you for applying to register <strong style="color: #1e1b4b;">${data.orgName}</strong> on Kizuna.
    </p>

    ${divider()}

    <!-- Status card -->
    <div style="background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border: 1px solid #ddd6fe; border-radius: 12px; padding: 24px; text-align: center;">
      <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #6b21a8; text-transform: uppercase; letter-spacing: 1px;">
        Application Status
      </p>
      <p style="margin: 0; font-size: 20px; font-weight: 800; color: #4c1d95;">
        Under Review ⏳
      </p>
    </div>

    <p class="email-text-secondary" style="margin: 24px 0 0 0; font-size: 14px; color: #6b7280; line-height: 1.7;">
      Your organization is currently under review by our team. We'll notify you once a decision has been made. This usually takes 1–3 business days.
    </p>

    <p class="email-text-secondary" style="margin: 16px 0 0 0; font-size: 13px; color: #9ca3af;">
      If you have questions, feel free to reach out to our support team.
    </p>
  `;

  return baseTemplate(body, { previewText: `Your application for ${data.orgName} has been received` });
}
