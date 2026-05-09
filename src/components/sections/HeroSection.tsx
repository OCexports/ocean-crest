"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
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

interface Stat {
  icon: typeof GlobeIcon;
  label: string;
  description: string;
}

const stats: Stat[] = [
  { icon: GlobeIcon, label: "Global Reach", description: "8 ports · 6 continents" },
  { icon: ShieldCheck, label: "Verified Quality", description: "FSSAI + ISO 22000" },
  { icon: Award, label: "Direct Source", description: "Farm-to-port traceability" },
  { icon: Clock, label: "Timely Delivery", description: "Container & LCL ready" },
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
  const reducedMotion = useReducedMotion();

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
    <section ref={sectionRef} className="relative h-screen min-h-[560px] sm:min-h-[640px] flex flex-col overflow-hidden bg-primary">
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
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[460px] max-h-[460px] rounded-full pointer-events-none lg:left-[72%]"
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
        {isInView && !reducedMotion && <HeroParticles />}
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

      {/* Mobile: 3-row stacked center | lg+: asymmetric 12-col split */}
      <div className="relative z-10 flex-1 min-h-0 grid grid-rows-[auto_minmax(0,1fr)_auto] lg:grid-rows-1 lg:grid-cols-12 gap-2 sm:gap-3 lg:gap-8 xl:gap-12 px-4 sm:px-6 lg:px-10 xl:px-14 pt-16 pb-3 sm:pt-20 sm:pb-4 lg:pt-24 lg:pb-5 max-w-[1500px] mx-auto w-full">
        {/* MOBILE-ONLY: top eyebrow → headline → divider */}
        <div className="lg:hidden flex flex-col items-center text-center">
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
            <span className="block text-[34px] sm:text-5xl font-light text-white leading-[1] tracking-tight">
              {"Ocean Crest".split("").map((c, i) => (
                <motion.span key={i} variants={charVariants} className="inline-block">
                  {c === " " ? " " : c}
                </motion.span>
              ))}
            </span>
            <span className="block text-[34px] sm:text-5xl font-semibold text-white leading-[1] tracking-tight mt-0.5">
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

        {/* DESKTOP-ONLY (lg+): LEFT column — eyebrow / headline / divider / lede / CTAs / stat block */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="self-start mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/25 bg-gold/[0.04]"
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
            <span className="block text-[clamp(48px,5.4vw,72px)] font-light text-white leading-[0.95] tracking-tight">
              {"Ocean Crest".split("").map((c, i) => (
                <motion.span key={i} variants={charVariants} className="inline-block">
                  {c === " " ? " " : c}
                </motion.span>
              ))}
            </span>
            <span className="block text-[clamp(48px,5.4vw,72px)] font-semibold text-white leading-[0.95] tracking-tight mt-1">
              {"Exports".split("").map((c, i) => (
                <motion.span key={i} variants={charVariants} className="inline-block">
                  {c}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="origin-left mt-6 h-px w-24 bg-gradient-to-r from-gold via-gold/60 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.5 }}
            className="mt-6 max-w-md text-base xl:text-lg text-white/70 font-light leading-relaxed"
          >
            Premium Indian{" "}
            <span className="font-medium text-white">commodities</span>, verified
            at source and shipped from Ahmedabad to{" "}
            <span className="font-medium text-white">25+ countries</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="mt-7 flex flex-wrap gap-3"
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
                size="lg"
                className="border-white/15 text-white/80 hover:bg-white/8 hover:text-white"
              >
                {t.hero.cta2}
              </Button>
            </Link>
          </motion.div>

          {/* Stat block — 2x2 grid replacing the orbiting info cards */}
          <motion.dl
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 1.25 } },
            }}
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 max-w-md"
          >
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
                    },
                  }}
                  className="flex items-start gap-2.5"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold/[0.06]">
                    <Icon className="h-3.5 w-3.5 text-gold" strokeWidth={1.8} />
                  </span>
                  <div className="leading-tight">
                    <dt className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/95">
                      {s.label}
                    </dt>
                    <dd className="mt-1 text-[12px] text-white/55 font-light">
                      {s.description}
                    </dd>
                  </div>
                </motion.div>
              );
            })}
          </motion.dl>
        </div>

        {/* RIGHT column on lg+, MIDDLE row on mobile: globe */}
        <div className="relative w-full lg:col-span-7 self-stretch flex items-center justify-center min-h-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.0, ease: [0.16, 1, 0.3, 1] as const }}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
            className="relative aspect-square h-full max-h-full w-full max-w-[640px] lg:max-w-none"
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
          </motion.div>
        </div>

        {/* MOBILE-ONLY: tagline + CTAs */}
        <div className="lg:hidden flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-base sm:text-lg font-light text-white font-[family-name:var(--font-display)] tracking-tight leading-snug"
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
