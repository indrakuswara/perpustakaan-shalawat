"use client";

import { useState } from "react";
import type { ContentRow } from "@/lib/db";
import ArticleCard from "@/components/site/ArticleCard";

// Progressive disclosure untuk halaman daftar (/shalawat, /maulid):
// tampilkan 12 kartu dulu, tombol "Muat Lebih Banyak" menambah 12
// berikutnya sampai semua tampil lalu tombol hilang. Halaman daftar
// tidak punya search/filter, jadi tidak ada reset hitungan.
const BATCH_SIZE = 12;

export default function KoleksiList({
  articles,
}: {
  articles: ContentRow[];
}) {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <>
      <p className="mt-8 text-sm text-muted">{articles.length} bacaan</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleArticles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            type="button"
            className="btn-outline-gold"
            onClick={() => setVisibleCount((c) => c + BATCH_SIZE)}
          >
            Muat Lebih Banyak
          </button>
        </div>
      )}
    </>
  );
}
