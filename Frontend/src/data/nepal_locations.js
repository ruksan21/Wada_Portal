// locations.js

export const nepalLocations = [
  // ======================================================
  // 1. KOSHI PROVINCE (14 Districts)
  // ======================================================
  {
    name: "Koshi Province",
    name_np: "कोशी प्रदेश",
    districts: [
      {
        name: "Morang",
        name_np: "मोरङ",
        municipalities: [
          {
            name: "Biratnagar Metropolitan City",
            name_np: "विराटनगर महानगरपालिका",
            wards: 19,
          },
          {
            name: "Sundarharaicha Municipality",
            name_np: "सुन्दरहरैंचा नगरपालिका",
            wards: 12,
          },
          {
            name: "Belbari Municipality",
            name_np: "बेलबारी नगरपालिका",
            wards: 11,
          },
          {
            name: "Pathari Shanischare Municipality",
            name_np: "पथरी शनिश्चरे नगरपालिका",
            wards: 10,
          },
          {
            name: "Ratuwamai Municipality",
            name_np: "रतुवामाई नगरपालिका",
            wards: 10,
          },
          {
            name: "Urlabari Municipality",
            name_np: "उर्लाबारी नगरपालिका",
            wards: 9,
          },
          {
            name: "Rangeli Municipality",
            name_np: "रंगेली नगरपालिका",
            wards: 9,
          },
          {
            name: "Sunwarnshi Municipality",
            name_np: "सुनवर्षि नगरपालिका",
            wards: 9,
          },
          { name: "Letang Municipality", name_np: "लेटाङ नगरपालिका", wards: 9 },
          {
            name: "Jahada Rural Municipality",
            name_np: "जहदा गाउँपालिका",
            wards: 7,
          },
          {
            name: "Budi Ganga Rural Municipality",
            name_np: "बुढीगंगा गाउँपालिका",
            wards: 7,
          },
          {
            name: "Katahari Rural Municipality",
            name_np: "कटहरी गाउँपालिका",
            wards: 7,
          },
          {
            name: "Dhanpalthan Rural Municipality",
            name_np: "धनपालथान गाउँपालिका",
            wards: 7,
          },
          {
            name: "Kanepokhari Rural Municipality",
            name_np: "कानेपोखरी गाउँपालिका",
            wards: 7,
          },
          {
            name: "Gramthan Rural Municipality",
            name_np: "ग्रामथान गाउँपालिका",
            wards: 7,
          },
          {
            name: "Kerabari Rural Municipality",
            name_np: "केराबारी गाउँपालिका",
            wards: 10,
          },
          {
            name: "Miklung Rural Municipality",
            name_np: "मिक्लाजुङ गाउँपालिका",
            wards: 9,
          },
        ],
      },
      {
        name: "Jhapa",
        municipalities: [
          { name: "Mechinagar Municipality", wards: 15 },
          { name: "Damak Municipality", wards: 10 },
          { name: "Birtamod Municipality", wards: 10 },
          { name: "Bhadrapur Municipality", wards: 10 },
          { name: "Arjundhara Municipality", wards: 11 },
          { name: "Shivasatakshi Municipality", wards: 11 },
          { name: "Gauradaha Municipality", wards: 9 },
          { name: "Kankai Municipality", wards: 9 },
          { name: "Kamal Rural Municipality", wards: 7 },
          { name: "Buddhashanti Rural Municipality", wards: 7 },
          { name: "Kachankawal Rural Municipality", wards: 7 },
          { name: "Jhapa Rural Municipality", wards: 7 },
          { name: "Barhadashi Rural Municipality", wards: 7 },
          { name: "Gaurigunj Rural Municipality", wards: 6 },
          { name: "Haldibari Rural Municipality", wards: 5 },
        ],
      },
      {
        name: "Sunsari",
        municipalities: [
          { name: "Itahari Sub-Metropolitan City", wards: 20 },
          { name: "Dharan Sub-Metropolitan City", wards: 20 },
          { name: "Inaruwa Municipality", wards: 10 },
          { name: "Duhabi Municipality", wards: 12 },
          { name: "Ramdhuni Municipality", wards: 9 },
          { name: "Barahachhetra Municipality", wards: 11 },
          { name: "Koshi Rural Municipality", wards: 8 },
          { name: "Gadhi Rural Municipality", wards: 6 },
          { name: "Barju Rural Municipality", wards: 6 },
          { name: "Bhokraha Narsingh Rural Municipality", wards: 8 },
          { name: "Harinagar Rural Municipality", wards: 7 },
          { name: "Dewanganj Rural Municipality", wards: 7 },
        ],
      },
      {
        name: "Ilam",
        municipalities: [
          { name: "Ilam Municipality", wards: 12 },
          { name: "Deumai Municipality", wards: 9 },
          { name: "Mai Municipality", wards: 10 },
          { name: "Suryodaya Municipality", wards: 14 },
          { name: "Fakphokthum Rural Municipality", wards: 7 },
          { name: "Mai Jogmai Rural Municipality", wards: 6 },
          { name: "Chulachuli Rural Municipality", wards: 6 },
          { name: "Rong Rural Municipality", wards: 6 },
          { name: "Mangsebung Rural Municipality", wards: 6 },
          { name: "Sandakpur Rural Municipality", wards: 5 },
        ],
      },
      {
        name: "Sankhuwasabha",
        municipalities: [
          { name: "Khandbari Municipality", wards: 11 },
          { name: "Chainpur Municipality", wards: 11 },
          { name: "Dharmadevi Municipality", wards: 9 },
          { name: "Madi Municipality", wards: 9 },
          { name: "Panchakhapan Municipality", wards: 9 },
          { name: "Bhotkhola Rural Municipality", wards: 5 },
          { name: "Chichila Rural Municipality", wards: 5 },
          { name: "Makalu Rural Municipality", wards: 6 },
          { name: "Sabhapokhari Rural Municipality", wards: 6 },
          { name: "Silichong Rural Municipality", wards: 5 },
        ],
      },
      // Note: Listing just names for other districts to keep file manageable
      // You can expand these arrays following the pattern above.
      {
        name: "Bhojpur",
        municipalities: [
          { name: "Bhojpur Municipality", wards: 12 },
          { name: "Shadananda Municipality", wards: 14 },
        ],
      },
      {
        name: "Dhankuta",
        municipalities: [
          { name: "Dhankuta Municipality", wards: 10 },
          { name: "Pakhribas Municipality", wards: 10 },
        ],
      },
      {
        name: "Terhathum",
        municipalities: [
          { name: "Myanglung Municipality", wards: 10 },
          { name: "Laligurans Municipality", wards: 9 },
        ],
      },
      {
        name: "Panchthar",
        municipalities: [{ name: "Phidim Municipality", wards: 14 }],
      },
      {
        name: "Taplejung",
        municipalities: [{ name: "Phungling Municipality", wards: 11 }],
      },
      {
        name: "Solukhumbu",
        municipalities: [{ name: "Solududhkunda Municipality", wards: 10 }],
      },
      {
        name: "Khotang",
        municipalities: [
          { name: "Diktel Rupakot Majhuwagadhi Municipality", wards: 15 },
          { name: "Halesi Tuwachung Municipality", wards: 11 },
        ],
      },
      {
        name: "Okhaldhunga",
        municipalities: [{ name: "Siddhicharan Municipality", wards: 12 }],
      },
      {
        name: "Udayapur",
        municipalities: [
          { name: "Triyuga Municipality", wards: 16 },
          { name: "Katari Municipality", wards: 14 },
          { name: "Chaudandigadhi Municipality", wards: 10 },
          { name: "Belaka Municipality", wards: 9 },
        ],
      },
    ],
  },

  // ======================================================
  // 2. MADHESH PROVINCE (8 Districts)
  // ======================================================
  {
    name: "Madhesh Province",
    name_np: "मधेश प्रदेश",
    districts: [
      {
        name: "Parsa",
        municipalities: [
          { name: "Birgunj Metropolitan City", wards: 32 },
          { name: "Pokhariya Municipality", wards: 10 },
          { name: "Bahudarmai Municipality", wards: 9 },
          { name: "Parsagadhi Municipality", wards: 9 },
        ],
      },
      {
        name: "Dhanusha",
        municipalities: [
          { name: "Janakpurdham Sub-Metropolitan City", wards: 25 },
          { name: "Dhanushadham Municipality", wards: 9 },
          { name: "Sabaila Municipality", wards: 13 },
          { name: "Ganeshman Charnath Municipality", wards: 11 },
          { name: "Mithila Municipality", wards: 11 },
          { name: "Shahidnagar Municipality", wards: 9 },
          { name: "Chireshwarnath Municipality", wards: 10 },
          { name: "Bideha Municipality", wards: 9 },
          { name: "Hansapur Municipality", wards: 9 },
          { name: "Kamala Municipality", wards: 9 },
          { name: "Mithila Bihari Municipality", wards: 10 },
          { name: "Nagarain Municipality", wards: 9 },
        ],
      },
      {
        name: "Bara",
        municipalities: [
          { name: "Kalaiya Sub-Metropolitan City", wards: 27 },
          { name: "Jitpur Simara Sub-Metropolitan City", wards: 24 },
          { name: "Kolhabi Municipality", wards: 11 },
          { name: "Nijgadh Municipality", wards: 13 },
          { name: "Mahagadhimai Municipality", wards: 11 },
          { name: "Simraungadh Municipality", wards: 11 },
          { name: "Pacharauta Municipality", wards: 9 },
        ],
      },
      {
        name: "Saptari",
        municipalities: [
          { name: "Rajbiraj Municipality", wards: 16 },
          { name: "Kanchanrup Municipality", wards: 12 },
          { name: "Dakneshwari Municipality", wards: 10 },
        ],
      },
      {
        name: "Siraha",
        municipalities: [
          { name: "Siraha Municipality", wards: 22 },
          { name: "Lahan Municipality", wards: 24 },
          { name: "Mirchaiya Municipality", wards: 12 },
          { name: "Golbazar Municipality", wards: 13 },
        ],
      },
      {
        name: "Mahottari",
        municipalities: [
          { name: "Jaleshwor Municipality", wards: 12 },
          { name: "Bardibas Municipality", wards: 14 },
          { name: "Gaushala Municipality", wards: 12 },
        ],
      },
      {
        name: "Sarlahi",
        municipalities: [
          { name: "Malangwa Municipality", wards: 12 },
          { name: "Harion Municipality", wards: 11 },
          { name: "Lalbandi Municipality", wards: 17 },
          { name: "Ishworpur Municipality", wards: 15 },
        ],
      },
      {
        name: "Rautahat",
        municipalities: [
          { name: "Gaur Municipality", wards: 9 },
          { name: "Chandrapur Municipality", wards: 10 },
          { name: "Garuda Municipality", wards: 9 },
        ],
      },
    ],
  },

  // ======================================================
  // 3. BAGMATI PROVINCE (13 Districts)
  // ======================================================
  {
    name: "Bagmati Province",
    name_np: "बागमती प्रदेश",
    districts: [
      {
        name: "Kathmandu",
        name_np: "काठमाडौं",
        municipalities: [
          {
            name: "Kathmandu Metropolitan City",
            name_np: "काठमाडौं महानगरपालिका",
            wards: 32,
          },
          {
            name: "Kirtipur Municipality",
            name_np: "कीर्तिपुर नगरपालिका",
            wards: 10,
          },
          {
            name: "Gokarneshwar Municipality",
            name_np: "गोकर्णेश्वर नगरपालिका",
            wards: 9,
          },
          {
            name: "Budhanilkantha Municipality",
            name_np: "बुढानीलकण्ठ नगरपालिका",
            wards: 13,
          },
          {
            name: "Tokha Municipality",
            name_np: "टोखा नगरपालिका",
            wards: 11,
          },
          {
            name: "Tarakeshwor Municipality",
            name_np: "तार्केश्वर नगरपालिका",
            wards: 11,
          },
          {
            name: "Nagarjun Municipality",
            name_np: "नागार्जुन नगरपालिका",
            wards: 10,
          },
          {
            name: "Chandragiri Municipality",
            name_np: "चन्द्रागिरी नगरपालिका",
            wards: 15,
          },
          {
            name: "Dakshinkali Municipality",
            name_np: "दक्षिणकाली नगरपालिका",
            wards: 9,
          },
          {
            name: "Shankharapur Municipality",
            name_np: "शंखरापुर नगरपालिका",
            wards: 9,
          },
          {
            name: "Kageshwari Manohara Municipality",
            name_np: "कागेश्वरी मनोहरा नगरपालिका",
            wards: 9,
          },
        ],
      },
      {
        name: "Lalitpur",
        name_np: "ललितपुर",
        municipalities: [
          {
            name: "Lalitpur Metropolitan City",
            name_np: "ललितपुर महानगरपालिका",
            wards: 29,
          },
          {
            name: "Mahalaxmi Municipality",
            name_np: "महालक्ष्मी नगरपालिका",
            wards: 10,
          },
          {
            name: "Godawari Municipality",
            name_np: "गोदावरी नगरपालिका",
            wards: 14,
          },
          {
            name: "Konjyosom Rural Municipality",
            name_np: "कोन् ज्योसोम गाउँपालिका",
            wards: 5,
          },
          {
            name: "Bagmati Rural Municipality",
            name_np: "बागमती गाउँपालिका",
            wards: 7,
          },
          {
            name: "Mahankal Rural Municipality",
            name_np: "महाङ्काल गाउँपालिका",
            wards: 6,
          },
        ],
      },
      {
        name: "Bhaktapur",
        name_np: "भक्तपुर",
        municipalities: [
          {
            name: "Bhaktapur Municipality",
            name_np: "भक्तपुर नगरपालिका",
            wards: 10,
          },
          {
            name: "Changunarayan Municipality",
            name_np: "चाँगुनारायण नगरपालिका",
            wards: 9,
          },
          {
            name: "Madhyapur Thimi Municipality",
            name_np: "मध्यपुर थिमी नगरपालिका",
            wards: 9,
          },
          {
            name: "Suryabinayak Municipality",
            name_np: "सूर्यविनायक नगरपालिका",
            wards: 10,
          },
        ],
      },
      {
        name: "Chitwan",
        municipalities: [
          {
            name: "Bharatpur Metropolitan City",
            name_np: "भरतपुर महानगरपालिका",
            wards: 29,
          },
          {
            name: "Ratnanagar Municipality",
            name_np: "रत्ननगर नगरपालिका",
            wards: 16,
          },
          {
            name: "Khairahani Municipality",
            name_np: "खैरहनी नगरपालिका",
            wards: 13,
          },
          {
            name: "Rapti Municipality",
            name_np: "राप्ती नगरपालिका",
            wards: 13,
          },
          {
            name: "Kalika Municipality",
            name_np: "कालिका नगरपालिका",
            wards: 11,
          },
          {
            name: "Madi Municipality",
            name_np: "माडी नगरपालिका",
            wards: 9,
          },
          {
            name: "Ichchhakamana Rural Municipality",
            name_np: "इच्छाकामना गाउँपालिका",
            wards: 7,
          },
        ],
      },
      {
        name: "Makwanpur",
        municipalities: [
          {
            name: "Hetauda Sub-Metropolitan City",
            name_np: "हेटौंडा उपमहानगरपालिका",
            wards: 19,
          },
          {
            name: "Thaha Municipality",
            name_np: "थाहा नगरपालिका",
            wards: 12,
          },
          {
            name: "Bhimphedi Rural Municipality",
            name_np: "भीमफेदी गाउँपालिका",
            wards: 9,
          },
          {
            name: "Makawanpur Gadhi Rural Municipality",
            name_np: "मकवानपुरगढी गाउँपालिका",
            wards: 8,
          },
        ],
      },
      {
        name: "Sindhuli",
        municipalities: [
          {
            name: "Kamalamai Municipality",
            name_np: "कमलामाई नगरपालिका",
            wards: 14,
          },
          {
            name: "Dudhouli Municipality",
            name_np: "दुधौली नगरपालिका",
            wards: 14,
          },
        ],
      },
      {
        name: "Ramechhap",
        municipalities: [
          {
            name: "Manthali Municipality",
            name_np: "मन्थली नगरपालिका",
            wards: 14,
          },
          {
            name: "Ramechhap Municipality",
            name_np: "रामेछाप नगरपालिका",
            wards: 9,
          },
        ],
      },
      {
        name: "Dolakha",
        municipalities: [
          {
            name: "Bhimeshwor Municipality",
            name_np: "भीमेश्वर नगरपालिका",
            wards: 9,
          },
          { name: "Jiri Municipality", name_np: "जिरी नगरपालिका", wards: 9 },
        ],
      },
      {
        name: "Sindhupalchok",
        municipalities: [
          {
            name: "Chautara SangachokGadhi Municipality",
            name_np: "चौतारा साँगाचोकगढी नगरपालिका",
            wards: 14,
          },
          {
            name: "Barhabise Municipality",
            name_np: "बाह्रबिसे नगरपालिका",
            wards: 9,
          },
          {
            name: "Melamchi Municipality",
            name_np: "मेलम्ची नगरपालिका",
            wards: 13,
          },
        ],
      },
      {
        name: "Kavrepalanchok",
        municipalities: [
          {
            name: "Dhulikhel Municipality",
            name_np: "धुलिखेल नगरपालिका",
            wards: 12,
          },
          {
            name: "Banepa Municipality",
            name_np: "बनेपा नगरपालिका",
            wards: 14,
          },
          {
            name: "Panauti Municipality",
            name_np: "पनौती नगरपालिका",
            wards: 12,
          },
          {
            name: "Panchkhal Municipality",
            name_np: "पाँचखाल नगरपालिका",
            wards: 13,
          },
          {
            name: "Namobuddha Municipality",
            name_np: "नमोबुद्ध नगरपालिका",
            wards: 11,
          },
          {
            name: "Mandandeupur Municipality",
            name_np: "मण्डनदेउपुर नगरपालिका",
            wards: 12,
          },
        ],
      },
      {
        name: "Nuwakot",
        municipalities: [
          {
            name: "Bidur Municipality",
            name_np: "विदुर नगरपालिका",
            wards: 13,
          },
          {
            name: "Belkotgadhi Municipality",
            name_np: "बेलकोटगढी नगरपालिका",
            wards: 13,
          },
        ],
      },
      {
        name: "Rasuwa",
        municipalities: [
          {
            name: "Gosaikunda Rural Municipality",
            name_np: "गोसाईकुण्ड गाउँपालिका",
            wards: 6,
          },
          {
            name: "Kalika Rural Municipality",
            name_np: "कालिका गाउँपालिका",
            wards: 5,
          },
        ],
      },
      {
        name: "Dhading",
        municipalities: [
          {
            name: "Nilkantha Municipality",
            name_np: "नीलकण्ठ नगरपालिका",
            wards: 14,
          },
          {
            name: "Dhunibesi Municipality",
            name_np: "धुनिबेसी नगरपालिका",
            wards: 9,
          },
        ],
      },
    ],
  },

  // ======================================================
  // 4. GANDAKI PROVINCE (11 Districts)
  // ======================================================
  {
    name: "Gandaki Province",
    name_np: "गण्डकी प्रदेश",
    districts: [
      {
        name: "Kaski",
        name_np: "कास्की",
        municipalities: [
          { name: "Pokhara Metropolitan City", wards: 33 },
          { name: "Annapurna Rural Municipality", wards: 11 },
          { name: "Machhapuchhre Rural Municipality", wards: 9 },
          { name: "Madi Rural Municipality", wards: 12 },
          { name: "Rupa Rural Municipality", wards: 7 },
        ],
      },
      {
        name: "Tanahun",
        municipalities: [
          { name: "Vyas Municipality", wards: 14 },
          { name: "Shuklagandaki Municipality", wards: 12 },
          { name: "Bhanu Municipality", wards: 13 },
          { name: "Bhimad Municipality", wards: 9 },
        ],
      },
      {
        name: "Nawalpur (Nawalparasi East)",
        municipalities: [
          { name: "Kawasoti Municipality", wards: 17 },
          { name: "Gaindakot Municipality", wards: 18 },
          { name: "Devchuli Municipality", wards: 17 },
          { name: "Madhyabindu Municipality", wards: 15 },
        ],
      },
      {
        name: "Gorkha",
        municipalities: [
          { name: "Gorkha Municipality", wards: 14 },
          { name: "Palungtar Municipality", wards: 10 },
        ],
      },
      {
        name: "Lamjung",
        municipalities: [
          { name: "Besisahar Municipality", wards: 11 },
          { name: "Sundarbazar Municipality", wards: 11 },
          { name: "Rainas Municipality", wards: 10 },
          { name: "Madhya Nepal Municipality", wards: 10 },
        ],
      },
      {
        name: "Manang",
        municipalities: [
          { name: "Chame Rural Municipality", wards: 5 },
          { name: "Neshyang Rural Municipality", wards: 9 },
        ],
      },
      {
        name: "Mustang",
        municipalities: [
          { name: "Gharpajhong Rural Municipality", wards: 5 },
          { name: "Thasang Rural Municipality", wards: 5 },
          { name: "Baragung Muktichhetra Rural Municipality", wards: 5 },
        ],
      },
      {
        name: "Myagdi",
        municipalities: [{ name: "Beni Municipality", wards: 10 }],
      },
      {
        name: "Syangja",
        municipalities: [
          { name: "Putalibazar Municipality", wards: 14 },
          { name: "Waling Municipality", wards: 14 },
          { name: "Galyang Municipality", wards: 11 },
          { name: "Chapakot Municipality", wards: 10 },
          { name: "Bheerkot Municipality", wards: 9 },
        ],
      },
      {
        name: "Parbat",
        municipalities: [
          { name: "Kushma Municipality", wards: 14 },
          { name: "Phalebas Municipality", wards: 11 },
        ],
      },
      {
        name: "Baglung",
        municipalities: [
          { name: "Baglung Municipality", wards: 14 },
          { name: "Galkot Municipality", wards: 11 },
          { name: "Jaimini Municipality", wards: 10 },
          { name: "Dhorpatan Municipality", wards: 9 },
        ],
      },
    ],
  },

  // ======================================================
  // 5. LUMBINI PROVINCE (12 Districts)
  // ======================================================
  {
    name: "Lumbini Province",
    name_np: "लुम्बिनी प्रदेश",
    districts: [
      {
        name: "Rupandehi",
        municipalities: [
          { name: "Butwal Sub-Metropolitan City", wards: 19 },
          { name: "Siddharthanagar Municipality", wards: 13 },
          { name: "Tilottama Municipality", wards: 17 },
          { name: "Sainamaina Municipality", wards: 11 },
          { name: "Devdaha Municipality", wards: 12 },
          { name: "Lumbini Sanskritik Municipality", wards: 13 },
        ],
      },
      {
        name: "Dang",
        municipalities: [
          { name: "Ghorahi Sub-Metropolitan City", wards: 19 },
          { name: "Tulsipur Sub-Metropolitan City", wards: 19 },
          { name: "Lamahi Municipality", wards: 9 },
        ],
      },
      {
        name: "Banke",
        municipalities: [
          { name: "Nepalgunj Sub-Metropolitan City", wards: 23 },
          { name: "Kohalpur Municipality", wards: 15 },
        ],
      },
      {
        name: "Kapilvastu",
        municipalities: [
          { name: "Kapilvastu Municipality", wards: 12 },
          { name: "Banganga Municipality", wards: 11 },
          { name: "Buddhabhumi Municipality", wards: 10 },
          { name: "Shivaraj Municipality", wards: 11 },
          { name: "Krishnanagar Municipality", wards: 12 },
          { name: "Maharajgunj Municipality", wards: 11 },
        ],
      },
      {
        name: "Bardiya",
        municipalities: [
          { name: "Gulariya Municipality", wards: 12 },
          { name: "Rajapur Municipality", wards: 10 },
          { name: "Madhuwan Municipality", wards: 9 },
          { name: "Thakurbaba Municipality", wards: 9 },
          { name: "Barbardiya Municipality", wards: 11 },
          { name: "Bansgadhi Municipality", wards: 9 },
        ],
      },
      {
        name: "Arghakhanchi",
        municipalities: [
          { name: "Sandhikharka Municipality", wards: 12 },
          { name: "Sitganga Municipality", wards: 14 },
          { name: "Bhumikasthan Municipality", wards: 10 },
        ],
      },
      {
        name: "Palpa",
        municipalities: [
          { name: "Tansen Municipality", wards: 14 },
          { name: "Rampur Municipality", wards: 10 },
        ],
      },
      {
        name: "Gulmi",
        municipalities: [
          { name: "Resunga Municipality", wards: 14 },
          { name: "Musikot Municipality", wards: 9 },
        ],
      },
      {
        name: "Rolpa",
        municipalities: [{ name: "Rolpa Municipality", wards: 10 }],
      },
      {
        name: "Pyuthan",
        municipalities: [
          { name: "Pyuthan Municipality", wards: 10 },
          { name: "Swargadwary Municipality", wards: 9 },
        ],
      },
      {
        name: "Rukum East",
        municipalities: [
          { name: "Sisne Rural Municipality", wards: 8 },
          { name: "Bhume Rural Municipality", wards: 9 },
          { name: "Putha Uttarganga Rural Municipality", wards: 14 },
        ],
      },
      {
        name: "Parasi (Nawalparasi West)",
        municipalities: [
          { name: "Ramgram Municipality", wards: 18 },
          { name: "Sunwal Municipality", wards: 13 },
          { name: "Bardaghat Municipality", wards: 16 },
        ],
      },
    ],
  },

  // ======================================================
  // 6. KARNALI PROVINCE (10 Districts)
  // ======================================================
  {
    name: "Karnali Province",
    name_np: "कर्णाली प्रदेश",
    districts: [
      {
        name: "Surkhet",
        municipalities: [
          { name: "Birendranagar Municipality", wards: 16 },
          { name: "Gurbhakot Municipality", wards: 14 },
          { name: "Bheriganga Municipality", wards: 13 },
          { name: "Panchapuri Municipality", wards: 11 },
          { name: "Lekbeshi Municipality", wards: 10 },
        ],
      },
      {
        name: "Jumla",
        municipalities: [{ name: "Chandannath Municipality", wards: 10 }],
      },
      {
        name: "Salyan",
        municipalities: [
          { name: "Shaarda Municipality", wards: 15 },
          { name: "Bagchaur Municipality", wards: 12 },
          { name: "Bangad Kupinde Municipality", wards: 12 },
        ],
      },
      {
        name: "Dailekh",
        municipalities: [
          { name: "Narayan Municipality", wards: 11 },
          { name: "Dullu Municipality", wards: 13 },
          { name: "Chamunda Bindrasaini Municipality", wards: 9 },
          { name: "Aathbis Municipality", wards: 9 },
        ],
      },
      {
        name: "Jajarkot",
        municipalities: [
          { name: "Bheri Municipality", wards: 13 },
          { name: "Chhedagad Municipality", wards: 13 },
          { name: "Nalgad Municipality", wards: 13 },
        ],
      },
      {
        name: "Dolpa",
        municipalities: [
          { name: "Thuli Bheri Municipality", wards: 11 },
          { name: "Tripurasundari Municipality", wards: 11 },
        ],
      },
      {
        name: "Kalikot",
        municipalities: [
          { name: "Khandachakra Municipality", wards: 11 },
          { name: "Raskot Municipality", wards: 9 },
          { name: "Tilagupha Municipality", wards: 11 },
        ],
      },
      {
        name: "Mugu",
        municipalities: [{ name: "Chhayanath Rara Municipality", wards: 14 }],
      },
      {
        name: "Humla",
        municipalities: [
          { name: "Simkot Rural Municipality", wards: 8 },
          { name: "Namkha Rural Municipality", wards: 6 },
        ],
      },
      {
        name: "Rukum West",
        municipalities: [
          { name: "Musikot Municipality", wards: 14 },
          { name: "Chaurjahari Municipality", wards: 14 },
          { name: "Aathbiskot Municipality", wards: 14 },
        ],
      },
    ],
  },

  // ======================================================
  // 7. SUDURPASHCHIM PROVINCE (9 Districts)
  // ======================================================
  {
    name: "Sudurpashchim Province",
    name_np: "सुदूरपश्चिम प्रदेश",
    districts: [
      {
        name: "Kailali",
        municipalities: [
          { name: "Dhangadhi Sub-Metropolitan City", wards: 19 },
          { name: "Tikapur Municipality", wards: 9 },
          { name: "Ghodaghodi Municipality", wards: 12 },
          { name: "Lamki Chuha Municipality", wards: 10 },
          { name: "Bhajani Municipality", wards: 9 },
          { name: "Godawari Municipality", wards: 12 },
          { name: "Gauriganga Municipality", wards: 11 },
        ],
      },
      {
        name: "Kanchanpur",
        municipalities: [
          { name: "Bhimdatta Municipality", wards: 19 },
          { name: "Bedkot Municipality", wards: 10 },
          { name: "Punarbas Municipality", wards: 11 },
          { name: "Krishnapur Municipality", wards: 9 },
          { name: "Mahakali Municipality (Dodhara Chandani)", wards: 10 },
          { name: "Shuklaphanta Municipality", wards: 12 },
          { name: "Belauri Municipality", wards: 10 },
        ],
      },
      {
        name: "Dadeldhura",
        municipalities: [
          { name: "Amargadhi Municipality", wards: 11 },
          { name: "Parshuram Municipality", wards: 12 },
        ],
      },
      {
        name: "Baitadi",
        municipalities: [
          { name: "Dasharathchand Municipality", wards: 11 },
          { name: "Patan Municipality", wards: 10 },
          { name: "Melauli Municipality", wards: 9 },
          { name: "Purchauti Municipality", wards: 10 },
        ],
      },
      {
        name: "Doti",
        municipalities: [
          { name: "Dipayal Silgadhi Municipality", wards: 9 },
          { name: "Shikhar Municipality", wards: 11 },
        ],
      },
      {
        name: "Achham",
        municipalities: [
          { name: "Mangalsen Municipality", wards: 14 },
          { name: "Sanphebagar Municipality", wards: 14 },
          { name: "Panchadewal Binayak Municipality", wards: 9 },
          { name: "Kamalbazar Municipality", wards: 10 },
        ],
      },
      {
        name: "Bajhang",
        municipalities: [
          { name: "Jaya Prithvi Municipality", wards: 11 },
          { name: "Bungal Municipality", wards: 11 },
        ],
      },
      {
        name: "Bajura",
        municipalities: [
          { name: "Badimalika Municipality", wards: 9 },
          { name: "Triveni Municipality", wards: 9 },
          { name: "Budhiganga Municipality", wards: 10 },
          { name: "Budhinanda Municipality", wards: 10 },
        ],
      },
      {
        name: "Darchula",
        municipalities: [
          { name: "Mahakali Municipality", wards: 9 },
          { name: "Shailyashikhar Municipality", wards: 9 },
        ],
      },
    ],
  },
];

