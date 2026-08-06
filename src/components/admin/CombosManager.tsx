'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, Loader2, Pencil, Upload } from 'lucide-react';

type Combo = {
  id: string;
  name: string;
  comboDescription: string | null;
  badge: string | null;
  images: string[];
};

const QUICK_BADGES = ['Más vendido', 'Mejor opción', 'Recomendado'];

function ComboCard({ combo }: { combo: Combo }) {
  const router = useRouter();
  const [image, setImage] = useState(combo.images[0]);
  const [badge, setBadge] = useState(combo.badge ?? '');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) setImage(data.url);
      else setError(data.error ?? 'No se pudo subir la foto.');
    } catch {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const nextImages = [image, ...combo.images.slice(1)];
      const res = await fetch(`/api/admin/products/${combo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: nextImages, badge: badge || null }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? 'No se pudo guardar.');
        return;
      }
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 1500);
    } catch {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-2xl border border-crema-line bg-white p-5">
      <div className="relative h-40 w-full overflow-hidden rounded-xl border border-crema-line bg-crema-soft">
        {image && <Image src={image} alt={combo.name} fill className="object-contain p-3" />}
        <label className="absolute bottom-2 right-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-tinta/80 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-tinta">
          {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
          Cambiar foto
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
          />
        </label>
      </div>

      <p className="mt-3 font-display text-lg leading-tight text-tinta">{combo.name}</p>
      {combo.comboDescription && (
        <p className="mt-1 text-xs text-tinta/50">{combo.comboDescription}</p>
      )}

      <p className="mt-4 text-xs font-semibold uppercase tracking-widest2 text-tinta/50">
        Sello de marketing
      </p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setBadge('')}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            badge === '' ? 'border-lima bg-lima text-tinta' : 'border-crema-line text-tinta/60'
          }`}
        >
          Ninguno
        </button>
        {QUICK_BADGES.map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => setBadge(b)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              badge === b ? 'border-lima bg-lima text-tinta' : 'border-crema-line text-tinta/60'
            }`}
          >
            {b}
          </button>
        ))}
      </div>
      <input
        value={badge}
        onChange={(e) => setBadge(e.target.value)}
        placeholder="O escribe tu propio sello…"
        className="mt-2 w-full rounded-lg border border-crema-line px-3 py-1.5 text-xs"
      />

      {error && <p className="mt-2 text-[11px] text-red-600">{error}</p>}

      <div className="mt-4 flex items-center justify-between">
        <Link
          href={`/admin/productos/${combo.id}`}
          className="flex items-center gap-1 text-xs font-semibold text-tinta/50 hover:text-tinta"
        >
          <Pencil className="h-3 w-3" />
          Editar todo
        </Link>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
            saved ? 'bg-lima-dark text-white' : 'bg-lima text-tinta hover:bg-lima-light'
          } disabled:opacity-60`}
        >
          {saving ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : saved ? (
            <Check className="h-3.5 w-3.5" />
          ) : null}
          {saved ? 'Guardado' : 'Guardar'}
        </button>
      </div>
    </div>
  );
}

export function CombosManager({ combos }: { combos: Combo[] }) {
  if (combos.length === 0) {
    return (
      <p className="text-sm text-tinta/50">
        Todavía no hay combos. Marca &quot;Es un combo/promoción&quot; al crear o editar un
        producto para que aparezca aquí.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {combos.map((combo) => (
        <ComboCard key={combo.id} combo={combo} />
      ))}
    </div>
  );
}
