'use client';

import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WHATSAPP_PRIMARY, waLink } from '@/lib/content';

export default function CheckoutSuccessPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-28 text-center sm:pt-32">
        <CheckCircle2 className="h-16 w-16 text-lima-dark" strokeWidth={1.5} />
        <h1 className="mt-5 font-display text-4xl text-tinta sm:text-5xl">¡Pago confirmado!</h1>
        <p className="mt-3 max-w-md text-tinta/60">
          Gracias por tu compra. Te escribiremos por WhatsApp para coordinar la entrega de tu
          pedido y tus regalos.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={waLink('Hola Zeta Mass! Acabo de realizar un pago en la web, quiero coordinar mi entrega 💪', WHATSAPP_PRIMARY)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-lima px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-tinta hover:bg-lima-light"
          >
            Avisar por WhatsApp
          </a>
          <Link
            href="/tienda"
            className="rounded-full border border-tinta/20 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-tinta hover:border-tinta/40"
          >
            Seguir comprando
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
