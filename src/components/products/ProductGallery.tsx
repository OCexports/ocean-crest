"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";

interface ProductGalleryProps {
  images: string[];
  /** Optional video clip — when provided, prepended to the gallery as the first slide. */
  video?: string;
  /** Poster image used for the video thumbnail and as a fallback while the clip loads. */
  videoPoster?: string;
  alt: string;
}

type Slide =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster?: string };

const isLocalImage = (src: string) => src.startsWith("/");

export function ProductGallery({
  images,
  video,
  videoPoster,
  alt,
}: ProductGalleryProps) {
  // Images first so the page opens on the primary product photo (cheap to load);
  // video appended at the end so the heavy MP4 is only fetched when the user
  // explicitly opts in via the thumbnail.
  const slides: Slide[] = [];
  for (const src of images) slides.push({ type: "image", src });
  if (video) slides.push({ type: "video", src: video, poster: videoPoster ?? images[0] });

  const [active, setActive] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // When the active slide is a video, autoplay it; otherwise pause + reset.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const current = slides[active];
    if (current?.type === "video") {
      el.play().catch(() => {});
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [active, slides]);

  // Empty → placeholder.
  if (slides.length === 0) {
    return (
      <div className="sticky top-24">
        <div className="aspect-square rounded-[var(--radius-lg)] overflow-hidden shadow-border relative bg-stone-100">
          <ProductImagePlaceholder />
        </div>
      </div>
    );
  }

  const current = slides[active];

  return (
    <div className="sticky top-24">
      {/* Main slide with hover-zoom for images */}
      <div className="aspect-square rounded-[var(--radius-lg)] overflow-hidden shadow-border relative group bg-stone-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.type}-${active}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            {current.type === "image" ? (
              <Image
                src={current.src}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                unoptimized={!isLocalImage(current.src)}
                priority={active === 0}
              />
            ) : (
              <video
                ref={videoRef}
                src={current.src}
                poster={current.poster}
                muted
                loop
                playsInline
                controls
                preload="none"
                className="absolute inset-0 w-full h-full object-cover bg-black"
              />
            )}
          </motion.div>
        </AnimatePresence>
        {current.type === "image" && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        )}

        {/* Slide counter */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-ink/60 backdrop-blur-sm text-white text-xs font-medium tracking-wider pointer-events-none">
            {active + 1} / {slides.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {slides.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {slides.map((slide, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={
                slide.type === "video"
                  ? "View product video"
                  : `View image ${i + 1}`
              }
              aria-current={i === active}
              className={cn(
                "aspect-square rounded-[var(--radius-sm)] overflow-hidden relative transition-all duration-200 cursor-pointer bg-stone-100",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                i === active
                  ? "ring-2 ring-gold ring-offset-2 ring-offset-stone"
                  : "opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={slide.type === "video" ? slide.poster ?? "" : slide.src}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
                unoptimized={
                  slide.type === "image" && !isLocalImage(slide.src)
                }
              />
              {slide.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <span className="w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow-modal">
                    <Play className="w-3.5 h-3.5 text-primary ml-0.5" fill="currentColor" />
                  </span>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
