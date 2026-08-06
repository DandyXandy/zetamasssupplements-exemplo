'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AlertCircle, Loader2, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'No se pudo iniciar sesión.');
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-tinta px-5">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-carbon p-8">
        <div className="flex flex-col items-center">
          <Image
            src="/branding/zeta-mascot.png"
            alt="Zeta Mass Supplements"
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
          />
          <h1 className="mt-4 font-display text-2xl tracking-wide text-hueso">Panel Admin</h1>
          <p className="mt-1 text-xs text-hueso/50">Zeta Mass Supplements</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-3">
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-xs text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}
          <input
            type="email"
            required
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-tinta px-4 py-3 text-sm text-hueso placeholder:text-hueso/30 focus:border-lima focus:outline-none"
          />
          <input
            type="password"
            required
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-tinta px-4 py-3 text-sm text-hueso placeholder:text-hueso/30 focus:border-lima focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-lima px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-tinta transition-colors hover:bg-lima-light disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
