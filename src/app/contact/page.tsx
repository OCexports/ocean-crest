import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { companyInfo } from "@/lib/constants/navigation";
import { InquiryForm } from "@/components/products/InquiryForm";

const contactDescription =
  "Get in touch with Ocean Crest for bulk spice and dehydrated garlic export inquiries. Request quotes, product samples, and custom packaging. Response within 24 hours.";

export const metadata: Metadata = {
  title: "Contact Ocean Crest — Request a Quote",
  description: contactDescription,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact Ocean Crest — Request a Quote",
    description: contactDescription,
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Ocean Crest — Request a Quote",
    description: contactDescription,
  },
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: [
      `${companyInfo.address.street}`,
      `${companyInfo.address.city}, ${companyInfo.address.state} ${companyInfo.address.zip}`,
      companyInfo.address.country,
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: [companyInfo.phone || "To be updated"],
    href: companyInfo.phone ? `tel:${companyInfo.phone}` : undefined,
  },
  {
    icon: Mail,
    title: "Email Us",
    details: [companyInfo.email],
    href: `mailto:${companyInfo.email}`,
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Monday - Saturday", "9:00 AM - 6:00 PM IST"],
  },
];

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
    "Hello Ocean Crest! I'd like to discuss a spice export inquiry."
  )}`;

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
              <span className="text-white/80">Contact</span>
            </nav>
            <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold">Get in Touch</span>
            <h1 className="mt-3 text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-display)]">
              Contact <span className="text-gold">Ocean Crest</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl">
              Have a bulk inquiry or need a quote? Our team responds within 24 hours with customized pricing and product specifications.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 lg:py-24 bg-stone">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Contact Cards */}
            <div className="lg:col-span-2 space-y-4">
              {contactInfo.map(({ icon: Icon, title, details, href }) => (
                <ScrollReveal key={title}>
                  <div className="bg-white rounded-[var(--radius-md)] p-5 shadow-card">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-[var(--radius-sm)] bg-gold/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary font-[family-name:var(--font-display)]">{title}</h3>
                        {details.map((line) =>
                          href ? (
                            <a key={line} href={href} className="block text-sm text-ink-muted hover:text-gold transition-colors mt-0.5">
                              {line}
                            </a>
                          ) : (
                            <p key={line} className="text-sm text-ink-muted mt-0.5">{line}</p>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}

              {/* WhatsApp CTA */}
              {companyInfo.whatsapp && (
                <ScrollReveal>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-whatsapp/10 border border-whatsapp/20 rounded-[var(--radius-md)] p-5 hover:bg-whatsapp/15 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-full bg-whatsapp flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary font-[family-name:var(--font-display)]">WhatsApp Us</h3>
                      <p className="text-sm text-ink-muted">Quick response on WhatsApp</p>
                    </div>
                  </a>
                </ScrollReveal>
              )}

              {/* Map */}
              <ScrollReveal>
                <div className="rounded-[var(--radius-md)] overflow-hidden border border-edge shadow-card">
                  <iframe
                    src="https://www.google.com/maps?q=Zodiac+Aarish+Sundervan+Epitome+Jodhpur+Ahmedabad+380015&output=embed"
                    width="100%"
                    height="280"
                    className="border-0 block"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
                    title="Ocean Crest Exports Location"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="right">
                <div className="bg-white rounded-[var(--radius-lg)] shadow-card p-6 lg:p-10">
                  <h2 className="text-2xl font-semibold text-primary font-[family-name:var(--font-display)] mb-2">
                    Send Us Your Inquiry
                  </h2>
                  <p className="text-ink-muted mb-8">
                    Fill in the details below and our export team will get back to you within 24 hours.
                  </p>
                  <Suspense fallback={<div className="h-96 animate-pulse bg-stone-100 rounded-md" />}>
                    <InquiryForm />
                  </Suspense>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
