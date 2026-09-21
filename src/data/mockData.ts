import { Course, Lesson, QuizQuestion, GradebookEntry, CertificateRecord, Lead, Invoice, Trainer, VisaSuccessStory, PartnerInstitute, StudentJourneyStage } from '../types';

export const DILS_INFO = {
  name: 'Dhaka International Language School & Visa Center (DILS)',
  shortName: 'DILS Dhaka',
  officialTitle: 'Dhaka International Language School (DILS)',
  director: 'MD. ABDUR RAZZAK',
  directorTitle: 'Director (JLPT-N1 Certified)',
  directorPhone: '01764-395945',
  directorWhatsapp: '+880 1300-634046',
  instructor: 'Tanvir Kabir Biplob',
  instructorTitle: 'Japanese Language Instructor (JLPT-N2 Certified)',
  instructorPhone: '017555-34997',
  instructorWhatsapp: '017555-34997',
  hotline: '01764-395945',
  whatsapp: '+880 1300-634046',
  whatsappDirect: '+880 1300-634046',
  email: 'care.dils2014@gmail.com',
  website: 'dilsbd.com',
  websiteUrl: 'https://www.dilsbd.com',
  facebook: 'https://www.facebook.com/DhakaInterLangSchool',
  address: '7th Floor (Lift-6), bti Central Plaza, 95 Green Rd, Dhaka 1215',
  landmark: 'Opposite to Farmgate Metro Station, Green Road',
  officeHours: 'Saturday - Thursday: 9:00 AM - 8:00 PM | Friday: 10:00 AM - 7:00 PM'
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'c-jp-n5',
    code: 'DILS-JPN-01',
    title: 'Japanese JLPT N5 & NAT-TEST 5Q Complete Mastery',
    titleBn: 'জাপানি ভাষা JLPT N5 ও NAT-TEST 5Q প্রিপারেশন (ভিসা স্পেশাল)',
    language: 'japanese',
    level: 'JLPT N5 / NAT 5Q',
    price: 18000,
    discountPrice: 13000,
    duration: '4 Months (120 Hours)',
    classesCount: 48,
    instructorName: 'Sensei Tanvir Kabir Biplob',
    instructorTitle: 'Japanese Language Instructor (JLPT-N2 Certified)',
    instructorPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    featured: true,
    description: 'Comprehensive beginner course covering Hiragana, Katakana, 100+ Kanji, Minna no Nihongo chapters 1-25, listening practice, and Japan Student Visa COE documentation guidance.',
    descriptionBn: 'হিরাগানা, কাতাকানা, ১০০+ কাঞ্জি, মিন্না নো নিহোঙ্গো ১-২৫ অধ্যায় এবং জাপান স্টুডেন্ট ভিসা ও সিওই (COE) ইন্টারভিউ প্রিপারেশন সহ সম্পূর্ণ কোর্স। ক্লাস নিবেন তানভির কবির বিপ্লব স্যার (JLPT N2)।',
    syllabus: [
      { week: 'Month 1', topic: 'Kana Scripts & Basic Greetings', modules: ['Hiragana & Dakuon mastery', 'Katakana with foreign words', 'Aisatsu & daily classroom phrases', 'Pronunciation & Pitch accent basics'] },
      { week: 'Month 2', topic: 'Basic Grammar & Sentence Structure', modules: ['Minna no Nihongo Lessons 1-8', 'Particles (wa, ga, ni, de, wo)', 'Verb groups & Polite Masu form', 'First 50 Kanji characters'] },
      { week: 'Month 3', topic: 'Intermediate Expressions & Daily Life', modules: ['Te-form requests & ongoing actions', 'Nai-form prohibitions & obligations', 'Counting system & time expressions', 'Next 50 Kanji & Kanji reading drills'] },
      { week: 'Month 4', topic: 'NAT-TEST & JLPT N5 Exam Simulation', modules: ['Chokai (Listening Comprehension) Drills', 'Dokkai (Reading Passages) speed tests', 'Model tests & negative marking analysis', 'Embassy interview & COE question practice'] }
    ],
    batches: [
      { id: 'b-jp-01', name: 'Morning Batch N5-A (Farmgate Campus)', days: 'Sat, Mon, Wed', time: '09:00 AM - 11:00 AM', room: 'Room 702 (Lab 1)', seatsLeft: 4, totalSeats: 25, startDate: '2026-10-05' },
      { id: 'b-jp-02', name: 'Evening Batch N5-B (Online Interactive)', days: 'Sun, Tue, Thu', time: '07:30 PM - 09:30 PM', room: 'Live Zoom Room 1', seatsLeft: 9, totalSeats: 30, startDate: '2026-10-10' }
    ]
  },
  {
    id: 'c-jp-n4',
    code: 'DILS-JPN-02',
    title: 'Japanese JLPT N4 & SSW Tokutei Ginou Work Track',
    titleBn: 'জাপানি ভাষা JLPT N4 ও এসএসডব্লিউ (SSW) জব ভিসা ট্র্যাক',
    language: 'japanese',
    level: 'JLPT N4',
    price: 22000,
    discountPrice: 17000,
    duration: '4 Months (140 Hours)',
    classesCount: 52,
    instructorName: 'Sensei MD. Abdur Razzak',
    instructorTitle: 'Director & Senior Japanese Language Mentor (JLPT-N1 Certified)',
    instructorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    featured: true,
    description: 'Pre-intermediate course covering Minna no Nihongo II (Chapters 26-50), 300+ Kanji, complex grammar forms (potential, passive, causative), and Tokutei Ginou technical skills test preparation.',
    descriptionBn: 'মিন্না নো নিহোঙ্গো ২য় খণ্ড (২৬-৫০ অধ্যায়), ৩০০+ কাঞ্জি, প্যাসিভ-পটেনশিয়াল গ্রামার ও জাপানে স্পেসিফাইড স্কিল্ড ওয়ার্কার (SSW) জব ভিসার সরাসরি প্রস্তুতি। সার্বিক তত্ত্বাবধানে রাজ্জাক স্যার (JLPT N1)।',
    syllabus: [
      { week: 'Month 1', topic: 'Complex Sentence Structures', modules: ['Lessons 26-32 (n desu, tara, ba form)', 'Potential verbs & ability expressions', 'Compound particles'] },
      { week: 'Month 2', topic: 'Honorifics & Workplace Japanese', modules: ['Passive & Causative verbs', 'Keigo (Sonkeigo & Kenjougo) basics', 'Workplace communication in Japan'] },
      { week: 'Month 3', topic: 'Reading Long Passages & Rapid Comprehension', modules: ['Speed reading newspaper clippings & emails', 'Kanji combinations (Jukugo)', 'Listening to natural Japanese dialogues'] },
      { week: 'Month 4', topic: 'Mock Exams & SSW Skills Prep', modules: ['4 Full-length JLPT N4 simulated exams', 'Interview etiquette & self-introduction (Jikoshoukai)', 'COE application review'] }
    ],
    batches: [
      { id: 'b-jp4-01', name: 'Weekend Fast Track N4 (Farmgate Campus)', days: 'Fri & Sat', time: '03:00 PM - 06:30 PM', room: 'Executive Room 705', seatsLeft: 6, totalSeats: 20, startDate: '2026-10-15' }
    ]
  },
  {
    id: 'c-jp-n3',
    code: 'DILS-JPN-03',
    title: 'Japanese JLPT N3 Advanced Career Track',
    titleBn: 'জাপানি ভাষা JLPT N3 উচ্চতর ক্যারিয়ার ট্র্যাক (জব ও স্কলারশিপ)',
    language: 'japanese',
    level: 'JLPT N3 / Business',
    price: 26000,
    discountPrice: 21000,
    duration: '5 Months (160 Hours)',
    classesCount: 60,
    instructorName: 'Sensei MD. Abdur Razzak',
    instructorTitle: 'Head of Japanese Department & Director (JLPT-N1 Certified)',
    instructorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    featured: true,
    description: 'Advanced course for university graduates and engineers. Covers 650+ Kanji, Japanese business documentation, newspaper reading, and direct Tokyo corporate interviews.',
    descriptionBn: 'উচ্চতর ব্যাকরণ, ৬৫০+ কাঞ্জি, জাপানি সংবাদপত্র পঠন ও জাপানের আইটি এবং ইঞ্জিনিয়ারিং কোম্পানিতে সরাসরি চাকরির সুযোগ তৈরি। সার্বিক নির্দেশনায় রাজ্জাক স্যার (JLPT N1)।',
    syllabus: [
      { week: 'Month 1', topic: 'N3 Grammar Patterns & Nuances', modules: ['Advanced functional expressions (toshite, ni taisite)', 'Nuance distinction between similar grammar', 'Speed reading short articles'] },
      { week: 'Month 2', topic: 'Business Keigo & Corporate Culture', modules: ['Kenjougo & Sonkeigo in business correspondence', 'Telephone etiquette & formal apology (Owabi)', 'Meishi exchange & business bowing'] },
      { week: 'Month 3', topic: 'Essays, Reports & JLPT N3 Mock Exams', modules: ['Long passage comprehension (Dokkai)', 'Audio listening under real test conditions', 'Specialized terminology in IT/Engineering'] },
      { week: 'Month 4', topic: 'Japan Company Interview Preparation', modules: ['Curriculum Vitae (Rirekisho) formatting', 'Direct interview Q&A coaching', 'Mock company selection interviews'] }
    ],
    batches: [
      { id: 'b-jp3-01', name: 'N3 Executive Evening (Online + Farmgate)', days: 'Sun, Tue, Thu', time: '08:00 PM - 10:00 PM', room: 'Executive Room 705', seatsLeft: 5, totalSeats: 20, startDate: '2026-10-12' }
    ]
  },
  {
    id: 'c-jp-spoken',
    code: 'DILS-JPN-04',
    title: 'Spoken Japanese & Japan Embassy Interview Masterclass',
    titleBn: 'স্পোকেন জাপানিজ ও এম্বাসি মক ইন্টারভিউ মাস্টারক্লাস',
    language: 'japanese',
    level: 'Executive Spoken',
    price: 16000,
    discountPrice: 12000,
    duration: '2.5 Months (70 Hours)',
    classesCount: 30,
    instructorName: 'Tanvir Kabir Biplob & Native Japanese Advisor',
    instructorTitle: 'Japanese Language Specialist (JLPT-N2 Certified)',
    instructorPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    featured: true,
    description: 'Master practical daily speech, native listening speed, airport conversation, and 3x full-dress one-on-one Japan Embassy visa mock interviews.',
    descriptionBn: 'বাস্তব জীবনের কথোপকথন, নেটিভ লিসেনিং স্পিড এবং ঢাকায় জাপান দূতাবাসের জন্য ৩টি ওয়ান-টু-ওয়ান পূর্ণাঙ্গ মক ইন্টারভিউ।',
    syllabus: [
      { week: 'Module 1', topic: 'Pronunciation, Pitch Accent & Fluency', modules: ['Pitch accent rules & natural rhythm', 'Everyday survival phrases for Tokyo life', 'Overcoming speaking hesitation'] },
      { week: 'Module 2', topic: 'Dormitory, Baito (Part-Time Job) & Shopping Dialogue', modules: ['How to apply for part-time jobs (Baito)', 'Convenience store (Konbini) & train station Japanese', 'Talking to landlords & emergency calling'] },
      { week: 'Module 3', topic: 'Japan Embassy 1-on-1 Mock Interview Drills', modules: ['Statement of Purpose verbal defense', 'Why Japan? Why this school? questions', '3 Timed video-recorded mock interview panels'] }
    ],
    batches: [
      { id: 'b-jps-01', name: 'Weekend Spoken Immersion Batch', days: 'Fri & Sat', time: '10:00 AM - 01:00 PM', room: 'Auditorium 701', seatsLeft: 8, totalSeats: 25, startDate: '2026-10-06' }
    ]
  },
  {
    id: 'c-jp-ssw',
    code: 'DILS-JPN-05',
    title: 'SSW Tokutei Ginou Skills & Japanese Technical Prep',
    titleBn: 'এসএসডব্লিউ (SSW) স্পেসিফাইড স্কিল্ড ওয়ার্কার টেকনিক্যাল প্রিপারেশন',
    language: 'japanese',
    level: 'SSW Track / Tokutei Ginou',
    price: 24000,
    discountPrice: 18000,
    duration: '4 Months (140 Hours)',
    classesCount: 48,
    instructorName: 'MD. Abdur Razzak & Industry Panel',
    instructorTitle: 'Director & Japan Immigration Specialist (JLPT-N1 Certified)',
    instructorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    featured: true,
    description: 'Dedicated preparation for Nursing Care (Kaigo), Food Service, Construction, and Agriculture SSW skill evaluation tests and JFT-Basic.',
    descriptionBn: 'কেয়ারগিভার (কাইগো), ফুড সার্ভিস, কনস্ট্রাকশন ও এগ্রিকালচার স্কিল টেস্ট এবং জেএফটি-বেসিক (JFT-Basic) পরীক্ষার চূড়ান্ত প্রস্তুতি।',
    syllabus: [
      { week: 'Module 1', topic: 'JFT-Basic & Workplace Japanese', modules: ['JFT-Basic test format mastery', 'Essential safety directives & industrial terms', 'Workplace compliance in Japan'] },
      { week: 'Module 2', topic: 'Industry Technical Vocabulary (Kaigo / Food)', modules: ['Nursing care Japanese terms & patient etiquette', 'Hygiene, HACCP & kitchen commands', 'Tools & equipment nomenclature'] },
      { week: 'Module 3', topic: 'CBT Computerized Test Simulation & Contract Signing', modules: ['Prometric CBT mock exam on computer', 'Employment terms understanding (Koyou Keiyaku)', 'Pre-departure visa clearance'] }
    ],
    batches: [
      { id: 'b-ssw-01', name: 'SSW Evening Intensive (Farmgate Campus)', days: 'Sat, Mon, Wed', time: '07:00 PM - 09:30 PM', room: 'Room 703 (Japan Lab)', seatsLeft: 6, totalSeats: 20, startDate: '2026-10-12' }
    ]
  }
];

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: 'les-jp-01',
    courseId: 'c-jp-n5',
    moduleName: 'Module 1: Hiragana & Greetings',
    title: 'Lesson 01: Japanese Sound System & Hiragana (A-I-U-E-O / Ka-Ki-Ku-Ke-Ko)',
    titleBn: 'পাঠ ০১: জাপানি ভাষার ধ্বনিতত্ত্ব ও হিরাগানা (あ・い・う・え・お)',
    duration: '32 mins',
    videoUrl: 'https://www.youtube.com/embed/6p9Il_j0zjc', // Real Japanese lesson sample
    isLocked: false,
    isCompleted: true,
    watchPercent: 100,
    pdfUrl: '#',
    notes: 'Master the 5 basic vowel sounds. Pronounce short and clean. Note the difference between "u" in English and Japanese (lips are unrounded).',
    vocabList: [
      { word: 'あさ (asa)', reading: 'asa', meaning: 'Morning (সকাল)', audioText: 'asa' },
      { word: 'いえ (ie)', reading: 'ie', meaning: 'House (বাড়ি)', audioText: 'ie' },
      { word: 'うえ (ue)', reading: 'ue', meaning: 'Above / Up (উপরে)', audioText: 'ue' },
      { word: 'おか (oka)', reading: 'oka', meaning: 'Hill (পাহাড়)', audioText: 'oka' }
    ]
  },
  {
    id: 'les-jp-02',
    courseId: 'c-jp-n5',
    moduleName: 'Module 1: Hiragana & Greetings',
    title: 'Lesson 02: Essential Classroom Greetings (Aisatsu) & Self Intro',
    titleBn: 'পাঠ ০২: ক্লাসরুম গ্রিটিংস ও আত্মপরিচয় (ওহায়ো গজাইমাসু)',
    duration: '28 mins',
    videoUrl: 'https://www.youtube.com/embed/k74yjmfFb_A',
    isLocked: false,
    isCompleted: true,
    watchPercent: 95,
    pdfUrl: '#',
    notes: 'Bow at 15 degrees for casual greeting, 30-45 degrees for formal respect. Use "Hajimemashite" only the first time you meet someone.',
    vocabList: [
      { word: 'おはようございます', reading: 'Ohayou gozaimasu', meaning: 'Good Morning (শুভ সকাল)', audioText: 'ohayou gozaimasu' },
      { word: 'こんにちは', reading: 'Konnichiwa', meaning: 'Good Afternoon / Hello (হ্যালো)', audioText: 'konnichiwa' },
      { word: 'はじめまして', reading: 'Hajimemashite', meaning: 'Nice to meet you (আপনার সাথে পরিচয় হয়ে ভালো লাগলো)', audioText: 'hajimemashite' },
      { word: 'よろしくおねがいします', reading: 'Yoroshiku onegaishimasu', meaning: 'Please treat me kindly (অনুগ্রহপূর্বক সাহায্য করবেন)', audioText: 'yoroshiku onegaishimasu' }
    ]
  },
  {
    id: 'les-jp-03',
    courseId: 'c-jp-n5',
    moduleName: 'Module 2: Grammar Lesson 1',
    title: 'Lesson 03: Minna no Nihongo Lesson 1 - Topic Particle WA & Affirmative DESU',
    titleBn: 'পাঠ ০৩: মিন্না নো নিহোঙ্গো লেসন ১ - পার্টিকল WA এবং DESU',
    duration: '45 mins',
    videoUrl: 'https://www.youtube.com/embed/v9Ym_LhB5t4',
    isLocked: false,
    isCompleted: false,
    watchPercent: 62,
    pdfUrl: '#',
    notes: 'Structure: [Noun 1] WA [Noun 2] DESU. Example: Watashi wa gakusei desu (I am a student). Note that the topic marker は is written as "ha" but pronounced "wa".',
    vocabList: [
      { word: 'わたし (Watashi)', reading: 'watashi', meaning: 'I / Me (আমি)', audioText: 'watashi' },
      { word: 'がくせい (Gakusei)', reading: 'gakusei', meaning: 'Student (ছাত্র/ছাত্রী)', audioText: 'gakusei' },
      { word: 'せんせい (Sensei)', reading: 'sensei', meaning: 'Teacher (শিক্ষক/ওস্তাদ)', audioText: 'sensei' },
      { word: 'かいしゃいん (Kaishain)', reading: 'kaishain', meaning: 'Company Employee (চাকরিজীবী)', audioText: 'kaishain' }
    ]
  },
  {
    id: 'les-jp-04',
    courseId: 'c-jp-n5',
    moduleName: 'Module 2: Grammar Lesson 1',
    title: 'Lesson 04: Interrogative Particle KA & Negative DEWA ARIMASEN',
    titleBn: 'পাঠ ০৪: প্রশ্নবোধক পার্টিকল KA এবং না-বোধক DEWA ARIMASEN',
    duration: '38 mins',
    videoUrl: 'https://www.youtube.com/embed/v9Ym_LhB5t4',
    isLocked: false,
    isCompleted: false,
    watchPercent: 0,
    pdfUrl: '#',
    notes: 'To make a question in Japanese, simply add KA at the end of the sentence without changing word order! Japanese does not traditionally use question marks.',
    vocabList: [
      { word: 'だれ (Dare) / どなた (Donata)', reading: 'dare / donata', meaning: 'Who (কে / কে তিনি সম্মানজনক)', audioText: 'dare' },
      { word: 'エンジニア (Enjinia)', reading: 'enjinia', meaning: 'Engineer (প্রকৌশলী)', audioText: 'enjinia' }
    ]
  },
  {
    id: 'les-jp-05',
    courseId: 'c-jp-n5',
    moduleName: 'Module 3: Demonstratives KO-SO-A-DO',
    title: 'Lesson 05: Demonstratives - Kore, Sore, Are, Dore & Location Particle NI',
    titleBn: 'পাঠ ০৫: কোরে, সোরে, আরে, দোরে (বস্তু ও স্থানের নির্দেশক)',
    duration: '40 mins',
    videoUrl: 'https://www.youtube.com/embed/6p9Il_j0zjc',
    isLocked: true, // Drip content prerequisite
    isCompleted: false,
    watchPercent: 0,
    pdfUrl: '#',
    notes: 'Kore = Close to speaker. Sore = Close to listener. Are = Far from both. Dore = Which one?',
    vocabList: []
  }
];

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    question: 'What is the correct pronunciation of the Japanese topic marker particle "は"?',
    questionBn: 'জাপানি বাক্যে টপিক মার্কার পার্টিকল হিসেবে "は" হরফের সঠিক উচ্চারণ কোনটি?',
    type: 'mcq',
    options: ['Ha', 'Wa', 'Ka', 'Ya'],
    correctIndex: 1,
    explanation: 'When "は" is used as a grammar topic particle, it is always pronounced "Wa", even though as a single letter it is written "ha".',
    marks: 5
  },
  {
    id: 'q-2',
    question: 'How do you say "I am a student" in Japanese polite form?',
    questionBn: '"আমি একজন ছাত্র" - এর সঠিক জাপানি রূপ কোনটি?',
    type: 'mcq',
    options: [
      'わたし は せんせい です (Watashi wa sensei desu)',
      'わたし は がくせい です (Watashi wa gakusei desu)',
      'あなた は がくせい です (Anata wa gakusei desu)',
      'わたし は かいしゃいん じゃありません (Watashi wa kaishain jaarimasen)'
    ],
    correctIndex: 1,
    explanation: '"Gakusei" means student. "Watashi wa gakusei desu" = I am a student.',
    marks: 5
  },
  {
    id: 'q-3',
    question: 'Audio Listening Test: What greeting did the speaker say in Japanese?',
    questionBn: 'লিসেনিং টেস্ট: অডিও ক্লিপে স্পিকার কোন অভিবাদনটি উচ্চারণ করেছেন?',
    type: 'listening',
    audioPrompt: 'Konnichiwa',
    options: ['Ohayou gozaimasu (Good morning)', 'Konnichiwa (Good afternoon/Hello)', 'Konbanwa (Good evening)', 'Sayounara (Goodbye)'],
    correctIndex: 1,
    explanation: 'The audio speaker clearly pronounced "Konnichiwa", which is the polite daytime greeting.',
    marks: 5
  },
  {
    id: 'q-4',
    question: 'In Japanese grammar, which particle indicates destination or direction of movement (e.g. "Toukyou ___ ikimasu")?',
    questionBn: 'জাপানি ব্যাকরণে গন্তব্য বা দিক নির্দেশ করার জন্য কোন পার্টিকল ব্যবহৃত হয় (যেমন "টোকিও ___ যাব")?',
    type: 'mcq',
    options: ['ni (に) / e (へ)', 'wo (を)', 'de (で)', 'ga (が)'],
    correctIndex: 0,
    explanation: 'The particles "ni (に)" and "e (へ)" are used after a place name to indicate the destination or direction of movement verbs like ikimasu (go), kimasu (come), and kaerimasu (return).',
    marks: 5
  },
  {
    id: 'q-5',
    question: 'True or False: In Japanese, verbs always come at the END of the sentence (SOV word order).',
    questionBn: 'সত্য নাকি মিথ্যা: জাপানি ব্যাকরণে ক্রিয়াপদ (Verb) সর্বদা বাক্যের একদম শেষে বসে?',
    type: 'true_false',
    options: ['True (সত্য)', 'False (মিথ্যা)'],
    correctIndex: 0,
    explanation: 'True! Japanese is an SOV (Subject - Object - Verb) language. The verb always anchors the sentence end.',
    marks: 5
  }
];

