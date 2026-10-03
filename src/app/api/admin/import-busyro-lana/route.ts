import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import { createContent, listContents } from "@/lib/db";
import { blocksToPlainText, parseBlocks } from "@/lib/db-types";
import { BUSYRO_BLOCKS, BUSYRO_META } from "@/lib/import-busyro-lana-payload";

export const dynamic = "force-dynamic";

// ROUTE SEMENTARA — buat artikel DRAFT "Busyro Lana" dari payload
// src/lib/import-busyro-lana-payload.ts. Idempotent: kalau slug
// busyro-lana sudah ada, tidak menulis apa pun. Dihapus segera
// setelah eksekusi terverifikasi (bersama file payload-nya).
export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const blocks = parseBlocks(BUSYRO_BLOCKS);
  const unitCount = blocks.sections.reduce((n, s) => n + s.units.length, 0);
  if (blocks.sections.length !== 1 || unitCount !== 10) {
    return NextResponse.json(
      { error: "payload tidak valid", sections: blocks.sections.length, unitCount },
      { status: 500 },
    );
  }

  const existing = (await listContents()).find((c) => c.slug === "busyro-lana");
  if (existing) {
    return NextResponse.json({
      status: "already-exists",
      id: existing.id,
      slug: existing.slug,
      articleStatus: existing.status,
    });
  }

  const article = await createContent({
    title: BUSYRO_META.title,
    type: BUSYRO_META.type,
    description: BUSYRO_META.description,
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
