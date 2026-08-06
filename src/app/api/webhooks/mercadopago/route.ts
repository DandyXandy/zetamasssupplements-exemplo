import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { prisma } from '@/lib/db';

// Mercado Pago llama esta URL cuando el estado de un pago cambia (aprobado,
// rechazado, en revisión). Es la fuente de verdad real — la respuesta que
// recibe el navegador al pagar puede llegar antes de que el pago termine de
// confirmarse, así que actualizamos el pedido guardado con el estado final.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const paymentId = body?.data?.id;

  if (body?.type === 'payment' && paymentId && process.env.MP_ACCESS_TOKEN) {
    try {
      const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
      const payment = await new Payment(client).get({ id: paymentId });
      const status =
        payment.status === 'approved' ? 'aprobado' : payment.status === 'in_process' ? 'en_revision' : 'rechazado';

      const order = await prisma.order.findFirst({ where: { mpPaymentId: String(paymentId) } });
      if (order) {
        await prisma.order.update({ where: { id: order.id }, data: { status } });
      }
      console.log(`[MP webhook] pago ${paymentId} → estado: ${payment.status} (${payment.status_detail})`);
    } catch (error) {
      console.error('[MP webhook] no se pudo consultar el pago', paymentId, error);
    }
  }

  // Siempre 200: si respondemos error, Mercado Pago reintenta indefinidamente.
  return NextResponse.json({ received: true });
}
