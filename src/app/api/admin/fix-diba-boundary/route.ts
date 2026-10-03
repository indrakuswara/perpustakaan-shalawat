import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import { listContents, updateContent } from "@/lib/db";
import { blocksToPlainText } from "@/lib/db-types";

export const dynamic = "force-dynamic";

// ROUTE SEMENTARA — fix batas section Maulid Diba'i:
// 2 unit pertama Fashl (فَسُبْحَانَهُ... & وَعَرَضَ...) dipindah ke akhir
// Muqaddimah (Muqaddimah 23->25, Fashl 12->10, total tetap 444).
// Idempotent + fingerprint ketat: keadaan tak terduga = batal, tidak menulis.
// Dihapus segera setelah eksekusi terverifikasi.

// Buang harakat untuk pencocokan fingerprint yang toleran.
function stripArab(s: string): string {
  return s.replace(/[\u064B-\u065F\u0670]/g, "");
}

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const all = await listContents({ status: "PUBLISHED" });
  const article = all.find((a) => a.slug === "maulid-dibai");
  if (!article?.blocks) {
    return NextResponse.json(
      { error: "artikel/blocks tidak ditemukan" },
      { status: 404 },
    );
  }

  const blocks: typeof article.blocks = JSON.parse(
    JSON.stringify(article.blocks),
  );
  const muq = blocks.sections.find((s) => s.title === "Muqaddimah");
  const fashl = blocks.sections.find((s) => s.title.startsWith("Fashl"));
  if (!muq || !fashl) {
    return NextResponse.json(
      { error: "section Muqaddimah/Fashl tidak ditemukan" },
      { status: 422 },
    );
  }

  const total = blocks.sections.reduce((n, s) => n + s.units.length, 0);
  const fashlFirst = stripArab(fashl.units[0]?.arab ?? "");

  // Sudah pernah diperbaiki? Jangan tulis apa pun.
  if (
    muq.units.length === 25 &&
    fashl.units.length === 10 &&
    fashlFirst.includes("قيل هو أدم")
  ) {
    return NextResponse.json({
      status: "already-fixed",
      muqaddimah: muq.units.length,
      fashl: fashl.units.length,
      total,
    });
  }

  // Fingerprint keadaan rusak yang diharapkan.
  const fp1 = stripArab(fashl.units[0]?.arab ?? "");
  const fp2 = stripArab(fashl.units[1]?.arab ?? "");
  if (
    total !== 444 ||
    muq.units.length !== 23 ||
    fashl.units.length !== 12 ||
    !fp1.includes("فسبحانه وتعالى") ||
    !fp2.includes("وعرض فخره")
  ) {
    return NextResponse.json(
      {
        error: "keadaan tidak sesuai fingerprint — batal, tidak ada tulisan",
        muqaddimah: muq.units.length,
        fashl: fashl.units.length,
        total,
      },
      { status: 409 },
    );
  }

  const moved = fashl.units.splice(0, 2);
  muq.units.push(...moved);

  await updateContent(article.id, {
    title: article.title,
    type: article.type,
    description: article.description ?? "",
    body: blocksToPlainText(blocks),
    blocks,
  });
  revalidatePath("/", "layout");
  revalidatePath("/baca/maulid-dibai");

  return NextResponse.json({
    status: "fixed",
    moved: moved.length,
    muqaddimah: muq.units.length,
    fashl: fashl.units.length,
    total: blocks.sections.reduce((n, s) => n + s.units.length, 0),
  });
}
