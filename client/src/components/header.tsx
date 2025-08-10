import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import logoPath from "@assets/logo_soula_full_1754822132214.png";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentLanguage, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'en' ? 'fr' : 'en');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-6 flex items-center justify-between rounded-3xl sophisticated-border px-8 py-5 luxury-shadow" style={{ opacity: 0.85 }}>
          <a href="#top" className="flex items-center gap-3 group">
            <img src={logoPath} alt="Le Soula" className="h-10 w-auto" />
            <span className="sr-only">Le Soula</span>
          </a>
          
          <nav className="hidden md:block" aria-label="Primary">
            <ul className="flex items-center gap-10 text-sm font-medium tracking-wide">
              <li>
                <a className="text-stone-600 hover:text-honey-600 transition-all duration-300 relative group" href="#wines">
                  {t('nav.wines')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-honey-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a className="text-stone-600 hover:text-honey-600 transition-all duration-300 relative group" href="#story">
                  {t('nav.story')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-honey-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a className="text-stone-600 hover:text-honey-600 transition-all duration-300 relative group" href="#terroir">
                  {t('nav.terroir')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-honey-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a className="text-stone-600 hover:text-honey-600 transition-all duration-300 relative group" href="#journal">
                  {t('nav.journal')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-honey-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a className="text-stone-600 hover:text-honey-600 transition-all duration-300 relative group" href="#visit">
                  {t('nav.visit')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-honey-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            </ul>
          </nav>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="rounded-2xl border border-stone-300/50 px-5 py-2.5 text-xs font-medium tracking-wider text-stone-600 hover:bg-honey-50 hover:border-honey-300 hover:text-honey-700 transition-all duration-300"
              aria-label="Toggle language"
            >
              {currentLanguage.toUpperCase()}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="md:hidden rounded-2xl border border-stone-300/50 px-5 py-2.5 text-xs font-medium tracking-wider text-stone-600 hover:bg-honey-50 transition-all duration-300"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobileNav"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile nav */}
      {isMobileMenuOpen && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:hidden">
          <div className="mt-3 rounded-2xl border border-black/10 bg-white p-6 shadow-glass" style={{ opacity: 0.85 }}>
            <nav className="space-y-4">
              <a
                className="block py-2 font-medium hover:text-honey-600 transition-colors"
                href="#wines"
                onClick={closeMobileMenu}
              >
                {t('nav.wines')}
              </a>
              <a
                className="block py-2 font-medium hover:text-honey-600 transition-colors"
                href="#story"
                onClick={closeMobileMenu}
              >
                {t('nav.story')}
              </a>
              <a
                className="block py-2 font-medium hover:text-honey-600 transition-colors"
                href="#terroir"
                onClick={closeMobileMenu}
              >
                {t('nav.terroir')}
              </a>
              <a
                className="block py-2 font-medium hover:text-honey-600 transition-colors"
                href="#journal"
                onClick={closeMobileMenu}
              >
                {t('nav.journal')}
              </a>
              <a
                className="block py-2 font-medium hover:text-honey-600 transition-colors"
                href="#visit"
                onClick={closeMobileMenu}
              >
                {t('nav.visit')}
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
