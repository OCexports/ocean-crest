"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowRight,
  Globe as GlobeIcon,
  ShieldCheck,
  Award,
  Clock,
  Plane,
  Ship,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const Globe3DScene = dynamic(() => import("./Globe3DScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
    </div>
  ),
});

const capabilities = [
  "Verified Supply",
  "Lab-Tested Quality",
  "Direct Sourcing",
  "Custom Compliance",
  "Export-Grade Packaging",
  "Global Distribution",
];

interface InfoCard {
  icon: typeof GlobeIcon;
  label: string;
  description: string;
  /** Anchor class — corner of the globe area (lg+ only). */
  anchor: string;
  /** Entrance delay, seconds. */
  delay: number;
}

// Honest copy for a new brand — no fabricated counts.
const infoCards: InfoCard[] = [
  {
    icon: GlobeIcon,
    label: "Global Reach",
    description: "Delivering worldwide",
    anchor: "top-2 left-0 xl:left-4",
    delay: 1.0,
  },
  {
    icon: ShieldCheck,
    label: "Verified Quality",
    description: "Lab-tested & assured",
    anchor: "top-2 right-0 xl:right-4",
    delay: 1.15,
  },
  {
    icon: Award,
    label: "Trust & Compliance",
    description: "Ethical. Transparent. Reliable.",
    anchor: "bottom-2 left-0 xl:left-4",
    delay: 1.3,
  },
  {
    icon: Clock,
    label: "Timely Delivery",
    description: "On-time. Every time.",
    anchor: "bottom-2 right-0 xl:right-4",
    delay: 1.45,
  },
];

interface FloatingIcon {
  Icon: typeof Plane;
  anchor: string;
  size: number;
  delay: number;
}

const floatingIcons: FloatingIcon[] = [
  { Icon: Plane, anchor: "top-[18%] left-[14%] -rotate-[20deg]", size: 34, delay: 0 },
  { Icon: Plane, anchor: "top-[20%] right-[15%] rotate-[20deg]", size: 34, delay: 1.5 },
  { Icon: Ship, anchor: "bottom-[28%] left-[18%]", size: 32, delay: 0.8 },
  { Icon: Ship, anchor: "bottom-[18%] left-[42%]", size: 32, delay: 2 },
  { Icon: Ship, anchor: "bottom-[26%] right-[18%]", size: 32, delay: 1.2 },
];

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen min-h-[640px] flex flex-col overflow-hidden bg-primary">
      {/* Layered backdrop — deep navy radial gradient + faint grid + central gold glow */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, var(--color-primary-light) 0%, var(--color-primary) 55%, var(--color-primary-deep) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-gold/[0.06] blur-3xl pointer-events-none" />
      </div>

      {/*
        3-row grid: header / globe (1fr) / footer.
        minmax(0, 1fr) lets the middle row shrink below intrinsic content size,
        so the aspect-square globe always honors the row's available height.
      */}
      <div className="relative z-10 flex-1 min-h-0 grid grid-rows-[auto_minmax(0,1fr)_auto] gap-2 sm:gap-3 px-4 sm:px-6 pt-16 pb-3 sm:pt-20 sm:pb-4 lg:pt-24 lg:pb-5">
        {/* Top: headline cluster */}
        <div className="flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="font-[family-name:var(--font-display)]"
          >
            <span className="block text-[34px] sm:text-5xl lg:text-[60px] font-light text-white leading-[1] tracking-tight">
              Ocean Crest
            </span>
            <span className="block text-[34px] sm:text-5xl lg:text-[60px] italic font-light text-gradient-copper leading-[1] tracking-tight mt-0.5">
              Exports
            </span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 sm:mt-3 w-20 sm:w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent origin-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="mt-2 text-[9.5px] sm:text-[11px] font-medium tracking-[0.3em] uppercase text-gold"
          >
            {t.hero.eyebrow}
          </motion.p>
        </div>

        {/*
          Middle: globe occupies the 1fr row.
          The wrapper uses flex+items-center to vertically center the square.
          The square uses aspect-square + max-w-full + max-h-full + h-full so
          the browser fits the largest square that fits in available width OR
          height — whichever is smaller — never overflowing.
        */}
        <div className="relative w-full max-w-[1100px] mx-auto self-stretch flex items-center justify-center min-h-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.0, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative aspect-square h-full max-h-full max-w-full"
          >
            <Globe3DScene />

            {/* Floating wireframe transport icons — lg+ only */}
            <div className="hidden lg:block pointer-events-none absolute inset-0">
              {floatingIcons.map((f, i) => {
                const { Icon } = f;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.9 + i * 0.08, duration: 0.6 }}
                    className={`absolute ${f.anchor}`}
                    style={{ animation: `float 5.5s ease-in-out ${f.delay}s infinite` }}
                  >
                    <Icon
                      className="text-white/55"
                      strokeWidth={1.2}
                      width={f.size}
                      height={f.size}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Floating info cards anchored to the corners of the globe area — lg+ only */}
            <div className="hidden lg:block pointer-events-none absolute -inset-x-12 xl:-inset-x-20 inset-y-0">
              {infoCards.map((card) => {
                const { icon: Icon } = card;
                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: card.delay,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                    className={`absolute ${card.anchor} pointer-events-auto`}
                  >
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-md)] bg-primary/70 border border-gold/25 backdrop-blur-md shadow-card hover:border-gold/50 hover:bg-primary/85 transition-all duration-200">
                      <div className="w-8 h-8 rounded-md bg-gold/12 border border-gold/30 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-gold" strokeWidth={1.6} />
                      </div>
                      <div className="leading-tight">
                        <p className="text-[9.5px] font-semibold tracking-[0.18em] uppercase text-white">
                          {card.label}
                        </p>
                        <p className="mt-0.5 text-[10px] text-white/55 font-light">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom: tagline + CTAs */}
        <div className="flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-base sm:text-lg lg:text-[24px] font-light text-white font-[family-name:var(--font-display)] tracking-tight leading-snug"
          >
            Premium Indian{" "}
            <span className="font-semibold text-gradient-copper">Commodities</span>
            ,<br className="sm:hidden" /> Globally Delivered.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-3 sm:mt-4 flex flex-wrap gap-2.5 sm:gap-3 justify-center"
          >
            <Link href="/products">
              <Button>
                {t.hero.cta1}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                className="border-white/25 text-white hover:bg-white/10 hover:text-white"
              >
                {t.hero.cta2}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Capability ticker */}
      <div className="relative z-10 border-t border-white/10 py-2.5 sm:py-3 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...capabilities, ...capabilities, ...capabilities, ...capabilities].map(
            (name, i) => (
              <span key={i} className="flex items-center mx-6 sm:mx-8">
                <span className="text-[9.5px] sm:text-[11px] tracking-[0.2em] uppercase text-white/40 font-medium">
                  {name}
                </span>
                <span className="ml-6 sm:ml-8 w-1 h-1 rounded-full bg-gold/60" />
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
