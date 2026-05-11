import type { Metadata } from "next";
import { CertificatesContent } from "./CertificatesContent.client";

const certificatesDescription =
  "Ocean Crest holds FSSAI, ISO 22000, HACCP, FDA, APEDA, Halal and other international certifications for food safety and quality. Verified compliance for global B2B buyers.";

export const metadata: Metadata = {
  title: "Quality & Certifications — FSSAI, APEDA, Halal",
  description: certificatesDescription,
  alternates: { canonical: "/certificates" },
  openGraph: {
    type: "website",
    title: "Ocean Crest Certifications — FSSAI, APEDA, Halal",
    description: certificatesDescription,
    url: "/certificates",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocean Crest Certifications — FSSAI, APEDA, Halal",
    description: certificatesDescription,
  },
};

export default function CertificatesPage() {
  return <CertificatesContent />;
}