export const INITIAL_GRADEBOOK: GradebookEntry[] = [
  {
    id: 'gb-01',
    studentId: 'DILS-2026-0048',
    studentName: 'MD. ABDUR RAZZAK',
    courseName: 'Japanese JLPT N4 Work Track',
    courseCode: 'DILS-JPN-02',
    batch: 'Morning Cohort N4-A',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    assignmentsScore: 92, // 20% weight = 18.4
    quizzesScore: 88,     // 20% weight = 17.6
    attendanceRate: 96,   // 10% weight = 9.6
    midtermScore: 90,     // 20% weight = 18.0
    finalExamScore: 94,   // 30% weight = 28.2
    // Sum = 91.8 -> GPA 4.0 / A+
    weightedTotal: 91.8,
    gpa: 4.0,
    letterGrade: 'A+',
    status: 'Honors'
  },
  {
    id: 'gb-02',
    studentId: 'DILS-2026-0104',
    studentName: 'Tanvir Kabir Biplob',
    courseName: 'Japanese JLPT N5 Complete Mastery',
    courseCode: 'DILS-JPN-01',
    batch: 'Morning Batch N5-A',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    assignmentsScore: 85,
    quizzesScore: 80,
    attendanceRate: 90,
    midtermScore: 82,
    finalExamScore: 86,
    weightedTotal: 84.2,
    gpa: 3.75,
    letterGrade: 'A',
    status: 'Pass'
  },
  {
    id: 'gb-03',
    studentId: 'DILS-2026-0112',
    studentName: 'Nusrat Jahan Mim',
    courseName: 'Japanese JLPT N3 Advanced Career Track',
    courseCode: 'DILS-JPN-03',
    batch: 'N3 Executive Evening',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    assignmentsScore: 78,
    quizzesScore: 74,
    attendanceRate: 85,
    midtermScore: 80,
    finalExamScore: 79,
    weightedTotal: 78.6,
    gpa: 3.25,
    letterGrade: 'B+',
    status: 'Pass'
  },
  {
    id: 'gb-04',
    studentId: 'DILS-2026-0118',
    studentName: 'Shahriar Ahmed Rifat',
    courseName: 'Spoken Japanese & Japan Embassy Interview',
    courseCode: 'DILS-JPN-04',
    batch: 'Weekend Spoken Immersion',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    assignmentsScore: 95,
    quizzesScore: 92,
    attendanceRate: 100,
    midtermScore: 94,
    finalExamScore: 96,
    weightedTotal: 94.8,
    gpa: 4.0,
    letterGrade: 'A+',
    status: 'Honors'
  },
  {
    id: 'gb-05',
    studentId: 'DILS-2026-0125',
    studentName: 'Mehedi Hasan Alvi',
    courseName: 'Japanese JLPT N5 Complete Mastery',
    courseCode: 'DILS-JPN-01',
    batch: 'Evening Batch N5-B',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    assignmentsScore: 60,
    quizzesScore: 55,
    attendanceRate: 70,
    midtermScore: 58,
    finalExamScore: 62,
    weightedTotal: 60.2,
    gpa: 2.5,
    letterGrade: 'C',
    status: 'Pass'
  }
];

