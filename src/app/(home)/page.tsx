import Image from "next/image";
import Link from "next/link";
import { listPublishedContents } from "@/lib/db";
import { formatTanggalID } from "@/lib/format-date";
import {
  buildDailyPool,
  pickDailyInspiration,
} from "@/lib/daily-inspiration";
import SearchForm from "@/components/site/SearchForm";

// Koleksi Pilihan: empat kartu statis (spec 7.4). Slug diverifikasi
// ke situs live sebelum ditulis di sini (2026-11-16):
// maulid-dibai, maulid-simtudduror (dari tautan /maulid), qad-kafani,
// lakum-busyro — keempatnya membuka halaman artikel asli di production.
const KOLEKSI = [
  {
    slug: "maulid-dibai",
    title: "Maulid Diba'i",
    type: "Maulid",
    image: "/images/koleksi-dibai.jpg",
    alt: "Kubah Hijau Masjid Nabawi di Madinah",
    line: "Maulid Ad-Diba'i lengkap dengan terjemah bahasa Indonesia.",
    position: "object-center",
  },
  {
    slug: "maulid-simtudduror",
    title: "Maulid Simtudduror",
    type: "Maulid",
    image: "/images/koleksi-simtudduror.jpg",
    alt: "Masjid Süleymaniye di Istanbul saat senja",
    line: "Maulid Simtudduror karya Habib Ali bin Muhammad Al-Habsyi.",
    position: "object-[50%_12%]",
  },
  {
    slug: "qad-kafani",
    title: "Qad Kafani",
    type: "Shalawat",
    image: "/images/koleksi-qad-kafani.jpg",
    alt: "Kaligrafi dan kubah di dalam Masjid Ulu Cami, Bursa",
    line: "Qasidah munajat karya Imam Abdullah bin 'Alawi al-Haddad.",
    position: "object-center",
  },
  {
    slug: "lakum-busyro",
    title: "Lakum Busyro",
    type: "Shalawat",
    image: "/images/koleksi-lakum-busyro.jpg",
    alt: "Interior kubah Masjid Çamlıca di Istanbul",
    line: "Qasidah sambutan masyhur karya Al-Habib Ali bin Muhammad Al-Habsyi.",
    position: "object-top",
  },
] as const;

// object-position per foto: tiga foto Koleksi adalah potret, slot kartu
// lansekap 4:3 memotong sekitar 40-50% tingginya. Simtudduror diposisikan
// ke atas supaya masjid dan menaranya utuh; Lakum Busyro ke atas supaya
// medalion kubah tetap terlihat; Qad Kafani dan Diba'i aman di tengah.

const MAKNA = [
  {
    title: "Arab, Latin, dan Artinya",
    text: "Setiap bait tampil lengkap empat lapis: teks Arab, Latin, Terjemahan, dan English, dibaca berdampingan dalam satu kartu bait.",
  },
  {
    title: "Unduh PDF",
    text: "Unduh bacaan sebagai PDF, untuk disimpan, dibaca ulang, dan dibagikan kapan saja.",
  },
  {
    title: "Request Tanpa Login",
    text: "Usulkan judul shalawat atau maulid yang belum ada di perpustakaan, tanpa perlu masuk atau membuat akun.",
  },
] as const;

