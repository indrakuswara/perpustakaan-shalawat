import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedBySlug, listPublishedContents } from "@/lib/db";
import { pickRelated } from "@/lib/related";
import { SITE_URL } from "@/lib/site-url";
import ReaderView from "@/components/site/ReaderView";
import ShareButton from "@/components/site/ShareButton";
import PrintButton from "@/components/site/PrintButton";
import { SetReadingNavSection } from "@/components/site/ReadingNavContext";

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
  const related = pickRelated(
    await listPublishedContents(article.type),
    article.slug,
    4,
  );

  return (
    <main>
      <SetReadingNavSection type={article.type} />
      <div className="mx-auto max-w-7xl px-5 pt-10 md:pt-14">
        <nav className="text-sm text-muted" aria-label="Breadcrumb">
          <Link href="/" className="transition hover:text-ink">
            Beranda
          </Link>
          <span aria-hidden className="mx-2">
            /
          </span>
          <Link
            href={TYPE_HREF[article.type]}
            className="transition hover:text-ink"
          >
            {TYPE_LABEL[article.type]}
          </Link>
        </nav>

        <h1 className="mt-2 font-display text-[36px] leading-tight text-ink md:text-[44px]">
          {article.title}
        </h1>
        {article.description && (
          <p className="mt-4 font-serif text-lg text-muted italic md:text-justify">
            {article.description}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3 lg:hidden">
          <ShareButton
            title={article.title}
            url={`${SITE_URL}/baca/${article.slug}`}
          />
          <PrintButton slug={article.slug} />
        </div>
      </div>

      <div className="mt-8">
        <ReaderView
          blocks={article.blocks}
          article={article}
          related={related}
          body={article.body}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-10 md:pb-14">
        <div className="flex flex-wrap gap-3">
          <Link
            href={TYPE_HREF[article.type]}
            className="rounded-xl border border-line bg-card px-4 py-2 text-sm font-medium text-ink transition hover:bg-panel"
          >
            ← {TYPE_LABEL[article.type]} lainnya
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-line bg-card px-4 py-2 text-sm font-medium text-ink transition hover:bg-panel"
          >
            Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
