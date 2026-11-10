import { NextRequest } from 'next/server';
import { jsonSuccess, jsonError } from '@/core/api-handler';
import { discreetAiConciergeService } from '@/modules/ai/ai.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await discreetAiConciergeService.askConcierge(body);
    return jsonSuccess(result);
  } catch (err) {
    return jsonError(err);
  }
}
