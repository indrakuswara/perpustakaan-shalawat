import type { Metadata } from "next";
import RequestForm from "@/components/site/RequestForm";

export const metadata: Metadata = {
  title: "Request Maulid",
  description:
    "Usulkan judul maulid yang belum ada di koleksi — tanpa perlu daftar atau login.",
};

export default function RequestMaulidPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <p className="text-sm font-medium tracking-wide text-emerald-800 uppercase">
        Request
      </p>
      <h1 className="mt-2 font-serif text-3xl font-semibold text-stone-900 md:text-4xl">
        Request Maulid
      </h1>
      <p className="mt-3 max-w-xl leading-relaxed text-stone-600">
        Belum menemukan maulid yang kamu cari di koleksi kami? Sampaikan
        lewat formulir ini — tanpa perlu daftar atau login. Setiap request
        ditinjau manual; tidak semua request bisa kami penuhi, tapi
        semuanya kami baca.
      </p>

      <div className="mt-8 max-w-xl rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <RequestForm kind="maulid" />
      </div>
      <p className="mt-4 max-w-xl text-sm text-stone-500">
        Kami tidak meminta email atau nomor HP — cukup nama panggilan dan
        judulnya saja.
      </p>
    </main>
  );
}
