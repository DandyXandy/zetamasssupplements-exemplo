'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Beef,
  Dna,
  Droplets,
  Flame,
  Gift,
  Pill,
  Sparkles,
  TrendingUp,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { CATALOG_CATEGORIES, type CatalogItem } from '@/lib/catalog';
import { CatalogCard } from './CatalogCard';

const ICONS: Record<string, LucideIcon> = {
  Gift,
  TrendingUp,
  Beef,
  Sparkles,
  Zap,
  Flame,
  Dna,
  Pill,
  Droplets,
};

const PREVIEW_COUNT = 8;

export function CategoryGrid({ items }: { items: CatalogItem[] }) {
  const [activeCategory, setActiveCategory] = useState(CATALOG_CATEGORIES[1].slug);

  const products = items.filter((p) => p.category === activeCategory).slice(0, PREVIEW_COUNT);
  const total = items.filter((p) => p.category === activeCategory).length;

  return (
    <section className="relative bg-crema px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-lima-dark">
            Categorías
          </span>
          <h2 className="mt-3 font-display text-4xl leading-tight text-tinta sm:text-5xl">
            Busca por categoría
          </h2>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {CATALOG_CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.icon];
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'border-lima bg-lima text-tinta'
                    : 'border-crema-line bg-white text-tinta/60 hover:border-tinta/30'
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4"
        >
          {products.map((item, i) => (
            <CatalogCard key={item.slug} item={item} index={i} />
          ))}
        </motion.div>

        {total > PREVIEW_COUNT && (
          <div className="mt-8 text-center">
            <Link
              href={`/tienda?categoria=${activeCategory}`}
              className="inline-flex items-center gap-2 rounded-full border border-tinta/15 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-tinta transition-colors hover:border-tinta/40"
            >
              Ver los {total} productos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
