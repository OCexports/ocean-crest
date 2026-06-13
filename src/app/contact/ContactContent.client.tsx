"use client";

import Link from "next/link";
import { Suspense } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, FileBadge, type LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { companyInfo } from "@/lib/constants/navigation";
import { InquiryForm } from "@/components/products/InquiryForm";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function ContactContent() {
  const { t } = useLanguage();
  const p = t.contactPage;

  const contactInfo: { icon: LucideIcon; title: string; details: string[]; href?: string }[] = [
    {
      icon: MapPin,
      title: p.visitUs,
      details: [
        companyInfo.address.street,
        `${companyInfo.address.city}, ${companyInfo.address.state} ${companyInfo.address.zip}`,
        companyInfo.address.country,
      ],
    },
    {
      icon: Phone,
      title: p.callUs,
      details: [companyInfo.phone || p.phoneTbu],
      href: companyInfo.phone ? `tel:${companyInfo.phone}` : undefined,
    },
    {
      icon: Mail,
      title: p.emailUs,
      details: [companyInfo.email],
      href: `mailto:${companyInfo.email}`,
    },
    {
      icon: Clock,
      title: p.workingHours,
      details: [p.hoursDays, p.hoursTime],
    },
  ];

  const whatsappUrl = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(p.whatsappPrefill)}`;

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

              {/* Registration details */}
              <ScrollReveal>
                <div className="bg-white rounded-[var(--radius-md)] p-5 shadow-card">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-[var(--radius-sm)] bg-gold/10 flex items-center justify-center shrink-0">
                      <FileBadge className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary font-[family-name:var(--font-display)]">Registration &amp; Compliance</h3>
                      <dl className="mt-1 space-y-0.5 text-sm text-ink-muted">
                        <div className="flex gap-2">
                          <dt className="font-medium text-primary/70 shrink-0">GSTIN</dt>
                          <dd>{companyInfo.registration.gstin}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="font-medium text-primary/70 shrink-0">Udyam</dt>
                          <dd>{companyInfo.registration.udyam}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="font-medium text-primary/70 shrink-0">IEC</dt>
                          <dd>{companyInfo.registration.iec}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

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
                      <h3 className="font-semibold text-primary font-[family-name:var(--font-display)]">{p.whatsappTitle}</h3>
                      <p className="text-sm text-ink-muted">{p.whatsappSubtitle}</p>
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
                    className="border-0 block w-full h-[200px] md:h-[280px] lg:h-[400px]"
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
                    {p.formHeading}
                  </h2>
                  <p className="text-ink-muted mb-8">{p.formSubtitle}</p>
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
