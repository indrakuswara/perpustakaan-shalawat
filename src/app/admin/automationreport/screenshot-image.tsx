"use client";

import { useState } from "react";

// Gambar bukti satu tes. Kalau sumbernya sudah tidak ada
// (dihapus sesuai retensi 10 run, atau gagal dimuat), tampilkan
// keterangan, bukan ikon gambar rusak.
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
  if (failed) {
    return (
      <p className="text-sm text-stone-500">
        Bukti screenshot tidak tersedia (sudah dihapus sesuai retensi
        atau gagal dimuat).
      </p>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/api/automation-screenshot?runKey=${encodeURIComponent(runKey)}&index=${index}`}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="w-full rounded-xl border border-stone-200"
    />
  );
}
