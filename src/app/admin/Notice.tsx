import Link from "next/link";

// Banner sukses sekali jalan di halaman admin. Muncul saat URL
// membawa parameter sukses (mis. ?saved=1) dari redirect sesudah
// server action. "Tutup" mengarah ke URL yang sama tanpa parameter
// itu, dengan filter aktif halaman dipertahankan oleh pemanggil.
export default function Notice({
  message,
  dismissHref,
}: {
  message: string;
  dismissHref: string;
}) {
  return (
    <div
      role="status"
      className="mb-4 flex items-start justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900"
    >
      <span>{message}</span>
      <Link
        href={dismissHref}
        aria-label="Tutup pemberitahuan"
        className="shrink-0 text-emerald-700 underline underline-offset-2 transition hover:text-emerald-900"
      >
        Tutup
      </Link>
    </div>
  );
}
