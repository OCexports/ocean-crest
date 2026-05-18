"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const LenisContext = createContext<Lenis | null>(null);

/** Access the live Lenis instance (null when reduced-motion or before mount). */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

/**
 * Programmatically scroll to the top. Uses Lenis when available so it
 * blends with the user's wheel-driven scroll easing; falls back to a
 * native instant jump for reduced-motion users (who *want* it instant)
 * and during the brief window before Lenis mounts.
 */
export function useScrollToTop() {
  const lenis = useLenis();
  return () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  };
}

interface Props {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: Props) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Respect reduced-motion: skip Lenis entirely so the browser's native
    // (snappy) scrolling stays in effect — Lenis adds easing that
    // motion-sensitive users would experience as latency, not polish.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const instance = new Lenis({
      // lerp mode (continuous interpolation toward the target) reads as
      // more fluid/"premium" than fixed-duration easing. ~0.08 = smooth
      // but still responsive; lower = floatier, higher = snappier.
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      // Leave touch scrolling native — iOS momentum scroll is already
      // smooth and syncTouch can feel laggy on some devices.
      touchMultiplier: 1.6,
    });

    const raf = (time: number) => {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    const start = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(raf);
      }
    };
    const stop = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    // Pause the rAF loop when the tab is backgrounded. Without this, Lenis
    // keeps scheduling frames at the browser's throttled cadence (~1/s),
    // preventing the page from being suspended — a measurable battery hit
    // on mobile.
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);
    setLenis(instance);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
