import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });

  const { id } = await params;
  const data = await request.json();

  await prisma.product.update({
    where: { id },
    data: {
      slug: data.slug,
      name: data.name,
      brand: data.brand,
      category: data.category,
      isCombo: !!data.isCombo,
      comboDescription: data.comboDescription || null,
      badge: data.badge || null,
      shortDescription: data.shortDescription || null,
      description: data.description || null,
      style: data.style || null,
      benefits: data.benefits ? JSON.stringify(data.benefits) : null,
      usage: data.usage || null,
      images: JSON.stringify(data.images ?? []),
      sizes: JSON.stringify(data.sizes ?? []),
      flavors: data.flavors ? JSON.stringify(data.flavors) : null,
    },
  });

  return NextResponse.json({ ok: true });
}

// Actualización parcial — usada por el panel de Combos para cambiar solo
// la foto principal o el sello de marketing sin tocar el resto del producto.
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });

  const { id } = await params;
  const data = await request.json();

  const update: Record<string, unknown> = {};
  if (data.images !== undefined) update.images = JSON.stringify(data.images);
  if (data.badge !== undefined) update.badge = data.badge || null;

  await prisma.product.update({ where: { id }, data: update });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });

  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
