import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getContentById } from "@/lib/db";
import ReaderView from "@/components/site/ReaderView";
import { publishArticleAction } from "../../actions";

const TYPE_LABEL = { SHALAWAT: "Shalawat", MAULID: "Maulid" } as const;

export default async function ArticlePreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const { id } = await params;
  const article = await getContentById(id);
  if (!article) notFound();

  const isDraft = article.status === "DRAFT";

  return (
    <main className="min-h-screen bg-stone-100">
      <div
        className={`px-4 py-2 text-center text-sm font-medium ${
          isDraft ? "bg-amber-100 text-amber-900" : "bg-emerald-100 text-emerald-900"
        }`}
      >
        {isDraft
          ? "Pratinjau draft — hanya admin yang bisa melihat ini"
          : "Pratinjau versi published"}
      </div>

      <div className="px-4 py-10">
        <article className={article.blocks ? "mx-auto max-w-5xl rounded-2xl border border-stone-200 bg-white p-8 shadow-sm md:p-12" : "mx-auto max-w-2xl rounded-2xl border border-stone-200 bg-white p-8 shadow-sm md:p-12"}>
          <p className="text-sm font-medium tracking-wide text-emerald-800 uppercase">
            {TYPE_LABEL[article.type]}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-900">
            {article.title}
          </h1>
          {article.description && (
            <p className="mt-3 text-stone-500 italic">{article.description}</p>
          )}
          <hr className="my-8 border-stone-200" />
          {article.blocks ? (
            <ReaderView blocks={article.blocks} />
          ) : (
            <div className="font-serif text-lg leading-loose whitespace-pre-wrap text-stone-800 md:text-justify">
              {article.body}
            </div>
          )}
        </article>

        <div className="mx-auto mt-6 flex max-w-2xl flex-wrap gap-2">
          <Link
            href={`/admin/articles/${article.id}`}
            className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
          >
            ← Kembali edit
          </Link>
          {isDraft && (
            <form
              action={publishArticleAction.bind(null, article.id)}
              className="inline"
            >
              <button
                type="submit"
                className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-900"
              >
                Publish artikel ini
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
