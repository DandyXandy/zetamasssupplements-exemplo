'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AlertCircle, Loader2, Plus, Trash2, Upload } from 'lucide-react';
import { CATALOG_CATEGORIES } from '@/lib/catalog';

type SizeRow = { label: string; price: number | null; image?: string };
type FlavorRow = { label: string; image?: string };

const QUICK_BADGES = [
  '🔥 Más Vendido',
  '⭐ Top Valorado',
  '💥 Promoción',
  '🚀 Nuevo',
  '💪 Ganancia de Masa',
  '⚡ Pre-Entreno',
  '🥇 Premium',
];

export type ProductFormData = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  isCombo: boolean;
  comboDescription: string;
  badge: string;
  shortDescription: string;
  description: string;
  style: string;
  benefits: string; // una por línea en el textarea
  usage: string;
  images: string[];
  sizes: SizeRow[];
  flavors: FlavorRow[];
};

const EMPTY: ProductFormData = {
  slug: '',
  name: '',
  brand: '',
  category: CATALOG_CATEGORIES[0].slug,
  isCombo: false,
  comboDescription: '',
  badge: '',
  shortDescription: '',
  description: '',
  style: '',
  benefits: '',
  usage: '',
  images: [],
  sizes: [{ label: '', price: null }],
  flavors: [],
};