export const INITIAL_CERTIFICATES: CertificateRecord[] = [
  {
    id: 'cert-01',
    certificateId: 'DILS-CERT-2026-0048',
    studentName: 'Md. Kamrul Hasan',
    studentId: 'DILS-2026-0048',
    courseName: 'Japanese Language Proficiency (JLPT N4 & SSW Work Track)',
    level: 'CEFR A2 / JLPT N4 Equivalent',
    grade: 'A+ (Honors with Distinction)',
    gpa: 4.0,
    issueDate: '19 September 2026',
    expiryDate: 'Lifetime Verified',
    instructorName: 'Tanvir Kabir Biplob',
    directorName: 'MD. ABDUR RAZZAK',
    verificationUrl: 'https://dilsbd.com/verify?cert=DILS-CERT-2026-0048',
    studentPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    status: 'Active & Verified',
    qrData: 'DILS-VERIFIED:ID=DILS-CERT-2026-0048;NAME=Md. Kamrul Hasan;COURSE=JLPT N4;DIRECTOR=MD. ABDUR RAZZAK (N1);INSTRUCTOR=Tanvir Kabir Biplob (N2);DATE=2026-09-19;CAMPUS=DHAKA-FARMGATE;URL=https://dilsbd.com'
  },
  {
    id: 'cert-02',
    certificateId: 'DILS-CERT-2026-0104',
    studentName: 'Sohanur Rahman Shawon',
    studentId: 'DILS-2026-0104',
    courseName: 'Japanese JLPT N5 Complete Mastery & NAT-TEST',
    level: 'CEFR A1 / JLPT N5',
    grade: 'A (Excellent)',
    gpa: 3.75,
    issueDate: '15 August 2026',
    expiryDate: 'Lifetime Verified',
    instructorName: 'Tanvir Kabir Biplob',
    directorName: 'MD. ABDUR RAZZAK',
    verificationUrl: 'https://dilsbd.com/verify?cert=DILS-CERT-2026-0104',
    studentPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    status: 'Active & Verified',
    qrData: 'DILS-VERIFIED:ID=DILS-CERT-2026-0104;NAME=Sohanur Rahman Shawon;COURSE=JLPT N5;DIRECTOR=MD. ABDUR RAZZAK (N1);INSTRUCTOR=Tanvir Kabir Biplob (N2);DATE=2026-08-15;CAMPUS=DHAKA-FARMGATE;URL=https://dilsbd.com'
  },
  {
    id: 'cert-03',
    certificateId: 'DILS-CERT-2026-0118',
    studentName: 'Shahriar Ahmed Rifat',
    studentId: 'DILS-2026-0118',
    courseName: 'Japanese Language 150-Hour Accredited Certificate (JLPT N3)',
    level: 'CEFR B1 / JLPT N3 Equivalent',
    grade: 'A+ (High Distinction)',
    gpa: 4.0,
    issueDate: '10 September 2026',
    expiryDate: 'Lifetime Verified',
    instructorName: 'MD. ABDUR RAZZAK (JLPT N1)',
    directorName: 'MD. ABDUR RAZZAK',
    verificationUrl: 'https://dilsbd.com/verify?cert=DILS-CERT-2026-0118',
    studentPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    status: 'Active & Verified',
    qrData: 'DILS-VERIFIED:ID=DILS-CERT-2026-0118;NAME=Shahriar Ahmed Rifat;COURSE=JLPT N3;GRADE=A+;DATE=2026-09-10;CAMPUS=DHAKA-FARMGATE;URL=https://dilsbd.com'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-01',
    name: 'Kazi Farhan Sadik',
    phone: '+880 1819-456782',
    email: 'farhan.sadik@gmail.com',
    courseInterest: 'Japanese JLPT N5 (Student Visa)',
    city: 'Tokyo / Osaka',
    education: 'HSC Passed (2024)',
    targetIntake: 'April 2027 Intake',
    stage: 'new',
    assignedCounselor: 'Tanvir Kabir Biplob',
    createdAt: 'Today, 10:30 AM',
    nextFollowUp: 'Tomorrow, 11:00 AM',
    notes: ['Inquired via website Facebook ad. Interested in Farmgate campus morning batch. Budget 15k BDT.']
  },
  {
    id: 'lead-02',
    name: 'Shamima Akter Ritu',
    phone: '+880 1711-239845',
    email: 'shamima.ritu@yahoo.com',
    courseInterest: 'Japanese JLPT N5 & Embassy Interview',
    city: 'Tokyo / Kyoto',
    education: 'BBA Completed (DU)',
    targetIntake: 'October 2026 Intake',
    stage: 'counseling',
    assignedCounselor: 'MD. Abdur Razzak',
    createdAt: 'Yesterday, 04:15 PM',
    nextFollowUp: '22-Sep-2026',
    notes: ['Called student on phone. Husband is working in Tokyo as IT specialist. Needs fast track N5 certificate for dependent / student status within 2 months. Scheduled campus visit this Thursday.']
  },
  {
    id: 'lead-03',
    name: 'Mahbubur Rahman',
    phone: '+880 1972-671234',
    email: 'mahbub.ctg@gmail.com',
    courseInterest: 'Japanese JLPT N4 (SSW Work Visa)',
    city: 'Nagoya / Fukuoka',
    education: 'Diploma in Electrical Engineering',
    targetIntake: 'October 2026',
    stage: 'enrolled',
    assignedCounselor: 'MD. Abdur Razzak',
    createdAt: '18-Sep-2026',
    nextFollowUp: 'Enrolled - Student ID Generated',
    notes: ['Admitted in N4 Weekend batch. Paid 1st installment 10,000 BDT via bKash. Student ID DILS-2026-0130 allocated.']
  },
  {
    id: 'lead-04',
    name: 'Tasnim Ahmed',
    phone: '+880 1622-998877',
    courseInterest: 'Japanese JLPT N3 Advanced Career Track',
    city: 'Tokyo / Yokohama',
    education: 'BSc in CSE',
    targetIntake: 'April 2027 Intake',
    stage: 'counseling',
    assignedCounselor: 'MD. Abdur Razzak',
    createdAt: '17-Sep-2026',
    nextFollowUp: '21-Sep-2026',
    notes: ['Targeting JLPT N3 for Tokyo software engineering jobs. Demo class attended on Saturday. Positive feedback. Will confirm payment by Monday.']
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-01',
    invoiceNo: 'DILS-INV-2026-0891',
    studentName: 'MD. ABDUR RAZZAK',
    studentId: 'DILS-2026-0048',
    courseName: 'Japanese JLPT N4 Work Track',
    totalAmount: 17000,
    paidAmount: 17000,
    dueAmount: 0,
    status: 'paid',
    dueDate: '15-Sep-2026',
    installments: [
      { title: '1st Installment (At Admission)', amount: 10000, paid: true, paidDate: '01-Aug-2026', method: 'bKash Merchant' },
      { title: '2nd Installment (Final)', amount: 7000, paid: true, paidDate: '15-Sep-2026', method: 'Nagad' }
    ]
  },
  {
    id: 'inv-02',
    invoiceNo: 'DILS-INV-2026-0892',
    studentName: 'Tanvir Kabir Biplob',
    studentId: 'DILS-2026-0104',
    courseName: 'Japanese JLPT N5 Complete Mastery',
    totalAmount: 13000,
    paidAmount: 8000,
    dueAmount: 5000,
    status: 'partial',
    dueDate: '25-Sep-2026',
    installments: [
      { title: '1st Installment (Admission)', amount: 8000, paid: true, paidDate: '05-Sep-2026', method: 'bKash' },
      { title: '2nd Installment (Midterm Due)', amount: 5000, paid: false }
    ]
  },
  {
    id: 'inv-03',
    invoiceNo: 'DILS-INV-2026-0893',
    studentName: 'Nusrat Jahan Mim',
    studentId: 'DILS-2026-0112',
    courseName: 'German Goethe A1 Fast Track',
    totalAmount: 15000,
    paidAmount: 15000,
    dueAmount: 0,
    status: 'paid',
    dueDate: '10-Sep-2026',
    installments: [
      { title: 'Full Course Fee (Upfront Offer)', amount: 15000, paid: true, paidDate: '10-Sep-2026', method: 'City Bank Card' }
    ]
  }
];

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 'tr-01',
    name: 'MD. ABDUR RAZZAK',
    title: 'Director, DILS (JLPT-N1 Certified)',
    specialty: 'JLPT N1 Certified, 100% COE File Processing, Student & SSW Work Visa, Embassy Interview Master',
    experience: '12+ Years in Japan Immigration & Language Pedagogy',
    languages: ['Japanese (JLPT N1)', 'Bangla (Native)', 'English'],
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    bio: 'DILS-এর প্রতিষ্ঠাতা পরিচালক ও সিনিয়র জাপানি ভাষা মেন্টর (JLPT-N1)। ১,৫০০+ ছাত্রছাত্রীকে জাপানের শীর্ষস্থানীয় ল্যাঙ্গুয়েজ স্কুল ও ভোকেশনাল কলেজে ১০০% সফলতার সাথে ভিসা ও সিওই (COE) প্রক্রিয়াকরণ সম্পন্ন করেছেন।',
    credentials: ['JLPT N1 Certified (Highest Level)', 'Director, DILS Dhaka', '12+ Years Visa Filing Specialist', 'Japan Immigration Documentation Expert'],
    phone: '01764-395945',
    whatsapp: '+880 1300-634046',
    email: 'care.dils2014@gmail.com',
    jlptLevel: 'JLPT N1'
  },
  {
    id: 'tr-02',
    name: 'Tanvir Kabir Biplob',
    title: 'Japanese Language Instructor (JLPT-N2 Certified)',
    specialty: 'JLPT N2 Certified, Minna no Nihongo (Lessons 1-50), Kanji Memory Techniques, NAT-TEST 5Q/4Q Drills',
    experience: '8+ Years in Japanese Teaching & Exam Preparation',
    languages: ['Japanese (JLPT N2)', 'Bangla (Native)', 'English'],
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    bio: 'DILS-এর সিনিয়র জাপানি ভাষা শিক্ষক (JLPT-N2)। মিন্না নো নিহোঙ্গো ১ ও ২ এর ব্যাকরণ, কাঞ্জি মুখস্থের সহজ কৌশল এবং লিসেনিং পরীক্ষায় পূর্ণাঙ্গ নম্বর নিশ্চিত করার বিশেষ টেকনিকের জন্য শিক্ষার্থীদের কাছে অত্যন্ত জনপ্রিয়।',
    credentials: ['JLPT N2 Certified', 'Senior Japanese Language Instructor', 'WhatsApp: 017555-34997', 'NAT-TEST Model Exam Evaluator'],
    phone: '017555-34997',
    whatsapp: '017555-34997',
    email: 'care.dils2014@gmail.com',
    jlptLevel: 'JLPT N2'
  },
  {
    id: 'tr-03',
    name: 'Sensei Kenji Takahashi',
    title: 'Native Japanese Cultural & Pronunciation Advisor',
    specialty: 'Native Pronunciation, Chokai Listening Immersion, Business Bowing (Ojigi) & Keigo',
    experience: '10+ Years in Cross-Cultural Japanese Pedagogy',
    languages: ['Japanese (Native)', 'English', 'Bangla (Conversational)'],
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    bio: 'Native Japanese mentor advising DILS students on natural conversational pacing, workplace etiquette, Tokyo life transition, and embassy interview confidence.',
    credentials: ['Native Japanese Speaker', 'Tokyo University of Foreign Studies Alumni', 'Cross-Cultural Education Specialist'],
    phone: '01764-395945',
    whatsapp: '+880 1300-634046',
    email: 'care.dils2014@gmail.com',
    jlptLevel: 'Native Speaker'
  },
  {
    id: 'tr-04',
    name: 'Sultana Razia',
    title: 'Senior Japanese Coach & SSW Technical Specialist',
    specialty: 'JLPT N2 Certified, SSW Tokutei Ginou Nursing Care (Kaigo) & JFT-Basic Training',
    experience: '7+ Years training Japanese language & SSW aspirants',
    languages: ['Japanese (JLPT N2)', 'Bangla (Native)', 'English'],
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    bio: 'Specialist in rapid JLPT N4/N3 mastery, Prometric CBT computerized testing drills, and healthcare/food service SSW employment contracts in Japan.',
    credentials: ['JLPT N2 Certified', 'Prometric CBT Trainer', 'Specified Skilled Worker (SSW) Certified Mentor'],
    phone: '01764-395945',
    whatsapp: '+880 1300-634046',
    email: 'care.dils2014@gmail.com',
    jlptLevel: 'JLPT N2'
  }
];

