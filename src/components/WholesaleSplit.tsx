'use client';

import { motion } from 'framer-motion';
import { Building2, MessageCircle, ShoppingBag } from 'lucide-react';
import { waLink } from '@/lib/content';

const CARDS = [
  {
    icon: Building2,
    tone: 'lima' as const,
    title: 'Compra Mayorista',
    audience: 'Gimnasios, tiendas y revendedores',
    text: 'Precios especiales por volumen para negocios que revenden o equipan su gimnasio. Te asesoramos según el pack que necesites.',
    cta: 'Cotizar como mayorista',
    message: 'Hola Zeta Mass! Represento un negocio/gimnasio y quiero cotizar precio mayorista 🏋️',
  },
  {
    icon: ShoppingBag,
    tone: 'oro' as const,
    title: 'Compra Minorista',
    audience: 'Para tu consumo personal',
    text: 'El mismo producto 100% original que vendemos por mayor, en la cantidad que necesitas para tu entrenamiento — sin mínimos de compra.',
    cta: 'Cotizar como minorista',
    message: 'Hola Zeta Mass! Quiero cotizar un producto para uso personal 💪',
  },
];

export function WholesaleSplit() {
  return (
    <section className="relative bg-carbon px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-lima">
            Cómo comprar
          </span>
          <h2 className="mt-3 font-display text-4xl leading-tight text-hueso sm:text-5xl">
            Mayorista o minorista, mismo precio de fábrica
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className={`rounded-3xl border p-7 sm:p-9 ${
                card.tone === 'lima'
                  ? 'border-lima/30 bg-lima/[0.06]'
                  : 'border-oro/30 bg-oro/[0.06]'
              }`}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  card.tone === 'lima' ? 'bg-lima text-tinta' : 'bg-oro text-tinta'
                }`}
              >
                <card.icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 font-display text-2xl tracking-wide text-hueso">{card.title}</h3>
              <p
                className={`mt-1 text-xs font-semibold uppercase tracking-widest2 ${
                  card.tone === 'lima' ? 'text-lima' : 'text-oro'
                }`}
              >
                {card.audience}
              </p>
              <p className="mt-4 text-sm text-hueso/70">{card.text}</p>

              <a
                href={waLink(card.message)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-90 ${
                  card.tone === 'lima' ? 'bg-lima text-tinta' : 'bg-oro text-tinta'
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                {card.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
