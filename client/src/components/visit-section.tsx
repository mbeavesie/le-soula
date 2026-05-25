import { ShoppingBag, ArrowRight } from "lucide-react";
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
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="https://www.wine-searcher.com/find/le+soula"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center rounded-3xl bg-honey-600 px-10 py-5 text-base font-medium text-white shadow-lg shadow-honey-600/20 hover:bg-honey-700 hover:shadow-xl hover:shadow-honey-600/30 hover:-translate-y-0.5 transition-all duration-500"
            data-testid="link-stockists"
          >
            <ShoppingBag className="mr-3 w-4 h-4" />
            <span className="tracking-wide">{t('visit.stockists')}</span>
          </a>
          <a
            href="mailto:info@le-soula.com"
            className="group inline-flex items-center justify-center rounded-3xl border border-stone-300/50 px-10 py-5 text-base font-medium text-stone-600 hover:bg-honey-50 hover:border-honey-300 hover:text-honey-700 transition-all duration-500"
            data-testid="link-visit-email"
          >
            <span className="tracking-wide">{t('visit.cta')}</span>
            <ArrowRight className="ml-3 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
        <p className="mt-8 text-sm text-stone-500 font-light tracking-wide">
          {t('visit.stockistsHint')}
        </p>
      </div>
    </section>
  );
}
