import Link from "next/link";

export default function NotFoundContent() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20 text-center md:py-28">
      <p
        aria-hidden
        className="font-serif text-5xl text-emerald-900/60"
        dir="rtl"
        lang="ar"
      >
        ✦
      </p>
      <h1 className="mt-6 font-serif text-3xl font-semibold text-stone-900">
        Halaman tidak ditemukan
      </h1>
      <p className="mx-auto mt-3 max-w-md leading-relaxed text-stone-600">
        Maaf, halaman yang kamu cari tidak ada atau sudah dihapus. Mungkin
        artikelnya belum dipublish.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-950"
        >
          Ke beranda
        </Link>
        <Link
          href="/search"
          className="rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
        >
          Cari bacaan
        </Link>
      </div>
    </main>
  );
}
