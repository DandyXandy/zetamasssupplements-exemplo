import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloatingButton } from '@/components/WhatsAppButton';
import { ProductGallery } from '@/components/ProductGallery';
import { QuickOrderWhatsApp } from '@/components/QuickOrderWhatsApp';
import { ProductFAQ } from '@/components/ProductFAQ';
import { PRODUCTS, getProductBySlug, getRelatedProducts } from '@/lib/products';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.brand} | Zeta Mass Supplements`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.slug);

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="pt-28 sm:pt-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <nav className="flex items-center gap-1.5 py-6 text-xs text-hueso/50">
            <Link href="/" className="hover:text-lima">
              Inicio
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/#productos" className="hover:text-lima">
              Productos
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-hueso/80">{product.name}</span>
          </nav>

          <div className="grid gap-10 pb-16 lg:grid-cols-2 lg:gap-14">
            <ProductGallery images={product.gallery} />

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-oro">
                {product.brand} · {product.category}
              </p>
              <h1 className="mt-1 font-display text-4xl leading-tight tracking-wide text-hueso sm:text-5xl">
                {product.name}
              </h1>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-hueso/55">
                <span>{product.weight}</span>
                <span>·</span>
                <span>{product.servings}</span>
              </div>

              <p className="mt-5 text-hueso/75">{product.shortDescription}</p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-carbon p-6">
                <QuickOrderWhatsApp productName={product.name} flavors={product.flavors} />
              </div>
            </div>
          </div>

          <div className="grid gap-12 pb-20 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-12">
              <section>
                <h2 className="font-display text-2xl tracking-wide text-hueso">Descripción</h2>
                <p className="mt-3 text-hueso/70">{product.description}</p>
              </section>

              <section>
                <h2 className="font-display text-2xl tracking-wide text-hueso">Beneficios</h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-hueso/70">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lima" />
                      {b}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl tracking-wide text-hueso">Modo de uso</h2>
                <p className="mt-3 text-hueso/70">{product.usage}</p>
              </section>

              <section>
                <h2 className="font-display text-2xl tracking-wide text-hueso">
                  Ingredientes principales
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.keyIngredients.map((ing) => (
                    <span
                      key={ing}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-hueso/70"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-display text-2xl tracking-wide text-hueso">
                  Preguntas frecuentes
                </h2>
                <div className="mt-3">
                  <ProductFAQ items={product.faqs} />
                </div>
              </section>
            </div>

            {/* Tabla nutricional */}
            <aside>
              <div className="sticky top-32 rounded-2xl border border-white/10 bg-carbon p-6">
                <h2 className="font-display text-xl tracking-wide text-hueso">
                  Información nutricional
                </h2>
                <p className="mt-1 text-xs text-hueso/50">
                  Porción: {product.nutrition.servingSize} · Porciones por envase:{' '}
                  {product.nutrition.servingsPerContainer}
                </p>
                <dl className="mt-4 divide-y divide-white/10 border-t border-white/10">
                  {product.nutrition.rows.map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-2.5">
                      <dt className="text-sm text-hueso/60">{row.label}</dt>
                      <dd className="font-mono text-sm text-hueso">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-[11px] text-hueso/40">
                  Valores de referencia según etiqueta del fabricante. Pueden variar según sabor.
                </p>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="border-t border-white/10 pb-24 pt-16">
              <h2 className="font-display text-3xl tracking-wide text-hueso">
                Productos relacionados
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/productos/${r.slug}`}
                    className="group overflow-hidden rounded-2xl border border-white/8 bg-carbon"
                  >
                    <div className="relative h-48 w-full bg-hueso/[0.04]">
                      <Image
                        src={r.image}
                        alt={r.name}
                        fill
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-oro">
                        {r.brand}
                      </p>
                      <h3 className="mt-1 font-display text-lg tracking-wide text-hueso group-hover:text-lima">
                        {r.name}
                      </h3>
                    </div>
                  </Link>
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
