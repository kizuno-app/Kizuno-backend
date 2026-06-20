import { baseTemplate, ctaButton, divider } from './base.template';
import { config } from '../../../shared/config';

/**
 * Organization Approved Template
 * Sent when an organization application is approved by platform admin.
 */
export function orgApprovedTemplate(data: { orgName: string; applicantName?: string }): string {
  const greeting = data.applicantName ? `Hi ${data.applicantName}` : 'Hello';
  const clientUrl = config.clientUrl;

  const body = `
    <!-- Icon -->
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="display: inline-block; font-size: 48px; line-height: 1;">
        🎊
      </div>
    </div>

    <!-- Greeting -->
    <h2 class="email-text" style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #1e1b4b; text-align: center;">
      Organization Approved!
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 24px 0; font-size: 15px; color: #6b7280; line-height: 1.7; text-align: center;">
      ${greeting}, congratulations! <strong style="color: #4c1d95;">${data.orgName}</strong> is now verified and active on Kizuna.
    </p>

    ${divider()}

    <!-- Success card -->
    <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 1px solid #bbf7d0; border-radius: 12px; padding: 24px; text-align: center;">
      <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #166534; text-transform: uppercase; letter-spacing: 1px;">
        Status
      </p>
      <p style="margin: 0; font-size: 20px; font-weight: 800; color: #15803d;">
        ✅ Verified & Active
      </p>
    </div>

    <p class="email-text-secondary" style="margin: 24px 0 24px 0; font-size: 14px; color: #6b7280; line-height: 1.7;">
      Your organization can now create posts, manage members, and engage with the Kizuna community. Welcome aboard!
    </p>

    <!-- CTA -->
    ${ctaButton('Go to Dashboard', clientUrl)}
  `;

  return baseTemplate(body, { previewText: `${data.orgName} has been approved on Kizuna!` });
}
