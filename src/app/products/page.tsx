import type { Metadata } from "next";
import { ProductsContent } from "./ProductsContent.client";

const productsDescription =
  "Browse Ocean Crest's premium dehydrated garlic range — flakes, chopped, minced, granules, and powder — plus Indian spices, grains, seeds, and dehydrated vegetables for global B2B export. FSSAI and APEDA certified.";

export const metadata: Metadata = {
  title: "Products — Dehydrated Garlic & Indian Spices",
  description: productsDescription,
  alternates: { canonical: "/products" },
  openGraph: {
    type: "website",
    title: "Ocean Crest Products — Dehydrated Garlic & Indian Spices",
    description: productsDescription,
    url: "/products",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocean Crest Products — Dehydrated Garlic & Indian Spices",
    description: productsDescription,
  },
};

export default function ProductsPage() {
  return <ProductsContent />;
}
