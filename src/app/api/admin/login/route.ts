import { NextResponse } from 'next/server';
import { createSession, verifyAdminCredentials } from '@/lib/auth';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Ingresa correo y contraseña.' }, { status: 400 });
  }

  if (!verifyAdminCredentials(email, password)) {
    return NextResponse.json({ error: 'Correo o contraseña incorrectos.' }, { status: 401 });
  }

  await createSession(email);
  return NextResponse.json({ ok: true });
}
