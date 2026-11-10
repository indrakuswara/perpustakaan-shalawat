"use client";

import { useFormStatus } from "react-dom";

// Tombol submit untuk form server action di admin. Selama aksi
// berjalan, tombol menampilkan label pending dan tidak bisa diklik
// dua kali (temuan UX 2026-11-10: tombol admin diam tanpa umpan
// balik saat diklik, padahal aksinya sudah terjadi di belakang).
export default function SubmitButton({
  label,
  pendingLabel,
  className,
}: {
  label: string;
  pendingLabel: string;
  className: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      // Tampilan disabled dipanggang di sini supaya call site baru tidak
      // bisa lupa: tombol tetap disabled secara fungsi, hanya tampilan
      // yang luput kalau styling-nya ditulis per call site.
      className={`${className} disabled:cursor-not-allowed disabled:opacity-70`}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
