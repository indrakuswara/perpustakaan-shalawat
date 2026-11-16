import type { Metadata } from "next";
import RequestForm from "@/components/site/RequestForm";

export const metadata: Metadata = {
  title: "Request Shalawat",
  description:
    "Usulkan judul shalawat yang belum ada di koleksi.",
};

export default function RequestShalawatPage() {
  return (
    <main className="bg-bg mx-auto max-w-5xl px-4 py-12 md:py-16">
      <h1 className="font-display text-3xl text-ink md:text-4xl">
        Request Shalawat
      </h1>
      <p className="mt-3 max-w-xl leading-relaxed text-muted">
        Belum menemukan shalawat yang kamu cari di koleksi kami? Sampaikan
        lewat formulir ini. Setiap request ditinjau manual, tidak semua
        request bisa kami penuhi, tapi semuanya kami baca.
      </p>

      <div className="mt-8 max-w-xl rounded-2xl border border-line bg-white p-6 shadow-sm">
        <RequestForm kind="shalawat" />
      </div>
    </main>
  );
}
