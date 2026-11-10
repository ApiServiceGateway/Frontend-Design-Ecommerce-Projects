import { describe, it, expect, beforeEach } from 'vitest';
import {
  AuthComplianceService,
  authComplianceService,
} from '../auth.service';
import { generateTotpCode } from '../totp-utils';
import { coreRegistry } from '../../../core/registry';
import { CoreServiceNames } from '../../../core/contracts/service-names';
import { AgeRestrictionError, RateLimitError, ValidationError, UnauthorizedError } from '../../../core/errors';

describe('Authentication, 18+ Legal Verification & 2FA Service', () => {
  let authService: AuthComplianceService;

  beforeEach(() => {
    authService = new AuthComplianceService();
    authService.clear();
  });

  it('should be registered in the CoreServiceRegistry', () => {
    const service = coreRegistry.get<AuthComplianceService>(CoreServiceNames.AUTH_COMPLIANCE);
    expect(service).toBeDefined();
    expect(service).toBe(authComplianceService);
  });

  describe('Indian Mobile Phone Normalization & Blind Indexing', () => {
    it('should normalize various Indian phone formats to E.164 (+91XXXXXXXXXX)', () => {
      expect(authService.normalizeIndianPhone('9876543210')).toBe('+919876543210');
      expect(authService.normalizeIndianPhone('+91 98765-43210')).toBe('+919876543210');
      expect(authService.normalizeIndianPhone('09876543210')).toBe('+919876543210');
      expect(authService.normalizeIndianPhone('+91 (98765) 43210')).toBe('+919876543210');
    });

    it('should throw ValidationError on non-Indian or invalid mobile numbers', () => {
      expect(() => authService.normalizeIndianPhone('1234567890')).toThrow(ValidationError);
      expect(() => authService.normalizeIndianPhone('abcdefghij')).toThrow(ValidationError);
      expect(() => authService.normalizeIndianPhone('98765')).toThrow(ValidationError);
    });

    it('should generate deterministic blind index hash for phone numbers', () => {
      const hash1 = authService.hashPhone('+919876543210');
      const hash2 = authService.hashPhone('+919876543210');
      expect(hash1).toBe(hash2);
      expect(hash1.length).toBe(64); // SHA-256 hex string
    });
  });

  describe('Mandatory 18+ Age Verification Engine (BR-01)', () => {
    it('should accept customer whose age is 18 or older', () => {
      const referenceDate = new Date('2026-01-01');
      // Born in 2000 -> 26 years old
      const isValid = authService.validateAge18Plus('2000-05-15', referenceDate);
      expect(isValid).toBe(true);

      // Exactly 18 years old (Born 2008-01-01)
      expect(authService.validateAge18Plus('2008-01-01', referenceDate)).toBe(true);
    });

    it('should throw AgeRestrictionError if customer is under 18 years old', () => {
      const referenceDate = new Date('2026-01-01');
      // Born 2012 -> 14 years old
      expect(() => authService.validateAge18Plus('2012-05-15', referenceDate)).toThrow(
        AgeRestrictionError
      );

      // 17 years and 11 months old (Born 2008-02-01)
      expect(() => authService.validateAge18Plus('2008-02-01', referenceDate)).toThrow(
        AgeRestrictionError
      );
    });

    it('should reject invalid date format with ValidationError', () => {
      expect(() => authService.validateAge18Plus('not-a-date')).toThrow(ValidationError);
    });
  });

  describe('Customer Passwordless OTP Authentication', () => {
    it('should request OTP, mask phone number, and return 5-minute expiration', async () => {
      const result = await authService.requestOtp('+91 98765 43210');

      expect(result.success).toBe(true);
      expect(result.maskedPhone).toBe('+91 ****** 3210');
      expect(result.expiresInSeconds).toBe(300);
    });

    it('should enforce rate-limiting: max 3 requests in 10 minutes', async () => {
      await authService.requestOtp('+91 98765 43210');
      await authService.requestOtp('+91 98765 43210');
      await authService.requestOtp('+91 98765 43210');

      // 4th request within 10 minutes should throw RateLimitError
      await expect(authService.requestOtp('+91 98765 43210')).rejects.toThrow(RateLimitError);
    });

    it('should verify correct OTP, create user record, and return valid JWT session token', async () => {
      await authService.requestOtp('+91 98765 43210');

      // Intercept the generated OTP for verification in test
      const phoneHash = authService.hashPhone('+919876543210');
      // @ts-expect-error accessing private store for unit test inspection
      const storedOtp = authService.otpStore.get(phoneHash).otp;

      const authResult = await authService.verifyOtp({
        phone: '+91 98765 43210',
        otp: storedOtp,
      });

      expect(authResult.isValid).toBe(true);
      expect(authResult.userId).toBeDefined();
      expect(authResult.token).toBeDefined();
      expect(authResult.requires2FA).toBe(false); // Customer default

      // Verify the issued JWT session
      const decoded = await authService.verifySessionToken(authResult.token);
      expect(decoded.userId).toBe(authResult.userId);
      expect(decoded.role).toBe('CUSTOMER');
    });

    it('should reject invalid OTP with ValidationError', async () => {
      await authService.requestOtp('+91 98765 43210');

      await expect(
        authService.verifyOtp({
          phone: '+91 98765 43210',
          otp: '000000', // Wrong OTP
        })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('Staff Two-Factor Authentication (TOTP & Backup Codes)', () => {
    let staffUserId: string;

    beforeEach(() => {
      staffUserId = 'staff_admin_1';
      authService.setUser({
        id: staffUserId,
        phoneEncrypted: 'mock_encrypted_staff_phone',
        phoneHash: 'mock_staff_phone_hash',
        role: 'STORE_ADMIN',
        isAgeVerified: true,
        isTwoFactorEnabled: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    });

    it('should setup TOTP 2FA, generate Base32 secret, and create 10 backup codes', () => {
      const setup = authService.setupTotp2FA(staffUserId, 'admin@auralifestyle.in');

      expect(setup.secret).toBeDefined();
      expect(setup.secret.length).toBe(32);
      expect(setup.otpAuthUri).toContain('otpauth://totp/Aura:admin%40auralifestyle.in');
      expect(setup.backupCodes.length).toBe(10);
      expect(setup.backupCodes[0]).toMatch(/^\d{4}-\d{4}$/);

      // Verify user now has encrypted secret and 2FA enabled
      const user = authService.getUser(staffUserId);
      expect(user?.isTwoFactorEnabled).toBe(true);
      expect(user?.twoFactorSecretEncrypted).toBeDefined();
    });

    it('should verify valid RFC 6238 TOTP code', () => {
      const setup = authService.setupTotp2FA(staffUserId);
      const currentCode = generateTotpCode(setup.secret);

      const isValid = authService.verifyTotpCode(staffUserId, currentCode);
      expect(isValid).toBe(true);
    });

    it('should reject invalid TOTP code', () => {
      authService.setupTotp2FA(staffUserId);

      expect(() => authService.verifyTotpCode(staffUserId, '999999')).toThrow(ValidationError);
    });

    it('should allow single-use backup recovery code redemption and prevent reuse', () => {
      const setup = authService.setupTotp2FA(staffUserId);
      const codeToUse = setup.backupCodes[0];

      // 1. First redemption should succeed
      const redeemed = authService.redeemBackupCode(staffUserId, codeToUse);
      expect(redeemed).toBe(true);

      // 2. Re-using the same backup code must fail
      expect(() => authService.redeemBackupCode(staffUserId, codeToUse)).toThrow(ValidationError);
    });
  });

  describe('JWT Session Tokens & RBAC Verification', () => {
    it('should reject tampered or malformed JWT tokens with UnauthorizedError', async () => {
      await expect(authService.verifySessionToken('malformed.jwt.token')).rejects.toThrow(
        UnauthorizedError
      );
    });
  });
});
