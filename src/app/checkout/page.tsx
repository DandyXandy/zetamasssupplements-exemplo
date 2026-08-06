'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, FileCheck2, MessageCircle, Smartphone } from 'lucide-react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CardPaymentForm, type PaymentResult } from '@/components/CardPaymentForm';
import { useCart } from '@/lib/cart-context';
import { WHATSAPP_PRIMARY, waLink } from '@/lib/content';

function formatPEN(value: number) {
  return `S/ ${value.toFixed(2)}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, updateQty, clear } = useCart();
  const [customer, setCustomer] = useState({
    name: '',
    dni: '',
    email: '',
    phone: '',
    address: '',
    district: '',
  });
  const [method, setMethod] = useState<'tarjeta' | 'yape'>('tarjeta');

  const isValid =
    customer.name.trim() &&
    /^\d{8}$/.test(customer.dni.trim()) &&
    customer.phone.trim() &&
    customer.address.trim() &&
    customer.email.trim();

  const orderDescription = items.map((i) => `${i.name} (${i.sizeLabel}) x${i.qty}`).join(', ');
  const externalReference = `zm-${Date.now()}`;

  const whatsappMessage = [
    'Hola Zeta Mass! Quiero pagar con Yape mi pedido:',
    ...items.map((i) => `• ${i.name} (${i.sizeLabel}) x${i.qty} — ${formatPEN(i.price * i.qty)}`),
    `Total: ${formatPEN(subtotal)}`,
    `Nombre: ${customer.name}`,
    `DNI: ${customer.dni}`,
    `Teléfono: ${customer.phone}`,
    `Dirección: ${customer.address}, ${customer.district}`,
    'Les envío la captura de mi Yape apenas confirmen el número.',
  ].join('\n');

  function handlePaymentResult(result: PaymentResult) {
    if (result.status === 'approved') {
      clear();
      router.push('/checkout/success');
    } else if (result.status === 'in_process') {
      router.push('/checkout/pending');
    }
    // 'rejected' se muestra inline dentro de CardPaymentForm — el cliente se queda
    // en la misma página para reintentar, sin perder su carrito.
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-screen bg-crema pt-28 sm:pt-32">
        <div className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
          <Link href="/tienda" className="inline-flex items-center gap-1.5 text-sm text-tinta/60 hover:text-lima-dark">
            <ArrowLeft className="h-4 w-4" />
            Seguir comprando
          </Link>

          <h1 className="mt-4 font-display text-4xl leading-tight text-tinta sm:text-5xl">
            Finalizar pedido
          </h1>

          {items.length === 0 ? (
            <p className="mt-6 text-tinta/60">
              Tu carrito está vacío.{' '}
              <Link href="/tienda" className="font-semibold text-lima-dark underline">
                Ver catálogo
              </Link>
            </p>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div className="space-y-5">
                <div className="rounded-2xl border border-crema-line bg-white p-5">
                  <h2 className="font-display text-xl tracking-wide text-tinta">Tu pedido</h2>
                  <ul className="mt-4 divide-y divide-crema-line">
                    {items.map((item) => (
                      <li key={item.key} className="flex items-center gap-3 py-3">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-crema-line bg-crema-soft">
                          <Image src={item.image} alt={item.name} fill className="object-contain p-1.5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-tinta">{item.name}</p>
                          <p className="text-xs text-tinta/50">{item.sizeLabel}</p>
                        </div>
                        <input
                          type="number"
                          min={1}
                          value={item.qty}
                          onChange={(e) => updateQty(item.key, Number(e.target.value))}
                          className="w-14 rounded-lg border border-crema-line px-2 py-1 text-center text-sm"
                        />
                        <span className="w-20 text-right font-mono text-sm font-bold text-tinta">
                          {formatPEN(item.price * item.qty)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center justify-between border-t border-crema-line pt-4">
                    <span className="font-display text-lg text-tinta">Total</span>
                    <span className="font-display text-2xl text-tinta">{formatPEN(subtotal)}</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-crema-line bg-white p-5">
                  <h2 className="font-display text-xl tracking-wide text-tinta">
                    Datos de entrega
                  </h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <input
                      placeholder="Nombre completo"
                      value={customer.name}
                      onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
                      className="rounded-xl border border-crema-line px-4 py-3 text-sm sm:col-span-2"
                    />
                    <input
                      placeholder="DNI"
                      inputMode="numeric"
                      maxLength={8}
                      value={customer.dni}
                      onChange={(e) =>
                        setCustomer((c) => ({ ...c, dni: e.target.value.replace(/\D/g, '').slice(0, 8) }))
                      }
                      className="rounded-xl border border-crema-line px-4 py-3 text-sm"
                    />
                    <input
                      placeholder="Teléfono / WhatsApp"
                      value={customer.phone}
                      onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
                      className="rounded-xl border border-crema-line px-4 py-3 text-sm"
                    />
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      value={customer.email}
                      onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))}
                      className="rounded-xl border border-crema-line px-4 py-3 text-sm sm:col-span-2"
                    />
                    <input
                      placeholder="Distrito"
                      value={customer.district}
                      onChange={(e) => setCustomer((c) => ({ ...c, district: e.target.value }))}
                      className="rounded-xl border border-crema-line px-4 py-3 text-sm sm:col-span-2"
                    />
                    <input
                      placeholder="Dirección completa"
                      value={customer.address}
                      onChange={(e) => setCustomer((c) => ({ ...c, address: e.target.value }))}
                      className="rounded-xl border border-crema-line px-4 py-3 text-sm sm:col-span-2"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-oro/30 bg-oro/[0.06] p-4 text-xs text-tinta/70">
                  <FileCheck2 className="h-5 w-5 shrink-0 text-oro" />
                  Emitimos boleta o factura por tu compra — solo pídelo al confirmar tu pedido.
                </div>
              </div>

              <div className="h-fit space-y-4 rounded-2xl border border-crema-line bg-white p-5">
                <h2 className="font-display text-xl tracking-wide text-tinta">Método de pago</h2>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMethod('tarjeta')}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border py-3 text-xs font-bold uppercase tracking-wide transition-colors ${
                      method === 'tarjeta'
                        ? 'border-lima bg-lima/10 text-lima-dark'
                        : 'border-crema-line text-tinta/50 hover:border-tinta/30'
                    }`}
                  >
                    <CreditCard className="h-5 w-5" />
                    Tarjeta
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod('yape')}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border py-3 text-xs font-bold uppercase tracking-wide transition-colors ${
                      method === 'yape'
                        ? 'border-lima bg-lima/10 text-lima-dark'
                        : 'border-crema-line text-tinta/50 hover:border-tinta/30'
                    }`}
                  >
                    <Smartphone className="h-5 w-5" />
                    Yape
                  </button>
                </div>

                {!isValid && (
                  <p className="rounded-lg bg-crema-soft p-3 text-center text-xs text-tinta/50">
                    Completa tus datos de entrega (nombre, DNI de 8 dígitos, correo, teléfono y
                    dirección) para continuar.
                  </p>
                )}

                {isValid && method === 'tarjeta' && (
                  <>
                    <p className="flex items-center gap-1.5 text-[11px] text-tinta/40">
                      Pago seguro procesado por Mercado Pago · Visa, Mastercard y más
                    </p>
                    <CardPaymentForm
                      amount={subtotal}
                      email={customer.email}
                      dni={customer.dni}
                      description={orderDescription}
                      externalReference={externalReference}
                      order={{
                        customer,
                        items: items.map((i) => ({ name: i.name, sizeLabel: i.sizeLabel, price: i.price, qty: i.qty })),
                        total: subtotal,
                      }}
                      onResult={handlePaymentResult}
                    />
                  </>
                )}

                {isValid && method === 'yape' && (
                  <div className="space-y-3 text-center">
                    <p className="text-sm text-tinta/60">
                      Te pasamos el número Yape por WhatsApp y confirmamos tu pedido apenas
                      recibamos tu captura de pago.
                    </p>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await fetch('/api/orders', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              externalReference,
                              customer,
                              items: items.map((i) => ({
                                name: i.name,
                                sizeLabel: i.sizeLabel,
                                price: i.price,
                                qty: i.qty,
                              })),
                              total: subtotal,
                              paymentMethod: 'yape',
                            }),
                          });
                        } catch {
                          // Si falla el registro, igual dejamos que coordine por WhatsApp.
                        }
                        window.open(waLink(whatsappMessage, WHATSAPP_PRIMARY), '_blank', 'noopener,noreferrer');
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-lima px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-tinta hover:bg-lima-light"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Pagar con Yape por WhatsApp
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
