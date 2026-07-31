'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Wallet } from 'lucide-react';
import { TRUST_BRANDS } from '@/lib/content';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Distribuidor autorizado',
    text: 'Producto 100% original, comprado directo a las marcas que revendemos.',
  },
  {
    icon: Truck,
    title: 'Envíos a todo el Perú',
    text: 'Recíbelo en cualquier región. En Lima y Callao, pago contra entrega.',
  },
  {
    icon: Wallet,
    title: 'Precio mayorista',
    text: 'Por mayor y por menor, con el mismo precio que manejamos en tienda física.',
  },
];

export function About() {
  return (
    <section id="nosotros" className="relative bg-carbon px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative order-2 aspect-[4/5] w-full overflow-hidden rounded-2xl lg:order-1"
        >
          {/* FOTO REAL 3/5 — estante real de la tienda con Ronnie Coleman Creatine XS
              y tarjeta de presentación "ZETAMAS SUPLEMENTS" (Instagram post DOqyQTHkSPH). */}
          <Image
            src="/images/vitrine-estante-creatina.jpg"
            alt="Estante real de la tienda Zeta Mass Supplements"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon/70 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="order-1 lg:order-2"
        >
          <span className="text-xs font-semibold uppercase tracking-widest2 text-lima">
            Sobre Zeta Mass
          </span>
          <h2 className="mt-3 font-display text-4xl leading-tight text-hueso sm:text-5xl">
            La tienda que ya conoces del feed, ahora con página propia
          </h2>
          <p className="mt-4 text-hueso/70">
            Somos distribuidores autorizados de suplementación deportiva en Perú, con venta por
            mayor y por menor. Trabajamos con las marcas que ves en nuestros posts y reels — sin
            intermediarios, al precio que le damos a nuestros clientes mayoristas.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div key={pillar.title}>
                <pillar.icon className="h-6 w-6 text-lima" strokeWidth={1.75} />
                <h3 className="mt-3 text-sm font-bold text-hueso">{pillar.title}</h3>
                <p className="mt-1 text-xs text-hueso/60">{pillar.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="text-xs uppercase tracking-widest2 text-hueso/40">
              Marcas que distribuimos
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {TRUST_BRANDS.map((brand) => (
                <span key={brand} className="font-display text-lg tracking-wide text-hueso/50">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
