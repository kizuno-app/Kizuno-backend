import { baseTemplate, ctaButton, divider } from './base.template';

/**
 * Organization Registration Reminder Template
 * Sent when an organization application remains PENDING for 24 hours.
 */
export function orgRegistrationReminderTemplate(data: { orgName: string; applicantName: string; clientUrl: string }): string {
  const loginUrl = `${data.clientUrl}/login`;

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
    <h2 class="email-text" style="margin: 0 0 10px 0; font-size: 22px; font-weight: 800; color: #1b1833; letter-spacing: -0.5px;">
      Complete Registration
    </h2>
    <p class="email-text-secondary" style="margin: 0 0 16px 0; font-size: 14px; color: #575366; line-height: 1.6;">
      Hi <strong style="color: #1b1833;">${data.applicantName}</strong>,
    </p>
    <p class="email-text-secondary" style="margin: 0 0 16px 0; font-size: 14px; color: #575366; line-height: 1.6;">
      We noticed you started registering <strong style="color: #1b1833;">${data.orgName}</strong> on Kizuna but haven't completed the process yet.
    </p>
    <p class="email-text-secondary" style="margin: 0 0 20px 0; font-size: 14px; color: #575366; line-height: 1.6;">
      To finish your application, please log back into your account and return to the onboarding wizard.
    </p>

    <!-- Expiry warning callout (Bolder design, no clock, no round corners) -->
    <div style="background-color: #fffdf5; border-left: 4px solid #f59e0b; border-top: 1px solid #fef3c7; border-bottom: 1px solid #fef3c7; border-right: 1px solid #fef3c7; padding: 16px 20px; margin: 20px 0; border-radius: 0px;">
      <p class="email-text-secondary" style="margin: 0; font-size: 13px; color: #b45309; line-height: 1.5; font-weight: 600;">
        Please note that if the application remains pending and incomplete for more than 72 hours, the registration draft details (like logo and proof document) will be automatically deleted for data protection.
      </p>
    </div>

    <!-- CTA -->
    <div style="margin: 32px 0;">
      ${ctaButton('Complete Registration', loginUrl)}
    </div>


    ${divider()}

    <!-- Alt link -->
    <p class="email-text-secondary" style="margin: 0 0 8px 0; font-size: 13px; color: #8c899c; line-height: 1.6;">
      If the button doesn't work, copy and paste this link into your browser:
    </p>
    <p style="margin: 0 0 24px 0; word-break: break-all;">
      <a href="${loginUrl}" style="font-size: 13px; color: #6366f1; text-decoration: none; font-weight: 500;">${loginUrl}</a>
    </p>

    <p class="email-text-secondary" style="margin: 24px 0 0 0; font-size: 13px; color: #b2b5c7;">
      If you didn't initiate this request, please contact our support team.
    </p>
  `;

  return baseTemplate(body, { previewText: `Finish registering ${data.orgName} on Kizuna` });
}