export const VISA_SUCCESS_STORIES: VisaSuccessStory[] = [
  {
    id: 'vs-01',
    studentName: 'Md. Tanvir Hasan',
    studentPhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    visaType: 'Student Visa',
    intake: 'April Intake',
    destinationCity: 'Tokyo, Japan',
    institutionInJapan: 'Tokyo Riverside Japanese Language Academy',
    courseCompletedAtDils: 'Japanese JLPT N5 & NAT-TEST 5Q (DILS-JPN-01)',
    coeNumber: 'COE-TYO-2026-88194',
    testimonial: 'DILS is the best Japanese language school in Dhaka! Under Tanvir Kabir Biplob Sir, I passed NAT 5Q on my first attempt, and Abdur Razzak Sir processed my COE file smoothly without any hassle.',
    testimonialBn: 'আলহামদুলিল্লাহ! তানভির কবির বিপ্লব স্যারের ক্লাসে প্রথম চান্সেই ন্যাট পরীক্ষায় পাস করেছি, আর রাজ্জাক স্যারের পারফেক্ট ফাইল প্রসেসিংয়ে কোনো ঝামেলা ছাড়াই টোকিও রিভারসাইড একাডেমির সিওই ও ভিসা পেয়েছি।',
    mentorFeedback: 'Outstanding dedication in Kana and Dokkai. Approved by Tokyo Regional Immigration Bureau.',
    passingScore: 'NAT-TEST 5Q: 148 / 180 (Pass)',
    departureYear: 'April 2026',
    visaProofBadge: 'COE Approved & Visa Stamped'
  },
  {
    id: 'vs-02',
    studentName: 'Sohanur Rahman Shawon',
    studentPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    visaType: 'Student Visa',
    intake: 'October Intake',
    destinationCity: 'Nagoya, Japan',
    institutionInJapan: 'Nagoya International School of Business & Languages',
    courseCompletedAtDils: 'Japanese JLPT N4 Work & Student Track (DILS-JPN-02)',
    coeNumber: 'COE-NGO-2026-44210',
    testimonial: 'I was very nervous about the Japanese embassy interview. Razzak Sir personally took 3 mock interviews which made me fully confident. Now I am happily preparing for Nagoya!',
    testimonialBn: 'জাপান এম্বাসির ইন্টারভিউ নিয়ে অনেক দুশ্চিন্তা ছিল। রাজ্জাক স্যার নিজ দায়িত্বে আমাকে ৩টি মক ইন্টারভিউ নিয়ে তৈরি করে দেন। ফার্মগেট ক্যাম্পাসে এসে ভর্তি হওয়া আমার জীবনের সেরা সিদ্ধান্ত ছিল!',
    mentorFeedback: 'Achieved high marks in JLPT N4 grammar and conversational Keigo.',
    passingScore: 'JLPT N4: 132 / 180 (Pass)',
    departureYear: 'October 2026',
    visaProofBadge: 'Visa Stamped in Passport'
  },
  {
    id: 'vs-03',
    studentName: 'Nusrat Jahan Mim',
    studentPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
    visaType: 'Student Visa',
    intake: 'July Intake',
    destinationCity: 'Osaka, Japan',
    institutionInJapan: 'Osaka YMCA International College',
    courseCompletedAtDils: 'Japanese JLPT N5 Complete Mastery (DILS-JPN-01)',
    coeNumber: 'COE-OSK-2026-61928',
    testimonial: 'Tanvir Sir teaches Minna no Nihongo with such clear examples and audio drills that Japanese grammar felt surprisingly easy. DILS documentation team is 100% genuine.',
    testimonialBn: 'তানভির স্যারের মিন্না নো নিহোঙ্গো পড়ানোর টেকনিক অসাধারণ! কাঞ্জি মুখস্থ করার সহজ শর্টকাট মেথড আমাকে অনেক সাহায্য করেছে। মেয়েদের জন্য DILS এর ফার্মগেট ক্যাম্পাস খুবই নিরাপদ ও প্রফেশনাল।',
    mentorFeedback: 'Fast learner with exceptional pronunciation in Hiragana and Katakana.',
    passingScore: 'NAT-TEST 5Q: 156 / 180 (Honors)',
    departureYear: 'July 2026',
    visaProofBadge: 'COE Verified & Approved'
  },
  {
    id: 'vs-04',
    studentName: 'Md. Ashraful Islam',
    studentPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    visaType: 'SSW Tokutei Ginou',
    intake: 'Direct Work Track',
    destinationCity: 'Fukuoka, Japan',
    institutionInJapan: 'Kyushu Food Service & Hospitality Co., Ltd.',
    courseCompletedAtDils: 'Japanese JLPT N4 & SSW Skills Prep',
    coeNumber: 'COE-FUK-2026-90412',
    testimonial: 'Completed JLPT N4 and SSW Food Service skill test with DILS guidance. Abdur Razzak Sir connected directly with Japanese employer interviews. Highly recommended for work visas!',
    testimonialBn: 'এসএসডব্লিউ (SSW) জব ভিসায় জাপানে যাওয়ার স্বপ্ন পূরণ হয়েছে DILS এর মাধ্যমে। রাজ্জাক স্যারের সার্বিক তত্ত্বাবধানে জাপানিজ কোম্পানির অনলাইন ইন্টারভিউ ফেস করে সরাসরি জব অফার লেটার ও সিওই পেয়েছি।',
    mentorFeedback: 'Selected directly in Food Service industry with 5-year work contract.',
    passingScore: 'JLPT N4 + SSW Food Service Certified',
    departureYear: 'Immediate Flight 2026',
    visaProofBadge: 'Work Visa Grant 5 Years'
  },
  {
    id: 'vs-05',
    studentName: 'Shahriar Ahmed Rifat',
    studentPhoto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    visaType: 'Student Visa',
    intake: 'April Intake',
    destinationCity: 'Yokohama, Japan',
    institutionInJapan: 'Yokohama Design College (YDC)',
    courseCompletedAtDils: 'Japanese JLPT N5 (DILS-JPN-01)',
    coeNumber: 'COE-YKH-2026-31980',
    testimonial: 'I got admitted to Yokohama Design College for multimedia design. DILS verified certificate and Razzak Sir’s legal guidance ensured zero error in my financial sponsor papers.',
    testimonialBn: 'স্পনসর পেপারস ও ব্যাংকিং ডক্যুমেন্টেশনে রাজ্জাক স্যারের মতো দক্ষ মানুষ পুরো ঢাকায় খুব কমই আছেন। নিখুঁতভাবে ফাইল সাজিয়ে দেয়ার জন্য কোনো রিজেকশন ছাড়াই সিওই চলে এসেছে।',
    mentorFeedback: 'HSC passed student aiming for higher degree in Japan animation and graphic design.',
    passingScore: 'NAT-TEST 5Q Passed',
    departureYear: 'April 2026',
    visaProofBadge: 'COE Issued'
  },
  {
    id: 'vs-06',
    studentName: 'Mahir Faisal',
    studentPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    visaType: 'Student Visa',
    intake: 'October Intake',
    destinationCity: 'Kyoto, Japan',
    institutionInJapan: 'Kyoto International Academy',
    courseCompletedAtDils: 'Japanese JLPT N5 & N4 Combined',
    coeNumber: 'COE-KYO-2026-72810',
    testimonial: 'Both Razzak Sir (N1) and Tanvir Sir (N2) gave personal attention to every single student. Their Farmgate lab and live classes made learning Japanese fun and effective.',
    testimonialBn: 'রাজ্জাক স্যার (N1) এবং তানভির স্যার (N2) দুজনেই প্রতিটা ছাত্রের উপর আলাদা নজর দেন। DILS-এর ল্যাব সুবিধা ও ক্লাসরুমের পরিবেশ সত্যিই দারুণ। জাপানের স্বপ্ন পূরণে DILS অতুলনীয়।',
    mentorFeedback: 'Enrolled in university preparatory course in Kyoto.',
    passingScore: 'JLPT N5: 140 / 180 (Pass)',
    departureYear: 'October 2026',
    visaProofBadge: 'Visa Sticker in Passport'
  }
];

