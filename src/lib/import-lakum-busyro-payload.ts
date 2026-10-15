// PAYLOAD SEMENTARA — impor "Lakum Busyro" sebagai DRAFT.
// Sumber: 2 lembar gambar lirik (Lirik/teks Qosidah) kiriman Juple
// 2026-10-15, di-cross-check ke sumber teks yang beredar; dokumen
// review: qasidah-gambar/lakum-busyro.md. Basis 12 bait versi masyhur
// majelis atas persetujuan Juple (Diwan Al-Habsyi memuat 39 bait).
// Dihapus bersama route import-lakum-busyro setelah terverifikasi.
import type { ArticleBlocks } from "./db-types.ts";

export interface LakumBusyroArticle {
  meta: { title: string; slug: string; type: "SHALAWAT" | "MAULID"; description: string };
  expectedUnits: number;
  blocks: ArticleBlocks;
}

export const LAKUM_ARTICLES: LakumBusyroArticle[] = [
{
  "meta": {
    "title": "Lakum Busyro",
    "slug": "lakum-busyro",
    "type": "SHALAWAT",
    "description": "Qasidah sambutan masyhur karya Al-Habib Ali bin Muhammad Al-Habsyi (pengarang Maulid Simtudduror), termuat dalam Diwan Al-Habsyi dan kitab Simtudduror: kabar gembira terkabulnya doa dan diterimanya amal bagi para tamu, keturunan Nabi Muhammad ﷺ, yang datang berkunjung, disambut dengan ahlan wa sahlan dan didoakan agar dikumpulkan di atas ketakwaan. Teks Arab, Latin, terjemahan Indonesia, dan English. Sumber teks: lembar lirik kiriman Juple, di-cross-check ke sumber-sumber teks yang beredar. Qasidah lengkapnya dalam Diwan berjumlah 39 bait; yang dimuat di sini adalah 12 bait masyhur yang beredar luas di majelis."
  },
  "expectedUnits": 12,
  "blocks": {
    "sections": [
      {
        "id": "lakum-busyro-s1",
        "title": "Lakum Busyro",
        "units": [
          {
            "arab": "لَكُمْ بُشْرَى الْإِجَابَةِ وَالْقَبُولِ • مِنَ الْمَوْلَى بِوَاسِطَةِ الرَّسُولِ",
            "english": "For you are glad tidings of answered prayer and acceptance from the Lord, through the Messenger",
            "id": "lakum-busyro-u1",
            "latin": "Lakum busyrol ijabati wal qobuli, minal maula biwasithotir-rosuli",
            "translation": "Bagi kalian ada kabar gembira dari Allah, berupa jawaban dan diterimanya, dengan perantaraan Ar-Rasul"
          },
          {
            "arab": "دَعَا دَاعِي الْعِنَايَةِ فَاسْتَجَبْتُمْ • وَبَادَرْتُمْ إِلَى الْفَضْلِ الْجَزِيلِ",
            "english": "The caller of divine care called out and you answered, and you hastened toward the abundant grace",
            "id": "lakum-busyro-u2",
            "latin": "Da'a daa'il 'inayati fastajabtum, wa badartum ilal fadhlil jaziili",
            "translation": "Ketika sang penyeru mengajak, maka kalian menerimanya, dan jadilah kalian mendapatkan anugerah-Nya yang agung"
          },
          {
            "arab": "وَصَلْتُمْ فَاجْتَمَعْتُمْ وَاتَّصَلْتُمْ • فَكَانَ الْوَصْلُ فَائِدَةَ الْوُصُولِ",
            "english": "You arrived, gathered, and drew together; and the meeting became the very fruit of your coming",
            "id": "lakum-busyro-u3",
            "latin": "Washoltum fajtama'tum wattasholtum, fakanal washlu fa-idatal wushuli",
            "translation": "Kalian bertemu, berkumpul, saling menghubungi, maka pertemuan ini membawa keuntungan yang amat besar"
          },
          {
            "arab": "نَزَلْتُمْ فِي مَنَازِلِنَا فَزَادَتْ • بِكُمْ شَرَفًا تَضَاعَفَ بِالنُّزُولِ",
            "english": "You alighted in our dwellings, and our honour grew thereby, multiplied by your arrival",
            "id": "lakum-busyro-u4",
            "latin": "Nazaltum fi manazilina fazadat, bikum syarofan tadho'afa binnuzuli",
            "translation": "Kalian mau tinggal di tempat kami, maka sebab tinggalnya kalianlah menjadi bertambah kemuliaan kami"
          },
          {
            "arab": "أَلَا يَا مَرْحَبًا أَهْلًا وَسَهْلًا • بِكُمْ يَا نَسْلَ طٰهَ وَالْبَتُولِ",
            "english": "O welcome — ahlan wa sahlan — to you, O descendants of Thoha and Al-Batul",
            "id": "lakum-busyro-u5",
            "latin": "Ala ya marhaban ahlan wa sahlan, bikum ya nasla Thoha wal Batuli",
            "translation": "Aku ucapkan selamat datang, Ahlan wa Sahlan, kepada kalian keturunan Thoha dan Fathimah Al-Batul"
          },
          {
            "arab": "سَأَلْتُ اللهَ يُكْرِمُكُمْ جَمِيعًا • وَكُلَّ الْوَافِدِينَ بِكُلِّ سُولِ",
            "english": "I ask Allah to honour all of you, and every arriving guest with all that they seek",
            "id": "lakum-busyro-u6",
            "latin": "Sa-altullah yukrimukum jami'an, wa kullal wafidina bikulli suli",
            "translation": "Aku memohon kepada Allah, semoga memuliakan kalian semua, dan semua delegasi mendapatkan semua permohonan"
          },
          {
            "arab": "عَلَى مَا يَرْتَضِي وَيُحِبُّ مِنْكُمْ • وَيُتْحِفُكُمْ بِإِحْسَانٍ وَطَوْلِ",
            "english": "With all that He approves of and loves in you, and may He present you with kindness and generous bounty",
            "id": "lakum-busyro-u7",
            "latin": "'Ala ma yartadhi wa yuhibbu minkum, wa yuthifukum bi ihsanin wa thouli",
            "translation": "Di atas ridha dan kecintaan-Nya, juga memberi kalian kebaikan dan bantuan"
          },
          {
            "arab": "وَيَهْدِيكُمْ صِرَاطًا مُسْتَقِيمًا • وَيُظْهِرْ فِيكُمُ سِرَّ الْأُصُولِ",
            "english": "And may He guide you to a straight path, and reveal within you the secret of the noble forefathers",
            "id": "lakum-busyro-u8",
            "latin": "Wa yahdikum shirothon mustaqima, wa yudh-hiru fikumu sirrol ushuli",
            "translation": "Menunjukkan kalian ke jalan yang lurus, dan menampakkan rahasia para pendahulu yang luhur"
          },
          {
            "arab": "وَيَجْمَعُكُمْ عَلَى التَّقْوَى وَيُحْيِي • بِكُمْ سِيَرَ الْجَهَابِذَةِ الْفُحُولِ",
            "english": "And may He gather you upon God-consciousness, and through you revive the legacy of the great and discerning masters",
            "id": "lakum-busyro-u9",
            "latin": "Wa yajma'ukum 'alat-taqwa wa yuhyi, bikum siyarol jahabidzatil fuhuli",
            "translation": "Mengumpulkan kalian di atas ketaqwaan, sebab kalianlah Allah menghidupkan sejarah orang-orang bijak"
          },
          {
            "arab": "مِنَ السَّلَفِ الَّذِينَ بِهِمْ بَلَغْتُمْ • مَقَامًا عَزَّ فِي الْمَجْدِ الْأَثِيلِ",
            "english": "From the righteous predecessors, through whom you reached a station most exalted in deep-rooted glory",
            "id": "lakum-busyro-u10",
            "latin": "Minas-salafil ladzina bihim balaghtum, maqoman 'azza fil majdil atsili",
            "translation": "Kalian telah sampai di tempatnya para salaf, ialah maqom tertinggi, keagungan yang berakar dari pusat"
          },
          {
            "arab": "بِحُرْمَةِ سَيِّدِ السَّادَاتِ خَيْرِ • الْبَرَايَا سَيِّدِ الْبِرِّ الْوَصُولِ",
            "english": "By the sanctity of the master of masters, the best of all creation, the master of kindness who ever draws near",
            "id": "lakum-busyro-u11",
            "latin": "Bihurmati sayyidas-sadati khoiril baroya, sayyidil barril wushuli",
            "translation": "Sebuah kemuliaan dari pemimpin para sadat, sebaik-baik makhluk, Sayyid yang baik dan suka memberi"
          },
          {
            "arab": "إِمَامِ الْمُرْسَلِينَ وَخَيْرِ عَبْدٍ • كَرِيمٍ كَامِلٍ فَرْدٍ جَلِيلِ",
            "english": "The Imam of the Messengers and the best of servants: noble, perfect, unique, and majestic",
            "id": "lakum-busyro-u12",
            "latin": "Imamil mursalina wa khoiri 'abdin, karimin kamilin fardin jaliili",
            "translation": "Imamnya para utusan, hamba terbaik, mulia, sempurna, tunggal dan agung"
          }
        ]
      }
    ]
  }
}
];
