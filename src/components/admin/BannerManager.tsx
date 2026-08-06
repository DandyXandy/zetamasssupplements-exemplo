'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Film, ImageIcon, Loader2, Trash2, Upload } from 'lucide-react';

type Slide = { id: string; type: string; url: string; posterUrl: string | null };

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

      const createRes = await fetch('/api/admin/banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, url: data.url }),
      });
      const created = await createRes.json();
      setSlides((prev) => [...prev, { id: created.id, type, url: data.url, posterUrl: null }]);
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
                <video src={slide.url} muted className="h-full w-full object-cover" />
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
