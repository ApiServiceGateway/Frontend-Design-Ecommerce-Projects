import crypto from 'crypto';
import { SignJWT, jwtVerify } from 'jose';
import { coreRegistry } from '../../core/registry';
import { CoreServiceNames } from '../../core/contracts/service-names';
import { cryptoService } from '../../core/crypto';
import {
  AgeRestrictionError,
  RateLimitError,
  UnauthorizedError,
  ValidationError,
  NotFoundError,
} from '../../core/errors';
import {
  generateBase32Secret,
  verifyTotpCodeWithWindow,
} from './totp-utils';
import {
  AuthSessionTokenPayload,
  BackupRecoveryCode,
  RegisterCustomerInput,
  SetupTotpResult,
  UserAuthRecord,
  UserRoleType,
  VerifyOtpInput,
} from './types';

export class AuthComplianceService {
  private usersStore = new Map<string, UserAuthRecord>(); // Keyed by userId
  private phoneIndex = new Map<string, string>(); // Key: phoneHash, Value: userId
  private backupCodesStore = new Map<string, BackupRecoveryCode[]>(); // Key: userId
  private otpStore = new Map<string, { otp: string; expiresAt: number; attempts: number }>();
  private otpRateLimits = new Map<string, number[]>(); // Key: phoneHash, Value: timestamps

  private readonly jwtSecretBytes: Uint8Array;

  constructor() {
    const secret =
      process.env.JWT_SECRET ||
      'aura_super_secure_jwt_secret_key_with_at_least_32_characters_for_hmac';
    this.jwtSecretBytes = new TextEncoder().encode(secret);
  }

  /**
   * Helper to normalize Indian mobile numbers to E.164 (+91XXXXXXXXXX)
   */
  public normalizeIndianPhone(rawPhone: string): string {
    const cleaned = rawPhone.replace(/[\s\-\(\)]/g, '');
    const indianRegex = /^(?:\+91|91|0)?([6-9]\d{9})$/;
    const match = cleaned.match(indianRegex);

    if (!match) {
      throw new ValidationError(
        'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.'
      );
    }

    return `+91${match[1]}`;
  }

  /**
   * Generates a deterministic SHA-256 blind index hash for phone numbers
   * Allows constant-time lookup without exposing raw phone numbers in queries
   */
  public hashPhone(normalizedPhone: string): string {
    return crypto.createHash('sha256').update(`aura_phone_salt:${normalizedPhone}`).digest('hex');
  }

  /**
   * Mandatory 18+ Age Verification Engine (BR-01)
   * Ensures customer is at least 18 years old on registration or checkout
   */
  public validateAge18Plus(dateOfBirthIso: string, referenceDate: Date = new Date()): boolean {
    const dob = new Date(dateOfBirthIso);
    if (isNaN(dob.getTime())) {
      throw new ValidationError('Invalid Date of Birth format. Please provide YYYY-MM-DD.');
    }

    // Calculate age boundary
    const eighteenYearsAgo = new Date(referenceDate);
    eighteenYearsAgo.setFullYear(referenceDate.getFullYear() - 18);

    if (dob > eighteenYearsAgo) {
      throw new AgeRestrictionError(
        'Customer must be 18 years or older to purchase intimate wellness and adult products under Indian law.'
      );
    }

    return true;
  }

