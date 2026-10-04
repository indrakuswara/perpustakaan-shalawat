// PAYLOAD SEMENTARA — impor batch 1 qasidah (5 judul) sebagai DRAFT.
// Sumber teks: wakidyusuf.wordpress.com (dipilih Juple dari
// files/list-konten-wakidyusuf.md), masing-masing sudah di-cross-check
// kelengkapan bait ke sumber kedua; Arab direkonstruksi bersih, Latin
// disusun ulang, Artinya dari blog dengan pembersihan, English baru.
// Dokumen review: qasidah-batch1/*.md di workspace goal. Dihapus
// bersama route import-qasidah-batch1 setelah eksekusi terverifikasi.
import type { ArticleBlocks } from "./db-types.ts";

export interface Batch1Article {
  meta: { title: string; slug: string; type: "SHALAWAT" | "MAULID"; description: string };
  expectedUnits: number;
  blocks: ArticleBlocks;
}

export const BATCH1_ARTICLES: Batch1Article[] = [
  {
    "meta": {
      "title": "Ahmad Ya Habibi",
      "slug": "ahmad-ya-habibi",
      "type": "SHALAWAT",
      "description": "Qasidah pujian kepada Nabi Muhammad dengan gelar-gelar beliau — penolong orang asing, cahaya dalam kegelapan, pemberi syafaat bagi makhluk, Abal Qasim, Abaz-Zahra, hingga kekasih Allah — yang masyhur dilantunkan dalam majelis shalawat dan hadroh. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 14,
    "blocks": {
      "sections": [
        {
          "id": "ahmad-ya-habibi-s1",
          "title": "Ahmad Ya Habibi",
          "units": [
            {
              "id": "ahmad-ya-habibi-u1",
              "arab": "أَحْمَدْ يَا حَبِيبِي",
              "latin": "Ahmad ya habibi",
              "translation": "Ahmad, duhai kekasihku",
              "english": "Ahmad, O my beloved"
            },
            {
              "id": "ahmad-ya-habibi-u2",
              "arab": "يَا حَبِيبِي سَلَامْ عَلَيْكَ",
              "latin": "Ya habibi salam 'alaika",
              "translation": "Duhai kekasihku, salam bagimu",
              "english": "O my beloved, peace be upon you"
            },
            {
              "id": "ahmad-ya-habibi-u3",
              "arab": "يَا عَوْنَ الْغَرِيبِ",
              "latin": "Ya 'aunal ghoribi",
              "translation": "Duhai penolong yang asing",
              "english": "O helper of the stranger"
            },
            {
              "id": "ahmad-ya-habibi-u4",
              "arab": "يَا نُورَ الظَّلَامِ",
              "latin": "Ya nurazh-zholami",
              "translation": "Duhai yang menerangi kegelapan",
              "english": "O light amid the darkness"
            },
            {
              "id": "ahmad-ya-habibi-u5",
              "arab": "يَا شَفِيعَ الْخَلْقِ",
              "latin": "Ya syafi'al kholqi",
              "translation": "Duhai yang memberi syafaat makhluk",
              "english": "O intercessor for all creation"
            },
            {
              "id": "ahmad-ya-habibi-u6",
              "arab": "يَا أَبَا الْقَاسِمِ",
              "latin": "Ya Abal Qosimi",
              "translation": "Duhai Abal Qosim (ayahnya Qosim)",
              "english": "O Abal Qasim (father of Qasim)"
            },
            {
              "id": "ahmad-ya-habibi-u7",
              "arab": "يَا أَبَا الزَّهْرَاءِ",
              "latin": "Ya Abaz-Zahro-i",
              "translation": "Duhai Aba Zahro (ayahnya Fathimah Az-Zahro)",
              "english": "O father of Az-Zahra (Fathimah)"
            },
            {
              "id": "ahmad-ya-habibi-u8",
              "arab": "يَا جَدَّ الْحُسَيْنِ",
              "latin": "Ya jaddal Husaini",
              "translation": "Duhai kakeknya Hasan & Husain",
              "english": "O grandfather of Husain"
            },
            {
              "id": "ahmad-ya-habibi-u9",
              "arab": "يَا طٰهٰ طَبِيبِي",
              "latin": "Ya Thoha thobibi",
              "translation": "Duhai Thoha, penyembuhku",
              "english": "O Thaha, my healer"
            },
            {
              "id": "ahmad-ya-habibi-u10",
              "arab": "يَا مُحْيِيَ الْقُلُوبِ",
              "latin": "Ya muhyil qulubi",
              "translation": "Duhai yang menghidupkan hati",
              "english": "O reviver of hearts"
            },
            {
              "id": "ahmad-ya-habibi-u11",
              "arab": "يَا قُرَّةَ عَيْنِي",
              "latin": "Ya qurrota 'aini",
              "translation": "Duhai penyejuk mataku",
              "english": "O delight of my eyes"
            },
            {
              "id": "ahmad-ya-habibi-u12",
              "arab": "يَا صَفْوَةَ اللهِ",
              "latin": "Ya shofwatallahi",
              "translation": "Duhai pilihan Allah",
              "english": "O chosen of Allah"
            },
            {
              "id": "ahmad-ya-habibi-u13",
              "arab": "يَا رَسُولَ اللهِ",
              "latin": "Ya Rosulallahi",
              "translation": "Duhai Rasulullah (utusan Allah)",
              "english": "O Messenger of Allah"
            },
            {
              "id": "ahmad-ya-habibi-u14",
              "arab": "يَا حَبِيبَ اللهِ",
              "latin": "Ya habiballahi",
              "translation": "Duhai kekasih Allah",
              "english": "O beloved of Allah"
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Ya Badrotim",
      "slug": "ya-badrotim",
      "type": "SHALAWAT",
      "description": "Qasidah Ya Badrotim adalah shalawat pujian kepada Nabi Muhammad ﷺ sebagai purnama kesempurnaan yang cahayanya melenyapkan kesesatan, dan terdapat dalam rangkaian Maulid ad-Diba'i. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 5,
    "blocks": {
      "sections": [
        {
          "id": "ya-badrotim-s1",
          "title": "Ya Badrotim",
          "units": [
            {
              "id": "ya-badrotim-u1",
              "arab": "يَا بَدْرَ تِمٍّ حَازَ كُلَّ كَمَالِ ۞ مَاذَا يُعَبِّرُ عَنْ عُلَاكَ مَقَالِي",
              "latin": "Ya badrotim-min haza kullal kamali, madza yu'abbiru 'an 'ulaka maqoli",
              "translation": "Wahai purnama kesempurnaan yang telah mencapai puncak kesempurnaan. Ungkapan apa yang dapat aku katakan untuk menguraikan keluhuranmu?",
              "english": "O full moon of perfection, who has attained every perfection — what words of mine could possibly express your exalted rank?"
            },
            {
              "id": "ya-badrotim-u2",
              "arab": "أَنْتَ الَّذِيْ أَشْرَقْتَ فِيْ أُفُقِ الْعُلَا ۞ فَمَحَوْتَ بِالْأَنْوَارِ كُلَّ ضَلَالِ",
              "latin": "Antal ladzi asyroqta fi ufuqil 'ula, famahauta bil anwari kulla dholali",
              "translation": "Engkaulah yang terbit di ufuk ketinggian, dengan cahayamu engkau lenyapkan kesesatan.",
              "english": "You are the one who rose upon the horizon of loftiness, and with your lights you erased all misguidance."
            },
            {
              "id": "ya-badrotim-u3",
              "arab": "وَبِكَ اسْتَنَارَ الْكَوْنُ يَا عَلَمَ الْهُدَى ۞ بِالنُّوْرِ وَالْإِنْعَامِ وَالْإِفْضَالِ",
              "latin": "Wabikastanarol kaunu ya 'alamal huda, binnuri wal in'ami wal ifdholi",
              "translation": "Dengan kehadiranmu semesta raya menjadi terang benderang, dengan cahaya, kenikmatan, serta keutamaanmu, wahai panji-panji petunjuk.",
              "english": "Through you the universe was illumined, O banner of guidance, with light, blessings, and grace."
            },
            {
              "id": "ya-badrotim-u4",
              "arab": "صَلَّى عَلَيْكَ اللهُ رَبِّيْ دَائِمًا ۞ أَبَدًا مَعَ الْإِبْكَارِ وَالْآصَالِ",
              "latin": "Sholla 'alaikallahu robbi da-iman, abadan ma'al ibkari wal asholi",
              "translation": "Semoga rahmat Allah, Tuhanku, senantiasa dilimpahkan kepadamu, kekal sepanjang masa, setiap pagi dan sore hari.",
              "english": "May Allah, my Lord, bless you always and forever, through every morning and evening."
            },
            {
              "id": "ya-badrotim-u5",
              "arab": "وَعَلَى جَمِيْعِ الْآلِ وَالْأَصْحَابِ مَنْ ۞ قَدْ خَصَّهُمْ رَبُّ الْعُلَا بِكَمَالِ",
              "latin": "Wa 'ala jami'il ali wal ashabi man, qod khosshohum robbul 'ula bikamali",
              "translation": "Juga kepada segenap keluarga dan para sahabat, yaitu orang-orang yang benar-benar telah diistimewakan Tuhan Yang Mahatinggi dengan kesempurnaan.",
              "english": "And upon all your family and Companions — those whom the Lord of Loftiness has singled out with perfection."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Ya Hanana",
      "slug": "ya-hanana",
      "type": "SHALAWAT",
      "description": "Qasidah pujian kepada Nabi Muhammad SAW yang masyhur dengan refrain \"Ya Hanana\" (betapa beruntungnya kami), merayakan kemunculan beliau, mukjizat terbelahnya bulan, dan harapan akan syafaat beliau di hari kiamat. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 10,
    "blocks": {
      "sections": [
        {
          "id": "ya-hanana-s1",
          "title": "Ya Hanana",
          "units": [
            {
              "id": "ya-hanana-u1",
              "arab": "ظَهَرَ الدِّينُ الْمُؤَيَّدْ ۞ بِظُهُورِ النَّبِيِّ أَحْمَدْ",
              "latin": "Dzoharad-dinul mu'ayyad, bidzuhurin-nabi Ahmad",
              "translation": "Telah muncul agama yang didukung, dengan munculnya sang Nabi Ahmad",
              "english": "The supported religion has appeared, with the coming of the Prophet Ahmad"
            },
            {
              "id": "ya-hanana-u2",
              "arab": "يَا هَنَانَا بِمُحَمَّدْ ۞ ذَٰلِكَ الْفَضْلُ مِنَ اللَّهِ",
              "latin": "Ya hanana bi Muhammad, dzalikal-fadhlu minallah",
              "translation": "Betapa beruntungnya kami dengan Muhammad (SAW), itulah anugerah dari Allah SWT",
              "english": "How fortunate we are with Muhammad; that is the bounty from Allah"
            },
            {
              "id": "ya-hanana-u3",
              "arab": "خُصَّ بِالسَّبْعِ الْمَثَانِي ۞ وَحَوَىٰ لُطْفَ الْمَعَانِي",
              "latin": "Khussha bissab'il matsani, wa hawa luthfal-ma'ani",
              "translation": "Diistimewakan dengan as-Sab'ul Matsani (al-Fatihah), penghimpun rahasia bagi setiap makna",
              "english": "He was singled out with the Seven Oft-Repeated Verses (al-Fatihah), and he gathered the subtleties of all meanings"
            },
            {
              "id": "ya-hanana-u4",
              "arab": "مَا لَهُ فِي الْخَلْقِ ثَانِي ۞ وَعَلَيْهِ أَنْزَلَ اللَّهُ",
              "latin": "Ma lahu fil-khalqi tsani, wa 'alaihi anzalallah",
              "translation": "Tidak ada yang senilai dengannya, dan Allah mewahyukan kepadanya (Muhammad SAW)",
              "english": "He has no equal among creation, and upon him Allah sent down revelation"
            },
            {
              "id": "ya-hanana-u5",
              "arab": "مِنْ مَكَّةَ لَمَّا ظَهَرْ ۞ لِأَجْلِهِ انْشَقَّ الْقَمَرْ",
              "latin": "Min Makkata lamma dzohar, li-ajlihin-syaqqal-qamar",
              "translation": "Ketika beliau muncul di Makkah, demi beliau bulan pun terbelah",
              "english": "From Makkah, when he appeared, for his sake the moon was split"
            },
            {
              "id": "ya-hanana-u6",
              "arab": "وَافْتَخَرَتْ آلُ مُضَرْ ۞ بِهِ عَلَىٰ كُلِّ الْأَنَامْ",
              "latin": "Waftakharat alu Mudhar, bihi 'ala kullil-anam",
              "translation": "Lalu kabilah Mudhar (kabilah Muhammad SAW) dibanggakan oleh seluruh manusia",
              "english": "And the family of Mudar took pride in him above all mankind"
            },
            {
              "id": "ya-hanana-u7",
              "arab": "أَطْيَبُ النَّاسِ خَلْقًا ۞ وَأَجَلُّ النَّاسِ خُلُقًا",
              "latin": "Athyabun-nasi khalqan, wa ajallun-nasi khuluqan",
              "translation": "Beliau adalah manusia yang terbaik ciptaan-Nya, dan teragung akhlaknya",
              "english": "The finest of people in form, and the noblest of people in character"
            },
            {
              "id": "ya-hanana-u8",
              "arab": "ذِكْرُهُ غَرْبًا وَشَرْقًا ۞ سَائِرٌ وَالْحَمْدُ لِلَّهِ",
              "latin": "Dzikruhu gharban wa syarqan, sa'irun wal-hamdu lillah",
              "translation": "Sebutannya tersebar di barat maupun di timur, segala puji hanya bagi Allah SWT",
              "english": "His remembrance spreads in the west and the east, and all praise belongs to Allah"
            },
            {
              "id": "ya-hanana-u9",
              "arab": "صَلُّوا عَلَىٰ خَيْرِ الْأَنَامْ ۞ الْمُصْطَفَىٰ بَدْرِ التَّمَامْ",
              "latin": "Shallu 'ala khairil-anam, al-musthafa badrit-tamam",
              "translation": "Bershalawatlah atas sebaik-baik manusia (Muhammad SAW) yang terpilih, sang bulan purnama",
              "english": "Send blessings upon the best of mankind, the Chosen One, the full moon"
            },
            {
              "id": "ya-hanana-u10",
              "arab": "صَلُّوا عَلَيْهِ وَسَلِّمُوا ۞ يَشْفَعْ لَنَا يَوْمَ الزِّحَامْ",
              "latin": "Shallu 'alaihi wa sallimu, yasyfa' lana yaumaz-ziham",
              "translation": "Sampaikanlah salam kepadanya, semoga beliau memberi syafaat kepada kita di hari kebangkitan",
              "english": "Send blessings and peace upon him; he will intercede for us on the Day of Crowding"
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Ya Arhamar Rahimin",
      "slug": "ya-arhamar-rahimin",
      "type": "SHALAWAT",
      "description": "Qasidah munajat karya Al-Habib Abdullah bin Husain bin Thahir yang berisi permohonan kelapangan, ampunan, dan husnul khatimah bagi kaum muslimin, dibuka dengan seruan Ya Arhamar Rahimin. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 18,
    "blocks": {
      "sections": [
        {
          "id": "ya-arhamar-rahimin-s1",
          "title": "Ya Arhamar Rahimin",
          "units": [
            {
              "id": "ya-arhamar-rahimin-u1",
              "arab": "يَا أَرْحَمَ الرَّاحِمِينَ يَا أَرْحَمَ الرَّاحِمِينَ ۞ يَا أَرْحَمَ الرَّاحِمِينَ فَرِّجْ عَلَى الْمُسْلِمِينَ",
              "latin": "Ya arhamar-rohimin ya arhamar-rohimin, ya arhamar-rohimin farrij 'alal muslimin",
              "translation": "Wahai Tuhan yang Maha Pengasih lebih dari segala yang mengasihi (3 kali), berikanlah kelegaan (kelapangan) kepada orang-orang muslim.",
              "english": "O Most Merciful of the merciful, O Most Merciful of the merciful, O Most Merciful of the merciful, grant relief to the Muslims."
            },
            {
              "id": "ya-arhamar-rahimin-u2",
              "arab": "يَا رَبَّنَا يَا كَرِيمُ ۞ يَا رَبَّنَا يَا رَحِيمُ أَنْتَ الْجَوَّادُ الْحَلِيمُ ۞ وَأَنْتَ نِعْمَ الْمُعِينُ",
              "latin": "Ya robbana ya karim, ya robbana ya rohim, antal jawwadul halim, wa anta ni'mal mu'in",
              "translation": "Wahai Tuhan kami, wahai Yang Maha Mulia, wahai Tuhan kami, wahai Yang Maha Penyayang. Engkau Yang Maha Pemberi lagi bersifat santun, Engkaulah sebaik-baik tempat untuk meminta pertolongan.",
              "english": "O our Lord, O Most Generous, O our Lord, O Most Merciful. You are the Generous, the Forbearing, and You are the best of helpers."
            },
            {
              "id": "ya-arhamar-rahimin-u3",
              "arab": "وَلَيْسَ نَرْجُو سِوَاكَ ۞ فَادْرِكْ إِلَهِي دَرَاكَ قَبْلَ الْفَنَا وَالْهَلَاكِ ۞ يَعُمُّ دُنْيَا وَدِينَ",
              "latin": "Wa laisa narju siwaka, fadrik ilahi daroka, qoblal fana wal halaki, ya'ummu dunya wa din",
              "translation": "Kami tidak berharap melainkan kepada-Mu, maka capaikanlah kami, ya Ilahi, dengan satu pencapaian, sebelum datang kehancuran dan kemusnahan yang menular di dunia dan agama.",
              "english": "We hope in no one but You, so grant us, O my God, attainment, before destruction and ruin spread over world and religion."
            },
            {
              "id": "ya-arhamar-rahimin-u4",
              "arab": "وَمَا لَنَا رَبَّنَا سِوَاكَ ۞ يَا حَسْبَنَا يَا ذَا الْعُلَا وَالْغِنَى ۞ وَيَا قَوِيُّ يَا مَتِينُ",
              "latin": "Wa ma lana robbana siwaka, ya hasbana, ya dzal 'ula wal ghina, wa ya qowiyyu ya matin",
              "translation": "Kami tidak memiliki tumpuan, wahai Tuhan kami, selain Engkau, wahai yang cukup diri-Mu sebagai penolong kami. Wahai Pemilik ketinggian dan kekayaan, wahai Yang Maha Kuat dan Maha Kokoh.",
              "english": "We have no one, O our Lord, but You, O our Sufficiency. O Possessor of exaltedness and riches, O Strong, O Firm."
            },
            {
              "id": "ya-arhamar-rahimin-u5",
              "arab": "نَسْأَلُكَ وَالِي يُقِيمُ ۞ الْعَدْلَ كَيْ نَسْتَقِيمَ عَلَى هُدَاكَ الْقَوِيمِ ۞ وَلَا نُطِيعُ اللَّعِينَ",
              "latin": "Nas-aluka walin yuqimul, 'adla kai nastaqima, 'ala hudakal qowimi, wa la nuthi'al la'in",
              "translation": "Kepada-Mu kami meminta pemimpin yang menegakkan keadilan, agar kami bisa istiqamah berpegang pada petunjuk-Mu yang lurus, dan kami tidak mematuhi orang yang terkutuk.",
              "english": "We ask You for a leader who upholds justice, so that we may remain steadfast upon Your straight guidance, and not obey the accursed one."
            },
            {
              "id": "ya-arhamar-rahimin-u6",
              "arab": "يَا رَبَّنَا يَا مُجِيبُ ۞ أَنْتَ السَّمِيعُ الْقَرِيبُ ضَاقَ الْوَسِيعُ الرَّحِيبُ ۞ فَانْظُرْ إِلَى الْمُؤْمِنِينَ",
              "latin": "Ya robbana ya mujib, antas-sami'ul qorib, dhoqol wasi'ur-rohib, fandzur ilal mu'minin",
              "translation": "Ya Tuhan kami, wahai Pengabul doa, Engkau Maha Mendengar lagi Maha Dekat. Ruang yang luas dan lapang terasa sempit, maka perhatikanlah orang-orang yang beriman.",
              "english": "O our Lord, O Answerer of prayers, You are the All-Hearing, the Near. What was wide and spacious has become narrow, so look upon the believers."
            },
            {
              "id": "ya-arhamar-rahimin-u7",
              "arab": "نَظْرَةً تُزِيلُ الْعَنَا ۞ عَنَّا وَتُدْنِي الْمُنَى مِنَّا وَكُلَّ الْهَنَا ۞ نُعْطَاهُ فِي كُلِّ حِينٍ",
              "latin": "Nazhrotan tuzilul 'ana, 'anna wa tudnil muna, minna wa kullal hana, nu'thohu fi kulli hin",
              "translation": "Dengan perhatian yang bisa mengusir kepenatan dari kami, perhatian yang dapat mendekatkan pada keinginan dari kami, dan setiap kesenangan yang diberikan kepada kami di setiap kesempatan.",
              "english": "With a glance that removes hardship from us and brings our hopes near to us, and every delight that is granted to us at all times."
            },
            {
              "id": "ya-arhamar-rahimin-u8",
              "arab": "أَسْأَلُكَ بِجَاهِ الْجُدُودِ ۞ وَالِي يُقِيمُ الْحُدُودَ فِينَا فَيَكْفِي الْحَسُودَ ۞ وَيَدْفَعُ الظَّالِمِينَ",
              "latin": "As-aluka bijahil jududi, walin yuqimul hududa, fina fayakfil hasuda, wa yadfa'uzh-zholimin",
              "translation": "Kepada-Mu aku memohon dengan sungguh-sungguh seorang pemimpin yang menegakkan batas-batas di tengah kami, batas-batas yang mencegah orang-orang dengki dan membasmi orang-orang zalim.",
              "english": "I ask You, by the rank of the forefathers, for a leader who upholds the limits among us, who restrains the envious and repels the wrongdoers."
            },
            {
              "id": "ya-arhamar-rahimin-u9",
              "arab": "يُزِيلُ الْمُنْكَرَاتِ ۞ يُقِيمُ الصَّلَوَاتِ يَأْمُرُ بِالصَّالِحَاتِ ۞ مُحِبٌّ لِلصَّالِحِينَ",
              "latin": "Yuzilul munkaroti, yuqimus-sholawati, ya'muru bish-sholihati, muhibbun lish-sholihin",
              "translation": "Memberantas berbagai kemungkaran, mendirikan shalat lima waktu, memerintahkan berbagai perbuatan baik, mencintai orang-orang yang shalih.",
              "english": "He removes evils, establishes the prayers, commands righteous deeds, and loves the righteous."
            },
            {
              "id": "ya-arhamar-rahimin-u10",
              "arab": "يُزِيحُ كُلَّ الْحَرَامِ ۞ يَقْهَرُ كُلَّ الطَّغَامِ يَعْدِلُ بَيْنَ الْأَنَامِ ۞ يُؤَمِّنُ الْخَائِفِينَ",
              "latin": "Yuzihu kullal haromi, yaqharu kullath-thoghomi, ya'dilu bainal anami, yu'amminul kho-ifin",
              "translation": "Menyingkirkan semua yang haram, menghapuskan semua kebodohan, berlaku adil di tengah-tengah manusia, memberikan rasa aman untuk orang-orang yang ketakutan.",
              "english": "He removes all that is forbidden, subdues all the base and ignorant, acts justly among mankind, and gives security to the fearful."
            },
            {
              "id": "ya-arhamar-rahimin-u11",
              "arab": "رَبِّ اسْقِنَا غَيْثَ عَامٍ ۞ نَافِعٌ مُبَارَكٌ دَوَامْ يَدُومُ فِي كُلِّ عَامٍ ۞ عَلَى مَمَرِّ السِّنِينَ",
              "latin": "Robbis-qina ghoitsa 'amin, nafi' mubarok dawam, yadumu fi kulli 'amin, 'ala mamarris-sinin",
              "translation": "Ya Tuhanku, siramilah kami dengan hujan yang merata, manfaat dan berkahnya selama-lamanya. Yang terus berlangsung setiap tahun dalam jangka bertahun-tahun.",
              "english": "O Lord, give us to drink of a general rain, beneficial, blessed, and lasting, enduring every year throughout the passing years."
            },
            {
              "id": "ya-arhamar-rahimin-u12",
              "arab": "رَبِّ احْيِنَا شَاكِرِينَ ۞ وَتَوَفَّنَا مُسْلِمِينَ نُبْعَثُ مِنَ الْآمِنِينَ ۞ فِي زُمْرَةِ السَّابِقِينَ",
              "latin": "Robbi ahyina syakirin, wa tawaffana muslimin, nub'ats minal aminin, fi zumrotis-sabiqin",
              "translation": "Ya Tuhanku, hidupkanlah kami dalam syukur dan wafatkanlah kami sebagai muslim. Kami dibangkitkan sebagai orang yang aman di dalam rombongan orang-orang terdahulu.",
              "english": "O Lord, let us live in gratitude and let us die as Muslims, raised among those who are safe, in the company of the foremost."
            },
            {
              "id": "ya-arhamar-rahimin-u13",
              "arab": "بِجَاهِ طَهَ الرَّسُولِ ۞ جُدْ رَبَّنَا بِالْقَبُولِ وَهَبْ لَنَا كُلَّ سُولٍ ۞ رَبِّ اسْتَجِبْ لِي آمِينَ",
              "latin": "Bijahi thohar-rosuli, jud robbana bil qobuli, wa hab lana kulla sulin, robbis-tajib li amin",
              "translation": "Dengan kedudukan Thaha, utusan Allah, bermurah hatilah, wahai Tuhan kami, untuk menerima. Anugerahilah kami setiap sesuatu yang diminta, ya Tuhanku, kabulkanlah untukku, amin.",
              "english": "By the rank of Taha, the Messenger, grant, O our Lord, acceptance, and give us everything we ask. O Lord, answer me, amin."
            },
            {
              "id": "ya-arhamar-rahimin-u14",
              "arab": "عَطَاكَ رَبِّي جَزِيلٌ ۞ وَكُلُّ فِعْلِكَ جَمِيلٌ وَفِيكَ أَمَلْنَا طَوِيلٌ ۞ فَجُدْ عَلَى الطَّامِعِينَ",
              "latin": "'Athoka robbi jazilun, wa kullu fi'lika jamilun, wa fika amalna thowilun, fajud 'alath-thomi'in",
              "translation": "Pemberian-Mu, ya Tuhanku, amat banyak, semua perbuatan-Mu itu indah. Pada-Mu angan kami menjadi panjang, maka bermurahlah pada orang-orang yang berkeinginan besar.",
              "english": "Your gift, O my Lord, is abundant, and all Your deeds are beautiful. In You our hope is long, so be generous to those who yearn."
            },
            {
              "id": "ya-arhamar-rahimin-u15",
              "arab": "يَا رَبِّ ضَاقَ الْخِنَاقُ ۞ مِنْ فِعْلِ مَا لَا يُطَاقُ فَامْنُنْ بِفَكِّ الْغَلَاقِ ۞ لِمَنْ بِذَنْبِهِ رَهِينٌ",
              "latin": "Ya robbi dhoqol khinaqu, min fi'li ma la yuthoqu, famnun bifakkil ghilaqi, liman bidzambihi rohin",
              "translation": "Ya Tuhanku, leher ini terasa sempit karena amal yang tidak sanggup kupenuhi, maka karuniailah dengan membuka penutup orang yang tersandra dosanya.",
              "english": "O Lord, the noose has tightened, from deeds that cannot be borne, so grant release from the lock to the one held hostage by his sin."
            },
            {
              "id": "ya-arhamar-rahimin-u16",
              "arab": "وَاغْفِرْ لِكُلِّ الذُّنُوبِ ۞ وَاسْتُرْ لِكُلِّ الْعُيُوبِ وَاكْشِفْ لِكُلِّ الْكُرُوبِ ۞ وَاكْفِ أَذَى الْمُؤْذِيِّينَ",
              "latin": "Waghfir likullidz-dzunubi, wastur likullil 'uyubi, waksyif likullil kurubi, wakfi adzal mu'dziyyin",
              "translation": "Ampunkanlah semua dosa, tutupilah semua aib, hilangkan segala kesusahan, cegahlah gangguan orang-orang jahat.",
              "english": "Forgive all sins, conceal all faults, lift all distresses, and ward off the harm of those who cause harm."
            },
            {
              "id": "ya-arhamar-rahimin-u17",
              "arab": "وَاخْتِمْ بِأَحْسَنِ خِتَامٍ ۞ إِذَا دَنَا الْإِنْصِرَامُ وَحَانَ حِينُ الْحِمَامِ ۞ وَزَادَ رَشْحُ الْجَبِينِ",
              "latin": "Wakhtim bi-ahsani khitamin, idza danal inshiromu, wa hana hinul himami, wa zada rosyhul jabini",
              "translation": "Sudahilah kami dengan sebaik-baik kesudahan apabila hampir waktu untuk berpisah, ketika hampir kepada maut, saat kening bercucur keringat.",
              "english": "Seal our lives with the best ending when the time of departure draws near, the hour of death arrives, and sweat pours from the brow."
            },
            {
              "id": "ya-arhamar-rahimin-u18",
              "arab": "ثُمَّ الصَّلَاةُ وَالسَّلَامُ ۞ عَلَى شَفِيعِ الْأَنَامِ وَالْآلِ نِعْمَ الْكِرَامِ ۞ وَالصَّحْبِ وَالتَّابِعِينَ",
              "latin": "Tsummash-sholatu was-salamu, 'ala syafi'il anami, wal-ali ni'mal kiromi, wash-shohbi wat-tabi'in",
              "translation": "Dan shalawat serta salam, curahkanlah kepada pemberi syafaat bagi seluruh manusia, dan keluarganya, orang-orang terhormat paling baik, juga para sahabat dan tabi'in.",
              "english": "Then blessings and peace be upon the intercessor for mankind, and upon his family, the best of the noble, and the Companions and the Followers."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Roqqota Aina",
      "slug": "roqqota-aina",
      "type": "SHALAWAT",
      "description": "Qasidah kerinduan kepada Rasulullah ﷺ dan Thaibah (Madinah) yang dipopulerkan Maher Zain lewat lagu Assalamu Alayka, memuat kisah hati Nabi di Gua Hira dan salam Assalamu 'alaika ya Rasulullah. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 9,
    "blocks": {
      "sections": [
        {
          "id": "roqqota-aina-s1",
          "title": "Roqqota Aina",
          "units": [
            {
              "id": "roqqota-aina-u1",
              "arab": "رَقَّتْ عَيْنَايَ شَوْقًا ۞ وَلِطَيْبَةَ ذَرَفَتْ عِشْقًا",
              "latin": "Roqqot 'aina ya syauqon, wa li thoibata dzarofat 'isyqon",
              "translation": "Kedua mataku penuh kerinduan, dan meneteskan air mata karena rindu kepada Thaibah (Madinah).",
              "english": "My eyes are full of longing, and they shed tears out of love for Taybah (Madinah)."
            },
            {
              "id": "roqqota-aina-u2",
              "arab": "فَأَتَيْتُ إِلَى حَبِيبِي ۞ فَاهْدَأْ يَا قَلْبُ وَرِفْقًا",
              "latin": "Fa ataitu ila habibi, fahda' ya qolbu wa rifqon",
              "translation": "Maka aku datang kepada kekasihku; tenanglah, wahai hatiku, dan berlembutlah.",
              "english": "So I came to my beloved; be calm, O my heart, and be gentle."
            },
            {
              "id": "roqqota-aina-u3",
              "arab": "صَلِّ عَلَى مُحَمَّدٍ",
              "latin": "Sholli 'ala Muhammad",
              "translation": "Bershalawatlah kepada Muhammad.",
              "english": "Send blessings upon Muhammad."
            },
            {
              "id": "roqqota-aina-u4",
              "arab": "السَّلَامُ عَلَيْكَ يَا رَسُولَ اللهِ ۞ السَّلَامُ عَلَيْكَ يَا حَبِيبِي يَا نَبِيَّ اللهِ يَا رَسُولَ اللهِ",
              "latin": "Assalamu 'alaika ya Rosulallah, assalamu 'alaika ya habibi ya Nabiyyallah ya Rosulallah",
              "translation": "Salam sejahtera atasmu, wahai Rasulullah. Salam sejahtera atasmu, wahai kekasihku, wahai Nabi Allah, wahai Rasulullah.",
              "english": "Peace be upon you, O Messenger of Allah. Peace be upon you, O my beloved, O Prophet of Allah, O Messenger of Allah."
            },
            {
              "id": "roqqota-aina-u5",
              "arab": "قَلْبٌ بِالْحَقِّ تَعَلَّقَ ۞ وَبِغَارِ حِرَاءَ تَأَلَّقَ",
              "latin": "Qolbun bil haqqi ta'allaq, wa bi ghori hiro-in ta'allaq",
              "translation": "Hati yang melekat pada kebenaran (Allah), dan yang bersinar di Gua Hira.",
              "english": "A heart attached to the Truth (Allah), and that shone in the Cave of Hira."
            },
            {
              "id": "roqqota-aina-u6",
              "arab": "يَبْكِي يَسْأَلُ خَالِقَهُ ۞ فَأَتَاهُ الْوَحْيُ فَأَشْرَقَ",
              "latin": "Yabki yas-alu kholiqohu, fa atahul wahyu fa asyroq",
              "translation": "Ia menangis dan memohon kepada Penciptanya, maka wahyu datang kepadanya, lalu ia pun bersinar.",
              "english": "He wept and asked his Creator, then revelation came to him and he shone forth."
            },
            {
              "id": "roqqota-aina-u7",
              "arab": "اِقْرَأْ اِقْرَأْ يَا مُحَمَّدُ",
              "latin": "Iqro' iqro' ya Muhammad",
              "translation": "Bacalah, bacalah, wahai Muhammad.",
              "english": "Read, read, O Muhammad."
            },
            {
              "id": "roqqota-aina-u8",
              "arab": "يَا طَيْبَةُ جِئْتُكِ صَبًّا ۞ لِرَسُولِ اللهِ مُحِبًّا",
              "latin": "Ya thoibatu ji'tuki shabbon, li Rosulillahi muhibbon",
              "translation": "Wahai Thaibah (Madinah), aku datang kepadamu sebagai seorang yang diliputi rindu, penuh cinta kepada Rasulullah.",
              "english": "O Taybah, I came to you overwhelmed with longing, full of love for the Messenger of Allah."
            },
            {
              "id": "roqqota-aina-u9",
              "arab": "بِالرَّوْضَةِ سَكَنَتْ رُوحِي ۞ وَجِوَارِ الْهَادِي مُحَمَّدٍ",
              "latin": "Bir-roudhoh sakanat ruhi, wa jiwaril hadi Muhammad",
              "translation": "Jiwaku menetap di Raudhah, dan di sisi sang pemberi petunjuk, Muhammad.",
              "english": "My soul settled in the Rawdah, and beside the guide, Muhammad."
            }
          ]
        }
      ]
    }
  }
];
