/**
 * Central Environment Configuration Parser (Zod Enforced)
 * Ensures fail-fast validation at application build and startup.
 */

import { z } from 'zod';

const envSchema = z.object({
  // Runtime & Node
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),

  // Persistence (Postgres & Redis)
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  REDIS_URL: z.string().min(1, 'REDIS_URL is required'),

  // Cryptographic Keys
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters long'),
  PII_ENCRYPTION_KEY: z.string().length(64, 'PII_ENCRYPTION_KEY must be a 32-byte hex string (64 chars)'),

  // Payment Gateways
  CASHFREE_MODE: z.enum(['TEST', 'PROD']).default('TEST'),
  CASHFREE_APP_ID: z.string().default('TEST_APP_ID_MOCK_SANDBOX'),
  CASHFREE_SECRET_KEY: z.string().default('TEST_SECRET_KEY_MOCK_SANDBOX'),
  CASHFREE_WEBHOOK_SECRET: z.string().default('TEST_WEBHOOK_SECRET_MOCK_SANDBOX'),

  // Logistics & Communications
  SHIPROCKET_EMAIL: z.string().email().default('sandbox_logistics@auralifestyle.in'),
  SHIPROCKET_PASSWORD: z.string().default('mock_shiprocket_password'),
  SHIPROCKET_WEBHOOK_TOKEN: z.string().default('mock_shiprocket_webhook_token'),

  MSG91_AUTH_KEY: z.string().default('mock_msg91_auth_key'),
  MSG91_OTP_TEMPLATE_ID: z.string().default('mock_otp_template_id'),
  MSG91_SENDER_ID: z.string().default('AURA'),

  RESEND_API_KEY: z.string().default('re_mock_api_key_test_sandbox'),
  EMAIL_FROM_ADDRESS: z.string().default('orders@auralifestyle.in'),

  // Cloud Storage & AI
  R2_ACCOUNT_ID: z.string().default('mock_r2_account_id'),
  R2_ACCESS_KEY_ID: z.string().default('mock_r2_access_key_id'),
  R2_SECRET_ACCESS_KEY: z.string().default('mock_r2_secret_access_key'),
  R2_BUCKET_NAME: z.string().default('aura-dev-media'),
  NEXT_PUBLIC_R2_PUBLIC_URL: z.string().default('http://localhost:3000/mock-media'),

  GEMINI_API_KEY: z.string().default('mock_gemini_api_key_sandbox'),
  LOG_LEVEL: z.string().default('info'),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function getValidatedEnv(): EnvConfig {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error('[FATAL CONFIG ERROR]: Invalid or missing environment variables:\n', result.error.format());
    throw new Error('Environment configuration validation failed.');
  }
  return result.data;
}
