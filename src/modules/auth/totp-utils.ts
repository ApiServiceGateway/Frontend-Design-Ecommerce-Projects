import crypto from 'crypto';

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

/**
 * Generate a random Base32 TOTP secret (160-bit / 20 bytes -> 32 chars)
 */
export function generateBase32Secret(length = 32): string {
  const bytes = crypto.randomBytes(length);
  let secret = '';
  for (let i = 0; i < length; i++) {
    secret += BASE32_ALPHABET[bytes[i] % BASE32_ALPHABET.length];
  }
  return secret;
}

/**
 * Decode Base32 string to Buffer
 */
export function base32ToBuffer(base32: string): Buffer {
  const cleaned = base32.toUpperCase().replace(/=+$/, '');
  let bits = '';
  for (const char of cleaned) {
    const val = BASE32_ALPHABET.indexOf(char);
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, '0');
  }

  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.substring(i, i + 8), 2));
  }
  return Buffer.from(bytes);
}

/**
 * Compute 6-digit TOTP code for a given timestamp and secret according to RFC 6238
 */
export function generateTotpCode(secretBase32: string, timestampMs = Date.now(), stepSeconds = 30): string {
  const key = base32ToBuffer(secretBase32);
  const timeStep = Math.floor(timestampMs / 1000 / stepSeconds);

  // Time buffer (8 bytes Big-Endian)
  const timeBuffer = Buffer.alloc(8);
  timeBuffer.writeBigInt64BE(BigInt(timeStep));

  // HMAC-SHA1
  const hmac = crypto.createHmac('sha1', key).update(timeBuffer).digest();

  // Dynamic Truncation
  const offset = hmac[hmac.length - 1] & 0xf;
  const binary =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  const otp = binary % 1000000;
  return otp.toString().padStart(6, '0');
}

/**
 * Verify TOTP code with time drift window (±1 step / ±30s)
 */
export function verifyTotpCodeWithWindow(
  secretBase32: string,
  token: string,
  timestampMs = Date.now(),
  stepSeconds = 30,
  window = 1
): boolean {
  const normalizedToken = token.trim();
  if (normalizedToken.length !== 6) return false;

  for (let errorWindow = -window; errorWindow <= window; errorWindow++) {
    const checkTime = timestampMs + errorWindow * stepSeconds * 1000;
    const generated = generateTotpCode(secretBase32, checkTime, stepSeconds);
    if (crypto.timingSafeEqual(Buffer.from(generated), Buffer.from(normalizedToken))) {
      return true;
    }
  }
  return false;
}
