'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: '¿Hacen envíos a todo el Perú?',
    a: 'Sí, enviamos a todas las regiones del Perú 🇵🇪. En Lima y Callao trabajamos además con pago contra entrega.',
  },
  {
    q: '¿Cuál es la diferencia entre precio mayorista y minorista?',
    a: 'El precio mayorista aplica para compras por volumen (gimnasios, tiendas, revendedores). El minorista es para tu consumo personal, en la cantidad que necesites — ambos con producto 100% original.',
  },
  {
    q: '¿Los productos son originales?',
    a: 'Sí, somos distribuidores autorizados. Todo el catálogo que ves en la página y en nuestro Instagram es producto original de fábrica.',
  },
  {
    q: '¿Cómo hago un pedido?',
    a: 'Eliges el producto, sabor y cantidad en la página, y al tocar "Consultar por WhatsApp" te llega el mensaje listo para enviar. Te confirmamos disponibilidad y precio al toque.',
  },
  {
    q: '¿Tienen tienda física para visitar?',
    a: 'Atendemos por WhatsApp y coordinamos la entrega o recojo. Escríbenos y te indicamos la mejor forma de recibir tu pedido en Lima, Callao o provincia.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-crema px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-lima-dark">
            Preguntas frecuentes
          </span>
          <h2 className="mt-3 font-display text-4xl leading-tight text-tinta sm:text-5xl">
            Todo antes de escribirnos
          </h2>
        </div>

        <div className="mt-10 divide-y divide-crema-line rounded-2xl border border-crema-line bg-white shadow-sm">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
                >
                  <span className="font-display text-base tracking-wide text-tinta sm:text-lg">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-lima-dark transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-tinta/70 sm:px-7">{item.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
