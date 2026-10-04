// PAYLOAD SEMENTARA — impor batch 2 qasidah (6 judul) sebagai DRAFT.
// Sumber teks: wakidyusuf.wordpress.com (dipilih Juple dari
// files/list-konten-wakidyusuf.md; termasuk Khashoisul Asyaroh no. 59
// hasil koreksi scope Juple), masing-masing sudah di-cross-check
// kelengkapan bait ke sumber kedua; Arab direkonstruksi bersih, Latin
// disusun ulang, Artinya dari blog dengan pembersihan/koreksi
// terdokumentasi, English baru. Dokumen review: qasidah-batch2/*.md
// di workspace goal. Dihapus bersama route import-qasidah-batch2
// setelah eksekusi terverifikasi.
import type { ArticleBlocks } from "./db-types.ts";

export interface Batch2Article {
  meta: { title: string; slug: string; type: "SHALAWAT" | "MAULID"; description: string };
  expectedUnits: number;
  blocks: ArticleBlocks;
}

export const BATCH2_ARTICLES: Batch2Article[] = [
  {
    "meta": {
      "title": "Khashoisul Asyaroh",
      "slug": "khashoisul-asyaroh",
      "type": "SHALAWAT",
      "description": "Nadzham Khashoisul Asyaroh — dikenal sebagai Lam Yahtalim — adalah syair masyhur tentang sepuluh kekhususan Nabi Muhammad ﷺ: tidak pernah mimpi basah dan tidak pernah menguap, binatang tidak lari darinya dan lalat tidak hinggap di tubuhnya, melihat ke belakang seperti ke depan, hingga telah dikhitan sejak lahir. Bait-bait ini termuat antara lain dalam kitab Maraqi al-'Ubudiyyah karya Syekh Muhammad Nawawi al-Bantani. Teks Arab, Latin, terjemahan Indonesia, dan English. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 6,
    "blocks": {
      "sections": [
        {
          "id": "khashoisul-asyaroh-s1",
          "title": "Khashoisul Asyaroh",
          "units": [
            {
              "id": "khashoisul-asyaroh-u1",
              "arab": "لَمْ يَحْتَلِمْ قَطُّ طٰهَ مُطْلَقًا أَبَدًا ۞ وَمَا تَثَائَبَ أَصْلًا فِيْ مَدَى الزَّمَنِ",
              "latin": "Lam yahtalim qotthu Thoha muthlaqon abada, wa ma tatsa'aba ashlan fi madaz-zamani",
              "translation": "Rasulullah tidak pernah mimpi bersetubuh, baik sebelum menjadi nabi maupun setelahnya. Beliau juga sama sekali tidak pernah menguap sepanjang masa.",
              "english": "Thoha (the Prophet Muhammad) never once had a wet dream, at any time whatsoever, and he never yawned at all throughout his entire life."
            },
            {
              "id": "khashoisul-asyaroh-u2",
              "arab": "مِنْهُ الدَّوَابُ فَلَمْ تَهْرَبْ وَمَا وَقَعَتْ ۞ ذُبَابَةٌ أَبَدًا فِيْ جِسْمِهِ الْحَسَنِ",
              "latin": "Minhud-dawabu falam tahrob wa ma waqo'at, dzubabatun abadan fi jismihil hasani",
              "translation": "Tidak ada satu pun binatang yang melarikan diri (liar) dari beliau. Dan tidak pernah ada lalat hinggap di tubuh beliau yang mulia.",
              "english": "No animal ever fled from him, and not a single fly ever landed upon his beautiful body."
            },
            {
              "id": "khashoisul-asyaroh-u3",
              "arab": "بِخَلْفِهِ كَأَمَامٍ رُؤْيَةٌ ثَبَتَتْ ۞ وَلَا يُرَى أَثْرُ بَوْلٍ مِنْهُ فِيْ عَلَنِ",
              "latin": "Bikhalfihi ka-amamin ru'yatun tsabatat, wa la yuro atsru baulin minhu fi 'alani",
              "translation": "Beliau bisa mengetahui sesuatu yang ada di belakangnya, seperti beliau melihat sesuatu itu yang ada di hadapannya. Bekas air kencing beliau tidak pernah dilihat di permukaan bumi.",
              "english": "His sight behind him was as firmly established as his sight before him, and no trace of his urine was ever seen upon the surface of the earth."
            },
            {
              "id": "khashoisul-asyaroh-u4",
              "arab": "وَقَلْبُهُ لَمْ يَنَمْ وَالْعَيْنُ قَدْ نَعَسَتْ ۞ وَلَا يُرَى ظِلَّهُ فِيْ الشَّمْسِ ذُوْ فَطِنِ",
              "latin": "Wa qolbuhu lam yanam wal-'ainu qod na'asat, wa la yuro zhillahu fisy-syamsi dzu fathini",
              "translation": "Hati beliau tidak pernah tidur, walaupun mata beliau mengantuk. Bayangan beliau tidak dapat dilihat oleh orang yang cerdas sekalipun ketika beliau terkena sinar matahari.",
              "english": "His heart never slept, though his eyes grew drowsy; and no discerning person could ever see his shadow in the sunlight."
            },
            {
              "id": "khashoisul-asyaroh-u5",
              "arab": "كَتْفَاهُ قَدْ عَلَتَا قَوْمًا إِذَا جَلَسُوْا ۞ عِنْدَ الْوِلَادَةِ صِفْ يَا ذَا بِمُخْتَتَنِ",
              "latin": "Katfahu qod 'alata qouman idza jalasu, 'indal-wiladati shif ya dza bimukhtatani",
              "translation": "Dua pundak beliau selalu terlihat lebih tinggi dari pundak orang-orang yang duduk bersama beliau. Ceritakanlah sifat beliau bahwa beliau telah dikhitan semenjak dilahirkan.",
              "english": "His two shoulders rose above those of any people seated with him; and describe him, O listener, as one already circumcised at his birth."
            },
            {
              "id": "khashoisul-asyaroh-u6",
              "arab": "هٰذِهِ الْخَصَائِصَ فَاحْفَظْهَا تَكُنْ آمِنًا ۞ مِنْ شَرِّ نَارٍ وَسُرَّاقٍ وَمِنْ مِحَنِ",
              "latin": "Hadzihil khosho-isha fahfazhha takun aminan, min syarri narin wa surroqin wa min mihani",
              "translation": "Ini semua merupakan keistimewaan beliau, hendaknya engkau hafalkan bait tersebut, niscaya engkau mendapat perlindungan dari bahaya kebakaran, pencurian, dan musibah.",
              "english": "These are his special qualities — memorize them, and you shall be safe from the evil of fire, of thieves, and of calamities."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Ya Rasulallah Salamun Alaik",
      "slug": "ya-rasulallah-salamun-alaik",
      "type": "SHALAWAT",
      "description": "Ya Rasulallah Salamun Alaik adalah qasidah qiyam yang sangat masyhur dan kerap dibaca saat mahallul qiyam, antara lain dalam rangkaian Maulid Diba'i: salam kepada Rasulullah ﷺ, pengakuan kedekatan dengan Tanah Haram, dan wasilah melalui Ahlul Bait, ditutup doa Rabbi fanfa'na. Teks Arab, Latin, terjemahan Indonesia, dan English. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 21,
    "blocks": {
      "sections": [
        {
          "id": "ya-rasulallah-salamun-alaik-s1",
          "title": "Ya Rasulallah Salamun Alaik",
          "units": [
            {
              "id": "ya-rasulallah-salamun-alaik-u1",
              "arab": "يَا رَسُوْلَ اللهِ سَلَامٌ عَلَيْكَ ۞ يَا رَفِيْعَ الشَّانِ وَالدَّرَجِ",
              "latin": "Ya Rasulallah salamun 'alaik, ya rafi'asy-syani wad-daraji",
              "translation": "Wahai utusan Allah, semoga keselamatan tetap padamu; wahai yang berbudi luhur dan bermartabat tinggi.",
              "english": "O Messenger of Allah, peace be upon you; O you of lofty standing and high rank."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u2",
              "arab": "عَطْفَةً يَا جِيْرَةَ الْعَلَمِ ۞ يَا أُهَيْلَ الْجُوْدِ وَالْكَرَمِ",
              "latin": "'Athfatan ya jiratal 'alami, ya uhailal judi wal karami",
              "translation": "(Kami mengharap) belas kasihmu, wahai tetangga al-'Alam, wahai ahli kedermawanan dan kemurahan hati.",
              "english": "We seek your tender compassion, O neighbour of al-'Alam, O people of generosity and nobility."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u3",
              "arab": "نَحْنُ جِيْرَانٌ بِذَا الْحَرَمِ ۞ حَرَمِ الْإِحْسَانِ وَالْحَسَنِ",
              "latin": "Nahnu jiranun bidzal harami, haramil ihsani wal hasani",
              "translation": "Kami adalah tetangga di Tanah Haram ini, Tanah Haram tempat berbuat baik dan memberi kebaikan.",
              "english": "We are neighbours in this Sacred Land, the sanctuary of beneficence and goodness."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u4",
              "arab": "نَحْنُ مِنْ قَوْمٍ بِهِ سَكَنُوْا ۞ وَبِهِ مِنْ خَوْفِهِمْ أَمِنُوْا",
              "latin": "Nahnu min qaumin bihi sakanu, wa bihi min khaufihim aminu",
              "translation": "Kami berasal dari kaum yang tinggal di tempat itu, dan berkat tempat itu mereka merasa aman dari ketakutan mereka.",
              "english": "We are of a people who dwelt in that place, and through it they were kept safe from their fears."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u5",
              "arab": "وَبِآيَاتِ الْقُرْآنِ عُنُوْا ۞ فَاتَّئِدْ فِيْنَا أَخَا الْوَهَنِ",
              "latin": "Wa bi ayatil Qur'ani 'unu, fatta'id fina akhal wahani",
              "translation": "Dan dengan ayat-ayat Al-Qur'an mereka mendapat inayah (penjagaan). Maka renungkanlah hal ini dalam diri kita, wahai orang yang lemah.",
              "english": "And by the verses of the Qur'an they were cared for; so reflect on this within ourselves, O weak one."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u6",
              "arab": "نَعْرِفُ الْبَطْحَاءَ وَتَعْرِفُنَا ۞ وَالصَّفَا وَالْبَيْتُ يَأْلَفُنَا",
              "latin": "Na'riful bath-ha'a wa ta'rifuna, wash-shafa wal baitu ya'lafuna",
              "translation": "Kami mengenal Batha' dan ia mengenal kami; Bukit Shafa dan Baitullah pun akrab dengan kami.",
              "english": "We know al-Batha' and it knows us; as-Safa and the House (the Ka'ba) are familiar with us."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u7",
              "arab": "وَلَنَا الْمَعْلَىٰ وَخَيْفُ مِنًى ۞ فَاعْلَمَنْ هٰذَا وَكُنْ زَكِنِ",
              "latin": "Wa lanal ma'la wa khaifu Mina, fa'laman hadza wa kun zakini",
              "translation": "Kami memiliki Ma'la dan Khaif di Mina. Ketahuilah hal ini dan pahamilah dengan sungguh-sungguh.",
              "english": "Ours are al-Ma'la and the Khaif of Mina; know this well and understand it."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u8",
              "arab": "وَلَنَا خَيْرُ الْأَنَامِ أَبُ ۞ وَعَلِيٌّ الْمُرْتَضَىٰ حَسَبُ",
              "latin": "Wa lana khairul anami abu, wa 'Aliyyul murtadha hasabu",
              "translation": "Kami mempunyai sebaik-baik manusia (Nabi ﷺ) sebagai ayah, dan Ali al-Murtadha sebagai keturunan yang mulia.",
              "english": "We have the best of mankind as a father, and 'Ali al-Murtada as a noble lineage."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u9",
              "arab": "وَإِلَى السِّبْطَيْنِ نَنْتَسِبُ ۞ نَسَبًا مَا فِيْهِ مِنْ دَخَنِ",
              "latin": "Wa ilas-sibthaini nantasibu, nasaban ma fihi min dakhani",
              "translation": "Dan kepada kedua cucu Nabi (Hasan dan Husain) kami menasabkan diri — nasab yang tidak ada kotoran asap di dalamnya.",
              "english": "And to the Prophet's two grandsons we trace our descent — a lineage in which there is no stain."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u10",
              "arab": "كَمْ إِمَامٍ بَعْدَهُ خَلَفُوْا ۞ مِنْهُ سَادَاتٌ بِذَا عُرِفُوْا",
              "latin": "Kam imamin ba'dahu khalafu, minhu sadatun bidza 'urifu",
              "translation": "Betapa banyak imam yang menggantikannya sesudahnya; dari keturunannya, para sayyid dikenal dengan sebutan (imam) itu.",
              "english": "How many imams succeeded him after him; from his progeny, noble masters were known by that title."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u11",
              "arab": "وَبِهٰذَا الْوَصْفِ قَدْ وُصِفُوْا ۞ مِنْ قَدِيْمِ الدَّهْرِ وَالزَّمَنِ",
              "latin": "Wa bi hadzal washfi qad wushifu, min qadimid-dahri waz-zamani",
              "translation": "Dan mereka telah disifati dengan sifat ini sejak masa dan zaman terdahulu.",
              "english": "And they have been described with this description since the earliest days and times."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u12",
              "arab": "مِثْلُ زَيْنِ الْعَابِدِيْنَ عَلِيْ ۞ وَابْنِهِ الْبَاقِرِ خَيْرِ وَلِيْ",
              "latin": "Mitslu Zainil 'Abidin 'Ali, wabnihil Baqir khairi wali",
              "translation": "Seperti Imam Ali Zainal Abidin, dan putranya Imam al-Baqir, sebaik-baik wali (kekasih Allah).",
              "english": "Like 'Ali Zayn al-'Abidin, and his son al-Baqir, the best of saints."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u13",
              "arab": "وَالْإِمَامِ الصَّادِقِ الْحَفِلِ ۞ وَعَلِيٍّ ذِي الْعُلَا الْيَقِنِ",
              "latin": "Wal imamish Shadiqil hafili, wa 'Aliyyi dzil 'ulal yaqini",
              "translation": "Dan Imam ash-Shadiq yang penuh kemuliaan, dan Imam Ali yang memiliki ketinggian dan keyakinan.",
              "english": "And Imam as-Sadiq, full of honour, and 'Ali, possessed of loftiness and certainty."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u14",
              "arab": "فَهُمُ الْقَوْمُ الَّذِيْنَ هُدُوْا ۞ وَبِفَضْلِ اللهِ قَدْ سَعِدُوْا",
              "latin": "Fahumul qaumul ladzina hudu, wa bi fadhlillahi qad sa'idu",
              "translation": "Mereka adalah kaum yang mendapat petunjuk, dan berkat anugerah Allah mereka telah beruntung.",
              "english": "They are the people who were guided, and by Allah's grace they attained felicity."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u15",
              "arab": "وَلِغَيْرِ اللهِ مَا قَصَدُوْا ۞ وَمَعَ الْقُرْآنِ فِيْ قَرَنِ",
              "latin": "Wa li ghairillahi ma qashadu, wa ma'al Qur'ani fi qarani",
              "translation": "Mereka tidak bertujuan kepada selain Allah, dan mereka selalu bersama Al-Qur'an secara beriringan.",
              "english": "They aimed at nothing other than Allah, and they remained ever in the company of the Qur'an."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u16",
              "arab": "أَهْلُ بَيْتِ الْمُصْطَفَى الطُّهُرِ ۞ هُمْ أَمَانُ الْأَرْضِ فَادَّكِرِ",
              "latin": "Ahlul baitil Musthafath-thuhuri, hum amanul ardhi faddakiri",
              "translation": "Ahlul Bait Nabi yang terpilih lagi suci; merekalah pengaman bumi, maka ingatlah.",
              "english": "The pure Household of the Chosen Prophet; they are the security of the earth, so remember."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u17",
              "arab": "شُبِّهُوْا بِالْأَنْجُمِ الزُّهُرِ ۞ مِثْلَمَا قَدْ جَاءَ فِي السُّنَنِ",
              "latin": "Syubbihu bil anjumiz-zuhuri, mitslama qad ja'a fis-sunani",
              "translation": "Mereka diumpamakan dengan bintang-bintang yang gemerlap, sebagaimana keterangan yang telah datang dalam hadis-hadis.",
              "english": "They were likened to radiant stars, just as has been reported in the traditions."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u18",
              "arab": "وَسَفِيْنٌ لِلنَّجَاةِ إِذَا ۞ خِفْتَ مِنْ طُوْفَانِ كُلِّ أَذَىٰ",
              "latin": "Wa safinun linnajati idza, khifta min thufani kulli adza",
              "translation": "Dan (mereka bagaikan) perahu keselamatan ketika engkau takut pada badai segala yang menyakitkan.",
              "english": "And they are a ship of salvation when you fear the flood of every harm."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u19",
              "arab": "فَانْجُ فِيْهَا لَا تَكُنْ كَذَا ۞ وَاعْتَصِمْ بِاللهِ وَاسْتَعِنِ",
              "latin": "Fanju fiha la takun kadza, wa'tashim billahi wasta'ini",
              "translation": "Maka selamatlah di dalamnya, janganlah engkau tidak (menaikinya); berpegang teguhlah kepada Allah dan mintalah pertolongan.",
              "english": "So be saved aboard it — do not be otherwise; hold fast to Allah and seek His help."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u20",
              "arab": "رَبِّ فَانْفَعْنَا بِبَرْكَتِهِمْ ۞ وَاهْدِنَا الْحُسْنَىٰ بِحُرْمَتِهِمْ",
              "latin": "Rabbi fanfa'na bi barkatihim, wahdinal husna bi hurmatihim",
              "translation": "Ya Allah, dengan berkah mereka berilah kami kemanfaatan, dan dengan kehormatan mereka tunjukkanlah kami kepada kebaikan.",
              "english": "Our Lord, benefit us through their blessing, and guide us to goodness for their sake."
            },
            {
              "id": "ya-rasulallah-salamun-alaik-u21",
              "arab": "وَأَمِتْنَا فِيْ طَرِيْقَتِهِمْ ۞ وَمُعَافَاةٍ مِنَ الْفِتَنِ",
              "latin": "Wa amitna fi thariqatihim, wa mu'afatin minal fitani",
              "translation": "Dan wafatkanlah kami di jalan mereka, dalam keadaan selamat dari segala fitnah.",
              "english": "And cause us to die upon their path, in safety from all tribulations."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Ya Sayyidi Ya Rasulallah",
      "slug": "ya-sayyidi-ya-rasulallah",
      "type": "SHALAWAT",
      "description": "Qasidah Ya Sayyidi Ya Rasulallah Khudz Biyadi — \"Wahai tuanku, wahai Rasulullah, peganglah tanganku\" — adalah qasidah tawassul karya Sultan Abdul Hamid Khan bin Sultan Ahmad Khan yang masyhur dilantunkan Abah Guru Sekumpul, berisi pujian kepada Nabi Muhammad ﷺ dan permohonan syafaat serta pandangan ridha beliau. Teks Arab, Latin, terjemahan Indonesia, dan English. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 10,
    "blocks": {
      "sections": [
        {
          "id": "ya-sayyidi-ya-rasulallah-s1",
          "title": "Ya Sayyidi Ya Rasulallah",
          "units": [
            {
              "id": "ya-sayyidi-ya-rasulallah-u1",
              "arab": "يَا سَيِّدِيْ يَا رَسُوْلَ اللهِ خُذْ بِيَدِيْ ۞ مَالِيْ سِوَاكَ وَلَا أَلْوِيْ عَلَى أَحَدٍ",
              "latin": "Ya Sayyidi Ya Rasulallah khudz biyadi, mali siwaka wa la alwi 'ala ahadi",
              "translation": "Wahai tuanku, wahai Rasulullah, peganglah tanganku. Aku tidak mempunyai siapa pun selain Engkau, dan aku tidak berpaling kepada siapa pun.",
              "english": "O my master, O Messenger of Allah, take hold of my hand. I have no one but You, and I turn away to no one else."
            },
            {
              "id": "ya-sayyidi-ya-rasulallah-u2",
              "arab": "فَأَنْتَ نُوْرُ الْهُدَى فِيْ كُلِّ كَائِنَةٍ ۞ وَأَنْتَ سِرُّ النَّدَى يَا خَيْرَ مُعْتَمَدِيْ",
              "latin": "Fa anta nurul huda fi kulli ka-inatin, wa anta sirrun-nada ya khoiro mu'tamadi",
              "translation": "Engkaulah cahaya petunjuk pada setiap makhluk, dan Engkaulah rahasia kedermawanan, wahai sebaik-baik tempatku bersandar.",
              "english": "For You are the light of guidance in every created being, and You are the secret of generosity, O best of those in whom I place my reliance."
            },
            {
              "id": "ya-sayyidi-ya-rasulallah-u3",
              "arab": "وَأَنْتَ حَقًّا غِيَاثُ الْخَلْقِ أَجْمَعِيْنَا ۞ وَأَنْتَ هَادِي الْوَرَى لِلَّهِ ذِي السَّدَدِ",
              "latin": "Wa anta haqqon ghiyatsul kholqi ajma'ina, wa anta hadil waro lillahi dzis-sadadi",
              "translation": "Engkau sungguh-sungguh penolong seluruh makhluk semuanya, dan Engkaulah penunjuk manusia kepada Allah, Pemilik kebenaran.",
              "english": "And You are truly the succour of all creation, every one of them, and You are the guide of mankind to Allah, the Lord of right direction."
            },
            {
              "id": "ya-sayyidi-ya-rasulallah-u4",
              "arab": "يَا مَنْ يَقُوْمُ مَقَامَ الْحَمْدِ مُنْفَرِدًا ۞ لِلْوَاحِدِ الْفَرْدِ وَلَمْ يُوْلَدْ وَلَمْ يَلِدِ",
              "latin": "Ya man yaqumu maqomal hamdi munfaridan, lil wahidil fardi wa lam yulad wa lam yalid",
              "translation": "Wahai beliau yang berdiri sendiri menempati maqam pujian, bagi Allah Yang Maha Esa, Maha Tunggal, yang tidak dilahirkan dan tidak melahirkan.",
              "english": "O the one who stands alone in the Station of Praise, for the One, the Single, who was not born and who did not beget."
            },
            {
              "id": "ya-sayyidi-ya-rasulallah-u5",
              "arab": "يَا مَنْ تَفَجَّرَتِ الْأَنْهَارُ نَابِعَةً ۞ مِنْ أُصْبُعَيْهِ فَرَوَى الْجَيْشَ بِالْمَدَدِ",
              "latin": "Ya man tafajjarotil anharu nabi'atan, min ushbu'aihi farowal jaisya bil madadi",
              "translation": "Wahai beliau yang sungai-sungai memancar dari kedua jarinya, lalu beliau memberi minum pasukan dengan air pertolongan itu.",
              "english": "O the one from whose two fingers rivers burst forth gushing, so that he gave the army to drink by that divine aid."
            },
            {
              "id": "ya-sayyidi-ya-rasulallah-u6",
              "arab": "إِنِّيْ إِذَا سَامَنِيْ ضَيْمٌ يُرَوِّعُنِيْ ۞ أَقُوْلُ يَا سَيِّدَ السَّادَاتِ يَا سَنَدِيْ",
              "latin": "Inni idza samani dhoimun yurowwi'uni, aqulu ya sayyidas-sadati ya sanadi",
              "translation": "Sesungguhnya apabila kezaliman menimpa dan menakutkanku, aku berkata: wahai pemimpin para tuan, wahai sandaranku.",
              "english": "Truly, whenever injustice afflicts me and fills me with fear, I say: O master of masters, O my support."
            },
            {
              "id": "ya-sayyidi-ya-rasulallah-u7",
              "arab": "كُنْ لِيْ شَفِيْعًا إِلَى الرَّحْمٰنِ مِنْ زَلَلِيْ ۞ وَامْنُنْ عَلَيْنَا بِمَا لَا كَانَ فِي الْخَلَدِ",
              "latin": "Kun li syafi'an ilar-Rahmani min zalali, wamnun 'alaina bima la kana fil kholadi",
              "translation": "Jadilah pemberi syafaat bagiku kepada Allah Yang Maha Pengasih atas kesalahanku, dan karuniakanlah kepada kami anugerah yang belum pernah terlintas dalam benak.",
              "english": "Be my intercessor before the Most Merciful for my slip, and bestow upon us what has never even crossed a mind."
            },
            {
              "id": "ya-sayyidi-ya-rasulallah-u8",
              "arab": "وَانْظُرْ بِعَيْنِ الرِّضَا لِيْ دَائِمًا أَبَدًا ۞ وَاسْتُرْ بِفَضْلِكَ تَقْصِيْرِيْ مَدَى الْأَمَدِ",
              "latin": "Wandhur bi 'ainir-ridho li da-iman abada, wastur bi fadhlika taqshiri madal amadi",
              "translation": "Pandanglah aku dengan pandangan ridha, selalu, selama-lamanya; dan tutuplah kekuranganku dengan karunia-Mu sepanjang masa.",
              "english": "Look upon me with the eye of Your pleasure, always and forever; and veil my shortcomings with Your grace for the whole length of time."
            },
            {
              "id": "ya-sayyidi-ya-rasulallah-u9",
              "arab": "إِنِّيْ تَوَسَّلْتُ بِالْمُخْتَارِ أَشْرَفِ مَنْ ۞ رَقَى السَّمَاوَاتِ سِرِّ الْوَاحِدِ الْأَحَدِ",
              "latin": "Inni tawassaltu bil mukhtari asyrofi man, roqos-samawati sirril wahidil ahadi",
              "translation": "Sesungguhnya aku bertawassul dengan al-Mukhtar (Nabi yang terpilih), yang termulia di antara orang-orang yang naik menembus langit-langit, rahasia Allah Yang Maha Esa, Maha Tunggal.",
              "english": "Truly I seek intercession through the Chosen One, the noblest of those who ascended through the heavens, the secret of the One, the Only."
            },
            {
              "id": "ya-sayyidi-ya-rasulallah-u10",
              "arab": "عَلَيْهِ أَزْكَى صَلَاةٍ لَمْ تَزَلْ أَبَدًا ۞ مَعَ السَّلَامِ بِلَا حَصْرٍ وَلَا عَدَدٍ",
              "latin": "'Alaihi azka sholatin lam tazal abada, ma'as-salami bila hashrin wa la 'adadi",
              "translation": "Atas beliau shalawat yang paling suci, yang tidak pernah berhenti selama-lamanya, beserta salam yang tanpa batas dan tanpa hitungan.",
              "english": "Upon him be the purest blessings, unceasing forever, together with peace without limit and without number."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Sholatun Bissalamil Mubin",
      "slug": "sholatun-bissalamil-mubin",
      "type": "SHALAWAT",
      "description": "Qasidah Sholatun Bissalamil Mubin adalah shalawat pujian yang populer — antara lain dibawakan oleh Habib Syech — tentang Nabi Muhammad ﷺ sebagai asal penciptaan sejak firman Kun fayakun, pemberi peringatan dan penolong yang membukakan jalan petunjuk, yang dahinya bercahaya dan datang membawa kebenaran yang nyata. Teks Arab, Latin, terjemahan Indonesia, dan English. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 7,
    "blocks": {
      "sections": [
        {
          "id": "sholatun-bissalamil-mubin-s1",
          "title": "Sholatun Bissalamil Mubin",
          "units": [
            {
              "id": "sholatun-bissalamil-mubin-u1",
              "arab": "صَلَاةٌ بِالسَّلَامِ الْمُبِيْنِ ۞ لِنُقْطَةِ التَّعْيِيْنِ يَا غَرَامِيْ",
              "latin": "Sholatun bissalamil mubini, linuqthotit-ta'yini ya ghoromi",
              "translation": "Shalawat serta salam yang nyata bagi sosok yang dipilih, wahai cintaku.",
              "english": "Blessings with a clear salutation of peace for the chosen one — the point of appointment — O my love."
            },
            {
              "id": "sholatun-bissalamil-mubin-u2",
              "arab": "نَبِيٌّ كَانَ أَصْلَ التَّكْوِيْنِ ۞ مِنْ عَهْدِ كُنْ فَيَكُوْنُ يَا غَرَامِيْ",
              "latin": "Nabiyyun kana ashlat-takwini, min 'ahdi Kun fayakunu ya ghoromi",
              "translation": "Seorang Nabi yang menjadi asal penciptaan, sejak masa diucapkannya firman “Kun fayakun” (Jadilah, maka jadilah), wahai cintaku.",
              "english": "A Prophet who was the origin of all creation, from the time of the word 'Be! — and it is,' O my love."
            },
            {
              "id": "sholatun-bissalamil-mubin-u3",
              "arab": "أَيَا مَنْ جَاءَنَا حَقًّا نَذِيْرِ ۞ مُغِيْثًا مُسْبِلًا سُبُلَ الرَّشَادِ",
              "latin": "Aya man ja-ana haqqon nadziri, mughitsan musbilan subular-rosyadi",
              "translation": "Wahai engkau yang datang kepada kami sebagai pemberi peringatan yang sebenarnya, penolong yang membukakan jalan-jalan petunjuk.",
              "english": "O you who truly came to us as a warner, a helper who opens wide the paths of right guidance."
            },
            {
              "id": "sholatun-bissalamil-mubin-u4",
              "arab": "أَيَا خَيْرَ الْمَلَا وَالْأُوْلَى ۞ قَدْرًا عَظَّمَ اللهُ",
              "latin": "Aya khoirol mala wal ula, qodron 'adhdhomallah",
              "translation": "Wahai sebaik-baik makhluk dan yang paling utama, yang kedudukannya telah diagungkan oleh Allah.",
              "english": "O best of creation and the highest in rank, whose standing Allah has magnified."
            },
            {
              "id": "sholatun-bissalamil-mubin-u5",
              "arab": "أَيَا خَيْرَ الْمَلَا وَالْأُوْلَى ۞ قَدْرًا شَرَّفَ اللهُ",
              "latin": "Aya khoirol mala wal ula, qodron syarrofallah",
              "translation": "Wahai sebaik-baik makhluk dan yang paling utama, yang kedudukannya telah dimuliakan oleh Allah.",
              "english": "O best of creation and the highest in rank, whose standing Allah has ennobled."
            },
            {
              "id": "sholatun-bissalamil-mubin-u6",
              "arab": "رَسُوْلُ اللهِ يَا ضَاوِي الْجَبِيْنِ ۞ وَيَا مَنْ جَاءَ بِالْحَقِّ الْمُبِيْنِ",
              "latin": "Rasulullahi ya dhowil jabini, wa ya man ja-a bil-haqqil mubini",
              "translation": "Wahai Rasulullah yang dahinya bercahaya, wahai engkau yang datang dengan kebenaran yang nyata.",
              "english": "O Messenger of Allah, O you whose forehead shines with light, and O you who came with the clear truth."
            },
            {
              "id": "sholatun-bissalamil-mubin-u7",
              "arab": "صَلَاةٌ لَمْ تَزَلْ تُتْلَى عَلَيْكَ ۞ كَمِعْطَارِ النَّسِيْمِ تُهْدَى إِلَيْكَ",
              "latin": "Sholatun lam tazal tutla 'alaika, kami'thorin-nasimi tuhda ilaika",
              "translation": "Shalawat senantiasa terlantun atasmu, bagaikan semilir angin yang wangi yang dihadiahkan kepadamu.",
              "english": "Blessings that are unceasingly recited upon you, like a fragrant breeze presented as a gift to you."
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Assalamualaik",
      "slug": "assalamualaik",
      "type": "SHALAWAT",
      "description": "Qasidah Assalamualaik — dikenal juga sebagai Assalamu'alaik Zainal Anbiya — adalah rangkaian salam penghormatan kepada Nabi Muhammad ﷺ dengan sederet gelar kemuliaannya: perhiasan para nabi, bulan purnama yang sempurna, cahaya dalam kegelapan, hingga pemberi syafaat pada hari kiamat. Teks Arab, Latin, terjemahan Indonesia, dan English. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 18,
    "blocks": {
      "sections": [
        {
          "id": "assalamualaik-s1",
          "title": "Assalamualaik",
          "units": [
            {
              "id": "assalamualaik-u1",
              "arab": "اَلسَّلَامُ عَلَيْكَ زَيْنَ الْأَنْبِيَاءِ",
              "latin": "Assalamu 'alaika zainal anbiya'i",
              "translation": "Salam sejahtera bagimu, wahai perhiasan para nabi (Nabi yang paling mulia)",
              "english": "Peace be upon you, O adornment of the prophets"
            },
            {
              "id": "assalamualaik-u2",
              "arab": "اَلسَّلَامُ عَلَيْكَ أَتْقَى الْأَتْقِيَاءِ",
              "latin": "Assalamu 'alaika atqol atqiya'i",
              "translation": "Salam sejahtera bagimu, wahai pemimpin orang-orang yang bertakwa",
              "english": "Peace be upon you, O most God-fearing of the God-fearing"
            },
            {
              "id": "assalamualaik-u3",
              "arab": "اَلسَّلَامُ عَلَيْكَ أَصْفَى الْأَصْفِيَاءِ",
              "latin": "Assalamu 'alaika ashfal ashfiya'i",
              "translation": "Salam sejahtera bagimu, wahai pemimpin orang-orang yang suci dan jernih hatinya",
              "english": "Peace be upon you, O purest of the pure-hearted elect"
            },
            {
              "id": "assalamualaik-u4",
              "arab": "اَلسَّلَامُ عَلَيْكَ أَزْكَى الْأَزْكِيَاءِ",
              "latin": "Assalamu 'alaika azkal azkiya'i",
              "translation": "Salam sejahtera bagimu, wahai pemimpin orang-orang yang suci",
              "english": "Peace be upon you, O most pure of the pure"
            },
            {
              "id": "assalamualaik-u5",
              "arab": "اَلسَّلَامُ عَلَيْكَ مِنْ رَبِّ السَّمَاءِ",
              "latin": "Assalamu 'alaika min robbis-sama'i",
              "translation": "Salam sejahtera bagimu, (terlimpah) dari Tuhan langit",
              "english": "Peace be upon you, from the Lord of the heavens"
            },
            {
              "id": "assalamualaik-u6",
              "arab": "اَلسَّلَامُ عَلَيْكَ دَائِمًا بِلَا انْقِضَاءِ",
              "latin": "Assalamu 'alaika da'iman bila inqidho'i",
              "translation": "Salam sejahtera bagimu, senantiasa tanpa pernah terputus",
              "english": "Peace be upon you, forever, without end"
            },
            {
              "id": "assalamualaik-u7",
              "arab": "اَلسَّلَامُ عَلَيْكَ أَحْمَدُ يَا حَبِيبِي",
              "latin": "Assalamu 'alaika Ahmad ya habibi",
              "translation": "Salam sejahtera bagimu, wahai Ahmad, wahai kekasihku",
              "english": "Peace be upon you, O Ahmad, O my beloved"
            },
            {
              "id": "assalamualaik-u8",
              "arab": "اَلسَّلَامُ عَلَيْكَ طٰهَ يَا طَبِيبِي",
              "latin": "Assalamu 'alaika Thoha ya thobibi",
              "translation": "Salam sejahtera bagimu, wahai Thoha, wahai tabibku (penyembuh hatiku)",
              "english": "Peace be upon you, O Thaha, O my healer"
            },
            {
              "id": "assalamualaik-u9",
              "arab": "اَلسَّلَامُ عَلَيْكَ يَا مِسْكِي وَطِيبِي",
              "latin": "Assalamu 'alaika ya miski wa thibi",
              "translation": "Salam sejahtera bagimu, wahai keharumanku dan pewangi hatiku",
              "english": "Peace be upon you, O my musk and my fragrance"
            },
            {
              "id": "assalamualaik-u10",
              "arab": "اَلسَّلَامُ عَلَيْكَ أَحْمَدُ يَا مُحَمَّدُ",
              "latin": "Assalamu 'alaika Ahmad ya Muhammad",
              "translation": "Salam sejahtera bagimu, wahai Ahmad, wahai Muhammad",
              "english": "Peace be upon you, O Ahmad, O Muhammad"
            },
            {
              "id": "assalamualaik-u11",
              "arab": "اَلسَّلَامُ عَلَيْكَ يَا جَالِيَ الْكُرُوبِ",
              "latin": "Assalamu 'alaika ya jaliyal kurubi",
              "translation": "Salam sejahtera bagimu, wahai penghilang segala kesusahan dan bencana",
              "english": "Peace be upon you, O remover of all distress and afflictions"
            },
            {
              "id": "assalamualaik-u12",
              "arab": "اَلسَّلَامُ عَلَيْكَ يَا وَجْهَ الْجَمِيلِ",
              "latin": "Assalamu 'alaika ya wajhal jamili",
              "translation": "Salam sejahtera bagimu, wahai yang berwajah indah",
              "english": "Peace be upon you, O one of beautiful countenance"
            },
            {
              "id": "assalamualaik-u13",
              "arab": "اَلسَّلَامُ عَلَيْكَ يَا بَدْرَ التَّمَامِ",
              "latin": "Assalamu 'alaika ya badrot-tamami",
              "translation": "Salam sejahtera bagimu, wahai bulan purnama yang sempurna",
              "english": "Peace be upon you, O perfect full moon"
            },
            {
              "id": "assalamualaik-u14",
              "arab": "اَلسَّلَامُ عَلَيْكَ يَا نُورَ الظَّلَامِ",
              "latin": "Assalamu 'alaika ya nurodh-dholami",
              "translation": "Salam sejahtera bagimu, wahai cahaya dalam kegelapan",
              "english": "Peace be upon you, O light in the darkness"
            },
            {
              "id": "assalamualaik-u15",
              "arab": "اَلسَّلَامُ عَلَى الْمُقَدَّمِ بِالْإِمَامَةِ",
              "latin": "Assalamu 'alal muqoddami bil imamah",
              "translation": "Salam sejahtera atas Nabi yang dikedepankan sebagai imam (pemimpin)",
              "english": "Peace be upon the one brought forward as Imam (leader)"
            },
            {
              "id": "assalamualaik-u16",
              "arab": "اَلسَّلَامُ عَلَى الْمُظَلَّلِ بِالْغَمَامَةِ",
              "latin": "Assalamu 'alal mudhollali bil ghomamah",
              "translation": "Salam sejahtera atas Nabi yang dinaungi oleh awan",
              "english": "Peace be upon the one shaded by the clouds"
            },
            {
              "id": "assalamualaik-u17",
              "arab": "اَلسَّلَامُ عَلَى الْمُبَشَّرِ بِالسَّلَامَةِ",
              "latin": "Assalamu 'alal mubasysyiri bis-salamah",
              "translation": "Salam sejahtera atas Nabi yang diberi kabar gembira dengan keselamatan",
              "english": "Peace be upon the one given glad tidings of salvation"
            },
            {
              "id": "assalamualaik-u18",
              "arab": "اَلسَّلَامُ عَلَى الْمُشَفَّعِ بِالْقِيَامَةِ",
              "latin": "Assalamu 'alal musyaffa'i bil qiyamah",
              "translation": "Salam sejahtera atas Nabi yang diberi hak memberi syafaat pada hari kiamat",
              "english": "Peace be upon the one granted intercession on the Day of Resurrection"
            }
          ]
        }
      ]
    }
  },
  {
    "meta": {
      "title": "Qamarun Sidnan Nabi",
      "slug": "qamarun-sidnan-nabi",
      "type": "SHALAWAT",
      "description": "Qamarun Sidnan Nabi adalah qasidah pujian masyhur kepada Nabi Muhammad ﷺ yang digambarkan bagaikan bulan: keindahan beliau tak pernah terlihat mata pada siapa pun, telapak tangan beliau bagaikan mawar yang harumnya abadi, anugerah beliau meliputi seluruh hamba, dan seluruh alam menjadi terang oleh cahaya beliau. Dua bait pembukanya adalah bait pujian masyhur yang dinisbatkan kepada Hassan bin Tsabit. Teks Arab, Latin, terjemahan Indonesia, dan English. Sumber teks: wakidyusuf.wordpress.com."
    },
    "expectedUnits": 7,
    "blocks": {
      "sections": [
        {
          "id": "qamarun-sidnan-nabi-s1",
          "title": "Qamarun Sidnan Nabi",
          "units": [
            {
              "id": "qamarun-sidnan-nabi-u1",
              "arab": "وَأَجْمَلُ مِنْكَ لَمْ تَرَ قَطُّ عَيْنٌ ۞ وَأَطْيَبُ مِنْكَ لَمْ تَلِدِ النِّسَاءُ",
              "latin": "Wa ajmalu minka lam taro qotthu 'ainun, wa athyabu minka lam talidin-nisa'u",
              "translation": "Tidak ada mata yang pernah melihat sosok yang lebih indah darimu, dan tidak ada wanita yang pernah melahirkan sosok yang lebih baik darimu.",
              "english": "No eye has ever seen anyone more beautiful than you, and no woman has ever given birth to anyone better than you."
            },
            {
              "id": "qamarun-sidnan-nabi-u2",
              "arab": "خُلِقْتَ مُبَرَّءًا مِنْ كُلِّ عَيْبٍ ۞ كَأَنَّكَ قَدْ خُلِقْتَ كَمَا تَشَاءُ",
              "latin": "Khuliqta mubar-ro-an min kulli 'aibin, ka-annaka qod khuliqta kama tasya'u",
              "translation": "Engkau diciptakan terbebas dari segala aib, seolah-olah engkau diciptakan sebagaimana yang engkau kehendaki.",
              "english": "You were created free from every defect, as though you had been created just as you wished."
            },
            {
              "id": "qamarun-sidnan-nabi-u3",
              "arab": "قَمَرٌ قَمَرٌ قَمَرٌ سَيِّدُنَا النَّبِيُّ قَمَرٌ ۞ وَجَمِيلٌ وَجَمِيلٌ وَجَمِيلٌ سَيِّدُنَا النَّبِيُّ وَجَمِيلٌ",
              "latin": "Qomarun qomarun qomarun sidnan-nabi qomarun, wa jamil wa jamil wa jamil sidnan-nabi wa jamil",
              "translation": "Bulan, bulan, bulan — junjungan kami Sang Nabi bagaikan bulan; dan indah, indah, indah — junjungan kami Sang Nabi sungguh indah.",
              "english": "A moon, a moon, a moon — our master the Prophet is like a moon; and beautiful, beautiful, beautiful — our master the Prophet is beautiful."
            },
            {
              "id": "qamarun-sidnan-nabi-u4",
              "arab": "وَكَفُّ الْمُصْطَفَى كَالْوَرْدِ نَادِيْ ۞ وَعِطْرُهَا يَبْقَى إِذَا مَسَّتْ أَيَادِيْ",
              "latin": "Wa kafful Musthofa kal-wardi nadi, wa 'ithruha yabqo idza massat ayadi",
              "translation": "Telapak tangan Al-Musthafa (Nabi pilihan) bagaikan bunga mawar yang segar, dan keharumannya tetap tinggal apabila disentuh oleh tangan-tangan.",
              "english": "The palm of the Chosen One is like a fresh rose, and its fragrance lingers on whenever hands touch it."
            },
            {
              "id": "qamarun-sidnan-nabi-u5",
              "arab": "وَعَمَّ نَوَالُهَا كُلَّ الْعِبَادِيْ ۞ حَبِيْبَ اللهِ يَا خَيْرَ الْبَرَايَا",
              "latin": "Wa 'amma nawaluha kullal 'ibadi, habiballahi ya khoirol baroya",
              "translation": "Dan anugerahnya merata meliputi seluruh hamba — kekasih Allah, wahai sebaik-baik makhluk ciptaan.",
              "english": "And his bounty spreads to all of God's servants — O beloved of Allah, O best of all creation."
            },
            {
              "id": "qamarun-sidnan-nabi-u6",
              "arab": "وَلَا ظِلَّ لَهُ بَلْ كَانَ نُوْرًا ۞ تَنَالُ الشَّمْسُ مِنْهُ وَالْبُدُوْرَا",
              "latin": "Wa la zhillun lahu bal kana nuron, tanalusy-syamsu minhu wal-buduro",
              "translation": "Ia tidak memiliki bayang-bayang, bahkan ia adalah cahaya; matahari dan bulan-bulan purnama memperoleh cahaya darinya.",
              "english": "He cast no shadow, for he was light itself; the sun and the full moons draw their light from him."
            },
            {
              "id": "qamarun-sidnan-nabi-u7",
              "arab": "وَلَمْ يَكُنِ الْهُدَى لَوْلَا ظُهُوْرُهُ ۞ وَكُلُّ الْكَوْنِ أَنَارَ بِنُوْرِ طٰهَ",
              "latin": "Wa lam yakunil-huda laula zhuhuruhu, wa kullul-kawni anaro binuri Thoha",
              "translation": "Tidak akan ada petunjuk seandainya ia tidak muncul, dan seluruh alam semesta menjadi terang oleh cahaya Thoha (Nabi Muhammad ﷺ).",
              "english": "There would have been no guidance had he not appeared, and the whole universe was illuminated by the light of Thoha (the Prophet Muhammad)."
            }
          ]
        }
      ]
    }
  }
];
