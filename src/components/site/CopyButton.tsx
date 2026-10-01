"use client";

import { useEffect, useRef, useState } from "react";
import { copyTextToClipboard } from "@/lib/copy-text";

type CopyState = "idle" | "copied" | "failed";

// Tombol salin kecil per lapis teks (Arab / terjemah).
// Target sentuh min 44px supaya nyaman di mobile; selalu terlihat (tanpa hover-only).
// aria-label stabil — status diumumkan lewat live region, bukan dengan mengganti nama tombol.
export default function CopyButton({
  text,
  label,
}: {
  text: string;
  label: string;
}) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function flash(next: CopyState) {
    setState(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }

  async function handleCopy() {
    const ok = await copyTextToClipboard(text);
    flash(ok ? "copied" : "failed");
  }

  const statusText =
    state === "copied"
      ? "Disalin"
      : state === "failed"
        ? "Gagal menyalin, coba lagi"
        : "";

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label}
      title={label}
      className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 focus-visible:outline-2 focus-visible:outline-emerald-800 active:text-stone-900"
    >
      {state === "copied" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-emerald-700">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : state === "failed" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden className="text-red-600">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      <span aria-live="polite" className="sr-only">
        {statusText}
      </span>
    </button>
  );
}
