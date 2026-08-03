import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useJournalPosts, type UIJournalPost } from "@/hooks/use-cms";
import { Link } from "wouter";

function JournalCard({ post }: { post: UIJournalPost }) {
  const { currentLanguage } = useLanguage();
  const { ref } = useScrollReveal<HTMLElement>();
  const content = post[currentLanguage as 'en' | 'fr'];

  const date = new Date(post.publishedAt).toLocaleDateString(
    currentLanguage === 'fr' ? 'fr-FR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const external = !post.hasBody && post.href && post.href !== '#';
  const internal = post.hasBody && post.slug;
  const CardTag: any = internal ? Link : 'a';

  return (
    <article ref={ref} className="reveal group">
      <CardTag
        {...(internal ? { href: `/journal/${post.slug}` } : { href: post.href || '#' })}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="block rounded-3xl sophisticated-border overflow-hidden luxury-shadow hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-stone-50/50"
      >
        <div className="relative overflow-hidden">
          {post.img && (
            <img
              src={post.img}
              alt={content.title}
              className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          )}
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
      </CardTag>
    </article>
  );
}

export default function JournalSection() {
  const { t } = useLanguage();
  const { ref: headerRef } = useScrollReveal<HTMLDivElement>();
  const { data: posts = [], isLoading } = useJournalPosts();

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

      {isLoading ? (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="rounded-3xl overflow-hidden">
                <div className="w-full h-56 bg-stone-200"></div>
                <div className="p-8">
                  <div className="h-3 bg-stone-200 rounded w-1/4 mb-3"></div>
                  <div className="h-6 bg-stone-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-stone-200 rounded w-full"></div>
                  <div className="h-4 bg-stone-200 rounded w-2/3 mt-2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <JournalCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
