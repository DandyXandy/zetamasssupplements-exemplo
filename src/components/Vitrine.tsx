'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { PRODUCT_CATEGORIES, waLink } from '@/lib/content';

export function Vitrine() {
  return (
    <section id="productos" className="relative bg-tinta px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-lima">
            Catálogo
          </span>
          <h2 className="mt-3 font-display text-4xl leading-tight text-hueso sm:text-5xl">
            Creatina, proteína, pre-entreno y colágeno
          </h2>
          <p className="mt-4 text-hueso/70">
            Todo lo que ya conoces del feed, ahora en una sola vitrina — con el mismo precio de
            mayorista que manejamos por WhatsApp.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT_CATEGORIES.map((product, i) => (
            <motion.article
              key={product.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-carbon"
            >
              <div className="relative h-48 w-full overflow-hidden">
                {/* FOTO REAL — ver comentario en src/lib/content.ts para el origen
                    de cada imagen (posts/reels reales de @zetamassupplements). */}
                <Image
                  src={product.image}
                  alt={`${product.label} — ${product.brands}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/10 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-xl tracking-wide text-hueso">
                    {product.label}
                  </h3>
                  {product.priceTag && (
                    <span
                      className="stamp mt-0.5 shrink-0 whitespace-nowrap border-mostaza bg-mostaza/95 px-2 py-1 text-[10px] leading-none text-tinta"
                      style={{ transform: 'none' }}
                    >
                      {product.priceTag}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs uppercase tracking-wide text-oro">{product.brands}</p>
                <p className="mt-3 flex-1 text-sm text-hueso/70">{product.blurb}</p>

                <a
                  href={waLink(product.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-lima/40 py-2.5 text-sm font-semibold text-lima transition-colors hover:bg-lima hover:text-tinta"
                >
                  <MessageCircle className="h-4 w-4" />
                  Cotizar
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
