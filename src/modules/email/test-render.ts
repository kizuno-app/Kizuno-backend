import * as fs from 'fs';
import * as path from 'path';
import { EmailTemplateService } from './services/email-template.service';
import { EmailTemplate } from './constants/email.constants';

const outputDir = path.join(__dirname, '../../../temp-email-renders');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const mockData = {
  name: 'Aahan Arya',
  verificationUrl: 'https://kizuna.app/verify?token=mock-token',
  resetUrl: 'https://kizuna.app/reset-password?token=mock-token',
  otp: '843921',
  purpose: 'EMAIL_VERIFICATION',
  expiryMinutes: 15,
  expiryHours: 24,
  orgName: 'Aaahan',
  applicantName: 'Aahan Arya',
  reason: 'The proof of registration document uploaded is illegible. Please submit a high-quality scan or photo of your official college organization charter.',
  alertType: 'NEW_LOGIN_DEVICE',
  device: 'Apple iPhone 15 Pro',
  browser: 'Mobile Safari 17.2',
  ip: '192.168.1.45',
  time: 'June 27, 2026 at 11:30 AM IST',
  location: 'Mumbai, Maharashtra, India',
};

const templates = [
  { name: 'verification', type: EmailTemplate.VERIFICATION },
  { name: 'otp', type: EmailTemplate.OTP },
  { name: 'forgot-password', type: EmailTemplate.FORGOT_PASSWORD },
  { name: 'password-changed', type: EmailTemplate.PASSWORD_CHANGED },
  { name: 'welcome', type: EmailTemplate.WELCOME },
  { name: 'org-application-received', type: EmailTemplate.ORG_APPLICATION_RECEIVED },
  { name: 'org-approved', type: EmailTemplate.ORG_APPROVED },
  { name: 'org-rejected', type: EmailTemplate.ORG_REJECTED },
  { name: 'security-alert', type: EmailTemplate.SECURITY_ALERT },
  { name: 'org-registration-reminder', type: EmailTemplate.ORG_REGISTRATION_REMINDER },
];

console.log('Rendering email templates...');

templates.forEach(({ name, type }) => {
  try {
    const html = EmailTemplateService.render(type, mockData);
    const filePath = path.join(outputDir, `${name}.html`);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Rendered ${name} -> ${filePath}`);
  } catch (error) {
    console.error(`Failed to render ${name}:`, error);
  }
});

console.log('Done!');
