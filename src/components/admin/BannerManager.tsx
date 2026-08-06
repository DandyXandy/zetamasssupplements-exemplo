'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Film, ImageIcon, Loader2, Trash2, Upload } from 'lucide-react';

type Slide = { id: string; type: string; url: string; posterUrl: string | null };

// Los videos subidos por el admin no traen una "portada" — el navegador
// muestra un cuadro negro hasta que carga suficiente data del video. Para
// evitarlo, capturamos un frame directo en el navegador (sin depender de
// procesar video en el servidor) y lo subimos como la foto de portada.
function captureVideoFrame(file: File): Promise<Blob | null> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    const objectUrl = URL.createObjectURL(file);
    video.src = objectUrl;

    const finish = (blob: Blob | null) => {
      URL.revokeObjectURL(objectUrl);
      resolve(blob);
    };

    const timeout = setTimeout(() => finish(null), 8000);

    video.onloadeddata = () => {
      video.currentTime = Math.min(0.3, (video.duration || 1) / 4);
    };

    video.onseeked = () => {
      clearTimeout(timeout);
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx || !canvas.width || !canvas.height) {
        finish(null);
        return;
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => finish(blob), 'image/jpeg', 0.85);
    };

    video.onerror = () => {
      clearTimeout(timeout);
      finish(null);
    };
  });
}

export function BannerManager({ initialSlides }: { initialSlides: Slide[] }) {
  const router = useRouter();
  const [slides, setSlides] = useState(initialSlides);
  const [uploading, setUploading] = useState<'video' | 'image' | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(file: File, type: 'video' | 'image') {
    setUploading(type);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'No se pudo subir el archivo.');
        return;
      }

      let posterUrl: string | null = null;
      if (type === 'video') {
        const frame = await captureVideoFrame(file);
        if (frame) {
          const posterForm = new FormData();
          posterForm.append('file', new File([frame], 'poster.jpg', { type: 'image/jpeg' }));
          const posterRes = await fetch('/api/admin/upload', { method: 'POST', body: posterForm });
          const posterData = await posterRes.json();
          if (posterRes.ok) posterUrl = posterData.url;
        }
      }

      const createRes = await fetch('/api/admin/banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, url: data.url, posterUrl }),
      });
      const created = await createRes.json();
      setSlides((prev) => [...prev, { id: created.id, type, url: data.url, posterUrl }]);
      router.refresh();
    } finally {
      setUploading(null);
    }
  }

  async function handleDelete(id: string) {
    setSlides((prev) => prev.filter((s) => s.id !== id));
    await fetch(`/api/admin/banner/${id}`, { method: 'DELETE' });
    router.refresh();
  }

  return (
    <div className="space-y-6">
      {error && <p className="rounded-lg bg-red-50 p-3 text-xs text-red-700">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-4">
        {slides.map((slide, i) => (
          <div key={slide.id} className="overflow-hidden rounded-2xl border border-crema-line bg-white">
            <div className="relative aspect-video bg-crema-soft">
              {slide.type === 'video' ? (
                <video
                  src={slide.url}
                  poster={slide.posterUrl ?? undefined}
                  muted
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image src={slide.url} alt={`Slide ${i + 1}`} fill className="object-cover" />
              )}
              <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-tinta/70 px-2 py-1 text-[10px] font-bold uppercase text-white">
                {slide.type === 'video' ? <Film className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
                {i + 1}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(slide.id)}
              className="flex w-full items-center justify-center gap-1.5 border-t border-crema-line py-2 text-xs font-semibold text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Quitar
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <label className="flex cursor-pointer items-center gap-2 rounded-full border border-crema-line bg-white px-5 py-3 text-sm font-semibold text-tinta hover:border-tinta/30">
          {uploading === 'video' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Subir video
          <input
            type="file"
            accept="video/mp4"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], 'video')}
          />
        </label>
        <label className="flex cursor-pointer items-center gap-2 rounded-full border border-crema-line bg-white px-5 py-3 text-sm font-semibold text-tinta hover:border-tinta/30">
          {uploading === 'image' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Subir foto
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], 'image')}
          />
        </label>
      </div>
      <p className="text-xs text-tinta/40">
        Videos: sube un archivo ya comprimido (idealmente menos de 15MB) para no afectar la
        velocidad del sitio. Las fotos se redimensionan solas.
      </p>
    </div>
  );
}
