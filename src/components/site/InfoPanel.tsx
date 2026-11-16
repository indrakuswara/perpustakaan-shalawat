import { formatTanggalID } from "@/lib/format-date";
import type { ContentRow } from "@/lib/db-types";

const TYPE_LABEL = { SHALAWAT: "Shalawat", MAULID: "Maulid" } as const;

// Panel info halaman baca (spec 8.5): Kategori, Jumlah bait (hanya bila
// artikel punya blocks), Tanggal terbit (baris disembunyikan bila null).
// Jumlah bait menghitung TOTAL unit di semua section (spec 8.5): unit
// teks-pengantar ikut dihitung di baris ini, walau bukan bait dan tidak
// dihitung dalam penomoran maupun TOC (spec 8.4).
export default function InfoPanel({
  article,
  totalUnits,
}: {
  article: ContentRow;
  totalUnits: number;
}) {
  const published = formatTanggalID(article.publishedAt);
  const hasBlocks = article.blocks !== null;
  return (
    <section
      aria-label="Tentang bacaan ini"
      className="rounded-2xl border border-line bg-panel p-5"
    >
      <h2 className="font-display text-lg text-ink">Tentang bacaan ini</h2>
      <dl className="mt-3 space-y-2 text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-muted">Kategori</dt>
          <dd className="font-medium text-ink">{TYPE_LABEL[article.type]}</dd>
        </div>
        {hasBlocks && (
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted">Jumlah bait</dt>
            <dd className="font-medium text-ink">{totalUnits}</dd>
          </div>
        )}
        {published && (
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted">Tanggal terbit</dt>
            <dd className="font-medium text-ink">{published}</dd>
          </div>
        )}
      </dl>
    </section>
  );
}
