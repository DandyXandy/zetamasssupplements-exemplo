// Catálogo completo extraído de "CATALAGO ZETAMASS X MENOR - JULIO 2026.pdf"
// (enviado por el cliente el 2026-08-04). Precios reales en soles peruanos.
// `price: null` = el catálogo no imprime precio para esa presentación
// (se muestra "Consultar precio" en la UI).

export type CatalogSize = { label: string; price: number | null };

export type CatalogItem = {
  slug: string;
  name: string;
  brand: string;
  category: string; // matches CatalogCategory.slug
  sizes: CatalogSize[];
  image: string;
  isCombo?: boolean;
  comboDescription?: string;
  badge?: string;
  shortDescription?: string;
};

export type CatalogCategory = { slug: string; label: string; icon: string; blurb: string };

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  { slug: 'combos', label: 'Combos y Promociones', icon: 'Gift', blurb: 'Packs con creatina y regalos incluidos.' },
  { slug: 'ganadores-masa', label: 'Ganadores de Masa', icon: 'TrendingUp', blurb: 'Calorías de calidad para subir de peso y volumen.' },
  { slug: 'proteinas-whey', label: 'Proteínas Whey', icon: 'Beef', blurb: 'Whey concentrada para recuperación muscular diaria.' },
  { slug: 'proteinas-isolate', label: 'Proteínas Isolatadas', icon: 'Sparkles', blurb: 'Absorción rápida, ideal para definición.' },
  { slug: 'creatinas', label: 'Creatinas', icon: 'Zap', blurb: 'Fuerza, potencia y rendimiento en cada entrenamiento.' },
  { slug: 'pre-entreno', label: 'Pre-Entrenos', icon: 'Flame', blurb: 'Energía, foco y bombeo antes de entrenar.' },
  { slug: 'aminoacidos', label: 'Aminoácidos', icon: 'Dna', blurb: 'EAA, BCAA, glutamina y colágeno para recuperación.' },
  { slug: 'vitaminas', label: 'Vitaminas y Omega 3', icon: 'Pill', blurb: 'Soporte diario para tu salud e inmunidad.' },
  { slug: 'quemadores', label: 'Quemadores de Grasa', icon: 'Droplets', blurb: 'Apoyo para definición y control de peso.' },
];

const img = (name: string) => `/images/catalogo/${name}.jpg`;

