'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Gift, Images, LayoutGrid, LogOut, Package, ShoppingBag } from 'lucide-react';

const NAV = [
  { href: '/admin', label: 'Resumen', icon: LayoutGrid, exact: true },
  { href: '/admin/pedidos', label: 'Pedidos', icon: ShoppingBag },
  { href: '/admin/productos', label: 'Productos', icon: Package },
  { href: '/admin/combos', label: 'Combos', icon: Gift },
  { href: '/admin/banner', label: 'Banner', icon: Images },
];

export function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-crema-soft">
      <aside className="flex w-60 shrink-0 flex-col border-r border-crema-line bg-tinta">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <Image
            src="/branding/zeta-mascot.png"
            alt="Zeta Mass"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="font-display text-sm tracking-wide text-hueso">ZETA MASS ADMIN</span>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? 'bg-lima text-tinta' : 'text-hueso/70 hover:bg-white/5'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-5 py-4">
          <p className="truncate text-xs text-hueso/40">{email}</p>
          <button
            type="button"
            onClick={logout}
            className="mt-2 flex items-center gap-2 text-xs font-semibold text-hueso/60 hover:text-red-400"
          >
            <LogOut className="h-3.5 w-3.5" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden px-6 py-8 sm:px-10">{children}</main>
    </div>
  );
}
