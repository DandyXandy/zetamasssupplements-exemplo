'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Eye, MessageCircle, PackageCheck, ShoppingCart } from 'lucide-react';
import type { CatalogItem } from '@/lib/catalog';
import { useCart } from '@/lib/cart-context';
import { WHATSAPP_PRIMARY, waLink } from '@/lib/content';
import { CatalogCard } from './CatalogCard';

function formatPEN(value: number | null) {
  return value === null ? 'Consultar' : `S/ ${value}`;
}

// Card grande para destacar como máximo 2 combos en su propia "vitrina",
// separados de la grilla chica del resto del catálogo.
function BigComboCard({ item }: { item: CatalogItem }) {
  const [sizeIndex, setSizeIndex] = useState(() => {
    const firstAvailable = item.sizes.findIndex((s) => s.price !== null);
    return firstAvailable === -1 ? 0 : firstAvailable;
  });
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const selected = item.sizes[sizeIndex];
  const canBuy = selected.price !== null;

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

  function handleWhatsApp() {
    const message = `Hola, me interesa el combo ${item.name} (${selected.label}). ¿Podrían confirmar disponibilidad y precio?`;
    window.open(waLink(message, WHATSAPP_PRIMARY), '_blank', 'noopener,noreferrer');
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col overflow-hidden rounded-3xl border border-crema-line bg-white shadow-sm"
    >
      <Link href={`/productos/${item.slug}`} className="relative block aspect-[5/4] w-full bg-crema-soft">
        <Image
          src={item.image}
          alt={`${item.name} — ${item.brand}`}
          fill
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="object-contain p-8"
        />
        <span className="absolute left-4 top-4 rounded-full bg-oro px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
          Combo + regalos
        </span>
        {item.badge && (
          <span className="absolute right-4 top-4 rounded-full bg-lima px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-tinta">
            {item.badge}
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
          <span className="font-display text-3xl text-tinta">{formatPEN(selected.price)}</span>

          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={handleAdd}
              disabled={!canBuy}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-wide transition-colors ${
                !canBuy
                  ? 'cursor-not-allowed bg-crema-soft text-tinta/30'
                  : added
                    ? 'bg-lima-dark text-white'
                    : 'bg-lima text-tinta hover:bg-lima-light'
              }`}
            >
              {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
              {added ? 'Agregado' : 'Agregar al carrito'}
            </button>
            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 rounded-full border border-crema-line px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-tinta transition-colors hover:border-tinta/40"
            >
              <MessageCircle className="h-4 w-4" />
            </button>
          </div>
          <Link
            href={`/productos/${item.slug}`}
            className="mt-2.5 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-tinta/50 hover:text-tinta"
          >
            <Eye className="h-3.5 w-3.5" />
            Ver detalles del combo
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedProducts({ combos, total }: { combos: CatalogItem[]; total: number }) {
  const [featured, rest] = [combos.slice(0, 2), combos.slice(2)];

  return (
    <section id="productos" className="relative bg-crema-soft px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest2 text-lima-dark">
              Combos con regalos
            </span>
            <h2 className="mt-3 font-display text-4xl leading-tight text-tinta sm:text-5xl">
              Tu mejor versión, al mejor precio
            </h2>
            <p className="mt-4 text-tinta/70">
              Combos con creatina y regalos incluidos — todo lo que necesitas para subir de
              nivel, en un solo pedido.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-oro/40 bg-oro/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest2 text-oro">
            <PackageCheck className="h-4 w-4" />
            100% original — distribuidor autorizado
          </span>
        </div>

        {featured.length > 0 && (
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {featured.map((item) => (
              <BigComboCard key={item.slug} item={item} />
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {rest.map((item, i) => (
              <CatalogCard key={item.slug} item={item} index={i} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-10 text-center"
        >
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 rounded-full border border-tinta/15 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-tinta transition-colors hover:border-tinta/40"
          >
            Ver catálogo completo ({total} productos)
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
