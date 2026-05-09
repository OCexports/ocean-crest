import { Quote } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";

const testimonials = [
  {
    quote:
      "Ocean Crest has been a reliable partner for our spice imports into the Gulf. The lab reports that accompany every shipment make customs clearance painless.",
    author: "Rashid Al-Mansouri",
    role: "Procurement Head",
    company: "Al Waha Foods",
    country: "UAE",
    flag: "Ã°Å¸â€¡Â¦Ã°Å¸â€¡Âª",
  },
  {
    quote:
      "Consistent quality, honest lead times and a team that actually picks up the phone. After two years of orders, we've never had a rejected container.",
    author: "Emma Richardson",
    role: "Director of Sourcing",
    company: "Heritage Spice Co.",
    country: "United Kingdom",
    flag: "Ã°Å¸â€¡Â¬Ã°Å¸â€¡Â§",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-stone">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14 lg:mb-16">
            <span className="text-[12px] lg:text-[11px] font-medium tracking-[0.3em] uppercase text-gold-deep">
              In their words
            </span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-semibold text-primary font-[family-name:var(--font-display)]">
              What our partners say
            </h2>
            <div className="gold-line mx-auto mt-5 max-w-[80px]" />
          </div>
        </ScrollReveal>

        <StaggerChildren
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
          staggerDelay={0.12}
        >
          {testimonials.map((t) => (
            <StaggerItem key={t.author}>
              <figure className="h-full bg-warm-white rounded-[var(--radius-lg)] p-8 lg:p-10 shadow-border hover:shadow-card-hover transition-all duration-300 border border-edge-light relative">
                <Quote
                  className="absolute top-6 right-6 w-8 h-8 text-gold/20"
                  aria-hidden="true"
                />
                <blockquote className="text-lg leading-relaxed text-ink pr-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-edge-light flex items-center gap-4">
                  <span
                    className="text-3xl leading-none shrink-0"
                    aria-hidden="true"
                  >
                    {t.flag}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-primary">
                      {t.author}
                    </p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      {t.role} &middot; {t.company}
                    </p>
                    <p className="text-[12px] lg:text-[10px] tracking-[0.2em] uppercase text-gold-muted font-medium mt-1">
                      {t.country}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
