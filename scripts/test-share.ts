// Unit test helper share (src/lib/share.ts).
// Dijalankan: node --experimental-strip-types scripts/test-share.ts
import { buildShareLinks, buildShareText } from "../src/lib/share.ts";

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

const URL = "https://perpustakaan-shalawat.vercel.app/baca/maulid-dibai";

// buildShareText
ok(
  "teks memuat judul + nama situs",
  buildShareText("Maulid Diba'i") ===
    "Maulid Diba'i — Perpustakaan Digital Shalawat & Maulid",
);
ok(
  "judul kosong -> hanya nama situs",
  buildShareText("   ") === "Perpustakaan Digital Shalawat & Maulid",
);
ok(
  "judul di-trim",
  buildShareText("  X  ") === "X — Perpustakaan Digital Shalawat & Maulid",
);

// buildShareLinks — WhatsApp
{
  const links = buildShareLinks("Maulid Diba'i", URL);
  ok("wa diawali wa.me", links.whatsapp.startsWith("https://wa.me/?text="));
  const waText = decodeURIComponent(links.whatsapp.slice("https://wa.me/?text=".length));
  ok("wa text memuat judul", waText.includes("Maulid Diba'i"));
  ok("wa text memuat url", waText.includes(URL));
  ok("wa url ter-encode (tidak ada :// mentah)", !links.whatsapp.includes("https://perpustakaan"));
}

// buildShareLinks — Telegram
{
  const links = buildShareLinks("Maulid Diba'i", URL);
  ok(
    "telegram format benar",
    links.telegram.startsWith("https://t.me/share/url?url="),
  );
  const params = new URLSearchParams(links.telegram.split("?")[1]);
  ok("telegram url param utuh", params.get("url") === URL);
  ok(
    "telegram text param = share text",
    params.get("text") === buildShareText("Maulid Diba'i"),
  );
}

// Judul berkarakter khusus tidak merusak URL.
{
  const links = buildShareLinks("A & B: 100% \"Hebat\"", URL);
  const params = new URLSearchParams(links.telegram.split("?")[1]);
  ok(
    "judul spesial aman di telegram",
    params.get("text") === buildShareText("A & B: 100% \"Hebat\""),
  );
  ok(
    "judul spesial aman di wa",
    decodeURIComponent(links.whatsapp.split("text=")[1]).includes("A & B: 100%"),
  );
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
