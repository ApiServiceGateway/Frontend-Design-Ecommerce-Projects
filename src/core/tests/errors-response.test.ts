import { describe, it, expect } from 'vitest';
import {
  AppError,
  ValidationError,
  NotFoundError,
  AgeRestrictionError,
  StockUnavailableError,
} from '../errors';
import { createSuccessResponse, createErrorResponse } from '../response';

describe('Core Error Hierarchy & Response Envelopes', () => {
  it('should format successful responses conforming to JSend / RFC 7807', () => {
    const data = { orderId: 'ord_123', status: 'CONFIRMED' };
    const response = createSuccessResponse(data, { requestId: 'req_abc' });

    expect(response.success).toBe(true);
    expect(response.data).toEqual(data);
    expect(response.meta.requestId).toBe('req_abc');
    expect(response.meta.timestamp).toBeDefined();
  });

  it('should format operational AppError instances into standard error envelopes', () => {
    const error = new AgeRestrictionError();
    const response = createErrorResponse(error, 'req_xyz');

    expect(response.success).toBe(false);
    expect(response.error.code).toBe('AGE_RESTRICTION_FAILED');
    expect(response.error.statusCode).toBe(403);
    expect(response.error.requestId).toBe('req_xyz');
  });

  it('should format ValidationError with validation details', () => {
    const details = [{ field: 'phone', issue: 'Invalid format' }];
    const error = new ValidationError('Validation failed', details);
    const response = createErrorResponse(error);

    expect(response.error.statusCode).toBe(422);
    expect(response.error.code).toBe('VALIDATION_FAILED');
    expect(response.error.details).toEqual(details);
  });

  it('should format StockUnavailableError with HTTP 409 Conflict', () => {
    const error = new StockUnavailableError('SKU-001');
    const response = createErrorResponse(error);

    expect(response.error.statusCode).toBe(409);
    expect(response.error.code).toBe('STOCK_UNAVAILABLE');
  });
});
