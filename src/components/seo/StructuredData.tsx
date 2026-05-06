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
  description: "Premium Indian spice and food product exporter serving 25+ countries worldwide.",
  url: "https://ocexports.com",
  logo: "https://ocexports.com/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-98765-43210",
    contactType: "sales",
    availableLanguage: ["English", "Hindi", "Arabic", "Spanish"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "42 Marine Drive, Export Zone",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400001",
    addressCountry: "IN",
  },
  sameAs: [
    "https://linkedin.com/company/oceancrest",
    "https://facebook.com/oceancrest",
    "https://instagram.com/oceancrest",
    "https://twitter.com/oceancrest",
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
    url: `https://ocexports.com/products/${product.slug}`,
    manufacturer: {
      "@type": "Organization",
      name: "Ocean Crest Exports",
    },
  };
}
