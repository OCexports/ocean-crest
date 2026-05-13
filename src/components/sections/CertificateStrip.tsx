"use client";

import {
  ArrowUpRight,
  Leaf,
  Globe,
  ShieldCheck,
  Plane,
  Flame,
  Landmark,
  Moon,
  Factory,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { certificates } from "@/lib/constants/certificates";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type CertVisual = {
  icon: LucideIcon;
  accent: string;   // tailwind text + bg classes (text-X bg-X/10 group-hover:bg-X/20)
  mono: string;     // 3-4 char mono mark shown beside the icon
};

const visualById: Record<string, CertVisual> = {
  "fssai":       { icon: Leaf,        accent: "text-emerald-600 bg-emerald-500/10 group-hover:bg-emerald-500/20", mono: "FSS" },
  "iso-22000":   { icon: Globe,       accent: "text-sky-700     bg-sky-500/10     group-hover:bg-sky-500/20",     mono: "ISO" },
  "haccp":       { icon: ShieldCheck, accent: "text-red-600     bg-red-500/10     group-hover:bg-red-500/20",     mono: "HCP" },
  "apeda":       { icon: Plane,       accent: "text-teal-700    bg-teal-500/10    group-hover:bg-teal-500/20",    mono: "APE" },
  "spice-board": { icon: Flame,       accent: "text-orange-600  bg-orange-500/10  group-hover:bg-orange-500/20",  mono: "SPI" },
  "fda":         { icon: Landmark,    accent: "text-blue-800    bg-blue-500/10    group-hover:bg-blue-500/20",    mono: "FDA" },
  "halal":       { icon: Moon,        accent: "text-green-700   bg-green-500/10   group-hover:bg-green-500/20",   mono: "HAL" },
  "gmp":         { icon: Factory,     accent: "text-purple-700  bg-purple-500/10  group-hover:bg-purple-500/20",  mono: "GMP" },
  "organic":     { icon: Sprout,      accent: "text-lime-700    bg-lime-500/10    group-hover:bg-lime-500/20",    mono: "ORG" },
};

const fallback: CertVisual = {
  icon: ShieldCheck,
  accent: "text-gold bg-gold/10 group-hover:bg-gold/20",
  mono: "CRT",
};

export function CertificateStrip() {
  const { t } = useLanguage();
  return (
    <section className="py-28 lg:py-36 bg-stone-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <span className="text-[12px] lg:text-[11px] font-medium tracking-[0.3em] uppercase text-gold-deep">
                {t.certStrip.eyebrow}
              </span>
              <h2 className="mt-2 text-3xl lg:text-4xl font-semibold text-primary font-[family-name:var(--font-display)]">
                {t.certStrip.heading}
              </h2>
              <div className="gold-line-left mt-4" />
            </div>
            <Link
              href="/certificates"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-muted transition-colors cursor-pointer"
            >
              {t.certStrip.viewAll} <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        <StaggerChildren
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-5"
          staggerDelay={0.05}
        >
          {certificates.map((cert) => {
            const v = visualById[cert.id] ?? fallback;
            const Icon = v.icon;
            const cd = t.certData[cert.id];
            return (
              <StaggerItem key={cert.id}>
                <div className="group h-full flex flex-col items-center justify-center bg-warm-white rounded-[var(--radius-md)] p-5 lg:p-6 shadow-border hover:shadow-card-hover transition-all duration-200 text-center cursor-default border border-edge-light hover:border-gold/30">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-3 transition-colors shrink-0 ${v.accent}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className={`text-[12px] lg:text-[9px] font-bold tracking-[0.25em] uppercase mb-1.5 ${v.accent.split(" ")[0]}`}>
                    {v.mono}
                  </span>
                  <h3 className="text-[13px] font-semibold text-primary font-[family-name:var(--font-display)] leading-tight">
                    {cd?.name ?? cert.name}
                  </h3>
                  <p className="mt-1 text-[12px] lg:text-[10px] text-ink-muted leading-tight">
                    {cd?.issuingBody ?? cert.issuingBody}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
