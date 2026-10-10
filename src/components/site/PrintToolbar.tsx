"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// Bar khusus layar di halaman cetak (tidak ikut tercetak, print:hidden).
// Sekali setelah halaman + font siap, dialog print dibuka otomatis agar
// user tinggal memilih "Simpan sebagai PDF". Tombol manual tetap ada
// untuk berjaga-jaga bila auto-print diblokir browser.
export default function PrintToolbar({ slug }: { slug: string }) {
  const printedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => {
      setTimeout(() => {
        if (!cancelled && !printedRef.current) {
          printedRef.current = true;
          window.print();
        }
      }, 350);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-[#0b3d2e] text-emerald-50 print:hidden">
      <div className="mx-auto flex max-w-[210mm] flex-wrap items-center gap-3 px-4 py-3">
        <p className="min-w-0 flex-1 text-sm leading-snug">
          Pratinjau cetak. Di dialog print, pilih{" "}
          <strong>&ldquo;Simpan sebagai PDF&rdquo;</strong> — aktifkan juga opsi{" "}
          <strong>&ldquo;Grafis latar&rdquo;</strong> agar warna template ikut tersimpan.
        </p>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-full bg-[#cfa52f] px-4 py-2 text-sm font-semibold text-[#0b3d2e] hover:bg-[#dcb845]"
        >
          Unduh PDF
        </button>
        <Link href={`/baca/${slug}`} className="text-sm text-emerald-100 underline underline-offset-4 hover:text-white">
          Kembali ke bacaan
        </Link>
      </div>
    </div>
  );
}
