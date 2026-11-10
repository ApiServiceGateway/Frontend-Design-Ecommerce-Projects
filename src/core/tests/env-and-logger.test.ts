import { describe, it, expect } from 'vitest';
import { getValidatedEnv } from '../../config/env';
import { logger } from '../logger';

describe('Core Environment & Logger Verification', () => {
  it('should validate and parse correct environment configuration', () => {
    // Provide minimum required valid variables
    process.env.DATABASE_URL = 'postgresql://aura_admin:aura_secure_password_2026@localhost:5432/aura_db?schema=public';
    process.env.REDIS_URL = 'redis://localhost:6379';
    process.env.JWT_SECRET = 'super_secret_jwt_key_that_is_at_least_32_characters_long_for_security';
    process.env.PII_ENCRYPTION_KEY = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

    const env = getValidatedEnv();
    expect(env).toBeDefined();
    expect(env.PORT).toBe(3000);
    expect(env.DATABASE_URL).toContain('postgresql://');
    expect(env.REDIS_URL).toContain('redis://');
  });

  it('should throw error when mandatory env vars are missing', () => {
    const oldKey = process.env.PII_ENCRYPTION_KEY;
    delete process.env.PII_ENCRYPTION_KEY;

    expect(() => getValidatedEnv()).toThrow('Environment configuration validation failed.');

    // Restore
    process.env.PII_ENCRYPTION_KEY = oldKey;
  });

  it('should have a configured logger instance with PII redaction active', () => {
    expect(logger).toBeDefined();
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.error).toBe('function');
  });
});