  /**
   * Registers a new customer with mandatory 18+ verification and encrypted PII
   */
  public async registerCustomer(input: RegisterCustomerInput): Promise<UserAuthRecord> {
    const normalizedPhone = this.normalizeIndianPhone(input.phone);
    const phoneHash = this.hashPhone(normalizedPhone);

    // Enforce 18+ verification
    this.validateAge18Plus(input.dateOfBirth);

    // Check existing
    const existingUserId = this.phoneIndex.get(phoneHash);
    if (existingUserId) {
      const existing = this.usersStore.get(existingUserId);
      if (existing) {
        existing.isAgeVerified = true;
        existing.dateOfBirth = input.dateOfBirth;
        return existing;
      }
    }

    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const phoneEncrypted = cryptoService.encrypt(normalizedPhone);

    const userRecord: UserAuthRecord = {
      id: userId,
      phoneEncrypted,
      phoneHash,
      email: input.email ? input.email.toLowerCase().trim() : null,
      dateOfBirth: input.dateOfBirth,
      role: 'CUSTOMER',
      isAgeVerified: true,
      isTwoFactorEnabled: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.usersStore.set(userId, userRecord);
    this.phoneIndex.set(phoneHash, userId);

    return userRecord;
  }

  /**
   * Request passwordless OTP for customer authentication with anti-spam rate limiting
   */
  public async requestOtp(phone: string): Promise<{ success: boolean; maskedPhone: string; expiresInSeconds: number }> {
    const normalizedPhone = this.normalizeIndianPhone(phone);
    const phoneHash = this.hashPhone(normalizedPhone);
    const now = Date.now();

    // 1. Rate limiting: Max 3 requests in 10 minutes
    const windowMs = 10 * 60 * 1000;
    const history = (this.otpRateLimits.get(phoneHash) || []).filter((t) => now - t < windowMs);
    if (history.length >= 3) {
      throw new RateLimitError('Too many OTP attempts. Please wait 10 minutes before requesting again.');
    }

    history.push(now);
    this.otpRateLimits.set(phoneHash, history);

    // 2. Generate 6-digit cryptographic OTP (Fixed in test if specified, or random 6 digits)
    const otp = Math.floor(100000 + crypto.randomInt(900000)).toString();
    const expiresInSeconds = 300; // 5 minutes TTL

    this.otpStore.set(phoneHash, {
      otp,
      expiresAt: now + expiresInSeconds * 1000,
      attempts: 0,
    });

    // 3. Mask phone for discreet feedback (e.g. "+91 ****** 4210")
    const maskedPhone = `${normalizedPhone.substring(0, 3)} ****** ${normalizedPhone.substring(9)}`;

    return {
      success: true,
      maskedPhone,
      expiresInSeconds,
    };
  }

  /**
   * Verify customer OTP and issue signed JWT session token
   */
  public async verifyOtp(
    input: VerifyOtpInput
  ): Promise<{ isValid: boolean; userId: string; token: string; requires2FA: boolean; isAgeVerified: boolean }> {
    const normalizedPhone = this.normalizeIndianPhone(input.phone);
    const phoneHash = this.hashPhone(normalizedPhone);
    const stored = this.otpStore.get(phoneHash);

    if (!stored || Date.now() > stored.expiresAt) {
      throw new ValidationError('OTP has expired or was not requested. Please request a new OTP.');
    }

    if (stored.attempts >= 5) {
      this.otpStore.delete(phoneHash);
      throw new RateLimitError('Too many invalid attempts. This OTP has been invalidated.');
    }

    stored.attempts += 1;

    if (stored.otp !== input.otp.trim()) {
      throw new ValidationError('Invalid OTP. Please check the 6-digit code and try again.');
    }

    // OTP is valid; consume it
    this.otpStore.delete(phoneHash);

    // Find or create customer user record
    let userId = this.phoneIndex.get(phoneHash);
    let user: UserAuthRecord | undefined;

    if (!userId) {
      userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      user = {
        id: userId,
        phoneEncrypted: cryptoService.encrypt(normalizedPhone),
        phoneHash,
        role: 'CUSTOMER',
        isAgeVerified: false, // Will be verified on DOB entry
        isTwoFactorEnabled: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.usersStore.set(userId, user);
      this.phoneIndex.set(phoneHash, userId);
    } else {
      user = this.usersStore.get(userId);
    }

    const role: UserRoleType = user?.role || 'CUSTOMER';
    const isStaff = role === 'STORE_ADMIN' || role === 'SUPPORT_AGENT' || role === 'SUPER_ADMIN';
    const requires2FA = isStaff || Boolean(user?.isTwoFactorEnabled);

    const token = await this.generateSessionToken({
      userId,
      role,
      isAgeVerified: Boolean(user?.isAgeVerified),
      isTwoFactorAuthenticated: !requires2FA,
    });

    return {
      isValid: true,
      userId,
      token,
      requires2FA,
      isAgeVerified: Boolean(user?.isAgeVerified),
    };
  }

  /**
   * Setup RFC 6238 TOTP 2FA for staff or security-conscious customers
   */
  public setupTotp2FA(userId: string, accountName = 'staff@aura.in'): SetupTotpResult {
    const user = this.usersStore.get(userId);
    if (!user) {
      throw new NotFoundError('User', userId);
    }

    // 1. Generate Base32 TOTP secret
    const secret = generateBase32Secret(32);
    const otpAuthUri = `otpauth://totp/Aura:${encodeURIComponent(accountName)}?secret=${secret}&issuer=Aura%20Lifestyle`;

    // 2. Generate 10 single-use backup recovery codes
    const backupCodes: string[] = [];
    const hashedCodes: BackupRecoveryCode[] = [];

    for (let i = 0; i < 10; i++) {
      const code = `${crypto.randomInt(1000, 9999)}-${crypto.randomInt(1000, 9999)}`;
      backupCodes.push(code);
      const codeHash = crypto.createHash('sha256').update(code).digest('hex');
      hashedCodes.push({
        codeHash,
        isUsed: false,
      });
    }

    this.backupCodesStore.set(userId, hashedCodes);

    // 3. Encrypt and store TOTP secret at rest
    user.twoFactorSecretEncrypted = cryptoService.encrypt(secret);
    user.isTwoFactorEnabled = true;
    user.updatedAt = new Date().toISOString();
    this.usersStore.set(userId, user);

    return {
      secret,
      otpAuthUri,
      backupCodes,
    };
  }

  /**
   * Verify TOTP code during 2FA step
   */
  public verifyTotpCode(userId: string, totpCode: string): boolean {
    const user = this.usersStore.get(userId);
    if (!user || !user.twoFactorSecretEncrypted) {
      throw new UnauthorizedError('Two-factor authentication is not configured for this account.');
    }

    const secret = cryptoService.decrypt(user.twoFactorSecretEncrypted);
    const isValid = verifyTotpCodeWithWindow(secret, totpCode);

    if (!isValid) {
      throw new ValidationError('Invalid 6-digit authenticator code. Please check your app.');
    }

    return true;
  }

  /**
   * Redeem a single-use backup recovery code
   */
  public redeemBackupCode(userId: string, plainTextCode: string): boolean {
    const codes = this.backupCodesStore.get(userId);
    if (!codes || codes.length === 0) {
      throw new ValidationError('No active backup recovery codes found.');
    }

    const incomingHash = crypto.createHash('sha256').update(plainTextCode.trim()).digest('hex');
    const matched = codes.find((c) => c.codeHash === incomingHash);

    if (!matched || matched.isUsed) {
      throw new ValidationError('Invalid or previously used backup recovery code.');
    }

    matched.isUsed = true;
    matched.usedAt = new Date().toISOString();
    return true;
  }

  /**
   * Generate signed JWT session token
   */
  public async generateSessionToken(payload: AuthSessionTokenPayload): Promise<string> {
    return new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .setIssuer('aura-marketplace-core')
      .sign(this.jwtSecretBytes);
  }

  /**
   * Verify and decode JWT session token
   */
  public async verifySessionToken(token: string): Promise<AuthSessionTokenPayload> {
    try {
      const { payload } = await jwtVerify(token, this.jwtSecretBytes, {
        issuer: 'aura-marketplace-core',
      });

      return {
        userId: payload.userId as string,
        role: payload.role as UserRoleType,
        isAgeVerified: Boolean(payload.isAgeVerified),
        isTwoFactorAuthenticated: Boolean(payload.isTwoFactorAuthenticated),
      };
    } catch {
      throw new UnauthorizedError('Invalid or expired authentication session.');
    }
  }

  /**
   * Helper to fetch user record
   */
  public getUser(userId: string): UserAuthRecord | undefined {
    return this.usersStore.get(userId);
  }

  /**
   * Helper to set user (used in tests or admin seeding)
   */
  public setUser(user: UserAuthRecord): void {
    this.usersStore.set(user.id, { ...user });
    if (user.phoneHash) {
      this.phoneIndex.set(user.phoneHash, user.id);
    }
  }

  /**
   * Clear in-memory stores for clean test teardowns
   */
  public clear(): void {
    this.usersStore.clear();
    this.phoneIndex.clear();
    this.backupCodesStore.clear();
    this.otpStore.clear();
    this.otpRateLimits.clear();
  }
}

// Export singleton instance and register into coreRegistry
export const authComplianceService = new AuthComplianceService();
coreRegistry.register(CoreServiceNames.AUTH_COMPLIANCE, authComplianceService);
