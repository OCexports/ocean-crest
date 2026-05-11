/**
 * i18n entry point.
 *
 * `en` is statically imported (SSR / initial-render fallback). The other 11
 * locale dictionaries are code-split — `loadLocale(locale)` dynamic-imports
 * the active one so a visitor only ever downloads the language they use.
 *
 * ⚠️ Non-English strings are AI-generated — review with native speakers before
 * production. Product names + spec-table values (src/lib/constants/products.ts)
 * intentionally stay English (B2B-catalogue convention).
 */
import en, { type Translations } from "./locales/en";

export { en };
export type { Translations };

export type Locale = "en" | "hi" | "ar" | "ur" | "fr" | "de" | "es" | "ru" | "zh" | "it" | "ko" | "ja";

export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  ar: "العربية",
  ur: "اردو",
  fr: "Français",
  de: "Deutsch",
  es: "Español",
  ru: "Русский",
  zh: "中文",
  it: "Italiano",
  ko: "한국어",
  ja: "日本語",
};

const loaders: Record<Locale, () => Promise<Translations>> = {
  en: () => Promise.resolve(en),
  hi: () => import("./locales/hi").then((m) => m.default),
  ar: () => import("./locales/ar").then((m) => m.default),
  ur: () => import("./locales/ur").then((m) => m.default),
  fr: () => import("./locales/fr").then((m) => m.default),
  de: () => import("./locales/de").then((m) => m.default),
  es: () => import("./locales/es").then((m) => m.default),
  ru: () => import("./locales/ru").then((m) => m.default),
  zh: () => import("./locales/zh").then((m) => m.default),
  it: () => import("./locales/it").then((m) => m.default),
  ko: () => import("./locales/ko").then((m) => m.default),
  ja: () => import("./locales/ja").then((m) => m.default),
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value != null && value in loaders;
}

/** Lazily load a locale's dictionary. `en` resolves synchronously-ish (already in the bundle). */
export function loadLocale(locale: Locale): Promise<Translations> {
  return loaders[locale]();
}
