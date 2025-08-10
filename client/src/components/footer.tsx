import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/use-language";

export default function Footer() {
  const { t } = useLanguage();
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-32 border-t border-stone-200/50 py-16 text-stone-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-sm font-light tracking-wide">
            &copy; {currentYear} Le Soula. Crafted with care in the Fenouillèdes.
          </span>
          <a
            href="#top"
            className="group text-sm font-medium text-stone-500 hover:text-honey-600 transition-all duration-300 inline-flex items-center gap-2"
          >
            <span className="tracking-wide">{t('footer.back')}</span>
            <svg className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
