import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });

  const data = await request.json();

  const existing = await prisma.product.findUnique({ where: { slug: data.slug } });
  if (existing) {
    return NextResponse.json({ error: 'Ya existe un producto con ese slug.' }, { status: 409 });
  }

  const product = await prisma.product.create({
    data: {
      slug: data.slug,
      name: data.name,
      brand: data.brand,
      category: data.category,
      isCombo: !!data.isCombo,
      comboDescription: data.comboDescription || null,
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

  return NextResponse.json({ ok: true, id: product.id });
}
