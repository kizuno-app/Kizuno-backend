import { baseTemplate, ctaButton, divider } from './base.template';

/**
 * Organization Registration Reminder Template
 * Sent when an organization application remains PENDING for 24 hours.
 */
export function orgRegistrationReminderTemplate(data: { orgName: string; applicantName: string; clientUrl: string }): string {
  const loginUrl = `${data.clientUrl}/login`;

  const body = `
    <!-- Greeting -->
    <h2 class="email-text" style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #1e1b4b;">
      Complete Your Organization Registration
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 24px 0; font-size: 15px; color: #6b7280; line-height: 1.6;">
      Hi <strong style="color: #1e1b4b;">${data.applicantName}</strong>,
    </p>
    <p class="email-text-secondary" style="margin: 0 0 24px 0; font-size: 15px; color: #6b7280; line-height: 1.6;">
      We noticed you started registering <strong style="color: #1e1b4b;">${data.orgName}</strong> on Kizuna but haven't completed the process yet.
    </p>
    <p class="email-text-secondary" style="margin: 0 0 24px 0; font-size: 15px; color: #6b7280; line-height: 1.6;">
      To finish your application, please log back into your account and return to the onboarding wizard. 
      Please note that if the application remains pending and incomplete for more than 72 hours, the registration draft details (like logo and proof document) will be automatically deleted for data protection.
    </p>

    <!-- CTA -->
    ${ctaButton('Complete Registration', loginUrl)}

    ${divider()}

    <!-- Alt link -->
    <p class="email-text-secondary" style="margin: 0 0 12px 0; font-size: 13px; color: #6b7280; line-height: 1.6;">
      If the button doesn't work, copy and paste this link into your browser:
    </p>
    <p style="margin: 0 0 24px 0; word-break: break-all;">
      <a href="${loginUrl}" style="font-size: 13px; color: #7c3aed; text-decoration: underline;">${loginUrl}</a>
    </p>

    <p class="email-text-secondary" style="margin: 24px 0 0 0; font-size: 13px; color: #9ca3af;">
      If you didn't initiate this request, please contact our support team.
    </p>
  `;

  return baseTemplate(body, { previewText: `Finish registering ${data.orgName} on Kizuna` });
}
