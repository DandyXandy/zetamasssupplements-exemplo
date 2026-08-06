import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { prisma } from '@/lib/db';

type OrderInfo = {
  customer: { name: string; dni: string; email: string; phone: string; address: string; district: string };
  items: { name: string; sizeLabel: string; price: number; qty: number }[];
  total: number;
};

// Procesa el pago con tarjeta directamente en el servidor usando el token
// generado por el Brick de CardPayment en el navegador. La tarjeta nunca
// pasa por nuestro backend en texto plano — solo el token ya generado por
// el SDK de Mercado Pago.
export async function POST(request: Request) {
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json(
      { error: 'Mercado Pago no está configurado en el servidor.' },
      { status: 501 },
    );
  }

  const body = await request.json();
  const { formData, description, externalReference, order } = body as {
    formData: {
      token: string;
      issuer_id: string;
      payment_method_id: string;
      transaction_amount: number;
      installments: number;
      payer: { email: string; identification?: { type: string; number: string } };
    };
    description: string;
    externalReference: string;
    order: OrderInfo;
  };

  if (!formData?.token) {
    return NextResponse.json({ error: 'Datos de tarjeta inválidos.' }, { status: 400 });
  }

  const client = new MercadoPagoConfig({ accessToken });
  const payment = new Payment(client);

  try {
    const result = await payment.create({
      body: {
        transaction_amount: formData.transaction_amount,
        token: formData.token,
        description,
        installments: formData.installments,
        payment_method_id: formData.payment_method_id,
        issuer_id: Number(formData.issuer_id),
        payer: formData.payer,
        external_reference: externalReference,
        statement_descriptor: 'ZETA MASS SUPPLEMENTS',
      },
      requestOptions: {
        // Evita cobros duplicados si el navegador reintenta la petición.
        idempotencyKey: `${externalReference ?? 'order'}-${formData.token}`,
      },
    });

    const status =
      result.status === 'approved' ? 'aprobado' : result.status === 'in_process' ? 'en_revision' : 'rechazado';

    if (order) {
      await prisma.order.create({
        data: {
          externalReference,
          customerName: order.customer.name,
          customerDni: order.customer.dni,
          customerEmail: order.customer.email,
          customerPhone: order.customer.phone,
          customerAddress: order.customer.address,
          customerDistrict: order.customer.district,
          items: JSON.stringify(order.items),
          total: order.total,
          paymentMethod: 'tarjeta',
          status,
          mpPaymentId: String(result.id),
        },
      });
    }

    return NextResponse.json({
      status: result.status, // 'approved' | 'in_process' | 'rejected'
      statusDetail: result.status_detail,
      id: result.id,
    });
  } catch (error) {
    console.error('Error procesando pago con Mercado Pago', error);
    return NextResponse.json(
      { error: 'No se pudo procesar el pago. Verifica los datos de tu tarjeta o intenta con Yape.' },
      { status: 500 },
    );
  }
}
