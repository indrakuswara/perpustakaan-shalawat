import type { ArticleBlocks, ArticleUnit, ContentRow } from "@/lib/db-types";
import { sectionAnchorIds } from "@/lib/db-types";
import { buildTocItems } from "@/lib/toc";
import { formatUnitForCopy } from "@/lib/unit-copy";
import { SITE_URL } from "@/lib/site-url";
import TocDropdown, { TocListItems } from "./TocDropdown";
import CopyButton from "./CopyButton";
import InfoPanel from "./InfoPanel";
import RelatedArticles from "./RelatedArticles";
import ShareButton from "./ShareButton";
import PrintButton from "./PrintButton";

// Halaman baca 3 kolom (spec 8): kiri Daftar Isi (sticky), tengah kartu
// bait, kanan panel info + Share/Unduh + Baca Juga (sticky, scroll
// internal). Container max-w-7xl dengan padding 20px; grid
// 224px minmax(0,1fr) 304px, gap 26px, 3 kolom di atas lg (1024px).
// Di bawah lg satu kolom: TOC paling atas (order -1), panel kanan
// paling bawah (order 3).
//
// Panel TOC disembunyikan bila tidak ada item: kind "none" (tepat 1
// item) sudah mengembalikan items kosong dari buildTocItems, dan
// artikel dengan blocks tapi NOL unit Arab juga menghasilkan items
// kosong (kind "bait", review Task 3) — keduanya ditangkap cek
// items.length === 0 di sini.
//
// `article`/`related` opsional supaya pratinjau admin tetap bisa memakai
// komponen ini hanya dengan blocks (tanpa panel kanan). `body` dipakai
// untuk artikel lama tanpa blocks: teks polos, tanpa kartu dan tanpa TOC.
export default function ReaderView({
  blocks,
  article,
  related,
  body,
}: {
  blocks: ArticleBlocks | null;
  article?: ContentRow;
  related?: ContentRow[];
  body?: string;
}) {
  const toc = blocks ? buildTocItems(blocks) : { kind: "none" as const, items: [] };
  const showToc = toc.items.length > 0;
  const showRight = !!article;
  const anchorIds = blocks ? sectionAnchorIds(blocks) : [];
  // "Jumlah bait" di InfoPanel menghitung TOTAL unit di semua section
  // (spec 8.5), bukan hanya unit ber-Arab: unit teks-pengantar ikut
  // dihitung di baris itu, walau bukan bait dan tidak dihitung dalam
  // penomoran maupun TOC (spec 8.4).
  const totalUnits = blocks
    ? blocks.sections.reduce((n, s) => n + s.units.length, 0)
    : 0;

  const gridCols =
    showToc && showRight
      ? "lg:grid-cols-[224px_minmax(0,1fr)_304px]"
      : showToc
        ? "lg:grid-cols-[224px_minmax(0,1fr)]"
        : showRight
          ? "lg:grid-cols-[minmax(0,1fr)_304px]"
          : "";

  // Offset penomoran bait per section: nomor bait global (1-based,
  // hanya unit ber-Arab) berlanjut lintas section, jadi tiap section
  // mulai dari jumlah unit Arab di semua section sebelumnya.
  const baitOffsets: number[] = [];
  if (blocks) {
    let n = 0;
    for (const s of blocks.sections) {
      baitOffsets.push(n);
      n += s.units.filter((u) => u.arab).length;
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-10 md:pb-14">
      <div
        data-testid="reading-grid"
        className={`grid items-start gap-[26px] ${gridCols}`}
      >
        {showToc && (
          <div className="-order-1 lg:order-none">
            <div className="hidden lg:sticky lg:top-5 lg:block">
              <nav aria-label="Daftar isi">
                <p className="text-sm font-semibold tracking-wide text-label uppercase">
                  Daftar isi
                </p>
                <ol className="mt-3 space-y-2">
                  <TocListItems
                    items={toc.items}
                    kind={toc.kind === "bagian" ? "bagian" : "bait"}
                  />
                </ol>
              </nav>
            </div>
            <TocDropdown
              items={toc.items}
              kind={toc.kind === "bagian" ? "bagian" : "bait"}
            />
          </div>
        )}

        <div className="min-w-0">
          {blocks ? (
            blocks.sections.map((section, sectionIndex) => (
              <section
                key={section.id}
                id={anchorIds[sectionIndex]}
                className={sectionIndex > 0 ? "mt-14" : undefined}
              >
                <h2 className="text-center font-display text-2xl text-ink">
                  {section.title}
                </h2>
                <div className="mt-8 space-y-6">
                  <BaitList units={section.units} startAt={baitOffsets[sectionIndex]} />
                </div>
              </section>
            ))
          ) : (
            <div className="font-serif text-lg leading-loose whitespace-pre-wrap text-ink">
              {body ?? ""}
            </div>
          )}
        </div>

        {showRight && article && (
          <div className="order-3 lg:order-none">
            <div className="space-y-6 lg:sticky lg:top-5 lg:max-h-[calc(100vh-40px)] lg:overflow-y-auto lg:pr-1">
              <InfoPanel article={article} totalUnits={totalUnits} />
              <div className="hidden flex-wrap gap-3 lg:flex">
                <ShareButton
                  title={article.title}
                  url={`${SITE_URL}/baca/${article.slug}`}
                />
                <PrintButton slug={article.slug} />
              </div>
              <RelatedArticles articles={related ?? []} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Daftar unit satu bagian. Penomoran bait global (1-based, hanya unit
// ber-Arab, urut section/unit) dihitung di sini supaya kartu, anchor,
// dan TOC memakai nomor yang sama; `startAt` adalah jumlah unit Arab
// di semua section sebelumnya.
function BaitList({ units, startAt }: { units: ArticleUnit[]; startAt: number }) {
  let baitNumber = startAt;
  return (
    <>
      {units.map((unit) => {
        if (!unit.arab) {
          return <ProseUnit key={unit.id} unit={unit} />;
        }
        baitNumber += 1;
        return <BaitCard key={unit.id} unit={unit} number={baitNumber} />;
      })}
    </>
  );
}

// Kartu satu bait (spec 8.4): kartu putih, bar gradien 4px di atas,
// lingkaran bernomor sebagai satu-satunya penanda nomor (tanpa teks
// "BAIT n"), lapis Arab/Latin/Terjemahan/English dengan label 11px,
// lapis kosong tidak dirender, tombol salin per kartu.
function BaitCard({ unit, number }: { unit: ArticleUnit; number: number }) {
  return (
    <article
      id={`bait-${number}`}
      className="overflow-hidden rounded-2xl border border-line bg-card shadow-sm"
    >
      <div
        aria-hidden
        className="h-1 bg-gradient-to-r from-emerald-900 to-gold"
      />
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <span
            aria-hidden
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold font-sans text-[15px] font-semibold text-gold-deep"
          >
            {number}
          </span>
          <CopyButton
            text={formatUnitForCopy(unit)}
            label="Salin bait ini"
          />
        </div>
        {unit.arab && (
          <Layer label="Arab">
            <p
              dir="rtl"
              lang="ar"
              className="font-arab mt-1 text-right text-[28px] leading-[2.15] text-ink md:text-[32px]"
            >
              {unit.arab}
            </p>
          </Layer>
        )}
        {unit.latin && (
          <Layer label="Latin">
            <p className="mt-1 font-serif text-[17.5px] leading-relaxed text-latin italic">
              {unit.latin}
            </p>
          </Layer>
        )}
        {unit.translation && (
          <Layer label="Terjemahan">
            <p className="mt-1 font-serif text-[17.5px] leading-relaxed text-ink">
              {unit.translation}
            </p>
          </Layer>
        )}
        {unit.english && (
          <Layer label="English">
            <p
              lang="en"
              className="mt-1 font-serif text-[17.5px] leading-relaxed text-english"
            >
              {unit.english}
            </p>
          </Layer>
        )}
        {unit.text && (
          <p className="mt-4 font-serif text-[17.5px] leading-loose text-ink">
            {unit.text}
          </p>
        )}
      </div>
    </article>
  );
}

// Unit tanpa Arab (teks saja): blok prosa tanpa nomor, tanpa anchor,
// tidak dihitung dalam penomoran bait maupun TOC (spec 8.4). Lapis
// yang ada memakai gaya lapis yang sama seperti di kartu bait.
function ProseUnit({ unit }: { unit: ArticleUnit }) {
  return (
    <div>
      {unit.latin && (
        <Layer label="Latin">
          <p className="mt-1 font-serif text-[17.5px] leading-relaxed text-latin italic">
            {unit.latin}
          </p>
        </Layer>
      )}
      {unit.translation && (
        <Layer label="Terjemahan">
          <p className="mt-1 font-serif text-[17.5px] leading-relaxed text-ink">
            {unit.translation}
          </p>
        </Layer>
      )}
      {unit.english && (
        <Layer label="English">
          <p
            lang="en"
            className="mt-1 font-serif text-[17.5px] leading-relaxed text-english"
          >
            {unit.english}
          </p>
        </Layer>
      )}
      {unit.text && (
        <p className="font-serif text-[17.5px] leading-loose text-ink">
          {unit.text}
        </p>
      )}
    </div>
  );
}

function Layer({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <p className="text-[11px] font-semibold tracking-wide text-label uppercase">
        {label}
      </p>
      {children}
    </div>
  );
}
