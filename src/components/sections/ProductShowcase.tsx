"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { HoverVideoMedia } from "@/components/products/HoverVideoMedia";

const featured: {
  name: string;
  slug: string;
  image: string;
  video?: string;
  tag: string;
  moq: string;
  color: string;
  span: string;
  height: string;
}[] = [
  {
    name: "Dehydrated Garlic Flakes",
    slug: "dehydrated-garlic-flakes",
    image: "/images/products/garlic/flakes-1.webp",
    video: "/videos/products/garlic/flakes.mp4",
    tag: "Dehydrated",
    moq: "MOQ 200 KG",
    color: "from-stone-900/40 via-stone-900/10 to-stone-950/80",
    span: "lg:col-span-2 lg:row-span-2",
    height: "h-[340px] lg:h-full",
  },
  {
    name: "Dehydrated Garlic Chopped",
    slug: "dehydrated-garlic-chopped",
    image: "/images/products/garlic/chopped-1.webp",
    video: "/videos/products/garlic/chopped.mp4",
    tag: "Dehydrated",
    moq: "MOQ 200 KG",
    color: "from-stone-900/40 via-stone-900/10 to-stone-950/80",
    span: "",
    height: "h-[260px] lg:h-[260px]",
  },
  {
    name: "Dehydrated Garlic Minced",
    slug: "dehydrated-garlic-minced",
    image: "/images/products/garlic/minced-1.webp",
    video: "/videos/products/garlic/minced.mp4",
    tag: "Dehydrated",
    moq: "MOQ 200 KG",
    color: "from-amber-900/30 via-amber-900/5 to-amber-950/75",
    span: "",
    height: "h-[260px] lg:h-[260px]",
  },
  {
    name: "Dehydrated Garlic Powder",
    slug: "dehydrated-garlic-powder",
    image: "/images/products/garlic/powder-1.webp",
    video: "/videos/products/garlic/powder.mp4",
    tag: "Dehydrated",
    moq: "MOQ 200 KG",
    color: "from-yellow-900/30 via-yellow-900/5 to-yellow-950/75",
    span: "lg:col-span-2",
    height: "h-[260px] lg:h-[260px]",
  },
];

export function ProductShowcase() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  return (
    <section className="py-28 lg:py-36 bg-stone">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <span className="text-[12px] lg:text-[11px] font-medium tracking-[0.3em] uppercase text-gold-deep">
              Products
            </span>
            <h2 className="mt-3 text-3xl lg:text-5xl font-semibold text-primary font-[family-name:var(--font-display)]">
              Our Products
            </h2>
            <div className="gold-line-left mt-4" />
          </div>
          <Link
            href="/products"
            prefetch={false}
            className="mt-4 lg:mt-0 inline-flex items-center gap-2 text-sm font-medium text-gold-deep hover:text-gold transition-colors cursor-pointer"
          >
            View All <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bento grid — 1 hero card + 3 supporting cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-5 lg:gap-6 lg:auto-rows-fr">
          {featured.map((product, i) => (
            <ScrollReveal key={product.slug} delay={i * 0.08} className={product.span}>
              <Link
                href={`/products/${product.slug}`}
                prefetch={false}
                className="group block h-full"
                onMouseEnter={() => setHoveredSlug(product.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
              >
                <div className={`relative ${product.height} rounded-[var(--radius-lg)] overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-shadow duration-300`}>
                  <HoverVideoMedia
                    src={product.image}
                    video={product.video}
                    alt={product.name}
                    // Bento grid lives inside max-w-7xl (≈1216px content width).
                    // Hero card spans 2/4 cols ≈ 600px max; supporting cards
                    // span 1/4 ≈ 290px max. Capping the upper bound stops
                    // next/image from picking the 1080w/1200w variants on
                    // high-DPR desktops where they aren't actually needed.
                    sizes={
                      i === 0
                        ? "(min-width: 1024px) 600px, 100vw"
                        : "(min-width: 1024px) 300px, 50vw"
                    }
                    isHovered={hoveredSlug === product.slug}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${product.color} transition-opacity duration-300 group-hover:opacity-90 pointer-events-none`}
                  />

                  <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                    <span className="text-[12px] lg:text-[9px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 rounded-full bg-gold/90 backdrop-blur-sm text-white border border-gold/30">
                      {product.tag}
                    </span>
                    <span className="text-[12px] lg:text-[9px] tracking-[0.15em] uppercase font-medium px-2.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/15">
                      {product.moq}
                    </span>
                  </div>

                  <div className="absolute top-5 right-5 z-10 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center shadow-gold">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="text-xl lg:text-2xl font-semibold text-white font-[family-name:var(--font-display)]">
                      {product.name}
                    </h3>
                    <span className="inline-block mt-1 text-xs text-white/80 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      View Details â†’
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
