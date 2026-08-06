import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { KeywordMarquee } from '@/components/KeywordMarquee';
import { GoalsStrip } from '@/components/GoalsStrip';
import { CategoryGrid } from '@/components/CategoryGrid';
import { WholesaleSplit } from '@/components/WholesaleSplit';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { About } from '@/components/About';
import { SocialProof } from '@/components/SocialProof';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { WhatsAppFloatingButton } from '@/components/WhatsAppButton';
import { getAllCatalogItems, getFeaturedCombos, getHeroSlides } from '@/lib/products-repo';

export const revalidate = 0;

export default async function Home() {
  const [items, slides, combos] = await Promise.all([
    getAllCatalogItems(),
    getHeroSlides(),
    getFeaturedCombos(),
  ]);

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero slides={slides} />
        <KeywordMarquee />
        <GoalsStrip />
        <CategoryGrid items={items} />
        <FeaturedProducts combos={combos} total={items.length} />
        <About />
        <SocialProof />
        <WholesaleSplit />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
