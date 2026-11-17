export const navigation = [
  { name: "Home", key: "home", href: "/" },
  { name: "About", key: "about", href: "/about" },
  {
    name: "Products",
    key: "products",
    href: "/products",
    children: [
      { name: "Dehydrated White Onion", href: "/products/dehydrated-white-onion-flakes" },
      { name: "Dehydrated Garlic", href: "/products/dehydrated-garlic-flakes" },
      { name: "Amla Powder", href: "/products/dehydrated-amla-powder" },
      { name: "Turmeric Powder", href: "/products/dehydrated-turmeric-powder" },
      { name: "Ginger Powder", href: "/products/dehydrated-ginger-powder" },
      { name: "Red Chilli (Byadgi & Kashmiri)", href: "/products/byadgi-dried-red-chilli-crushed-flakes" },
      { name: "Ajwain (Carom)", href: "/products/ajwain-carom-seeds" },
      { name: "Kasuri Methi", href: "/products/kasuri-methi-dried-fenugreek-leaves" },
      { name: "Tamarind", href: "/products/tamarind-whole-pods-fingers" },
      { name: "Isabgol (Psyllium)", href: "/products/isabgol-whole-husk" },
      { name: "Ashwagandha", href: "/products/ashwagandha-dried-whole-roots" },
      { name: "Moringa Leaf Powder", href: "/products/moringa-leaf-powder" },
      { name: "Guar Gum Powder", href: "/products/guar-gum-powder" },
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
    street: "Zodiac Aarish, Opp. Sundervan Epitome, Besides Ratnamani Party Plot, Jodhpur",
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
