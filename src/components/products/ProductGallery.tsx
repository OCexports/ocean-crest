"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

const isLocalImage = (src: string) => src.startsWith("/");

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  // Empty array → placeholder (photography coming soon).
  if (images.length === 0) {
    return (
      <div className="sticky top-24">
        <div className="aspect-square rounded-[var(--radius-lg)] overflow-hidden shadow-border relative bg-stone-100">
          <ProductImagePlaceholder />
        </div>
      </div>
    );
  }

  const current = images[active];

  return (
    <div className="sticky top-24">
      {/* Main image with hover-zoom */}
      <div className="aspect-square rounded-[var(--radius-lg)] overflow-hidden shadow-border relative group bg-stone-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={current}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              unoptimized={!isLocalImage(current)}
              priority={active === 0}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-ink/60 backdrop-blur-sm text-white text-xs font-medium tracking-wider">
            {active + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "aspect-square rounded-[var(--radius-sm)] overflow-hidden relative transition-all duration-200 cursor-pointer",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                i === active
                  ? "ring-2 ring-gold ring-offset-2 ring-offset-stone"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
                unoptimized={!isLocalImage(src)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
