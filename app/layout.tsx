import type { Metadata, Viewport } from "next";
import { Amiri, Aref_Ruqaa, Cairo, Cormorant_Garamond, Great_Vibes, Montserrat } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const ruqaa = Aref_Ruqaa({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-ruqaa",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-label",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const siteUrl = "https://omarapdelgwad44.github.io";
const ogImage = `${siteUrl}/og-invite.jpg`;
const siteTitle = "عمر وجنى | دعوة الخطوبة";
const siteDescription =
  "دعوة لحضور حفل خطوبة عمر وجنى في الثامن من أكتوبر ٢٠٢٦ بنادي نقابة المهندسين، المعادي.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: "Omar & Jana",
  authors: [{ name: "Omar & Jana" }],
  keywords: ["خطوبة", "عمر", "جنى", "دعوة"],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Omar & Jana",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "دعوة خطوبة عمر وجنى — Omar & Jana engagement invitation",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#fdfaf4",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const publicBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${amiri.variable} ${ruqaa.variable} ${cairo.variable} ${cormorant.variable} ${script.variable} ${montserrat.variable} antialiased`}
      style={{
        ["--floral-wallpaper" as string]: `url("${publicBase}/invite/floral-wallpaper.png")`,
      }}
    >
      <body>{children}</body>
    </html>
  );
}
