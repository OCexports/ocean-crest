"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { categories, getProductsByCategory } from "@/lib/constants/products";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";
import { HoverVideoMedia } from "./HoverVideoMedia";

export function ProductsSection() {
  const [active, setActive] = useState("all");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const filtered = getProductsByCategory(active);

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActive(cat.slug)}
            className={cn(
              "px-5 py-2.5 text-sm font-medium rounded-full border transition-all duration-200 cursor-pointer",
              active === cat.slug
                ? "bg-primary text-white border-primary shadow-md"
                : "bg-white text-ink-muted border-edge hover:border-gold hover:text-gold"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product Grid with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Link
                href={`/products/${product.slug}`}
                className="group block h-full"
                onMouseEnter={() => setHoveredSlug(product.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
              >
                <Card className="h-full">
                  <div className="aspect-[4/3] relative overflow-hidden bg-stone-100">
                    {product.hasPhotography ? (
                      <>
                        <HoverVideoMedia
                          src={product.image}
                          video={product.video}
                          alt={product.name}
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          isHovered={hoveredSlug === product.slug}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-colors duration-300 pointer-events-none" />
                      </>
                    ) : (
                      <ProductImagePlaceholder />
                    )}
                    {product.meshBadge && (
                      <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-semibold tracking-[0.15em] uppercase text-primary shadow-border">
                        {product.meshBadge}
                      </span>
                    )}
                    {product.video && (
                      <span
                        className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-ink/70 backdrop-blur-sm text-[9px] font-semibold tracking-[0.15em] uppercase text-white"
                        aria-hidden="true"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                        Video
                      </span>
                    )}
                  </div>
                  <CardContent>
                    <Badge variant="gold" className="mb-2">
                      {product.category}
                    </Badge>
                    <h3 className="text-lg font-semibold text-primary font-[family-name:var(--font-display)] group-hover:text-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-ink-muted line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-gold group-hover:gap-2 transition-all">
                      View Details{" "}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-ink-muted text-lg">
            No products found in this category.
          </p>
        </div>
      )}
    </>
  );
}
