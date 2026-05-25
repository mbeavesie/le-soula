import { ShoppingBag } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function BuySection() {
  const { t } = useLanguage();
  const { ref } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="buy" className="py-32 border-t border-stone-200/50">
      <div ref={ref} className="reveal text-center max-w-5xl mx-auto">
        <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-gradient mb-8">
          {t('buy.title')}
        </h2>
        <p className="text-xl text-stone-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          {t('buy.copy')}
        </p>
        <div className="flex justify-center">
          <a
            href="https://www.wine-searcher.com/find/le+soula"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center rounded-3xl bg-honey-600 px-12 py-6 text-lg font-medium text-white shadow-xl shadow-honey-600/25 hover:bg-honey-700 hover:shadow-2xl hover:shadow-honey-600/35 hover:-translate-y-0.5 transition-all duration-500"
            data-testid="link-buy"
          >
            <ShoppingBag className="mr-3 w-5 h-5" />
            <span className="tracking-wide">{t('buy.cta')}</span>
          </a>
        </div>
        <p className="mt-8 text-sm text-stone-500 font-light tracking-wide">
          {t('buy.hint')}
        </p>
      </div>
    </section>
  );
}
