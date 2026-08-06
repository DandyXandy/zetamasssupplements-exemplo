'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

// PLACEHOLDER — no se encontraron reseñas/testimonios públicos en el perfil de
// Instagram (solo un comentario negativo sobre precios). Estructura lista para
// reemplazar por capturas reales de WhatsApp o reseñas de clientes cuando el
// cliente las envíe. Se muestran como "ejemplo" para no pasar contenido
// inventado como real frente al dueño de la marca.
const MESSAGES = [
  {
    name: 'Cliente mayorista · Lima',
    text: 'Compré el pack de creatina para revender en mi box, llegó completo y a tiempo. Buen precio.',
    time: '10:42',
  },
  {
    name: 'Cliente · Callao',
    text: 'Pedí el Whey Gold Pro, pago contra entrega tal cual decían. Todo original.',
    time: '18:05',
  },
  {
    name: 'Cliente · Provincia',
    text: 'Envío a provincia llegó en el tiempo que me dijeron por WhatsApp. Repito pedido seguro.',
    time: '09:17',
  },
];

export function SocialProof() {
  return (
    <section id="opiniones" className="relative bg-crema-soft px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-lima-dark">
            Opiniones
          </span>
          <h2 className="mt-3 font-display text-4xl leading-tight text-tinta sm:text-5xl">
            Así conversan nuestros clientes
          </h2>
          <p className="mt-3 text-xs text-tinta/40">
            Ejemplo de formato — se reemplaza por capturas reales de WhatsApp/Instagram del
            cliente antes de publicar.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {MESSAGES.map((msg, i) => (
            <motion.div
              key={msg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl rounded-tl-sm bg-lima/15 p-5"
            >
              <p className="text-sm leading-relaxed text-tinta/90">{msg.text}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-lima-dark">{msg.name}</span>
                <span className="flex items-center gap-1 text-[11px] text-tinta/40">
                  {msg.time}
                  <Check className="h-3 w-3 text-lima-dark" />
                  <Check className="-ml-2 h-3 w-3 text-lima-dark" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
