import type { Metadata } from "next";
import { Marcellus, Public_Sans, Source_Serif_4, Amiri } from "next/font/google";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const amiri = Amiri({
  variable: "--font-arab",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Perpustakaan Digital Shalawat & Maulid",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Perpustakaan Digital Shalawat & Maulid",
  verification: {
    google: "kg6CkbauBZQYi7D1Lm0GfSzntsZKMu_813m8e3uvi64",
  },
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
      className={`${marcellus.variable} ${publicSans.variable} ${sourceSerif.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
