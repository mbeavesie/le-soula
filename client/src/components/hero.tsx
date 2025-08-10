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
      
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-40 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal text-white max-w-4xl">
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl leading-[0.9] font-light tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="mt-8 text-xl/relaxed text-white/85 max-w-2xl font-light tracking-wide">
            {t('hero.tag')}
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-6">
            <a
              href="#wines"
              className="group inline-flex items-center justify-center rounded-3xl bg-honey-500/90 backdrop-blur-sm border border-honey-400/60 px-10 py-5 text-base font-medium text-white hover:bg-honey-600/90 hover:border-honey-300/80 transition-all duration-500 luxury-shadow"
            >
              <span className="tracking-wide">{t('hero.ctaPrimary')}</span>
              <svg className="ml-3 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#story"
              className="group inline-flex items-center justify-center rounded-3xl border-2 border-white/40 backdrop-blur-sm px-10 py-5 text-base font-medium text-white hover:bg-white/15 transition-all duration-500"
            >
              <span className="tracking-wide">{t('hero.ctaSecondary')}</span>
              <svg className="ml-3 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-honey-500"></div>
    </section>
  );
}
