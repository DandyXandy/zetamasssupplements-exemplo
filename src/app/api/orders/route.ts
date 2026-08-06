import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Registra pedidos que no pasan por Mercado Pago (ej. Yape coordinado por
// WhatsApp), para que también aparezcan en el panel admin.
export async function POST(request: Request) {
  const body = await request.json();
  const { externalReference, customer, items, total, paymentMethod } = body as {
    externalReference: string;
    customer: { name: string; dni: string; email?: string; phone: string; address: string; district: string };
    items: { name: string; sizeLabel: string; price: number; qty: number }[];
    total: number;
    paymentMethod: string;
  };

  if (!externalReference || !customer?.dni || !items?.length) {
    return NextResponse.json({ error: 'Datos de pedido incompletos.' }, { status: 400 });
  }

  const order = await prisma.order.create({
    data: {
      externalReference,
      customerName: customer.name,
      customerDni: customer.dni,
      customerEmail: customer.email ?? null,
      customerPhone: customer.phone,
      customerAddress: customer.address,
      customerDistrict: customer.district,
      items: JSON.stringify(items),
      total,
      paymentMethod,
      status: 'pendiente',
    },
  });

  return NextResponse.json({ ok: true, id: order.id });
}