export const PARTNER_INSTITUTES: PartnerInstitute[] = [
  {
    id: 'pi-01',
    name: 'Tokyo Riverside Japanese Language Academy',
    city: 'Tokyo',
    category: 'Category A Approved Institute',
    logo: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=200&auto=format&fit=crop&q=80',
    features: ['100% COE Approval Record', 'Airport Pickup & Free Dormitory Assistance', 'Part-time Job Support (Baito) within 15 Days']
  },
  {
    id: 'pi-02',
    name: 'Nagoya International School of Business',
    city: 'Nagoya, Aichi',
    category: 'High Visa Passing Rate',
    logo: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&auto=format&fit=crop&q=80',
    features: ['Vocational College Pathway', 'Manufacturing & IT Hub of Japan', 'Affordable Living Costs & High Wages']
  },
  {
    id: 'pi-03',
    name: 'Osaka YMCA International Language College',
    city: 'Osaka',
    category: 'Accredited Japanese Foundation',
    logo: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=200&auto=format&fit=crop&q=80',
    features: ['Cultural Immersion in Kansai', 'University Entrance Examination (EJU) Training', 'Friendly International Community']
  },
  {
    id: 'pi-04',
    name: 'Fukuoka Foreign Language College',
    city: 'Fukuoka, Kyushu',
    category: 'Immigration Bureau High Evaluation',
    logo: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?w=200&auto=format&fit=crop&q=80',
    features: ['Warm Climate & Low Tuition Fees', 'Active Part-time Job Placement Network', 'Direct Transition to Kyushu Universities']
  }
];

