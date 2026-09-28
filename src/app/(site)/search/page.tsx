import type { Metadata } from "next";
import { searchPublishedContents } from "@/lib/db";
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
  const results = query ? await searchPublishedContents(query) : [];

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <h1 className="font-serif text-3xl font-semibold text-stone-900">
        Pencarian
      </h1>
      <div className="mt-6 max-w-xl">
        <SearchForm defaultValue={query} />
      </div>

      {query === "" ? (
        <p className="mt-8 text-sm text-stone-600">
          Ketik kata kunci di atas untuk mencari berdasarkan judul atau isi
          bacaan.
        </p>
      ) : results.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center text-sm text-stone-600">
          Tidak ada hasil untuk “{query}”. Coba kata kunci lain.
        </p>
      ) : (
        <>
          <p className="mt-8 text-sm text-stone-600">
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
