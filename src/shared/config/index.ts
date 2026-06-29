import dotenv from 'dotenv';

dotenv.config();

/**
 * Parse allowed origins from ALLOWED_ORIGINS env var (comma-separated)
 * Falls back to CLIENT_URL if ALLOWED_ORIGINS is not set
 */
function parseAllowedOrigins(): string[] {
  const allowedOrigins = process.env.ALLOWED_ORIGINS;
  if (allowedOrigins) {
    return allowedOrigins.split(',').map(origin => origin.trim()).filter(Boolean);
  }
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
  return [clientUrl];
}

function parseRedisUrl(): string {
  let url = process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_URL || 'redis://localhost:6379';
  if (url.includes('.upstash.io') && url.startsWith('redis://')) {
    console.log('[Redis Config] Upstash endpoint detected, converting connection protocol to secure rediss://');
    url = url.replace(/^redis:/, 'rediss:');
  }
  return url;
}

export const config = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL || '',
  },
  redis: {
    url: parseRedisUrl(),
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'super-secret-fallback-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'super-secret-refresh-key',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  allowedOrigins: parseAllowedOrigins(),
  email: {
    resendApiKey: process.env.RESEND_API_KEY || '',
    mailReplyTo: process.env.MAIL_REPLY_TO || 'support@kizuna.app',
    fromAuth: process.env.MAIL_FROM_AUTH || 'Kizuna Auth <noreply@auth.kizuna.app>',
    fromOrg: process.env.MAIL_FROM_ORG || 'Kizuna Org <onboarding@org.kizuna.app>',
    fromSecurity: process.env.MAIL_FROM_SECURITY || 'Kizuna Security <security@auth.kizuna.app>',
    fromGeneral: process.env.MAIL_FROM_GENERAL || 'Kizuna <hello@kizuna.app>',
    verificationTokenExpiry: 24 * 60 * 60 * 1000,  // 24 hours in ms
    passwordResetTokenExpiry: 60 * 60 * 1000,       // 1 hour in ms
    otpExpiry: 10 * 60,                              // 10 minutes in seconds (Redis TTL)
    otpResendCooldown: 60,                           // 60 seconds
    verificationResendCooldown: 60,                  // 60 seconds
    passwordResetCooldown: 60,                       // 60 seconds
  },
};
