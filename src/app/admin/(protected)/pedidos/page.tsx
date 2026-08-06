import { prisma } from '@/lib/db';
import { OrderStatusSelect } from '@/components/admin/OrderStatusSelect';

function formatPEN(value: number) {
  return `S/ ${value.toFixed(2)}`;
}

const STATUS_STYLES: Record<string, string> = {
  aprobado: 'bg-lima/15 text-lima-dark',
  pendiente: 'bg-oro/15 text-oro',
  en_revision: 'bg-blue-100 text-blue-700',
  rechazado: 'bg-red-100 text-red-700',
};

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <h1 className="font-display text-3xl text-tinta">Pedidos</h1>
      <p className="mt-1 text-sm text-tinta/50">{orders.length} pedidos registrados.</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-crema-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-crema-line text-xs uppercase tracking-wide text-tinta/40">
            <tr>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Productos</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Método</th>
              <th className="px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-crema-line">
            {orders.map((order) => {
              const items = JSON.parse(order.items) as { name: string; sizeLabel: string; qty: number }[];
              return (
                <tr key={order.id}>
                  <td className="px-4 py-3 text-xs text-tinta/50">
                    {order.createdAt.toLocaleDateString('es-PE')}{' '}
                    {order.createdAt.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-tinta">{order.customerName}</p>
                    <p className="text-xs text-tinta/50">DNI: {order.customerDni}</p>
                    <p className="text-xs text-tinta/50">{order.customerPhone}</p>
                    <p className="text-xs text-tinta/40">
                      {order.customerAddress}, {order.customerDistrict}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-xs text-tinta/70">
                    {items.map((i) => `${i.name} (${i.sizeLabel}) x${i.qty}`).join(', ')}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-tinta">{formatPEN(order.total)}</td>
                  <td className="px-4 py-3 text-xs uppercase text-tinta/60">{order.paymentMethod}</td>
                  <td className="px-4 py-3">
                    <OrderStatusSelect
                      orderId={order.id}
                      status={order.status}
                      className={STATUS_STYLES[order.status] ?? 'bg-crema-soft text-tinta/60'}
                    />
                  </td>
                </tr>
              );
            })}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-tinta/40">
                  Todavía no hay pedidos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
