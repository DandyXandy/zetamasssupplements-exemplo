'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Eye, Gift, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import type { CatalogItem } from '@/lib/catalog';

function formatPEN(value: number | null) {
  return value === null ? 'Consultar' : `S/ ${value}`;
}

export function CarouselCard({ item }: { item: CatalogItem }) {
  const [sizeIndex, setSizeIndex] = useState(() => {
    const firstAvailable = item.sizes.findIndex((s) => s.price !== null);
    return firstAvailable === -1 ? 0 : firstAvailable;
  });
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const selected = item.sizes[sizeIndex];
  const canBuy = selected.price !== null;
  // Solo se muestra si el producto tiene un precio original real cargado —
  // por ahora ningún combo lo tiene, así que esta parte simplemente no
  // aparece (no se inventan descuentos).
  const originalPrice = (item as { originalPrice?: number }).originalPrice;
  const hasDiscount = !!(originalPrice && selected.price !== null && originalPrice > selected.price);

  function handleAdd() {
    if (!canBuy || selected.price === null) return;
    addItem({
      slug: item.slug,
      name: item.name,
      brand: item.brand,
      image: item.image,
      sizeLabel: selected.label,
      price: selected.price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-crema-line bg-white shadow-sm transition-all duration-[350ms] ease-out hover:-translate-y-2 hover:shadow-xl">
      <Link
        href={`/productos/${item.slug}`}
        className="relative block aspect-[6/5] w-full shrink-0 overflow-hidden bg-crema-soft"
      >
        <Image
          src={item.image}
          alt={`${item.name} — ${item.brand}`}
          fill
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="object-contain p-8 transition-transform duration-[350ms] ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-oro px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
          Combo + regalos
        </span>
        {item.isCombo && (
          <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-lima px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-tinta">
            <Gift className="h-3 w-3" />
            Free gifts
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-2xl leading-tight tracking-wide text-tinta sm:text-[1.75rem]">
          {item.name}
        </h3>
        {(item.comboDescription || item.shortDescription) && (
          <p className="mt-2 text-sm text-tinta/60">{item.comboDescription ?? item.shortDescription}</p>
        )}

        {item.sizes.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.sizes.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setSizeIndex(i)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  i === sizeIndex
                    ? 'border-lima bg-lima text-tinta'
                    : 'border-crema-line text-tinta/60 hover:border-tinta/30'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto pt-5">
          <div className="flex items-baseline gap-2.5">
            <span className="font-display text-3xl text-tinta">{formatPEN(selected.price)}</span>
            {hasDiscount && (
              <>
                <span className="text-base text-tinta/35 line-through">S/ {originalPrice}</span>
                <span className="rounded-full bg-lima/15 px-2 py-0.5 text-xs font-bold text-lima-dark">
                  Ahorras S/ {(originalPrice as number) - (selected.price as number)}
                </span>
              </>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={handleAdd}
              disabled={!canBuy}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-wide transition-all duration-[350ms] ${
                !canBuy
                  ? 'cursor-not-allowed bg-crema-soft text-tinta/30'
                  : added
                    ? 'bg-lima-dark text-white'
                    : 'bg-lima text-tinta hover:bg-lima-light hover:shadow-[0_0_18px_rgba(98,195,62,0.55)]'
              }`}
            >
              {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
              {added ? 'Agregado' : 'Agregar al carrito'}
            </button>
            <Link
              href={`/productos/${item.slug}`}
              className="flex items-center justify-center gap-2 rounded-full border border-crema-line px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-tinta transition-colors hover:border-tinta/40"
            >
              <Eye className="h-4 w-4" />
              Ver detalles
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
