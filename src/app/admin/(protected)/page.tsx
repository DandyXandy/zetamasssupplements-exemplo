import Link from 'next/link';
import { Images, Package, ShoppingBag } from 'lucide-react';
import { prisma } from '@/lib/db';
import { MpStatusCheck } from '@/components/admin/MpStatusCheck';

export default async function AdminHomePage() {
  const [productCount, orderCount, pendingCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.count({ where: { status: 'pendiente' } }),
  ]);

  const cards = [
    { href: '/admin/pedidos', label: 'Pedidos', value: orderCount, hint: `${pendingCount} pendientes`, icon: ShoppingBag },
    { href: '/admin/productos', label: 'Productos', value: productCount, hint: 'en el catálogo', icon: Package },
    { href: '/admin/banner', label: 'Banner', value: 4, hint: 'slides activos', icon: Images },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-tinta">Resumen</h1>
      <p className="mt-1 text-sm text-tinta/50">Bienvenido al panel de Zeta Mass Supplements.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-crema-line bg-white p-6 transition-shadow hover:shadow-md"
          >
            <card.icon className="h-6 w-6 text-lima-dark" />
            <p className="mt-4 font-display text-3xl text-tinta">{card.value}</p>
            <p className="text-sm font-semibold text-tinta">{card.label}</p>
            <p className="text-xs text-tinta/40">{card.hint}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <MpStatusCheck />
      </div>
    </div>
  );
}
