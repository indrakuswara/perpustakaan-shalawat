// PAYLOAD SEMENTARA — impor batch 7 qasidah (6 judul) sebagai DRAFT.
// Sumber teks: wakidyusuf.wordpress.com (dipilih Juple dari
// files/list-konten-wakidyusuf.md), masing-masing sudah di-cross-check
// kelengkapan bait ke sumber kedua; Arab direkonstruksi bersih, Latin
// disusun ulang, Artinya dari blog dengan pembersihan/koreksi
// terdokumentasi, English baru. Catatan: "Ya Karim" adalah kisah
// prosa (bukan nazham) — status kesahihan kisahnya diperingatkan di
// dokumen review; keputusan terbit sepenuhnya di tangan Juple.
// Dokumen review: qasidah-batch7/*.md di workspace goal. Dihapus
// bersama route import-qasidah-batch7 setelah eksekusi terverifikasi.
import type { ArticleBlocks } from "./db-types.ts";

export interface Batch7Article {
  meta: { title: string; slug: string; type: "SHALAWAT" | "MAULID"; description: string };
  expectedUnits: number;
  blocks: ArticleBlocks;
}

export const BATCH7_ARTICLES: Batch7Article[] = [
  {
    "meta": {
      "title": "Tholama Asyku Ghoromi",
      "slug": "tholama-asyku-ghoromi",
      "type": "SHALAWAT",
      "description": "Qasidah Tholama Asyku Ghoromi adalah ungkapan kerinduan mendalam kepada Nabi Muhammad ﷺ sebagai cahaya alam semesta, berisi harapan untuk dapat memandang beliau dan melihat Babussalam. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 7,
    "blocks": {
      "sections": [
        {
          "id": "tholama-asyku-ghoromi-s1",
          "title": "Tholama Asyku Ghoromi",
          "units": [
            {
              "id": "tholama-asyku-ghoromi-u1",
              "arab": "طَالَمَا أَشْكُوْ غَرَامِيْ يَا نُوْرَ الْوُجُوْدِ ۞ وَأُنَادِيْ يَا تِهَامِيْ يَا مَعْدِنَ الْجُوْدِ",
              "latin": "Tholama asyku ghoromi ya nurol wujud, wa unadi ya tihami ya ma'danal jud",
              "translation": "Sudah lama aku menanggung rindu, wahai cahaya alam yang indah, dan aku menyeru, wahai Nabiku, wahai sumber kedermawanan.",
              "english": "Long have I poured out my longing, O light of existence, and I call out: O Tihami, O source of generosity."
            },
            {
              "id": "tholama-asyku-ghoromi-u2",
              "arab": "مُنْيَتِيْ أَقْصَى مَرَامِيْ أَحْظَى بِالشُّهُوْدِ ۞ وَأَرَى بَابَ السَّلَامِ يَا زَاكِيَ الْجُدُوْدِ",
              "latin": "Munyati aqsho maromi ahzho bisysyuhud, wa aro babas-salami ya zakiyal judud",
              "translation": "Impianku setinggi cita-cita, semoga diberikan kesempatan melihatmu, dan dapat melihat Babussalam, wahai sesuci-sucinya insan.",
              "english": "My dearest wish, my utmost aim, is to be granted the witnessing, and to see the Gate of Peace, O you whose lineage is the purest."
            },
            {
              "id": "tholama-asyku-ghoromi-u3",
              "arab": "يَا طِرَازَ الْكَوْنِ إِنِّيْ عَاشِقٌ مُسْتَهَامْ ۞ مُغْرَمٌ وَالْمَدْحُ فَنِّيْ يَا بَدْرَ التَّمَامْ",
              "latin": "Ya thirozal kauni inni 'asyiq mustaham, mughromun wal madhu fanni ya badrot-tamam",
              "translation": "Wahai hiasan dunia ini, sungguh aku sangat cinta dan rindu padamu. Aku dilanda cinta, dan hanya pujian menjadi persembahanku, wahai rembulan yang sempurna.",
              "english": "O ornament of the universe, I am a lover overwhelmed by longing; I am love-stricken, and praise is my offering, O perfect full moon."
            },
            {
              "id": "tholama-asyku-ghoromi-u4",
              "arab": "اِصْرِفِ الْإِعْرَاضَ عَنِّيْ أَضْنَانِيَ الْغَرَامْ ۞ فِيْكَ قَدْ أَحْسَنْتُ ظَنِّيْ يَا سَامِيَ الْعُهُوْدِ",
              "latin": "Ishrifil i'rodho 'anni adhnaniyal ghorom, fika qod ahsantu zhonni ya samiyal 'uhud",
              "translation": "Jauhkanlah sikap berpaling dariku, kerinduan telah melemahkanku. Padamu aku bersangka baik, wahai yang luhur janjinya.",
              "english": "Turn all turning-away from me — longing has worn me thin. In you I have placed my best hopes, O you whose covenant is exalted."
            },
            {
              "id": "tholama-asyku-ghoromi-u5",
              "arab": "يَا سِرَاجَ الْأَنْبِيَاءِ يَا عَالِيَ الْجَنَابْ ۞ يَا إِمَامَ الْأَتْقِيَاءِ إِنَّ قَلْبِيْ ذَابْ",
              "latin": "Ya sirojal anbiya-i ya 'aliyal janab, ya imamal atqiya-i inna qolbi dzab",
              "translation": "Wahai pelita para nabi, wahai yang memiliki kedudukan tertinggi. Wahai imam orang-orang bertakwa, sungguh hatiku luluh.",
              "english": "O lamp of the prophets, O you of lofty station; O leader of the God-conscious, my heart has truly melted."
            },
            {
              "id": "tholama-asyku-ghoromi-u6",
              "arab": "وَعَلَيْكَ اللهُ صَلَّى رَبِّيْ ذُو الْجَلَالْ ۞ يَكْفِيْ يَا نُوْرَ الْأَهِلَّةِ إِنَّ هَجْرِيْ طَالْ",
              "latin": "Wa 'alaikallahu sholla robbi dzul jalal, yakfi ya nurol ahillah inna hajri thol",
              "translation": "Dan kepadamu semoga Allah mencurahkan rahmat-Nya, Tuhanku yang memiliki keagungan. Cukuplah, wahai cahaya rembulan, sungguh perpisahan denganmu sudah terlalu lama.",
              "english": "May Allah bless you — my Lord, Possessor of Majesty. Enough, O light of the crescent moons, for my separation has lasted too long."
            },
            {
              "id": "tholama-asyku-ghoromi-u7",
              "arab": "سَيِّدِيْ وَالْعُمْرُ وَلَّى جُدْ بِالْوَصْلِ جُوْدْ",
              "latin": "Sayyidi wal 'umru walla jud bil washli jud",
              "translation": "Wahai junjunganku, umur telah berlalu; anugerahkanlah pertemuan denganku dengan penuh kedermawanan.",
              "english": "My master, life has passed by — grant me union with you, and grant it generously."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Wulidal Musyarrof",
      "slug": "wulidal-musyarrof",
      "type": "SHALAWAT",
      "description": "Qasidah Wulidal Musyarrof adalah shalawat tentang kelahiran Nabi Muhammad ﷺ pada bulan Rabiulawal, kesaksian Aminah atas keindahan beliau, dan mukjizat air asin yang menjadi seperti madu, populer dalam tradisi Langitan. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 5,
    "blocks": {
      "sections": [
        {
          "id": "wulidal-musyarrof-s1",
          "title": "Wulidal Musyarrof",
          "units": [
            {
              "arab": "وُلِدَ الْمُشَرَّفُ فِيْ رَبِيْعِ الْأَوَّلِ ۞ وَالْقَلْبُ يَخْفِقُ وَالْكَوَاكِبُ تَنْجَلِيْ",
              "english": "The honoured Prophet was born in the month of Rabi' al-Awwal, while hearts fluttered and the stars shone forth clearly.",
              "id": "wulidal-musyarrof-u1",
              "latin": "Wulidal musyarrof fi robi'il awwali, wal qolbu yakhfaq wal kawakib tanjali",
              "translation": "Telah dilahirkan Nabi yang dimuliakan pada bulan Rabiulawal, dan hati bergetar serta bintang-bintang tampak bersinar jelas."
            },
            {
              "arab": "يَا نَفْسُ نِلْتِ الْمُنَى فَاسْتَبْشِرِيْ وَتَلَا ۞ هَذَا الْحَبِيْبُ وَهَذَا خَاتَمُ الرُّسُلِ",
              "english": "O soul, you have attained what you longed for — so rejoice and recite: “This is the Beloved, and this is the Seal of the Messengers.”",
              "id": "wulidal-musyarrof-u2",
              "latin": "Ya nafsu niltil muna fastabsyiri wa tala, hadzal habib wa hadza khotamur rusuli",
              "translation": "Wahai jiwa, engkau telah memperoleh apa yang engkau cita-citakan, maka bergembiralah dan bacakanlah: “Inilah Sang Kekasih, dan inilah penutup para rasul.”"
            },
            {
              "arab": "وَتَقُوْلُ آمِنَةُ رَأَيْتُ جَمَالَهُ ۞ كَالْبَدْرِ فِيْ لَيْلَةٍ يَلُوْحُ وَيَنْجَلِيْ",
              "english": "And Aminah said: “I saw his beauty — like the full moon on a night, appearing bright and clear.”",
              "id": "wulidal-musyarrof-u3",
              "latin": "Wa taqulu Aminatu ro-aitu jamalahu, kal badri fi lailatin yaluhu wa yanjali",
              "translation": "Dan Aminah berkata: “Aku melihat keindahannya, bagaikan bulan purnama pada suatu malam, tampak terang dan jelas.”"
            },
            {
              "arab": "هَذَا الَّذِيْ جَاءَ لِلْأَبْحَارِ مَالِحَةً ۞ فَمَجَّ فِيْهِ فَصَارَ الْمَاءُ كَالْعَسَلِ",
              "english": "This is the one who came to the salty sea, spat into it, and the water became like honey.",
              "id": "wulidal-musyarrof-u4",
              "latin": "Hadzalladzi ja-a lil abhari malihah, famajja fihi fashorol ma-u kal 'asali",
              "translation": "Inilah (Nabi) yang datang ke laut yang asin, lalu beliau meludah ke dalamnya, maka air itu menjadi bagaikan madu."
            },
            {
              "arab": "صَلَّى عَلَيْهِ اللهُ رَبُّنَا دَائِمًا ۞ مَا لَاحَتِ الْأَطْيَارُ فِيْ صَوْتٍ عَالِ",
              "english": "May Allah, our Lord, bless him always, for as long as the birds are seen and heard singing loudly.",
              "id": "wulidal-musyarrof-u5",
              "latin": "Sholla 'alaihillahu robbuna da-iman, ma lahatil athyaru fi shoutin 'ali",
              "translation": "Semoga Allah, Tuhan kami, senantiasa bershalawat kepadanya, selama burung-burung masih tampak bersuara nyaring."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Ya Ahla Baiti Rosulillah",
      "slug": "ya-ahla-baiti-rosulillah",
      "type": "SHALAWAT",
      "description": "Qasidah Ya Ahla Baiti Rosulillah adalah dua bait syair masyhur yang dinisbatkan kepada Imam asy-Syafi'i, berisi penegasan bahwa mencintai Ahlul Bait Rasulullah ﷺ adalah kewajiban dari Allah yang diturunkan dalam Al-Qur'an. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 2,
    "blocks": {
      "sections": [
        {
          "id": "ya-ahla-baiti-rosulillah-s1",
          "title": "Ya Ahla Baiti Rosulillah",
          "units": [
            {
              "arab": "يَا أَهْلَ بَيْتِ رَسُوْلِ اللهِ حُبُّكُمْ ۞ فَرْضٌ مِنَ اللهِ فِي الْقُرْآنِ أَنْزَلَهُ",
              "english": "O People of the House of the Messenger of Allah, love for you is an obligation from Allah, revealed in the Qur'an.",
              "id": "ya-ahla-baiti-rosulillah-u1",
              "latin": "Ya ahla baiti Rosulillahi hubbukum, fardhun minallahi fil Qur'ani anzalahu",
              "translation": "Wahai Ahlul Bait Rasulullah, mencintai kalian adalah kewajiban sebagaimana yang diturunkan Allah dalam Al-Qur'an."
            },
            {
              "arab": "كَفَاكُمْ مِنْ عَظِيْمِ الْقَدْرِ أَنَّكُمْ ۞ مَنْ لَمْ يُصَلِّ عَلَيْكُمْ لَا صَلَاةَ لَهُ",
              "english": "Sufficient as proof of your immense rank is that whoever does not send blessings upon you has no prayer.",
              "id": "ya-ahla-baiti-rosulillah-u2",
              "latin": "Kafakum min 'azhimil qodri annakum, man lam yusholli 'alaikum la sholata lahu",
              "translation": "Cukuplah sebagai bukti betapa tinggi kedudukan kalian, wahai Ahlul Bait: barang siapa yang tidak bershalawat atas kalian, maka tidak sah salatnya."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Ya Karim",
      "slug": "ya-karim",
      "type": "SHALAWAT",
      "description": "Kisah masyhur tentang seorang Arab Badui yang terus menyeru 'Ya Karim' saat tawaf mengelilingi Ka'bah, lalu berdialog dengan Nabi Muhammad ﷺ tentang hisab dan luasnya ampunan serta kemurahan Allah. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 11,
    "blocks": {
      "sections": [
        {
          "id": "ya-karim-s1",
          "title": "Ya Karim",
          "units": [
            {
              "arab": "كَانَ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ يَطُوْفُ فِي الْكَعْبَةِ، فَرَأَى أَعْرَابِيًّا يَطُوْفُ بِهَا وَيَقُوْلُ: يَا كَرِيْمُ",
              "english": "Once the Prophet ﷺ was circumambulating the Kaaba when he saw a Bedouin Arab also circling it, calling out: \"O Most Generous! (Ya Karim)\"",
              "id": "ya-karim-u1",
              "latin": "Kanan-nabiyyu shollallahu 'alaihi wa sallam yathufu fil Ka'bah, faro-a a'robiyyan yathufu biha wa yaqulu: Ya Karim",
              "translation": "Suatu saat Nabi ﷺ sedang tawaf mengelilingi Ka'bah. Beliau melihat seorang Arab Badui juga sedang tawaf sambil menyeru: \"Ya Karim!\""
            },
            {
              "arab": "فَقَالَ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ وَرَاءَهُ: يَا كَرِيْمُ، فَانْتَقَلَ الْأَعْرَابِيُّ إِلَى الرُّكْنِ الثَّانِيْ وَقَالَ: يَا كَرِيْمُ، فَقَالَ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ وَرَاءَهُ: يَا كَرِيْمُ",
              "english": "From behind him the Prophet ﷺ said: \"Ya Karim.\" The Bedouin moved on to the second corner and said: \"Ya Karim,\" and from behind him the Prophet ﷺ again said: \"Ya Karim.\"",
              "id": "ya-karim-u2",
              "latin": "Faqolan-nabiyyu shollallahu 'alaihi wa sallam waro-ahu: Ya Karim, fantaqolal-a'robiyyu ila ruknits-tsani wa qola: Ya Karim, faqolan-nabiyyu shollallahu 'alaihi wa sallam waro-ahu: Ya Karim",
              "translation": "Maka Nabi ﷺ di belakangnya mengucapkan: \"Ya Karim.\" Orang Badui itu pun berpindah ke rukun kedua dan berkata: \"Ya Karim.\" Maka Nabi ﷺ di belakangnya kembali mengucapkan: \"Ya Karim.\""
            },
            {
              "arab": "فَانْتَقَلَ الْأَعْرَابِيُّ إِلَى الْحَجَرِ الْأَسْوَدِ فَقَالَ: يَا كَرِيْمُ، فَقَالَ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ وَرَاءَهُ: يَا كَرِيْمُ",
              "english": "Then the Bedouin moved to the Black Stone and said: \"Ya Karim!\" and from behind him the Prophet ﷺ said: \"Ya Karim.\"",
              "id": "ya-karim-u3",
              "latin": "Fantaqolal-a'robiyyu ilal-hajaril-aswadi faqola: Ya Karim, faqolan-nabiyyu shollallahu 'alaihi wa sallam waro-ahu: Ya Karim",
              "translation": "Lalu orang Badui itu berpindah ke dekat Hajar Aswad dan berkata: \"Ya Karim!\" Maka Nabi ﷺ di belakangnya mengucapkan: \"Ya Karim.\""
            },
            {
              "arab": "فَالْتَفَتَ الْأَعْرَابِيُّ فَقَالَ: أَتَهْزَأُ بِيْ يَا أَخَ الْعَرَبِ؟ وَاللهِ لَوْلَا صَبَاحَةُ وَجْهِكَ وَرَشَاقَةُ قَدِّكَ لَشَكَوْتُ إِلَى حَبِيْبِيْ مُحَمَّدًا",
              "english": "The Bedouin turned around and said: \"Are you mocking me, O brother of the Arabs? By Allah, were it not for the radiance of your face and the grace of your bearing, I would surely have complained about you to my beloved, Muhammad.\"",
              "id": "ya-karim-u4",
              "latin": "Faltafatal-a'robiyyu faqola: Atahza-u bi ya akhol 'arob? Wallahi laula shobahatu wajhika wa rosyaqotu qoddika lasyakautu ila habibi Muhammadan",
              "translation": "Maka orang Badui itu menoleh dan berkata: \"Apakah engkau mengejekku, wahai saudara Arabku? Demi Allah, seandainya bukan karena wajahmu yang bercahaya dan perawakanmu yang gagah, pasti sudah kuadukan engkau kepada kekasihku, Muhammad.\""
            },
            {
              "arab": "فَقَالَ لَهُ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: أَوَلَا تَعْرِفُ نَبِيَّكَ يَا أَخَ الْعَرَبِ؟",
              "english": "The Prophet ﷺ said to him: \"Do you not recognise your Prophet, O brother of the Arabs?\"",
              "id": "ya-karim-u5",
              "latin": "Faqola lahun-nabiyyu shollallahu 'alaihi wa sallam: Awala ta'rifu nabiyyaka ya akhol 'arob?",
              "translation": "Maka Nabi ﷺ berkata kepadanya: \"Apakah engkau belum mengenal Nabimu, wahai saudara Arabku?\""
            },
            {
              "arab": "قَالَ: وَاللهِ آمَنْتُ بِهِ وَلَمْ أَرَهُ، وَدَخَلْتُ مَكَّةَ وَلَمْ أَلْقَهُ",
              "english": "He said: \"By Allah, I believed in him though I had never seen him; I entered Makkah, yet I had never met him.\"",
              "id": "ya-karim-u6",
              "latin": "Qola: Wallahi amantu bihi wa lam arohu, wa dakhaltu Makkata wa lam alqohu",
              "translation": "Orang Badui itu berkata: \"Demi Allah, aku beriman kepadanya padahal aku belum pernah melihatnya; aku telah masuk ke Makkah, namun aku belum pernah berjumpa dengannya.\""
            },
            {
              "arab": "قَالَ لَهُ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: أَنَا نَبِيُّكَ يَا أَخَ الْعَرَبِ، فَانْكَبَّ الْأَعْرَابِيُّ عَلَى يَدِ النَّبِيِّ يُقَبِّلُهَا وَيَقُوْلُ: فِدَاكَ أَبِيْ وَأُمِّيْ يَا حَبِيْبَ اللهِ",
              "english": "The Prophet ﷺ said to him: \"I am your Prophet, O brother of the Arabs.\" At once the Bedouin bent down over the Prophet's hand, kissing it, and said: \"May my father and mother be your ransom, O beloved of Allah.\"",
              "id": "ya-karim-u7",
              "latin": "Qola lahun-nabiyyu shollallahu 'alaihi wa sallam: Ana nabiyyuka ya akhol 'arob. Fankabbal-a'robiyyu 'ala yadin-nabiyyi yuqobbiluha wa yaqulu: Fidaka abi wa ummi ya habiballah",
              "translation": "Maka Nabi ﷺ berkata kepadanya: \"Aku inilah Nabimu, wahai saudara Arabku.\" Maka orang Badui itu segera menunduk mencium tangan Nabi ﷺ seraya berkata: \"Ayah dan ibuku sebagai tebusanmu, wahai kekasih Allah.\""
            },
            {
              "arab": "فَنَزَلَ جِبْرِيْلُ الْأَمِيْنُ عَلَى النَّبِيِّ وَقَالَ لَهُ: يَا حَبِيْبَ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، اللهُ يُقْرِئُكَ السَّلَامَ وَيَقُوْلُ لَكَ: قُلْ لِهٰذَا الْأَعْرَابِيِّ: أَيَظُنُّ إِنْ قَالَ يَا كَرِيْمُ أَنَّنَا لَا نُحَاسِبُهُ؟",
              "english": "Then Jibril the Trustworthy descended to the Prophet ﷺ and said: \"O beloved of Allah ﷺ, Allah conveys His greetings of peace to you and says to you: Say to this Bedouin: Does he think that if he says 'Ya Karim', We will not call him to account?\"",
              "id": "ya-karim-u8",
              "latin": "Fanazala Jibrilul-aminu 'alan-nabiyyi wa qola lahu: Ya habiballahi shollallahu 'alaihi wa sallam, Allahu yuqri-ukas-salama wa yaqulu laka: Qul lihadzal-a'robiyyi: Ayazhunnu in qola Ya Karim annana la nuhasibuhu?",
              "translation": "Maka turunlah Jibril al-Amin kepada Nabi ﷺ dan berkata: \"Wahai kekasih Allah ﷺ, Allah menyampaikan salam kepadamu dan berfirman kepadamu: Katakanlah kepada orang Badui ini: Apakah ia menyangka bahwa apabila ia mengucapkan 'Ya Karim', Kami tidak akan menghisabnya?\""
            },
            {
              "arab": "فَقَالَ الْأَعْرَابِيُّ: وَاللهِ يَا نُوْرَ الْعَيْنِ يَا جَدَّ الْحَسَنَيْنِ، لَوْ حَاسَبَنِيْ رَبِّيْ لَأُحَاسِبَنَّهُ",
              "english": "The Bedouin said: \"By Allah, O light of my eyes, O grandfather of Hasan and Husain, if my Lord calls me to account, I shall surely call Him to account.\"",
              "id": "ya-karim-u9",
              "latin": "Faqolal-a'robiyyu: Wallahi ya nurol-'aini ya jaddal-hasanaini, lau hasabani robbi la-uhasibannahu",
              "translation": "Maka orang Badui itu berkata: \"Demi Allah, wahai cahaya mataku, wahai kakek Hasan dan Husain, seandainya Tuhanku menghisabku, sungguh aku pun akan menghisab-Nya.\""
            },
            {
              "arab": "قَالَ لَهُ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: وَكَيْفَ تُحَاسِبُ رَبَّكَ يَا أَخَ الْعَرَبِ؟ قَالَ: لَئِنْ حَاسَبَنِيْ عَلَى ذَنْبِيْ حَاسَبْتُهُ عَلَى مَغْفِرَتِهِ، وَإِنْ حَاسَبَنِيْ عَلَى تَقْصِيْرِيْ حَاسَبْتُهُ عَلَى جُوْدِهِ وَكَرَمِهِ",
              "english": "The Prophet ﷺ said to him: \"And how would you call your Lord to account, O brother of the Arabs?\" He said: \"If He calls me to account for my sin, I will call Him to account for His forgiveness; and if He calls me to account for my shortcomings, I will call Him to account for His generosity and munificence.\"",
              "id": "ya-karim-u10",
              "latin": "Qola lahun-nabiyyu shollallahu 'alaihi wa sallam: Wa kaifa tuhasibu robbaka ya akhol 'arob? Qola: La-in hasabani 'ala dzanbi hasabtuhu 'ala maghfirotihi, wa in hasabani 'ala taqshiri hasabtuhu 'ala judihi wa karomihi",
              "translation": "Nabi ﷺ bersabda kepadanya: \"Bagaimana engkau akan menghisab Tuhanmu, wahai saudara Arabku?\" Ia berkata: \"Jika Dia menghisabku atas dosaku, aku akan menghisab-Nya atas ampunan-Nya; dan jika Dia menghisabku atas kelalaianku, aku akan menghisab-Nya atas kedermawanan dan kemurahan-Nya.\""
            },
            {
              "arab": "فَقَالَ جِبْرِيْلُ الْأَمِيْنُ: يَا حَبِيْبَ اللهِ، اللهُ يَقُوْلُ لَكَ: قُلْ لِهٰذَا الْأَعْرَابِيِّ أَنْ لَا يُحَاسِبَنَا وَلَا نُحَاسِبَهُ",
              "english": "Then Jibril the Trustworthy said: \"O beloved of Allah, Allah says to you: Say to this Bedouin that he should not call Us to account, and We will not call him to account.\"",
              "id": "ya-karim-u11",
              "latin": "Faqola Jibrilul-aminu: Ya habiballah, Allahu yaqulu laka: Qul lihadzal-a'robiyyi an la yuhasibana wa la nuhasibahu",
              "translation": "Maka berkatalah Jibril al-Amin: \"Wahai kekasih Allah, Allah berfirman kepadamu: Katakanlah kepada orang Badui ini agar ia tidak menghisab Kami, dan Kami pun tidak akan menghisabnya.\""
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Ya Man Hawahum Aqom",
      "slug": "ya-man-hawahum-aqom",
      "type": "SHALAWAT",
      "description": "Qasidah Ya Man Hawahum Aqom karya Imam Abdullah bin Alwi Al-Haddad adalah syair kerinduan dan cinta kepada Nabi Muhammad ﷺ yang ditutup dengan ajakan berhaji, mengunjungi Rasulullah, dan doa memohon pertolongan Allah. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 16,
    "blocks": {
      "sections": [
        {
          "id": "ya-man-hawahum-aqom-s1",
          "title": "Ya Man Hawahum Aqom",
          "units": [
            {
              "id": "ya-man-hawahum-aqom-u1",
              "arab": "يَا مَنْ هَوَاهُمْ أَقَامَ ۞ فِيْ مُهْجَتِيْ وَاسْتَقَرَّ",
              "latin": "Ya man hawahum aqoma, fi muhjatii wastaqorro",
              "translation": "Wahai orang-orang yang cintanya bersemayam dan menetap kokoh dalam relung hatiku.",
              "english": "O you whose love has taken up residence and settled firmly in the depths of my heart."
            },
            {
              "id": "ya-man-hawahum-aqom-u2",
              "arab": "عَطْفًا عَلَى الْمُسْتَهَامِ ۞ بِكُمْ حَلِيْفِ السَّهَرِ",
              "latin": "'Athfan 'alal mustahami, bikum halifis-sahari",
              "translation": "Kasihanilah orang yang mabuk cinta kepadamu, yang senantiasa ditemani berjaga sepanjang malam.",
              "english": "Have pity on the one stricken with love for you, whose constant companion is sleeplessness through the night."
            },
            {
              "id": "ya-man-hawahum-aqom-u3",
              "arab": "وَدَمْعُهُ كَالْغَمَامِ ۞ مِنْ فَقْدِ بَاهِي الْغُرَرِ",
              "latin": "Wa dam'uhu kal-ghomami, min faqdi bahil ghurori",
              "translation": "Air matanya mengalir bagaikan hujan dari awan, karena kehilangan dia yang berwajah cerah berseri.",
              "english": "His tears pour down like rain from the clouds, for having lost the one whose face shines so bright."
            },
            {
              "id": "ya-man-hawahum-aqom-u4",
              "arab": "مَنْ فَرْعُهُ كَالظَّلَامِ ۞ وَوَجْهُهُ كَالْقَمَرِ",
              "latin": "Man far'uhu kadz-dzolami, wa wajhuhu kal-qomari",
              "translation": "Dia yang rambutnya hitam laksana gelap malam, dan wajahnya laksana rembulan.",
              "english": "The one whose hair is like the darkness of night, and whose face is like the full moon."
            },
            {
              "id": "ya-man-hawahum-aqom-u5",
              "arab": "قُوْلُوْا لِظَبْيِ الرِّمَالِ ۞ يَسْمَحْ لِهٰذَا الْكَئِيْبِ",
              "latin": "Qulu lidzobyir-rimali, yasmah lihadzal ka-ibi",
              "translation": "Katakanlah kepada sang kijang padang pasir: bermurah hatilah kepada orang yang berduka ini.",
              "english": "Say to the gazelle of the sands: be gracious to this grief-stricken one."
            },
            {
              "id": "ya-man-hawahum-aqom-u6",
              "arab": "بِقُرْبِهِ وَالْوِصَالِ ۞ لَعَلَّ عَيْشَهُ يَطِيْبُ",
              "latin": "Biqurbihi wal wisholi, la'alla 'aisyahu yathibu",
              "translation": "Dengan dekat dan tersambungnya hubungan dengannya, semoga hidupnya menjadi baik.",
              "english": "Through closeness to him and union with him, perhaps his life will turn sweet."
            },
            {
              "id": "ya-man-hawahum-aqom-u7",
              "arab": "وَيَتَّقِ ذَا الْجَلَالِ ۞ فِيْهِ الشَّهِيْدُ الرَّقِيْبُ",
              "latin": "Wa yattaqi dzal jalali, fihisy-syahidur-roqibu",
              "translation": "Dan hendaklah ia bertakwa kepada Dzat Yang Maha Agung, yang dalam urusan ini selalu menyaksikan dan mengawasi.",
              "english": "And let him be mindful of the Lord of Majesty, who in this matter is the ever-present Witness and Watcher."
            },
            {
              "id": "ya-man-hawahum-aqom-u8",
              "arab": "مِنْ قَبْلِ يَأْتِي الْحِمَامُ ۞ وَنَنْطَلِقْ لِلْحُفَرِ",
              "latin": "Min qobli ya'til himamu, wa nantholiq lil-hufari",
              "translation": "Sebelum datang kematian dan kita berangkat menuju liang kubur.",
              "english": "Before death arrives and we are carried away to the graves."
            },
            {
              "id": "ya-man-hawahum-aqom-u9",
              "arab": "يَا صَاحِبِيْ قُمْ بِنَا ۞ فَقَدْ تَمَادَى الْبِعَادُ",
              "latin": "Ya shohibi qum bina, faqod tamadal bi'adu",
              "translation": "Wahai sahabatku, bangkitlah bersama kami, sungguh perpisahan ini telah berlangsung terlalu lama.",
              "english": "O my companion, rise and set out with us, for this separation has gone on far too long."
            },
            {
              "id": "ya-man-hawahum-aqom-u10",
              "arab": "وَسِرْ بِنَا سِرْ بِنَا ۞ حَتَّى نُوَافِيْ سُعَادَ",
              "latin": "Wa sir bina sir bina, hatta nuwafi su'ada",
              "translation": "Berjalanlah bersama kami, berjalanlah bersama kami, hingga kita berjumpa dengan Su'ad.",
              "english": "And journey with us, journey with us, until we at last reach Su'ad."
            },
            {
              "id": "ya-man-hawahum-aqom-u11",
              "arab": "بِمَكَّةَ أَوْ مِنًى ۞ حَيْثُ اجْتِمَاعُ الْعِبَادِ",
              "latin": "Bimakkata aw Mina, haitsujtima'ul 'ibadi",
              "translation": "Di Makkah atau di Mina, tempat berkumpulnya para hamba.",
              "english": "In Makkah or in Mina, where the servants of God gather together."
            },
            {
              "id": "ya-man-hawahum-aqom-u12",
              "arab": "نَحْظَى بِنَيْلِ الْمَرَامِ ۞ مِنْهَا وَنَقْضِي الْوَطَرَ",
              "latin": "Nahdzo binailil maromi, minha wa naqdlil wathoro",
              "translation": "Sehingga kita beruntung meraih apa yang dicita-citakan darinya dan menunaikan segala hajat.",
              "english": "So that we may be fortunate to attain from her all that we seek, and have every need fulfilled."
            },
            {
              "id": "ya-man-hawahum-aqom-u13",
              "arab": "وَبَعْدُ نَأْتِي الرَّسُوْلَ ۞ مُحَمَّدًا الْمُصْطَفَى",
              "latin": "Wa ba'du na'tir-rosula, Muhammadal Mushthofa",
              "translation": "Dan setelah itu kita mendatangi Sang Rasul, Muhammad yang terpilih.",
              "english": "And afterwards we come to the Messenger, Muhammad, the Chosen One."
            },
            {
              "id": "ya-man-hawahum-aqom-u14",
              "arab": "خَيْرِ الْأَنَامِ الْوُصُوْلِ ۞ نَشْكُوْ مِنْ أَهْلِ الْجَفَا",
              "latin": "Khoiril anamil wushuli, nasyku min ahlil jafa-i",
              "translation": "Sebaik-baik manusia yang amat banyak memberi; kami mengadu tentang orang-orang yang berbuat kasar.",
              "english": "The best of mankind, ever abundant in giving — to him we complain of the people of harshness."
            },
            {
              "id": "ya-man-hawahum-aqom-u15",
              "arab": "مِنْ كُلِّ ظَالِمْ جَهُوْلٍ ۞ كَدَّرَ عَلَيْنَا الصَّفَا",
              "latin": "Min kulli dzolimin jahulin, kaddaro 'alainash-shofa",
              "translation": "Dari setiap orang zalim lagi bodoh yang telah mengeruhkan kejernihan hidup kami.",
              "english": "Of every ignorant wrongdoer who has muddied the clarity of our lives."
            },
            {
              "id": "ya-man-hawahum-aqom-u16",
              "arab": "يَا رَبَّنَا يَا سَلَامُ ۞ غِثْنَا بِخَيْرِ الْبَشَرِ",
              "latin": "Ya Robbana ya Salamu, ghitsna bikhoiril basyari",
              "translation": "Wahai Tuhan kami, wahai Dzat Yang Maha Pemberi Keselamatan, tolonglah kami dengan perantara sebaik-baik manusia.",
              "english": "O our Lord, O Source of all Peace, come to our aid through the best of mankind."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Yaa Akromal Kholqi",
      "slug": "yaa-akromal-kholqi",
      "type": "SHALAWAT",
      "description": "Qasidah Yaa Akromal Kholqi adalah petikan Fasal 10 Qasidah Burdah karya Imam al-Bushiri — munajat memohon syafaat Nabi Muhammad ﷺ, ampunan, dan keridaan Allah — yang masyhur dilantunkan tersendiri dalam majelis hadroh dengan refrain Maulaya Sholli. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 17,
    "blocks": {
      "sections": [
        {
          "id": "yaa-akromal-kholqi-s1",
          "title": "Yaa Akromal Kholqi",
          "units": [
            {
              "id": "yaa-akromal-kholqi-u1",
              "arab": "يَا أَكْرَمَ الْخَلْقِ مَا لِيْ مَنْ أَلُوْذُ بِهِ ۞ سِوَاكَ عِنْدَ حُلُوْلِ الْحَادِثِ الْعَمِمِ",
              "latin": "Ya akromal kholqi ma li man aludzu bihi, siwaka 'inda hululil haditsil 'amimi",
              "translation": "Wahai makhluk yang paling mulia, tiada seorang pun tempat aku berlindung selain dirimu di saat turunnya huru-hara yang membingungkan (di Padang Mahsyar).",
              "english": "O noblest of all creation, I have no one to seek refuge with but you when the universal calamity descends."
            },
            {
              "id": "yaa-akromal-kholqi-u2",
              "arab": "مَوْلَايَ صَلِّ وَسَلِّمْ دَائِمًا أَبَدًا ۞ عَلَى حَبِيْبِكَ خَيْرِ الْخَلْقِ كُلِّهِمِ",
              "latin": "Maulaya sholli wa sallim da-iman abada, 'ala habibika khoiril kholqi kullihimi",
              "translation": "Ya Tuhanku, limpahkanlah shalawat dan salam senantiasa dan selamanya atas kekasih-Mu, yang terbaik di antara seluruh makhluk.",
              "english": "O my Lord, send blessings and peace, always and forever, upon Your beloved, the best of all creation."
            },
            {
              "id": "yaa-akromal-kholqi-u3",
              "arab": "وَلَنْ يَضِيْقَ رَسُوْلَ اللهِ جَاهُكَ بِيْ ۞ إِذَا الْكَرِيْمُ تَجَلَّى بِاسْمِ مُنْتَقِمِ",
              "latin": "Wa lan yadhiqo Rosulallahi jahuka bi, idzal karimu tajalla bismi muntaqimi",
              "translation": "Wahai Rasulullah, kedudukanmu tidak akan sempit untuk menolongku, apabila Yang Maha Pemurah menampakkan diri dengan nama Sang Pembalas.",
              "english": "O Messenger of Allah, your high rank will not be too narrow to encompass me, when the Most Generous manifests Himself under the name of the Avenger."
            },
            {
              "id": "yaa-akromal-kholqi-u4",
              "arab": "فَإِنَّ مِنْ جُوْدِكَ الدُّنْيَا وَضَرَّتَهَا ۞ وَمِنْ عُلُوْمِكَ عِلْمَ اللَّوْحِ وَالْقَلَمِ",
              "latin": "Fa inna min judikad-dunya wa dhorrotaha, wa min 'ulumika 'ilmal lauhi wal qolami",
              "translation": "Karena sesungguhnya di antara kemurahanmu adalah dunia dan pasangannya (akhirat), dan di antara ilmumu adalah ilmu tentang Lauh Mahfuzh dan Pena (Qalam).",
              "english": "For indeed, among your bounty are this world and its counterpart (the Hereafter), and among your knowledge is the knowledge of the Tablet and the Pen."
            },
            {
              "id": "yaa-akromal-kholqi-u5",
              "arab": "يَا نَفْسُ لَا تَقْنَطِيْ مِنْ زَلَّةٍ عَظُمَتْ ۞ إِنَّ الْكَبَائِرَ فِي الْغُفْرَانِ كَاللَّمَمِ",
              "latin": "Ya nafsu la taqnathi min zallatin 'adhumat, innal kaba-iro fil ghufroni kal-lamami",
              "translation": "Wahai jiwaku, janganlah engkau putus asa karena dosa yang besar; sungguh dosa-dosa besar itu di sisi ampunan (Allah) bagaikan dosa-dosa kecil.",
              "english": "O my soul, do not despair over a slip that seems great; indeed, major sins, beside (Allah's) forgiveness, are like minor faults."
            },
            {
              "id": "yaa-akromal-kholqi-u6",
              "arab": "لَعَلَّ رَحْمَةَ رَبِّيْ حِيْنَ يَقْسِمُهَا ۞ تَأْتِيْ عَلَى حَسَبِ الْعِصْيَانِ فِي الْقِسَمِ",
              "latin": "La'alla rohmata robbi hina yaqsimuha, ta-ti 'ala hasabil 'ishyani fil qisami",
              "translation": "Semoga rahmat Tuhanku, ketika Dia membagikannya, datang sesuai dengan kadar kedurhakaan (dosa) dalam pembagian-Nya.",
              "english": "Perhaps the mercy of my Lord, when He apportions it, will come in proportion to the disobedience in its apportioning."
            },
            {
              "id": "yaa-akromal-kholqi-u7",
              "arab": "يَا رَبِّ وَاجْعَلْ رَجَائِيْ غَيْرَ مُنْعَكِسٍ ۞ لَدَيْكَ وَاجْعَلْ حِسَابِيْ غَيْرَ مُنْخَرِمِ",
              "latin": "Ya Robbi waj'al roja-i ghoiro mun'akisin, ladaika waj'al hisabi ghoiro munkhorimi",
              "translation": "Wahai Tuhanku, jadikanlah harapku tiada tertolak di sisi-Mu, dan jadikanlah hisabku tiada terputus.",
              "english": "O my Lord, make my hope in You not turned back, and make my reckoning not broken off."
            },
            {
              "id": "yaa-akromal-kholqi-u8",
              "arab": "وَالْطُفْ بِعَبْدِكَ فِي الدَّارَيْنِ إِنَّ لَهُ ۞ صَبْرًا مَتَى تَدْعُهُ الْأَهْوَالُ يَنْهَزِمِ",
              "latin": "Walthuf bi'abdika fid-daroini inna lahu, shobron mata tad'uhul ahwalu yanhazimi",
              "translation": "Berbelas kasihlah kepada hamba-Mu ini di dunia dan akhirat, karena kesabarannya — apabila kedahsyatan datang menyerunya — akan runtuh.",
              "english": "And be gentle with Your servant in both abodes, for his patience, whenever terrors call upon it, collapses."
            },
            {
              "id": "yaa-akromal-kholqi-u9",
              "arab": "وَأْذَنْ لِسُحْبِ صَلَاةٍ مِنْكَ دَائِمَةٍ ۞ عَلَى النَّبِيِّ بِمُنْهَلٍّ وَمُنْسَجِمِ",
              "latin": "Wa'dzan lisuhbi sholatin minka da-imatin, 'alan-nabiyyi bimunhallin wa munsajimi",
              "translation": "Perkenankanlah awan-awan shalawat dari-Mu yang abadi (mencurah) atas Nabi, dengan curahan yang deras dan mengalir tiada henti.",
              "english": "And permit clouds of blessing from You, everlasting, to pour down upon the Prophet in torrents and in steady flow."
            },
            {
              "id": "yaa-akromal-kholqi-u10",
              "arab": "مَا رَنَّحَتْ عَذَبَاتِ الْبَانِ رِيْحُ صَبًا ۞ وَأَطْرَبَ الْعِيْسَ حَادِي الْعِيْسِ بِالنَّغَمِ",
              "latin": "Ma ronnahat 'adzabatil bani rihu shoba, wa athrobal 'isa hadil 'isi bin-naghomi",
              "translation": "Selama angin shaba berembus menggoyangkan ujung-ujung dahan pohon ban, dan selama penggiring unta menghibur unta-untanya dengan kidung nan merdu.",
              "english": "As long as the east wind sways the branches of the ban tree, and the camel-driver delights the camels with his song."
            },
            {
              "id": "yaa-akromal-kholqi-u11",
              "arab": "ثُمَّ الرِّضَا عَنْ أَبِيْ بَكْرٍ وَعَنْ عُمَرَ ۞ وَعَنْ عَلِيٍّ وَعَنْ عُثْمَانَ ذِي الْكَرَمِ",
              "latin": "Tsummar-ridho 'an Abi Bakrin wa 'an 'Umaro, wa 'an 'Aliyyin wa 'an 'Utsmana dzil karomi",
              "translation": "Kemudian (limpahkanlah) keridaan atas Abu Bakar dan atas Umar, dan atas Ali dan atas Utsman yang memiliki kemuliaan.",
              "english": "Then (grant) Your pleasure to Abu Bakr and to Umar, and to Ali and to Uthman, the possessor of nobility."
            },
            {
              "id": "yaa-akromal-kholqi-u12",
              "arab": "وَالْآلِ وَالصَّحْبِ ثُمَّ التَّابِعِيْنَ فَهُمْ ۞ أَهْلُ التُّقَى وَالنَّقَى وَالْحِلْمِ وَالْكَرَمِ",
              "latin": "Wal ali wash-shohbi tsummat-tabi'ina fahum, ahlut-tuqo wan-naqo wal hilmi wal karomi",
              "translation": "Dan atas keluarga dan para sahabat, kemudian para tabiin — merekalah ahli takwa, kesucian, kelembutan, dan kemuliaan.",
              "english": "And to the family and the Companions, then the Followers — for they are the people of God-consciousness, purity, forbearance, and generosity."
            },
            {
              "id": "yaa-akromal-kholqi-u13",
              "arab": "يَا رَبِّ بِالْمُصْطَفَى بَلِّغْ مَقَاصِدَنَا ۞ وَاغْفِرْ لَنَا مَا مَضَى يَا وَاسِعَ الْكَرَمِ",
              "latin": "Ya Robbi bil Mushthofa balligh maqoshidana, waghfir lana ma madho ya wasi'al karomi",
              "translation": "Wahai Tuhanku, demi Al-Mushthafa, sampaikanlah segala maksud tujuan kami, dan ampunilah kami atas dosa-dosa yang telah lalu, wahai Yang Mahaluas kemurahan-Nya.",
              "english": "O my Lord, by al-Mustafa (the Chosen One), grant us the attainment of our aims, and forgive us what has passed, O You whose generosity is vast."
            },
            {
              "id": "yaa-akromal-kholqi-u14",
              "arab": "وَاغْفِرْ إِلَهِيْ لِكُلِّ الْمُسْلِمِيْنَ بِمَا ۞ يَتْلُوْنَ فِي الْمَسْجِدِ الْأَقْصَى وَفِي الْحَرَمِ",
              "latin": "Waghfir ilahi likullil muslimina bima, yatluna fil masjidil Aqsho wa fil haromi",
              "translation": "Dan ampunilah, wahai Tuhanku, seluruh kaum Muslimin, berkat apa yang mereka baca di Masjidil Aqsa dan di Tanah Haram.",
              "english": "And forgive, O my God, all the Muslims, by virtue of what they recite in al-Masjid al-Aqsa and in the Sacred Sanctuary."
            },
            {
              "id": "yaa-akromal-kholqi-u15",
              "arab": "بِجَاهِ مَنْ بَيْتُهُ فِيْ طَيْبَةٍ حَرَمٌ ۞ وَاسْمُهُ قَسَمٌ مِنْ أَعْظَمِ الْقَسَمِ",
              "latin": "Bijahi man baituhu fi thoibatin haromun, was-muhu qosamun min a'dhomil qosami",
              "translation": "Demi kedudukan orang yang rumahnya di Thaibah (Madinah) menjadi tempat suci, dan namanya adalah sumpah di antara sumpah-sumpah yang terbesar.",
              "english": "By the rank of the one whose house in Taybah (Madinah) is a sanctuary, and whose name is an oath among the greatest of oaths."
            },
            {
              "id": "yaa-akromal-kholqi-u16",
              "arab": "وَهَذِهِ بُرْدَةُ الْمُخْتَارِ قَدْ خُتِمَتْ ۞ وَالْحَمْدُ لِلَّهِ فِيْ بَدْءٍ وَفِيْ خَتَمِ",
              "latin": "Wa hadzihi burdatul mukhtari qod khutimat, walhamdulillahi fi bad-in wa fi khotami",
              "translation": "Dan inilah Burdah bagi Nabi pilihan yang telah selesai; segala puji bagi Allah pada permulaan dan pada penutupnya.",
              "english": "And this Burdah of the Chosen One has now been completed; and all praise belongs to Allah at its beginning and at its end."
            },
            {
              "id": "yaa-akromal-kholqi-u17",
              "arab": "أَبْيَاتُهَا قَدْ أَتَتْ سِتِّيْنَ مَعْ مِائَةٍ ۞ فَرِّجْ بِهَا كَرْبَنَا يَا وَاسِعَ الْكَرَمِ",
              "latin": "Abyatuha qod atat sittina ma' mi-atin, farrij biha karbana ya wasi'al karomi",
              "translation": "Bait-baitnya berjumlah seratus enam puluh; lapangkanlah dengannya kesusahan kami, wahai Yang Mahaluas kemurahan-Nya.",
              "english": "Its verses have come to one hundred and sixty; relieve our distress through it, O You whose generosity is vast."
            }
          ]
        }
      ]
    }
  }
];
