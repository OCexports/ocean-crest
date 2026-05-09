import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, CheckCircle, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { CTABanner } from "@/components/sections/CTABanner";
import { certificates } from "@/lib/constants/certificates";

const certificatesDescription =
  "Ocean Crest holds FSSAI, ISO 22000, HACCP, FDA, APEDA, Halal and other international certifications for food safety and quality. Verified compliance for global B2B buyers.";

export const metadata: Metadata = {
  title: "Quality & Certifications — FSSAI, APEDA, Halal",
  description: certificatesDescription,
  alternates: { canonical: "/certificates" },
  openGraph: {
    type: "website",
    title: "Ocean Crest Certifications — FSSAI, APEDA, Halal",
    description: certificatesDescription,
    url: "/certificates",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocean Crest Certifications — FSSAI, APEDA, Halal",
    description: certificatesDescription,
  },
};

const qualityProcess = [
  { step: "01", title: "Sourcing", description: "Direct procurement from certified farms in India's premier growing regions." },
  { step: "02", title: "Inspection", description: "Raw material inspection for quality, freshness, and contamination." },
  { step: "03", title: "Processing", description: "State-of-the-art cleaning, sorting, grinding, and sterilization." },
  { step: "04", title: "Lab Testing", description: "In-house lab analysis for moisture, purity, microbial content, and aflatoxin." },
  { step: "05", title: "Packaging", description: "Hygienic packaging in food-grade materials with proper labeling." },
  { step: "06", title: "Export", description: "Complete documentation, fumigation, and quality seal before shipment." },
];

export default function CertificatesPage() {
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
            <nav className="flex items-center gap-2 text-[12px] text-white/50 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/30">/</span>
              <span className="text-white/80">Certificates</span>
            </nav>
            <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold">Quality Assurance</span>
            <h1 className="mt-3 text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-display)]">
              Quality & <span className="text-gold">Certifications</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl">
              We meet the highest international food safety and quality standards through rigorous certifications and quality checks at every stage.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="py-20 lg:py-28 bg-stone">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Certifications"
            title="Internationally Recognized Standards"
            subtitle="Each certification represents our commitment to delivering safe, pure, and high-quality food products."
          />

          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {certificates.map((cert) => (
              <StaggerItem key={cert.id}>
                <div className="group glass-light rounded-[var(--radius-md)] p-6 lg:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full border border-transparent hover:border-gold/30">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-[var(--radius-md)] bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                      <ShieldCheck className="w-7 h-7 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary font-[family-name:var(--font-display)]">
                        {cert.name}
                      </h3>
                      <p className="mt-1 text-xs text-gold font-medium">{cert.issuingBody}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-ink-muted leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Quality Process */}
      <section className="py-20 lg:py-28 bg-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Process"
            title="Quality at Every Step"
            subtitle="From farm to shipment, every stage is monitored for quality and safety."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {qualityProcess.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.08}>
                <div className="relative bg-white rounded-[var(--radius-md)] p-6 shadow-card h-full">
                  <span className="text-5xl font-bold text-gold/10 font-[family-name:var(--font-display)] absolute top-4 right-4">
                    {item.step}
                  </span>
                  <div className="relative z-10">
                    <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-primary text-sm font-bold mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold text-primary font-[family-name:var(--font-display)]">{item.title}</h3>
                    <p className="mt-2 text-sm text-ink-muted leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-20 lg:py-28 bg-stone">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <SectionHeader
              eyebrow="Our Promise"
              title="Committed to Food Safety"
              subtitle="At Ocean Crest, quality isn't a department — it's embedded in our culture. Every team member understands their role in maintaining the highest standards of food safety and quality."
            />
            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              {[
                { value: "100%", label: "Traceability on all products" },
                { value: "Zero", label: "Tolerance for contamination" },
                { value: "24/7", label: "Quality monitoring systems" },
              ].map((item) => (
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
