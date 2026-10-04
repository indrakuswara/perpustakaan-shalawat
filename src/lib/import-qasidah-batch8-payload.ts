// PAYLOAD SEMENTARA — impor batch 8 qasidah (4 judul) sebagai DRAFT.
// Sumber teks: wakidyusuf.wordpress.com (dipilih Juple dari
// files/list-konten-wakidyusuf.md), masing-masing sudah di-cross-check
// kelengkapan bait ke sumber kedua; Arab direkonstruksi bersih, Latin
// disusun ulang, Artinya dari blog dengan pembersihan/koreksi
// terdokumentasi, English baru. Catatan: "Yaa Robbi Yaa 'Alimal Hal"
// terbukti duplikat batch 4 (tidak diimpor); "Yaa Dzaljalali Wal
// Ikrom" ditahan atas rekomendasi worker (11/13 unit subset batch 4).
// Dokumen review: qasidah-batch8/*.md di workspace goal. Dihapus
// bersama route import-qasidah-batch8 setelah eksekusi terverifikasi.
import type { ArticleBlocks } from "./db-types.ts";

export interface Batch8Article {
  meta: { title: string; slug: string; type: "SHALAWAT" | "MAULID"; description: string };
  expectedUnits: number;
  blocks: ArticleBlocks;
}

