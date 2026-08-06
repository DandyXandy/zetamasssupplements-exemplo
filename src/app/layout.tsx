import type { Metadata } from 'next';
import { Anton, Manrope, Space_Mono } from 'next/font/google';
import { CartProvider } from '@/lib/cart-context';
import { CartDrawer } from '@/components/CartDrawer';
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const title = 'Zeta Mass Supplements — Tienda de Suplementos Originales en Perú';
const description =
  'Whey protein, creatina, pre-entreno, hipercalóricos, aminoácidos y vitaminas 100% originales. Venta al por mayor y por menor, envíos a todo el Perú y pago contra entrega en Lima y Callao.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | Zeta Mass Supplements',
  },
  description,
  keywords: [
    'suplementos',
    'tienda de suplementos',
    'suplementos Perú',
    'whey protein',
    'creatina',
    'pre-entreno',
    'hipercalórico',
    'aminoácidos',
    'vitaminas',
    'suplementos originales',
    'mayorista de suplementos',
    'minorista de suplementos',
    'nutrición deportiva',
  ],
  authors: [{ name: 'Zeta Mass Supplements' }],
  icons: {
    icon: '/branding/zeta-mascot.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: siteUrl,
    siteName: 'Zeta Mass Supplements',
    title,
    description,
    images: [{ url: '/videos/hero-cover.jpg', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/videos/hero-cover.jpg'],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SportingGoodsStore',
  name: 'Zeta Mass Supplements',
  description,
  url: siteUrl,
  logo: `${siteUrl}/branding/zeta-mascot.png`,
  image: `${siteUrl}/videos/hero-cover.jpg`,
  priceRange: '$$',
  areaServed: { '@type': 'Country', name: 'Perú' },
  address: { '@type': 'PostalAddress', addressCountry: 'PE', addressRegion: 'Lima' },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'ventas',
      telephone: '+51932225306',
      areaServed: 'PE',
      availableLanguage: 'Spanish',
    },
  ],
  sameAs: [
    'https://www.instagram.com/zetamassupplements/',
    'https://www.tiktok.com/@zetamassupplements',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE" className={`${anton.variable} ${manrope.variable} ${spaceMono.variable}`}>
      <body className="bg-crema font-sans text-tinta antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
