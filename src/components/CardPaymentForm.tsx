'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CardPayment, initMercadoPago } from '@mercadopago/sdk-react';
import { Loader2 } from 'lucide-react';

let initialized = false;

// Objeto estático — si se recrea en cada render (como un literal inline),
// el Brick de Mercado Pago lo detecta como un cambio de configuración y
// destruye/vuelve a montar su formulario interno. Con muchos renders
// seguidos (el usuario escribiendo en cualquier campo del checkout) esas
// destrucciones se pisan entre sí y el SDK termina lanzando errores del
// tipo "insertBefore"/"removeChild" sobre nodos que ya no existen.
const CUSTOMIZATION = { visual: { hidePaymentButton: false } };

export type PaymentResult =
  | { status: 'approved'; id: string | number }
  | { status: 'in_process' }
  | { status: 'rejected'; detail?: string };

export type OrderInfo = {
  customer: { name: string; dni: string; email: string; phone: string; address: string; district: string };
  items: { name: string; sizeLabel: string; price: number; qty: number }[];
  total: number;
};

export function CardPaymentForm({
  amount,
  email,
  dni,
  description,
  externalReference,
  order,
  onResult,
}: {
  amount: number;
  email: string;
  dni: string;
  description: string;
  externalReference: string;
  order: OrderInfo;
  onResult: (result: PaymentResult) => void;
}) {
  const [ready, setReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Los datos de entrega siguen cambiando mientras el cliente escribe (aun
  // con el Brick ya montado). Los leemos desde un ref dentro de onSubmit
  // para no tener que recrear ese callback — y de paso no darle al Brick
  // ninguna excusa para reinicializarse — en cada tecla.
  const latest = useRef({ description, externalReference, order, onResult });
  latest.current = { description, externalReference, order, onResult };

  const initialization = useMemo(
    () => ({ amount, payer: { email, identification: { type: 'DNI', number: dni } } }),
    [amount, email, dni],
  );

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
    if (publicKey && !initialized) {
      initMercadoPago(publicKey, { locale: 'es-PE' });
      initialized = true;
    }
  }, []);

  return (
    <div className="relative">
      {submitting && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/80">
          <Loader2 className="h-6 w-6 animate-spin text-lima-dark" />
        </div>
      )}
      {error && (
        <p className="mb-3 rounded-lg bg-red-50 p-3 text-xs text-red-700">{error}</p>
      )}
      {!ready && <p className="mb-2 text-xs text-tinta/40">Cargando formulario seguro…</p>}
      <CardPayment
        initialization={initialization}
        customization={CUSTOMIZATION}
        onReady={() => setReady(true)}
        onError={(err) => {
          console.error('CardPayment Brick error', err);
          setError('No se pudo cargar el formulario de pago. Recarga la página o usa Yape.');
        }}
        onSubmit={async (formData) => {
          const { description, externalReference, order, onResult } = latest.current;
          setSubmitting(true);
          setError(null);
          try {
            const res = await fetch('/api/payments', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ formData, description, externalReference, order }),
            });
            const data = await res.json();
            if (!res.ok) {
              setError(data.error ?? 'No se pudo procesar el pago.');
              onResult({ status: 'rejected', detail: data.error });
              return;
            }
            if (data.status === 'approved') onResult({ status: 'approved', id: data.id });
            else if (data.status === 'in_process' || data.status === 'pending')
              onResult({ status: 'in_process' });
            else {
              setError('Tu banco rechazó el pago. Verifica los datos o intenta con otra tarjeta.');
              onResult({ status: 'rejected', detail: data.statusDetail });
            }
          } catch {
            setError('No se pudo conectar con Mercado Pago.');
            onResult({ status: 'rejected' });
          } finally {
            setSubmitting(false);
          }
        }}
      />
    </div>
  );
}
