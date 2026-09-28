import Link from "next/link";
import { listPublishedContents } from "@/lib/db";
import ArticleCard from "@/components/site/ArticleCard";
import SearchForm from "@/components/site/SearchForm";

export default async function HomePage() {
  const latest = (await listPublishedContents()).slice(0, 6);
  const shalawatCount = (await listPublishedContents("SHALAWAT")).length;
  const maulidCount = (await listPublishedContents("MAULID")).length;

  return (
    <main>
      {/* Hero */}
      <section className="px-4 pt-16 pb-12 text-center md:pt-24 md:pb-16">
        <h1 className="mx-auto max-w-2xl font-serif text-4xl leading-tight font-semibold text-stone-900 md:text-5xl">
          Perpustakaan Digital Shalawat &amp; Maulid
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-stone-600 md:text-lg">
          Kumpulan bacaan shalawat dan maulid yang bisa dibaca gratis —
          di HP, kapan saja.
        </p>
        <div className="mx-auto mt-8 max-w-xl">
          <SearchForm size="lg" />
        </div>
        <div className="mt-6 flex items-center justify-center gap-3 text-sm">
          <Link
            href="/shalawat"
            className="rounded-full border border-stone-300 bg-white px-4 py-2 font-medium text-stone-700 transition hover:border-emerald-800/40 hover:text-emerald-900"
          >
            {shalawatCount} Shalawat
          </Link>
          <Link
            href="/maulid"
            className="rounded-full border border-stone-300 bg-white px-4 py-2 font-medium text-stone-700 transition hover:border-emerald-800/40 hover:text-emerald-900"
          >
            {maulidCount} Maulid
          </Link>
        </div>
      </section>

      {/* Terbaru */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Terbaru
          </h2>
        </div>
        {latest.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center text-sm text-stone-600">
            Belum ada bacaan yang dipublish. Silakan kembali lagi nanti.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
