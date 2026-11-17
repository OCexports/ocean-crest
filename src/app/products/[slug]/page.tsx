import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/lib/constants/products";
import { StructuredData, productSchema, breadcrumbSchema } from "@/components/seo/StructuredData";
import { ProductDetailContent } from "@/components/products/ProductDetailContent.client";
import { siteUrl } from "@/lib/seo/site";

// Image naming convention: /images/products/{family}/{variant}-{n}.webp
// (the first image in each list is also the card image on /products).
// The {variant}-1 image is also surfaced on the homepage Bento grid (ProductShowcase.tsx).
// Drop additional variants (-2, -3, ...) here to grow each product's detail gallery.
const galleryByProduct: Record<string, string[]> = {
  "dehydrated-garlic-flakes": [
    "/images/products/garlic/flakes-1.webp",
    "/images/products/garlic/flakes-2.webp",
    "/images/products/garlic/flakes-3.webp",
    "/images/products/garlic/flakes-4.webp",
    "/images/products/garlic/flakes-5.webp",
  ],
  "dehydrated-garlic-chopped": [
    "/images/products/garlic/chopped-1.webp",
    "/images/products/garlic/chopped-2.webp",
    "/images/products/garlic/chopped-3.webp",
  ],
  "dehydrated-garlic-minced": [
    "/images/products/garlic/minced-1.webp",
    "/images/products/garlic/minced-2.webp",
    "/images/products/garlic/minced-3.webp",
  ],
  "dehydrated-garlic-granules": [
    "/images/products/garlic/granules-1.webp",
    "/images/products/garlic/granules-2.webp",
    "/images/products/garlic/granules-3.webp",
  ],
  "dehydrated-garlic-powder": [
    "/images/products/garlic/powder-1.webp",
    "/images/products/garlic/powder-2.webp",
    "/images/products/garlic/powder-3.webp",
  ],
  "turmeric-fingers-whole": [
    "/images/products/turmeric/fingers-1.webp",
    "/images/products/turmeric/fingers-2.webp",
    "/images/products/turmeric/fingers-3.webp",
  ],
  "dehydrated-turmeric-powder": [
    "/images/products/turmeric/powder-1.webp",
    "/images/products/turmeric/powder-2.webp",
    "/images/products/turmeric/powder-3.webp",
    "/images/products/turmeric/powder-4.webp",
  ],
  "dried-ginger-whole": [
    "/images/products/ginger/fingers-1.webp",
    "/images/products/ginger/fingers-2.webp",
    "/images/products/ginger/fingers-3.webp",
  ],
  "dehydrated-ginger-powder": [
    "/images/products/ginger/powder-2.jpg",
    "/images/products/ginger/powder-1.jpg",
    "/images/products/ginger/powder-3.jpg",
  ],
  "isabgol-whole-husk": [
    "/images/products/isabgol/whole-husk-1.webp",
    "/images/products/isabgol/whole-husk-2.webp",
    "/images/products/isabgol/whole-husk-3.webp",
  ],
  "isabgol-husk-powder": [
    "/images/products/isabgol/husk-powder-1.webp",
    "/images/products/isabgol/husk-powder-2.webp",
    "/images/products/isabgol/husk-powder-3.webp",
  ],
  "dehydrated-white-onion-flakes": [
    "/images/products/onion/flakes-1.webp",
    "/images/products/onion/flakes-2.webp",
    "/images/products/onion/flakes-3.webp",
  ],
  "dehydrated-white-onion-chopped": [
    "/images/products/onion/chopped-1.webp",
    "/images/products/onion/chopped-2.webp",
    "/images/products/onion/chopped-3.webp",
  ],
  "dehydrated-white-onion-minced": [
    "/images/products/onion/minced-1.webp",
    "/images/products/onion/minced-2.webp",
    "/images/products/onion/minced-3.webp",
  ],
  "dehydrated-white-onion-granules": [
    "/images/products/onion/granules-1.webp",
    "/images/products/onion/granules-2.webp",
    "/images/products/onion/granules-3.webp",
  ],
  "dehydrated-white-onion-powder": [
    "/images/products/onion/powder-1.webp",
    "/images/products/onion/powder-2.webp",
    "/images/products/onion/powder-3.webp",
  ],
  "ashwagandha-dried-whole-roots": [
    "/images/products/ashwagandha/roots-1.webp",
    "/images/products/ashwagandha/roots-2.webp",
    "/images/products/ashwagandha/roots-3.webp",
  ],
  "ashwagandha-root-powder": [
    "/images/products/ashwagandha/root-powder-1.webp",
    "/images/products/ashwagandha/root-powder-2.webp",
    "/images/products/ashwagandha/root-powder-3.webp",
  ],
  "ashwagandha-standardized-extract-powder": [
    "/images/products/ashwagandha/extract-powder-1.webp",
    "/images/products/ashwagandha/extract-powder-2.webp",
    "/images/products/ashwagandha/extract-powder-3.webp",
  ],
  "ashwagandha-capsules": [
    "/images/products/ashwagandha/capsules-1.webp",
    "/images/products/ashwagandha/capsules-2.webp",
    "/images/products/ashwagandha/capsules-3.webp",
  ],
  "byadgi-dried-red-chilli-crushed-flakes": [
    "/images/products/chilli/byadgi-flakes-1.webp",
    "/images/products/chilli/byadgi-flakes-2.webp",
    "/images/products/chilli/byadgi-flakes-3.webp",
  ],
  "byadgi-dried-red-chilli-fine-powder": [
    "/images/products/chilli/byadgi-powder-1.webp",
    "/images/products/chilli/byadgi-powder-2.webp",
    "/images/products/chilli/byadgi-powder-3.webp",
  ],
  "kashmiri-dried-red-chilli-crushed-flakes": [
    "/images/products/chilli/kashmiri-flakes-1.webp",
    "/images/products/chilli/kashmiri-flakes-2.webp",
    "/images/products/chilli/kashmiri-flakes-3.webp",
  ],
  "kashmiri-dried-red-chilli-fine-powder": [
    "/images/products/chilli/kashmiri-powder-1.webp",
    "/images/products/chilli/kashmiri-powder-2.webp",
    "/images/products/chilli/kashmiri-powder-3.webp",
  ],
  "moringa-leaf-powder": [
    "/images/products/moringa/powder-1.webp",
    "/images/products/moringa/powder-2.webp",
  ],
  "guar-gum-powder": [
    "/images/products/guar-gum/powder-1.webp",
    "/images/products/guar-gum/powder-2.webp",
    "/images/products/guar-gum/powder-3.webp",
  ],
  "ajwain-carom-seeds": [
    "/images/products/ajwain/seeds-1.webp",
    "/images/products/ajwain/seeds-2.webp",
    "/images/products/ajwain/seeds-3.webp",
  ],
  "ajwain-carom-powder": [
    "/images/products/ajwain/powder-1.webp",
    "/images/products/ajwain/powder-2.webp",
    "/images/products/ajwain/powder-3.webp",
  ],
  "kasuri-methi-dried-fenugreek-leaves": [
    "/images/products/kasuri-methi/leaves-1.webp",
    "/images/products/kasuri-methi/leaves-2.webp",
    "/images/products/kasuri-methi/leaves-3.webp",
  ],
  "kasuri-methi-fenugreek-leaf-powder": [
    "/images/products/kasuri-methi/powder-1.webp",
    "/images/products/kasuri-methi/powder-2.webp",
    "/images/products/kasuri-methi/powder-3.webp",
  ],
  "dehydrated-amla-powder": [
    "/images/products/amla/powder-1.webp",
    "/images/products/amla/powder-2.webp",
    "/images/products/amla/powder-3.webp",
  ],
  "tamarind-whole-pods-fingers": [
    "/images/products/tamarind/pods-1.webp",
    "/images/products/tamarind/pods-2.webp",
    "/images/products/tamarind/pods-3.webp",
  ],
  "tamarind-spray-dried-powder": [
    "/images/products/tamarind/powder-1.webp",
    "/images/products/tamarind/powder-2.webp",
    "/images/products/tamarind/powder-3.webp",
  ],
};