export const CATALOG: CatalogItem[] = [
  // ── COMBOS Y PROMOCIONES ────────────────────────────────────────────
  {
    slug: 'combo-bigm-creatina-kl',
    name: 'BigM 2kg + Creatina KL 300gr + Regalos',
    brand: 'Combo Zeta Mass',
    category: 'combos',
    isCombo: true,
    comboDescription: 'BigM 2kg + Creatina Kevin Levrone 300gr + regalos sorpresa.',
    sizes: [{ label: 'Combo', price: 139 }],
    image: img('combo-bigm'),
  },
  {
    slug: 'combo-prostar-creatina-dragon',
    name: 'Prostar Whey 5lb + Creatina Dragon 300gr + Regalos',
    brand: 'Combo Zeta Mass',
    category: 'combos',
    isCombo: true,
    comboDescription: 'Prostar Whey 5lb + Creatina Dragon Pharma 300gr + regalos sorpresa.',
    sizes: [{ label: 'Combo', price: 379 }],
    image: img('combo-prostar'),
  },
  {
    slug: 'combo-isogold-creatina-ultimate',
    name: 'ISO Gold USA 1kg + Creatina Ultimate 300gr + Regalos',
    brand: 'Combo Zeta Mass',
    category: 'combos',
    isCombo: true,
    comboDescription: 'ISO Gold USA 1kg + Creatina Ultimate Nutrition 300gr + regalos sorpresa.',
    sizes: [{ label: 'Combo', price: 238 }],
    image: img('combo-isogold'),
  },
  {
    slug: 'combo-isowhey-creatina-un',
    name: 'ISO Whey 5lb + Creatina UN 250gr + Regalos',
    brand: 'Combo Zeta Mass',
    category: 'combos',
    isCombo: true,
    comboDescription: 'ISO Whey 5lb + Creatina Universal Nutrition 250gr + regalos sorpresa.',
    sizes: [{ label: 'Combo', price: 399 }],
    image: img('combo-isowhey'),
  },
  {
    slug: 'combo-isoxp-creatina-on',
    name: 'ISO-XP 1kg + Creatina ON 300gr + Regalos',
    brand: 'Combo Zeta Mass',
    category: 'combos',
    isCombo: true,
    comboDescription: 'ISO-XP Applied Nutrition 1kg + Creatina Optimum Nutrition 300gr + regalos sorpresa.',
    sizes: [{ label: 'Combo', price: 328 }],
    image: img('combo-isoxp'),
  },
  {
    slug: 'combo-masspro-creatina-applied',
    name: 'Mass Pro 15lb + Creatina Applied 500gr + Regalos',
    brand: 'Combo Zeta Mass',
    category: 'combos',
    isCombo: true,
    comboDescription: 'Mass Pro 15lb + Creatina Applied Nutrition 500gr + regalos sorpresa.',
    sizes: [{ label: 'Combo', price: 365 }],
    image: img('combo-masspro'),
  },

  // ── GANADORES DE MASA ───────────────────────────────────────────────
  { slug: 'serious-mass', name: 'Serious Mass', brand: 'Optimum Nutrition', category: 'ganadores-masa', sizes: [{ label: '6 LB', price: 179 }, { label: '12 LB', price: 289 }], image: img('serious-mass') },
  { slug: 'mass-phorm', name: 'Mass Phorm', brand: 'Dragon Pharma', category: 'ganadores-masa', sizes: [{ label: '12 LB', price: 299 }], image: img('mass-phorm') },
  { slug: 'mutant-mass', name: 'Mutant Mass', brand: 'Mutant', category: 'ganadores-masa', sizes: [{ label: '5 LB', price: 160 }, { label: '15 LB', price: 339 }], image: img('mutant-mass') },
  { slug: 'goliath', name: 'Goliath Protein Gainer', brand: 'Ventura', category: 'ganadores-masa', sizes: [{ label: '12 LB', price: 239 }], image: img('goliath') },
  { slug: 'mass-pro', name: 'Mass Pro', brand: 'Level Pro', category: 'ganadores-masa', sizes: [{ label: '6 LB', price: 129 }, { label: '15 LB', price: 259 }], image: img('mass-pro') },
  { slug: 'bigm', name: 'BigM', brand: 'BigM', category: 'ganadores-masa', sizes: [{ label: '2 KG', price: 79 }, { label: '2.5 KG', price: 94 }, { label: '5 KG', price: 124 }], image: img('bigm') },
  { slug: 'whey-pro-gainer', name: 'Whey Pro', brand: 'Ventura', category: 'ganadores-masa', sizes: [{ label: '1.1 KG', price: 60 }, { label: '2.5 KG', price: 105 }, { label: '5 KG', price: 145 }], image: img('whey-pro-gainer') },
  { slug: 'crema-bluehealth', name: 'Crema Muscle Bluehealth', brand: 'Bluehealth', category: 'ganadores-masa', sizes: [{ label: '1 KG', price: 64 }, { label: '2.5 KG', price: 114 }], image: img('crema-bluehealth') },
  { slug: 'supreme-mass', name: 'Supreme Mass', brand: 'Supreme Nutrition', category: 'ganadores-masa', sizes: [{ label: '10 LB', price: 179 }], image: img('supreme-mass') },
  { slug: 'crema-un', name: 'Crema Rice Cream Muscle', brand: 'Universal Nutrition', category: 'ganadores-masa', sizes: [{ label: '1 KG', price: 64 }, { label: '2.5 KG', price: 105 }], image: img('crema-un') },
  { slug: 'carnivor-mass', name: 'Carnivor Mass', brand: 'MuscleMeds', category: 'ganadores-masa', sizes: [{ label: '6 LB', price: 259 }], image: img('carnivor-mass') },

  // ── PROTEÍNAS WHEY ──────────────────────────────────────────────────
  { slug: 'whey-gold-usa', name: 'Whey Gold Pro', brand: 'Level Pro', category: 'proteinas-whey', sizes: [{ label: '2 LB', price: 115 }, { label: '5 LB', price: 219 }], image: img('whey-gold-usa') },
  { slug: 'prostar-whey', name: 'Prostar 100% Whey Protein', brand: 'Ultimate Nutrition', category: 'proteinas-whey', sizes: [{ label: '2 LB', price: 149 }, { label: '5 LB', price: 299 }], image: img('prostar-whey') },
  { slug: 'levro-whey', name: 'Levro Whey Supreme', brand: 'Kevin Levrone', category: 'proteinas-whey', sizes: [{ label: '2 KG', price: 279 }], image: img('levro-whey') },
  { slug: 'gold-standard-whey', name: 'Gold Standard 100% Whey', brand: 'Optimum Nutrition', category: 'proteinas-whey', sizes: [{ label: '2 LB', price: 199 }, { label: '5 LB', price: 359 }], image: img('gold-standard-whey') },
  { slug: 'impact-whey', name: 'Impact Whey Protein', brand: 'MyProtein', category: 'proteinas-whey', sizes: [{ label: '1 KG', price: null }, { label: '2.5 KG', price: null }], image: img('impact-whey') },
  { slug: 'elite-whey', name: 'Elite Whey Protein', brand: 'Yava Labs', category: 'proteinas-whey', sizes: [{ label: '1 KG', price: 139 }, { label: '2 KG', price: 239 }], image: img('elite-whey') },
  { slug: 'plant-protein', name: 'Critical Plant Protein', brand: 'Applied Nutrition', category: 'proteinas-whey', sizes: [{ label: '1.8 KG', price: 210 }], image: img('plant-protein') },
  { slug: 'nitro-whey', name: 'Nitro Whey', brand: 'Optimum Nutrition', category: 'proteinas-whey', sizes: [{ label: '1 KG', price: 89 }, { label: '2.5 KG', price: 165 }, { label: '5 KG', price: 239 }], image: img('nitro-whey') },
  { slug: 'soja-complex', name: 'Soja Complex', brand: 'Optimum Nutrition', category: 'proteinas-whey', sizes: [{ label: '1.5 KG', price: 65 }], image: img('soja-complex') },
  { slug: 'fem-pro', name: 'Fem Pro', brand: 'FitFom', category: 'proteinas-whey', sizes: [{ label: '1.1 KG', price: 80 }, { label: '3 KG', price: 155 }], image: img('fem-pro') },
  { slug: 'classic-whey', name: 'Classic Whey', brand: 'NutraBio', category: 'proteinas-whey', sizes: [{ label: '5 LB', price: 280 }], image: img('classic-whey') },
  { slug: 'whey-shake', name: 'Whey Shake', brand: 'Optimum Nutrition', category: 'proteinas-whey', sizes: [{ label: '2 LB', price: 129 }, { label: '5 LB', price: 259 }], image: img('whey-shake') },

  // ── PROTEÍNAS ISOLATADAS ────────────────────────────────────────────
  { slug: 'iso-100', name: 'ISO 100 Hydrolyzed', brand: 'Dymatize', category: 'proteinas-isolate', sizes: [{ label: '5 LB', price: 579 }], image: img('iso-100') },
  { slug: 'iso-xp', name: 'ISO-XP Whey Protein Isolate', brand: 'Applied Nutrition', category: 'proteinas-isolate', sizes: [{ label: '1 KG', price: 209 }, { label: '1.8 KG', price: 389 }], image: img('iso-xp') },
  { slug: 'iso-cool', name: 'ISO Cool', brand: 'Ultimate Nutrition', category: 'proteinas-isolate', sizes: [{ label: '2 LB', price: null }, { label: '5 LB', price: null }], image: img('iso-cool') },
  { slug: 'iso-phorm', name: 'ISO Phorm', brand: 'Dragon Pharma', category: 'proteinas-isolate', sizes: [{ label: '5 LB', price: 389 }], image: img('iso-phorm') },
  { slug: 'iso-p-out', name: 'Isolate 1000', brand: 'Level Pro', category: 'proteinas-isolate', sizes: [{ label: '5 LB', price: null }], image: img('iso-p-out') },
  { slug: 'impact-isolate', name: 'Impact Whey Isolate', brand: 'MyProtein', category: 'proteinas-isolate', sizes: [{ label: '1 KG', price: null }, { label: '2.5 KG', price: null }], image: img('impact-isolate') },
  { slug: 'carnivor-protein', name: 'Carnivor Protein', brand: 'MuscleMeds', category: 'proteinas-isolate', sizes: [{ label: '2 LB', price: 159 }, { label: '2 KG', price: 279 }], image: img('carnivor-protein') },
  { slug: 'shado-isolate', name: 'ShadoWhey Isolate', brand: 'Dorian Yates', category: 'proteinas-isolate', sizes: [{ label: '2 KG', price: 309 }], image: img('shado-isolate') },
  { slug: 'iso-gold-usa', name: 'ISO Gold Whey', brand: 'Level Pro', category: 'proteinas-isolate', sizes: [{ label: '1.1 KG', price: 149 }, { label: '3 KG', price: 314 }], image: img('iso-gold-usa') },
  { slug: 'iso-whey-90', name: 'ISO Whey 90', brand: 'Optimum Nutrition', category: 'proteinas-isolate', sizes: [{ label: '1.1 KG', price: 119 }, { label: '2.5 KG', price: 229 }, { label: '5 KG', price: 339 }], image: img('iso-whey-90') },
  { slug: 'iso-sensation', name: 'ISO Sensation', brand: 'Ultimate Nutrition', category: 'proteinas-isolate', sizes: [{ label: '2 LB', price: 189 }, { label: '5 LB', price: 399 }], image: img('iso-sensation') },
  { slug: 'hydro-iso-supreme', name: '100% Hydro Whey Isolate', brand: 'Supreme Nutrition', category: 'proteinas-isolate', sizes: [{ label: '1 KG', price: 179 }, { label: '5 LB', price: 309 }], image: img('hydro-iso-supreme') },
  { slug: 'levro-iso', name: 'Levro ISO Whey', brand: 'Kevin Levrone', category: 'proteinas-isolate', sizes: [{ label: '2 KG', price: 309 }], image: img('levro-iso') },
  { slug: 'anabolic-iso', name: 'Anabolic ISO Whey', brand: 'Kevin Levrone', category: 'proteinas-isolate', sizes: [{ label: '2 KG', price: 309 }], image: img('anabolic-iso') },
  { slug: 'iso-fit-nutrex', name: 'IsoFit Protein', brand: 'Nutrex', category: 'proteinas-isolate', sizes: [{ label: '5 LB', price: 329 }], image: img('iso-fit-nutrex') },
  { slug: 'gold-standard-isolate', name: 'Gold Standard 100% Isolate', brand: 'Optimum Nutrition', category: 'proteinas-isolate', sizes: [{ label: '5 LB', price: 479 }], image: img('gold-standard-isolate') },

  // ── CREATINAS ───────────────────────────────────────────────────────
  { slug: 'creatina-ronnie-coleman', name: 'Creatine XS', brand: 'Ronnie Coleman', category: 'creatinas', sizes: [{ label: '300 GR', price: 75 }, { label: '1 KG', price: 169 }], image: img('creatina-ronnie-coleman') },
  { slug: 'creatina-optimum', name: 'Micronized Creatine', brand: 'Optimum Nutrition', category: 'creatinas', sizes: [{ label: '300 GR', price: 115 }, { label: '600 GR', price: 190 }, { label: '1 KG', price: 279 }], image: img('creatina-optimum') },
  { slug: 'creatina-level-pro', name: 'The Creatine', brand: 'Level Pro', category: 'creatinas', sizes: [{ label: '500 GR', price: null }], image: img('creatina-level-pro') },
  { slug: 'creatina-dorian-yates', name: 'The Creatine', brand: 'Dorian Yates', category: 'creatinas', sizes: [{ label: '300 GR', price: 60 }, { label: '1 KG', price: 130 }], image: img('creatina-dorian-yates') },
  { slug: 'creatina-nutrex', name: 'Creatine Monohydrate', brand: 'Nutrex', category: 'creatinas', sizes: [{ label: '300 GR', price: 75 }, { label: '1 KG', price: 179 }], image: img('creatina-nutrex') },
  { slug: 'creatina-ultimate', name: 'Creatine Monohydrate', brand: 'Ultimate Nutrition', category: 'creatinas', sizes: [{ label: '300 GR', price: 90 }, { label: '1 KG', price: 189 }], image: img('creatina-ultimate') },
  { slug: 'creatina-gaspari', name: 'Creatine', brand: 'Gaspari Nutrition', category: 'creatinas', sizes: [{ label: '300 GR', price: 85 }, { label: '1 KG', price: 155 }], image: img('creatina-gaspari') },
  { slug: 'creatina-dragon', name: 'Creatine Monohydrate', brand: 'Dragon Pharma', category: 'creatinas', sizes: [{ label: '300 GR', price: 79 }, { label: '1 KG', price: 179 }], image: img('creatina-dragon') },
  { slug: 'creatina-myprotein', name: 'Impact Creatine', brand: 'MyProtein', category: 'creatinas', sizes: [{ label: '250 GR', price: 65 }, { label: '1 KG', price: 160 }], image: img('creatina-myprotein') },
  { slug: 'creatina-dymatize', name: 'Creatine Monohydrate', brand: 'Dymatize', category: 'creatinas', sizes: [{ label: '300 GR', price: 125 }], image: img('creatina-dymatize') },
  { slug: 'creatina-applied', name: 'Creatine Monohydrate', brand: 'Applied Nutrition', category: 'creatinas', sizes: [{ label: '150 GR', price: 50 }, { label: '250 GR', price: 65 }, { label: '500 GR', price: 105 }, { label: '1 KG', price: 150 }], image: img('creatina-applied') },
  { slug: 'creatina-un', name: 'Creatine Monohydrate', brand: 'Universal Nutrition', category: 'creatinas', sizes: [{ label: '250 GR', price: 60 }, { label: '500 GR', price: 99 }], image: img('creatina-un') },
  { slug: 'creatina-kevin-levrone', name: 'Creatine Monohydrate', brand: 'Kevin Levrone', category: 'creatinas', sizes: [{ label: '300 GR', price: 60 }, { label: '500 GR', price: 100 }], image: img('creatina-kevin-levrone') },
  { slug: 'creatina-evogen', name: 'Creatine', brand: 'Evogen', category: 'creatinas', sizes: [{ label: '300 GR', price: 85 }], image: img('creatina-evogen') },

  // ── PRE-ENTRENOS ────────────────────────────────────────────────────
  { slug: 'psychotic-test', name: 'Psychotic Test', brand: 'Insane Labz', category: 'pre-entreno', sizes: [{ label: '30 SERV', price: 164 }], image: img('psychotic-test') },
  { slug: 'psychotic-saw', name: 'Psychotic Saw', brand: 'Insane Labz', category: 'pre-entreno', sizes: [{ label: '30 SERV', price: 169 }], image: img('psychotic-saw') },
  { slug: 'psychotic-gold', name: 'Psychotic Gold', brand: 'Insane Labz', category: 'pre-entreno', sizes: [{ label: '30 SERV', price: 159 }], image: img('psychotic-gold') },
  { slug: 'psychotic-red', name: 'Psychotic Red', brand: 'Insane Labz', category: 'pre-entreno', sizes: [{ label: '30 SERV', price: 130 }], image: img('psychotic-red') },
  { slug: 'venom-inferno', name: 'Venom Inferno', brand: 'Dragon Pharma', category: 'pre-entreno', sizes: [{ label: '40 SERV', price: 135 }], image: img('venom-inferno') },
  { slug: 'shaaboom-pump', name: 'Shaaboom Pump', brand: 'ProSupps', category: 'pre-entreno', sizes: [{ label: '44 SERV', price: 115 }], image: img('shaaboom-pump') },
  { slug: 'maniac-joker', name: 'Maniac Extreme', brand: 'Joker Labz', category: 'pre-entreno', sizes: [{ label: '30 SERV', price: 150 }], image: img('maniac-joker') },
  { slug: 'pre-abe', name: 'ABE All Black Everything', brand: 'Applied Nutrition', category: 'pre-entreno', sizes: [{ label: '30 SERV', price: 120 }], image: img('pre-abe') },
  { slug: 'kaio-ken', name: 'Kaio Ken', brand: 'Fake Nutrition', category: 'pre-entreno', sizes: [{ label: '30 SERV', price: null }], image: img('kaio-ken') },
  { slug: 'hyde', name: 'Hyde Nightmare', brand: 'ProSupps', category: 'pre-entreno', sizes: [{ label: '30 SERV', price: 125 }], image: img('hyde') },
  { slug: 'venom-clasico', name: 'Venom', brand: 'Dragon Pharma', category: 'pre-entreno', sizes: [{ label: '40 SERV', price: 125 }], image: img('venom-clasico') },
  { slug: 'nox-up', name: 'Nox-Up Intenze', brand: 'Inner Armour', category: 'pre-entreno', sizes: [{ label: '600 GR', price: 75 }, { label: '1 KG', price: 110 }], image: img('nox-up') },
  { slug: 'pre-adn', name: 'PreADN Thunder', brand: 'ADN Nutrition', category: 'pre-entreno', sizes: [{ label: '44 SERV', price: 99 }], image: img('pre-adn') },
  { slug: 'proveen-pump', name: 'Proveen Pump', brand: 'Gaspari Nutrition', category: 'pre-entreno', sizes: [{ label: '32 SERV', price: 125 }], image: img('proveen-pump') },
  { slug: 'avp-q-evogen', name: 'EVP AQ', brand: 'Evogen', category: 'pre-entreno', sizes: [{ label: '32 SERV', price: 130 }], image: img('avp-q-evogen') },
  { slug: 'agressive-pump', name: 'Agressive Pump', brand: 'Supreme Nutrition', category: 'pre-entreno', sizes: [{ label: '35 SERV', price: 99 }], image: img('agressive-pump') },
  { slug: 'psychosis', name: 'Psychosis', brand: 'Reborn', category: 'pre-entreno', sizes: [{ label: '32 SERV', price: 129 }], image: '/images/catalogo/psychosis.webp' },
  { slug: 'scatterbrain', name: 'Scatterbrain', brand: 'Kevin Levrone', category: 'pre-entreno', sizes: [{ label: '30 SERV', price: 79 }], image: img('scatterbrain') },
  { slug: 'tuzzy', name: 'Tuzzy', brand: 'Fortex', category: 'pre-entreno', sizes: [{ label: '30 SERV', price: 100 }], image: img('tuzzy') },
  { slug: 'fockuz', name: 'Fockuz Advanced', brand: 'Fortex Pharma', category: 'pre-entreno', sizes: [{ label: '30 SERV', price: 100 }], image: img('fockuz') },
  { slug: 'intensive-crazy', name: 'Intensive Pre-Train', brand: 'Crazy Nutrition', category: 'pre-entreno', sizes: [{ label: '30 SERV', price: 100 }], image: img('intensive-crazy') },
  { slug: 'nox-rage', name: 'Nox Rage', brand: 'Optimum Nutrition', category: 'pre-entreno', sizes: [{ label: '44 SERV', price: 99 }], image: img('nox-rage') },
  { slug: 'pre-boost', name: 'Pre Boost', brand: 'Level Pro', category: 'pre-entreno', sizes: [{ label: '44 SERV', price: 99 }], image: img('pre-boost') },
  { slug: 'rx7-fortex', name: 'RX7 Compound', brand: 'Fortex Clinic', category: 'pre-entreno', sizes: [{ label: '30 SERV', price: 109 }], image: '/images/catalogo/rx7-fortex.webp' },
  { slug: 'cafeina-gat', name: 'Caffeine', brand: 'GAT Sport', category: 'pre-entreno', sizes: [{ label: '100 CAP', price: 89 }], image: img('cafeina-gat') },
  { slug: 'glicerol-panda', name: 'Glicerol 10mg', brand: 'Panda', category: 'pre-entreno', sizes: [{ label: '10 MG', price: 139 }], image: img('glicerol-panda') },
  { slug: 'cla-1000-un', name: 'CLA 1000', brand: 'Universal Nutrition', category: 'pre-entreno', sizes: [{ label: '60 CAP', price: 89 }], image: img('cla-1000-un') },

  // ── AMINOÁCIDOS ─────────────────────────────────────────────────────
  { slug: 'eaa-kevin-levrone', name: 'EAA', brand: 'Kevin Levrone', category: 'aminoacidos', sizes: [{ label: '62 SERV', price: 115 }], image: img('eaa-kevin-levrone') },
  { slug: 'eaa-nutrabio', name: 'EAA Pure', brand: 'NutraBio', category: 'aminoacidos', sizes: [{ label: '434 GR', price: 119 }], image: img('eaa-nutrabio') },
  { slug: 'eaa-soja-complex', name: 'EAA Complex', brand: 'Yava Labs', category: 'aminoacidos', sizes: [{ label: '300 GR', price: 89 }], image: img('eaa-soja-complex') },
  { slug: 'bcaa-ultimate', name: 'BCAA Powder 12000', brand: 'Ultimate Nutrition', category: 'aminoacidos', sizes: [{ label: '60 SERV', price: 140 }], image: img('bcaa-ultimate') },
  { slug: 'bcaa-insane-labz', name: 'Demon BCAA', brand: 'Insane Labz', category: 'aminoacidos', sizes: [{ label: '60 SERV', price: 129 }], image: img('bcaa-insane-labz') },
  { slug: 'glutamina-usa', name: '100% Glutamine', brand: 'Optimum Nutrition', category: 'aminoacidos', sizes: [{ label: '500 GR', price: 99 }], image: img('glutamina-usa') },
  { slug: 'colageno-tmx', name: 'Colágeno', brand: 'TMX Nutrition', category: 'aminoacidos', sizes: [{ label: '500 GR', price: 89 }], image: img('colageno-tmx') },
  { slug: 'colageno-pro', name: 'Collagen Pro', brand: 'Optimum Nutrition', category: 'aminoacidos', sizes: [{ label: '500 GR', price: 79 }], image: img('colageno-pro') },
  { slug: 'glutamina-mp', name: 'L-Glutamine', brand: 'MyProtein', category: 'aminoacidos', sizes: [{ label: '250 GR', price: 69 }, { label: '1 KG', price: 139 }], image: img('glutamina-mp') },
  { slug: 'pro-bcaa', name: 'Pro BCAA 6000', brand: 'Optimum Nutrition', category: 'aminoacidos', sizes: [{ label: '500 GR', price: 85 }, { label: '1 KG', price: 115 }], image: img('pro-bcaa') },
  { slug: 'bcaa-600-un', name: 'BCAA 6000', brand: 'Universal Nutrition', category: 'aminoacidos', sizes: [{ label: '70 SERV', price: 99 }], image: img('bcaa-600-un') },
  { slug: 'bcaa-supreme', name: 'BCAA 8000', brand: 'Supreme Nutrition', category: 'aminoacidos', sizes: [{ label: '60 SERV', price: 99 }], image: img('bcaa-supreme') },

  // ── VITAMINAS Y OMEGA 3 ─────────────────────────────────────────────
  { slug: 'multi-test', name: "Men's Multi-Test", brand: 'GAT Sport', category: 'vitaminas', sizes: [{ label: '60 CAP', price: 99 }], image: img('multi-test') },
  { slug: 'multi-platinum', name: 'Platinum Multivitamin', brand: 'MuscleTech', category: 'vitaminas', sizes: [{ label: '90 CAP', price: 109 }, { label: '180 CAP', price: 149 }], image: img('multi-platinum') },
  { slug: 'animal-pack', name: 'Animal Pak', brand: 'Universal Nutrition', category: 'vitaminas', sizes: [{ label: '44 PACK', price: 259 }], image: img('animal-pack') },
  { slug: 'omega3-evogen', name: 'Omega-3', brand: 'Evogen', category: 'vitaminas', sizes: [{ label: '60 CAP', price: 115 }], image: img('omega3-evogen') },
  { slug: 'omega3-un', name: 'Omega-3 Fish Oil', brand: 'Universal Nutrition', category: 'vitaminas', sizes: [{ label: '60 CAP', price: 90 }], image: img('omega3-un') },
  { slug: 'multi-rc', name: 'Vitapak', brand: 'Ronnie Coleman', category: 'vitaminas', sizes: [{ label: '120 CAP', price: 89 }], image: img('multi-rc') },
  { slug: 'omega-nutrabio', name: 'Omega-3 Fish Oil', brand: 'NutraBio', category: 'vitaminas', sizes: [{ label: '150 CAP', price: 99 }], image: img('omega-nutrabio') },
  { slug: 'omega3-windmill', name: 'Omega 3 Fish Oil', brand: 'Windmill', category: 'vitaminas', sizes: [{ label: '60 CAP', price: 69 }, { label: '90 CAP', price: 79 }, { label: '180 CAP', price: 109 }], image: img('omega3-windmill') },
  { slug: 'omega3-ultimate', name: 'Omega 3 Fish Oil', brand: 'Ultimate Nutrition', category: 'vitaminas', sizes: [{ label: '90 CAP', price: 79 }, { label: '180 CAP', price: 120 }], image: img('omega3-ultimate') },
  { slug: 'omega-yava-labs', name: 'Omega 3', brand: 'Yava Labs', category: 'vitaminas', sizes: [{ label: '90 CAP', price: 69 }], image: img('omega-yava-labs') },
  { slug: 'proveen-gaspari', name: 'Proven Greens & Reds', brand: 'Gaspari Nutrition', category: 'vitaminas', sizes: [{ label: '30 CAP', price: 129 }], image: img('proveen-gaspari') },
  { slug: 'omega-gaspari', name: 'Omega-3', brand: 'Gaspari Nutrition', category: 'vitaminas', sizes: [{ label: '60 CAP', price: 110 }], image: img('omega-gaspari') },

  // ── QUEMADORES DE GRASA ─────────────────────────────────────────────
  { slug: 'lipo6-ultra', name: 'Lipo 6 Black Ultra Concentrado', brand: 'Nutrex', category: 'quemadores', sizes: [{ label: '60 CAP', price: 115 }], image: img('lipo6-ultra') },
  { slug: 'lipo6-intenze', name: 'Lipo 6 Intense Ultra', brand: 'Nutrex', category: 'quemadores', sizes: [{ label: '60 CAP', price: 115 }], image: img('lipo6-intenze') },
  { slug: 'black-viper', name: 'Black Viper', brand: 'Dragon Pharma', category: 'quemadores', sizes: [{ label: '60 CAP', price: 120 }], image: img('black-viper') },
  { slug: 'lipodrene', name: 'Lipodrene', brand: 'Hi-Tech Pharmaceuticals', category: 'quemadores', sizes: [{ label: '90 CAP', price: 150 }], image: img('lipodrene') },
  { slug: 'gold-levro-lean', name: 'Gold Levro Lean', brand: 'Kevin Levrone', category: 'quemadores', sizes: [{ label: '60 CAP', price: 69 }], image: img('gold-levro-lean') },
  { slug: 'clembu-cooper', name: 'Clenbu', brand: 'Cooper Pharma', category: 'quemadores', sizes: [{ label: '50 CAP', price: 130 }], image: img('clembu-cooper') },
  { slug: 'clembu-fortex', name: 'Clenbu', brand: 'Fortex', category: 'quemadores', sizes: [{ label: '100 CAP', price: 95 }], image: img('clembu-fortex') },
  { slug: 'clembu-landerland', name: 'Clenbu', brand: 'Landerland', category: 'quemadores', sizes: [{ label: '50 CAP', price: 100 }], image: img('clembu-landerland') },
  { slug: 'xpel-diuretico', name: 'Xpel Diuretic', brand: 'MHP', category: 'quemadores', sizes: [{ label: '60 CAP', price: 100 }], image: img('xpel-diuretico') },
  { slug: 'testrol-gold', name: 'Testrol Gold ES', brand: 'GAT Sport', category: 'quemadores', sizes: [{ label: '60 CAP', price: 120 }], image: img('testrol-gold') },
  { slug: 'diabolus', name: 'Diabolus', brand: 'Dragon Pharma', category: 'quemadores', sizes: [{ label: '28 UND', price: 50 }], image: img('diabolus') },
  { slug: 'pack-xb', name: 'Pack X-B Energy Drink', brand: 'XB', category: 'quemadores', sizes: [{ label: '2 PQT', price: 55 }, { label: '5 PQT', price: 100 }], image: img('pack-xb') },
];

export type Goal = { slug: string; label: string; categories: string[] };

export const GOALS: Goal[] = [
  { slug: 'perder-peso', label: 'Perder Peso y Definir', categories: ['quemadores'] },
  { slug: 'ganar-musculo', label: 'Ganar Masa Muscular', categories: ['proteinas-whey', 'proteinas-isolate', 'creatinas'] },
  { slug: 'aumentar-peso', label: 'Aumentar Peso', categories: ['ganadores-masa'] },
  { slug: 'aumentar-energia', label: 'Aumentar Energía', categories: ['pre-entreno'] },
];

export function getCatalogItemsByCategory(categorySlug: string) {
  return CATALOG.filter((p) => p.category === categorySlug);
}

export function getCatalogItemBySlug(slug: string) {
  return CATALOG.find((p) => p.slug === slug);
}
