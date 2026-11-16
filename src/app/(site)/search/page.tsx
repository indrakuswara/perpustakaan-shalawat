import type { Metadata } from "next";
import Link from "next/link";
import { listPublishedContents, searchPublishedContents } from "@/lib/db";
import ArticleCard from "@/components/site/ArticleCard";
import SearchForm from "@/components/site/SearchForm";

export const metadata: Metadata = {
  title: "Cari",
  description: "Cari shalawat dan maulid berdasarkan judul atau isi.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  // Query kosong (spec §11.3): tampilkan SEMUA bacaan terbit,
  // terbaru dulu, bukan pesan ajakan mengetik kata kunci.
  const results = query
    ? await searchPublishedContents(query)
    : await listPublishedContents(undefined, "published");

  return (
    <main className="bg-bg mx-auto max-w-5xl px-4 py-12 md:py-16">
      <h1 className="font-display text-3xl text-ink">
        {query === "" ? "Semua bacaan" : "Pencarian"}
      </h1>
      <div className="mt-6 max-w-xl">
        <SearchForm defaultValue={query} />
      </div>

      {query === "" ? (
        // Nol bacaan terbit: panel empty state seperti KoleksiPage,
        // bukan "0 bacaan" telanjang dengan grid kosong (spec §9).
        results.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-dashed border-line bg-white/60 p-10 text-center text-sm text-muted">
            Belum ada bacaan yang dipublish.
          </p>
        ) : (
          <>
            <p className="mt-8 text-sm text-muted">
              {results.length} bacaan
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </>
        )
      ) : results.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-white/60 p-10 text-center">
          <p className="text-sm text-muted">
            Tidak ada hasil untuk “{query}”. Coba kata kunci lain.
          </p>
          <p className="mt-3 text-sm text-muted">
            Tidak ketemu?{" "}
            <Link
              href="/request-shalawat"
              className="font-medium text-emerald-900 underline decoration-gold underline-offset-2 transition hover:decoration-emerald-700"
            >
              Request shalawat
            </Link>{" "}
            atau{" "}
            <Link
              href="/request-maulid"
              className="font-medium text-emerald-900 underline decoration-gold underline-offset-2 transition hover:decoration-emerald-700"
            >
              request maulid
            </Link>
            .
          </p>
        </div>
      ) : (
        <>
          <p className="mt-8 text-sm text-muted">
            {results.length} hasil untuk “{query}”
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
