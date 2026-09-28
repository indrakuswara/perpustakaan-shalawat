"use client";

import Link from "next/link";

export default function SiteError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20 text-center md:py-28">
      <h1 className="font-serif text-3xl font-semibold text-stone-900">
        Ada yang tidak beres
      </h1>
      <p className="mx-auto mt-3 max-w-md leading-relaxed text-stone-600">
        Halaman gagal dimuat. Coba muat ulang, atau kembali lagi nanti.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-950"
        >
          Coba lagi
        </button>
        <Link
          href="/"
          className="rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
        >
          Ke beranda
        </Link>
      </div>
    </main>
  );
}
