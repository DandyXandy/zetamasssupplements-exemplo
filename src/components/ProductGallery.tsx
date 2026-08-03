'use client';

import { useState } from 'react';
import Image from 'next/image';

export function ProductGallery({ images }: { images: { src: string; alt: string }[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/8 bg-hueso/[0.04]">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain p-8 sm:p-12"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-hueso/[0.04] transition-colors ${
                active === i ? 'border-lima' : 'border-white/10 hover:border-white/30'
              }`}
            >
              <Image src={img.src} alt={img.alt} fill className="object-contain p-2" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