export const BATCH8_ARTICLES: Batch8Article[] = [
  {
    "meta": {
      "title": "Yaa Imamarrusli",
      "slug": "yaa-imamarrusli",
      "type": "SHALAWAT",
      "description": "Qasidah seruan kepada Nabi Muhammad ﷺ sebagai penghulu para rasul dan sandaran setelah Allah, yang masyhur dilantunkan dalam majelis shalawat dan hadroh: bait-baitnya berisi pengakuan Ahlul Bait sebagai tetangga Tanah Haram Makkah yang bernasab kepada Nabi ﷺ melalui Hasan dan Husain, pujian Ahlul Bait sebagai pengaman bumi dan bahtera keselamatan, doa memohon berkah mereka, dan nasihat penutup agar tidak membanggakan nasab melainkan mengikuti petunjuk Nabi. Di blog sumber, qasidah ini dinisbatkan kepada Al-Imam Al-Quthb Al-Habib Abdullah bin Alwi Al-Haddad (atribusi blog, belum terverifikasi independen — lihat dokumen review). Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 18,
    "blocks": {
      "sections": [
        {
          "id": "yaa-imamarrusli-s1",
          "title": "Yaa Imamarrusli",
          "units": [
            {
              "id": "yaa-imamarrusli-u1",
              "arab": "يَا إِمَامَ الرُّسْلِ يَا سَنَدِيْ ۞ أَنْتَ بَعْدَ اللهِ مُعْتَمَدِيْ",
              "latin": "Ya Imamarrusli ya sanadi, anta ba'dallahi mu'tamadi",
              "translation": "Wahai penghulu para rasul, wahai sandaranku; setelah Allah, Engkau adalah peganganku.",
              "english": "O leader of the messengers, O my support; after Allah, You are the one I rely upon."
            },
            {
              "id": "yaa-imamarrusli-u2",
              "arab": "فَبِدُنْيَايَ وَآخِرَتِيْ ۞ يَا رَسُوْلَ اللهِ خُذْ بِيَدِيْ",
              "latin": "Fabidunyaya wa akhiroti, ya Rasulallah khudz biyadi",
              "translation": "Maka dalam urusan duniaku dan akhiratku, wahai Rasulullah, bantulah aku.",
              "english": "So in my worldly life and my hereafter, O Messenger of Allah, take my hand."
            },
            {
              "id": "yaa-imamarrusli-u3",
              "arab": "عَطْفَةً يَا جِيْرَةَ الْعَلَمِ ۞ يَا أُهَيْلَ الْجُوْدِ وَالْكَرَمِ",
              "latin": "'Athfatan ya jiratal 'alami, ya uhailal judi wal karami",
              "translation": "Curahkanlah belas kasihmu, wahai yang bertetangga dengan Al-'Alam (Ka'bah); wahai keluarga yang dermawan dan mulia.",
              "english": "Show your tender mercy, O neighbours of Al-'Alam (the Kaaba); O people of generosity and nobility."
            },
            {
              "id": "yaa-imamarrusli-u4",
              "arab": "نَحْنُ جِيْرَانٌ بِذَا الْحَرَمِ ۞ حَرَمِ الْإِحْسَانِ وَالْحَسَنِ",
              "latin": "Nahnu jiranun bidzal harami, haramil ihsani wal hasani",
              "translation": "Kami adalah tetangga di Tanah Haram ini, Tanah Haram yang penuh kebaikan dan keelokan.",
              "english": "We are neighbours in this Sacred Sanctuary, the Sanctuary of beneficence and beauty."
            },
            {
              "id": "yaa-imamarrusli-u5",
              "arab": "نَحْنُ مِنْ قَوْمٍ بِهِ سَكَنُوْا ۞ وَبِهِ مِنْ خَوْفِهِمْ أَمِنُوْا",
              "latin": "Nahnu min qoumin bihi sakanu, wa bihi min khoufihim aminu",
              "translation": "Kami berasal dari kaum yang tinggal di dalamnya, dan di dalamnya mereka aman dari ketakutan mereka.",
              "english": "We are of a people who dwell within it, and within it they are safe from their fears."
            },
            {
              "id": "yaa-imamarrusli-u6",
              "arab": "وَبِآيَاتِ الْقُرْآنِ عُنُوْا ۞ فَاتَّئِدْ فِيْنَا أَخَا الْوَهَنِ",
              "latin": "Wa bi-ayatil Qur-ani 'unu, fatta-id fina akhol wahani",
              "translation": "Dan dengan ayat-ayat Al-Qur'an mereka diperhatikan; maka bersikaplah tenang terhadap kami, wahai saudara yang lemah.",
              "english": "And by the verses of the Qur'an they were cared for; so deal gently with us, O brother of frailty."
            },
            {
              "id": "yaa-imamarrusli-u7",
              "arab": "نَعْرِفُ الْبَطْحَاءَ وَتَعْرِفُنَا ۞ وَالصَّفَا وَالْبَيْتُ يَأْلَفُنَا",
              "latin": "Na'riful bath-ha-a wa ta'rifuna, wash-shofa wal baitu ya'lafuna",
              "translation": "Kami mengenal Al-Bathha' (lembah Makkah) dan ia mengenal kami; dan Bukit Shafa serta Baitullah pun akrab dengan kami.",
              "english": "We know Al-Bathha (the valley of Makkah), and it knows us; and As-Safa and the House (the Kaaba) are intimate with us."
            },
            {
              "id": "yaa-imamarrusli-u8",
              "arab": "وَلَنَا الْمَعْلَى وَخَيْفُ مِنَى ۞ فَاعْلَمَنْ هٰذَا وَكُنْ وَكُنِيْ",
              "latin": "Wa lanal ma'la wa khoifu Mina, fa'laman hadza wa kun wa kuni",
              "translation": "Dan bagi kami Al-Ma'la dan Khaif di Mina; maka ketahuilah hal ini dan yakinlah.",
              "english": "And ours are Al-Ma'la and Khaif in Mina; so know this well and be certain."
            },
            {
              "id": "yaa-imamarrusli-u9",
              "arab": "وَلَنَا خَيْرُ الْأَنَامِ أَبُ ۞ وَعَلِيٌّ الْمُرْتَضَى حَسَبُ",
              "latin": "Wa lana khoirul anami abu, wa 'Aliyyul murtadho hasabu",
              "translation": "Dan bagi kami sebaik-baik manusia adalah ayah (leluhur kami), dan Ali Al-Murtadha adalah kebanggaan nasab kami.",
              "english": "And ours is the best of mankind as a father, and Ali Al-Murtadha as the pride of our lineage."
            },
            {
              "id": "yaa-imamarrusli-u10",
              "arab": "وَإِلَى السِّبْطَيْنِ نَنْتَسِبُ ۞ نَسَبًا مَا فِيْهِ مِنْ دَخَنِ",
              "latin": "Wa ilas-sibthoini nantasibu, nasaban ma fihi min dakhani",
              "translation": "Dan kepada dua cucu Nabi (Hasan dan Husain) kami bernasab, nasab yang tidak ada cacat di dalamnya.",
              "english": "And to the two grandsons (Hasan and Husain) we trace our descent, a lineage in which there is no blemish."
            },
            {
              "id": "yaa-imamarrusli-u11",
              "arab": "أَهْلُ بَيْتِ الْمُصْطَفَى الطُّهُرِ ۞ هُمْ أَمَانُ الْأَرْضِ فَاذَّكِرِيْ",
              "latin": "Ahlu baitil mushthofath-thuhuri, hum amanul ardhi faddzakiri",
              "translation": "Ahlul Bait Al-Mushthafa yang suci; mereka adalah keamanan bagi bumi, maka ingatlah itu.",
              "english": "The pure Household of Al-Mustafa (the Chosen One); they are safety for the earth, so remember this."
            },
            {
              "id": "yaa-imamarrusli-u12",
              "arab": "شُبِّهُوْا بِالْأَنْجُمِ الزُّهُرِ ۞ مِثْلَ مَا قَدْ جَاءَ فِي السُّنَنِ",
              "latin": "Syubbihu bil anjumiz-zuhuri, mitsla ma qod ja-a fis-sunani",
              "translation": "Mereka diserupakan dengan bintang-bintang yang bercahaya, sebagaimana telah datang dalam sunnah-sunnah (hadis-hadis).",
              "english": "They were likened to the radiant stars, just as has come in the Sunnah (the hadiths)."
            },
            {
              "id": "yaa-imamarrusli-u13",
              "arab": "وَسَفِيْنٌ لِلنَّجَاةِ إِذَا ۞ خِفْتَ مِنْ طُوْفَانِ كُلِّ أَذًى",
              "latin": "Wa safinun linnajati idza, khifta min thufani kulli adza",
              "translation": "Dan mereka laksana bahtera keselamatan, apabila engkau takut pada banjir besar segala marabahaya.",
              "english": "And they are a ship of salvation, when you fear the deluge of every harm."
            },
            {
              "id": "yaa-imamarrusli-u14",
              "arab": "فَانْجُ فِيْهَا لَا تَكُوْنُ كَذَا ۞ فَاعْتَصِمْ بِاللهِ وَاسْتَعِنِيْ",
              "latin": "Fanju fiha la takunu kadza, fa'tashim billahi wasta'ini",
              "translation": "Maka carilah keselamatan di dalamnya, janganlah engkau tetap demikian; berpegang teguhlah kepada Allah dan mintalah pertolongan (kepada-Nya).",
              "english": "So seek salvation in it, and do not remain as you are; hold fast to Allah and seek His help."
            },
            {
              "id": "yaa-imamarrusli-u15",
              "arab": "رَبِّ فَانْفَعْنَا بِبَرْكَتِهِمْ ۞ وَاهْدِنَا الْحُسْنٰى بِحُرْمَتِهِمْ",
              "latin": "Robbi fanfa'na bibarkatihim, wahdinal husna bihurmatihim",
              "translation": "Ya Rabbi, anugerahkanlah manfaat kepada kami dengan berkah mereka, dan tunjukilah kami kebaikan dengan kehormatan mereka.",
              "english": "O Lord, benefit us through their blessing, and guide us to goodness for their sanctity's sake."
            },
            {
              "id": "yaa-imamarrusli-u16",
              "arab": "وَأَمِتْنَا فِيْ طَرِيْقَتِهِمْ ۞ وَمُعَافَاةٍ مِنَ الْفِتَنِ",
              "latin": "Wa amitna fi thoriqotihim, wa mu'afatin minal fitani",
              "translation": "Dan wafatkanlah kami di jalan mereka, dalam keselamatan dari segala fitnah.",
              "english": "And cause us to die upon their path, safe and sound from all tribulations."
            },
            {
              "id": "yaa-imamarrusli-u17",
              "arab": "ثُمَّ لَا تَغْتَرَّ بِالنَّسَبِ ۞ لَا وَلَا تَقْنَعْ بِكَانَ أَبِيْ",
              "latin": "Tsumma la taghtarro binnasabi, la wa la taqna' bikana abi",
              "translation": "Kemudian, janganlah engkau membanggakan diri dengan nasab, dan jangan pula engkau merasa cukup dengan (kejayaan) “ayahku dahulu”.",
              "english": "Then do not be deluded by lineage, nor be content with (boasting) “my father was (great)”."
            },
            {
              "id": "yaa-imamarrusli-u18",
              "arab": "وَاتَّبِعْ فِي الْهَدْيِ خَيْرَ نَبِيْ ۞ أَحْمَدِ الْهَادِيْ إِلَى السُّنَنِ",
              "latin": "Wattabi' fil hadyi khoiro nabi, Ahmadil hadi ilas-sunani",
              "translation": "Dan ikutilah dalam petunjuk sebaik-baik Nabi, yaitu Ahmad, pemberi petunjuk kepada jalan-jalan yang benar.",
              "english": "And follow in guidance the best of prophets, Ahmad, the guide to the righteous paths."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Yaa Laqolbin",
      "slug": "yaa-laqolbin",
      "type": "SHALAWAT",
      "description": "Qasidah dari Maulid Simtudduror karya Habib Ali bin Muhammad al-Habsyi yang masyhur dilantunkan Habib Syech bin Abdul Qadir Assegaf: pujian bagi hati yang terus bergembira menyambut Sang Kekasih pembawa anugerah bagi seluruh manusia, cahaya yang memuliakan wujud dan meliputi alam semesta dengan keriangan dan keindahan, serta keluhuran Nabi Muhammad yang melampaui segala pengetahuan. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 5,
    "blocks": {
      "sections": [
        {
          "id": "yaa-laqolbin-s1",
          "title": "Yaa Laqolbin",
          "units": [
            {
              "arab": "يَا لَقَلْبٍ سُرُورُهُ قَدْ تَوَالَى ۞ بِحَبِيبٍ عَمَّ الْأَنَامَ نَوَالَا",
              "english": "O, for a heart whose joy has come in unbroken succession, through a beloved whose bounty has embraced all mankind",
              "id": "yaa-laqolbin-u1",
              "latin": "Ya laqolbin suruuruhu qod tawala, bihabibin 'ammal anama nawala",
              "translation": "Bahagia dan suka ria berdatangan merasuki kalbu, menyambut datangnya kekasih Allah, pembawa anugerah bagi seluruh manusia"
            },
            {
              "arab": "جَلَّ مَنْ شَرَّفَ الْوُجُودَ بِنُورٍ ۞ غَمَرَ الْكَوْنَ بَهْجَةً وَجَمَالَا",
              "english": "Glory be to Him who honored all existence with a light that flooded the universe with joy and beauty",
              "id": "yaa-laqolbin-u2",
              "latin": "Jalla man syarrofal wujuuda binurin, ghomarol kauna bahjatan wa jamala",
              "translation": "Maha Agung Dia yang telah memuliakan wujud ini dengan nur berkilauan, meliputi semuanya dengan keriangan dan kecantikan"
            },
            {
              "arab": "قَدْ تَرَقَّى فِي الْحُسْنِ أَعْلَى مَقَامٍ ۞ وَتَنَاهَى فِي مَجْدِهِ وَتَعَالَى",
              "english": "He rose in beauty to the highest station, and reached the utmost in his glory and exaltedness",
              "id": "yaa-laqolbin-u3",
              "latin": "Qod taroqqo fil husni a'la maqomin, wa tanaha fi majdihi wa ta'ala",
              "translation": "Mencapai tingkat keindahan tertinggi, menjulang mengangkasa dengan kemuliaannya"
            },
            {
              "arab": "لَاحَظَتْهُ الْعُيُونُ فِيمَا اجْتَلَتْهُ ۞ بَشَرًا كَامِلًا يُزِيحُ الضَّلَالَا",
              "english": "The eyes beheld him in all that they contemplated: a perfect human being, who removes all misguidance",
              "id": "yaa-laqolbin-u4",
              "latin": "Lahadzothul 'uyunu fimajtalathu, basyaron kamilan yuzihudh-dholala",
              "translation": "Mata memandang penuh damba bentuk insan sempurna, pengikis segala yang sesat"
            },
            {
              "arab": "وَهُوَ مِنْ فَوْقِ عِلْمِ مَا قَدْ رَآتْهُ ۞ رِفْعَةً فِي شُؤُونِهِ وَكَمَالَا",
              "english": "Yet he stands above all that knowledge has ever beheld of him, in loftiness in all his affairs and in perfection",
              "id": "yaa-laqolbin-u5",
              "latin": "Wahwa min fauqi 'ilmi ma qod ro-athu, rif'atan fi syu-unihi wa kamala",
              "translation": "Meski sesungguhnya keluhuran dan kesempurnaannya melampaui segala yang bisa dicapai pengetahuan yang mana pun jua"
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Yaa Maulidal Musthofa",
      "slug": "yaa-maulidal-musthofa",
      "type": "SHALAWAT",
      "description": "Qasidah doa dan munajat yang masyhur dilantunkan dalam majelis pembacaan maulid: dibuka dengan perayaan kelahiran Nabi al-Musthofa yang agung kedudukannya, lalu memanjatkan permohonan kesembuhan bagi yang sakit, kesehatan, ampunan dan tertutupnya aib hamba, serta keteguhan dalam mengingat dan mencintai Nabi — dengan menyebut para leluhur dan keluarga di kota Tarim. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 11,
    "blocks": {
      "sections": [
        {
          "id": "yaa-maulidal-musthofa-s1",
          "title": "Yaa Maulidal Musthofa",
          "units": [
            {
              "id": "yaa-maulidal-musthofa-u1",
              "arab": "يَا مَوْلِدَ الْمُصْطَفَى يَا اللِّيْ مَقَامَكْ عَظِيْم ۞ عَسَى بِجَاهِ النَّبِيْ يَحْصُلْ شِفَا لِلسَّقِيْم",
              "latin": "Ya maulidal Musthofa yalli maqomak 'adhim, 'asa bijahin-nabi yahshul syifa lissaqim",
              "translation": "Wahai kelahiran Nabi al-Musthofa, wahai Nabi yang berkedudukan agung. Semoga dengan kedudukan Nabi itu, yang sakit mendapat obatnya.",
              "english": "O birth of al-Musthofa (the Chosen One), O Prophet whose station is so exalted. May, through the Prophet's rank, the sick obtain their cure."
            },
            {
              "id": "yaa-maulidal-musthofa-u2",
              "arab": "قُوْلُوْا بِصِدْقِ اللَّجَا يَا رَبَّنَا يَا كَرِيْم ۞ جُدْ بِالْعَوَافِيْ وَبَادِرْ بِالشِّفَا لِلْكَلِيْم",
              "latin": "Qulu bishidqil-laja ya Robbana ya Karim, jud bil-'awafi wa badir bisy-syifa lil-kalim",
              "translation": "Katakanlah dengan suara hati: wahai Tuhan kami, wahai Yang Maha Mulia, berikanlah kami kesehatan, dan yang sakit berikanlah kesembuhan.",
              "english": "Say, with sincere refuge: O our Lord, O Most Generous, grant us well-being, and hasten healing for the wounded."
            },
            {
              "id": "yaa-maulidal-musthofa-u3",
              "arab": "يَا رَبَّنَا يَا جَزِيْلَ الْعَفْوِ يَا أَرْحَمْ رَحِيْم ۞ جُدْ بِالْعَوَافِيْ وَلَا تَكْشِفْ عَلَى الْعَبْدِ خِيْم",
              "latin": "Ya Robbana ya jazilal-'afwi ya Arham Rohim, jud bil-'awafi wa la taksyif 'alal-'abdi khim",
              "translation": "Wahai Tuhan kami, wahai Yang Agung pengampunan-Nya, wahai sebaik-baik Penyayang. Berikanlah kesehatan, dan janganlah Engkau membuka kesalahan-kesalahan hamba.",
              "english": "O our Lord, O You whose pardon is abundant, O most merciful of the merciful. Grant well-being, and do not expose Your servant's faults."
            },
            {
              "id": "yaa-maulidal-musthofa-u4",
              "arab": "وَالْعَبْدُ يَلْقَاكْ يَا مَوْلَايْ بِقَلْبٍ سَلِيْم ۞ غَرِيْمُنَا الْمُصْطَفَى مَا أَحْسَنُهْ يَا أَكْرَمْ غَرِيْم",
              "latin": "Wal-'abdu yalqok ya maulay biqolbin salim, ghorimunal Musthofa ma ahsanuh ya akrom ghorim",
              "translation": "Dan hamba itu menjumpai-Mu, wahai Tuhanku, dengan hati yang selamat. Penjamin kami adalah al-Musthofa — betapa baiknya beliau, wahai sebaik-baik penjamin.",
              "english": "And the servant meets You, O my Master, with a sound heart. Our guarantor is al-Musthofa — how excellent he is, O noblest of guarantors."
            },
            {
              "id": "yaa-maulidal-musthofa-u5",
              "arab": "وَأَسْلَافُنَا وَأَهْلُنَا سُكَّانْ بَلْدَةْ تَرِيْم ۞ وَمَنْ حَضَرْ عِنْدَهُمْ مُسَافِرْ أَوْ هُوَ مُقِيْم",
              "latin": "Wa aslafana wa ahlana sukkan baldah Tarim, wa man hadhor 'indahum musafir au huwa muqim",
              "translation": "Dan para leluhur kami dan keluarga kami, penduduk kota Tarim, dan siapa pun yang hadir di tengah mereka, baik musafir maupun yang menetap.",
              "english": "And our forebears and our families, the people of the town of Tarim, and whoever is present among them, whether a traveler or a resident."
            },
            {
              "id": "yaa-maulidal-musthofa-u6",
              "arab": "وَأَعْظَمْ كَرَامَةْ لَنَا ذِكْرُ النَّبِيِّ الْكَرِيْم ۞ عَسَى عَسَانَا عَلَى ذِكْرِهْ وَحُبِّهْ نُقِيْم",
              "latin": "Wa a'dhom karomah lana dzikrun-nabiyyil karim, 'asa 'asana 'ala dzikrih wa hubbih nuqim",
              "translation": "Dan kemuliaan terbesar bagi kami adalah mengingat Nabi yang mulia; semoga kami senantiasa teguh dalam mengingat dan mencintai beliau.",
              "english": "And the greatest honor for us is remembering the noble Prophet; may we remain steadfast in remembering him and loving him."
            },
            {
              "id": "yaa-maulidal-musthofa-u7",
              "arab": "دَايِمْ سَحَابُهْ عَلَيَّ تَرْذُمْ عَلَيْنَا رَذِيْم ۞ مَا يَنْقَطِعْ خَيْرُهَا يَا خَيْرَ عَطْوَةْ كَرِيْم",
              "latin": "Daim sahabuh 'alayya tardzum 'alaina rodzim, ma yanqothi' khoiruha ya khoiro 'athwah karim",
              "translation": "Awan (rahmat)-Nya selalu menaungi kami, dan gerimisnya terus membasahi kami; kebaikannya tidak pernah terputus — wahai sebaik-baik pemberian dari Yang Maha Mulia.",
              "english": "His cloud (of mercy) ever shades us, its drizzle falling upon us; its goodness never ceases — O best gift of the Most Generous."
            },
            {
              "id": "yaa-maulidal-musthofa-u8",
              "arab": "اَللهُ يَكْفِي الْبَلَا وَلَا نَشُوْفُ اللَّئِيْم ۞ سَاعَاتُنَا كُلُّهَا تَعْبُرْ لَنَا فِيْ نَعِيْم",
              "latin": "Allahu yakfil-bala wa la nasyufulla-im, sa'atuna kullaha ta'bur lana fi na'im",
              "translation": "Semoga Allah menahan segala bala, hingga kami tidak lagi melihat orang yang sakit. Semua waktu kami berlalu dalam kenikmatan.",
              "english": "May Allah hold back all affliction, so that we no longer see anyone suffering. May all our hours pass in bliss."
            },
            {
              "id": "yaa-maulidal-musthofa-u9",
              "arab": "تَقَعْ عِنَايَةْ وَنُصْبِحْ كُلُّنَا فِيْ نَعِيْم ۞ وَالدَّارُ الْأُخْرَى يَقَعْ مَسْكَنْ جِنَانِ النَّعِيْم",
              "latin": "Taqo' 'inayah wa nushbih kullana fi na'im, waddarul-ukhro yaqo' maskan jinanin-na'im",
              "translation": "Semoga datang pertolongan (Allah), dan kami semua berada dalam kenikmatan. Dan di negeri akhirat kelak, tempat tinggal kami adalah surga-surga penuh kenikmatan.",
              "english": "May divine care come upon us, so that we all find ourselves in bliss; and in the hereafter, may our dwelling be the Gardens of Bliss."
            },
            {
              "id": "yaa-maulidal-musthofa-u10",
              "arab": "عَسَى عَسَى لَا انْكَشَفْ يَا رَبَّنَا قَطُّ خِيْم ۞ يَا رَبَّنَا يَا كَرِيْمَ الْوَجْهِ يَا أَكْرَمْ كَرِيْم",
              "latin": "'Asa 'asa la-nkasyaf ya Robbana qoththu khim, ya Robbana ya karimal-wajhi ya akrom karim",
              "translation": "Semoga, semoga kejelekan kami tidak pernah tersingkap, wahai Tuhan kami, untuk selamanya. Wahai Tuhan kami, wahai Yang Mulia wajah-Nya, wahai sebaik-baik Pemberi.",
              "english": "May our faults never be exposed, O our Lord, ever. O our Lord, O You of the noble Countenance, O most generous of the generous."
            },
            {
              "id": "yaa-maulidal-musthofa-u11",
              "arab": "جُدْ بِالشِّفَا وَالْعَوَافِيْ لِلَّذِيْ هُوَ سَقِيْم ۞ يَا رَبِّ يَا حَيُّ يَا قَيُّوْم جُوْدُكْ عَظِيْم",
              "latin": "Jud bisy-syifa wal-'awafi lilladzi huwa saqim, ya Robbi ya Hayyu ya Qoyyum juduk 'adhim",
              "translation": "Berikanlah kesembuhan dan kesehatan bagi orang yang sakit. Wahai Tuhanku, wahai Yang Maha Hidup, wahai Yang Maha Kekal, pemberian-Mu sungguh agung.",
              "english": "Grant healing and well-being to the one who is ill. O my Lord, O Ever-Living, O Self-Subsisting, Your generosity is immense."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Yaa Robba Makkah",
      "slug": "yaa-robba-makkah",
      "type": "SHALAWAT",
      "description": "Qasidah munajat yang dibuka dengan doa memohon ampun demi Nabi Muhammad — Ya Robba Makkah wash-shofa bi Muhammadin — lalu berlanjut menjadi nasihat adab berguru: suara “kami” pada bait-bait tengahnya adalah para guru/wali yang menuntun muridnya menjaga rahasia, tunduk, dan bertekad kuat hingga berjumpa para perindu di sekeliling mereka, dan ditutup shalawat kepada Nabi selama angin pagi menggerakkan dahan. Qasidah ini masyhur dilantunkan Habib Syech bin Abdul Qodir Assegaf (Ahbabul Musthofa). Sumber teks: wakidyusuf.wordpress.com, dilengkapi dari sumber pembanding karena post blog hanya memuat sebagian bait."
    },
    "expectedUnits": 12,
    "blocks": {
      "sections": [
        {
          "id": "yaa-robba-makkah-s1",
          "title": "Yaa Robba Makkah",
          "units": [
            {
              "id": "yaa-robba-makkah-u1",
              "arab": "يَا رَبَّ مَكَّةَ وَالصَّفَا بِمُحَمَّدٍ ۞ اِغْفِرْ لَنَا يَا سَامِعًا لِدُعَانَا",
              "latin": "Ya robba Makkah wash-shofa bi Muhammadin, ighfir lana ya sami'an li du'ana",
              "translation": "Wahai Tuhan pemilik Makkah dan Shafa, berkat Nabi Muhammad; ampunilah kami, wahai Yang Mendengar doa-doa kami",
              "english": "O Lord of Makkah and As-Safa, for the sake of Muhammad; forgive us, O You who hear our prayers"
            },
            {
              "id": "yaa-robba-makkah-u2",
              "arab": "اُكْتُمْ هَوَانَا إِنْ أَرَدْتَ رِضَانَا ۞ وَاحْذَرْ تُبِيحُ بِسِرِّنَا لِسِوَانَا",
              "latin": "Uktum hawana in arotta ridhona, wahdzar tubihu bi sirrina li siwana",
              "translation": "Sembunyikanlah kecintaan kami jika engkau menghendaki keridhaan kami; dan berhati-hatilah, jangan engkau sebarkan rahasia kami kepada selain kami",
              "english": "Conceal our love if you desire our good pleasure; and beware of disclosing our secret to anyone other than us"
            },
            {
              "id": "yaa-robba-makkah-u3",
              "arab": "وَاخْضَعْ لَنَا إِنْ كُنْتَ رَاجِيَ وَصْلِنَا ۞ وَاتْرُكْ مُنَاكَ إِنْ أَرَدْتَ مُنَانَا",
              "latin": "Wakhdho' lana in kunta rojiya washlina, watruk munaka in arotta munana",
              "translation": "Tunduklah kepada kami jika engkau mengharapkan perjumpaan dengan kami; dan tinggalkanlah cita-citamu jika engkau menghendaki cita-cita kami",
              "english": "Submit to us if you hope for union with us; and leave your own wishes behind if you desire what we desire"
            },
            {
              "id": "yaa-robba-makkah-u4",
              "arab": "وَاجْعَلْ وُقُوفَكَ مَا بَقِيتَ بِبَابِنَا ۞ فَلَعَلَّ أَنْ تُحْظَى بِنَا وَتَرَانَا",
              "latin": "Waj'al wuqufaka ma baqita bi babina, fala'alla an tuhdho bina wa tarona",
              "translation": "Dan jadikanlah berdirimu — selama engkau masih ada — di pintu kami; semoga engkau beruntung dengan kedekatan kepada kami dan dapat melihat kami",
              "english": "And keep standing, as long as you remain, at our door; perhaps you will be granted nearness to us and behold us"
            },
            {
              "id": "yaa-robba-makkah-u5",
              "arab": "أَوَمَا عَلِمْتَ بِأَنَّنَا أَهْلُ الْوَفَا ۞ وَمُحِبُّنَا مَا زَالَ تَحْتَ لِوَانَا",
              "latin": "Awama 'alimta bi annana ahlul wafa, wa muhibbuna ma zala tahta liwana",
              "translation": "Tidakkah engkau tahu bahwa kami adalah orang-orang yang menepati janji; dan para pencinta kami senantiasa berada di bawah bendera kami",
              "english": "Do you not know that we are people who keep their promise; and those who love us remain ever beneath our banner"
            },
            {
              "id": "yaa-robba-makkah-u6",
              "arab": "نَحْنُ الْكِرَامُ فَمَنْ أَتَانَا قَاصِدًا ۞ نَالَ السَّعَادَةَ عِنْدَمَا يَلْقَانَا",
              "latin": "Nahnul kiromu faman atana qoshidan, nalas-sa'adata 'indama yalqona",
              "translation": "Kami adalah orang-orang yang mulia lagi dermawan; barang siapa datang kepada kami dengan suatu tujuan, ia akan memperoleh kebahagiaan ketika berjumpa kami",
              "english": "We are the noble, generous ones; whoever comes to us with a purpose will attain happiness when he meets us"
            },
            {
              "id": "yaa-robba-makkah-u7",
              "arab": "فَانْهَضْ بِعَزْمٍ لَا تَكُنْ مُقَصِّرًا ۞ وَانْظُرْ تَرَ الْعُشَّاقَ حَوْلَ حِمَانَا",
              "latin": "Fanhadh bi 'azmin la takun muqoshshiron, wandzhur tarol 'usysyaqo haula himana",
              "translation": "Maka bangkitlah dengan tekad yang kuat, janganlah engkau menjadi orang yang lalai; dan lihatlah, engkau akan melihat para perindu berada di sekeliling perlindungan kami",
              "english": "So rise with firm resolve and do not fall short; and look — you will see the lovers gathered around our sanctuary"
            },
            {
              "id": "yaa-robba-makkah-u8",
              "arab": "مُسْتَبْشِرِينَ بِنَيْلِ مَا قَدْ أَمَّلُوا ۞ فَرِحِينَ مُذْ نَظَرُوا الْجَمَالَ عِيَانَا",
              "latin": "Mustabsyirina bi naili ma qod ammalu, farihina mudz nadzhorul jamala 'iyana",
              "translation": "Mereka bergembira karena memperoleh apa yang telah mereka cita-citakan; mereka berbahagia sejak memandang Sang Keindahan dengan mata nyata",
              "english": "They rejoice at attaining what they had hoped for; they have been glad ever since they beheld the Beauty with their very eyes"
            },
            {
              "id": "yaa-robba-makkah-u9",
              "arab": "هَامُوا بِعِشْقَتِهِمْ سُكَارَى عِنْدَمَا ۞ كُشِفَ الْحِجَابُ وَشَاهَدُوا مَغْنَانَا",
              "latin": "Hamu bi 'isyqotihim sukaro 'indama, kusyifal hijabu wa syahadu maghnana",
              "translation": "Mereka hanyut, mabuk oleh cinta mereka, ketika hijab tersingkap dan mereka menyaksikan kediaman kami",
              "english": "They wander entranced, intoxicated by their love, when the veil was lifted and they witnessed our abode"
            },
            {
              "id": "yaa-robba-makkah-u10",
              "arab": "فَهُمُ الْمُرَادُ وَلَا يُرَادُ سِوَاهُمُ ۞ فَالْقَلْبُ مُشْتَغِلٌ بِهِمْ وَلْهَانَا",
              "latin": "Fahumul muradu wa la yurodu siwahumu, fal qolbu musytaghilun bihim walhana",
              "translation": "Mereka itulah yang dituju, dan tidak dituju selain mereka; maka hati pun sibuk dengan mereka dan merana karena rindu",
              "english": "They are the ones who are sought, and none besides them is sought; the heart is occupied with them, bewildered by longing"
            },
            {
              "id": "yaa-robba-makkah-u11",
              "arab": "كَرِّرْ لِسَمْعِي ذِكْرَهُمْ وَحَدِيثَهُمْ ۞ تَعْمَلُ مَعِي بِحَيَاتِهِمْ إِحْسَانًا",
              "latin": "Karrir li sam'i dzikrohum wa haditsahum, ta'malu ma'i bi hayatihim ihsana",
              "translation": "Ulang-ulanglah di pendengaranku penyebutan mereka dan pembicaraan tentang mereka; niscaya engkau berbuat kebaikan bersamaku sepanjang hidup mereka",
              "english": "Repeat into my hearing the mention of them and talk of them; you will thereby do goodness with me throughout their lives"
            },
            {
              "id": "yaa-robba-makkah-u12",
              "arab": "ثُمَّ الصَّلَاةُ عَلَى النَّبِيِّ وَآلِهِ ۞ مَا حَرَّكَتْ رِيحُ الصَّبَا أَغْصَانًا",
              "latin": "Tsummash-sholatu 'alan-nabi wa alihi, ma harrokat rihush-shoba aghshona",
              "translation": "Kemudian shalawat tercurah kepada Nabi dan keluarganya, selama angin shaba berhembus menggerakkan dahan-dahan pepohonan",
              "english": "Then blessings be upon the Prophet and his family, as long as the morning breeze keeps stirring the branches"
            }
          ]
        }
      ]
    }
  }
];
