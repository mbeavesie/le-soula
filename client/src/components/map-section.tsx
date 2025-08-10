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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3189.410446591461!2d2.4347041762474366!3d42.82038430589542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12afe06f20ffc5e3%3A0xfbabbab703139d7e!2sLe%20Soula!5e1!3m2!1sen!2sfr!4v1754823011984!5m2!1sen!2sfr" 
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
    </section>
  );
}