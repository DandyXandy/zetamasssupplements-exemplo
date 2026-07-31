import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Vitrine } from '@/components/Vitrine';
import { About } from '@/components/About';
import { SocialProof } from '@/components/SocialProof';
import { Footer } from '@/components/Footer';
import { WhatsAppFloatingButton } from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Vitrine />
        <About />
        <SocialProof />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
