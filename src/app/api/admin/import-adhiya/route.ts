// RUTE SEMENTARA — HAPUS SETELAH IMPORT SELESAI.
// GET /api/admin/import-adhiya : fetch salawat.com dari server,
// parse jadi blocks, simpan sebagai DRAFT. Diproteksi session admin.
// Idempotent: bila artikel berjudul sama sudah ada, tidak import ulang.
import { getSessionAdminId } from "@/lib/auth";
import { createContent, listContents } from "@/lib/db";
import { blocksToPlainText } from "@/lib/db-types";
import { fetchAdhiyaUlamiBlocks } from "@/lib/import-terjemahkitab";

const TITLE = "Maulid Adh-Dhiya'ul Lami'";

export async function GET() {
  const adminId = await getSessionAdminId();
  if (!adminId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const existing = await listContents({ query: TITLE });
    const same = existing.find((r) => r.title === TITLE);
    if (same) {
      return Response.json({
        ok: true,
        skipped: true,
        id: same.id,
        slug: same.slug,
        status: same.status,
      });
    }
    const blocks = await fetchAdhiyaUlamiBlocks();
    const row = await createContent({
      title: TITLE,
      type: "MAULID",
      description:
        "Maulid Adh-Dhiya'ul Lami' (الضياء اللامع) karya Habib Umar bin Muhammad bin Hafidz, " +
        "lengkap dengan teks Arab, Latin, dan terjemah bahasa Indonesia. Sumber teks: salawat.com.",
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
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
