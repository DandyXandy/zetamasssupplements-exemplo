'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { waLink } from '@/lib/content';

const LINKS = [
  { href: '/#productos', label: 'Productos' },
  { href: '/#nosotros', label: 'Nosotros' },
  { href: '/#opiniones', label: 'Opiniones' },
  { href: '/#contacto', label: 'Contacto' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-9 z-40 border-b border-white/5 bg-tinta/85 backdrop-blur-md sm:top-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="/#inicio" className="flex items-center gap-3">
          <Image
            src="/images/zeta-logo.jpg"
            alt="Zeta Mass Supplements"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border-2 border-lima object-cover"
          />
          <span className="font-display text-lg tracking-wide text-hueso">
            ZETA <span className="text-lima">MASS</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-hueso/80 transition-colors hover:text-lima"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={waLink('Hola Zeta Mass! Quiero cotizar suplementos al precio mayorista 💪')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-lima px-5 py-2.5 text-sm font-bold text-tinta transition-colors hover:bg-lima-light sm:inline-block"
          >
            Comprar por WhatsApp
          </a>
          <button
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-hueso md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-white/5 bg-tinta md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-3 text-base font-medium text-hueso/90 hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={waLink('Hola Zeta Mass! Quiero cotizar suplementos al precio mayorista 💪')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-full bg-lima px-5 py-3 text-center text-sm font-bold text-tinta"
              >
                Comprar por WhatsApp
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
