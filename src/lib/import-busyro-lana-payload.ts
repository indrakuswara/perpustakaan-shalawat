// PAYLOAD SEMENTARA — impor artikel "Busyro Lana" (SHALAWAT) sebagai
// DRAFT. Sumber: wakidyusuf.wordpress.com/2017/10/05/qasidah-busyro-lana
// (dipilih Juple, kelengkapan 10 bait sudah dicek Juple). Arab
// direkonstruksi bersih dari teks masyhur; Latin disusun mengikuti gaya
// buku hadroh (Latin blog banyak salah ketik); Artinya dari blog dengan
// pembersihan ringan (lihat files/sample-busyro-lana.md, termasuk
// kalimat salah-tempel di bait 2 yang dibuang); English oleh Kang
// Coding. Dihapus bersama route import-busyro-lana setelah eksekusi
// terverifikasi.
import type { ArticleBlocks } from "./db-types.ts";

export const BUSYRO_META = {
  title: "Busyro Lana",
  type: "SHALAWAT" as const,
  description:
    "Qasidah Busyro Lana — ungkapan kegembiraan atas perjumpaan dengan Rasulullah dan kerinduan berziarah ke Madinah. Teks Arab, Latin, terjemahan Indonesia, dan English. Sumber teks: wakidyusuf.wordpress.com.",
};

const u = (
  n: number,
  arab: string,
  latin: string,
  translation: string,
  english: string,
) => ({ id: `busyro-lana-u${n}`, arab, latin, translation, english });

export const BUSYRO_BLOCKS: ArticleBlocks = {
  sections: [
    {
      id: "busyro-lana-s1",
      title: "Busyro Lana",
      units: [
        u(
          1,
          "بُشْرَى لَنَا نِلْنَا الْمُنَى ۞ زَالَ الْعَنَى وَافَى الْهَنَا",
          "Busyro lana nilnal muna, zalal 'ana wa fal hana",
          "Kebahagiaan milik kami karena kami memperoleh harapan. Dan hilang sudah semua kesusahan, lengkap sudah semua kebahagiaan",
          "Glad tidings for us — we have attained our hopes; sorrow has vanished and bliss has come in full",
        ),
        u(
          2,
          "وَالدَّهْرُ أَنْجَزَ وَعْدَهُ ۞ وَالْبِشْرُ أَضْحَى مُعْلَنَا",
          "Wad-dahru anjaza wa'dahu, wal-bisyru adh-ha mu'lana",
          "Dan waktu sudah menepati janjinya, dan kabar gembira telah tampak nyata bagi kami",
          "And time has fulfilled its promise, and the glad tidings are now manifest to us",
        ),
        u(
          3,
          "يَا نَفْسُ طِيبِي بِاللِّقَا ۞ يَا عَيْنُ قَرِّي أَعْيُنَا",
          "Ya nafsu thibi bil-liqo, ya 'ainu qorri a'yuna",
          "Wahai nafsu, puaslah dengan perjumpaan ini. Wahai mata, sejukkanlah semua mata kami",
          "O soul, rejoice in this meeting; O eye, let all our eyes be cooled with joy",
        ),
        u(
          4,
          "هٰذَا جَمَالُ الْمُصْطَفَى ۞ أَنْوَارُهُ لَاحَتْ لَنَا",
          "Hadza jamalul musthofa, anwaruhu lahat lana",
          "Inilah keindahan al-Musthafa. Cahayanya tampak dan mempesona bagi kita semua",
          "Behold, this is the beauty of the Chosen One; his lights have shone upon us",
        ),
        u(
          5,
          "يَا طَيْبَةُ مَاذَا نَقُولْ ۞ وَفِيكِ قَدْ حَلَّ الرَّسُولْ",
          "Ya thoibah madza naqul, wa fiki qod hallar-rosul",
          "Duhai Thaibah (Madinah), apa yang dapat kami katakan? Jika Rasul telah mendiami wilayahmu",
          "O Thaibah (Madinah), what can we say, when the Messenger has come to dwell within you?",
        ),
        u(
          6,
          "وَكُلُّنَا نَرْجُو الْوُصُولْ ۞ لِمُحَمَّدٍ نَبِيِّنَا",
          "Wa kulluna narjul wushul, li Muhammadin nabiyyina",
          "Dan kami semua ingin berjumpa dengan Muhammad, nabi kami",
          "And all of us long to arrive — to Muhammad, our Prophet",
        ),
        u(
          7,
          "يَا رَوْضَةَ الْهَادِي الشَّفِيعِ ۞ وَصَاحِبَيْهِ وَالْبَقِيعِ",
          "Ya roudhotul hadisy-syafi', wa shohibaihi wal-baqi'",
          "Duhai taman Nabi sang pembawa petunjuk dan pemberi syafaat, dan kedua sahabatnya serta tanah Baqi'",
          "O Garden of the Guide, the Intercessor, and his two companions, and the Baqi'",
        ),
        u(
          8,
          "اُكْتُبْ لَنَا نَحْنُ الْجَمِيعْ ۞ زِيَارَةً لِحَبِيبِنَا",
          "Uktub lana nahnul jami', ziyarotan li habibina",
          "Catatlah kami semua, bahwa kami berziarah kepada kekasih kami",
          "Write down for all of us a visit to our beloved",
        ),
        u(
          9,
          "صَلِّ وَسَلِّمْ يَا سَلَامْ ۞ عَلَى النَّبِيِّ مَاحِي الظَّلَامْ",
          "Sholli wa sallim ya salam, 'alan-nabi mahizh-zholam",
          "Wahai Tuhan Maha Pemberi Salam, berikanlah shalawat dan salam kepada Nabi penghapus kegelapan",
          "Send blessings and peace, O Source of Peace, upon the Prophet, the eraser of darkness",
        ),
        u(
          10,
          "وَالْآلِ وَالصَّحْبِ الْكِرَامْ ۞ مَا أُنْشِدَتْ بُشْرَى لَنَا",
          "Wal ali wash-shohbil kirom, ma unsyidat busyro lana",
          "Juga keluarga dan para sahabat yang mulia, selama dilagukan qasidah Busyro Lana",
          "And upon his family and noble companions, as long as Busyro Lana is sung",
        ),
      ],
    },
  ],
};
