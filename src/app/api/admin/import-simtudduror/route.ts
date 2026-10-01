// RUTE SEMENTARA — HAPUS SETELAH IMPORT SELESAI.
// POST /api/admin/import-simtudduror : fetch terjemahkitab.com dari server,
// parse jadi blocks, simpan sebagai DRAFT. Diproteksi session admin.
import { getSessionAdminId } from "@/lib/auth";
import { createContent } from "@/lib/db";
import { blocksToPlainText } from "@/lib/db-types";
import { fetchSimtuddurorBlocks } from "@/lib/import-terjemahkitab";

export async function POST() {
  return runImport();
}

// GET didukung sementara supaya bisa dipicu via navigasi browser biasa
// (tetap butuh session admin). Dihapus bersama rute ini.
export async function GET() {
  return runImport();
}

async function runImport() {
  const adminId = await getSessionAdminId();
  if (!adminId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const blocks = await fetchSimtuddurorBlocks();
    const row = await createContent({
      title: "Maulid Simtudduror",
      type: "MAULID",
      description:
        "Maulid Simtudduror (Simthud Durar) karya Habib Ali bin Muhammad Al-Habsyi, " +
        "lengkap dengan terjemah bahasa Indonesia. Sumber teks: terjemahkitab.com.",
      body: blocksToPlainText(blocks),
      blocks,
    });
    return Response.json({
      ok: true,
      id: row.id,
      slug: row.slug,
      status: row.status,
      sections: blocks.sections.length,
      units: blocks.sections.reduce((n, s) => n + s.units.length, 0),
    });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Import gagal" },
      { status: 500 },
    );
  }
}
