import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { ProductForm, type ProductFormData } from '@/components/admin/ProductForm';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  const initial: Partial<ProductFormData> = {
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    category: product.category,
    isCombo: product.isCombo,
    comboDescription: product.comboDescription ?? '',
    shortDescription: product.shortDescription ?? '',
    description: product.description ?? '',
    style: product.style ?? '',
    benefits: product.benefits ? (JSON.parse(product.benefits) as string[]).join('\n') : '',
    usage: product.usage ?? '',
    images: JSON.parse(product.images),
    sizes: JSON.parse(product.sizes),
    flavors: product.flavors ? JSON.parse(product.flavors) : [],
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-tinta">Editar producto</h1>
      <p className="mt-1 text-sm text-tinta/50">{product.name}</p>
      <div className="mt-6">
        <ProductForm productId={product.id} initial={initial} />
      </div>
    </div>
  );
}
