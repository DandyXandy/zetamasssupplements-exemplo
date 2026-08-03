import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CategoryGrid } from '@/components/CategoryGrid';
import { WholesaleSplit } from '@/components/WholesaleSplit';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { About } from '@/components/About';
import { SocialProof } from '@/components/SocialProof';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { WhatsAppFloatingButton } from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <CategoryGrid />
        <WholesaleSplit />
        <FeaturedProducts />
        <About />
        <SocialProof />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
