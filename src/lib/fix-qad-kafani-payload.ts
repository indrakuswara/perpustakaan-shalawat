// PAYLOAD SEMENTARA — perbaikan artikel "Qad Kafani": sisipkan 5 bait
// yang hilang di buku Scribd, berdasarkan referensi yang dipilih Juple
// (wakidyusuf.wordpress.com "Lirik Qasidah Qod Kafani", terkonfirmasi
// 20 bait sesuai Diwan al-Haddad). Total 16 → 21 unit.
// Bait baru: unit 7, 8 (setelah Wa Bima Qod Halla), 15, 16 (setelah
// Wa Biwadil Fadhli), 19 (setelah Wa Arih Sirri). Latin bait baru
// mengikuti gaya transliterasi buku; English oleh Kang Coding.
// Dihapus bersama route fix-qad-kafani setelah eksekusi terverifikasi.
import type { ArticleBlocks } from "./db-types.ts";

const u = (
  n: number,
  arab: string,
  latin: string,
  translation: string,
  english: string,
) => ({ id: `qad-kafani-u${n}`, arab, latin, translation, english });

export const QAD_KAFANI_BLOCKS_V2: ArticleBlocks = {
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
          "فَتَدَارَكْنِي بِلُطْفٍ ۞ مِنْكَ يَا مَوْلَى الْمَوَالِي",
          "Fatadarakni biluthfin minka ya maulal mawali",
          "Maka ulurkanlah bagiku kasih sayang dari-Mu, wahai Raja dari segenap para raja",
          "So come to my rescue with Your tender grace, O Lord of all lords",
        ),
        u(
          8,
          "يَا كَرِيمَ الْوَجْهِ غِثْنِي ۞ قَبْلَ أَنْ يَفْنَى اصْطِبَارِي",
          "Ya karimal wajhi ghitsni qobla an yafnash-thibari",
          "Wahai Yang Maha Pemurah Dzat-Nya, tolonglah aku dengan pertolongan yang datang sebelum sirna kemampuanku dalam bersabar",
          "O Noblest of Countenance, help me before my strength to endure runs out",
        ),
        u(
          9,
          "يَا سَرِيعَ الْغَوْثِ غَوْثًا ۞ مِنْكَ يُدْرِكْنِي سَرِيعًا",
          "Ya sari'al ghoutsi ghoutsan minka yudrikni sari'an",
          "Wahai Yang Maha Cepat mendatangkan pertolongan, temukan kami dengan pertolongan dari-Mu yang mendatangi kami dengan segera",
          "O Swift of Help — grant a help from You that reaches me swiftly",
        ),
        u(
          10,
          "يَهْزِمُ الْعُسْرَ وَيَأْتِي ۞ بِالَّذِي أَرْجُو جَمِيعًا",
          "Yahzimul 'usro wa ya'ti billadzi arju jami'an",
          "Pertolongan yang meruntuhkan segala kesulitan, dan mendatangkan segala yang kami harapkan",
          "That defeats every hardship and brings all that I hope for",
        ),
        u(
          11,
          "يَا قَرِيبًا يَا مُجِيبًا ۞ يَا عَلِيمًا يَا سَمِيعًا",
          "Ya qoriban ya mujiban ya 'aliman ya sami'an",
          "Wahai Yang Maha Dekat, wahai Yang Maha Menjawab segala rintihan, wahai Yang Maha Mengetahui, wahai Yang Maha Mendengar",
          "O Near One, O Answerer, O All-Knowing, O All-Hearing",
        ),
        u(
          12,
          "قَدْ تَحَقَّقْتُ بِعَجْزِي ۞ وَخُضُوعِي وَانْكِسَارِي",
          "Qod tahaqqoqtu bi 'ajzi wa khudhu'i wankisari",
          "Sungguh aku telah benar-benar meyakini kelemahan dan ketidakmampuanku, kerendahan dan keluluhanku",
          "I have fully realized my incapacity, my submission, and my brokenness",
        ),
        u(
          13,
          "لَمْ أَزَلْ بِالْبَابِ وَاقِفْ ۞ فَارْحَمَنْ رَبِّي وُقُوفِي",
          "Lam azal bil babi waqif farhaman robbi wuqufi",
          "Aku masih tetap berdiri di gerbang-Mu, maka kasihanilah aku yang masih terus menunggu",
          "I remain standing at the Door — so have mercy, my Lord, on my standing",
        ),
        u(
          14,
          "وَبِوَادِي الْفَضْلِ عَاكِفْ ۞ فَأَدِمْ رَبِّي عُكُوفِي",
          "Wa biwadil fadhli 'akif fa-adim robbi 'ukufi",
          "Dan di lembah anugerah kasih sayang-Mu aku berdiam, maka abadikanlah keadaanku ini",
          "And in the valley of Grace I keep my vigil — so make my vigil lasting, my Lord",
        ),
        u(
          15,
          "وَلِحُسْنِ الظَّنِّ لَازِمْ ۞ فَهُوَ خِلِّي وَحَلِيفِي",
          "Wa lihusnizh-zhonni lazim fahuwa khilli wa halifi",
          "Maka bersangka baik pada-Mu adalah hal yang mesti bagiku, sangka baik atas-Mu adalah pakaianku dan janjiku",
          "And thinking well of You is my constant duty — my intimate companion and my sworn ally",
        ),
        u(
          16,
          "وَأَنِيسِي وَجَلِيسِي ۞ طُولَ لَيْلِي وَنَهَارِي",
          "Wa anisi wa jalisi thula laili wa nahari",
          "Dan hal itulah (sangka baik pada-Mu) yang menjadi penenang hatiku, dan selalu menemaniku sepanjang siang dan malam",
          "My comforter and my companion, all through my night and my day",
        ),
        u(
          17,
          "حَاجَةً فِي النَّفْسِ يَا رَبِّ ۞ فَاقْضِهَا يَا خَيْرَ قَاضِي",
          "Hajatan fin-nafsi ya robbi faqdhiha ya khoiro qodhi",
          "Segala kebutuhan dalam diriku wahai Penciptaku, maka selesaikanlah, wahai sebaik-baik yang menyelesaikan kebutuhan",
          "There is a need within my soul, O my Lord — so fulfill it, O Best of fulfillers",
        ),
        u(
          18,
          "وَأَرِحْ سِرِّي وَقَلْبِي ۞ مِنْ لَظَاهَا وَالشُّوَاظِ",
          "Wa arih sirri wa qolbi min lazhoha wasy-syuwazhi",
          "Dan tenangkanlah ruhku dan sanubariku dari gejolak dan gemuruhnya (nafsu, kemarahan, kesedihan, kebingungan, dan penyakit-penyakit hati)",
          "And give rest to my innermost self and my heart, from its flames and its turmoil",
        ),
        u(
          19,
          "قِيْ سُرُورٍ وَحُبُورٍ ۞ وَإِذَا مَا كُنْتَ رَاضِي",
          "Qi sururin wa huburin wa idza ma kunta radhi",
          "Agar hatiku dan ruhku selalu dalam ketentraman dan kedamaian dalam apa-apa yang telah Engkau ridhoi",
          "Keep me in joy and delight, so long as You are pleased with me",
        ),
        u(
          20,
          "فَالْهَنَا وَالْبَسْطُ حَالِي ۞ وَشِعَارِي وَدِثَارِي",
          "Falhana wal-basthu hali wa syi'ari wa ditsari",
          "Maka kegembiraan dan kebahagiaan menjadi keadaanku selalu, dan menjadi lambang kehidupanku dan selubung perhiasanku",
          "So bliss and ease are my state, my emblem, and my cloak",
        ),
        u(
          21,
          "قَدْ كَفَانِي عِلْمُ رَبِّي ۞ مِنْ سُؤَالِي وَاخْتِيَارِي",
          "Qod kafani 'ilmu robbi min su-ali wakhtiyari",
          "Sungguh telah cukup bagiku kepuasan dan ketenanganku bahwa Penciptaku Maha Mengetahui segala permintaanku dan usahaku",
          "My Lord's knowledge of me suffices me, beyond my asking and my choosing",
        ),
      ],
    },
  ],
};
