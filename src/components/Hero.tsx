'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Store,
} from 'lucide-react';
import { waLink } from '@/lib/content';

export type HeroSlide =
  | { type: 'video'; src: string; poster: string }
  | { type: 'image'; src: string; alt: string };

// Fallback si todavía no hay slides guardados en la base de datos (panel
// admin → Banner). Una vez que el admin sube contenido, este arreglo deja
// de usarse.
const DEFAULT_SLIDES: HeroSlide[] = [
  { type: 'video', src: '/videos/hero.mp4', poster: '/videos/hero-cover.jpg' },
  {
    type: 'image',
    src: '/images/hero-tienda-optimum.jpg',
    alt: 'Tienda Zeta Mass Supplements con estantes de Optimum Nutrition',
  },
  {
    type: 'image',
    src: '/videos/hero-cover.jpg',
    alt: 'Suplementos originales Zeta Mass: Psychotic, Venom Inferno y PreADN Thunder',
  },
  {
    type: 'image',
    src: '/images/vitrine-estante-creatina.jpg',
    alt: 'Estante real de la tienda Zeta Mass con Creatine XS de Ronnie Coleman',
  },
];

const BADGES = [
  { icon: Store, label: 'Mayorista' },
  { icon: ShoppingBag, label: 'Minorista' },
  { icon: ShieldCheck, label: '100% Originales' },
  { icon: MessageCircle, label: 'Respuesta rápida por WhatsApp' },
];

const SLIDE_DURATION = 6000;

export function Hero({ slides }: { slides?: HeroSlide[] }) {
  const SLIDES = slides && slides.length > 0 ? slides : DEFAULT_SLIDES;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [index]);

  const goTo = (i: number) => setIndex((i + SLIDES.length) % SLIDES.length);

  return (
    <section
      id="inicio"
      className="relative bg-tinta pt-24 sm:flex sm:min-h-[100svh] sm:items-end sm:overflow-hidden sm:pt-40"
    >
      {/* En mobile la imagen/video va en su propia caja con object-contain:
          se ve la composición completa, sin recortar los costados. En
          desktop vuelve al tratamiento cinematográfico a pantalla completa
          (object-cover) superpuesto con el texto. */}
      <div className="relative aspect-video w-full overflow-hidden sm:absolute sm:inset-0 sm:aspect-auto sm:h-auto">
        {/* Las 4 capas del carrusel quedan montadas todo el tiempo y solo se
            cruzan por opacidad — evita parpadeos y condiciones de carrera con
            el ciclo de montaje/desmontaje de un carrusel más "inteligente". */}
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            aria-hidden={i !== index}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            {slide.type === 'video' ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={slide.poster}
                className="h-full w-full object-contain object-top sm:object-cover"
              >
                <source src={slide.src} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                className="object-contain object-top sm:object-cover"
              />
            )}
          </div>
        ))}

        <div className="absolute inset-0 hidden bg-gradient-to-t from-tinta via-tinta/70 to-tinta/30 sm:block" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-tinta/70 via-transparent to-tinta/40 sm:block" />

        {/* Navegación manual del carrusel */}
        <button
          type="button"
          aria-label="Slide anterior"
          onClick={() => goTo(index - 1)}
          className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-tinta/40 text-hueso backdrop-blur-sm transition-colors hover:bg-tinta/60 sm:left-6"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Slide siguiente"
          onClick={() => goTo(index + 1)}
          className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-tinta/40 text-hueso backdrop-blur-sm transition-colors hover:bg-tinta/60 sm:right-6"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-6 sm:px-8 sm:py-0 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-[10vw] leading-[0.95] text-hueso sm:text-6xl lg:text-7xl">
            SUPLEMENTOS <span className="text-lima">ORIGINALES</span>
          </h1>

          <div className="mt-4 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:gap-3">
            <a
              href={waLink('Hola Zeta Mass! Quiero cotizar suplementos al precio mayorista 💪')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-hueso/25 px-6 py-3 text-sm font-bold uppercase tracking-wide text-hueso transition-colors hover:border-hueso/60 sm:px-7 sm:py-4"
            >
              <MessageCircle className="h-4 w-4" />
              Contactar
            </a>
            <a
              href="/tienda"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-lima px-6 py-3 text-sm font-bold uppercase tracking-wide text-tinta transition-colors hover:bg-lima-light sm:px-7 sm:py-4"
            >
              Ver Catálogo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 sm:mt-6 sm:gap-y-2">
            {BADGES.map((badge) => (
              <span
                key={badge.label}
                className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-hueso/60"
              >
                <badge.icon className="h-3.5 w-3.5 text-lima" />
                {badge.label}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="mt-4 flex justify-center gap-2 sm:mt-8 sm:justify-start">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir al slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-lima' : 'w-1.5 bg-hueso/40 hover:bg-hueso/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
