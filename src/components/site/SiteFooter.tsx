import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-stone-200/70 bg-stone-100/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-10 text-center">
        <p className="text-sm text-stone-600">
          Perpustakaan digital shalawat dan maulid untuk dibaca dan
          diamalkan.
        </p>
        <nav className="flex gap-4 text-sm">
          <Link href="/shalawat" className="text-stone-600 hover:text-stone-800">
            Shalawat
          </Link>
          <Link href="/maulid" className="text-stone-600 hover:text-stone-800">
            Maulid
          </Link>
        </nav>
      </div>
    </footer>
  );
}
