import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import { listContents, updateContent } from "@/lib/db";
import { blocksToPlainText, parseBlocks } from "@/lib/db-types";
import type { ArticleBlocks } from "@/lib/db-types";
import { QAD_KAFANI_BLOCKS_V2 } from "@/lib/fix-qad-kafani-payload";

export const dynamic = "force-dynamic";

// ROUTE SEMENTARA — perbaiki artikel "Qad Kafani": sisipkan 5 bait
// yang hilang di buku sumber, sesuai referensi pilihan Juple
// (total 16 → 21 unit). Fingerprint ketat atas state saat ini +
// idempotent. Judul/tipe/deskripsi/status artikel TIDAK disentuh.
// Dihapus segera setelah eksekusi terverifikasi (bersama payload).

// Buang harakat + tatweel untuk pencocokan fingerprint yang toleran.
function stripArab(s: string): string {
  return s.replace(/[ـً-ٰٟ]/g, "");
}

function unitCount(b: ArticleBlocks): number {
  return b.sections.reduce((n, s) => n + s.units.length, 0);
}

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const article = (await listContents()).find((c) => c.slug === "qad-kafani");
  if (!article || !article.blocks) {
    return NextResponse.json(
      { error: "artikel qad-kafani tidak ditemukan" },
      { status: 404 },
    );
  }
  const current = article.blocks;
  const units = current.sections[0]?.units ?? [];

  // Sudah diperbaiki? unit 7 (index 6) = bait Fatadarakni.
  if (
    current.sections.length === 1 &&
    unitCount(current) === 21 &&
    stripArab(units[6]?.arab ?? "").includes("تداركني")
  ) {
    return NextResponse.json({
      status: "already-fixed",
      id: article.id,
      articleStatus: article.status,
      unitCount: 21,
    });
  }

  // Fingerprint state lama: 1 section, 16 unit, unit 7 = Ya Sari'al Ghauts.
  const fingerprintOk =
    current.sections.length === 1 &&
    unitCount(current) === 16 &&
    stripArab(units[0]?.arab ?? "").includes("كفاني") &&
    stripArab(units[6]?.arab ?? "").includes("سريع الغوث");
  if (!fingerprintOk) {
    return NextResponse.json(
      {
        error: "fingerprint tidak cocok — tidak ada tulisan",
        sections: current.sections.length,
        unitCount: unitCount(current),
        unit7: units[6]?.arab ?? null,
      },
      { status: 409 },
    );
  }

  const blocks = parseBlocks(QAD_KAFANI_BLOCKS_V2);
  if (blocks.sections.length !== 1 || unitCount(blocks) !== 21) {
    return NextResponse.json(
      { error: "payload tidak valid" },
      { status: 500 },
    );
  }

  const updated = await updateContent(article.id, {
    blocks,
    body: blocksToPlainText(blocks),
  });
  revalidatePath("/baca/qad-kafani");
  revalidatePath("/admin/articles");
  revalidatePath("/", "layout");
  return NextResponse.json({
    status: "fixed",
    id: updated.id,
    slug: updated.slug,
    articleStatus: updated.status,
    before: 16,
    after: 21,
  });
}
