// Unit test normalisasi SITE_URL (src/lib/site-url.ts).
// Dijalankan: node --experimental-strip-types scripts/test-site-url.ts
import { normalizeSiteUrl, SITE_URL } from "../src/lib/site-url.ts";

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

ok(
  "undefined -> domain production",
  normalizeSiteUrl(undefined) === "https://perpustakaan-shalawat.vercel.app",
);
ok(
  "trailing slash dibuang",
  normalizeSiteUrl("https://perpustakaan-shalawat.vercel.app/") ===
    "https://perpustakaan-shalawat.vercel.app",
);
ok(
  "multi trailing slash dibuang",
  normalizeSiteUrl("https://example.com///") === "https://example.com",
);
ok(
  "url bersih tidak berubah",
  normalizeSiteUrl("https://example.com") === "https://example.com",
);
ok(
  "SITE_URL ter-export tanpa trailing slash",
  !SITE_URL.endsWith("/"),
);

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
