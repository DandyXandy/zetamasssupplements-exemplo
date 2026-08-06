'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';

export function CarouselHeader({
  onPrev,
  onNext,
  canPrev,
  canNext,
}: {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="max-w-xl">
        <span className="text-xs font-semibold uppercase tracking-widest2 text-lima-dark">
          Combos con regalos
        </span>
        <h2 className="mt-3 font-display text-4xl leading-tight text-tinta sm:text-5xl">
          🎁 Combos con Regalos
        </h2>
        <p className="mt-4 text-tinta/70">Ahorra más comprando nuestros combos exclusivos.</p>
      </div>

      <div className="hidden shrink-0 items-center gap-2 sm:flex">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          aria-label="Combo anterior"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-crema-line text-tinta transition-colors hover:border-tinta/40 hover:bg-crema-soft disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-crema-line disabled:hover:bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          aria-label="Siguiente combo"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-crema-line text-tinta transition-colors hover:border-tinta/40 hover:bg-crema-soft disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-crema-line disabled:hover:bg-transparent"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
