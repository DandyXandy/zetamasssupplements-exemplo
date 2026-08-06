import { config } from 'dotenv';
import { PrismaClient } from '../src/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { CATALOG } from '../src/lib/catalog';
import { PRODUCTS } from '../src/lib/products';

config({ path: '.env.local', quiet: true });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(`Sembrando ${CATALOG.length} productos del catálogo...`);

  for (const item of CATALOG) {
    const flagship = PRODUCTS.find((p) => p.slug === item.slug);

    await prisma.product.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        slug: item.slug,
        name: item.name,
        brand: item.brand,
        category: item.category,
        isCombo: item.isCombo ?? false,
        comboDescription: item.comboDescription ?? null,
        shortDescription: flagship?.shortDescription ?? null,
        description: flagship?.description ?? null,
        style: null,
        benefits: flagship ? JSON.stringify(flagship.benefits) : null,
        usage: flagship?.usage ?? null,
        images: JSON.stringify(
          flagship ? Array.from(new Set(flagship.gallery.map((g) => g.src))).slice(0, 3) : [item.image],
        ),
        sizes: JSON.stringify(item.sizes),
        flavors: flagship ? JSON.stringify(flagship.flavors.map((label) => ({ label }))) : null,
      },
    });
  }

  // Los 4 productos "flagship" no estaban en CATALOG bajo el mismo slug en
  // todos los casos — nos aseguramos de que también existan si faltan.
  for (const flagship of PRODUCTS) {
    const exists = await prisma.product.findUnique({ where: { slug: flagship.slug } });
    if (!exists) {
      await prisma.product.create({
        data: {
          slug: flagship.slug,
          name: flagship.name,
          brand: flagship.brand,
          category: flagship.categorySlug,
          shortDescription: flagship.shortDescription,
          description: flagship.description,
          benefits: JSON.stringify(flagship.benefits),
          usage: flagship.usage,
          images: JSON.stringify(Array.from(new Set(flagship.gallery.map((g) => g.src))).slice(0, 3)),
          sizes: JSON.stringify([{ label: flagship.weight, price: null }]),
          flavors: JSON.stringify(flagship.flavors.map((label) => ({ label }))),
        },
      });
    }
  }

  const bannerCount = await prisma.bannerSlide.count();
  if (bannerCount === 0) {
    console.log('Sembrando slides del banner...');
    await prisma.bannerSlide.createMany({
      data: [
        { type: 'video', url: '/videos/hero.mp4', posterUrl: '/videos/hero-cover.jpg', position: 0 },
        { type: 'image', url: '/images/hero-tienda-optimum.jpg', position: 1 },
        { type: 'image', url: '/videos/hero-cover.jpg', position: 2 },
        { type: 'image', url: '/images/vitrine-estante-creatina.jpg', position: 3 },
      ],
    });
  }

  const total = await prisma.product.count();
  console.log(`Listo — ${total} productos en la base de datos.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
