import type { PrintModel } from "@/lib/print-model";

// Dokumen cetak A4 (template "Kartu Terang") untuk /baca/<slug>/cetak.
// Server component murni: kepala dokumen + kartu per unit + footer cetak.
// Styling struktural cetak (.print-card, .print-footer, @page) ada di globals.css.
export default function PrintView({
  model,
  title,
  typeLabel,
  description,
  siteUrl,
}: {
  model: PrintModel;
  title: string;
  typeLabel: string;
  description: string | null;
  siteUrl: string;
}) {
  const showSectionHead = (sectionTitle: string) =>
    model.sections.length > 1 ||
    (sectionTitle.trim() !== "" && sectionTitle.trim() !== title.trim());

  return (
    <div>
      <header>
        <p className="text-[8.5pt] font-bold tracking-[0.42em] text-[#0b3d2e] uppercase">
          {typeLabel}
        </p>
        <h1 className="mt-2 font-serif text-[28pt] leading-[1.12] font-semibold text-[#14231f]">
          {title}
        </h1>
        <div className="mt-4 h-[1.6mm] w-[26mm] bg-[#cfa52f]" aria-hidden />
        {description && (
          <p className="mt-4 font-serif text-[10.5pt] leading-relaxed text-stone-600 italic md:text-justify">
            {description}
          </p>
        )}
      </header>

      {model.sections.length > 0 ? (
        model.sections.map((section, i) => (
          <section key={`${section.title}-${i}`} className={i > 0 ? "mt-9" : "mt-7"}>
            {showSectionHead(section.title) && (
              <div className="print-section-head mb-4">
                <h2 className="font-serif text-[15pt] font-semibold text-[#0b3d2e]">
                  {section.title}
                </h2>
                <div className="mt-2 h-px w-full bg-[#e7d9ae]" aria-hidden />
              </div>
            )}
            <div className="flex flex-col gap-[3.6mm]">
              {section.units.map((unit, j) => (
                <article key={j} className="print-card">
                  {unit.arab && (
                    <p
                      dir="rtl"
                      lang="ar"
                      className="font-arab text-right text-[18.5pt] leading-[1.85] text-stone-900"
                    >
                      {unit.arab}
                    </p>
                  )}
                  {unit.latin && (
                    <p className="mt-1 text-[10.5pt] text-teal-700 italic">{unit.latin}</p>
                  )}
                  {unit.translation && (
                    <p className="mt-1.5 text-[10pt] leading-relaxed text-stone-700 md:text-justify">
                      {unit.translation}
                    </p>
                  )}
                  {unit.english && (
                    <p lang="en" className="mt-1 text-[9pt] text-stone-400 italic">
                      {unit.english}
                    </p>
                  )}
                  {unit.text && (
                    <p className="font-serif text-[10.5pt] leading-loose whitespace-pre-wrap text-stone-800 md:text-justify">
                      {unit.text}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="mt-7">
          {model.paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="mb-4 font-serif text-[11pt] leading-loose whitespace-pre-wrap text-stone-800 md:text-justify"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}

      <footer className="print-footer">
        <span>
          <strong className="text-[#0b3d2e]">Perpustakaan Digital Shalawat &amp; Maulid</strong>
        </span>
        <span className="text-[#cfa52f]">◆</span>
        <span>{siteUrl.replace(/^https?:\/\//, "")}</span>
      </footer>
    </div>
  );
}
