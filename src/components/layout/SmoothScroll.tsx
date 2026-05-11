"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export function SmoothScroll() {
  useEffect(() => {
    // Respect reduced-motion: skip Lenis entirely so the browser's native
    // (snappy) scrolling stays in effect — Lenis adds 1.1s ease that
    // motion-sensitive users would experience as latency, not polish.
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
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

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
