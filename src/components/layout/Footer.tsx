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
  { slug: "dehydrated-garlic-flakes", fallback: "Garlic Flakes" },
  { slug: "dehydrated-garlic-chopped", fallback: "Garlic Chopped" },
  { slug: "dehydrated-garlic-minced", fallback: "Garlic Minced" },
  { slug: "dehydrated-garlic-granules", fallback: "Garlic Granules" },
  { slug: "dehydrated-garlic-powder", fallback: "Garlic Powder" },
] as const;

export function Footer() {
  const { t } = useLanguage();
  const scrollToTop = useScrollToTop();
  return (
    <footer className="relative">
      <div className="gold-line" />

      <div className="bg-primary text-white relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="mb-6 -ms-4 lg:-ms-6">
                <Link
                  href="/"
                  dir="ltr"
                  onClick={() => scrollToTop()}
                  className="inline-flex items-center gap-3 cursor-pointer"
                >
                  <Image
                    src="/images/brand/OC MONOGRAM.png"
                    alt="OC monogram"
                    width={120}
                    height={120}
                    sizes="64px"
                    loading="lazy"
                    className="h-12 lg:h-14 w-auto object-contain [filter:drop-shadow(0_0_1px_rgba(212,166,74,1))_drop-shadow(0_0_1px_rgba(212,166,74,1))_drop-shadow(0_0_2px_rgba(212,166,74,0.7))]"
                  />
                  <span className="text-[14px] lg:text-[16px] font-semibold tracking-[0.12em] uppercase font-[family-name:var(--font-display)] text-white leading-none whitespace-nowrap">
                    Ocean Crest Exports
                  </span>
                </Link>
              </div>
              <div className="mb-4 -ms-10 lg:-ms-12">
                <Image
                  src="/images/brand/sheth-bhatts-logo.png"
                  alt="Sheth & Bhatt's LLP"
                  width={560}
                  height={168}
                  sizes="(min-width: 1024px) 360px, 320px"
                  loading="lazy"
                  className="h-32 lg:h-36 w-auto"
                />
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {t.footer.tagline}
              </p>
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
                      className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-gold/20 hover:text-gold transition-all cursor-pointer"
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
              <h3 className="text-sm font-semibold tracking-wider uppercase text-white/80 mb-4">
                {t.footer.quickLinks}
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 hover:text-gold transition-colors cursor-pointer"
                    >
                      {t.nav[link.key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-white/80 mb-4">
                {t.footer.products}
              </h3>
              <ul className="space-y-2.5">
                {productLinks.map((link) => (
                  <li key={link.slug}>
                    <Link
                      href={`/products/${link.slug}`}
                      className="text-sm text-white/80 hover:text-gold transition-colors cursor-pointer"
                    >
                      {t.productData[link.slug]?.name ?? link.fallback}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + Map */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-white/80 mb-4">
                {t.footer.contact}
              </h3>
              <div className="space-y-3 text-sm text-white/80">
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold" />
                  <p>
                    {companyInfo.address.street}, {companyInfo.address.city},{" "}
                    {companyInfo.address.state} {companyInfo.address.zip},{" "}
                    {companyInfo.address.country}
                  </p>
                </div>
                {companyInfo.phone && (
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="flex items-center gap-3 hover:text-gold transition-colors cursor-pointer"
                  >
                    <Phone className="w-4 h-4 shrink-0 text-gold" />
                    {companyInfo.phone}
                  </a>
                )}
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-center gap-3 hover:text-gold transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4 shrink-0 text-gold" />
                  {companyInfo.email}
                </a>
              </div>

              {/* Registration details — universal identifiers, not translated */}
              <dl className="mt-5 pt-5 border-t border-white/10 space-y-1.5 text-xs text-white/70">
                <div className="flex gap-2">
                  <dt className="font-semibold uppercase tracking-wider text-white/60 shrink-0">GSTIN</dt>
                  <dd className="text-white/80">{companyInfo.registration.gstin}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold uppercase tracking-wider text-white/60 shrink-0">Udyam</dt>
                  <dd className="text-white/80">{companyInfo.registration.udyam}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold uppercase tracking-wider text-white/60 shrink-0">IEC</dt>
                  <dd className="text-white/80">{companyInfo.registration.iec}</dd>
                </div>
              </dl>

              {/* Google Map — data-lenis-prevent so wheel events inside the
                  embed zoom the map instead of being captured by Lenis. */}
              <div
                data-lenis-prevent
                className="mt-4 rounded-[var(--radius-sm)] overflow-hidden border border-white/10"
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
          <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/80">
              &copy; {new Date().getFullYear()} Ocean Crest Exports. {t.footerExtra.copyright}
            </p>
            <div className="flex gap-6 text-sm text-white/80">
              <Link
                href="/privacy"
                className="hover:text-gold/60 transition-colors cursor-pointer"
              >
                {t.footerExtra.privacy}
              </Link>
              <Link
                href="/terms"
                className="hover:text-gold/60 transition-colors cursor-pointer"
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
