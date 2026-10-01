// RUTE SEMENTARA — HAPUS SETELAH SELESAI.
// Menghapus SATU draft duplikat Simtudduror yang terbuat tidak sengaja
// saat verifikasi cleanup (GET ke rute import yang masih live).
// Safety check ketat: hanya hapus bila id/judul/slug/status cocok.
import { getSessionAdminId } from "@/lib/auth";
import { getContentById, deleteContent } from "@/lib/db";

const DUPLICATE_ID = "27215c86-fb62-423c-9dd8-b8fc677aa013";

export async function GET() {
  const adminId = await getSessionAdminId();
  if (!adminId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const row = await getContentById(DUPLICATE_ID);
  if (!row) {
    return Response.json({ ok: true, deleted: false, reason: "tidak ada" });
  }
  if (
    row.title !== "Maulid Simtudduror" ||
    row.slug !== "maulid-simtudduror-2" ||
    row.status !== "DRAFT"
  ) {
    return Response.json(
      {
        ok: false,
        deleted: false,
        reason: "safety-check gagal",
        title: row.title,
        slug: row.slug,
        status: row.status,
      },
      { status: 400 },
    );
  }
  await deleteContent(DUPLICATE_ID);
  const check = await getContentById(DUPLICATE_ID);
  return Response.json({ ok: true, deleted: !check, id: DUPLICATE_ID });
}