export default async function HomePage() {
  // Satu kali fetch; hitungan chip, Terbaru, dan pool Daily Inspiration
  // semuanya diturunkan dari hasil yang sama.
  const articles = await listPublishedContents(undefined, "published");
  const shalawatCount = articles.filter((a) => a.type === "SHALAWAT").length;
  const maulidCount = articles.filter((a) => a.type === "MAULID").length;
  const latest = articles.slice(0, 6);
  const inspiration = pickDailyInspiration(
    buildDailyPool(articles),
    new Date(),
  );

  return (
    <main>
      {/* Hero: gelap dari tepi atas supaya nav terang di atasnya terbaca */}
      <section className="relative overflow-hidden bg-emerald-950">
        <Image
          src="/images/hero-sheikh-zayed.jpg"
          alt="Masjid Agung Sheikh Zayed di Abu Dhabi saat senja, memantul di kolam"
          fill
          priority
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-emerald-950/75 via-emerald-950/55 to-emerald-950/90"
        />
        <div className="relative mx-auto max-w-5xl px-4 pt-28 pb-16 text-center md:pt-36 md:pb-24">
          <h1 className="mx-auto max-w-3xl font-display text-[40px] leading-[1.1] text-on-dark md:text-[56px]">
            Keindahan Sholawat, Dalam Satu Ruang.
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-serif text-lg leading-relaxed text-on-dark-muted">
            Jelajahi lantunan, temukan makna, dan kenali warisan shalawat
            yang terus hidup dari generasi ke generasi.
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <SearchForm size="lg" />
          </div>
          <div className="mt-6 flex items-center justify-center gap-3 text-sm">
            <Link
              href="/shalawat"
              className="rounded-full border border-white/40 bg-white/10 px-4 py-2 font-medium text-on-dark backdrop-blur-sm transition hover:border-gold-soft hover:text-gold-soft"
            >
              {shalawatCount} Shalawat
            </Link>
            <Link
              href="/maulid"
              className="rounded-full border border-white/40 bg-white/10 px-4 py-2 font-medium text-on-dark backdrop-blur-sm transition hover:border-gold-soft hover:text-gold-soft"
            >
              {maulidCount} Maulid
            </Link>
          </div>
        </div>
      </section>

      {/* Koleksi Pilihan */}
      <section className="mx-auto max-w-5xl px-4 py-14 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl text-ink md:text-4xl">
            Koleksi Pilihan
          </h2>
          <Link
            href="/search"
            className="shrink-0 text-sm font-medium text-emerald-900 underline decoration-emerald-900/30 underline-offset-4 transition hover:text-gold-deep"
          >
            Lihat semua
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {KOLEKSI.map((item) => (
            <Link
              key={item.slug}
              href={`/baca/${item.slug}`}
              className="group overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={`object-cover ${item.position}`}
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                  {item.type}
                </p>
                <h3 className="mt-1 font-display text-xl text-ink">
                  {item.title}
                </h3>
                <p className="mt-1.5 font-serif text-sm leading-relaxed text-muted md:text-justify">
                  {item.line}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-emerald-900 transition group-hover:text-gold-deep group-hover:underline group-hover:underline-offset-4">
                  Baca selengkapnya
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Terbaru: daftar bertanggal, bukan bernomor */}
      <section className="mx-auto max-w-5xl px-4 pb-14 md:pb-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl text-ink md:text-4xl">
            Terbaru
          </h2>
          <Link
            href="/search"
            className="shrink-0 text-sm font-medium text-emerald-900 underline decoration-emerald-900/30 underline-offset-4 transition hover:text-gold-deep"
          >
            Lihat semua
          </Link>
        </div>
        {latest.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-line bg-white/60 p-10 text-center text-sm text-muted">
            Belum ada bacaan yang dipublish. Silakan kembali lagi nanti.
          </p>
        ) : (
          <ul className="mt-6">
            {latest.map((a) => {
              const date = formatTanggalID(a.publishedAt);
              return (
                <li
                  key={a.id}
                  className="border-b border-line py-5 first:pt-0 last:border-b-0"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-8">
                    {date && (
                      <time
                        dateTime={a.publishedAt ?? undefined}
                        className="shrink-0 pt-1 text-sm font-medium text-muted sm:w-28"
                      >
                        {date}
                      </time>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-display text-xl text-ink md:text-2xl">
                        <Link
                          href={`/baca/${a.slug}`}
                          className="transition hover:text-emerald-900"
                        >
                          {a.title}
                        </Link>
                      </h3>
                      {a.description && (
                        <p className="mt-1.5 font-serif text-[15px] leading-relaxed text-muted md:text-justify">
                          {a.description}
                        </p>
                      )}
                      <Link
                        href={`/baca/${a.slug}`}
                        className="mt-2 inline-block text-sm font-medium text-emerald-900 transition hover:text-gold-deep hover:underline hover:underline-offset-4"
                      >
                        Baca selengkapnya
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Daily Inspiration: hanya dirender bila pool tidak kosong */}
      {inspiration && (
        <section className="bg-emerald-950 py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-3xl text-on-dark md:text-4xl">
              Satu Hari, Satu Lantunan
            </h2>
            <p
              dir="rtl"
              lang="ar"
              className="mt-8 font-arab text-2xl leading-[2.15] text-on-dark md:text-3xl"
            >
              {inspiration.arab}
            </p>
            {inspiration.latin && (
              <p className="mt-4 font-serif text-[17.5px] leading-relaxed text-on-dark-muted italic">
                {inspiration.latin}
              </p>
            )}
            {inspiration.translation && (
              <p className="mt-3 font-serif text-[17.5px] leading-relaxed text-on-dark">
                {inspiration.translation}
              </p>
            )}
            {inspiration.english && (
              <p
                lang="en"
                className="mt-3 font-serif text-[17.5px] leading-relaxed text-on-dark-muted"
              >
                {inspiration.english}
              </p>
            )}
            <Link
              href={`/baca/${inspiration.slug}`}
              className="btn-outline-gold btn-outline-gold--on-dark mt-8"
            >
              Baca Selengkapnya
            </Link>
          </div>
        </section>
      )}

      {/* Makna */}
      <section className="mx-auto max-w-5xl px-4 py-14 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-line shadow-sm">
            <Image
              src="/images/makna-masjid.jpg"
              alt="Masjid Biru di Istanbul dilihat dari balik lengkung pintu"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              Lebih dari Sekadar Lantunan. Kenali Maknanya.
            </h2>
            <ul className="mt-8 space-y-7">
              {MAKNA.map((f) => (
                <li key={f.title}>
                  <h3 className="font-display text-xl text-ink">{f.title}</h3>
                  <p className="mt-1.5 font-serif text-[15px] leading-relaxed text-muted md:text-justify">
                    {f.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-16 text-center md:pb-24">
        <h2 className="mx-auto max-w-2xl font-display text-3xl text-ink md:text-4xl">
          Jaga Warisan, Bagikan Keindahan.
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-serif text-base leading-relaxed text-muted md:text-lg">
          Judul shalawat atau maulid favoritmu belum ada di sini? Usulkan,
          dan bantu perpustakaan ini terus bertumbuh untuk semua.
        </p>
        <Link href="/request-shalawat" className="btn-outline-gold mt-8">
          Request Judul
        </Link>
      </section>
    </main>
  );
}
