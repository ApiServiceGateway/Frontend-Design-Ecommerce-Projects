/**
 * Standardized Response Envelopes (JSend & RFC 7807 Inspired)
 */

import { AppError } from './errors';

export interface SuccessResponse<T> {
  success: true;
  data: T;
  meta: {
    timestamp: string;
    requestId?: string;
    [key: string]: unknown;
  };
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    statusCode: number;
    details?: unknown;
    requestId?: string;
  };
}

export function createSuccessResponse<T>(data: T, meta: Record<string, unknown> = {}): SuccessResponse<T> {
  return {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  };
}

export function createErrorResponse(error: unknown, requestId?: string): ErrorResponse {
  if (error instanceof AppError) {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        statusCode: error.statusCode,
        details: error.details,
        requestId,
      },
    };
  }

  // Generic unhandled fallback (masks internal implementation details in production)
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: isProduction ? 'An unexpected error occurred. Please contact support.' : (error as Error)?.message || 'Internal Server Error',
      statusCode: 500,
      requestId,
    },
  };
}
