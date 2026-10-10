import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedBySlug } from "@/lib/db";
import { SITE_URL } from "@/lib/site-url";
import { buildPrintModel } from "@/lib/print-model";
import PrintView from "@/components/site/PrintView";
import PrintToolbar from "@/components/site/PrintToolbar";

const TYPE_LABEL = { SHALAWAT: "Shalawat", MAULID: "Maulid" } as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedBySlug(slug);
  if (!article) return { title: "Tidak ditemukan" };
  return {
    // Judul dokumen = judul artikel -> nama file PDF default di browser.
    title: article.title,
    alternates: { canonical: `${SITE_URL}/baca/${article.slug}` },
    // Halaman cetak adalah turunan halaman baca: jangan diindeks.
    robots: { index: false, follow: false },
  };
}

export default async function CetakPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Hanya yang PUBLISHED yang bisa dicetak — draft otomatis 404,
  // sama seperti halaman baca.
  const article = await getPublishedBySlug(slug);
  if (!article) notFound();

  const model = buildPrintModel({ blocks: article.blocks, body: article.body });

  return (
    <div className="min-h-screen bg-[#fffefb]">
      <PrintToolbar slug={article.slug} />
      <main className="print-doc mx-auto max-w-[210mm] px-[10mm] py-[10mm] sm:px-[15mm]">
        <PrintView
          model={model}
          title={article.title}
          typeLabel={TYPE_LABEL[article.type]}
          description={article.description}
          siteUrl={SITE_URL}
        />
      </main>
    </div>
  );
}
