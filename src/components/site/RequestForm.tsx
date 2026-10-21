"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  submitRequestAction,
  type SubmitRequestState,
} from "@/lib/request-actions";
import type { RequestKind } from "@/lib/requests";

const INITIAL: SubmitRequestState = { status: "idle" };

const inputCls =
  "w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/15";
const labelCls = "block text-sm font-medium text-stone-700";

// Pembungkus: tombol "Kirim request lain" me-remount form bagian dalam
// (key berubah) supaya state useActionState mulai dari nol lagi —
// navigasi Link ke halaman yang sama TIDAK me-reset state komponen.
export default function RequestForm({ kind }: { kind: RequestKind }) {
  const [nonce, setNonce] = useState(0);
  return (
    <RequestFormInner
      key={nonce}
      kind={kind}
      onReset={() => setNonce((n) => n + 1)}
    />
  );
}

function RequestFormInner({
  kind,
  onReset,
}: {
  kind: RequestKind;
  onReset: () => void;
}) {
  const [state, dispatch, isPending] = useActionState(
    submitRequestAction,
    INITIAL,
  );
  // Nilai kolom dipegang state React (controlled): sesudah server action
  // selesai, React me-reset kolom uncontrolled — tanpa ini, satu error
  // validasi menghapus semua yang sudah diketik pengunjung (spec §4:
  // nilai yang sudah diisi tidak boleh hilang).
  const [fields, setFields] = useState({ name: "", title: "", note: "" });
  const jenis = kind === "shalawat" ? "Shalawat" : "Maulid";
  const errors = state.status === "error" ? state.errors : {};

  if (state.status === "found") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="font-serif text-xl font-semibold text-emerald-950">
          Sudah tersedia!
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-emerald-900">
          Judul yang kamu cari ternyata sudah ada di koleksi kami:
        </p>
        <ul className="mt-3 space-y-2">
          {state.articles.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/baca/${a.slug}`}
                className="font-medium text-emerald-900 underline decoration-emerald-300 underline-offset-2 transition hover:decoration-emerald-700"
              >
                {a.title}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-emerald-900">
          Kalau bukan ini yang kamu maksud, coba tulis judulnya lebih
          spesifik lalu kirim lagi.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-4 inline-block rounded-lg border border-emerald-800 px-4 py-2 text-sm font-medium text-emerald-900 transition hover:bg-emerald-100"
        >
          Kirim request lain
        </button>
      </div>
    );
  }

  if (state.status === "saved" || state.status === "duplicate" || state.status === "limited") {
    const panel =
      state.status === "saved"
        ? {
            title: "Terima kasih!",
            body: "Request kamu sudah kami terima dan akan ditinjau secara manual. Tidak semua request bisa kami penuhi, tapi semuanya kami baca.",
            cls: "border-emerald-200 bg-emerald-50 text-emerald-900",
          }
        : state.status === "duplicate"
          ? {
              title: "Request ini sudah tercatat",
              body: "Judul yang sama dari nama yang sama sudah ada di antrian kami — tidak perlu dikirim ulang.",
              cls: "border-amber-200 bg-amber-50 text-amber-900",
            }
          : {
              title: "Terlalu banyak kiriman",
              body: "Batas kirim untuk saat ini sudah tercapai. Silakan coba lagi kira-kira satu jam lagi.",
              cls: "border-amber-200 bg-amber-50 text-amber-900",
            };
    return (
      <div className={`rounded-2xl border p-6 ${panel.cls}`}>
        <h2 className="font-serif text-xl font-semibold">{panel.title}</h2>
        <p className="mt-2 text-sm leading-relaxed">{panel.body}</p>
        <button
          type="button"
          onClick={onReset}
          className="mt-4 inline-block rounded-lg border border-current px-4 py-2 text-sm font-medium transition hover:bg-white/50"
        >
          Kirim request lain
        </button>
      </div>
    );
  }

  return (
    <form action={dispatch} className="space-y-5">
      <input type="hidden" name="kind" value={kind} />
      {/* Honeypot anti-bot: disembunyikan dari manusia, jangan diisi. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="req-name" className={labelCls}>
          Nama panggilan
        </label>
        <input
          id="req-name"
          name="name"
          type="text"
          required
          maxLength={40}
          autoComplete="off"
          placeholder="Nama atau panggilan kamu"
          value={fields.name}
          onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
          className={inputCls}
        />
        {errors.name && (
          <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="req-title" className={labelCls}>
          Judul {jenis.toLowerCase()}
        </label>
        <input
          id="req-title"
          name="title"
          type="text"
          required
          maxLength={120}
          autoComplete="off"
          placeholder="Tulis judul yang kamu cari"
          value={fields.title}
          onChange={(e) => setFields((f) => ({ ...f, title: e.target.value }))}
          className={inputCls}
        />
        {errors.title && (
          <p className="mt-1.5 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="req-note" className={labelCls}>
          Keterangan / link referensi (opsional)
        </label>
        <textarea
          id="req-note"
          name="note"
          rows={4}
          maxLength={500}
          placeholder="Ceritakan versi yang kamu maksud, atau tempel link YouTube/teksnya di sini…"
          value={fields.note}
          onChange={(e) => setFields((f) => ({ ...f, note: e.target.value }))}
          className={inputCls}
        />
        {errors.note && (
          <p className="mt-1.5 text-sm text-red-600">{errors.note}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-950 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      >
        {isPending ? "Mengirim…" : "Kirim Request"}
      </button>
    </form>
  );
}
