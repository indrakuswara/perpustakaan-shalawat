import Link from "next/link";

export default function NotFoundContent() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20 text-center md:py-28">
      <h1 className="font-display text-3xl font-semibold text-ink">
        Halaman tidak ditemukan
      </h1>
      <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
        Maaf, halaman yang kamu cari tidak ada atau sudah dihapus.
        Periksa kembali alamatnya, atau cari dari beranda.
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
          className="rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-panel"
        >
          Cari bacaan
        </Link>
      </div>
    </main>
  );
}
