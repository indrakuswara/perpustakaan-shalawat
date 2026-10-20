// Unit test data pola hadroh (src/lib/hadroh-patterns.ts).
// Dijalankan: node scripts/test-hadroh-patterns.ts
//
// Data pola = transkripsi dokumen sumber, BUKAN karangan:
// - 4 track terbang: dokumen "Rumus Banjari" (Scribd 498686042), bagian
//   Dasar / Naik / Turun. "D)" di awal tiap baris = pukulan pembuka sekali
//   jalan (pickup), bukan bagian loop.
// - Track bass: dokumen "Notasi Pukulan Banjari" oleh Nuqthoh Assirrul
//   Jami' (Scribd), tipe Bass pola 1 — pola yang sama di semua bagian
//   (bass = penjaga tempo).
// Cross-check: baris Golong Wedokan & Golong Lanangan bagian Dasar dari
// "Rumus Banjari" identik dengan pola 1 tipe Nggolong Nganai & Nikai di
// dokumen Nuqthoh — dua dokumen independen sepakat.
import {
  TRACKS,
  SECTIONS,
  parseRumus,
  sectionSteps,
  type TrackDef,
} from "../src/lib/hadroh-patterns.ts";

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
function throws(name: string, fn: () => unknown) {
  try {
    fn();
    ok(name, false);
  } catch {
    ok(name, true);
  }
}

// ---- parser ----
{
  const steps = parseRumus(". TT DD D TT T D");
  eq("parser: jumlah langkah Lanangan Dasar", steps.length, 10);
  eq("parser: langkah 0 jeda", steps[0].hit, null);
  eq("parser: TT jadi 2 langkah cepat", [steps[1], steps[2]], [
    { hit: "T", fast: true },
    { hit: "T", fast: true },
  ]);
  eq("parser: DD jadi 2 langkah cepat", [steps[3], steps[4]], [
    { hit: "D", fast: true },
    { hit: "D", fast: true },
  ]);
  eq("parser: huruf tunggal tidak cepat", steps[5], { hit: "D", fast: false });
  eq("parser: TD = pasangan cepat beda huruf", parseRumus("TD"), [
    { hit: "T", fast: true },
    { hit: "D", fast: true },
  ]);
  eq("parser: titik saja", parseRumus("."), [{ hit: null, fast: false }]);
  eq("parser: huruf kecil d valid", parseRumus("d d"), [
    { hit: "d", fast: false },
    { hit: "d", fast: false },
  ]);
  throws("parser: simbol asing ditolak", () => parseRumus("D X T"));
  throws("parser: string kosong ditolak", () => parseRumus("  "));
}

// ---- katalog ----
{
  eq(
    "katalog: 5 track urut",
    TRACKS.map((t) => t.id),
    ["lanangan", "wedokan", "golong-lanangan", "golong-wedokan", "bass"]
  );
  eq(
    "katalog: 3 bagian urut",
    SECTIONS.map((s) => s.id),
    ["dasar", "naik", "turun"]
  );

  const byId = (id: string): TrackDef => {
    const t = TRACKS.find((x) => x.id === id);
    if (!t) throw new Error(`track ${id} hilang`);
    return t;
  };

  for (const t of TRACKS) {
    for (const s of SECTIONS) {
      const steps = sectionSteps(t, s.id);
      ok(`${t.id}/${s.id}: langkah > 0`, steps.length > 0);
      ok(
        `${t.id}/${s.id}: simbol hanya D/T/d`,
        steps.every((st) => st.hit === null || ["D", "T", "d"].includes(st.hit))
      );
    }
    ok(`${t.id}: sumber tercantum`, t.source.length > 10);
  }

  // Panjang grid per bagian — sesuai hitungan manual dari dokumen sumber.
  const len = (id: string, s: "dasar" | "naik" | "turun") =>
    sectionSteps(byId(id), s).length;
  eq("panjang dasar lanangan", len("lanangan", "dasar"), 10);
  eq("panjang dasar wedokan", len("wedokan", "dasar"), 10);
  eq("panjang dasar golong-lanangan", len("golong-lanangan", "dasar"), 8);
  eq("panjang dasar golong-wedokan", len("golong-wedokan", "dasar"), 8);
  eq("panjang dasar bass", len("bass", "dasar"), 9);
  eq("panjang naik lanangan", len("lanangan", "naik"), 10);
  eq("panjang naik wedokan", len("wedokan", "naik"), 10);
  eq("panjang naik golong-lanangan", len("golong-lanangan", "naik"), 8);
  eq("panjang naik golong-wedokan", len("golong-wedokan", "naik"), 8);
  eq("panjang turun lanangan", len("lanangan", "turun"), 10);
  eq("panjang turun wedokan", len("wedokan", "turun"), 10);
  eq("panjang turun golong-lanangan", len("golong-lanangan", "turun"), 8);
  eq("panjang turun golong-wedokan", len("golong-wedokan", "turun"), 8);

  // Pickup: terbang punya pukulan pembuka D, bass tidak.
  for (const id of ["lanangan", "wedokan", "golong-lanangan", "golong-wedokan"]) {
    eq(`pickup ${id} = D`, byId(id).pickup, "D");
  }
  eq("pickup bass = null", byId("bass").pickup, null);

  // Bass memakai pola yang sama di semua bagian (penjaga tempo).
  eq(
    "bass identik di semua bagian",
    [
      sectionSteps(byId("bass"), "dasar"),
      sectionSteps(byId("bass"), "naik"),
      sectionSteps(byId("bass"), "turun"),
    ].map((x) => JSON.stringify(x)),
    Array(3).fill(JSON.stringify(sectionSteps(byId("bass"), "dasar")))
  );

  // Cross-check dua dokumen: [pickup, ...langkah] golong dasar harus sama
  // persis dengan pola 1 dokumen Nuqthoh.
  const symbols = (t: TrackDef, s: "dasar") =>
    [t.pickup, ...sectionSteps(t, s).map((st) => st.hit ?? ".")].join(" ");
  eq(
    "cross-check golong-wedokan dasar = Nuqthoh Nggolong Nganai 1",
    symbols(byId("golong-wedokan"), "dasar"),
    "D . T . D D T . D"
  );
  eq(
    "cross-check golong-lanangan dasar = Nuqthoh Nikai 1",
    symbols(byId("golong-lanangan"), "dasar"),
    "D T . D D D . T D"
  );
}

console.log(`\n${passed} lulus, ${failed} gagal`);
if (failed > 0) process.exit(1);
