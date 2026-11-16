import Link from "next/link";
import { listPublishedContents, type ContentType } from "@/lib/db";
import KoleksiList from "@/components/site/KoleksiList";

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
    <main className="bg-bg mx-auto max-w-5xl px-4 py-12 md:py-16">
      <h1 className="font-display text-3xl text-ink md:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-xl leading-relaxed text-muted">
        {description}
      </p>

      {articles.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-line bg-white/60 p-10 text-center text-sm text-muted">
          Belum ada {title.toLowerCase()} yang dipublish.
        </p>
      ) : (
        <KoleksiList articles={articles} />
      )}

      <div className="mt-10 rounded-2xl border border-line bg-white/60 p-6 text-center">
        <p className="text-sm font-medium text-ink">
          Belum menemukan yang kamu cari?
        </p>
        <p className="mt-1 text-sm text-muted">Usulkan judulnya</p>
        <Link
          href={type === "SHALAWAT" ? "/request-shalawat" : "/request-maulid"}
          className="btn-outline-gold mt-4"
        >
          Request {title}
        </Link>
      </div>
    </main>
  );
}
