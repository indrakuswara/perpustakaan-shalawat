// PAYLOAD SEMENTARA — impor batch 6 qasidah (5 judul) sebagai DRAFT.
// Sumber teks: wakidyusuf.wordpress.com (dipilih Juple dari
// files/list-konten-wakidyusuf.md), masing-masing sudah di-cross-check
// kelengkapan bait ke sumber kedua; Arab direkonstruksi bersih, Latin
// disusun ulang, Artinya dari blog dengan pembersihan/koreksi
// terdokumentasi, English baru. Catatan: "Sholawat Kawakib" dari seri
// yang sama SENGAJA tidak diimpor — terbukti duplikat persis
// Sholatullahi Ma Lahat Kawakib (batch 4). Dokumen review:
// qasidah-batch6/*.md di workspace goal. Dihapus bersama route
// import-qasidah-batch6 setelah eksekusi terverifikasi.
import type { ArticleBlocks } from "./db-types.ts";

export interface Batch6Article {
  meta: { title: string; slug: string; type: "SHALAWAT" | "MAULID"; description: string };
  expectedUnits: number;
  blocks: ArticleBlocks;
}

export const BATCH6_ARTICLES: Batch6Article[] = [
  {
    "meta": {
      "title": "Birosulillahi wal Badawi",
      "slug": "birosulillahi-wal-badawi",
      "type": "SHALAWAT",
      "description": "Qasidah Birosulillahi wal Badawi adalah qasidah tawassul yang dibuka dengan seruan 'Birosulillahi wal badawî' (demi Rasulullah dan al-Badawi) — frasa yang menjadi pengunci (radif) di akhir setiap baitnya: penyair bertawassul dengan Rasulullah, al-Badawi, dan orang-orang Bani 'Alawi yang menempuh jalan kenabian, lalu memohon pertolongan Allah sambil mengakui dosa besarnya dan mengakui dirinya tidak mempunyai amal, dan menutupnya dengan shalawat kepada Nabi beserta keluarga, sahabat, dan pengikutnya. Pengarangnya tidak tercantum dalam sumber-sumber yang diperiksa. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 14,
    "blocks": {
      "sections": [
        {
          "id": "birosulillahi-wal-badawi-s1",
          "title": "Birosulillahi wal Badawi",
          "units": [
            {
              "arab": "بِرَسُوْلِ اللهِ وَالْبَدَوِيْ ۞ وَرِجَالٍ مِنْ بَنِيْ عَلَوِيْ",
              "english": "By the Messenger of Allah and al-Badawi, and by the men of Bani 'Alawi,",
              "id": "birosulillahi-wal-badawi-u1",
              "latin": "Birosulillahi wal badawî, wa rijalin min bani 'Alawi",
              "translation": "Demi Rasulullah dan al-Badawi, dan demi orang-orang dari Bani 'Alawi,"
            },
            {
              "arab": "سَلَكُوْا فِي الْمَنْهَجِ النَّبَوِيْ ۞ بِرَسُوْلِ اللهِ وَالْبَدَوِيْ",
              "english": "who travelled the Prophetic path — by the Messenger of Allah and al-Badawi.",
              "id": "birosulillahi-wal-badawi-u2",
              "latin": "Salaku fil manhajin-nabawi, birosulillahi wal badawî",
              "translation": "mereka yang menempuh jalan kenabian — demi Rasulullah dan al-Badawi."
            },
            {
              "arab": "رَبِّ إِنِّيْ قَدْ مَدَدْتُ يَدِيْ ۞ مِنْكَ أَرْجُوْ فَائِضَ الْمَدَدِ",
              "english": "My Lord, I have indeed stretched out my hand; from You I hope for an overflowing of help.",
              "id": "birosulillahi-wal-badawi-u3",
              "latin": "Robbi inni qod madadtu yadi, minka arju fa-idhol madadi",
              "translation": "Tuhanku, sungguh aku telah mengulurkan tanganku; dari-Mu kuharapkan luapan pertolongan."
            },
            {
              "arab": "فَأَغِثْنِيْ أَنْتَ مُعْتَمَدِيْ ۞ بِرَسُوْلِ اللهِ وَالْبَدَوِيْ",
              "english": "So come to my aid — You are my reliance — by the Messenger of Allah and al-Badawi.",
              "id": "birosulillahi-wal-badawi-u4",
              "latin": "Fa-aghitsni anta mu'tamadi, birosulillahi wal badawî",
              "translation": "Maka tolonglah aku — Engkaulah tempat bersandarku — demi Rasulullah dan al-Badawi."
            },
            {
              "arab": "قُمْتُ بِالْأَعْتَابِ مُعْتَرِفًا ۞ لِعَظِيْمِ الذَّنْبِ مُقْتَرِفًا",
              "english": "I stood at the threshold, confessing that I have committed a grave sin,",
              "id": "birosulillahi-wal-badawi-u5",
              "latin": "Qumtu bil a'tabi mu'tarifan, li'azhimidz-dzanbi muqtarifan",
              "translation": "Aku berdiri di ambang pintu (rahmat-Mu) seraya mengakui, bahwa aku telah melakukan dosa yang besar,"
            },
            {
              "arab": "مِنْ بِحَارِ الْفَضْلِ مُغْتَرِفًا ۞ بِرَسُوْلِ اللهِ وَالْبَدَوِيْ",
              "english": "scooping (grace) from the seas of Your bounty — by the Messenger of Allah and al-Badawi.",
              "id": "birosulillahi-wal-badawi-u6",
              "latin": "Min biharil fadli mughtarifan, birosulillahi wal badawî",
              "translation": "sambil meraup (karunia) dari lautan kemurahan-Mu — demi Rasulullah dan al-Badawi."
            },
            {
              "arab": "جُوْدُكَ الْمَأْلُوْفُ أَطْمَعَنِيْ ۞ وَإِلَى رَجْوَاكَ أَرْجَعَنِيْ",
              "english": "Your well-known generosity has filled me with hope, and brought me back to hoping in You.",
              "id": "birosulillahi-wal-badawi-u7",
              "latin": "Judukal ma'lufi athma'ani, wa ila rojwaaka arja'ani",
              "translation": "Kedermawanan-Mu yang telah dikenal itu membuatku sangat berharap, dan mengembalikanku untuk berharap kepada-Mu."
            },
            {
              "arab": "رَبِّ فَأَذْهِبْ مَا يُرَوِّعُنِيْ ۞ بِرَسُوْلِ اللهِ وَالْبَدَوِيْ",
              "english": "My Lord, then take away whatever frightens me — by the Messenger of Allah and al-Badawi.",
              "id": "birosulillahi-wal-badawi-u8",
              "latin": "Robbi fadzhib ma yurowwi'uni, birosulillahi wal badawî",
              "translation": "Tuhanku, maka hilangkanlah apa pun yang menakutkanku — demi Rasulullah dan al-Badawi."
            },
            {
              "arab": "بَاسِطٌ كَفِّيْ وَلِيْ أَمَلٌ ۞ فِيْكَ لَكِنْ لَيْسَ لِيْ عَمَلٌ",
              "english": "I spread out my palms, and I have hope in You, yet I have no deeds (to offer).",
              "id": "birosulillahi-wal-badawi-u9",
              "latin": "Basithun kaffi wa li amalun, fika lakin laisa li 'amalun",
              "translation": "Aku membentangkan telapak tanganku, dan aku mempunyai harapan kepada-Mu, tetapi aku tidak mempunyai amal."
            },
            {
              "arab": "بِافْتِقَارِيْ جِئْتُ أَبْتَهِلُ ۞ بِرَسُوْلِ اللهِ وَالْبَدَوِيْ",
              "english": "In my utter need I have come, pleading earnestly — by the Messenger of Allah and al-Badawi.",
              "id": "birosulillahi-wal-badawi-u10",
              "latin": "Biftiqori ji'tu abtahilu, birosulillahi wal badawî",
              "translation": "Dengan rasa sangat membutuhkan-Mu aku datang memohon dengan sepenuh hati — demi Rasulullah dan al-Badawi."
            },
            {
              "arab": "صَلَوَاتُ اللهِ ذِي الْكَرَمِ ۞ يَتَغَشَّى صَفْوَةَ الْأُمَمِ",
              "english": "May the blessings of Allah, the Lord of Generosity, envelop the choicest of mankind,",
              "id": "birosulillahi-wal-badawi-u11",
              "latin": "Sholawatullahi dzil karomi, yataghossya shofwatal umami",
              "translation": "Semoga shalawat (rahmat) Allah Yang Maha Pemurah meliputi pilihan terbaik di antara umat manusia,"
            },
            {
              "arab": "مَا سَرَى رَكْبٌ إِلَى الْحَرَمِ ۞ بِرَسُوْلِ اللهِ وَالْبَدَوِيْ",
              "english": "for as long as caravans still journey to the Sacred Sanctuary — by the Messenger of Allah and al-Badawi.",
              "id": "birosulillahi-wal-badawi-u12",
              "latin": "Ma saro rokbun ilal haromi, birosulillahi wal badawî",
              "translation": "selama kafilah masih berjalan menuju Tanah Haram — demi Rasulullah dan al-Badawi."
            },
            {
              "arab": "وَعَلَى آلِ النَّبِيِّ الْكُرَمَا ۞ وَعَلَى أَصْحَابِهِ الْعُلَمَا",
              "english": "And (may those blessings be) upon the Prophet's noble family, and upon his learned Companions,",
              "id": "birosulillahi-wal-badawi-u13",
              "latin": "Wa 'ala alin-nabiyyil kuroma, wa 'ala ash-habihil 'ulama",
              "translation": "Dan (semoga shalawat itu) atas keluarga Nabi yang mulia, dan atas para sahabatnya yang alim,"
            },
            {
              "arab": "وَعَلَى أَتْبَاعِهِ الْحُكَمَاءْ ۞ بِرَسُوْلِ اللهِ وَالْبَدَوِيْ",
              "english": "and upon his wise followers — by the Messenger of Allah and al-Badawi.",
              "id": "birosulillahi-wal-badawi-u14",
              "latin": "Wa 'ala atba'ihil hukama, birosulillahi wal badawî",
              "translation": "dan atas para pengikutnya yang bijaksana — demi Rasulullah dan al-Badawi."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Huwannur",
      "slug": "huwannur",
      "type": "SHALAWAT",
      "description": "Qasidah Huwannur adalah qasidah pujian dan kerinduan kepada Nabi Muhammad ﷺ karya Habib Ali bin Muhammad al-Habsyi (pengarang Maulid Simtudduror), dibuka dengan 'Huwannur yahdil ha-irina dhiya-uhu' (Dialah cahaya yang sinarnya memberi petunjuk kepada orang-orang yang bimbang): Nabi digambarkan sebagai cahaya petunjuk dan pemilik panji naungan di padang mahsyar, lalu pengarang mengungkapkan cinta dan rindunya — menyebut namanya sendiri, 'Ali', menjelang akhir — dan menutupnya dengan shalawat serta pengulangan bait pembuka. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 23,
    "blocks": {
      "sections": [
        {
          "id": "huwannur-s1",
          "title": "Huwannur",
          "units": [
            {
              "arab": "هُوَ النُّوْرُ يَهْدِي الْحَائِرِيْنَ ضِيَاؤُهُ ۞ وَفِي الْحَشْرِ ظِلُّ الْمُرْسَلِيْنَ لِوَاؤُهُ",
              "english": "He is the Light whose radiance guides those who wander bewildered; and at the Gathering, his banner will be a shade.",
              "id": "huwannur-u1",
              "latin": "Huwannur yahdil ha-irina dhiya-uhu, wa fil hasyri zhillul mursalina liwa-uhu",
              "translation": "Dialah (Nabi ﷺ) pelita cahaya yang memberi petunjuk kepada orang-orang yang bimbang; dan di padang mahsyar, panjinya menjadi naungan."
            },
            {
              "arab": "تَلَقَّى مِنَ الْغَيْبِ الْمُجَرَّدِ حِكْمَةً ۞ بِهَا أَمْطَرَتْ فِي الْخَافِقَيْنِ سَمَاؤُهُ",
              "english": "He received wisdom directly from the unseen realm, with no intermediary; through it, his heaven rained (mercy) over the East and the West.",
              "id": "huwannur-u2",
              "latin": "Talaqqa minal ghoibil mujarrodi hikmatan, biha amthorot fil khofiqoini sama-uhu",
              "translation": "Ia menerima hikmah langsung dari alam gaib tanpa perantara apa pun; dengan hikmah itu, langitnya menghujani (rahmat) ke segala penjuru timur dan barat."
            },
            {
              "arab": "وَمَشْهُوْدُ أَهْلِ الْحَقِّ مِنْهُ لَطَائِفٌ ۞ تُخَبِّرُ أَنَّ الْمَجْدَ وَالشَّأْوَ شَاؤُهُ",
              "english": "What the people of truth witness from him are tender graces, declaring that glory and the loftiest rank are his by his own will.",
              "id": "huwannur-u3",
              "latin": "Wa masyhudu ahlil haqqi minhu latho-if, tukhobbiru annal majda wasy-sya'wa sya-uhu",
              "translation": "Apa yang disaksikan para ahli kebenaran darinya adalah kelembutan-kelembutan yang mengabarkan bahwa kemuliaan dan derajat tertinggi adalah kehendaknya."
            },
            {
              "arab": "فَلِلَّهِ مَا لِلْعَيْنِ مِنْ مَشْهَدِ اجْتِلَا ۞ يَعِزُّ عَلَى أَهْلِ الْحِجَابِ اجْتِلَاؤُهُ",
              "english": "By Allah, how splendid is the spectacle unveiled before the eye — an unveiling too exalted for those who are still veiled.",
              "id": "huwannur-u4",
              "latin": "Falillahi ma lil-'aini min masyhadijtila, ya'izzu 'ala ahlil hijabijtila-uhu",
              "translation": "Demi Allah, betapa agung apa yang disaksikan mata dalam pemandangan yang tersingkap ini; tersingkapnya pemandangan itu terlalu mulia bagi orang-orang yang masih terhijab."
            },
            {
              "arab": "أَيَا نَازِحًا عَنِّيْ وَمَسْكَنُهُ الْحَشَا ۞ أَجِبْ مَنْ مَلَا كُلَّ النَّوَاحِيْ نِدَاؤُهُ",
              "english": "O you who are far from me, though your dwelling is my inmost heart — answer the one whose call has filled every horizon.",
              "id": "huwannur-u5",
              "latin": "Aya nazihan 'anni wa maskanuhul hasya, ajib man mala kullan-nawahi nida-uhu",
              "translation": "Wahai yang jauh dariku, padahal tempat tinggalnya di lubuk hati yang terdalam; jawablah (seruan) orang yang panggilannya memenuhi segala penjuru."
            },
            {
              "arab": "أَجِبْ مَنْ تَوَلَّاهُ الْهَوَى فِيْكَ وَامْضِ فِيْ ۞ فُؤَادِيْ مَا يَهْوَى الْهَوَى وَيَشَاؤُهُ",
              "english": "Answer the one whom love for you has mastered, and pass through my heart toward all that love desires and wills.",
              "id": "huwannur-u6",
              "latin": "Ajib man tawallahul hawa fika wamdhi fi, fu-adi ma yahwal hawa wa yasya-uhu",
              "translation": "Jawablah orang yang telah dikuasai cinta kepadamu, dan berlalulah di dalam hatiku menuju apa yang dicintai dan dikehendaki oleh cinta itu."
            },
            {
              "arab": "بَنَى الْحُبُّ فِيْ وَسْطِ الْفُؤَادِ مَنَازِلًا ۞ فَلِلَّهِ بَانٍ فَاقَ صُنْعًا بِنَاؤُهُ",
              "english": "Love has built dwellings in the middle of my heart; by Allah, the Builder — how surpassingly beautiful is His building.",
              "id": "huwannur-u7",
              "latin": "Banal hubbu fi wasthil fu-adi manazila, falillahi banin faqo shun'an bina-uhu",
              "translation": "Cinta membangun tempat-tempat tinggal di tengah hati; demi Allah, Sang Pembangun itu bangunannya melampaui segala buatan dalam keindahannya."
            },
            {
              "arab": "بِحُكْمِ الْوَلَا جَرَّدْتُ قَصْدِيْ وَحَبَّذَا ۞ مُوَالٍ أَرَاحَ الْقَلْبَ مِنْهُ وَلَاؤُهُ",
              "english": "By love's decree I have stripped my aim bare of all else — how beautiful is the loving guardian whose devotion brings rest to the heart.",
              "id": "huwannur-u8",
              "latin": "Bihukmil wala jarradtu qoshdi wa habbadza, muwalin arohal qolba minhu wala-uhu",
              "translation": "Dengan ketetapan cinta, kumurnikan tujuanku dari yang lain — dan alangkah indahnya kekasih penolong yang kesetiaannya menenangkan hati."
            },
            {
              "arab": "مَرِضْتُ فَكَانَ الذِّكْرُ بُرْءًا لِعَلَّتِيْ ۞ فَيَا حَبَّذَا ذِكْرًا لِقَلْبِيْ شِفَاؤُهُ",
              "english": "I fell ill, and remembrance of him became the cure for my ailment — how beautiful is a remembrance that heals my heart.",
              "id": "huwannur-u9",
              "latin": "Maridhtu fakanadz-dzikru bur-an li'allati, faya habbadza dzikron liqolbi syifa-uhu",
              "translation": "Aku sakit, maka mengingatnya menjadi kesembuhan bagi penyakitku; alangkah indahnya mengingat (dia), yang menjadi obat bagi hatiku."
            },
            {
              "arab": "إِذَا عَلِمَ الْعُشَّاقُ دَائِيْ فَقُلْ لَهُمْ ۞ فَإِنَّ لِقَا أَحْبَابِ قَلْبِيْ دَوَاؤُهُ",
              "english": "If the lovers come to know my sickness, tell them: meeting the beloved of my heart is its cure.",
              "id": "huwannur-u10",
              "latin": "Idza 'alimal 'usysyaqu da-i faqul lahum, fa-inna liqo ahbabi qolbi dawa-uhu",
              "translation": "Jika para perindu mengetahui penyakitku, maka katakanlah kepada mereka: sesungguhnya perjumpaan dengan kekasih hatiku, itulah obatnya."
            },
            {
              "arab": "أَيَا رَاحِلًا بَلِّغْ حَبِيْبِيْ رِسَالَةً ۞ بِحَرْفٍ مِنَ الْأَشْوَاقِ يَحْلُوْ هِجَاؤُهُ",
              "english": "O departing traveler, deliver a message to my Beloved, in letters of longing whose very spelling is sweet.",
              "id": "huwannur-u11",
              "latin": "Aya rohilan balligh habibi risalatan, biharfin minal asywaqi yahlu hija-uhu",
              "translation": "Wahai orang yang berangkat, sampaikanlah sebuah pesan kepada kekasihku, dengan huruf-huruf kerinduan yang indah ejaannya."
            },
            {
              "arab": "وَهَيْهَاتَ أَنْ يَلْقَى الْعَذُوْلُ إِلَى الْحَشَا ۞ سَبِيْلًا سَوَاءٌ مَدْحُهُ وَهِجَاؤُهُ",
              "english": "Never shall the blamer find a way into my inmost heart — his praise and his satire are all one to me.",
              "id": "huwannur-u12",
              "latin": "Wa haihata an yalqol 'adzulu ilal hasya, sabilan sawa-un madhuhu wa hija-uhu",
              "translation": "Mustahil sang pencela menemukan jalan masuk ke lubuk hatiku; bagiku sama saja pujiannya maupun celaannya."
            },
            {
              "arab": "فُؤَادِيْ بِخَيْرِ الْمُرْسَلِيْنَ مُوَلَّعٌ ۞ وَأَشْرَفُ مَا يَحْلُوْ لِسَمْعِيْ ثَنَاؤُهُ",
              "english": "My heart burns with love for the best of messengers, and the noblest, sweetest thing my ear can hear is praise of him.",
              "id": "huwannur-u13",
              "latin": "Fu-adi bikhoiril mursalina muwalla'un, wa asyrofu ma yahlu lisam'i tsana-uhu",
              "translation": "Hatiku terbakar cinta kepada sebaik-baik utusan, dan yang paling mulia serta terindah bagi pendengaranku adalah pujian kepadanya."
            },
            {
              "arab": "رَقَى فِي الْعُلَى وَالْمَجْدِ أَشْرَفَ رُتْبَةٍ ۞ بِمَبْدَاهُ حَارَ الْخَلْقُ كَيْفَ انْتِهَاؤُهُ",
              "english": "He ascended to the noblest rank of exaltedness and glory; at his very beginning creation was bewildered — what, then, of his end?",
              "id": "huwannur-u14",
              "latin": "Roqo fil 'ula wal majdi asyrofa rutbatin, bimabda-ahu harol kholqu kaifan tiha-uhu",
              "translation": "Ia naik ke derajat yang paling mulia dalam keluhuran dan kemuliaan; sejak permulaannya saja makhluk telah bingung, maka bagaimana pula akhirnya?"
            },
            {
              "arab": "أَيَا سَيِّدِيْ قَلْبِيْ بِحُبِّكَ بَائِحٌ ۞ وَطَرْفِيْ بَعْدَ الدَّمْعِ تَجْرِيْ دِمَاؤُهُ",
              "english": "O my master, my heart can no longer conceal its love for you; and my eyes, their tears spent, now stream with blood.",
              "id": "huwannur-u15",
              "latin": "Aya sayyidi qolbi bihubbika ba-ihun, wa thorfiya ba'dad-dam'i tajri dima-uhu",
              "translation": "Wahai tuanku, hatiku tak kuasa menyembunyikan cintaku kepadamu; dan mataku, setelah air mata habis, mengalirkan darah."
            },
            {
              "arab": "إِذَا رُمْتَ كَتْمَ الْحُبِّ زَادَتْ صَبَابَتِيْ ۞ فَسِيَّانِ عِنْدِيْ بَثُّهُ وَخَفَاؤُهُ",
              "english": "If I try to hide this love, my longing only grows; so revealing it or concealing it are the same to me.",
              "id": "huwannur-u16",
              "latin": "Idza rumta katmal hubbi zadat shobabati, fasiyyani 'indi batstsuhu wa khofa-uhu",
              "translation": "Jika kucoba menyembunyikan cinta, rinduku justru bertambah; maka sama saja bagiku mengungkapkannya atau menyembunyikannya."
            },
            {
              "arab": "أَجِبْ يَا حَبِيْبَ الْقَلْبِ دَعْوَةَ شَيِّقٍ ۞ شَكَى لَفْحَ نَارٍ قَدْ حَوَتْهَا حَشَاؤُهُ",
              "english": "Answer, O beloved of my heart, the call of a longing lover who complains of the scorching fire that fills his inmost being.",
              "id": "huwannur-u17",
              "latin": "Ajib ya habibal qolbi da'wata syayyiqin, syaka lafha narin qod hawatha hasya-uhu",
              "translation": "Jawablah, wahai kekasih hati, seruan seorang perindu yang mengadu tentang sambaran api (rindu) yang telah memenuhi lubuk hatinya."
            },
            {
              "arab": "وَمَرَّ طَيْفُكَ الْمَيْمُوْنُ فِيْ غَفْلَةِ الْعِدَا ۞ يَمُرُّ بِطَرْفٍ زَادَ فِيْكَ بُكَاؤُهُ",
              "english": "Your blessed phantom passed by while the enemies were heedless, passing before eyes whose weeping for you has only increased.",
              "id": "huwannur-u18",
              "latin": "Wa marro thoifukal maimunu fi ghoflatil 'ida, yamurru bithorfin zada fika buka-uhu",
              "translation": "Bayanganmu yang penuh berkah berlalu saat para musuh lengah; ia melintas di mata yang tangisnya karenamu semakin menjadi."
            },
            {
              "arab": "لِيَ اللهُ مِنْ حُبٍّ تَعَسَّرَ وَصْفُهُ ۞ وَلِلَّهِ أَمْرِيْ وَالْقَضَاءُ قَضَاؤُهُ",
              "english": "To Allah I entrust this love that is too hard to describe; to Allah belongs my affair, and the decree is His decree.",
              "id": "huwannur-u19",
              "latin": "Liyallahu min hubbin ta'assaro washfuhu, wa lillahi amri wal qodho-u qodho-uhu",
              "translation": "Kepada Allah kupasrahkan cinta yang sulit digambarkan ini; dan kepada Allah pula urusanku, sedangkan ketetapan adalah ketetapan-Nya."
            },
            {
              "arab": "فَيَا رَبِّ شَرِّفْنِيْ بِرُؤْيَةِ سَيِّدِيْ ۞ وَأَجْلِ صَدَى الْقَلْبِ الْكَثِيْرِ صَدَاؤُهُ",
              "english": "O my Lord, honour me with the sight of my master, and polish away the rust of this much-rusted heart.",
              "id": "huwannur-u20",
              "latin": "Faya robbi syarrifni biru'yati sayyidi, wa ajli shodal qolbil katsiri shoda-uhu",
              "translation": "Ya Rabbi, muliakanlah aku dengan memandang tuanku, dan bersihkanlah karat hati yang sangat berkarat ini."
            },
            {
              "arab": "وَبَلِّغْ عَلِيًّا مَا يَرُوْمُ مِنَ اللِّقَا ۞ بِأَشْرَفِ عَبْدٍ جُلُّ قَصْدِيْ لِقَاؤُهُ",
              "english": "And bring Ali to what he longs for — meeting the noblest of servants, the one whose meeting is my whole aim.",
              "id": "huwannur-u21",
              "latin": "Wa balligh 'Aliyyan ma yarumu minal liqo, bi-asyrofi 'abdin jullu qoshdi liqo-uhu",
              "translation": "Dan sampaikanlah Ali kepada apa yang ia harapkan, yaitu perjumpaan dengan semulia-mulia hamba, yang perjumpaan dengannya adalah sebagian besar tujuanku."
            },
            {
              "arab": "وَعَلَيْهِ صَلَاةُ اللهِ مَا هَبَّتِ الصَّبَا ۞ وَمَا أَطْرَبَ الْحَادِيْ فَطَابَ حِدَاؤُهُ",
              "english": "Upon him be Allah's blessings so long as the east wind blows, and so long as the camel-driver sings joyfully and his song is sweet.",
              "id": "huwannur-u22",
              "latin": "Wa 'alaihi sholatullahi ma habbatish-shoba, wa ma athrobal hadi fathoba hida-uhu",
              "translation": "Atasnya curahan shalawat Allah selama angin shaba berhembus, dan selama sang penggiring (unta) bersenandung gembira hingga merdu senandungnya."
            },
            {
              "arab": "مَعَ الْآلِ وَالْأَصْحَابِ مَا قَالَ مُنْشِدٌ ۞ هُوَ النُّوْرُ يَهْدِي الْحَائِرِيْنَ ضِيَاؤُهُ",
              "english": "Together with his Family and Companions, for as long as a singer sings: 'He is the Light whose radiance guides the bewildered.'",
              "id": "huwannur-u23",
              "latin": "Ma'al ali wal ash-habi ma qola munsyidun, huwannur yahdil ha-irina dhiya-uhu",
              "translation": "Beserta keluarga dan para sahabatnya, selama seorang munsyid melantunkan: 'Dialah pelita cahaya yang memberi petunjuk kepada orang-orang yang bimbang.'"
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Ibadallah Rijalallah",
      "slug": "ibadallah-rijalallah",
      "type": "SHALAWAT",
      "description": "Qasidah Ibadallah Rijalallah adalah syair istighatsah (permohonan pertolongan) yang masyhur dibaca dalam rangkaian manaqib Syekh Abdul Qadir al-Jailani, dibuka dengan seruan 'Ibadallah rijalallah, aghitsuna li ajlillah' (wahai hamba-hamba Allah, wahai wali-wali Allah, tolonglah kami karena Allah): syair ini memohon pertolongan para wali — termasuk Syekh Abdul Qadir al-Jailani yang diseru dengan gelarnya Muhyiddin — dan ditutup dengan shalawat kepada Nabi Muhammad. Pengarangnya tidak terverifikasi dalam sumber-sumber yang diperiksa. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 14,
    "blocks": {
      "sections": [
        {
          "id": "ibadallah-rijalallah-s1",
          "title": "Ibadallah Rijalallah",
          "units": [
            {
              "arab": "عِبَادَ اللهِ رِجَالَ اللهِ ۞ أَغِيْثُوْنَا لِأَجْلِ اللهِ",
              "english": "O servants of Allah, O men of Allah — come to our aid, for the sake of Allah.",
              "id": "ibadallah-rijalallah-u1",
              "latin": "'Ibadallah rijalallah, aghitsuna li ajlillah",
              "translation": "Wahai hamba-hamba Allah, wahai wali-wali Allah, tolonglah kami karena Allah."
            },
            {
              "arab": "وَكُوْنُوْا عَوْنًا لَنَا لِلّٰهِ ۞ عَسَى نَحْظَى بِفَضْلِ اللهِ",
              "english": "And be a help to us, for Allah's sake — that we may gain a share of Allah's bounty.",
              "id": "ibadallah-rijalallah-u2",
              "latin": "Wa kunu 'aunan lana lillah, 'asa nahzho bi fadhlillah",
              "translation": "Dan jadilah penolong bagi kami karena Allah, semoga kami memperoleh (bagian) dari anugerah Allah."
            },
            {
              "arab": "عَلَى الْكَافِيْ صَلَاةُ اللهِ ۞ عَلَى الشَّافِيْ سَلَامُ اللهِ",
              "english": "Upon al-Kafi, the All-Sufficing (Prophet), be Allah's blessings; upon asy-Syafi, the Healer, be Allah's peace.",
              "id": "ibadallah-rijalallah-u3",
              "latin": "'Alal kafi sholatullah, 'alasy-syafi salamullah",
              "translation": "Semoga rahmat Allah atas (Nabi) Sang Pencukup, semoga salam Allah atas (Nabi) Sang Penyembuh."
            },
            {
              "arab": "بِمُحْيِ الدِّيْنِ خَلِّصْنَا ۞ مِنَ الْبَلْوَاءِ يَا اَللهُ",
              "english": "Through Muhyiddin (Shaykh Abdul Qadir al-Jailani), deliver us from every affliction, O Allah.",
              "id": "ibadallah-rijalallah-u4",
              "latin": "Bi Muhyiddin khollishna, minal balwa ya Allah",
              "translation": "Dengan (perantara) Muhyiddin (Syekh Abdul Qadir al-Jailani), selamatkanlah kami dari segala bala, ya Allah."
            },
            {
              "arab": "وَيَا أَقْطَابُ وَيَا أَنْجَابُ ۞ وَيَا سَادَاتُ وَيَا أَحْبَابُ",
              "english": "O you qutbs, the spiritual poles, O you noble ones, O masters, and O beloved ones of Allah.",
              "id": "ibadallah-rijalallah-u5",
              "latin": "Wa ya aqthob wa ya anjab, wa ya sadat wa ya ahbab",
              "translation": "Wahai para wali qutub, wahai para wali anjab yang mulia, wahai para sadat (tuan-tuan) dan wahai para kekasih Allah."
            },
            {
              "arab": "وَأَنْتُمْ يَا أُوْلِي الْأَلْبَابِ ۞ تَعَالَوْا وَانْصُرُوْا لِلّٰهِ",
              "english": "And you, O possessors of pure hearts and minds — come, and help us, for Allah's sake.",
              "id": "ibadallah-rijalallah-u6",
              "latin": "Wa antum ya ulil albab, ta'alaw wanshuru lillah",
              "translation": "Dan kalian, wahai pemilik akal yang sempurna, datanglah kemari dan tolonglah (kami) karena Allah."
            },
            {
              "arab": "سَأَلْنَاكُمْ سَأَلْنَاكُمْ ۞ وَلِلزُّلْفَى رَجَوْنَاكُمْ",
              "english": "We ask of you, we ask of you — and for the sake of nearness (to Allah), we place our hope in you.",
              "id": "ibadallah-rijalallah-u7",
              "latin": "Sa-alnakum sa-alnakum, wa liz-zulfa rojaunakum",
              "translation": "Kami memohon kepada kalian, kami memohon kepada kalian, dan demi meraih kedekatan (kepada Allah) kami mengharapkan kalian."
            },
            {
              "arab": "وَفِيْ أَمْرٍ قَصَدْنَاكُمْ ۞ فَشُدُّوْا عَزْمَكُمْ لِلّٰهِ",
              "english": "And in a matter of need we have turned to you — so strengthen your resolve, for Allah's sake.",
              "id": "ibadallah-rijalallah-u8",
              "latin": "Wa fi amrin qoshodnakum, fasyuddu 'azmakum lillah",
              "translation": "Dan dalam suatu urusan kami bermaksud (mendatangi) kalian, maka kokohkanlah tekad kalian karena Allah."
            },
            {
              "arab": "فَيَا رَبِّيْ بِسَادَاتِيْ ۞ تَحَقَّقْ لِيْ إِشَارَاتِيْ",
              "english": "O my Lord, by my masters the saints, make real for me the signs that I hope for.",
              "id": "ibadallah-rijalallah-u9",
              "latin": "Faya Robbi bi sadati, tahaqqoq li isyaroti",
              "translation": "Wahai Tuhanku, dengan (perantara) para tuanku (para wali), wujudkanlah bagiku isyarat-isyarat (yang kuharapkan)."
            },
            {
              "arab": "عَسَى تَأْتِيْ بِشَارَتِيْ ۞ وَيَصْفُوْ وَقْتُنَا لِلّٰهِ",
              "english": "May my glad tidings come, and may our time be made pure for Allah.",
              "id": "ibadallah-rijalallah-u10",
              "latin": "'Asa ta'ti bisyaroti, wa yashfu waqtuna lillah",
              "translation": "Semoga datang kabar gembiraku, dan semoga waktu kami menjadi jernih (khusus) untuk Allah."
            },
            {
              "arab": "بِكَشْفِ الْحُجْبِ عَنْ عَيْنِيْ ۞ وَرَفْعِ الْبَيْنِ مِنْ بَيْنِيْ",
              "english": "By unveiling the veils from my eyes, and lifting away the separation before me,",
              "id": "ibadallah-rijalallah-u11",
              "latin": "Bikasyfil hujbi 'an 'ayni, wa rof'il bayni min bayni",
              "translation": "Dengan tersingkapnya tirai-tirai dari mataku, dan terangkatnya keterpisahan dari hadapanku,"
            },
            {
              "arab": "وَطَمْسِ الْكَيْفِ وَالْأَيْنِ ۞ بِنُوْرِ الْوَجْهِ يَا اَللهُ",
              "english": "and by erasing (the questions of) 'how' and 'where', through the light of Your Face, O Allah.",
              "id": "ibadallah-rijalallah-u12",
              "latin": "Wa thomsil kayfi wal ayni, binuril wajhi ya Allah",
              "translation": "dan terhapusnya (pertanyaan) 'bagaimana' dan 'di mana', dengan cahaya Wajah-Mu, ya Allah."
            },
            {
              "arab": "صَلَاةُ اللهِ مَوْلَانَا ۞ عَلَى مَنْ بِالْهُدَى جَانَا",
              "english": "May the blessings of Allah, our Lord, rest upon the one who came to us bearing guidance,",
              "id": "ibadallah-rijalallah-u13",
              "latin": "Sholatullahi maulana, 'ala man bil huda jana",
              "translation": "Semoga shalawat Allah, Tuhan kami, tercurah kepada orang yang datang kepada kami dengan membawa petunjuk,"
            },
            {
              "arab": "وَمَنْ بِالْحَقِّ أَوْلَانَا ۞ شَفِيْعِ الْخَلْقِ عِنْدَ اللهِ",
              "english": "and who, in truth, has become our master — the intercessor for all creation before Allah.",
              "id": "ibadallah-rijalallah-u14",
              "latin": "Wa man bil haqqi awlana, syafi'il kholqi 'indallah",
              "translation": "dan yang dengan kebenaran telah menjadi pemimpin kami, pemberi syafaat bagi seluruh makhluk di sisi Allah."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Salamun Salamun",
      "slug": "salamun-salamun",
      "type": "SHALAWAT",
      "description": "Qasidah Salamun Salamun karya Imam Abdullah bin Alwi al-Haddad adalah qasidah kerinduan kepada para kekasih yang dibuka dengan salam seharum kesturi penutup ('Salamun salamun kamiskil khitam'): penyair menyatakan hidup dan matinya dalam cinta kepada mereka, memohon pertemuan walau hanya dalam mimpi, dan menutupnya dengan harapan kepada Tuhannya yang Maha Penyayang. Qasidah ini juga masyhur dilantunkan dengan sebutan Amutu Wa Ahya. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 18,
    "blocks": {
      "sections": [
        {
          "id": "salamun-salamun-s1",
          "title": "Salamun Salamun",
          "units": [
            {
              "arab": "سَلَامٌ سَلَامٌ كَمِسْكِ الْخِتَامِ ۞ عَلَيْكُمْ أُحَيْبَابَنَا يَا كِرَام",
              "english": "Peace, peace — fragrant as the musk that seals (a letter) — upon you, our beloveds, O noble ones.",
              "id": "salamun-salamun-u1",
              "latin": "Salamun salamun kamiskil khitam, 'alaikum uhaibabana ya kiram",
              "translation": "Salam dan salam, seharum kesturi sebagai penutup, atas kalian wahai kekasih-kekasihku yang mulia."
            },
            {
              "arab": "وَمَنْ ذِكْرُهُمْ أُنْسُنَا فِي الظَّلَامِ ۞ وَنُورٌ لَنَا بَيْنَ هَذَا الْأَنَامِ",
              "english": "Remembering them is our comfort in the darkness, and a light for us among all mankind.",
              "id": "salamun-salamun-u2",
              "latin": "Wa man dzikruhum unsuna fizh-zholam, wa nurun lana baina hadzal anam",
              "translation": "Mengingat mereka adalah ketenteraman kami dalam kegelapan, dan cahaya bagi kami di antara umat manusia ini."
            },
            {
              "arab": "سَكَنْتُمْ فُؤَادِي وَرَبِّ الْعِبَادِ ۞ وَأَنْتُمْ مَرَامِي وَأَقْصَى الْمُرَادِ",
              "english": "You have taken up dwelling in my heart — by the Lord of all servants — and you are my aim and the utmost of my desire.",
              "id": "salamun-salamun-u3",
              "latin": "Sakantum fu-adi wa robbil 'ibad, wa antum marami wa aqshal murad",
              "translation": "Kalian telah berdiam di dalam hatiku — demi Tuhan seluruh hamba — dan kalianlah tujuanku dan puncak segala yang kuinginkan."
            },
            {
              "arab": "فَهَلْ تُسْعِدُونِي بِصَفْوِ الْوِدَادِ ۞ وَهَلْ تَمْنَحُونِي شَرِيفَ الْمَقَامِ",
              "english": "Will you gladden me with pure, sincere affection, and will you grant me a noble station?",
              "id": "salamun-salamun-u4",
              "latin": "Fahal tus'iduni bishofwil widad, wa hal tamnahuni syarifal maqom",
              "translation": "Maukah kalian membahagiakanku dengan cinta yang tulus murni, dan maukah kalian menganugerahiku kedudukan yang mulia?"
            },
            {
              "arab": "أَنَا عَبْدُكُمْ يَا أُهَيْلَ الْوَفَا ۞ وَفِي قُرْبِكُمْ مَرْهَمِي وَالشِّفَا",
              "english": "I am your servant, O people of perfect loyalty; and being near you is my balm and my healing.",
              "id": "salamun-salamun-u5",
              "latin": "Ana 'abdukum ya uhailal wafa, wa fi qurbikum marhami wasy-syifa",
              "translation": "Aku adalah hamba kalian, wahai orang-orang yang setia menepati janji; dan berada dekat dengan kalian adalah penawar dan kesembuhan bagiku."
            },
            {
              "arab": "فَلَا تُسْقِمُونِي بِطُولِ الْجَفَا ۞ وَمُنُّوا بِوَصْلٍ وَلَوْ فِي الْمَنَامِ",
              "english": "So do not make me ill with long estrangement; grant me union with you, even if only in a dream.",
              "id": "salamun-salamun-u6",
              "latin": "Fala tusqimuni bithulil jafa, wa munnu biwashlin walau fil manam",
              "translation": "Maka janganlah kalian membuatku sakit dengan lama menjauh dariku; anugerahkanlah kepadaku pertemuan dengan kalian, walau hanya dalam mimpi."
            },
            {
              "arab": "أَمُوتُ وَأَحْيَا عَلَى حُبِّكُمْ ۞ وَذُلِّي لَدَيْكُمْ وَعِزِّي بِكُمْ",
              "english": "I die and I live in love for you; my lowliness is before you, and my honour is through you.",
              "id": "salamun-salamun-u7",
              "latin": "Amutu wa ahya 'ala hubbikum, wa dzulli ladaikum wa 'izzi bikum",
              "translation": "Aku mati dan hidup dalam keadaan mencintai kalian; kehinaanku adalah di hadapan kalian, dan kemuliaanku adalah dengan sebab kalian."
            },
            {
              "arab": "وَرَاحَاتُ رُوحِي رَجَا قُرْبِكُمْ ۞ وَعَزْمِي وَقَصْدِي إِلَيْكُمْ دَوَام",
              "english": "My soul's rest lies in hoping to be near you; and my resolve and my purpose are ever directed toward you.",
              "id": "salamun-salamun-u8",
              "latin": "Wa rohatu ruhi roja qurbikum, wa 'azmi wa qoshdi ilaikum dawam",
              "translation": "Ketenangan jiwaku adalah berharap dekat dengan kalian; dan tekad serta tujuanku senantiasa tertuju kepada kalian."
            },
            {
              "arab": "فَلَا عِشْتُ إِنْ كَانَ قَلْبِي سَكَنْ ۞ إِلَى الْبُعْدِ عَنْ أَهْلِهِ وَالْوَطَن",
              "english": "May I not live, if my heart should ever settle into being far from its people and its homeland,",
              "id": "salamun-salamun-u9",
              "latin": "Fala 'isytu in kana qolbi sakan, ilal bu'di 'an ahlihi wal wathon",
              "translation": "Semoga aku tidak hidup, jika hatiku merasa betah menjauh dari kaumnya dan tanah airnya,"
            },
            {
              "arab": "وَمَنْ حُبُّهُمْ فِي الْحَشَا قَدْ قَطَنْ ۞ وَخَامَرَ مِنِّي جَمِيعَ الْعِظَامِ",
              "english": "(far from) those whose love has taken up dwelling in my inmost heart and has permeated all my bones.",
              "id": "salamun-salamun-u10",
              "latin": "Wa man hubbuhum fil hasya qod qothon, wa khomaro minni jami'al 'izhom",
              "translation": "(jauh dari) orang-orang yang cintanya telah menetap di lubuk hatiku dan telah meresap ke seluruh tulang-tulangku."
            },
            {
              "arab": "إِذَا مَرَّ بِالْقَلْبِ ذِكْرُ الْحَبِيبِ ۞ وَوَادِي الْعَقِيقِ وَذَاكَ الْكَثِيبِ",
              "english": "When mention of the Beloved passes through the heart, and (mention of) the Valley of al-'Aqiq and that sand-hill,",
              "id": "salamun-salamun-u11",
              "latin": "Idza marro bil-qolbi dzikrul habib, wa wadil 'aqiqi wa dzakal katsib",
              "translation": "Apabila melintas di hati sebutan Sang Kekasih, dan Lembah 'Aqiq, dan bukit pasir itu,"
            },
            {
              "arab": "يَمِيلُ كَمَيْلِ الْقَضِيبِ الرَّطِيبِ ۞ وَيَهْتَزُّ مِنْ شَوْقِهِ وَالْغَرَامِ",
              "english": "(my heart) sways as a tender twig sways, and trembles with its longing and its passionate love.",
              "id": "salamun-salamun-u12",
              "latin": "Yamilu kamailil qodhibir-rothib, wa yahtazzu min syauqihi wal ghorom",
              "translation": "(hatiku) condong seperti condongnya ranting yang lembut, dan bergetar karena rindu dan cintanya."
            },
            {
              "arab": "أَمُوتُ وَمَا زُرْتُ ذَاكَ الْفِنَا ۞ وَتِلْكَ الْخِيَامَ وَفِيهَا الْمُنَى",
              "english": "I die, yet I have never visited that courtyard, nor those tents — though in them lies everything that is longed for.",
              "id": "salamun-salamun-u13",
              "latin": "Amutu wa ma zurtu dzakal fina, wa tilkal khiyama wa fihal muna",
              "translation": "Aku mati, padahal belum pernah aku menziarahi kawasan itu dan kemah-kemah itu, padahal di sanalah segala yang didambakan."
            },
            {
              "arab": "وَلَمْ أَدْنُ يَوْمًا مَعَ مَنْ دَنَا ۞ لِلَثْمِ الْمُحَيَّا وَشُرْبِ الْمُدَامِ",
              "english": "Nor have I ever drawn near, with those who drew near, to kiss the (Beloved's) face and drink the wine (of love).",
              "id": "salamun-salamun-u14",
              "latin": "Wa lam adnu yauman ma'a man dana, lilatsmil muhayya wa syurbil mudam",
              "translation": "Dan belum pernah sehari pun aku mendekat bersama orang-orang yang mendekat, untuk mengecup wajah (Sang Kekasih) dan meneguk anggur (cinta)."
            },
            {
              "arab": "لَئِنْ كَانَ هَذَا فَيَا غُرْبَتِي ۞ وَيَا طُولَ حُزْنِي وَيَا كُرْبَتِي",
              "english": "If this is truly so — oh, my estrangement! Oh, the length of my sorrow, and oh, my anguish!",
              "id": "salamun-salamun-u15",
              "latin": "La-in kana hadza faya ghurbati, wa ya thula huzni wa ya kurbati",
              "translation": "Sungguh, jika memang demikian (keadaannya), alangkah terasingnya aku; alangkah panjangnya kesedihanku dan alangkah beratnya penderitaanku."
            },
            {
              "arab": "وَلِي حُسْنُ ظَنٍّ بِهِ قُرْبَتِي ۞ بِذُلِّي وَحَسْبِي بِهِ يَا غُلَام",
              "english": "Yet I hold a good opinion (of God) — through it is my nearness — in my lowliness; and He suffices me, O young man.",
              "id": "salamun-salamun-u16",
              "latin": "Wa li husnu zhonnin bihi qurbati, bidzulli wa hasbi bihi ya ghulam",
              "translation": "Namun aku mempunyai prasangka baik (kepada Allah) — dengannya aku memelihara kedekatanku — dalam kehinaanku; dan cukuplah Dia bagiku, wahai pemuda."
            },
            {
              "arab": "عَسَى اللهُ يَشْفِي غَلِيلَ الصُّدُورِ ۞ بِوَصْلِ الْحَبَائِبِ وَفَكِّ الْقُيُودِ",
              "english": "May Allah heal the burning longing within (our) breasts, through union with the beloveds and the loosening of all bonds.",
              "id": "salamun-salamun-u17",
              "latin": "'Asallahu yasyfi gholilash-shudur, biwashlil haba-ib wa fakkil quyud",
              "translation": "Semoga Allah menyembuhkan bara rindu dalam dada, dengan pertemuan dengan para kekasih dan terlepasnya segala belenggu."
            },
            {
              "arab": "فَرَبِّي رَحِيمٌ كَرِيمٌ وَدُودٌ ۞ يَجُودُ عَلَى مَنْ يَشَا بِالْمَرَامِ",
              "english": "For my Lord is Merciful, Generous, Most Loving; He bestows upon whom He wills that which is desired.",
              "id": "salamun-salamun-u18",
              "latin": "Farobbi rohimun karimun wadud, yajudu 'ala man yasya' bil maram",
              "translation": "Karena Tuhanku Maha Penyayang, Maha Pemurah, Maha Pengasih; Dia memberi kepada siapa yang Dia kehendaki apa yang diharapkan."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Sholawatullahi Taghsya",
      "slug": "sholawatullahi-taghsya",
      "type": "SHALAWAT",
      "description": "Qasidah Sholawatullahi Taghsya adalah qasidah pujian dan shalawat yang dibuka dengan seruan 'Sholawatullahi taghsya asyrofar-ruslil athoyib' (semoga shalawat Allah menaungi sebaik-baik para utusan yang suci): ia menyambut kebahagiaan atas kelahiran Nabi, memuji nasab dan kemuliaannya, dan ditutup dengan syukur serta doa ampunan bagi hamba yang bertobat. Dalam sumber-sumber diwan, qasidah ini — dari bait 'Aqbalas-sa'du 'alaina' — dinisbatkan kepada al-Habib Ali bin Muhammad al-Habshi. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 22,
    "blocks": {
      "sections": [
        {
          "id": "sholawatullahi-taghsya-s1",
          "title": "Sholawatullahi Taghsya",
          "units": [
            {
              "arab": "صَلَوَاتُ اللهِ تَغْشَى ۞ أَشْرَفَ الرُّسْلِ الْأَطَايِبْ",
              "english": "May Allah's blessings envelop the noblest and purest of the messengers.",
              "id": "sholawatullahi-taghsya-u1",
              "latin": "Sholawatullahi taghsya, asyrofar-ruslil athoyib",
              "translation": "Semoga shalawat Allah menaungi sebaik-baik para utusan yang suci."
            },
            {
              "arab": "وَتَعُمُّ الْآلَ جَمْعًا ۞ مَا بَدَا نُوْرُ الْكَوَاكِبْ",
              "english": "And may they embrace all of his family, for as long as the light of the stars appears.",
              "id": "sholawatullahi-taghsya-u2",
              "latin": "Wa ta'ummul ala jam'an, ma bada nurul kawakib",
              "translation": "Dan (shalawat itu) meliputi seluruh keluarga (Nabi), selama cahaya bintang-bintang tampak."
            },
            {
              "arab": "أَقْبَلَ السَّعْدُ عَلَيْنَا ۞ وَالْهَنَا مِنْ كُلِّ جَانِبْ",
              "english": "Happiness has come to us, and joy from every side.",
              "id": "sholawatullahi-taghsya-u3",
              "latin": "Aqbalas-sa'du 'alaina, wal-hana min kulli janib",
              "translation": "Kebahagiaan telah datang menghampiri kami, dan kesenangan (datang) dari segala penjuru."
            },
            {
              "arab": "فَلَنَا الْبُشْرَى بِسَعْدٍ ۞ جَاءَنَا مِنْ خَيْرِ وَاهِبْ",
              "english": "So ours is the glad tidings of a happiness that has come to us from the Best of givers.",
              "id": "sholawatullahi-taghsya-u4",
              "latin": "Falanal busyro bisa'din, ja-ana min khoiri wahib",
              "translation": "Maka bagi kami kabar gembira berupa kebahagiaan yang datang dari sebaik-baik Pemberi."
            },
            {
              "arab": "يَا جَمَالًا قَدْ تَجَلَّى ۞ بِالْمَشَارِقْ وَالْمَغَارِبْ",
              "english": "O beauty that has truly been made manifest, in the east and in the west.",
              "id": "sholawatullahi-taghsya-u5",
              "latin": "Ya jamalan qod tajalla, bil-masyariq wal-maghorib",
              "translation": "Wahai keindahan yang sungguh telah tampak nyata, di timur dan di barat."
            },
            {
              "arab": "مَرْحَبًا أَهْلًا وَسَهْلًا ۞ بِكَ يَا خَيْرَ الْحَبَائِبْ",
              "english": "Welcome — ahlan wa sahlan — to you, O best of beloveds.",
              "id": "sholawatullahi-taghsya-u6",
              "latin": "Marhaban ahlan wa sahlan, bika ya khoirol haba-ib",
              "translation": "Selamat datang, ahlan wa sahlan, dengan (kehadiran)mu, wahai sebaik-baik para kekasih."
            },
            {
              "arab": "مَرْحَبًا أَهْلًا بِشَمْسٍ ۞ خَفِيَتْ فِيْهَا الْكَوَاكِبْ",
              "english": "Welcome to a sun in which the stars are hidden.",
              "id": "sholawatullahi-taghsya-u7",
              "latin": "Marhaban ahlan bisyamsin, khofiyat fihal kawakib",
              "translation": "Selamat datang untuk sang matahari, yang di dalamnya bintang-bintang menjadi tersembunyi."
            },
            {
              "arab": "مَرْحَبًا أَهْلًا بِشَمْسٍ ۞ قَدْ مَحَتْ كُلَّ الْغَيَاهِبْ",
              "english": "Welcome to a sun that has erased all darkness.",
              "id": "sholawatullahi-taghsya-u8",
              "latin": "Marhaban ahlan bisyamsin, qod mahat kullal ghoyahib",
              "translation": "Selamat datang untuk sang matahari yang telah menghapus segala kegelapan."
            },
            {
              "arab": "يَا شَرِيْفَ الْأَصْلِ لُذْنَا ۞ بِكَ فِيْ كُلِّ النَّوَائِبْ",
              "english": "O noblest of lineage, we seek refuge in you against every calamity.",
              "id": "sholawatullahi-taghsya-u9",
              "latin": "Ya syarifal ashli ludzna, bika fi kullin-nawa-ib",
              "translation": "Wahai yang mulia asal-usulnya, kami berlindung denganmu dalam menghadapi segala bencana."
            },
            {
              "arab": "أَنْتَ مَلْجَا كُلِّ عَاصٍ ۞ أَنْتَ مَأْوَى كُلِّ تَائِبْ",
              "english": "You are the refuge of every sinner; You are the shelter of everyone who repents.",
              "id": "sholawatullahi-taghsya-u10",
              "latin": "Anta malja kulli 'ashin, anta ma'wa kulli ta-ib",
              "translation": "Engkau tempat berlindung setiap pendosa; Engkau tempat bernaung setiap orang yang bertobat."
            },
            {
              "arab": "جِئْتَ مِنْ أَصْلٍ أَصِيْلٍ ۞ حَلَّ فِيْ أَعْلَى الذَّوَائِبْ",
              "english": "You came from a pure origin, settled at the highest of peaks.",
              "id": "sholawatullahi-taghsya-u11",
              "latin": "Ji'ta min ashlin ashilin, halla fi a'ladz-dzawa-ib",
              "translation": "Engkau datang dari asal yang murni, yang bertempat di puncak yang tertinggi."
            },
            {
              "arab": "مِنْ قُصَيٍّ وَلُؤَيٍّ ۞ بَاذِخِ الْمَجْدِ ابْنِ غَالِبْ",
              "english": "From Qusayy and Lu'ayy, of towering glory, the son of Ghalib.",
              "id": "sholawatullahi-taghsya-u12",
              "latin": "Min Qushayyin wa Lu-ayyin, badzikhil majdibni Gholib",
              "translation": "Dari Qushai dan Lu'ay, yang menjulang kemuliaannya, putra Ghalib."
            },
            {
              "arab": "وَاعْتَلَى مَجْدُكَ فَخْرًا ۞ فِيْ رَفِيْعَاتِ الْمَرَاتِبْ",
              "english": "And your glory rose high in pride, among the loftiest of ranks.",
              "id": "sholawatullahi-taghsya-u13",
              "latin": "Wa'tala majduka fakhron, fi rofi'atil marotib",
              "translation": "Dan kemuliaanmu menjulang sebagai kebanggaan, di martabat-martabat yang tertinggi."
            },
            {
              "arab": "لَا بَرِحْنَا فِيْ سُرُوْرٍ ۞ بِكَ يَا عَالِيَ الْمَنَاقِبْ",
              "english": "We remain forever in joy because of you, O you of lofty virtues.",
              "id": "sholawatullahi-taghsya-u14",
              "latin": "La barihna fi sururin, bika ya 'aliyal manaqib",
              "translation": "Kami senantiasa dalam kegembiraan berkat engkau, wahai yang luhur keutamaannya."
            },
            {
              "arab": "فَلَكَمْ يَوْمَ وُجُوْدِكَ ۞ ظَهَرَتْ فِيْنَا عَجَائِبْ",
              "english": "How many wonders appeared among us on the day of your birth.",
              "id": "sholawatullahi-taghsya-u15",
              "latin": "Falakam yawma wujudik, zhoharot fina 'aja-ib",
              "translation": "Betapa banyak keajaiban yang tampak di tengah kami pada hari kelahiranmu."
            },
            {
              "arab": "بَشَّرَتْنَا بِالْعَطَايَا ۞ وَالْأَمَانِيْ وَالرَّغَائِبْ",
              "english": "(That day) brought us glad tidings of gifts, hopes, and longed-for desires.",
              "id": "sholawatullahi-taghsya-u16",
              "latin": "Basysyarotna bil-'athoya, wal-amani war-rogho-ib",
              "translation": "(Hari itu) memberi kami kabar gembira dengan pemberian-pemberian, harapan-harapan, dan segala yang didambakan."
            },
            {
              "arab": "قَدْ شَرِبْنَا مِنْ صَفَانَا ۞ بِكَ مِنْ أَحْلَى الْمَشَارِبْ",
              "english": "Truly, through you, we have drunk from our clear spring the sweetest of drinks.",
              "id": "sholawatullahi-taghsya-u17",
              "latin": "Qod syaribna min shofana, bika min ahlal masyarib",
              "translation": "Sungguh, berkat engkau, kami telah minum dari mata air jernih kami, minuman yang paling lezat."
            },
            {
              "arab": "فَلِرَبِّيَ الْحَمْدُ حَمْدًا ۞ جَلَّ أَنْ يُحْصِيَهُ حَاسِبْ",
              "english": "So to my Lord belongs praise — praise too glorious for any reckoner to count.",
              "id": "sholawatullahi-taghsya-u18",
              "latin": "Falirobbiyal hamdu hamdan, jalla an yuhshiyahu hasib",
              "translation": "Maka bagi Tuhanku segala puji, pujian yang terlalu agung untuk dapat dihitung oleh siapa pun yang menghitung."
            },
            {
              "arab": "وَلَهُ الشُّكْرُ عَلَى مَا ۞ قَدْ حَبَانَا مِنْ مَوَاهِبْ",
              "english": "And to Him belongs thanks for all the gifts He has bestowed upon us.",
              "id": "sholawatullahi-taghsya-u19",
              "latin": "Wa lahus-syukru 'ala ma, qod habana min mawahib",
              "translation": "Dan bagi-Nya syukur atas segala anugerah yang telah Dia berikan kepada kami."
            },
            {
              "arab": "يَا كَرِيْمًا يَا رَحِيْمًا ۞ جُدْ وَعَجِّلْ بِالْمَطَالِبْ",
              "english": "O Most Generous, O Most Merciful, be bountiful and hasten (the granting of) our requests.",
              "id": "sholawatullahi-taghsya-u20",
              "latin": "Ya kariman ya rohiman, jud wa 'ajjil bil-matholib",
              "translation": "Wahai Yang Maha Mulia, wahai Yang Maha Penyayang, bermurah hatilah dan segerakanlah (terpenuhinya) segala permintaan (kami)."
            },
            {
              "arab": "مَنْ تَوَجَّهْ نَحْوَ بَابِكَ ۞ مَا رَجَعْ مِنْ ذَاكَ خَائِبْ",
              "english": "Whoever turns toward Your door never returns from it disappointed.",
              "id": "sholawatullahi-taghsya-u21",
              "latin": "Man tawajjah nahwa babik, ma roja' min dzaka kho-ib",
              "translation": "Siapa yang menghadap ke pintu-Mu, tidak akan kembali dari sana dengan kecewa."
            },
            {
              "arab": "وَاغْفِرِ اغْفِرْ ذَنْبَ عَبْدٍ ۞ قَدْ أَتَى نَحْوَكَ تَائِبْ",
              "english": "And forgive, forgive the sin of a servant who has come to You repenting.",
              "id": "sholawatullahi-taghsya-u22",
              "latin": "Waghfir ighfir dzanba 'abdin, qod ata nahwaka ta-ib",
              "translation": "Dan ampunilah, ampunilah dosa seorang hamba yang telah datang kepada-Mu dalam keadaan bertobat."
            }
          ]
        }
      ]
    }
  }
];
