import { siteUrl } from "@/lib/seo/site";
import { companyInfo } from "@/lib/constants/navigation";

interface StructuredDataProps {
  data: Record<string, unknown>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ocean Crest Exports",
  legalName: companyInfo.parentCompany,
  description:
    "Verified Indian exporter of dehydrated garlic, premium spices, grains, and dehydrated vegetables. FSSAI and APEDA registered, serving B2B buyers across 25+ countries.",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  email: companyInfo.email,
  telephone: companyInfo.phone,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: companyInfo.phone,
      email: companyInfo.email,
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Hindi", "Arabic", "Spanish", "French", "German", "Italian"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: companyInfo.address.street,
    addressLocality: companyInfo.address.city,
    addressRegion: companyInfo.address.state,
    postalCode: companyInfo.address.zip,
    addressCountry: "IN",
  },
  sameAs: [
    companyInfo.social.linkedin,
    companyInfo.social.facebook,
    companyInfo.social.instagram,
    companyInfo.social.twitter,
  ],
};

export function productSchema(product: {
  name: string;
  description: string;
  slug: string;
  category: string;
  origin: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "Ocean Crest",
    },
    countryOfOrigin: {
      "@type": "Country",
      name: product.origin,
    },
    url: `${siteUrl}/products/${product.slug}`,
    image: `${siteUrl}/og-image.png`,
    manufacturer: {
      "@type": "Organization",
      name: "Ocean Crest Exports",
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      price: "0",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        valueAddedTaxIncluded: false,
      },
      url: `${siteUrl}/products/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: "Ocean Crest Exports",
      },
      businessFunction: "https://purl.org/goodrelations/v1#Sell",
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        minValue: 1,
        unitCode: "TNE",
        unitText: "metric ton",
      },
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}
