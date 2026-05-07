export type Product = {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  image: string;
  /** True when final photography is wired up. False → render placeholder card. */
  hasPhotography: boolean;
  shortDescription: string;
  description: string;
  origin: string;
  /** Short scannable spec, e.g. "8–15 mm" or "80+ mesh". Shown as a chip on cards & detail pages. */
  meshBadge?: string;
  /** Concrete use cases — rendered as a tagged list, not buried in a table. */
  bestFor?: string[];
  /** Value-prop differentiator — rendered as a copper-accent callout. */
  institutionalNote?: string;
  /** Optional product motion clip. Plays on card hover and as the first gallery slide. */
  video?: string;
  features: string[];
  specifications: Record<string, string>;
};

export const categories = [
  { name: "All", slug: "all" },
  { name: "Dehydrated", slug: "dehydrated" },
] as const;

export const products: Product[] = [
  {
    slug: "dehydrated-garlic-flakes",
    name: "Dehydrated Garlic Flakes",
    category: "Dehydrated",
    categorySlug: "dehydrated",
    hasPhotography: true,
    image: "/images/products/garlic/flakes-1.webp",
    video: "/videos/products/garlic/flakes.mp4",
    meshBadge: "8–15 mm",
    shortDescription:
      "The closest form to fresh garlic — premium 8–15 mm flakes processed from selected Indian crops.",
    description:
      "Our premium flakes are the closest form to fresh garlic, meticulously processed from selected Indian crops to maintain their robust aroma and strong flavor profile.",
    origin: "India",
    bestFor: [
      "Retail grinder packs",
      "Pickles",
      "Ready-to-eat meals",
      "Base for further processing",
    ],
    institutionalNote:
      "These “cloves” offer maximum flavor retention and a high-impact visual presence in gourmet products.",
    features: [
      "Standard size: 8 mm to 15 mm",
      "Color: Snow white to light creamy",
      "Moisture: Max 6%",
      "Maximum flavor retention",
      "Lab tested for purity and safety",
      "Export-grade industrial packaging",
    ],
    specifications: {
      Product: "Dehydrated Garlic Flakes",
      Origin: "India",
      "Standard Size": "8 mm – 15 mm",
      Color: "Snow White to Light Creamy",
      Moisture: "Max 6%",
      Packaging: "Export-grade, moisture-resistant",
      "Lab Testing": "Accredited laboratory verified",
    },
  },
  {
    slug: "dehydrated-garlic-chopped",
    name: "Dehydrated Garlic Chopped",
    category: "Dehydrated",
    categorySlug: "dehydrated",
    hasPhotography: true,
    image: "/images/products/garlic/chopped-2.webp",
    video: "/videos/products/garlic/chopped.mp4",
    meshBadge: "3–5 mm · 8–20 mesh",
    shortDescription:
      "Chunky 3–5 mm chopped garlic for applications where garlic needs to be both tasted and seen.",
    description:
      "Ocean Crest Chopped Garlic provides a chunky texture and bold flavor bursts. Designed for applications where garlic needs to be both tasted and seen.",
    origin: "India",
    bestFor: [
      "Pizza toppings",
      "Salad dressings",
      "Dry rubs",
      "Rustic breads",
    ],
    institutionalNote:
      "The larger surface area allows for controlled flavor release during cooking processes.",
    features: [
      "Standard size: 3 mm to 5 mm",
      "Mesh equivalent: ~8 – 20 mesh",
      "Color: Off-white to pale yellow",
      "Controlled flavor release during cooking",
      "Lab tested for purity and safety",
      "Export-grade industrial packaging",
    ],
    specifications: {
      Product: "Dehydrated Garlic Chopped",
      Origin: "India",
      "Standard Size": "3 mm – 5 mm",
      "Mesh Equivalent": "~8 – 20 Mesh",
      Color: "Off-White to Pale Yellow",
      Packaging: "Export-grade, moisture-resistant",
      "Lab Testing": "Accredited laboratory verified",
    },
  },
  {
    slug: "dehydrated-garlic-minced",
    name: "Dehydrated Garlic Minced",
    category: "Dehydrated",
    categorySlug: "dehydrated",
    hasPhotography: true,
    image: "/images/products/garlic/minced-1.webp",
    video: "/videos/products/garlic/minced.mp4",
    meshBadge: "1–3 mm · 20–40 mesh",
    shortDescription:
      "Uniformly cut 1–3 mm minced garlic — a cost-effective replacement for fresh minced in high-speed production lines.",
    description:
      "Our Minced Garlic is uniformly cut and gently dehydrated — a cost-effective, efficient replacement for fresh minced garlic in high-speed food production lines.",
    origin: "India",
    bestFor: [
      "Instant noodles",
      "Sauces & gravies",
      "Meat products",
      "Bottled condiments",
    ],
    institutionalNote:
      "Offers rapid rehydration while maintaining a consistent “bite” in liquid food systems.",
    features: [
      "Standard size: 1 mm to 3 mm",
      "Mesh equivalent: ~20 – 40 mesh",
      "Color: Light cream to off-white",
      "Rapid rehydration with consistent bite",
      "Cost-effective replacement for fresh minced",
      "Lab tested for purity and safety",
    ],
    specifications: {
      Product: "Dehydrated Garlic Minced",
      Origin: "India",
      "Standard Size": "1 mm – 3 mm",
      "Mesh Equivalent": "~20 – 40 Mesh",
      Color: "Light Cream to Off-White",
      Packaging: "Export-grade, moisture-resistant",
      "Lab Testing": "Accredited laboratory verified",
    },
  },
  {
    slug: "dehydrated-garlic-granules",
    name: "Dehydrated Garlic Granules",
    category: "Dehydrated",
    categorySlug: "dehydrated",
    hasPhotography: true,
    image: "/images/products/garlic/granules-1.webp",
    video: "/videos/products/garlic/granules.mp4",
    meshBadge: "0.5–1 mm · 40–80 mesh",
    shortDescription:
      "Sandy, consistent 0.5–1 mm granules — the bridge between minced and powder, ideal for spice blends and dry marinades.",
    description:
      "Ocean Crest Granules are the bridge between minced garlic and fine powder, providing a sandy, consistent texture that blends seamlessly with other dry ingredients.",
    origin: "India",
    bestFor: [
      "Seasoned salts",
      "Spice blends",
      "Dry marinades",
      "Snack coatings",
    ],
    institutionalNote:
      "Ideal for manufacturers who require even distribution without the clumping associated with fine powders.",
    features: [
      "Standard size: 0.5 mm to 1 mm",
      "Mesh range: 40 – 80 mesh",
      "Uniform off-white color",
      "Even distribution without clumping",
      "Lab tested for purity and safety",
      "Export-grade industrial packaging",
    ],
    specifications: {
      Product: "Dehydrated Garlic Granules",
      Origin: "India",
      "Standard Size": "0.5 mm – 1 mm",
      "Mesh Range": "40 – 80 Mesh",
      Color: "Uniform Off-White",
      Packaging: "Export-grade, moisture-resistant",
      "Lab Testing": "Accredited laboratory verified",
    },
  },
  {
    slug: "dehydrated-garlic-powder",
    name: "Dehydrated Garlic Powder",
    category: "Dehydrated",
    categorySlug: "dehydrated",
    hasPhotography: true,
    image: "/images/products/garlic/powder-1.webp",
    video: "/videos/products/garlic/powder.mp4",
    meshBadge: "80–100+ mesh",
    shortDescription:
      "Ultra-fine pulverized garlic powder — engineered for instant dissolution and intense flavor.",
    description:
      "Our garlic powder is “pulverized” to an ultra-fine finish, engineered for instant dissolution and an immediate, intense flavor punch.",
    origin: "India",
    bestFor: [
      "Batters",
      "Instant soups",
      "Baby food",
      "High-intensity seasoning dust",
    ],
    institutionalNote:
      "Our pulverizing process ensures the powder remains free of foreign matter and maintains high essential oil content.",
    features: [
      "Mesh size: 80 to 100+ mesh",
      "Texture: Fine, free-flowing dust",
      "Color: Pristine snow white to pale yellow",
      "High essential oil content",
      "Free of foreign matter",
      "Lab tested for purity and safety",
    ],
    specifications: {
      Product: "Dehydrated Garlic Powder",
      Origin: "India",
      "Mesh Size": "80 – 100+ Mesh",
      Texture: "Fine, free-flowing dust",
      Color: "Pristine Snow White to Pale Yellow",
      Packaging: "Export-grade, moisture-resistant",
      "Lab Testing": "Accredited laboratory verified",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === "all") return products;
  return products.filter((p) => p.categorySlug === categorySlug);
}
