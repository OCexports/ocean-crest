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
   * just the image. On touch devices the prop is ignored and an
   * IntersectionObserver drives playback instead.
   */
  isHovered?: boolean;
}

/**
 * Renders a product still that swaps to a muted, looping clip.
 * Desktop: plays on hover. Touch / no-hover devices: plays when the card is
 * the most-visible item in the viewport (IntersectionObserver, threshold 0.6).
 * Honors prefers-reduced-motion by staying on the still image.
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
  const [isMostlyVisible, setIsMostlyVisible] = useState(false);
  const [canHover, setCanHover] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hoverMQ = window.matchMedia("(hover: hover)");
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

  // Touch / no-hover path: observe viewport visibility and play when most-visible.
  useEffect(() => {
    if (canHover || reducedMotion || !video || !interactive) return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsMostlyVisible(entry.intersectionRatio >= 0.6),
      { threshold: [0, 0.3, 0.6, 0.9] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [canHover, reducedMotion, video, interactive]);

  const isPlaying = (() => {
    if (!video || !interactive || reducedMotion) return false;
    if (canHover) return isHovered !== undefined ? isHovered : internalHover;
    return isMostlyVisible;
  })();

  // Drive the video element off the effective playing state.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !video) return;
    if (isPlaying) {
      el.play().catch(() => {});
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [isPlaying, video]);

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
      {video && !reducedMotion && (
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
