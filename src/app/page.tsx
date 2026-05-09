import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { JourneySection } from "@/components/sections/JourneySection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { CertificateStrip } from "@/components/sections/CertificateStrip";
import { CTABanner } from "@/components/sections/CTABanner";
import { StructuredData } from "@/components/seo/StructuredData";
import { siteUrl } from "@/lib/seo/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ocean Crest Exports",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/products?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <>
      <StructuredData data={websiteSchema} />
      <HeroSection />
      <ProductShowcase />
      <JourneySection />
      <WhyChooseUs />
      <CertificateStrip />
      <CTABanner />
    </>
  );
}
