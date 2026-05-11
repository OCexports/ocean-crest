"use client";

import { ShieldCheck, TrendingDown, Truck, MapPin, Headphones } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const featureIcons = [
  { icon: ShieldCheck, key: "verifiedQuality" },
  { icon: TrendingDown, key: "competitivePricing" },
  { icon: Truck, key: "reliableSupply" },
  { icon: MapPin, key: "locallySourced" },
  { icon: Headphones, key: "dedicatedSupport" },
] as const;

export function WhyChooseUs() {
  const { t } = useLanguage();
  return (
    <section className="py-28 lg:py-36 bg-stone">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-20 lg:gap-28 items-start">
          {/* Left: Heading */}
          <ScrollReveal>
            <span className="text-[12px] lg:text-[11px] font-medium tracking-[0.3em] uppercase text-gold-deep">
              {t.whyUs.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl lg:text-[44px] font-semibold text-primary font-[family-name:var(--font-display)] leading-tight">
              {t.whyUs.heading1}
              <br />
              {t.whyUs.heading2}
            </h2>
            <div className="gold-line-left mt-6" />
            <p className="mt-6 text-ink-muted leading-relaxed max-w-md">
              {t.whyUs.intro}
            </p>
          </ScrollReveal>

          {/* Right: Feature grid */}
          <StaggerChildren
            className="grid grid-cols-2 gap-x-8 gap-y-10"
            staggerDelay={0.08}
          >
            {featureIcons.map(({ icon: Icon, key }) => {
              const f = t.whyUs.features[key];
              return (
                <StaggerItem key={key}>
                  <div className="group cursor-default">
                    <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-gold/10 flex items-center justify-center mb-3 group-hover:bg-gold/20 transition-colors">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="text-sm font-semibold text-primary">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink-muted leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
