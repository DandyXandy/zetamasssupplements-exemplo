'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { waLink } from '@/lib/content';
import { HangTag, Stamp } from './HangTag';

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-end overflow-hidden pt-36 sm:pt-40">
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
      <div className="absolute inset-0 bg-gradient-to-t from-tinta via-tinta/80 to-tinta/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-tinta/75 via-transparent to-tinta/50" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-5 pb-16 sm:px-8 sm:pb-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="mb-5 inline-flex items-center overflow-hidden rounded-full border border-white/15 text-xs font-black uppercase tracking-wide sm:text-sm">
            <span className="bg-lima px-4 py-2 text-tinta">Mayorista</span>
            <span className="bg-tinta/60 px-2 py-2 text-hueso/70">y</span>
            <span className="bg-oro px-4 py-2 text-tinta">Minorista</span>
          </div>

          <h1 className="font-display text-[11vw] leading-[0.95] text-hueso sm:text-6xl lg:text-[4.6rem]">
            LOS MEJORES SUPLEMENTOS
            <span className="text-lima"> NACIONALES</span> E
            <span className="text-oro"> IMPORTADOS</span>
          </h1>

          <p className="mt-6 max-w-lg text-base text-hueso/80 sm:text-lg">
            Para deportistas y gimnasios. Distribuidor autorizado con envíos a todo el Perú 🇵🇪 y
            pago contra entrega en Lima y Callao — mismo precio de fábrica seas mayorista o
            comprador minorista.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#productos"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-lima px-7 py-4 text-sm font-bold uppercase tracking-wide text-tinta transition-colors hover:bg-lima-light"
            >
              Ver Productos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={waLink('Hola Zeta Mass! Quiero cotizar suplementos al precio mayorista 💪')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-hueso/25 px-7 py-4 text-sm font-bold uppercase tracking-wide text-hueso transition-colors hover:border-hueso/60"
            >
              <MessageCircle className="h-4 w-4" />
              Hablar por WhatsApp
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-[280px] lg:max-w-[320px]"
        >
          {/* Imagen real del producto — Optimum Nutrition Gold Standard Whey 2.27kg */}
          <div className="relative aspect-square w-full">
            <Image
              src="/images/productos/on-gold-standard-whey.jpg"
              alt="Optimum Nutrition Gold Standard Whey 2.27kg"
              fill
              priority
              className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 8 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            className="absolute -bottom-4 -left-6 sm:-left-10"
          >
            <HangTag rotate={-6} className="w-48">
              <p className="font-mono text-[10px] uppercase tracking-widest2 text-carbon-700/70">
                Precio mayorista
              </p>
              <p className="mt-1 font-display text-2xl leading-none text-carbon">Consúltalo</p>
              <p className="mt-1 text-[11px] text-carbon-700">por WhatsApp, sin compromiso</p>
              <Stamp className="mt-2 text-lima-dark">100% original</Stamp>
            </HangTag>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
