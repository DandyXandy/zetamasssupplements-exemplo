'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { waLink } from '@/lib/content';
import { HangTag, Stamp } from './HangTag';

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-end overflow-hidden pt-24">
      {/* FOTO REAL 1/5 — reel do dueño en la tienda con Optimum Nutrition Isolate
          (Instagram reel DaTKjKyx5NZ). Reemplazar por una foto en mayor resolución
          cuando el cliente la envíe. */}
      <Image
        src="/images/hero-tienda-optimum.jpg"
        alt="Tienda Zeta Mass Supplements con estantes de Optimum Nutrition"
        fill
        priority
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-tinta via-tinta/75 to-tinta/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-tinta/70 via-transparent to-tinta/40" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-5 pb-16 sm:px-8 sm:pb-24 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-lima/40 bg-lima/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest2 text-lima">
            <MapPin className="h-3.5 w-3.5" />
            Distribuidor autorizado · Lima, Perú
          </span>

          <h1 className="font-display text-[13vw] leading-[0.92] text-hueso sm:text-6xl lg:text-[5.2rem]">
            PRECIO
            <br />
            MAYORISTA <span className="text-lima">.</span>
            <br />
            TODO EL PERÚ
          </h1>

          <p className="mt-6 max-w-lg text-base text-hueso/80 sm:text-lg">
            Venta de suplementos deportivos por mayor y por menor. Somos distribuidores
            autorizados con envíos a todo el Perú 🇵🇪 y pago contra entrega en Lima y Callao.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink('Hola Zeta Mass! Quiero cotizar suplementos al precio mayorista 💪')}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-lima px-7 py-4 text-sm font-bold uppercase tracking-wide text-tinta transition-colors hover:bg-lima-light"
            >
              Cotizar por WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#productos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-hueso/25 px-7 py-4 text-sm font-bold uppercase tracking-wide text-hueso transition-colors hover:border-hueso/60"
            >
              Ver catálogo
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, rotate: 6 }}
          animate={{ opacity: 1, y: 0, rotate: -4 }}
          transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
          className="justify-self-start lg:justify-self-end"
        >
          <HangTag rotate={-4} className="w-64">
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-carbon-700/70">
              Pack Trainer
            </p>
            <p className="mt-1 font-display text-4xl text-carbon">S/393</p>
            <p className="mt-1 text-xs text-carbon-700">
              3x Creatina MyProtein 250g + 3x Gaspari 300g
            </p>
            <Stamp className="mt-3 text-lima-dark">Precio mayorista</Stamp>
          </HangTag>
        </motion.div>
      </div>
    </section>
  );
}
