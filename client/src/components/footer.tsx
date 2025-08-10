import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/use-language";

export default function Footer() {
  const { t } = useLanguage();
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-24 border-t border-stone-200 py-12 text-stone-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm">
            &copy; {currentYear} Le Soula. Crafted with care in the Fenouillèdes.
          </span>
          <a
            href="#top"
            className="text-sm hover:text-honey-600 transition-colors"
          >
            {t('footer.back')}
          </a>
        </div>
      </div>
    </footer>
  );
}
