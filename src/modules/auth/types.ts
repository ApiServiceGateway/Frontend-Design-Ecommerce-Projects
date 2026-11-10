/**
 * Authentication, 18+ Verification & 2FA Domain Types
 */

export type UserRoleType = 'CUSTOMER' | 'SUPPORT_AGENT' | 'STORE_ADMIN' | 'SUPER_ADMIN';

export interface UserAuthRecord {
  id: string;
  phoneEncrypted: string;
  phoneHash: string;
  email?: string | null;
  dateOfBirth?: string | null; // ISO string YYYY-MM-DD
  role: UserRoleType;
  isAgeVerified: boolean;
  isTwoFactorEnabled: boolean;
  twoFactorSecretEncrypted?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BackupRecoveryCode {
  codeHash: string;
  isUsed: boolean;
  usedAt?: string | null;
}

export interface RegisterCustomerInput {
  phone: string; // Indian E.164: +919876543210
  dateOfBirth: string; // ISO date string e.g. "2000-05-15"
  email?: string;
}

export interface VerifyOtpInput {
  phone: string;
  otp: string;
}

export interface SetupTotpResult {
  secret: string; // Base32 secret for QR code
  otpAuthUri: string; // "otpauth://totp/Aura:admin@aura.in?secret=...&issuer=Aura"
  backupCodes: string[]; // 10 plain-text backup codes (shown once to user)
}

export interface VerifyTotpInput {
  userId: string;
  totpCode: string;
}

export interface VerifyBackupCodeInput {
  userId: string;
  backupCode: string;
}

export interface AuthSessionTokenPayload {
  userId: string;
  role: UserRoleType;
  isAgeVerified: boolean;
  isTwoFactorAuthenticated: boolean;
}
