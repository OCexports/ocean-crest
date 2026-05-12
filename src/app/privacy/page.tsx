import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Ocean Crest Exports",
  description:
    "How Ocean Crest Exports collects, uses, and protects the information you share through our website and inquiry forms.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      kind="privacy"
      effectiveDate="May 2026"
      intro="Ocean Crest Exports (a brand of Sheth & Bhatt's LLP, “we”, “us”) respects your privacy. This policy explains what information we collect through this website, why we collect it, and the choices you have. We only collect what we need to respond to your business inquiries."
      sections={[
        {
          heading: "Information we collect",
          body: [
            "Information you provide: when you submit an inquiry or contact form, we collect the details you enter — typically your name, email address, phone number, company name, country, the product you are interested in, an estimated quantity, and your message.",
            "Information collected automatically: like most websites, our hosting and analytics providers may record basic technical data such as your IP address, browser type, pages visited, and the date and time of your visit. This is used in aggregate to keep the site secure and to understand how it is used.",
            "We do not knowingly collect information from children, and our products and website are intended for business (B2B) use.",
          ],
        },
        {
          heading: "How we use your information",
          body: [
            "To respond to your inquiries, prepare quotations, share product specifications and samples, and communicate with you about a potential or existing business relationship.",
            "To operate, maintain, and improve the website, and to protect against fraud, abuse, and security incidents.",
            "To comply with applicable legal, tax, and export-trade obligations.",
            "We do not sell your personal information, and we do not use it for unrelated advertising.",
          ],
        },
        {
          heading: "Sharing of information",
          body: [
            "We may share your information with service providers who help us operate the website and communicate with you (for example, web hosting, email delivery, and analytics providers), strictly for those purposes and under appropriate confidentiality terms.",
            "We may disclose information if required by law, regulation, legal process, or a governmental request, or to protect the rights, property, or safety of Ocean Crest Exports, our customers, or others.",
            "If our business is reorganized, merged, or transferred, your information may be transferred as part of that transaction.",
          ],
        },
        {
          heading: "Data retention and security",
          body: [
            "We keep inquiry and contact information for as long as needed to handle your request and to maintain our business records, after which it is deleted or anonymized.",
            "We use reasonable technical and organizational measures to protect your information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
          ],
        },
        {
          heading: "Cookies",
          body: [
            "The site uses a small amount of local storage in your browser to remember your selected language. Our analytics and hosting providers may also set cookies or similar identifiers. You can clear or block cookies through your browser settings, though some features may not work as expected.",
          ],
        },
        {
          heading: "Your rights and choices",
          body: [
            "Depending on where you are located, you may have the right to access, correct, delete, or restrict the processing of your personal information, or to object to certain processing. To make a request, contact us using the email below and we will respond in line with applicable law.",
            "You can also ask us to stop contacting you at any time.",
          ],
        },
        {
          heading: "International transfers",
          body: [
            "Ocean Crest Exports is based in India. If you contact us from another country, your information will be transferred to and processed in India and, where applicable, in the locations of our service providers.",
          ],
        },
        {
          heading: "Changes to this policy",
          body: [
            "We may update this policy from time to time. The “last updated” date above reflects the most recent revision. Material changes will be posted on this page.",
          ],
        },
      ]}
    />
  );
}
