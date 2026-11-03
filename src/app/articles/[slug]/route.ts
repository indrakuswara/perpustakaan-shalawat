import { NextResponse } from "next/server";
import { getPublishedBySlug } from "@/lib/db";
import { toArticleApiResult } from "@/lib/article-api";

export const dynamic = "force-dynamic";

// API artikel publik, read-only, tanpa login.
// Jalur ini SENGAJA di /articles/[slug], bukan /api/articles/[slug]:
// kontrak Pact ReaderWeb meminta path /articles/<slug>, dan verifier
// Pact memutar ulang path itu verbatim ke provider. Dengan route di
// path yang sama, verifikasi production tidak butuh rewrite/proxy.
//
// Hanya artikel PUBLISHED yang dijawab; draft/arsip/tidak ada -> 404
// dengan bentuk { error: "Article not found" } yang juga dikunci kontrak.
// Tidak ada data baru yang dibuka: semua field di sini sudah bisa dibaca
// siapa pun lewat halaman baca /baca/[slug].
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse> {
  const { slug } = await params;
  const article = await getPublishedBySlug(slug);
  const result = toArticleApiResult(article);
  return NextResponse.json(result.body, { status: result.status });
}
