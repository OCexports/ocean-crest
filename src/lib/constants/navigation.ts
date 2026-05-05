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
      { name: "Onion Powder", href: "/products/onion-powder" },
    ],
  },
  { name: "Certificates", href: "/certificates" },
  { name: "Contact", href: "/contact" },
] as const;

export const companyInfo = {
  name: "Ocean Crest Exports",
  parentCompany: "Sheth & Bhatt's LLP",
  tagline: "Your Verified Partner for Indian Commodities",
  phone: "+91 98765 43210",
  email: "info@oceancrestexports.com",
  whatsapp: "+919876543210",
  address: {
    street: "Office Address",
    city: "Ahmedabad",
    state: "Gujarat",
    zip: "380001",
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
