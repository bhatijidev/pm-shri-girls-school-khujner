import db from '../config/db.js';

export const expandedBooks = [
  // ==========================================
  // HINDU DHARM SACRED HERITAGE (10 new books)
  // ==========================================
  {
    title: 'Chanakya Niti Sutras (चाणक्य नीति सूत्र सम्पूर्ण)',
    title_hindi: 'चाणक्य नीति (आचार्य चाणक्य - संपूर्ण व्यावहारिक नीति सूत्र)',
    author: 'Acharya Chanakya (आचार्य चाणक्य)',
    publisher: 'Bharatiya Vidya Mandir (Public Domain)',
    description: 'Complete Sanskrit verses with Hindi and English commentary on statecraft, ethics, student discipline, leadership and practical wisdom.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Ethics & Statecraft (नीति शास्त्र)',
    cover_image_url: '/images/books/cat-hindudharm.jpg',
    external_url: 'https://archive.org/details/chanakya-niti-with-hindi-and-english-translation-by-satya-vrat-shastri-bharatiya',
    pdf_file_url: 'https://archive.org/download/chanakya-niti-with-hindi-and-english-translation-by-satya-vrat-shastri-bharatiya/Chanakya%20Niti%20%20With%20Hindi%20And%20English%20Translation%20by%20Satya%20Vrat%20Shastri%20-%20Bharatiya%20Vidya%20Mandir%20Kolkata.pdf'
  },
  {
    title: 'Vidur Niti (महाभारत उद्योग पर्व - विदुर नीति)',
    title_hindi: 'विदुर नीति (गीताप्रेस गोरखपुर - महात्मा विदुर के नीति उपदेश)',
    author: 'Mahatma Vidur (Gita Press Gorakhpur)',
    publisher: 'Gita Press Gorakhpur (Public Domain)',
    description: 'The timeless dialogue between Vidur and King Dhritarashtra on righteous conduct, governance, peace, duty, and spiritual discernment.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Classical Ethics & Wisdom (धर्म व नीति)',
    cover_image_url: '/images/books/bhagavad-gita-real.jpg',
    external_url: 'https://archive.org/details/vidur-niti-from-maha-bharat-udyog-parva-gita-press-gorakhpur',
    pdf_file_url: 'https://archive.org/download/vidur-niti-from-maha-bharat-udyog-parva-gita-press-gorakhpur/Vidur%20Niti%20From%20Maha%20Bharat%20Udyog%20Parva%20-%20Gita%20Press%2C%20Gorakhpur.pdf'
  },
  {
    title: 'Panchatantra (विष्णु शर्मा कृत पंचतंत्र की नीति कथाएं)',
    title_hindi: 'पंचतंत्र (पंडित विष्णु शर्मा - प्रेरक बाल नीति कथाएं)',
    author: 'Pt. Vishnu Sharma (पंडित विष्णु शर्मा)',
    publisher: 'Classical Sanskrit Heritage (Public Domain)',
    description: 'Five tantras (Mitra-bheda, Mitra-labha, Kakolukiyam, Labdhapranasham, Aparikshitakarakam) conveying life skills, animal fables, and worldly intelligence.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Moral Fables & Intelligence (नीति कथाएं)',
    cover_image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
    external_url: 'https://archive.org/details/panchatantra_202003',
    pdf_file_url: 'https://archive.org/download/panchatantra_202003/panchatantra.pdf'
  },
  {
    title: 'Hitopadesha (पंडित नारायण कृत हितोपदेश नीति कथाएं)',
    title_hindi: 'हितोपदेश (पंडित नारायण - बुद्धि एवं चारित्रिक विकास कथाएं)',
    author: 'Pt. Narayana (पंडित नारायण)',
    publisher: 'Classical Sanskrit Heritage (Public Domain)',
    description: 'Timeless moral stories and subhashitas designed to impart wisdom, friendship virtues, and righteous living to students.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Moral Stories & Wisdom (हितोपदेश)',
    cover_image_url: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?w=600&q=80',
    external_url: 'https://archive.org/details/Hitopadesha-OCR',
    pdf_file_url: 'https://archive.org/download/Hitopadesha-OCR/Hitopadesha-OCR-Complete.pdf'
  },
  {
    title: 'Shri Durga Saptashati (श्रीदुर्गासप्तशती - गीताप्रेस)',
    title_hindi: 'श्रीदुर्गासप्तशती (गीताप्रेस गोरखपुर - मार्कण्डेय पुराणोक्त देवी माहात्म्य)',
    author: 'Maharshi Vedavyasa (Gita Press Gorakhpur)',
    publisher: 'Gita Press Gorakhpur (Public Domain)',
    description: 'Complete 13 chapters of Devi Mahatmya along with Kavach, Argala, and Keelak with lucid Hindi translation depicting righteous victory over evil.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Sacred Scripture & Bhakti (देवी माहात्म्य)',
    cover_image_url: '/images/books/cat-hindudharm.jpg',
    external_url: 'https://archive.org/details/DurgaSaptashati_201709',
    pdf_file_url: 'https://archive.org/download/DurgaSaptashati_201709/Durga_Saptashati.pdf'
  },
  {
    title: 'Shrimad Bhagavata Mahapuran (श्रीमद्भागवत महापुराण)',
    title_hindi: 'श्रीमद्भागवत महापुराण (गीताप्रेस गोरखपुर - भक्ति व ज्ञान रस)',
    author: 'Maharshi Vedavyasa (Gita Press Gorakhpur)',
    publisher: 'Gita Press Gorakhpur (Public Domain)',
    description: 'Twelve skandhas expounding highest devotion, cosmic philosophy, righteousness, and the divine pastimes of Shri Krishna with Hindi translation.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Puranic Wisdom & Bhakti (महापुराण)',
    cover_image_url: '/images/books/ramcharitmanas-gp.jpg',
    external_url: 'https://archive.org/details/srimad-bhagavat-mahapuran-2-volume-set-sanskrit-hindi',
    pdf_file_url: 'https://archive.org/download/srimad-bhagavat-mahapuran-2-volume-set-sanskrit-hindi/Srimad%20Bhagavat%20Mahapuran%20Volume%201%20Sanskrit%20Hindi.pdf'
  },
  {
    title: 'Shri Vishnu Sahasranama Stotram (श्रीविष्णुसहस्रनाम स्तोत्रम्)',
    title_hindi: 'श्रीविष्णुसहस्रनाम स्तोत्रम् (गीताप्रेस गोरखपुर - सहस्र नाम महिमा)',
    author: 'Bhishma Pitamaha / Vedavyasa (Gita Press)',
    publisher: 'Gita Press Gorakhpur (Public Domain)',
    description: 'Thousand divine names of Lord Vishnu with Sanskrit text, word-by-word meaning, and Hindi commentary for mental peace, focus, and spiritual elevation.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Stotra & Devotional Hymns (स्तोत्र साहित्य)',
    cover_image_url: '/images/books/gita-press-large.jpg',
    external_url: 'https://archive.org/details/ShriVishnuSahasranamamInHindiAndSanskrit',
    pdf_file_url: 'https://archive.org/download/ShriVishnuSahasranamamInHindiAndSanskrit/Shri-Vishnu-Sahasranamam-in-Hindi-and-Sanskrit.pdf'
  },
  {
    title: 'Skanda Mahapuran (संक्षिप्त स्कन्दपुराण - गीताप्रेस)',
    title_hindi: 'संक्षिप्त स्कन्दपुराण (गीताप्रेस गोरखपुर - तीर्थ व धर्म कथाएं)',
    author: 'Maharshi Vedavyasa (Gita Press Gorakhpur)',
    publisher: 'Gita Press Gorakhpur (Public Domain)',
    description: 'Concise Skanda Purana featuring sacred pilgrimage heritage, spiritual ethics, moral stories, and cosmic wisdom in lucid Hindi.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Puranic Heritage (स्कन्दपुराण)',
    cover_image_url: '/images/books/cat-hindudharm.jpg',
    external_url: 'https://archive.org/details/skanda-puran-gita-press-gorakhpur',
    pdf_file_url: 'https://archive.org/download/skanda-puran-gita-press-gorakhpur/Skanda%20Puran%20-%20Gita%20Press%20Gorakhpur.pdf'
  },
  {
    title: 'Bhavishya Mahapuran (संक्षिप्त भविष्यपुराण - गीताप्रेस)',
    title_hindi: 'संक्षिप्त भविष्यपुराण (गीताप्रेस गोरखपुर - सदाचार एवं धर्म संस्कृति)',
    author: 'Maharshi Vedavyasa (Gita Press Gorakhpur)',
    publisher: 'Gita Press Gorakhpur (Public Domain)',
    description: 'Puranic wisdom, righteous living, conduct of society, charity, fasts, and festival traditions in detailed Hindi translation.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Puranic Heritage (भविष्यपुराण)',
    cover_image_url: '/images/books/cat-hindudharm.jpg',
    external_url: 'https://archive.org/details/bhavishya-puran-gita-press-gorakhpur',
    pdf_file_url: 'https://archive.org/download/bhavishya-puran-gita-press-gorakhpur/Bhavishya%20Puran%20-%20Gita%20Press%20Gorakhpur.pdf'
  },
  {
    title: 'Brahma Vaivarta Purana (संक्षिप्त ब्रह्मवैवर्तपुराण - गीताप्रेस)',
    title_hindi: 'संक्षिप्त ब्रह्मवैवर्तपुराण (गीताप्रेस गोरखपुर - प्रकृति व कृष्ण जन्म खण्ड)',
    author: 'Maharshi Vedavyasa (Gita Press Gorakhpur)',
    publisher: 'Gita Press Gorakhpur (Public Domain)',
    description: 'Brahma, Prakriti, Ganesha, and Krishna-Janma Khandas explaining cosmic creation, nature, righteousness, and sublime spiritual knowledge.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Sacred Epics & Purana (ब्रह्मवैवर्तपुराण)',
    cover_image_url: '/images/books/cat-hindudharm.jpg',
    external_url: 'https://archive.org/details/brahma-vaivarta-puran-gita-press-gorakhpur',
    pdf_file_url: 'https://archive.org/download/brahma-vaivarta-puran-gita-press-gorakhpur/Brahma%20Vaivarta%20Puran%20-%20Gita%20Press%20Gorakhpur.pdf'
  },

  // ==========================================
  // COMPETITIVE EXAMS HUB (14 new books/portals)
  // ==========================================
  {
    title: 'General Knowledge & General Studies Handbook (सामान्य ज्ञान समग्र संकलन)',
    title_hindi: 'सामान्य ज्ञान एवं सामान्य अध्ययन (प्रतियोगी परीक्षा विशेषांक)',
    author: 'Educational Editorial Board',
    publisher: 'National Open Education Portal',
    description: 'Comprehensive question bank of Indian History, Geography, Indian Polity, Economy, Science, and National Current Affairs for MPPSC, SSC, and Police Exams.',
    category_slug: 'competitive',
    class_grade: 'All Ages / Competitive',
    subject: 'General Knowledge (सामान्य अध्ययन)',
    cover_image_url: '/images/books/cat-competitive.jpg',
    external_url: 'https://archive.org/details/SamanyaGyanGKTop200MCQs',
    pdf_file_url: 'https://archive.org/download/SamanyaGyanGKTop200MCQs/Samanya%20Gyan%20GK%20Top%20200%20MCQs.pdf'
  },
  {
    title: 'BPSC & State PCS General Studies Practice Question Bank (राज्य सेवा प्रारंभिक प्रश्न बैंक)',
    title_hindi: 'राज्य सेवा प्रारंभिक परीक्षा प्रश्न बैंक (MPPSC, BPSC, UPPSC)',
    author: 'State Civil Services Faculty',
    publisher: 'Public Education Repository',
    description: 'Top 700+ solved conceptual and objective practice questions for State Public Service Commissions (MPPSC, BPSC, UPPSC) covering General Studies.',
    category_slug: 'competitive',
    class_grade: 'All Ages / Competitive',
    subject: 'State Civil Services (राज्य सेवा परीक्षा)',
    cover_image_url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80',
    external_url: 'https://archive.org/details/BPSCSamanyaGyanTop700MCQs',
    pdf_file_url: 'https://archive.org/download/BPSCSamanyaGyanTop700MCQs/BPSC%20Samanya%20Gyan%20Top%20700%20MCQs.pdf'
  },
  {
    title: 'Constitution of India (भारत का संविधान - मूल पाठ एवं प्रमुख संशोधन)',
    title_hindi: 'भारत का संविधान (विधि एवं न्याय मंत्रालय - आधिकारिक संस्करण)',
    author: 'Dr. B.R. Ambedkar & Drafting Committee',
    publisher: 'Ministry of Law & Justice, Govt of India',
    description: 'Official authentic Constitution of India with Fundamental Rights, Directive Principles, Parliamentary Framework, Judiciary, and Constitutional Amendments.',
    category_slug: 'competitive',
    class_grade: 'All Ages / Competitive',
    subject: 'Indian Polity & Constitution (राजव्यवस्था एवं संविधान)',
    cover_image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
    external_url: 'https://legislative.gov.in/constitution-of-india/',
    pdf_file_url: 'https://archive.org/download/in.ernet.dli.2015.424297/2015.424297.Bharat-Ka.pdf'
  },
  {
    title: 'Comprehensive Hindi Grammar for Competitive Exams (समग्र हिंदी व्याकरण एवं रचना)',
    title_hindi: 'समग्र हिंदी व्याकरण एवं रचना (पटवारी, एसआई, टीईटी व MPPSC)',
    author: 'Prof. Ramchandra Verma',
    publisher: 'Hindi Sahitya Sammelan',
    description: 'Complete Hindi grammar guide covering Varnamala, Sandhi, Samas, Ras, Chhand, Alankar, Muhavare, Vakya Shuddhi for MPPSC, Patwari, TET & Sub-Inspector.',
    category_slug: 'competitive',
    class_grade: 'All Ages / Competitive',
    subject: 'General Hindi (सामान्य हिंदी व्याकरण)',
    cover_image_url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80',
    external_url: 'https://archive.org/details/dli.language.0817',
    pdf_file_url: 'https://archive.org/download/dli.language.0817/dli.language.0817.pdf'
  },
  {
    title: 'Ancient Indian History for Civil Services (भारत का इतिहास - प्राचीन भारत)',
    title_hindi: 'प्राचीन भारत का इतिहास (सिविल सेवा एवं प्रतियोगी परीक्षा संकलन)',
    author: 'Prof. Makkhan Lal',
    publisher: 'NCERT / National Education Archive',
    description: 'Authoritative history handbook from Indus Valley Civilization, Vedic period, Mahajanapadas, Maurya and Gupta empires with historical maps and archaeological evidence.',
    category_slug: 'competitive',
    class_grade: 'All Ages / Competitive',
    subject: 'Indian History (भारतीय इतिहास)',
    cover_image_url: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&q=80',
    external_url: 'https://archive.org/details/ncert-history-hindi',
    pdf_file_url: 'https://archive.org/download/ncert-history-hindi/NCERT_HISTORY_HINDI_MAKKHAN_LAL_Prachin_Bharat.pdf'
  },
  {
    title: 'Themes in Indian History: Complete 3 Parts (भारतीय इतिहास के कुछ विषय - भाग 1, 2 व 3)',
    title_hindi: 'भारतीय इतिहास के कुछ विषय (भाग 1, 2 व 3 - समग्र संस्करण)',
    author: 'NCERT Senior Academic Directorate',
    publisher: 'NCERT New Delhi',
    description: 'Comprehensive 3-volume master text on Indian archaeological excavations, religious traditions, Bhakti-Sufi movements, agrarian society, and Partition history.',
    category_slug: 'competitive',
    class_grade: 'All Ages / Competitive',
    subject: 'Civil Services GS History (इतिहास विशेषांक)',
    cover_image_url: '/images/books/ncert-bharat-vishwa.jpg',
    external_url: 'https://archive.org/details/bhartiya-itihas-ke-kuch-vishaya-bhag-1-2-3',
    pdf_file_url: 'https://archive.org/download/bhartiya-itihas-ke-kuch-vishaya-bhag-1-2-3/Bhartiya%20Itihas%20ke%20kuch%20Vishaya%20Bhag%20-%201%2C%202%2C%203.pdf'
  },
  {
    title: 'Human & Economic Geography (मानव एवं आर्थिक भूगोल)',
    title_hindi: 'मानव एवं आर्थिक भूगोल (भारत एवं विश्व का समग्र भूगोल)',
    author: 'National Geography Directorate',
    publisher: 'Open Education Repository',
    description: 'World and Indian geography detailing population dynamics, human settlements, mineral resources, agriculture, industries, transport, and international trade.',
    category_slug: 'competitive',
    class_grade: 'All Ages / Competitive',
    subject: 'Geography (भूगोल)',
    cover_image_url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80',
    external_url: 'https://archive.org/details/MANAVAURARTHIKBHUGOLHINDI',
    pdf_file_url: 'https://archive.org/download/MANAVAURARTHIKBHUGOLHINDI/MANAV%20AUR%20ARTHIK%20BHUGOL%20-%20HINDI.pdf'
  },
  {
    title: 'Cyber Hygiene & Digital Safety Student Handbook (साइबर सुरक्षा विद्यार्थी मार्गदर्शिका)',
    title_hindi: 'साइबर स्वच्छता एवं डिजिटल सुरक्षा हैंडबुक (गृह मंत्रालय, भारत सरकार)',
    author: 'Indian Cyber Crime Coordination Centre (I4C), MHA',
    publisher: 'Ministry of Home Affairs, Government of India',
    description: 'Official government handbook for school and college students on preventing phishing, cyberbullying, online scams, and using national helpline 1930.',
    category_slug: 'competitive',
    class_grade: 'All Ages / Competitive',
    subject: 'Cyber Security & IT (साइबर सुरक्षा)',
    cover_image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80',
    external_url: 'https://cybercrime.gov.in',
    pdf_file_url: 'https://cybercrime.gov.in/UploadMedia/MHA_Handbook_Cyber_Hygiene_Students.pdf'
  },
  {
    title: 'NEET-UG Medical Entrance Preparation Hub (राष्ट्रीय पात्रता सह प्रवेश परीक्षा पोर्टल)',
    title_hindi: 'नीट मेडिकल प्रवेश परीक्षा पोर्टल (अभ्यास प्रश्न व पाठ्यक्रम)',
    author: 'National Testing Agency (NTA)',
    publisher: 'Government of India',
    description: 'Official guidance, information bulletin, syllabus breakdown, and mock test portal for undergraduate medical admissions (MBBS/BDS/BAMS).',
    category_slug: 'competitive',
    class_grade: 'Class 11-12',
    subject: 'Medical Entrance Prep (नीट परीक्षा)',
    cover_image_url: '/images/books/ncert-biology-c11.jpg',
    external_url: 'https://neet.nta.nic.in',
    pdf_file_url: 'https://neet.nta.nic.in'
  },
  {
    title: 'JEE Main Engineering Entrance Examination Hub (संयुक्त प्रवेश परीक्षा पोर्टल)',
    title_hindi: 'जेईई मेन इंजीनियरिंग प्रवेश परीक्षा पोर्टल (गणित, भौतिकी, रसायन)',
    author: 'National Testing Agency (NTA)',
    publisher: 'Ministry of Education, Government of India',
    description: 'Direct access to previous question papers, detailed syllabus, mathematical formula bank, and exam guidelines for NITs, IIITs, and JEE Advanced.',
    category_slug: 'competitive',
    class_grade: 'Class 11-12',
    subject: 'Engineering Entrance Prep (जेईई मेन)',
    cover_image_url: '/images/books/ncert-physics-c12.jpg',
    external_url: 'https://jeemain.nta.nic.in',
    pdf_file_url: 'https://jeemain.nta.nic.in'
  },
  {
    title: 'UPSC Civil Services Examination Portal & Syllabi (संघ लोक सेवा आयोग सिविल सेवा)',
    title_hindi: 'संघ लोक सेवा आयोग (UPSC) सिविल सेवा परीक्षा मार्गदर्शन',
    author: 'Union Public Service Commission (UPSC)',
    publisher: 'Government of India',
    description: 'Complete IAS/IPS/IFS examination scheme, preliminary GS & CSAT syllabus, optional subject lists, and official notification guidelines.',
    category_slug: 'competitive',
    class_grade: 'All Ages / Competitive',
    subject: 'UPSC Civil Services (सिविल सेवा)',
    cover_image_url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80',
    external_url: 'https://upsc.gov.in',
    pdf_file_url: 'https://upsc.gov.in'
  },
  {
    title: 'Staff Selection Commission (SSC) Exam Portal & Model Questions (कर्मचारी चयन आयोग)',
    title_hindi: 'कर्मचारी चयन आयोग (SSC CGL, CHSL, GD कांस्टेबल पोर्टल)',
    author: 'Staff Selection Commission (SSC)',
    publisher: 'Department of Personnel and Training (DoPT)',
    description: 'Official syllabus, examination schemes, previous papers, and answer keys for SSC CGL, CHSL, MTS, and GD Constable examinations.',
    category_slug: 'competitive',
    class_grade: 'All Ages / Competitive',
    subject: 'SSC Exam Preparation (एसएससी भर्ती)',
    cover_image_url: '/images/books/cat-competitive.jpg',
    external_url: 'https://ssc.gov.in',
    pdf_file_url: 'https://ssc.gov.in'
  },
  {
    title: 'MP Online & ESB Examination Portal (म.प्र. कर्मचारी चयन मंडल व्यापम पोर्टल)',
    title_hindi: 'मध्य प्रदेश कर्मचारी चयन मंडल (ESB / व्यापम परीक्षा पोर्टल)',
    author: 'MP Employees Selection Board (MPESB)',
    publisher: 'Government of Madhya Pradesh',
    description: 'Portal for MP Police Constable, Patwari, Sub-Inspector, Forest Guard, and Teacher Eligibility Test (TET) notifications, rules, and question banks.',
    category_slug: 'competitive',
    class_grade: 'All Ages / Competitive',
    subject: 'MP State Recruitment (व्यापम एवं ईएसबी)',
    cover_image_url: '/images/books/cat-mpboard.jpg',
    external_url: 'https://esb.mp.gov.in',
    pdf_file_url: 'https://esb.mp.gov.in'
  },
  {
    title: 'SWAYAM Free Online Courses & Certification Hub (स्वयं डिजिटल उच्च शिक्षा पोर्टल)',
    title_hindi: 'स्वयं डिजिटल उच्च शिक्षा एवं कौशल संवर्धन पोर्टल (भारत सरकार)',
    author: 'Ministry of Education & IIT Consortium',
    publisher: 'Government of India (MoE & NPTEL)',
    description: 'Free online lectures, study notes, audio-video modules, and university credits taught by top professors of IITs, IIMs, and Central Universities.',
    category_slug: 'competitive',
    class_grade: 'All Ages / Competitive',
    subject: 'Higher Learning & Skills (स्वयं पोर्टल)',
    cover_image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
    external_url: 'https://swayam.gov.in',
    pdf_file_url: 'https://swayam.gov.in'
  },

  // ==========================================
  // SCHOOL MATERIALS & GIRLS BIOGRAPHIES (6 new books)
  // ==========================================
  {
    title: 'Wings of Fire: An Autobiography (अग्नि की उड़ान - डॉ. एपीजे अब्दुल कलाम)',
    title_hindi: 'अग्नि की उड़ान (डॉ. एपीजे अब्दुल कलाम - प्रेरक जीवन गाथा)',
    author: 'Dr. APJ Abdul Kalam & Arun Tiwari',
    publisher: 'Prabhat Prakashan / Public Domain Archive',
    description: 'Former President Dr. Kalam inspiring life journey from Rameswaram to ISRO and DRDO, urging girl students to dream big, develop scientific temper, and persevere.',
    category_slug: 'school-materials',
    class_grade: 'Class 6-12',
    subject: 'Inspirational Biography (प्रेरक आत्मकथा)',
    cover_image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
    external_url: 'https://archive.org/details/001-agni-ki-udan-hindi',
    pdf_file_url: 'https://archive.org/download/001-agni-ki-udan-hindi/001-Agni-Ki-udan-Hindi.pdf'
  },
  {
    title: 'Swami Vivekananda: Mind Power & Dedicated Life (मन की शक्ति तथा जीवन-ध्येय)',
    title_hindi: 'मन की शक्ति तथा जीवन-ध्येय (स्वामी विवेकानंद - युवा चेतना)',
    author: 'Swami Vivekananda (स्वामी विवेकानंद)',
    publisher: 'Ramakrishna Mission Belur Math',
    description: 'Fiery lectures and writings inspiring youth towards mental focus, self-confidence, unselfish service, physical vigor, and fearlessness.',
    category_slug: 'school-materials',
    class_grade: 'Class 6-12',
    subject: 'Youth Inspiration & Character (युवा प्रेरणा)',
    cover_image_url: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?w=600&q=80',
    external_url: 'https://archive.org/details/Man.Ki.Shakti.Tara.Jivanagatha.Ki.Sadhana.by.Swami.Vivekananda',
    pdf_file_url: 'https://archive.org/download/Man.Ki.Shakti.Tara.Jivanagatha.Ki.Sadhana.by.Swami.Vivekananda/Man.Ki.Shakti.Tara.Jivanagatha.Ki.Sadhana.by.Swami.Vivekananda.pdf'
  },
  {
    title: 'Jhansi Ki Rani Lakshmibai (झांसी की रानी लक्ष्मीबाई - जीवन चरित एवं शौर्य)',
    title_hindi: 'झांसी की रानी लक्ष्मीबाई (शौर्य, स्वाभिमान एवं स्वतंत्रता संग्राम)',
    author: 'Dr. Vrindavanlal Verma & Research Scholars',
    publisher: 'National Heritage Archives',
    description: 'Inspiring biography of Veerangana Rani Lakshmibai of Jhansi, showcasing unparalleled courage, military leadership, and martyrdom for Indian freedom.',
    category_slug: 'school-materials',
    class_grade: 'Class 6-12',
    subject: 'Women Leadership & Valor (वीरांगना शौर्य)',
    cover_image_url: '/images/books/cat-career.jpg',
    external_url: 'https://archive.org/details/in.ernet.dli.2015.480108',
    pdf_file_url: 'https://archive.org/download/in.ernet.dli.2015.480108/2015.480108.Jhansi-Ki.pdf'
  },
  {
    title: 'Krantijyoti Savitribai Phule: Pioneer of Girls Education (सावित्रीबाई फुले - एक प्रवर्तक की कहानी)',
    title_hindi: 'क्रांतिज्योति सावित्रीबाई फुले (स्त्री शिक्षा की प्रथम अग्रदूत)',
    author: 'Azim Premji University Education Cell',
    publisher: 'Azim Premji University Press',
    description: 'The historic journey of India first female teacher Savitribai Phule, who fought social barriers to open schools for girls and uplift the underprivileged.',
    category_slug: 'school-materials',
    class_grade: 'Class 6-12',
    subject: 'Pioneer of Girls Education (स्त्री शिक्षा की अग्रदूत)',
    cover_image_url: '/images/books/cat-career.jpg',
    external_url: 'https://archive.org/details/Savitribai-EkPravartakKiKahani-AzimPremjiUniversity',
    pdf_file_url: 'https://archive.org/download/Savitribai-EkPravartakKiKahani-AzimPremjiUniversity/h-savitri-phule-azim.pdf'
  },
  {
    title: 'Punyashlok Ahilyabai Holkar (पुण्यश्लोक अहिल्याबाई होल्कर - जीवन चरित एवं सुशासन)',
    title_hindi: 'पुण्यश्लोक अहिल्याबाई होल्कर (मालवा की न्यायप्रिय महारानी एवं सुशासन)',
    author: 'Vinayak Rao & Malwa History Society',
    publisher: 'DLI Historical Series',
    description: 'Glorious history of Queen Ahilyabai Holkar of Malwa, renowned for equitable justice, temple restorations, women welfare, and visionary governance.',
    category_slug: 'school-materials',
    class_grade: 'Class 6-12',
    subject: 'MP Historic Women Rulers (मालवा का गौरव)',
    cover_image_url: '/images/books/cat-career.jpg',
    external_url: 'https://archive.org/details/in.ernet.dli.2015.308798',
    pdf_file_url: 'https://archive.org/download/in.ernet.dli.2015.308798/2015.308798.Ahilyabai-Holkar.pdf'
  },
  {
    title: 'Career Guidance & Opportunities for Rural Girls (बालिका करियर एवं भविष्य निर्माण दिग्दर्शिका)',
    title_hindi: 'बालिका करियर दिग्दर्शिका (10वीं व 12वीं के बाद उच्च शिक्षा व अवसर)',
    author: 'PM SHRI Guidance & Career Counseling Cell',
    publisher: 'PM SHRI Govt. Girls HSS Khujner',
    description: 'Complete roadmaps for Class 10th and 12th students: Nursing (GNM/B.Sc), Teaching (D.El.Ed/B.Ed), Defence forces (Agniveer/NCC), ITI skills, and Banking.',
    category_slug: 'school-materials',
    class_grade: 'Class 9-12',
    subject: 'Career Counseling (करियर मार्गदर्शन)',
    cover_image_url: '/images/books/cat-career.jpg',
    external_url: 'https://vimarsh.mp.gov.in',
    pdf_file_url: 'https://vimarsh.mp.gov.in'
  },

  // ==========================================
  // MP BOARD CURRICULUM & QUESTION BANKS (6 new books)
  // ==========================================
  {
    title: 'MP Board Class 10 Science Vimarsh Practice Question Bank (कक्षा 10 विज्ञान प्रश्न बैंक)',
    title_hindi: 'कक्षा 10 विज्ञान प्रश्न बैंक (विमर्श पोर्टल म.प्र. - बोर्ड परीक्षा अभ्यास)',
    author: 'Directorate of Public Instruction (DPI MP)',
    publisher: 'Vimarsh Portal MP School Education',
    description: 'Unit-wise model questions, chemical reaction equations, ray diagrams, and blueprint-aligned practice papers for MP Board Class 10 Science exams.',
    category_slug: 'mp-board',
    class_grade: 'Class 10',
    subject: 'Science (MP Board)',
    cover_image_url: '/images/books/ncert-science-c9.jpg',
    external_url: 'https://vimarsh.mp.gov.in',
    pdf_file_url: 'https://vimarsh.mp.gov.in'
  },
  {
    title: 'MP Board Class 10 Mathematics Question Bank & Model Paper (कक्षा 10 गणित प्रश्न बैंक)',
    title_hindi: 'कक्षा 10 गणित प्रश्न बैंक (ब्लूप्रिंट अनुसार सम्पूर्ण अध्यायवार हल)',
    author: 'MP Board Examination Board Bhopal',
    publisher: 'MPBSE Bhopal',
    description: 'Quadratic equations, arithmetic progressions, coordinate geometry, trigonometry, and surface area practice questions based on latest 2024-25 blueprint.',
    category_slug: 'mp-board',
    class_grade: 'Class 10',
    subject: 'Mathematics (MP Board)',
    cover_image_url: '/images/books/ncert-math-c10.jpg',
    external_url: 'https://vimarsh.mp.gov.in',
    pdf_file_url: 'https://vimarsh.mp.gov.in'
  },
  {
    title: 'MP Board Class 10 Social Science Question Bank (कक्षा 10 सामाजिक विज्ञान प्रश्न बैंक)',
    title_hindi: 'कक्षा 10 सामाजिक विज्ञान प्रश्न बैंक (इतिहास, भूगोल, राजनीति, अर्थशास्त्र)',
    author: 'DPI MP Academic Cell',
    publisher: 'Vimarsh Portal MP',
    description: 'Complete chapter-wise objective and descriptive questions for History, Geography, Democratic Politics, and Economics with India map practice.',
    category_slug: 'mp-board',
    class_grade: 'Class 10',
    subject: 'Social Science (MP Board)',
    cover_image_url: '/images/books/ncert-loktantra.jpg',
    external_url: 'https://vimarsh.mp.gov.in',
    pdf_file_url: 'https://vimarsh.mp.gov.in'
  },
  {
    title: 'MP Board Class 12 Physics Vimarsh Question Bank (कक्षा 12 भौतिक शास्त्र प्रश्न बैंक)',
    title_hindi: 'कक्षा 12 भौतिक शास्त्र प्रश्न बैंक (विमर्श पोर्टल - आंकिक व सैद्धांतिक प्रश्न)',
    author: 'Subject Expert Committee, DPI MP',
    publisher: 'Directorate of Public Instruction (DPI), MP',
    description: 'Electrostatics, current electricity, optics, electromagnetic waves, and semiconductor devices with numerical problem solutions for MP Board 12th.',
    category_slug: 'mp-board',
    class_grade: 'Class 12',
    subject: 'Physics (MP Board)',
    cover_image_url: '/images/books/ncert-physics-c12.jpg',
    external_url: 'https://vimarsh.mp.gov.in',
    pdf_file_url: 'https://vimarsh.mp.gov.in'
  },
  {
    title: 'MP Board Class 12 Chemistry Vimarsh Question Bank (कक्षा 12 रसायन शास्त्र प्रश्न बैंक)',
    title_hindi: 'कक्षा 12 रसायन शास्त्र प्रश्न बैंक (कार्बनिक, अकार्बनिक व भौतिक रसायन)',
    author: 'State Education Council MP',
    publisher: 'DPI MP School Education',
    description: 'Solutions, electrochemistry, chemical kinetics, d and f block elements, coordination compounds, haloalkanes, and biomolecules practice sets.',
    category_slug: 'mp-board',
    class_grade: 'Class 12',
    subject: 'Chemistry (MP Board)',
    cover_image_url: '/images/books/cat-mpboard.jpg',
    external_url: 'https://vimarsh.mp.gov.in',
    pdf_file_url: 'https://vimarsh.mp.gov.in'
  },
  {
    title: 'MP Board Class 12 Biology Vimarsh Question Bank (कक्षा 12 जीव विज्ञान प्रश्न बैंक)',
    title_hindi: 'कक्षा 12 जीव विज्ञान प्रश्न बैंक (आनुवंशिकी, जैव प्रौद्योगिकी व पारिस्थितिकी)',
    author: 'Expert Committee, MP School Education',
    publisher: 'Vimarsh MP Govt',
    description: 'Sexual reproduction in plants/humans, principles of inheritance, molecular basis of genetics, biotechnology principles, and ecology board test bank.',
    category_slug: 'mp-board',
    class_grade: 'Class 12',
    subject: 'Biology (MP Board)',
    cover_image_url: '/images/books/ncert-biology-c11.jpg',
    external_url: 'https://vimarsh.mp.gov.in',
    pdf_file_url: 'https://vimarsh.mp.gov.in'
  }
];

