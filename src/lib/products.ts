// Fichas técnicas basadas en información pública de marca/fabricante y en las
// etiquetas reales fotografiadas (ver /public/images/productos). Los precios
// no se publican: el negocio real de Zeta Mass cotiza siempre por WhatsApp,
// con precio mayorista y minorista distinto según cantidad.

export type NutritionRow = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  weight: string;
  servings: string;
  flavors: string[];
  image: string;
  gallery: { src: string; alt: string }[];
  shortDescription: string;
  description: string;
  benefits: string[];
  usage: string;
  keyIngredients: string[];
  nutrition: { servingSize: string; servingsPerContainer: string; rows: NutritionRow[] };
  faqs: { q: string; a: string }[];
};

export const CATEGORIES = [
  { slug: 'proteinas', label: 'Proteínas', icon: 'Beef', blurb: 'Whey, Isolate y concentradas para recuperación muscular.' },
  { slug: 'creatinas', label: 'Creatinas', icon: 'Zap', blurb: 'Fuerza, potencia y rendimiento en cada entrenamiento.' },
  { slug: 'pre-entreno', label: 'Pre-Entreno', icon: 'Flame', blurb: 'Energía, foco y bombeo antes de entrenar.' },
  { slug: 'ganadores-masa', label: 'Ganadores de Masa', icon: 'TrendingUp', blurb: 'Calorías de calidad para subir de peso y volumen.' },
  { slug: 'vitaminas', label: 'Vitaminas', icon: 'Pill', blurb: 'Soporte diario para tu salud e inmunidad.' },
  { slug: 'quemadores', label: 'Quemadores de Grasa', icon: 'Droplets', blurb: 'Apoyo para definición y control de peso.' },
] as const;

