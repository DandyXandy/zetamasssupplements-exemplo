import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloatingButton } from '@/components/WhatsAppButton';
import { ProductPurchasePanel } from '@/components/ProductPurchasePanel';
import { CatalogCard } from '@/components/CatalogCard';
import { getFullProductBySlug, getRelatedFullProducts } from '@/lib/products-repo';
import { CATALOG_CATEGORIES } from '@/lib/catalog';

function categoryLabel(slug: string) {
  return CATALOG_CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getFullProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.brand} | Zeta Mass Supplements`,
    description:
      product.shortDescription ??
      `Compra ${product.name} de ${product.brand} original, con precio mayorista y minorista. Envíos a todo el Perú.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getFullProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedFullProducts(product.slug, product.category, 4);

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="pt-28 sm:pt-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <nav className="flex flex-wrap items-center gap-1.5 py-6 text-xs text-tinta/50">
            <Link href="/" className="hover:text-lima-dark">
              Inicio
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/tienda" className="hover:text-lima-dark">
              Tienda
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/tienda?categoria=${product.category}`} className="hover:text-lima-dark">
              {categoryLabel(product.category)}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-tinta/80">{product.name}</span>
          </nav>

          <div className="pb-16">
            <ProductPurchasePanel product={product} />
          </div>

          {(product.description || product.style || product.benefits.length > 0 || product.usage) && (
            <div className="grid gap-10 border-t border-crema-line pb-20 pt-14 sm:grid-cols-2">
              {product.description && (
                <section>
                  <h2 className="font-display text-2xl tracking-wide text-tinta">Descripción</h2>
                  <p className="mt-3 text-tinta/70">{product.description}</p>
                </section>
              )}

              {product.style && (
                <section>
                  <h2 className="font-display text-2xl tracking-wide text-tinta">Estilo</h2>
                  <p className="mt-3 text-tinta/70">{product.style}</p>
                </section>
              )}

              {product.benefits.length > 0 && (
                <section>
                  <h2 className="font-display text-2xl tracking-wide text-tinta">Beneficios</h2>
                  <ul className="mt-3 grid gap-2">
                    {product.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-tinta/70">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lima" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {product.usage && (
                <section>
                  <h2 className="font-display text-2xl tracking-wide text-tinta">Modo de uso</h2>
                  <p className="mt-3 text-tinta/70">{product.usage}</p>
                </section>
              )}
            </div>
          )}

          {related.length > 0 && (
            <section className="border-t border-crema-line pb-24 pt-14">
              <h2 className="font-display text-3xl tracking-wide text-tinta">Te puede gustar</h2>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {related.map((r, i) => (
                  <CatalogCard key={r.slug} item={r} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
