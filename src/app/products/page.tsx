import type { Metadata } from "next";
import { ProductsContent } from "./ProductsContent.client";

const productsDescription =
  "Browse Ocean Crest's export range: dehydrated garlic and white onion, turmeric and ginger powder, Byadgi and Kashmiri red chilli, ajwain, kasuri methi, tamarind, ashwagandha, moringa, amla, isabgol (psyllium) and food-grade guar gum for global B2B buyers. FSSAI and APEDA certified.";

export const metadata: Metadata = {
  title: "Products — Dehydrated Vegetables, Indian Spices & Herbal Ingredients",
  description: productsDescription,
  alternates: { canonical: "/products" },
  openGraph: {
    type: "website",
    title: "Ocean Crest Products — Dehydrated Vegetables, Indian Spices & Herbal Ingredients",
    description: productsDescription,
    url: "/products",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocean Crest Products — Dehydrated Vegetables, Indian Spices & Herbal Ingredients",
    description: productsDescription,
  },
};

export default function ProductsPage() {
  return <ProductsContent />;
}
