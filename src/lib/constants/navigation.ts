export const navigation = [
  { name: "Home", key: "home", href: "/" },
  { name: "About", key: "about", href: "/about" },
  {
    name: "Products",
    key: "products",
    href: "/products",
    children: [
      { name: "Garlic Flakes", href: "/products/dehydrated-garlic-flakes" },
      { name: "Garlic Chopped", href: "/products/dehydrated-garlic-chopped" },
      { name: "Garlic Minced", href: "/products/dehydrated-garlic-minced" },
      { name: "Garlic Granules", href: "/products/dehydrated-garlic-granules" },
      { name: "Garlic Powder", href: "/products/dehydrated-garlic-powder" },
    ],
  },
  // { name: "Certificates", key: "certificates", href: "/certificates" }, // hidden for now — re-enable later
  { name: "Contact", key: "contact", href: "/contact" },
] as const;

export const companyInfo = {
  name: "Ocean Crest Exports",
  parentCompany: "Sheth & Bhatt's LLP",
  tagline: "Your Verified Partner for Indian Commodities",
  phone: "+91 92748 11041",
  email: "priyam.sheth@ocexports.com",
  whatsapp: "919274811041",
  address: {
    street: "C 802 Zodiac Aarish, Opp. Sundervan Epitome, Besides Ratnamani Party Plot, Jodhpur",
    city: "Ahmedabad",
    state: "Gujarat",
    zip: "380015",
    country: "India",
  },
  social: {
    facebook: "https://facebook.com/oceancrest",
    linkedin: "https://linkedin.com/company/oceancrest",
  },
  registration: {
    gstin: "24AFXFS5993L1ZS",
    udyam: "UDYAM-GJ-01-0645893",
    iec: "AFXFS5993L",
  },
  stats: {
    countries: 0,
    products: 0,
    years: 0,
    clients: 0,
  },
} as const;
