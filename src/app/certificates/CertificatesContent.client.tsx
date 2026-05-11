"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { CTABanner } from "@/components/sections/CTABanner";
import { certificates } from "@/lib/constants/certificates";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function CertificatesContent() {
  const { t } = useLanguage();
  const p = t.certificatesPage;
  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary py-32 lg:py-40">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
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
              {p.h1Pre}<span className="text-gold">{p.h1Highlight}</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl">{p.intro}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="py-20 lg:py-28 bg-stone">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader eyebrow={p.certsEyebrow} title={p.certsHeading} subtitle={p.certsSubtitle} />
          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {certificates.map((cert) => {
              const cd = t.certData[cert.id];
              return (
                <StaggerItem key={cert.id}>
                  <div className="group glass-light rounded-[var(--radius-md)] p-6 lg:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full border border-transparent hover:border-gold/30">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-[var(--radius-md)] bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                        <ShieldCheck className="w-7 h-7 text-gold" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary font-[family-name:var(--font-display)]">
                          {cd?.name ?? cert.name}
                        </h3>
                        <p className="mt-1 text-xs text-gold font-medium">{cd?.issuingBody ?? cert.issuingBody}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-ink-muted leading-relaxed">{cd?.description ?? cert.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* Quality Process */}
      <section className="py-20 lg:py-28 bg-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader eyebrow={p.processEyebrow} title={p.processHeading} subtitle={p.processSubtitle} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {p.qualityProcess.map((item, i) => {
              const step = String(i + 1).padStart(2, "0");
              return (
                <ScrollReveal key={step} delay={i * 0.08}>
                  <div className="relative bg-white rounded-[var(--radius-md)] p-6 shadow-card h-full">
                    <span className="text-5xl font-bold text-gold/10 font-[family-name:var(--font-display)] absolute top-4 right-4">
                      {step}
                    </span>
                    <div className="relative z-10">
                      <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-primary text-sm font-bold mb-4">
                        {step}
                      </div>
                      <h3 className="text-lg font-semibold text-primary font-[family-name:var(--font-display)]">{item.title}</h3>
                      <p className="mt-2 text-sm text-ink-muted leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-20 lg:py-28 bg-stone">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <SectionHeader eyebrow={p.promiseEyebrow} title={p.promiseHeading} subtitle={p.promiseSubtitle} />
            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              {p.stats.map((item) => (
                <div key={item.label} className="bg-white rounded-[var(--radius-md)] p-6 shadow-card">
                  <div className="text-3xl font-bold text-primary font-[family-name:var(--font-display)]">{item.value}</div>
                  <div className="mt-1 text-sm text-ink-muted">{item.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
