// PAYLOAD SEMENTARA — impor batch 3 qasidah (6 judul) sebagai DRAFT.
// Sumber teks: wakidyusuf.wordpress.com (dipilih Juple dari
// files/list-konten-wakidyusuf.md), masing-masing sudah di-cross-check
// kelengkapan bait ke sumber kedua; Arab direkonstruksi bersih, Latin
// disusun ulang, Artinya dari blog dengan pembersihan/koreksi
// terdokumentasi (beberapa judul blog hanya memuat Arab — lapis
// Latin/terjemahan disusun dari makna Arab, tercatat di dokumen
// review), English baru. Dokumen review: qasidah-batch3/*.md di
// workspace goal. Dihapus bersama route import-qasidah-batch3
// setelah eksekusi terverifikasi.
import type { ArticleBlocks } from "./db-types.ts";

export interface Batch3Article {
  meta: { title: string; slug: string; type: "SHALAWAT" | "MAULID"; description: string };
  expectedUnits: number;
  blocks: ArticleBlocks;
}

export const BATCH3_ARTICLES: Batch3Article[] = [
  {
    "meta": {
      "title": "Miftahul Jannah",
      "slug": "miftahul-jannah",
      "type": "SHALAWAT",
      "description": "Qasidah Miftahul Jannah adalah sholawat yang dipopulerkan Habib Syech bin Abdul Qodir Assegaf, dibuka dengan kalimat tauhid sebagai kunci surga lalu dilanjutkan bait-bait Qasidah Burdah karya Imam al-Bushiri tentang kemuliaan nasab Nabi Muhammad ﷺ. Teks Arab, Latin, terjemahan Indonesia, dan English. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 5,
    "blocks": {
      "sections": [
        {
          "id": "miftahul-jannah-s1",
          "title": "Miftahul Jannah",
          "units": [
            {
              "id": "miftahul-jannah-u1",
              "arab": "مِفْتَاحُ الْجَنَّةِ لَا إِلَهَ إِلَّا اللهُ ۞ لَا إِلَهَ إِلَّا اللهُ مُحَمَّدٌ رَسُولُ اللهِ",
              "latin": "Miftahul jannah la ilaha illallah, la ilaha illallah Muhammadur rasulullah",
              "translation": "Kunci surga adalah (kalimat) tiada tuhan selain Allah, tiada tuhan selain Allah, Muhammad adalah utusan Allah",
              "english": "The key to Paradise is 'there is no god but Allah'; there is no god but Allah, Muhammad is the Messenger of Allah"
            },
            {
              "id": "miftahul-jannah-u2",
              "arab": "نَسَبٌ تَحْسِبُ الْعُلَا بِحُلَاهُ ۞ قَلَّدَتْهَا نُجُومَهَا الْجَوْزَاءُ",
              "latin": "Nasabun tahsibul 'ula bihulahu, qalladat-ha nujumahal jauza'u",
              "translation": "(Beliau memiliki) nasab (keturunan) yang ketinggian derajatnya diperhitungkan karena kemuliaan perhiasannya, bintang Jauza (Gemini) telah mengalungkan bintang-bintangnya pada nasab itu",
              "english": "A lineage whose loftiness is reckoned by its noble ornaments; the stars of Gemini have strung their stars upon it as a necklace"
            },
            {
              "id": "miftahul-jannah-u3",
              "arab": "حَبَّذَا عِقْدُ سُؤْدَدٍ وَفَخَارٍ ۞ أَنْتَ فِيهِ الْيَتِيمَةُ الْعَصْمَاءُ",
              "latin": "Habbadza 'iqdu su'dadin wa fakharin, anta fihil yatimatul 'ashma'u",
              "translation": "Alangkah indahnya untaian (kalung) kemuliaan dan kebanggaan itu, engkau di dalamnya adalah permata tunggal yang terjaga (paling berharga)",
              "english": "How beautiful is that necklace of glory and pride, in which you are the unique, well-guarded pearl"
            },
            {
              "id": "miftahul-jannah-u4",
              "arab": "حَفِظَ الْإِلَهُ كَرَامَةً لِمُحَمَّدٍ ۞ آبَاءَهُ الْأَمْجَادَ صَوْنًا لِاسْمِهِ",
              "latin": "Hafizhal ilahu karamatan li Muhammadin, aba-ahul amjada shaunan lismihi",
              "translation": "Allah menjaga, sebagai kehormatan bagi Muhammad, ayah-ayah leluhurnya yang mulia, demi menjaga namanya",
              "english": "Allah preserved, as an honour for Muhammad, his noble forefathers, safeguarding his name"
            },
            {
              "id": "miftahul-jannah-u5",
              "arab": "تَرَكُوا السِّفَاحَ فَلَمْ يُصِبْهُمْ عَارُهُ ۞ مِنْ آدَمٍ وَإِلَى أَبِيهِ وَأُمِّهِ",
              "latin": "Tarakus-sifaha falam yushibhum 'aruhu, min Adama wa ila abihi wa ummihi",
              "translation": "Mereka meninggalkan perzinaan (sifah), sehingga aibnya tidak pernah menimpa mereka, sejak (Nabi) Adam hingga ayah dan ibu beliau",
              "english": "They shunned illicit union, so its disgrace never touched them, from Adam down to his father and his mother"
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Yaa Hadi Sir Ruwaidan",
      "slug": "yaa-hadi-sir-ruwaidan",
      "type": "SHALAWAT",
      "description": "Qasidah Yaa Hadi Sir Ruwaidan adalah qasidah kerinduan kepada Nabi Muhammad ﷺ yang dilantunkan bak seruan kepada pengemudi kafilah unta menuju Madinah — populer dibawakan Habib Syech bin Abdul Qodir Assegaf — berisi ratapan hati yang terbawa pergi bersama rombongan, permohonan agar kafilah singgah di Thaibah, hingga harapan syafaat atas dosa. Teks Arab, Latin, terjemahan Indonesia, dan English. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 11,
    "blocks": {
      "sections": [
        {
          "id": "yaa-hadi-sir-ruwaidan-s1",
          "title": "Yaa Hadi Sir Ruwaidan",
          "units": [
            {
              "id": "yaa-hadi-sir-ruwaidan-u1",
              "arab": "يَا حَادِي سِرْ رُوَيْدًا ۞ وَانْشُدْ أَمَامَ الرَّكْبِ",
              "latin": "Ya hadi sir ruwaidan, wansyud amamar-rokbi",
              "translation": "Wahai pemandu rombongan, berjalanlah perlahan, bernyanyilah di hadapan rombongan",
              "english": "O driver of the caravan, proceed gently and slowly, and sing before the caravan"
            },
            {
              "id": "yaa-hadi-sir-ruwaidan-u2",
              "arab": "فِي الرَّكْبِ لِي عُرَيْبٌ ۞ أَخَذُوا مَعَهُمْ قَلْبِي",
              "latin": "Fir-rokbi li 'uroibun, akhodzu ma'ahum qolbi",
              "translation": "Di dalam rombongan ada orang yang kucintai, mereka telah membawa pergi hatiku bersamanya",
              "english": "Within the caravan is the one I love; they have taken my heart away with them"
            },
            {
              "id": "yaa-hadi-sir-ruwaidan-u3",
              "arab": "مَنْ لِي إِذَا أَخَذُوا لِي قَلْبِي",
              "latin": "Man li idza akhodzu li qolbi",
              "translation": "Siapakah yang tersisa untukku, jika mereka telah membawa pergi hatiku?",
              "english": "Who will remain for me, if they have taken my heart away?"
            },
            {
              "id": "yaa-hadi-sir-ruwaidan-u4",
              "arab": "شَتَّتُونِي فِي الْبَوَادِي ۞ أَخَذُوا مِنِّي فُؤَادِي",
              "latin": "Syattatuni fil bawadi, akhodzu minni fuadi",
              "translation": "Mereka mencerai-beraikan aku di padang-padang, mereka mengambil jantung hatiku dariku",
              "english": "They left me scattered in the deserts; they took my innermost heart from me"
            },
            {
              "id": "yaa-hadi-sir-ruwaidan-u5",
              "arab": "فَانْحُ يَا حُوَيْدَ الْعِيسِ ۞ وَانْزِلْ طَيْبَةَ بِالتَّقْدِيسِ",
              "latin": "Fanhu ya huwaidal 'isi, wanzil Thoybata bit-taqdis",
              "translation": "Maka belokkanlah (rombongan unta itu), wahai pengemudi unta, dan singgahlah di Thaibah (Madinah) yang suci",
              "english": "So turn aside, O camel-driver, and alight at Taybah (Madinah) the sanctified"
            },
            {
              "id": "yaa-hadi-sir-ruwaidan-u6",
              "arab": "تُحْظَى الْمُنَى بِنَيْلِ الْقُرْبِ",
              "latin": "Tuhzhol muna binailil qurbi",
              "translation": "Niscaya engkau memperoleh apa yang dicita-citakan, dengan meraih kedekatan (kepada Nabi ﷺ)",
              "english": "Then you shall attain your heart's desire, by gaining nearness (to the Prophet ﷺ)"
            },
            {
              "id": "yaa-hadi-sir-ruwaidan-u7",
              "arab": "رِفْقًا رِفْقًا بِي يَا حَادِي ۞ رِفْقًا رِفْقًا بِفُؤَادِي",
              "latin": "Rifqon rifqon bi ya hadi, rifqon rifqon bifuadi",
              "translation": "Lembutlah, lembutlah kepadaku, wahai pemandu, lembutlah, lembutlah kepada hatiku",
              "english": "Be gentle, be gentle with me, O driver; be gentle, be gentle with my heart"
            },
            {
              "id": "yaa-hadi-sir-ruwaidan-u8",
              "arab": "وَتَأَدَّبْ فِي حِمَاهُمْ ۞ لَا وَلَا تَعْشَقْ سِوَاهُمْ",
              "latin": "Wa ta'addab fi himahum, la wa la ta'syaq siwahum",
              "translation": "Dan bersopan santunlah di kawasan mereka, dan janganlah engkau mencintai selain mereka",
              "english": "And conduct yourself courteously within their precincts, and love none besides them"
            },
            {
              "id": "yaa-hadi-sir-ruwaidan-u9",
              "arab": "فَهُمْ نِعْمَ الشِّفَاءِ لِقَلْبِي",
              "latin": "Fahumu ni'masy-syifa liqolbi",
              "translation": "Merekalah sebaik-baik obat penawar bagi hatiku",
              "english": "For they are the finest cure for my heart"
            },
            {
              "id": "yaa-hadi-sir-ruwaidan-u10",
              "arab": "يَا إِلٰهِي يَا مُجِيبُ ۞ فَبِطَيْبَةَ لِي حَبِيبُ",
              "latin": "Ya ilahi ya mujibu, fabi Thoybata li habibu",
              "translation": "Wahai Tuhanku, wahai Dzat yang Maha Mengabulkan doa, di Thaibah (Madinah) ada kekasihku",
              "english": "O my God, O Answerer of prayers, in Taybah (Madinah) is my beloved"
            },
            {
              "id": "yaa-hadi-sir-ruwaidan-u11",
              "arab": "أَرْجُو يَشْفَعُ لِي مِنْ ذَنْبِي",
              "latin": "Arju yasyfa'u li min dzanbi",
              "translation": "Aku berharap ia memberi syafaat bagiku atas dosa-dosaku",
              "english": "I hope that he will intercede for me on account of my sins"
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Yaa Sayyidassadat",
      "slug": "yaa-sayyidassadat",
      "type": "SHALAWAT",
      "description": "Qasidah Yaa Sayyidassadat adalah qasidah tawassul yang dinisbatkan kepada Imam Abu Hanifah: pujian panjang kepada Nabi Muhammad ﷺ — dari kerinduan penyair, tawassul para nabi terdahulu, dan mukjizat-mukjizat beliau — yang ditutup permohonan syafaat di hari kiamat, dalam 53 bait resensi lengkap. Teks Arab, Latin, terjemahan Indonesia, dan English. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 53,
    "blocks": {
      "sections": [
        {
          "id": "yaa-sayyidassadat-s1",
          "title": "Yaa Sayyidassadat",
          "units": [
            {
              "id": "yaa-sayyidassadat-u1",
              "arab": "يَا سَيِّدَ السَّادَاتِ جِئْتُكَ قَاصِدًا ۞ أَرْجُو رِضَاكَ وَأَحْتَمِي بِحِمَاكَا",
              "latin": "Ya sayyidas-sadati ji'tuka qashidan, arju ridhaka wa ahtami bihimaka",
              "translation": "Wahai penghulu para penghulu, aku datang kepadamu dengan penuh tujuan; aku mengharapkan ridhamu dan berlindung di bawah perlindunganmu",
              "english": "O master of masters, I have come to you with purpose; I hope for your pleasure and seek shelter in your protection"
            },
            {
              "id": "yaa-sayyidassadat-u2",
              "arab": "وَاللهِ يَا خَيْرَ الْخَلَائِقِ إِنَّ لِي ۞ قَلْبًا مَشُوقًا لَا يَرُومُ سِوَاكَا",
              "latin": "Wallahi ya khairal khala'iqi inna li, qalban masyuqan la yarumu siwaka",
              "translation": "Demi Allah, wahai sebaik-baik makhluk, sesungguhnya aku memiliki hati yang penuh kerinduan, yang tidak menginginkan selain dirimu",
              "english": "By Allah, O best of creatures, I have a heart filled with longing that desires none but you"
            },
            {
              "id": "yaa-sayyidassadat-u3",
              "arab": "وَبِحَقِّ جَاهِكَ إِنَّنِي بِكَ مُغْرَمٌ ۞ وَاللهُ يَعْلَمُ أَنَّنِي أَهْوَاكَا",
              "latin": "Wa bihaqqi jahika innani bika mughramun, wallahu ya'lamu annani ahwaka",
              "translation": "Dan demi hak kedudukanmu (di sisi Allah), sesungguhnya aku jatuh cinta kepadamu, dan Allah mengetahui bahwa aku mencintaimu",
              "english": "And by the right of your rank, I am truly in love with you, and Allah knows that I adore you"
            },
            {
              "id": "yaa-sayyidassadat-u4",
              "arab": "أَنْتَ الَّذِي لَوْلَاكَ مَا خُلِقَ امْرُؤٌ ۞ كَلَّا وَلَا خُلِقَ الْوَرَى لَوْلَاكَا",
              "latin": "Antalladzi laulaka ma khuliqam-ru'un, kalla wa la khuliqal wara laulaka",
              "translation": "Engkaulah yang jika bukan karenamu tidak akan diciptakan seorang pun — sekali-kali tidak, dan tidak pula seluruh makhluk diciptakan jika bukan karenamu",
              "english": "You are the one for whom, were it not for you, no person would have been created — no indeed, nor would all creation have been created, were it not for you"
            },
            {
              "id": "yaa-sayyidassadat-u5",
              "arab": "أَنْتَ الَّذِي مِنْ نُورِكَ الْبَدْرُ اكْتَسَى ۞ وَالشَّمْسُ مُشْرِقَةٌ بِنُورِ بَهَاكَا",
              "latin": "Antalladzi min nurikal badru-ktasa, wasy-syamsu musyriqatun binuri bahaka",
              "translation": "Engkaulah yang dari cahayamu bulan purnama memperoleh cahayanya, dan matahari bersinar terang karena cahaya keindahanmu",
              "english": "You are the one from whose light the full moon is clothed, and the sun shines radiant with the light of your splendor"
            },
            {
              "id": "yaa-sayyidassadat-u6",
              "arab": "أَنْتَ الَّذِي لَمَّا رُفِعْتَ إِلَى السَّمَا ۞ بِكَ قَدْ سَمَتْ وَتَزَيَّنَتْ لِسُرَاكَا",
              "latin": "Antalladzi lamma rufi'ta ilas-sama, bika qad samat wa tazayyanat lisuraka",
              "translation": "Engkaulah yang ketika engkau diangkat ke langit, langit itu menjadi tinggi dan berhias karenamu, untuk (menyambut) perjalanan malammu",
              "english": "You are the one who, when you were raised to the heaven, it rose high and adorned itself because of you, for your night journey"
            },
            {
              "id": "yaa-sayyidassadat-u7",
              "arab": "أَنْتَ الَّذِي نَادَاكَ رَبُّكَ مَرْحَبًا ۞ وَلَقَدْ دَعَاكَ لِقُرْبِهِ وَحَبَاكَا",
              "latin": "Antalladzi nadaka rabbuka marhaban, wa laqad da'aka liqurbihi wa habaka",
              "translation": "Engkaulah yang Tuhanmu memanggilmu dengan sambutan selamat datang, dan sungguh Dia memanggilmu ke dekat-Nya dan menganugerahimu",
              "english": "You are the one whom your Lord called with a welcome, and He truly summoned you to His nearness and bestowed favors upon you"
            },
            {
              "id": "yaa-sayyidassadat-u8",
              "arab": "أَنْتَ الَّذِي فِينَا سَأَلْتَ شَفَاعَةً ۞ نَادَاكَ رَبُّكَ لَمْ تَكُنْ لِسِوَاكَا",
              "latin": "Antalladzi fina sa'alta syafa'atan, nadaka rabbuka lam takun lisiwaka",
              "translation": "Engkaulah yang di tengah kami memohonkan syafaat (bagi umatmu); Tuhanmu memanggilmu — (syafaat) itu tidaklah untuk selain dirimu",
              "english": "You are the one who, among us, asked for intercession; your Lord called you — it was not for anyone but you"
            },
            {
              "id": "yaa-sayyidassadat-u9",
              "arab": "أَنْتَ الَّذِي لَمَّا تَوَسَّلَ آدَمُ مِنْ زَلَّةٍ ۞ بِكَ فَازَ وَهْوَ أَبَاكَا",
              "latin": "Antalladzi lamma tawassala Adamu min zallatin, bika faza wa huwa abaka",
              "translation": "Engkaulah yang ketika Adam bertawassul denganmu dari ketergelincirannya (kesalahannya), ia berhasil (diampuni) karenamu, padahal ia adalah ayahmu (leluhurmu)",
              "english": "You are the one through whom, when Adam sought intercession for his slip, he triumphed — though he is your forefather"
            },
            {
              "id": "yaa-sayyidassadat-u10",
              "arab": "وَبِكَ الْخَلِيلُ دَعَا فَعَادَتْ نَارُهُ ۞ بَرْدًا وَقَدْ خَمَدَتْ بِنُورِ سَنَاكَا",
              "latin": "Wa bikal khalilu da'a fa'adat naruhu, bardan wa qad khamadat binuri sanaka",
              "translation": "Dan denganmu Al-Khalil (Nabi Ibrahim) berdoa, maka apinya kembali menjadi dingin, dan sungguh api itu padam karena cahaya kemuliaanmu",
              "english": "And through you the Friend (Abraham) prayed, so his fire turned cool, and it was extinguished by the light of your radiance"
            },
            {
              "id": "yaa-sayyidassadat-u11",
              "arab": "وَدَعَاكَ أَيُّوبُ لِضُرٍّ مَسَّهُ ۞ فَأُزِيلَ عَنْهُ الضُّرُّ حِينَ دَعَاكَا",
              "latin": "Wa da'aka Ayyubu lidhurrin massahu, fa'uzila 'anhudh-dhurru hina da'aka",
              "translation": "Dan Ayyub memanggilmu karena derita yang menimpanya, maka lenyaplah derita itu darinya ketika ia memanggilmu",
              "english": "And Job called upon you for the affliction that had touched him, and the affliction was removed from him when he called you"
            },
            {
              "id": "yaa-sayyidassadat-u12",
              "arab": "وَبِكَ الْمَسِيحُ أَتَى بَشِيرًا مُخْبِرًا ۞ بِصِفَاتِ حُسْنِكَ مَادِحًا لِعُلَاكَا",
              "latin": "Wa bikal Masihu ata basyiran mukhbiran, bishifati husnika madihan li'ulaka",
              "translation": "Dan denganmu Al-Masih (Nabi Isa) datang sebagai pembawa kabar gembira, mengabarkan sifat-sifat kebaikanmu seraya memuji ketinggianmu",
              "english": "And through you the Messiah came as a bearer of glad tidings, announcing the qualities of your beauty and praising your eminence"
            },
            {
              "id": "yaa-sayyidassadat-u13",
              "arab": "وَكَذَاكَ مُوسَى لَمْ يَزَلْ مُتَوَسِّلًا ۞ بِكَ فِي الْقِيَامَةِ مُحْتَمٍ بِحِمَاكَا",
              "latin": "Wa kadzaka Musa lam yazal mutawassilan, bika fil qiyamati muhtamin bihimaka",
              "translation": "Dan demikian pula Musa senantiasa bertawassul denganmu, (dan) pada hari kiamat berlindung di bawah perlindunganmu",
              "english": "And likewise Moses never ceased seeking intercession through you, sheltering in your protection on the Day of Resurrection"
            },
            {
              "id": "yaa-sayyidassadat-u14",
              "arab": "وَالْأَنْبِيَاءُ وَكُلُّ خَلْقٍ فِي الْوَرَى ۞ وَالرُّسُلُ وَالْأَمْلَاكُ تَحْتَ لِوَاكَا",
              "latin": "Wal anbiya'u wa kullu khalqin fil wara, warrusulu wal amlaku tahta liwaka",
              "translation": "Dan para nabi serta seluruh makhluk di antara manusia, para rasul dan para malaikat, (semuanya berada) di bawah panjimu",
              "english": "And the prophets and every creature among mankind, the messengers and the angels, are all beneath your banner"
            },
            {
              "id": "yaa-sayyidassadat-u15",
              "arab": "لَكَ مُعْجِزَاتٌ أَعْجَزَتْ كُلَّ الْوَرَى ۞ وَفَضَائِلٌ جَلَّتْ فَلَيْسَ تُحَاكَى",
              "latin": "Laka mu'jizatun a'jazat kullal wara, wa fadha'ilun jallat falaysa tuhaka",
              "translation": "Engkau memiliki mukjizat-mukjizat yang membuat seluruh makhluk tak mampu (menandinginya), dan keutamaan-keutamaan yang begitu agung sehingga tidak dapat ditandingi",
              "english": "Yours are miracles that left all creatures powerless to match them, and virtues so exalted they cannot be rivaled"
            },
            {
              "id": "yaa-sayyidassadat-u16",
              "arab": "نَطَقَ الذِّرَاعُ بِسُمِّهِ لَكَ مُعْلِنًا ۞ وَالضَّبُّ قَدْ لَبَّاكَ حِينَ أَتَاكَا",
              "latin": "Nathaqadz-dzira'u bisimmihi laka mu'linan, wadh-dhabbu qad labbaka hina ataka",
              "translation": "Potongan lengan (kambing) yang beracun berbicara kepadamu memberitahukan racunnya, dan biawak padang (dhab) sungguh telah menyambutmu ketika ia datang kepadamu",
              "english": "The poisoned foreleg spoke to you, declaring its poison, and the desert lizard truly answered you when it came to you"
            },
            {
              "id": "yaa-sayyidassadat-u17",
              "arab": "وَالذِّئْبُ جَاءَكَ وَالْغَزَالَةُ قَدْ أَتَتْ ۞ بِكَ تَسْتَجِيرُ وَتَحْتَمِي بِحِمَاكَا",
              "latin": "Wadz-dzi'bu ja'aka wal ghazalatu qad atat, bika tastajiru wa tahtami bihimaka",
              "translation": "Dan serigala datang kepadamu, dan kijang pun telah datang, memohon perlindungan kepadamu dan berlindung di bawah perlindunganmu",
              "english": "And the wolf came to you, and the gazelle came, seeking your protection and sheltering under your guardianship"
            },
            {
              "id": "yaa-sayyidassadat-u18",
              "arab": "وَكَذَا الْوُحُوشُ أَتَتْ إِلَيْكَ وَسَلَّمَتْ ۞ وَشَكَا الْبَعِيرُ إِلَيْكَ حِينَ رَآكَا",
              "latin": "Wa kadzal wuhusyu atat ilaika wa sallamat, wa syakal ba'iru ilaika hina ra'aka",
              "translation": "Dan demikian pula binatang-binatang buas datang kepadamu dan memberi salam, dan unta mengadu kepadamu ketika ia melihatmu",
              "english": "And likewise the wild beasts came to you and greeted you, and the camel complained to you when it saw you"
            },
            {
              "id": "yaa-sayyidassadat-u19",
              "arab": "وَدَعَوْتَ أَشْجَارًا أَتَتْكَ مُطِيعَةً ۞ وَسَعَتْ إِلَيْكَ مُجِيبَةً لِنِدَاكَا",
              "latin": "Wa da'awta asyjaran atatka muthi'atan, wa sa'at ilaika mujibatan linidaka",
              "translation": "Dan engkau memanggil pepohonan, mereka datang kepadamu dengan patuh, dan bergegas mendatangimu menyambut panggilanmu",
              "english": "And you called the trees, and they came to you obediently, hastening toward you in answer to your call"
            },
            {
              "id": "yaa-sayyidassadat-u20",
              "arab": "وَالْمَاءُ فَاضَ بِرَاحَتَيْكَ وَسَبَّحَتْ ۞ صُمُّ الْحَصَى بِالْفَضْلِ فِي يُمْنَاكَا",
              "latin": "Wal ma'u fadha birahataika wa sabbahat, shummul hasha bil fadhli fi yumnaka",
              "translation": "Dan air memancar dari kedua telapak tanganmu, dan kerikil-kerikil yang keras bertasbih, karena keutamaan (Allah), di tangan kananmu",
              "english": "And water gushed from your two palms, and the hard pebbles glorified (Allah), by grace, in your right hand"
            },
            {
              "id": "yaa-sayyidassadat-u21",
              "arab": "وَعَلَيْكَ ظَلَّلَتِ الْغَمَامَةُ فِي الْوَرَى ۞ وَالْجِذْعُ حَنَّ إِلَى كَرِيمِ لِقَاكَا",
              "latin": "Wa 'alaika zhallalatil ghamamatu fil wara, wal jidz'u hanna ila karimi liqaka",
              "translation": "Dan awan menaungimu di tengah manusia, dan batang pohon (kurma) merintih rindu kepada perjumpaanmu yang mulia",
              "english": "And the cloud shaded you among the people, and the palm trunk yearned longingly for your noble presence"
            },
            {
              "id": "yaa-sayyidassadat-u22",
              "arab": "وَكَذَاكَ لَا أَثَرَ لِمَشْيِكَ فِي الثَّرَى ۞ وَالصَّخْرُ قَدْ غَاصَتْ بِهِ قَدَمَاكَا",
              "latin": "Wa kadzaka la atsara limasyyika fits-tsara, wash-shakhru qad ghashat bihi qadamaka",
              "translation": "Dan demikian pula tidak ada bekas langkahmu di atas tanah (yang lembut), sedangkan batu yang keras justru terbenam (membekas) oleh kedua telapak kakimu",
              "english": "And likewise your steps left no trace on the soft earth, yet the hard rock sank beneath your feet"
            },
            {
              "id": "yaa-sayyidassadat-u23",
              "arab": "وَشَفَيْتَ ذَا الْعَاهَاتِ مِنْ أَمْرَاضِهِ ۞ وَمَلَأْتَ كُلَّ الْأَرْضِ مِنْ جَدْوَاكَا",
              "latin": "Wa syafaita dzal 'ahati min amradhihi, wa mala'ta kullal ardhi min jadwaka",
              "translation": "Dan engkau menyembuhkan orang yang berpenyakit dari penyakit-penyakitnya, dan engkau memenuhi seluruh bumi dengan pemberianmu",
              "english": "And you healed the afflicted of their diseases, and you filled the whole earth with your bounty"
            },
            {
              "id": "yaa-sayyidassadat-u24",
              "arab": "وَرَدَدْتَ عَيْنَ قَتَادَةَ بَعْدَ الْعَمَى ۞ وَابْنَ الْحُصَيْنِ شَفَيْتَهُ بِشِفَاكَا",
              "latin": "Wa radadta 'aina Qatadata ba'dal 'ama, wabnal Hushaini syafaitahu bisyifaka",
              "translation": "Dan engkau mengembalikan mata Qatadah setelah (mengalami) kebutaan, dan putra Al-Hushain engkau sembuhkan dengan kesembuhan darimu",
              "english": "And you restored Qatada's eye after blindness, and the son of al-Husayn you healed with your healing"
            },
            {
              "id": "yaa-sayyidassadat-u25",
              "arab": "وَكَذَا حَبِيبٌ وَابْنُ عَفْرَاءَ بَعْدَمَا ۞ جُرِحَا شَفَيْتَهُمَا بِلَمْسِ يَدَاكَا",
              "latin": "Wa kadza Habibun wabnu 'Afra'a ba'dama, juriha syafaitahuma bilamsi yadaka",
              "translation": "Dan demikian pula Habib dan putra 'Afra', setelah keduanya terluka, engkau sembuhkan keduanya dengan sentuhan kedua tanganmu",
              "english": "And likewise Habib and the son of 'Afra — after both were wounded, you healed them with the touch of your hands"
            },
            {
              "id": "yaa-sayyidassadat-u26",
              "arab": "وَعَلِيٌّ مِنْ رَمَدٍ بِهِ دَاوَيْتَهُ ۞ فِي خَيْبَرَ فَشُفِيَ بِطِيبِ لَمَاكَا",
              "latin": "Wa 'Aliyyun min ramadin bihi dawaitahu, fi Khaibara fasyufiya bithibi lamaka",
              "translation": "Dan Ali, dari sakit mata yang dideritanya, engkau obati dia di Khaibar, maka ia sembuh dengan kebaikan (usapan)mu",
              "english": "And Ali, suffering from sore eyes, you treated him at Khaybar, and he was healed by the goodness of your touch"
            },
            {
              "id": "yaa-sayyidassadat-u27",
              "arab": "وَسَأَلْتَ رَبَّكَ فِي ابْنِ جَابِرٍ بَعْدَمَا ۞ أَنْ مَاتَ أَحْيَاهُ وَقَدْ أَرْضَاكَا",
              "latin": "Wa sa'alta rabbaka fibni Jabirin ba'dama, an mata ahyahu wa qad ardhaka",
              "translation": "Dan engkau memohon kepada Tuhanmu untuk putra Jabir setelah ia wafat; Allah menghidupkannya kembali, dan sungguh Dia telah mengabulkan (permohonan)mu",
              "english": "And you asked your Lord for Jabir's son after he had died; He revived him, and He had indeed granted your wish"
            },
            {
              "id": "yaa-sayyidassadat-u28",
              "arab": "وَمَسَسْتَ شَاةً لِأُمِّ مَعْبَدٍ بَعْدَمَا ۞ نَشِفَتْ فَدَرَّتْ مِنْ شِفَا رُقْيَاكَا",
              "latin": "Wa masasta syaatan li Ummi Ma'badin ba'dama, nasyifat fa darrat min syifa ruqyaka",
              "translation": "Dan engkau menyentuh kambing milik Ummu Ma'bad setelah kambing itu kering (susunya), maka mengalirlah (susunya) berkat kesembuhan dari (sentuhan) ruqyahmu",
              "english": "And you touched Umm Ma'bad's ewe after it had gone dry, and it flowed (with milk) through the healing of your touch"
            },
            {
              "id": "yaa-sayyidassadat-u29",
              "arab": "وَدَعَوْتَ عَامَ الْقَحْطِ رَبَّكَ مُعْلِنًا ۞ فَانْهَالَ قَطْرُ السُّحْبِ حِينَ دَعَاكَا",
              "latin": "Wa da'awta 'amal qahthi rabbaka mu'linan, fanhala qathrus-suhbi hina da'aka",
              "translation": "Dan engkau berdoa kepada Tuhanmu pada tahun kekeringan dengan terang-terangan, maka tercurah deraslah tetes hujan dari awan ketika Dia memanggilmu (mengabulkan doamu)",
              "english": "And you prayed openly to your Lord in the year of drought, and the rain of the clouds poured down when He called you"
            },
            {
              "id": "yaa-sayyidassadat-u30",
              "arab": "وَدَعَوْتَ كُلَّ الْخَلْقِ فَانْقَادُوا إِلَى ۞ دَعْوَاكَ طَوْعًا سَامِعِينَ نِدَاكَا",
              "latin": "Wa da'awta kullal khalqi fanqadu ila, da'waka thaw'an sami'ina nidaka",
              "translation": "Dan engkau menyeru seluruh makhluk, maka mereka tunduk menuju seruanmu dengan sukarela, mendengarkan panggilanmu",
              "english": "And you called all creatures, and they submitted to your call willingly, listening to your summons"
            },
            {
              "id": "yaa-sayyidassadat-u31",
              "arab": "وَخَفَضْتَ دِينَ الْكُفْرِ يَا عَلَمَ الْهُدَى ۞ وَرَفَعْتَ دِينَكَ فَاسْتَقَامَ هُنَاكَا",
              "latin": "Wa khafadhta dinal kufri ya 'alamal huda, wa rafa'ta dinaka fastaqama hunaka",
              "translation": "Dan engkau merendahkan agama kekafiran, wahai panji petunjuk, dan engkau meninggikan agamamu sehingga ia tegak lurus di sana",
              "english": "And you lowered the religion of unbelief, O banner of guidance, and you raised your religion high until it stood upright there"
            },
            {
              "id": "yaa-sayyidassadat-u32",
              "arab": "أَعْدَاكَ عَادُوا فِي الْقَلِيبِ بِجَمْعِهِمْ ۞ صَرْعَى وَقَدْ حُرِمُوا الرِّضَا بِجَفَاكَا",
              "latin": "A'da'uka 'adu fil qalibi bijam'ihim, shar'a wa qad harumur-ridha bijafaka",
              "translation": "Musuh-musuhmu kembali (terjerembab) ke dalam sumur Qalib (di Badr) dengan seluruh kumpulan mereka dalam keadaan terkapar (tewas), dan sungguh mereka terhalang dari ridha (Allah) karena sikap menjauh (keras) mereka terhadapmu",
              "english": "Your enemies fell back into the well of al-Qalib (at Badr), all of them together, slain, and they were deprived of (divine) pleasure because of their harsh aversion to you"
            },
            {
              "id": "yaa-sayyidassadat-u33",
              "arab": "فِي يَوْمِ بَدْرٍ قَدْ أَتَتْكَ مَلَائِكٌ ۞ مِنْ عِنْدِ رَبِّكَ قَاتَلَتْ أَعْدَاكَا",
              "latin": "Fi yaumi Badrin qad atatka mala'ikun, min 'indi rabbika qatalat a'da'aka",
              "translation": "Pada hari (perang) Badr, sungguh para malaikat datang kepadamu dari sisi Tuhanmu; mereka ikut berperang melawan musuh-musuhmu",
              "english": "On the day of Badr, angels truly came to you from your Lord; they fought your enemies"
            },
            {
              "id": "yaa-sayyidassadat-u34",
              "arab": "وَالْفَتْحُ جَاءَكَ يَوْمَ فَتْحِكَ مَكَّةَ ۞ وَالنَّصْرُ فِي الْأَحْزَابِ قَدْ وَافَاكَا",
              "latin": "Wal fathu ja'aka yauma fathika Makkata, wannashru fil ahzabi qad wafaka",
              "translation": "Dan kemenangan datang kepadamu pada hari penaklukanmu atas Makkah, dan pertolongan pada (perang) Ahzab sungguh telah datang menyertaimu",
              "english": "And victory came to you on the day of your conquest of Makkah, and help in the Battle of the Confederates truly reached you"
            },
            {
              "id": "yaa-sayyidassadat-u35",
              "arab": "هُودٌ وَيُونُسُ مِنْ بَهَاكَ تَجَمَّلَا ۞ وَجَمَالُ يُوسُفَ مِنْ ضِيَاءِ سَنَاكَا",
              "latin": "Hudun wa Yunusu min bahaka tajammala, wa jamalu Yusufa min dhiya'i sanaka",
              "translation": "Hud dan Yunus memperoleh keindahan dari keindahan (cahaya)mu, dan keindahan Yusuf (berasal) dari cahaya kemuliaanmu",
              "english": "Hud and Jonah were beautified by your splendor, and Joseph's beauty came from the light of your radiance"
            },
            {
              "id": "yaa-sayyidassadat-u36",
              "arab": "قَدْ فُقْتَ يَا طٰهَ جَمِيعَ الْأَنْبِيَاءِ ۞ طُرًّا فَسُبْحَانَ الَّذِي أَسْرَاكَا",
              "latin": "Qad fuqta ya Thaha jami'al anbiya'i, thurran fasubhanalladzi asraka",
              "translation": "Sungguh engkau, wahai Thaha, telah melampaui seluruh para nabi semuanya; maka Mahasuci Allah yang telah memperjalankanmu di malam hari (Isra)",
              "english": "You have truly surpassed, O Thaha, all the prophets entirely — so glory be to Him who took you on the night journey"
            },
            {
              "id": "yaa-sayyidassadat-u37",
              "arab": "وَاللهِ يَا يَاسِينُ مِثْلُكَ لَمْ يَكُنْ ۞ فِي الْعَالَمِينَ وَحَقِّ مَنْ نَبَّاكَا",
              "latin": "Wallahi ya Yasinu mitsluka lam yakun, fil 'alamina wa haqqi man nabbaka",
              "translation": "Demi Allah, wahai Yasin, tidak ada yang sepertimu di seluruh alam — demi hak Dzat yang telah mengangkatmu menjadi nabi",
              "english": "By Allah, O Yasin, there has never been one like you in all the worlds — by the right of Him who made you a prophet"
            },
            {
              "id": "yaa-sayyidassadat-u38",
              "arab": "عَنْ وَصْفِكَ الشُّعَرَاءُ يَا مُدَّثِّرُ ۞ عَجِزُوا وَكَلُّوا عَنْ صِفَاتِ عُلَاكَا",
              "latin": "'An washfikasy-syu'ara'u ya Muddatsiru, 'ajizu wa kallu 'an shifati 'ulaka",
              "translation": "Para penyair, wahai Al-Muddatsir (yang berselimut), tak mampu menggambarkan dirimu, dan mereka kelelahan untuk menyifati ketinggianmu",
              "english": "The poets, O Muddaththir (the enwrapped one), are unable to describe you, and they weary of describing your exalted qualities"
            },
            {
              "id": "yaa-sayyidassadat-u39",
              "arab": "إِنْجِيلُ عِيسَى قَدْ أَتَى بِكَ مُخْبِرًا ۞ وَلَنَا الْكِتَابُ أَتَى بِمَدْحِ حُلَاكَا",
              "latin": "Injilu 'Isa qad ata bika mukhbiran, wa lanal kitabu ata bimadhi hulaka",
              "translation": "Injil Isa telah datang mengabarkan tentang dirimu, dan bagi kami Al-Kitab (Al-Qur'an) datang dengan pujian atas keindahan (perhiasan)mu",
              "english": "The Gospel of Jesus came announcing you, and to us the Book came praising your adornment"
            },
            {
              "id": "yaa-sayyidassadat-u40",
              "arab": "مَاذَا يَقُولُ الْمَادِحُونَ وَمَا عَسَى ۞ أَنْ تَجْمَعَ الْكُتَّابُ مِنْ مَعْنَاكَا",
              "latin": "Madza yaqulul madihuna wa ma 'asa, an tajma'al kuttaba min ma'naka",
              "translation": "Apa yang akan dikatakan para pemuji, dan apa gerangan yang dapat dihimpun para penulis dari makna (keagungan)mu?",
              "english": "What can the praisers say, and what could writers ever gather of your meaning?"
            },
            {
              "id": "yaa-sayyidassadat-u41",
              "arab": "وَاللهِ لَوْ أَنَّ الْبِحَارَ مِدَادُهُمْ ۞ وَالْعُشْبَ أَقْلَامٌ جُعِلْنَ لِذَاكَا",
              "latin": "Wallahi law annal bihara midaduhum, wal 'usba aqlamun ju'ilna lidzaka",
              "translation": "Demi Allah, seandainya lautan menjadi tinta mereka, dan ilalang dijadikan pena untuk (menuliskan pujian) itu (niscaya tidak akan cukup)",
              "english": "By Allah, if the seas were their ink and the reeds were made into pens for that task (it would never suffice)"
            },
            {
              "id": "yaa-sayyidassadat-u42",
              "arab": "لَمْ تَقْدِرِ الثَّقَلَانِ تَجْمَعْ نَزْرَهُ ۞ أَبَدًا وَمَا اسْتَطَاعُوا لَهُ إِدْرَاكَا",
              "latin": "Lam taqdirits-tsaqalani tajma' nazrahu, abadan wa mastatha'u lahu idraka",
              "translation": "Niscaya jin dan manusia (ats-tsaqalan) tidak akan mampu menghimpun sedikit pun darinya (makna keagunganmu) selama-lamanya, dan mereka tidak akan sanggup memahaminya",
              "english": "The two weighty races (jinn and mankind) could never gather even a little of it, nor could they ever comprehend it"
            },
            {
              "id": "yaa-sayyidassadat-u43",
              "arab": "بِكَ لِي فُؤَادٌ مُغْرَمٌ يَا سَيِّدِي ۞ وَحَشَاشَةٌ مَحْشُوَّةٌ بِهَوَاكَا",
              "latin": "Bika li fu'adun mughramun ya sayyidi, wa hasyasyatun mahsyuwwatun bihawaka",
              "translation": "Bagiku, karenamu, ada hati yang jatuh cinta, wahai tuanku, dan lubuk hati yang dipenuhi oleh cintamu",
              "english": "Mine is a heart in love with you, O my master, and an innermost soul filled with love for you"
            },
            {
              "id": "yaa-sayyidassadat-u44",
              "arab": "فَإِذَا سَكَتُّ فَفِيكَ صَمْتِي كُلُّهُ ۞ وَإِذَا نَطَقْتُ فَمَادِحًا عُلْيَاكَا",
              "latin": "Fa'idza sakattu fafika shamti kulluhu, wa idza nathaqtu famadihan 'ulyaka",
              "translation": "Maka jika aku diam, seluruh diamku adalah tentangmu; dan jika aku berbicara, (bicaraku) adalah memuji ketinggianmu",
              "english": "So when I am silent, all my silence is about you; and when I speak, I am praising your eminence"
            },
            {
              "id": "yaa-sayyidassadat-u45",
              "arab": "وَإِذَا سَمِعْتُ فَعَنْكَ قَوْلًا طَيِّبًا ۞ وَإِذَا نَظَرْتُ فَمَا أَرَى إِلَّاكَا",
              "latin": "Wa idza sami'tu fa'anka qawlan thayyiban, wa idza nazhartu fama ara illaka",
              "translation": "Dan jika aku mendengar, (yang kudengar) adalah perkataan yang baik tentangmu; dan jika aku memandang, aku tidak melihat selain dirimu",
              "english": "And when I hear, it is good words about you; and when I look, I see none but you"
            },
            {
              "id": "yaa-sayyidassadat-u46",
              "arab": "يَا مَالِكِي كُنْ شَافِعِي فِي فَاقَتِي ۞ إِنِّي فَقِيرٌ فِي الْوَرَى لِغِنَاكَا",
              "latin": "Ya maliki kun syafi'i fi faqati, inni faqirun fil wara lighinaka",
              "translation": "Wahai pemilikku (tuanku), jadilah pemberi syafaat bagiku dalam kefakiranku; sesungguhnya aku adalah orang fakir di antara manusia yang membutuhkan kekayaan (kemurahan)mu",
              "english": "O my master, be my intercessor in my poverty; I am a pauper among men in need of your riches"
            },
            {
              "id": "yaa-sayyidassadat-u47",
              "arab": "يَا أَكْرَمَ الثَّقَلَيْنِ يَا كَنْزَ الْغِنَى ۞ جُدْ لِي بِجُودِكَ وَارْضَنِي بِرِضَاكَا",
              "latin": "Ya akramats-tsaqalaini ya kanzal ghina, jud li bijudika wardhini biridhaka",
              "translation": "Wahai yang termulia di antara jin dan manusia, wahai perbendaharaan kekayaan, bermurah hatilah kepadaku dengan kedermawananmu dan ridhailah aku dengan ridhamu",
              "english": "O noblest of jinn and mankind, O treasury of riches, be generous to me with your bounty and grant me your pleasure"
            },
            {
              "id": "yaa-sayyidassadat-u48",
              "arab": "أَنَا طَامِعٌ بِالْجُودِ مِنْكَ وَلَمْ يَكُنْ ۞ لِأَبِي حَنِيفَةَ فِي الْأَنَامِ سِوَاكَا",
              "latin": "Ana thami'un bil judi minka wa lam yakun, li Abi Hanifata fil anami siwaka",
              "translation": "Aku sangat mengharapkan kedermawanan darimu, dan bagi Abu Hanifah tidak ada (tempat bergantung) di antara manusia selain dirimu",
              "english": "I eagerly hope for your generosity, and Abu Hanifah has no one among mankind but you"
            },
            {
              "id": "yaa-sayyidassadat-u49",
              "arab": "فَعَسَاكَ تَشْفَعُ فِيهِ عِنْدَ حِسَابِهِ ۞ فَلَقَدْ غَدَا مُتَمَسِّكًا بِعُرَاكَا",
              "latin": "Fa'asaka tasyfa'u fihi 'inda hisabihi, falaqad ghada mutamassikan bi'uraka",
              "translation": "Maka semoga engkau memberi syafaat baginya (Abu Hanifah) pada hari perhitungannya, karena sungguh ia telah berpegang teguh pada tali peganganmu",
              "english": "So may you intercede for him at his reckoning, for he has held firmly to your handhold"
            },
            {
              "id": "yaa-sayyidassadat-u50",
              "arab": "فَلَأَنْتَ أَكْرَمُ شَافِعٍ وَمُشَفَّعٍ ۞ وَمَنِ الْتَجَا بِحِمَاكَ نَالَ رِضَاكَا",
              "latin": "Fala'anta akramu syafi'in wa musyaffa'in, wa maniltaja bihimaka nala ridhaka",
              "translation": "Maka sungguh engkau adalah pemberi syafaat yang termulia dan yang diterima syafaatnya; dan siapa yang berlindung di bawah perlindunganmu akan memperoleh ridhamu",
              "english": "For you are truly the noblest intercessor whose intercession is accepted; and whoever seeks refuge in your protection attains your pleasure"
            },
            {
              "id": "yaa-sayyidassadat-u51",
              "arab": "فَاجْعَلْ قِرَايَ شَفَاعَةً لِي فِي غَدٍ ۞ فَعَسَى أَرَى فِي الْحَشْرِ تَحْتَ لِوَاكَا",
              "latin": "Faj'al qiraya syafa'atan li fi ghadin, fa'asa ara fil hasyri tahta liwaka",
              "translation": "Maka jadikanlah jamuan (bekal)ku adalah syafaat bagiku di hari esok (kiamat); semoga aku berada di padang mahsyar di bawah panjimu",
              "english": "So make my provision your intercession for me tomorrow, that I may be at the gathering beneath your banner"
            },
            {
              "id": "yaa-sayyidassadat-u52",
              "arab": "صَلَّى عَلَيْكَ اللهُ يَا عَلَمَ الْهُدَى ۞ مَا حَنَّ مُشْتَاقٌ إِلَى مَثْوَاكَا",
              "latin": "Shallallahu 'alaika ya 'alamal huda, ma hanna musytaqun ila matswaka",
              "translation": "Semoga Allah melimpahkan shalawat kepadamu, wahai panji petunjuk, selama masih ada orang yang merindu (pulang) ke tempatmu",
              "english": "May Allah bless you, O banner of guidance, as long as a longing heart yearns toward your resting place"
            },
            {
              "id": "yaa-sayyidassadat-u53",
              "arab": "وَعَلَى صَحَابَتِكَ الْكِرَامِ جَمِيعِهِمْ ۞ وَالتَّابِعِينَ وَكُلِّ مَنْ وَالَاكَا",
              "latin": "Wa 'ala shahabatikal kirami jami'ihim, wattabi'ina wa kulla man walaka",
              "translation": "Dan (semoga shalawat itu juga) atas seluruh sahabatmu yang mulia, para tabi'in, dan setiap orang yang mencintai dan mengikutimu",
              "english": "And (may blessings be) upon all your noble Companions, the Followers, and everyone who loves and follows you"
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Yaa 'Izzana",
      "slug": "yaa-izzana",
      "type": "SHALAWAT",
      "description": "Qasidah Yaa 'Izzana adalah pujian kepada Nabi Muhammad ﷺ yang mengisahkan merpati dan laba-laba di gua, awan yang melindungi beliau, kerinduan batang kurma, hingga peristiwa Mi'raj di Sidratul Muntaha, dengan refrain 'Yaa izzana wallahi bi Thoha' — wahai kemuliaan kami, demi Allah, berkat Thoha. Teks Arab, Latin, terjemahan Indonesia, dan English. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 12,
    "blocks": {
      "sections": [
        {
          "id": "yaa-izzana-s1",
          "title": "Yaa 'Izzana",
          "units": [
            {
              "id": "yaa-izzana-u1",
              "arab": "حَيَّتْهُ يَوْمَ الْغَارِ حَمَامَةٌ ۞ وَالْعَنْكَبُوْتُ تِلْكَ عَلَامَةٌ",
              "latin": "Hayyat-hu yaumal ghori hamamah, wal 'ankabutu tilka 'alamah",
              "translation": "Seekor merpati menyambutnya pada hari (peristiwa) gua itu, dan laba-laba — itu adalah tanda (perlindungan Allah).",
              "english": "A dove greeted him on the day of the Cave, and the spider — that was a sign (of Allah's protection)."
            },
            {
              "id": "yaa-izzana-u2",
              "arab": "وَوَقَتْهُ يَوْمَ الْحَرِّ غَمَامَةٌ ۞ يَا عِزَّنَا وَاللهِ بِطٰهَ",
              "latin": "Wa waqot-hu yaumal harri ghomamah, ya 'izzana wallahi bi Thoha",
              "translation": "Dan awan melindunginya pada hari yang panas; wahai kemuliaan kami, demi Allah, berkat Thoha (Nabi Muhammad ﷺ).",
              "english": "And a cloud protected him on the scorching day; O our glory, by Allah, through Thoha (the Prophet Muhammad)."
            },
            {
              "id": "yaa-izzana-u3",
              "arab": "فَهُوَ الَّذِيْ نَشْتَاقُ إِلَيْهِ ۞ وَالْجِذْعُ أَنَّ وَحَنَّ إِلَيْهِ",
              "latin": "Fa huwalladzi nasytaqu ilaihi, wal jidz'u anna wa hanna ilaihi",
              "translation": "Dialah yang kami rindukan, dan batang pohon (kurma) pun merintih dan merindu kepadanya.",
              "english": "He is the one we long for, and the palm trunk moaned and yearned for him too."
            },
            {
              "id": "yaa-izzana-u4",
              "arab": "وَعَطَاؤُنَا مِنْ فَيْضِ يَدَيْهِ",
              "latin": "Wa 'atha-una min faidli yadaihi",
              "translation": "Dan pemberian kami berasal dari limpahan kedua tangannya.",
              "english": "And our gifts come from the outpouring of his two hands."
            },
            {
              "id": "yaa-izzana-u5",
              "arab": "وَهُوَ الَّذِيْ قَدْ عَمَّ نَدَاهُ ۞ سُبْحَانَ مَنْ بِالنُّوْرِ حَبَاهُ",
              "latin": "Wa huwalladzi qod 'amma nadahu, subhana man binnuri habahu",
              "translation": "Dialah yang seruannya telah menyebar merata; Mahasuci (Allah) yang telah menganugerahinya dengan cahaya.",
              "english": "He is the one whose call has spread everywhere — glory be to Him who endowed him with light."
            },
            {
              "id": "yaa-izzana-u6",
              "arab": "فَلَعَلَّنَا بِالْعَيْنِ نَرَاهُ",
              "latin": "Fa la'allana bil 'aini narohu",
              "translation": "Semoga kami dapat melihatnya dengan mata kepala kami sendiri.",
              "english": "May we come to see him with our own eyes."
            },
            {
              "id": "yaa-izzana-u7",
              "arab": "وَهُوَ الَّذِيْ مِنْ فَوْقِ سَمَاهَا ۞ قَدْ خَاطَبَ الرَّحْمٰنَ شَفَاهَا",
              "latin": "Wa huwalladzi min fauqi samaha, qod khothobar-Rohmana syafaha",
              "translation": "Dialah yang dari atas langitnya, Ar-Rahman telah berbicara kepadanya secara langsung.",
              "english": "He is the one who, from above its heaven, was spoken to directly by the Most Merciful."
            },
            {
              "id": "yaa-izzana-u8",
              "arab": "إِذْ يَغْشَى السِّدْرَةَ مَا يَغْشَاهَا",
              "latin": "Idz yaghsyas-sidrata ma yaghsyaha",
              "translation": "Ketika Sidratul Muntaha diselimuti oleh apa yang menyelimutinya.",
              "english": "When the Lote Tree was enveloped by what enveloped it."
            },
            {
              "id": "yaa-izzana-u9",
              "arab": "نُوْرُ الْهُدَى يٰسٓ وَطٰهَ ۞ أَزْكَى الْوَرَى لِلْخَالِقِ جَاهًا",
              "latin": "Nurul huda Yasin wa Thoha, azkal waro lil-kholiqi jaha",
              "translation": "Beliau adalah cahaya petunjuk, Yasin dan Thoha, makhluk yang paling suci dan tertinggi kedudukannya di sisi Sang Pencipta.",
              "english": "The light of guidance, Yasin and Thoha, the purest of mankind, the highest in rank before the Creator."
            },
            {
              "id": "yaa-izzana-u10",
              "arab": "صَلُّوْا عَلَى مَنْ عَبَدَ اللهَ",
              "latin": "Shollu 'ala man 'abadallah",
              "translation": "Bershalawatlah atas beliau, orang yang menyembah Allah.",
              "english": "Send blessings upon him, the one who worshipped Allah."
            },
            {
              "id": "yaa-izzana-u11",
              "arab": "مُوْسَى بِهِ قَدْ سَمِعَ الصَّوْتَ ۞ عِيْسَى بِهِ قَدْ أَحْيَا الْمَوْتَى",
              "latin": "Musa bihi qod sami'ash-shouta, 'Isa bihi qod ahyal mauta",
              "translation": "Musa karenanya telah mendengar suara (Allah), dan 'Isa karenanya telah menghidupkan orang-orang yang telah mati.",
              "english": "Moses, through him, heard the Voice, and Jesus, through him, raised the dead to life."
            },
            {
              "id": "yaa-izzana-u12",
              "arab": "يَا عَاشِقًا لِلْهَادِيْ سَمَوْتَ",
              "latin": "Ya 'asyiqon lil-Hadi samauta",
              "translation": "Wahai pecinta Sang Pemberi Petunjuk, engkau telah ditinggikan (derajatmu).",
              "english": "O lover of the Guide, you have been raised high."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Ahlan Wa Sahlan Binnabi",
      "slug": "ahlan-wa-sahlan-binnabi",
      "type": "SHALAWAT",
      "description": "Qasidah Ahlan Wa Sahlan Binnabi adalah shalawat penyambutan dan pujian kepada Nabi Muhammad ﷺ — sebaik-baik manusia dari bangsa Arab, bernasab Hasyim dan Muththalib, yang sifat-sifatnya termaktub dalam kitab-kitab — yang ditutup doa agar shalawat senantiasa tercurah atas beliau, keluarga, dan sahabatnya; populer dibawakan Habib Syech bin Abdul Qodir Assegaf. Teks Arab, Latin, terjemahan Indonesia, dan English. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 8,
    "blocks": {
      "sections": [
        {
          "id": "ahlan-wa-sahlan-binnabi-s1",
          "title": "Ahlan Wa Sahlan Binnabi",
          "units": [
            {
              "arab": "أَهْلًا وَسَهْلًا بِالنَّبِيِّ ۞ أَهْلًا وَسَهْلًا بِالنَّبِيِّ",
              "english": "Welcome, O Prophet; welcome, O Prophet",
              "id": "ahlan-wa-sahlan-binnabi-u1",
              "latin": "Ahlan wa sahlan binnabi, ahlan wa sahlan binnabi",
              "translation": "Selamat datang, wahai Nabi; selamat datang, wahai Nabi"
            },
            {
              "arab": "أَهْلًا وَسَهْلًا بِالنَّبِيِّ ۞ خَيْرِ الْأَنَامِ الْعَرَبِيِّ",
              "english": "Welcome, O Prophet, the best of mankind, the Arab",
              "id": "ahlan-wa-sahlan-binnabi-u2",
              "latin": "Ahlan wa sahlan binnabi, khairil anamil 'arabi",
              "translation": "Selamat datang, wahai Nabi, sebaik-baik manusia dari bangsa Arab"
            },
            {
              "arab": "صَلُّوا عَلَىٰ هَٰذَا النَّبِيِّ ۞ الْهَاشِمِيِّ الْمُطَّلِبِيِّ",
              "english": "Send blessings upon this Prophet, of Hashimite and Muttalibite descent",
              "id": "ahlan-wa-sahlan-binnabi-u3",
              "latin": "Shallu 'ala hadzan-nabi, al-hasyimil muththalibi",
              "translation": "Bershalawatlah kepada Nabi ini, yang bernasab Hasyim dan Muththalib"
            },
            {
              "arab": "أَحْمَدُ زَكِيُّ النَّسَبِ ۞ مَنْ وَصْفُهُ فِي الْكُتُبِ",
              "english": "Ahmad, pure of lineage, whose description is found in the scriptures",
              "id": "ahlan-wa-sahlan-binnabi-u4",
              "latin": "Ahmad zakiyyin-nasabi, man washfuhu fil kutubi",
              "translation": "Ahmad yang suci nasabnya, yang sifat-sifatnya terdapat di dalam kitab-kitab (suci)"
            },
            {
              "arab": "مَنْ لَمْ يَزُرْ هَٰذَا النَّبِيَّ ۞ مِنْ مَشْرِقٍ أَوْ مَغْرِبٍ",
              "english": "Whoever does not visit this Prophet, from the east or the west",
              "id": "ahlan-wa-sahlan-binnabi-u5",
              "latin": "Man lam yazur hadzan-nabi, min masyriqin au maghribi",
              "translation": "Barang siapa tidak menziarahi Nabi ini, dari timur maupun barat"
            },
            {
              "arab": "تَبًّا لَهُ مِنْ مُذْنِبٍ ۞ مُعَرَّضٍ لِلْغَضَبِ",
              "english": "Woe to him, a sinner exposed to (Allah's) wrath",
              "id": "ahlan-wa-sahlan-binnabi-u6",
              "latin": "Tabban lahu min mudznibin, mu'arradhin lil-ghadhabi",
              "translation": "Celakalah dia, seorang pendosa yang menghadapkan dirinya pada murka (Allah)"
            },
            {
              "arab": "يَا رَبِّ إِكْرَامًا لِمَنْ ۞ جَعَلْتَهُ مُكَرَّمًا",
              "english": "O my Lord, in honour of the one whom You have made noble",
              "id": "ahlan-wa-sahlan-binnabi-u7",
              "latin": "Ya Rabbi ikraman liman, ja'altahu mukarraman",
              "translation": "Ya Tuhanku, demi memuliakan orang yang telah Engkau jadikan mulia"
            },
            {
              "arab": "صَلِّ عَلَيْهِ دَائِمًا ۞ وَآلِهِ وَالصَّحْبِ",
              "english": "Send blessings upon him always, and upon his family and companions",
              "id": "ahlan-wa-sahlan-binnabi-u8",
              "latin": "Shalli 'alaihi da'iman, wa alihi wash-shahbi",
              "translation": "Limpahkanlah shalawat atasnya senantiasa, juga atas keluarga dan sahabatnya"
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Dauuni Dauuni",
      "slug": "dauuni-dauuni",
      "type": "SHALAWAT",
      "description": "Qasidah Dauuni Dauuni adalah qasidah kerinduan seorang pecinta kepada Nabi Muhammad ﷺ: ia minta dibiarkan bermunajat kepada kekasihnya tanpa celaan, mabuk oleh arak cinta dan rindu, hingga hatinya mengembara menuju Madinah. Teks Arab, Latin, terjemahan Indonesia, dan English. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 7,
    "blocks": {
      "sections": [
        {
          "id": "dauuni-dauuni-s1",
          "title": "Dauuni Dauuni",
          "units": [
            {
              "id": "dauuni-dauuni-u1",
              "arab": "دَعُونِي دَعُونِي أُنَاجِي حَبِيبِي ۞ وَلَا تَعْذُلُونِي فَعَذْلِي حَرَامْ",
              "latin": "Da'uuni da'uuni unaaji habiibi, wa laa ta'dzuluunii fa'adzlii haroom",
              "translation": "Biarkan aku, biarkan aku bermunajat kepada kekasihku; janganlah kalian mencelaku, karena mencelaku itu haram",
              "english": "Leave me, leave me to commune intimately with my beloved; do not blame me, for blaming me is forbidden"
            },
            {
              "id": "dauuni-dauuni-u2",
              "arab": "تَعَلَّمْ بُكَايَ وَنُحْ يَا حَمَامْ ۞ وَخُذْ عَنْ شُجُونِي دُرُوسَ الْغَرَامْ",
              "latin": "Ta'allam bukaaya wa nuh yaa hamaam, wa khudz 'an syujuunii duruusal gharoom",
              "translation": "Pelajarilah tangisku dan merataplah, wahai merpati; ambillah dari kesedihanku pelajaran tentang cinta yang mendalam",
              "english": "Learn from my weeping and lament, O dove; take from my sorrows lessons of passionate love"
            },
            {
              "id": "dauuni-dauuni-u3",
              "arab": "تَعَلَّمْ بُكَايَ وَنُحْ يَا حَمَامْ ۞ سَكَرْتُ بِخَمْرِ الْهَوَى وَالْغَرَامْ",
              "latin": "Ta'allam bukaaya wa nuh yaa hamaam, sakartu bikhomril hawaa wal gharoom",
              "translation": "Pelajarilah tangisku dan merataplah, wahai merpati; aku mabuk oleh arak cinta dan kerinduan",
              "english": "Learn from my weeping and lament, O dove; I am intoxicated by the wine of love and longing"
            },
            {
              "id": "dauuni-dauuni-u4",
              "arab": "وَمَنْ كَانَ مِثْلِي مُعَنًّى مُضَنًّى ۞ بِحُبِّ النَّبِيِّ لِمَاذَا يُلَامْ",
              "latin": "Wa man kaana mitslii mu'annaa mudhonnaa, bihubbin-nabiyyi limaadzaa yulaam",
              "translation": "Dan siapa pun yang seperti aku — lelah dan letih karena cinta — karena mencintai Nabi, mengapa ia dicela?",
              "english": "And whoever is like me, worn out and exhausted by love, for loving the Prophet, why should he be blamed?"
            },
            {
              "id": "dauuni-dauuni-u5",
              "arab": "لَامُونِي لَامُونِي بِحُبِّكْ رَمُونِي ۞ يَا قُرَّةَ عُيُونِي عَلَيْكَ السَّلَامْ",
              "latin": "Laamuunii laamuunii bihubbik romuunii, yaa qurrota 'uyuunii 'alaikas-salaam",
              "translation": "Mereka mencelaku, mereka mencelaku; karena mencintaimu mereka melempariku dengan celaan; wahai penyejuk mataku, salam sejahtera atasmu",
              "english": "They blamed me, they blamed me; for loving you they pelted me with blame; O comfort of my eyes, peace be upon you"
            },
            {
              "id": "dauuni-dauuni-u6",
              "arab": "فُؤَادِي لِنَحْوِ الْمَدِينَةِ هَامْ ۞ وَقَلْبِي تَوَلَّعْ بِخَيْرِ الْأَنَامْ",
              "latin": "Fu'aadii linahwil madiinati haam, wa qalbii tawalla' bikhoiril anaam",
              "translation": "Hatiku mengembara penuh rindu menuju Madinah; dan hatiku diliputi cinta kepada sebaik-baik manusia",
              "english": "My heart has wandered in longing toward Madinah, and my heart is consumed with love for the best of mankind"
            },
            {
              "id": "dauuni-dauuni-u7",
              "arab": "أَنَا يَا ابْنَ رَامَةْ حُرِمْتُ الْمَنَامْ ۞ وَزَادَنِي سِقَامًا غَرَامُكْ تُسَامْ",
              "latin": "Anaa yaa ibna Roomah hurimtul manaam, wa zaadanii siqooman gharoomuk tusaam",
              "translation": "Aku, wahai Ibnu Ramah, terhalang dari tidur; dan kerinduan kepadamu menambah penyakitku",
              "english": "I, O Ibn Ramah, have been deprived of sleep, and longing for you has increased my sickness"
            }
          ]
        }
      ]
    }
  }
];
