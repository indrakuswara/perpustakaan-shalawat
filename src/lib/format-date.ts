// Format tanggal Indonesia singkat, zona Asia/Jakarta (spec 11.3).
// Contoh: formatTanggalID("2026-11-14T10:00:00.000Z") === "14 Nov 2026".

// Daftar singkat bulan Indonesia (spec 11.3):
// Jan, Feb, Mar, Apr, Mei, Jun, Jul, Agu, Sep, Okt, Nov, Des.
// Normalisasi token bulan dari Intl ke daftar singkat di atas.
// Intl id-ID umumnya sudah mengeluarkan bentuk yang sama, tapi jangan
// berasumsi: varian seperti "Agt" (Agustus) atau "Oct" tetap dipetakan.
const MONTH_ALIASES: Record<string, string> = {
  Jan: "Jan",
  Feb: "Feb",
  Mar: "Mar",
  Apr: "Apr",
  Mei: "Mei",
  May: "Mei",
  Jun: "Jun",
  Jul: "Jul",
  Agu: "Agu",
  Agt: "Agu",
  Aug: "Agu",
  Sep: "Sep",
  Okt: "Okt",
  Oct: "Okt",
  Nov: "Nov",
  Des: "Des",
  Dec: "Des",
};

const WIB_FORMATTER = new Intl.DateTimeFormat("id-ID", {
  timeZone: "Asia/Jakarta",
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatTanggalID(iso: string | null): string | null {
  if (iso === null) return null;
  const date = new Date(iso);
  if (isNaN(date.getTime())) return null;
  const parts = WIB_FORMATTER.formatToParts(date);
  const day = parts.find((p) => p.type === "day")?.value;
  const monthToken = parts.find((p) => p.type === "month")?.value;
  const year = parts.find((p) => p.type === "year")?.value;
  if (!day || !monthToken || !year) return null;
  const month = MONTH_ALIASES[monthToken] ?? monthToken;
  return `${day} ${month} ${year}`;
}
