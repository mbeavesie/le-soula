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
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-black/10 bg-white/85 px-6 py-4 glass shadow-glass">
          <a href="#top" className="flex items-center gap-3 group">
            <img src={logoPath} alt="Le Soula" className="h-8 w-auto" />
            <span className="sr-only">Le Soula</span>
          </a>
          
          <nav className="hidden md:block" aria-label="Primary">
            <ul className="flex items-center gap-8 text-sm font-medium">
              <li>
                <a className="hover:text-honey-600 transition-colors" href="#wines">
                  {t('nav.wines')}
                </a>
              </li>
              <li>
                <a className="hover:text-honey-600 transition-colors" href="#story">
                  {t('nav.story')}
                </a>
              </li>
              <li>
                <a className="hover:text-honey-600 transition-colors" href="#terroir">
                  {t('nav.terroir')}
                </a>
              </li>
              <li>
                <a className="hover:text-honey-600 transition-colors" href="#journal">
                  {t('nav.journal')}
                </a>
              </li>
              <li>
                <a className="hover:text-honey-600 transition-colors" href="#visit">
                  {t('nav.visit')}
                </a>
              </li>
            </ul>
          </nav>
          
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="rounded-xl border border-stone-200 px-4 py-2 text-sm font-medium hover:bg-honey-50 hover:border-honey-200 transition-all"
              aria-label="Toggle language"
            >
              {currentLanguage.toUpperCase()}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="md:hidden rounded-xl border border-stone-200 px-4 py-2 text-sm font-medium hover:bg-honey-50 transition-all"
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
          <div className="mt-3 rounded-2xl border border-black/10 bg-white/90 p-6 glass shadow-glass">
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