export function insertBooks() {
  const catRows = db.prepare('SELECT id, slug FROM categories').all();
  const catMap = {};
  catRows.forEach(c => catMap[c.slug] = c.id);

  const insertStmt = db.prepare(`
    INSERT INTO books (
      title, title_hindi, author, publisher, description,
      category_id, class_grade, subject, cover_image_url,
      link_type, external_url, pdf_file_url, is_public_domain,
      is_active, view_count, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1, ?, datetime('now'), datetime('now'))
  `);

  let inserted = 0;
  let skipped = 0;

  db.exec('BEGIN TRANSACTION;');
  try {
    for (const b of expandedBooks) {
      const existing = db.prepare('SELECT id FROM books WHERE title = ?').get(b.title);
      if (existing) {
        skipped++;
        continue;
      }
      const catId = catMap[b.category_slug];
      if (!catId) {
        console.warn('Unknown category slug:', b.category_slug);
        continue;
      }
      const views = Math.floor(Math.random() * 80) + 40;
      const isDirectPdf = b.pdf_file_url && (b.pdf_file_url.toLowerCase().endsWith('.pdf') || b.pdf_file_url.includes('/pdf/'));
      const linkType = isDirectPdf ? 'pdf' : 'external';
      insertStmt.run(
        b.title,
        b.title_hindi,
        b.author,
        b.publisher,
        b.description,
        catId,
        b.class_grade,
        b.subject,
        b.cover_image_url,
        linkType,
        b.external_url,
        b.pdf_file_url,
        views
      );
      inserted++;
    }
    db.exec('COMMIT;');
    console.log(`✅ Successfully added ${inserted} new books! (Skipped existing: ${skipped})`);
  } catch (err) {
    db.exec('ROLLBACK;');
    console.error('Error inserting books:', err);
    throw err;
  }
}

if (process.argv[1].endsWith('add_expanded_books.js')) {
  insertBooks();
}
