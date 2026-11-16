import Link from "next/link";
import type { ContentRow } from "@/lib/db-types";

const TYPE_LABEL = { SHALAWAT: "Shalawat", MAULID: "Maulid" } as const;

// Panel "Baca Juga" halaman baca (spec 8.6): daftar vertikal artikel
// se-kategori (tanpa isi silang kategori), thumbnail kotak warna
// kategori tanpa huruf Arab, panah --gold-deep. Tidak dirender sama
// sekali bila daftarnya kosong.
export default function RelatedArticles({
  articles,
}: {
  articles: ContentRow[];
}) {
  if (articles.length === 0) return null;
  return (
    <aside
      aria-label="Baca juga"
      className="rounded-2xl border border-line bg-panel p-5"
    >
      <h2 className="font-display text-lg text-ink">Baca juga</h2>
      <ul className="mt-4 space-y-4">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/baca/${a.slug}`}
              className="group flex items-center gap-3"
            >
              <span
                aria-hidden
                className={`h-12 w-12 shrink-0 rounded-lg ${
                  a.type === "SHALAWAT" ? "bg-emerald-900" : "bg-emas-tua"
                }`}
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-[15px] leading-snug text-ink transition group-hover:text-emerald-900">
                  {a.title}
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  {TYPE_LABEL[a.type]}
                </span>
              </span>
              <span aria-hidden className="shrink-0 text-gold-deep">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
