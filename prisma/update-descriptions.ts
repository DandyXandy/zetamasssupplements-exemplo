// Genera y aplica descripciones, beneficios, modo de uso y "estilo" reales
// para todo el catálogo (CATALOG en src/lib/catalog.ts), basados en el tipo
// de producto y la línea de la marca. Los 4 productos "flagship" (que ya
// tienen ficha técnica completa en src/lib/products.ts) no se tocan.
import { config } from 'dotenv';
import { PrismaClient } from '../src/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { CATALOG, type CatalogItem } from '../src/lib/catalog';
import { PRODUCTS } from '../src/lib/products';

config({ path: '.env.local', quiet: true });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

type Content = {
  shortDescription: string;
  description: string;
  benefits: string[];
  usage: string;
  style: string;
};

// ── Plantillas por categoría (con variantes para no sonar repetitivo) ──────
function massGainer(name: string, brand: string, i: number): Content {
  const variants = [
    `${name} de ${brand} está pensado para quienes entrenan duro pero no logran subir de peso solo con la comida. Aporta una carga calórica alta junto con proteína de calidad para que cada porción sume músculo y no solo báscula.`,
    `Con ${name}, ${brand} entrega la combinación de carbohidratos y proteína que necesitas cuando tu metabolismo va más rápido que tu progreso. Ideal para sumar volumen de forma constante, entrenamiento tras entrenamiento.`,
  ];
  return {
    shortDescription: `Ganador de peso de alto aporte calórico para sumar masa muscular y volumen.`,
    description: variants[i % variants.length],
    benefits: [
      'Alto aporte calórico por porción para favorecer el aumento de peso',
      'Buena relación entre proteína y carbohidratos para recuperar después de entrenar',
      'Ideal para biotipos ectomorfos y personas con metabolismo acelerado',
      'Se disuelve fácil en shaker o licuadora, con agua o leche',
      'Se puede combinar con creatina para potenciar la ganancia de fuerza',
    ],
    usage:
      'Mezcla la porción indicada en la etiqueta con agua o leche fría en shaker o licuadora. Toma 1-2 porciones al día, idealmente entre comidas o después de entrenar, según tu requerimiento calórico.',
    style: 'Ganador de masa',
  };
}

function wheyProtein(name: string, brand: string, i: number): Content {
  const variants = [
    `${name} de ${brand} es tu aliado para llegar a tu meta diaria de proteína sin complicarte. Aporta aminoácidos de rápida absorción, ideal para después de entrenar o como snack alto en proteína en cualquier momento del día.`,
    `${brand} formuló ${name} para cubrir tu requerimiento proteico con una mezcla que se disuelve fácil y no cae pesada. Perfecta para sumar a tu rutina diaria, entrenes o no ese día.`,
  ];
  return {
    shortDescription: `Proteína whey de rápida absorción para recuperación muscular y masa magra.`,
    description: variants[i % variants.length],
    benefits: [
      'Aporte alto de proteína por porción para recuperación muscular',
      'Perfil completo de aminoácidos esenciales, incluyendo BCAAs',
      'Rápida digestión, ideal para el post-entreno',
      'Bajo en grasas y carbohidratos frente a su aporte proteico',
      'Se mezcla fácil en shaker con agua o leche',
    ],
    usage:
      'Mezcla 1 cacito con 200-250ml de agua o leche fría en shaker. Toma 1-2 porciones al día, preferentemente después de entrenar o entre comidas.',
    style: 'Proteína clásica',
  };
}

function isolateProtein(name: string, brand: string, i: number): Content {
  const variants = [
    `${name} de ${brand} es proteína aislada, filtrada para quedarse con lo esencial: proteína pura, con mínima grasa, carbohidratos y lactosa. Ideal si buscas definición sin sacrificar músculo.`,
    `Cuando el whey normal te cae pesado o estás en fase de definición, ${name} de ${brand} es la alternativa: proteína aislada de absorción más rápida y perfil nutricional más limpio.`,
  ];
  return {
    shortDescription: `Proteína aislada (isolate) de absorción rápida, baja en grasa y carbohidratos.`,
    description: variants[i % variants.length],
    benefits: [
      'Mayor pureza de proteína por porción que un whey concentrado',
      'Muy baja en grasas, carbohidratos y lactosa',
      'Absorción rápida, ideal para el post-entreno inmediato',
      'Ayuda a preservar masa muscular en fases de definición',
      'Sabor y textura suaves, fácil de disolver',
    ],
    usage:
      'Mezcla 1 cacito con 200-250ml de agua fría en shaker. Toma 1 porción después de entrenar o para completar tu ingesta diaria de proteína.',
    style: 'Isolate premium',
  };
}