export const PRODUCTS: Product[] = [
  {
    slug: 'optimum-nutrition-gold-standard-whey-2-27kg',
    name: 'Gold Standard 100% Whey Protein',
    brand: 'Optimum Nutrition',
    category: 'Proteínas',
    categorySlug: 'proteinas',
    weight: '2.27 kg (5 lb)',
    servings: '71 porciones',
    flavors: ['Extreme Milk Chocolate', 'Vainilla', 'Cookies & Cream', 'Banana', 'Fresa'],
    image: '/images/productos/on-gold-standard-whey.jpg',
    gallery: [
      { src: '/images/productos/on-gold-standard-whey.jpg', alt: 'Optimum Nutrition Gold Standard Whey sabor Extreme Milk Chocolate 2.27kg' },
      { src: '/images/productos/on-gold-standard-whey-cookies.jpg', alt: 'Optimum Nutrition Gold Standard Whey sabor Cookies & Cream' },
    ],
    shortDescription: 'La proteína whey más vendida del mundo. 24g de proteína de alta calidad por porción.',
    description:
      'Gold Standard 100% Whey es la referencia mundial en proteína de suero de leche. Cada porción entrega 24g de proteína de rápida digestión y alto valor biológico, con bajos niveles de grasa, carbohidratos y lactosa. Ideal para después de entrenar, como snack alto en proteína o para complementar tu ingesta diaria.',
    benefits: [
      '24g de proteína de suero por porción',
      'Más de 5g de BCAAs naturales',
      '4g de glutamina y precursores de glutamina',
      'Mezcla de whey aislada, concentrada y péptidos',
      'Bajo en grasa, carbohidratos y azúcares',
      'Libre de gluten',
    ],
    usage:
      'Mezcla 1 cacito (31g) con 180-240ml de agua o leche fría en shaker o licuadora. Consume 1-3 porciones al día, idealmente después de entrenar o entre comidas.',
    keyIngredients: ['Aislado de proteína de suero', 'Concentrado de proteína de suero', 'Péptidos de suero', 'Lecitina de soya', 'Saborizantes naturales y artificiales'],
    nutrition: {
      servingSize: '1 cacito (31 g)',
      servingsPerContainer: '71',
      rows: [
        { label: 'Calorías', value: '120' },
        { label: 'Proteína', value: '24 g' },
        { label: 'Grasa total', value: '1.5 g' },
        { label: 'Carbohidratos totales', value: '3 g' },
        { label: 'Azúcares', value: '1 g' },
        { label: 'Colesterol', value: '30 mg' },
        { label: 'Sodio', value: '130 mg' },
      ],
    },
    faqs: [
      { q: '¿Se puede tomar todos los días?', a: 'Sí, es un suplemento alimenticio pensado para uso diario, dentro de una dieta con proteína suficiente.' },
      { q: '¿Sirve para bajar de peso?', a: 'Ayuda a cubrir tu requerimiento de proteína con pocas calorías, lo que la hace útil en dietas de definición, pero no reemplaza una dieta controlada.' },
      { q: '¿Con agua o con leche?', a: 'Ambas funcionan. Con agua es más ligera y rápida de digerir; con leche queda más cremosa y con más calorías.' },
    ],
  },
  {
    slug: 'optimum-nutrition-serious-mass-5-44kg',
    name: 'Serious Mass Gainer',
    brand: 'Optimum Nutrition',
    category: 'Ganadores de Masa',
    categorySlug: 'ganadores-masa',
    weight: '5.44 kg (12 lb)',
    servings: '16 porciones',
    flavors: ['Chocolate', 'Vainilla', 'Fresa', 'Banana', 'Chocolate con Maní'],
    image: '/images/productos/on-serious-mass.jpg',
    gallery: [
      { src: '/images/productos/on-serious-mass.jpg', alt: 'Optimum Nutrition Serious Mass sabor Chocolate' },
      { src: '/images/productos/on-serious-mass-alt.jpg', alt: 'Optimum Nutrition Serious Mass sabor Vainilla' },
    ],
    shortDescription: 'Ganador de peso de alta caloría con 50g de proteína y 1,260 calorías por porción.',
    description:
      'Serious Mass está diseñado para quienes buscan aumentar masa muscular y peso de forma seria. Cada porción de 2 cacitos aporta 1,260 calorías, 50g de proteína y 251g de carbohidratos, reforzado con creatina, glutamina y 25 vitaminas y minerales esenciales.',
    benefits: [
      '1,260 calorías por porción',
      '50g de proteína por porción',
      'Reforzado con creatina monohidratada y glutamina',
      '25 vitaminas y minerales',
      'Ideal para biotipos ectomorfos y hardgainers',
    ],
    usage:
      'Mezcla 2 cacitos (334g) con 600-700ml de agua o leche en shaker o licuadora. Toma 1-2 porciones al día según tus necesidades calóricas, entre comidas o después de entrenar.',
    keyIngredients: ['Maltodextrina', 'Proteína de suero', 'Creatina monohidratada', 'L-Glutamina y péptidos de glutamina', 'Colina', 'Inositol'],
    nutrition: {
      servingSize: '2 cacitos (334 g)',
      servingsPerContainer: '16',
      rows: [
        { label: 'Calorías', value: '1,260' },
        { label: 'Proteína', value: '50 g' },
        { label: 'Carbohidratos totales', value: '251 g' },
        { label: 'Grasa total', value: '4.5 g' },
        { label: 'Azúcares', value: '22 g' },
        { label: 'Sodio', value: '320 mg' },
      ],
    },
    faqs: [
      { q: '¿Sirve para personas delgadas?', a: 'Sí, es uno de los gainers más usados por personas con metabolismo acelerado que buscan subir de peso.' },
      { q: '¿Cuántas veces al día se toma?', a: 'Entre 1 y 2 porciones al día, según tu requerimiento calórico y objetivo de peso.' },
      { q: '¿Engorda si no entreno?', a: 'Aporta muchas calorías; si no entrenas ni las gastas, el excedente se puede almacenar como grasa.' },
    ],
  },
  {
    slug: 'universal-nutrition-creatine-300g',
    name: 'Creatine Monohydrate',
    brand: 'Universal Nutrition',
    category: 'Creatinas',
    categorySlug: 'creatinas',
    weight: '300 g',
    servings: '60 porciones',
    flavors: ['Sin sabor (Classic Series)'],
    image: '/images/productos/universal-creatine.jpg',
    gallery: [
      { src: '/images/productos/universal-creatine.jpg', alt: 'Universal Nutrition Creatine Monohydrate 300g sin sabor' },
    ],
    shortDescription: 'Creatina monohidratada pura, sin sabor, 5g de creatina por porción.',
    description:
      'Creatine de Universal Nutrition, línea Classic Series, es creatina monohidratada 100% pura en su forma micronizada para máxima disolución y absorción. Sin sabor, sin aditivos innecesarios: solo creatina para ganar fuerza, potencia y volumen muscular.',
    benefits: [
      '5g de creatina monohidratada por porción',
      'Mejora la fuerza y potencia en el entrenamiento',
      'Favorece la recuperación entre series',
      'Sin sabor: se mezcla con cualquier bebida o suplemento',
      'Fórmula Classic Series de Universal Nutrition',
    ],
    usage:
      'Mezcla 1 cucharadita (5g) con agua, jugo o tu batido de proteína. En fase de carga: 4 porciones al día por 5-7 días; en mantenimiento: 1 porción al día.',
    keyIngredients: ['Creatina monohidratada micronizada'],
    nutrition: {
      servingSize: '1 cucharadita (5 g)',
      servingsPerContainer: '60',
      rows: [
        { label: 'Calorías', value: '0' },
        { label: 'Creatina monohidratada', value: '5 g' },
        { label: 'Carbohidratos totales', value: '0 g' },
        { label: 'Sodio', value: '0 mg' },
      ],
    },
    faqs: [
      { q: '¿Retiene líquidos?', a: 'Puede generar una leve retención intramuscular (no es hinchazón), lo cual es normal y parte de su efecto volumizador.' },
      { q: '¿Es necesaria la fase de carga?', a: 'No es obligatoria. También puedes tomar 1 porción diaria desde el día uno; los resultados tardan un poco más en notarse.' },
      { q: '¿Se puede mezclar con la proteína?', a: 'Sí, al no tener sabor se mezcla perfecto con tu batido de whey o gainer.' },
    ],
  },
  {
    slug: 'cellucor-c4-original-pre-workout',
    name: 'C4 Original Pre-Workout',
    brand: 'Cellucor',
    category: 'Pre-Entreno',
    categorySlug: 'pre-entreno',
    weight: '270 g (30 porciones)',
    servings: '30 porciones',
    flavors: ['Fruit Punch', 'Cherry Limeade', 'Icy Blue Razz', 'Orange Burst', 'Watermelon', 'Pink Lemonade'],
    image: '/images/productos/cellucor-c4-front.jpg',
    gallery: [
      { src: '/images/productos/cellucor-c4-front.jpg', alt: 'Cellucor C4 Original Pre-Workout sabor Fruit Punch' },
      { src: '/images/productos/cellucor-c4-back.jpg', alt: 'Tabla de información nutricional de Cellucor C4 Original' },
    ],
    shortDescription: 'El pre-entreno #1 del mundo. Energía explosiva, foco y bombeo muscular.',
    description:
      'C4 Original es el pre-entreno más vendido a nivel global. Combina 205mg de cafeína con beta-alanina CarnoSyn® y creatina nitrato para energía explosiva, resistencia muscular y mejor bombeo (pump) desde el primer entrenamiento.',
    benefits: [
      '205mg de cafeína para energía y foco',
      'CarnoSyn® Beta-Alanina para resistencia muscular',
      'Creatina Nitrato (NO3-T®) para bombeo y rendimiento',
      'Complejo Velox® con L-Citrulina y L-Arginina',
      'Sin calorías, sin azúcar',
    ],
    usage:
      'Mezcla 1 cacito (9g) con 180ml de agua. Toma 20-30 minutos antes de entrenar. No exceder 1 porción en un período de 4-6 horas.',
    keyIngredients: ['Cafeína anhidra', 'CarnoSyn® Beta-Alanina', 'Creatina Nitrato (NO3-T®)', 'L-Citrulina', 'L-Arginina', 'Complejo PeptiPump®'],
    nutrition: {
      servingSize: '1 cacito (9 g)',
      servingsPerContainer: '30',
      rows: [
        { label: 'Calorías', value: '10' },
        { label: 'Carbohidratos totales', value: '1 g' },
        { label: 'Cafeína anhidra', value: '205 mg' },
        { label: 'Beta-Alanina (CarnoSyn®)', value: '2 g' },
        { label: 'Creatina Nitrato', value: '1 g' },
        { label: 'L-Citrulina / L-Arginina (Velox®)', value: '1.2 g / 1.2 g' },
        { label: 'Vitamina B12', value: '6 mcg (250% VD)' },
      ],
    },
    faqs: [
      { q: '¿Da mucho "tingling" o cosquilleo?', a: 'Sí, es normal por la beta-alanina; es una sensación pasajera e inofensiva, no es una reacción alérgica.' },
      { q: '¿Se puede tomar de noche?', a: 'No se recomienda entrenar y tomarlo muy tarde: contiene 205mg de cafeína, similar a 2 tazas de café.' },
      { q: '¿Apto para principiantes?', a: 'Sí, aunque si eres sensible a la cafeína puedes empezar con media porción para evaluar tolerancia.' },
    ],
  },
];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, max = 3) {
  const current = getProductBySlug(slug);
  if (!current) return PRODUCTS.slice(0, max);
  return PRODUCTS.filter((p) => p.slug !== slug).slice(0, max);
}
