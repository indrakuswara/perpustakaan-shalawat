import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-emerald-950">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-10 text-center">
        <p className="text-sm text-on-dark">
          Perpustakaan digital shalawat dan maulid untuk dibaca dan
          diamalkan.
        </p>
        <nav className="flex gap-4 text-sm" aria-label="Navigasi footer">
          <Link
            href="/shalawat"
            className="text-on-dark-muted transition hover:text-on-dark"
          >
            Shalawat
          </Link>
          <Link
            href="/maulid"
            className="text-on-dark-muted transition hover:text-on-dark"
          >
            Maulid
          </Link>
        </nav>
      </div>
    </footer>
  );
}
