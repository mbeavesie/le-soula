import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { journalEntries } from "@/data/journal";

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
        className="block rounded-3xl bg-white border border-stone-200 overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      >
        <img
          src={entry.img}
          alt={content.title}
          className="w-full h-56 object-cover"
          loading="lazy"
        />
        <div className="p-6">
          <time className="text-sm text-honey-600 font-medium">{date}</time>
          <h3 className="font-serif text-xl font-semibold text-ink mt-2">
            {content.title}
          </h3>
          <p className="mt-3 text-stone-700 leading-relaxed">
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
    <section id="journal" className="py-24 border-t border-stone-200">
      <div ref={headerRef} className="reveal text-center mb-16">
        <h2 className="font-serif text-4xl md:text-5xl font-semibold">
          {t('journal.title')}
        </h2>
        <p className="mt-4 text-xl text-stone-700 max-w-3xl mx-auto">
          {t('journal.copy')}
        </p>
      </div>
      
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {journalEntries.map((entry, index) => (
          <JournalCard key={index} entry={entry} />
        ))}
      </div>
    </section>
  );
}
