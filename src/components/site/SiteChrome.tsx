import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { ReadingNavProvider } from "@/components/site/ReadingNavContext";

// Shell layout bersama untuk semua halaman publik. Varian header
// ditentukan layout route group pemanggil: "dark" untuk homepage
// (absolute di atas hero gelap), "light" untuk halaman lain (static,
// latar terang). Varian adalah prop supaya terpanggang dari struktur
// route, bukan dari usePathname saat prerender — lihat SiteHeader.
export default function SiteChrome({
  variant,
  children,
}: {
  variant: "dark" | "light";
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
        <SiteHeader variant={variant} />
        <div id="konten" className="flex-1">
          {children}
        </div>
      </ReadingNavProvider>
      <SiteFooter />
    </div>
  );
}
