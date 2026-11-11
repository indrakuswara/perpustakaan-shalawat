"use client";

import { useEffect, useRef, useState } from "react";

// Gambar bukti satu tes. Klik thumbnail membuka lightbox (gambar
// ukuran penuh di overlay gelap) dengan tombol X untuk menutup.
// Kalau sumbernya sudah tidak ada (dihapus sesuai retensi 10 run,
// atau gagal dimuat), tampilkan keterangan, bukan ikon gambar rusak.
export default function ScreenshotImage({
  runKey,
  index,
  alt,
}: {
  runKey: string;
  index: number;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const src = `/api/automation-screenshot?runKey=${encodeURIComponent(runKey)}&index=${index}`;

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  // Tutup dengan Escape.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open ]);

  // Kunci scroll halaman di belakang lightbox.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open ]);

  if (failed) {
    return (
      <p className="text-sm text-stone-500">
        Bukti screenshot tidak tersedia (sudah dihapus sesuai retensi
        atau gagal dimuat).
      </p>
    );
  }
  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setOpen(true)}
        aria-label="Perbesar screenshot"
        title="Klik untuk memperbesar"
        className="block w-full cursor-zoom-in rounded-xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="w-full rounded-xl border border-stone-200"
        />
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/80 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Bukti screenshot diperbesar"
            className="relative max-h-full max-w-full"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Tutup"
              autoFocus
              className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-bold text-stone-900 shadow-lg transition hover:bg-stone-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
