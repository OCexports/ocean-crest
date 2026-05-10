"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { translations, type Locale } from "./translations";

const RTL_LOCALES: Locale[] = ["ar", "ur"];

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: translations.en,
  dir: "ltr",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem("ocean-crest-locale") as Locale | null;
    if (stored && translations[stored]) {
      setLocaleState(stored);
      document.documentElement.lang = stored;
      document.documentElement.dir = RTL_LOCALES.includes(stored) ? "rtl" : "ltr";
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = RTL_LOCALES.includes(newLocale) ? "rtl" : "ltr";
    localStorage.setItem("ocean-crest-locale", newLocale);
  }, []);

  const value = useMemo(() => {
    const t = translations[locale] || translations.en;
    const dir: "ltr" | "rtl" = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
    return { locale, setLocale, t, dir };
  }, [locale, setLocale]);

  return (
    <LanguageContext.Provider value={value}>
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
