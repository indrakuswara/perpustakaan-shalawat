"use client";

import { useState } from "react";
import type { TocItem } from "@/lib/toc";

export type TocKind = "bait" | "bagian";

// Butir daftar isi bersama untuk panel desktop dan dropdown mobile:
// nomor memakai --gold-deep. Untuk daftar bait, labelnya sendiri sudah
// "Bait n" sehingga angkanya diwarnai di dalam label; untuk daftar
// bagian, nomor urut ditampilkan di depan judul (aria-hidden).
// `onNavigate` menutup dropdown mobile sesudah tautan diklik (panel
// desktop tidak memakainya); `liClassName`/`linkClassName` menimpa
// geometri desktop bila pemanggil butuh tampilan lain (dropdown).
export function TocListItems({
  items,
  kind,
  onNavigate,
  liClassName = "text-sm",
  linkClassName = "text-muted transition hover:text-ink",
}: {
  items: TocItem[];
  kind: TocKind;
  onNavigate?: () => void;
  liClassName?: string;
  linkClassName?: string;
}) {
  return (
    <>
      {items.map((item, i) => (
        <li key={item.id} className={liClassName || undefined}>
          <a
            href={`#${item.id}`}
            onClick={onNavigate}
            className={linkClassName}
          >
            {kind === "bait" ? (
              <>
                Bait <span className="text-gold-deep">{i + 1}</span>
              </>
            ) : (
              <>
                <span aria-hidden className="mr-2 text-gold-deep">
                  {i + 1}.
                </span>
                {item.label}
              </>
            )}
          </a>
        </li>
      ))}
    </>
  );
}

// Dropdown Daftar Isi mobile (spec 8.8): daftar yang sama dengan panel
// desktop, sticky top-0 di halaman baca (headernya statis), hanya tampil
// di bawah lg. Disembunyikan bersama panel bila hanya ada 1 item atau
// kurang (juga dijaga pemanggil, ReaderView).
export default function TocDropdown({
  items,
  kind,
}: {
  items: TocItem[];
  kind: TocKind;
}) {
  const [open, setOpen] = useState(false);
  if (items.length <= 1) return null;

  return (
    <div className="sticky top-0 z-10 mb-8 lg:hidden">
      <div className="border-y border-line bg-card/95 backdrop-blur">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="toc-dropdown-list"
          aria-label="Daftar isi artikel"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-ink"
        >
          Daftar isi
          <span aria-hidden className="text-muted">
            {open ? "▴" : "▾"}
          </span>
        </button>
        {open && (
          <ol
            id="toc-dropdown-list"
            className="max-h-72 space-y-1 overflow-y-auto border-t border-line px-4 py-2"
          >
            <TocListItems
              items={items}
              kind={kind}
              onNavigate={() => setOpen(false)}
              liClassName=""
              linkClassName="block py-2 text-sm text-muted transition hover:text-ink"
            />
          </ol>
        )}
      </div>
    </div>
  );
}
