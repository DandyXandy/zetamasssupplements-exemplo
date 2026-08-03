'use client';

import { motion } from 'framer-motion';
import { Beef, Droplets, Flame, Pill, TrendingUp, Zap, type LucideIcon } from 'lucide-react';
import { CATEGORIES } from '@/lib/products';

const ICONS: Record<string, LucideIcon> = { Beef, Zap, Flame, TrendingUp, Pill, Droplets };

export function CategoryGrid() {
  return (
    <section className="relative bg-tinta px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-lima">
            Categorías
          </span>
          <h2 className="mt-3 font-display text-4xl leading-tight text-hueso sm:text-5xl">
            Todo lo que tu entrenamiento necesita
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
          {CATEGORIES.map((cat, i) => {
            const Icon = ICONS[cat.icon];
            return (
              <motion.a
                key={cat.slug}
                href="#productos"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: 'easeOut' }}
                className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-white/8 bg-carbon p-5 transition-colors hover:border-lima/40 sm:p-6"
              >
                <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-lima/0 blur-2xl transition-colors duration-500 group-hover:bg-lima/20" />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-lima/10 text-lima transition-transform duration-300 group-hover:-translate-y-1 group-hover:bg-lima group-hover:text-tinta">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-lg tracking-wide text-hueso">{cat.label}</h3>
                  <p className="mt-1 text-xs text-hueso/55">{cat.blurb}</p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
