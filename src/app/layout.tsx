import type { Metadata, Viewport } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { StructuredData, organizationSchema } from "@/components/seo/StructuredData";
import { siteUrl, siteName, defaultOgImage } from "@/lib/seo/site";
import { DeferredOverlays } from "@/components/layout/DeferredOverlays";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "600", "700"],
});

// Montserrat covers latin + latin-ext; Hindi/Arabic/Urdu locales fall back to
// the system stack until we ship dedicated Devanagari/Arabic font families.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const defaultTitle = "Ocean Crest — Premium Spice Exports from India";
const defaultDescription =
  "Ocean Crest Exports is a verified Indian exporter of dehydrated garlic, premium spices, grains, and seeds. Quality-certified, FSSAI/APEDA registered, serving B2B buyers in 25+ countries.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Ocean Crest Exports",
  },
  description: defaultDescription,
  applicationName: siteName,
  keywords: [
    "dehydrated garlic exporter",
    "garlic powder wholesale",
    "garlic flakes supplier",
    "Indian spice exporter",
    "bulk spice supplier",
    "dehydrated vegetables India",
    "FSSAI certified spice exporter",
    "APEDA registered exporter",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Ocean Crest Exports — Premium Indian spice and dehydrated vegetable supplier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a3a4a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:text-white focus:px-4 focus:py-2 focus:rounded-[var(--radius-sm)] focus:text-sm focus:font-medium">
          Skip to main content
        </a>
        <LanguageProvider>
          <StructuredData data={organizationSchema} />
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <DeferredOverlays />
        </LanguageProvider>
      </body>
    </html>
  );
}
