import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

// Curated social content - update these with authentic content
const socialPosts = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1474671096392-5f503e32a241?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    caption: 'Morning light over our high-altitude vineyards in the Fenouillèdes. The mountain terroir shaping every vintage.',
    date: '2 days ago',
    link: 'https://www.instagram.com/lesoulawine/'
  },
  {
    id: '2', 
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    caption: 'Hand-harvesting our Syrah. Respect for the fruit, respect for the terroir, respect for time.',
    date: '5 days ago',
    link: 'https://www.instagram.com/lesoulawine/'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1566754900347-ee0c6b80b0da?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400', 
    caption: 'Trigone Lot XV - our perpetual blend capturing the essence of multiple vintages. Complexity through patience.',
    date: '1 week ago',
    link: 'https://www.instagram.com/lesoulawine/'
  }
];

function SocialCard({ post }: { post: typeof socialPosts[0] }) {
  const { ref } = useScrollReveal<HTMLElement>();
  
  return (
    <article ref={ref} className="reveal group">
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-3xl sophisticated-border overflow-hidden luxury-shadow hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-stone-50/50"
      >
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt="Le Soula Instagram post"
            className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-4 right-4">
            <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-honey-600 font-medium tracking-widest uppercase">
              {post.date}
            </span>
            <span className="text-xs text-stone-500 uppercase tracking-wider">
              @lesoulawine
            </span>
          </div>
          <p className="text-stone-600 leading-relaxed font-light text-sm">
            {post.caption}
          </p>
        </div>
      </a>
    </article>
  );
}

export default function SocialSection() {
  const { t } = useLanguage();
  const { ref: headerRef } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="social" className="py-32 border-t border-stone-200/50">
      <div ref={headerRef} className="reveal text-center mb-20">
        <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-gradient">
          {t('social.title')}
        </h2>
        <p className="mt-6 text-xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed">
          {t('social.copy')}
        </p>
        <a
          href="https://www.instagram.com/lesoulawine/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-honey-600 hover:text-honey-700 transition-all duration-300 group/link"
        >
          <span className="tracking-wide">{t('social.cta')}</span>
          <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
      
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {socialPosts.map((post) => (
          <SocialCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}