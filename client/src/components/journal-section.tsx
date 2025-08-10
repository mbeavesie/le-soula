import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { journalEntries } from "../data/journal";

interface JournalCardProps {
  entry: typeof journalEntries[0];
}

function JournalCard({ entry }: JournalCardProps) {
  const { currentLanguage } = useLanguage();
  const { ref } = useScrollReveal<HTMLElement>();
  const content = entry[currentLanguage as 'en' | 'fr'];
  
  const date = new Date(entry.date).toLocaleDateString(
    currentLanguage === 'fr' ? 'fr-FR' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  return (
    <article ref={ref} className="reveal group">
      <a
        href={entry.href}
        className="block rounded-3xl sophisticated-border overflow-hidden luxury-shadow hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-stone-50/50"
      >
        <div className="relative overflow-hidden">
          <img
            src={entry.img}
            alt={content.title}
            className={`w-full h-56 transition-transform duration-700 group-hover:scale-105 ${
              entry.img.includes('Revue de vins') ? 'object-contain bg-white' : 'object-cover'
            }`}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div className="p-8">
          <time className="text-xs text-honey-600 font-medium tracking-widest uppercase">{date}</time>
          <h3 className="font-serif text-xl font-light text-ink mt-3 tracking-wide">
            {content.title}
          </h3>
          <p className="mt-4 text-stone-600 leading-relaxed font-light">
            {content.excerpt}
          </p>
        </div>
      </a>
    </article>
  );
}

export default function JournalSection() {
  const { t } = useLanguage();
  const { ref: headerRef } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="journal" className="py-32 border-t border-stone-200/50">
      <div ref={headerRef} className="reveal text-center mb-20">
        <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-gradient">
          {t('journal.title')}
        </h2>
        <p className="mt-6 text-xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed">
          {t('journal.copy')}
        </p>
      </div>
      
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {journalEntries.map((entry, index) => (
          <JournalCard key={index} entry={entry} />
        ))}
      </div>
    </section>
  );
}
