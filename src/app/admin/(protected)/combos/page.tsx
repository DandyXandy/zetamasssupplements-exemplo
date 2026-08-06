import { prisma } from '@/lib/db';
import { CombosManager } from '@/components/admin/CombosManager';

export default async function AdminCombosPage() {
  const combos = await prisma.product.findMany({
    where: { isCombo: true },
    orderBy: { updatedAt: 'desc' },
  });

  const data = combos.map((c) => ({
    id: c.id,
    name: c.name,
    comboDescription: c.comboDescription,
    badge: c.badge,
    images: JSON.parse(c.images) as string[],
  }));

  return (
    <div>
      <h1 className="font-display text-3xl text-tinta">Combos</h1>
      <p className="mt-1 text-sm text-tinta/50">
        {data.length} de un máximo de 6 combos se muestran en la sección destacada de la home.
        Cambia la foto principal o el sello de marketing de cada uno.
      </p>

      <div className="mt-6">
        <CombosManager combos={data} />
      </div>
    </div>
  );
}
