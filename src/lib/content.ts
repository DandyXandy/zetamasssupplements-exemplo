// Real content extracted from https://www.instagram.com/zetamassupplements/
// (bio, post captions and reel captions) on 2026-07-31. Nothing here is invented.

export const WHATSAPP_PRIMARY = '51932225306';
export const WHATSAPP_SECONDARY = '51908585329';

export function waLink(message: string, number: string = WHATSAPP_PRIMARY) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const PRODUCT_CATEGORIES = [
  {
    slug: 'proteina',
    label: 'Whey & Isolate',
    brands: 'Optimum Nutrition · Level Pro',
    blurb: 'Gold Standard Isolate y Whey Gold Pro, directo de distribuidor autorizado.',
    image: '/images/vitrine-estante-creatina.jpg',
    waMessage: 'Hola Zeta Mass! Quiero cotizar Whey/Isolate al precio mayorista 💪',
  },
  {
    slug: 'creatina',
    label: 'Creatina',
    brands: 'Ronnie Coleman · Gaspari · MyProtein',
    blurb: 'La creatina más vendida del mercado, en pack individual o por mayor.',
    image: '/images/vitrine-pack-trainer.jpg',
    priceTag: 'PACK TRAINER · S/393',
    waMessage: 'Hola Zeta Mass! Quiero cotizar el Pack Trainer de creatina (S/393) 🔥',
  },
  {
    slug: 'pre-entreno',
    label: 'Pre-Entreno',
    brands: 'Dragon Pharma · Ultimate Nutrition',
    blurb: 'Energía y foco para llevar el entrenamiento al siguiente nivel.',
    image: '/images/about-levelpro-gold.jpg',
    waMessage: 'Hola Zeta Mass! Quiero cotizar Pre-Entreno al precio mayorista ⚡',
  },
  {
    slug: 'colageno',
    label: 'Colágeno & Aminoácidos',
    brands: 'Distribuidor autorizado',
    blurb: 'Recuperación y cuidado articular con las marcas que ya conoces.',
    image: '/images/about-estante-whey.jpg',
    waMessage: 'Hola Zeta Mass! Quiero cotizar Colágeno/Aminoácidos al precio mayorista 🧬',
  },
];

export const TRUST_BRANDS = [
  'Optimum Nutrition',
  'Level Pro',
  'Ronnie Coleman',
  'Gaspari Nutrition',
  'MyProtein',
  'Dragon Pharma',
];
