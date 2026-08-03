'use client';

import { useState } from 'react';
import { MessageCircle, Minus, Plus } from 'lucide-react';
import { WHATSAPP_PRIMARY, waLink } from '@/lib/content';

const QUANTITIES = [1, 2, 3, 5];

export function QuickOrderWhatsApp({
  productName,
  flavors = [],
  sizes = [],
  compact = false,
}: {
  productName: string;
  flavors?: string[];
  sizes?: string[];
  compact?: boolean;
}) {
  const [flavor, setFlavor] = useState(flavors[0] ?? '');
  const [size, setSize] = useState(sizes[0] ?? '');
  const [qty, setQty] = useState(1);
  const [customQty, setCustomQty] = useState(false);

  const message = [
    `Hola, me interesa el producto ${productName}`,
    flavor ? `sabor ${flavor}` : null,
    size ? `presentación ${size}` : null,
    `cantidad ${qty} unidad${qty > 1 ? 'es' : ''}`,
  ]
    .filter(Boolean)
    .join(', ')
    .concat('. ¿Podrían confirmar disponibilidad y precio?');

  return (
    <div className={compact ? 'space-y-3' : 'space-y-4'}>
      {flavors.length > 1 && (
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest2 text-hueso/50">
            Sabor
          </p>
          <div className="flex flex-wrap gap-2">
            {flavors.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFlavor(f)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  flavor === f
                    ? 'border-lima bg-lima text-tinta'
                    : 'border-hueso/20 text-hueso/70 hover:border-hueso/50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      {sizes.length > 1 && (
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest2 text-hueso/50">
            Tamaño
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  size === s
                    ? 'border-lima bg-lima text-tinta'
                    : 'border-hueso/20 text-hueso/70 hover:border-hueso/50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest2 text-hueso/50">
          Cantidad
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {QUANTITIES.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => {
                setQty(q);
                setCustomQty(false);
              }}
              className={`h-9 min-w-9 rounded-full border px-3 text-sm font-semibold transition-colors ${
                !customQty && qty === q
                  ? 'border-lima bg-lima text-tinta'
                  : 'border-hueso/20 text-hueso/70 hover:border-hueso/50'
              }`}
            >
              {q}
            </button>
          ))}
          <div
            className={`flex h-9 items-center gap-1 rounded-full border px-1 ${
              customQty ? 'border-lima' : 'border-hueso/20'
            }`}
          >
            <button
              type="button"
              aria-label="Reducir cantidad"
              onClick={() => {
                setCustomQty(true);
                setQty((v) => Math.max(1, v - 1));
              }}
              className="flex h-7 w-7 items-center justify-center rounded-full text-hueso/70 hover:bg-white/10"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-semibold text-hueso">{qty}+</span>
            <button
              type="button"
              aria-label="Aumentar cantidad"
              onClick={() => {
                setCustomQty(true);
                setQty((v) => v + 1);
              }}
              className="flex h-7 w-7 items-center justify-center rounded-full text-hueso/70 hover:bg-white/10"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <a
        href={waLink(message, WHATSAPP_PRIMARY)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-full bg-lima px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-tinta transition-colors hover:bg-lima-light"
      >
        <MessageCircle className="h-4 w-4" />
        Consultar por WhatsApp
      </a>
    </div>
  );
}
