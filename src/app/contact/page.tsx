import type { Metadata } from "next";
import { ContactContent } from "./ContactContent.client";

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

export default function ContactPage() {
  return <ContactContent />;
}
