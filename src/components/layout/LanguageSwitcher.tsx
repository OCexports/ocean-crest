"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Globe, Check, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { localeNames, type Locale } from "@/lib/i18n/translations";

interface Props {
  isScrolled?: boolean;
}

export function LanguageSwitcher({ isScrolled = false }: Props) {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  // Locale chunks load async; show a spinner on the trigger until the new
  // dictionary resolves (cleared when `locale` from context updates).
  const [pending, setPending] = useState<Locale | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  // Roving focus index for keyboard nav; -1 means trigger has focus.
  const [focusIdx, setFocusIdx] = useState(-1);

  useEffect(() => {
    setPending(null);
  }, [locale]);

  // Safety net: if the locale chunk never resolves (network failure), don't
  // leave the spinner stuck — clear `pending` after a few seconds. Cleared
  // early by the [locale] effect above when the switch actually completes.
  useEffect(() => {
    if (!pending) return;
    const id = setTimeout(() => setPending(null), 8000);
    return () => clearTimeout(id);
  }, [pending]);

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

  const choose = (lng: Locale) => {
    setOpen(false);
    triggerRef.current?.focus();
    if (lng === locale) return;
    setPending(lng);
    setLocale(lng);
  };

  // When the menu opens, focus the active locale so ↑/↓ feel natural.
  useEffect(() => {
    if (!open) {
      setFocusIdx(-1);
      return;
    }
    const idx = locales.indexOf(locale);
    setFocusIdx(idx >= 0 ? idx : 0);
  }, [open, locale, locales]);

  // Move DOM focus to whichever option `focusIdx` points at.
  useEffect(() => {
    if (!open || focusIdx < 0) return;
    const btn = listRef.current?.querySelectorAll<HTMLButtonElement>("button[data-locale]")[focusIdx];
    btn?.focus();
  }, [focusIdx, open]);

  const onListKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusIdx((i) => (i + 1) % locales.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusIdx((i) => (i - 1 + locales.length) % locales.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setFocusIdx(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setFocusIdx(locales.length - 1);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "flex items-center gap-1.5 min-h-11 px-3 py-2.5 text-[12px] lg:text-[11px] font-medium tracking-[0.1em] uppercase transition-all duration-150 cursor-pointer rounded-full active:scale-95",
          isScrolled
            ? "text-ink-muted hover:text-primary hover:bg-stone-100"
            : "text-white/80 hover:text-white hover:bg-white/10"
        )}
        aria-label={`${locale.toUpperCase()} — ${t.overlays.langSwitchAria}`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{(pending ?? locale).toUpperCase()}</span>
        {pending ? (
          <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />
        ) : (
          <ChevronDown
            className={cn(
              "w-3 h-3 transition-transform",
              open && "rotate-180"
            )}
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-full right-0 [dir=rtl]:right-auto [dir=rtl]:left-0 mt-2 w-48 max-w-[calc(100vw-1rem)] bg-white rounded-[var(--radius-md)] shadow-modal overflow-hidden border border-edge-light z-50"
          >
            <div
              ref={listRef}
              role="listbox"
              aria-label={t.overlays.langSwitchAria}
              onKeyDown={onListKeyDown}
              className="p-1.5 max-h-[400px] overflow-y-auto overscroll-contain"
              data-lenis-prevent
            >
              {locales.map((lng) => (
                <button
                  key={lng}
                  data-locale={lng}
                  role="option"
                  aria-selected={locale === lng}
                  onClick={() => choose(lng)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-[13px] rounded-lg transition-all cursor-pointer focus:outline-none focus:bg-stone-100 focus:text-primary",
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
