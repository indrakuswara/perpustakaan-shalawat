import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "Perpustakaan Digital Shalawat & Maulid",
    template: "%s | Perpustakaan Shalawat",
  },
  description:
    "Perpustakaan digital untuk membaca shalawat dan maulid secara gratis — kapan saja, di mana saja.",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-stone-900">
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-20 focus:rounded-lg focus:bg-emerald-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Lewati ke konten
      </a>
      <SiteHeader />
      <div id="konten" className="flex-1">
        {children}
      </div>
      <SiteFooter />
    </div>
  );
}