export const NOTICES = [
  {
    id: 'n-01',
    date: '19-Sep-2026',
    title: 'Admission Open for October 2026 Batches (Special ৳৫,০০০ Discount)',
    titleBn: 'অক্টোবর ২০২৬ নতুন ব্যাচে ভর্তি চলছে (সীমিত সময়ের জন্য ৫,০০০ টাকা বিশেষ ছাড়)',
    tag: 'Admission',
    isNew: true
  },
  {
    id: 'n-02',
    date: '15-Sep-2026',
    title: 'NAT-TEST October 2026 Admit Cards are Available at Farmgate Campus',
    titleBn: 'ন্যাট-টেস্ট (NAT-TEST) অক্টোবর পরীক্ষার এডমিট কার্ড ফার্মগেট অফিস থেকে সংগ্রহ করুন',
    tag: 'Exam',
    isNew: false
  },
  {
    id: 'n-03',
    date: '10-Sep-2026',
    title: 'Japan Embassy Student Visa COE Processing Guidelines 2027 Released',
    titleBn: 'জাপান এম্বাসি স্টুডেন্ট ভিসা সিওই (COE) প্রসেসিং নতুন নির্দেশিকা প্রকাশ',
    tag: 'Visa Notice',
    isNew: false
  }
];

export const STUDENT_JOURNEY_STAGES: StudentJourneyStage[] = [
  {
    id: 'stage-01',
    stepNumber: 1,
    title: 'Profile Assessment, Intake Selection & Admission',
    titleBn: 'প্রোফাইল যাচাই, ইনটেক নির্বাচন ও ভর্তি',
    category: 'onboarding',
    status: 'completed',
    progressPercent: 100,
    mentor: 'ফার্মগেট কাউন্সেলিং ডেস্ক & অ্যাডমিশন টিম',
    mentorRole: 'Senior Student Counselor',
    estimatedDuration: 'Day 1 - Day 3',
    keyDeliverable: 'স্টুডেন্ট আইডি: DILS-2026-0048 ও অফিসিয়াল এনরোলমেন্ট',
    description: 'Student profile evaluation, study gap analysis, financial sponsor viability check, and intake mapping (April/October/July/January). Official enrollment completed.',
    descriptionBn: 'শিক্ষাগত যোগ্যতা, স্টাডি গ্যাপ ও স্পনসরের সক্ষমতা যাচাই করে উপযুক্ত ইনটেক নির্ধারণ ও জাপানি ভাষা এন৫ কোর্সে ভর্তি নিশ্চিত করা হয়েছে। ডিজিটাল স্টুডেন্ট পোর্টাল ও আইডি কার্ড প্রস্তুত।',
    studentActionRequired: '1st Installment completed. Access to portal activated.',
    studentActionRequiredBn: 'ভর্তি নিশ্চিত হয়েছে এবং ১ম কিস্তি পরিশোধ সম্পন্ন। ডিজিটাল লার্নিং পোর্টালে এক্সেস সক্রিয়।',
    actionButtonText: 'ভর্তি ও আইডি বিবরণ দেখুন',
    actionType: 'counseling'
  },
  {
    id: 'stage-02',
    stepNumber: 2,
    title: 'Japanese N5/N4 Mastery & Interactive Lab Drills',
    titleBn: 'জাপানি ভাষা এন৫/এন৪ কোর্স ও প্র্যাকটিস ল্যাব',
    category: 'language',
    status: 'current',
    progressPercent: 72,
    mentor: 'তানভির কবির বিপ্লব (JLPT N2)',
    mentorRole: 'Head of Japanese Language Training',
    estimatedDuration: 'Month 1 - Month 4',
    keyDeliverable: 'হিরাগানা, কাতাকানা, ১০০+ কাঞ্জি ও মিন্না নো নিহোঙ্গো ১-২৫ অধ্যায়',
    description: 'Interactive classroom & online live training, listening audio drills, kana canvas stroke practice, and daily speaking sessions with Sensei Tanvir Kabir Biplob.',
    descriptionBn: 'তানভির কবির বিপ্লব স্যারের সরাসরি দিকনির্দেশনায় হিরাগানা, কাতাকানা, কাঞ্জি লেখার স্ট্রোক অনুশীলন, মিন্না নো নিহোঙ্গো ব্যাকরণ এবং দৈনন্দিন কথোপকথনের নিবিড় প্রশিক্ষণ।',
    studentActionRequired: 'Complete Lesson 10 listening practice and Kana quiz before Friday.',
    studentActionRequiredBn: 'মিন্না নো নিহোঙ্গো ১০ম অধ্যায়ের ভিডিও ক্লাস ও লিসেনিং প্র্যাকটিস সম্পন্ন করুন।',
    actionButtonText: 'আজকের ক্লাসে প্রবেশ করুন',
    actionType: 'learning',
    whatsappNumber: '017555-34997'
  },
  {
    id: 'stage-03',
    stepNumber: 3,
    title: 'Mock Test Simulation & NAT-TEST / JLPT Exam Goal',
    titleBn: 'ন্যাট-টেস্ট / জেএলপিটি মক টেস্ট ও চূড়ান্ত পরীক্ষা',
    category: 'exam',
    status: 'upcoming',
    progressPercent: 25,
    mentor: 'তানভির কবির বিপ্লব (JLPT N2)',
    mentorRole: 'Exam Evaluation Head',
    estimatedDuration: 'Month 4 - Month 5',
    keyDeliverable: 'মক টেস্টে ১২০+/১৮০ নম্বর অর্জন ও অফিসিয়াল ন্যাট/জেএলপিটি পাসের সনদ',
    description: 'Full-length timed mock tests simulating real NAT-TEST / JLPT question papers with negative marking analysis and listening speed refinement.',
    descriptionBn: 'আসল পরীক্ষার আদলে পূর্ণাঙ্গ মক টেস্ট, স্পিড রিডিং এবং চোকাই (লিসেনিং) অংশে পূর্ণ নম্বর পাওয়ার বিশেষ কৌশল রপ্ত করা।',
    studentActionRequired: 'Book slot for upcoming Sunday NAT-TEST Mock Exam.',
    studentActionRequiredBn: 'আসন্ন রবিবারের মক টেস্টে অংশ নেওয়ার জন্য স্লট কনফার্ম করুন।',
    actionButtonText: 'মক টেস্ট শিডিউল দেখুন',
    actionType: 'exam',
    whatsappNumber: '017555-34997'
  },
  {
    id: 'stage-04',
    stepNumber: 4,
    title: '150-Hour Accredited Certificate & QR Verification',
    titleBn: '১৫০-ঘণ্টার অফিসিয়াল সার্টিফিকেট ও কিউআর ভেরিফিকেশন',
    category: 'certificate',
    status: 'upcoming',
    progressPercent: 0,
    mentor: 'ডিআইএলএস পরীক্ষা নিয়ন্ত্রক পরিষদ',
    mentorRole: 'Academic Registrar',
    estimatedDuration: 'Upon 80% Attendance & Exam Pass',
    keyDeliverable: 'ইমিগ্রেশন স্বীকৃত QR কোডযুক্ত ভেরিফায়েড সার্টিফিকেট (DILS-CERT-2026-0048)',
    description: 'Government registered language course completion certificate mandatory for Japan Immigration Bureau COE application.',
    descriptionBn: 'জাপান ইমিগ্রেশন ব্যুরোতে সিওই আবেদনের জন্য আবশ্যকীয় ১৫০ ঘণ্টার কোর্স সনদপত্র। যেকোনো দেশ থেকে কিউআর কোড স্ক্যান করে তাৎক্ষণিক অনলাইন ভেরিফিকেশন সম্ভব।',
    studentActionRequired: 'Ensure 80% attendance in class and minimum 60% average marks.',
    studentActionRequiredBn: '৮০% ক্লাসরুম ও পোর্টাল উপস্থিতি এবং ন্যূনতম ৬০% গ্রেড নিশ্চিত করুন।',
    actionButtonText: 'সার্টিফিকেট যাচাই নমুনা',
    actionType: 'certificate'
  },
  {
    id: 'stage-05',
    stepNumber: 5,
    title: 'Institute Selection & COE Legal File Processing',
    titleBn: 'জাপানের ইনস্টিটিউট নির্বাচন ও সিওই ফাইল প্রসেসিং',
    category: 'visa_processing',
    status: 'upcoming',
    progressPercent: 0,
    mentor: 'এমডি. আবদুর রাজ্জাক (JLPT N1)',
    mentorRole: 'Director, DILS & Japan Immigration Specialist',
    estimatedDuration: 'Month 5 - Month 7',
    keyDeliverable: 'টোকিও/নাগোয়া/ওসাকার ক্যাটাগরি-এ স্কুলে আবেদন ও সিওই জমা',
    description: 'Direct selection of accredited language academies, financial sponsor documentation auditing, tax verification, and Statement of Purpose (SOP) drafting under Director Razzak Sir.',
    descriptionBn: 'রাজ্জাক স্যারের সার্বিক তত্ত্বাবধানে ব্যাংক ব্যালেন্স ও স্টেটমেন্ট, ইনকাম ট্যাক্স পেপারস, স্পনসর রিলেশনশিপ সার্টিফিকেট ও স্টেটমেন্ট অব পারপাস নিখুঁতভাবে তৈরি করে জাপান ইমিগ্রেশনে সিওই ফাইল সাবমিশন।',
    studentActionRequired: 'Submit sponsor bank papers and educational original certificates for file audit.',
    studentActionRequiredBn: 'স্পনসরের ব্যাংকিং ও ইনকাম পেপারস ফার্মগেট অফিসে রাজ্জাক স্যারের কাছে জমা দিন।',
    actionButtonText: 'রাজ্জাক স্যারের সাথে ফাইল অ্যাপয়েন্টমেন্ট',
    actionType: 'counseling',
    whatsappNumber: '+880 1300-634046'
  },
  {
    id: 'stage-06',
    stepNumber: 6,
    title: 'COE Issuance, Embassy Mock Interview & Visa Stamp',
    titleBn: 'সিওই প্রাপ্তি, এম্বাসি মক ইন্টারভিউ ও ভিসা স্ট্যাম্পিং',
    category: 'embassy',
    status: 'upcoming',
    progressPercent: 0,
    mentor: 'এমডি. আবদুর রাজ্জাক (JLPT N1)',
    mentorRole: 'Embassy Interview Strategist',
    estimatedDuration: 'Month 8 - Month 9',
    keyDeliverable: 'জাপান ইমিগ্রেশন সিওই অনুমোদন ও পাসপোর্টে ভিসা স্টিকার',
    description: 'COE approval from Tokyo/Nagoya/Osaka immigration, tuition remittance to school bank account, 3x intensive Embassy mock interviews, and submission to Embassy of Japan Dhaka.',
    descriptionBn: 'সিওই অনুমোদনের পর জাপানের স্কুলের একাউন্টে ফি প্রেরণ, ৩টি ওয়ান-টু-ওয়ান এম্বাসি মক ইন্টারভিউ এবং ঢাকায় জাপান দূতাবাসে ফাইল সাবমিশন করে পাসপোর্টে ভিসা স্ট্যাম্প গ্রহণ।',
    studentActionRequired: 'Attend mandatory mock interview in Japanese etiquette at Farmgate campus.',
    studentActionRequiredBn: 'জাপানি আদব-কায়দা ও আত্মপরিচয়ের মক ইন্টারভিউ সেশনে উপস্থিত থাকুন।',
    actionButtonText: 'এম্বাসি ইন্টারভিউ প্রস্তুতি গাইড',
    actionType: 'whatsapp',
    whatsappNumber: '+880 1300-634046'
  },
  {
    id: 'stage-07',
    stepNumber: 7,
    title: 'Flight Departure, Dormitory & Part-Time Job (Baito)',
    titleBn: 'ফ্লাইট, ডরমিটরি আবাসন ও পার্ট-টাইম জব (বাইতো) সহায়তা',
    category: 'departure',
    status: 'upcoming',
    progressPercent: 0,
    mentor: 'ডিআইএলএস জাপান অ্যালামনাই ও সাপোর্ট নেটওয়ার্ক',
    mentorRole: 'Post-Arrival Coordinator in Tokyo & Osaka',
    estimatedDuration: 'Pre-flight & First 30 Days in Japan',
    keyDeliverable: 'এয়ারপোর্ট পিকআপ, নিরাপদ আবাসন ও সপ্তাহে ২৮ ঘণ্টার কাজের সংযোগ',
    description: 'Pre-departure briefing, packing checklist, airport reception in Japan, municipal city hall registration, bank account setup, and legal part-time job (Baito) assistance.',
    descriptionBn: 'বিমান টিকিট ও লাগেজ গাইডলাইন, জাপানের নারিতা/হানেদা বিমানবন্দরে রিসিভ, সিটি হলে রেসিডেন্স কার্ড রেজিস্ট্রেশন ও ব্যাংক একাউন্ট খোলা সহ পার্ট-টাইম চাকরির পূর্ণাঙ্গ সহায়তা।',
    studentActionRequired: 'Collect pre-departure kit and attend briefing at Farmgate campus.',
    studentActionRequiredBn: 'ফার্মগেট ক্যাম্পাস থেকে প্রি-ডিপারচার কিট ও নির্দেশিকা সংগ্রহ করুন।',
    actionButtonText: 'জাপান সেটেলমেন্ট হেল্পলাইন',
    actionType: 'whatsapp',
    whatsappNumber: '+880 1300-634046'
  }
];


