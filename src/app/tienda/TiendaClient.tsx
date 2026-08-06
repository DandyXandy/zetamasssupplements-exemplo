'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloatingButton } from '@/components/WhatsAppButton';
import { CatalogCard } from '@/components/CatalogCard';
import { CATALOG_CATEGORIES, type CatalogItem } from '@/lib/catalog';

export function TiendaClient({ items }: { items: CatalogItem[] }) {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('categoria');
    const q = params.get('q');
    if (categoria) setActiveCategories(categoria.split(','));
    if (q) setQuery(q);
  }, []);

  const filtered = useMemo(() => {
    let list = items;
    if (activeCategories.length > 0) {
      list = list.filter((p) => activeCategories.includes(p.category));
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q),
      );
    }
    return list;
  }, [activeCategories, query]);

  function toggleCategory(slug: string | null) {
    if (slug === null) {
      setActiveCategories([]);
      return;
    }
    setActiveCategories((prev) => (prev.length === 1 && prev[0] === slug ? [] : [slug]));
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="pt-28 sm:pt-32">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest2 text-lima-dark">
              Catálogo completo
            </span>
            <h1 className="mt-2 font-display text-4xl leading-tight text-tinta sm:text-5xl">
              Todos nuestros productos
            </h1>
            <p className="mt-3 text-tinta/60">
              {items.length} productos originales, precio mayorista y minorista. Elige tamaño y
              agrégalo al carrito.
            </p>
          </div>

          <div className="relative mt-6 max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-tinta/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre o marca…"
              className="w-full rounded-full border border-crema-line bg-white py-3 pl-11 pr-10 text-sm text-tinta placeholder:text-tinta/40 focus:border-lima focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Limpiar búsqueda"
                className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-tinta/40 hover:bg-crema-soft"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            <button
              type="button"
              onClick={() => toggleCategory(null)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                activeCategories.length === 0
                  ? 'border-lima bg-lima text-tinta'
                  : 'border-crema-line text-tinta/60 hover:border-tinta/30'
              }`}
            >
              Todos ({items.length})
            </button>
            {CATALOG_CATEGORIES.map((cat) => {
              const total = items.filter((p) => p.category === cat.slug).length;
              const isActive = activeCategories.includes(cat.slug);
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => toggleCategory(cat.slug)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'border-lima bg-lima text-tinta'
                      : 'border-crema-line text-tinta/60 hover:border-tinta/30'
                  }`}
                >
                  {cat.label} ({total})
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <p className="mt-16 text-center text-tinta/50">
              No encontramos productos para &quot;{query}&quot;. Prueba con otra palabra o{' '}
              <button type="button" onClick={() => setQuery('')} className="font-semibold text-lima-dark underline">
                limpia la búsqueda
              </button>
              .
            </p>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {filtered.map((item, i) => (
                <CatalogCard key={item.slug} item={item} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
