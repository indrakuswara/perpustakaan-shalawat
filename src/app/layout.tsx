import type { Metadata } from "next";
import { Geist, Geist_Mono, Amiri } from "next/font/google";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-arab",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Perpustakaan Digital Shalawat & Maulid",
  description:
    "Perpustakaan digital untuk membaca shalawat dan maulid secara gratis.",
  openGraph: {
    title: "Perpustakaan Digital Shalawat & Maulid",
    description:
      "Perpustakaan digital untuk membaca shalawat dan maulid secara gratis.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perpustakaan Digital Shalawat & Maulid",
    description:
      "Perpustakaan digital untuk membaca shalawat dan maulid secara gratis.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
