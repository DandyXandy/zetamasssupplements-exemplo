'use client';

export function CarouselDots({
  count,
  activeIndex,
  onSelect,
}: {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  if (count <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Ir al combo ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === activeIndex ? 'w-6 bg-lima' : 'w-2 bg-tinta/15 hover:bg-tinta/30'
          }`}
        />
      ))}
    </div>
  );
}
