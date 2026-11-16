// Unit test formatTanggalID (src/lib/format-date.ts).
// Dijalankan: node scripts/test-format-date.ts
import { formatTanggalID } from "../src/lib/format-date.ts";

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

console.log("== formatTanggalID ==");

ok(
  'valid ISO returns "14 Nov 2026"',
  formatTanggalID("2026-11-14T10:00:00.000Z") === "14 Nov 2026",
);

ok(
  "invalid ISO string returns null instead of throwing",
  formatTanggalID("garbage") === null,
);

ok(
  "empty string returns null instead of throwing",
  formatTanggalID("") === null,
);

ok(
  "null returns null, never an empty string",
  formatTanggalID(null) === null,
);

ok(
  "UTC midnight boundary uses the WIB date",
  formatTanggalID("2026-11-13T17:30:00.000Z") === "14 Nov 2026",
);

ok(
  "all 12 months use the Indonesian short forms",
  formatTanggalID("2026-01-15T10:00:00.000Z") === "15 Jan 2026" &&
    formatTanggalID("2026-02-15T10:00:00.000Z") === "15 Feb 2026" &&
    formatTanggalID("2026-03-15T10:00:00.000Z") === "15 Mar 2026" &&
    formatTanggalID("2026-04-15T10:00:00.000Z") === "15 Apr 2026" &&
    formatTanggalID("2026-05-15T10:00:00.000Z") === "15 Mei 2026" &&
    formatTanggalID("2026-06-15T10:00:00.000Z") === "15 Jun 2026" &&
    formatTanggalID("2026-07-15T10:00:00.000Z") === "15 Jul 2026" &&
    formatTanggalID("2026-08-15T10:00:00.000Z") === "15 Agu 2026" &&
    formatTanggalID("2026-09-15T10:00:00.000Z") === "15 Sep 2026" &&
    formatTanggalID("2026-10-15T10:00:00.000Z") === "15 Okt 2026" &&
    formatTanggalID("2026-11-15T10:00:00.000Z") === "15 Nov 2026" &&
    formatTanggalID("2026-12-15T10:00:00.000Z") === "15 Des 2026",
);

console.log(`\n${passed} lulus, ${failed} gagal`);
process.exit(failed ? 1 : 0);
