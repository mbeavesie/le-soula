import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function VisitSection() {
  const { t } = useLanguage();
  const { ref } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="visit" className="py-24 border-t border-stone-200">
      <div ref={ref} className="reveal text-center max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
          {t('visit.title')}
        </h2>
        <p className="text-xl text-stone-700 mb-8 max-w-2xl mx-auto">
          {t('visit.copy')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:hello@lesoula.com"
            className="inline-flex items-center justify-center rounded-xl bg-ink px-8 py-4 text-base font-medium text-white hover:bg-stone-700 transition-colors shadow-lg"
          >
            {t('visit.cta')}
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-xl border border-stone-300 px-8 py-4 text-base font-medium hover:bg-honey-50 hover:border-honey-200 transition-colors"
          >
            {t('visit.stockists')}
          </a>
        </div>
      </div>
    </section>
  );
}