// ======================================================
// HELPER FUNCTIONS
// ======================================================

export const getProvinces = () => nepalLocations;

export const getDistricts = (provinceName) => {
  const province = nepalLocations.find((p) => p.name === provinceName);
  // Return the full district objects
  return province ? province.districts : [];
};

export const getMunicipalities = (provinceName, districtName) => {
  const province = nepalLocations.find((p) => p.name === provinceName);
  if (province) {
    const district = province.districts.find((d) => d.name === districtName);
    if (district) {
      return district.municipalities; // Already returns [{name, wards, name_np}, ...]
    }
  }
  return [];
};

export const getMunicipalityInfo = (districtName, municipalityName) => {
  for (const province of nepalLocations) {
    const district = province.districts.find((d) => d.name === districtName);
    if (district) {
      const muni = district.municipalities.find(
        (m) => m.name === municipalityName,
      );
      if (muni) return muni;
    }
  }

  return null;
};

export const toNepaliNumber = (num) => {
  if (num === null || num === undefined) return "";
  const englishToNepali = {
    0: "०",
    1: "१",
    2: "२",
    3: "३",
    4: "४",
    5: "५",
    6: "६",
    7: "७",
    8: "८",
    9: "९",
  };
  return num
    .toString()
    .split("")
    .map((char) => englishToNepali[char] || char)
    .join("");
};
