import React, { useState } from 'react';
import { Course, Trainer, LangMode } from '../types';
import { 
  BookOpen, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  PhoneCall, 
  MessageCircle, 
  Building2, 
  Users, 
  GraduationCap, 
  Clock, 
  Compass, 
  ExternalLink, 
  Search, 
  Facebook, 
  Youtube, 
  Linkedin, 
  Mail, 
  Laptop, 
  Brain, 
  ChevronRight, 
  Menu, 
  X,
  FileCheck2,
  Plane,
  Briefcase
} from 'lucide-react';
import { VisaSuccessGallery } from './VisaSuccessGallery';
import { StudentJourney } from './StudentJourney';
import { DILS_INFO } from '../data/mockData';

interface PortalWebsiteProps {
  courses?: Course[];
  trainers?: Trainer[];
  notices?: { id: string; date: string; title: string; titleBn: string; tag: string; isNew: boolean }[];
  lang?: LangMode;
  onOpenAdmission: (courseId?: string) => void;
  onOpenValidator: (certId?: string) => void;
  onSwitchToStudentPortal: (courseId: string) => void;
}

export const PortalWebsite: React.FC<PortalWebsiteProps> = ({
  courses = [],
  trainers = [],
  notices = [],
  lang = 'bn',
  onOpenAdmission,
  onOpenValidator,
  onSwitchToStudentPortal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickCertId, setQuickCertId] = useState('DILS-CERT-2026-0048');
  const [activePracticeTab, setActivePracticeTab] = useState<'flashcard' | 'ai-sensei' | 'mistake-radar'>('flashcard');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [kanjiIndex, setKanjiIndex] = useState(0);

  const practiceCards = [
    {
      kanji: '日',
      kana: 'にほん / ひ',
      romaji: 'Nihon / Hi',
      meaningBn: 'সূর্য, দিন, জাপান (Japan / Sun / Day)',
      onyomi: 'ニチ (nichi), ジツ (jitsu)',
      kunyomi: 'ひ (hi), -び (-bi), -か (-ka)',
      example: '日本 (にほん) へ いきます。 (আমি জাপানে যাব।)',
      level: 'JLPT N5 • Core Kanji #01',
      srsStage: 'Interval: 3 Days'
    },
    {
      kanji: '学',
      kana: 'がく / まな・ぶ',
      romaji: 'Gaku / Manabu',
      meaningBn: 'শিক্ষা, জ্ঞান, পড়াশোনা (Study / Learning)',
      onyomi: 'ガク (gaku)',
      kunyomi: 'まな・ぶ (mana-bu)',
      example: 'わたしは だいがくせいです。 (আমি বিশ্ববিদ্যালয়ের ছাত্র।)',
      level: 'JLPT N5 • Core Kanji #12',
      srsStage: 'Interval: 5 Days'
    },
    {
      kanji: '行',
      kana: 'い・く / こう',
      romaji: 'Iku / Kou',
      meaningBn: 'যাওয়া, গমন করা (To Go / Proceed)',
      onyomi: 'コウ (kou), ギョウ (gyou)',
      kunyomi: 'い・く (i-ku), おこな・う (okona-u)',
      example: 'あした とうきょうへ いきます。 (আগামীকাল টোকিও যাব।)',
      level: 'JLPT N5 • Core Kanji #24',
      srsStage: 'Interval: 7 Days'
    }
  ];

  // 4 Featured Core Courses
  const featuredCourses = [
    {
      id: 'c-jp-n5',
      title: 'JLPT N5 Foundation',
      titleJapanese: '日本語能力試験 N5 基礎コース',
      level: 'N5 Foundation',
      duration: '3.5 Months (150 Hours)',
      targetAudience: 'Absolute beginners, SSC/HSC & University students preparing for Japan Student Visa.',
      targetAudienceBn: 'একদম নতুন শিক্ষার্থী, এইচএসসি/ডিগ্রি সম্পন্নকারী এবং যারা জাপানে স্টুডেন্ট ভিসায় যেতে চান।',
      schedule: 'Weekend & Weekday Batches (Morning / Evening)',
      highlights: [
        'Hiragana & Katakana stroke mechanics',
        'Minna no Nihongo Lessons 1 to 25',
        '110+ Essential Kanji & 800+ Vocabulary',
        'Immigration-recognized 150-Hour Accredited Certificate'
      ],
      highlightsBn: [
        'হিরাগানা ও কাতাকানা নির্ভুল লিখন পদ্ধতি',
        'মিন্না নো নিহোঙ্গো ১ থেকে ২৫ অধ্যায় সম্পূর্ণ',
        '১১০+ মৌলিক কাঞ্জি ও ৮০০+ দৈনন্দিন শব্দভাণ্ডার',
        'জাপান সিওই (COE) ফাইলিংয়ের জন্য ১৫০ ঘণ্টার অফিসিয়াল সনদ'
      ],
      badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-950/40'
    },
    {
      id: 'c-jp-n4',
      title: 'JLPT N4 Intermediate',
      titleJapanese: '日本語能力試験 N4 中級コース',
      level: 'N4 Intermediate',
      duration: '4 Months (160 Hours)',
      targetAudience: 'N5 holders, Specified Skilled Worker (SSW) candidates & IT professionals.',
      targetAudienceBn: 'এন৫ উত্তীর্ণ শিক্ষার্থী, এসএসডব্লিউ (SSW) জব প্রত্যাশী ও আইটি প্রফেশনাল।',
      schedule: 'Direct Farmgate Classroom & Live Interactive Zoom',
      highlights: [
        'Minna no Nihongo Lessons 26 to 50',
        '300+ Kanji & 1,500+ Compound Expressions',
        'Complex polite speech (Keigo), passives & causatives',
        'NAT-TEST / JLPT timed mock test drills'
      ],
      highlightsBn: [
        'মিন্না নো নিহোঙ্গো ২৬ থেকে ৫০ অধ্যায় আয়ত্তকরণ',
        '৩০০+ কাঞ্জি ও ১৫০০+ বাস্তব কথোপকথন শব্দ',
        'জাপানি বিনয়ী ভাষা (কেইগো), প্যাসিভ ও কজেটিভ বাক্যের প্রয়োগ',
        'আসল পরীক্ষার আদলে ৩টি পূর্ণাঙ্গ টাইমড মক টেস্ট'
      ],
      badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40'
    },
    {
      id: 'c-jp-n3',
      title: 'JLPT N3 Advanced',
      titleJapanese: '日本語能力試験 N3 上級ブリッジコース',
      level: 'N3 Advanced',
      duration: '5 Months (180 Hours)',
      targetAudience: 'N4 certified learners, university graduates aiming for direct employment in Japan.',
      targetAudienceBn: 'এন৪ উত্তীর্ণ, জাপানে সরাসরি ইঞ্জিনিয়ারিং জব ও বিশ্ববিদ্যালয় ডিগ্রি প্রত্যাশী।',
      schedule: 'Evening Professional Batches',
      highlights: [
        '650+ Kanji & Advanced Sentence Structures',
        'Japanese newspaper, essay & business reading (Dokkai)',
        'Business negotiation & email composition',
        'Direct Japan corporate matchmaking support'
      ],
      highlightsBn: [
        '৬৫০+ কাঞ্জি ও উচ্চতর ব্যাকরণ কাঠামোর ব্যবহার',
        'জাপানি সংবাদপত্র ও ব্যবসায়িক রিপোর্ট রিডিং (দোক্কাই)',
        'জাপানি বিজনেস ইমেইল লিখন ও অফিস মিটিং চর্চা',
        'জাপানের শীর্ষ আইটি ও ইঞ্জিনিয়ারিং কোম্পানিতে ইন্টারভিউ লিংক'
      ],
      badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-950/40'
    },
    {
      id: 'c-jp-spoken',
      title: 'Spoken Japanese & Business Etiquette',
      titleJapanese: '実践ビジネス日本語とビジネスマナー',
      level: 'Executive Spoken',
      duration: '2.5 Months (60 Hours)',
      targetAudience: 'Visa holders, engineers, executives & candidates preparing for Japan Embassy interview.',
      targetAudienceBn: 'ভিসা প্রাপ্ত শিক্ষার্থী, ইঞ্জিনিয়ার ও জাপান এম্বাসি ইন্টারভিউয়ের জন্য প্রস্তুতি গ্রহণকারী।',
      schedule: 'Weekend Intensive Masterclass',
      highlights: [
        'Real-life conversational fluency & listening responsiveness',
        'Business etiquette: Meishi (card exchange), Ojigi (bowing)',
        '3x 1-on-1 Japan Embassy mock interview rehearsals',
        'Tokyo life & workplace cultural readiness'
      ],
      highlightsBn: [
        'বাস্তব জীবনের অনর্গল কথোপকথন ও চোকাই রেসপন্স',
        'জাপানি শিষ্টাচার: মেইশি (কার্ড বিনিময়), ওজিগি ও মিটিং ম্যানার',
        'জাপান এম্বাসি ও ভিসা ইন্টারভিউয়ের জন্য ৩টি নিবিড় মক ইন্টারভিউ',
        'টোকিওতে জীবনযাত্রা, সাইতো ও কাজের পরিবেশের প্রাথমিক ধারণা'
      ],
      badgeColor: 'border-red-500/40 text-red-400 bg-red-950/40'
    }
  ];

  const handleQuickValidator = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickCertId.trim()) {
      onOpenValidator(quickCertId.trim());
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 selection:bg-red-600 selection:text-white font-sans antialiased overflow-x-hidden min-h-screen flex flex-col">
      
      {/* =========================================================================
          1. NAVIGATION BAR (Apple-inspired Minimalist Glass Header)
         ========================================================================= */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-black text-white text-base shadow-lg shadow-red-900/40 group-hover:scale-105 transition-transform">
              DILS
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-red-400 transition-colors">
                  DILS Dhaka
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                ダッカ国際語学学校 • Est. 2012
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a 
              href="#mentorship" 
              className="hover:text-white hover:text-red-400 transition-colors py-1 flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Sensei Razzak</span>
            </a>
            <a 
              href="#practice-hub" 
              className="hover:text-white hover:text-red-400 transition-colors py-1 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Nihomi AI Hub</span>
            </a>
            <a 
              href="#courses" 
              className="hover:text-white hover:text-red-400 transition-colors py-1"
            >
              Courses
            </a>
            <a 
              href="#study-in-japan" 
              className="hover:text-white hover:text-red-400 transition-colors py-1"
            >
              Study in Japan
            </a>
            <a 
              href="#about-us" 
              className="hover:text-white hover:text-red-400 transition-colors py-1"
            >
              About Us
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onSwitchToStudentPortal('c-jp-n5')}
              className="min-h-[44px] px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5 text-red-400" />
              <span>LMS Login</span>
            </button>

            <button
              onClick={() => onOpenAdmission()}
              className="min-h-[44px] px-5 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg shadow-red-950/60 transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-white" />}
          </button>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-5 py-6 space-y-4 backdrop-blur-2xl">
            <div className="flex flex-col space-y-3 text-sm font-medium">
              <a 
                href="#mentorship" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-red-400 py-1.5 flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Sensei Razzak (JLPT N1)</span>
              </a>
              <a 
                href="#practice-hub" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-red-400 py-1.5 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-red-400" />
                <span>Nihomi AI Practice Hub</span>
              </a>
              <a 
                href="#courses" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-red-400 py-1.5"
              >
                Japanese Courses
              </a>
              <a 
                href="#study-in-japan" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-red-400 py-1.5"
              >
                Study in Japan Roadmap
              </a>
              <a 
                href="#about-us" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-red-400 py-1.5"
              >
                About Us &amp; Campus
              </a>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSwitchToStudentPortal('c-jp-n5');
                }}
                className="w-full min-h-[44px] py-3 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-red-400" />
                <span>LMS Login</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmission();
                }}
                className="w-full min-h-[44px] py-3 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg shadow-red-950/60 flex items-center justify-center gap-2"
              >
                <span>Apply Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>


      {/* =========================================================================
          2. HERO SECTION (Japanese-business-standard, Apple-inspired Minimalism)
         ========================================================================= */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden border-b border-slate-850">
        
        {/* Subtle, large Japanese Kanji watermark in the background */}
        <div 
          aria-hidden="true" 
          className="absolute right-[-4%] sm:right-[5%] top-1/2 -translate-y-1/2 select-none pointer-events-none text-slate-850/30 sm:text-slate-850/40 font-serif font-black text-[180px] sm:text-[300px] lg:text-[400px] leading-none tracking-tighter z-0"
        >
          日本語
        </div>

        {/* Ambient atmospheric glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 sm:w-[600px] h-96 bg-red-600/10 blur-[130px] rounded-full pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl text-left space-y-6 sm:space-y-8">
            
            {/* Campus Tag Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-red-500/30 text-xs font-medium text-slate-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-red-400 font-semibold">Farmgate Campus, Dhaka</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">Admissions Open for Upcoming Intakes</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Master Japanese. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">
                Secure Your Global Career.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Premium interactive classes at Farmgate campus. JLPT preparation, digital certification, and full COE &amp; Visa processing support.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onOpenAdmission()}
                className="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-red-950/60 transition-transform active:scale-95 flex items-center gap-2.5"
              >
                <span>Contact for Admission</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#courses"
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-700/90 rounded-2xl font-semibold text-sm sm:text-base transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-red-400" />
                <span>Explore Courses</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-slate-850/90 grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 text-red-400 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                    JLPT N1 Certified Teachers
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Native &amp; 12+ Yr Experienced Faculty
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                    98% Visa Success
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Category-A Legal Immigration Track
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                    Digital Smart Classrooms
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Farmgate Campus + 24/7 LMS Hub
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          2.5 DIRECT MENTORSHIP BY MD. ABDUR RAZZAK (JLPT N1 CERTIFIED)
          Head of Japanese Department & Managing Director, DILS
         ========================================================================= */}
      <section id="mentorship" className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 border-b border-slate-850 relative overflow-hidden">
        
        {/* Subtle Watermark */}
        <div 
          aria-hidden="true" 
          className="absolute left-[-2%] bottom-[-10%] select-none pointer-events-none text-slate-800/20 font-serif font-black text-[220px] leading-none z-0"
        >
          師
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
          
          {/* Section Header */}
          <div className="max-w-3xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-xs font-mono font-bold tracking-wider uppercase">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>DIRECT JAPANESE FACULTY LEADERSHIP</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Learn Directly Under Md. Abdur Razzak <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">
                (JLPT N1 Certified, Head of Japanese Department)
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Managing Director, DILS Dhaka • Over 12 Years of Direct Japan Immigration &amp; Visa Specialization.
            </p>
          </div>

          {/* Master Profile & Trust Card */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group hover:border-red-500/40 transition-all duration-300">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Headshot Placeholder & Badges (4 cols) */}
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  {/* Glowing Ring */}
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 p-1 shadow-[0_0_35px_rgba(220,38,38,0.35)]">
                    <div className="w-full h-full rounded-[22px] bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden border border-slate-800">
                      {/* Stylized Portrait Visual */}
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-red-700 via-rose-800 to-slate-900 text-white font-black text-3xl flex items-center justify-center shadow-lg border border-red-500/30">
                        AR
                      </div>
                      <div className="mt-2 text-center">
                        <span className="text-xs font-mono font-bold text-white block">SENSEI RAZZAK</span>
                        <span className="text-[10px] text-amber-400 font-mono">MD, DILS DHAKA</span>
                      </div>
                    </div>
                  </div>

                  {/* Certified Rank Pill */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-amber-500 to-red-600 text-slate-950 font-black text-[11px] font-mono rounded-full shadow-lg border border-amber-300 flex items-center gap-1.5 whitespace-nowrap">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
                    <span>JLPT N1 HIGHEST RANK</span>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-xl font-black text-white">Md. Abdur Razzak</h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    Japan Immigration Bureau Authorized Consultant
                  </p>
                  <p className="text-[11px] text-red-400 font-mono font-semibold">
                    Farmgate Campus • Daily In-Person Guidance
                  </p>
                </div>
              </div>

              {/* Right Column: Inspiring Quote & Pillars (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Quote Box in Bangla & English */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-6 relative">
                  <span className="text-3xl text-red-500/40 font-serif absolute top-2 left-3 select-none">“</span>
                  <blockquote className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed pl-4 border-l-2 border-red-500/60">
                    <p className="text-amber-200 font-semibold mb-1">
                      জাপানি ভাষা শুধু ব্যাকরণ ও শব্দ মুখস্থ নয়—এটি নিয়মানুবর্তিতা, জাপানি কর্মসংস্কৃতি এবং আপনার বৈশ্বিক মর্যাদার সোপান।
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      সঠিক পাঠপদ্ধতি, নির্ভুল উচ্চারণ ও জাপানি স্ট্যান্ডার্ডে ফাইল প্রসেসিং সম্পন্ন হলে প্রথমবারেই সিওই (COE) ও এম্বাসি ভিসা শতভাগ নিশ্চিত করা সম্ভব।
                    </p>
                  </blockquote>
                  <div className="text-right pt-2">
                    <span className="text-xs font-mono text-slate-400">
                      — <strong>Md. Abdur Razzak</strong>, Managing Director &amp; JLPT N1 Instructor
                    </span>
                  </div>
                </div>

                {/* 3 Core Trust Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                    <div className="text-red-400 font-bold text-xs flex items-center gap-1.5 font-mono">
                      <Users className="w-3.5 h-3.5" />
                      <span>1,500+ VISAS</span>
                    </div>
                    <div className="text-xs font-bold text-white">Direct Alumni in Japan</div>
                    <div className="text-[11px] text-slate-400 leading-snug">
                      Students placed in Tokyo, Osaka, Kyoto, Nagoya language institutes and universities.
                    </div>
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                    <div className="text-amber-400 font-bold text-xs flex items-center gap-1.5 font-mono">
                      <FileCheck2 className="w-3.5 h-3.5" />
                      <span>1-ON-1 SOP AUDIT</span>
                    </div>
                    <div className="text-xs font-bold text-white">Zero-Rejection Defense</div>
                    <div className="text-[11px] text-slate-400 leading-snug">
                      Every student's Statement of Purpose and sponsor paperwork reviewed directly by Razzak Sir.
                    </div>
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                    <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5 font-mono">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>JLPT &amp; NAT-TEST</span>
                    </div>
                    <div className="text-xs font-bold text-white">Proven 100% Pass Sprints</div>
                    <div className="text-[11px] text-slate-400 leading-snug">
                      Intensive exam drills, real timed papers, and Chokai listening mastery before every intake.
                    </div>
                  </div>
                </div>

                {/* Consultation CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => onOpenAdmission()}
                    className="min-h-[44px] px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/60 transition-transform active:scale-95 flex items-center gap-2"
                  >
                    <span>Book 1-on-1 Session with Razzak Sir</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/${DILS_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="min-h-[44px] px-5 py-3 bg-slate-950 hover:bg-slate-850 text-emerald-400 border border-slate-700/80 hover:border-emerald-500/50 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Chat on WhatsApp (+880 1300-634046)</span>
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          3. DIGITAL PRACTICE HUB (App-in-Web Experience powered by Nihomi.com)
             Interactive Live Preview of the continuous learning engine
         ========================================================================= */}
      <section id="practice-hub" className="py-20 sm:py-28 bg-slate-950 border-b border-slate-850 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-14">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/70 border border-red-800/80 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>DIGITAL PRACTICE HUB • POWERED BY NIHOMI.COM</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Learn at DILS. Practice 24/7 on <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">Nihomi AI</span>.
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              No more forgetting Minna no Nihongo vocabularies or tricky grammar particles. Test our live embedded Nihomi practice companion right here:
            </p>
          </div>

          {/* Embedded Glassmorphic Application Mockup Frame (App-in-Web Experience) */}
          <div className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-md border border-slate-700/60 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 hover:border-slate-600">
            
            {/* Top Mac / Browser Window Bar */}
            <div className="bg-slate-950/90 border-b border-slate-800/90 px-4 py-3 flex items-center justify-between gap-4">
              {/* Window Dots */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>

              {/* Browser Address Bar */}
              <div className="flex-1 max-w-md bg-slate-900 border border-slate-800 rounded-xl px-3 py-1 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="text-emerald-400">🔒</span>
                <span className="text-slate-300">app.nihomi.com</span>
                <span className="text-slate-600">/</span>
                <span className="text-red-400 font-semibold">dils-continuous-practice</span>
              </div>

              {/* Status Badge */}
              <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>LIVE AI SYNC</span>
              </div>
            </div>

            {/* In-App Interactive Navigation Tabs */}
            <div className="bg-slate-950/60 border-b border-slate-850 p-2 sm:p-3 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePracticeTab('flashcard')}
                  className={`min-h-[44px] px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    activePracticeTab === 'flashcard'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-950/50'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>🧠 SRS Kanji Flashcards</span>
                </button>

                <button
                  onClick={() => setActivePracticeTab('ai-sensei')}
                  className={`min-h-[44px] px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    activePracticeTab === 'ai-sensei'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-950/50'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span>🤖 Bangla AI Sensei</span>
                </button>

                <button
                  onClick={() => setActivePracticeTab('mistake-radar')}
                  className={`min-h-[44px] px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    activePracticeTab === 'mistake-radar'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-950/50'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>📊 Mistake Memory Radar</span>
                </button>
              </div>

              {/* Student Header Metrics */}
              <div className="hidden lg:flex items-center gap-3 text-xs font-mono">
                <span className="text-amber-400">🔥 14d Streak</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400">🪙 350 Coins</span>
              </div>
            </div>

            {/* Live Interactive App Body Preview */}
            <div className="p-5 sm:p-8 min-h-[380px] flex flex-col justify-between bg-gradient-to-b from-slate-900/40 via-slate-950/80 to-slate-950">
              
              {/* TAB 1: SRS KANJI FLASHCARDS */}
              {activePracticeTab === 'flashcard' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>QUEUE: CARD {kanjiIndex + 1} OF {practiceCards.length}</span>
                    <span className="text-amber-400 font-bold">{practiceCards[kanjiIndex].level}</span>
                  </div>

                  {/* Interactive Flip Card Container */}
                  <div 
                    onClick={() => setIsCardFlipped(!isCardFlipped)}
                    className="cursor-pointer bg-slate-900/90 hover:bg-slate-850/90 border border-slate-700/80 hover:border-amber-400/50 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xl transition-all duration-300 relative group select-none min-h-[200px] flex flex-col items-center justify-center"
                  >
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800 absolute top-4 right-4">
                      {isCardFlipped ? 'ক্লিক করে ফ্রন্ট দেখুন' : 'ক্লিক করে উত্তর দেখুন'}
                    </span>

                    {!isCardFlipped ? (
                      <div className="space-y-3">
                        <div className="text-6xl sm:text-7xl font-serif font-black text-white group-hover:scale-105 transition-transform text-red-500">
                          {practiceCards[kanjiIndex].kanji}
                        </div>
                        <div className="text-xs font-mono text-slate-400">
                          Click to flip &amp; reveal Furigana, Onyomi &amp; Bangla meaning
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2.5 animate-fadeIn">
                        <div className="text-2xl font-black text-amber-400">
                          {practiceCards[kanjiIndex].kana}
                        </div>
                        <div className="text-sm font-semibold text-slate-200">
                          {practiceCards[kanjiIndex].meaningBn}
                        </div>
                        <div className="text-xs font-mono text-slate-400 pt-1">
                          <span className="text-red-400">Onyomi:</span> {practiceCards[kanjiIndex].onyomi} | <span className="text-amber-400">Kunyomi:</span> {practiceCards[kanjiIndex].kunyomi}
                        </div>
                        <div className="text-xs text-emerald-400 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 max-w-md mx-auto mt-2">
                          {practiceCards[kanjiIndex].example}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SRS Confidence Buttons */}
                  <div className="space-y-2">
                    <div className="text-[11px] text-center font-mono text-slate-400">
                      Spaced Repetition Review Interval:
                    </div>
                    <div className="grid grid-cols-3 gap-2.5 max-w-md mx-auto">
                      <button
                        onClick={() => {
                          setIsCardFlipped(false);
                          setKanjiIndex((kanjiIndex + 1) % practiceCards.length);
                        }}
                        className="min-h-[44px] py-2 px-3 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-800/60 text-red-300 font-bold text-xs transition-colors text-center"
                      >
                        <div>Hard</div>
                        <div className="text-[10px] font-mono opacity-80">(1 Day)</div>
                      </button>
                      <button
                        onClick={() => {
                          setIsCardFlipped(false);
                          setKanjiIndex((kanjiIndex + 1) % practiceCards.length);
                        }}
                        className="min-h-[44px] py-2 px-3 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 border border-amber-800/60 text-amber-300 font-bold text-xs transition-colors text-center"
                      >
                        <div>Good</div>
                        <div className="text-[10px] font-mono opacity-80">(3 Days)</div>
                      </button>
                      <button
                        onClick={() => {
                          setIsCardFlipped(false);
                          setKanjiIndex((kanjiIndex + 1) % practiceCards.length);
                        }}
                        className="min-h-[44px] py-2 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/60 text-emerald-300 font-bold text-xs transition-colors text-center"
                      >
                        <div>Easy</div>
                        <div className="text-[10px] font-mono opacity-80">(7 Days)</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: BANGLA AI SENSEI LIVE CHAT */}
              {activePracticeTab === 'ai-sensei' && (
                <div className="space-y-4">
                  {/* Chat Message 1: Student */}
                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-red-600 text-white rounded-2xl rounded-tr-none px-4 py-2.5 max-w-sm sm:max-w-md text-xs leading-relaxed shadow">
                      Sensei, 'は' (wa) আর 'が' (ga) এর আসল পার্থক্য সহজ বাংলায় বুঝিয়ে বলুন। NAT-TEST এ কনফিউজড হয়ে যাই!
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      ME
                    </div>
                  </div>

                  {/* Chat Message 2: Nihomi AI Sensei */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-amber-500 text-slate-950 flex items-center justify-center text-xs font-black flex-shrink-0 shadow">
                      AI
                    </div>
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl rounded-tl-none p-4 max-w-lg space-y-2 text-xs text-slate-200 shadow-xl">
                      <div className="font-bold text-amber-400 flex items-center gap-1.5 font-mono">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Nihomi AI Sensei • বাংলা ব্যাখ্যা</span>
                      </div>
                      <p className="leading-relaxed">
                        খুব গুরুত্বপূর্ণ একটি প্রশ্ন! একদম সহজে মনে রাখুন:
                      </p>
                      <ul className="space-y-1.5 pl-2">
                        <li className="border-l-2 border-red-500 pl-2">
                          <strong>「は」(wa)</strong>: <em>টপিক মার্কার (Topic)</em> — যা শ্রোতার কাছে ইতোমধ্যে পরিচিত। যেমন: わたし<strong>は</strong> がくせいです (আমার কথা বললে, আমি ছাত্র)।
                        </li>
                        <li className="border-l-2 border-amber-500 pl-2">
                          <strong>「が」(ga)</strong>: <em>নতুন কর্তা/তথ্য (Subject Focus)</em> — যেখানে কর্তাকে বিশেষভাবে নির্দেশ করা হয়। যেমন: だれ<strong>が</strong> きましたか？ (কে এসেছে?) → たなかさん<strong>が</strong> きました (তানাকা সাহেব এসেছেন)।
                        </li>
                      </ul>
                      <div className="bg-slate-900/90 rounded-lg p-2 text-[11px] text-emerald-400 font-mono">
                        💡 DILS স্পেশাল টিপস: প্রশ্নবোধক শব্দ (だれ, なに) দিয়ে প্রশ্ন থাকলে উত্তরে সর্বদা「が」বসবে।
                      </div>
                    </div>
                  </div>

                  {/* Sample Query Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto pt-2 text-[11px]">
                    <span className="text-slate-500 whitespace-nowrap">Try asking:</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:border-red-400 cursor-pointer whitespace-nowrap">
                      Te-form conjugation trick
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:border-red-400 cursor-pointer whitespace-nowrap">
                      Minna no Nihongo Lesson 12 vocab
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 3: MISTAKE MEMORY RADAR */}
              {activePracticeTab === 'mistake-radar' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Student JLPT N5 Skill Breakdown</h4>
                      <p className="text-xs text-slate-400">Automated diagnosis based on Farmgate offline &amp; online quiz history</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-mono font-bold">
                      NAT-TEST: 86% READY
                    </span>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-3.5">
                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                        <span>Kanji &amp; Vocabulary (Goi)</span>
                        <span className="text-emerald-400 font-bold">94% (Mastered)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                        <span>Grammar &amp; Particles (Bunpou)</span>
                        <span className="text-amber-400 font-bold">78% (Revision Recommended)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                        <span>Listening Comprehension (Chokai)</span>
                        <span className="text-emerald-400 font-bold">91% (High Speed)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" style={{ width: '91%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                        <span>Reading Speed (Dokkai)</span>
                        <span className="text-slate-300 font-bold">85% (Passing Grade)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between text-xs">
                    <div className="text-slate-300">
                      <span className="text-amber-400 font-bold">AI Prescription:</span> Review 12 particle questions on Lesson 16 before Friday's Farmgate campus mock test.
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* In-Frame Footer Callout with "Launch Nihomi AI Practice" Button */}
            <div className="bg-slate-950 border-t border-slate-800/90 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5 text-center sm:text-left">
                <div className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                  One Student → One Nihomi Account → One Continuous Journey
                </div>
                <div className="text-xs text-slate-400">
                  Included free with every DILS Farmgate enrollment.
                </div>
              </div>

              {/* Primary User-Requested CTA Button */}
              <button
                onClick={() => onSwitchToStudentPortal('c-jp-n5')}
                className="min-h-[44px] px-7 py-3 bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-xs sm:text-sm rounded-xl shadow-xl shadow-red-950/60 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 whitespace-nowrap"
              >
                <span>Launch Nihomi AI Practice</span>
                <Sparkles className="w-4 h-4 text-amber-200" />
              </button>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          4. COURSES SECTION (Clean Grid: N5, N4, N3, Spoken & Business)
         ========================================================================= */}
      <section id="courses" className="py-20 sm:py-28 bg-slate-950 border-b border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-850 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                <BookOpen className="w-3.5 h-3.5 text-red-400" />
                <span>JLPT &amp; NAT-TEST ACCREDITED CURRICULUM</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Structured Japanese Language Courses
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Every syllabus adheres strictly to the Japan Foundation standard. Includes authentic textbook kits, interactive labs, and visa eligibility certification.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <span className="text-xs text-slate-400 block">Need Course Guidance?</span>
                <span className="text-xs font-bold text-red-400">+880 1300-634046</span>
              </div>
              <button
                onClick={() => onOpenAdmission()}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors"
              >
                Free Counseling
              </button>
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="lg:hidden flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-300">
            <span className="font-medium">👈 ডানে-বামে সোয়াইপ করে ৪টি জাপানিজ কোর্স দেখুন</span>
            <span className="font-mono text-[10px] text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800/60">SWIPE</span>
          </div>

          {/* 4-Card Clean Course Grid - Mobile Horizontal Carousel & Desktop 4-Column Grid */}
          <div className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-4 gap-6 pb-4 sm:pb-0 scrollbar-none">
            {featuredCourses.map((c) => (
              <div
                key={c.id}
                className="snap-start flex-shrink-0 min-w-[285px] sm:min-w-[320px] lg:min-w-0 bg-slate-900/50 backdrop-blur-md border border-slate-700/50 hover:border-red-500/50 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(220,38,38,0.25)] group"
              >
                <div className="space-y-4">
                  
                  {/* Badge & Duration */}
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border ${c.badgeColor}`}>
                      {c.level}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{c.duration.split('(')[0]}</span>
                    </span>
                  </div>

                  {/* Course Title */}
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors leading-snug">
                      {c.title}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                      {c.titleJapanese}
                    </p>
                  </div>

                  {/* Target Audience */}
                  <div className="bg-slate-950/80 border border-slate-850 rounded-xl p-3">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Target Audience:
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {c.targetAudience}
                    </p>
                  </div>

                  {/* Highlights List */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Key Highlights:
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {c.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Card Action Button */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-2">
                  <button
                    onClick={() => onOpenAdmission(c.id)}
                    className="w-full min-h-[44px] py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/40 transition-transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[10px] text-center text-slate-500 font-mono">
                    {c.schedule}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* Quick Certificate Verification Tool Embedded in Courses */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>OFFICIAL ACCREDITATION &amp; QR AUTHENTICITY</span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-white">
                Verify any DILS 150-Hour Japanese Language Certificate Instantly
              </h4>
              <p className="text-xs text-slate-400">
                Enter your unique DILS credential code to authenticate GPA, issue date, and Japan Immigration compliance.
              </p>
            </div>

            <form onSubmit={handleQuickValidator} className="flex w-full md:w-auto gap-2">
              <input
                type="text"
                value={quickCertId}
                onChange={(e) => setQuickCertId(e.target.value)}
                placeholder="e.g. DILS-CERT-2026-0048"
                className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 min-w-[220px]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Verify Now</span>
              </button>
            </form>
          </div>

        </div>
      </section>


      {/* =========================================================================
          5. STUDY IN JAPAN & CONTINUOUS JOURNEY TRACKER
         ========================================================================= */}
      <section id="study-in-japan" className="py-20 sm:py-28 bg-slate-900/30 border-b border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Visual Student Progression Component */}
          <StudentJourney
            onOpenAdmission={() => onOpenAdmission()}
            onOpenValidator={onOpenValidator}
            lang={lang}
          />

          {/* Visa Gallery & Partner Schools */}
          <VisaSuccessGallery onOpenAdmission={() => onOpenAdmission()} />

        </div>
      </section>


      {/* =========================================================================
          6. ABOUT US & LEADERSHIP AT FARMGATE CAMPUS
         ========================================================================= */}
      <section id="about-us" className="py-20 bg-slate-950 border-b border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-red-400">
              <Compass className="w-3.5 h-3.5" />
              <span>ABOUT DHAKA INTERNATIONAL LANGUAGE SCHOOL (DILS)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              A Decade of Dedicated Japanese Language Leadership in Bangladesh
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Founded in 2012, DILS has pioneered career-centric Japanese language education and visa guidance. Headquartered at Farmgate, Dhaka, we have bridged over 1,500 students into prominent Japanese universities, vocational colleges, and global corporate careers.
            </p>
          </div>

          {/* Faculty Profile Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex items-start gap-4 sm:gap-6 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 text-white font-black text-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                AR
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-black text-white">Md. Abdur Razzak</h4>
                  <span className="px-2 py-0.5 rounded-md bg-red-950 text-red-400 border border-red-800 text-[10px] font-mono font-bold">
                    JLPT N1
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  Managing Director, DILS • Japan Immigration Bureau Legal Specialist
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Over 12 years of direct experience preparing authentic Statement of Purpose (SOP), sponsor documentation audits, and Category-A school placements in Tokyo, Osaka &amp; Nagoya.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex items-start gap-4 sm:gap-6 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white font-black text-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                TB
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-black text-white">Tanvir Kabir Biplob</h4>
                  <span className="px-2 py-0.5 rounded-md bg-blue-950 text-blue-400 border border-blue-800 text-[10px] font-mono font-bold">
                    JLPT N2
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  Head of Japanese Language Training &amp; Curriculum Development
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Renowned Japanese instructor specializing in Minna no Nihongo foundation, Kana calligraphy accuracy, and intensive NAT-TEST / JLPT timed simulation techniques.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          7. FOOTER
             - Address: "7th Floor, BTI Central Plaza, 95 Green Road, Farmgate, Dhaka"
             - Quick links, Contact Number, and Social icons.
         ========================================================================= */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-850 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Col 1 & 2: Brand & Address */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white font-black flex items-center justify-center text-base shadow">
                  DILS
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-white tracking-tight">
                    Dhaka International Language School
                  </h4>
                  <p className="text-[10px] text-slate-500 font-mono uppercase">
                    Approved Language Training &amp; Visa Processing Center
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed pt-2">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>7th Floor, BTI Central Plaza, 95 Green Road, Farmgate, Dhaka</strong>
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Empowering Bangladeshi students and professionals with Japanese language excellence, JLPT credentials, and seamless visa processing to Japan.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={DILS_INFO.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500 hover:text-white flex items-center justify-center transition-colors text-slate-400"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${DILS_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 flex items-center justify-center transition-colors text-slate-400"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500 hover:text-red-400 flex items-center justify-center transition-colors text-slate-400"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="mailto:info@dilsbd.com"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 hover:text-amber-400 flex items-center justify-center transition-colors text-slate-400"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

            </div>

            {/* Col 3: Programs & Courses */}
            <div className="space-y-3 text-xs">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">
                Japanese Courses
              </h5>
              <ul className="space-y-2.5">
                <li>
                  <a href="#courses" className="hover:text-white transition-colors">JLPT N5 Foundation</a>
                </li>
                <li>
                  <a href="#courses" className="hover:text-white transition-colors">JLPT N4 Intermediate</a>
                </li>
                <li>
                  <a href="#courses" className="hover:text-white transition-colors">JLPT N3 Advanced Bridge</a>
                </li>
                <li>
                  <a href="#courses" className="hover:text-white transition-colors">Spoken Japanese &amp; Etiquette</a>
                </li>
                <li>
                  <a href="#courses" className="hover:text-white transition-colors">NAT-TEST Mock Masterclass</a>
                </li>
              </ul>
            </div>

            {/* Col 4: Quick Links */}
            <div className="space-y-3 text-xs">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">
                Quick Navigation
              </h5>
              <ul className="space-y-2.5">
                <li>
                  <a href="#study-in-japan" className="hover:text-white transition-colors">Study in Japan Roadmap</a>
                </li>
                <li>
                  <a href="#ecosystem" className="hover:text-white transition-colors">Nihomi Continuous Learning</a>
                </li>
                <li>
                  <button onClick={() => onOpenValidator('DILS-CERT-2026-0048')} className="hover:text-white text-left transition-colors">
                    Certificate Verification (QR)
                  </button>
                </li>
                <li>
                  <button onClick={() => onSwitchToStudentPortal('c-jp-n5')} className="hover:text-white text-left transition-colors">
                    Student LMS Portal Login
                  </button>
                </li>
                <li>
                  <button onClick={() => onOpenAdmission()} className="text-red-400 hover:text-red-300 text-left font-semibold transition-colors">
                    Online Admission Form →
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 5: Contact Numbers & Hours */}
            <div className="space-y-3 text-xs">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">
                Official Helpline
              </h5>
              <div className="space-y-2 text-slate-300">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="font-mono font-bold text-emerald-400">{DILS_INFO.hotline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="font-mono text-slate-300">{DILS_INFO.whatsapp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{DILS_INFO.email}</span>
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Open: Saturday – Thursday (9:00 AM – 8:00 PM)
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Accreditation Line */}
          <div className="pt-8 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © 2026 Dhaka International Language School (DILS). All Rights Reserved.
            </div>
            <div className="flex items-center gap-3">
              <span>Farmgate Campus, Dhaka</span>
              <span>•</span>
              <a href="https://dilsbd.com" target="_blank" rel="noreferrer" className="text-red-400 hover:text-red-300 font-mono underline">
                dilsbd.com
              </a>
              <span>•</span>
              <span>Nihomi AI Learning Partner</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
