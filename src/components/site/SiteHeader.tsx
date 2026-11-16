"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandMark from "./BrandMark";

const NAV = [
  { label: "Beranda", href: "/" },
  { label: "Shalawat", href: "/shalawat" },
  { label: "Maulid", href: "/maulid" },
];

function isActiveLink(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Route-aware header (spec section 6.1): absolute over the dark hero
// on the homepage, static with a light background everywhere else.
// The nav links stay plain server-rendered links; only the variant
// switch and the mobile menu need the client pathname.
export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  const linkClass = (href: string) => {
    const active = isActiveLink(pathname, href);
    if (isHome) {
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
        isHome
          ? "absolute inset-x-0 top-0 z-20"
          : "static border-b border-line bg-bg"
      }
    >
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" aria-label="Perpustakaan Shalawat">
            <BrandMark variant={isHome ? "dark" : "light"} />
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
                aria-current={isActiveLink(pathname, n.href) ? "page" : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className={
              isHome
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
              isHome
                ? "mb-4 flex flex-col gap-0.5 rounded-2xl border border-gold/35 bg-emerald-950 p-2.5 md:hidden"
                : "mb-4 flex flex-col gap-0.5 rounded-2xl border border-line bg-card p-2.5 md:hidden"
            }
          >
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={linkClass(n.href)}
                aria-current={isActiveLink(pathname, n.href) ? "page" : undefined}
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
