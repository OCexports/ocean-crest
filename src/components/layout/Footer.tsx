import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { companyInfo } from "@/lib/constants/navigation";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Certificates", href: "/certificates" },
  { name: "Contact", href: "/contact" },
];

const productLinks = [
  { name: "Garlic Flakes", href: "/products/dehydrated-garlic-flakes" },
  { name: "Garlic Chopped", href: "/products/dehydrated-garlic-chopped" },
  { name: "Garlic Minced", href: "/products/dehydrated-garlic-minced" },
  { name: "Garlic Granules", href: "/products/dehydrated-garlic-granules" },
  { name: "Garlic Powder", href: "/products/dehydrated-garlic-powder" },
  { name: "Onion Powder", href: "/products/onion-powder" },
];

export function Footer() {
  return (
    <footer className="relative">
      <div className="gold-line" />

      <div className="bg-primary text-white relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="mb-4">
                <span className="text-lg font-bold font-[family-name:var(--font-display)] tracking-wide">
                  OCEAN CREST EXPORTS
                </span>
                <span className="gold-line-left block mt-2" />
                <span className="block text-[10px] tracking-[0.25em] uppercase text-gold mt-2">
                  Part of Sheth &amp; Bhatt&apos;s LLP
                </span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                A specialized export brand under Sheth &amp; Bhatt&apos;s LLP,
                dedicated to the global distribution of high-quality Indian
                products with verified supply and lab-tested quality.
              </p>
              {/* Social */}
              <div className="flex gap-3 mt-6">
                {Object.entries(companyInfo.social).map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-gold/20 hover:text-gold transition-all cursor-pointer"
                    aria-label={name}
                  >
                    <span className="text-xs font-bold uppercase">
                      {name[0]}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-white/60 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 hover:text-gold transition-colors cursor-pointer"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-white/60 mb-4">
                Our Products
              </h3>
              <ul className="space-y-2.5">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 hover:text-gold transition-colors cursor-pointer"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + Map */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-white/60 mb-4">
                Contact Us
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
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-center gap-3 hover:text-gold transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 shrink-0 text-gold" />
                  {companyInfo.phone}
                </a>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.0234567890123!2d72.5713621!3d23.0225035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzIxLjAiTiA3MsKwMzQnMTcuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="140"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ocean Crest Exports Location"
                />
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">
              &copy; {new Date().getFullYear()} Ocean Crest Exports. All rights
              reserved. Part of Sheth &amp; Bhatt&apos;s LLP.
            </p>
            <div className="flex gap-6 text-sm text-white/60">
              <Link
                href="/privacy"
                className="hover:text-gold/60 transition-colors cursor-pointer"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-gold/60 transition-colors cursor-pointer"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
