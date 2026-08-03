import { useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";
import { useSeo } from "@/hooks/use-seo";
import Header from "@/components/header";
import Hero from "@/components/hero";
import WinesSection from "@/components/wines-section";
import StorySection from "@/components/story-section";
import TerroirSection from "@/components/terroir-section";
import JournalSection from "@/components/journal-section";
import BuySection from "@/components/buy-section";
import SocialSection from "@/components/social-section";
import ContactSection from "@/components/contact-section";
import VisitSection from "@/components/visit-section";
import MapSection from "@/components/map-section";
import Footer from "@/components/footer";

export default function Home() {
  const { currentLanguage } = useLanguage();

  useSeo(
    currentLanguage === 'fr'
      ? {
          title: 'Le Soula — Vins d\'altitude bio des Fenouillèdes',
          description: 'Le Soula élabore des vins d\'altitude bio et biodynamiques sur sols de schiste et de granite dans les Fenouillèdes. Découvrez nos cuvées blanc, rouge, rosé et Trigone.',
          image: 'https://www.le-soula.com/og-image.jpg',
          url: 'https://www.le-soula.com/',
          type: 'website',
          locale: 'fr_FR',
        }
      : {
          title: 'Le Soula — High-Altitude Organic Wines from the Fenouillèdes',
          description: 'Le Soula crafts high-altitude organic and biodynamic wines on schist and granite soils in the Fenouillèdes, French Pyrenees. Discover the estate\'s white, red, rosé and Trigone cuvées.',
          image: 'https://www.le-soula.com/og-image.jpg',
          url: 'https://www.le-soula.com/',
          type: 'website',
          locale: 'en_US',
        }
  );

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <Hero />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <WinesSection />
        <StorySection />
        <TerroirSection />
        <JournalSection />
        <BuySection />
        <SocialSection />
        <ContactSection />
        <VisitSection />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}
