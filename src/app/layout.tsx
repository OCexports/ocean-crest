import type { Metadata } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { StructuredData, organizationSchema } from "@/components/seo/StructuredData";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Ocean Crest — Premium Spice Exports from India",
    template: "%s | Ocean Crest Exports",
  },
  description:
    "Ocean Crest is a leading exporter of premium Indian spices, grains, seeds, and dehydrated vegetables. Quality certified, serving 25+ countries worldwide.",
  keywords: [
    "dehydrated garlic exporter",
    "garlic powder wholesale",
    "garlic flakes supplier",
    "dehydrated onion powder",
    "Indian spice exporter",
    "bulk spice supplier",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ocean Crest Exports",
  },
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
          <WhatsAppFab />
        </LanguageProvider>
      </body>
    </html>
  );
}
