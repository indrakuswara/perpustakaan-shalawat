"use client";

import { useState } from "react";

export default function TocDropdown({
  items,
}: {
  items: { id: string; title: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-16 z-10 mb-8 lg:hidden">
      <div className="border-y border-stone-200/70 bg-white/95 backdrop-blur">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="toc-dropdown-list"
          aria-label="Daftar isi artikel"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-stone-700"
        >
          Daftar isi
          <span aria-hidden className="text-stone-400">
            {open ? "▴" : "▾"}
          </span>
        </button>
        {open && (
          <ol
            id="toc-dropdown-list"
            className="max-h-72 overflow-y-auto border-t border-stone-200/70 px-4 py-2"
          >
            {items.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm text-stone-600 transition hover:text-stone-900"
                >
                  <span aria-hidden className="mr-2 text-stone-400">
                    {i + 1}.
                  </span>
                  {item.title}
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
