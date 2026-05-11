import type { Metadata } from "next";
import { AboutContent } from "./AboutContent.client";

const aboutDescription =
  "Ocean Crest Exports — a specialized export brand under Sheth & Bhatt's LLP, dedicated to the global distribution of high-quality Indian commodities with verified supply, FSSAI/APEDA certification, and B2B trust.";

export const metadata: Metadata = {
  title: "About Ocean Crest — Verified Indian Exporter",
  description: aboutDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: "About Ocean Crest — Verified Indian Exporter",
    description: aboutDescription,
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ocean Crest — Verified Indian Exporter",
    description: aboutDescription,
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
