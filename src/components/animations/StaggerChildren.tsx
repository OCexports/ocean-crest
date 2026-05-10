"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

/**
 * IntersectionObserver-driven stagger. Replaces the previous framer-motion
 * variant-driven implementation with a pure CSS animation triggered by an
 * `sg-active` class on the container — same look, no framer-motion runtime
 * cost per usage.
 *
 * Each <StaggerItem> child is given a `--sg-i` index, the container holds
 * the `--sg-step` per-item delay, and globals.css has the keyframe.
 */
export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  className,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Inject the per-item index. Non-element children (strings, fragments)
  // pass through unchanged.
  let i = 0;
  const indexed = Children.map(children, (child) => {
    if (
      isValidElement(child) &&
      (child.type as { displayName?: string }).displayName === "StaggerItem"
    ) {
      const next = cloneElement(child as ReactElement<StaggerItemInternalProps>, {
        __index: i,
      });
      i += 1;
      return next;
    }
    return child;
  });

  const style = { "--sg-step": `${staggerDelay}s` } as CSSProperties;

  return (
    <div
      ref={ref}
      style={style}
      className={cn(isVisible && "sg-active", className)}
    >
      {indexed}
    </div>
  );
}

interface StaggerItemInternalProps {
  children: ReactNode;
  className?: string;
  /** Injected by <StaggerChildren> at render time. */
  __index?: number;
}

export function StaggerItem({
  children,
  className,
  __index = 0,
}: StaggerItemInternalProps) {
  const style = { "--sg-i": __index } as CSSProperties;
  return (
    <div className={cn("sg-item", className)} style={style}>
      {children}
    </div>
  );
}
StaggerItem.displayName = "StaggerItem";
