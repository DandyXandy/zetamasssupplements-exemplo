'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import { waLink } from '@/lib/content';
import { useCart } from '@/lib/cart-context';

const LINKS = [
  { href: '/tienda', label: 'Tienda' },
  { href: '/#nosotros', label: 'Nosotros' },
  { href: '/#opiniones', label: 'Opiniones' },
  { href: '/#contacto', label: 'Contacto' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { count, openCart } = useCart();
  const router = useRouter();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/tienda?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-9 z-40 border-b border-white/5 bg-tinta/85 backdrop-blur-md sm:top-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="/#inicio" className="flex items-center gap-2.5">
          <Image
            src="/branding/zeta-mascot.png"
            alt="Zeta Mass Supplements"
            width={40}
            height={40}
            className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
          />
          <Image
            src="/branding/zeta-wordmark.png"
            alt="Zeta Mass Suplements"
            width={160}
            height={36}
            className="h-4 w-auto invert sm:h-5"
          />
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

        <div className="flex items-center gap-1 sm:gap-3">
          <div className="hidden items-center md:flex">
            <AnimatePresence initial={false}>
              {searchOpen && (
                <motion.form
                  onSubmit={submitSearch}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <input
                    autoFocus
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar productos…"
                    className="w-[200px] rounded-full border border-white/15 bg-tinta px-4 py-2 text-sm text-hueso placeholder:text-hueso/40 focus:border-lima focus:outline-none"
                  />
                </motion.form>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label={searchOpen ? 'Cerrar búsqueda' : 'Buscar productos'}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-hueso hover:bg-white/5"
            >
              {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>
          </div>
          <a
            href={waLink('Hola Zeta Mass! Quiero cotizar suplementos al precio mayorista 💪')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-lima px-5 py-2.5 text-sm font-bold text-tinta transition-colors hover:bg-lima-light sm:inline-block"
          >
            Comprar por WhatsApp
          </a>
          <button
            type="button"
            onClick={openCart}
            aria-label="Abrir carrito"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-hueso hover:bg-white/5"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-lima px-1 text-[10px] font-bold text-tinta">
                {count}
              </span>
            )}
          </button>
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
              <form onSubmit={submitSearch} className="relative mb-2">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-hueso/40" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar productos…"
                  className="w-full rounded-full border border-white/15 bg-tinta py-2.5 pl-10 pr-4 text-sm text-hueso placeholder:text-hueso/40 focus:border-lima focus:outline-none"
                />
              </form>
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
