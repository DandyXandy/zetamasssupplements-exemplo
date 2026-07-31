import type { Metadata } from 'next';
import { Anton, Manrope, Space_Mono } from 'next/font/google';
import './globals.css';

const anton = Anton({
  subsets: ['latin'],
  variable: '--font-anton',
  weight: ['400'],
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Zeta Mass Supplements — Precio Mayorista en Todo el Perú',
  description:
    'Distribuidor autorizado de suplementos deportivos: whey, isolate, creatina, pre-entreno y colágeno al mejor precio mayorista. Envíos a todo el Perú, pago contra entrega en Lima y Callao.',
  icons: {
    icon: '/images/zeta-logo.jpg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE" className={`${anton.variable} ${manrope.variable} ${spaceMono.variable}`}>
      <body className="bg-tinta font-sans text-hueso antialiased">{children}</body>
    </html>
  );
}
