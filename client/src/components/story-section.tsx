import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useStoryParagraphs } from "@/hooks/use-cms";
import beeImage from "@assets/bee_1754904751800.png";
import valleyImage from "@assets/Le Soula valley_1754909174954.jpeg";
import etiquettesImage from "@assets/Etiquettes_1754823984581.jpg";
import wendyImage from "@assets/6_1754904851528.png";

const FALLBACK_IMAGES = [
  { src: beeImage, alt: "Bee on vine leaves", caption: "The bee as our muse" },
  { src: valleyImage, alt: "Le Soula valley landscape", caption: "Terroir of granite and schist" },
  { src: etiquettesImage, alt: "Le Soula wine labels", caption: "Restored cellar in Prugnanes" },
  { src: wendyImage, alt: "Wendy Wilson at the winery", caption: "Today's living ecosystem" },
];

export default function StorySection() {
  const { t, currentLanguage } = useLanguage();
  const { ref } = useScrollReveal<HTMLDivElement>();
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: cmsParagraphs } = useStoryParagraphs();

  // Build the paragraphs to render: prefer CMS data, fall back to translation keys + static images
  const paragraphs = (cmsParagraphs && cmsParagraphs.length > 0)
    ? cmsParagraphs.map((p, i) => ({
        text: p[currentLanguage as 'en' | 'fr'] || p.en,
        img: p.img || FALLBACK_IMAGES[i]?.src,
        alt: p.alt || FALLBACK_IMAGES[i]?.alt || '',
        caption: p.caption || FALLBACK_IMAGES[i]?.caption || '',
      }))
    : [1, 2, 3, 4].map((n, i) => ({
        text: t(`story.p${n}`),
        img: FALLBACK_IMAGES[i].src,
        alt: FALLBACK_IMAGES[i].alt,
        caption: FALLBACK_IMAGES[i].caption,
      }));

  const first = paragraphs[0];
  const rest = paragraphs.slice(1);

  return (
    <section id="story" className="py-32 border-t border-stone-200/50">
      <div ref={ref} className="reveal">
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-gradient">
            {t('story.title')}
          </h2>
        </div>

        <div className="grid items-center gap-20 lg:grid-cols-2 mb-16">
          <div className="order-2 lg:order-1">
            <div className="space-y-8 text-lg text-stone-600 font-light leading-relaxed">
              <p>{first.text}</p>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-honey-600 hover:text-honey-700 transition-all duration-300 group/link"
            >
              <span className="tracking-wide">
                {isExpanded ? t('story.collapseButton') : t('story.expandButton')}
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'group-hover/link:translate-x-1'}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                {isExpanded ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                )}
              </svg>
            </button>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative group">
              {first.img && (
                <img
                  src={first.img}
                  alt={first.alt}
                  className="w-full rounded-3xl luxury-shadow transition-transform duration-700 group-hover:scale-[1.01]"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-honey-500/5 via-transparent to-honey-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-2xl p-3 text-white text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {first.caption}
              </div>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-none opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          {isExpanded && (
            <div className="space-y-20">
              {rest.map((p, idx) => {
                const imageRight = idx % 2 === 0;
                return (
                  <div key={idx} className="grid items-center gap-20 lg:grid-cols-2">
                    <div className={imageRight ? 'order-1 lg:order-1' : 'order-2 lg:order-1'}>
                      <div className="text-lg text-stone-600 font-light leading-relaxed">
                        <p>{p.text}</p>
                      </div>
                    </div>
                    <div className={imageRight ? 'order-2 lg:order-2' : 'order-1 lg:order-2'}>
                      <div className="relative group">
                        {p.img && (
                          <img
                            src={p.img}
                            alt={p.alt}
                            className="w-full rounded-3xl luxury-shadow transition-transform duration-700 group-hover:scale-[1.01]"
                            loading="lazy"
                          />
                        )}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-honey-500/5 via-transparent to-honey-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-2xl p-3 text-white text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {p.caption}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
