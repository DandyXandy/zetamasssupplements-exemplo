'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, PackageCheck } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { QuickOrderWhatsApp } from './QuickOrderWhatsApp';

export function FeaturedProducts() {
  return (
    <section id="productos" className="relative bg-carbon px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest2 text-lima">
              Productos destacados
            </span>
            <h2 className="mt-3 font-display text-4xl leading-tight text-hueso sm:text-5xl">
              Las marcas que ya conoces, al precio mayorista
            </h2>
            <p className="mt-4 text-hueso/70">
              Elige sabor y cantidad, y te confirmamos disponibilidad y precio al instante por
              WhatsApp — mismo trato mayorista o minorista.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-oro/40 bg-oro/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest2 text-oro">
            <PackageCheck className="h-4 w-4" />
            100% original — distribuidor autorizado
          </span>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {PRODUCTS.map((product, i) => (
            <motion.article
              key={product.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className="flex flex-col overflow-hidden rounded-3xl border border-white/8 bg-tinta"
            >
              <Link
                href={`/productos/${product.slug}`}
                className="relative block h-72 w-full shrink-0 overflow-hidden bg-hueso/[0.04] sm:h-80"
              >
                <Image
                  src={product.image}
                  alt={`${product.name} — ${product.brand}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-8 transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-tinta/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest2 text-lima backdrop-blur">
                  {product.category}
                </span>
              </Link>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-wide text-oro">
                  {product.brand}
                </p>
                <Link href={`/productos/${product.slug}`}>
                  <h3 className="mt-1 font-display text-2xl leading-tight tracking-wide text-hueso hover:text-lima">
                    {product.name}
                  </h3>
                </Link>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-hueso/50">
                  <span>{product.weight}</span>
                  <span>·</span>
                  <span>{product.servings}</span>
                </div>

                <p className="mt-3 text-sm text-hueso/70">{product.shortDescription}</p>

                <ul className="mt-4 space-y-1.5">
                  {product.benefits.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-hueso/60">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-lima" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-white/8 pt-5">
                  <QuickOrderWhatsApp productName={product.name} flavors={product.flavors} compact />
                </div>

                <Link
                  href={`/productos/${product.slug}`}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-hueso/20 py-3 text-sm font-semibold text-hueso transition-colors hover:border-hueso/50"
                >
                  Ver detalles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
