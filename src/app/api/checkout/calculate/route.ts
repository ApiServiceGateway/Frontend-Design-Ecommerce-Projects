import { NextRequest } from 'next/server';
import { jsonSuccess, jsonError } from '@/core/api-handler';
import { checkoutPricingService } from '@/modules/checkout/checkout.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const pricing = checkoutPricingService.calculatePricing(body);
    return jsonSuccess(pricing);
  } catch (err) {
    return jsonError(err);
  }
}
