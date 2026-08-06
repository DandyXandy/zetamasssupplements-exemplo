'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, PackageCheck } from 'lucide-react';
import type { CatalogItem } from '@/lib/catalog';
import { CatalogCard } from './CatalogCard';

export function FeaturedProducts({ items, total }: { items: CatalogItem[]; total: number }) {
  const combos = items.filter((p) => p.isCombo);

  return (
    <section id="productos" className="relative bg-crema-soft px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest2 text-lima-dark">
              Combos con regalos
            </span>
            <h2 className="mt-3 font-display text-4xl leading-tight text-tinta sm:text-5xl">
              Por cada compra, llevas tus regalos
            </h2>
            <p className="mt-4 text-tinta/70">
              Packs con creatina y regalos incluidos, al mejor precio — agrégalos directo al
              carrito o cotiza por WhatsApp.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-oro/40 bg-oro/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest2 text-oro">
            <PackageCheck className="h-4 w-4" />
            100% original — distribuidor autorizado
          </span>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
          {combos.map((item, i) => (
            <CatalogCard key={item.slug} item={item} index={i} />
          ))}
        </div>

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
