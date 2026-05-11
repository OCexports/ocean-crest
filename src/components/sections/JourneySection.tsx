"use client";

import { MapPin, FlaskConical, FileCheck, Package, Truck } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { JourneyScrollLine } from "./JourneyScrollLine";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const stepIcons = [
  { num: "01", icon: MapPin, key: "sourced" },
  { num: "02", icon: FlaskConical, key: "tested" },
  { num: "03", icon: FileCheck, key: "compliance" },
  { num: "04", icon: Package, key: "packaging" },
  { num: "05", icon: Truck, key: "delivery" },
] as const;

export function JourneySection() {
  const { t } = useLanguage();
  return (
    <section className="py-28 lg:py-36 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16 lg:mb-20">
            <span className="text-[12px] lg:text-[11px] font-medium tracking-[0.3em] uppercase text-gold-deep">
              {t.journey.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl lg:text-5xl font-semibold text-white font-[family-name:var(--font-display)]">
              {t.journey.heading}
            </h2>
            <p className="mt-4 text-sm text-white/70 max-w-xl mx-auto">
              {t.journey.intro}
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          <JourneyScrollLine />

          <StaggerChildren
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4 lg:gap-x-6"
            staggerDelay={0.12}
          >
            {stepIcons.map(({ num, icon: Icon, key }) => {
              const step = t.journey.steps[key];
              return (
                <StaggerItem key={num}>
                  <div className="relative text-center px-2">
                    {/* Icon circle */}
                    <div className="relative z-10 w-[100px] h-[100px] mx-auto rounded-full border border-gold/30 flex items-center justify-center bg-primary">
                      <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gold" />
                      </div>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-white font-[family-name:var(--font-display)]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs text-white/65 leading-relaxed">
                      {step.desc}
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
