import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import { createContent, listContents } from "@/lib/db";
import { blocksToPlainText, parseBlocks } from "@/lib/db-types";
import { BATCH4_ARTICLES } from "@/lib/import-qasidah-batch4-payload";

export const dynamic = "force-dynamic";

// ROUTE SEMENTARA — buat 6 artikel DRAFT batch 4 qasidah dari payload
// src/lib/import-qasidah-batch4-payload.ts. Idempotent per slug:
// artikel yang slug-nya sudah ada tidak ditulis ulang. Fingerprint
// ketat per artikel (1 section + jumlah unit persis). Dihapus segera
// setelah eksekusi terverifikasi (bersama file payload-nya).
export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const existing = await listContents();
  const results = [];
  let createdAny = false;

  for (const def of BATCH4_ARTICLES) {
    const blocks = parseBlocks(def.blocks);
    const unitCount = blocks.sections.reduce((n, s) => n + s.units.length, 0);
    if (blocks.sections.length !== 1 || unitCount !== def.expectedUnits) {
      results.push({
        slug: def.meta.slug,
        status: "payload-invalid",
        sections: blocks.sections.length,
        unitCount,
        expectedUnits: def.expectedUnits,
      });
      continue;
    }

    const found = existing.find((c) => c.slug === def.meta.slug);
    if (found) {
      results.push({
        slug: def.meta.slug,
        status: "already-exists",
        id: found.id,
        articleStatus: found.status,
        unitCount,
      });
      continue;
    }

    const article = await createContent({
      title: def.meta.title,
      type: def.meta.type,
      description: def.meta.description,
      body: blocksToPlainText(blocks),
      blocks,
    });
    createdAny = true;
    results.push({
      slug: def.meta.slug,
      status: article.slug === def.meta.slug ? "created" : "created-slug-mismatch",
      createdSlug: article.slug,
      id: article.id,
      articleStatus: article.status,
      unitCount,
    });
  }

  if (createdAny) {
    revalidatePath("/admin/articles");
    revalidatePath("/", "layout");
  }
  return NextResponse.json({ batch: "qasidah-batch4", results });
}
