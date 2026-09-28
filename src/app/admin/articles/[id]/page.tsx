import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getContentById } from "@/lib/db";
import ArticleForm from "../ArticleForm";
import {
  updateArticleAction,
  publishArticleAction,
  unpublishArticleAction,
  deleteArticleAction,
} from "../actions";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const { id } = await params;
  const article = getContentById(id);
  if (!article) notFound();

  const isDraft = article.status === "DRAFT";

  return (
    <main className="min-h-screen bg-stone-100 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/admin/articles"
          className="text-sm text-stone-500 hover:text-stone-700"
        >
          ← Daftar artikel
        </Link>
        <div className="mt-1 flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-stone-900">Edit artikel</h1>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              isDraft
                ? "bg-amber-100 text-amber-800"
                : "bg-emerald-100 text-emerald-800"
            }`}
          >
            {isDraft ? "Draft" : "Published"}
          </span>
        </div>

        <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-6">
          <ArticleForm
            action={updateArticleAction.bind(null, article.id)}
            initial={article}
            submitLabel="Simpan perubahan"
          />

          <div className="mt-6 border-t border-stone-200 pt-4">
            <p className="text-sm font-medium text-stone-700">Status</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Link
                href={`/admin/articles/${article.id}/preview`}
                className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
              >
                Preview
              </Link>
              {isDraft ? (
                <form
                  action={publishArticleAction.bind(null, article.id)}
                  className="inline"
                >
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-900"
                  >
                    Publish sekarang
                  </button>
                </form>
              ) : (
                <form
                  action={unpublishArticleAction.bind(null, article.id)}
                  className="inline"
                >
                  <button
                    type="submit"
                    className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-800 transition hover:bg-amber-100"
                  >
                    Jadikan draft lagi
                  </button>
                </form>
              )}
              <form
                action={deleteArticleAction.bind(null, article.id)}
                className="inline"
              >
                <button
                  type="submit"
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Hapus
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
