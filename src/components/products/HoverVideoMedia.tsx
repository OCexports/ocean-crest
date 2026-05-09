"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  /** Still image rendered by default. */
  src: string;
  /** Optional video clip. Plays on hover (desktop) or when scrolled into view (touch). */
  video?: string;
  alt: string;
  /** Tailwind sizes attribute passed to the underlying Image. */
  sizes?: string;
  /** When true, hover / playback handlers are wired up. */
  interactive?: boolean;
  /**
   * Externally controlled hover state for hover-capable devices. When provided,
   * the parent owns the play/pause signal — useful when you want the entire
   * card (image + title + description) to act as the hover target instead of
   * just the image.
   */
  isHovered?: boolean;
}

/**
 * Renders a product still that swaps to a muted, looping clip.
 *
 * Triggers (OR'd together):
 *   - Hover (mouse devices). Uses `(any-hover: hover)` so hybrid Windows
 *     touchscreen laptops still recognize the connected mouse — the older
 *     `(hover: hover)` returns false on those even with a mouse plugged in.
 *   - IntersectionObserver: plays when the card sits roughly center-of-viewport.
 *     Always attached so hybrid devices being used in touch mode still see motion
 *     while scrolling.
 *
 * Honors prefers-reduced-motion by leaving the still image up.
 */
export function HoverVideoMedia({
  src,
  video,
  alt,
  sizes,
  interactive = true,
  isHovered,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [internalHover, setInternalHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  // SSR-safe defaults — synced from matchMedia in the effect below.
  // Reading matchMedia in useState's initializer would diverge between
  // server (window undefined → fallback) and client (real value), causing
  // hydration mismatches when those values gate any rendered output.
  const [canHover, setCanHover] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const hoverMQ = window.matchMedia("(any-hover: hover)");
    const motionMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    setCanHover(hoverMQ.matches);
    setReducedMotion(motionMQ.matches);
    const onHoverChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    const onMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    hoverMQ.addEventListener("change", onHoverChange);
    motionMQ.addEventListener("change", onMotionChange);
    return () => {
      hoverMQ.removeEventListener("change", onHoverChange);
      motionMQ.removeEventListener("change", onMotionChange);
    };
  }, []);

  // IntersectionObserver runs on every device; it's a fallback for touch-only
  // and a no-op on desktop unless the card centers in the viewport.
  // Reduced-motion users skip the observer entirely (autoplay is the part of the
  // experience that "reduce motion" is about — explicit hover is still allowed).
  useEffect(() => {
    if (reducedMotion || !video || !interactive) return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.4);
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-15% 0px -15% 0px",
      },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion, video, interactive]);

  const hoverSignal = isHovered !== undefined ? isHovered : internalHover;
  // Hover is an explicit user action — allow it even with reduced motion.
  // Intersection autoplay is the implicit motion that reduced-motion targets.
  const isPlaying = !!video && interactive && (hoverSignal || isVisible);

  // Drive the video element off the effective playing state.
  // If autoplay is rejected (some browsers require a user gesture even for muted),
  // queue a one-shot retry on the next touchstart/scroll.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !video) return;
    if (isPlaying) {
      const promise = el.play();
      if (promise && typeof promise.catch === "function") {
        promise.catch(() => {
          const retry = () => {
            el.play().catch(() => {});
            window.removeEventListener("touchstart", retry);
            window.removeEventListener("scroll", retry);
            window.removeEventListener("pointerdown", retry);
          };
          window.addEventListener("touchstart", retry, { once: true, passive: true });
          window.addEventListener("scroll", retry, { once: true, passive: true });
          window.addEventListener("pointerdown", retry, { once: true, passive: true });
        });
      }
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [isPlaying, video]);

  // Hover handlers are gated on canHover so a synthetic mouseenter from a tap
  // (some touch browsers fire one after a tap) doesn't briefly play the video.
  const onEnter = () => {
    if (!canHover || isHovered !== undefined) return;
    setInternalHover(true);
  };
  const onLeave = () => {
    if (!canHover || isHovered !== undefined) return;
    setInternalHover(false);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={cn(
          "object-cover transition-opacity duration-200",
          isPlaying ? "opacity-0" : "opacity-100",
        )}
      />
      {/* Always render when prop is set — the reducedMotion check used to live
          here too, but reading matchMedia diverges between server and client and
          caused a hydration mismatch that tore down the entire card subtree. */}
      {video && (
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-200 pointer-events-none",
            isPlaying ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </div>
  );
}
