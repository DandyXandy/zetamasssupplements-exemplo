'use client';

import Link from 'next/link';
import { ArrowRight, Droplets, Flame, TrendingUp, Zap } from 'lucide-react';
import { GOALS } from '@/lib/catalog';

const CARD_STYLE = {
  'perder-peso': { icon: Droplets, className: 'bg-tinta text-hueso' },
  'ganar-musculo': { icon: TrendingUp, className: 'bg-lima text-tinta' },
  'aumentar-peso': { icon: Flame, className: 'bg-oro text-tinta' },
  'aumentar-energia': { icon: Zap, className: 'bg-mostaza text-tinta' },
} as const;

export function GoalsStrip() {
  return (
    <section className="border-y border-crema-line bg-white py-8 sm:py-12">
      <p className="mb-4 px-5 text-center text-xs font-semibold uppercase tracking-widest2 text-tinta/40 sm:px-8">
        Elige tu objetivo
      </p>
      <div className="flex flex-col gap-0 sm:mx-auto sm:max-w-6xl sm:flex-row sm:gap-4 sm:px-8">
        {GOALS.map((goal) => {
          const style = CARD_STYLE[goal.slug as keyof typeof CARD_STYLE];
          const Icon = style.icon;
          return (
            <Link
              key={goal.slug}
              href={`/tienda?categoria=${goal.categories.join(',')}`}
              className={`group relative flex h-40 items-center justify-between overflow-hidden px-6 transition-opacity hover:opacity-90 sm:h-48 sm:flex-1 sm:rounded-2xl sm:px-5 ${style.className}`}
            >
              <Icon className="absolute -bottom-4 -right-4 h-28 w-28 opacity-15 sm:h-24 sm:w-24" />
              <span className="relative font-display text-2xl leading-tight tracking-wide sm:text-xl">
                {goal.label}
              </span>
              <ArrowRight className="relative h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
