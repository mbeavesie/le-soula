import { useEffect } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import WinesSection from "@/components/wines-section";
import StorySection from "@/components/story-section";
import TerroirSection from "@/components/terroir-section";
import JournalSection from "@/components/journal-section";
import SocialSection from "@/components/social-section";
import ContactSection from "@/components/contact-section";
import VisitSection from "@/components/visit-section";
import MapSection from "@/components/map-section";
import Footer from "@/components/footer";

export default function Home() {
  useEffect(() => {
    // Set document language based on current language
    const lang = localStorage.getItem('language') || 'en';
    document.documentElement.lang = lang;
  }, []);

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <Hero />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <WinesSection />
        <StorySection />
        <TerroirSection />
        <JournalSection />
        <SocialSection />
        <ContactSection />
        <VisitSection />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}
