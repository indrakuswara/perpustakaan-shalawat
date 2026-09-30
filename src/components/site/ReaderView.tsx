import type { ArticleBlocks } from "@/lib/db-types";
import { sectionAnchorIds } from "@/lib/db-types";
import TocDropdown from "./TocDropdown";

function UnitDivider() {
  return <hr className="my-8 border-stone-200/70" aria-hidden />;
}

export default function ReaderView({ blocks }: { blocks: ArticleBlocks }) {
  const anchorIds = sectionAnchorIds(blocks);
  const items = blocks.sections.map((section, i) => ({
    id: anchorIds[i],
    title: section.title,
  }));

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-10">
      <div className="max-w-2xl">
        <TocDropdown items={items} />
        {blocks.sections.map((section, sectionIndex) => (
          <section
            key={section.id}
            id={anchorIds[sectionIndex]}
            className={sectionIndex > 0 ? "mt-14" : undefined}
          >
            <h2 className="text-center font-serif text-2xl font-semibold text-stone-900">
              {section.title}
            </h2>
            <div className="mt-8">
              {section.units.map((unit, unitIndex) => (
                <div key={unit.id}>
                  {unitIndex > 0 && <UnitDivider />}
                  {unit.arab && (
                    <p
                      dir="rtl"
                      lang="ar"
                      className="font-arab text-right text-[1.75rem] leading-[2.2] text-stone-900 md:text-4xl"
                    >
                      {unit.arab}
                    </p>
                  )}
                  {unit.latin && (
                    <p className="mt-3 leading-relaxed text-teal-700">
                      {unit.latin}
                    </p>
                  )}
                  {unit.translation && (
                    <p className="mt-2 leading-relaxed text-stone-600">
                      {unit.translation}
                    </p>
                  )}
                  {unit.text && (
                    <p className="leading-loose text-stone-800">{unit.text}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <nav aria-label="Daftar isi">
            <p className="text-sm font-semibold tracking-wide text-stone-500 uppercase">
              Daftar isi
            </p>
            <ol className="mt-3 space-y-2">
              {items.map((item, i) => (
                <li key={item.id} className="text-sm">
                  <a
                    href={`#${item.id}`}
                    className="text-stone-600 transition hover:text-stone-900"
                  >
                    <span aria-hidden className="mr-2 text-stone-400">
                      {i + 1}.
                    </span>
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </aside>
    </div>
  );
}
