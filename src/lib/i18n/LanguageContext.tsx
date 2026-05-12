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
import {
  en,
  loadLocale,
  isLocale,
  type Locale,
  type Translations,
} from "./translations";

const RTL_LOCALES: Locale[] = ["ar", "ur"];
const STORAGE_KEY = "ocean-crest-locale";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: en,
  dir: "ltr",
});

function applyDocAttrs(locale: Locale) {
  document.documentElement.lang = locale;
  document.documentElement.dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  // `t` lags `locale` by one async tick on switch — we keep showing the
  // previous dictionary until the new one resolves (no flash of keys).
  const [t, setT] = useState<Translations>(en);

  // On mount, restore the stored locale (if any) and lazy-load its dictionary.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!isLocale(stored) || stored === "en") return;
    applyDocAttrs(stored);
    let cancelled = false;
    loadLocale(stored)
      .then((dict) => {
        if (cancelled) return;
        setLocaleState(stored);
        setT(dict);
      })
      .catch((e) => {
        console.error("[i18n] failed to load locale", stored, e);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setLocale = useCallback((next: Locale) => {
    applyDocAttrs(next);
    localStorage.setItem(STORAGE_KEY, next);
    if (next === "en") {
      setLocaleState("en");
      setT(en);
      return;
    }
    loadLocale(next)
      .then((dict) => {
        setLocaleState(next);
        setT(dict);
      })
      .catch((e) => {
        console.error("[i18n] failed to load locale", next, e);
      });
  }, []);

  const value = useMemo<LanguageContextType>(() => {
    const dir: "ltr" | "rtl" = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
    return { locale, setLocale, t, dir };
  }, [locale, setLocale, t]);

  return (
    <LanguageContext.Provider value={value}>
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
