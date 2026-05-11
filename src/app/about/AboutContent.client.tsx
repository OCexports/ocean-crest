"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Target, Eye, Heart, ShieldCheck, Users, Sparkles,
  MapPin, FlaskConical, FileCheck, Package, Truck, type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { CTABanner } from "@/components/sections/CTABanner";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const valueIcons: LucideIcon[] = [ShieldCheck, Heart, Sparkles, Users];
const processIcons: LucideIcon[] = [MapPin, FlaskConical, FileCheck, Package, Truck];
const infraImages = [
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80",
  "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&q=80",
  "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=500&q=80",
  "https://images.unsplash.com/photo-1504222490345-c075b6008014?w=500&q=80",
  "https://images.unsplash.com/photo-1553413077-190dd305871c?w=500&q=80",
  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&q=80",
];

export function AboutContent() {
  const { t } = useLanguage();
  const p = t.aboutPage;
  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary py-32 lg:py-40">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        </div>
        <svg className="absolute bottom-0 left-0 w-full h-16 text-stone" viewBox="0 0 1440 64" preserveAspectRatio="none" fill="currentColor">
          <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,48 1440,40 L1440,64 L0,64 Z" />
        </svg>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <nav className="flex items-center gap-2 text-[12px] text-white/75 mb-4">
              <Link href="/" className="hover:text-white transition-colors">{p.breadcrumbHome}</Link>
              <span className="text-white/60">/</span>
              <span className="text-white/80">{p.breadcrumb}</span>
            </nav>
            <span className="text-[12px] lg:text-[11px] font-medium tracking-[0.3em] uppercase text-gold">{p.eyebrow}</span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-5xl font-bold text-white font-[family-name:var(--font-display)]">
              {p.h1Pre}<span className="text-gradient-copper">{p.h1Highlight}</span>
            </h1>
            <div className="gold-line-left mt-6" />
            <p className="mt-6 text-base text-white/80 max-w-2xl leading-relaxed">
              {p.heroIntroPre}<span className="text-white/80 font-medium">{p.heroIntroCompany}</span>{p.heroIntroPost}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* About Us — Long Form */}
      <section className="py-20 lg:py-28 bg-stone">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <span className="text-[12px] lg:text-[11px] font-medium tracking-[0.3em] uppercase text-gold">{p.whoWeAreEyebrow}</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-semibold text-primary font-[family-name:var(--font-display)]">{p.whoWeAreHeading}</h2>
            <div className="gold-line-left mt-4" />
            <div className="mt-8 space-y-5 text-ink-muted leading-relaxed">
              <p>{p.bodyP1Pre}<span className="text-primary font-medium">{p.bodyP1Company}</span>{p.bodyP1Post}</p>
              <p>{p.bodyP2Pre}<span className="text-primary font-medium">{p.bodyP2Highlight}</span>{p.bodyP2Post}</p>
              <p>{p.bodyP3}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal direction="left">
              <div className="bg-white rounded-[var(--radius-lg)] p-8 lg:p-10 shadow-card h-full">
                <div className="w-14 h-14 rounded-[var(--radius-md)] bg-gold/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-gold" />
                </div>
                <h2 className="text-2xl font-semibold text-primary font-[family-name:var(--font-display)]">{p.missionTitle}</h2>
                <p className="mt-4 text-ink-muted leading-relaxed">{p.missionBody}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="bg-white rounded-[var(--radius-lg)] p-8 lg:p-10 shadow-card h-full">
                <div className="w-14 h-14 rounded-[var(--radius-md)] bg-gold/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-gold" />
                </div>
                <h2 className="text-2xl font-semibold text-primary font-[family-name:var(--font-display)]">{p.visionTitle}</h2>
                <p className="mt-4 text-ink-muted leading-relaxed">{p.visionBody}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-stone">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader eyebrow={p.valuesEyebrow} title={p.valuesHeading} subtitle={p.valuesSubtitle} />
          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {p.values.map((v, i) => {
              const Icon = valueIcons[i] ?? ShieldCheck;
              return (
                <StaggerItem key={v.title}>
                  <div className="bg-white rounded-[var(--radius-md)] p-6 shadow-card h-full text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary font-[family-name:var(--font-display)]">{v.title}</h3>
                    <p className="mt-2 text-sm text-ink-muted leading-relaxed">{v.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* Our Process — Detailed */}
      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeader eyebrow={p.processEyebrow} title={p.processHeading} subtitle={p.processSubtitle} />
          <div className="space-y-6">
            {p.processSteps.map((step, i) => {
              const Icon = processIcons[i] ?? MapPin;
              return (
                <ScrollReveal key={step.title} delay={i * 0.08}>
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-white rounded-[var(--radius-md)] p-6 lg:p-8 shadow-card">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary font-[family-name:var(--font-display)]">{step.title}</h3>
                      <p className="mt-2 text-sm text-ink-muted leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-20 lg:py-28 bg-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader eyebrow={p.infraEyebrow} title={p.infraHeading} subtitle={p.infraSubtitle} />
          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {p.infra.map((item, i) => (
              <StaggerItem key={item.title}>
                <div className="group bg-white rounded-[var(--radius-md)] overflow-hidden shadow-card">
                  <div className="h-40 relative overflow-hidden">
                    <Image
                      src={infraImages[i] ?? infraImages[0]}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-primary font-[family-name:var(--font-display)]">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-ink-muted">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
