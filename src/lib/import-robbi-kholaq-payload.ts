// PAYLOAD SEMENTARA — impor "Robbi Kholaq Thoha Min Nur" sebagai
// DRAFT. Sumber: foto halaman buku kumpulan sholawat milik Juple
// (tes jalur gambar → draft, 2026-10-10), di-cross-check ke teks
// masyhur yang beredar. Artikel DIKUNCI 6 unit atas keputusan Juple:
// 3 baris penutup Za'ir ar-Raudhah dari halaman yang sama DITAHAN
// (terdokumentasi di qasidah-gambar/robbi-kholaq-thoha.md).
// Dihapus bersama route import-robbi-kholaq setelah terverifikasi.
import type { ArticleBlocks } from "./db-types.ts";

export interface RobbiKholaqArticle {
  meta: { title: string; slug: string; type: "SHALAWAT" | "MAULID"; description: string };
  expectedUnits: number;
  blocks: ArticleBlocks;
}

export const ROBBI_ARTICLES: RobbiKholaqArticle[] = [
  {
    "meta": {
      "title": "Robbi Kholaq Thoha Min Nur",
      "slug": "robbi-kholaq-thoha-min-nur",
      "type": "SHALAWAT",
      "description": "Qasidah masyhur tentang Isra' Mi'raj Nabi Muhammad ﷺ: Allah menciptakan Thoha dari cahaya yang di dalamnya terdapat kehormatan, memanggilnya mendekat sebagai Sang Terpilih dan Al-Amin, beliau naik ke Baitul Ma'mur dan shalat sebagai imam, lalu mendekat kepada Tuhannya Yang Maha Indah lagi Maha Agung. Teks Arab, Latin, terjemahan Indonesia, dan English. Sumber teks: foto halaman buku kumpulan sholawat milik Juple, di-cross-check ke sumber-sumber teks yang beredar."
    },
    "expectedUnits": 6,
    "blocks": {
      "sections": [
        {
          "id": "robbi-kholaq-thoha-s1",
          "title": "Robbi Kholaq Thoha Min Nur",
          "units": [
            {
              "arab": "رَبِّيْ خَلَقَ طٰهَ مِنْ نُوْرٍ ۞ فِيْهِ احْتِرَامٌ",
              "english": "My Lord created Thoha (the Prophet Muhammad ﷺ) from light, in which there is honour and reverence.",
              "id": "robbi-kholaq-thoha-u1",
              "latin": "Robbi kholaq Thoha min nur, fihih-tirom",
              "translation": "Tuhanku menciptakan Thoha (Nabi Muhammad ﷺ) dari cahaya, yang di dalamnya terdapat kehormatan"
            },
            {
              "arab": "نَادَاهُ أَقْبِلْ يَا مُخْتَارُ ۞ أَنْتَ الْأَمِيْنُ أَنْتَ الْأَمِيْنُ",
              "english": "He called him: \"Draw near, O Chosen One; you are the Trustworthy, you are the Trustworthy.\"",
              "id": "robbi-kholaq-thoha-u2",
              "latin": "Nadahu aqbil ya mukhtar, antal amin antal amin",
              "translation": "Dia memanggilnya: \"Mendekatlah, wahai Sang Terpilih; engkaulah yang terpercaya, engkaulah yang terpercaya\""
            },
            {
              "arab": "لَمَّا ارْتَقَى الْبَيْتَ الْمَعْمُوْرَ ۞ صَلَّى إِمَامًا",
              "english": "When he ascended to the Much-Frequented House (Baitul Ma'mur), he prayed as the imam.",
              "id": "robbi-kholaq-thoha-u3",
              "latin": "Lamma-rtaqol baital ma'mur, sholla imam",
              "translation": "Ketika beliau naik ke Baitul Ma'mur, beliau shalat menjadi imam"
            },
            {
              "arab": "وَقَدْ دَنَا مِنْ رَبِّهِ ۞ الْبَاهِي الْجَلِيْلُ",
              "english": "And he drew near to his Lord, the Radiant, the Majestic.",
              "id": "robbi-kholaq-thoha-u4",
              "latin": "Wa qod dana min robbihi, albahil jalil",
              "translation": "Dan sungguh beliau telah mendekat kepada Tuhannya, Yang Maha Indah lagi Maha Agung"
            },
            {
              "arab": "إِنْ رُمْتَ أَنْ تَحْظَى بِالْحُوْرِ ۞ يَوْمَ الزِّحَامِ",
              "english": "If you wish to be blessed with the houris on the Day of Crowding (the Day of Judgment).",
              "id": "robbi-kholaq-thoha-u5",
              "latin": "In rumta an tahzho bil hur, yaumaz-ziham",
              "translation": "Jika engkau ingin beruntung mendapatkan bidadari-bidadari pada hari berdesakan (hari kiamat)"
            },
            {
              "arab": "صَلِّ عَلَى بَاهِي الْأَنْوَارِ ۞ عَيْنِ الْيَقِيْنِ",
              "english": "Send blessings upon the one radiant with lights, the very essence of certainty.",
              "id": "robbi-kholaq-thoha-u6",
              "latin": "Sholli 'ala bahil anwar, 'ainil yaqin",
              "translation": "Bershalawatlah kepada dia yang cahayanya berkilauan, sumber keyakinan yang sejati"
            }
          ]
        }
      ]
    }
  }
];
