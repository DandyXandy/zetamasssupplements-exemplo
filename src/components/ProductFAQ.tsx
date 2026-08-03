'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function ProductFAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-white/10 rounded-xl border border-white/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
            >
              <span className="text-sm font-semibold text-hueso">{item.q}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-lima transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && <div className="px-4 pb-4 text-sm text-hueso/65">{item.a}</div>}
          </div>
        );
      })}
    </div>
  );
}
