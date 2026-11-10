import { NextResponse } from 'next/server';
import { createSuccessResponse, createErrorResponse } from './response';
import { AppError } from './errors';

export function jsonSuccess<T>(data: T, status = 200, meta: Record<string, unknown> = {}) {
  return NextResponse.json(createSuccessResponse(data, meta), { status });
}

export function jsonError(error: unknown, defaultStatus = 400) {
  const envelope = createErrorResponse(error);
  const status = error instanceof AppError ? error.statusCode : defaultStatus;
  return NextResponse.json(envelope, { status });
}
