/**
 * Core Field-Level Cryptographic Engine (AES-256-GCM)
 * Encrypts sensitive customer PII (phone number, delivery addresses) before saving to PostgreSQL.
 */

import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // 96-bit recommended for GCM
const AUTH_TAG_LENGTH = 16; // 128-bit authentication tag

/**
 * Encrypts plaintext string using AES-256-GCM with a random IV.
 * Output format: iv:authTag:ciphertext (hex-encoded)
 */
export function encryptPii(plainText: string, hexKey: string): string {
  if (!plainText) return plainText;
  if (!hexKey || hexKey.length !== 64) {
    throw new Error('[Crypto Error]: PII_ENCRYPTION_KEY must be a valid 32-byte hex string (64 characters).');
  }

  const key = Buffer.from(hexKey, 'hex');
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
}

/**
 * Decrypts AES-256-GCM encrypted hex string.
 * Expects format: iv:authTag:ciphertext
 */
export function decryptPii(encryptedPayload: string, hexKey: string): string {
  if (!encryptedPayload) return encryptedPayload;
  if (!hexKey || hexKey.length !== 64) {
    throw new Error('[Crypto Error]: PII_ENCRYPTION_KEY must be a valid 32-byte hex string (64 characters).');
  }

  const parts = encryptedPayload.split(':');
  if (parts.length !== 3) {
    throw new Error('[Crypto Error]: Malformed encrypted payload format.');
  }

  const [ivHex, authTagHex, encryptedHex] = parts;
  const key = Buffer.from(hexKey, 'hex');
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const encryptedText = Buffer.from(encryptedHex, 'hex');

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
  return decrypted.toString('utf8');
}

/**
 * Convenient CryptoService wrapper providing sensible defaults from environment
 */
const DEFAULT_KEY =
  process.env.PII_ENCRYPTION_KEY ||
  '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

export const cryptoService = {
  encrypt(plainText: string, hexKey: string = process.env.PII_ENCRYPTION_KEY || DEFAULT_KEY): string {
    return encryptPii(plainText, hexKey);
  },
  decrypt(encryptedPayload: string, hexKey: string = process.env.PII_ENCRYPTION_KEY || DEFAULT_KEY): string {
    return decryptPii(encryptedPayload, hexKey);
  },
};

