// PAYLOAD SEMENTARA — impor batch 5 qasidah (6 judul) sebagai DRAFT.
// Sumber teks: wakidyusuf.wordpress.com (dipilih Juple dari
// files/list-konten-wakidyusuf.md), masing-masing sudah di-cross-check
// kelengkapan bait ke sumber kedua; Arab direkonstruksi bersih, Latin
// disusun ulang, Artinya dari blog dengan pembersihan/koreksi
// terdokumentasi, English baru. Catatan: entri blog "Alaika
// Bitaqwallah" teridentifikasi sebagai qasidah Imam al-Haddad
// (slug alaika-bitaqwallah-haddad), berbeda dari Syafi'iyah batch 4.
// Dokumen review: qasidah-batch5/*.md di workspace goal. Dihapus
// bersama route import-qasidah-batch5 setelah eksekusi terverifikasi.
import type { ArticleBlocks } from "./db-types.ts";

export interface Batch5Article {
  meta: { title: string; slug: string; type: "SHALAWAT" | "MAULID"; description: string };
  expectedUnits: number;
  blocks: ArticleBlocks;
}

export const BATCH5_ARTICLES: Batch5Article[] = [
  {
    "meta": {
      "title": "Marhaban Yaa Syahro Romadlon",
      "slug": "marhaban-yaa-syahro-romadlon",
      "type": "SHALAWAT",
      "description": "Qasidah Marhaban Yaa Syahro Romadlon adalah qasidah tarhib (penyambutan) bulan Ramadan yang masyhur dilantunkan menjelang dan selama Ramadan, berisi sambutan gembira atas datangnya bulan ibadah dan bulan kebahagiaan yang penuh keutamaan, ditutup dengan shalawat kepada Nabi Muhammad ﷺ, keluarga, dan para sahabatnya; pengarangnya tidak disebutkan dalam sumber. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 19,
    "blocks": {
      "sections": [
        {
          "id": "marhaban-yaa-syahro-romadlon-s1",
          "title": "Marhaban Yaa Syahro Romadlon",
          "units": [
            {
              "arab": "مَرْحَبًا يَا شَهْرَ رَمَضَانْ ۞ مَرْحَبًا شَهْرَ الْعِبَادَةْ",
              "english": "Welcome, O month of Ramadan — welcome, O month of worship.",
              "id": "marhaban-yaa-syahro-romadlon-u1",
              "latin": "Marhaban ya syahro Romadhon, marhaban syahrol 'ibadah",
              "translation": "Selamat datang wahai bulan Ramadan, selamat datang wahai bulan ibadah."
            },
            {
              "arab": "مَرْحَبًا يَا شَهْرَ رَمَضَانْ ۞ مَرْحَبًا شَهْرَ السَّعَادَةْ",
              "english": "Welcome, O month of Ramadan — welcome, O month of happiness.",
              "id": "marhaban-yaa-syahro-romadlon-u2",
              "latin": "Marhaban ya syahro Romadhon, marhaban syahros sa'adah",
              "translation": "Selamat datang wahai bulan Ramadan, selamat datang wahai bulan kebahagiaan."
            },
            {
              "arab": "مَرْحَبًا يَا زَاهِرَ الْآنْ ۞ فِي الْمَجَالِيْ بِالزِّيَادَةْ",
              "english": "Welcome, O you who now arrive radiant, made manifest amid ever-increasing bounty.",
              "id": "marhaban-yaa-syahro-romadlon-u3",
              "latin": "Marhaban ya zahiral an, fil majali biz-ziyadah",
              "translation": "Selamat datang wahai (bulan) yang kini datang bercahaya, tampak nyata dengan bertambahnya anugerah."
            },
            {
              "arab": "لِلْأَخِلَّا قُرَّةُ أَعْيَانْ ۞ أَنْتَ يَا شَهْرَ الْإِفَادَةْ",
              "english": "For the beloved friends of Allah you are the coolness of their eyes — it is you, O month of abundant benefit.",
              "id": "marhaban-yaa-syahro-romadlon-u4",
              "latin": "Lil akhilla qurrotu a'yan, anta ya syahrol ifadah",
              "translation": "Bagi para kekasih (Allah), engkau adalah penyejuk mata; engkaulah, wahai bulan yang penuh pemberian manfaat."
            },
            {
              "arab": "فِيْكَ يُجْلَى الرِّيْنُ وَالرَّانْ ۞ حِيْنَ تُجْلَى الْإِسْتِجَادَةْ",
              "english": "In you the stains and rust of sin upon hearts are polished away, when the opportunity to prostrate is spread open.",
              "id": "marhaban-yaa-syahro-romadlon-u5",
              "latin": "Fika yujlar-rinu war-ron, hina tujlal istijadah",
              "translation": "Di dalammu tersingkap lenyap noda dan karat (dosa) dari hati, saat terbentang kesempatan untuk bersujud."
            },
            {
              "arab": "مَرْحَبًا ذَا خَيْرَ إِيْتِيَانْ ۞ شَهْرُنَا شَهْرُ السِّيَادَةْ",
              "english": "Welcome — the best of all arrivals; our month is the month of supremacy among months.",
              "id": "marhaban-yaa-syahro-romadlon-u6",
              "latin": "Marhaban dza khoiro ityan, syahruna syahrus siyadah",
              "translation": "Selamat datang, wahai sebaik-baik yang datang; bulan kami adalah bulan kepemimpinan (yang paling mulia di antara bulan-bulan)."
            },
            {
              "arab": "أَنْتَ سَيِّدُ كُلِّ الْأَحْيَانْ ۞ وَالْيَتِيْمَةُ فِي الْقِلَادَةْ",
              "english": "You are the master of all times, and the matchless pearl upon the necklace.",
              "id": "marhaban-yaa-syahro-romadlon-u7",
              "latin": "Anta sayyidu kullil ahyan, wal yatimah fil qiladah",
              "translation": "Engkaulah penghulu segala masa, dan permata tunggal yang tak tertandingi pada untaian kalung."
            },
            {
              "arab": "مَرْحَبًا يَا شَهْرَ الْإِحْسَانْ ۞ وَالصَّفَا وَالْاِسْتِفَادَةْ",
              "english": "Welcome, O month of beneficence, of purity, and of benefit received.",
              "id": "marhaban-yaa-syahro-romadlon-u8",
              "latin": "Marhaban ya syahrol ihsan, wash-shofa wal istifadah",
              "translation": "Selamat datang wahai bulan kebaikan, kejernihan, dan kesempatan mengambil manfaat."
            },
            {
              "arab": "مَرْحَبًا مِنْ غَيْرِ حُسْبَانْ ۞ حَيْثُ لَا نُحْصِيْ عِدَادَةْ",
              "english": "Welcome — beyond all reckoning, so many times that we cannot count them.",
              "id": "marhaban-yaa-syahro-romadlon-u9",
              "latin": "Marhaban min ghoiri husban, haitsu la nuhshi 'idadah",
              "translation": "Selamat datang (kuucapkan) tanpa terhitung, hingga kami tidak mampu menghitung banyaknya."
            },
            {
              "arab": "كُلُّ مَسْجِدْ فِيْكَ قَدْ زَانْ ۞ رَبُّهُ بِالنُّوْرِ زَادَهْ",
              "english": "Every mosque is adorned because of you; its Lord has increased it in light.",
              "id": "marhaban-yaa-syahro-romadlon-u10",
              "latin": "Kullu masjid fika qod zan, robbuhu bin-nuri zadah",
              "translation": "Setiap masjid menjadi indah karenamu; Tuhannya menambahkan cahaya kepadanya."
            },
            {
              "arab": "أَنْتَ بَهْجَةُ كُلِّ مَنْ كَانْ ۞ حَازَ مِنْ تَقْوَاهُ زَادَهْ",
              "english": "You are the joy of everyone who exists; blessed is he who has taken his provision from his own God-consciousness.",
              "id": "marhaban-yaa-syahro-romadlon-u11",
              "latin": "Anta bahjatu kulli man kan, haza min taqwahu zadah",
              "translation": "Engkau adalah kegembiraan bagi setiap insan; beruntunglah siapa yang menjadikan takwanya sebagai bekalnya."
            },
            {
              "arab": "كُلُّ مُسْلِمْ فِيْكَ نَشْطَانْ ۞ فِي التَّوَجُّهْ لِلْعِبَادَةْ",
              "english": "Every Muslim is full of energy within you, turning his face toward worship.",
              "id": "marhaban-yaa-syahro-romadlon-u12",
              "latin": "Kullu muslim fika nasython, fit-tawajjuh lil 'ibadah",
              "translation": "Setiap muslim bersemangat di dalammu, menghadap (kepada Allah) untuk beribadah."
            },
            {
              "arab": "وَعَنِ الْآثَامِ كَسْلَانْ ۞ وَلَهُ الطَّاعَاتُ عَادَةْ",
              "english": "And he is sluggish toward sins, while acts of obedience have become his habit.",
              "id": "marhaban-yaa-syahro-romadlon-u13",
              "latin": "Wa 'anil atsami kaslan, walahuth-tho'atu 'adah",
              "translation": "Dan ia malas berbuat dosa, sedangkan ketaatan telah menjadi kebiasaan baginya."
            },
            {
              "arab": "فِيْ تَرَاوِيْحٍ وَقُرْآنْ ۞ قَدْ جَفَا نَوْمَ الْقُعَادَةْ",
              "english": "In tarawih prayers and Qur'an recitation, he has forsaken the sleep of the negligent.",
              "id": "marhaban-yaa-syahro-romadlon-u14",
              "latin": "Fi tarawihin wa Qur'an, qod jafa naumal qu'adah",
              "translation": "Dalam salat tarawih dan (bacaan) Al-Qur'an, ia telah menjauhi tidur orang-orang yang lalai."
            },
            {
              "arab": "مَرْحَبًا يَا عَالِيَ الشَّانْ ۞ مَا انْقَضَى وَصْفُ وِدَادَهْ",
              "english": "Welcome, O exalted in rank, whose portrait of loving affection never comes to an end.",
              "id": "marhaban-yaa-syahro-romadlon-u15",
              "latin": "Marhaban ya 'aliyasy-sya'n, manqodho washfu widadah",
              "translation": "Selamat datang wahai yang tinggi kedudukannya; tidak pernah habis gambaran kecintaan kepadanya."
            },
            {
              "arab": "وَصَلَاةُ الْوَاحِدِ الْمَنَّانْ ۞ مَنْ حَبَا النِّعْمَةَ عِبَادَهْ",
              "english": "And blessings from the One, the Most Generous Bestower, who lavishes His blessings upon His servants —",
              "id": "marhaban-yaa-syahro-romadlon-u16",
              "latin": "Wa sholatul wahidil mannan, man haban-ni'mata 'ibadah",
              "translation": "Dan shalawat dari (Allah) Yang Maha Esa lagi Maha Pemberi anugerah, yang menganugerahkan nikmat kepada hamba-hamba-Nya,"
            },
            {
              "arab": "تَتَغَشَّى فَخْرَ عَدْنَانْ ۞ وَكَذَا الْآلَ الْإِجَادَةْ",
              "english": "may they encompass the Pride of 'Adnan (the Prophet Muhammad ﷺ), and likewise his noble family,",
              "id": "marhaban-yaa-syahro-romadlon-u17",
              "latin": "Tataghassya fakhro 'Adnan, wa kadzal alal ijadah",
              "translation": "semoga (shalawat itu) meliputi kebanggaan keturunan 'Adnan (Nabi Muhammad ﷺ), dan demikian pula keluarga beliau yang mulia,"
            },
            {
              "arab": "وَالصَّحَابَةُ هُمْ وَالْإِخْوَانْ ۞ نِعْمَ أَصْحَابُ الشَّهَادَةْ",
              "english": "and the Companions — they are the brethren — the finest bearers of witness.",
              "id": "marhaban-yaa-syahro-romadlon-u18",
              "latin": "Wash-shohabah hum wal ikhwan, ni'ma ashhabus syahadah",
              "translation": "serta para sahabat — mereka itulah saudara-saudara (kami) — sebaik-baik para pemilik kesaksian."
            },
            {
              "arab": "مَا أَضَاءَ بِالنُّوْرِ رَمَضَانْ ۞ وَانْجَلَى رَيْنُ الْبَلَادَةْ",
              "english": "as long as Ramadan shines forth with its light, and the stain of dull ignorance is lifted away.",
              "id": "marhaban-yaa-syahro-romadlon-u19",
              "latin": "Ma adho-a bin-nuri Romadhon, wanjala roinul baladah",
              "translation": "selama Ramadan bercahaya dengan cahayanya, dan tersingkaplah noda kebodohan (dari hati)."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Adimis Sholata",
      "slug": "adimis-sholata",
      "type": "SHALAWAT",
      "description": "Qasidah Adimis Sholata adalah qasidah anjuran bershalawat yang dibuka dengan seruan 'Adimis-sholata 'alal habib' (terus-meneruslah bershalawat kepada Sang Kekasih): shalawat digambarkan sebagai cahaya dan wewangian, harum-haruman surga dan kunci rahmat, dan doa dianjurkan dibuka serta ditutup dengannya. Pengarangnya tidak tercantum dalam sumber-sumber yang diperiksa. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 12,
    "blocks": {
      "sections": [
        {
          "id": "adimis-sholata-s1",
          "title": "Adimis Sholata",
          "units": [
            {
              "arab": "أَدِمِ الصَّلَاةَ عَلَى الْحَبِيْبِ ۞ فَصَلَاتُهُ نُوْرٌ وَطِيْبٌ",
              "english": "Keep sending blessings, constantly, upon the Beloved — for blessings upon him are light and fragrance.",
              "id": "adimis-sholata-u1",
              "latin": "Adimis-sholata 'alal habib, fasholatuhu nurun wa thib",
              "translation": "Terus-meneruslah bershalawat kepada Sang Kekasih, karena shalawat kepadanya adalah cahaya dan wewangian."
            },
            {
              "arab": "أَنْفَاسُ جَنَّاتٍ مَفَاتِحُ ۞ رَحْمَةٍ نَغَمٌ حَبِيْبٌ",
              "english": "(These blessings are) the scents of Paradise, the keys of mercy, a beloved melody.",
              "id": "adimis-sholata-u2",
              "latin": "Anfasu jannatin mafatihu, rohmatin naghomun habib",
              "translation": "(Shalawat itu) harum-haruman surga, kunci-kunci rahmat, dan melodi yang dicintai."
            },
            {
              "arab": "تَسْرِيْ فَتَبْعَثُ بِالنَّدَى ۞ وَالرِّيِّ لِلرُّوْحِ الْجَدِيْبِ",
              "english": "They flow on, bringing dew and refreshing water to the parched soul.",
              "id": "adimis-sholata-u3",
              "latin": "Tasri fatab'atsu binnada, war-royyi lir-ruhil jadib",
              "translation": "Ia mengalir, lalu menghadirkan embun dan kesegaran air bagi ruh yang kering."
            },
            {
              "arab": "وَتَطُوْفُ بِالرِّضْوَانِ ۞ تَنْثُرُهُ عَلَى كُلِّ الْقُلُوْبِ",
              "english": "And they circle round bearing (divine) good pleasure, scattering it upon every heart.",
              "id": "adimis-sholata-u4",
              "latin": "Wa tathufu bir-ridhwan, tantsuruhu 'ala kullil qulub",
              "translation": "Ia beredar dengan membawa keridaan, lalu menebarkannya ke seluruh hati."
            },
            {
              "arab": "اُدْعُ الْإِلَهَ كَمَا تَشَاءُ ۞ بِهَا تَجِدْهُ يَسْتَجِيْبُ",
              "english": "Call upon God as you wish, through these blessings, and you will find Him answering you.",
              "id": "adimis-sholata-u5",
              "latin": "Ud'ul ilaha kama tasya', biha tajidhu yastajib",
              "translation": "Berdoalah kepada Allah sekehendakmu dengan (perantaraan) shalawat itu, niscaya engkau dapati Dia mengabulkan (doamu)."
            },
            {
              "arab": "وَاطْلُبْ بِهَا مَا تَرْتَجِيْ ۞ مِنْهُ تَنَلْ أَوْفَى نَصِيْبٍ",
              "english": "And ask, through them, for whatever you hope for from Him — you will receive the fullest share.",
              "id": "adimis-sholata-u6",
              "latin": "Wathlub biha ma tartaji, minhu tanal aufa nashib",
              "translation": "Dan mintalah dengan shalawat itu apa yang engkau harapkan dari-Nya, niscaya engkau memperoleh bagian yang paling sempurna."
            },
            {
              "arab": "اَللهُ صَلَّى وَالْمَلَائِكَةُ ۞ الْكِرَامُ عَلَى الْحَبِيْبِ",
              "english": "Allah and the noble angels send blessings upon the Beloved.",
              "id": "adimis-sholata-u7",
              "latin": "Allahu sholla wal mala-ikatu, al-kiramu 'alal habib",
              "translation": "Allah dan para malaikat yang mulia bershalawat kepada Sang Kekasih."
            },
            {
              "arab": "وَأَنَالَ مَنْ صَلَّى عَلَيْهِ ۞ الْخَيْرَ وَالْمَدَدَ الرَّخِيْبَ",
              "english": "And He grants whoever sends blessings upon him goodness and abundant help.",
              "id": "adimis-sholata-u8",
              "latin": "Wa anala man sholla 'alaihi, al-khoiro wal madadar-rokhib",
              "translation": "Dan Dia menganugerahkan kepada orang yang bershalawat kepadanya kebaikan dan pertolongan yang melimpah."
            },
            {
              "arab": "إِنَّ الصَّلَاةَ عَلَى رَسُوْلِ اللهِ ۞ شَمْسٌ لَا تَغِيْبُ",
              "english": "Truly, blessings upon the Messenger of Allah are a sun that never sets.",
              "id": "adimis-sholata-u9",
              "latin": "Innash-sholata 'ala rosulillah, syamsun la taghib",
              "translation": "Sesungguhnya shalawat kepada Rasulullah adalah matahari yang tidak pernah tenggelam."
            },
            {
              "arab": "حَاشَا يُضَامُ مَنِ اسْتَجَارَ ۞ بِهَا وَحَاشَا أَنْ يَخِيْبَ",
              "english": "Never shall one who seeks refuge in these blessings be wronged, and never shall he be disappointed.",
              "id": "adimis-sholata-u10",
              "latin": "Hasya yudhomu manistajaro, biha wa hasya an yakhib",
              "translation": "Tidak mungkin dizalimi orang yang berlindung dengan shalawat, dan tidak mungkin pula ia kecewa."
            },
            {
              "arab": "فَإِذَا دَعَوْتَ اللهَ فِيْ ۞ أَمْرٍ عَظِيْمٍ أَوْ عَصِيْبٍ",
              "english": "So when you call upon Allah in a matter great or hard,",
              "id": "adimis-sholata-u11",
              "latin": "Fa idza da'autallaha fi, amrin 'azhimin aw 'ashib",
              "translation": "Maka apabila engkau berdoa kepada Allah dalam suatu urusan yang besar atau sulit,"
            },
            {
              "arab": "فَابْدَأْ دُعَاءَكَ وَاخْتَتِمْهُ ۞ بِالصَّلَاةِ عَلَى الْحَبِيْبِ",
              "english": "begin your prayer, and seal it, with blessings upon the Beloved.",
              "id": "adimis-sholata-u12",
              "latin": "Fabda' du'a-aka wakhtatimhu, bish-sholati 'alal habib",
              "translation": "maka mulailah doamu dan tutuplah ia dengan shalawat kepada Sang Kekasih."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Ajmaltu fi Washfil Habibi",
      "slug": "ajmaltu-fi-washfil-habibi",
      "type": "SHALAWAT",
      "description": "Qasidah Ajmaltu fi Washfil Habibi adalah dua bait pujian tentang sifat dan kemuliaan Nabi Muhammad SAW karya Habib Ali bin Muhammad al-Habsyi (pengarang Maulid Simtudduror); kedua bait ini adalah bait syair penutup di dalam Simtudduror, yang dalam buku-buku hadroh beredar sebagai qasidah tersendiri. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 2,
    "blocks": {
      "sections": [
        {
          "id": "ajmaltu-fi-washfil-habibi-s1",
          "title": "Ajmaltu fi Washfil Habibi",
          "units": [
            {
              "arab": "أَجْمَلْتُ فِيْ وَصْفِ الْحَبِيْبِ وَشَأْنِهِ ۞ وَلَهُ الْعُلَا فِيْ مَجْدِهِ وَمَكَانِهِ",
              "english": "I have summed up the description of the Beloved and his state — and his is the highest eminence in his glory and his station.",
              "id": "ajmaltu-fi-washfil-habibi-u1",
              "latin": "Ajmaltu fi washfil habibi wa sya'nihi, wa lahul 'ula fi majdihi wa makanihi",
              "translation": "Telah kusimpulkan sifat-sifat Sang Kekasih dan keadaannya: baginya kemuliaan yang tertinggi dalam keagungan dan kedudukannya."
            },
            {
              "arab": "أَوْصَافُ عِزٍّ قَدْ تَعَالَى مَجْدُهَا ۞ أَخَذَتْ عَلَى نَجْمِ السُّهَى بِعِنَانِهِ",
              "english": "Attributes of glory whose splendour has soared on high — they have seized, by their reins, a place above the star as-Suha.",
              "id": "ajmaltu-fi-washfil-habibi-u2",
              "latin": "Awshofu 'izzin qod ta'ala majduha, akhodzat 'ala najmis-suha bi'inanihi",
              "translation": "Sifat-sifat kemuliaan yang kemuliaannya telah menjulang tinggi, (kemuliaan itu) telah menggapai bintang as-Suha yang tinggi dengan tali kekangnya."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Qasidah 'Alaika Bitaqwallah — Imam al-Haddad",
      "slug": "alaika-bitaqwallah-haddad",
      "type": "SHALAWAT",
      "description": "Qasidah 'Alaika Bitaqwallah karya Imam Abdullah bin Alwi al-Haddad adalah syair nasihat tentang takwa kepada Allah dalam keadaan rahasia maupun terang-terangan, membersihkan hati, melawan hawa nafsu, dan mengingat akhirat, dibuka dengan bait 'Alaika bitaqwallahi fis-sirri wal-'alan'. Qasidah ini berbeda dari qasidah berjudul mirip yang masyhur dinisbatkan kepada Imam asy-Syafi'i. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 11,
    "blocks": {
      "sections": [
        {
          "id": "alaika-bitaqwallah-haddad-s1",
          "title": "Qasidah 'Alaika Bitaqwallah — Imam al-Haddad",
          "units": [
            {
              "arab": "عَلَيْكَ بِتَقْوَى اللهِ فِي السِّرِّ وَالْعَلَنْ ۞ وَقَلْبَكَ نَظِّفْهُ مِنَ الرِّجْسِ وَالدَّرَنْ",
              "english": "Hold fast to the fear of Allah, in secret and in public, and cleanse your heart of filth and grime.",
              "id": "alaika-bitaqwallah-haddad-u1",
              "latin": "'Alaika bitaqwallahi fis-sirri wal 'alan, wa qolbaka nazhzhifhu minar-rijsi wad-daron",
              "translation": "Bertakwalah kepada Allah dalam keadaan rahasia maupun terang-terangan, dan bersihkanlah hatimu dari kotoran dan noda."
            },
            {
              "arab": "وَخَالِفْ هَوَى النَّفْسِ الَّتِيْ لَيْسَ قَصْدُهَا ۞ سِوَى الْجَمْعِ لِلدَّارِ الَّتِيْ حَشْوُهَا الْمِحَنْ",
              "english": "Oppose the desire of the soul, whose only aim is amassing for the abode whose very filling is trials.",
              "id": "alaika-bitaqwallah-haddad-u2",
              "latin": "Wakholif hawan-nafsil-lati laisa qoshduha, siwal jam'i liddaril-lati hasywuhal mihan",
              "translation": "Lawanlah hawa nafsu yang tujuannya tidak lain hanyalah mengumpulkan (harta) untuk negeri (dunia) yang isinya penuh ujian."
            },
            {
              "arab": "وَإِنْ تَرْضَ بِالْمَقْسُوْمِ عِشْتَ مُنَعَّمًا ۞ وَإِنْ لَمْ تَكُنْ تَرْضَى بِهِ عِشْتَ فِيْ حَزَنْ",
              "english": "If you are content with what has been apportioned, you will live in comfort; and if you are not content with it, you will live in sorrow.",
              "id": "alaika-bitaqwallah-haddad-u3",
              "latin": "Wa in tardho bil maqsumi 'isyta muna''ama, wa in lam takun tardho bihi 'isyta fi hazan",
              "translation": "Jika engkau rida dengan pembagian (rezeki) yang telah ditentukan, niscaya engkau hidup dalam kenikmatan; dan jika engkau tidak rida dengannya, niscaya engkau hidup dalam kesedihan."
            },
            {
              "arab": "وَصَاحِبْ ذَوِي الْمَعْرُوْفِ وَالْعِلْمِ وَالْهُدَى ۞ وَجَانِبْ وَلَا تَصْحَبْ هُدِيْتَ مَنِ افْتَتَنْ",
              "english": "Keep company with people of kindness, knowledge, and guidance; shun — and do not befriend, may you be guided — anyone who has fallen into temptation.",
              "id": "alaika-bitaqwallah-haddad-u4",
              "latin": "Washohib dzawil ma'rufi wal 'ilmi wal huda, wa janib wala tashhab hudita manif-tatan",
              "translation": "Bersahabatlah dengan orang-orang yang baik, berilmu, dan mendapat petunjuk; jauhilah dan janganlah bersahabat — semoga engkau diberi petunjuk — dengan orang yang terjerumus (dalam fitnah)."
            },
            {
              "arab": "وَصَلِّ بِقَلْبٍ حَاضِرٍ غَيْرِ غَافِلٍ ۞ وَلَا تَلْهُ عَنْ ذِكْرِ الْمَقَابِرِ وَالْكَفَنْ",
              "english": "Pray with a heart that is present, not heedless, and do not be distracted from remembering the graves and the shroud.",
              "id": "alaika-bitaqwallah-haddad-u5",
              "latin": "Wa sholli biqolbin hadhirin ghoiri ghofil, wala talhu 'an dzikril maqobiri wal kafan",
              "translation": "Salatlah dengan hati yang hadir (khusyuk) dan tidak lalai, dan janganlah lalai dari mengingat kubur dan kain kafan."
            },
            {
              "arab": "وَمَا هَذِهِ الدُّنْيَا بِدَارِ إِقَامَةٍ ۞ وَمَا هِيَ إِلَّا كَالطَّرِيْقِ إِلَى الْوَطَنْ",
              "english": "This world is not an abode of permanent residence; it is nothing but a road toward the homeland.",
              "id": "alaika-bitaqwallah-haddad-u6",
              "latin": "Wama hadzihid-dunya bidari iqomah, wama hiya illa kath-thoriqi ilal wathon",
              "translation": "Dunia ini bukanlah negeri tempat menetap, dan ia tiada lain hanyalah jalan menuju tanah air (akhirat)."
            },
            {
              "arab": "وَمَا الدَّارُ إِلَّا جَنَّةٌ لِمَنِ اتَّقَى ۞ وَنَارٌ لِمَنْ لَمْ يَتَّقِ اللهَ فَاسْمَعَنْ",
              "english": "The abode is nothing but Paradise for whoever is God-fearing, and Fire for whoever does not fear Allah — so listen well.",
              "id": "alaika-bitaqwallah-haddad-u7",
              "latin": "Wamad-daru illa jannatun limanit-taqo, wa narun liman lam yattaqillaha fasma'an",
              "translation": "Negeri (yang kekal) itu tiada lain adalah surga bagi orang yang bertakwa, dan neraka bagi orang yang tidak bertakwa kepada Allah — maka dengarkanlah."
            },
            {
              "arab": "فَيَا رَبِّ عَامِلْنَا بِلُطْفِكَ وَاكْفِنَا ۞ بِجُوْدِكَ وَاعْصِمْنَا مِنَ الزَّيْغِ وَالْفِتَنْ",
              "english": "O our Lord, treat us with Your gentleness and suffice us; by Your generosity, protect us from deviation and trials.",
              "id": "alaika-bitaqwallah-haddad-u8",
              "latin": "Faya robbi 'amilna biluthfika wakfina, bijudika wa'shimna minaz-zaighi wal fitan",
              "translation": "Ya Tuhan kami, perlakukanlah kami dengan kelembutan-Mu dan cukupilah kami; dengan kedermawanan-Mu, peliharalah kami dari kesesatan dan fitnah."
            },
            {
              "arab": "وَوَفِّقْ وَسَدِّدْ وَاصْلِحِ الْكُلَّ وَاهْدِنَا ۞ لِسُنَّةِ خَيْرِ الْخَلْقِ وَالسَّيِّدِ الْحَسَنْ",
              "english": "Grant us success, set us straight, put us all right, and guide us to the Sunnah of the best of creation and the noble master.",
              "id": "alaika-bitaqwallah-haddad-u9",
              "latin": "Wawaffiq wasaddid washlihil kulla wahdina, lisunnati khoiril kholqi was-sayyidil hasan",
              "translation": "Berilah kami taufik, luruskanlah dan perbaikilah (urusan) kami semua, dan tunjukilah kami kepada sunnah sebaik-baik makhluk dan sayyid yang mulia."
            },
            {
              "arab": "عَلَيْهِ صَلَاةُ اللهِ ثُمَّ سَلَامُهُ ۞ صَلَاةً وَتَسْلِيْمًا إِلَى آخِرِ الزَّمَنْ",
              "english": "Upon him be Allah's blessings, and then His peace — blessings and peace until the end of time.",
              "id": "alaika-bitaqwallah-haddad-u10",
              "latin": "'Alaihi sholatullahi tsumma salamuh, sholatan wa tasliman ila akhiriz-zaman",
              "translation": "Ke atas beliau shalawat Allah dan salam-Nya — shalawat dan salam hingga akhir zaman."
            },
            {
              "arab": "وَآلٍ كِرَامٍ ثُمَّ صَحْبٍ وَتَابِعٍ ۞ بِهِمْ نَسْأَلُ اللهَ السَّلَامَةَ مِنَ الْفِتَنْ",
              "english": "And upon his noble family, then his companions and their followers — through them we ask Allah for safety from trials.",
              "id": "alaika-bitaqwallah-haddad-u11",
              "latin": "Wa alin kiromin tsumma shohbin wa tabi', bihim nas-alullahas-salamata minal fitan",
              "translation": "Dan (shalawat itu) untuk keluarga beliau yang mulia, kemudian para sahabat dan para pengikut; dengan (berkah) mereka kami memohon kepada Allah keselamatan dari fitnah."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Annabi Shollu 'Alaih",
      "slug": "annabi-shollu-alaih",
      "type": "SHALAWAT",
      "description": "Qasidah Annabi Shollu 'Alaih adalah qasidah ajakan bershalawat dan pujian kepada Nabi Muhammad, dibuka dengan seruan 'Annabi shollu 'alaih' (bershalawatlah kepada Nabi), yang memuji kemuliaan beliau dan mukjizat Al-Qur'an serta menyebut Al-Hasan dan Al-Husain sebagai penyejuk mata beliau; qasidah ini masyhur dilantunkan Habib Syech bin Abdul Qadir Assegaf. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 7,
    "blocks": {
      "sections": [
        {
          "id": "annabi-shollu-alaih-s1",
          "title": "Annabi Shollu 'Alaih",
          "units": [
            {
              "arab": "اَلنَّبِيْ صَلُّوْا عَلَيْهْ صَلَوَاتُ اللهِ عَلَيْهْ ۞ وَيَنَالُ الْبَرَكَاتْ كُلُّ مَنْ صَلَّى عَلَيْهْ",
              "english": "Send blessings upon the Prophet — may Allah's blessings be upon him. And everyone who sends blessings upon him will attain blessings.",
              "id": "annabi-shollu-alaih-u1",
              "latin": "Annabi shollu 'alaih, sholawatullahi 'alaih, wa yanalul barokat, kullu man sholla 'alaih",
              "translation": "Bershalawatlah kepada sang Nabi, semoga shalawat Allah tercurah kepadanya. Dan akan memperoleh keberkahan setiap orang yang bershalawat kepadanya."
            },
            {
              "arab": "اَلنَّبِيْ يَا حَاضِرِيْنْ اِعْلَمُوْا عِلْمَ الْيَقِيْنْ ۞ اِنَّ رَبَّ الْعَالَمِيْنْ فَرَضَ الصَّلَوَاتِ عَلَيْهْ",
              "english": "He is the Prophet, O you who are present; know with certain knowledge that the Lord of the worlds has made sending blessings upon him an obligation.",
              "id": "annabi-shollu-alaih-u2",
              "latin": "Annabi ya hadhirin, i'lamu 'ilmal yaqin, inna robbal 'alamin, farodhosh-sholawati 'alaih",
              "translation": "Dialah sang Nabi, wahai orang-orang yang hadir; ketahuilah dengan ilmu yakin (keyakinan yang pasti), sesungguhnya Tuhan semesta alam telah mewajibkan bershalawat kepadanya."
            },
            {
              "arab": "اَلنَّبِيْ يَا مَنْ حَضَرْ اَلنَّبِيْ خَيْرُ الْبَشَرْ ۞ وَدَنَا لَهُ الْقَمَرْ وَالْغَزَالْ سَلَّمْ عَلَيْهْ",
              "english": "He is the Prophet, O you who are present, the best of mankind. The moon drew near to him, and the gazelle greeted him with peace.",
              "id": "annabi-shollu-alaih-u3",
              "latin": "Annabi ya man hadhor, annabi khoirul basyar, wa dana lahul qomar, wal ghozal sallam 'alaih",
              "translation": "Dialah sang Nabi, wahai orang yang hadir, Nabi sebaik-baik manusia. Bulan pun mendekat kepadanya, dan kijang memberi salam kepadanya."
            },
            {
              "arab": "اَلنَّبِيْ ذَاكَ الْعَرُوْسْ ذِكْرُهُ يُحْيِ النُّفُوْسْ ۞ اَلنَّصَارَى وَالْمَجُوْسْ أَسْلَمُوْا بَيْنَ يَدَيْهْ",
              "english": "He is the Prophet, like a bridegroom; the mention of him revives souls. The Christians and the Magians embraced Islam before him.",
              "id": "annabi-shollu-alaih-u4",
              "latin": "Annabi dzakal 'arus, dzikruhu yuhyin-nufus, an-nashoro wal majus, aslamu baina yadaih",
              "translation": "Dialah sang Nabi, laksana seorang mempelai; menyebutnya menghidupkan jiwa-jiwa. Orang-orang Nasrani dan Majusi masuk Islam di hadapannya."
            },
            {
              "arab": "اَلنَّبِيْ ذَاكَ الْمَلِيْحْ قَوْلُهُ قَوْلٌ صَحِيْحْ ۞ وَالْقُرْآنُ مُعْجِزٌ فَصِيْحْ أَنْزَلَهُ الْمَوْلَى عَلَيْهْ",
              "english": "He is the Prophet, the handsome one; his speech is true speech. And the Qur'an is an eloquent miracle, sent down upon him by the Lord.",
              "id": "annabi-shollu-alaih-u5",
              "latin": "Annabi dzakal malih, qauluhu qaulun shohih, wal-Qur'anu mu'jizun fashih, anzalahul maula 'alaih",
              "translation": "Dialah sang Nabi yang rupawan; perkataannya adalah perkataan yang benar. Dan Al-Qur'an adalah mukjizat yang fasih, yang diturunkan oleh Allah kepadanya."
            },
            {
              "arab": "اَلنَّبِيْ يَا أَهْلَ الْعَرَبْ اَلنَّبِيْ مَدْحُهُ طَرَبْ ۞ اَلْحَبِيْبْ عَالِي النَّسَبْ صَلَوَاتُ اللهِ عَلَيْهْ",
              "english": "He is the Prophet, O people of the Arabs; praising him is delight itself. The beloved of noble lineage — may Allah's blessings be upon him.",
              "id": "annabi-shollu-alaih-u6",
              "latin": "Annabi ya ahlal 'arob, annabi madhuhu thorob, al-habib 'alin-nasab, sholawatullahi 'alaih",
              "translation": "Dialah sang Nabi, wahai orang-orang Arab; memujinya adalah kegembiraan. Sang kekasih yang luhur nasabnya, semoga shalawat Allah tercurah kepadanya."
            },
            {
              "arab": "اَلْحَسَنْ ثُمَّ الْحُسَيْنْ لِلنَّبِيْ قُرَّةُ الْعَيْنْ ۞ نُوْرُهُمْ كَالْكَوْكَبَيْنْ جَدُّهُمْ صَلُّوْا عَلَيْهْ",
              "english": "Al-Hasan, then Al-Husain, are the delight of the Prophet's eyes. The light of the two of them is like two stars; their grandfather — send blessings upon him.",
              "id": "annabi-shollu-alaih-u7",
              "latin": "Al-Hasan tsummal Husain, linnabi qurrotul 'ain, nuruhum kal kaukabain, jadduhum shollu 'alaih",
              "translation": "Al-Hasan kemudian Al-Husain adalah penyejuk mata bagi sang Nabi. Cahaya mereka berdua seperti dua bintang; kakek mereka, bershalawatlah kepadanya."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Bijahil Musthofal Mukhtar",
      "slug": "bijahil-musthofal-mukhtar",
      "type": "SHALAWAT",
      "description": "Qasidah Bijahil Musthofal Mukhtar adalah qasidah doa dan tawassul yang populer dibawakan Habib Syech bin Abdul Qadir Assegaf, dibuka dengan permohonan Sa'altullaha barina (aku memohon kepada Allah, Sang Pencipta kami) agar cita-cita tercapai dan kesusahan dihilangkan, serta memuat bait-bait bernuansa tasawuf tentang kehadiran dan kerinduan kepada sang kekasih; pengarangnya tidak diketahui secara pasti. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 7,
    "blocks": {
      "sections": [
        {
          "id": "bijahil-musthofal-mukhtar-s1",
          "title": "Bijahil Musthofal Mukhtar",
          "units": [
            {
              "id": "bijahil-musthofal-mukhtar-u1",
              "arab": "سَأَلْتُ اللهَ بَارِيْنَا يُبَلِّغْنَا أَمَانِيْنَا ۞ وَيُذْهِبْ مِنَّا الْأَكْدَارْ",
              "latin": "Sa'altullaha barina yuballighna amanina, wa yudzhib minnanal akdar",
              "translation": "Aku memohon kepada Allah, Sang Pencipta kami, semoga Dia menyampaikan kami kepada cita-cita kami dan menghilangkan segala kesusahan dari kami.",
              "english": "I asked Allah, our Creator, to bring us to our hopes and wishes, and to take away all troubles from us."
            },
            {
              "id": "bijahil-musthofal-mukhtar-u2",
              "arab": "وَيُحْيِيْنَا عَلَى التَّقْوَى بِلَا مِحْنَةٍ وَلَا بَلْوَى ۞ بِجَاهِ الْمُصْطَفَى الْمُخْتَارْ",
              "latin": "Wa yuhyina 'alat-taqwa bila mihnah wala balwa, bijahil musthofal mukhtar",
              "translation": "Dan menghidupkan kami di atas ketakwaan, tanpa ujian dan tanpa cobaan, berkat kedudukan al-Musthofa al-Mukhtar (Nabi Muhammad, Sang Terpilih).",
              "english": "And to let us live in God-consciousness, without trial and without affliction, by the rank of al-Musthafa al-Mukhtar, the Chosen One."
            },
            {
              "id": "bijahil-musthofal-mukhtar-u3",
              "arab": "نُشَاهِدْ حُسْنَ مَنْ نَهْوَى وَتَدْنُوْ مِنَّا عَلْوَى ۞ نُشَاهِدْهَا بِهَذِهِ الدَّارْ",
              "latin": "Nusyahid husna man nahwa wa tadnu minnana 'alwa, nusyahidha bihadzid-dar",
              "translation": "Kami menyaksikan keindahan orang yang kami cintai, dan 'Alwa mendekat kepada kami; kami menyaksikannya di tempat ini.",
              "english": "We behold the beauty of the one we love, and 'Alwa draws near to us; we behold it in this abode."
            },
            {
              "id": "bijahil-musthofal-mukhtar-u4",
              "arab": "وَمَا عَلْوَى سِوَى ذَاتِيْ وَأَوْصَافِيْ وَحَالَاتِيْ ۞ وَمِنْهَا دَارَتِ الْأَدْوَارْ",
              "latin": "Wa ma 'alwa siwa dzati wa awshofi wa halati, wa minha daratil adwar",
              "translation": "Dan tiada 'Alwa selain zatku, sifat-sifatku, dan keadaan-keadaanku; dan darinya berputarlah segala putaran.",
              "english": "And 'Alwa is nothing but my essence, my attributes, and my states; and from it all the cycles turn."
            },
            {
              "id": "bijahil-musthofal-mukhtar-u5",
              "arab": "حَضَرْنَا عِنْدَمَا غِبْنَا وَطُلْنَا عِنْدَمَا طِبْنَا ۞ وَنِلْنَا غَايَةَ الْأَوْطَارْ",
              "latin": "Hadhorna 'indama ghibna wa thulna 'indama thibna, wa nilna ghoyatal awthar",
              "translation": "Kami hadir ketika kami tiada, dan kami menjangkau jauh ketika kami baik; dan kami memperoleh puncak segala tujuan.",
              "english": "We were present when we were absent, and we reached far when we were sound; and we attained the utmost of all aims."
            },
            {
              "id": "bijahil-musthofal-mukhtar-u6",
              "arab": "فَيَا رِيْحَ الصَّبَا هُبِّيْ خُذِيْ قَوْلِيْ إِلَى حِبِّيْ ۞ وَبُثِّيْ عِنْدَهُ الْأَسْرَارْ",
              "latin": "Fa ya rihash-shoba hubbi, khudzi qouli ila hibbi, wa butstsi 'indahul asror",
              "translation": "Wahai angin shaba, berhembuslah! Bawalah ucapanku kepada kekasihku, dan sebarkanlah rahasia-rahasia ini di sisinya.",
              "english": "O shaba wind, blow! Take my words to my beloved, and spread these secrets before him."
            },
            {
              "id": "bijahil-musthofal-mukhtar-u7",
              "arab": "وَقُوْلِيْ عَبْدُكُمْ بِالْبَابْ يُنَادِيْ أَيُّهَا الْأَحْبَابْ ۞ أَغِيْثُوْا مَنْ أَتَى مُخْتَارْ",
              "latin": "Wa qouli 'abdukum bil bab, yunadi ayyuhal ahbab, aghitsu man ata mukhtar",
              "translation": "Dan katakanlah: Hambamu berada di depan pintu, memanggil, 'Wahai para kekasih, tolonglah orang yang datang kepada al-Mukhtar.'",
              "english": "And say: Your servant is at the door, calling out, 'O beloved ones, help the one who has come to al-Mukhtar.'"
            }
          ]
        }
      ]
    }
  }
];
