"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Globe, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { localeNames, type Locale } from "@/lib/i18n/translations";

interface Props {
  isScrolled?: boolean;
}

export function LanguageSwitcher({ isScrolled = false }: Props) {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const locales = Object.keys(localeNames) as Locale[];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1.5 min-h-11 px-3 py-2.5 text-[12px] lg:text-[11px] font-medium tracking-[0.1em] uppercase transition-colors cursor-pointer rounded-full",
          isScrolled
            ? "text-ink-muted hover:text-primary hover:bg-stone-100"
            : "text-white/80 hover:text-white hover:bg-white/10"
        )}
        aria-label={`${locale.toUpperCase()} — ${t.overlays.langSwitchAria}`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{locale.toUpperCase()}</span>
        <ChevronDown
          className={cn(
            "w-3 h-3 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-full right-0 mt-2 w-48 max-w-[calc(100vw-1rem)] bg-white rounded-[var(--radius-md)] shadow-modal overflow-hidden border border-edge-light z-50"
          >
            <div
              className="p-1.5 max-h-[400px] overflow-y-auto overscroll-contain"
              data-lenis-prevent
            >
              {locales.map((lng) => (
                <button
                  key={lng}
                  onClick={() => {
                    setLocale(lng);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-[13px] rounded-lg transition-all cursor-pointer",
                    locale === lng
                      ? "bg-gold/10 text-gold font-medium"
                      : "text-ink-muted hover:bg-stone-100 hover:text-primary"
                  )}
                >
                  <span>{localeNames[lng]}</span>
                  {locale === lng && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
            <div className="h-[2px] bg-gradient-to-r from-gold via-gold/50 to-transparent" />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
