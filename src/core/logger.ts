/**
 * Masked Structured Logger (Pino-backed)
 * Automatically redacts customer PII (phone numbers, addresses, tokens, emails) from server logs.
 */

import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

export const logger = pino({
  level: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),
  redact: {
    paths: [
      'phone',
      'email',
      'customerPhone',
      'customerEmail',
      'shippingAddress',
      'addressLine1',
      'password',
      'otp',
      'pin',
      'token',
      'jwt',
      '*.phone',
      '*.email',
      '*.address',
    ],
    censor: '[CONFIDENTIAL_PII_REDACTED]',
  },
  base: {
    env: process.env.NODE_ENV,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});
