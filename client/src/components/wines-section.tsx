import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { wines } from "@/data/wines";

interface WineCardProps {
  wine: typeof wines[0];
}

function WineCard({ wine }: WineCardProps) {
  const { currentLanguage } = useLanguage();
  const { ref } = useScrollReveal<HTMLDivElement>();
  const content = wine[currentLanguage as 'en' | 'fr'];

  return (
    <div ref={ref} className="reveal group">
      <div className="rounded-3xl bg-white border border-stone-200 overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <img
          src={wine.img}
          alt={content.name}
          className="w-full h-80 object-cover"
          loading="lazy"
        />
        <div className="p-8">
          <h3 className="font-serif text-2xl font-semibold text-ink">
            {content.name}
          </h3>
          <p className="text-honey-600 font-medium mt-1">{content.vintage}</p>
          <p className="mt-3 text-stone-700 leading-relaxed">{content.note}</p>
          <a
            href={wine.tech}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-honey-600 hover:text-honey-700 transition-colors"
          >
            Technical sheet →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function WinesSection() {
  const { t } = useLanguage();
  const { ref: headerRef } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="wines" className="py-24 border-t border-stone-200 mt-16">
      <div ref={headerRef} className="reveal text-center mb-16">
        <h2 className="font-serif text-4xl md:text-5xl font-semibold">
          {t('wines.title')}
        </h2>
        <p className="mt-4 text-xl text-stone-700 max-w-3xl mx-auto">
          {t('wines.copy')}
        </p>
      </div>
      
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {wines.map((wine) => (
          <WineCard key={wine.slug} wine={wine} />
        ))}
      </div>
    </section>
  );
}
