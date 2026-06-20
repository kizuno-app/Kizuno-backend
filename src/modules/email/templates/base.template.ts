/**
 * Base Email Template
 * Shared layout with Kizuna branding — header, footer, social placeholders.
 * All templates wrap their content inside this base layout.
 *
 * Brand: KIZUNA
 * Theme: Deep Indigo #1e1b4b, Royal Purple #7c3aed, Electric Blue #3b82f6
 */

export interface BaseTemplateOptions {
  previewText?: string;
}

export function baseTemplate(bodyContent: string, options: BaseTemplateOptions = {}): string {
  const previewText = options.previewText || '';

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Kizuna</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    /* Reset */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; }

    /* Typography */
    body, td, th {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }

    /* Prevent link color override */
    a { color: inherit; }

    /* Dark mode styles */
    @media (prefers-color-scheme: dark) {
      .email-body { background-color: #0f0d1a !important; }
      .email-card { background-color: #1a1730 !important; border-color: #2d2a4a !important; }
      .email-text { color: #e2e0ea !important; }
      .email-text-secondary { color: #a8a3bf !important; }
      .email-header-bg { background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%) !important; }
      .email-footer-bg { background-color: #0f0d1a !important; }
      .email-divider { border-color: #2d2a4a !important; }
    }

    /* Responsive */
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; padding: 0 16px !important; }
      .email-card { padding: 28px 20px !important; }
      .email-header { padding: 24px 20px !important; }
      .cta-button { padding: 14px 28px !important; font-size: 15px !important; }
      .otp-code { font-size: 28px !important; letter-spacing: 6px !important; padding: 16px 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f0f5;">
  <!-- Preview text (hidden) -->
  ${previewText ? `<div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">${previewText}</div>` : ''}
  
  <!-- Outer wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f0f5;" class="email-body">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        
        <!-- Container -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" class="email-container" style="max-width: 600px; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td class="email-header email-header-bg" style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 70%, #1e1b4b 100%); border-radius: 16px 16px 0 0; padding: 32px 40px; text-align: center;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <!-- Logo text -->
                    <h1 style="margin: 0; font-size: 28px; font-weight: 800; color: #ffffff; letter-spacing: 2px; text-transform: uppercase;">
                      ✦ KIZUNA
                    </h1>
                    <p style="margin: 6px 0 0 0; font-size: 12px; color: rgba(255,255,255,0.7); letter-spacing: 1.5px; text-transform: uppercase;">
                      Connecting Beyond Boundaries
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td class="email-card" style="background-color: #ffffff; padding: 40px; border-left: 1px solid #e8e6f0; border-right: 1px solid #e8e6f0;">
              ${bodyContent}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="email-footer-bg" style="background-color: #1e1b4b; border-radius: 0 0 16px 16px; padding: 32px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <!-- Social Links -->
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 0 8px;">
                          <a href="#" style="color: rgba(255,255,255,0.6); font-size: 13px; text-decoration: none;">Twitter</a>
                        </td>
                        <td style="color: rgba(255,255,255,0.3); font-size: 13px;">•</td>
                        <td style="padding: 0 8px;">
                          <a href="#" style="color: rgba(255,255,255,0.6); font-size: 13px; text-decoration: none;">Instagram</a>
                        </td>
                        <td style="color: rgba(255,255,255,0.3); font-size: 13px;">•</td>
                        <td style="padding: 0 8px;">
                          <a href="#" style="color: rgba(255,255,255,0.6); font-size: 13px; text-decoration: none;">LinkedIn</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding-bottom: 20px;">
                    <hr class="email-divider" style="border: none; border-top: 1px solid rgba(255,255,255,0.15); margin: 0;">
                  </td>
                </tr>

                <!-- Tagline -->
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.85); letter-spacing: 0.5px;">
                      Kizuna — Connecting Beyond Boundaries
                    </p>
                  </td>
                </tr>

                <!-- Links -->
                <tr>
                  <td align="center" style="padding-bottom: 16px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 0 10px;">
                          <a href="#" style="color: rgba(255,255,255,0.5); font-size: 12px; text-decoration: none;">Privacy Policy</a>
                        </td>
                        <td style="color: rgba(255,255,255,0.25); font-size: 12px;">|</td>
                        <td style="padding: 0 10px;">
                          <a href="#" style="color: rgba(255,255,255,0.5); font-size: 12px; text-decoration: none;">Terms of Service</a>
                        </td>
                        <td style="color: rgba(255,255,255,0.25); font-size: 12px;">|</td>
                        <td style="padding: 0 10px;">
                          <a href="mailto:support@kizuna.app" style="color: rgba(255,255,255,0.5); font-size: 12px; text-decoration: none;">Support</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Copyright -->
                <tr>
                  <td align="center">
                    <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.35);">
                      © ${new Date().getFullYear()} Kizuna. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Helper: Generate a CTA button
 */
export function ctaButton(text: string, url: string, variant: 'primary' | 'secondary' = 'primary'): string {
  const bgColor = variant === 'primary'
    ? 'background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%);'
    : 'background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);';

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
      <tr>
        <td align="center" style="border-radius: 12px; ${bgColor}">
          <a href="${url}" target="_blank" class="cta-button" style="display: inline-block; padding: 16px 36px; font-size: 16px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 12px; letter-spacing: 0.3px;">
            ${text}
          </a>
        </td>
      </tr>
    </table>
  `;
}

/**
 * Helper: Section divider
 */
export function divider(): string {
  return `<hr class="email-divider" style="border: none; border-top: 1px solid #e8e6f0; margin: 28px 0;">`;
}

/**
 * Helper: Info row with label and value (for security alerts, device info, etc.)
 */
export function infoRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding: 8px 0;">
        <span class="email-text-secondary" style="font-size: 13px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">${label}</span>
        <br>
        <span class="email-text" style="font-size: 15px; color: #1e1b4b; font-weight: 500;">${value}</span>
      </td>
    </tr>
  `;
}
