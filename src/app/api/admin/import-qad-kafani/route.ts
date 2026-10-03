import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import { createContent, listContents } from "@/lib/db";
import { blocksToPlainText, parseBlocks } from "@/lib/db-types";
import {
  QAD_KAFANI_BLOCKS,
  QAD_KAFANI_META,
} from "@/lib/import-qad-kafani-payload";

export const dynamic = "force-dynamic";

// ROUTE SEMENTARA — buat artikel DRAFT "Qad Kafani" dari payload
// src/lib/import-qad-kafani-payload.ts (isi = dokumen review yang
// disetujui Juple). Idempotent: kalau slug qad-kafani sudah ada,
// tidak menulis apa pun. Dihapus segera setelah eksekusi
// terverifikasi (bersama file payload-nya).
export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const blocks = parseBlocks(QAD_KAFANI_BLOCKS);
  const unitCount = blocks.sections.reduce((n, s) => n + s.units.length, 0);
  if (blocks.sections.length !== 1 || unitCount !== 16) {
    return NextResponse.json(
      { error: "payload tidak valid", sections: blocks.sections.length, unitCount },
      { status: 500 },
    );
  }

  const existing = (await listContents()).find((c) => c.slug === "qad-kafani");
  if (existing) {
    return NextResponse.json({
      status: "already-exists",
      id: existing.id,
      slug: existing.slug,
      articleStatus: existing.status,
    });
  }

  const article = await createContent({
    title: QAD_KAFANI_META.title,
    type: QAD_KAFANI_META.type,
    description: QAD_KAFANI_META.description,
    body: blocksToPlainText(blocks),
    blocks,
  });
  revalidatePath("/admin/articles");
  revalidatePath("/", "layout");
  return NextResponse.json({
    status: "created",
    id: article.id,
    slug: article.slug,
    articleStatus: article.status,
    unitCount,
  });
}
