import { ProductForm } from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-tinta">Nuevo producto</h1>
      <p className="mt-1 text-sm text-tinta/50">Se agrega directo al catálogo público.</p>
      <div className="mt-6">
        <ProductForm />
      </div>
    </div>
  );
}
