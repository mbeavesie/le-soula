import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function VisitSection() {
  const { t } = useLanguage();
  const { ref } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="visit" className="py-32 border-t border-stone-200/50">
      <div ref={ref} className="reveal text-center max-w-5xl mx-auto">
        <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-gradient mb-8">
          {t('visit.title')}
        </h2>
        <p className="text-xl text-stone-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          {t('visit.copy')}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="mailto:hello@lesoula.com"
            className="group inline-flex items-center justify-center rounded-3xl bg-ink px-10 py-5 text-base font-medium text-white hover:bg-stone-700 transition-all duration-500 luxury-shadow"
          >
            <span className="tracking-wide">{t('visit.cta')}</span>
            <svg className="ml-3 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#"
            className="group inline-flex items-center justify-center rounded-3xl border border-stone-300/50 px-10 py-5 text-base font-medium text-stone-600 hover:bg-honey-50 hover:border-honey-300 hover:text-honey-700 transition-all duration-500"
          >
            <span className="tracking-wide">{t('visit.stockists')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
