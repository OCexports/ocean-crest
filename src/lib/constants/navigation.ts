export const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Products",
    href: "/products",
    children: [
      { name: "Garlic Flakes", href: "/products/dehydrated-garlic-flakes" },
      { name: "Garlic Chopped", href: "/products/dehydrated-garlic-chopped" },
      { name: "Garlic Minced", href: "/products/dehydrated-garlic-minced" },
      { name: "Garlic Granules", href: "/products/dehydrated-garlic-granules" },
      { name: "Garlic Powder", href: "/products/dehydrated-garlic-powder" },
    ],
  },
  { name: "Certificates", href: "/certificates" },
  { name: "Contact", href: "/contact" },
] as const;

export const companyInfo = {
  name: "Ocean Crest Exports",
  parentCompany: "Sheth & Bhatt's LLP",
  tagline: "Your Verified Partner for Indian Commodities",
  phone: "+91 92748 11041",
  email: "priyam.sheth@ocexports.com",
  whatsapp: "+919274811041",
  address: {
    street: "C 802 Zodiac Aarish, Opp. Sundervan Epitome, Besides Ratnamani Party Plot, Jodhpur",
    city: "Ahmedabad",
    state: "Gujarat",
    zip: "380015",
    country: "India",
  },
  social: {
    linkedin: "https://linkedin.com/company/oceancrest",
    facebook: "https://facebook.com/oceancrest",
    instagram: "https://instagram.com/oceancrest",
    twitter: "https://twitter.com/oceancrest",
  },
  stats: {
    countries: 0,
    products: 0,
    years: 0,
    clients: 0,
  },
} as const;
