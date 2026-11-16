import type { Metadata } from "next";
import SiteChrome from "@/components/site/SiteChrome";

// Metadata ini mirror (site)/layout.tsx supaya judul/deskripsi
// homepage tidak berubah: homepage pindah ke route group (home)
// hanya untuk varian header dark, bukan untuk metadata berbeda.
export const metadata: Metadata = {
  title: {
    default: "Perpustakaan Digital Shalawat & Maulid",
    template: "%s | Perpustakaan Shalawat",
  },
  description:
    "Baca shalawat dan maulid gratis: Arab, Latin, terjemahan Indonesia, dan English, plus unduh PDF.",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteChrome variant="dark">{children}</SiteChrome>;
}
