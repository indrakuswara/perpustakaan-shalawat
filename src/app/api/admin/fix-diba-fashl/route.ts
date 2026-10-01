// RUTE SEMENTARA — hapus setelah dipakai.
// Menggeser header "Fashl: Cahaya Nabi Muhammad" ke bawah 2 unit:
// 2 unit pertama section Fashl (فَسُبْحَانَهُ... dan وَعَرَضَ فَخْرَهُ...)
// dipindah ke akhir section sebelumnya (Muqaddimah),
// sehingga Fashl dimulai dari قِيْلَ هُوَ أَدَمُ.
import { NextResponse } from "next/server";
import { getSessionAdminId } from "@/lib/auth";
import { listContents, updateContent } from "@/lib/db";
import { parseBlocks, blocksToPlainText } from "@/lib/db-types";

const SLUG = "maulid-dibai-2";
const FASHL_TITLE = "Fashl: Cahaya Nabi Muhammad";

export async function GET() {
  const adminId = await getSessionAdminId();
  if (!adminId) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const all = await listContents();
  const article = all.find((a) => a.slug === SLUG);
  if (!article) {
    return NextResponse.json({ ok: false, error: "artikel tidak ditemukan" }, { status: 404 });
  }
  if (!article.blocks) {
    return NextResponse.json({ ok: false, error: "artikel tidak punya blocks" }, { status: 400 });
  }

  const blocks = parseBlocks(article.blocks);
  const fashlIdx = blocks.sections.findIndex((s) => s.title === FASHL_TITLE);
  if (fashlIdx <= 0) {
    return NextResponse.json(
      { ok: false, error: "section Fashl tidak ditemukan atau tidak ada section sebelumnya" },
      { status: 400 },
    );
  }
  const prev = blocks.sections[fashlIdx - 1];
  const fashl = blocks.sections[fashlIdx];

  // Safety check: pastikan struktur sesuai ekspektasi sebelum mengubah.
  const arabOf = (u: { arab?: string } | undefined) => u?.arab ?? "";
  const expected: Array<[string, string]> = [
    [arabOf(fashl.units[0]), "فَسُبْحَانَهُ"],
    [arabOf(fashl.units[1]), "وَعَرَضَ"],
    [arabOf(fashl.units[2]), "قِيْلَ هُوَ أَدَمُ"],
  ];
  for (const [found, prefix] of expected) {
    if (!found.startsWith(prefix)) {
      return NextResponse.json(
        {
          ok: false,
          error: "struktur tidak sesuai ekspektasi — dibatalkan, tidak ada perubahan",
          expectedPrefix: prefix,
          found: found.slice(0, 40),
        },
        { status: 400 },
      );
    }
  }

  const countUnits = () => blocks.sections.reduce((n, s) => n + s.units.length, 0);
  const before = countUnits();
  const moved = fashl.units.splice(0, 2);
  prev.units.push(...moved);
  const after = countUnits();
  if (before !== after) {
    return NextResponse.json({ ok: false, error: "jumlah unit berubah — dibatalkan" }, { status: 500 });
  }

  const updated = await updateContent(article.id, {
    blocks,
    body: blocksToPlainText(blocks),
  });

  return NextResponse.json({
    ok: true,
    slug: updated.slug,
    status: updated.status,
    prevSection: prev.title,
    prevSectionUnits: prev.units.length,
    fashlFirstArab: (fashl.units[0]?.arab ?? "").slice(0, 50),
    totalUnits: after,
  });
}
