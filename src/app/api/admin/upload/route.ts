import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { getSession } from '@/lib/auth';

// Redimensiona toda imagen subida a un ancho máximo (resolución media) para
// que el sitio siga cargando rápido, sin importar la foto original que
// suba el admin. Si hay BLOB_READ_WRITE_TOKEN configurado, sube a Vercel
// Blob (necesario en producción/serverless); si no, guarda localmente en
// /public/uploads — perfecto para probar el panel en desarrollo.
const MAX_WIDTH = 1200;

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'Falta el archivo.' }, { status: 400 });

  const isVideo = file.type.startsWith('video/');
  const buffer = Buffer.from(await file.arrayBuffer());

  let output = buffer;
  let ext = isVideo ? 'mp4' : 'jpg';
  let contentType = file.type;

  if (!isVideo) {
    output = await sharp(buffer)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();
    contentType = 'image/jpeg';
  }

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import('@vercel/blob');
    const blob = await put(filename, output, { access: 'public', contentType });
    return NextResponse.json({ url: blob.url });
  }

  if (process.env.VERCEL) {
    return NextResponse.json(
      {
        error:
          'Falta conectar Vercel Blob. En el dashboard de Vercel ve a Storage → Create Database → Blob, conéctalo a este proyecto y vuelve a intentar.',
      },
      { status: 501 },
    );
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadsDir, { recursive: true });
  await writeFile(path.join(uploadsDir, filename), output);
  return NextResponse.json({ url: `/uploads/${filename}` });
}
