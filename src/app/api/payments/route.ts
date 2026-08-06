import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { prisma } from '@/lib/db';

type OrderInfo = {
  customer: { name: string; dni: string; email: string; phone: string; address: string; district: string };
  items: { name: string; sizeLabel: string; price: number; qty: number }[];
  total: number;
};

// El SDK de Mercado Pago lanza errores tipo MPAuthenticationError /
// MPApiError con la forma:
//   { name, status, error: 'unauthorized', causes: [{ code, description }] }
// El motivo útil está en `causes[0].description` y en `message` — NO en
// `error`, que solo trae un código genérico ("unauthorized"). Sin esto, el
// motivo real del rechazo queda invisible y todo parece un 500 sin causa.
function mpErrorDetail(error: unknown): string | undefined {
  if (!error || typeof error !== 'object') return undefined;
  const e = error as { message?: string; error?: string; causes?: unknown };
  const causes = Array.isArray(e.causes) ? e.causes : undefined;
  const first = causes?.[0] as { description?: string } | undefined;
  return first?.description ?? e.message ?? e.error;
}

// Mercado Pago bloquea las tarjetas de prueba cuando el access token es de
// producción (y viceversa). Es el tropiezo más común al integrar, y el
// mensaje crudo no explica cómo resolverlo.
function credentialHint(detail: string | undefined) {
  if (!detail) return undefined;
  const lower = detail.toLowerCase();
  if (lower.includes('live credentials')) {
    return 'Estás usando credenciales de PRODUCCIÓN con una tarjeta de prueba. Para probar, copia las credenciales de prueba (Tus integraciones → tu aplicación → Credenciales de prueba) en MP_ACCESS_TOKEN y NEXT_PUBLIC_MP_PUBLIC_KEY.';
  }
  if (lower.includes('test credentials')) {
    return 'Estás usando credenciales de PRUEBA con una tarjeta real. Para cobrar de verdad, usa las credenciales de producción.';
  }
  return undefined;
}

function mpErrorStatus(error: unknown): number | undefined {
  if (!error || typeof error !== 'object') return undefined;
  const status = (error as { status?: unknown }).status;
  return typeof status === 'number' ? status : undefined;
}

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
      issuer_id?: string;
      payment_method_id: string;
      transaction_amount: number;
      installments?: number;
      payer: { email: string; identification?: { type: string; number: string } };
    };
    description: string;
    externalReference: string;
    order: OrderInfo;
  };

  if (!formData?.token) {
    return NextResponse.json({ error: 'Datos de tarjeta inválidos.' }, { status: 400 });
  }

  const amount = Number(formData.transaction_amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: 'El monto del pedido no es válido.' }, { status: 400 });
  }

  const client = new MercadoPagoConfig({ accessToken });
  const payment = new Payment(client);

  // `issuer_id` no siempre viene en el formData del Brick. Antes lo pasábamos
  // como Number(undefined) === NaN, que Mercado Pago rechaza con un error de
  // validación (y terminaba como un 500 sin explicación). Solo lo incluimos
  // cuando el Brick realmente lo envió.
  const issuerId = Number(formData.issuer_id);
  const hasIssuer = Number.isFinite(issuerId) && issuerId > 0;

  let result;
  try {
    result = await payment.create({
      body: {
        transaction_amount: Math.round(amount * 100) / 100,
        token: formData.token,
        description,
        installments: Number(formData.installments) || 1,
        payment_method_id: formData.payment_method_id,
        ...(hasIssuer ? { issuer_id: issuerId } : {}),
        payer: formData.payer,
        external_reference: externalReference,
        statement_descriptor: 'ZETA MASS SUPPLEMENTS',
      },
      requestOptions: {
        // Evita cobros duplicados si el navegador reintenta la petición.
        idempotencyKey: `${externalReference ?? 'order'}-${formData.token}`,
      },
    });
  } catch (error) {
    const detail = mpErrorDetail(error);
    const hint = credentialHint(detail);
    console.error(
      'Error procesando pago con Mercado Pago:',
      JSON.stringify(
        {
          detail,
          hint,
          status: mpErrorStatus(error),
          causes: (error as { causes?: unknown })?.causes,
          paymentMethodId: formData.payment_method_id,
          hasIssuer,
        },
        null,
        2,
      ),
    );
    return NextResponse.json(
      {
        error: hint
          ? `Configuración de Mercado Pago: ${hint}`
          : detail
            ? `Mercado Pago rechazó el pago: ${detail}`
            : 'No se pudo procesar el pago. Verifica los datos de tu tarjeta o intenta con Yape.',
        detail,
      },
      { status: mpErrorStatus(error) ?? 500 },
    );
  }

  const status =
    result.status === 'approved' ? 'aprobado' : result.status === 'in_process' ? 'en_revision' : 'rechazado';

  // El cobro ya ocurrió en Mercado Pago. Si guardar el pedido falla (conexión
  // a la base, referencia duplicada, etc.) NO podemos responder con error:
  // el cliente vería "pago fallido" con la tarjeta ya cobrada. Registramos el
  // problema y seguimos — el webhook y el ID de pago permiten reconciliar.
  if (order) {
    try {
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
    } catch (dbError) {
      console.error(
        `No se pudo guardar el pedido del pago ${result.id} (${externalReference}). El cobro SÍ se procesó:`,
        dbError,
      );
    }
  }

  return NextResponse.json({
    status: result.status, // 'approved' | 'in_process' | 'rejected'
    statusDetail: result.status_detail,
    id: result.id,
  });
}
