import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useState } from "react";
import vineyardImage from "@assets/Le Soula-100_1754824026402.jpg";

export default function TerroirSection() {
  const { t } = useLanguage();
  const { ref } = useScrollReveal<HTMLDivElement>();
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="terroir" className="py-32 border-t border-stone-200/50">
      <div ref={ref} className="reveal">
        <div className="text-center lg:text-left mb-16">
          <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-gradient">
            {t('terroir.title')}
          </h2>
        </div>
        
        <div className="grid items-center gap-20 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
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
          <div
            className={`overflow-hidden transition-all duration-700 ease-in-out ${expanded ? 'max-h-[1200px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}
          >
            <div className="space-y-5 text-stone-600 font-light leading-relaxed border-l-2 border-honey-300/60 pl-6">
              <p>{t('terroir.more1')}</p>
              <p>{t('terroir.more2')}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-honey-600 hover:text-honey-700 transition-all duration-300 group/link"
          >
            <span className="tracking-wide">{expanded ? t('terroir.lessLabel') : t('terroir.moreLabel')}</span>
            <svg className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-90' : 'group-hover/link:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          </div>
        
        <div className="order-1 lg:order-2">
          <div className="relative group">
            <img
              src={vineyardImage}
              alt="Le Soula vineyards at high altitude with mountain backdrop in the Fenouillèdes"
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
