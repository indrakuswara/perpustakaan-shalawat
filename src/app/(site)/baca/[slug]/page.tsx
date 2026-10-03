import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedBySlug } from "@/lib/db";
import { SITE_URL } from "@/lib/site-url";
import ReaderView from "@/components/site/ReaderView";
import ShareButton from "@/components/site/ShareButton";

const TYPE_LABEL = { SHALAWAT: "Shalawat", MAULID: "Maulid" } as const;
const TYPE_HREF = { SHALAWAT: "/shalawat", MAULID: "/maulid" } as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedBySlug(slug);
  if (!article) return { title: "Tidak ditemukan" };
  const description =
    article.description ?? article.body.slice(0, 160).replace(/\s+/g, " ");
  const url = `${SITE_URL}/baca/${article.slug}`;
  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      type: "article",
      url,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function BacaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Hanya yang PUBLISHED yang bisa dibaca — draft otomatis 404.
  const article = await getPublishedBySlug(slug);
  if (!article) notFound();

  return (
    <main className="px-4 py-10 md:py-14">
      <article className={article.blocks ? "mx-auto max-w-5xl" : "mx-auto max-w-2xl"}>
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

        <div className="mt-6">
          <ShareButton
            title={article.title}
            url={`${SITE_URL}/baca/${article.slug}`}
          />
        </div>

        <div
          aria-hidden
          className="my-8 flex items-center gap-3 text-emerald-900/50"
        >
          <span className="h-px flex-1 bg-stone-200" />
          <span>✦</span>
          <span className="h-px flex-1 bg-stone-200" />
        </div>

        {article.blocks ? (
          <ReaderView blocks={article.blocks} />
        ) : (
          <div className="font-serif text-lg leading-loose whitespace-pre-wrap text-stone-800 md:text-xl md:leading-loose md:text-justify">
            {article.body}
          </div>
        )}

        <section
          aria-label="Bagikan bacaan ini"
          className="mt-12 rounded-2xl border border-emerald-900/15 bg-emerald-50 px-6 py-8 text-center"
        >
          <h2 className="font-serif text-xl font-semibold text-emerald-950">
            Bagikan bacaan ini
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-600">
            Semoga bermanfaat. Bagikan kepada keluarga dan jamaah pengajian —
            semoga menjadi amal jariyah bersama.
          </p>
          <div className="mt-5 flex justify-center">
            <ShareButton
              title={article.title}
              url={`${SITE_URL}/baca/${article.slug}`}
            />
          </div>
        </section>

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
