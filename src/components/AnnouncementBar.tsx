'use client';

import { Store, Users } from 'lucide-react';

function Message() {
  return (
    <span className="mx-6 flex shrink-0 items-center gap-2 sm:mx-10">
      <Users className="h-3.5 w-3.5 shrink-0" />
      Atendemos <span className="underline decoration-2 underline-offset-2">Mayorista</span> y{' '}
      <span className="underline decoration-2 underline-offset-2">Minorista</span> — precio de
      fábrica en todo el Perú
      <Store className="h-3.5 w-3.5 shrink-0" />
    </span>
  );
}

export function AnnouncementBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-9 items-center overflow-hidden bg-lima text-[11px] font-bold uppercase tracking-wide text-tinta sm:h-10 sm:text-xs">
      <div className="marquee-track flex w-max items-center whitespace-nowrap">
        <Message />
        <Message />
      </div>
    </div>
  );
}
