import Link from "next/link";
import type { ContentRow } from "@/lib/db";

const TYPE_LABEL = { SHALAWAT: "Shalawat", MAULID: "Maulid" } as const;

export default function ArticleCard({ article }: { article: ContentRow }) {
  return (
    <Link
      href={`/baca/${article.slug}`}
      className="group flex flex-col rounded-2xl border border-line bg-card p-6 transition hover:-translate-y-0.5 hover:border-emerald-800/30 hover:shadow-lg"
    >
      <span className="w-fit rounded-full bg-emerald-900/10 px-2.5 py-1 text-xs font-medium text-emerald-900">
        {TYPE_LABEL[article.type]}
      </span>
      <h3 className="mt-3 font-display text-xl leading-snug text-ink group-hover:text-emerald-950">
        {article.title}
      </h3>
      {article.description && (
        <p className="mt-2 line-clamp-2 font-serif text-sm leading-relaxed text-muted">
          {article.description}
        </p>
      )}
      <span className="mt-4 text-sm font-medium text-emerald-800 group-hover:text-gold-deep group-hover:underline">
        Baca selengkapnya
      </span>
    </Link>
  );
}
