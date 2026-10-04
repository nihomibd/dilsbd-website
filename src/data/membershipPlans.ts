import { MembershipPlan } from '../types';

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'free',
    name: 'Starter Free',
    nameBn: 'স্টার্টার ফ্রি',
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'Perfect for curious learners starting their Japan dream.',
    descriptionBn: 'জাপানি ভাষা ও বর্ণমালার সাথে প্রাথমিক পরিচিতির জন্য আদর্শ।',
    features: [
      'Access to Free Japan Level Assessment',
      'Kana Writing & Pronunciation Guide',
      'Basic 5-Minute Daily Missions',
      'Standard Student Dashboard'
    ],
    featuresBn: [
      'ফ্রি জাপান লেভেল টেস্ট ও রোডম্যাপ',
      'হিরাগানা ও কাতাকানা লিখন গাইড',
      'মৌলিক ৫-মিনিটের ডেইল মিশন',
      'স্ট্যান্ডার্ড শিক্ষার্থী ড্যাশবোর্ড'
    ]
  },
  {
    id: 'core',
    name: 'DILS Core',
    nameBn: 'ডিআইএলএস কোর',
    monthlyPrice: 1990,
    yearlyPrice: 19900, // ~17% discount, saves ৳3,980
    description: 'Complete academic foundation for JLPT N5 & N4 certification.',
    descriptionBn: 'JLPT N5 ও N4 পরীক্ষার শতভাগ সফলতার জন্য পূর্ণাঙ্গ ফাউন্ডেশন।',
    features: [
      'Everything in Starter Free',
      'Complete JLPT N5 & N4 Video Curriculum',
      'Unlimited 5-Minute Daily Mission System',
      'Interactive Grammar & Kanji SRS Engine',
      'Monthly NAT-TEST & JLPT Model Exams',
      'Direct Instructor Support & Telegram Community'
    ],
    featuresBn: [
      'স্টার্টার প্ল্যানের সকল সুবিধা',
      'JLPT N5 ও N4 এর সম্পূর্ণ ভিডিও কোর্স',
      'আনলিমিটেড ডেইলি মিশন ও স্ট্রিক সিস্টেম',
      'নিহোমি এসআরএস কাঞ্জি ও ভোকাবুলারি ইঞ্জিন',
      'মাসিক NAT-TEST ও JLPT মডেল পরীক্ষা',
      'শিক্ষকদের সরাসরি সাপোর্ট ও টেলিগ্রাম ফোরাম'
    ]
  },
  {
    id: 'pro',
    name: 'DILS Pro',
    nameBn: 'ডিআইএলএস প্রো (সেরা চয়েস)',
    monthlyPrice: 3490,
    yearlyPrice: 34900, // saves ৳6,980
    badge: 'MOST POPULAR 🌟',
    isPopular: true,
    description: 'Intensive immersion with native speaking club and AI tutor.',
    descriptionBn: 'অনর্গল জাপানি বলা, এআই প্র্যাকটিস ল্যাব ও মেন্টর ফিডব্যাকের সেরা প্ল্যান।',
    features: [
      'Everything in DILS Core',
      'Weekly Live Speaking Club with Native Teachers',
      'Nihomi AI Conversation & Shadowing Lab',
      'Personalized Mistake & Homework Review',
      'Official DILS Certificate with QR Verification',
      'Priority Visa & Embassy Paperwork Consultation'
    ],
    featuresBn: [
      'DILS Core এর সকল সুবিধা',
      'সাপ্তাহিক লাইভ স্পিকিং ক্লাব (নেটিভ শিক্ষকসহ)',
      'নিহোমি এআই কনভারসেশন ও শ্যাডোয়িং ল্যাব',
      'ব্যক্তিগত হোমওয়ার্ক ও ভুল বিশ্লেষণ',
      'অনলাইন কিউআর ভেরিফাইড অফিশিয়াল সনদপত্র',
      'অগ্রাধিকার ভিত্তিতে ভিসা ও ডকুমেন্টেশন পরামর্শ'
    ]
  },
  {
    id: 'career',
    name: 'Japan Career Track',
    nameBn: 'জাপান ক্যারিয়ার ও জব ট্র্যাক',
    monthlyPrice: 5990,
    yearlyPrice: 59900, // saves ৳11,980
    badge: 'CAREER & VISA 🇯🇵',
    description: 'End-to-end pathway for SSW, IT, and direct employment in Tokyo.',
    descriptionBn: 'জাপানে উচ্চশিক্ষা, এসএসডব্লিউ ও সরাসরি আইটি চাকরির পূর্ণাঙ্গ প্রস্তুতি।',
    features: [
      'Everything in DILS Pro',
      'Workplace & Business Japanese (Keigo / Manner)',
      'Japanese Resume (Rirekisho) & Interview Coaching',
      'Direct Job Matching with Tokyo Recruitment Partners',
      '1-on-1 COE Documentation Audit & Support',
      'VIP Airport & Initial Settlement Guidance'
    ],
    featuresBn: [
      'DILS Pro এর সকল প্রিমিয়াম সুবিধা',
      'জাপানি কর্মক্ষেত্রের শিষ্টাচার ও কেইগো (Keigo)',
      'জাপানি সিভি (Rirekisho) ও ইন্টারভিউ কোচিং',
      'টোকিওর স্বনামধন্য রিক্রুটিং পার্টনারদের সাথে কানেকশন',
      'ওয়ান-টু-ওয়ান সিওই (COE) ও ভিসা ফাইল অডিট',
      'জাপানে পৌঁছানোর পর সেটেলমেন্ট ও পার্ট-টাইম গাইড'
    ]
  }
];

export function getPlanById(id: string): MembershipPlan {
  const plan = MEMBERSHIP_PLANS.find(p => p.id === id);
  return plan || MEMBERSHIP_PLANS[1]; // default to core
}
