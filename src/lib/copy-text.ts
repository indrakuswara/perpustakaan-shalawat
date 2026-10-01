// Helper murni untuk menyalin teks ke clipboard.
// Dipakai komponen client (tidak bisa di-test via node) — logikanya di sini
// supaya bisa di-test: scripts/test-copy-text.ts
export async function copyTextToClipboard(text: string): Promise<boolean> {
  // Jalur utama: Clipboard API modern (butuh user gesture + secure context).
  try {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Lanjut ke fallback di bawah.
  }
  // Fallback: textarea sementara + document.execCommand("copy").
  try {
    if (typeof document === "undefined") return false;
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    try {
      ta.select();
      return document.execCommand("copy");
    } finally {
      document.body.removeChild(ta);
    }
  } catch {
    return false;
  }
}
