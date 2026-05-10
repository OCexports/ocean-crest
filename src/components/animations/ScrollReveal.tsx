"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

// Same offsets that the framer-motion version used so visual cadence
// across all the existing call sites is identical.
const directionOffset: Record<Direction, { x: string; y: string }> = {
  up:    { x: "0px",  y: "40px" },
  down:  { x: "0px",  y: "-40px" },
  left:  { x: "40px", y: "0px" },
  right: { x: "-40px", y: "0px" },
};

/**
 * IntersectionObserver-driven viewport reveal. Replaces a framer-motion
 * `m.div` with `whileInView`, eliminating the framer-motion runtime cost
 * for every section that animates in on scroll.
 *
 * Output and visual behavior intentionally mirror the previous
 * framer-motion implementation: opacity 0 + offset → opacity 1 + 0 once
 * 20% of the element enters the viewport, with optional delay/duration.
 */
export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Honor reduced motion preference — show immediately, no animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  const offset = directionOffset[direction];
  const style = {
    "--sr-x": offset.x,
    "--sr-y": offset.y,
    "--sr-delay": `${delay}s`,
    "--sr-duration": `${duration}s`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      style={style}
      className={cn(isVisible ? "sr-visible" : "sr-hidden", className)}
    >
      {children}
    </div>
  );
}
