import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  PhoneCall, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Menu, 
  X, 
  Clock, 
  Check, 
  Lock, 
  LogOut, 
  UserCheck,
  Send,
  Play,
  Sparkles,
  BookOpen,
  Award,
  Calendar,
  ExternalLink,
  Video,
  FileCheck,
  Star,
  Users,
  Compass,
  Camera
} from 'lucide-react';
import { Course, Trainer, LangMode, PortalMode, Lead, AuthUser } from '../types';
import { VISA_SUCCESS_STORIES, DILS_INFO, INITIAL_COURSES } from '../data/mockData';

interface JapaneseCorporateLandingProps {
  courses?: Course[];
  trainers?: Trainer[];
  notices?: any[];
  lang?: LangMode;
  onOpenAdmission?: (courseId?: string) => void;
  onOpenValidator?: (certId?: string) => void;
  onOpenAssessment?: () => void;
  onOpenMembership?: () => void;
  onSwitchToStudentPortal?: (courseId: string) => void;
  onSelectPortal?: (portal: PortalMode) => void;
  onAddNewLead?: (leadData: Partial<Lead> & { name: string; phone: string }) => void;
  authUser?: AuthUser | null;
  onOpenLogin?: (targetPortal?: PortalMode) => void;
  onLogout?: () => void;
}

// Resilient Image Component with Automatic Fallback
const SmartImage: React.FC<{
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
}> = ({ src, fallbackSrc, alt, className }) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
      referrerPolicy="no-referrer"
    />
  );
};

