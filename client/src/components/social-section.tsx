import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Instagram } from "lucide-react";

export default function SocialSection() {
  const { t } = useLanguage();
  const { ref } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="social" className="py-32 border-t border-stone-200/50">
      <div ref={ref} className="reveal text-center">
        <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-gradient mb-6">
          {t('social.title')}
        </h2>
        <p className="text-xl text-stone-600 font-light max-w-3xl mx-auto leading-relaxed mb-12">
          {t('social.copy')}
        </p>
        <a
          href="https://www.instagram.com/lesoulawine/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-honey-500 to-honey-600 text-white rounded-full font-medium shadow-xl shadow-honey-600/25 hover:shadow-2xl hover:shadow-honey-600/35 hover:-translate-y-0.5 transition-all duration-500"
        >
          <Instagram className="w-5 h-5" />
          <span>{t('social.cta')}</span>
        </a>
      </div>
    </section>
  );
}
