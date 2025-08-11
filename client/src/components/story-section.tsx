import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import beeImage from "@assets/bee_1754904751800.png";
import vineyardImage from "@assets/Le Soula-100_1754824026402.jpg";
import etiquettesImage from "@assets/Etiquettes_1754823984581.jpg";
import wendyImage from "@assets/6_1754904851528.png";

export default function StorySection() {
  const { t } = useLanguage();
  const { ref } = useScrollReveal<HTMLDivElement>();
  const [isExpanded, setIsExpanded] = useState(false);

  const storyImages = [
    {
      src: beeImage,
      alt: "Close-up of a bee on vine leaves, representing Le Soula's inspiration and natural philosophy",
      caption: "The bee as our muse"
    },
    {
      src: vineyardImage,
      alt: "High-altitude vineyards in the Fenouillèdes with mountain backdrop",
      caption: "Terroir of granite and schist"
    },
    {
      src: etiquettesImage,
      alt: "Le Soula wine labels featuring the golden bee logo and Terroir d'Altitude branding",
      caption: "Restored cellar in Prugnanes"
    },
    {
      src: wendyImage,
      alt: "Wendy Wilson, Le Soula's winemaker, with Le Soula wines at the winery",
      caption: "Today's living ecosystem"
    }
  ];

  return (
    <section id="story" className="py-32 border-t border-stone-200/50">
      <div ref={ref} className="reveal">
        {/* Title Section */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-gradient">
            {t('story.title')}
          </h2>
        </div>
        
        {/* Initial Content Grid */}
        <div className="grid items-center gap-20 lg:grid-cols-2 mb-16">
          <div className="order-2 lg:order-1">
            <div className="space-y-8 text-lg text-stone-600 font-light leading-relaxed">
              <p>{t('story.p1')}</p>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-honey-600 hover:text-honey-700 transition-all duration-300 group/link"
            >
              <span className="tracking-wide">
                {isExpanded ? t('story.collapseButton') : t('story.expandButton')}
              </span>
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : 'group-hover/link:translate-x-1'
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
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
              <img
                src={storyImages[0].src}
                alt={storyImages[0].alt}
                className="w-full rounded-3xl luxury-shadow transition-transform duration-700 group-hover:scale-[1.01]"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-honey-500/5 via-transparent to-honey-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-2xl p-3 text-white text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {storyImages[0].caption}
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        <div className={`transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-none opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          {isExpanded && (
            <div className="space-y-20">
              {/* Story Paragraph 2 with Image */}
              <div className="grid items-center gap-20 lg:grid-cols-2">
                <div className="order-1 lg:order-1">
                  <div className="text-lg text-stone-600 font-light leading-relaxed">
                    <p>{t('story.p2')}</p>
                  </div>
                </div>
                <div className="order-2 lg:order-2">
                  <div className="relative group">
                    <img
                      src={storyImages[1].src}
                      alt={storyImages[1].alt}
                      className="w-full rounded-3xl luxury-shadow transition-transform duration-700 group-hover:scale-[1.01]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-honey-500/5 via-transparent to-honey-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-2xl p-3 text-white text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {storyImages[1].caption}
                    </div>
                  </div>
                </div>
              </div>

              {/* Story Paragraph 3 with Image */}
              <div className="grid items-center gap-20 lg:grid-cols-2">
                <div className="order-2 lg:order-1">
                  <div className="text-lg text-stone-600 font-light leading-relaxed">
                    <p>{t('story.p3')}</p>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="relative group">
                    <img
                      src={storyImages[2].src}
                      alt={storyImages[2].alt}
                      className="w-full rounded-3xl luxury-shadow transition-transform duration-700 group-hover:scale-[1.01]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-honey-500/5 via-transparent to-honey-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-2xl p-3 text-white text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {storyImages[2].caption}
                    </div>
                  </div>
                </div>
              </div>

              {/* Story Paragraph 4 with Image */}
              <div className="grid items-center gap-20 lg:grid-cols-2">
                <div className="order-1 lg:order-1">
                  <div className="text-lg text-stone-600 font-light leading-relaxed">
                    <p>{t('story.p4')}</p>
                  </div>
                </div>
                <div className="order-2 lg:order-2">
                  <div className="relative group">
                    <img
                      src={storyImages[3].src}
                      alt={storyImages[3].alt}
                      className="w-full rounded-3xl luxury-shadow transition-transform duration-700 group-hover:scale-[1.01]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-honey-500/5 via-transparent to-honey-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-2xl p-3 text-white text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {storyImages[3].caption}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
