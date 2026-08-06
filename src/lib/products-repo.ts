import { prisma } from '@/lib/db';
import type { CatalogItem } from '@/lib/catalog';
import type { Product } from '@/generated/prisma';

// Puente entre la tabla Product (editable desde el panel admin) y el tipo
// CatalogItem que ya usan los componentes públicos del sitio (CatalogCard,
// CategoryGrid, FeaturedProducts, TiendaClient). Solo para uso en Server
// Components / route handlers — nunca lo importes desde un componente cliente.

export type FullProductSize = { label: string; price: number | null; image?: string };
export type FullProductFlavor = { label: string; image?: string };

export type FullProduct = Omit<CatalogItem, 'sizes'> & {
  id: string;
  sizes: FullProductSize[];
  description: string | null;
  shortDescription: string | null;
  style: string | null;
  benefits: string[];
  usage: string | null;
  images: string[];
  flavors: FullProductFlavor[];
};

function toCatalogItem(p: Product): CatalogItem {
  return {
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    isCombo: p.isCombo,
    comboDescription: p.comboDescription ?? undefined,
    badge: p.badge ?? undefined,
    sizes: JSON.parse(p.sizes),
    image: JSON.parse(p.images)[0] ?? '/branding/zeta-mascot.png',
  };
}

function toFullProduct(p: Product): FullProduct {
  return {
    ...toCatalogItem(p),
    id: p.id,
    sizes: JSON.parse(p.sizes),
    description: p.description,
    shortDescription: p.shortDescription,
    style: p.style,
    benefits: p.benefits ? JSON.parse(p.benefits) : [],
    usage: p.usage,
    images: JSON.parse(p.images),
    flavors: p.flavors ? JSON.parse(p.flavors) : [],
  };
}

export async function getAllCatalogItems(): Promise<CatalogItem[]> {
  const products = await prisma.product.findMany({ orderBy: { name: 'asc' } });
  return products.map(toCatalogItem);
}

export async function getFullProductBySlug(slug: string): Promise<FullProduct | null> {
  const product = await prisma.product.findUnique({ where: { slug } });
  return product ? toFullProduct(product) : null;
}

export async function getRelatedFullProducts(slug: string, category: string, max = 4): Promise<CatalogItem[]> {
  const products = await prisma.product.findMany({
    where: { category, slug: { not: slug } },
    take: max,
  });
  return products.map(toCatalogItem);
}

// Combos destacados en la home (sección "Combos con regalos"). Máximo 6 —
// si hay más productos con isCombo=true, solo se muestran los primeros 6.
export async function getFeaturedCombos(max = 6): Promise<CatalogItem[]> {
  const products = await prisma.product.findMany({
    where: { isCombo: true },
    orderBy: { updatedAt: 'desc' },
    take: max,
  });
  return products.map(toCatalogItem);
}

export async function getHeroSlides() {
  const slides = await prisma.bannerSlide.findMany({ orderBy: { position: 'asc' } });
  return slides.map((s) =>
    s.type === 'video'
      ? { type: 'video' as const, src: s.url, poster: s.posterUrl ?? '/videos/hero-cover.jpg' }
      : { type: 'image' as const, src: s.url, alt: 'Zeta Mass Supplements' },
  );
}
