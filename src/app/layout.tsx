import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";
import FloatingCTA from "@/components/ui/FloatingCTA";
import AnalyticsTracker from "@/components/features/AnalyticsTracker";
import { clientConfig } from "@/config/client.config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${clientConfig.DOMAINE}`),
  title: {
    default: clientConfig.META_TITLE,
    template: `%s | ${clientConfig.NOM_ENTREPRISE}`,
  },
  description: clientConfig.META_DESCRIPTION,
  keywords: clientConfig.META_KEYWORDS.split(", "),
  authors: [{ name: clientConfig.NOM_ENTREPRISE }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: clientConfig.NOM_ENTREPRISE,
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <AnalyticsTracker />
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <FloatingCTA />
      </body>
    </html>
  );
}
