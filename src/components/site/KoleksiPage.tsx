import { listPublishedContents, type ContentType } from "@/lib/db";
import ArticleCard from "@/components/site/ArticleCard";

export default async function KoleksiPage({
  type,
  title,
  description,
}: {
  type: ContentType;
  title: string;
  description: string;
}) {
  const articles = await listPublishedContents(type);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <p className="text-sm font-medium tracking-wide text-emerald-800 uppercase">
        Koleksi
      </p>
      <h1 className="mt-2 font-serif text-3xl font-semibold text-stone-900 md:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-xl leading-relaxed text-stone-600">
        {description}
      </p>

      {articles.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-white/60 p-10 text-center text-sm text-stone-600">
          Belum ada {title.toLowerCase()} yang dipublish.
        </p>
      ) : (
        <>
          <p className="mt-8 text-sm text-stone-600">
            {articles.length} bacaan
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
