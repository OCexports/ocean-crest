"use client";

import { useEffect, useRef, useState } from "react";
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

/**
 * CSS-only globe placeholder. Used on mobile (where we never load Three.js)
 * and on desktop until requestIdleCallback fires. Zero JS, zero network —
 * just radial gradients + a dot pattern that reads as a stylized planet.
 */
function StaticGlobePlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center"
    >
      <div
        className="relative aspect-square w-[78%]"
        style={{
          background: [
            "radial-gradient(circle at 36% 32%, rgba(232,193,88,0.32) 0%, rgba(212,175,55,0.16) 28%, rgba(10,30,45,0.0) 60%)",
            "radial-gradient(circle at 50% 50%, #0F2A40 0%, #07182B 65%, #050F1C 100%)",
          ].join(", "),
          borderRadius: "50%",
          boxShadow:
            "inset 0 0 80px rgba(255,255,255,0.04), inset 0 0 160px rgba(212,175,55,0.06), 0 0 60px rgba(212,175,55,0.10)",
        }}
      >
        <div
          className="absolute inset-0 rounded-full opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(232,193,88,0.9) 0.5px, transparent 1.2px)",
            backgroundSize: "10px 10px",
            WebkitMaskImage:
              "radial-gradient(circle, black 55%, transparent 92%)",
            maskImage: "radial-gradient(circle, black 55%, transparent 92%)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "linear-gradient(115deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 35%)",
          }}
        />
      </div>
    </div>
  );
}

