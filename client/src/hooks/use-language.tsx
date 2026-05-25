import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations as fallbackTranslations } from "../data/translations";
import { useTranslations } from "@/hooks/use-cms";

type Language = 'en' | 'fr';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const { data: cmsTranslations } = useTranslations();

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    const browserLang = navigator.language.startsWith('fr') ? 'fr' : 'en';
    const initialLang = savedLang || browserLang;
    setCurrentLanguage(initialLang);
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    const source = cmsTranslations || fallbackTranslations;
    const keys = key.split('.');
    let value: any = (source as any)[currentLanguage];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
