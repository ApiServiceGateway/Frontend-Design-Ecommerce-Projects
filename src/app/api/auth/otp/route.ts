import { NextRequest } from 'next/server';
import { jsonSuccess, jsonError } from '@/core/api-handler';
import { authComplianceService } from '@/modules/auth/auth.service';
import { ValidationError } from '@/core/errors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, phone, otp } = body;

    if (action === 'REQUEST_OTP') {
      if (!phone) {
        throw new ValidationError('Phone number is required.');
      }
      const result = await authComplianceService.requestOtp(phone);
      return jsonSuccess(result);
    }

    if (action === 'VERIFY_OTP') {
      if (!phone || !otp) {
        throw new ValidationError('Both phone and OTP are required.');
      }
      const result = await authComplianceService.verifyOtp({ phone, otp });
      return jsonSuccess(result);
    }

    throw new ValidationError('Invalid action. Supported actions: REQUEST_OTP, VERIFY_OTP.');
  } catch (err) {
    return jsonError(err);
  }
}
