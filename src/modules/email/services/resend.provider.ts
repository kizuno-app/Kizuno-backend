import { Resend } from 'resend';
import { config } from '../../../shared/config';

/**
 * Resend Email Provider
 * Wraps the Resend SDK with graceful error handling and structured logging.
 * Reads API key from environment variables — never hardcoded.
 */
class ResendProvider {
  private static instance: ResendProvider;
  private client: Resend | null = null;
  private initialized = false;

  private constructor() {
    this.initialize();
  }

  private initialize(): void {
    const apiKey = config.email.resendApiKey;

    if (!apiKey) {
      console.warn('[EmailProvider] RESEND_API_KEY is not set. Emails will be logged but not sent.');
      this.initialized = false;
      return;
    }

    try {
      this.client = new Resend(apiKey);
      this.initialized = true;
      console.log('[EmailProvider] Resend client initialized successfully');
    } catch (error) {
      console.error('[EmailProvider] Failed to initialize Resend client:', error);
      this.initialized = false;
    }
  }

  public static getInstance(): ResendProvider {
    if (!ResendProvider.instance) {
      ResendProvider.instance = new ResendProvider();
    }
    return ResendProvider.instance;
  }

  /**
   * Send an email via Resend API
   * Returns { id } on success or { error } on failure
   */
  public async sendEmail(
    to: string,
    subject: string,
    html: string,
    from?: string
  ): Promise<{ id?: string; error?: string }> {
    if (!this.initialized || !this.client) {
      const msg = 'Resend client not initialized — email skipped';
      console.warn(`[EmailProvider] ${msg}. To: ${to}, Subject: ${subject}`);
      return { error: msg };
    }

    const sender = from || config.email.fromGeneral;

    try {
      const response = await this.client.emails.send({
        from: sender,
        to: [to],
        subject,
        html,
        replyTo: config.email.mailReplyTo,
      });

      if (response.error) {
        console.error(`[EmailProvider] Resend API error for ${to}:`, response.error);
        return { error: response.error.message || 'Resend API error' };
      }

      console.log(`[EmailProvider] Email sent successfully to ${to}. ID: ${response.data?.id}`);
      return { id: response.data?.id };
    } catch (error: any) {
      const errorMessage = error?.message || 'Unknown error sending email';
      console.error(`[EmailProvider] Failed to send email to ${to}:`, errorMessage);
      return { error: errorMessage };
    }
  }

  /**
   * Check if the provider is ready to send emails
   */
  public isReady(): boolean {
    return this.initialized && this.client !== null;
  }
}

export const resendProvider = ResendProvider.getInstance();
