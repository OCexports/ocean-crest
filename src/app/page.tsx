import { HeroSection } from "@/components/sections/HeroSection";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { JourneySection } from "@/components/sections/JourneySection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { CertificateStrip } from "@/components/sections/CertificateStrip";
import { CTABanner } from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductShowcase />
      <JourneySection />
      <WhyChooseUs />
      <CertificateStrip />
      <CTABanner />
    </>
  );
}
