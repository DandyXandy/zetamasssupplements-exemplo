'use client';

import Image from 'next/image';
import { Instagram, MessageCircle, Music2 } from 'lucide-react';
import { WHATSAPP_PRIMARY, WHATSAPP_SECONDARY, waLink } from '@/lib/content';

export function Footer() {
  return (
    <footer id="contacto" className="relative bg-carbon px-5 pb-8 pt-20 sm:px-8 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest2 text-lima">
              Contacto
            </span>
            <h2 className="mt-3 font-display text-3xl leading-tight text-hueso sm:text-4xl">
              Cotiza tu pedido por WhatsApp
            </h2>
            <p className="mt-3 max-w-sm text-sm text-hueso/60">
              Atendemos Lima y Callao con pago contra entrega, y hacemos envíos a todo el Perú 🇵🇪.
              No manejamos tienda al público sin cita — todo pedido se coordina por WhatsApp.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink('Hola Zeta Mass! Quiero cotizar suplementos al precio mayorista 💪', WHATSAPP_PRIMARY)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-lima px-6 py-3.5 text-sm font-bold text-tinta hover:bg-lima-light"
              >
                <MessageCircle className="h-4 w-4" />
                +51 932 225 306
              </a>
              <a
                href={waLink('Hola Zeta Mass! Quiero cotizar suplementos al precio mayorista 💪', WHATSAPP_SECONDARY)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-hueso/20 px-6 py-3.5 text-sm font-bold text-hueso hover:border-hueso/50"
              >
                <MessageCircle className="h-4 w-4" />
                +51 908 585 329
              </a>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://www.instagram.com/zetamassupplements/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Zeta Mass Supplements"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-hueso/15 text-hueso/70 transition-colors hover:border-lima hover:text-lima"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@zetamassupplements"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de Zeta Mass Supplements"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-hueso/15 text-hueso/70 transition-colors hover:border-lima hover:text-lima"
              >
                <Music2 className="h-5 w-5" />
              </a>
              <Image
                src="/branding/zeta-mascot.png"
                alt="Zeta Mass Supplements"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
            </div>
          </div>

          {/* Zona de reparto — sin dirección física publicada por el cliente.
              Mapa centrado en Lima/Callao (zona real de pago contra entrega).
              Reemplazar el query de abajo por la dirección exacta del local
              si el cliente confirma una. */}
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Zona de reparto Zeta Mass Supplements — Lima y Callao, Perú"
              src="https://www.google.com/maps?q=-12.0464,-77.0428&z=10&output=embed"
              width="100%"
              height="320"
              style={{ border: 0, filter: 'invert(94%) hue-rotate(180deg) brightness(0.95) contrast(0.9)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-hueso/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Zeta Mass Supplements. Distribuidor autorizado — Perú.</p>
          <p>Creatina · Whey · Isolate · Pre-Entreno · Colágeno · Aminoácidos · Vitaminas</p>
        </div>
      </div>
    </footer>
  );
}
