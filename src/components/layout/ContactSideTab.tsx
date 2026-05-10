"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Mail } from "lucide-react";

/**
 * Vertical "Get in Touch" tab pinned mid-right on desktop. A persistent
 * inquiry CTA for B2B buyers — sits alongside the WhatsApp FAB but
 * communicates "formal inquiry" rather than "quick chat".
 *
 * Hidden on small screens — mobile already has a bottom WhatsApp FAB and
 * the in-page mobile menu CTA covers the same intent without occupying
 * scarce horizontal space.
 */
export function ContactSideTab() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Slight delay to let the page settle before sliding in.
    const t = setTimeout(() => setIsVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial={{ x: 64, opacity: 0 }}
        animate={isVisible ? { x: 0, opacity: 1 } : { x: 64, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-40"
      >
        <Link
          href="/contact"
          aria-label="Get in touch with Ocean Crest"
          className="group flex flex-col items-center gap-3 bg-gold text-primary px-2 py-4 rounded-l-[var(--radius-sm)] shadow-modal hover:bg-gold-muted transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <Mail className="w-3.5 h-3.5 shrink-0" strokeWidth={2.2} />
          <span
            className="text-[12px] lg:text-[9.5px] font-semibold tracking-[0.2em] uppercase leading-none"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Get in Touch
          </span>
        </Link>
      </m.div>
    </LazyMotion>
  );
}
