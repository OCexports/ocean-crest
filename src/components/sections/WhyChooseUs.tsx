import { ShieldCheck, TrendingDown, Truck, MapPin, Headphones } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Quality",
    desc: "Lab-tested batches and rigorous in-house quality controls before every shipment",
  },
  {
    icon: TrendingDown,
    title: "Competitive Pricing",
    desc: "Direct local sourcing eliminates middlemen",
  },
  {
    icon: Truck,
    title: "Reliable Supply",
    desc: "On-time delivery with robust logistics",
  },
  {
    icon: MapPin,
    title: "Locally Sourced",
    desc: "Direct relationships with local producers across India",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Personal account managers for every client",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-28 lg:py-36 bg-stone">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 items-start">
          {/* Left: Heading */}
          <ScrollReveal>
            <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold">
              Why Ocean Crest
            </span>
            <h2 className="mt-4 text-3xl lg:text-[44px] font-semibold text-primary font-[family-name:var(--font-display)] leading-tight">
              Built on Trust,
              <br />
              Backed by Quality
            </h2>
            <div className="gold-line-left mt-6" />
            <p className="mt-6 text-ink-muted leading-relaxed max-w-md">
              We combine verified supply with modern quality standards to
              deliver excellence in every shipment. Our commitment to
              transparency and lab-tested quality makes us a reliable partner
              for importers.
            </p>
          </ScrollReveal>

          {/* Right: Feature grid */}
          <StaggerChildren
            className="grid grid-cols-2 gap-x-8 gap-y-10"
            staggerDelay={0.08}
          >
            {features.map(({ icon: Icon, title, desc }) => (
              <StaggerItem key={title}>
                <div className="group cursor-default">
                  <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-gold/10 flex items-center justify-center mb-3 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-sm font-semibold text-primary">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted leading-relaxed">
                    {desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
