"use client";

import { useEffect, useState } from "react";

// Tombol "Hapus" request dengan dialog konfirmasi — pola yang sama
// seperti DeleteArticleButton: penghapusan permanen tanpa undo,
// jadi admin wajib mengonfirmasi di dialog yang menyebut judulnya.
export default function DeleteRequestButton({
  id,
  title,
  name,
  deleteAction,
}: {
  id: string;
  title: string;
  name: string;
  deleteAction: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open ]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
      >
        Hapus
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`delete-request-dialog-title-${id}`}
            className="w-full max-w-md rounded-2xl bg-white p-6 text-left shadow-xl"
          >
            <h2
              id={`delete-request-dialog-title-${id}`}
              className="text-lg font-semibold text-stone-900"
            >
              Hapus request ini?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Request <strong className="text-stone-900">“{title}”</strong>{" "}
              dari {name} akan dihapus permanen dan{" "}
              <strong className="text-stone-900">
                tidak bisa dikembalikan
              </strong>
              .
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                autoFocus
                onClick={() => setOpen(false)}
                className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
              >
                Batal
              </button>
              <form action={deleteAction} className="inline">
                <button
                  type="submit"
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  Hapus permanen
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
