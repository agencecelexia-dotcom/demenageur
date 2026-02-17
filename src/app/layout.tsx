import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://transports-boulocher.fr"),
  title: {
    default: "Transports Boulocher | Transporteur Routier Fret — Le Havre & Normandie",
    template: "%s | Transports Boulocher",
  },
  description:
    "Transports Boulocher — transporteur routier de fret depuis Le Havre depuis 1999. Transport interurbain, logistique, affrètement, transport européen. Devis sous 2h.",
  keywords: [
    "transporteur le havre",
    "transport routier normandie",
    "fret seine-maritime",
    "affrètement normandie",
    "logistique le havre",
    "transports boulocher",
  ],
  authors: [{ name: "Transports Boulocher" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Transports Boulocher",
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
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
