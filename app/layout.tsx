import type { Metadata, Viewport } from "next";
import { Amiri, Cairo, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
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

export const metadata: Metadata = {
  title: "عمر وجنى | دعوة الخطوبة",
  description: "دعوة لحضور حفل خطوبة عمر وجنى في التاسع من أكتوبر.",
  applicationName: "Omar & Jana",
  authors: [{ name: "Omar & Jana" }],
  keywords: ["خطوبة", "عمر", "جنى", "دعوة"],
};

export const viewport: Viewport = {
  themeColor: "#f6eee4",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${amiri.variable} ${cairo.variable} ${cormorant.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
