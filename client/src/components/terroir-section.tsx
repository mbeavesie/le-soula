import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function TerroirSection() {
  const { t } = useLanguage();
  const { ref } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="terroir" className="py-24 border-t border-stone-200">
      <div ref={ref} className="reveal grid items-center gap-16 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          {/* Detailed topographical map showing vineyard elevation and soil types */}
          <img
            src="https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
            alt="Topographical map of the Fenouillèdes wine region"
            className="w-full rounded-3xl shadow-soft"
            loading="lazy"
          />
        </div>
        
        <div className="order-1 lg:order-2">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
            {t('terroir.title')}
          </h2>
          <div className="space-y-4 text-lg text-stone-700">
            <div className="flex items-start gap-3">
              <span className="text-honey-500 text-xl">•</span>
              <span>{t('terroir.elev')}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-honey-500 text-xl">•</span>
              <span>{t('terroir.soils')}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-honey-500 text-xl">•</span>
              <span>{t('terroir.farming')}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-honey-500 text-xl">•</span>
              <span>{t('terroir.climate')}</span>
            </div>
          </div>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 rounded-xl border border-stone-300 px-6 py-3 text-base font-medium hover:bg-honey-50 hover:border-honey-200 transition-all"
          >
            {t('terroir.cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