function ImageUploadSlot({
  url,
  onChange,
  onRemove,
  label,
}: {
  url?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  label: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) onChange(data.url);
      else setError(data.error ?? 'No se pudo subir la foto.');
    } catch {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-crema-line bg-crema-soft">
      {error && (
        <p className="absolute inset-x-0 bottom-0 z-10 bg-red-600/90 px-1 py-0.5 text-center text-[8px] leading-tight text-white">
          {error}
        </p>
      )}
      {url ? (
        <Image src={url} alt={label} fill className="object-contain p-1" />
      ) : (
        <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1 text-tinta/30 hover:text-tinta/50">
          {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
          <span className="text-[10px]">{label}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </label>
      )}
      {url && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-tinta/70 text-white"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

export function ProductForm({
  productId,
  initial,
}: {
  productId?: string;
  initial?: Partial<ProductFormData>;
}) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>({ ...EMPTY, ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      ...form,
      benefits: form.benefits
        ? form.benefits.split('\n').map((b) => b.trim()).filter(Boolean)
        : undefined,
      flavors: form.flavors.length > 0 ? form.flavors : undefined,
    };

    try {
      const res = await fetch(productId ? `/api/admin/products/${productId}` : '/api/admin/products', {
        method: productId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'No se pudo guardar el producto.');
        return;
      }
      router.push('/admin/productos');
      router.refresh();
    } catch {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-crema-line bg-white p-5">
        <h2 className="font-display text-lg text-tinta">Datos básicos</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-semibold text-tinta/50">
            Nombre
            <input
              required
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="mt-1 w-full rounded-lg border border-crema-line px-3 py-2 text-sm"
            />
          </label>
          <label className="text-xs font-semibold text-tinta/50">
            Marca
            <input
              required
              value={form.brand}
              onChange={(e) => update('brand', e.target.value)}
              className="mt-1 w-full rounded-lg border border-crema-line px-3 py-2 text-sm"
            />
          </label>
          <label className="text-xs font-semibold text-tinta/50">
            Slug (URL)
            <input
              required
              value={form.slug}
              onChange={(e) => update('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
              className="mt-1 w-full rounded-lg border border-crema-line px-3 py-2 text-sm"
            />
          </label>
          <label className="text-xs font-semibold text-tinta/50">
            Categoría
            <select
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className="mt-1 w-full rounded-lg border border-crema-line px-3 py-2 text-sm"
            >
              {CATALOG_CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-semibold text-tinta/50">
            Estilo (opcional)
            <input
              placeholder="Ej: Energético, Clásico…"
              value={form.style}
              onChange={(e) => update('style', e.target.value)}
              className="mt-1 w-full rounded-lg border border-crema-line px-3 py-2 text-sm"
            />
          </label>
          <label className="text-xs font-semibold text-tinta/50 sm:col-span-2">
            Sello de marketing (opcional)
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => update('badge', '')}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  form.badge === '' ? 'border-lima bg-lima text-tinta' : 'border-crema-line text-tinta/60'
                }`}
              >
                Ninguno
              </button>
              {QUICK_BADGES.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => update('badge', b)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    form.badge === b ? 'border-lima bg-lima text-tinta' : 'border-crema-line text-tinta/60'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
            <input
              placeholder="O escribe tu propio sello…"
              value={form.badge}
              onChange={(e) => update('badge', e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-crema-line px-3 py-2 text-sm"
            />
          </label>
          <label className="flex items-center gap-2 self-end pb-2 text-xs font-semibold text-tinta/50">
            <input
              type="checkbox"
              checked={form.isCombo}
              onChange={(e) => update('isCombo', e.target.checked)}
            />
            Es un combo/promoción
          </label>
          {form.isCombo && (
            <label className="text-xs font-semibold text-tinta/50 sm:col-span-2">
              Descripción del combo
              <input
                value={form.comboDescription}
                onChange={(e) => update('comboDescription', e.target.value)}
                className="mt-1 w-full rounded-lg border border-crema-line px-3 py-2 text-sm"
              />
            </label>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-crema-line bg-white p-5">
        <h2 className="font-display text-lg text-tinta">Descripción</h2>
        <div className="mt-4 space-y-3">
          <label className="block text-xs font-semibold text-tinta/50">
            Descripción corta (vitrina)
            <input
              value={form.shortDescription}
              onChange={(e) => update('shortDescription', e.target.value)}
              className="mt-1 w-full rounded-lg border border-crema-line px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-xs font-semibold text-tinta/50">
            Descripción completa
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              className="mt-1 w-full rounded-lg border border-crema-line px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-xs font-semibold text-tinta/50">
            Beneficios (uno por línea)
            <textarea
              rows={4}
              value={form.benefits}
              onChange={(e) => update('benefits', e.target.value)}
              className="mt-1 w-full rounded-lg border border-crema-line px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-xs font-semibold text-tinta/50">
            Modo de uso
            <textarea
              rows={2}
              value={form.usage}
              onChange={(e) => update('usage', e.target.value)}
              className="mt-1 w-full rounded-lg border border-crema-line px-3 py-2 text-sm"
            />
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-crema-line bg-white p-5">
        <h2 className="font-display text-lg text-tinta">Fotos del producto (máx. 3)</h2>
        <div className="mt-4 flex gap-3">
          {[0, 1, 2].map((i) => (
            <ImageUploadSlot
              key={i}
              label={`Foto ${i + 1}`}
              url={form.images[i]}
              onChange={(url) => {
                const next = [...form.images];
                next[i] = url;
                update('images', next);
              }}
              onRemove={() => update('images', form.images.filter((_, idx) => idx !== i))}
            />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-crema-line bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg text-tinta">Tamaños y precios</h2>
          <button
            type="button"
            onClick={() => update('sizes', [...form.sizes, { label: '', price: null }])}
            className="flex items-center gap-1 text-xs font-semibold text-lima-dark"
          >
            <Plus className="h-3.5 w-3.5" />
            Agregar tamaño
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {form.sizes.map((size, i) => (
            <div key={i} className="flex items-center gap-2">
              <ImageUploadSlot
                label="Foto"
                url={size.image}
                onChange={(url) => {
                  const next = [...form.sizes];
                  next[i] = { ...next[i], image: url };
                  update('sizes', next);
                }}
                onRemove={() => {
                  const next = [...form.sizes];
                  delete next[i].image;
                  update('sizes', next);
                }}
              />
              <input
                placeholder="Tamaño (ej: 5 LB)"
                value={size.label}
                onChange={(e) => {
                  const next = [...form.sizes];
                  next[i] = { ...next[i], label: e.target.value };
                  update('sizes', next);
                }}
                className="flex-1 rounded-lg border border-crema-line px-3 py-2 text-sm"
              />
              <input
                type="number"
                placeholder="Precio S/"
                value={size.price ?? ''}
                onChange={(e) => {
                  const next = [...form.sizes];
                  next[i] = { ...next[i], price: e.target.value === '' ? null : Number(e.target.value) };
                  update('sizes', next);
                }}
                className="w-28 rounded-lg border border-crema-line px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={() => update('sizes', form.sizes.filter((_, idx) => idx !== i))}
                className="text-tinta/30 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-crema-line bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg text-tinta">Sabores (opcional)</h2>
          <button
            type="button"
            onClick={() => update('flavors', [...form.flavors, { label: '' }])}
            className="flex items-center gap-1 text-xs font-semibold text-lima-dark"
          >
            <Plus className="h-3.5 w-3.5" />
            Agregar sabor
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {form.flavors.map((flavor, i) => (
            <div key={i} className="flex items-center gap-2">
              <ImageUploadSlot
                label="Foto"
                url={flavor.image}
                onChange={(url) => {
                  const next = [...form.flavors];
                  next[i] = { ...next[i], image: url };
                  update('flavors', next);
                }}
                onRemove={() => {
                  const next = [...form.flavors];
                  delete next[i].image;
                  update('flavors', next);
                }}
              />
              <input
                placeholder="Sabor (ej: Chocolate)"
                value={flavor.label}
                onChange={(e) => {
                  const next = [...form.flavors];
                  next[i] = { ...next[i], label: e.target.value };
                  update('flavors', next);
                }}
                className="flex-1 rounded-lg border border-crema-line px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={() => update('flavors', form.flavors.filter((_, idx) => idx !== i))}
                className="text-tinta/30 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {form.flavors.length === 0 && (
            <p className="text-xs text-tinta/40">Sin sabores — se muestra solo la foto principal.</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="flex items-center justify-center gap-2 rounded-full bg-lima px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-tinta hover:bg-lima-light disabled:opacity-60"
      >
        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
        Guardar producto
      </button>
    </form>
  );
}
