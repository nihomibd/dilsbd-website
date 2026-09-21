import React, { useState } from 'react';
import { LangMode } from '../types';
import { DILS_INFO } from '../data/mockData';
import { 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  UserCheck, 
  BookOpen, 
  FileCheck2, 
  Building2, 
  Plane, 
  Award, 
  ShieldCheck, 
  Clock, 
  Users, 
  HelpCircle,
  MessageCircle,
  ExternalLink,
  Sparkles,
  ChevronRight,
  GraduationCap,
  CalendarCheck
} from 'lucide-react';

interface StudentJourneyProps {
  onOpenAdmission: () => void;
  onOpenValidator: (certId: string) => void;
  lang: LangMode;
}

interface JourneyStep {
  id: string;
  stepNumber: number;
  stageName: string;
  stageNameBn: string;
  shortDesc: string;
  shortDescBn: string;
  timeline: string;
  timelineBn: string;
  mentor: string;
  mentorRole: string;
  keyDeliverable: string;
  keyDeliverableBn: string;
  highlights: { en: string; bn: string }[];
  actionLabel: { en: string; bn: string };
  actionType: 'admission' | 'certificate' | 'whatsapp' | 'calculator';
  badgeColor: string;
  iconType: 'enrollment' | 'language' | 'exam' | 'coe' | 'visa';
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 'step-enrollment',
    stepNumber: 1,
    stageName: 'Enrollment & Profile Assessment',
    stageNameBn: 'ভর্তি, প্রোফাইল যাচাই ও ইনটেক নির্ধারণ',
    shortDesc: 'Academic background analysis, study gap assessment, sponsor eligibility check, and intake mapping.',
    shortDescBn: 'শিক্ষাগত যোগ্যতা, স্টাডি গ্যাপ ও স্পনসরের আর্থিক সক্ষমতা যাচাই করে সঠিক ইনটেক (এপ্রিল/অক্টোবর) নির্বাচন ও ভর্তি নিশ্চিতকরণ।',
    timeline: 'Day 1 - Day 3',
    timelineBn: '১ম থেকে ৩য় দিন',
    mentor: 'ফার্মগেট কাউন্সেলিং ডেস্ক',
    mentorRole: 'Senior Student Counselor',
    keyDeliverable: 'Verified DILS Student ID (DILS-2026-0048) & Digital LMS Portal Access',
    keyDeliverableBn: 'ভেরিফাইড স্টুডেন্ট আইডি ও অনলাইন লার্নিং পোর্টালে সম্পূর্ণ এক্সেস',
    highlights: [
      { en: 'Free study gap & sponsor viability audit', bn: 'বিনামূল্যে স্টাডি গ্যাপ ও স্পনসর ডকুমেন্টেশন অডিট' },
      { en: 'Direct intake selection (April / October / July / January)', bn: 'উপযুক্ত ইনটেক (এপ্রিল/অক্টোবর/জুলাই/জানুয়ারি) চূড়ান্তকরণ' },
      { en: 'Official study kit and Minna no Nihongo textbook set', bn: 'অফিসিয়াল স্টাডি কিট ও মিন্না নো নিহোঙ্গো বই প্রদান' },
      { en: 'Student portal activation with 24/7 video archive', bn: '২৪/৭ ক্লাসরুম লেকচার ও প্র্যাকটিস পোর্টালে লগইন' }
    ],
    actionLabel: { en: 'Apply for Admission', bn: 'অনলাইন ভর্তি ফরম পূরণ করুন' },
    actionType: 'admission',
    badgeColor: 'from-blue-600 to-indigo-600',
    iconType: 'enrollment'
  },
  {
    id: 'step-language',
    stepNumber: 2,
    stageName: 'Japanese Language Training (N5/N4)',
    stageNameBn: 'নিবিড় জাপানি ভাষা প্রশিক্ষণ (এন৫ ও এন৪)',
    shortDesc: '150-hour intensive syllabus, Kana stroke lab, Minna no Nihongo 1-25, and daily conversation drills.',
    shortDescBn: '১৫০ ঘণ্টার অনুমোদিত সিলেবাস, হিরাগানা/কাতাকানা স্ট্রোক অনুশীলন, মিন্না নো নিহোঙ্গো ১-২৫ অধ্যায় ও দৈনন্দিন কথোপকথন।',
    timeline: 'Month 1 - Month 4 (150 Hours)',
    timelineBn: '১ম থেকে ৪র্থ মাস (১৫০ ঘণ্টা)',
    mentor: 'তানভির কবির বিপ্লব (JLPT N2)',
    mentorRole: 'Head of Japanese Language Training',
    keyDeliverable: 'Minna no Nihongo Mastery, 100+ Kanji & Native Listening Drills',
    keyDeliverableBn: '১০০+ কাঞ্জি, মিন্না নো নিহোঙ্গো ব্যাকরণ ও নেটিভ লিসেনিং পারদর্শিতা',
    highlights: [
      { en: 'Direct mentoring by Sensei Tanvir Kabir Biplob (JLPT N2)', bn: 'তানভির কবির বিপ্লব স্যারের সরাসরি ক্লাসরুম ও অনলাইন গাইডলাইন' },
      { en: 'Interactive Hiragana & Katakana digital canvas drills', bn: 'ডিজিটাল ক্যানভাসে জাপানি বর্ণমালার স্ট্রোক অনুশীলন' },
      { en: 'Native audio listening (Chokai) lab refinement', bn: 'পরীক্ষামুখী নেটিভ অডিও লিসেনিং (চোকাই) প্র্যাকটিস' },
      { en: 'Regular speaking drills for Japanese daily etiquette', bn: 'জাপানি জীবনযাত্রার শিষ্টাচার ও স্পিকিং প্র্যাকটিস' }
    ],
    actionLabel: { en: 'Connect with Trainer Tanvir', bn: 'তানভির স্যারের সাথে কথা বলুন' },
    actionType: 'whatsapp',
    badgeColor: 'from-red-600 to-rose-600',
    iconType: 'language'
  },
  {
    id: 'step-exam',
    stepNumber: 3,
    stageName: 'JLPT / NAT-TEST Preparation & Certificate',
    stageNameBn: 'জেএলপিটি / ন্যাট-টেস্ট প্রস্তুতি ও সার্টিফিকেট',
    shortDesc: 'Full-length timed mock tests, question bank mastery, and issuance of 150-hour QR accredited certificate.',
    shortDescBn: 'আসল পরীক্ষার আদলে পূর্ণাঙ্গ মক টেস্ট, স্পিড রিডিং ও ইমিগ্রেশন অনুমোদিত ১৫০ ঘণ্টার কিউআর সার্টিফিকেট অর্জন।',
    timeline: 'Month 4 - Month 5',
    timelineBn: '৪র্থ থেকে ৫ম মাস',
    mentor: 'একাডেমিক পরীক্ষা পরিষদ',
    mentorRole: 'Exam Evaluation Committee',
    keyDeliverable: 'Accredited 150-Hour Certificate (DILS-CERT) with QR Verification & Exam Scorecard',
    keyDeliverableBn: 'জাপান ইমিগ্রেশন স্বীকৃত ১৫০-ঘণ্টার অনলাইন ভেরিফায়েড সার্টিফিকেট',
    highlights: [
      { en: '3x full-length timed NAT-TEST / JLPT simulation tests', bn: 'আসল ন্যাট-টেস্ট ও জেএলপিটি পরীক্ষার আদলে ৩টি মক টেস্ট' },
      { en: 'Target score strategy for 120+/180 marks', bn: '১৮০ এর মধ্যে ১২০+ নম্বর নিশ্চিত করার শর্টকাট টেকনিক' },
      { en: 'Official 150-hour government registered certificate', bn: 'জাপান সিওই আবেদনের জন্য আবশ্যকীয় অফিসিয়াল সার্টিফিকেট' },
      { en: 'Global QR authentication verifiable from any device', bn: 'অনলাইনে তাৎক্ষণিক কিউআর কোড স্ক্যান করে ভেরিফিকেশন সুবিধা' }
    ],
    actionLabel: { en: 'Verify Sample Certificate', bn: 'সার্টিফিকেট নমুনা যাচাই করুন' },
    actionType: 'certificate',
    badgeColor: 'from-amber-500 to-orange-600',
    iconType: 'exam'
  },
  {
    id: 'step-coe',
    stepNumber: 4,
    stageName: 'Institute Selection & COE Legal Processing',
    stageNameBn: 'ইনস্টিটিউট নির্বাচন ও সিওই (COE) ফাইল প্রসেসিং',
    shortDesc: 'School matchmaking in Tokyo/Osaka/Nagoya, financial sponsor audit, and COE file submission to Japan Immigration.',
    shortDescBn: 'টোকিও, ওসাকা ও নাগোয়ার শীর্ষ স্কুল নির্বাচন, স্পনসরের ব্যাংক ও ট্যাক্স পেপারস অডিট এবং সিওই ফাইল সাবমিশন।',
    timeline: 'Month 5 - Month 7',
    timelineBn: '৫ম থেকে ৭ম মাস',
    mentor: 'এমডি. আবদুর রাজ্জাক (JLPT N1)',
    mentorRole: 'Director, DILS & Japan Immigration Specialist',
    keyDeliverable: 'School Admission Letter & Japan Immigration Bureau COE Filing',
    keyDeliverableBn: 'জাপানের স্কুলের অফার লেটার ও ইমিগ্রেশন ব্যুরোতে সিওই আবেদন',
    highlights: [
      { en: 'Personal oversight by Director Md. Abdur Razzak (JLPT N1)', bn: 'রাজ্জাক স্যারের সার্বিক তত্ত্বাবধানে নিখুঁত ফাইল প্রস্তুতকরণ' },
      { en: 'Direct partnership with Category-A accredited schools in Tokyo, Osaka & Nagoya', bn: 'টোকিও, ওসাকা, নাগোয়া ও কিয়োটোর শীর্ষ স্কুলের সাথে সরাসরি সংযোগ' },
      { en: '100% genuine banking audit, tax clearances & sponsor validation', bn: '১০০% স্বচ্ছ ব্যাংক ডকুমেন্টেশন, ট্যাক্স সার্টিফিকেট ও রিলেশনশিপ পেপারস' },
      { en: 'Professional Statement of Purpose (SOP) tailored for immigration approval', bn: 'জাপান ইমিগ্রেশন অনুমোদিত প্রফেশনাল স্টেটমেন্ট অব পারপাস (SOP)' }
    ],
    actionLabel: { en: 'Consult Director Razzak', bn: 'রাজ্জাক স্যারের সাথে ফাইল আলোচনা' },
    actionType: 'whatsapp',
    badgeColor: 'from-purple-600 to-violet-600',
    iconType: 'coe'
  },
  {
    id: 'step-visa',
    stepNumber: 5,
    stageName: 'COE Issuance, Embassy Interview & Departure',
    stageNameBn: 'সিওই প্রাপ্তি, এম্বাসি ইন্টারভিউ ও জাপান ডিপারচার',
    shortDesc: 'COE approval, tuition remittance, 1-on-1 Embassy mock interviews, visa stamping, and Tokyo arrival support.',
    shortDescBn: 'সিওই অনুমোদন, জাপানে ফি প্রেরণ, ৩টি ওয়ান-টু-ওয়ান এম্বাসি মক ইন্টারভিউ, ভিসা স্ট্যাম্পিং ও এয়ারপোর্ট রিসিপশন।',
    timeline: 'Month 8 - Month 9',
    timelineBn: '৮ম থেকে ৯ম মাস',
    mentor: 'এমডি. আবদুর রাজ্জাক & জাপান অ্যালামনাই',
    mentorRole: 'Post-Arrival & Embassy Strategist',
    keyDeliverable: 'Embassy Visa Stamped Passport & Tokyo/Osaka Arrival Package',
    keyDeliverableBn: 'পাসপোর্টে জাপান স্টুডেন্ট ভিসা স্টিকার ও জাপানে আবাসন ও কাজের নিশ্চয়তা',
    highlights: [
      { en: 'COE issuance directly from Japan Immigration Bureau', bn: 'জাপান ইমিগ্রেশন থেকে কাঙ্ক্ষিত সিওই (COE) লেটার প্রাপ্তি' },
      { en: '3x intensive one-on-one Embassy mock interview drills', bn: 'ঢাকায় জাপান দূতাবাসের জন্য ৩টি নিবিড় ওয়ান-টু-ওয়ান মক ইন্টারভিউ' },
      { en: 'Visa submission and passport stamping support', bn: 'ভিসা ফাইল সাবমিশন ও পাসপোর্টে জাপানি ভিসা স্ট্যাম্পিং' },
      { en: 'Airport reception in Tokyo/Osaka, dormitory booking & 28-hr legal job (Baito) assistance', bn: 'জাপানের এয়ারপোর্টে অভ্যর্থনা, নিরাপদ হোস্টেল ও পার্ট-টাইম কাজের পূর্ণ সহায়তা' }
    ],
    actionLabel: { en: 'Start Your Journey Today', bn: 'আজই আপনার স্বপ্ন পূরণ শুরু করুন' },
    actionType: 'admission',
    badgeColor: 'from-emerald-600 to-teal-600',
    iconType: 'visa'
  }
];

