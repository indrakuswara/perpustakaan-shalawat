// PAYLOAD SEMENTARA — impor batch 9 qasidah (4 judul, batch terakhir)
// sebagai DRAFT. Sumber teks: wakidyusuf.wordpress.com (dipilih Juple
// dari files/list-konten-wakidyusuf.md), masing-masing sudah
// di-cross-check kelengkapan bait ke sumber kedua; Arab
// direkonstruksi bersih, Latin disusun ulang, Artinya dari blog
// dengan pembersihan/koreksi terdokumentasi, English baru.
// Dokumen review: qasidah-batch9/*.md di workspace goal. Dihapus
// bersama route import-qasidah-batch9 setelah eksekusi terverifikasi.
import type { ArticleBlocks } from "./db-types.ts";

export interface Batch9Article {
  meta: { title: string; slug: string; type: "SHALAWAT" | "MAULID"; description: string };
  expectedUnits: number;
  blocks: ArticleBlocks;
}

export const BATCH9_ARTICLES: Batch9Article[] = [
  {
    "meta": {
      "title": "'Ala Yallah Binadhroh",
      "slug": "ala-yallah-binadhroh",
      "type": "SHALAWAT",
      "description": "Qasidah munajat dan nasihat yang masyhur dilantunkan dalam majelis shalawat dan hadroh, dinisbatkan kepada Al-Imam Al-Quthb Al-Habib Abdullah bin Alwi Al-Haddad: dibuka dengan permohonan satu pandangan rahmat Allah yang menyembuhkan segala penyakit batin, dilanjutkan nasihat ridha, sabar, dan syukur menghadapi takdir, peringatan agar waspada terhadap dunia yang fana, ratapan atas kepergian kekasih yang dahulu tinggal bersama, serta penutup tentang Bashshar — tempat para sayyid, syekh, dan kekasih hati bersemayam — dan keberuntungan orang yang menziarahi mereka dengan tulus. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 17,
    "blocks": {
      "sections": [
        {
          "id": "ala-yallah-binadhroh-s1",
          "title": "'Ala Yallah Binadhroh",
          "units": [
            {
              "arab": "أَلَا يَا اللهُ بِنَظْرَةٍ مِنَ الْعَيْنِ الرَّحِيْمَةِ ۞ تُدَاوِيْ كُلَّ مَا بِيْ مِنْ أَمْرَاضٍ سَقِيْمَةٍ",
              "english": "O Allah, grant me a glance from Your merciful eye, which heals all the lingering diseases within me.",
              "id": "ala-yallah-binadhroh-u1",
              "latin": "Ala yallah binadhroh minal 'ainir rohimah, tudawi kulla ma bi min amrodhin saqimah",
              "translation": "Ya Allah, anugerahkanlah (kepadaku) satu pandangan dari mata rahmat-Mu yang Maha Pengasih, yang menyembuhkan semua penyakit menahun yang ada padaku."
            },
            {
              "arab": "أَلَا يَا صَاحِ يَا صَاحِ لَا تَجْزَعْ وَتَضْجَرْ ۞ وَسَلِّمْ لِلْمَقَادِيْرِ كَيْ تُحْمَدْ وَتُؤْجَرْ",
              "english": "O my friend, O my friend, do not be anxious and do not grow weary; surrender to the decrees of fate, so that you may be praised and rewarded.",
              "id": "ala-yallah-binadhroh-u2",
              "latin": "Ala ya shohi ya shohi la tajza' wa tadhjar, wa sallim lil maqadiri kai tuhmad wa tu'jar",
              "translation": "Wahai kawanku, wahai kawanku, janganlah engkau gelisah dan jangan jemu; serahkanlah (segala urusan) kepada takdir, agar engkau dipuji dan diberi pahala."
            },
            {
              "arab": "وَكُنْ رَاضِيْ بِمَا قَدَّرَ الْمَوْلَى وَدَبَّرْ ۞ وَلَا تَسْخَطْ قَضَاءَ اللهِ رَبِّ الْعَرْشِ الْأَكْبَرِ",
              "english": "And be content with what the Master (Allah) has decreed and ordained; and do not resent the decree of Allah, Lord of the Greatest Throne.",
              "id": "ala-yallah-binadhroh-u3",
              "latin": "Wa kun rodhi bima qoddarol maula wa dabbar, wa la taskhoth qodho-allahi robbil 'arsyil akbar",
              "translation": "Dan jadilah engkau ridha atas apa yang telah ditakdirkan dan diatur oleh Al-Maula (Allah); dan janganlah engkau murka (tidak rela) terhadap ketetapan Allah, Tuhan Arsy yang Maha Besar."
            },
            {
              "arab": "وَكُنْ صَابِرْ وَشَاكِرْ ۞ تَكُنْ فَائِزْ وَظَافِرْ ۞ وَمِنْ أَهْلِ السَّرَائِرِ",
              "english": "Be patient and grateful; you will be triumphant and victorious, and among the people of the inner secrets.",
              "id": "ala-yallah-binadhroh-u4",
              "latin": "Wa kun shabir wa syakir, takun fa-iz wa zhofir, wa min ahlis sara-ir",
              "translation": "Jadilah engkau orang yang sabar dan bersyukur, maka engkau akan menjadi orang yang beruntung dan menang, dan termasuk golongan ahli sirr (orang-orang yang terjaga rahasia batinnya)."
            },
            {
              "arab": "رِجَالِ اللهِ مِنْ كُلِّ ذِيْ قَلْبٍ مُنَوَّرٍ ۞ مُصَفًّى مِنْ جَمِيْعِ الدَّنَسِ طَيِّبٍ مُطَهَّرٍ",
              "english": "The men of Allah, from every possessor of an illuminated heart, purified from all defilement, good and pure.",
              "id": "ala-yallah-binadhroh-u5",
              "latin": "Rijalillahi min kulli dzi qolbin munawwar, mushoffan min jami'id danasi thoyyibin muthahhar",
              "translation": "Yaitu para hamba Allah, dari setiap pemilik hati yang bercahaya, yang disucikan dari segala noda, baik lagi suci."
            },
            {
              "arab": "وَذِهْ دُنْيَا دَنِيَّةٌ حَوَادِثُهَا كَثِيْرَةٌ ۞ وَعِيْشَتُهَا حَقِيْرَةٌ وَمُدَّتُهَا قَصِيْرَةٌ",
              "english": "This world is base, and its happenings are many; its life is contemptible, and its span is short.",
              "id": "ala-yallah-binadhroh-u6",
              "latin": "Wa dzih dunya daniyyah hawaditsuha katsiroh, wa 'isyatuha haqiroh wa muddatuha qoshiroh",
              "translation": "Dunia ini hina, dan kejadian-kejadiannya banyak; dan kehidupannya hina, serta masanya singkat."
            },
            {
              "arab": "وَلَا يَحْرِصْ عَلَيْهَا سِوَى أَعْمَى الْبَصِيْرَةِ ۞ عَدِيْمُ الْعَقْلِ لَوْ كَانَ يَعْقِلْ كَانَ فَكَّرْ",
              "english": "And none covets it except one blind in insight, devoid of reason; had he truly reasoned, he would have reflected.",
              "id": "ala-yallah-binadhroh-u7",
              "latin": "Wa la yahrish 'alaiha siwa a'mal bashiroh, 'adimul 'aqli lau kana ya'qil kana fakkar",
              "translation": "Dan tidak ada orang yang rakus terhadapnya selain orang yang buta mata hatinya, yang kehilangan akal; seandainya ia benar-benar berakal, tentu ia akan berpikir."
            },
            {
              "arab": "تَفَكَّرْ فِيْ فَنَاهَا ۞ وَفِيْ كَثْرَةِ عَنَاهَا ۞ وَفِيْ قِلَّةِ غِنَاهَا",
              "english": "Reflect on its perishing, on the abundance of its hardship, and on the scarcity of its riches.",
              "id": "ala-yallah-binadhroh-u8",
              "latin": "Tafakkar fi fanaha, wa fi katsroti 'anaha, wa fi qillati ghinaha",
              "translation": "Renungkanlah kefanaannya, dan banyaknya kepayahannya, dan sedikitnya kekayaannya."
            },
            {
              "arab": "فَطُوْبَى ثُمَّ طُوْبَى لِمَنْ مِنْهَا تَحَذَّرْ ۞ وَطَلَّقَهَا وَفِيْ طَاعَةِ الرَّحْمٰنِ شَمَّرْ",
              "english": "So blessed, truly blessed, is the one who is wary of it; he divorces it and girds himself earnestly in obedience to the Most Merciful.",
              "id": "ala-yallah-binadhroh-u9",
              "latin": "Fathuba tsumma thuba liman minha tahadzdzar, wa thollaqoha wa fi tho'atir rohmani syammar",
              "translation": "Maka beruntunglah, sungguh beruntung, orang yang waspada terhadapnya; dan ia menceraikannya (melepaskannya) serta bersungguh-sungguh dalam ketaatan kepada Ar-Rahman."
            },
            {
              "arab": "أَلَا يَا عَيْنُ جُوْدِيْ بِدَمْعٍ مِنْكِ سَائِلٍ ۞ عَلَى ذَاكَ الْحَبِيْبِ الَّذِيْ قَدْ كَانَ نَازِلْ",
              "english": "O eye, pour forth your flowing tears over that beloved who once dwelt (among us).",
              "id": "ala-yallah-binadhroh-u10",
              "latin": "Ala ya 'ainu judi bidam'in minki sa-il, 'ala dzakal habibilladzi qod kana nazil",
              "translation": "Wahai mata, curahkanlah air mata yang mengalir darimu, atas (kepergian) kekasih itu yang dahulu singgah tinggal (bersama kami)."
            },
            {
              "arab": "مَعَنَا فِي الْمَرَابِعِ وَأَصْبَحَ سَفَرًا رَاحِلًا ۞ وَأَمْسَى الْقَلْبُ وَالْبَالُ مِنْ بَعْدِهِ مُكَدَّرْ",
              "english": "He was with us in the dwelling-places, and now he has departed on his journey; and after him, heart and mind have become troubled.",
              "id": "ala-yallah-binadhroh-u11",
              "latin": "Ma'ana fil marabi' wa ashbaha safaron rohila, wa amsal qolbu wal balu min ba'dihi mukaddar",
              "translation": "(Dahulu ia) bersama kami di tempat-tempat tinggal kami, dan kini ia telah berangkat pergi; maka sepeninggalnya, hati dan pikiran menjadi keruh (sedih dan gelisah)."
            },
            {
              "arab": "وَلٰكِنْ حَسْبِيَ اللهُ ۞ وَكُلُّ الْأَمْرِ لِلهِ ۞ وَلَا يَبْقَى سِوَى اللهِ",
              "english": "But Allah is sufficient for me; all affairs belong to Allah; and nothing endures except Allah.",
              "id": "ala-yallah-binadhroh-u12",
              "latin": "Wa lakin hasbiyallah, wa kullul amri lillah, wa la yabqo siwallah",
              "translation": "Akan tetapi cukuplah Allah bagiku; dan segala urusan adalah bagi (milik) Allah; dan tidak ada yang kekal selain Allah."
            },
            {
              "arab": "عَلَى بَشَّارَ جَادَتْ سَحَائِبُ رَحْمَةِ الْبَرِّ ۞ وَحَيَّاهُمْ بِرَوْحِ الرِّضَا رَبِّيْ وَبَشَّرْ",
              "english": "Over Bashshar, may the clouds of the mercy of the Most Kind pour generously; and may my Lord greet them with the breath of His good pleasure and give them glad tidings.",
              "id": "ala-yallah-binadhroh-u13",
              "latin": "'Ala Basysyaro jadat saha-ibu rohmatil barri, wa hayyahum birouhir ridho robbi wa basysyar",
              "translation": "Semoga atas Bashshar tercurah awan-awan rahmat (Allah) Yang Maha Baik; dan semoga Tuhanku menyambut mereka dengan embusan keridhaan serta memberi mereka kabar gembira."
            },
            {
              "arab": "بِهَا سَادَاتُنَا وَالشُّيُوْخُ الْعَارِفُوْنَا ۞ وَأَهْلُوْنَا وَأَحْبَابُ قَلْبِيْ نَازِلُوْنَا",
              "english": "There are our masters, the sayyids, and the gnostic shaykhs; and our families and the beloveds of my heart are settled there.",
              "id": "ala-yallah-binadhroh-u14",
              "latin": "Biha sadatuna wasy syuyukhul 'arifuna, wa ahluna wa ahbabu qolbi naziluna",
              "translation": "Di sana terdapat para sayyid, tuan-tuan kami, dan para syekh yang 'arif (mengenal Allah); dan keluarga kami serta orang-orang yang kucintai pun bertempat di sana."
            },
            {
              "arab": "وَمَنْ هُمْ فِيْ سَرَائِرِ فُؤَادِيْ قَاطِنُوْنَا ۞ بِسَاحَةِ تُرْبِهَا مِنْ ذَكِيِّ الْمِسْكِ أَعْطَرُ",
              "english": "And those who dwell in the depths of my heart are in a courtyard whose soil is more fragrant than the sweetest musk.",
              "id": "ala-yallah-binadhroh-u15",
              "latin": "Wa man hum fi sara-iri fu-adi qothinuna, bisahati turbiha min dzakiyyil miski a'thar",
              "translation": "Dan orang-orang yang berdiam di lubuk hatiku, (mereka berada) di pelataran yang tanahnya lebih harum daripada kasturi yang paling wangi."
            },
            {
              "arab": "مَنَازِلُ خَيْرِ سَادَةٍ ۞ لِكُلِّ النَّاسِ قَادَةٍ ۞ مَحَبَّتُهُمْ سَعَادَةٌ",
              "english": "The abodes of the best of masters, leaders for all people; loving them is happiness.",
              "id": "ala-yallah-binadhroh-u16",
              "latin": "Manazilu khoiri sadah, likullin nasi qodah, mahabbatuhum sa'adah",
              "translation": "(Itulah) tempat-tempat kediaman sebaik-baik para tuan, para pemimpin bagi seluruh manusia; mencintai mereka adalah kebahagiaan."
            },
            {
              "arab": "أَلَا يَا بَخْتَ مَنْ زَارَهُمْ بِالصِّدْقِ وَانْدَرْ ۞ إِلَيْهِمْ مُعْتَنِيْ كُلُّ مَطْلُوْبِهِ تَيَسَّرْ",
              "english": "How fortunate is the one who visits them in sincerity and comes to them with earnest care; everything he seeks will be made easy for him.",
              "id": "ala-yallah-binadhroh-u17",
              "latin": "Ala ya bakhta man zarohum bish shidqi wandar, ilaihim mu'tani kullu mathlubihi tayassar",
              "translation": "Sungguh beruntung orang yang menziarahi mereka dengan tulus dan datang kepada mereka dengan penuh perhatian; semua yang ia minta akan dimudahkan."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Khobbiri",
      "slug": "khobbiri",
      "type": "SHALAWAT",
      "description": "Qasidah suluk kerinduan kepada Nabi Muhammad ﷺ yang masyhur dilantunkan dalam majelis maulid dan hadroh, dipopulerkan oleh Habib Syech bin Abdul Qodir Assegaf bersama Ahbaabul Musthofa: seorang pecinta memohon kabar kepada angin sepoi-sepoi (Nusaimah), mengaku begadang semalaman demi dapat memandang Al-Mukhtar, menolak celaan atas cintanya, dan menutupnya dengan pujian kepada Nabi sebagai yang dimuliakan, diagungkan, dan dikuatkan dengan syafaat. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 7,
    "blocks": {
      "sections": [
        {
          "id": "khobbiri-s1",
          "title": "Khobbiri",
          "units": [
            {
              "arab": "خَبِّرِيْ خَبِّرِيْ خَبِّرِيْ يَا نُسَيْمَى عَنْ مُغْرَمٍ شَذِيْ وَالْهَانْ",
              "english": "Tell me, tell me, tell me, O gentle breeze (Nusaima), about a lover who is lovesick, consumed by longing and bewildered.",
              "id": "khobbiri-u1",
              "latin": "Khobbiri khobbiri khobbiri ya nusaima, 'an mughromin syadzi wal han",
              "translation": "Berilah kabar kepadaku, wahai angin sepoi-sepoi; aku tergila-gila, aku sangat rindu dan bingung."
            },
            {
              "arab": "عَاشِقْ آهْ عَاشِقْ عَاشِقِ الْأَنْوَارْ",
              "english": "A lover — ah — a lover, a lover of the lights.",
              "id": "khobbiri-u2",
              "latin": "'Asyiq, ah, 'asyiq, 'asyiqil anwar",
              "translation": "Sang pecinta — ah — sang pecinta, sang pecinta cahaya-cahaya itu."
            },
            {
              "arab": "أَنْتِ عَنِّيْ تَشْتَكِيْنَ وَالْحَالْ كُلَّ اللَّيْلْ سَهْرَانْ",
              "english": "You carry my complaint on my behalf, while my state all night long is nothing but sleepless wakefulness (in longing).",
              "id": "khobbiri-u3",
              "latin": "Anti 'anni tasytakinna wal hal kullal laili sahron",
              "translation": "Engkau menyampaikan aduanku tentang keadaanku, sedangkan keadaanku sepanjang malam hanyalah begadang (menahan rindu)."
            },
            {
              "arab": "كَيْ أَرَى الْمُخْتَارْ كَيْ أَرَى الْمُخْتَارْ",
              "english": "So that I may behold Al-Mukhtar (the Chosen Prophet), so that I may behold Al-Mukhtar.",
              "id": "khobbiri-u4",
              "latin": "Kay arool mukhtar, kay arool mukhtar",
              "translation": "Agar aku dapat memandang Al-Mukhtar (Nabi pilihan), agar aku dapat memandang Al-Mukhtar."
            },
            {
              "arab": "مَنْ يَلُمْنِيْ فِيْ غَرَامِيْ طَالَ مَا عَاشِقْ جَمَالَكْ",
              "english": "Whoever blames me for my passionate love — for long have I been a lover of Your beauty.",
              "id": "khobbiri-u5",
              "latin": "Man yalumni fi ghoromi, tholama 'asyiq jamalak",
              "translation": "Barang siapa mencelaku karena cintaku yang membara, sungguh telah lama aku menjadi pecinta keindahan-Mu."
            },
            {
              "arab": "يَا مُكَرَّمْ يَا مُمَجَّدْ يَا مُؤَيَّدْ بِالشَّفَاعَةْ",
              "english": "O honoured one, O glorified one, O one strengthened with intercession.",
              "id": "khobbiri-u6",
              "latin": "Ya mukarrom ya mumajjad ya mu-ayyad bisy-syafa'ah",
              "translation": "Wahai yang dimuliakan, wahai yang diagungkan, wahai yang dikuatkan dengan syafaat."
            },
            {
              "arab": "هَا أَنَا أَنَا لَهَا",
              "english": "Here I am — I am the one (awaiting that intercession).",
              "id": "khobbiri-u7",
              "latin": "Haa ana, ana laha",
              "translation": "Inilah aku, akulah orangnya (yang menanti syafaat itu)."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Subhanallah",
      "slug": "subhanallah",
      "type": "SHALAWAT",
      "description": "Qasidah munajat yang dibuka dengan dzikir \"Subhanallah walhamdulillah wa la ilaha illallah\" dan masyhur dilantunkan dalam majelis shalawat dan hadroh Indonesia (antara lain dibawakan Mafia Sholawat): bait-baitnya berisi permohonan seorang hamba yang berdiri hina di pintu harapan Allah, menjadikan Rasulullah ﷺ sebagai pintu harapan dan penolong, memohon dihimpunkan dalam cahaya kemunculan Nabi ﷺ keturunan Hasyim, dituntun di jalan orang-orang saleh, dan dijaga hatinya dari setan dan hawa nafsu. Menurut Poets Gate (poetsgate.com), qasidah ini karya Al-Habib Ali bin Muhammad Al-Habsyi, pengarang Maulid Simtudduror (atribusi sumber cross-check, tidak disebut di blog). Blog sumber hanya memuat 7 dari 10 bait; 3 bait penutup dilengkapi dari Poets Gate dan kitab Majmu' Ash-Shalawat (lihat dokumen review). Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 11,
    "blocks": {
      "sections": [
        {
          "id": "subhanallah-s1",
          "title": "Subhanallah",
          "units": [
            {
              "id": "subhanallah-u1",
              "arab": "سُبْحَانَ اللهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلٰهَ إِلَّا اللهُ ۞ اللهُ اللهُ اللهُ يَا اللهُ",
              "latin": "Subhanallah walhamdulillah wa la ilaha illallah, Allah Allah Allah ya Allah",
              "translation": "Maha Suci Allah, segala puji bagi Allah, dan tidak ada tuhan selain Allah; Allah, Allah, Allah, ya Allah.",
              "english": "Glory be to Allah, all praise belongs to Allah, and there is no god but Allah; Allah, Allah, Allah, O Allah."
            },
            {
              "id": "subhanallah-u2",
              "arab": "رَبِّ إِنِّيْ يَا ذَا الصِّفَاتِ الْعَلِيَّةِ ۞ قَائِمٌ بِالْفَنَاءِ أُرِيْدُ عَطِيَّةً",
              "latin": "Robbi inni ya dzash-shifatil 'aliyyah, qo-imun bil fana uridu 'athiyyah",
              "translation": "Ya Tuhanku, sungguh aku — wahai Dzat yang memiliki sifat-sifat yang luhur — berdiri dalam kefanaan (meniadakan diri di hadapan-Mu), menginginkan sebuah pemberian (dari-Mu).",
              "english": "My Lord, indeed I — O Possessor of the exalted attributes — stand in utter self-effacement, desiring a gift (from You)."
            },
            {
              "id": "subhanallah-u3",
              "arab": "تَحْتَ بَابِ الرَّجَا وَقَفْتُ بِذُلِّيْ ۞ فَأَغِثْنِيْ بِالْقَصْدِ قَبْلَ الْمَنِيَّةِ",
              "latin": "Tahta babir-roja waqoftu bidzulli, fa-aghitsni bil qoshdi qoblal maniyyah",
              "translation": "Di bawah pintu harapan aku berdiri dengan penuh kerendahan diri; maka tolonglah aku (dengan memenuhi maksudku) sebelum datang kematian.",
              "english": "Beneath the door of hope I stand in my lowliness; so help me (by granting my aim) before death arrives."
            },
            {
              "id": "subhanallah-u4",
              "arab": "وَالرَّسُوْلُ الْكَرِيْمُ بَابُ رَجَائِيْ ۞ فَهُوَ غَوْثِيْ وَغَوْثُ كُلِّ الْبَرِيَّةِ",
              "latin": "War-rosulul karimu babu roja-i, fahuwa ghoutsi wa ghoutsu kullil bariyyah",
              "translation": "Dan Rasul yang mulia adalah pintu harapanku; ia adalah penolongku dan penolong seluruh makhluk.",
              "english": "And the noble Messenger is the door of my hope; he is my rescuer and the rescuer of all creation."
            },
            {
              "id": "subhanallah-u5",
              "arab": "فَأَغِثْنِيْ بِهِ وَبَلِّغْ فُؤَادِيْ ۞ كُلَّ مَا يَرْتَجِيْهِ مِنْ أُمْنِيَّةٍ",
              "latin": "Fa-aghitsni bihi wa balligh fu-adi, kulla ma yartajihi min umniyyah",
              "translation": "Maka tolonglah aku dengan (perantaraan)-nya, dan sampaikanlah ke hatiku segala yang diharapkannya dari cita-cita.",
              "english": "So help me through him, and convey to my heart all that it hopes for of its wishes."
            },
            {
              "id": "subhanallah-u6",
              "arab": "وَاجْمَعِ الشَّمْلَ فِيْ سُرُوْرٍ وَنُوْرٍ ۞ وَابْتِهَاجٍ بِالطَّلْعَةِ الْهَاشِمِيَّةِ",
              "latin": "Wajma'isy-syamla fi sururin wa nurin, wabtihajin bith-thol'atil hasyimiyyah",
              "translation": "Dan himpunkanlah (kami) yang tercerai-berai dalam kebahagiaan, cahaya, dan kegembiraan dengan kemunculan (Nabi) keturunan Hasyim.",
              "english": "And gather our scattered company in joy, light, and delight at the appearance of the Hashemite (the Prophet)."
            },
            {
              "id": "subhanallah-u7",
              "arab": "مَعَ صِدْقِ الْإِقْبَالِ فِيْ كُلِّ أَمْرٍ ۞ قَدْ قَصَدْنَا وَالصِّدْقِ فِيْ كُلِّ نِيَّةٍ",
              "latin": "Ma'a shidqil iqbali fi kulli amrin, qod qoshodna wash-shidqi fi kulli niyyah",
              "translation": "Bersama ketulusan menghadap (kepada-Mu) dalam setiap urusan yang kami tuju, dan ketulusan dalam setiap niat.",
              "english": "With sincere turning (to You) in every matter we aim for, and sincerity in every intention."
            },
            {
              "id": "subhanallah-u8",
              "arab": "رَبِّ فَاسْلُكْ بِنَا سَبِيْلَ رِجَالٍ ۞ سَلَكُوْا فِي التُّقَى طَرِيْقًا سَوِيَّةً",
              "latin": "Robbi fasluk bina sabili rijalin, salaku fit-tuqo thoriqon sawiyyah",
              "translation": "Ya Tuhanku, tuntunlah kami menempuh jalan orang-orang (saleh) yang telah menempuh jalan yang lurus dalam ketakwaan.",
              "english": "My Lord, make us travel the path of the (righteous) men who travelled a straight path in God-consciousness."
            },
            {
              "id": "subhanallah-u9",
              "arab": "وَاهْدِنَا رَبَّنَا لِمَا قَدْ هَدَيْتَ ۞ السَّادَةَ الْعَارِفِيْنَ أَهْلَ الْمَزِيَّةِ",
              "latin": "Wahdina robbana lima qod hadaita, as-sadatal 'arifina ahlal maziyyah",
              "translation": "Dan tunjukilah kami, wahai Tuhan kami, kepada (jalan) yang telah Engkau tunjukkan kepada para pemimpin kaum 'arifin, orang-orang yang memiliki keutamaan.",
              "english": "And guide us, our Lord, to that to which You guided the masters, the gnostics, the people of distinction."
            },
            {
              "id": "subhanallah-u10",
              "arab": "وَاجْعَلِ الْعِلْمَ مُقْتَدَانَا بِحُكْمِ ۞ الذَّوْقِ فِيْ فَهْمِ سِرِّ مَعْنَى الْمَعِيَّةِ",
              "latin": "Waj'alil 'ilma muqtadana bihukmi, adz-dzauqi fi fahmi sirri ma'nal ma'iyyah",
              "translation": "Dan jadikanlah ilmu sebagai panutan kami, dengan hukum dzauq (rasa batin) dalam memahami rahasia makna kebersamaan (dengan Allah).",
              "english": "And make knowledge our guide, by the rule of spiritual taste (dzawq) in understanding the secret of the meaning of (divine) companionship."
            },
            {
              "id": "subhanallah-u11",
              "arab": "وَاحْفَظِ الْقَلْبَ أَنْ يَلُمَّ بِهِ ۞ الشَّيْطَانُ وَالنَّفْسُ وَالْهَوَى وَالدَّنِيَّةُ",
              "latin": "Wahfazhil qolba an yalummma bihi, asy-syaithanu wan-nafsu wal hawa wad-daniyyah",
              "translation": "Dan jagalah hati (kami) agar tidak disinggahi oleh setan, nafsu, hawa keinginan, dan (dunia) yang rendah.",
              "english": "And guard the heart lest there descend upon it Satan, the ego, base desire, and lowliness."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Yaa Nabinal Hadi",
      "slug": "yaa-nabinal-hadi",
      "type": "SHALAWAT",
      "description": "Qasidah pujian dan permohonan kepada Nabi Muhammad ﷺ sebagai pemberi petunjuk keturunan Adnan dan rahasia cahaya alam semesta: penyair memohon kasih sayang dan penjagaan beliau, satu pandangan perhatian, kabar gembira dan terkabulnya segala harapan, serta taufik dan perbaikan keadaan, ditutup dengan salam penghormatan tertinggi bagi beliau, keluarganya, dan para sahabatnya sepanjang zaman. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 8,
    "blocks": {
      "sections": [
        {
          "id": "yaa-nabinal-hadi-s1",
          "title": "Yaa Nabinal Hadi",
          "units": [
            {
              "arab": "يَا نَبِيَّنَا الْهَادِي الْعَدْنَانِي ۞ يَا سِرَّ نُوْرِ الْأَكْوَانِ",
              "english": "O our Prophet, the Guide, the descendant of Adnan; O secret of the light of all the worlds.",
              "id": "yaa-nabinal-hadi-u1",
              "latin": "Ya nabinal hadil 'adnani, ya sirro nuril akwani",
              "translation": "Wahai Nabi kami, sang pemberi petunjuk keturunan Adnan; wahai rahasia cahaya alam semesta."
            },
            {
              "arab": "اِعْطِفْ عَلَيَّ وَارْعَانِي ۞ بِمَا أَتَى فِي الْقُرْآنِ",
              "english": "Be tender toward me and watch over me, for the sake of what has come in the Qur'an.",
              "id": "yaa-nabinal-hadi-u2",
              "latin": "I'thif 'alayya war'ani, bima ata fil Qur-ani",
              "translation": "Sayangilah aku dan jagalah aku, demi apa yang telah datang di dalam Al-Qur'an."
            },
            {
              "arab": "حَبِيْبِي يَا أَبَا الزَّهْرَاءِ ۞ أَرْجُو أَحْظَى مِنْكَ بِنَظْرَةْ",
              "english": "My beloved, O Abu az-Zahra, I hope to be granted a glance from you.",
              "id": "yaa-nabinal-hadi-u3",
              "latin": "Habibi ya Abaz-Zahro, arju ahzho minka binazhroh",
              "translation": "Kekasihku, wahai Abu az-Zahra', aku berharap memperoleh pandangan (perhatian) darimu."
            },
            {
              "arab": "عَسَايَ أَحْظَى بِالْبُشْرَى ۞ أَنَالُ مِنْكَ الْأَمَانِيْ",
              "english": "May I be granted the glad tidings, and obtain from you all that I hope for.",
              "id": "yaa-nabinal-hadi-u4",
              "latin": "'Asaya ahzho bil busyro, analu minkal amani",
              "translation": "Semoga aku memperoleh kabar gembira, dan aku mendapatkan darimu segala harapanku."
            },
            {
              "arab": "مَا لِي سِوَاكَ يَرْحَمُ حَالِي ۞ يَا مُنَى رُوْحِي وَآمَالِيْ",
              "english": "I have no one but you to have mercy on my condition; O desire of my soul and all my hopes.",
              "id": "yaa-nabinal-hadi-u5",
              "latin": "Ma li siwaka yarhamu hali, ya muna ruhi wa amali",
              "translation": "Aku tidak memiliki siapa pun selainmu yang menyayangi keadaanku; wahai dambaan jiwaku dan segala harapanku."
            },
            {
              "arab": "وَفِّقْنِي وَاصْلِحْ أَحْوَالِي ۞ أَيَا حَبِيْبَ الرَّحْمٰنِ",
              "english": "Grant me success and set my affairs aright, O beloved of the Most Merciful.",
              "id": "yaa-nabinal-hadi-u6",
              "latin": "Waffiqni washlih ahwali, aya habibir-Rahmani",
              "translation": "Berikanlah aku taufik dan perbaikilah keadaanku, wahai kekasih Dzat Yang Maha Pengasih."
            },
            {
              "arab": "عَلَيْكَ يَا خَيْرَ الْأَنَامِ ۞ أَزْكَى التَّحِيَّةِ وَالسَّلَامِ",
              "english": "Upon you, O best of mankind, be the purest greetings and peace.",
              "id": "yaa-nabinal-hadi-u7",
              "latin": "'Alaika ya khoirol anami, azkat-tahiyyati was-salami",
              "translation": "Bagimu, wahai sebaik-baik makhluk, penghormatan dan salam yang paling suci."
            },
            {
              "arab": "وَالْآلِ وَالصَّحْبِ الْكِرَامِ ۞ عَلَى مَمَرِّ الْأَزْمَانِ",
              "english": "And upon your family and your noble Companions, throughout the passing of the ages.",
              "id": "yaa-nabinal-hadi-u8",
              "latin": "Wal ali wash-shohbil kiromi, 'ala mamarril azmani",
              "translation": "Dan (juga) bagi keluarga serta para sahabat yang mulia, sepanjang berlalunya zaman."
            }
          ]
        }
      ]
    }
  }
];
