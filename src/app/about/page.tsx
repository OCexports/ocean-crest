import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Target,
  Eye,
  Heart,
  ShieldCheck,
  Users,
  Sparkles,
  MapPin,
  FlaskConical,
  FileCheck,
  Package,
  Truck,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { CTABanner } from "@/components/sections/CTABanner";

const aboutDescription =
  "Ocean Crest Exports — a specialized export brand under Sheth & Bhatt's LLP, dedicated to the global distribution of high-quality Indian commodities with verified supply, FSSAI/APEDA certification, and B2B trust.";

export const metadata: Metadata = {
  title: "About Ocean Crest — Verified Indian Exporter",
  description: aboutDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: "About Ocean Crest — Verified Indian Exporter",
    description: aboutDescription,
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ocean Crest — Verified Indian Exporter",
    description: aboutDescription,
  },
};

const values = [
  {
    icon: ShieldCheck,
    title: "Verified Supply",
    description:
      "Mandatory laboratory verification for every shipment, eliminating uncertainty in cross-border trade.",
  },
  {
    icon: Heart,
    title: "Transparency",
    description:
      "Built on a foundation of absolute transparency and a rigorous work ethic in every interaction.",
  },
  {
    icon: Sparkles,
    title: "Quality Compliance",
    description:
      "Strict compliance with Government of India export protocols and international standards.",
  },
  {
    icon: Users,
    title: "Client Partnership",
    description:
      "Tailored testing protocols and dedicated support for every client's specific requirements.",
  },
];

