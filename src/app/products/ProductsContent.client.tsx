"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CTABanner } from "@/components/sections/CTABanner";
import { ProductsSection } from "@/components/products/ProductsSection";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function ProductsContent() {
  const { t } = useLanguage();
  const p = t.productsPage;
  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary py-32 lg:py-40">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full h-16 text-stone"
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,48 1440,40 L1440,64 L0,64 Z" />
        </svg>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <nav className="flex items-center gap-2 text-[12px] text-white/75 mb-4">
              <Link href="/" className="hover:text-white transition-colors">{p.breadcrumbHome}</Link>
              <span className="text-white/60">/</span>
              <span className="text-white/80">{p.breadcrumb}</span>
            </nav>
            <span className="text-[12px] lg:text-[11px] font-medium tracking-[0.3em] uppercase text-gold">
              {p.eyebrow}
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-5xl font-bold text-white font-[family-name:var(--font-display)]">
              {p.h1Pre}<span className="text-gold">{p.h1Highlight}</span>{p.h1Post}
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl">{p.intro}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-stone">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ProductsSection />
        </div>
      </section>

      <CTABanner
        eyebrow="Request a quote"
        heading1="Tell us your volume,"
        heading2="we'll send our price list."
        intro="Share quantity, target moisture / mesh, and destination port — you'll get our latest indicative pricing and lead times in under 24 hours."
      />
    </>
  );
}
