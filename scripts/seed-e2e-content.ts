// Seed one published article for the Playwright pre-deploy gate.
//
// The CI/local SQLite database starts empty, so the public smoke tests
// would otherwise have no published article to open or search for.
// This script is idempotent (it does nothing if the slug already
// exists) and is ONLY for ephemeral test databases. It must never run
// against production: production already has real articles, and the
// post-deploy smoke suite creates and deletes its own test article.
import {
  createContent,
  publishContent,
  getPublishedBySlug,
} from "../src/lib/db.ts";

const TITLE = "E2E Seed Bacaan Deploy";

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
  const slug = "e2e-seed-bacaan-deploy";
  if (await getPublishedBySlug(slug)) {
    console.log("Seed article already published, skipping.");
    return;
  }
  const article = await createContent({
    title: TITLE,
    type: "SHALAWAT",
    description: "Artikel dummy untuk tes deploy, bukan konten asli.",
    body: "Isi dummy untuk tes deploy.",
    blocks: {
      sections: [
        {
          id: "seed-section",
          title: "Bagian dummy",
          units: [{ id: "seed-unit", text: "Isi dummy untuk tes deploy." }],
        },
      ],
    },
  });
  await publishContent(article.id);
  console.log(`Seed article published: ${article.slug}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
