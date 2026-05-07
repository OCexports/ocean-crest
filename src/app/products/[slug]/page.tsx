import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { products, getProductBySlug } from "@/lib/constants/products";
import { companyInfo } from "@/lib/constants/navigation";
import { StructuredData, productSchema } from "@/components/seo/StructuredData";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductImagePlaceholder } from "@/components/products/ProductImagePlaceholder";

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

  return {
    title: product.name,
    description: product.shortDescription,
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
    .slice(0, 3);

  const whatsappUrl = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
    `Hello Ocean Crest! I'm interested in ${product.name}. Could you share pricing and availability?`
  )}`;

  return (
    <>
      <StructuredData data={productSchema(product)} />
      {/* Breadcrumb + Hero */}
      <section className="relative bg-primary pt-28 pb-16">
        <svg className="absolute bottom-0 left-0 w-full h-12 text-stone" viewBox="0 0 1440 48" preserveAspectRatio="none" fill="currentColor">
          <path d="M0,24 C360,48 720,0 1080,24 C1260,36 1380,36 1440,30 L1440,48 L0,48 Z" />
        </svg>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12 lg:py-20 bg-stone">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Product Gallery */}
            <ScrollReveal direction="left">
              <ProductGallery
                images={getGalleryImages(product.slug)}
                alt={product.name}
              />
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal direction="right">
              <Badge variant="gold" className="mb-3">{product.category}</Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-primary font-[family-name:var(--font-display)]">
                {product.name}
              </h1>

              {/* Spec chips — buyer-scannable size/mesh/color above the fold */}
              {(product.meshBadge || product.specifications.Color) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.meshBadge && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold tracking-wider uppercase">
                      {product.meshBadge}
                    </span>
                  )}
                  {product.specifications.Color && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-stone-100 border border-edge text-ink-muted text-xs font-medium">
                      {product.specifications.Color}
                    </span>
                  )}
                  {product.specifications.Moisture && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-stone-100 border border-edge text-ink-muted text-xs font-medium">
                      Moisture: {product.specifications.Moisture}
                    </span>
                  )}
                </div>
              )}

              <p className="mt-5 text-ink-muted leading-relaxed">
                {product.description}
              </p>

              {/* CTAs — moved up, immediately under the lede */}
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={`/contact?product=${product.slug}`}>
                  <Button size="lg">
                    Request Quote
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="whatsapp" size="lg">
                    <MessageCircle className="w-4 h-4" />
                    Inquire on WhatsApp
                  </Button>
                </a>
              </div>

              {/* Ideal applications — Best For from the doc, as tagged list */}
              {product.bestFor && product.bestFor.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-xs font-medium tracking-[0.25em] uppercase text-gold mb-3">
                    Ideal Applications
                  </h2>
                  <ul className="flex flex-wrap gap-2">
                    {product.bestFor.map((use) => (
                      <li
                        key={use}
                        className="px-3 py-1.5 rounded-md bg-white border border-edge-light text-sm text-ink"
                      >
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Why this grade — Institutional Note as differentiator callout */}
              {product.institutionalNote && (
                <aside className="mt-8 p-5 rounded-[var(--radius-md)] bg-white border-l-2 border-gold shadow-border">
                  <p className="text-xs font-medium tracking-[0.25em] uppercase text-gold mb-2">
                    Why This Grade
                  </p>
                  <p className="text-sm text-ink leading-relaxed">
                    {product.institutionalNote}
                  </p>
                </aside>
              )}

              {/* Key features — kept but de-emphasized vs. the structured sections above */}
              <div className="mt-10">
                <h2 className="text-lg font-semibold text-primary mb-4 font-[family-name:var(--font-display)]">Key Features</h2>
                <ul className="space-y-2.5">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                      <span className="text-sm text-ink-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Specifications */}
          <ScrollReveal className="mt-16">
            <h2 className="text-2xl font-semibold text-primary font-[family-name:var(--font-display)] mb-6">Specifications</h2>
            <div className="bg-white rounded-[var(--radius-md)] shadow-card overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value], i) => (
                    <tr key={key} className={i % 2 === 0 ? "bg-stone-100/50" : "bg-white"}>
                      <td className="px-6 py-3.5 text-sm font-medium text-primary w-1/3">{key}</td>
                      <td className="px-6 py-3.5 text-sm text-ink-muted">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-semibold text-primary font-[family-name:var(--font-display)] mb-8">Related Products</h2>
              <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
                {related.map((rp) => (
                  <StaggerItem key={rp.slug}>
                    <Link href={`/products/${rp.slug}`} className="group block">
                      <Card>
                        <div className="aspect-[4/3] relative overflow-hidden bg-stone-100">
                          {rp.hasPhotography ? (
                            <>
                              <Image
                                src={galleryByProduct[rp.slug][0]}
                                alt={rp.name}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-colors duration-300" />
                            </>
                          ) : (
                            <ProductImagePlaceholder compact />
                          )}
                        </div>
                        <CardContent>
                          <Badge variant="gold" className="mb-2">{rp.category}</Badge>
                          <h3 className="font-semibold text-primary font-[family-name:var(--font-display)] group-hover:text-gold transition-colors">{rp.name}</h3>
                          <p className="mt-1 text-sm text-ink-muted line-clamp-2">{rp.shortDescription}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
