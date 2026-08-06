'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import type { CatalogItem } from '@/lib/catalog';
import { CarouselHeader } from './combo-carousel/CarouselHeader';
import { CarouselCard } from './combo-carousel/CarouselCard';
import { CarouselDots } from './combo-carousel/CarouselDots';

// Vitrina premium de combos: carrusel horizontal con drag, scroll con
// rueda del mouse, flechas y swipe en mobile. Los combos vienen como un
// array de CatalogItem (misma data que el resto del catálogo — hoy sale
// de Postgres vía getFeaturedCombos, listo para cualquier fuente futura).
export function ComboCarousel({ items }: { items: CatalogItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', duration: 28 },
    [WheelGesturesPlugin()],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  if (items.length === 0) return null;

  return (
    <section
      id="productos"
      className="relative bg-gradient-to-b from-white via-[#fbfff7] to-white px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <CarouselHeader onPrev={scrollPrev} onNext={scrollNext} canPrev={canPrev} canNext={canNext} />

        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y gap-5">
            {items.map((item) => (
              <div
                key={item.slug}
                className="min-w-0 shrink-0 grow-0 basis-[92%] sm:basis-[62%] lg:basis-[45%]"
              >
                <CarouselCard item={item} />
              </div>
            ))}
          </div>
        </div>

        <CarouselDots count={items.length} activeIndex={selectedIndex} onSelect={scrollTo} />
      </div>
    </section>
  );
}
