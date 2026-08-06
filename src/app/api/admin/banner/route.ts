import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });

  const { type, url, posterUrl } = await request.json();
  const count = await prisma.bannerSlide.count();
  const slide = await prisma.bannerSlide.create({
    data: { type, url, posterUrl: posterUrl || null, position: count },
  });
  return NextResponse.json({ ok: true, id: slide.id });
}
