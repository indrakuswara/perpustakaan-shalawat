import type { Metadata } from "next";
import HadrohPlayer from "./HadrohPlayer";

export const metadata: Metadata = {
  title: "Belajar Pukulan Hadroh",
  description:
    "Belajar pola pukulan hadroh Banjari untuk pemula: dengarkan ansambel terbang dan bass, isolasi tiap alat, dan atur tempo latihan. Notasi ditulis dari dokumen latihan hadroh.",
};

export default function HadrohPage() {
  return (
    <main className="bg-[#fffefb]">
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <p className="text-[11px] font-medium tracking-[2.5px] text-[#b78a1e] uppercase">
          Perpustakaan Shalawat · Latihan
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-[#0b3d2e] md:text-4xl">
          Belajar Pukulan Hadroh
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-stone-600">
          Set dasaran hadroh <strong>gaya Banjari</strong> untuk latihan
          pemula di majelis. Tekan putar untuk mendengar ansambelnya, pakai
          tombol <em>Solo</em> untuk mendengar satu alat saja, dan pelankan
          tempo sampai hafal — lalu naikkan lagi sedikit demi sedikit.
        </p>

        <div className="mt-8">
          <HadrohPlayer />
        </div>

        <section aria-labelledby="cara-latihan" className="mt-12 max-w-2xl">
          <h2
            id="cara-latihan"
            className="font-serif text-2xl font-semibold text-[#0b3d2e]"
          >
            Cara latihan
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed text-stone-600">
            <li>
              Dengarkan ansambel penuh di bagian <strong>Dasar</strong>{" "}
              beberapa putaran sampai ketukannya terasa.
            </li>
            <li>
              Solo alat yang mau kamu pegang, turunkan tempo ke 50–60 BPM,
              dan ikuti grid notasinya selangkah demi selangkah.
            </li>
            <li>
              Matikan Solo, nyalakan lagi semua alat, lalu naikkan tempo
              bertahap. Lanjut ke bagian <strong>Naik</strong> dan{" "}
              <strong>Turun</strong> bila Dasar sudah lancar.
            </li>
            <li>
              Mode <strong>Urutan penuh</strong> memutar Dasar → Naik → Turun
              berurutan, seperti alur pukulan saat mengiringi shalawat.
            </li>
          </ol>
        </section>

        <section aria-labelledby="keterangan" className="mt-10 max-w-2xl">
          <h2
            id="keterangan"
            className="font-serif text-2xl font-semibold text-[#0b3d2e]"
          >
            Keterangan simbol
          </h2>
          <ul className="mt-3 space-y-2 leading-relaxed text-stone-600">
            <li>
              <strong>D</strong> — Dung/Duk: pukulan di tengah alat, bunyi
              rendah. <strong>T</strong> — Tek/Tang: pukulan di pinggir,
              bunyi tinggi.
            </li>
            <li>
              <strong>d</strong> (huruf kecil) — pukulan yang sama, dimainkan
              lebih ringan. Sel kosong = jeda.
            </li>
            <li>
              Huruf yang <span className="underline decoration-[#cfa52f] decoration-2 underline-offset-2">digarisbawahi emas</span>{" "}
              berasal dari huruf ganda di dokumen (mis. TT, DD) = pukulan
              cepat.
            </li>
            <li>
              <strong>D)</strong> di awal rumus = pukulan pembuka, dimainkan
              sekali saja saat mulai — di pemutar ini dibunyikan sekali
              setiap kamu menekan tombol putar dari berhenti.
            </li>
          </ul>
        </section>

        <section aria-labelledby="sumber" className="mt-10 max-w-2xl">
          <h2
            id="sumber"
            className="font-serif text-2xl font-semibold text-[#0b3d2e]"
          >
            Sumber &amp; catatan
          </h2>
          <div className="mt-3 space-y-3 leading-relaxed text-stone-600">
            <p>
              Notasi di halaman ini <strong>bukan karangan</strong>: pola
              keempat terbang disalin dari dokumen latihan{" "}
              <em>&ldquo;Rumus Banjari&rdquo;</em>, dan pola bass dari{" "}
              <em>
                &ldquo;Notasi Pukulan Banjari&rdquo; oleh Nuqthoh Assirrul
                Jami&rsquo;
              </em>
              . Keduanya dokumen latihan hadroh Banjari yang beredar di
              Scribd; baris dasaran penggolong dari kedua dokumen terbukti
              sama persis, jadi saling menguatkan. Dokumen sumber juga
              memuat bagian Naik ½, Naik Awal, dan Naik Start yang belum
              dimuat di sini.
            </p>
            <p>
              Yang diajarkan halaman ini adalah pakem <strong>Banjari</strong>{" "}
              sebagaimana tertulis di dokumen-dokumen itu. Majelis di daerah
              lain bisa punya rasa dan variasi lokal yang berbeda — anggap
              halaman ini titik mulai, bukan satu-satunya kebenaran.
            </p>
            <p>
              Saat diputar, tiap baris rumus dibentangkan merata dalam satu
              siklus ketukan agar semua alat tetap bertemu di awal putaran.
              Bunyi alat memakai sampel doumbek (goblet drum) dari pack
              &ldquo;Remo Doumbek&rdquo; oleh <strong>Subtersonic</strong>,
              dibagikan gratis oleh pembuatnya untuk dipakai dalam karya —
              sebagai pendekatan bunyi terbang, karena artikulasinya
              (Doum/Tek) persis notasi yang dipakai di sini. Nada dan rasa
              alat asli majelismu bisa sedikit berbeda.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
