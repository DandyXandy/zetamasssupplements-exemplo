'use client';

const KEYWORDS = [
  'Whey Protein',
  'Creatina',
  'Pre-Entreno',
  'Hipercalórico',
  'Aminoácidos',
  'Vitaminas',
  'Suplementos Importados',
  'Mayorista',
  'Minorista',
  'Suplementos Originales',
  'Rendimiento Deportivo',
  'Nutrición Deportiva',
  'Envíos a Todo el Perú',
];

function KeywordList() {
  return (
    <span className="mx-4 flex shrink-0 items-center gap-4">
      {KEYWORDS.map((word) => (
        <span key={word} className="flex items-center gap-4">
          <span className="font-display text-lg tracking-wide text-tinta/70 sm:text-xl">
            {word}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-lima" aria-hidden="true" />
        </span>
      ))}
    </span>
  );
}

export function KeywordMarquee() {
  return (
    <div className="overflow-hidden border-y border-crema-line bg-crema-soft py-4">
      <div className="marquee-track flex w-max items-center whitespace-nowrap">
        <KeywordList />
        <KeywordList />
      </div>
    </div>
  );
}
