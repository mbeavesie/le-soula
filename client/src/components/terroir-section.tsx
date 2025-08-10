import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import vineyardImage from "@assets/Le Soula-100_1754824026402.jpg";

export default function TerroirSection() {
  const { t } = useLanguage();
  const { ref } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="terroir" className="py-32 border-t border-stone-200/50">
      <div ref={ref} className="reveal grid items-center gap-20 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="relative group">
            <img
              src={vineyardImage}
              alt="Le Soula vineyards at high altitude with mountain backdrop in the Fenouillèdes"
              className="w-full rounded-3xl luxury-shadow transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-honey-500/10 via-transparent to-honey-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
        
        <div className="order-1 lg:order-2">
          <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-gradient mb-8">
            {t('terroir.title')}
          </h2>
          <div className="space-y-6 text-lg text-stone-600 font-light">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-honey-50/50 to-transparent border border-honey-200/30">
              <div className="w-2 h-2 rounded-full bg-honey-500 mt-3 flex-shrink-0"></div>
              <span className="leading-relaxed">{t('terroir.elev')}</span>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-honey-50/50 to-transparent border border-honey-200/30">
              <div className="w-2 h-2 rounded-full bg-honey-500 mt-3 flex-shrink-0"></div>
              <span className="leading-relaxed">{t('terroir.soils')}</span>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-honey-50/50 to-transparent border border-honey-200/30">
              <div className="w-2 h-2 rounded-full bg-honey-500 mt-3 flex-shrink-0"></div>
              <span className="leading-relaxed">{t('terroir.farming')}</span>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-honey-50/50 to-transparent border border-honey-200/30">
              <div className="w-2 h-2 rounded-full bg-honey-500 mt-3 flex-shrink-0"></div>
              <span className="leading-relaxed">{t('terroir.climate')}</span>
            </div>
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
      </div>
    </section>
  );
}
