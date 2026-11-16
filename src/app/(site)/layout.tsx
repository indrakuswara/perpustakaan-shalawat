import type { Metadata } from "next";
import SiteChrome from "@/components/site/SiteChrome";

export const metadata: Metadata = {
  title: {
    default: "Perpustakaan Digital Shalawat & Maulid",
    template: "%s | Perpustakaan Shalawat",
  },
  description:
    "Baca shalawat dan maulid gratis: Arab, Latin, terjemahan Indonesia, dan English, plus unduh PDF.",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteChrome variant="light">{children}</SiteChrome>;
}
