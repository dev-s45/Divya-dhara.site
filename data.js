/* =========================================
   DIVYA DHARA — CENTRAL CONTENT DATABASE
========================================= */

const contentData = {
  // DIVYA DARSHAN PAGE DATA OBJECT (Sirf Articles)
  darshanPage: {
    articles: [
      {
        id: "krishna-lila",
        category: "PREM AUR GYAAN",
        title: "Shri Krishna Ki Divya Lila Aur Jeevan Darshan",
        intro: "Braj ki pawan dharti se lekar Mahabharat ki rannbhoomi tak, Shri Krishna ne jeevan ka satya sikhaya.",
        paragraphs: [
          {
            heading: "Aatmik Samarpan Aur Satya",
            text: "Shri Krishna ki lila keval ek pauranik katha nahi, balki aatmik jagriti ka marg hai. Unki har bal-lila aur gyaan mein ahankar ko tyag kar prem aur bhakti ko apnane ka sandesh chhipa hai."
          },
          {
            heading: "Nishkam Karm Ka Marg",
            text: "Shri Krishna humein sikhate hain ki bina fal ki chinta kiye apna kartavya nibhana hi sabse badi pooja aur aatmik shanti ka sadhan hai."
          }
        ],
        verse: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥"
      },

      {
        id: "mahadev-dhyan",
        category: "DHYAAN AUR SHANTI",
        title: "Mahadev Ka Mahadhaar Aur Aatmik Sthirta",
        intro: "Kailash parvat par dhyan-magan Bholenath samast brahmand ki sthirta aur shanti ke aadhar hain.",
        paragraphs: [
          {
            heading: "Vairagya Aur Santulan",
            text: "Mahadev ka swaroop humein sikhata hai ki bahari duniya ke shor se door apne andar ki shanti ko kaise paayein. Unka Bholenath swaroop karuna aur vairagya ka prateek hai."
          }
        ],
        verse: "ॐ नमः शिवाय — शांतं कारुणिकं रूपं आत्मसंयम कारणम्।"
      },

      {
        id: "vishnu-palan",
        category: "SANATAN GYAAN",
        title: "Shri Hari Vishnu Ka Palankarta Swaroop",
        intro: "Srishti ke palanhare Bhagwan Vishnu jab bhi dharma ki hani hoti hai, srishti ka santulan banate hain.",
        paragraphs: [
          {
            heading: "Dharma Ki Sthapna",
            text: "Shri Hari ka har avataar satya, maryada aur dharma ki sthapna ke liye hua hai. Unki kathaon se humein dhairya aur nishtha ki seekh milti hai."
          }
        ],
        verse: "शांताकारं भुजगशयनं पद्मनाभं सुरेशं विश्वाधारं गगनसदृशं।"
      }
    ]
  },

  // 2. SANATAN GYAAN PAGE DATA OBJECT
  knowledgePage: {
    categories: ["SABHI", "VED AUR GITA", "MAHAPURUSH AUR NARI CHARITRA", "PAURANIK SEEKH"],
    articles: [
      {
        id: "gita-karm-dharma",
        category: "VED AUR GITA",
        title: "Bhagavad Gita Ka Karm Yog: Kartavya Aur Satya",
        subtitle: "Shri Krishna Dwara Arjun Ko Diya Gaya Shaswat Marg",
        summary: "Karm yog humein bina aasakti ke apne naitik kartavya ko nishtha se nibhane ki prerna deta hai. Nishkam bhava se kiya gaya karm hi man ko aatmik shanti aur sthirta pradan karta hai.",
        lessons: [
          {
            heading: "Kartavya Palan",
            detail: "Parinaam ki chinta chhod kar vartaman mein apne kartavya ka imandari se palan karna."
          },
          {
            heading: "Aatmik Santulan",
            detail: "Sukh-dukuh aur safalta-asafalta mein man ko sthir rakhna hi asli gyaan hai."
          }
        ],
        quote: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन — Karm par tera adhikar hai, phal par nahi."
      },
      {
        id: "savitri-pativrata",
        category: "MAHAPURUSH AUR NARI CHARITRA",
        title: "Mata Savitri Ka Atal Sankalp Aur Kartavya",
        subtitle: "Bhakti, Buddhi Aur Vivahik Kartavya Ka Anupam Udaharan",
        summary: "Mata Savitri ne apne chintan, gyaan aur atal kartavya-bodh se Yamraj se bhi apne pati Satyavan ke prana punah prapt kiye. Unka charitra nishtha aur sahas ka prateek hai.",
        lessons: [
          {
            heading: "Dhairya Aur Buddhi",
            detail: "Bhari sankat ke samay bhi dhairya aur vivek se nirnay lena."
          },
          {
            heading: "Sankalp Ki Shakti",
            detail: "Dharma aur satya ke path par chalta hua atal sankalp asambhav ko bhi sambhav bana deta hai."
          }
        ],
        quote: "सत्येन धार्यते पृथ्वी सत्येन तपते रविः — Satya se hi prithvi dharit hai aur surya tapta hai."
      },
      {
        id: "bhishma-pratigya",
        category: "MAHAPURUSH AUR NARI CHARITRA",
        title: "Pitamah Bhishma Ka Vachan Aur Tyaag",
        subtitle: "Rashtra Aur Pita Ke Prati Param Samarpan",
        summary: "Pitamah Bhishma ka jeevan tyaag aur pratigya-palan ka shreshth udaharan hai. Unhone apne vyaktigat sukh ka tyaag karke pita ke vachan aur rashtra ki seva ko sarvopari rakha.",
        lessons: [
          {
            heading: "Vachan Palan",
            detail: "Mushkil se mushkil paristhiti mein bhi apne diye gaye vachan par kaayam rehna."
          },
          {
            heading: "Niswarth Tyaag",
            detail: "Kool aur samaj ke kalyan ke liye vyaktigat moh aur ahankar ka tyaag karna."
          }
        ],
        quote: "धर्मो रक्षति रक्षितः — Dharma ki raksha karne wale ki raksha swayam dharma karta hai."
      },
      {
        id: "harishchandra-satya",
        category: "PAURANIK SEEKH",
        title: "Raja Harishchandra Ka Satya-Nishtha Marg",
        subtitle: "Satya Aur Dharma Par Atal Rehne Ki Katha",
        summary: "Raja Harishchandra ne apna rajya, dhan aur parivar tak tyag diya parantu satya ka path kabhi nahi chhoda. Unka jeevan humein sikhata hai ki satya hi param dharma hai.",
        lessons: [
          {
            heading: "Satya Par Nistha",
            detail: "Jeevan ki kisi bhi pariksha mein satya aur imandari ka saath na chhodna."
          },
          {
            heading: "Pavitra Charitra",
            detail: "Kathan aur karni mein ekta rakhna hi manushya ki asli sampatti hai."
          }
        ],
        quote: "चन्द्रस्तरेत् सूर्यस्तरेत् तरेन्मेरुर्महार्नवः। न तरेत् सत्यवादिनां वाक्यं कदाचन॥"
      }
    ]
  },
  // 3. AAJ KA VICHAR PAGE DATA OBJECT
  thoughtPage: {
    thoughts: [
      {
        id: "thought-1",
        date: "2026-10-18", // YYYY-MM-DD format (Current / Today)
        category: "AATMIK SHANTI",
        title: "Man Ki Shanti Aur Satya Ka Marg",
        preview: "Man ka santap keval dhyan aur satya ke aacharan se...",
        fullContent: "Jiska man shant hai, jiske paap nasht ho gaye hain aur jo satya ke marg par hai, use hi param anand aur shanti ki prapti hoti hai. Vartaman samay mein man ki sthirta hi sabse badi poonji hai.",
        verse: "प्रशान्तमनसं ह्येनं योगिनं सुखमुत्तमम्। उपैति शान्तरजसं ब्रह्मभूतमकल्मषम्॥",
        author: "Divya Dhara"
      },
      {
        id: "thought-2",
        date: "2026-10-17", // 1 Din purana (NEW tag aayega)
        category: "KARM YOG",
        title: "Karm Hi Aapki Asli Pehchan Hai",
        preview: "Nishkam bhav se kiya gaya har shubh karm...",
        fullContent: "Karm hi aapki pehchan hai, baki sab keval samay ke sath badalnewali chhayayein hain. Jab hum fal ki chinta chhode bina kartavya nibhate hain, tabhi man ko sachhi shanti milti hai.",
        verse: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
        author: "Divya Dhara"
      },
      {
        id: "thought-3",
        date: "2026-10-14", // 4 Din purana (OLD tag aayega)
        category: "SATYA AUR DHARMA",
        title: "Satya Ki Shaswat Vijay",
        preview: "Satya ka path kathin ho sakta hai parantu...",
        fullContent: "Satya ka path kathin ho sakta hai, parantu uska ant hamesha shanti aur vijay mein hota hai. Jo vyakti har sthiti mein satya ka saath deta hai, swayam dharma uski raksha karta hai.",
        verse: "सत्यमेव जयते नानृतम्।",
        author: "Divya Dhara"
      }
    ]
  },

  // 4. KATHAYEIN AUR LEKH PAGE DATA OBJECT
  articlesPage: {
    categories: ["SABHI", "PAURANIK KATHA", "NEETI AUR ADHYATMA", "PRERNA-DAYAK PRASANG"],
    stories: [
      {
        id: "story-samudra-manthan",
        category: "PAURANIK KATHA",
        title: "Samudra Manthan Aur Amrit Prapti Ki Katha",
        subtitle: "Devtaon aur Asuron dwara ki gayi divya kshir sagar ki katha",
        preview: "Kshir Sagar ke manthan se nikle ratn aur amrit ki alaukik katha jo jeevan ka satya sikhati hai...",
        paragraphs: [
          {
            heading: "Manthan Ka Udeshya",
            text: "Jab devtaon aur asuron ne milkar Mandar parvat aur Vasuki naag ki sahayata se kshir sagar ka manthan kiya, tab kai divya ratn aur ant mein amrit praapt hua."
          },
          {
            heading: "Vesh aur Vish Paan",
            text: "Manthan ke dauran sabse pehle haalahal vish nikla jise Shambhu Mahadev ne swayam apne kanth mein dharan kar srishti ki raksha ki."
          }
        ],
        verse: "विषं भुक्त्वा अमृतं प्राप्य अमरत्वं च गच्छति — Sankat ko seh kar hi param shanti aur satya ki prapti hoti hai.",
        author: "Divya Dhara"
      },
      {
        id: "story-nachiketa",
        category: "NEETI AUR ADHYATMA",
        title: "Balak Nachiketa Aur Yamraj Ka Samvad",
        subtitle: "Kathopanishad ka mool gyaan aur aatmik satya",
        summary: "Chhote se balak Nachiketa ki nishtha aur mrityu ke devta Yamraj ke beech aatmik gyaan ki shaswat katha.",
        preview: "Satya ki talash mein Yamraj ke dwar tak pahunchne wale saahasi balak Nachiketa ki katha...",
        paragraphs: [
          {
            heading: "Satya Ki Jigyasa",
            text: "Nachiketa ne apne pita ke vachan ko satya karne ke liye swayam Yamlok ki yatra ki aur Yamraj se aatma ka rahasya jana."
          }
        ],
        verse: "न जायते म्रियते वा कदाचिन् नायं भूत्वा भविता वा न भूयः।",
        author: "Divya Dhara"
      },
      {
        id: "story-sudama-milan",
        category: "PRERNA-DAYAK PRASANG",
        title: "Shri Krishna Aur Sudama Ki Sachi Mitrata",
        subtitle: "Prem, Samarpan aur Nishwarth Sneha Ka Prateek",
        summary: "Dwarika ke raja Shri Krishna aur garib brahman Sudama ki aatmik aur anupam mitrata ki katha.",
        preview: "Dwarkadhish Krishna aur Sudama ka milan prem aur samarpan ka sarvottam udaharan hai...",
        paragraphs: [
          {
            heading: "Sachi Mitrata Ka Maan",
            text: "Jab Sudama dwar par aaye, toh Shri Krishna ne singhasan chhod kar daudte hue unhe gale lagaya aur mitrata ka dharm nibhaya."
          }
        ],
        verse: "मित्रस्य चक्षुषा सर्वाणि भूतानि समीक्षामहे — Mitra ki drishti se samast sansar ko dekhna hi sacha prem hai.",
        author: "Divya Dhara"
      }
    ]
  },
};