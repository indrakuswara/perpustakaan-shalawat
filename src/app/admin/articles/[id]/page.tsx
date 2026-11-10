import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getContentById } from "@/lib/db";
import ArticleForm from "../ArticleForm";
import Notice from "../../Notice";
import SubmitButton from "../../SubmitButton";
import {
  updateArticleAction,
  publishArticleAction,
  unpublishArticleAction,
  deleteArticleAction,
} from "../actions";
import DeleteArticleButton from "../DeleteArticleButton";

export default async function EditArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const { id } = await params;
  const sp = await searchParams;
  const article = await getContentById(id);
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

        {sp.saved === "1" && (
          <div className="mt-4">
            <Notice
              message="Perubahan tersimpan."
              dismissHref={`/admin/articles/${article.id}`}
            />
          </div>
        )}

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
                  <SubmitButton
                    label="Publish sekarang"
                    pendingLabel="Mempublish…"
                    className="rounded-lg bg-emerald-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-900"
                  />
                </form>
              ) : (
                <form
                  action={unpublishArticleAction.bind(null, article.id)}
                  className="inline"
                >
                  <SubmitButton
                    label="Jadikan draft lagi"
                    pendingLabel="Menjadikan draft…"
                    className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-800 transition hover:bg-amber-100"
                  />
                </form>
              )}
              <DeleteArticleButton
                title={article.title}
                status={article.status}
                deleteAction={deleteArticleAction.bind(null, article.id)}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
