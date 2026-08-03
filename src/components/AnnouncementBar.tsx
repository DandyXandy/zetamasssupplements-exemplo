'use client';

import { Store, Users } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-center gap-2 overflow-hidden bg-lima px-4 text-[11px] font-bold uppercase tracking-wide text-tinta sm:h-10 sm:text-xs">
      <Users className="hidden h-3.5 w-3.5 shrink-0 sm:block" />
      <span className="truncate">
        Atendemos <span className="underline decoration-2 underline-offset-2">Mayorista</span> y{' '}
        <span className="underline decoration-2 underline-offset-2">Minorista</span> — precio de
        fábrica en todo el Perú
      </span>
      <Store className="hidden h-3.5 w-3.5 shrink-0 sm:block" />
    </div>
  );
}
