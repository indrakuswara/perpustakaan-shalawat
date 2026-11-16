// Seed two published articles for the Playwright pre-deploy gate.
//
// The CI/local SQLite database starts empty, so the public smoke tests
// would otherwise have no published article to open or search for.
// The second article has a NULL description on purpose: it makes the
// ArticleCard description-guard assertion in e2e/redesign.spec.ts
// actually bite in CI (a broken guard rendering an empty <p> would
// otherwise go unnoticed, because the first article has a description).
// This script is idempotent (it does nothing if the slug already
// exists) and is ONLY for ephemeral test databases. It must never run
// against production: production already has real articles, and the
// post-deploy smoke suite creates and deletes its own test article.
import {
  createContent,
  publishContent,
  getPublishedBySlug,
  slugify,
} from "../src/lib/db.ts";

const TITLE = "E2E Seed Bacaan Deploy";
// Title for the NULL-description seed article. The slug is derived
// from the title ("e2e-seed-bacaan-tanpa-deskripsi"), so it must stay
// distinct from TITLE above.
const NULL_DESC_TITLE = "E2E Seed Bacaan Tanpa Deskripsi";

async function seedArticle(
  title: string,
  description: string | undefined,
): Promise<void> {
  const slug = slugify(title);
  if (await getPublishedBySlug(slug)) {
    console.log(`Seed article already published, skipping: ${slug}`);
    return;
  }
  const article = await createContent({
    title,
    type: "SHALAWAT",
    // description intentionally omitted for the NULL-description
    // article: createContent stores NULL when it is undefined.
    ...(description !== undefined ? { description } : {}),
    body: "Isi dummy untuk tes deploy.",
    blocks: {
      sections: [
        {
          id: "seed-section",
          title: "Bagian dummy",
          // Lapis English sengaja ada di unit seed ini: test print
          // e2e mengunci warna computed text-english di halaman
          // cetak artikel ini, jadi lapis itu harus ikut ter-render
          // (tanpa ini, pin warna English tidak punya elemen).
          units: [
            {
              id: "seed-unit",
              text: "Isi dummy untuk tes deploy.",
              english: "English dummy for print test.",
            },
          ],
        },
      ],
    },
  });
  await publishContent(article.id);
  console.log(`Seed article published: ${article.slug}`);
}

async function main(): Promise<void> {
  // Hard guard, not just a comment: this script is only ever meant
  // for ephemeral SQLite test databases. Refuse outright against
  // Postgres so a stray DATABASE_URL cannot publish a dummy
  // article into production.
  const dbUrl = process.env.DATABASE_URL ?? "";
  if (dbUrl.startsWith("postgres://") || dbUrl.startsWith("postgresql://")) {
    throw new Error(
      "seed-e2e-content refuses to run against Postgres (production-like database).",
    );
  }
  // Each article is seeded independently: a database seeded by the
  // old one-article script must still gain the second article on
  // the next run, instead of returning early after the first hit.
  await seedArticle(TITLE, "Artikel dummy untuk tes deploy, bukan konten asli.");
  await seedArticle(NULL_DESC_TITLE, undefined);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
