import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth";
import { listContents, updateContent } from "@/lib/db";
import { blocksToPlainText } from "@/lib/db-types";
import { applyEnglishToBlocks } from "@/lib/apply-english";
import { DIBA_ENGLISH } from "@/lib/diba-english-payload";

export const dynamic = "force-dynamic";

// ROUTE SEMENTARA — isi layer English Maulid Diba'i dari payload
// (src/lib/diba-english-payload.ts, sudah di-review Juple 2026-10-03).
// Idempotent + fingerprint ketat: keadaan tak terduga = batal, tidak menulis.
// Dihapus segera setelah eksekusi terverifikasi (bersama file payload-nya).

const EXPECTED_COUNTS = [12, 7, 21, 25, 10, 44, 82, 39, 131, 21, 52];

// Buang harakat + tatweel untuk pencocokan fingerprint yang toleran.
function stripArab(s: string): string {
  return s.replace(/[\u0640\u064B-\u065F\u0670]/g, "");
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

  const blocks = article.blocks;
  const counts = blocks.sections.map((s) => s.units.length);
  const total = counts.reduce((n, c) => n + c, 0);

  // Fingerprint struktur + spot-check isi (termasuk batas Muqaddimah/Fashl
  // pasca-fix: Muqaddimah 25 diakhiri وَعَرَضَ فَخْرَهُ, Fashl mulai قِيْلَ هُوَ أَدَمُ).
  const s1u1 = stripArab(blocks.sections[0]?.units[0]?.arab ?? "");
  const s4last = stripArab(
    blocks.sections[3]?.units[EXPECTED_COUNTS[3] - 1]?.arab ?? "",
  );
  const s5u1 = stripArab(blocks.sections[4]?.units[0]?.arab ?? "");
  const s11last = stripArab(
    blocks.sections[10]?.units[EXPECTED_COUNTS[10] - 1]?.arab ?? "",
  );
  const fingerprintOk =
    blocks.sections.length === 11 &&
    total === 444 &&
    counts.every((c, i) => c === EXPECTED_COUNTS[i]) &&
    s1u1.includes("يارب صل") &&
    s4last.includes("وعرض فخره") &&
    s5u1.includes("قيل هو أدم") &&
    s11last === "الفاتحة";
  if (!fingerprintOk) {
    return NextResponse.json(
      {
        error: "keadaan tidak sesuai fingerprint — batal, tidak ada tulisan",
        counts,
        total,
      },
      { status: 409 },
    );
  }

  // Keadaan English saat ini: hitung yang sudah terisi & cek konflik.
  let alreadyFilled = 0;
  let conflict = false;
  blocks.sections.forEach((section, si) => {
    section.units.forEach((unit, ui) => {
      const want = DIBA_ENGLISH[si][ui]?.trim();
      const have = unit.english?.trim();
      if (have) {
        if (want && have === want) alreadyFilled++;
        else conflict = true;
      }
    });
  });
  const wantTotal = DIBA_ENGLISH.flat().filter((e) => e.trim()).length;

  // Ada English asing yang tidak cocok payload -> jangan timpa, batalkan.
  if (conflict) {
    return NextResponse.json(
      {
        error:
          "ada english existing yang tidak cocok payload — batal, tidak ada tulisan",
        alreadyFilled,
        wantTotal,
      },
      { status: 409 },
    );
  }

  // Sudah terisi penuh oleh eksekusi sebelumnya.
  if (alreadyFilled === wantTotal) {
    return NextResponse.json({
      status: "already-filled",
      filled: alreadyFilled,
      total,
    });
  }

  const next = applyEnglishToBlocks(blocks, DIBA_ENGLISH);
  await updateContent(article.id, {
    title: article.title,
    type: article.type,
    description: article.description ?? "",
    body: blocksToPlainText(next),
    blocks: next,
  });
  revalidatePath("/", "layout");
  revalidatePath("/baca/maulid-dibai");

  return NextResponse.json({
    status: "filled",
    filled: wantTotal,
    total,
  });
}
