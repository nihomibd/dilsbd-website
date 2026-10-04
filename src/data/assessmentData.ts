import { AssessmentQuestion } from '../types';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q-script-1',
    category: 'script',
    question: "Which of the following represents 'Thank you' (Arigatou) in Japanese Hiragana?",
    questionBn: "নিচের কোন শব্দটি জাপানি হিরাগানায় 'ধন্যবাদ' (Arigatou - ありがとう) প্রকাশ করে?",
    japaneseText: 'ありがとう',
    audioPronunciationText: 'ありがとう',
    options: [
      { id: 'opt-a', text: 'ありがとう (Arigatou)', textBn: 'ধন্যবাদ (Thank you)', isCorrect: true },
      { id: 'opt-b', text: 'さようなら (Sayounara)', textBn: 'বিদায় (Goodbye)', isCorrect: false },
      { id: 'opt-c', text: 'おはよう (Ohayou)', textBn: 'শুভ সকাল (Good morning)', isCorrect: false },
      { id: 'opt-d', text: 'こんにちは (Konnichiwa)', textBn: 'শুভ অপরাহ্ন / হ্যালো', isCorrect: false }
    ],
    explanationBn: "'ありがとう' (Arigatou) হলো জাপানি ভাষায় সবচেয়ে প্রচলিত ধন্যবাদ জ্ঞাপনের শব্দ।"
  },
  {
    id: 'q-vocab-2',
    category: 'vocab',
    question: "In Japan, convenience stores like 7-Eleven or Lawson are affectionately called what in Japanese Katakana?",
    questionBn: "জাপানের দৈনন্দিন জীবনে সেভেন-ইলেভেন বা লসনের মতো কনভেনিয়েন্স স্টোরকে সংক্ষেপে কাতাকানায় কী বলা হয়?",
    japaneseText: 'コンビニ',
    audioPronunciationText: 'コンビニ',
    options: [
      { id: 'opt-a', text: 'コンビニ (Konbini)', textBn: 'কনবিনি (Convenience Store)', isCorrect: true },
      { id: 'opt-b', text: 'デパート (Depaato)', textBn: 'ডিপার্টমেন্টাল স্টোর', isCorrect: false },
      { id: 'opt-c', text: 'レストラン (Resutoran)', textBn: 'রেস্তোরাঁ (Restaurant)', isCorrect: false },
      { id: 'opt-d', text: 'ホテル (Hoteru)', textBn: 'হোটেল (Hotel)', isCorrect: false }
    ],
    explanationBn: "'コンビニ' (Konbini) জাপানের জীবনযাত্রার অন্যতম গুরুত্বপূর্ণ অংশ, যেখানে ২৪ ঘণ্টা সব প্রয়োজনীয় সামগ্রী মেলে।"
  },
  {
    id: 'q-conversation-3',
    category: 'conversation',
    question: "When greeting your Japanese teacher or boss in the morning, which respectful greeting should you use?",
    questionBn: "সকালে ক্লাসরুমে আপনার জাপানি শিক্ষক বা অফিসে সহকর্মীদের সাথে দেখা হলে সবচেয়ে প্রমিত সম্ভাষণ কোনটি?",
    japaneseText: 'おはようございます',
    audioPronunciationText: 'おはようございます',
    options: [
      { id: 'opt-a', text: 'おはようございます (Ohayou Gozaimasu)', textBn: 'শুভ সকাল (বিনম্র সম্ভাষণ)', isCorrect: true },
      { id: 'opt-b', text: 'おやすみなさい (Oyasuminasai)', textBn: 'শুভরাত্রি (ঘুমানোর পূর্বে)', isCorrect: false },
      { id: 'opt-c', text: 'こんばんは (Konbanwa)', textBn: 'শুভ সন্ধ্যা', isCorrect: false },
      { id: 'opt-d', text: 'いただきます (Itadakimasu)', textBn: 'খাবার গ্রহণের পূর্বে কৃতজ্ঞতা', isCorrect: false }
    ],
    explanationBn: "'おはようございます' হলো প্রমিত ও ভদ্রভাবে সকালের সম্ভাষণ জানানোর অফিশিয়াল জাপানি বাক্য।"
  },
  {
    id: 'q-reading-4',
    category: 'reading',
    question: "What is the meaning of the essential Japanese shopping question: 'これ は いくら です か？' (Kore wa ikura desu ka?)?",
    questionBn: "জাপানে কেনাকাটার সময় সবচেয়ে দরকারি প্রশ্ন: 'これ は いくら です か？' — এর বাংলা অর্থ কী?",
    japaneseText: 'これはいくらですか？',
    audioPronunciationText: 'これはいくらですか？',
    options: [
      { id: 'opt-a', text: 'How much is this? (এটির দাম কত?)', textBn: 'এটির দাম কত? (মূল্য জিজ্ঞাসা)', isCorrect: true },
      { id: 'opt-b', text: 'Where is the station? (স্টেশন কোথায়?)', textBn: 'স্টেশন কোথায়?', isCorrect: false },
      { id: 'opt-c', text: 'How are you? (আপনি কেমন আছেন?)', textBn: 'আপনি কেমন আছেন?', isCorrect: false },
      { id: 'opt-d', text: 'Please give me this (দয়া করে এটি দিন)', textBn: 'দয়া করে এটি দিন', isCorrect: false }
    ],
    explanationBn: "'いくら' (Ikura) মানে 'কত দাম' এবং 'これ' (Kore) মানে 'এটি'। জাপানে যেকোনো কিছু কেনার মূল চাবিকাঠি এই বাক্যটি।"
  },
  {
    id: 'q-kanji-5',
    category: 'kanji',
    question: "The Kanji characters '日本' (Sun + Origin) spell which country in Japanese?",
    questionBn: "জাপানি কাঞ্জি '日' (সূর্য) এবং '本' (মূল/উৎস) মিলে '日本' (Nihon / Nippon) কোন দেশটির নাম নির্দেশ করে?",
    japaneseText: '日本',
    audioPronunciationText: 'にほん',
    options: [
      { id: 'opt-a', text: 'Japan (সূর্যোদয়ের দেশ - জাপান)', textBn: 'জাপান (Land of the Rising Sun)', isCorrect: true },
      { id: 'opt-b', text: 'Tokyo (পূর্বের রাজধানী - টোকিও)', textBn: 'টোকিও শহর', isCorrect: false },
      { id: 'opt-c', text: 'Kyoto (ঐতিহাসিক শহর - কিয়োটো)', textBn: 'কিয়োটো শহর', isCorrect: false },
      { id: 'opt-d', text: 'Asia (এশিয়া মহাদেশ)', textBn: 'এশিয়া মহাদেশ', isCorrect: false }
    ],
    explanationBn: "'日本' (Nihon / Nippon) শব্দের আক্ষরিক অর্থ 'যেখান থেকে সূর্যের উৎপত্তি', যা বিশ্বজুড়ে জাপান হিসেবে খ্যাত।"
  },
  {
    id: 'q-goal-6',
    category: 'goal',
    question: "What is your primary goal or vision for your Japan journey?",
    questionBn: "জাপান নিয়ে আপনার প্রধান লক্ষ্য বা স্বপ্ন কোনটি?",
    japaneseText: 'あなたの夢は？',
    audioPronunciationText: 'あなたのゆめは？',
    options: [
      { id: 'goal-study', text: 'Study in Japan (Language School & University)', textBn: 'উচ্চশিক্ষা ও স্টুডেন্ট ভিসা (Higher Education & Language School)', tag: 'study' },
      { id: 'goal-ssw', text: 'Specified Skilled Worker (SSW Job Visa)', textBn: 'এসএসডব্লিউ জব ভিসা ও কর্মসংস্থান (Caregiver / Hospitality / Engineering)', tag: 'ssw' },
      { id: 'goal-it', text: 'Direct Corporate / IT Engineering Career', textBn: 'ডিরেক্ট আইটি ও সফটওয়্যার ক্যারিয়ার (Tech & Corporate Employment)', tag: 'it' },
      { id: 'goal-jlpt', text: 'JLPT Certification & Passion for Japanese', textBn: 'ভাষা শেখা ও আন্তর্জাতিক জেএলপিটি সনদ অর্জন (JLPT N5 to N2)', tag: 'jlpt' }
    ]
  }
];

