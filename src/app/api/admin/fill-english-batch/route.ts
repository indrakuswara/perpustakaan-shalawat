import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import { listContents, updateContent } from "@/lib/db";
import { blocksToPlainText } from "@/lib/db-types";
import type { ArticleBlocks } from "@/lib/db-types";
import { applyEnglishToBlocks } from "@/lib/apply-english";
import { DHIYA_ENGLISH, SIMTU_ENGLISH } from "@/lib/fill-english-payload";

export const dynamic = "force-dynamic";

// ROUTE SEMENTARA — isi layer English dua artikel (Dhiya'ul Lami' +
// Simtudduror) dari payload src/lib/fill-english-payload.ts.
// Per artikel: fingerprint ketat + idempotent; artikel yang gagal
// fingerprint/konflik DIBATALKAN sendiri tanpa menulis, artikel lain
// tetap diproses. Field selain `english` tidak disentuh sama sekali.
// Dihapus segera setelah eksekusi terverifikasi (bersama file payload-nya).

// Buang harakat + tatweel untuk pencocokan fingerprint yang toleran.
function stripArab(s: string): string {
  return s.replace(/[\u0640\u064B-\u065F\u0670]/g, "");
}

interface FillSpec {
  slug: string;
  counts: number[];
  payload: string[][];
  spot: (b: ArticleBlocks) => boolean;
}

const SPECS: FillSpec[] = [
  {
    slug: "maulid-adh-dhiyaul-lami",
    counts: [15, 5, 15, 14, 14, 16, 25, 16, 16, 22, 25],
    payload: DHIYA_ENGLISH,
    spot: (b) =>
      stripArab(b.sections[1]?.units[4]?.arab ?? "").includes("يصلون") &&
      stripArab(b.sections[10]?.units[24]?.arab ?? "").includes("الفاتحة"),
  },
  {
    slug: "maulid-simtudduror",
    counts: [14, 16, 26, 25, 38, 35, 19, 20, 15, 26, 45, 24, 22, 43, 41, 31, 90],
    payload: SIMTU_ENGLISH,
    spot: (b) =>
      stripArab(b.sections[0]?.units[0]?.arab ?? "").includes("يا رب صل") &&
      stripArab(b.sections[16]?.units[0]?.arab ?? "").includes(
        "الحمد لله رب العلمين",
      ),
  },
];

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const all = await listContents({ status: "PUBLISHED" });
  const results: Record<string, unknown> = {};

  for (const spec of SPECS) {
    const article = all.find((a) => a.slug === spec.slug);
    if (!article?.blocks) {
      results[spec.slug] = { status: "not-found" };
      continue;
    }
    const blocks = article.blocks;
    const counts = blocks.sections.map((s) => s.units.length);
    const total = counts.reduce((n, c) => n + c, 0);
    const fingerprintOk =
      counts.length === spec.counts.length &&
      counts.every((c, i) => c === spec.counts[i]) &&
      total === spec.counts.reduce((n, c) => n + c, 0) &&
      spec.spot(blocks);
    if (!fingerprintOk) {
      results[spec.slug] = { status: "fingerprint-mismatch", counts, total };
      continue;
    }

    let alreadyFilled = 0;
    let conflict = false;
    blocks.sections.forEach((section, si) => {
      section.units.forEach((unit, ui) => {
        const want = spec.payload[si][ui]?.trim();
        const have = unit.english?.trim();
        if (have) {
          if (want && have === want) alreadyFilled++;
          else conflict = true;
        }
      });
    });
    const wantTotal = spec.payload.flat().filter((e) => e.trim()).length;
    if (conflict) {
      results[spec.slug] = { status: "conflict", alreadyFilled, wantTotal };
      continue;
    }
    if (alreadyFilled === wantTotal) {
      results[spec.slug] = { status: "already-filled", filled: alreadyFilled, total };
      continue;
    }

    const next = applyEnglishToBlocks(blocks, spec.payload);
    await updateContent(article.id, {
      title: article.title,
      type: article.type,
      description: article.description ?? "",
      body: blocksToPlainText(next),
      blocks: next,
    });
    revalidatePath(`/baca/${spec.slug}`);
    results[spec.slug] = { status: "filled", filled: wantTotal, total };
  }

  revalidatePath("/", "layout");
  return NextResponse.json(results);
}
