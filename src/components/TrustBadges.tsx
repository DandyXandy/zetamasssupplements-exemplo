import { BadgeCheck, Lock, ShieldCheck, Truck } from 'lucide-react';

const BADGES = [
  { icon: Lock, label: 'Pago 100% seguro', sub: 'Encriptado por Mercado Pago' },
  { icon: ShieldCheck, label: 'Garantía de originalidad', sub: 'Productos 100% originales' },
  { icon: BadgeCheck, label: 'Distribuidor autorizado', sub: 'Compra directa de fábrica' },
  { icon: Truck, label: 'Envíos a todo el Perú', sub: 'Empaque seguro y discreto' },
];

export function TrustBadges({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`grid gap-3 ${compact ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}
    >
      {BADGES.map(({ icon: Icon, label, sub }) => (
        <div
          key={label}
          className="flex items-start gap-2 rounded-xl border border-crema-line bg-crema-soft/60 p-3"
        >
          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-lima-dark" />
          <div>
            <p className="text-[11px] font-bold leading-tight text-tinta">{label}</p>
            {!compact && <p className="mt-0.5 text-[10px] leading-tight text-tinta/50">{sub}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
