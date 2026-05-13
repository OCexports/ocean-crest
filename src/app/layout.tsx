import type { Metadata, Viewport } from "next";
import { Cormorant, Montserrat, Noto_Sans_Devanagari, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { StructuredData, organizationSchema } from "@/components/seo/StructuredData";
import { siteUrl, siteName } from "@/lib/seo/site";
import { DeferredOverlays } from "@/components/layout/DeferredOverlays";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "600", "700"],
});

// Montserrat covers latin + latin-ext.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Script-specific webfonts for the non-latin locales. `preload: false` so the
// `@font-face` is defined but the woff2 is only fetched once an element with
// the matching font-family actually renders (i.e. only on hi / ar / ur — see
// the `html[lang="…"]` rules in globals.css). CJK locales (zh/ja/ko) use the
// OS CJK font stack instead — self-hosting CJK webfonts would be multi-MB.
const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: false,
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: false,
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
    // og:image is provided by src/app/opengraph-image.tsx (file convention).
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    // twitter:image is also derived from src/app/opengraph-image.tsx.
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
  // favicon comes from src/app/favicon.ico, apple-touch from src/app/apple-icon.tsx
  // (Next.js file conventions) — no explicit `icons` needed.
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
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable} ${notoDevanagari.variable} ${notoArabic.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        {/* Set <html lang>/<html dir> from the stored locale *before* hydration
            so RTL + the script-specific font are correct on first paint (no
            flash of LTR/latin for returning ar/ur/hi/etc. visitors). The
            translated text still re-renders one tick later via LanguageProvider,
            but the layout no longer jumps. Keep this string in sync with
            STORAGE_KEY / RTL_LOCALES in LanguageContext.tsx. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var l=localStorage.getItem('ocean-crest-locale');if(l&&l!=='en'){document.documentElement.lang=l;document.documentElement.dir=(l==='ar'||l==='ur')?'rtl':'ltr';}}catch(e){}})();",
          }}
        />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:start-4 focus:z-[100] focus:bg-gold focus:text-white focus:px-4 focus:py-2 focus:rounded-[var(--radius-sm)] focus:text-sm focus:font-medium">
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
