import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://translogpro.fr"),
  title: {
    default: "TransLog Pro | Déménageur Professionnel Paris & International",
    template: "%s | TransLog Pro",
  },
  description:
    "TransLog Pro — déménageur professionnel à Paris. Résidentiel, entreprise, international, garde-meuble. Assurance tous risques incluse. Devis gratuit sous 24h.",
  keywords: [
    "déménageur paris",
    "déménagement professionnel",
    "déménagement international",
    "garde-meuble paris",
    "déménagement entreprise",
    "translog pro",
  ],
  authors: [{ name: "TransLog Pro" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "TransLog Pro",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
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
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
