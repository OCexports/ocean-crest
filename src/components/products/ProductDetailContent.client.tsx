"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductImagePlaceholder } from "@/components/products/ProductImagePlaceholder";
import { companyInfo } from "@/lib/constants/navigation";
import type { Product } from "@/lib/constants/products";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface RelatedItem {
  slug: string;
  hasPhotography: boolean;
  image: string;
}

interface Props {
  product: Product;
  galleryImages: string[];
  related: RelatedItem[];
}

export function ProductDetailContent({ product, galleryImages, related }: Props) {
  const { t } = useLanguage();
  const d = t.productDetail;
  const pd = t.productData[product.slug];
  const name = pd?.name ?? product.name;
  const category = pd?.category ?? product.category;
  const meshBadge = pd?.meshBadge ?? product.meshBadge;
  const description = pd?.description ?? product.description;
  const bestFor = pd?.bestFor ?? product.bestFor ?? [];
  const institutionalNote = pd?.institutionalNote ?? product.institutionalNote;
  const features = pd?.features ?? product.features;
  const specs = pd?.specs ?? product.specifications;
  // Translated specs use translated keys; for the chips we fall back to the English
  // specifications object by position (Color is the 4th entry, Moisture the 5th when present).
  const enSpecEntries = Object.entries(product.specifications);
  const colorEn = product.specifications.Color;
  const moistureEn = product.specifications.Moisture;
  const specEntriesArr = Object.entries(specs);
  const colorIdx = enSpecEntries.findIndex(([k]) => k === "Color");
  const moistureIdx = enSpecEntries.findIndex(([k]) => k === "Moisture");
  const colorVal = colorIdx >= 0 ? specEntriesArr[colorIdx]?.[1] ?? colorEn : undefined;
  const moistureVal = moistureIdx >= 0 ? specEntriesArr[moistureIdx]?.[1] ?? moistureEn : undefined;

  const whatsappUrl = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
    `${d.whatsappPre}${name}${d.whatsappPost}`
  )}`;

  return (
    <>
      {/* Breadcrumb + Hero */}
      <section className="relative bg-primary pt-28 pb-16">
        <svg className="absolute bottom-0 left-0 w-full h-12 text-stone" viewBox="0 0 1440 48" preserveAspectRatio="none" fill="currentColor">
          <path d="M0,24 C360,48 720,0 1080,24 C1260,36 1380,36 1440,30 L1440,48 L0,48 Z" />
        </svg>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">{d.breadcrumbHome}</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">{d.breadcrumbProducts}</Link>
            <span>/</span>
            <span className="text-white">{name}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12 lg:py-20 bg-stone">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <ScrollReveal direction="left">
              <ProductGallery images={galleryImages} video={product.video} alt={name} />
            </ScrollReveal>

            <ScrollReveal direction="right">
              <Badge variant="gold" className="mb-3">{category}</Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-primary font-[family-name:var(--font-display)]">{name}</h1>

              {(meshBadge || colorVal) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {meshBadge && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold tracking-wider uppercase">
                      {meshBadge}
                    </span>
                  )}
                  {colorVal && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-stone-100 border border-edge text-ink-muted text-xs font-medium">
                      {colorVal}
                    </span>
                  )}
                  {moistureVal && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-stone-100 border border-edge text-ink-muted text-xs font-medium">
                      {d.moistureLabel}: {moistureVal}
                    </span>
                  )}
                </div>
              )}

              <p className="mt-5 text-ink-muted leading-relaxed">{description}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={`/contact?product=${product.slug}`}>
                  <Button size="lg">
                    {d.requestQuote}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="whatsapp" size="lg">
                    <MessageCircle className="w-4 h-4" />
                    {d.inquireWhatsapp}
                  </Button>
                </a>
              </div>

              {bestFor.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-xs font-medium tracking-[0.25em] uppercase text-gold mb-3">{d.idealApplications}</h2>
                  <ul className="flex flex-wrap gap-2">
                    {bestFor.map((use) => (
                      <li key={use} className="px-3 py-1.5 rounded-md bg-white border border-edge-light text-sm text-ink">
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {institutionalNote && (
                <aside className="mt-8 p-5 rounded-[var(--radius-md)] bg-white border-l-2 border-gold shadow-border">
                  <p className="text-xs font-medium tracking-[0.25em] uppercase text-gold mb-2">{d.whyThisGrade}</p>
                  <p className="text-sm text-ink leading-relaxed">{institutionalNote}</p>
                </aside>
              )}

              <div className="mt-10">
                <h2 className="text-lg font-semibold text-primary mb-4 font-[family-name:var(--font-display)]">{d.keyFeatures}</h2>
                <ul className="space-y-2.5">
                  {features.map((feature) => (
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
            <h2 className="text-2xl font-semibold text-primary font-[family-name:var(--font-display)] mb-6">{d.specifications}</h2>
            <div className="bg-white rounded-[var(--radius-md)] shadow-card overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Object.entries(specs).map(([key, value], i) => (
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
              <h2 className="text-2xl font-semibold text-primary font-[family-name:var(--font-display)] mb-8">{d.relatedProducts}</h2>
              <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
                {related.map((rp) => {
                  const rpd = t.productData[rp.slug];
                  return (
                    <StaggerItem key={rp.slug}>
                      <Link href={`/products/${rp.slug}`} className="group block">
                        <Card>
                          <div className="aspect-[4/3] relative overflow-hidden bg-stone-100">
                            {rp.hasPhotography ? (
                              <>
                                <Image
                                  src={rp.image}
                                  alt={rpd?.name ?? rp.slug}
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
                            <Badge variant="gold" className="mb-2">{rpd?.category ?? category}</Badge>
                            <h3 className="font-semibold text-primary font-[family-name:var(--font-display)] group-hover:text-gold transition-colors">{rpd?.name ?? rp.slug}</h3>
                            <p className="mt-1 text-sm text-ink-muted line-clamp-2">{rpd?.shortDescription ?? ""}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    </StaggerItem>
                  );
                })}
              </StaggerChildren>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
