import Link from "next/link";

const NAV = [
  { label: "Beranda", href: "/" },
  { label: "Shalawat", href: "/shalawat" },
  { label: "Maulid", href: "/maulid" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-stone-200/70 bg-stone-50/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-900 text-lg text-amber-100"
          >
            ✦
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-semibold text-stone-900">
              Perpustakaan Shalawat
            </span>
            <span className="hidden text-xs text-stone-600 sm:block">
              Shalawat &amp; Maulid
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-0.5 sm:gap-1" aria-label="Navigasi utama">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-lg px-2 py-2 text-[13px] font-medium text-stone-600 transition hover:bg-stone-200/60 hover:text-stone-900 sm:px-3 sm:text-sm"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
