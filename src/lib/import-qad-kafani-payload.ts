// PAYLOAD SEMENTARA — impor artikel "Qad Kafani" (SHALAWAT) sebagai DRAFT.
// Isi = dokumen review files/sample-qad-kafani.md yang sudah disetujui
// Juple (16 bait, 4 lapis, TANPA refrain hadroh). Dihapus bersama
// route import-qad-kafani setelah eksekusi terverifikasi.
import type { ArticleBlocks } from "./db-types.ts";

export const QAD_KAFANI_META = {
  title: "Qad Kafani",
  type: "SHALAWAT" as const,
  description:
    "Qasidah munajat karya Imam Abdullah bin 'Alawi al-Haddad — pengakuan seorang hamba atas kecukupan ilmu Allah atas segala permintaannya. Teks Arab, Latin, terjemahan Indonesia, dan English. Sumber teks: Buku Kumpulan Sholawat Hadroh 2024.",
};

const u = (
  n: number,
  arab: string,
  latin: string,
  translation: string,
  english: string,
) => ({ id: `qad-kafani-u${n}`, arab, latin, translation, english });

export const QAD_KAFANI_BLOCKS: ArticleBlocks = {
  sections: [
    {
      id: "qad-kafani-s1",
      title: "Qad Kafani",
      units: [
        u(
          1,
          "قَدْ كَفَانِي عِلْمُ رَبِّي ۞ مِنْ سُؤَالِي وَاخْتِيَارِي",
          "Qod kafani 'ilmu robbi min su-ali wakhtiyari",
          "Sungguh telah cukup bagiku kepuasan dan ketenanganku bahwa Penciptaku Maha Mengetahui segala permintaanku dan usahaku",
          "My Lord's knowledge of me suffices me, beyond my asking and my choosing",
        ),
        u(
          2,
          "فَدُعَائِي وَابْتِهَالِي ۞ شَاهِدٌ لِي بِافْتِقَارِي",
          "Fadu'a-i wabtihali syahidun li biftiqori",
          "Maka doa-doa dan jeritan hatiku sebagai saksiku atas kefakiranku (di hadapan kewibawaan-Mu)",
          "So my prayers and my humble pleadings bear witness to my utter neediness",
        ),
        u(
          3,
          "فَلِهٰذَا السِّرِّ أَدْعُو ۞ فِي يَسَارِي وَعَسَارِي",
          "Falihadzas-sirri ad'u fi yasari wa 'asari",
          "Maka demi rahasia kefakiranku (di hadapan kewibawaan-Mu) aku selalu mohon (pada-Mu) di saat kemudahan dan kesulitanku",
          "It is for this secret that I call upon Him in my ease and in my hardship",
        ),
        u(
          4,
          "أَنَا عَبْدٌ صَارَ فَخْرِي ۞ ضِمْنَ فَقْرِي وَاضْطِرَارِي",
          "Ana 'abdun shoro fakhri dhimna faqri wadhthirori",
          "Aku adalah hamba yang kebangganku adalah dalamnya kemiskinanku dan besarnya kebutuhanku (pada-Mu)",
          "I am a servant whose pride lies within my poverty and my desperation",
        ),
        u(
          5,
          "يَا إِلٰهِي وَمَلِيكِي ۞ أَنْتَ تَعْلَمُ كَيْفَ حَالِي",
          "Ya ilahi wa maliki anta ta'lam kaifa hali",
          "Wahai Tuhanku, wahai yang memiliki diriku, Engkau Maha Mengetahui bagaimana keadaanku",
          "O my God and my Master, You know well the state I am in",
        ),
        u(
          6,
          "وَبِمَا قَدْ حَلَّ قَلْبِي ۞ مِنْ هُمُومٍ وَاشْتِغَالِي",
          "Wa bima qod halla qolbi min humumin wasytigholi",
          "Dan dari segala yang memenuhi hatiku dari kegundahan dan kesibukanku (hingga terlupakan dari mengingat-Mu)",
          "And what has filled my heart — of worries and distractions",
        ),
        u(
          7,
          "يَا سَرِيعَ الْغَوْثِ غَوْثًا ۞ مِنْكَ يُدْرِكْنِي سَرِيعًا",
          "Ya sari'al ghoutsi ghoutsan minka yudrikni sari'an",
          "Wahai Yang Maha Cepat mendatangkan pertolongan, temukan kami dengan pertolongan dari-Mu yang mendatangi kami dengan segera",
          "O Swift of Help — grant a help from You that reaches me swiftly",
        ),
        u(
          8,
          "يَهْزِمُ الْعُسْرَ وَيَأْتِي ۞ بِالَّذِي أَرْجُو جَمِيعًا",
          "Yahzimul 'usro wa ya'ti billadzi arju jami'an",
          "Pertolongan yang meruntuhkan segala kesulitan, dan mendatangkan segala yang kami harapkan",
          "That defeats every hardship and brings all that I hope for",
        ),
        u(
          9,
          "يَا قَرِيبًا يَا مُجِيبًا ۞ يَا عَلِيمًا يَا سَمِيعًا",
          "Ya qoriban ya mujiban ya 'aliman ya sami'an",
          "Wahai Yang Maha Dekat, wahai Yang Maha Menjawab segala rintihan, wahai Yang Maha Mengetahui, wahai Yang Maha Mendengar",
          "O Near One, O Answerer, O All-Knowing, O All-Hearing",
        ),
        u(
          10,
          "قَدْ تَحَقَّقْتُ بِعَجْزِي ۞ وَخُضُوعِي وَانْكِسَارِي",
          "Qod tahaqqoqtu bi 'ajzi wa khudhu'i wankisari",
          "Sungguh aku telah benar-benar meyakini kelemahan dan ketidakmampuanku, kerendahan dan keluluhanku",
          "I have fully realized my incapacity, my submission, and my brokenness",
        ),
        u(
          11,
          "لَمْ أَزَلْ بِالْبَابِ وَاقِفْ ۞ فَارْحَمَنْ رَبِّي وُقُوفِي",
          "Lam azal bil babi waqif farhaman robbi wuqufi",
          "Aku masih tetap berdiri di gerbang-Mu, maka kasihanilah aku yang masih terus menunggu",
          "I remain standing at the Door — so have mercy, my Lord, on my standing",
        ),
        u(
          12,
          "وَبِوَادِي الْفَضْلِ عَاكِفْ ۞ فَأَدِمْ رَبِّي عُكُوفِي",
          "Wa biwadil fadhli 'akif fa-adim robbi 'ukufi",
          "Dan di lembah anugerah kasih sayang-Mu aku berdiam, maka abadikanlah keadaanku ini",
          "And in the valley of Grace I keep my vigil — so make my vigil lasting, my Lord",
        ),
        u(
          13,
          "حَاجَةً فِي النَّفْسِ يَا رَبِّ ۞ فَاقْضِهَا يَا خَيْرَ قَاضِي",
          "Hajatan fin-nafsi ya robbi faqdhiha ya khoiro qodhi",
          "Segala kebutuhan dalam diriku wahai Penciptaku, maka selesaikanlah, wahai sebaik-baik yang menyelesaikan kebutuhan",
          "There is a need within my soul, O my Lord — so fulfill it, O Best of fulfillers",
        ),
        u(
          14,
          "وَأَرِحْ سِرِّي وَقَلْبِي ۞ مِنْ لَظَاهَا وَالشُّوَاظِ",
          "Wa arih sirri wa qolbi min lazhoha wasy-syuwazhi",
          "Dan tenangkanlah ruhku dan sanubariku dari gejolak dan gemuruhnya (nafsu, kemarahan, kesedihan, kebingungan, dan penyakit-penyakit hati)",
          "And give rest to my innermost self and my heart, from its flames and its turmoil",
        ),
        u(
          15,
          "فَالْهَنَا وَالْبَسْطُ حَالِي ۞ وَشِعَارِي وَدِثَارِي",
          "Falhana wal-basthu hali wa syi'ari wa ditsari",
          "Maka kegembiraan dan kebahagiaan menjadi keadaanku selalu, dan menjadi lambang kehidupanku dan selubung perhiasanku",
          "So bliss and ease are my state, my emblem, and my cloak",
        ),
        u(
          16,
          "قَدْ كَفَانِي عِلْمُ رَبِّي ۞ مِنْ سُؤَالِي وَاخْتِيَارِي",
          "Qod kafani 'ilmu robbi min su-ali wakhtiyari",
          "Sungguh telah cukup bagiku kepuasan dan ketenanganku bahwa Penciptaku Maha Mengetahui segala permintaanku dan usahaku",
          "My Lord's knowledge of me suffices me, beyond my asking and my choosing",
        ),
      ],
    },
  ],
};