export const JapaneseCorporateLanding: React.FC<JapaneseCorporateLandingProps> = ({
  courses = INITIAL_COURSES,
  trainers,
  lang: initialLang = 'bn',
  onOpenAdmission,
  onOpenValidator,
  onOpenAssessment,
  onOpenMembership,
  onSelectPortal,
  onAddNewLead,
  authUser,
  onOpenLogin,
  onLogout
}) => {
  const [currentLang, setCurrentLang] = useState<LangMode>(initialLang || 'bn');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null);

  // Persistent Director Photo & Official School Logo state
  const [directorPhoto, setDirectorPhoto] = useState<string>(() => {
    return localStorage.getItem('dils_director_photo') || '/images/razzak-photo.jpg';
  });

  const [schoolLogo, setSchoolLogo] = useState<string>(() => {
    return localStorage.getItem('dils_school_logo') || '/images/dils-logo.svg';
  });

  // Sync latest persisted settings from server SQLite if available
  useEffect(() => {
    fetch('/api/settings/director_photo')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.value) {
          setDirectorPhoto(data.value);
          localStorage.setItem('dils_director_photo', data.value);
        }
      })
      .catch(() => {});

    fetch('/api/settings/school_logo')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.value) {
          setSchoolLogo(data.value);
          localStorage.setItem('dils_school_logo', data.value);
        }
      })
      .catch(() => {});
  }, []);

  const handleDirectorPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setDirectorPhoto(result);
        localStorage.setItem('dils_director_photo', result);
        fetch('/api/settings/director_photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value: result })
        }).catch(() => {});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSchoolLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setSchoolLogo(result);
        localStorage.setItem('dils_school_logo', result);
        fetch('/api/settings/school_logo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value: result })
        }).catch(() => {});
      };
      reader.readAsDataURL(file);
    }
  };

  // Quick Consultation Form State
  const [consultName, setConsultName] = useState('');
  const [consultPhone, setConsultPhone] = useState('');
  const [consultCourse, setConsultCourse] = useState('Japanese JLPT N5 Complete Mastery');
  const [consultIntake, setConsultIntake] = useState('October 2026 Intake');
  const [consultMsg, setConsultMsg] = useState('');
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName.trim() || !consultPhone.trim()) return;

    if (onAddNewLead) {
      onAddNewLead({
        name: consultName.trim(),
        phone: consultPhone.trim(),
        courseInterest: consultCourse,
        targetIntake: consultIntake,
        notes: [
          `Website Free Counseling Inquiry.`,
          `Message: ${consultMsg || 'Requested counseling call.'}`
        ]
      });
    }

    setConsultSubmitted(true);
    setTimeout(() => {
      setConsultSubmitted(false);
      setConsultName('');
      setConsultPhone('');
      setConsultMsg('');
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800 font-sans selection:bg-red-600 selection:text-white">

      {/* =========================================================================
          1. TOP UTILITY BAR (DISCREET & FUNCTIONAL)
         ========================================================================= */}
      <div className="bg-[#0F172A] text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Location & Hotline */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>ফার্মগেট ক্যাম্পাস: ৭ম তলা, বিটিআই সেন্ট্রাল প্লাজা, ৯৫ গ্রিন রোড, ফার্মগেট, ঢাকা-১২১৫</span>
            </span>
            <span className="hidden sm:inline-block text-slate-600">·</span>
            <a 
              href="tel:+8801764395945" 
              className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-mono font-semibold">+880 1764-395945</span>
            </a>
          </div>

          {/* Right: Verify Cert, Language Switcher, Auth Chip */}
          <div className="flex items-center gap-3 ml-auto text-[11px] sm:text-xs">
            <button
              onClick={() => onOpenValidator && onOpenValidator('DILS-CERT-2026-0048')}
              className="flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>সার্টিফিকেট যাচাই</span>
            </button>

            <span className="text-slate-700">·</span>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800 rounded p-0.5 text-[10px]">
              <button
                onClick={() => setCurrentLang('bn')}
                className={`px-2 py-0.5 rounded transition-all font-semibold ${
                  currentLang === 'bn' ? 'bg-red-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setCurrentLang('jp')}
                className={`px-2 py-0.5 rounded transition-all font-semibold ${
                  currentLang === 'jp' ? 'bg-red-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                日本語
              </button>
              <button
                onClick={() => setCurrentLang('en')}
                className={`px-2 py-0.5 rounded transition-all font-semibold ${
                  currentLang === 'en' ? 'bg-red-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <span className="text-slate-700">·</span>

            {/* User Session Chip / Sign In */}
            {authUser ? (
              <div className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded text-emerald-300">
                <UserCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white max-w-[80px] truncate">{authUser.fullName.split(' ')[0]}</span>
                <span className="text-[9px] font-mono uppercase bg-emerald-900 px-1 py-0.2 rounded font-bold text-emerald-200">
                  {authUser.role}
                </span>
                {onSelectPortal && (
                  <button
                    onClick={() => onSelectPortal(authUser.role === 'STUDENT' ? 'student' : 'admin')}
                    className="ml-1 text-[10px] font-bold text-amber-300 hover:text-white underline cursor-pointer"
                  >
                    {authUser.role === 'STUDENT' ? 'LMS' : 'CRM'}
                  </button>
                )}
                {onLogout && (
                  <button 
                    onClick={onLogout} 
                    title="লগআউট" 
                    className="ml-1 text-slate-400 hover:text-rose-400 cursor-pointer"
                  >
                    <LogOut className="w-3 h-3" />
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => onOpenLogin && onOpenLogin()}
                className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3 text-amber-400" />
                <span>স্টাফ ও শিক্ষার্থী পোর্টাল</span>
              </button>
            )}

          </div>

        </div>
      </div>

      {/* =========================================================================
          2. MAIN ACADEMY NAVIGATION HEADER (Clean White & Prestigious)
         ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-6">
          
          {/* Logo & School Identity */}
          <a href="#" className="flex items-center gap-3.5 group select-none">
            <div className="w-14 h-14 rounded-full bg-white p-0.5 border-2 border-red-500/50 flex items-center justify-center shrink-0 overflow-hidden shadow-md group-hover:scale-105 transition-transform relative">
              <img 
                src={schoolLogo} 
                alt="Dhaka International Language School (DILS) Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <label 
                className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white"
                title="লোগো পরিবর্তন করুন (Upload DILS Logo.jpg)"
              >
                <Camera className="w-4 h-4 text-white" />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleSchoolLogoChange} 
                  className="hidden" 
                />
              </label>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-red-600 transition-colors">
                  DILS Dhaka
                </span>
                <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] px-2 py-0.5 rounded font-bold font-mono">
                  ダッカ国際語学学校
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Dhaka International Language School • Japan Academy
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <a href="#courses" className="hover:text-red-600 transition-colors py-1 flex items-center gap-1">
              <span>📚 কোর্সসমূহ</span>
            </a>
            <a href="#why-dils" className="hover:text-red-600 transition-colors py-1 flex items-center gap-1">
              <span>🌸 কেন DILS?</span>
            </a>
            <button
              onClick={() => onOpenAssessment ? onOpenAssessment() : (window.location.hash = 'assessment')}
              className="text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer font-bold text-xs"
            >
              <Compass className="w-3.5 h-3.5 text-red-600" />
              <span>লেভেল টেস্ট 🇯🇵</span>
            </button>
            <button
              onClick={() => onOpenMembership ? onOpenMembership() : (window.location.hash = 'membership')}
              className="text-slate-700 hover:text-red-600 transition-colors py-1 flex items-center gap-1 cursor-pointer font-semibold text-sm"
            >
              <span>💳 মেম্বারশিপ</span>
            </button>
            <a href="#campus-gallery" className="hover:text-red-600 transition-colors py-1 flex items-center gap-1">
              <span>🏫 ক্যাম্পাস ও জাপান</span>
            </a>
            <a href="#pathway" className="hover:text-red-600 transition-colors py-1 flex items-center gap-1">
              <span>✈️ ভিসা গাইড</span>
            </a>
            <a href="#faculty" className="hover:text-red-600 transition-colors py-1 flex items-center gap-1">
              <span>👨‍🏫 শিক্ষকবৃন্দ</span>
            </a>
            <a href="#batches" className="hover:text-red-600 transition-colors py-1 flex items-center gap-1">
              <span>⏰ ক্লাস রুটিন</span>
            </a>
            <a href="#contact" className="hover:text-red-600 transition-colors py-1 flex items-center gap-1">
              <span>📍 যোগাযোগ</span>
            </a>
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenAdmission && onOpenAdmission()}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 active:scale-98 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>অনলাইন ভর্তি আবেদন 🎓</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-slate-700"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-4 space-y-3 text-sm font-semibold text-slate-800 shadow-xl">
            <a 
              href="#courses" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-stone-100 hover:text-red-600"
            >
              📚 কোর্সসমূহ (Courses)
            </a>
            <a 
              href="#why-dils" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-stone-100 hover:text-red-600"
            >
              🌸 কেন DILS? (Why DILS)
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssessment ? onOpenAssessment() : (window.location.hash = 'assessment');
              }}
              className="w-full text-left py-2 border-b border-stone-100 text-red-600 font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <span>🧭 ফ্রি জাপান লেভেল টেস্ট (Check Level) 🇯🇵</span>
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMembership ? onOpenMembership() : (window.location.hash = 'membership');
              }}
              className="w-full text-left py-2 border-b border-stone-100 text-slate-800 font-bold flex items-center gap-1.5 cursor-pointer hover:text-red-600"
            >
              <span>💳 মেম্বারশিপ প্ল্যান (Membership Tiers)</span>
            </button>
            <a 
              href="#campus-gallery" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-stone-100 hover:text-red-600"
            >
              🏫 ক্যাম্পাস ও জাপান কালচার (Campus & Japan)
            </a>
            <a 
              href="#pathway" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-stone-100 hover:text-red-600"
            >
              ✈️ জাপান ভিসা গাইড (Pathway)
            </a>
            <a 
              href="#faculty" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-stone-100 hover:text-red-600"
            >
              👨‍🏫 শিক্ষকবৃন্দ (Faculty)
            </a>
            <a 
              href="#batches" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-stone-100 hover:text-red-600"
            >
              ⏰ ক্লাস রুটিন (Schedule)
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-red-600"
            >
              📍 সরাসরি যোগাযোগ (Contact)
            </a>

            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmission && onOpenAdmission();
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-center shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>অনলাইন ভর্তি আবেদন 🎓</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          3. HERO SECTION (JAPANESE SCENERY + REAL ACADEMY VIBES + VIDEO TOUR)
         ========================================================================= */}
      <section className="relative bg-gradient-to-b from-white via-stone-50 to-stone-100 py-16 sm:py-24 px-4 sm:px-8 border-b border-stone-200 overflow-hidden">
        
        {/* Soft Traditional Cherry Blossom Aura */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Japanese Academy Copy & Single Primary CTA */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Japanese Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-700 bg-red-50 border border-red-200/80 px-3.5 py-1.5 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              <span>🌸 ダッカ国際語学学校 • জাপানি ভাষা শিক্ষা ও ১০০% ভিসা প্রস্তুতি 🇯🇵</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.2]">
              ঢাকায় সেরা মানে জাপানি ভাষা শিখুন, নিশ্চিত করুন জাপানের ভিসা ও সফল ভবিষ্যৎ
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              JLPT N1 সনদপ্রাপ্ত শিক্ষকের সরাসরি তত্ত্বাবধানে Minna no Nihongo পূর্ণাঙ্গ পাঠদান, নিহোমি স্মার্ট মেমোরি সাপোর্ট এবং শীর্ষস্থানীয় জাপানি ল্যাঙ্গুয়েজ স্কুলে ১০০% বিশ্বস্ত COE ও ভিসা প্রসেসিং।
            </p>

            {/* PRIMARY CTA & LEVEL CHECK BUTTONS */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onOpenAdmission && onOpenAdmission()}
                className="px-7 py-4 bg-red-600 hover:bg-red-700 active:scale-98 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <GraduationCap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>ভর্তি আবেদন করুন (Enroll Now) 🎓</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenAssessment ? onOpenAssessment() : (window.location.hash = 'assessment')}
                className="px-6 py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Compass className="w-5 h-5 text-emerald-200" />
                <span>Check My Japanese Level 🇯🇵</span>
              </button>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="px-5 py-4 bg-white hover:bg-stone-100 text-slate-800 font-bold text-xs sm:text-sm rounded-2xl border border-stone-300 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 ml-0.5 fill-white" />
                </div>
                <span>ভিডিও ট্যুর ▶️</span>
              </button>
            </div>

            {/* Credibility Stats */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-stone-200">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">১,৫০০+ 🇯🇵</div>
                <div className="text-xs text-slate-500 font-medium">সফল শিক্ষার্থী জাপানে</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">১০০% 🏆</div>
                <div className="text-xs text-slate-500 font-medium">COE ও ভিসা সফলতার হার</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">JLPT N1 👨‍🏫</div>
                <div className="text-xs text-slate-500 font-medium">সনদপ্রাপ্ত সিনিয়র শিক্ষক</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">১২+ বছর 🏢</div>
                <div className="text-xs text-slate-500 font-medium">জাপান শিক্ষার বিশ্বস্ত প্রতিষ্ঠান</div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Visual Japanese Academy & Student Showcase */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Classroom Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
              <SmartImage
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80"
                fallbackSrc="https://images.unsplash.com/photo-1528164344705-475426879c0d?w=1000&auto=format&fit=crop&q=80"
                alt="Japanese Academy Students in Classroom"
                className="w-full h-80 sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Shading overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

              {/* Video Play Button Overlay */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-xs border-2 border-white/60"
                aria-label="Play video tour"
              >
                <Play className="w-7 h-7 ml-1 fill-white" />
              </button>

              {/* Bottom Caption on Image */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-1">
                  <Video className="w-3.5 h-3.5" />
                  <span>ভিডিও ট্যুর দেখুন • DILS Virtual Campus Tour</span>
                </div>
                <p className="text-sm font-bold text-white drop-shadow-sm">
                  ফার্মগেট ক্লাসরুম ও জাপান লাইজন ডেস্ক সরাসরি পরিদর্শন 🌸
                </p>
              </div>
            </div>

            {/* Floating Badge 1: 100% COE Visa Approval */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl p-3.5 shadow-xl flex items-center gap-3 z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
                ⭐
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block">১০০% COE ভিসা অনুমোদন</span>
                <span className="text-[10px] text-slate-500 font-medium">Tokyo Immigration Bureau Certified ✓</span>
              </div>
            </motion.div>

            {/* Floating Badge 2: JLPT N1 Faculty Direct Supervision */}
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl p-3.5 shadow-xl flex items-center gap-3 z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-lg">
                🇯🇵
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block">JLPT N1 ও নেটিভ মেন্টর</span>
                <span className="text-[10px] text-slate-500 font-medium">Minna no Nihongo পূর্ণাঙ্গ কোর্স</span>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          4. WHY CHOOSE DILS DHAKA? (当校の特長 - DISTINCTIVE NON-REPEATING PHOTOS)
         ========================================================================= */}
      <section id="why-dils" className="py-20 px-4 sm:px-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-red-600 tracking-widest uppercase flex items-center justify-center gap-1.5">
              <span>🌸</span>
              <span>DILS এর বিশেষত্ব • ACADEMIC EXCELLENCE</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              কেন DILS ঢাকায় আপনার প্রথম ও নির্ভরযোগ্য পছন্দ?
            </h2>
            <p className="text-sm text-slate-600">
              শুধুমাত্র বইয়ের পড়া নয়, জাপানের বাস্তব জীবন ও কর্মক্ষেত্রের জন্য সঠিক ভাষা ও শৃঙ্খলা গড়ার বিশ্বস্ত একাডেমি।
            </p>
          </div>

          {/* 4 Feature Cards with Unique Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Real DILS Classroom Photo */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-stone-50 border border-stone-200 rounded-2xl overflow-hidden hover:border-red-500/50 hover:shadow-lg transition-all flex flex-col"
            >
              <SmartImage
                src="/images/classroom-photo-dils-1.jpeg"
                fallbackSrc="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80"
                alt="DILS Farmgate Classroom"
                className="w-full h-40 object-cover"
              />
              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="text-xs font-bold font-mono text-red-600">01 👨‍🏫 FACULTY LEADERSHIP</div>
                  <h3 className="text-base font-bold text-slate-900">
                    JLPT N1 শিক্ষকের সরাসরি পাঠদান
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ১২+ বছরের বাস্তব অভিজ্ঞতাসম্পন্ন ডিরেক্টর আব্দুর রাজ্জাক (JLPT-N1) ও সিনিয়র শিক্ষক দ্বারা সরাসরি ক্লাসরুম পাঠদান।
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Audio Shadowing Lab */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-stone-50 border border-stone-200 rounded-2xl overflow-hidden hover:border-red-500/50 hover:shadow-lg transition-all flex flex-col"
            >
              <SmartImage
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
                fallbackSrc="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&auto=format&fit=crop&q=80"
                alt="Audio Shadowing Lab"
                className="w-full h-40 object-cover"
              />
              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="text-xs font-bold font-mono text-red-600">02 🎧 AUDIO LAB</div>
                  <h3 className="text-base font-bold text-slate-900">
                    অডিও শ্যাডোয়িং ও স্পিকিং ল্যাব
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    অ্যাকোস্টিক হেডফোনে নেটিভ স্পিকারদের উচ্চারণ অনুসরণ এবং জাপান দূতাবাসের ভিসা ইন্টারভিউয়ের পূর্ণাঙ্গ প্রস্তুতি।
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Nihomi Kanji & Memory SRS */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-stone-50 border border-stone-200 rounded-2xl overflow-hidden hover:border-red-500/50 hover:shadow-lg transition-all flex flex-col"
            >
              <SmartImage
                src="https://images.unsplash.com/photo-1528747045269-390fe33c19f2?w=600&auto=format&fit=crop&q=80"
                fallbackSrc="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&auto=format&fit=crop&q=80"
                alt="Japanese Kanji and Calligraphy"
                className="w-full h-40 object-cover"
              />
              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="text-xs font-bold font-mono text-red-600">03 🧠 MEMORY ENGINE</div>
                  <h3 className="text-base font-bold text-slate-900">
                    নিহোমি বৈজ্ঞানিক মেমোরি সাপোর্ট
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    স্পেসড রিপিটেশন (SRS) প্রযুক্তির মাধ্যমে কঠিন কাঞ্জি ও ভোকাবুলারি স্থায়ীভাবে স্মৃতিতে ধরে রাখার বিজ্ঞানসম্মত পদ্ধতি।
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Tokyo Arrival & 100% Visa */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-stone-50 border border-stone-200 rounded-2xl overflow-hidden hover:border-red-500/50 hover:shadow-lg transition-all flex flex-col"
            >
              <SmartImage
                src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80"
                fallbackSrc="https://images.unsplash.com/photo-1528164344705-475426879c0d?w=600&auto=format&fit=crop&q=80"
                alt="Tokyo Shinjuku Arrival"
                className="w-full h-40 object-cover"
              />
              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="text-xs font-bold font-mono text-red-600">04 ✈️ 100% VISA AUDIT</div>
                  <h3 className="text-base font-bold text-slate-900">
                    ১০০% নিখুঁত COE ও ভিসা অডিট
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    টোকিও ইমিগ্রেশন নীতিমালার শতভাগ পরিপালন করে জিরো-রিজেকশন ফাইল অডিট ও দ্রুততম ভিসা নিশ্চিতকরণ।
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          5. NEW SECTION: REAL CAMPUS & JAPAN CULTURAL GALLERY (AUTHENTIC PHOTOS)
         ========================================================================= */}
      <section id="campus-gallery" className="py-20 px-4 sm:px-8 bg-stone-100/70 border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-red-600 tracking-widest uppercase flex items-center justify-center gap-1.5">
              <span>🏫</span>
              <span>ক্যাম্পাস ও জাপান অভিজ্ঞতা • CAMPUS & JAPAN CULTURE</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              DILS ফার্মগেট ক্যাম্পাস ও জাপানিজ কালচারাল গ্যালারি
            </h2>
            <p className="text-sm text-slate-600">
              আমাদের ফার্মগেট ক্লাসরুমের আধুনিক আয়োজন এবং জাপানের অপরূপ দৃশ্য ও সমৃদ্ধ সংস্কৃতি।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Gallery Item 1: Real DILS Classroom (Wide) */}
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group">
              <div className="h-48 overflow-hidden relative">
                <SmartImage
                  src="/images/classroom-photo-dils-2.jpeg"
                  fallbackSrc="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&auto=format&fit=crop&q=80"
                  alt="DILS Language Classroom"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                  ফার্মগেট ক্লাসরুম
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-slate-900">ডিআইএলএস ল্যাঙ্গুয়েজ ল্যাব</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  হোয়াইটবোর্ড, আরামদায়ক স্টাডি চেয়ার ও জাপানি চার্ট সম্বলিত শীতাতপ নিয়ন্ত্রিত ক্লাসরুম।
                </p>
              </div>
            </div>

            {/* Gallery Item 2: Farmgate Location Overview */}
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group">
              <div className="h-48 overflow-hidden relative">
                <SmartImage
                  src="/images/farmgate-school-location.jpeg"
                  fallbackSrc="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=80"
                  alt="Farmgate School Location and Metro Rail"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                  মেট্রো রেল সংলগ্ন
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-slate-900">ফার্মগেট সেন্ট্রাল লোকেশন</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  বিটিআই সেন্ট্রাল প্লাজা, ৯৫ গ্রিন রোড: ফার্মগেট মেট্রো রেল স্টেশনের ঠিক পাশেই সুবিধাজনক যাতায়াত।
                </p>
              </div>
            </div>

            {/* Gallery Item 3: Japanese Tea Culture & Manners */}
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group">
              <div className="h-48 overflow-hidden relative">
                <SmartImage
                  src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80"
                  fallbackSrc="https://images.unsplash.com/photo-1528747045269-390fe33c19f2?w=600&auto=format&fit=crop&q=80"
                  alt="Japanese Tea Ceremony and Etiquette"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                  জাপানি সংস্কৃতি 🌸
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-slate-900">কালচার ও করপোরেট শিষ্টাচার</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  জাপানের সামাজিক রীতিনীতি, বাউইং (ওজিগি) এবং কর্মক্ষেত্রের আদব-কায়দার বাস্তব প্রশিক্ষণ।
                </p>
              </div>
            </div>

            {/* Gallery Item 4: Mount Fuji & Japan Landscape */}
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group">
              <div className="h-48 overflow-hidden relative">
                <SmartImage
                  src="https://images.unsplash.com/photo-1528164344705-475426879c0d?w=600&auto=format&fit=crop&q=80"
                  fallbackSrc="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80"
                  alt="Mount Fuji and Cherry Blossoms"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                  টোকিও ও কিয়োটো 🇯🇵
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-slate-900">জাপানের অপার সৌন্দর্য</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  মাউন্ট ফুজি, সাকুরা ও আধুনিক প্রযুক্তির দেশ জাপানে আপনার উজ্জ্বল ভবিষ্যৎ গড়ে তোলার সুযোগ।
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          6. COURSE CATALOG (CLEAN GRID-BASED CARDS WITH UNIQUE PHOTOS)
         ========================================================================= */}
      <section id="courses" className="py-20 px-4 sm:px-8 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-red-600 tracking-widest uppercase flex items-center justify-center gap-1.5">
              <span>📚</span>
              <span>কোর্স কারিকুলাম • COURSE CATALOG</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              আপনার লক্ষ্য অনুযায়ী জাপানি ভাষা কোর্সসমূহ
            </h2>
            <p className="text-sm text-slate-600">
              জাপানে উচ্চশিক্ষা, স্টুডেন্ট ভিসা ও স্পেসিফাইড স্কিল্ড ওয়ার্কার (SSW) জব ভিসার জন্য প্রস্তুতকৃত সুনির্দিষ্ট কোর্সসমূহ।
            </p>
          </div>

          {/* 4 Clean Grid Cards with UNIQUE Photo Headers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Course 1: JLPT N5 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-white border-2 border-stone-200 hover:border-red-600 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative">
                  <SmartImage
                    src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80"
                    fallbackSrc="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80"
                    alt="JLPT N5 Foundation Course"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                    JLPT N5 & NAT 5Q 🎓
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                    Level: Beginner (N5)
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    JLPT N5 ও NAT-TEST 5Q কমপ্লিট কোর্স
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    হিরাগানা, কাতাকানা, মিন্না নো নিহোঙ্গো ১-২৫ অধ্যায় এবং প্রাথমিক কাঞ্জি ও মডেল টেস্ট ড্রিল।
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between mt-4">
                <span className="text-sm font-black text-slate-900 font-serif">৳১২,০০০</span>
                <button
                  onClick={() => {
                    const c = courses.find(item => item.id === 'c-jp-n5') || courses[0];
                    setSelectedCourseDetail(c);
                  }}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors cursor-pointer group"
                >
                  <span>View Details (বিস্তারিত)</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Course 2: JLPT N4 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-white border-2 border-red-600 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col justify-between relative"
            >
              <div>
                <div className="relative">
                  <SmartImage
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=80"
                    fallbackSrc="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&auto=format&fit=crop&q=80"
                    alt="JLPT N4 SSW Work Track"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                    JLPT N4 & SSW 💼
                  </div>
                  <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                    জনপ্রিয় ⭐
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                    Level: Intermediate (N4)
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    JLPT N4 ইন্টারমিডিয়েট ও স্টুডেন্ট ভিসা ট্র্যাক
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    মিন্না নো নিহোঙ্গো ২৬-৫০ অধ্যায়, ৩০০টি কাঞ্জি এবং জাপানি ভাষায় বাক্যগঠন ও লিসেনিং দক্ষতা।
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between mt-4">
                <span className="text-sm font-black text-slate-900 font-serif">৳১৪,০০০</span>
                <button
                  onClick={() => {
                    const c = courses.find(item => item.id === 'c-jp-n4') || courses[1] || courses[0];
                    setSelectedCourseDetail(c);
                  }}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors cursor-pointer group"
                >
                  <span>View Details (বিস্তারিত)</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Course 3: SSW Tokutei Ginou */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-white border-2 border-stone-200 hover:border-red-600 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative">
                  <SmartImage
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80"
                    fallbackSrc="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&auto=format&fit=crop&q=80"
                    alt="SSW Tokutei Ginou Skills"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                    SSW JOB TRACK 🛠️
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                    Level: SSW Job Track
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    SSW ওয়ার্ক ভিসা ও টেকনিক্যাল প্রিপারেশন
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    কেয়ারগিভার, ফুড সার্ভিস ও হসপিটালিটি সেক্টরের কারিগরি জাপানি এবং JFT-Basic সিবিটি টেস্ট ড্রিল।
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between mt-4">
                <span className="text-sm font-black text-slate-900 font-serif">৳১৮,০০০</span>
                <button
                  onClick={() => {
                    const c = courses.find(item => item.id === 'c-jp-ssw') || courses[2] || courses[0];
                    setSelectedCourseDetail(c);
                  }}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors cursor-pointer group"
                >
                  <span>View Details (বিস্তারিত)</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Course 4: JLPT N3 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-white border-2 border-stone-200 hover:border-red-600 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative">
                  <SmartImage
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80"
                    fallbackSrc="https://images.unsplash.com/photo-1528164344705-475426879c0d?w=600&auto=format&fit=crop&q=80"
                    alt="JLPT N3 Advanced Career Track"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                    JLPT N3 ADVANCED 🚀
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                    Level: Advanced (N3)
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    JLPT N3 উচ্চতর ক্যারিয়ার ও বিজনেস কেইগো
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    উন্নত ব্যাকরণ, বিজনেস শিষ্টাচার (Sonkeigo & Kenjougo) এবং জাপানি আইটি ও করপোরেট জব ইন্টারভিউ প্রস্তুতি।
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between mt-4">
                <span className="text-sm font-black text-slate-900 font-serif">৳১৮,০০০</span>
                <button
                  onClick={() => {
                    const c = courses.find(item => item.id === 'c-jp-n3') || courses[3] || courses[0];
                    setSelectedCourseDetail(c);
                  }}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors cursor-pointer group"
                >
                  <span>View Details (বিস্তারিত)</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          7. 5-STEP JOURNEY TO JAPAN (日本留学への道 - TRANSPARENT ROADMAP)
         ========================================================================= */}
      <section id="pathway" className="py-20 px-4 sm:px-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-red-600 tracking-widest uppercase flex items-center justify-center gap-1.5">
              <span>✈️</span>
              <span>জাপান ভিসা গাইড • 5 STEPS ROADMAP</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              বাংলাদেশ থেকে জাপান: নিশ্চিত সাফল্যের ৫টি ধাপ
            </h2>
            <p className="text-sm text-slate-600">
              ভর্তি হওয়া থেকে জাপানে বিমান অবতরণ পর্যন্ত আমাদের প্রতিটি পদক্ষেপ স্বচ্ছ ও পরীক্ষিত।
            </p>
          </div>

          {/* 5 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-2 hover:border-red-500/50 transition-all">
              <span className="text-xs font-mono font-bold text-red-600">STEP 01 📚</span>
              <h4 className="text-sm font-bold text-slate-900">ভর্তি ও ভাষা শিক্ষা</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                DILS ক্লাসরুমে নিয়মিত Minna no Nihongo পাঠদান ও নিহোমিতে প্রতিদিনের রিভিশন সম্পন্ন করা।
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-2 hover:border-red-500/50 transition-all">
              <span className="text-xs font-mono font-bold text-red-600">STEP 02 ✍️</span>
              <h4 className="text-sm font-bold text-slate-900">NAT-TEST / JLPT</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                অফিশিয়াল মডেল টেস্টের মাধ্যমে শতভাগ প্রস্তুতি নিয়ে সরকারি পরীক্ষায় প্রথম সুযোগেই পাস করা।
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-2 hover:border-red-500/50 transition-all">
              <span className="text-xs font-mono font-bold text-red-600">STEP 03 🏢</span>
              <h4 className="text-sm font-bold text-slate-900">ডকুমেন্টস ও ফাইল অডিট</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                টোকিও বা ওসাকার অনুমোদিত প্রতিষ্ঠানে আবেদন ও স্পন্সর পেপারসের কঠোর অডিট সম্পন্ন করা।
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-2 hover:border-red-500/50 transition-all">
              <span className="text-xs font-mono font-bold text-red-600">STEP 04 📜</span>
              <h4 className="text-sm font-bold text-slate-900">COE (ভিসা অনুমোদন)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                জাপান সরকারের ইমিগ্রেশন ব্যুরো থেকে অফিসিয়াল Certificate of Eligibility (COE) অর্জন।
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-2 hover:border-red-500/50 transition-all">
              <span className="text-xs font-mono font-bold text-red-600">STEP 05 ✈️</span>
              <h4 className="text-sm font-bold text-slate-900">দূতাবাস ভিসা ও শুভযাত্রা</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                ঢাকায় জাপান দূতাবাসে ভিসা স্ট্যাম্পিং, প্রি-ডিপার্চার ব্রিফিং এবং টোকিও যাত্রা।
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          8. FACULTY LEADERSHIP (ACTUAL RAZZAK SIR PHOTO & VERIFIED CREDENTIALS)
         ========================================================================= */}
      <section id="faculty" className="py-20 px-4 sm:px-8 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-red-600 tracking-widest uppercase flex items-center justify-center gap-1.5">
              <span>👨‍🏫</span>
              <span>অভিজ্ঞ শিক্ষকবৃন্দ • OUR FACULTY</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              জাপানে অভিজ্ঞ ও সনদপ্রাপ্ত শিক্ষকদের তত্ত্বাবধান
            </h2>
            <p className="text-sm text-slate-600">
              জাপানে দীর্ঘকাল বসবাস ও শিক্ষাদানের বাস্তব অভিজ্ঞতা সম্পন্ন সনদপ্রাপ্ত মেন্টরশিপ।
            </p>
          </div>

          {/* 3 Instructors with Real Verified Photos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Director Abdur Razzak - Real Official Photo */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-white border-2 border-red-500/40 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-xl transition-all relative"
            >
              <div className="flex items-center gap-4">
                <SmartImage
                  src={directorPhoto}
                  fallbackSrc="/images/razzak-photo.jpg"
                  alt="MD. ABDUR RAZZAK - Director DILS"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-red-200 shadow-md bg-stone-100"
                />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">MD. ABDUR RAZZAK</h3>
                  <div className="text-xs text-red-600 font-bold font-mono">
                    Director, DILS (JLPT-N1) 👨‍💼
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    ১২+ বছর জাপান ইমিগ্রেশন ও শিক্ষকতা
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-stone-100">
                ১,৫০০+ শিক্ষার্থীর ফাইল সফলভাবে প্রসেস করে শতভাগ COE নিশ্চিত করেছেন। Minna no Nihongo ও এম্বাসি ইন্টারভিউ স্পেশালিস্ট।
              </p>
              <div className="text-[11px] text-slate-500 font-medium">
                বিশেষত্ব: Minna no Nihongo, COE অডিট, এম্বাসি ইন্টারভিউ
              </div>
            </motion.div>

            {/* Tanvir Kabir Biplob */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-white border border-stone-200 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4">
                <SmartImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
                  fallbackSrc="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80"
                  alt="Tanvir Kabir Biplob"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-stone-100 shadow-sm"
                />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">Tanvir Kabir Biplob</h3>
                  <div className="text-xs text-red-600 font-bold font-mono">
                    Senior Instructor (JLPT-N2) 👨‍🏫
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    সিনিয়র কাউন্সেলর ও ভাষা শিক্ষক
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-stone-100">
                মিন্না নো নিহোঙ্গো ব্যাকরণ, কাঞ্জি মুখস্থের সহজ কৌশল এবং পরীক্ষায় সর্বোচ্চ নম্বর নিশ্চিতের বিশেষ পদ্ধতির জন্য জনপ্রিয়।
              </p>
              <div className="text-[11px] text-slate-500 font-medium">
                বিশেষত্ব: N5/N4 সিলেবাস, কাঞ্জি মেমোরি, মডেল টেস্ট
              </div>
            </motion.div>

            {/* Sensei Kenji Takahashi */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-white border border-stone-200 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4">
                <SmartImage
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80"
                  fallbackSrc="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80"
                  alt="Sensei Kenji Takahashi"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-stone-100 shadow-sm"
                />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">Sensei Kenji Takahashi</h3>
                  <div className="text-xs text-red-600 font-bold font-mono">
                    Native Pronunciation Advisor 🇯🇵
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    টোকিও বিশ্ববিদ্যালয় প্রাক্তন শিক্ষার্থী
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-stone-100">
                শুদ্ধ উচ্চারণ, প্রমিত পিচ এক্সেন্ট, দৈনন্দিন স্পোকেন জাপানিজ এবং জাপানি করপোরেট শিষ্টাচারের পরামর্শক।
              </p>
              <div className="text-[11px] text-slate-500 font-medium">
                বিশেষত্ব: স্পোকেন জাপানিজ, শ্যাডোয়িং ল্যাব, বিজনেস ম্যানার
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          8.5. DIRECTOR'S DESK: MESSAGE FROM MD. ABDUR RAZZAK
         ========================================================================= */}
      <section id="director" className="py-20 px-4 sm:px-8 bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-900/90 border-2 border-red-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Director Photo & Official Seal Badge */}
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-amber-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                  <div className="relative w-48 sm:w-56 h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-red-500/50 bg-slate-950 shadow-2xl">
                    <img
                      src={directorPhoto}
                      alt="MD. ABDUR RAZZAK - Academy Director, DILS"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />

                    {/* Quick Image Upload Overlay */}
                    <label 
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 cursor-pointer text-white p-3 text-center"
                      title="রাজ্জাক স্যারের ছবি পরিবর্তন বা আপলোড করুন"
                    >
                      <Camera className="w-7 h-7 text-amber-400" />
                      <span className="text-xs font-bold">ছবি আপলোড করুন</span>
                      <span className="text-[10px] text-slate-300 font-mono">(Select Razzak Photo.jpg)</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleDirectorPhotoChange} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                  {/* DILS Official Circular Seal Badge */}
                  <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full bg-white p-1 border-2 border-red-600 shadow-xl flex items-center justify-center">
                    <img 
                      src={schoolLogo} 
                      alt="DILS Seal" 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white">MD. ABDUR RAZZAK</h3>
                  <div className="text-xs font-bold text-red-400 font-mono">
                    Academy Director &amp; Senior Japanese Trainer (JLPT N1)
                  </div>
                  <p className="text-[11px] text-slate-400">
                    ঢাকা ইন্টারন্যাশনাল ল্যাঙ্গুয়েজ স্কুল ও ভিসা সেন্টার
                  </p>
                </div>
              </div>

              {/* Director's Official Statement & Mission */}
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/80 px-3 py-1 rounded-full">
                  <span>🏛️ DIRECTOR'S STATEMENT • পরিচালক মহোদয়ের বার্তা</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  "সঠিক জাপানি ভাষা ও বিশ্বস্ত নির্দেশনার ওপর ভিত্তি করেই গড়ে ওঠে জাপানের উজ্জ্বল ভবিষ্যৎ।"
                </h2>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <p>
                    বিগত এক যুগেরও বেশি সময় ধরে আমরা নিষ্ঠা ও সততার সাথে বাংলাদেশি শিক্ষার্থীদের জাপানের শীর্ষস্থানীয় ল্যাঙ্গুয়েজ স্কুল, ভোকেশনাল কলেজ, বিশ্ববিদ্যালয় এবং কোম্পানিতে সফলভাবে পৌঁছানোর কাজ করছি।
                  </p>
                  <p>
                    জাপানে উচ্চশিক্ষার জন্য কেবল একটি ভর্তি ফরম পূরণ করাই যথেষ্ট নয়; জাপানের ইমিগ্রেশন ও এম্বাসির শর্তানুযায়ী বাস্তবসম্মত জাপানি ভাষা দক্ষতা (JLPT/NAT), নিখুঁত ব্যাংক স্পনসর ডকুমেন্টেশন এবং আত্মবিশ্বাসী ইন্টারভিউ প্রস্তুতিই হচ্ছে শতভাগ ভিসা ও সিওই (COE) পাওয়ার মূল চাবিকাঠি।
                  </p>
                  <p className="text-amber-200/90 font-medium">
                    আমাদের ফার্মগেট ক্যাম্পাসে প্রতিটি শিক্ষার্থীকে ব্যক্তিগতভাবে নিরীক্ষণ ও নিবিড় মেন্টরিং দেওয়া হয়। আপনার জাপান যাত্রায় DILS পরিবার সর্বদা অভিভাবক হয়ে আপনার পাশে রয়েছে।
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 font-mono block">সরাসরি পরিচালকের সাথে যোগাযোগ:</span>
                    <div className="flex items-center gap-3 font-mono text-xs text-white">
                      <span className="text-emerald-400 font-bold">+880 1711-239845</span>
                      <span>•</span>
                      <span className="text-slate-300">+880 1764-395945</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href="https://wa.me/8801711239845?text=আসসালামু%20আলাইকুম%20রাজ্জাক%20স্যার,%20আমি%20DILS%20থেকে%20জাপান%20ভিসা%20ও%20কোর্স%20সম্পর্কে%20জানতে%20চাই।"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/50 transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>পরিচালক স্যারকে WhatsApp করুন</span>
                      <span>📲</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. BATCH SCHEDULE (CLASSES & ROUTINE)
         ========================================================================= */}
      <section id="batches" className="py-20 px-4 sm:px-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-red-600 tracking-widest uppercase flex items-center justify-center gap-1.5">
              <span>⏰</span>
              <span>ক্লাস রুটিন • BATCH ROUTINE</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              আসন্ন ব্যাচ ও ক্লাসের সময়সূচি
            </h2>
            <p className="text-sm text-slate-600">
              কলেজ শিক্ষার্থী, চাকুরিজীবী ও দূরবর্তী শিক্ষার্থীদের জন্য সুপরিকল্পিত তিনটি সুবিধাজনক সময়।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="border border-stone-200 rounded-2xl p-6 space-y-3 bg-stone-50 hover:border-red-500/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  🌅 সকালের ব্যাচ (Morning)
                </span>
                <span className="text-xs bg-red-100 text-red-700 px-2.5 py-0.5 rounded font-bold font-mono">
                  10:00 AM - 12:00 PM
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-800">রবি, মঙ্গল, বৃহস্পতি</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                কলেজ ও বিশ্ববিদ্যালয়ের শিক্ষার্থীদের জন্য সবচেয়ে উপযোগী।
              </p>
            </div>

            <div className="border border-stone-200 rounded-2xl p-6 space-y-3 bg-stone-50 hover:border-red-500/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  🌆 সান্ধ্যকালীন ব্যাচ (Evening)
                </span>
                <span className="text-xs bg-red-100 text-red-700 px-2.5 py-0.5 rounded font-bold font-mono">
                  06:00 PM - 08:00 PM
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-800">রবি, মঙ্গল, বৃহস্পতি</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                চাকুরিজীবী ও অফিস সময়ের পর ভাষা শিখতে আগ্রহীদের জন্য।
              </p>
            </div>

            <div className="border border-stone-200 rounded-2xl p-6 space-y-3 bg-stone-50 hover:border-red-500/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  🗓️ উইকেন্ড স্পেশাল (Weekend)
                </span>
                <span className="text-xs bg-red-100 text-red-700 px-2.5 py-0.5 rounded font-bold font-mono">
                  09:00 AM - 01:00 PM
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-800">শুক্রবার ও শনিবার</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                ছুটির দিনে টানা নিবিড় অনুশীলনে দ্রুত সিলেবাস সম্পন্ন করার সুযোগ।
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          10. VERIFIED ALUMNI SUCCESS (REAL PHOTOS & TESTIMONIALS)
         ========================================================================= */}
      <section id="success" className="py-20 px-4 sm:px-8 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-red-600 tracking-widest uppercase flex items-center justify-center gap-1.5">
              <span>🏆</span>
              <span>ভিসা সাফল্য • ALUMNI SUCCESS</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              DILS থেকে শতভাগ ভিসা পেয়ে যারা এখন জাপানে
            </h2>
            <p className="text-sm text-slate-600">
              টোকিও, ওসাকা ও কিয়োটোর স্বনামধন্য প্রতিষ্ঠানে অধ্যয়নরত আমাদের সফল শিক্ষার্থীদের অভিজ্ঞতা।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VISA_SUCCESS_STORIES.slice(0, 3).map((st) => (
              <motion.div 
                key={st.id} 
                whileHover={{ y: -6 }}
                className="bg-white border border-stone-200 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <SmartImage
                    src={st.studentPhoto}
                    fallbackSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                    alt={st.studentName}
                    className="w-14 h-14 rounded-2xl object-cover border border-stone-100 shadow-xs"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{st.studentName}</h4>
                    <span className="text-xs text-red-600 font-semibold block">{st.institutionInJapan}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{st.destinationCity} 🇯🇵</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{st.testimonialBn || st.testimonial}"
                </p>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-emerald-700 font-medium font-mono">
                  <span>{st.passingScore}</span>
                  <span className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    COE Approved ✓
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          11. CONTACT & FREE COUNSELING (来校予約・お問い合わせ)
         ========================================================================= */}
      <section id="contact" className="py-20 px-4 sm:px-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-bold text-red-600 tracking-widest uppercase flex items-center gap-1.5">
              <span>📍</span>
              <span>সরাসরি যোগাযোগ ও কাউন্সেলিং • GET IN TOUCH</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              আপনার জাপান যাত্রার সঠিক দিকনির্দেশনা নিন আজই 🌸
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              জাপানি ভাষা শিক্ষা, ভর্তি প্রক্রিয়া অথবা ভিসা সংক্রান্ত যেকোনো তথ্যের জন্য আমাদের ফার্মগেট ক্যাম্পাসে সরাসরি আসুন অথবা ফর্মটি পূরণ করে সাবমিট করুন।
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">ফার্মগেট ক্যাম্পাস (ঢাকা):</strong>
                  <span>{DILS_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900 font-semibold">হটলাইন ও ভর্তি তথ্য:</strong>
                  <span className="font-mono text-emerald-700 font-bold">{DILS_INFO.hotline}</span>
                  <span className="text-slate-500 ml-2">/ WhatsApp: {DILS_INFO.whatsapp}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900 font-semibold">অফিসিয়াল ইমেইল:</strong>
                  <span className="text-slate-600 font-mono">{DILS_INFO.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-3xl p-7 sm:p-8 space-y-5 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900">
              ফ্রি কাউন্সেলিং বুক করুন (Free Counseling) 📝
            </h3>
            <p className="text-xs text-slate-500">
              আপনার তথ্য দিন, আমাদের সিনিয়র কাউন্সেলর খুব দ্রুত যোগাযোগ করবেন।
            </p>

            {consultSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs space-y-1 text-center font-medium">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="font-bold">ধন্যবাদ! আপনার আবেদনটি সফলভাবে গৃহীত হয়েছে।</p>
                <p className="text-slate-600">আমাদের সিনিয়র কাউন্সেলর শীঘ্রই আপনার সাথে ফোনে কথা বলবেন।</p>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">আপনার পূর্ণ নাম *</label>
                  <input
                    type="text"
                    required
                    value={consultName}
                    onChange={(e) => setConsultName(e.target.value)}
                    placeholder="e.g. Md. Tanvir Hasan"
                    className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-xs focus:outline-none focus:border-red-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">ফোন নম্বর (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      placeholder="+880 1819-000000"
                      className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-xs focus:outline-none focus:border-red-600 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">টার্গেট ইনটেক</label>
                    <select
                      value={consultIntake}
                      onChange={(e) => setConsultIntake(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-xs focus:outline-none focus:border-red-600"
                    >
                      <option value="October 2026 Intake">অক্টোবর ২০২৬ ইনটেক</option>
                      <option value="April 2027 Intake">এপ্রিল ২০২৭ ইনটেক</option>
                      <option value="July 2027 Intake">জুলাই ২০২৭ ইনটেক</option>
                      <option value="SSW Job Visa">এসএসডব্লিউ জব ভিসা</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">আগ্রহের কোর্স</label>
                  <select
                    value={consultCourse}
                    onChange={(e) => setConsultCourse(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-xs focus:outline-none focus:border-red-600"
                  >
                    <option value="Japanese JLPT N5 Complete Mastery">JLPT N5 ও NAT-TEST 5Q (ভিসা স্পেশাল)</option>
                    <option value="Japanese JLPT N4 Intermediate">JLPT N4 ও এসএসডব্লিউ (SSW) জব ট্র্যাক</option>
                    <option value="Specified Skilled Worker SSW">SSW টেকনিক্যাল প্রিপারেশন</option>
                    <option value="Japanese JLPT N3 Advanced">JLPT N3 উচ্চতর ক্যারিয়ার ট্র্যাক</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">কোনো মন্তব্য থাকলে লিখুন (ঐচ্ছিক)</label>
                  <textarea
                    rows={2}
                    value={consultMsg}
                    onChange={(e) => setConsultMsg(e.target.value)}
                    placeholder="আপনার শিক্ষাগত যোগ্যতা বা জিজ্ঞাসা..."
                    className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-xs focus:outline-none focus:border-red-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:scale-98 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>কাউন্সেলিং অনুরোধ জমা দিন 🚀</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* =========================================================================
          12. ELEGANT INSTITUTIONAL FOOTER
         ========================================================================= */}
      <footer className="bg-[#0F172A] text-slate-400 text-xs py-12 px-4 sm:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white p-0.5 border-2 border-red-500/40 flex items-center justify-center shrink-0 overflow-hidden shadow-md">
                  <img 
                    src={schoolLogo} 
                    alt="DILS Logo" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-white font-black text-base tracking-tight block">DILS Dhaka</span>
                  <span className="text-[10px] text-slate-400 font-mono">Dhaka International Language School</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                ঢাকা ইন্টারন্যাশনাল ল্যাঙ্গুয়েজ স্কুল (DILS) — জাপানি ভাষা শিক্ষা ও জাপানে উচ্চশিক্ষা ও কর্মসংস্থানে বাংলাদেশের অন্যতম শীর্ষস্থানীয় ও বিশ্বস্ত একাডেমি।
              </p>
              <div className="text-[11px] text-slate-500 font-mono">
                ダッカ国際語学学校 • Dhaka International Language School
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-white font-bold text-xs">কোর্স ও সেবা</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><a href="#courses" className="hover:text-white transition-colors">JLPT N5 ও NAT 5Q</a></li>
                <li><a href="#courses" className="hover:text-white transition-colors">JLPT N4 ও SSW জব ভিসা</a></li>
                <li><a href="#courses" className="hover:text-white transition-colors">JLPT N3 ক্যারিয়ার ট্র্যাক</a></li>
                <li><a href="#pathway" className="hover:text-white transition-colors">জাপান ভিসা ও সিওই গাইড</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="text-white font-bold text-xs">জরুরি লিংক ও পোর্টাল</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li>
                  <button 
                    onClick={() => onOpenValidator && onOpenValidator('DILS-CERT-2026-0048')}
                    className="hover:text-white text-left transition-colors cursor-pointer"
                  >
                    সার্টিফিকেট ভেরিফিকেশন
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onOpenLogin && onOpenLogin('student')}
                    className="hover:text-white text-left transition-colors cursor-pointer"
                  >
                    শিক্ষার্থী LMS লগইন
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onOpenLogin && onOpenLogin('admin')}
                    className="hover:text-white text-left transition-colors cursor-pointer"
                  >
                    এডমিন CRM ও স্টাফ পোর্টাল
                  </button>
                </li>
                <li>
                  <a href={DILS_INFO.facebook} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">
                    অফিসিয়াল ফেসবুক পেজ →
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © 2026 Dhaka International Language School (DILS). All Rights Reserved.
            </div>
            <div className="flex items-center gap-3">
              <span>Farmgate Campus, Dhaka</span>
              <span>·</span>
              <a href="https://www.dilsbd.com" className="text-slate-400 hover:text-white">dilsbd.com</a>
            </div>
          </div>

        </div>
      </footer>

      {/* =========================================================================
          13. INTERACTIVE ACADEMY VIDEO TOUR MODAL
         ========================================================================= */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl relative"
            >
              <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-600" />
                  <span className="text-sm font-bold text-white">
                    DILS ঢাকা ও জাপান একাডেমি ভিডিও ট্যুর ▶️
                  </span>
                </div>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video w-full bg-black">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/v9Ym_LhB5t4?autoplay=1"
                  title="DILS Japanese Academy Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-4 bg-slate-950 text-xs text-slate-400 flex items-center justify-between">
                <span>ফার্মগেট ক্যাম্পাস • Minna no Nihongo অডিও ল্যাব • টোকিও ইমিগ্রেশন সাপোর্ট</span>
                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    onOpenAdmission && onOpenAdmission();
                  }}
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs cursor-pointer"
                >
                  ভর্তি আবেদন করুন 🎓
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          14. COURSE DETAILS MODAL (FROM 'View Details' LINK)
         ========================================================================= */}
      <AnimatePresence>
        {selectedCourseDetail && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-stone-200"
            >
              <button
                onClick={() => setSelectedCourseDetail(null)}
                className="absolute top-5 right-5 p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-red-600 uppercase bg-red-50 px-2.5 py-0.5 rounded">
                  {selectedCourseDetail.level}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedCourseDetail.titleBn || selectedCourseDetail.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedCourseDetail.duration} • {selectedCourseDetail.classesCount} Classes
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedCourseDetail.descriptionBn || selectedCourseDetail.description}
              </p>

              {selectedCourseDetail.syllabus && (
                <div className="space-y-2 border-t border-stone-100 pt-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">সিলেবাস সংক্ষেপ:</h4>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    {selectedCourseDetail.syllabus.slice(0, 3).map((s, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>{s.week}:</strong> {s.topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 block">কোর্স ফি:</span>
                  <span className="text-2xl font-black text-slate-900 font-serif">৳{selectedCourseDetail.discountPrice?.toLocaleString() || selectedCourseDetail.price?.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => {
                    const cId = selectedCourseDetail.id;
                    setSelectedCourseDetail(null);
                    onOpenAdmission && onOpenAdmission(cId);
                  }}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>এখনই ভর্তি আবেদন করুন 🎓</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default JapaneseCorporateLanding;
