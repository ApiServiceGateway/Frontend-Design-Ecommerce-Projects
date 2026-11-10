/**
 * Core Application Error Hierarchy
 * All domain services throw subclasses of AppError for consistent HTTP & log handling.
 */

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 400, code = 'BAD_REQUEST', details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 422, 'VALIDATION_FAILED', details);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, identifier?: string) {
    super(
      identifier ? `${resource} with identifier '${identifier}' not found` : `${resource} not found`,
      404,
      'NOT_FOUND'
    );
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required to access this resource') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class AgeRestrictionError extends AppError {
  constructor(message = 'Customer must be 18 years or older to purchase intimate wellness products') {
    super(message, 403, 'AGE_RESTRICTION_FAILED');
  }
}

export class ConflictError extends AppError {
  constructor(message: string, code = 'CONFLICT') {
    super(message, 409, code);
  }
}

export class StockUnavailableError extends ConflictError {
  constructor(sku: string) {
    super(`Stock for item '${sku}' is currently unavailable or held in reservation`, 'STOCK_UNAVAILABLE');
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Too many requests. Please try again later.') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
  }
}