export function calculateLevelAndRoadmap(
  score: number,
  targetGoal: string
): {
  levelTitle: string;
  levelBadge: string;
  startingLevel: string;
  recommendedCourseId: string;
  recommendedCourseTitle: string;
  summaryBn: string;
  roadmap: {
    step: number;
    title: string;
    titleBn: string;
    timeline: string;
    status: 'current' | 'next' | 'future';
  }[];
} {
  // Determine starting tier based on score (0-5)
  if (score <= 1) {
    return {
      levelTitle: 'Absolute Beginner 🌸',
      levelBadge: 'Level: Beginner (Zero Start)',
      startingLevel: 'Beginner 🇯🇵',
      recommendedCourseId: 'c-jp-n5',
      recommendedCourseTitle: 'JLPT N5 ও NAT-TEST 5Q কমপ্লিট কোর্স',
      summaryBn: 'আপনার জাপানি শেখার আগ্রহ অসাধারণ! একদম শুরু থেকে হিরাগানা, কাতাকানা ও মিন্না নো নিহোঙ্গো আয়ত্ত করে আপনি সহজেই প্রথম সুযোগেই NAT-TEST 5Q পাস করতে পারবেন।',
      roadmap: [
        {
          step: 1,
          title: 'Kana & Pronunciation Kickoff',
          titleBn: 'হিরাগানা ও কাতাকানা লিখন এবং শুদ্ধ উচ্চারণ আয়ত্ত করা',
          timeline: 'সপ্তাহ ১ - ৩',
          status: 'current'
        },
        {
          step: 2,
          title: 'Minna no Nihongo N5 Mastery',
          titleBn: 'মিন্না নো নিহোঙ্গো ২৫ অধ্যায় ও ১৫০টি প্রয়োজনীয় কাঞ্জি',
          timeline: 'মাস ২ - ৩.৫',
          status: 'next'
        },
        {
          step: 3,
          title: 'NAT-TEST 5Q / JLPT N5 Official Pass',
          titleBn: 'মডেল টেস্ট দিয়ে সরকারি টেস্টে প্রথম চান্সেই উত্তীর্ণ হওয়া',
          timeline: 'মাস ৩.৫ - ৪',
          status: 'future'
        },
        {
          step: 4,
          title: 'COE & University Documentation Audit',
          titleBn: 'জাপান ইমিগ্রেশনে ১০০% নিখুঁত পেপারওয়ার্ক ও সিওই (COE) অনুমোদন',
          timeline: 'মাস ৫ - ৬',
          status: 'future'
        },
        {
          step: 5,
          title: 'Embassy Stamping & Landing in Japan',
          titleBn: 'ঢাকায় জাপান দূতাবাসে ভিসা স্ট্যাম্পিং ও টোকিও যাত্রা',
          timeline: 'ইনটেক অনুযায়ী',
          status: 'future'
        }
      ]
    };
  } else if (score <= 3) {
    return {
      levelTitle: 'Hiragana Explorer 🎌',
      levelBadge: 'Level: Elementary (N5 In-Progress)',
      startingLevel: 'Elementary 🇯🇵',
      recommendedCourseId: 'c-jp-n5',
      recommendedCourseTitle: 'JLPT N5 ফাস্ট ট্র্যাক ও N4 ফাউন্ডেশন',
      summaryBn: 'চমৎকার! জাপানি বর্ণমালা ও কিছু মৌলিক শব্দের ব্যাপারে আপনার চমৎকার ধারণা আছে। সুশৃঙ্খল পাঠদান ও অডিও ল্যাবের সহায়তায় আপনি দ্রুততম সময়ে N5 শেষ করে N4 লেভেলে প্রবেশ করতে পারবেন।',
      roadmap: [
        {
          step: 1,
          title: 'Grammar Patterns & Audio Lab',
          titleBn: 'মৌলিক ব্যাকরণ প্যাটার্ন ও অডিও শ্যাডোয়িং অনুশীলন',
          timeline: 'সপ্তাহ ১ - ৪',
          status: 'current'
        },
        {
          step: 2,
          title: 'Kanji SRS Fast Sprint (200 Kanji)',
          titleBn: 'নিহোমি মেমোরি ইঞ্জিনে কাঞ্জি দ্রুত মুখস্থ করা',
          timeline: 'মাস ২ - ৩',
          status: 'next'
        },
        {
          step: 3,
          title: 'Target Intake Exam Clearance',
          titleBn: 'NAT 5Q/4Q পরীক্ষায় ৯০%+ নম্বর অর্জন',
          timeline: 'মাস ৩.৫',
          status: 'future'
        },
        {
          step: 4,
          title: 'COE Filing with Tokyo School Network',
          titleBn: 'টোকিও বা ওসাকার স্বনামধন্য ভাষা স্কুলে স্পন্সর ফাইল প্রসেসিং',
          timeline: 'মাস ৪ - ৬',
          status: 'future'
        },
        {
          step: 5,
          title: 'Pre-Departure Briefing & Japan Departure',
          titleBn: 'জাপানে থাকা ও পার্ট-টাইম জবের পূর্ণাঙ্গ ব্রিফিং এবং যাত্রা',
          timeline: 'ইনটেক অনুযায়ী',
          status: 'future'
        }
      ]
    };
  } else {
    // Score 4 or 5
    const isWorkTrack = targetGoal.includes('ssw') || targetGoal.includes('it') || targetGoal.includes('work');
    return {
      levelTitle: 'N5 Ready / Japan Career Track 🚀',
      levelBadge: 'Level: Intermediate Ready',
      startingLevel: 'N5 Ready 🇯🇵',
      recommendedCourseId: isWorkTrack ? 'c-jp-ssw' : 'c-jp-n4',
      recommendedCourseTitle: isWorkTrack ? 'SSW ওয়ার্ক ভিসা ও টেকনিক্যাল প্রিপারেশন' : 'JLPT N4 ইন্টারমিডিয়েট ও স্টুডেন্ট ভিসা ট্র্যাক',
      summaryBn: 'অসাধারণ পারফরম্যান্স! আপনার জাপানি ভাষা জ্ঞান প্রাথমিক পর্যায়ের চেয়েও অনেক এগিয়ে। আপনি সরাসরি ইন্টারমিডিয়েট N4 বা এসএসডব্লিউ টেকনিক্যাল ট্র্যাকে ভর্তি হয়ে দ্রুত জাপান যাওয়ার যোগ্যতা অর্জন করতে পারেন।',
      roadmap: [
        {
          step: 1,
          title: 'Intermediate N4 Grammar & Keigo',
          titleBn: 'N4 জটিল বাক্যগঠন ও কথোপকথন দক্ষতা বৃদ্ধি',
          timeline: 'মাস ১ - ২',
          status: 'current'
        },
        {
          step: 2,
          title: 'JFT-Basic / SSW Skills Preparation',
          titleBn: 'কেয়ারগিভার/ফুড সার্ভিস বা আইটি ইন্টারভিউ কোচিং',
          timeline: 'মাস ২ - ৩',
          status: 'next'
        },
        {
          step: 3,
          title: 'Official Exam & Certification',
          titleBn: 'JLPT N4 / JFT-Basic ও স্কিল মূল্যায়ন পরীক্ষায় উত্তীর্ণ',
          timeline: 'মাস ৩ - ৪',
          status: 'future'
        },
        {
          step: 4,
          title: 'Company Interview & Direct Job Matching',
          titleBn: 'জাপানি কোম্পানির সাথে সরাসরি ইন্টারভিউ ও অফার লেটার লাভ',
          timeline: 'মাস ৪ - ৫',
          status: 'future'
        },
        {
          step: 5,
          title: 'Working Visa Stamping & Flight to Japan',
          titleBn: 'জাপান সরকারের ওয়ার্কিং ভিসা স্ট্যাম্পিং ও ফ্লাইট',
          timeline: 'মাস ৬ এর মধ্যে',
          status: 'future'
        }
      ]
    };
  }
}
