'use client';

import Link from 'next/link';
import { XCircle } from 'lucide-react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WHATSAPP_PRIMARY, waLink } from '@/lib/content';

export default function CheckoutFailurePage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-28 text-center sm:pt-32">
        <XCircle className="h-16 w-16 text-red-500" strokeWidth={1.5} />
        <h1 className="mt-5 font-display text-4xl text-tinta sm:text-5xl">
          El pago no se pudo procesar
        </h1>
        <p className="mt-3 max-w-md text-tinta/60">
          No te preocupes, tu carrito sigue guardado. Puedes intentar de nuevo o coordinar tu
          pedido directo por WhatsApp.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/checkout"
            className="rounded-full bg-lima px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-tinta hover:bg-lima-light"
          >
            Intentar de nuevo
          </Link>
          <a
            href={waLink('Hola Zeta Mass! Tuve un problema pagando en la web, ¿me ayudan a completar mi pedido?', WHATSAPP_PRIMARY)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-tinta/20 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-tinta hover:border-tinta/40"
          >
            Coordinar por WhatsApp
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
