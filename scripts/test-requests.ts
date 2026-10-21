// Unit test logika murni fitur Request Shalawat & Maulid (src/lib/requests.ts).
// Dijalankan: node scripts/test-requests.ts
//
// Mencakup spec docs/specs/2026-10-21-fitur-request-tanpa-login-design.md:
// §5 normalisasi + pencocokan judul ke artikel terbit, §7 validasi form,
// batas kirim per IP (fungsi murni atas daftar timestamp), dan hash IP.
import {
  normalizeTitle,
  titlesMatch,
  findMatchingArticles,
  validateRequestInput,
  isRateLimited,
  isHoneypotTriggered,
  hashIp,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
} from "../src/lib/requests.ts";

let passed = 0;
let failed = 0;
function ok(name: string, cond: boolean) {
  if (cond) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.log(`  ✗ ${name}`);
  }
}
function eq(name: string, a: unknown, b: unknown) {
  ok(`${name} (=${JSON.stringify(b)})`, JSON.stringify(a) === JSON.stringify(b));
}

console.log("== normalizeTitle ==");
eq("huruf kecil semua", normalizeTitle("Qad Kafani"), "qad kafani");
eq("tanda baca dibuang", normalizeTitle("Maulid Diba'i"), "maulid dibai");
eq(
  "spasi ganda + pinggir dirapikan",
  normalizeTitle("  Ya   Rasulallah  "),
  "ya rasulallah",
);
eq(
  "tanda hubung & titik jadi pemisah kata",
  normalizeTitle("Shalawat Nariyah (Kamilah)."),
  "shalawat nariyah kamilah",
);
eq("angka dipertahankan", normalizeTitle("Rotibul Haddad 2"), "rotibul haddad 2");
eq("string kosong", normalizeTitle("   "), "");

console.log("== titlesMatch ==");
ok("persis sama", titlesMatch("qad kafani", "qad kafani"));
ok(
  "request mengandung artikel",
  titlesMatch("shalawat qad kafani lengkap", "qad kafani"),
);
ok(
  "artikel mengandung request",
  titlesMatch("qad kafani", "shalawat qad kafani"),
);
ok(
  "kata utuh walau urutan beda",
  titlesMatch("diba maulid", "maulid dibai") === false &&
    titlesMatch("diba i maulid", "maulid diba i"),
);
ok(
  "kata pendek sebagai bagian kata TIDAK dihitung cocok",
  !titlesMatch("sim", "simtudduror"),
);
ok("beda total tidak cocok", !titlesMatch("ya hanana", "qad kafani"));
ok("sisi kosong tidak cocok", !titlesMatch("", "qad kafani"));
ok("dua-duanya kosong tidak cocok", !titlesMatch("", ""));

console.log("== findMatchingArticles ==");
const published = [
  { title: "Qad Kafani", slug: "qad-kafani" },
  { title: "Busyro Lana", slug: "busyro-lana" },
  { title: "Maulid Simtudduror", slug: "maulid-simtudduror" },
  { title: "Shalawat Qad Kafani Ilma", slug: "shalawat-qad-kafani-ilma" },
  { title: "Qad Kafani Versi Hadroh", slug: "qad-kafani-versi-hadroh" },
  { title: "Qad Kafani (Lengkap)", slug: "qad-kafani-lengkap" },
];
eq(
  "judul mentah bertanda baca tetap ketemu, urutan sesuai daftar, maks 3",
  findMatchingArticles("Qad Kafani!", published).map((a) => a.slug),
  ["qad-kafani", "shalawat-qad-kafani-ilma", "qad-kafani-versi-hadroh"],
);
eq(
  "substring dua arah ketemu",
  findMatchingArticles("qad kafani", published).length >= 1,
  true,
);
eq(
  "dibatasi maksimal 3",
  findMatchingArticles("Qad Kafani", [
    ...published,
    { title: "Qad Kafani", slug: "duplikat" },
  ]).length,
  3,
);
eq("tidak ketemu = array kosong", findMatchingArticles("Ya Hanana", published), []);
eq("judul request kosong = array kosong", findMatchingArticles("  ", published), []);

