import test from "node:test";
import assert from "node:assert/strict";
import type { ContentRow } from "./db-types.ts";
import { toArticleApiResponse, toArticleApiResult } from "./article-api.ts";

function row(overrides: Partial<ContentRow> = {}): ContentRow {
  return {
    id: "row-1",
    title: "Qad Kafani",
    slug: "qad-kafani",
    type: "SHALAWAT",
    description: "Qasidah munajat.",
    body: "teks polos",
    status: "PUBLISHED",
    createdAt: "2026-10-04 00:00:00",
    updatedAt: "2026-10-04 00:00:00",
    publishedAt: "2026-10-04 00:00:00",
    blocks: {
      sections: [
        {
          id: "s1",
          title: "Bait 1",
          units: [
            {
              id: "qad-kafani-1",
              arab: "قَدْ كَفَانِيْ عِلْمُ رَبِّيْ",
              latin: "Qad kafani 'ilmu Rabbi",
              translation: "Sungguh telah cukup bagiku pengetahuan Tuhanku",
              english: "The knowledge of my Lord has truly sufficed me",
            },
            { id: "qad-kafani-2", arab: "بait kedua", text: "catatan" },
          ],
        },
        {
          id: "s2",
          title: "Bait 2",
          units: [{ id: "qad-kafani-3", arab: "بait ketiga" }],
        },
      ],
    },
    ...overrides,
  };
}

test("memetakan artikel published ke bentuk kontrak: field + units diratakan", () => {
  const res = toArticleApiResponse(row());
  assert.equal(res.id, "row-1");
  assert.equal(res.title, "Qad Kafani");
  assert.equal(res.slug, "qad-kafani");
  assert.equal(res.type, "SHALAWAT");
  assert.equal(res.description, "Qasidah munajat.");
  assert.equal(res.status, "PUBLISHED");
  assert.equal(res.publishedAt, "2026-10-04T00:00:00.000Z");
  assert.equal(res.units.length, 3);
  assert.deepEqual(res.units[0], {
    id: "qad-kafani-1",
    arab: "قَدْ كَفَانِيْ عِلْمُ رَبِّيْ",
    latin: "Qad kafani 'ilmu Rabbi",
    translation: "Sungguh telah cukup bagiku pengetahuan Tuhanku",
    english: "The knowledge of my Lord has truly sufficed me",
  });
});

test("unit hanya membawa field yang terisi, tidak mengarang field kosong", () => {
  const res = toArticleApiResponse(row());
  assert.deepEqual(res.units[1], {
    id: "qad-kafani-2",
    arab: "بait kedua",
    text: "catatan",
  });
  assert.equal("latin" in res.units[1], false);
});

test("artikel tanpa blok menghasilkan units kosong, bukan error", () => {
  const res = toArticleApiResponse(row({ blocks: null }));
  assert.deepEqual(res.units, []);
});

test("deskripsi null menjadi string kosong agar tetap bertipe string", () => {
  const res = toArticleApiResponse(row({ description: null }));
  assert.equal(res.description, "");
});

test("publishedAt null jatuh ke createdAt dalam format ISO", () => {
  const res = toArticleApiResponse(row({ publishedAt: null }));
  assert.equal(res.publishedAt, "2026-10-04T00:00:00.000Z");
});

test("publishedAt yang ada menang atas createdAt saat keduanya berbeda", () => {
  const res = toArticleApiResponse(
    row({ publishedAt: "2026-10-05 00:00:00", createdAt: "2026-10-04 00:00:00" }),
  );
  assert.equal(res.publishedAt, "2026-10-05T00:00:00.000Z");
});

test("kedua tanggal null menghasilkan string kosong, bukan 500", () => {
  const res = toArticleApiResponse(row({ publishedAt: null, createdAt: "" }));
  assert.equal(res.publishedAt, "");
});

test("urutan units mengikuti urutan section, bukan dikelompokkan ulang", () => {
  const res = toArticleApiResponse(row());
  assert.equal(res.units[2].id, "qad-kafani-3");
  assert.equal(res.units[2].arab, "بait ketiga");
});

test("field string kosong yang memang ada tetap dibawa, bukan dihapus", () => {
  const res = toArticleApiResponse(
    row({
      blocks: {
        sections: [
          {
            id: "s1",
            title: "Bait 1",
            units: [{ id: "u1", arab: "" }],
          },
        ],
      },
    }),
  );
  assert.equal(res.units[0].arab, "");
});

test("keputusan route: null menghasilkan 404 dengan body kontrak", () => {
  const res = toArticleApiResult(null);
  assert.equal(res.status, 404);
  assert.deepEqual(res.body, { error: "Article not found" });
});

test("keputusan route: artikel menghasilkan 200 dengan body pemetaan", () => {
  const res = toArticleApiResult(row());
  assert.equal(res.status, 200);
  assert.equal(res.body.slug, "qad-kafani");
});
