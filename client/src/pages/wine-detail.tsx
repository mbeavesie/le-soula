import { useParams, Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useSeo } from "@/hooks/use-seo";
import { useWine } from "@/hooks/use-cms";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Download, ArrowLeft } from "lucide-react";

function TastingNotesGrid({ notes, lang }: { notes: { sight?: string; nose?: string; palate?: string }; lang: string }) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* Sight */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-honey-100 to-honey-200 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-honey-600 rounded-full"></div>
        </div>
        <h3 className="font-serif text-xl font-medium text-ink mb-3">
          {lang === 'en' ? 'Sight' : 'Vue'}
        </h3>
        <p className="text-stone-600 leading-relaxed font-light">
          {notes.sight}
        </p>
      </div>

      {/* Nose */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-honey-100 to-honey-200 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-honey-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="font-serif text-xl font-medium text-ink mb-3">
          {lang === 'en' ? 'Nose' : 'Nez'}
        </h3>
        <p className="text-stone-600 leading-relaxed font-light">
          {notes.nose}
        </p>
      </div>

      {/* Palate */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-honey-100 to-honey-200 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-honey-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5H9m0-5a1.5 1.5 0 011.5-1.5H12a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5H10.5M9 10V9a1.5 1.5 0 011.5-1.5h1M13 16V6" />
          </svg>
        </div>
        <h3 className="font-serif text-xl font-medium text-ink mb-3">
          {lang === 'en' ? 'Palate' : 'Bouche'}
        </h3>
        <p className="text-stone-600 leading-relaxed font-light">
          {notes.palate}
        </p>
      </div>
    </div>
  );
}