console.log("== validateRequestInput ==");
{
  const v = validateRequestInput({
    name: " Budi ",
    title: " Ya Hanana ",
    note: "  yang versi hadroh  ",
  });
  ok("input valid ok", v.ok);
  eq("nama ditrim", v.value.name, "Budi");
  eq("judul ditrim", v.value.title, "Ya Hanana");
  eq("keterangan ditrim", v.value.note, "yang versi hadroh");
}
{
  const v = validateRequestInput({ name: "Budi", title: "Ya Hanana" });
  ok("tanpa keterangan tetap ok", v.ok);
  eq("keterangan kosong jadi null", v.value.note, null);
}
{
  const v = validateRequestInput({ name: "B", title: "Ya Hanana" });
  ok("nama 1 huruf ditolak", !v.ok && !!v.errors.name);
}
{
  const v = validateRequestInput({ name: "", title: "Ya Hanana" });
  ok("nama kosong ditolak", !v.ok && !!v.errors.name);
}
{
  const v = validateRequestInput({ name: "x".repeat(41), title: "Ya Hanana" });
  ok("nama 41 huruf ditolak", !v.ok && !!v.errors.name);
}
{
  const v = validateRequestInput({ name: "Budi", title: "Ya" });
  ok("judul 2 huruf ditolak", !v.ok && !!v.errors.title);
}
{
  const v = validateRequestInput({ name: "Budi", title: "   " });
  ok("judul kosong ditolak", !v.ok && !!v.errors.title);
}
{
  const v = validateRequestInput({ name: "Budi", title: "y".repeat(121) });
  ok("judul 121 huruf ditolak", !v.ok && !!v.errors.title);
}
{
  const v = validateRequestInput({
    name: "Budi",
    title: "Ya Hanana",
    note: "z".repeat(501),
  });
  ok("keterangan 501 huruf ditolak", !v.ok && !!v.errors.note);
}
{
  const v = validateRequestInput({
    name: "Budi",
    title: "Ya Hanana",
    note: "z".repeat(500),
  });
  ok("keterangan tepat 500 huruf diterima", v.ok);
}
{
  const v = validateRequestInput({ name: "Bu", title: "Ya Hanana" });
  ok("nama tepat 2 huruf diterima", v.ok);
}
{
  const v = validateRequestInput({ name: "x".repeat(40), title: "Ya Hanana" });
  ok("nama tepat 40 huruf diterima", v.ok);
}
{
  const v = validateRequestInput({ name: "Budi", title: "Yah" });
  ok("judul tepat 3 huruf diterima", v.ok);
}
{
  const v = validateRequestInput({ name: "Budi", title: "y".repeat(120) });
  ok("judul tepat 120 huruf diterima", v.ok);
}

console.log("== isHoneypotTriggered ==");
ok("kolom terisi = bot", isHoneypotTriggered("http://spam.example"));
ok("kolom kosong = manusia", !isHoneypotTriggered(""));
ok("spasi saja = manusia", !isHoneypotTriggered("   "));
ok("null = manusia", !isHoneypotTriggered(null));
ok("undefined = manusia", !isHoneypotTriggered(undefined));

console.log("== isRateLimited ==");
const now = 1_000_000_000_000;
const within = (n: number) =>
  Array.from({ length: n }, (_, i) => now - (i + 1) * 1000);
ok("di bawah batas aman", !isRateLimited(within(RATE_LIMIT_MAX - 1), now));
ok("tepat di batas = kena limit", isRateLimited(within(RATE_LIMIT_MAX), now));
ok("di atas batas = kena limit", isRateLimited(within(RATE_LIMIT_MAX + 3), now));
{
  const old = Array.from({ length: RATE_LIMIT_MAX }, () => now - RATE_LIMIT_WINDOW_MS - 1000);
  ok("hitungan lama di luar jendela tidak dihitung", !isRateLimited(old, now));
}
{
  const mixed = [...within(2), now - RATE_LIMIT_WINDOW_MS - 5000, now - RATE_LIMIT_WINDOW_MS - 9000];
  ok("campuran: cuma yang di dalam jendela dihitung", !isRateLimited(mixed, now));
}
ok("tanpa hit sama sekali aman", !isRateLimited([], now));

console.log("== hashIp ==");
ok("deterministik", hashIp("203.0.113.7") === hashIp("203.0.113.7"));
ok("ip beda hash beda", hashIp("203.0.113.7") !== hashIp("203.0.113.8"));
ok("hash tidak mengandung ip mentah", !hashIp("203.0.113.7").includes("203.0.113"));

console.log(`\n${passed} lulus, ${failed} gagal`);
if (failed > 0) process.exit(1);
