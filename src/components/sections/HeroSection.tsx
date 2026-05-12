"use client";

import {
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
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


const statIcons = [
  { icon: GlobeIcon, key: "globalReach" },
  { icon: ShieldCheck, key: "verifiedQuality" },
  { icon: Award, key: "directSource" },
  { icon: Clock, key: "timelyDelivery" },
] as const;

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
  const isInView = useInView(sectionRef, { amount: 0 });
  const reducedMotion = useReducedMotion();
  // Mount strategy:
  // - Globe3DScene runs everywhere now — it's the brand. The scene was
  //   tuned down (named imports, lower segment counts, antialias off on
  //   touch, DPR capped at 1) so it's light enough for mobile.
  // - HeroParticles still desktop-only; 24 framer-motion infinite loops
  //   are pure CPU cost without the visual payoff on small screens.
  // - In both cases we mount after requestIdleCallback so the chunk loads
  //   AFTER the hero text + CTAs have painted (LCP / TBT win).
  const [isLgUp, setIsLgUp] = useState(false);
  const [globeReady, setGlobeReady] = useState(false);
  useEffect(() => {
    const lgMQ = window.matchMedia("(min-width: 1024px)");
    setIsLgUp(lgMQ.matches);
    const onChange = (e: MediaQueryListEvent) => setIsLgUp(e.matches);
    lgMQ.addEventListener("change", onChange);
    return () => lgMQ.removeEventListener("change", onChange);
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
    <section ref={sectionRef} className="relative h-screen lg:min-h-[560px] flex flex-col overflow-hidden bg-primary">
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
          className="hero-aurora-pulse absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[460px] max-h-[460px] rounded-full pointer-events-none lg:left-[72%] [dir=rtl]:lg:left-auto [dir=rtl]:lg:right-[72%] [dir=rtl]:lg:translate-x-1/2"
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
      <div className="relative z-10 flex-1 min-h-0 grid grid-rows-[auto_minmax(0,1fr)_auto] lg:grid-rows-1 lg:grid-cols-12 gap-2 sm:gap-3 lg:gap-8 xl:gap-12 px-4 sm:px-6 lg:px-10 xl:px-14 pt-14 pb-3 sm:pb-4 lg:pt-16 lg:pb-5 max-w-[1500px] mx-auto w-full">
        {/* MOBILE-ONLY: top eyebrow â†’ headline â†’ divider */}
        <div className="lg:hidden flex flex-col items-center text-center">
          <div
            className="hero-fade-up mb-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/25 bg-gold/[0.04] max-w-[calc(100vw-2rem)]"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-[12px] lg:text-[10px] tracking-[0.12em] sm:tracking-[0.2em] uppercase text-gold/90 font-medium leading-snug text-center break-words">
              {t.hero.eyebrow}
            </span>
          </div>

          {/* The brand name is always Latin and rendered char-by-char for the
              entrance animation. The dir="ltr" inline-block wrapper keeps the
              letters in order under dir="rtl" (ar/ur) WITHOUT pinning the h1's
              alignment — so the headline still follows the column's text-align
              (centered here, start-aligned on desktop). */}
          <h1 className="font-[family-name:var(--font-display)]">
            <span className="block text-[28px] sm:text-5xl font-light text-white leading-[1] tracking-tight">
              <span dir="ltr" className="inline-block">
                {"Ocean Crest".split("").map((c, i) => (
                  <span
                    key={i}
                    className="hero-char-up inline-block"
                    style={{ animationDelay: charDelay(i) }}
                  >
                    {c === " " ? String.fromCharCode(160) : c}
                  </span>
                ))}
              </span>
            </span>
            <span className="block text-[28px] sm:text-5xl font-semibold text-white leading-[1] tracking-tight mt-0.5">
              <span dir="ltr" className="inline-block">
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
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-center text-start">
          <div
            className="hero-fade-up self-start mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/25 bg-gold/[0.04]"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[12px] lg:text-[10px] tracking-[0.2em] uppercase text-gold/90 font-medium break-words">
              {t.hero.eyebrow}
            </span>
          </div>

          {/* dir="ltr" inline-block wrappers — see the mobile headline above. */}
          <h1 className="font-[family-name:var(--font-display)]">
            <span className="block text-[clamp(48px,5.4vw,72px)] font-light text-white leading-[0.95] tracking-tight">
              <span dir="ltr" className="inline-block">
                {"Ocean Crest".split("").map((c, i) => (
                  <span
                    key={i}
                    className="hero-char-up inline-block"
                    style={{ animationDelay: charDelay(i) }}
                  >
                    {c === " " ? String.fromCharCode(160) : c}
                  </span>
                ))}
              </span>
            </span>
            <span className="block text-[clamp(48px,5.4vw,72px)] font-semibold text-white leading-[0.95] tracking-tight mt-1">
              <span dir="ltr" className="inline-block">
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
            {t.heroLede}
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
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 max-w-md lg:max-w-lg"
          >
            {statIcons.map(({ icon: Icon, key }, i) => {
              const card = t.heroCards[key];
              return (
                <div
                  key={key}
                  role="listitem"
                  className="hero-fade-up flex items-start gap-2.5"
                  style={{ animationDelay: `${1.25 + i * 0.08}s` }}
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold/[0.06]">
                    <Icon className="h-3.5 w-3.5 text-gold" strokeWidth={1.8} />
                  </span>
                  <div className="leading-tight min-w-0">
                    <p className="text-[12px] lg:text-[10px] font-semibold tracking-[0.2em] uppercase text-white/95">
                      {card.title}
                    </p>
                    <p className="mt-1 text-[12px] text-white/75 font-light break-words">
                      {card.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT column on lg+, MIDDLE row on mobile: globe */}
        <div className="relative w-full lg:col-span-7 self-stretch flex items-center justify-center min-h-0">
          <m.div
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            style={{
              rotateX,
              rotateY,
              transformPerspective: 1200,
              animationDelay: "0.4s",
              animationDuration: "1s",
            }}
            className="hero-fade relative aspect-square h-full max-h-full w-full max-w-[640px] lg:max-w-none"
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
          </m.div>
        </div>

        {/* MOBILE-ONLY: tagline + CTAs */}
        <div className="lg:hidden flex flex-col items-center text-center">
          <p
            className="hero-fade-up text-base sm:text-lg font-light text-white font-[family-name:var(--font-display)] tracking-tight leading-snug"
            style={{ animationDelay: "1.2s" }}
          >
            {t.hero.taglineLead}{" "}
            <span className="font-semibold text-gold">{t.hero.taglineHighlight}</span>
            {", "}<br className="sm:hidden" />{t.hero.taglineEnd}
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
            {[...t.marquee, ...t.marquee, ...t.marquee, ...t.marquee].map(
              (name, i) => (
                <span key={i} className="flex items-center mx-4 sm:mx-8">
                  <span className="text-[11px] lg:text-[9.5px] tracking-[0.2em] uppercase text-white/70 font-medium">
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
