import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function StorySection() {
  const { t } = useLanguage();
  const { ref } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="story" className="py-24 border-t border-stone-200">
      <div ref={ref} className="reveal grid items-center gap-16 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
            {t('story.title')}
          </h2>
          <div className="prose prose-lg text-stone-700 space-y-6">
            <p>{t('story.p1')}</p>
            <p>{t('story.p2')}</p>
            <p>{t('story.p3')}</p>
          </div>
        </div>
        
        <div className="order-1 lg:order-2">
          {/* Organic vineyard with old vines on terraced hillsides */}
          <img
            src="https://images.unsplash.com/photo-1571566882372-1598d88abd90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
            alt="High-altitude vineyards on terraced hillsides"
            className="w-full rounded-3xl shadow-soft"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