function HeroParticles() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="hero-particle absolute rounded-full bg-gold/40 blur-[0.5px]"
          style={
            {
              left: `${p.left}%`,
              bottom: "-10px",
              width: `${p.size}px`,
              height: `${p.size}px`,
              "--drift": `${p.drift}px`,
              "--duration": `${p.duration}s`,
              "--delay": `${p.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

// Per-char stagger delay used by the CSS-driven headline animation.
// Mirrors the previous framer-motion stagger (0.04s step, 0.25s lead).
const charDelay = (i: number) => `${0.25 + i * 0.04}s`;

export function HeroSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  // IntersectionObserver-driven gates — replaces framer-motion useInView.
  const [isInView, setIsInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  // Mount strategy:
  // - Globe3DScene runs everywhere — it's the brand. The scene was tuned
  //   down (named imports, lower segment counts, antialias off on touch,
  //   DPR capped at 1) so it's light enough for mobile.
  // - HeroParticles still desktop-only — 24 infinite CSS loops are still
  //   pure CPU cost without the visual payoff on small screens.
  // - The 3D scene mounts after requestIdleCallback so its chunk loads
  //   AFTER the hero text + CTAs have painted (LCP / TBT win).
  const [isLgUp, setIsLgUp] = useState(false);
  const [globeReady, setGlobeReady] = useState(false);
  useEffect(() => {
    const lgMQ = window.matchMedia("(min-width: 1024px)");
    const motionMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsLgUp(lgMQ.matches);
    setReducedMotion(motionMQ.matches);
    const onLg = (e: MediaQueryListEvent) => setIsLgUp(e.matches);
    const onMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    lgMQ.addEventListener("change", onLg);
    motionMQ.addEventListener("change", onMotion);
    return () => {
      lgMQ.removeEventListener("change", onLg);
      motionMQ.removeEventListener("change", onMotion);
    };
  }, []);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    type IdleWindow = Window &
      typeof globalThis & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };
    const w = window as IdleWindow;
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(() => setGlobeReady(true), { timeout: 2000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setGlobeReady(true), 600);
    return () => window.clearTimeout(t);
  }, []);

  // Outer-tilt parallax — vanilla JS direct style mutation + CSS transition.
  // Replaces framer-motion's useMotionValue/useSpring/useTransform so the
  // hero stops pulling the framer-motion runtime onto the homepage.
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const node = parallaxRef.current;
    if (!node) return;
    const r = node.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = ((e.clientY - r.top) / r.height) * 2 - 1;
    node.style.transform = `perspective(1200px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg)`;
  };

  const onPointerLeave = () => {
    const node = parallaxRef.current;
    if (!node) return;
    node.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
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
        <div
          aria-hidden="true"
          className="hero-aurora-pulse absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[460px] max-h-[460px] rounded-full pointer-events-none lg:left-[72%]"
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
        {/* Particles only render on lg+ — 24 infinite framer-motion animations
            cost too much main-thread time on mid-range mobile CPUs. The CSS
            `hidden lg:block` would only hide them visually; the animation
            loop still runs. We use the matchMedia-driven `isLgUp` flag so
            the components don't mount on mobile at all. */}
        {isInView && !reducedMotion && isLgUp && <HeroParticles />}
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
        {/* MOBILE-ONLY: top eyebrow â†’ headline â†’ divider */}
        <div className="lg:hidden flex flex-col items-center text-center">
          <div
            className="hero-fade-up mb-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/25 bg-gold/[0.04]"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[12px] lg:text-[10px] tracking-[0.3em] uppercase text-gold/90 font-medium">
              {t.hero.eyebrow}
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-display)]">
            <span className="block text-[34px] sm:text-5xl font-light text-white leading-[1] tracking-tight">
              {"Ocean Crest".split("").map((c, i) => (
                <span
                  key={i}
                  className="hero-char-up inline-block"
                  style={{ animationDelay: charDelay(i) }}
                >
                  {c === " " ? " " : c}
                </span>
              ))}
            </span>
            <span className="block text-[34px] sm:text-5xl font-semibold text-white leading-[1] tracking-tight mt-0.5">
              {"Exports".split("").map((c, i) => (
                <span
                  key={i}
                  className="hero-char-up inline-block"
                  style={{ animationDelay: charDelay(i + "Ocean Crest".length) }}
                >
                  {c}
                </span>
              ))}
            </span>
          </h1>

          <div
            className="hero-fade mt-3 sm:mt-4 flex items-center justify-center gap-3"
            style={{ animationDelay: "0.85s", animationDuration: "0.6s" }}
          >
            <span className="block w-12 h-px bg-gradient-to-r from-transparent to-gold/60" />
            <span className="text-gold/80 text-[12px] lg:text-[10px]">◆</span>
            <span className="block w-12 h-px bg-gradient-to-l from-transparent to-gold/60" />
          </div>
        </div>

        {/* DESKTOP-ONLY (lg+): LEFT column — eyebrow / headline / divider / lede / CTAs / stat block */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-center text-left">
          <div
            className="hero-fade-up self-start mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/25 bg-gold/[0.04]"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[12px] lg:text-[10px] tracking-[0.3em] uppercase text-gold/90 font-medium">
              {t.hero.eyebrow}
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-display)]">
            <span className="block text-[clamp(48px,5.4vw,72px)] font-light text-white leading-[0.95] tracking-tight">
              {"Ocean Crest".split("").map((c, i) => (
                <span
                  key={i}
                  className="hero-char-up inline-block"
                  style={{ animationDelay: charDelay(i) }}
                >
                  {c === " " ? " " : c}
                </span>
              ))}
            </span>
            <span className="block text-[clamp(48px,5.4vw,72px)] font-semibold text-white leading-[0.95] tracking-tight mt-1">
              {"Exports".split("").map((c, i) => (
                <span
                  key={i}
                  className="hero-char-up inline-block"
                  style={{ animationDelay: charDelay(i + "Ocean Crest".length) }}
                >
                  {c}
                </span>
              ))}
            </span>
          </h1>

          <div
            className="hero-divider-grow mt-6 h-px w-24 bg-gradient-to-r from-gold via-gold/60 to-transparent"
            style={{ animationDelay: "0.85s" }}
          />

          <p
            className="hero-fade-up mt-6 max-w-md text-base xl:text-lg text-white/70 font-light leading-relaxed"
            style={{ animationDelay: "0.95s" }}
          >
            Premium Indian{" "}
            <span className="font-medium text-white">commodities</span>, verified
            at source and shipped from Ahmedabad to{" "}
            <span className="font-medium text-white">25+ countries</span>.
          </p>

          <div
            className="hero-fade-up mt-7 flex flex-wrap gap-6"
            style={{ animationDelay: "1.1s" }}
          >
            <Link href="/products" className="inline-flex">
              <Button
                size="lg"
                className="px-7 py-3.5 shadow-gold hover:shadow-gold-lg transition-shadow"
              >
                {t.hero.cta1}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/about" className="inline-flex">
              <Button
                variant="outline"
                size="lg"
                className="border-white/15 text-white/80 hover:bg-white/8 hover:text-white"
              >
                {t.hero.cta2}
              </Button>
            </Link>
          </div>

          {/* Stat block — 2x2 grid replacing the orbiting info cards.
              Was a <dl>/<dt>/<dd>: Lighthouse rejects definition lists where
              dt/dd aren't direct children of dl. Plain divs do the same job
              visually and a11y-wise here (these are not glossary entries). */}
          <div
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 max-w-md"
          >
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  role="listitem"
                  className="hero-fade-up flex items-start gap-2.5"
                  style={{ animationDelay: `${1.25 + i * 0.08}s` }}
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold/[0.06]">
                    <Icon className="h-3.5 w-3.5 text-gold" strokeWidth={1.8} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[12px] lg:text-[10px] font-semibold tracking-[0.2em] uppercase text-white/95">
                      {s.label}
                    </p>
                    <p className="mt-1 text-[12px] text-white/75 font-light">
                      {s.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT column on lg+, MIDDLE row on mobile: globe */}
        <div className="relative w-full lg:col-span-7 self-stretch flex items-center justify-center min-h-0">
          <div
            ref={parallaxRef}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            style={{
              transform: "perspective(1200px) rotateX(0deg) rotateY(0deg)",
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              animationDelay: "0.4s",
              animationDuration: "1s",
            }}
            className="hero-fade hero-parallax relative aspect-square h-full max-h-full w-full max-w-[640px] lg:max-w-none"
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
              {globeReady ? <Globe3DScene /> : <StaticGlobePlaceholder />}
            </div>
          </div>
        </div>

        {/* MOBILE-ONLY: tagline + CTAs */}
        <div className="lg:hidden flex flex-col items-center text-center">
          <p
            className="hero-fade-up text-base sm:text-lg font-light text-white font-[family-name:var(--font-display)] tracking-tight leading-snug"
            style={{ animationDelay: "1.2s" }}
          >
            Premium Indian{" "}
            <span className="font-semibold text-gold">Commodities</span>
            ,<br className="sm:hidden" /> Globally Delivered.
          </p>

          <div
            className="hero-fade-up mt-3 sm:mt-4 flex flex-wrap gap-4 sm:gap-6 justify-center items-center"
            style={{ animationDelay: "1.3s" }}
          >
            <Link href="/products" className="inline-flex">
              <Button
                size="lg"
                className="px-7 py-3.5 shadow-gold hover:shadow-gold-lg transition-shadow"
              >
                {t.hero.cta1}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/about" className="inline-flex">
              <Button
                variant="outline"
                size="sm"
                className="border-white/15 text-white/80 hover:bg-white/8 hover:text-white"
              >
                {t.hero.cta2}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Capability ticker — only animates when hero is in view */}
      <div className="relative z-10 py-2.5 sm:py-3 overflow-hidden bg-primary">
        {isInView && (
          <div className="animate-marquee flex whitespace-nowrap">
            {[...capabilities, ...capabilities, ...capabilities, ...capabilities].map(
              (name, i) => (
                <span key={i} className="flex items-center mx-6 sm:mx-8">
                  <span className="text-[12px] sm:text-[11px] lg:text-[9.5px] tracking-[0.2em] uppercase text-white/70 font-medium">
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
      <div
        className="hero-fade absolute bottom-14 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 pointer-events-none"
        style={{ animationDelay: "1.6s", animationDuration: "0.6s" }}
        aria-hidden="true"
      >
        <span className="hero-scroll-cue">
          <ChevronDown className="w-4 h-4 text-gold/80" strokeWidth={1.5} />
        </span>
        <span className="w-1 h-1 rounded-full bg-gold/40" />
      </div>

    </section>
  );
}
