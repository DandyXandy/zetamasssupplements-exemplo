import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

// Diagnóstico de las credenciales de Mercado Pago que están REALMENTE
// activas en el deploy. Existe porque los errores del SDK no dicen cuál de
// las dos credenciales está mal (ni si el deploy todavía tiene las viejas),
// y NEXT_PUBLIC_MP_PUBLIC_KEY queda incrustada en el build: cambiarla en el
// panel no tiene efecto hasta volver a desplegar.
//
// Solo devuelve el prefijo de cada credencial (nunca el valor completo) para
// poder compararlo con el panel de Mercado Pago sin exponer los secretos.

// Tarjeta y documento tomados tal cual de "Tarjetas de prueba" dentro de la
// propia aplicación en Mercado Pago (Perú): con el nombre APRO, el documento
// de prueba oficial es "123456789" (9 dígitos), no un DNI real de 8.
const TEST_CARD = {
  card_number: '5031755734530604',
  expiration_month: 11,
  expiration_year: 2030,
  security_code: '123',
  cardholder: { name: 'APRO', identification: { type: 'DNI', number: '123456789' } },
};

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });

  const accessToken = process.env.MP_ACCESS_TOKEN?.trim();
  const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY?.trim();

  const report: Record<string, unknown> = {
    // Mostramos también el final: dos tokens distintos pueden empezar igual,
    // y así se puede confirmar de un vistazo si el valor cambió de verdad.
    accessToken: accessToken
      ? {
          prefijo: accessToken.slice(0, 16) + '…',
          final: '…' + accessToken.slice(-6),
          largo: accessToken.length,
        }
      : 'FALTA (no está configurada)',
    publicKey: publicKey
      ? {
          prefijo: publicKey.slice(0, 16) + '…',
          final: '…' + publicKey.slice(-6),
          largo: publicKey.length,
        }
      : 'FALTA (no está configurada)',
  };

  // Qué cuenta de Mercado Pago corresponde al access token. Si es un usuario
  // de prueba (tag "test_user"), las credenciales salieron de una cuenta de
  // prueba y no de la aplicación real — un caso que confunde bastante.
  if (accessToken) {
    try {
      const meRes = await fetch('https://api.mercadopago.com/users/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (meRes.ok) {
        const me = (await meRes.json()) as {
          id?: number;
          nickname?: string;
          site_id?: string;
          tags?: string[];
        };
        report.cuentaMercadoPago = {
          id: me.id,
          nickname: me.nickname,
          pais: me.site_id,
          esUsuarioDePrueba: me.tags?.includes('test_user') ? 'SÍ' : 'NO',
        };
      } else {
        report.cuentaMercadoPago = `El access token fue rechazado (HTTP ${meRes.status}). Puede estar incompleto o vencido.`;
      }
    } catch (error) {
      report.cuentaMercadoPago = `No se pudo consultar: ${(error as Error).message}`;
    }
  }

  // ¿La public key existe? Tokenizar no cobra nada, solo valida la clave.
  if (publicKey) {
    try {
      const res = await fetch(
        `https://api.mercadopago.com/v1/card_tokens?public_key=${encodeURIComponent(publicKey)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(TEST_CARD),
        },
      );
      const data = (await res.json()) as { id?: string };
      report.publicKeyValida =
        res.status === 201
          ? 'SÍ — la clave existe y funciona'
          : `NO — Mercado Pago respondió ${res.status}. Revisa que esté copiada completa.`;

      // Con un card token real podemos saber si el access token es de prueba
      // o de producción: Mercado Pago bloquea tarjetas de prueba cuando las
      // credenciales son productivas, y ese es justo el error que queremos
      // identificar sin tener que adivinar.
      if (res.status === 201 && data.id && accessToken) {
        const payRes = await fetch('https://api.mercadopago.com/v1/payments', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'X-Idempotency-Key': `diag-${Date.now()}`,
          },
          body: JSON.stringify({
            // Mercado Pago rechaza transaction_amount muy bajo (ej. 1) con
            // "Invalid value for transaction_amount" — sin relación con las
            // credenciales. 100 evita ese falso positivo en el diagnóstico.
            transaction_amount: 100,
            token: data.id,
            description: 'Diagnostico de credenciales (no es una venta)',
            installments: 1,
            payment_method_id: 'master',
            payer: { email: 'test@test.com', identification: { type: 'DNI', number: '123456789' } },
          }),
        });
        const payData = (await payRes.json()) as {
          status?: string;
          message?: string;
          causes?: { description?: string }[];
        };
        const motivo = payData.causes?.[0]?.description ?? payData.message;
        // Mostramos el texto crudo de Mercado Pago siempre, en vez de solo la
        // etiqueta clasificada — así se ve el motivo real del rechazo aunque
        // no encaje en ninguno de los casos que reconocemos abajo.
        report.respuestaCrudaDelPago = { httpStatus: payRes.status, motivo, statusMP: payData.status };

        if (payRes.ok) {
          report.tipoDeCredenciales = 'PRUEBA ✅ — la tarjeta de prueba fue aceptada, todo listo para testear.';
          report.pagoDePruebaCreado = { id: (payData as { id?: number }).id, status: payData.status };
        } else if (motivo?.toLowerCase().includes('live credentials')) {
          report.tipoDeCredenciales =
            'PRODUCCIÓN ❌ — el MP_ACCESS_TOKEN activo es productivo, por eso rechaza la tarjeta de prueba. Copia el Access Token de la pestaña "Prueba" y vuelve a desplegar.';
        } else if (motivo?.toLowerCase().includes('test credentials')) {
          report.tipoDeCredenciales =
            'PRUEBA ✅ (usado con tarjeta real) — estas credenciales son de prueba, por eso no pueden cobrar tarjetas reales. Con la tarjeta de prueba deberían funcionar.';
        } else {
          report.tipoDeCredenciales = `No se pudo clasificar automáticamente. Mira "respuestaCrudaDelPago" abajo para el motivo exacto que dio Mercado Pago (HTTP ${payRes.status}).`;
        }
      }
    } catch (error) {
      report.errorDeRed = (error as Error).message;
    }
  }

  // La public key viaja incrustada en el JavaScript del build, así que si se
  // cambió en el panel sin volver a desplegar, el navegador sigue usando la
  // anterior aunque el servidor ya tenga el token nuevo.
  report.recordatorio =
    'NEXT_PUBLIC_MP_PUBLIC_KEY se incrusta durante el build: después de cambiarla hay que hacer Redeploy (sin usar el cache) para que el navegador reciba la nueva.';

  return NextResponse.json(report, { status: 200 });
}
