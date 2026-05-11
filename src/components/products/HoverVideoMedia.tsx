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
  // Whether the *primary* input is touch. Used to gate IO autoplay so
  // mouse-first devices don't autoplay on scroll. (any-hover) returns
  // true when ANY connected device supports hover — which on Android phones
  // with paired peripherals / DeX / stylus mode falsely flips to true and
  // disables autoplay. (pointer: coarse) describes the primary mechanism
  // and is the correct test for "is this a phone".
  const [isTouchPrimary, setIsTouchPrimary] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const hoverMQ = window.matchMedia("(any-hover: hover)");
    const touchMQ = window.matchMedia("(pointer: coarse)");
    const motionMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    setCanHover(hoverMQ.matches);
    setIsTouchPrimary(touchMQ.matches);
    setReducedMotion(motionMQ.matches);
    const onHoverChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    const onTouchChange = (e: MediaQueryListEvent) => setIsTouchPrimary(e.matches);
    const onMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    hoverMQ.addEventListener("change", onHoverChange);
    touchMQ.addEventListener("change", onTouchChange);
    motionMQ.addEventListener("change", onMotionChange);
    return () => {
      hoverMQ.removeEventListener("change", onHoverChange);
      touchMQ.removeEventListener("change", onTouchChange);
      motionMQ.removeEventListener("change", onMotionChange);
    };
  }, []);

  // IntersectionObserver only attaches on touch-only devices (no hover
  // capability). On desktop / hybrid laptops with a mouse, hover is the sole
  // play trigger — otherwise videos auto-play as the user scrolls past,
  // which surprised real users in production.
  useEffect(() => {
    if (!isTouchPrimary || reducedMotion || !video || !interactive) return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.25);
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-15% 0px -15% 0px",
      },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isTouchPrimary, reducedMotion, video, interactive]);

  // React applies `muted` as a property after mount, not as the DOM attribute —
  // and some mobile Safari builds key autoplay eligibility off the attribute /
  // `defaultMuted`. Set both imperatively so muted-inline autoplay is honored
  // on real devices (works in desktop DevTools emulation regardless).
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
  }, [video]);

  const hoverSignal = isHovered !== undefined ? isHovered : internalHover;
  // Hover is an explicit user action — allow it even with reduced motion.
  // Intersection autoplay is the implicit motion that reduced-motion targets.
  // canHover decides which signal drives playback so desktop never auto-plays
  // while scrolling and touch never sits silent waiting for a hover.
  const isPlaying =
    !!video &&
    interactive &&
    (isTouchPrimary ? !reducedMotion && isVisible : hoverSignal);

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
          preload="auto"
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
