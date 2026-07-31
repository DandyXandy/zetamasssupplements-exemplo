'use client';

import { ReactNode } from 'react';

export function HangTag({
  children,
  rotate = -3,
  className = '',
}: {
  children: ReactNode;
  rotate?: number;
  className?: string;
}) {
  return (
    <div
      className={`hangtag px-5 pt-6 pb-4 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  );
}

export function Stamp({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`stamp text-xs px-2 py-1 ${className}`}>{children}</span>;
}
