import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });

  const { id } = await params;
  const { status } = await request.json();
  await prisma.order.update({ where: { id }, data: { status } });
  return NextResponse.json({ ok: true });
}
