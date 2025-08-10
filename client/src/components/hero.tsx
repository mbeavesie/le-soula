import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import heroVideoPath from "@assets/Hero home Le Soula_1754822245770.mp4";

export default function Hero() {
  const { t } = useLanguage();
  const { ref } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative h-screen w-full overflow-hidden" id="top">
      {/* Le Soula vineyard hero video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
      >
        <source
          src={heroVideoPath}
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 hero-overlay"></div>
      
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-32 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal text-white max-w-3xl">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-tight font-semibold">
            {t('hero.title')}
          </h1>
          <p className="mt-6 text-xl/relaxed text-white/90 max-w-2xl">
            {t('hero.tag')}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#wines"
              className="inline-flex items-center justify-center rounded-xl bg-honey-500 px-8 py-4 text-base font-medium text-white hover:bg-honey-600 transition-colors shadow-lg"
            >
              {t('hero.ctaPrimary')}
            </a>
            <a
              href="#story"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/50 px-8 py-4 text-base font-medium text-white hover:bg-white/10 transition-colors"
            >
              {t('hero.ctaSecondary')}
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-honey-500"></div>
    </section>
  );
}
