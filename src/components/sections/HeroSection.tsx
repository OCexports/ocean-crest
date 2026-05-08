"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  ChevronDown,
  Clock,
  Globe as GlobeIcon,
  ShieldCheck,
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
  /** Anchor class — left/right rail of the globe area (lg+ only). */
  anchor: string;
  /** Entrance delay, seconds. */
  delay: number;
  /** When true, card receives stronger emphasis. */
  primary?: boolean;
}

const infoCards: InfoCard[] = [
  {
    icon: GlobeIcon,
    label: "Global Reach",
    description: "8 ports • 6 continents",
    anchor: "top-[8%] left-0",
    delay: 1.0,
  },
  {
    icon: ShieldCheck,
    label: "Verified Quality",
    description: "FSSAI + ISO 22000",
    anchor: "top-[8%] right-0",
    delay: 1.15,
    primary: true,
  },
  {
    icon: Award,
    label: "Trust & Compliance",
    description: "Direct from source",
    anchor: "bottom-[8%] left-0",
    delay: 1.3,
  },
  {
    icon: Clock,
    label: "Timely Delivery",
    description: "Container & LCL ready",
    anchor: "bottom-[8%] right-0",
    delay: 1.45,
  },
];

const PARTICLES = Array.from({ length: 24 }).map((_, i) => {
  const seed = (Math.sin(i * 12.9898) * 43758.5453) % 1;
  const leftRaw = ((seed + 1) % 1) * 100;
  return {
    left: Math.round(leftRaw * 100) / 100,
    size: 1 + ((i * 7) % 3),
    delay: (i % 6) * -3,
    duration: 14 + (i % 5) * 3,
    drift: (i % 2 === 0 ? 1 : -1) * (4 + (i % 3) * 2),
  };
});

function HeroParticles() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gold/40 blur-[0.5px]"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          animate={{
            y: ["0vh", "-110vh"],
            x: [0, p.drift, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

const lineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.25 } },
};

const charVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function HeroSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0 });

  // Outer-tilt parallax for the entire globe composition
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-1, 1], [3, -3]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-3, 3]), {
    stiffness: 100,
    damping: 20,
  });

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[640px] flex flex-col overflow-hidden bg-primary">
      {/* Layered backdrop — base radial gradient + grid + drifting aurora blobs */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, var(--color-primary-light) 0%, var(--color-primary) 55%, var(--color-primary-deep) 100%)",
          }}
        />
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [1, 0.85, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[460px] max-h-[460px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(212,166,74,0.22) 0%, rgba(212,166,74,0.06) 45%, transparent 70%)",
          }}
        />
        {/* Aurora blob 1 — gold (static) */}
        <div
          aria-hidden="true"
          className="absolute top-[20%] left-[20%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-gold/[0.06] blur-2xl pointer-events-none"
        />
        {/* Aurora blob 2 — teal (static) */}
        <div
          aria-hidden="true"
          className="absolute bottom-[10%] right-[15%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-teal/[0.04] blur-2xl pointer-events-none"
        />
        {/* Drifting gold particles — only when hero is in view */}
        {isInView && <HeroParticles />}
        {/* Subtle noise grain overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />
        {/* Vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 65%, rgba(0,0,0,0.18) 100%)",
          }}
        />
      </div>

      {/* 3-row grid: header / globe (1fr) / footer */}
      <div className="relative z-10 flex-1 min-h-0 grid grid-rows-[auto_minmax(0,1fr)_auto] gap-2 sm:gap-3 px-4 sm:px-6 pt-16 pb-3 sm:pt-20 sm:pb-4 lg:pt-24 lg:pb-5">
        {/* Top: eyebrow → headline → divider → trust pills */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/25 bg-gold/[0.04]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-gold/90 font-medium">
              {t.hero.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="font-[family-name:var(--font-display)]"
          >
            <span className="block text-[34px] sm:text-5xl lg:text-[60px] font-light text-white leading-[1] tracking-tight">
              {"Ocean Crest".split("").map((c, i) => (
                <motion.span key={i} variants={charVariants} className="inline-block">
                  {c === " " ? " " : c}
                </motion.span>
              ))}
            </span>
            <span className="block text-[34px] sm:text-5xl lg:text-[60px] font-semibold text-white leading-[1] tracking-tight mt-0.5">
              {"Exports".split("").map((c, i) => (
                <motion.span key={i} variants={charVariants} className="inline-block">
                  {c}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-3 sm:mt-4 flex items-center justify-center gap-3"
          >
            <span className="block w-12 h-px bg-gradient-to-r from-transparent to-gold/60" />
            <span className="text-gold/80 text-[10px]">◆</span>
            <span className="block w-12 h-px bg-gradient-to-l from-transparent to-gold/60" />
          </motion.div>
        </div>

        {/* Middle: globe with mouse-tilt parallax */}
        <div className="relative w-full max-w-[1300px] mx-auto self-stretch flex items-center justify-center min-h-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.0, ease: [0.16, 1, 0.3, 1] as const }}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
            className="relative aspect-square h-full max-h-full max-w-full"
          >
            <div
              className="absolute inset-0"
              style={{
                WebkitMaskImage:
                  "radial-gradient(circle, black 60%, transparent 92%)",
                maskImage:
                  "radial-gradient(circle, black 60%, transparent 92%)",
              }}
            >
              <Globe3DScene />
            </div>

            {/* Floating info cards on left/right rails — lg+ only */}
            <div className="hidden lg:block pointer-events-none absolute -inset-x-24 xl:-inset-x-36 -inset-y-4">
              {infoCards.map((card) => {
                const { icon: Icon } = card;
                const isPrimary = card.primary;
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
                    <div
                      className={`flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] backdrop-blur-sm transition-all duration-200 ${
                        isPrimary
                          ? "bg-primary/85 border border-gold/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-gold/60"
                          : "bg-primary/65 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-white/20"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${isPrimary ? "text-gold" : "text-gold/80"}`}
                        strokeWidth={1.7}
                      />
                      <div className="leading-tight">
                        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white">
                          {card.label}
                        </p>
                        <p className="mt-0.5 text-[12px] text-white/60 font-light">
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
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-base sm:text-lg lg:text-[24px] font-light text-white font-[family-name:var(--font-display)] tracking-tight leading-snug"
          >
            Premium Indian{" "}
            <span className="font-semibold text-gold">Commodities</span>
            ,<br className="sm:hidden" /> Globally Delivered.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="mt-3 sm:mt-4 flex flex-wrap gap-2.5 sm:gap-3 justify-center items-center"
          >
            <Link href="/products">
              <Button
                size="lg"
                className="px-7 py-3.5 shadow-gold hover:shadow-gold-lg transition-shadow"
              >
                {t.hero.cta1}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                size="sm"
                className="border-white/15 text-white/80 hover:bg-white/8 hover:text-white"
              >
                {t.hero.cta2}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Capability ticker — only animates when hero is in view */}
      <div className="relative z-10 py-2.5 sm:py-3 overflow-hidden bg-primary">
        {isInView && (
          <div className="animate-marquee flex whitespace-nowrap">
            {[...capabilities, ...capabilities, ...capabilities, ...capabilities].map(
              (name, i) => (
                <span key={i} className="flex items-center mx-6 sm:mx-8">
                  <span className="text-[9.5px] sm:text-[11px] tracking-[0.2em] uppercase text-white/40 font-medium">
                    {name}
                  </span>
                  <span className="ml-6 sm:ml-8 w-1.5 h-1.5 rounded-full bg-gold/80" />
                </span>
              ),
            )}
          </div>
        )}
      </div>

      {/* Scroll cue — subtle indicator that there's content below */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 4, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-gold/80" strokeWidth={1.5} />
        </motion.div>
        <span className="w-1 h-1 rounded-full bg-gold/40" />
      </motion.div>

    </section>
  );
}
