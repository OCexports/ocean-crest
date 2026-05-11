import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/lib/constants/products";
import { StructuredData, productSchema, breadcrumbSchema } from "@/components/seo/StructuredData";
import { ProductDetailContent } from "@/components/products/ProductDetailContent.client";
import { siteUrl } from "@/lib/seo/site";

// Image naming convention: /images/products/garlic/{variant}-{n}.webp
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
  ],
  "dehydrated-garlic-granules": [
    "/images/products/garlic/granules-1.webp",
    "/images/products/garlic/granules-2.webp",
  ],
  "dehydrated-garlic-powder": [
    "/images/products/garlic/powder-1.webp",
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
    .slice(0, 3)
    .map((rp) => ({
      slug: rp.slug,
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
