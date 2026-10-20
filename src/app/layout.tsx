import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { CoordinateRail } from "@/components/CoordinateRail";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Matteo Sanchez · Géomaticien",
    template: "%s · Matteo Sanchez",
  },
  description:
    "Cartographie et développement SIG : plugins QGIS, applications web et mobiles, automatisations Python et cartes d'atlas.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Matteo Sanchez · Géomaticien",
    description: "Je fais parler les données géographiques, en cartes et en outils.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-bg"
        >
          Aller au contenu
        </a>
        <SiteNav />
        <CoordinateRail />
        <main id="contenu">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