function getGalleryImages(slug: string): string[] {
  return galleryByProduct[slug] ?? [];
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  const url = `${siteUrl}/products/${product.slug}`;
  const galleryImage = galleryByProduct[product.slug]?.[0];
  const ogImage = galleryImage ? `${siteUrl}${galleryImage}` : `${siteUrl}/og-image.png`;
  const description = `${product.shortDescription} Bulk B2B export from Ocean Crest, FSSAI/APEDA certified. Request quote and specs.`;

  return {
    title: `${product.name} — Wholesale Export from India`,
    description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      type: "website",
      url,
      title: product.name,
      description,
      siteName: "Ocean Crest Exports",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: [ogImage],
    },
  };
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    // Same-family siblings first (e.g. other garlic cuts), then the rest of the category.
    .sort((a, b) => Number(b.family === product.family) - Number(a.family === product.family))
    .slice(0, 3)
    .map((rp) => ({
      slug: rp.slug,
      name: rp.name,
      category: rp.category,
      shortDescription: rp.shortDescription,
      hasPhotography: rp.hasPhotography,
      image: galleryByProduct[rp.slug]?.[0] ?? rp.image,
    }));

  return (
    <>
      <StructuredData data={productSchema(product)} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Products", url: "/products" },
          { name: product.name, url: `/products/${product.slug}` },
        ])}
      />
      <ProductDetailContent
        product={product}
        galleryImages={getGalleryImages(product.slug)}
        related={related}
      />
    </>
  );
}
