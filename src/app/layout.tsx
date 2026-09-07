import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "So Whopped FFL";

export const metadata: Metadata = {
  title: {
    default: `${siteName} — 14 Years of Fantasy Football`,
    template: `%s · ${siteName}`,
  },
  description:
    "The official home of So Whopped FFL — stats, rosters, records and 14 seasons of fantasy football history.",
  icons: { icon: "/icon.png" },
  openGraph: {
    title: siteName,
    description: "14 seasons of fantasy football. Stats, rosters, and history.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
