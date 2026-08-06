'use client';

import Link from 'next/link';
import { Droplets, Flame, TrendingUp, Zap } from 'lucide-react';
import { GOALS } from '@/lib/catalog';

const ICONS = {
  'perder-peso': Droplets,
  'ganar-musculo': TrendingUp,
  'aumentar-peso': Flame,
  'aumentar-energia': Zap,
} as const;

export function GoalsStrip() {
  return (
    <section className="border-y border-crema-line bg-white px-5 py-6 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest2 text-tinta/40">
          Elige tu objetivo
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {GOALS.map((goal) => {
            const Icon = ICONS[goal.slug as keyof typeof ICONS];
            return (
              <Link
                key={goal.slug}
                href={`/tienda?categoria=${goal.categories.join(',')}`}
                className="group flex items-center gap-2.5 rounded-xl border border-crema-line px-4 py-3 transition-colors hover:border-lima/50 hover:bg-lima/5"
              >
                <Icon className="h-4 w-4 shrink-0 text-lima-dark" />
                <span className="text-xs font-semibold text-tinta sm:text-sm">{goal.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
