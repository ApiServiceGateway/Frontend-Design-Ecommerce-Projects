import { NextRequest } from 'next/server';
import { jsonSuccess, jsonError } from '@/core/api-handler';
import { orderProcessingService } from '@/modules/orders/orders.service';
import { NotFoundError } from '@/core/errors';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = orderProcessingService.getOrder(id);

    if (!order) {
      throw new NotFoundError('Order', id);
    }

    const { searchParams } = new URL(request.url);
    const includeInvoice = searchParams.get('invoice') === 'true';

    let invoice = null;
    if (includeInvoice) {
      invoice = orderProcessingService.generateTaxInvoice(id);
    }

    return jsonSuccess({
      order,
      invoice,
    });
  } catch (err) {
    return jsonError(err);
  }
}