export const StudentJourney: React.FC<StudentJourneyProps> = ({
  onOpenAdmission,
  onOpenValidator,
  lang
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const currentStep = JOURNEY_STEPS[activeStepIndex];

  const getStepIcon = (iconType: JourneyStep['iconType']) => {
    switch (iconType) {
      case 'enrollment':
        return <UserCheck className="w-5 h-5" />;
      case 'language':
        return <BookOpen className="w-5 h-5" />;
      case 'exam':
        return <FileCheck2 className="w-5 h-5" />;
      case 'coe':
        return <Building2 className="w-5 h-5" />;
      case 'visa':
        return <Plane className="w-5 h-5" />;
    }
  };

  const handleAction = (step: JourneyStep) => {
    if (step.actionType === 'admission') {
      onOpenAdmission();
    } else if (step.actionType === 'certificate') {
      onOpenValidator('DILS-CERT-2026-0048');
    } else if (step.actionType === 'whatsapp') {
      const isDirector = step.id === 'step-coe' || step.id === 'step-visa';
      const number = isDirector ? '+880 1300-634046' : '017555-34997';
      const targetName = isDirector ? 'রাজ্জাক স্যার' : 'তানভির স্যার';
      const text = `হ্যালো ${targetName}! আমি DILS ওয়েবসাইট থেকে আপনার সাথে ${step.stageNameBn} বিষয়ে কথা বলতে চাই।`;
      window.open(`https://wa.me/${number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-9 shadow-2xl relative overflow-hidden space-y-8">
      
      {/* Decorative ambient blur */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* 1. Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/80 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-800/80 text-red-400 text-xs font-bold">
            <Compass className="w-3.5 h-3.5 text-red-400" />
            <span>{lang === 'bn' ? 'স্টুডেন্ট সাকসেস জার্নি রোডম্যাপ' : 'The Proven Student Journey Roadmap'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {lang === 'bn' ? (
              <span>শূন্য থেকে জাপানে সফল ক্যারিয়ার: <strong className="text-red-400">৫টি নিশ্চিত পদক্ষেপ</strong></span>
            ) : (
              <span>From Enrollment to Tokyo Landing: <strong className="text-red-400">The 5 Milestones</strong></span>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {lang === 'bn'
              ? 'DILS-এ আপনার প্রথম দিন থেকে শুরু করে জাপানি ভাষা শিক্ষা, ন্যাট-টেস্ট/জেএলপিটি পাস, সিওই ফাইল প্রসেসিং এবং জাপান এম্বাসি ইন্টারভিউ পর্যন্ত স্বচ্ছ ও নির্ভরযোগ্য রোডম্যাপ।'
              : 'A transparent, step-by-step roadmap showing how prospective learners progress from enrollment and language proficiency to COE legal processing and Embassy visa issuance.'}
          </p>
        </div>

        {/* Quick Trust Badges */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-2xl text-center">
            <div className="text-lg font-black text-emerald-400 font-mono">৯৮.৪%</div>
            <div className="text-[10px] text-slate-400">সিওই পাসের হার</div>
          </div>
          <div className="bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-2xl text-center">
            <div className="text-lg font-black text-amber-400 font-mono">১,৫০০+</div>
            <div className="text-[10px] text-slate-400">জাপানে অবস্থানরত</div>
          </div>
          <div className="bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-2xl text-center">
            <div className="text-lg font-black text-red-400 font-mono">১৫০ ঘণ্টা</div>
            <div className="text-[10px] text-slate-400">স্বীকৃত কোর্স</div>
          </div>
        </div>
      </div>

      {/* 2. Visual Progression Stepper (Horizontal bar on desktop, clickable) */}
      <div className="relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
          {JOURNEY_STEPS.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            const isPast = activeStepIndex > idx;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`relative text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-300 border flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-slate-800/90 border-red-500 shadow-xl ring-2 ring-red-500/30 -translate-y-0.5'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {/* Top: Step Number & Icon */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${
                    isSelected 
                      ? 'bg-red-600 text-white shadow-md' 
                      : isPast
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                  }`}>
                    {isPast ? <CheckCircle2 className="w-4 h-4" /> : `0${step.stepNumber}`}
                  </span>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-red-950 text-red-400 font-bold' : 'text-slate-500'
                  }`}>
                    {step.timelineBn.split('(')[0]}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold leading-snug line-clamp-2 transition-colors ${
                    isSelected ? 'text-white' : 'text-slate-300 group-hover:text-slate-100'
                  }`}>
                    {lang === 'bn' ? step.stageNameBn : step.stageName}
                  </h4>
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-1 font-mono">
                    {step.mentor.split('(')[0]}
                  </p>
                </div>

                {/* Active Indicator Bar at bottom of card */}
                {isSelected && (
                  <div className="w-full h-1 bg-gradient-to-r from-red-500 to-amber-500 rounded-full mt-3"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Deep-Dive Milestone Card for the Selected Step */}
      <div className="relative z-10 bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stage Overview & Checklists (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold font-mono">
                মাইলস্টোন ০{currentStep.stepNumber}
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-mono flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>সময়কাল: <strong>{lang === 'bn' ? currentStep.timelineBn : currentStep.timeline}</strong></span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/80 text-xs font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>১০০% পূর্ণ স্বচ্ছতা</span>
              </span>
            </div>

            {/* Stage Heading & Description */}
            <div>
              <h3 className="text-xl sm:text-3xl font-black text-white leading-tight">
                {lang === 'bn' ? currentStep.stageNameBn : currentStep.stageName}
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1">
                {currentStep.stageName}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
                {lang === 'bn' ? currentStep.shortDescBn : currentStep.shortDesc}
              </p>
            </div>

            {/* Highlights / Accomplishment Checklist */}
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>এই ধাপে শিক্ষার্থী কী কী অর্জন করেন (Key Milestones):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentStep.highlights.map((h, i) => (
                  <div 
                    key={i} 
                    className="flex items-start gap-2 bg-slate-900/80 border border-slate-800/90 rounded-xl p-3 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{lang === 'bn' ? h.bn : h.en}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Deliverable Box */}
            <div className="bg-gradient-to-r from-red-950/40 to-slate-900 border border-red-900/50 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider">
                  প্রধান প্রাপ্তি ও অফিসিয়াল ডকুমেন্ট (Key Deliverable):
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">
                  {lang === 'bn' ? currentStep.keyDeliverableBn : currentStep.keyDeliverable}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Mentor Profile & Direct Action (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6">
            
            {/* Mentor Profile Header */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-red-400" />
                <span>তত্ত্বাবধানকারী প্রধান শিক্ষক ও ভিসা মেন্টর</span>
              </div>
              <div className="bg-slate-950 border border-slate-800/90 rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 text-white font-black text-lg flex items-center justify-center shadow">
                  {currentStep.mentor.slice(0, 2)}
                </div>
                <div>
                  <h5 className="text-sm font-black text-white">{currentStep.mentor}</h5>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{currentStep.mentorRole}</p>
                  <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>ফার্মগেট ক্যাম্পাস থেকে সরাসরি পরিচালনা</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Stepper Navigation helper */}
            <div className="bg-slate-950/70 border border-slate-800/70 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">ধাপ অগ্রগতি:</span>
                <span className="font-mono font-bold text-white">০{currentStep.stepNumber} / ০৫</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-red-500 to-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep.stepNumber / JOURNEY_STEPS.length) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center pt-1 text-[11px]">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  ← পূর্ববর্তী ধাপ
                </button>
                <button
                  disabled={activeStepIndex === JOURNEY_STEPS.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(JOURNEY_STEPS.length - 1, prev + 1))}
                  className="text-red-400 hover:text-red-300 font-bold disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1"
                >
                  <span>পরবর্তী ধাপ</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="space-y-2.5">
              <button
                onClick={() => handleAction(currentStep)}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-xl transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{lang === 'bn' ? currentStep.actionLabel.bn : currentStep.actionLabel.en}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>কোনো হিডেন চার্জ নেই</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CalendarCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>ইনটেক ভর্তি চলছে</span>
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 4. Bottom Comparative Summary Table: Zero to Tokyo at a Glance */}
      <div className="relative z-10 pt-2 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>জাপান এম্বাসি ও ইমিগ্রেশন অনুমোদিত নিয়মাবলী অনুসরণ করে সম্পূর্ণ ফাইল প্রসেস করা হয়।</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdmission}
              className="text-red-400 hover:text-red-300 font-bold underline transition-colors"
            >
              এখনই ফ্রি প্রোফাইল যাচাই করুন
            </button>
            <span>|</span>
            <a
              href="#visa-calculator"
              className="text-amber-400 hover:text-amber-300 font-bold underline transition-colors"
            >
              সিওই সম্ভাব্যতা ক্যালকুলেটর
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};
