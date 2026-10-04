// PAYLOAD SEMENTARA — impor batch 4 qasidah (6 judul) sebagai DRAFT.
// Sumber teks: wakidyusuf.wordpress.com (dipilih Juple dari
// files/list-konten-wakidyusuf.md), masing-masing sudah di-cross-check
// kelengkapan bait ke sumber kedua; Arab direkonstruksi bersih, Latin
// disusun ulang, Artinya dari blog dengan pembersihan/koreksi
// terdokumentasi (beberapa judul blog hanya memuat Arab — lapis
// Latin/terjemahan disusun dari makna Arab, tercatat di dokumen
// review), English baru. Catatan: entri generik "Qosidah Imam
// al-Haddad" teridentifikasi sebagai Ya Rabbi Ya 'Alimal Hal.
// Dokumen review: qasidah-batch4/*.md di workspace goal. Dihapus
// bersama route import-qasidah-batch4 setelah eksekusi terverifikasi.
import type { ArticleBlocks } from "./db-types.ts";

export interface Batch4Article {
  meta: { title: string; slug: string; type: "SHALAWAT" | "MAULID"; description: string };
  expectedUnits: number;
  blocks: ArticleBlocks;
}

export const BATCH4_ARTICLES: Batch4Article[] = [
  {
    "meta": {
      "title": "Istighatsah",
      "slug": "istighatsah",
      "type": "SHALAWAT",
      "description": "Qasidah Istighatsah adalah doa tawassul masyhur berlafaz Nadi 'Aliyyan (Nad-e Ali versi pendek/Saghir) — seruan memohon pertolongan saat menghadapi hal mendesak melalui kewalian Sayyidina Ali bin Abi Thalib, yang dinukil blog dari Bihar al-Anwar. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 2,
    "blocks": {
      "sections": [
        {
          "id": "istighatsah-s1",
          "title": "Istighatsah",
          "units": [
            {
              "arab": "نَادِ عَلِيًّا مَظْهَرَ الْعَجَائِبِ ۞ تَجِدْهُ عَوْنًا لَكَ فِي النَّوَائِبِ",
              "english": "Call upon Ali, the manifestation of wonders; you will find him a helper for you in every calamity.",
              "id": "istighatsah-u1",
              "latin": "Nadi 'aliyyan mazharol 'aja-ibi, tajidhu 'aunan laka fin-nawa-ibi",
              "translation": "Panggillah Ali, tempat tampak berbagai keajaiban; engkau akan mendapatinya sebagai penolong bagimu dalam segala kesulitan."
            },
            {
              "arab": "كُلُّ هَمٍّ وَغَمٍّ سَيَنْجَلِيْ ۞ بِوِلَايَتِكَ يَا عَلِيُّ يَا عَلِيُّ يَا عَلِيُّ",
              "english": "Every worry and grief will be dispelled through your guardianship (wilayah), O Ali, O Ali, O Ali.",
              "id": "istighatsah-u2",
              "latin": "Kullu hammin wa ghommin sayanjali, biwilayatika ya 'Aliyyu ya 'Aliyyu ya 'Aliyyu",
              "translation": "Setiap kesedihan dan kegalauan akan sirna berkat kewalianmu, wahai Ali, wahai Ali, wahai Ali."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Khairul Bariyah",
      "slug": "khairul-bariyah",
      "type": "SHALAWAT",
      "description": "Qasidah Khairul Bariyah adalah qasidah pujian dan munajat kepada Nabi Muhammad ﷺ sebagai sebaik-baik makhluk, lautan anugerah, dan mahkota keadilan, yang masyhur dilantunkan dalam majelis maulid dan hadroh. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 5,
    "blocks": {
      "sections": [
        {
          "id": "khairul-bariyah-s1",
          "title": "Khairul Bariyah",
          "units": [
            {
              "arab": "خَيْرَ الْبَرِيَّةِ نَظْرَةً إِلَيَّ ۞ مَا أَنْتَ إِلَّا كَنْزُ الْعَطِيَّةِ",
              "english": "O best of all creation, cast a gracious glance upon me; you are nothing but a treasure-house of gifts.",
              "id": "khairul-bariyah-u1",
              "latin": "Khoirul bariyah nadhroh ilayya, ma anta illa kanzul 'athiyyah",
              "translation": "Wahai sebaik-baik makhluk, arahkanlah pandanganmu kepadaku; engkau tiada lain adalah perbendaharaan segala pemberian."
            },
            {
              "arab": "يَا بَحْرَ فَضْلٍ وَتَاجَ عَدْلٍ ۞ جُدْ لِيْ بِوَصْلٍ قَبْلَ الْمَنِيَّةِ",
              "english": "O ocean of bounty and crown of justice, grant me closeness to you before death comes.",
              "id": "khairul-bariyah-u2",
              "latin": "Ya bahro fadhlin wa taja 'adlin, jud li biwashlin qoblal maniyyah",
              "translation": "Wahai lautan anugerah dan mahkota keadilan, anugerahkanlah kepadaku perjumpaan denganmu sebelum datangnya kematian."
            },
            {
              "arab": "كَمْ ذَا أُنَادِيْ يَا خَيْرَ هَادِيْ ۞ يَكْفِيْ بِعَادِيْ يَا نُوْرَ عَيْنَيَّ",
              "english": "How often I call out to you, O best of guides; enough of this distance from you, O light of my eyes.",
              "id": "khairul-bariyah-u3",
              "latin": "Kam dza unadi ya khoiro hadi, yakfi bi'adi ya nuro 'ainayya",
              "translation": "Betapa sering aku memanggilmu, wahai sebaik-baik pemberi petunjuk; cukuplah jauhku darimu ini, wahai cahaya kedua mataku."
            },
            {
              "arab": "حَاشَاكَ تَغْفُلْ عَنَّا وَتَبْخَلْ ۞ يَا خَيْرَ الْمُرْسَلْ اِعْطِفْ عَلَيَّ",
              "english": "Far be it from you to neglect us or to withhold; O best of messengers, turn to me with compassion.",
              "id": "khairul-bariyah-u4",
              "latin": "Hasyaka taghful 'anna wa tabkhol, ya khoirol mursal a'thif 'alayya",
              "translation": "Tidaklah mungkin engkau lalai terhadap kami dan enggan memberi; wahai sebaik-baik utusan, limpahkanlah kasih sayangmu kepadaku."
            },
            {
              "arab": "صَلَاةُ رَبِّيْ عَلَيْكَ حِبِّيْ ۞ مَا دَامَ قَلْبِيْ بِالذِّكْرِ حَيَّا",
              "english": "May my Lord's blessings be upon you, my beloved, as long as my heart lives through remembrance of Allah.",
              "id": "khairul-bariyah-u5",
              "latin": "Sholatu robbi 'alaika hibbi, ma dama qolbi bidzdzikri hayya",
              "translation": "Semoga shalawat Tuhanku tercurah kepadamu, wahai kekasihku, selama hatiku tetap hidup dengan berzikir."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Mudhariyah",
      "slug": "mudhariyah",
      "type": "SHALAWAT",
      "description": "Qasidah Mudhariyah (Al-Qashidah al-Mudhariyyah fi ash-Shalah 'ala Khayril Bariyyah) adalah syair shalawat karya Imam al-Bushiri yang memohon limpahan shalawat tak terhitung bagi Nabi Muhammad ﷺ — Nabi terpilih dari keturunan Mudhar — beserta keluarga dan para sahabatnya, ditutup dengan doa ampunan bagi pembaca dan pendengarnya. Namanya diambil dari Mudhar, salah seorang leluhur Nabi ﷺ yang disebut pada bait pembuka. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 41,
    "blocks": {
      "sections": [
        {
          "id": "mudhariyah-s1",
          "title": "Mudhariyah",
          "units": [
            {
              "id": "mudhariyah-u1",
              "arab": "يَا رَبِّ صَلِّ عَلَى الْمُخْتَارِ مِنْ مُضَرٍ ۞ وَالْأَنْبِيَاءِ وَجَمِيعِ الرُّسُلِ مَا ذُكِرُوا",
              "latin": "Ya Rabbi sholli 'alal mukhtari min Mudhorin, wal anbiya-i wa jami'ir-rusuli ma dzukiru",
              "translation": "Ya Tuhanku, limpahkanlah shalawat kepada Nabi terpilih dari keturunan Mudhar, dan kepada para nabi dan seluruh rasul, sebanyak mereka disebut-sebut.",
              "english": "O my Lord, bless the Chosen One from the line of Mudar, and the prophets and all the messengers, as often as they are remembered."
            },
            {
              "id": "mudhariyah-u2",
              "arab": "وَصَلِّ رَبِّ عَلَى الْهَادِي وَعِتْرَتِهِ ۞ وَصَحْبِهِ مَنْ لِطَيِّ الدِّينِ قَدْ نَشَرُوا",
              "latin": "Wa sholli Rabbi 'alal hadi wa 'itratihi, wa shahbihi man lithoyyid-dini qod nasyaru",
              "translation": "Dan limpahkanlah shalawat, ya Tuhanku, kepada Sang Pemberi Petunjuk beserta keluarganya, dan para sahabatnya — orang-orang yang telah menyebarkan agama.",
              "english": "And bless, O my Lord, the Guide and his household, and his Companions — those who spread the faith far and wide."
            },
            {
              "id": "mudhariyah-u3",
              "arab": "وَجَاهَدُوا مَعَهُ فِي اللهِ وَاجْتَهَدُوا ۞ وَهَاجَرُوا وَلَهُ آوَوْا وَقَدْ نَصَرُوا",
              "latin": "Wa jahadu ma'ahu fillahi wajtahadu, wa hajaru wa lahu awaw wa qod nashoru",
              "translation": "Mereka berjihad bersamanya di jalan Allah dan bersungguh-sungguh; mereka berhijrah, memberinya tempat berlindung, dan sungguh telah menolongnya.",
              "english": "They strove alongside him in Allah's cause with utmost effort; they emigrated, sheltered him, and truly aided him."
            },
            {
              "id": "mudhariyah-u4",
              "arab": "وَبَيَّنُوا الْفَرْضَ وَالْمَسْنُونَ وَاعْتَصَبُوا ۞ لِلَّهِ وَاعْتَصَمُوا بِاللهِ فَانْتَصَرُوا",
              "latin": "Wa bayyanul fardho wal masnuna wa'tashobu, lillahi wa'tashomu billahi fantashoru",
              "translation": "Mereka menjelaskan yang fardhu dan yang sunnah, mereka bersatu karena Allah dan berpegang teguh kepada Allah, maka mereka memperoleh kemenangan.",
              "english": "They clarified the obligatory and the recommended, united for Allah's sake and held fast to Allah — and so they were granted victory."
            },
            {
              "id": "mudhariyah-u5",
              "arab": "أَزْكَى صَلَاةٍ وَأَنْمَاهَا وَأَشْرَفَهَا ۞ يُعَطِّرُ الْكَوْنَ رَيَّا نَشْرِهَا الْعَطِرُ",
              "latin": "Azka sholatin wa anmaha wa asyrofaha, yu'aththirul kauna royya nasyrihal 'athiru",
              "translation": "(Dengan) shalawat yang paling suci, paling bertumbuh, dan paling mulia, yang semerbak keharumannya mewangikan seluruh alam semesta.",
              "english": "With the purest of blessings, the most ever-increasing and the noblest — whose fragrant diffusion perfumes the entire universe."
            },
            {
              "id": "mudhariyah-u6",
              "arab": "مَعْبُوقَةً بِعَبِيقِ الْمِسْكِ زَاكِيَةً ۞ مِنْ طِيبِهَا أَرَجُ الرِّضْوَانِ يَنْتَشِرُ",
              "latin": "Ma'buqotan bi'abiqil miski zakiyatan, min thibiha arajur-ridhwani yantasyiru",
              "translation": "Shalawat yang semerbak dengan keharuman kesturi nan suci, yang dari keharumannya menyebarlah wangi keridhaan (Allah).",
              "english": "A blessing imbued with the fragrance of musk, pure and sweet — from its sweetness the scent of (divine) good pleasure spreads abroad."
            },
            {
              "id": "mudhariyah-u7",
              "arab": "عَدَّ الْحَصَى وَالثَّرَى وَالرَّمْلِ يَتْبَعُهَا ۞ نَجْمُ السَّمَاءِ وَنَبَاتُ الْأَرْضِ وَالْمَدَرُ",
              "latin": "'Addal hasho wats-tsaro war-romli yatba'uha, najmus-sama wa nabatul ardhi wal madaru",
              "translation": "Sebanyak bilangan kerikil, tanah, dan pasir — diikuti pula oleh bintang-bintang di langit, tumbuh-tumbuhan di bumi, dan gumpalan tanah.",
              "english": "As many as the pebbles, the soil, and the sand — followed by the stars of the sky, the plants of the earth, and the clods of clay."
            },
            {
              "id": "mudhariyah-u8",
              "arab": "وَعَدَّ وَزْنِ مَثَاقِيلِ الْجِبَالِ كَمَا ۞ يَلِيهِ قَطْرُ جَمِيعِ الْمَاءِ وَالْمَطَرُ",
              "latin": "Wa 'adda wazni matsaqilil jibali kama, yalihi qothru jami'il ma-i wal mathoru",
              "translation": "Dan sebanyak berat timbangan gunung-gunung, sebagaimana diiringi oleh (bilangan) tetesan seluruh air dan hujan.",
              "english": "And as many as the weight of the mountains' scales, together with the drops of all water and rain that follow them."
            },
            {
              "id": "mudhariyah-u9",
              "arab": "وَعَدَّ مَا حَوَتِ الْأَشْجَارُ مِنْ وَرَقٍ ۞ وَكُلِّ حَرْفٍ غَدَا يُتْلَى وَيُسْتَطَرُ",
              "latin": "Wa 'adda ma hawatil asyjaru min waroqin, wa kulli harfin ghoda yutla wa yustathoru",
              "translation": "Dan sebanyak dedaunan yang dikandung pepohonan, dan setiap huruf yang senantiasa dibaca dan dituliskan.",
              "english": "And as many as the leaves contained in all trees, and every letter that is continually recited and written down."
            },
            {
              "id": "mudhariyah-u10",
              "arab": "وَالْوَحْشِ وَالطَّيْرِ وَالْأَسْمَاكِ مَعْ نَعَمٍ ۞ يَلِيهِمُ الْجِنُّ وَالْأَمْلَاكُ وَالْبَشَرُ",
              "latin": "Wal wahsyi wath-thoyri wal asmaki ma' na'amin, yalihimul jinnu wal amlaku wal basyaru",
              "translation": "Dan (sebanyak) binatang liar, burung, dan ikan beserta ternak — diiringi oleh jin, para malaikat, dan manusia.",
              "english": "And (as many as) the wild beasts, the birds, and the fish together with the livestock — followed by the jinn, the angels, and humankind."
            },
            {
              "id": "mudhariyah-u11",
              "arab": "وَالذَّرِّ وَالنَّمْلِ مَعْ جَمْعِ الْحُبُوبِ كَذَا ۞ وَالشَّعْرِ وَالصُّوفِ وَالْأَرْيَاشِ وَالْوَبَرُ",
              "latin": "Wadz-dzarri wan-namli ma' jam'il hububi kadza, wasy-sya'ri wash-shufi wal aryasyi wal wabaru",
              "translation": "Dan (sebanyak) atom dan semut beserta seluruh biji-bijian; demikian pula rambut, wol, bulu burung, dan bulu halus hewan.",
              "english": "And (as many as) the atoms and the ants together with all grains; likewise hair, wool, feathers, and soft animal fur."
            },
            {
              "id": "mudhariyah-u12",
              "arab": "وَمَا أَحَاطَ بِهِ الْعِلْمُ الْمُحِيطُ وَمَا ۞ جَرَى بِهِ الْقَلَمُ الْمَأْمُورُ وَالْقَدَرُ",
              "latin": "Wa ma ahatho bihil 'ilmul muhithu wa ma, jaro bihil qolamul ma'muru wal qodaru",
              "translation": "Dan (sebanyak) apa yang diliputi oleh Ilmu (Allah) Yang Maha Meliputi, dan apa yang telah digoreskan oleh Pena yang diperintah dan oleh takdir.",
              "english": "And (as many as) all that is encompassed by the All-Encompassing Knowledge, and all that has been inscribed by the Commanded Pen and by Divine Decree."
            },
            {
              "id": "mudhariyah-u13",
              "arab": "وَعَدَّ نَعْمَائِكَ اللَّاتِي مَنَنْتَ بِهَا ۞ عَلَى الْخَلَائِقِ مُذْ كَانُوا وَمُذْ حُشِرُوا",
              "latin": "Wa 'adda na'ma-ikal lati mananta biha, 'alal khola-iqi mudz kanu wa mudz husyiru",
              "translation": "Dan sebanyak nikmat-nikmat-Mu yang telah Engkau anugerahkan kepada seluruh makhluk, sejak mereka ada hingga mereka dikumpulkan (di akhirat).",
              "english": "And as many as Your blessings which You have bestowed upon all creatures, from when they first existed until they are gathered (on the Last Day)."
            },
            {
              "id": "mudhariyah-u14",
              "arab": "وَعَدَّ مِقْدَارِهِ السَّامِي الَّذِي شَرُفَتْ ۞ بِهِ النَّبِيُّونَ وَالْأَمْلَاكُ وَافْتَخَرُوا",
              "latin": "Wa 'adda miqdarihis-samil ladzi syarufat, bihin-nabiyyuna wal amlaku waftakhoru",
              "translation": "Dan sebanyak kadar kedudukannya yang luhur, yang dengannya para nabi dan para malaikat menjadi mulia dan berbangga.",
              "english": "And as many as his exalted measure, through which the prophets and the angels were ennobled and took pride."
            },
            {
              "id": "mudhariyah-u15",
              "arab": "وَعَدَّ مَا كَانَ فِي الْأَكْوَانِ يَا سَنَدِي ۞ وَمَا يَكُونُ إِلَى أَنْ تُبْعَثَ الصُّوَرُ",
              "latin": "Wa 'adda ma kana fil akwani ya sanadi, wa ma yakunu ila an tub'atsash-shuwaru",
              "translation": "Dan sebanyak apa yang telah ada di seluruh alam, wahai Sandaranku, dan apa yang akan ada hingga segala bentuk (makhluk) dibangkitkan.",
              "english": "And as many as all that has existed in the worlds, O my Reliance, and all that will exist until the forms (of creatures) are resurrected."
            },
            {
              "id": "mudhariyah-u16",
              "arab": "فِي كُلِّ طَرْفَةِ عَيْنٍ يَطْرِفُونَ بِهَا ۞ أَهْلُ السَّمَاوَاتِ وَالْأَرْضِينَ أَوْ يَذَرُوا",
              "latin": "Fi kulli thorfati 'aynin yathrifuna biha, ahlus-samawati wal ardhina aw yadzaru",
              "translation": "Dalam setiap kedipan mata yang dikedipkan oleh penduduk langit dan bumi, atau yang mereka tinggalkan (tidak mereka kedipkan).",
              "english": "In every blink of an eye with which the inhabitants of the heavens and the earths blink — or leave unblinked."
            },
            {
              "id": "mudhariyah-u17",
              "arab": "مِلْءَ السَّمَاوَاتِ وَالْأَرْضِينَ مَعْ جَبَلٍ ۞ وَالْفَرْشِ وَالْعَرْشِ وَالْكُرْسِيِّ وَمَا حَصَرُوا",
              "latin": "Mil-as samawati wal ardhina ma' jabalin, wal farsyi wal 'arsyi wal kursiyyi wa ma hashoru",
              "translation": "(Shalawat) sepenuh langit dan bumi beserta gunung-gunung, hamparan bumi, 'Arsy, dan Kursi, dan apa pun yang diliputi oleh semuanya itu.",
              "english": "Blessings filling the heavens and the earths, together with the mountains, the earth's expanse, the Throne, and the Footstool, and all that they encompass."
            },
            {
              "id": "mudhariyah-u18",
              "arab": "مَا أَعْدَمَ اللهُ مَوْجُودًا وَأَوْجَدَ مَعْدُومًا ۞ صَلَاةً دَوَامًا لَيْسَ تَنْحَصِرُ",
              "latin": "Ma a'damallaahu mawjudan wa awjada ma'duman, sholatan dawaman laysa tanhashiru",
              "translation": "Selama Allah meniadakan sesuatu yang ada dan mewujudkan sesuatu yang tiada — (limpahkanlah) shalawat yang kekal abadi dan tidak terbatas.",
              "english": "For as long as Allah brings the existent into non-existence and brings the non-existent into existence — a blessing, everlasting and without limit."
            },
            {
              "id": "mudhariyah-u19",
              "arab": "تَسْتَغْرِقُ الْعَدَّ مَعْ جَمْعِ الدُّهُورِ كَمَا ۞ تُحِيطُ بِالْحَدِّ لَا تُبْقِي وَلَا تَذَرُ",
              "latin": "Tastaghriqul 'adda ma' jam'id-duhuri kama, tuhithu bil haddi la tubqi wa la tadzaru",
              "translation": "Shalawat yang melampaui seluruh hitungan beserta seluruh masa, sebagaimana ia meliputi segala batas — tidak menyisakan dan tidak meninggalkan apa pun.",
              "english": "A blessing that exhausts all counting together with all ages, as it encompasses every limit, leaving nothing remaining and omitting nothing."
            },
            {
              "id": "mudhariyah-u20",
              "arab": "لَا غَايَةَ وَانْتِهَاءً يَا عَظِيمُ لَهَا ۞ وَلَا لَهَا أَمَدٌ يُقْضَى فَيُعْتَبَرُ",
              "latin": "La ghoyata wan-tiha-an ya 'azhimu laha, wa la laha amadun yuqdho fayu'tabaru",
              "translation": "Tidak ada puncak dan akhir baginya, wahai Yang Mahagung, dan tidak ada baginya batas waktu yang berakhir lalu dapat diperhitungkan.",
              "english": "It has no ultimate goal and no conclusion, O Most Great, and it has no term that expires and could be reckoned."
            },
            {
              "id": "mudhariyah-u21",
              "arab": "وَعَدَّ أَضْعَافِ مَا قَدْ مَرَّ مِنْ عَدَدٍ ۞ مَعْ ضِعْفِ أَضْعَافِهِ يَا مَنْ لَهُ الْقَدَرُ",
              "latin": "Wa 'adda adh'afi ma qod marro min 'adadin, ma' dhi'fi adh'afihi ya man lahul qodaru",
              "translation": "Dan sebanyak kelipatan bilangan yang telah berlalu itu, beserta kelipatan dari kelipatannya — wahai Dzat yang memiliki segala kekuasaan (takdir).",
              "english": "And as many as the multiples of the number that has passed, together with the multiple of its multiples — O You to Whom belongs all power (decree)."
            },
            {
              "id": "mudhariyah-u22",
              "arab": "كَمَا تُحِبُّ وَتَرْضَى سَيِّدِي وَكَمَا ۞ أَمَرْتَنَا أَنْ نُصَلِّيَ أَنْتَ مُقْتَدِرُ",
              "latin": "Kama tuhibbu wa tardho sayyidi wa kama, amartana an nusholliya anta muqtadiru",
              "translation": "Sebagaimana yang Engkau cintai dan ridhai, wahai Junjunganku, dan sebagaimana Engkau memerintahkan kami untuk bershalawat — Engkaulah Yang Mahakuasa (atas semua itu).",
              "english": "As You love and are pleased, O my Master, and as You have commanded us to invoke blessings — You are the All-Powerful (over all of it)."
            },
            {
              "id": "mudhariyah-u23",
              "arab": "مَعَ السَّلَامِ كَمَا قَدْ مَرَّ مِنْ عَدَدٍ ۞ رَبِّي وَضَاعِفْهُمَا وَالْفَضْلُ مُنْتَشِرُ",
              "latin": "Ma'as-salami kama qod marro min 'adadin, Rabbi wa dho'ifhuma wal fadhlu muntasyiru",
              "translation": "Beserta salam (keselamatan) sebanyak bilangan yang telah berlalu itu — ya Tuhanku, lipatgandakanlah keduanya (shalawat dan salam), sedangkan karunia-Mu tersebar luas.",
              "english": "Together with peace, of the same number that has passed — O my Lord, multiply them both, while Your bounty spreads far and wide."
            },
            {
              "id": "mudhariyah-u24",
              "arab": "وَكُلُّ ذَلِكَ مَضْرُوبٌ بِحَقِّكَ فِي ۞ أَنْفَاسِ خَلْقِكَ إِنْ قَلُّوا وَإِنْ كَثَرُوا",
              "latin": "Wa kullu dzalika madhrubun bihaqqika fi, anfasi kholqika in qollu wa in katsuru",
              "translation": "Dan semua itu dilipatgandakan — demi hak-Mu — pada setiap tarikan napas makhluk-Mu, baik jumlah mereka sedikit maupun banyak.",
              "english": "And all of that is multiplied — by Your right — in every breath of Your creatures, whether they be few or many."
            },
            {
              "id": "mudhariyah-u25",
              "arab": "يَا رَبِّ وَاغْفِرْ لِقَارِئِهَا وَسَامِعِهَا ۞ وَالْمُسْلِمِينَ جَمِيعًا أَيْنَمَا حَضَرُوا",
              "latin": "Ya Rabbi waghfir liqori-iha wa sami'iha, wal muslimina jami'an aynama hadhoru",
              "translation": "Ya Tuhanku, ampunilah orang yang membacanya dan orang yang mendengarkannya, dan seluruh kaum muslimin di mana pun mereka berada.",
              "english": "O my Lord, forgive the one who recites it and the one who hears it, and all Muslims wherever they may be."
            },
            {
              "id": "mudhariyah-u26",
              "arab": "وَوَالِدَيْنَا وَأَهْلِينَا وَجِيرَتَنَا ۞ وَكُلُّنَا سَيِّدِي لِلْعَفْوِ مُفْتَقِرُ",
              "latin": "Wa walidayna wa ahlina wa jirotina, wa kulluna sayyidi lil 'afwi muftaqiru",
              "translation": "Dan (ampunilah) kedua orang tua kami, keluarga kami, dan tetangga kami — dan kami semua, wahai Junjunganku, sangat membutuhkan ampunan-Mu.",
              "english": "And (forgive) our parents, our families, and our neighbours — and all of us, O my Master, are in utter need of Your pardon."
            },
            {
              "id": "mudhariyah-u27",
              "arab": "وَقَدْ أَتَيْتُ ذُنُوبًا لَا عِدَادَ لَهَا ۞ لَكِنَّ عَفْوَكَ لَا يُبْقِي وَلَا يَذَرُ",
              "latin": "Wa qod ataytu dzunuban la 'idada laha, lakinna 'afwaka la yubqi wa la yadzaru",
              "translation": "Sungguh aku telah melakukan dosa-dosa yang tiada terhitung banyaknya, akan tetapi ampunan-Mu tidak menyisakan dan tidak meninggalkan (dosa apa pun).",
              "english": "I have indeed committed sins beyond counting, but Your pardon leaves nothing remaining and leaves nothing behind."
            },
            {
              "id": "mudhariyah-u28",
              "arab": "وَالْهَمُّ عَنْ كُلِّ مَا أَبْغِيهِ أَشْغَلَنِي ۞ وَقَدْ أَتَى خَاضِعًا وَالْقَلْبُ مُنْكَسِرُ",
              "latin": "Wal hammu 'an kulli ma abghihi asygholani, wa qod ata khodhi'an wal qolbu munkasiru",
              "translation": "Dan kesusahan telah melalaikanku dari segala yang kuharapkan, dan ia datang dengan penuh ketundukan sementara hati hancur luluh.",
              "english": "And anxiety has distracted me from all that I seek, and it has come in utter submission while the heart is broken."
            },
            {
              "id": "mudhariyah-u29",
              "arab": "أَرْجُوكَ يَا رَبِّ فِي الدَّارَيْنِ تَرْحَمُنَا ۞ بِجَاهِ مَنْ فِي يَدَيْهِ سَبَّحَ الْحَجَرُ",
              "latin": "Arjuka ya Rabbi fid-daroyni tarhamuna, bijahi man fi yadaihi sabbahal hajaru",
              "translation": "Aku memohon kepada-Mu, ya Tuhanku, agar Engkau merahmati kami di kedua negeri (dunia dan akhirat), berkat kemuliaan orang yang di kedua tangannya batu-batu kecil bertasbih.",
              "english": "I beseech You, O my Lord, to have mercy on us in both abodes (this world and the Hereafter), by the rank of the one in whose hands the pebbles glorified (Allah)."
            },
            {
              "id": "mudhariyah-u30",
              "arab": "يَا رَبِّ أَعْظِمْ لَنَا أَجْرًا وَمَغْفِرَةً ۞ فَإِنَّ جُودَكَ بَحْرٌ لَيْسَ يَنْحَصِرُ",
              "latin": "Ya Rabbi a'zhim lana ajron wa maghfirotan, fa-inna judaka bahrun laysa yanhashiru",
              "translation": "Ya Tuhanku, besarkanlah bagi kami pahala dan ampunan, karena sesungguhnya kedermawanan-Mu adalah lautan yang tidak terbatas.",
              "english": "O my Lord, grant us a mighty reward and forgiveness, for truly Your generosity is an ocean without bound."
            },
            {
              "id": "mudhariyah-u31",
              "arab": "وَاقْضِ دُيُونًا لَهَا الْأَخْلَاقُ ضَائِقَةٌ ۞ وَفَرِّجِ الْكَرْبَ عَنَّا أَنْتَ مُقْتَدِرُ",
              "latin": "Waqdhi duyunan lahal akhlaqu dho-iqotun, wa farrijil karba 'anna anta muqtadiru",
              "translation": "Dan lunasilah hutang-hutang yang membuat akhlak (kami) tertekan dan sempit, dan lapangkanlah kesusahan dari kami — Engkaulah Yang Mahakuasa.",
              "english": "And settle debts by which (our) character is straitened and distressed, and relieve hardship from us — You are the All-Powerful."
            },
            {
              "id": "mudhariyah-u32",
              "arab": "وَكُنْ لَطِيفًا بِنَا فِي كُلِّ نَازِلَةٍ ۞ لُطْفًا جَمِيلًا بِهِ الْأَهْوَالُ تَنْحَسِرُ",
              "latin": "Wa kun lathifan bina fi kulli nazilatin, luthfan jamilan bihil ahwalu tanhasiru",
              "translation": "Dan jadilah Engkau Mahalembut kepada kami dalam setiap musibah yang menimpa, dengan kelembutan yang indah yang dengannya segala ketakutan menyingkir.",
              "english": "And be Gentle with us in every calamity that descends — a beautiful gentleness by which all terrors recede."
            },
            {
              "id": "mudhariyah-u33",
              "arab": "بِالْمُصْطَفَى الْمُجْتَبَى خَيْرِ الْأَنَامِ وَمَنْ ۞ جَلَالَةً نَزَلَتْ فِي مَدْحِهِ السُّوَرُ",
              "latin": "Bil Musthofal mujtaba khoiril anami wa man, jalalatan nazalat fi madhihis-suwaru",
              "translation": "Demi Al-Musthafa, Nabi terpilih, sebaik-baik manusia — orang yang, sebagai keagungan, surah-surah (Al-Qur'an) telah turun untuk memujinya.",
              "english": "By al-Mustafa, the Chosen, the best of mankind — the one in whose praise, in majesty, the surahs (of the Qur'an) were sent down."
            },
            {
              "id": "mudhariyah-u34",
              "arab": "ثُمَّ الصَّلَاةُ عَلَى الْمُخْتَارِ مَا طَلَعَتْ ۞ شَمْسُ النَّهَارِ وَمَا قَدْ شَعْشَعَ الْقَمَرُ",
              "latin": "Tsummash-sholatu 'alal mukhtari ma thola'at, syamsun-nahari wa ma qod sya'sya'al qomaru",
              "translation": "Kemudian shalawat semoga senantiasa tercurah kepada Nabi terpilih, selama matahari siang terbit dan selama bulan bercahaya terang.",
              "english": "Then blessings be upon the Chosen One, as long as the sun of day rises and as long as the moon shines forth."
            },
            {
              "id": "mudhariyah-u35",
              "arab": "ثُمَّ الرِّضَا عَنْ أَبِي بَكْرٍ خَلِيفَتِهِ ۞ مَنْ قَامَ مِنْ بَعْدِهِ لِلدِّينِ يَنْتَصِرُ",
              "latin": "Tsummar-ridho 'an Abi Bakrin kholifatihi, man qoma min ba'dihi lid-dini yantashiru",
              "translation": "Kemudian (semoga) keridhaan (Allah) tercurah kepada Abu Bakar, khalifah beliau, orang yang sepeninggal beliau bangkit membela agama.",
              "english": "Then (may Allah's) good pleasure be upon Abu Bakr, his caliph, who stood after him to champion the faith."
            },
            {
              "id": "mudhariyah-u36",
              "arab": "وَعَنْ أَبِي حَفْصٍ الْفَارُوقِ صَاحِبِهِ ۞ مَنْ قَوْلُهُ الْفَصْلُ فِي أَحْكَامِهِ عُمَرُ",
              "latin": "Wa 'an Abi Hafshinil faruqi shohibihi, man qowluhul fashlu fi ahkamihi 'Umaru",
              "translation": "Dan kepada Abu Hafsh, Al-Faruq, sahabat beliau — orang yang ucapannya adalah kata penentu dalam ketetapan-ketetapannya — yaitu Umar.",
              "english": "And upon Abu Hafs, al-Faruq, his Companion — the one whose word is decisive in his judgements — namely 'Umar."
            },
            {
              "id": "mudhariyah-u37",
              "arab": "وَجُدْ لِعُثْمَانَ ذِي النُّورَيْنِ مَنْ كَمُلَتْ ۞ لَهُ الْمَحَاسِنُ فِي الدَّارَيْنِ وَالظَّفَرُ",
              "latin": "Wa jud li 'Utsmana dzin-nuroyni man kamulat, lahul mahasinu fid-daroyni wazh-zhofaru",
              "translation": "Dan limpahkanlah kemurahan kepada Utsman, pemilik dua cahaya, orang yang telah sempurna baginya segala kebaikan di kedua negeri (dunia dan akhirat) beserta kemenangan.",
              "english": "And bestow generously upon 'Uthman, Possessor of the Two Lights, for whom all excellences were perfected in both abodes, together with triumph."
            },
            {
              "id": "mudhariyah-u38",
              "arab": "كَذَا عَلِيٌّ مَعَ ابْنَيْهِ وَأُمِّهِمَا ۞ أَهْلُ الْعَبَاءِ كَمَا قَدْ جَاءَنَا الْخَبَرُ",
              "latin": "Kadza 'Aliyyun ma'abnayhi wa ummihima, ahlul 'aba-i kama qod ja-anal khobaru",
              "translation": "Demikian pula Ali beserta kedua putranya dan ibu keduanya — mereka adalah Ahlul 'Aba' (keluarga di bawah selimut/kisa'), sebagaimana berita (hadits) telah sampai kepada kami.",
              "english": "Likewise 'Ali, together with his two sons and their mother — they are the People of the Cloak, as the report (hadith) has reached us."
            },
            {
              "id": "mudhariyah-u39",
              "arab": "سَعْدٌ سَعِيدُ ابْنُ عَوْفٍ طَلْحَةٌ وَأَبُو ۞ عُبَيْدَةَ وَزُبَيْرٌ سَادَةٌ غُرَرٌ",
              "latin": "Sa'dun Sa'idubnu 'Awfin Tholhatun wa Abu, 'Ubaidata wa Zubayrun sadatun ghuroru",
              "translation": "Sa'ad, Sa'id bin 'Auf, Thalhah, dan Abu Ubaidah serta Zubair — para pemimpin yang mulia dan bercahaya.",
              "english": "Sa'd, Sa'id ibn 'Awf, Talhah, and Abu 'Ubaydah, and Zubayr — noble, radiant leaders."
            },
            {
              "id": "mudhariyah-u40",
              "arab": "وَحَمْزَةٌ وَكَذَا الْعَبَّاسُ سَيِّدُنَا ۞ وَنَجْلُهُ الْحَبْرُ مَنْ زَالَتْ بِهِ الْغِيَرُ",
              "latin": "Wa Hamzatun wa kadzal 'Abbasu sayyiduna, wa najluhul habru man zalat bihil ghiyaru",
              "translation": "Dan Hamzah, dan demikian pula Al-'Abbas, junjungan kami, dan putranya Sang Ulama Besar (Ibnu 'Abbas), orang yang dengannya segala perubahan zaman (kesulitan) sirna.",
              "english": "And Hamzah, and likewise al-'Abbas, our master, and his son the Great Scholar (Ibn 'Abbas), through whom the vicissitudes (of fortune) were removed."
            },
            {
              "id": "mudhariyah-u41",
              "arab": "وَالْآلُ وَالصَّحْبُ وَالْأَتْبَاعُ قَاطِبَةً ۞ مَا جَنَّ لَيْلُ الدَّيَاجِي أَوْ بَدَا السَّحَرُ",
              "latin": "Wal alu wash-shohbu wal atba'u qothibatan, ma janna laylud-dayaji aw badas-saharu",
              "translation": "Dan (semoga keridhaan itu tercurah kepada) seluruh keluarga, para sahabat, dan para pengikut semuanya, selama malam yang gelap gulita menyelimuti atau waktu sahur menjelang.",
              "english": "And (may good pleasure be) upon all the family, the Companions, and the followers entirely, as long as the night of intense darkness falls or the dawn appears."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Sholatullahi Ma Lahat Kawakib",
      "slug": "sholatullahi-ma-lahat-kawakib",
      "type": "SHALAWAT",
      "description": "Qasidah karya Habib Abdullah bin 'Alawi al-Haddad berisi shalawat selama bintang-bintang bersinar kepada Nabi Muhammad ﷺ, gambaran kafilah unta yang rindu menuju Madinah dan Kubah Hijau, serta pujian atas kemuliaan beliau. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 17,
    "blocks": {
      "sections": [
        {
          "id": "sholatullahi-ma-lahat-kawakib-s1",
          "title": "Sholatullahi Ma Lahat Kawakib",
          "units": [
            {
              "id": "sholatullahi-ma-lahat-kawakib-u1",
              "arab": "صَلَاةُ اللهِ مَا لَاحَتْ كَوَاكِبْ ۞ عَلَى أَحْمَدَ خَيْرِ مَنْ رَكِبَ النَّجَائِبْ",
              "latin": "Sholatullahi ma lahat kawakib, 'ala Ahmada khoiri man rokiban-naja-ib",
              "translation": "Semoga shalawat Allah senantiasa tercurah selama bintang-bintang bersinar, kepada Ahmad (Nabi Muhammad), sebaik-baik penunggang unta pilihan.",
              "english": "May Allah's blessings, for as long as the stars shine forth, rest upon Ahmad — the best of those who rode noble camels."
            },
            {
              "id": "sholatullahi-ma-lahat-kawakib-u2",
              "arab": "حَدَا حَادِيَ السُّرَى بِاسْمِ الْحَبَائِبْ ۞ فَهَزَّ السُّكْرُ أَعْطَافَ الرَّكَائِبْ",
              "latin": "Hada hadis-suro bismil haba-ib, fahazzas-sukru a'thofar-roka-ib",
              "translation": "Selama penggiring unta dalam perjalanan malam bersenandung menyebut nama para kekasih, mabuk (kerinduan) pun menggoyang leher-leher unta tunggangan.",
              "english": "As the camel-driver of the night journey sings, naming the beloved ones, ecstasy sways the necks of the riding camels."
            },
            {
              "id": "sholatullahi-ma-lahat-kawakib-u3",
              "arab": "أَلَمْ تَرَهَا وَقَدْ مَدَّتْ خُطَاهَا ۞ وَسَالَتْ مِنْ مَدَامِعِهَا سَحَائِبْ",
              "latin": "Alam taroha wa qod maddat khuthoha, wa salat min madami'iha saha-ib",
              "translation": "Tidakkah engkau lihat unta itu telah memanjangkan langkahnya, dan air mata bercucuran dari matanya bagaikan awan (yang menurunkan hujan)?",
              "english": "Do you not see her — she has lengthened her stride, and tears stream from her eyes like rain clouds."
            },
            {
              "id": "sholatullahi-ma-lahat-kawakib-u4",
              "arab": "وَمَالَتْ لِلْحِمَى طَرَبًا وَحَنَّتْ ۞ إِلَى تِلْكَ الْمَعَالِمِ وَالْمَلَاعِبْ",
              "latin": "Wa malat lil-hima thoroban wa hannat, ila tilkal ma'alimi wal mala'ib",
              "translation": "Langkahnya condong (menuju al-Hima) karena gembira, dan ia merintih rindu kepada tempat-tempat yang dikenalnya itu dan tempat-tempat bermainnya.",
              "english": "She leaned toward the sanctuary in delight and yearned, calling out, for those familiar landmarks and pastures."
            },
            {
              "id": "sholatullahi-ma-lahat-kawakib-u5",
              "arab": "فَدَعْ جَذْبَ الزِّمَامِ وَلَا تَسُقْهَا ۞ فَقَائِدُ شَوْقِهَا لِلْحَيِّ جَاذِبْ",
              "latin": "Fada' jadzbaz-zimami wa la tasuqha, faqo-idu syauqiha lil-hayyi jadzib",
              "translation": "Maka biarkanlah, jangan tarik tali kekangnya dan jangan menggiringnya, karena penuntun kerinduannya kepada Sang Kekasih-lah yang menariknya.",
              "english": "So leave her — do not pull her rein nor drive her on, for the leader of her longing toward the Beloved's quarter is drawing her forward."
            },
            {
              "id": "sholatullahi-ma-lahat-kawakib-u6",
              "arab": "فَهِمْ طَرَبًا كَمَا هَامَتْ وَإِلَّا ۞ فَإِنَّكَ فِيْ طَرِيْقِ الْحُبِّ كَاذِبْ",
              "latin": "Fahim thoroban kama hamat wa illa, fa-innaka fi thoriqil hubbi kadzib",
              "translation": "Maka tunjukkanlah rasa gembira (cinta)mu sebagaimana unta itu tergila-gila (oleh rindu); jika tidak, maka pendakuan cintamu di jalan cinta adalah dusta.",
              "english": "So rejoice in ecstasy as she is mad with love — otherwise, your claim upon the path of love is a lie."
            },
            {
              "id": "sholatullahi-ma-lahat-kawakib-u7",
              "arab": "أَمَّا هٰذَا الْعَقِيْقُ بَدَا وَهٰذِيْ ۞ قِبَابُ الْحَيِّ لَاحَتْ وَالْمَضَارِبْ",
              "latin": "Amma hadzal 'aqiqu bada wa hadzi, qibabul hayyi lahat wal madhorib",
              "translation": "Bukankah Lembah al-'Aqiq ini telah tampak, dan inilah kubah-kubah perkampungan (Sang Kekasih) telah bersinar, beserta kemah-kemahnya.",
              "english": "Lo — this Valley of al-'Aqiq has appeared, and here are the domes of the Beloved's quarter shining forth, together with its tents."
            },
            {
              "id": "sholatullahi-ma-lahat-kawakib-u8",
              "arab": "وَتِلْكَ الْقُبَّةُ الْخَضْرَاءُ فِيْهَا ۞ نَبِيٌّ نُوْرُهُ يَجْلُو الْغَيَاهِبْ",
              "latin": "Wa tilkal qubbatul khodro-u fiha, nabiyyun nuruhu yajlul ghoyahib",
              "translation": "Dan itulah Kubah Hijau; di dalamnya (bersemayam) seorang Nabi yang cahayanya melenyapkan segala kegelapan.",
              "english": "And that is the Green Dome — within it rests a Prophet whose light dispels all darkness."
            },
            {
              "id": "sholatullahi-ma-lahat-kawakib-u9",
              "arab": "وَقَدْ صَحَّ الرِّضَى وَدَنَا التَّلَاقِيْ ۞ وَقَدْ جَاءَ الْهَنَا مِنْ كُلِّ جَانِبْ",
              "latin": "Wa qod shohhar-ridho wa danat-talaqi, wa qod ja-al hana min kulli janib",
              "translation": "Sungguh telah nyata keridhaan (Allah) dan pertemuan telah dekat, dan sungguh kegembiraan telah datang dari segala penjuru.",
              "english": "Good pleasure has truly been granted and the meeting has drawn near, and joy has indeed come from every side."
            },
            {
              "id": "sholatullahi-ma-lahat-kawakib-u10",
              "arab": "فَقُلْ لِلنَّفْسِ دُوْنَكِ وَالتَّمَلِّيْ ۞ فَمَا دُوْنَ الْحَبِيْبِ الْيَوْمَ حَاجِبْ",
              "latin": "Faqul linnafsi dunaki wat-tamalli, fama dunal habibil yauma hajib",
              "translation": "Maka katakanlah kepada jiwamu: inilah bagianmu, puaskanlah hatimu (memandang Sang Kekasih), sebab hari ini tidak ada penghalang antara engkau dan Sang Kekasih.",
              "english": "So say to your soul: take your share and delight in it, for today there is no barrier between you and the Beloved."
            },
            {
              "id": "sholatullahi-ma-lahat-kawakib-u11",
              "arab": "تَمَلَّى بِالْحَبِيْبِ بِكُلِّ قَصْدٍ ۞ فَقَدْ حَصَلَ الْهَنَا وَالضِّدُّ غَائِبْ",
              "latin": "Tamalla bil habibi bikulli qoshdin, faqod hasholal hana wad-dhiddu gho-ib",
              "translation": "Puas-puaskanlah hatimu dengan Sang Kekasih dalam setiap tujuan; sungguh kegembiraan telah tercapai dan kedukaan telah lenyap.",
              "english": "Delight in the Beloved with every purpose, for joy has been attained and its opposite has vanished."
            },
            {
              "id": "sholatullahi-ma-lahat-kawakib-u12",
              "arab": "نَبِيُّ اللهِ خَيْرُ الْخَلْقِ جَمِيْعًا ۞ لَهُ أَعْلَى الْمَنَاصِبِ وَالْمَرَاتِبْ",
              "latin": "Nabiyyullahi khoirul kholqi jami'an, lahu a'lal manashibi wal marotib",
              "translation": "Nabi Allah, sebaik-baik makhluk seluruhnya; baginya kedudukan dan martabat yang tertinggi.",
              "english": "The Prophet of Allah, the best of all creation entirely — his are the highest stations and ranks."
            },
            {
              "id": "sholatullahi-ma-lahat-kawakib-u13",
              "arab": "لَهُ الْجَاهُ الرَّفِيْعُ لَهُ الْمَعَالِيْ ۞ لَهُ الشَّرَفُ الْمُؤَبَّدُ وَالْمَنَاقِبْ",
              "latin": "Lahul jahur-rofi'u lahul ma'ali, lahusy-syaroful mu-abbadu wal manaqib",
              "translation": "Baginya kedudukan yang luhur, baginya segala keluhuran; baginya kemuliaan yang abadi dan segala sifat terpuji.",
              "english": "His is the exalted standing, his are all heights of glory; his is everlasting honour and all noble virtues."
            },
            {
              "id": "sholatullahi-ma-lahat-kawakib-u14",
              "arab": "فَلَوْ أَنَّا سَعَيْنَا كُلَّ يَوْمٍ ۞ عَلَى الْأَحْدَاقِ لَا فَوْقَ النَّجَائِبْ",
              "latin": "Falau anna sa'aina kulla yaumin, 'alal ahdaqi la fauqon-naja-ib",
              "translation": "Maka seandainya kami berjalan setiap hari di atas bola mata kami, bukan di atas punggung unta-unta pilihan.",
              "english": "If only we were to journey every day upon our very eyeballs, rather than upon the backs of noble camels."
            },
            {
              "id": "sholatullahi-ma-lahat-kawakib-u15",
              "arab": "وَلَوْ أَنَّا عَمِلْنَا كُلَّ حِيْنٍ ۞ لِأَحْمَدَ مَوْلِدًا قَدْ كَانَ وَاجِبْ",
              "latin": "Wa lau anna 'amilna kulla hinin, li-Ahmada maulidan qod kana wajib",
              "translation": "Dan seandainya kami mengadakan peringatan maulid untuk Ahmad setiap saat, sungguh hal itu memang wajib atas kami.",
              "english": "And if we were to hold a mawlid for Ahmad at every moment, it would surely be nothing more than our duty."
            },
            {
              "id": "sholatullahi-ma-lahat-kawakib-u16",
              "arab": "عَلَيْهِ مِنَ الْمُهَيْمِنِ كُلَّ وَقْتٍ ۞ صَلَاةٌ مَا بَدَا نُوْرُ الْكَوَاكِبْ",
              "latin": "'Alaihi minal muhaimini kulla waqtin, sholatun ma bada nurul kawakib",
              "translation": "Atas beliau, dari Allah Al-Muhaimin, tercurah shalawat setiap waktu, selama cahaya bintang-bintang tampak.",
              "english": "Upon him, from Allah the All-Watchful Guardian, be blessings at every moment, for as long as the light of the stars appears."
            },
            {
              "id": "sholatullahi-ma-lahat-kawakib-u17",
              "arab": "تَعُمُّ الْآلَ وَالْأَصْحَابَ طُرًّا ۞ جَمِيْعَهُمْ وَعِتْرَتَهُ الْأَطَايِبْ",
              "latin": "Ta'ummul ala wal ashhaba thurron, jami'ahum wa 'itrotahul athoyib",
              "translation": "(Shalawat itu) meliputi keluarga dan para sahabat seluruhnya, semuanya, serta keturunannya yang baik-baik lagi mulia.",
              "english": "May it encompass his family and his Companions, all of them entirely, and his pure and noble progeny."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Syafi'iyah — Taqwallah",
      "slug": "syafiiyah-taqwallah",
      "type": "SHALAWAT",
      "description": "Qasidah Syafi'iyah — Taqwallah adalah syair nasihat tentang takwa, tawakal dalam soal rezeki, dan ingatan akan kematian yang masyhur dinisbatkan kepada Imam asy-Syafi'i, dibuka dengan bait 'Alaika bitaqwallah (bertakwalah kepada Allah)'. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 9,
    "blocks": {
      "sections": [
        {
          "id": "syafiiyah-taqwallah-s1",
          "title": "Syafi'iyah — Taqwallah",
          "units": [
            {
              "arab": "عَلَيْكَ بِتَقْوَى اللهِ إِنْ كُنْتَ غَافِلًا ۞ يَأْتِيْكَ بِالْأَرْزَاقِ مِنْ حَيْثُ لَا تَدْرِيْ",
              "english": "Hold fast to the fear of Allah if you have been heedless — He will bring you provision from where you do not expect.",
              "id": "syafiiyah-taqwallah-u1",
              "latin": "'Alaika bitaqwallahi in kunta ghofila, ya'tika bil arzaqi min haitsu la tadri",
              "translation": "Bertakwalah kepada Allah jika engkau lalai, niscaya Dia akan mendatangkan rezeki kepadamu dari arah yang tidak engkau ketahui."
            },
            {
              "arab": "فَكَيْفَ تَخَافُ الْفَقْرَ وَاللهُ رَازِقًا ۞ فَقَدْ رَزَقَ الطَّيْرَ وَالْحُوْتَ فِي الْبَحْرِ",
              "english": "So how can you fear poverty, when Allah is the Provider? He has granted provision to the birds and to the whale in the sea.",
              "id": "syafiiyah-taqwallah-u2",
              "latin": "Fakaifa takhoful faqro wallahu roziqo, faqod rozaqoth-thoiro wal huta fil bahri",
              "translation": "Maka bagaimana engkau takut akan kefakiran, padahal Allah adalah Pemberi rezeki? Sungguh Dia telah memberi rezeki kepada burung dan ikan paus di lautan."
            },
            {
              "arab": "وَمَنْ ظَنَّ أَنَّ الرِّزْقَ يَأْتِيْ بِقُوَّةٍ ۞ مَا أَكَلَ الْعُصْفُوْرُ شَيْئًا مَعَ النَّسْرِ",
              "english": "Whoever imagines that provision comes by strength alone — the sparrow would never eat a thing alongside the eagle.",
              "id": "syafiiyah-taqwallah-u3",
              "latin": "Waman zhonna annar-rizqo ya'ti biquwwah, ma akalal 'ushfuru syai-an ma'an-nasri",
              "translation": "Barang siapa mengira bahwa rezeki datang karena kekuatan, (ketahuilah) burung pipit tidak akan dapat makan apa pun di samping burung elang."
            },
            {
              "arab": "تَزُوْلُ عَنِ الدُّنْيَا فَإِنَّكَ لَا تَدْرِيْ ۞ إِذَا جَنَّ عَلَيْكَ اللَّيْلُ هَلْ تَعِيْشُ إِلَى الْفَجْرِ",
              "english": "You will depart this world, and truly you do not know: when night closes in upon you, will you live until dawn?",
              "id": "syafiiyah-taqwallah-u4",
              "latin": "Tazulu 'anid-dunya fa-innaka la tadri, idza janna 'alaikal-lailu hal ta'isyu ilal fajri",
              "translation": "Engkau akan pergi meninggalkan dunia, dan sungguh engkau tidak tahu: apabila malam telah menyelimutimu, apakah engkau masih hidup sampai fajar?"
            },
            {
              "arab": "فَكَمْ مِنْ صَحِيْحٍ مَاتَ مِنْ غَيْرِ عِلَّةٍ ۞ وَكَمْ مِنْ سَقِيْمٍ عَاشَ حِيْنًا مِنَ الدَّهْرِ",
              "english": "How many a healthy person has died without any illness, and how many a sick person has lived on for years and years.",
              "id": "syafiiyah-taqwallah-u5",
              "latin": "Fakam min shohihin mata min ghoiri 'illah, wakam min saqimin 'asya hinan minad-dahri",
              "translation": "Betapa banyak orang sehat yang mati tanpa sakit terlebih dahulu, dan betapa banyak orang sakit yang hidup lama bertahun-tahun."
            },
            {
              "arab": "وَكَمْ مِنْ فَتًى أَمْسَى وَأَصْبَحَ ضَاحِكًا ۞ وَأَكْفَانُهُ فِي الْغَيْبِ تُنْسَجُ وَهُوَ لَا يَدْرِيْ",
              "english": "How many a young man laughs through evening and morning, while his shrouds are being woven in the unseen — and he does not know.",
              "id": "syafiiyah-taqwallah-u6",
              "latin": "Wakam min fatan amsa wa ashbaha dhohika, wa akfanuhu fil ghoibi tunsaju wahuwa la yadri",
              "translation": "Betapa banyak pemuda yang tertawa di sore dan pagi hari, sedangkan kain kafannya sedang ditenun di alam gaib tanpa ia ketahui."
            },
            {
              "arab": "وَكَمْ مِنْ صِغَارٍ يُرْتَجَى طُوْلُ عُمْرِهِمْ ۞ وَقَدْ أُدْخِلَتْ أَجْسَامُهُمْ ظُلْمَةَ الْقَبْرِ",
              "english": "How many children, hoped to enjoy long lives, whose bodies have already been laid into the darkness of the grave.",
              "id": "syafiiyah-taqwallah-u7",
              "latin": "Wakam min shighorin yurtaja thulu 'umrihim, waqod udkhilat ajsamuhum zhulmatal qobri",
              "translation": "Betapa banyak anak kecil yang diharapkan berumur panjang, namun jasad mereka telah dimasukkan ke dalam gelapnya kubur."
            },
            {
              "arab": "وَكَمْ مِنْ عَرُوْسٍ زَيَّنُوْهَا لِزَوْجِهَا ۞ وَقَدْ قُبِضَتْ أَرْوَاحُهُمْ لَيْلَةَ الْقَدْرِ",
              "english": "How many a bride, adorned beautifully for her spouse, whose soul was taken on the night decreed for her.",
              "id": "syafiiyah-taqwallah-u8",
              "latin": "Wakam min 'arusin zayyanuha lizaujiha, waqod qubidhot arwahuhum lailatal qodri",
              "translation": "Betapa banyak pengantin yang dihias indah untuk pasangannya, namun ruh mereka telah dicabut pada malam yang telah ditentukan (ajal mereka)."
            },
            {
              "arab": "فَمَنْ عَاشَ أَلْفًا وَأَلْفَيْنِ ۞ فَلَا بُدَّ مِنْ يَوْمٍ يَسِيْرُ إِلَى الْقَبْرِ",
              "english": "Whoever lives a thousand years, or two thousand, must one day make his way to the grave.",
              "id": "syafiiyah-taqwallah-u9",
              "latin": "Faman 'asya alfan wa alfain, fala budda min yaumin yasiru ilal qobri",
              "translation": "Siapa pun yang hidup seribu atau dua ribu tahun, pasti suatu hari ia akan berjalan menuju kubur."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Ya Rabbi Ya 'Alimal Hal",
      "slug": "ya-rabbi-ya-alimal-hal",
      "type": "SHALAWAT",
      "description": "Qasidah Ya Rabbi Ya 'Alimal Hal adalah munajat masyhur karya Imam Abdullah bin 'Alawi al-Haddad (termuat dalam Diwan al-Haddad): permohonan agar aib ditutup, dosa diampuni, dan hati diperbaiki, dibuka bait Ya 'Alimas Sirri dan ditutup shalawat serta hamdalah. Sumber teks: wakidyusuf.wordpress.com, dilengkapi dan dicocokkan dengan Diwan al-Haddad."
    },
    "expectedUnits": 22,
    "blocks": {
      "sections": [
        {
          "id": "ya-rabbi-ya-alimal-hal-s1",
          "title": "Ya Rabbi Ya 'Alimal Hal",
          "units": [
            {
              "id": "ya-rabbi-ya-alimal-hal-u1",
              "arab": "يَا عَالِمَ السِّرِّ مِنَّا لَا تَهْتِكِ السِّتْرَ عَنَّا ۞ وَعَافِنَا وَاعْفُ عَنَّا وَكُنْ لَنَا حَيْثُ كُنَّا",
              "latin": "Ya 'alimas sirri minna, la tahtikis sitro 'anna, wa 'afina wa'fu 'anna, wa kun lana haitsu kunna",
              "translation": "Wahai Dzat yang Maha Mengetahui segala rahasia kami, janganlah Engkau bukakan tirai penutup (aib) kami; berilah kami keselamatan dan maafkanlah kami, dan jadilah penolong kami di mana pun kami berada.",
              "english": "O Knower of our secrets, do not tear away the veil that covers us; grant us well-being and pardon us, and be with us wherever we may be."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u2",
              "arab": "يَا رَبِّ يَا عَالِمَ الْحَالْ إِلَيْكَ وَجَّهْتُ الْآمَالْ ۞ فَامْنُنْ عَلَيْنَا بِالْإِقْبَالْ وَكُنْ لَنَا وَاصْلِحِ الْبَالْ",
              "latin": "Ya Robbi ya 'alimal hal, ilaika wajjahtul amal, famnun 'alaina bil iqbal, wa kun lana washlihil bal",
              "translation": "Wahai Tuhanku, wahai Dzat yang Maha Mengetahui segala keadaan, hanya kepada-Mu kuhadapkan segala harapanku; maka anugerahkanlah kepada kami perkenan-Mu, jadilah penolong kami, dan perbaikilah hati kami.",
              "english": "O my Lord, O Knower of every state, to You alone I have directed my hopes; so bless us with Your acceptance, be with us, and set our hearts aright."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u3",
              "arab": "يَا رَبِّ يَا رَبَّ الْأَرْبَابْ عَبْدُكَ فَقِيْرُكَ عَلَى الْبَابْ ۞ أَتَى وَقَدْ بَتَّ الْأَسْبَابْ مُسْتَدْرِكًا بَعْدَ مَا مَالْ",
              "latin": "Ya Robbi ya Robbal arbab, 'abduka faqiruka 'alal bab, ata wa qod battal asbab, mustadrikan ba'da ma mal",
              "translation": "Wahai Tuhanku, wahai Tuhan segala tuan, hamba-Mu yang fakir ini berada di pintu-Mu; ia datang setelah terputus segala sandaran, untuk menebus kesalahannya setelah ia menyimpang.",
              "english": "O my Lord, O Lord of all lords, Your servant, Your poor one, is at Your door; he has come, all means cut off, seeking to make amends after he had strayed."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u4",
              "arab": "يَا وَاسِعَ الْجُوْدِ جُوْدَكْ الْخَيْرُ خَيْرُكَ وَعِنْدَكْ ۞ فَوْقَ الَّذِيْ رَامَ عَبْدُكْ فَادْرِكْ بِرَحْمَتِكَ فِي الْحَالْ",
              "latin": "Ya wasi'al judi judak, al-khoiru khoiruka wa 'indak, fauqol ladzi roma 'abduk, fadrik birohmatika fil hal",
              "translation": "Wahai Dzat yang Maha Luas kemurahan-Nya, kemurahan-Mu dan segala kebaikan adalah milik-Mu dan berada di sisi-Mu, melebihi apa yang diharapkan hamba-Mu; maka tolonglah ia dengan rahmat-Mu saat ini juga.",
              "english": "O You whose generosity is vast — Your bounty and all goodness are Yours and with You, beyond all that Your servant could hope for; so come to his aid with Your mercy, right now."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u5",
              "arab": "يَا مُوْجِدَ الْخَلْقِ طُرًّا وَمُوْسِعَ الْكُلِّ بِرًّا ۞ أَسْأَلُكَ إِسْبَالَ سِتْرًا عَلَى الْقَبَائِحْ وَالْأَخْطَالْ",
              "latin": "Ya mujidal kholqi thurro, wa musi'al kulli birro, as-aluka isbala sitro, 'alal qobaih wal akhthol",
              "translation": "Wahai Dzat yang menciptakan seluruh makhluk dan yang melapangkan kebaikan bagi semuanya, aku memohon kepada-Mu agar Engkau menurunkan tirai penutup atas segala keburukan dan kesalahanku.",
              "english": "O Creator of all beings, and Giver of abundant goodness to all, I ask You to let down a covering veil over my shameful deeds and my errors."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u6",
              "arab": "يَا مَنْ يَرَى سِرَّ قَلْبِيْ حَسْبِيْ اطِّلَاعُكَ حَسْبِيْ ۞ فَامْحُ بِعَفْوِكَ ذَنْبِيْ وَاصْلِحْ قُصُوْدِيْ وَالْأَعْمَالْ",
              "latin": "Ya man yaro sirro qolbi, hasbi iththila'uka hasbi, famhu bi'afwika dzanbi, washlih qushudi wal a'mal",
              "translation": "Wahai Dzat yang melihat rahasia hatiku, cukuplah bagiku pengetahuan-Mu tentang keadaanku, cukuplah itu bagiku; maka hapuskanlah dosaku dengan maaf-Mu, dan perbaikilah niat serta amal perbuatanku.",
              "english": "O You who see the secret of my heart — Your knowledge of me suffices me, it is enough for me; so erase my sin with Your pardon, and set right my intentions and my deeds."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u7",
              "arab": "رَبِّيْ عَلَيْكَ اعْتِمَادِيْ كَمَا إِلَيْكَ اسْتِنَادِيْ ۞ صِدْقًا وَأَقْصَى مُرَادِيْ رِضَاؤُكَ الدَّائِمُ الْحَالْ",
              "latin": "Robbi 'alaika i'timadi, kama ilaika istinadi, shidqon wa aqsho murodi, ridhoukad da-imul hal",
              "translation": "Tuhanku, hanya kepada-Mu aku bertawakal dan hanya kepada-Mu aku bersandar dengan tulus; dan hasratku yang tertinggi adalah ridha-Mu yang senantiasa menyertai setiap keadaan.",
              "english": "My Lord, my reliance is upon You, and to You alone I lean in sincerity; and my utmost desire is Your good pleasure, abiding in every state."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u8",
              "arab": "يَا رَبِّ يَا رَبِّ إِنِّيْ أَسْأَلُكَ الْعَفْوَ عَنِّيْ ۞ وَلَمْ يَخِبْ فِيْكَ ظَنِّيْ يَا مَالِكَ الْمُلْكِ يَا وَالْ",
              "latin": "Ya Robbi ya Robbi inni, as-alukal 'afwa 'anni, wa lam yakhib fika zhonni, ya malikal mulki ya wal",
              "translation": "Wahai Tuhanku, wahai Tuhanku, sungguh aku memohon ampunan-Mu untukku; dan tidak pernah kecewa prasangka baikku kepada-Mu, wahai Pemilik segala kerajaan, wahai Pelindungku.",
              "english": "O my Lord, O my Lord, I ask Your pardon for me; and my good hope in You has never been disappointed, O Owner of all sovereignty, O my Protector."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u9",
              "arab": "أَشْكُوْ إِلَيْكَ وَأَبْكِيْ مِنْ شُؤْمِ ظُلْمِيْ وَإِفْكِيْ ۞ وَسُوْءِ فِعْلِيْ وَتَرْكِيْ وَشَهْوَةِ الْقِيْلِ وَالْقَالْ",
              "latin": "Asyku ilaika wa abki, min syu'mi zhulmi wa ifki, wa suu-i fi'li wa tarki, wa syahwatil qiili wal qol",
              "translation": "Hanya kepada-Mu aku mengadu dan menangis, karena celakanya kezaliman dan kedustaanku, buruknya perbuatanku dan apa yang kutinggalkan dari kewajibanku, serta kegemaranku pada ucapan yang sia-sia (katanya dan katanya).",
              "english": "To You alone I complain and weep — over the wretchedness of my wrongdoing and my falsehood, the evil of my deeds and my omissions, and my appetite for idle talk, 'he said' and 'she said'."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u10",
              "arab": "وَحُبِّ دُنْيَا ذَمِيْمَةْ مِنْ كُلِّ خَيْرٍ عَقِيْمَةْ ۞ فِيْهَا الْبَلَايَا مُقِيْمَةْ وَحَشْوُهَا آفَاتٌ وَأَشْغَالْ",
              "latin": "Wa hubbi dunya dzamimah, min kulli khoirin 'aqimah, fihal balaya muqimah, wa hasywuha afatun wa asyghol",
              "translation": "Dan aku mengadu tentang cintaku pada dunia yang tercela, yang mandul dari segala kebaikan; di dalamnya bencana menetap, dan isinya hanyalah kerusakan dan kesibukan yang melalaikan.",
              "english": "And of my love for a blameworthy world, barren of all good; within it calamities dwell, and its contents are nothing but harms and distracting occupations."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u11",
              "arab": "يَا وَيْحَ نَفْسِي الْغَوِيَّةْ عَنِ السَّبِيْلِ السَّوِيَّةْ ۞ أَضْحَتْ تُرَوِّجْ عَلَيَّ وَقَصْدُهَا الْجَاهَ وَالْمَالْ",
              "latin": "Ya waiha nafsil ghowiyyah, 'anis sabilis sawiyyah, adhhat turowwij 'alayya, wa qoshduhal jaha wal mal",
              "translation": "Celakalah nafsuku yang sesat, yang menyimpang dari jalan yang lurus; ia terus-menerus mendatangiku dengan godaannya, padahal tujuannya hanyalah kedudukan dan harta.",
              "english": "Woe to my erring soul, strayed from the straight path; it keeps coming at me with its temptations, while all it seeks is rank and wealth."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u12",
              "arab": "يَا رَبِّ قَدْ غَلَبَتْنِيْ وَبِالْأَمَانِيْ سَبَتْنِيْ ۞ وَفِي الْحُظُوْظِ كَبَّتْنِيْ وَقَيَّدَتْنِيْ بِالْإِكْبَالْ",
              "latin": "Ya Robbi qod gholabatni, wa bil amani sabatni, wa fil hudhuzhi kabbatni, wa qoyyadatni bil ikbal",
              "translation": "Wahai Tuhanku, nafsuku sungguh telah mengalahkanku; dengan angan-angan ia menawanku, dalam mengejar kesenangan duniawi ia menjerumuskanku, dan ia membelengguku dengan belenggu yang kuat.",
              "english": "O my Lord, it has truly overpowered me; with vain hopes it has taken me captive, into worldly fortunes it has plunged me, and it has bound me in shackles."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u13",
              "arab": "قَدِ اسْتَعَنْتُكَ رَبِّيْ عَلَى مُدَاوَاةِ قَلْبِيْ ۞ وَحَلِّ عُقْدَةِ كَرْبِيْ فَانْظُرْ إِلَى الْغَمِّ يَنْجَالْ",
              "latin": "Qodis ta'antuka Robbi, 'ala mudawati qolbi, wa halli 'uqdati karbi, fanzhur ilal ghommi yanjal",
              "translation": "Sungguh aku memohon pertolongan-Mu, wahai Tuhanku, untuk mengobati penyakit hatiku dan melepaskan ikatan kesulitanku; maka pandanglah aku dengan rahmat-Mu, agar kesedihan ini hilang.",
              "english": "I have truly sought Your help, my Lord, to heal my heart and to untie the knot of my distress; so look upon me in mercy, that this sorrow may be lifted away."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u14",
              "arab": "يَا رَبِّ يَا خَيْرَ كَافِيْ أُحْلُلْ عَلَيْنَا الْعَوَافِيْ ۞ فَلَيْسَ شَيْءٌ ثَمَّ خَافِيْ عَلَيْكَ تَفْصِيْلٌ وَإِجْمَالْ",
              "latin": "Ya Robbi ya khoiro kafi, uhlul 'alainal 'awafi, falaisa syai-un tsamma khofi, 'alaika tafshilun wa ijmal",
              "translation": "Wahai Tuhanku, wahai sebaik-baik Dzat yang mencukupi, limpahkanlah kepada kami kesehatan dan keselamatan; karena tidak ada sesuatu pun yang tersembunyi bagi-Mu, baik yang terperinci maupun yang ringkas.",
              "english": "O my Lord, O best of sufficers, pour down well-being upon us; for nothing whatsoever is hidden from You, neither in detail nor in summary."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u15",
              "arab": "يَا رَبِّ عَبْدُكَ بِبَابِكْ يَخْشَى أَلِيْمَ عَذَابِكْ ۞ وَيَرْتَجِيْ لِثَوَابِكْ وَغَيْثُ رَحْمَتِكَ هَطَّالْ",
              "latin": "Ya Robbi 'abduka bibabik, yakhsya alima 'adzabik, wa yartaji litsawabik, wa ghoitsu rohmatika haththol",
              "translation": "Wahai Tuhanku, hamba-Mu berdiri di pintu-Mu; ia takut akan pedihnya azab-Mu dan mengharapkan pahala-Mu, sedangkan hujan rahmat-Mu tercurah dengan derasnya.",
              "english": "O my Lord, Your servant is at Your door; he fears Your painful punishment and hopes for Your reward, while the rain of Your mercy pours down abundantly."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u16",
              "arab": "وَقَدْ أَتَاكَ بِعُذْرِهْ وَانْكِسَارِهِ وَفَقْرِهْ ۞ فَاهْزِمْ بِيُسْرِكَ عُسْرَهْ بِمَحْضِ جُوْدِكَ وَالْإِفْضَالْ",
              "latin": "Wa qod ataka bi'udzrih, wankisarihi wa faqrih, fahzim biyusrika 'usroh, bimahdhi judika wal ifdhol",
              "translation": "Ia telah datang kepada-Mu dengan membawa uzurnya, kehancuran hatinya, dan kefakirannya; maka kalahkanlah kesulitannya dengan kemudahan dari-Mu, semata-mata karena kemurahan dan anugerah-Mu.",
              "english": "He has come to You with his excuse, his brokenness, and his poverty; so defeat his hardship with Your ease, purely out of Your generosity and grace."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u17",
              "arab": "وَامْنُنْ عَلَيْهِ بِتَوْبَةْ تَغْسِلُهُ مِنْ كُلِّ حَوْبَةْ ۞ وَاعْصِمْهُ مِنْ شَرِّ أَوْبَةْ لِكُلِّ مَا عَنْهُ قَدْ حَالْ",
              "latin": "Wamnun 'alaihi bitaubah, taghsiluhu min kulli haubah, wa'shimhu min syarri aubah, likulli ma 'anhu qod hal",
              "translation": "Dan anugerahkanlah kepadanya tobat yang membasuh bersih dirinya dari segala dosa; dan jagalah ia dari buruknya kembali kepada dosa dalam segala hal yang telah berlalu darinya.",
              "english": "And bless him with a repentance that washes him clean of every sin; and guard him from the evil of relapsing into all that he has left behind."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u18",
              "arab": "فَأَنْتَ مَوْلَى الْمَوَالِيْ الْمُنْفَرِدُ بِالْكَمَالِ ۞ وَبِالْعُلَا وَالتَّعَالِيْ عَلَوْتَ عَنْ ضَرْبِ الْأَمْثَالْ",
              "latin": "Fa anta maulal mawali, al-munfaridu bil kamali, wa bil 'ula wat ta'ali, 'alauta 'an dhorbil amtsal",
              "translation": "Karena Engkaulah Tuhan segala tuan, yang Esa dalam kesempurnaan; dan dalam ketinggian serta keagungan, Engkau Mahatinggi melampaui segala perumpamaan.",
              "english": "For You are the Master of all masters, alone in perfection; and in loftiness and exaltedness You are far above all comparison."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u19",
              "arab": "جُوْدُكَ وَفَضْلُكَ وَبِرُّكَ يُرْجَى وَبَطْشُكَ وَقَهْرُكَ ۞ يُخْشَى وَذِكْرُكَ وَشُكْرُكَ لَازِمْ وَحَمْدُكَ وَالْإِجْلَالْ",
              "latin": "Juduka wa fadhluka wa birruka yurja wa bathsyuka wa qohroka, yukhsya wa dzikruka wa syukruka lazim, wa hamduka wal ijlal",
              "translation": "Kemurahan, anugerah, dan kebaikan-Mu sangat diharapkan; sebaliknya siksa dan murka-Mu sangat ditakuti; sedangkan mengingat-Mu dan bersyukur kepada-Mu adalah keharusan, begitu pula memuji dan mengagungkan-Mu.",
              "english": "Your generosity, grace, and kindness are hoped for, while Your punishment and wrath are feared; and remembering You and thanking You are binding duties, as are praising and glorifying You."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u20",
              "arab": "يَا رَبِّ أَنْتَ نَصِيْرِيْ فَلَقِّنِيْ كُلَّ خَيْرِ ۞ وَاجْعَلْ جِنَانَكَ مَصِيْرِيْ وَاخْتِمْ بِالْإِيْمَانِ الْآجَالْ",
              "latin": "Ya Robbi anta nashiri, falaqqini kulla khoiri, waj'al jinanaka mashiri, wakhtim bil imanil ajal",
              "translation": "Wahai Tuhanku, Engkaulah penolongku, maka berikanlah kepadaku segala kebaikan; jadikanlah surga-Mu tempat kembaliku, dan akhirilah ajal kami dalam keadaan beriman.",
              "english": "O my Lord, You are my helper, so inspire me with every good; make Your Paradise my final destination, and seal our lifetimes with faith."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u21",
              "arab": "وَصَلِّ فِيْ كُلِّ حَالَةْ عَلَى مُزِيْلِ الضَّلَالَةْ ۞ مَنْ كَلَّمَتْهُ الْغَزَالَةْ مُحَمَّدِ الْهَادِي الدَّالْ",
              "latin": "Wa sholli fi kulli halah, 'ala muziliz dholalah, man kallamathul ghozalah, Muhammadil hadid dal",
              "translation": "Dan limpahkanlah shalawat dalam setiap keadaan kepada penghapus kesesatan, yang pernah diajak bicara oleh seekor kijang, yaitu Muhammad sang pembawa petunjuk dan penunjuk jalan.",
              "english": "And send blessings in every circumstance upon the remover of misguidance, the one to whom the gazelle spoke — Muhammad, the guide who shows the way."
            },
            {
              "id": "ya-rabbi-ya-alimal-hal-u22",
              "arab": "وَالْحَمْدُ لِلَّهِ شُكْرًا عَلَى نِعَمٍ مِنْهُ تَتْرَى ۞ نَحْمَدُهُ سِرًّا وَجَهْرًا وَبِالْغُدُوِّ وَالْآصَالْ",
              "latin": "Wal hamdu lillahi syukro, 'ala ni'amin minhu tatra, nahmaduhu sirron wa jahro, wa bil ghuduwwi wal ashol",
              "translation": "Dan segala puji bagi Allah sebagai wujud syukur atas nikmat-nikmat dari-Nya yang terus berdatangan; kami memuji-Nya secara tersembunyi dan terang-terangan, di pagi hari dan di petang hari.",
              "english": "And all praise belongs to Allah in gratitude for His blessings that come in unending succession; we praise Him in secret and in public, in the mornings and in the evenings."
            }
          ]
        }
      ]
    }
  }
];
