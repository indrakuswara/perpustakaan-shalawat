"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandMark from "./BrandMark";
import { useReadingNav } from "./ReadingNavContext";

const NAV = [
  { label: "Beranda", href: "/" },
  { label: "Shalawat", href: "/shalawat" },
  { label: "Maulid", href: "/maulid" },
];

function isActiveLink(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Varian header adalah PROP, bukan hasil baca usePathname (spec 6.1).
// Alasan: saat prerender di build Vercel, usePathname() di client
// component ini mengembalikan null/bukan "/" untuk homepage, sehingga
// `isHome` terpanggang false ke HTML + flight data dan homepage live
// tersaji dengan header static terang padahal spec mewajibkan absolute
// di atas hero gelap. Build lokal kebetulan mengembalikan "/" — bug
// yang hanya muncul di Vercel, bukan fluke. Layout route group
// (site)/layout.tsx memasang variant="light", (home)/layout.tsx
// variant="dark", jadi varian terpanggang dari struktur route, bukan
// dari runtime pathname. usePathname() di sini hanya untuk penanda
// link aktif — itu self-correcting (hydration / client-nav
// memperbaikinya) dan tidak mengubah kelas posisi/background.
//
// activeHref ada karena alasan yang sama, untuk kasus route root:
// usePathname() untuk "/" terpanggang kosong di build Vercel, sehingga
// `isActiveLink(pathname, "/")` (= pathname === "/") false dan Beranda
// tidak aktif di homepage live — padahal 10 detik retry Playwright
// selalu tidak aktif, navigasi client-side ke "/" memperbaikinya, dan
// full reload merusaknya lagi. (home) memasang activeHref="/" supaya
// Beranda aktif terpanggang dari struktur route; (site) tidak memasang
// activeHref dan mengandalkan usePathname/context, yang terbukti jalan
// di /shalawat, /maulid, dan halaman baca.
export default function SiteHeader({
  variant,
  activeHref,
}: {
  variant: "dark" | "light";
  activeHref?: string | null;
}) {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const isDark = variant === "dark";
  // Override halaman baca (spec 6.2, Task 8): pathname /baca/<slug>
  // tidak menandai tautan apa pun, jadi kategori artikel yang dipasang
  // halaman baca lewat context yang dipakai sebagai penanda aktif.
  // Route lain tidak pernah mengisi context ini: logika pathname di
  // bawah tidak berubah untuk mereka.
  const { activeType } = useReadingNav();
  const activeOverride =
    activeType === "SHALAWAT"
      ? "/shalawat"
      : activeType === "MAULID"
        ? "/maulid"
        : null;
  const isActive = (href: string) =>
    activeHref !== undefined
      ? href === activeHref
      : activeOverride
        ? href === activeOverride
        : isActiveLink(pathname, href);

  const linkClass = (href: string) => {
    const active = isActive(href);
    if (isDark) {
      return active
        ? "rounded-full px-3 py-2 text-sm font-medium text-gold-soft underline decoration-gold decoration-2 underline-offset-8"
        : "rounded-full px-3 py-2 text-sm font-medium text-on-dark transition hover:text-gold-soft";
    }
    return active
      ? "rounded-full bg-panel px-3 py-2 text-sm font-medium text-emerald-900"
      : "rounded-full px-3 py-2 text-sm font-medium text-muted transition hover:bg-panel hover:text-ink";
  };

  return (
    <header
      className={
        isDark
          ? "absolute inset-x-0 top-0 z-20"
          : "static border-b border-line bg-bg"
      }
    >
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" aria-label="Perpustakaan Shalawat">
            <BrandMark variant={isDark ? "dark" : "light"} />
          </Link>
          <nav
            className="hidden items-center gap-0.5 sm:gap-1 md:flex"
            aria-label="Navigasi utama"
          >
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={linkClass(n.href)}
                aria-current={isActive(n.href) ? "page" : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className={
              isDark
                ? "inline-flex h-11 w-11 items-center justify-center rounded-xl text-on-dark transition hover:text-gold-soft md:hidden"
                : "inline-flex h-11 w-11 items-center justify-center rounded-xl text-ink transition hover:bg-panel md:hidden"
            }
            aria-label="Buka menu navigasi"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
        {open && (
          <nav
            id="mobile-nav"
            aria-label="Navigasi seluler"
            className={
              isDark
                ? "mb-4 flex flex-col gap-0.5 rounded-2xl border border-gold/35 bg-emerald-950 p-2.5 md:hidden"
                : "mb-4 flex flex-col gap-0.5 rounded-2xl border border-line bg-card p-2.5 md:hidden"
            }
          >
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={linkClass(n.href)}
                aria-current={isActive(n.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
