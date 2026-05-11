"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { companyInfo } from "@/lib/constants/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type IconProps = { className?: string };

const LinkedinIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
  </svg>
);
const FacebookIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.5 0-1.96.93-1.96 1.89v2.27h3.34l-.53 3.49h-2.81V24C19.61 23.1 24 18.1 24 12.07z"/>
  </svg>
);
const InstagramIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38 3.7 3.7 0 0 1-1.38.9c-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07a6.7 6.7 0 0 1-2.23-.41 3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38 6.7 6.7 0 0 1-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.73 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
  </svg>
);
const TwitterIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const socialIcons: Record<string, (p: IconProps) => React.ReactElement> = {
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
};

const footerLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "certificates", href: "/certificates" },
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
  return (
    <footer className="relative">
      <div className="gold-line" />

      <div className="bg-primary text-white relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="mb-4 -ms-6 lg:-ms-8">
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

              {/* Google Map */}
              <div className="mt-4 rounded-[var(--radius-sm)] overflow-hidden border border-white/10">
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
