import { describe, it, expect } from 'vitest';
import { encryptPii, decryptPii } from '../crypto';

describe('Core Cryptographic Engine (AES-256-GCM)', () => {
  const validHexKey = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

  it('should encrypt and decrypt customer phone number accurately', () => {
    const rawPhone = '+919876543210';
    const encrypted = encryptPii(rawPhone, validHexKey);

    expect(encrypted).not.toBe(rawPhone);
    expect(encrypted).toContain(':'); // Contains iv:authTag:ciphertext

    const decrypted = decryptPii(encrypted, validHexKey);
    expect(decrypted).toBe(rawPhone);
  });

  it('should encrypt and decrypt full delivery address correctly', () => {
    const address = 'Flat 402, Lotus Court, Indiranagar, Bengaluru, 560038';
    const encrypted = encryptPii(address, validHexKey);

    const decrypted = decryptPii(encrypted, validHexKey);
    expect(decrypted).toBe(address);
  });

  it('should throw an error if encryption key is not a 64-char hex string', () => {
    expect(() => encryptPii('data', 'short_key')).toThrowError('PII_ENCRYPTION_KEY must be a valid 32-byte hex string');
  });

  it('should fail decryption if ciphertext or auth tag is tampered with', () => {
    const encrypted = encryptPii('secret', validHexKey);
    const tampered = encrypted.slice(0, -2) + 'ff';

    expect(() => decryptPii(tampered, validHexKey)).toThrow();
  });
});
