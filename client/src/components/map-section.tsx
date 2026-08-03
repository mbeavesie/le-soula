import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function MapSection() {
  const { t } = useLanguage();
  const { ref } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="location" className="py-32 border-t border-stone-200/50">
      <div ref={ref} className="reveal text-center mb-20">
        <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-gradient mb-8">
          {t('location.title')}
        </h2>
        <p className="text-xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed">
          {t('location.copy')}
        </p>
      </div>
      
      <div className="rounded-3xl overflow-hidden luxury-shadow border border-stone-200/30">
        <div 
          className="w-full h-96 md:h-[500px] relative"
          style={{
            filter: 'grayscale(100%) contrast(1.3) brightness(0.85)',
          }}
        >
          <iframe 
            src="https://maps.google.com/maps?q=Pla%20d'en%20Dallen%2C%2066220%20Saint-Martin-de-Fenouillet%2C%20France&z=12&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Le Soula Location"
          />
          <div className="absolute inset-0 border border-stone-300/20 rounded-3xl pointer-events-none"></div>
        </div>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto text-center sm:text-left">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-honey-50/50 to-transparent border border-honey-200/30">
          <p className="text-xs text-honey-600 font-medium tracking-widest uppercase mb-2">{t('location.officeLabel')}</p>
          <p className="text-stone-700 font-light leading-relaxed">{t('location.officeAddress')}</p>
          <p className="text-stone-500 font-light mt-1">{t('location.officePhone')}</p>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-r from-honey-50/50 to-transparent border border-honey-200/30">
          <p className="text-xs text-honey-600 font-medium tracking-widest uppercase mb-2">{t('location.cellarLabel')}</p>
          <p className="text-stone-700 font-light leading-relaxed">{t('location.cellarAddress')}</p>
        </div>
      </div>
    </section>
  );
}