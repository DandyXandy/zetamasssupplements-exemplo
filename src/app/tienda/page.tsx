import type { Metadata } from 'next';
import { TiendaClient } from './TiendaClient';
import { getAllCatalogItems } from '@/lib/products-repo';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const items = await getAllCatalogItems();
  return {
    title: 'Catálogo de Suplementos Originales',
    description: `Explora ${items.length} suplementos originales: whey protein, creatina, pre-entreno, hipercalóricos, aminoácidos, vitaminas y quemadores de grasa. Precio mayorista y minorista, envíos a todo el Perú.`,
  };
}

export default async function TiendaPage() {
  const items = await getAllCatalogItems();
  return <TiendaClient items={items} />;
}
