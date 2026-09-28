import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import ArticleForm from "../ArticleForm";
import { createArticleAction } from "../actions";

export default async function NewArticlePage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login?next=%2Fadmin%2Farticles%2Fnew");

  return (
    <main className="min-h-screen bg-stone-100 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/admin/articles"
          className="text-sm text-stone-500 hover:text-stone-700"
        >
          ← Daftar artikel
        </Link>
        <h1 className="mt-1 text-2xl font-semibold text-stone-900">
          Tulis artikel baru
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Artikel tersimpan sebagai <strong>draft</strong> — tidak terlihat
          publik sampai kamu publish.
        </p>

        <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-6">
          <ArticleForm
            action={createArticleAction}
            submitLabel="Simpan sebagai draft"
          />
        </div>
      </div>
    </main>
  );
}
