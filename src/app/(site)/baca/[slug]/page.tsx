import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedBySlug } from "@/lib/db";

const TYPE_LABEL = { SHALAWAT: "Shalawat", MAULID: "Maulid" } as const;
const TYPE_HREF = { SHALAWAT: "/shalawat", MAULID: "/maulid" } as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedBySlug(slug);
  if (!article) return { title: "Tidak ditemukan" };
  return {
    title: article.title,
    description:
      article.description ?? article.body.slice(0, 160).replace(/\s+/g, " "),
  };
}

export default async function BacaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Hanya yang PUBLISHED yang bisa dibaca — draft otomatis 404.
  const article = getPublishedBySlug(slug);
  if (!article) notFound();

  return (
    <main className="px-4 py-10 md:py-14">
      <article className="mx-auto max-w-2xl">
        <nav className="text-sm text-stone-600" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-stone-800">
            Beranda
          </Link>
          <span aria-hidden className="mx-2">
            /
          </span>
          <Link
            href={TYPE_HREF[article.type]}
            className="hover:text-stone-800"
          >
            {TYPE_LABEL[article.type]}
          </Link>
        </nav>

        <p className="mt-6 text-sm font-medium tracking-wide text-emerald-800 uppercase">
          {TYPE_LABEL[article.type]}
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight font-semibold text-stone-900 md:text-4xl">
          {article.title}
        </h1>
        {article.description && (
          <p className="mt-4 font-serif text-lg text-stone-600 italic">
            {article.description}
          </p>
        )}

        <div
          aria-hidden
          className="my-8 flex items-center gap-3 text-emerald-900/50"
        >
          <span className="h-px flex-1 bg-stone-200" />
          <span>✦</span>
          <span className="h-px flex-1 bg-stone-200" />
        </div>

        <div className="font-serif text-lg leading-loose whitespace-pre-wrap text-stone-800 md:text-xl md:leading-loose">
          {article.body}
        </div>

        <div
          aria-hidden
          className="my-8 flex items-center gap-3 text-emerald-900/50"
        >
          <span className="h-px flex-1 bg-stone-200" />
          <span>✦</span>
          <span className="h-px flex-1 bg-stone-200" />
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={TYPE_HREF[article.type]}
            className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
          >
            ← {TYPE_LABEL[article.type]} lainnya
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
          >
            Beranda
          </Link>
        </div>
      </article>
    </main>
  );
}