function creatine(name: string, brand: string, i: number): Content {
  const variants = [
    `${name} de ${brand} es creatina monohidratada en su forma más estudiada y efectiva, pensada para quienes buscan más fuerza, más potencia y mejor recuperación entre series.`,
    `${brand} presenta ${name}, creatina monohidratada pura para sumar a tu rutina diaria y notar la diferencia en tus cargas, tus repeticiones extra y tu volumen muscular.`,
  ];
  return {
    shortDescription: `Creatina monohidratada para ganar fuerza, potencia y volumen muscular.`,
    description: variants[i % variants.length],
    benefits: [
      'Aumenta la fuerza y potencia disponible durante el entrenamiento',
      'Favorece la recuperación entre series y sesiones',
      'Apoya el aumento de volumen muscular',
      'Fácil de mezclar: prácticamente sin sabor',
      'Compatible con cualquier otro suplemento (proteína, pre-entreno, etc.)',
    ],
    usage:
      'Mezcla 1 porción (según etiqueta) con agua, jugo o tu batido de proteína. Puedes tomarla en fase de carga (varias veces al día por 5-7 días) o directamente 1 porción diaria en mantenimiento.',
    style: 'Clásica y pura',
  };
}

function preWorkout(name: string, brand: string, i: number): Content {
  const variants = [
    `${name} de ${brand} está diseñado para encender tu entrenamiento desde el primer minuto: energía, foco mental y mejor bombeo muscular en una sola mezcla.`,
    `Cuando necesitas ese extra antes de entrenar, ${name} de ${brand} entrega energía sostenida, concentración y ganas de dar una repetición más.`,
  ];
  return {
    shortDescription: `Pre-entreno para energía explosiva, foco mental y mejor bombeo muscular.`,
    description: variants[i % variants.length],
    benefits: [
      'Energía y foco mental para entrenamientos más intensos',
      'Mejora la sensación de bombeo (pump) muscular',
      'Ayuda a retrasar la fatiga durante la sesión',
      'Ideal para quienes entrenan temprano o después de un día largo',
      'Ficha de ingredientes pensada para rendimiento, no solo estimulación',
    ],
    usage:
      'Mezcla 1 porción con agua fría 20-30 minutos antes de entrenar. No excedas 1 porción cada 4-6 horas ni la tomes muy tarde si eres sensible a la cafeína.',
    style: 'Energético e intenso',
  };
}

function aminoAcid(name: string, brand: string, i: number): Content {
  const variants = [
    `${name} de ${brand} te ayuda a proteger tu masa muscular durante el entrenamiento y a recuperarte más rápido entre sesiones, sin sumar calorías extra.`,
    `Ideal para tomar durante o después de entrenar, ${name} de ${brand} aporta los aminoácidos que tu cuerpo necesita para frenar el catabolismo y acelerar la recuperación.`,
  ];
  return {
    shortDescription: `Aminoácidos para recuperación muscular y menos fatiga durante el entrenamiento.`,
    description: variants[i % variants.length],
    benefits: [
      'Ayuda a preservar la masa muscular durante el ejercicio',
      'Favorece la recuperación entre series y entre sesiones',
      'Reduce la sensación de fatiga durante entrenamientos largos',
      'Libre de calorías o con muy pocas calorías por porción',
      'Se puede tomar antes, durante o después de entrenar',
    ],
    usage:
      'Mezcla 1 porción con 300-500ml de agua fría. Tómalo antes, durante o después de tu entrenamiento, o entre comidas para complementar tu ingesta diaria de aminoácidos.',
    style: 'Recuperación',
  };
}

function vitamin(name: string, brand: string, i: number): Content {
  const variants = [
    `${name} de ${brand} cubre esos micronutrientes que la dieta diaria muchas veces deja cortos, dando soporte a tu energía, tu sistema inmune y tu recuperación general.`,
    `Entrenar duro exige más de tu cuerpo. ${name} de ${brand} ayuda a cubrir esa mayor demanda de vitaminas y minerales para que tu salud general no quede en segundo plano.`,
  ];
  return {
    shortDescription: `Soporte diario de vitaminas y minerales para tu salud e inmunidad.`,
    description: variants[i % variants.length],
    benefits: [
      'Complementa una dieta que puede quedar corta en micronutrientes',
      'Da soporte al sistema inmune y a los niveles de energía',
      'Aporta antioxidantes que ayudan en la recuperación',
      'Fácil de incorporar a tu rutina diaria de suplementación',
      'Formato práctico en cápsulas o softgels',
    ],
    usage:
      'Toma la dosis indicada en la etiqueta junto con una comida, preferentemente siempre a la misma hora del día para no olvidarla.',
    style: 'Soporte diario',
  };
}

