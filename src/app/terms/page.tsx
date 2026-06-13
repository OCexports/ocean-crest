import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — Ocean Crest Exports",
  description:
    "The terms that govern your use of the Ocean Crest Exports website. Product orders are subject to separate written sales agreements.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      kind="terms"
      effectiveDate="May 2026"
      intro="These terms govern your use of the Ocean Crest Exports website (operated by Sheth & Bhatt's LLP — GSTIN: 24AFXFS5993L1ZS · Udyam Registration No.: UDYAM-GJ-01-0645893 · IEC: AFXFS5993L). By using this site you agree to these terms. They do not, by themselves, create a contract for the sale of goods — any order is governed by a separate written agreement, quotation, or purchase contract between you and Ocean Crest Exports."
      sections={[
        {
          heading: "Use of the website",
          body: [
            "You may use this website for lawful business purposes only — to learn about our products, request quotations, and contact us. You agree not to misuse the site, attempt to disrupt it, access it through automated means without permission, or use it in any way that could harm Ocean Crest Exports or other users.",
            "We may modify, suspend, or discontinue any part of the site at any time without notice.",
          ],
        },
        {
          heading: "Product information and quotations",
          body: [
            "Product descriptions, specifications, images, mesh sizes, and other details on this site are provided for general information. Actual product characteristics may vary by crop, season, and grade, and are confirmed in the specifications that accompany each shipment.",
            "Nothing on this website is an offer to sell. Prices, availability, minimum order quantities, lead times, and terms are confirmed only in a written quotation or order confirmation issued by Ocean Crest Exports, and are subject to change until then.",
          ],
        },
        {
          heading: "Orders and contracts of sale",
          body: [
            "Any purchase of products is subject to a separate sales agreement and/or our standard terms of sale, which take precedence over anything stated on this website regarding pricing, delivery, payment, inspection, certifications, liability, and dispute resolution. Please request those terms before placing an order.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "The Ocean Crest Exports name, logos, text, graphics, and the design of this website are owned by or licensed to Sheth & Bhatt's LLP and are protected by intellectual-property laws. You may not copy, reproduce, or use them without our prior written consent, except for normal browsing of the site.",
          ],
        },
        {
          heading: "Third-party links and embeds",
          body: [
            "The site may link to or embed third-party content (for example, maps or messaging services). We are not responsible for the content, policies, or practices of those third parties. Your use of them is at your own risk and subject to their terms.",
          ],
        },
        {
          heading: "Disclaimers",
          body: [
            "The website is provided “as is” and “as available”. To the fullest extent permitted by law, we disclaim all warranties of any kind regarding the website, including accuracy, completeness, fitness for a particular purpose, and uninterrupted or error-free operation.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "To the fullest extent permitted by law, Ocean Crest Exports and Sheth & Bhatt's LLP will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, revenue, data, or business, arising out of or related to your use of this website.",
          ],
        },
        {
          heading: "Governing law",
          body: [
            "These terms are governed by the laws of India, and the courts at Ahmedabad, Gujarat shall have jurisdiction over any dispute relating to this website, without prejudice to the dispute-resolution provisions of any separate sales agreement.",
          ],
        },
        {
          heading: "Changes to these terms",
          body: [
            "We may update these terms from time to time. The “last updated” date above reflects the most recent revision. Continued use of the site after changes are posted constitutes acceptance of the updated terms.",
          ],
        },
      ]}
    />
  );
}
