import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { prisma } from '@/lib/db';
import { DeleteProductButton } from '@/components/admin/DeleteProductButton';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { name: 'asc' } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-tinta">Productos</h1>
          <p className="mt-1 text-sm text-tinta/50">{products.length} productos en el catálogo.</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center gap-2 rounded-full bg-lima px-5 py-2.5 text-sm font-bold text-tinta hover:bg-lima-light"
        >
          <Plus className="h-4 w-4" />
          Nuevo producto
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-crema-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-crema-line text-xs uppercase tracking-wide text-tinta/40">
            <tr>
              <th className="px-4 py-3">Foto</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Marca</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-crema-line">
            {products.map((product) => {
              const images = JSON.parse(product.images) as string[];
              return (
                <tr key={product.id}>
                  <td className="px-4 py-2.5">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-crema-line bg-crema-soft">
                      {images[0] && <Image src={images[0]} alt={product.name} fill className="object-contain p-1" />}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 font-semibold text-tinta">{product.name}</td>
                  <td className="px-4 py-2.5 text-tinta/60">{product.brand}</td>
                  <td className="px-4 py-2.5 text-tinta/60">{product.category}</td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/productos/${product.id}`}
                        className="text-xs font-semibold text-lima-dark hover:underline"
                      >
                        Editar
                      </Link>
                      <DeleteProductButton productId={product.id} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
