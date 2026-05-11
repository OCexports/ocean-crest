"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { m, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X, ChevronDown, Mail, Phone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation, companyInfo } from "@/lib/constants/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Header() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  // Hide header on scroll down, show on scroll up (like Everest)
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 60);

      if (currentY > 110) {
        setIsHidden(currentY > lastScrollY.current && currentY > 300);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  // Esc closes the drawer; focus moves to the close button on open and
  // returns to the hamburger on close — keyboard users should never get lost.
  useEffect(() => {
    if (!isMobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => drawerCloseRef.current?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
      hamburgerRef.current?.focus();
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      <m.header
        animate={{ y: isHidden ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-warm-white/98 backdrop-blur-xl border-b border-edge/40"
            : "bg-gradient-to-b from-black/40 to-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 lg:h-32">
            {/* Logo — text composite (circle + wordmark). Always returns to home;
                scrolls to top if you're already there. */}
            <Link
              href="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Image
                src="/images/brand/OC MONOGRAM.png"
                alt="OC monogram"
                width={120}
                height={120}
                priority
                sizes="(min-width: 1024px) 80px, 56px"
                className="h-14 lg:h-20 w-auto object-contain [filter:drop-shadow(0_0_1px_rgba(212,166,74,1))_drop-shadow(0_0_1px_rgba(212,166,74,1))_drop-shadow(0_0_2px_rgba(212,166,74,0.7))]"
              />
              <span
                className={cn(
                  "text-[13px] lg:text-[16px] font-semibold tracking-[0.1em] uppercase font-[family-name:var(--font-display)] transition-colors duration-300 leading-none whitespace-nowrap",
                  isScrolled ? "text-primary" : "text-white",
                )}
              >
                Ocean Crest Exports
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 lg:gap-8">
              {navigation.map((item) => {
                const hasChildren = "children" in item;
                const isOpen = activeDropdown === item.name;
                return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => hasChildren && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onFocus={() => hasChildren && setActiveDropdown(item.name)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setActiveDropdown(null);
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    aria-haspopup={hasChildren ? "true" : undefined}
                    aria-expanded={hasChildren ? isOpen : undefined}
                    className={cn(
                      "relative py-3 text-[14px] font-semibold tracking-[0.05em] uppercase transition-colors duration-200 cursor-pointer group",
                      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold rounded-sm",
                      isScrolled
                        ? "text-ink-muted hover:text-gold"
                        : "text-white hover:text-gold"
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      {item.name}
                      {hasChildren && <ChevronDown className={cn("w-3 h-3 opacity-50 transition-transform duration-200", isOpen && "rotate-180")} />}
                    </span>
                    {/* Everest-style underline: slides in from left, slides out to right */}
                    <span className="nav-link-underline" />
                  </Link>

                  {hasChildren && (
                    <AnimatePresence>
                      {isOpen && (
                        <m.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                          className="absolute top-full left-0 mt-2 w-60 bg-white rounded-[var(--radius-md)] shadow-lg overflow-hidden border border-edge/50"
                        >
                          <div className="p-1.5">
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className="flex items-center justify-between px-4 py-2.5 text-[13px] text-ink-muted hover:text-primary hover:bg-stone-100 rounded-lg transition-all duration-150 cursor-pointer group/item focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                              >
                                {child.name}
                                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/item:opacity-50 group-hover/item:translate-x-0 transition-all duration-200" />
                              </Link>
                            ))}
                          </div>
                          <div className="h-[2px] bg-gradient-to-r from-gold via-gold/50 to-transparent" />
                        </m.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-2">
              <LanguageSwitcher isScrolled={isScrolled} />
              <Link href="/contact">
                <button className="px-5 py-2.5 bg-gold text-primary text-[12px] lg:text-[11px] font-semibold tracking-[0.15em] uppercase rounded-full hover:bg-gold-muted transition-all duration-200 cursor-pointer hover:shadow-gold">
                  {t.nav.inquiry}
                </button>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              ref={hamburgerRef}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 cursor-pointer"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMobileOpen}
              aria-controls="mobile-drawer"
            >
              <div className="flex flex-col gap-1.5">
                <span className={cn("block w-6 h-[1.5px] transition-colors", isScrolled ? "bg-primary" : "bg-white")} />
                <span className={cn("block w-4 h-[1.5px] transition-colors ml-auto", isScrolled ? "bg-primary" : "bg-white")} />
              </div>
            </button>
          </div>
        </div>
      </m.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsMobileOpen(false)}
            />
            <m.div
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[88%] max-w-sm bg-primary z-50 overflow-y-auto"
            >
              <div className="p-5 sm:p-8">
                {/* Close */}
                <div className="flex items-center justify-between mb-12">
                  <Link
                    href="/"
                    onClick={() => {
                      setIsMobileOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex items-center gap-2.5 cursor-pointer"
                  >
                    <Image
                      src="/images/brand/OC MONOGRAM.png"
                      alt="OC monogram"
                      width={96}
                      height={96}
                      sizes="48px"
                      className="h-12 w-auto object-contain [filter:drop-shadow(0_0_1px_rgba(212,166,74,1))_drop-shadow(0_0_1px_rgba(212,166,74,1))_drop-shadow(0_0_2px_rgba(212,166,74,0.7))]"
                    />
                    <span className="text-sm font-semibold tracking-[0.1em] uppercase font-[family-name:var(--font-display)] text-white leading-none">
                      Ocean Crest Exports
                    </span>
                  </Link>
                  <button
                    ref={drawerCloseRef}
                    onClick={() => setIsMobileOpen(false)}
                    aria-label="Close menu"
                    className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 hover:border-gold/30 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4 text-white/80" />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="space-y-1">
                  {navigation.map((item, i) => (
                    <m.div
                      key={item.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center justify-between px-2 py-4 text-[15px] font-medium text-white/80 hover:text-gold border-b border-white/5 transition-colors cursor-pointer"
                      >
                        {item.name}
                        <ArrowRight className="w-4 h-4 opacity-20" />
                      </Link>
                      {"children" in item && (
                        <div className="pl-4 pb-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={() => setIsMobileOpen(false)}
                              className="block px-2 py-2.5 text-sm text-white/70 hover:text-gold transition-colors cursor-pointer"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </m.div>
                  ))}
                </nav>

                {/* Language Switcher — Mobile */}
                <div className="mt-4 border-t border-white/10 pt-4">
                  <LanguageSwitcher isScrolled={false} />
                </div>

                {/* CTA */}
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="mt-10 space-y-3"
                >
                  <Link href="/contact" onClick={() => setIsMobileOpen(false)}>
                    <button className="w-full py-3.5 bg-gold text-white font-semibold text-sm rounded-full hover:bg-gold-muted transition-colors cursor-pointer">
                      {t.nav.inquiry}
                    </button>
                  </Link>
                  {companyInfo.whatsapp && (
                    <a
                      href={`https://wa.me/${companyInfo.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="w-full mt-2 py-3.5 bg-whatsapp/10 border border-whatsapp/20 text-whatsapp font-semibold text-sm rounded-full hover:bg-whatsapp/20 transition-colors cursor-pointer">
                        {t.headerExtra.whatsappUs}
                      </button>
                    </a>
                  )}
                </m.div>

                {/* Contact info */}
                <div className="mt-10 pt-8 border-t border-white/5 text-sm text-white/60 space-y-3">
                  <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-3 hover:text-gold transition-colors cursor-pointer">
                    <Mail className="w-4 h-4" /> {companyInfo.email}
                  </a>
                  {companyInfo.phone && (
                    <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-3 hover:text-gold transition-colors cursor-pointer">
                      <Phone className="w-4 h-4" /> {companyInfo.phone}
                    </a>
                  )}
                </div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* Scroll Progress Bar — like Everest */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <m.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gold z-[60] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
