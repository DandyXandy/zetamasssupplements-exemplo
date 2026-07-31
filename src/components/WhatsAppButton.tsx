'use client';

import { MessageCircle } from 'lucide-react';
import { waLink } from '@/lib/content';

export function WhatsAppFloatingButton() {
  return (
    <a
      href={waLink('Hola Zeta Mass! Quiero cotizar suplementos al precio mayorista 💪')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cotizar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-lima px-4 py-3.5 text-tinta shadow-[0_10px_30px_-6px_rgba(98,195,62,0.6)] transition-transform hover:scale-105 active:scale-95 sm:bottom-8 sm:right-8"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-lima/50 motion-reduce:animate-none" />
      <MessageCircle className="h-5 w-5 fill-tinta" strokeWidth={0} />
      <span className="hidden text-sm font-bold sm:inline">Cotizar ahora</span>
    </a>
  );
}
