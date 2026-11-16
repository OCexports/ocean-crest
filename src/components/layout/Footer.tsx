"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { companyInfo } from "@/lib/constants/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useScrollToTop } from "./SmoothScroll";

type IconProps = { className?: string };

const FacebookIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.5 0-1.96.93-1.96 1.89v2.27h3.34l-.53 3.49h-2.81V24C19.61 23.1 24 18.1 24 12.07z"/>
  </svg>
);
const LinkedInIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>
  </svg>
);
const socialIcons: Record<string, (p: IconProps) => React.ReactElement> = {
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
};

const footerLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  // { key: "certificates", href: "/certificates" }, // hidden for now — re-enable later
  { key: "contact", href: "/contact" },
] as const;

const productLinks = [
  { slug: "dehydrated-white-onion-flakes", label: "Dehydrated White Onion" },
  { slug: "dehydrated-garlic-flakes", label: "Dehydrated Garlic" },
  { slug: "dehydrated-amla-powder", label: "Amla Powder" },
  { slug: "dehydrated-turmeric-powder", label: "Turmeric Powder" },
  { slug: "dehydrated-ginger-powder", label: "Ginger Powder" },
  { slug: "byadgi-dried-red-chilli-crushed-flakes", label: "Red Chilli (Byadgi & Kashmiri)" },
  { slug: "ajwain-carom-seeds", label: "Ajwain (Carom)" },
  { slug: "kasuri-methi-dried-fenugreek-leaves", label: "Kasuri Methi" },
  { slug: "tamarind-whole-pods-fingers", label: "Tamarind" },
  { slug: "isabgol-whole-husk", label: "Isabgol (Psyllium)" },
  { slug: "ashwagandha-dried-whole-roots", label: "Ashwagandha" },
  { slug: "moringa-leaf-powder", label: "Moringa Leaf Powder" },
  { slug: "guar-gum-powder", label: "Guar Gum Powder" },
] as const;

export function Footer() {
  const { t } = useLanguage();
  const scrollToTop = useScrollToTop();
  return (
    <footer className="relative">
      <div className="gold-line" />

      <div className="bg-stone text-ink relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="mb-6">
                <Link
                  href="/"
                  dir="ltr"
                  onClick={() => scrollToTop()}
                  className="inline-flex flex-col items-center gap-2 cursor-pointer"
                >
                  <Image
                    src="/images/brand/OC MONOGRAM.png"
                    alt="OC monogram"
                    width={160}
                    height={160}
                    sizes="128px"
                    loading="lazy"
                    className="h-28 lg:h-32 w-auto object-contain"
                  />
                  <span className="text-[15px] lg:text-[18px] font-semibold tracking-[0.12em] uppercase font-[family-name:var(--font-display)] text-primary leading-none whitespace-nowrap">
                    Ocean Crest Exports
                  </span>
                </Link>
              </div>
              {/* Registrations — transparent logos sit directly on the beige footer */}
              <div className="flex items-center gap-5" dir="ltr">
                <Image
                  src="/images/brand/fssai.webp"
                  alt="FSSAI"
                  width={360}
                  height={178}
                  sizes="120px"
                  loading="lazy"
                  className="h-14 w-auto object-contain"
                />
                <Image
                  src="/images/brand/msme.webp"
                  alt="MSME — Micro, Small & Medium Enterprises"
                  width={360}
                  height={135}
                  sizes="150px"
                  loading="lazy"
                  className="h-14 w-auto object-contain"
                />
              </div>
              {/* Social */}
              <div className="flex gap-3 mt-6">
                {Object.entries(companyInfo.social).map(([name, url]) => {
                  const Icon = socialIcons[name];
                  return (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-gold/25 hover:text-gold-deep transition-all cursor-pointer"
                      aria-label={name}
                    >
                      {Icon ? (
                        <Icon className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-bold uppercase">
                          {name[0]}
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-primary mb-4">
                {t.footer.quickLinks}
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted hover:text-gold-deep transition-colors cursor-pointer"
                    >
                      {t.nav[link.key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-primary mb-4">
                {t.footer.products}
              </h3>
              <ul className="space-y-2.5">
                {productLinks.map((link) => (
                  <li key={link.slug}>
                    <Link
                      href={`/products/${link.slug}`}
                      className="text-sm text-ink-muted hover:text-gold-deep transition-colors cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + Map */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-primary mb-4">
                {t.footer.contact}
              </h3>
              <div className="space-y-3 text-sm text-ink-muted">
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold-deep" />
                  <p>
                    {companyInfo.address.street}, {companyInfo.address.city},{" "}
                    {companyInfo.address.state} {companyInfo.address.zip},{" "}
                    {companyInfo.address.country}
                  </p>
                </div>
                {companyInfo.phone && (
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="flex items-center gap-3 hover:text-gold-deep transition-colors cursor-pointer"
                  >
                    <Phone className="w-4 h-4 shrink-0 text-gold-deep" />
                    {companyInfo.phone}
                  </a>
                )}
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-center gap-3 hover:text-gold-deep transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4 shrink-0 text-gold-deep" />
                  {companyInfo.email}
                </a>
              </div>

              {/* Registration details — universal identifiers, not translated */}
              <dl className="mt-5 pt-5 border-t border-edge space-y-1.5 text-xs text-ink-muted">
                <div className="flex gap-2">
                  <dt className="font-semibold uppercase tracking-wider text-ink-muted shrink-0">GSTIN</dt>
                  <dd className="text-ink">{companyInfo.registration.gstin}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold uppercase tracking-wider text-ink-muted shrink-0">Udyam</dt>
                  <dd className="text-ink">{companyInfo.registration.udyam}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold uppercase tracking-wider text-ink-muted shrink-0">IEC</dt>
                  <dd className="text-ink">{companyInfo.registration.iec}</dd>
                </div>
              </dl>

              {/* Google Map — data-lenis-prevent so wheel events inside the
                  embed zoom the map instead of being captured by Lenis. */}
              <div
                data-lenis-prevent
                className="mt-4 rounded-[var(--radius-sm)] overflow-hidden border border-edge"
              >
                <iframe
                  src="https://www.google.com/maps?q=Zodiac+Aarish+Sundervan+Epitome+Jodhpur+Ahmedabad+380015&output=embed"
                  width="100%"
                  className="border-0 block w-full h-[160px] md:h-[200px]"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
                  title="Ocean Crest Exports Location"
                />
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-edge flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-ink-muted">
              &copy; {new Date().getFullYear()} Ocean Crest Exports. {t.footerExtra.copyright}
            </p>
            <div className="flex gap-6 text-sm text-ink-muted">
              <Link
                href="/privacy"
                className="hover:text-gold-deep transition-colors cursor-pointer"
              >
                {t.footerExtra.privacy}
              </Link>
              <Link
                href="/terms"
                className="hover:text-gold-deep transition-colors cursor-pointer"
              >
                {t.footerExtra.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
