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
      <div className="rounded-3xl sophisticated-border overflow-hidden luxury-shadow hover:shadow-2xl transition-all duration-700 hover:-translate-y-1 bg-gradient-to-br from-white to-stone-50/50">
        <div className="relative overflow-hidden">
          <img
            src={wine.img}
            alt={content.name}
            className="w-full h-80 object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-honey-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
        <div className="p-10">
          <h3 className="font-serif text-2xl font-light text-ink tracking-wide">
            {content.name}
          </h3>
          <p className="text-honey-600 font-medium mt-2 text-sm tracking-widest uppercase">{content.vintage}</p>
          <p className="mt-4 text-stone-600 leading-relaxed font-light">{content.note}</p>
          <a
            href={wine.tech}
            className="mt-6 inline-flex items-center gap-3 text-sm font-medium text-honey-600 hover:text-honey-700 transition-all duration-300 group/link"
          >
            <span className="tracking-wide">More</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
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
    <section id="wines" className="py-32 border-t border-stone-200/50 mt-20">
      <div ref={headerRef} className="reveal text-center mb-20">
        <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-gradient">
          {t('wines.title')}
        </h2>
        <p className="mt-6 text-xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed">
          {t('wines.copy')}
        </p>
      </div>
      
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {wines.map((wine) => (
          <WineCard key={wine.slug} wine={wine} />
        ))}
      </div>
    </section>
  );
}
