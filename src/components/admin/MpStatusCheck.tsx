'use client';

import { useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';

type Report = Record<string, unknown>;

// Verificador de credenciales de Mercado Pago. Sirve para saber si el deploy
// activo tiene credenciales de PRUEBA o de PRODUCCIÓN, sin tener que leer
// errores del SDK en la consola del navegador.
export function MpStatusCheck() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function check() {
    setLoading(true);
    setError(null);
    setReport(null);
    try {
      const res = await fetch('/api/admin/mp-status');
      const data = await res.json();
      if (!res.ok) setError(data.error ?? 'No se pudo verificar.');
      else setReport(data);
    } catch {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  }

  const tipo = report?.tipoDeCredenciales as string | undefined;
  const esPrueba = tipo?.includes('PRUEBA');
  const esProduccion = tipo?.includes('PRODUCCIÓN');

  return (
    <div className="rounded-2xl border border-crema-line bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 font-display text-lg text-tinta">
            <CreditCard className="h-5 w-5 text-lima-dark" />
            Credenciales de Mercado Pago
          </h2>
          <p className="mt-1 text-xs text-tinta/50">
            Comprueba si el sitio está usando credenciales de prueba o de producción.
          </p>
        </div>
        <button
          type="button"
          onClick={check}
          disabled={loading}
          className="flex items-center gap-2 rounded-full bg-lima px-5 py-2.5 text-sm font-bold text-tinta hover:bg-lima-light disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Verificar
        </button>
      </div>

      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-xs text-red-700">{error}</p>}

      {report && (
        <div className="mt-4 space-y-3">
          {tipo && (
            <p
              className={`rounded-lg p-3 text-sm font-semibold ${
                esPrueba
                  ? 'bg-lima/15 text-lima-dark'
                  : esProduccion
                    ? 'bg-red-50 text-red-700'
                    : 'bg-crema-soft text-tinta/70'
              }`}
            >
              {tipo}
            </p>
          )}
          <dl className="divide-y divide-crema-line border-t border-crema-line text-xs">
            {Object.entries(report)
              .filter(([key]) => key !== 'tipoDeCredenciales')
              .map(([key, value]) => (
                <div key={key} className="flex gap-4 py-2">
                  <dt className="w-40 shrink-0 font-semibold text-tinta/50">{key}</dt>
                  <dd className="break-all font-mono text-tinta/70">
                    {typeof value === 'string' ? value : JSON.stringify(value)}
                  </dd>
                </div>
              ))}
          </dl>
        </div>
      )}
    </div>
  );
}
