'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Eye, ShoppingCart, Sparkles } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import type { CatalogItem } from '@/lib/catalog';

function formatPEN(value: number | null) {
  return value === null ? 'Consultar' : `S/ ${value}`;
}

export function CatalogCard({ item, index = 0 }: { item: CatalogItem; index?: number }) {
  const availableSizes = item.sizes.filter((s) => s.price !== null);
  const [sizeIndex, setSizeIndex] = useState(() => {
    const firstAvailable = item.sizes.findIndex((s) => s.price !== null);
    return firstAvailable === -1 ? 0 : firstAvailable;
  });
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const selected = item.sizes[sizeIndex];
  const canBuy = selected.price !== null;

  const handleAdd = () => {
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
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4), ease: 'easeOut' }}
      className="flex flex-col overflow-hidden rounded-2xl border border-crema-line bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <Link href={`/productos/${item.slug}`} className="relative block h-44 w-full bg-crema-soft sm:h-52">
        <Image
          src={item.image}
          alt={`${item.name} — ${item.brand}`}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-contain p-5"
        />
        {item.isCombo && (
          <span className="absolute left-3 top-3 rounded-full bg-oro px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            Combo + regalos
          </span>
        )}
        {item.badge && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-lima px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-tinta">
            <Sparkles className="h-3 w-3" />
            {item.badge}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-oro">{item.brand}</p>
        <Link href={`/productos/${item.slug}`}>
          <h3 className="mt-0.5 font-display text-base leading-tight tracking-wide text-tinta hover:text-lima-dark">
            {item.name}
          </h3>
        </Link>

        {item.sizes.length > 1 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {item.sizes.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setSizeIndex(i)}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
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

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-display text-xl text-tinta">{formatPEN(selected.price)}</span>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!canBuy}
            aria-label={canBuy ? 'Añadir al carrito' : 'Consultar precio'}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              !canBuy
                ? 'cursor-not-allowed bg-crema-soft text-tinta/30'
                : added
                  ? 'bg-lima-dark text-white'
                  : 'bg-lima text-tinta hover:bg-lima-light'
            }`}
          >
            {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
          </button>
        </div>
        {availableSizes.length === 0 && (
          <p className="mt-1 text-[10px] text-tinta/40">Precio a confirmar por WhatsApp</p>
        )}

        <Link
          href={`/productos/${item.slug}`}
          className="glow-pulse mt-3 flex items-center justify-center gap-1.5 rounded-full bg-tinta px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-tinta/85"
        >
          <Eye className="h-3.5 w-3.5" />
          Ver producto
        </Link>
      </div>
    </motion.article>
  );
}
