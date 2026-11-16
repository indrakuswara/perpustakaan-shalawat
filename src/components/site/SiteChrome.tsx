import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { ReadingNavProvider } from "@/components/site/ReadingNavContext";

// Shell layout bersama untuk semua halaman publik. Varian header
// ditentukan layout route group pemanggil: "dark" untuk homepage
// (absolute di atas hero gelap), "light" untuk halaman lain (static,
// latar terang). Varian adalah prop supaya terpanggang dari struktur
// route, bukan dari usePathname saat prerender — lihat SiteHeader.
//
// Latar halaman publik = token --bg (hijau lembut #e6f0e8) pada
// wrapper di bawah. (Catatan: fix reviewer whole-branch C1, ganti
// stone-50 dengan bg-bg, sudah mendarat di base redesign 83beb2b,
// bukan di batch ini; wrapper ini sudah bg-bg sejak base.)
// /hadroh SENGAJA di luar cakupan fix ini: halaman
// dormant (page-nya memanggil notFound()) dan tidak ditautkan dari
// mana pun, jadi latar kremnya sendiri tidak disamakan dan tidak
// dicakup test "page background token".
export default function SiteChrome({
  variant,
  activeHref,
  children,
}: {
  variant: "dark" | "light";
  activeHref?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-bg font-sans text-ink">
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-20 focus:rounded-lg focus:bg-emerald-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Lewati ke konten
      </a>
      <ReadingNavProvider>
        <SiteHeader variant={variant} activeHref={activeHref} />
        <div id="konten" className="flex-1">
          {children}
        </div>
      </ReadingNavProvider>
      <SiteFooter />
    </div>
  );
}