const processSteps = [
  {
    icon: MapPin,
    title: "Sourced Locally",
    desc: "Direct relationships with local producers across India, ensuring full visibility into the origin and quality of every batch.",
  },
  {
    icon: FlaskConical,
    title: "Lab Tested",
    desc: "All products undergo comprehensive analysis in accredited laboratories to verify purity, safety, and compliance with international standards before dispatch.",
  },
  {
    icon: FileCheck,
    title: "Customized Compliance",
    desc: "Tailored testing protocols based on client demand or specific destination country regulations, ensuring seamless customs clearance.",
  },
  {
    icon: Package,
    title: "Strategic Packaging",
    desc: "Industrial-grade, export-specific packaging to preserve product integrity against moisture and environmental factors during long-haul transit.",
  },
  {
    icon: Truck,
    title: "Verified Delivery",
    desc: "Every shipment is backed by a reliable supply chain and dedicated support to ensure the product arrives exactly as promised.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary py-32 lg:py-40">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full h-16 text-stone"
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,48 1440,40 L1440,64 L0,64 Z" />
        </svg>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <nav className="flex items-center gap-2 text-[12px] text-white/50 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/30">/</span>
              <span className="text-white/80">About Us</span>
            </nav>
            <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold">
              About Us
            </span>
            <h1 className="mt-3 text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-display)]">
              Ocean Crest <span className="text-gradient-copper">Exports</span>
            </h1>
            <div className="gold-line-left mt-6" />
            <p className="mt-6 text-base text-white/60 max-w-2xl leading-relaxed">
              A specialized export brand under{" "}
              <span className="text-white/80 font-medium">
                Sheth &amp; Bhatt&apos;s LLP
              </span>
              , dedicated to the global distribution of high-quality Indian
              products. Built on a foundation of absolute transparency and a
              rigorous work ethic, we serve as a reliable bridge between local
              Indian production and international market requirements.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* About Us — Long Form */}
      <section className="py-20 lg:py-28 bg-stone">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold">
              Who We Are
            </span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-semibold text-primary font-[family-name:var(--font-display)]">
              The Verified Supply Principle
            </h2>
            <div className="gold-line-left mt-4" />
            <div className="mt-8 space-y-5 text-ink-muted leading-relaxed">
              <p>
                Ocean Crest Exports is a specialized export brand under{" "}
                <span className="text-primary font-medium">
                  Sheth &amp; Bhatt&apos;s LLP
                </span>
                , dedicated to the global distribution of high-quality Indian
                products. Built on a foundation of absolute transparency and a
                rigorous work ethic, we serve as a reliable bridge between
                local Indian production and international market requirements.
              </p>
              <p>
                Our operations are centered on the principle of{" "}
                <span className="text-primary font-medium">
                  Verified Supply
                </span>
                . We eliminate the uncertainty often associated with
                cross-border trade by implementing direct sourcing and
                mandatory laboratory verification for every shipment.
              </p>
              <p>
                By integrating modern logistics with strict compliance to
                Government of India export protocols, Ocean Crest Exports
                ensures that every client receives products that match their
                exact technical specifications, delivered on time and in
                optimal condition.
              </p>
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
                <h2 className="text-2xl font-semibold text-primary font-[family-name:var(--font-display)]">
                  Our Mission
                </h2>
                <p className="mt-4 text-ink-muted leading-relaxed">
                  To serve as a reliable bridge between local Indian production
                  and international market requirements — delivering verified
                  quality, transparent dealings, and customized compliance for
                  every client.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="bg-white rounded-[var(--radius-lg)] p-8 lg:p-10 shadow-card h-full">
                <div className="w-14 h-14 rounded-[var(--radius-md)] bg-gold/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-gold" />
                </div>
                <h2 className="text-2xl font-semibold text-primary font-[family-name:var(--font-display)]">
                  Our Vision
                </h2>
                <p className="mt-4 text-ink-muted leading-relaxed">
                  To set the standard for Indian commodity exports through
                  uncompromising transparency, lab-verified quality, and
                  long-term partnerships built on trust and consistent
                  delivery.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-stone">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="What Drives Us"
            title="Our Core Values"
            subtitle="The principles that guide every decision we make and every shipment we send."
          />
          <StaggerChildren
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={0.1}
          >
            {values.map(({ icon: Icon, title, description }) => (
              <StaggerItem key={title}>
                <div className="bg-white rounded-[var(--radius-md)] p-6 shadow-card h-full text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary font-[family-name:var(--font-display)]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                    {description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Our Process — Detailed */}
      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Process"
            title="From Source to Shipment"
            subtitle="Five rigorous steps that ensure verified quality with every order."
          />
          <div className="space-y-6">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={step.title} delay={i * 0.08}>
                  <div className="flex items-start gap-6 bg-white rounded-[var(--radius-md)] p-6 lg:p-8 shadow-card">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary font-[family-name:var(--font-display)]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                        {step.desc}
                      </p>
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
          <SectionHeader
            eyebrow="Our Operations"
            title="Modern Export Infrastructure"
            subtitle="Direct sourcing, in-house verification, and strategic packaging built for international trade."
          />
          <StaggerChildren
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={0.1}
          >
            {[
              {
                title: "Local Sourcing Network",
                desc: "Direct relationships with verified producers across India for full traceability.",
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80",
              },
              {
                title: "Accredited Lab Testing",
                desc: "Comprehensive analysis to verify purity, safety, and international compliance.",
                image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&q=80",
              },
              {
                title: "Strategic Packaging",
                desc: "Industrial-grade export packaging to preserve product integrity in transit.",
                image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=500&q=80",
              },
              {
                title: "Compliance Documentation",
                desc: "Tailored protocols matching destination country regulations.",
                image: "https://images.unsplash.com/photo-1504222490345-c075b6008014?w=500&q=80",
              },
              {
                title: "Reliable Logistics",
                desc: "Established supply chain ensuring on-time delivery worldwide.",
                image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=500&q=80",
              },
              {
                title: "Export Documentation",
                desc: "Complete paperwork and customs clearance support for every shipment.",
                image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&q=80",
              },
            ].map(({ title, desc, image }) => (
              <StaggerItem key={title}>
                <div className="group bg-white rounded-[var(--radius-md)] overflow-hidden shadow-card">
                  <div className="h-40 relative overflow-hidden">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-primary font-[family-name:var(--font-display)]">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm text-ink-muted">{desc}</p>
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
