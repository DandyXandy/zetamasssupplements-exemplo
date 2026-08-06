'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

function formatPEN(value: number) {
  return `S/ ${value.toFixed(2)}`;
}

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal, count } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-tinta/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-crema-line px-5 py-4">
              <h2 className="flex items-center gap-2 font-display text-xl tracking-wide text-tinta">
                <ShoppingBag className="h-5 w-5 text-lima-dark" />
                Tu carrito {count > 0 && <span className="text-sm text-tinta/50">({count})</span>}
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Cerrar carrito"
                className="flex h-9 w-9 items-center justify-center rounded-full text-tinta/60 hover:bg-crema-soft"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-10 w-10 text-tinta/20" />
                  <p className="mt-3 text-sm text-tinta/50">Tu carrito está vacío.</p>
                  <p className="mt-1 text-xs text-tinta/35">
                    Agrega productos del catálogo para verlos aquí.
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.key} className="flex gap-3">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-crema-line bg-crema-soft">
                        <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="text-xs font-semibold uppercase tracking-wide text-oro">
                          {item.brand}
                        </p>
                        <p className="font-display text-base leading-tight tracking-wide text-tinta">
                          {item.name}
                        </p>
                        <p className="text-xs text-tinta/50">{item.sizeLabel}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-full border border-crema-line">
                            <button
                              type="button"
                              aria-label="Reducir cantidad"
                              onClick={() => updateQty(item.key, item.qty - 1)}
                              className="flex h-7 w-7 items-center justify-center text-tinta/60 hover:bg-crema-soft"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-5 text-center text-sm font-semibold text-tinta">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              aria-label="Aumentar cantidad"
                              onClick={() => updateQty(item.key, item.qty + 1)}
                              className="flex h-7 w-7 items-center justify-center text-tinta/60 hover:bg-crema-soft"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="font-mono text-sm font-bold text-tinta">
                            {formatPEN(item.price * item.qty)}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label="Quitar del carrito"
                        onClick={() => removeItem(item.key)}
                        className="h-fit text-tinta/30 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-crema-line px-5 py-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-tinta/60">Subtotal</span>
                  <span className="font-display text-2xl text-tinta">{formatPEN(subtotal)}</span>
                </div>
                <p className="mt-1 text-xs text-tinta/40">
                  Envío y regalos se confirman al finalizar tu pedido.
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="mt-4 flex items-center justify-center rounded-full bg-lima px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-tinta transition-colors hover:bg-lima-light"
                >
                  Ir a pagar
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
