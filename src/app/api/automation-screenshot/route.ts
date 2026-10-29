import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { listAutomationRuns } from "@/lib/db";

export const dynamic = "force-dynamic";

// Menyajikan satu screenshot bukti laporan automation. Sengaja
// lewat route ini, bukan URL Blob langsung: URL Blob tidak pernah
// ditempel di halaman, dan route ini wajib login admin, sama
// seperti halaman laporannya. Kalau screenshot sudah dihapus
// sesuai retensi (hanya 10 run terbaru yang dipertahankan),
// route ini menjawab 404 dan halaman menampilkan keterangan,
// bukan gambar rusak.
export async function GET(req: Request): Promise<NextResponse> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Butuh login admin." }, { status: 401 });
  }
  const url = new URL(req.url);
  const runKey = url.searchParams.get("runKey") ?? "";
  // A missing index must be a 400, not an implicit test 0:
  // Number("") is 0 and would otherwise pass the integer check.
  if (!url.searchParams.has("index")) {
    return NextResponse.json({ error: "Parameter tidak valid." }, { status: 400 });
  }
  const index = Number(url.searchParams.get("index") ?? "");
  if (!runKey || runKey.length > 100 || !Number.isInteger(index) || index < 0) {
    return NextResponse.json({ error: "Parameter tidak valid." }, { status: 400 });
  }
  const runs = await listAutomationRuns(50);
  const run = runs.find((r) => r.runKey === runKey);
  const screenshot = run?.tests[index]?.screenshot ?? null;
  if (!screenshot) {
    return NextResponse.json({ error: "Screenshot tidak ditemukan." }, { status: 404 });
  }
  // SSRF guard: only fetch screenshots from Vercel Blob storage.
  // The writer side is token-gated and https-only, but the proxy
  // must not become an open fetcher for arbitrary stored URLs.
  let host = "";
  try {
    host = new URL(screenshot).hostname;
  } catch {
    return NextResponse.json({ error: "Screenshot tidak ditemukan." }, { status: 404 });
  }
  if (!host.endsWith(".blob.vercel-storage.com")) {
    return NextResponse.json({ error: "Screenshot tidak ditemukan." }, { status: 404 });
  }
  let upstream: Response;
  try {
    upstream = await fetch(screenshot);
  } catch {
    return NextResponse.json({ error: "Screenshot tidak bisa dimuat." }, { status: 404 });
  }
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: "Screenshot tidak ditemukan." }, { status: 404 });
  }
  // Bound the streamed body: a screenshot is at most a few MB.
  const length = upstream.headers.get("content-length");
  if (length !== null && Number(length) > 5_000_000) {
    return NextResponse.json({ error: "Screenshot terlalu besar." }, { status: 404 });
  }
  return new NextResponse(upstream.body, {
    headers: {
      "content-type": "image/png",
      "x-content-type-options": "nosniff",
      "cache-control": "private, max-age=3600",
    },
  });
}
