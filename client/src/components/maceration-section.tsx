import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function MacerationSection() {
  const { t } = useLanguage();
  const { ref } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="maceration" className="py-32 border-t border-stone-200/50">
      <div ref={ref} className="reveal grid items-center gap-20 lg:grid-cols-2">
        <div className="order-1 lg:order-1">
          <div className="mb-4">
            <span className="text-xs text-honey-600 font-medium tracking-widest uppercase">
              {t('maceration.subtitle')}
            </span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-gradient mb-8">
            {t('maceration.title')}
          </h2>
          <div className="space-y-8 text-lg text-stone-600 font-light leading-relaxed">
            <p>{t('maceration.p1')}</p>
            <p>{t('maceration.p2')}</p>
            <p>{t('maceration.p3')}</p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-honey-50/50 to-transparent border border-honey-200/30">
              <div className="w-2 h-2 rounded-full bg-honey-500 flex-shrink-0"></div>
              <span className="text-sm font-medium text-stone-700">{t('maceration.feature1')}</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-honey-50/50 to-transparent border border-honey-200/30">
              <div className="w-2 h-2 rounded-full bg-honey-500 flex-shrink-0"></div>
              <span className="text-sm font-medium text-stone-700">{t('maceration.feature2')}</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-honey-50/50 to-transparent border border-honey-200/30">
              <div className="w-2 h-2 rounded-full bg-honey-500 flex-shrink-0"></div>
              <span className="text-sm font-medium text-stone-700">{t('maceration.feature3')}</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-honey-50/50 to-transparent border border-honey-200/30">
              <div className="w-2 h-2 rounded-full bg-honey-500 flex-shrink-0"></div>
              <span className="text-sm font-medium text-stone-700">{t('maceration.feature4')}</span>
            </div>
          </div>
        </div>
        
        <div className="order-2 lg:order-2">
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Wine maceration process in mountain cellar"
              className="w-full rounded-3xl luxury-shadow transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-honey-500/10 via-transparent to-honey-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
}