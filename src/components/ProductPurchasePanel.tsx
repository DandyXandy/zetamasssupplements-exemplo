'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, MessageCircle, Minus, Plus, ShoppingCart, Zap } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { WHATSAPP_PRIMARY, waLink } from '@/lib/content';
import type { FullProduct } from '@/lib/products-repo';

function formatPEN(value: number | null) {
  return value === null ? 'Consultar precio' : `S/ ${value}`;
}

export function ProductPurchasePanel({ product }: { product: FullProduct }) {
  const router = useRouter();
  const { addItem } = useCart();

  const [sizeIndex, setSizeIndex] = useState(() => {
    const firstAvailable = product.sizes.findIndex((s) => s.price !== null);
    return firstAvailable === -1 ? 0 : firstAvailable;
  });
  const [flavorIndex, setFlavorIndex] = useState(0);
  const [thumbIndex, setThumbIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const size = product.sizes[sizeIndex];
  const flavor = product.flavors[flavorIndex];
  const canBuy = size?.price !== null && size?.price !== undefined;

  const activeImage = useMemo(() => {
    return (
      flavor?.image ||
      size?.image ||
      product.images[thumbIndex] ||
      product.images[0] ||
      '/branding/zeta-mascot.png'
    );
  }, [flavor, size, product.images, thumbIndex]);

  function handleSizeChange(i: number) {
    setSizeIndex(i);
    setThumbIndex(0);
  }

  function handleFlavorChange(i: number) {
    setFlavorIndex(i);
    setThumbIndex(0);
  }

  function handleAddToCart() {
    if (!canBuy || size.price === null) return;
    addItem({
      slug: product.slug,
      name: flavor ? `${product.name} — ${flavor.label}` : product.name,
      brand: product.brand,
      image: activeImage,
      sizeLabel: size.label,
      price: size.price,
    }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleBuyNow() {
    if (!canBuy || size.price === null) return;
    addItem({
      slug: product.slug,
      name: flavor ? `${product.name} — ${flavor.label}` : product.name,
      brand: product.brand,
      image: activeImage,
      sizeLabel: size.label,
      price: size.price,
    }, qty);
    router.push('/checkout');
  }

  function handleWhatsApp() {
    const message = [
      `Hola, me interesa el producto ${product.name}`,
      flavor ? `sabor ${flavor.label}` : null,
      size ? `presentación ${size.label}` : null,
      `cantidad ${qty} unidad${qty > 1 ? 'es' : ''}`,
    ]
      .filter(Boolean)
      .join(', ')
      .concat('. ¿Podrían confirmar disponibilidad y precio?');
    window.open(waLink(message, WHATSAPP_PRIMARY), '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <div>
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-crema-line bg-crema-soft">
          {product.isCombo && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-oro px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white">
              Combo + regalos
            </span>
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <Image
                src={activeImage}
                alt={`${product.name} — ${product.brand}`}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain p-8 sm:p-12"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {product.images.length > 1 && (
          <div className="mt-4 flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={img + i}
                type="button"
                onClick={() => setThumbIndex(i)}
                aria-label={`Ver imagen ${i + 1}`}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-crema-soft transition-colors ${
                  activeImage === img ? 'border-lima' : 'border-crema-line hover:border-tinta/30'
                }`}
              >
                <Image src={img} alt={`${product.name} foto ${i + 1}`} fill className="object-contain p-2" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-oro">
          {product.brand} · {product.category}
        </p>
        <h1 className="mt-1 font-display text-4xl leading-tight tracking-wide text-tinta sm:text-5xl">
          {product.name}
        </h1>

        {product.shortDescription && (
          <p className="mt-4 text-tinta/70">{product.shortDescription}</p>
        )}
        {product.comboDescription && (
          <p className="mt-4 text-tinta/70">{product.comboDescription}</p>
        )}

        <div className="mt-6 rounded-2xl border border-crema-line bg-white p-6">
          <span className="font-display text-3xl text-tinta">{formatPEN(size?.price ?? null)}</span>

          {product.sizes.length > 1 && (
            <div className="mt-5">
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest2 text-tinta/50">
                Tamaño / Presentación
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => handleSizeChange(i)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      i === sizeIndex
                        ? 'border-lima bg-lima text-tinta'
                        : 'border-crema-line text-tinta/60 hover:border-tinta/30'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.flavors.length > 1 && (
            <div className="mt-5">
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest2 text-tinta/50">
                Sabor
              </p>
              <div className="flex flex-wrap gap-2">
                {product.flavors.map((f, i) => (
                  <button
                    key={f.label}
                    type="button"
                    onClick={() => handleFlavorChange(i)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      i === flavorIndex
                        ? 'border-lima bg-lima text-tinta'
                        : 'border-crema-line text-tinta/60 hover:border-tinta/30'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest2 text-tinta/50">
              Cantidad
            </p>
            <div className="flex h-10 w-fit items-center gap-1 rounded-full border border-crema-line px-1">
              <button
                type="button"
                aria-label="Reducir cantidad"
                onClick={() => setQty((v) => Math.max(1, v - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full text-tinta/70 hover:bg-crema-soft"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-tinta">{qty}</span>
              <button
                type="button"
                aria-label="Aumentar cantidad"
                onClick={() => setQty((v) => v + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-tinta/70 hover:bg-crema-soft"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-2.5">
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={!canBuy}
              className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-wide transition-colors ${
                !canBuy
                  ? 'cursor-not-allowed bg-crema-soft text-tinta/30'
                  : 'bg-tinta text-white hover:bg-tinta/85'
              }`}
            >
              <Zap className="h-4 w-4" />
              Finalizar compra
            </button>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!canBuy}
              className={`flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-bold uppercase tracking-wide transition-colors ${
                !canBuy
                  ? 'cursor-not-allowed border-crema-line text-tinta/30'
                  : added
                    ? 'border-lima-dark bg-lima-dark text-white'
                    : 'border-lima bg-lima text-tinta hover:bg-lima-light'
              }`}
            >
              {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
              {added ? 'Agregado al carrito' : 'Agregar al carrito'}
            </button>
            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-crema-line px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-tinta transition-colors hover:border-tinta/40"
            >
              <MessageCircle className="h-4 w-4" />
              Pedir por WhatsApp
            </button>
          </div>

          {!canBuy && (
            <p className="mt-3 text-center text-[11px] text-tinta/40">
              Precio a confirmar por WhatsApp según stock y presentación.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
