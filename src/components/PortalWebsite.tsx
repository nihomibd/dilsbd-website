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
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a 
              href="#courses" 
              className="hover:text-white hover:text-red-400 transition-colors py-1 relative"
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
              href="#ecosystem" 
              className="hover:text-white hover:text-red-400 transition-colors py-1 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Our Ecosystem</span>
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
              className="px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5 text-red-400" />
              <span>LMS Login</span>
            </button>

            <button
              onClick={() => onOpenAdmission()}
              className="px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg shadow-red-950/60 transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
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
                href="#courses" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-red-400 py-1"
              >
                Courses
              </a>
              <a 
                href="#study-in-japan" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-red-400 py-1"
              >
                Study in Japan
              </a>
              <a 
                href="#ecosystem" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-red-400 py-1 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Our Ecosystem</span>
              </a>
              <a 
                href="#about-us" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-red-400 py-1"
              >
                About Us
              </a>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSwitchToStudentPortal('c-jp-n5');
                }}
                className="w-full py-3 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-red-400" />
                <span>LMS Login</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmission();
                }}
                className="w-full py-3 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg shadow-red-950/60 flex items-center justify-center gap-2"
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
          3. OUR ECOSYSTEM (The DILS Difference)
             Concept: "Learn at DILS. Practice 24/7 on Nihomi.com."
         ========================================================================= */}
      <section id="ecosystem" className="py-20 sm:py-28 bg-slate-900/40 border-b border-slate-850 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-800/80 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE DILS DIFFERENCE</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Learn at DILS. Practice 24/7 on <span className="text-red-500">Nihomi.com</span>.
            </h2>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We eliminate the gap between passive classroom lessons and permanent Japanese fluency. Combine in-person masterclass instruction with continuous AI-driven memory retention.
            </p>
          </div>

          {/* Two Distinct Cards: Physical + Digital Ecosystem */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            
            {/* Card 1: DILS (Interactive Live/Offline Classes) */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-9 flex flex-col justify-between relative overflow-hidden shadow-2xl group hover:border-red-500/50 transition-all">
              <div className="space-y-6">
                
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-500/30 text-red-400 flex items-center justify-center shadow-inner">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono font-semibold">
                    Farmgate Campus &amp; Live
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-red-400 transition-colors">
                    DILS (Interactive Live / Offline Classes)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Direct mentorship with certified JLPT N1 &amp; N2 instructors at our Farmgate state-of-the-art language training center.
                  </p>
                </div>

                {/* Feature Checklist */}
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Direct teaching by <strong>Md. Abdur Razzak (JLPT N1)</strong> &amp; <strong>Tanvir Kabir Biplob (JLPT N2)</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Interactive smart whiteboards, native Japanese audio drills &amp; small batch sizes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>In-person speaking immersion, Japanese business bowing (Ojigi), and real conversation practice.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Official 150-Hour Japanese Language Certification accredited for Japan Immigration Bureau COE.</span>
                  </li>
                </ul>

              </div>

              <div className="pt-8 mt-6 border-t border-slate-850 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  Location: <strong className="text-white">Farmgate, Dhaka</strong>
                </div>
                <button
                  onClick={() => onOpenAdmission()}
                  className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>Join Classroom Batch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Card 2: Nihomi (AI-powered Continuous Practice & Memory Tracking) */}
            <div className="bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-9 flex flex-col justify-between relative overflow-hidden shadow-2xl group hover:border-amber-500/50 transition-all">
              <div className="space-y-6">
                
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-inner">
                    <Brain className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
                    AI Continuous Learning
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                    Nihomi (AI Continuous Practice &amp; Memory Tracking)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    24/7 intelligent learning companion that tracks your mistakes, reinforces vocabulary via SRS, and prepares you for Japan.
                  </p>
                </div>

                {/* Feature Checklist */}
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span><strong>One Student → One Nihomi Account → One Continuous Journey</strong>: Your entire progress preserved in one digital identity.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Bangla-First AI Tutor</strong>: Clarifies tricky Japanese grammar points in natural Bangla and English 24/7.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Spaced Repetition System (SRS)</strong>: Daily active recall drills for Kanji and Minna no Nihongo vocabulary.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Mistake Memory &amp; Exam Prediction</strong>: Real-time JLPT &amp; NAT-TEST mock simulators based on your weak points.</span>
                  </li>
                </ul>

              </div>

              <div className="pt-8 mt-6 border-t border-slate-850 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  Access: <strong className="text-white">Mobile &amp; Web (24/7)</strong>
                </div>
                <button
                  onClick={() => onSwitchToStudentPortal('c-jp-n5')}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>Launch Student LMS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

          {/* Unified Philosophy Ribbon */}
          <div className="bg-slate-950 border border-slate-800/90 rounded-2xl p-4 sm:p-6 text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left space-y-0.5">
              <span className="text-xs font-bold text-red-400 font-mono uppercase tracking-wider block">
                Single Student Identity
              </span>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Every lecture attended at Farmgate synchronizes with your online quizzes and visa milestones.
              </p>
            </div>
            <button
              onClick={() => onOpenAdmission()}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg transition-transform active:scale-95 whitespace-nowrap"
            >
              Enroll &amp; Get Student ID
            </button>
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

          {/* 4-Card Clean Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((c) => (
              <div
                key={c.id}
                className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group"
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
                    className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/40 transition-transform active:scale-95 flex items-center justify-center gap-2"
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
