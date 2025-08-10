import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import etiquettesImage from "@assets/Etiquettes_1754823984581.jpg";

export default function StorySection() {
  const { t } = useLanguage();
  const { ref } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="story" className="py-32 border-t border-stone-200/50">
      <div ref={ref} className="reveal">
        {/* Title Section */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-gradient">
            {t('story.title')}
          </h2>
        </div>
        
        {/* Content Grid */}
        <div className="grid items-center gap-20 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="space-y-8 text-lg text-stone-600 font-light leading-relaxed">
              <p>{t('story.p1')}</p>
              <p>{t('story.p2')}</p>
              <p>{t('story.p3')}</p>
            </div>
            <a
              href="#"
              className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-honey-600 hover:text-honey-700 transition-all duration-300 group/link"
            >
              <span className="tracking-wide">More</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative group">
              <img
                src={etiquettesImage}
                alt="Le Soula wine labels featuring the golden bee logo and Terroir d'Altitude branding"
                className="w-full rounded-3xl luxury-shadow transition-transform duration-700 group-hover:scale-[1.01]"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-honey-500/5 via-transparent to-honey-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
