"use client";

import { useEffect, useState } from "react";

// Tombol "Hapus" artikel dengan dialog konfirmasi. Menggantikan form
// hapus langsung yang pernah membuat artikel published terhapus tanpa
// sengaja (Qad Kafani, 2026-10-04): penghapusan itu permanen dan tidak
// ada trash/undo, jadi admin wajib mengonfirmasi di dialog yang
// menyebut judul artikelnya sebelum server action dijalankan.
export default function DeleteArticleButton({
  title,
  status,
  deleteAction,
}: {
  title: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
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
            aria-labelledby="delete-dialog-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <h2
              id="delete-dialog-title"
              className="text-lg font-semibold text-stone-900"
            >
              Hapus artikel ini?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Artikel <strong className="text-stone-900">“{title}”</strong>{" "}
              akan dihapus permanen dan{" "}
              <strong className="text-stone-900">
                tidak bisa dikembalikan
              </strong>
              .
            </p>
            {status === "PUBLISHED" && (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                Artikel ini sedang tayang di halaman publik — menghapusnya
                akan langsung menghilangkan halaman bacanya.
              </p>
            )}
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
