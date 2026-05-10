import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CTABanner } from "@/components/sections/CTABanner";
import { ProductsSection } from "@/components/products/ProductsSection";

const productsDescription =
  "Browse Ocean Crest's premium dehydrated garlic range — flakes, chopped, minced, granules, and powder — plus Indian spices, grains, seeds, and dehydrated vegetables for global B2B export. FSSAI and APEDA certified.";

export const metadata: Metadata = {
  title: "Products — Dehydrated Garlic & Indian Spices",
  description: productsDescription,
  alternates: { canonical: "/products" },
  openGraph: {
    type: "website",
    title: "Ocean Crest Products — Dehydrated Garlic & Indian Spices",
    description: productsDescription,
    url: "/products",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocean Crest Products — Dehydrated Garlic & Indian Spices",
    description: productsDescription,
  },
};

export default function ProductsPage() {
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
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/60">/</span>
              <span className="text-white/80">Products</span>
            </nav>
            <span className="text-[12px] lg:text-[11px] font-medium tracking-[0.3em] uppercase text-gold">
              Our Products
            </span>
            <h1 className="mt-3 text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-display)]">
              Premium <span className="text-gold">Export-Grade</span> Products
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl">
              Carefully sourced and processed to meet the highest international
              quality standards. Discover our full range of Indian spices,
              grains, and more.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Products — fully client-side filtering */}
      <section className="py-16 lg:py-24 bg-stone">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ProductsSection />
        </div>
      </section>

      <CTABanner />
    </>
  );
}
