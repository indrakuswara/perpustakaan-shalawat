"use client";

import { useEffect, useRef, useState } from "react";
import { buildShareLinks } from "@/lib/share";
import { copyTextToClipboard } from "@/lib/copy-text";

type CopyState = "idle" | "copied" | "failed";

// Tombol Bagikan untuk SATU artikel (link kanonis halaman baca).
// - Browser dengan Web Share API (umumnya mobile): share sheet bawaan.
// - Selain itu: menu fallback WhatsApp / Telegram / Salin tautan.
// Batal dari share sheet (AbortError) = diam, bukan error.
// Target sentuh min 44px; status salin diumumkan via live region.
export default function ShareButton({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [open, setOpen] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const wrapRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const links = buildShareLinks(title, url);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function handleMainClick() {
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function"
    ) {
      try {
        await navigator.share({ title, text: links.text, url });
        return;
      } catch (e) {
        // User membatalkan share sheet — bukan error, jangan buka menu.
        if (e instanceof DOMException && e.name === "AbortError") return;
        // Error lain: lanjut ke menu fallback di bawah.
      }
    }
    setOpen((v) => !v);
  }

  async function handleCopy() {
    const ok = await copyTextToClipboard(url);
    setCopyState(ok ? "copied" : "failed");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCopyState("idle");
      setOpen(false);
    }, 1600);
  }

  const copyStatus =
    copyState === "copied"
      ? "Tautan disalin"
      : copyState === "failed"
        ? "Gagal menyalin, coba lagi"
        : "";

  const itemClass =
    "flex min-h-[44px] w-full items-center gap-3 px-4 py-2 text-left text-sm text-stone-700 transition hover:bg-stone-50 focus-visible:bg-stone-50 focus-visible:outline-none";

  return (
    <div ref={wrapRef} className="relative inline-block">
      <button
        type="button"
        onClick={handleMainClick}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-emerald-900 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 active:bg-emerald-950"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.6 10.6 6.8-4.2M8.6 13.4l6.8 4.2" />
        </svg>
        Bagikan
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Bagikan melalui"
          className="absolute left-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-stone-200 bg-white py-1 shadow-lg"
        >
          <a
            role="menuitem"
            href={links.whatsapp}
            target="_blank"
            rel="noreferrer"
            className={itemClass}
            onClick={() => setOpen(false)}
          >
            WhatsApp
          </a>
          <a
            role="menuitem"
            href={links.telegram}
            target="_blank"
            rel="noreferrer"
            className={itemClass}
            onClick={() => setOpen(false)}
          >
            Telegram
          </a>
          <button
            type="button"
            role="menuitem"
            onClick={handleCopy}
            className={itemClass}
          >
            {copyState === "copied" ? "Tautan disalin ✓" : "Salin tautan"}
          </button>
          <span aria-live="polite" className="sr-only">
            {copyStatus}
          </span>
        </div>
      )}
    </div>
  );
}