function fatBurner(name: string, brand: string, i: number): Content {
  const variants = [
    `${name} de ${brand} está formulado para apoyar tu proceso de definición: acelera el metabolismo, da energía extra y ayuda a controlar el apetito mientras cuidas tu dieta.`,
    `Para la etapa de marcar músculo, ${name} de ${brand} suma un empujón extra al metabolismo y a la energía, ideal para acompañar tu entrenamiento y tu plan de alimentación.`,
  ];
  return {
    shortDescription: `Quemador de grasa para acelerar el metabolismo y apoyar la definición.`,
    description: variants[i % variants.length],
    benefits: [
      'Ayuda a acelerar el metabolismo',
      'Aporta energía extra para sostener el ritmo de entrenamiento',
      'Puede ayudar a controlar la sensación de apetito',
      'Complementa (no reemplaza) una dieta controlada en calorías',
      'Formato práctico en cápsulas, fácil de dosificar',
    ],
    usage:
      'Toma la dosis indicada en la etiqueta, preferentemente en la mañana o antes de entrenar. No la combines con otros estimulantes ni la tomes muy tarde en el día.',
    style: 'Termogénico',
  };
}

function combo(item: CatalogItem, i: number): Content {
  const variants = [
    `Este combo de Zeta Mass reúne dos productos que se complementan perfecto: una base sólida de proteína o volumen, más creatina para fuerza y rendimiento — y viene con regalos sorpresa incluidos.`,
    `Pensado para rendir más por tu dinero, este combo junta lo esencial de tu rutina de suplementación en un solo pedido, con regalos sorpresa de cortesía de Zeta Mass.`,
  ];
  return {
    shortDescription: item.comboDescription ?? 'Combo con creatina y regalos incluidos, al mejor precio.',
    description: variants[i % variants.length],
    benefits: [
      'Combina proteína/volumen con creatina en un solo pedido',
      'Mejor precio que comprar cada producto por separado',
      'Incluye regalos sorpresa de cortesía',
      'Ideal para arrancar o reforzar tu rutina de suplementación',
      'Productos 100% originales, con la garantía de Zeta Mass',
    ],
    usage:
      'Sigue el modo de uso indicado en la etiqueta de cada producto del combo: la proteína o el ganador de masa según tus comidas, y la creatina 1 porción diaria mezclada con agua o tu batido.',
    style: 'Combo con regalos',
  };
}

const GENERATORS: Record<string, (name: string, brand: string, i: number) => Content> = {
  'ganadores-masa': massGainer,
  'proteinas-whey': wheyProtein,
  'proteinas-isolate': isolateProtein,
  creatinas: creatine,
  'pre-entreno': preWorkout,
  aminoacidos: aminoAcid,
  vitaminas: vitamin,
  quemadores: fatBurner,
};

function buildContent(item: CatalogItem, indexInCategory: number): Content {
  if (item.category === 'combos') return combo(item, indexInCategory);
  const gen = GENERATORS[item.category];
  if (!gen) throw new Error(`Sin generador para categoría ${item.category}`);
  return gen(item.name, item.brand, indexInCategory);
}

async function main() {
  const flagshipSlugs = new Set(PRODUCTS.map((p) => p.slug));
  const perCategoryCount: Record<string, number> = {};
  let updated = 0;

  for (const item of CATALOG) {
    if (flagshipSlugs.has(item.slug)) continue; // ya tienen ficha completa

    const i = perCategoryCount[item.category] ?? 0;
    perCategoryCount[item.category] = i + 1;

    const content = buildContent(item, i);

    await prisma.product.update({
      where: { slug: item.slug },
      data: {
        shortDescription: content.shortDescription,
        description: content.description,
        benefits: JSON.stringify(content.benefits),
        usage: content.usage,
        style: content.style,
      },
    });
    updated += 1;
  }

  console.log(`Descripciones actualizadas para ${updated} productos.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