export default function WineDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { currentLanguage, t } = useLanguage();
  const { ref: headerRef } = useScrollReveal<HTMLDivElement>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: wine, isLoading } = useWine(slug);
  const wineContent = wine ? wine[currentLanguage as 'en' | 'fr'] : null;

  useSeo({
    title: wineContent
      ? `${wineContent.name} — Le Soula`
      : currentLanguage === 'fr' ? 'Vin introuvable — Le Soula' : 'Wine not found — Le Soula',
    description: wineContent?.note?.slice(0, 200),
    image: wine?.images?.[0],
    url: wine ? `https://www.le-soula.com/wine/${wine.slug}` : 'https://www.le-soula.com/',
    type: 'product',
    locale: currentLanguage === 'fr' ? 'fr_FR' : 'en_US',
  });

  // Position at top and reset carousel when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentImageIndex(0);
    document.documentElement.lang = currentLanguage;
  }, [slug, currentLanguage]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="text-stone-500">Loading…</div>
      </div>
    );
  }

  if (!wine) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-ink">Wine not found</h1>
          <Link href="/" className="mt-4 inline-block text-honey-600 hover:text-honey-700">
            Return home
          </Link>
        </div>
      </div>
    );
  }
  
  const content = wine[currentLanguage as 'en' | 'fr'];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % wine.images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + wine.images.length) % wine.images.length);
  };

  return (
    <div className="min-h-screen bg-paper">
      {/* Navigation Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/"
            className="flex items-center gap-2 text-ink hover:text-honey-600 transition-colors duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Le Soula</span>
          </Link>
          {wine.techRouge ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.open(wine.tech, '_blank')}
                className="flex items-center gap-2 px-4 py-2 bg-honey-600 text-white rounded-full hover:bg-honey-700 transition-all duration-300 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                {currentLanguage === 'en' ? 'Blanc — Tech Sheet' : 'Fiche — Blanc'}
              </button>
              <button
                onClick={() => window.open(wine.techRouge, '_blank')}
                className="flex items-center gap-2 px-4 py-2 bg-ink text-paper rounded-full hover:bg-ink/90 transition-all duration-300 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                {currentLanguage === 'en' ? 'Rouge — Tech Sheet' : 'Fiche — Rouge'}
              </button>
            </div>
          ) : (
            <button
              onClick={() => window.open(wine.tech, '_blank')}
              className="flex items-center gap-2 px-4 py-2 bg-honey-600 text-white rounded-full hover:bg-honey-700 transition-all duration-300 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              {currentLanguage === 'en' ? 'Technical Sheet' : 'Fiche Technique'}
            </button>
          )}
        </div>
      </div>

      {/* Hero Section with Image Carousel */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Carousel */}
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-3xl sophisticated-border luxury-shadow bg-stone-100">
                {wine.images.length > 0 ? (
                  <img
                    src={wine.images[currentImageIndex] || wine.images[0]}
                    alt={`${content.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400 font-light">
                    {content.name}
                  </div>
                )}
                
                {/* Navigation Buttons */}
                {wine.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group"
                    >
                      <ChevronLeft className="w-6 h-6 text-ink group-hover:text-honey-600" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group"
                    >
                      <ChevronRight className="w-6 h-6 text-ink group-hover:text-honey-600" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Image Indicators */}
              {wine.images.length > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                  {wine.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-honey-600 scale-110' 
                          : 'bg-stone-300 hover:bg-stone-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Wine Information */}
            <div ref={headerRef}>
              <div className="mb-8">
                <h1 className="font-serif text-5xl font-light text-ink mb-4 leading-tight">
                  {content.name}
                </h1>
                {content.vintage && (
                  <p className="text-honey-600 font-medium text-lg tracking-widest uppercase mb-4">
                    {content.vintage}
                  </p>
                )}
                <p className="text-xl text-stone-600 leading-relaxed font-light">
                  {content.note}
                </p>
              </div>

              {/* Quote */}
              {content.quote && (
                <div className="bg-gradient-to-br from-stone-50 to-stone-100 rounded-2xl p-8 mb-8">
                  <blockquote className="text-lg font-light italic text-ink leading-relaxed">
                    "{content.quote}"
                  </blockquote>
                  {content.quotesource && (
                    <cite className="text-honey-600 font-medium text-sm tracking-wide mt-3 block not-italic">
                      — {content.quotesource}
                    </cite>
                  )}
                </div>
              )}

              {/* Awards */}
              {content.awards && content.awards.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-serif text-2xl font-light text-ink mb-4">
                    {currentLanguage === 'en' ? 'Awards & Recognition' : 'Distinctions'}
                  </h3>
                  <div className="grid gap-3">
                    {content.awards.map((award: { title: string; year: string; score: string }, index: number) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between bg-white rounded-xl p-4 sophisticated-border"
                      >
                        <div>
                          <p className="font-medium text-ink">{award.title}</p>
                          <p className="text-sm text-stone-600">{award.year}</p>
                        </div>
                        <span className="text-honey-600 font-semibold text-lg">
                          {award.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tasting Notes Section */}
      {content.tastingNotes && (
        <section className="py-16 bg-gradient-to-b from-stone-50/50 to-paper">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-serif text-4xl font-light text-ink text-center mb-12">
              {currentLanguage === 'en' ? 'Tasting Notes' : 'Notes de Dégustation'}
            </h2>

            {content.tastingNotesRouge ? (
              <>
                <h3 className="font-serif text-2xl font-light text-honey-600 text-center mb-10 tracking-wide">
                  {content.name} Blanc
                </h3>
                <TastingNotesGrid notes={content.tastingNotes} lang={currentLanguage} />
                <h3 className="font-serif text-2xl font-light text-honey-600 text-center mt-16 mb-10 tracking-wide">
                  {content.name} Rouge
                </h3>
                <TastingNotesGrid notes={content.tastingNotesRouge} lang={currentLanguage} />
              </>
            ) : (
              <TastingNotesGrid notes={content.tastingNotes} lang={currentLanguage} />
            )}
          </div>
        </section>
      )}
      
      {/* All Vintages — technical sheets */}
      {wine.vintages && wine.vintages.length > 0 && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-serif text-4xl font-light text-ink text-center mb-4">
              {currentLanguage === 'en' ? 'All Vintages' : 'Tous les Millésimes'}
            </h2>
            <p className="text-stone-500 text-center mb-12 font-light">
              {currentLanguage === 'en'
                ? 'Technical sheets for every vintage produced'
                : 'Les fiches techniques de tous les millésimes produits'}
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {wine.vintages.map((v, index) => {
                const preferred = currentLanguage === 'fr'
                  ? (v.techSheetFr || v.techSheetEn)
                  : (v.techSheetEn || v.techSheetFr);
                if (!preferred) return null;
                return (
                  <a
                    key={index}
                    href={preferred}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white rounded-xl px-5 py-4 sophisticated-border hover:border-honey-400 hover:shadow-md transition-all duration-300 group"
                  >
                    <span className="font-medium text-ink">{v.label}</span>
                    <span className="flex items-center gap-2 text-sm text-stone-500 group-hover:text-honey-600 transition-colors">
                      <Download className="w-4 h-4" />
                      PDF
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Back to Wines */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link 
            href="/#wines"
            className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-paper rounded-full hover:bg-ink/90 transition-all duration-300 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            {currentLanguage === 'en' ? 'Explore More Wines' : 'Découvrir Plus de Vins'}
          </Link>
        </div>
      </section>
    </div>
  );
}