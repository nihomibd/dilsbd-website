import React, { useState } from 'react';
import { Course, LanguageCategory, LangMode, Trainer } from '../types';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Users, 
  Star, 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  GraduationCap, 
  FileText, 
  Sparkles,
  MapPin,
  ExternalLink,
  ChevronRight,
  MessageCircle,
  PhoneCall,
  Facebook,
  Award,
  Compass
} from 'lucide-react';
import { VisaSuccessGallery } from './VisaSuccessGallery';
import { VisaAssessmentCalculator } from './VisaAssessmentCalculator';
import { StudentJourney } from './StudentJourney';
import { DILS_INFO } from '../data/mockData';

interface PortalWebsiteProps {
  courses: Course[];
  trainers: Trainer[];
  notices: { id: string; date: string; title: string; titleBn: string; tag: string; isNew: boolean }[];
  lang: LangMode;
  onOpenAdmission: (courseId?: string) => void;
  onOpenValidator: (certId?: string) => void;
  onSwitchToStudentPortal: (courseId: string) => void;
}

export const PortalWebsite: React.FC<PortalWebsiteProps> = ({
  courses,
  trainers,
  notices,
  lang,
  onOpenAdmission,
  onOpenValidator,
  onSwitchToStudentPortal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<LanguageCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [quickCertId, setQuickCertId] = useState('DILS-CERT-2026-0048');

  // Filter courses
  const filteredCourses = courses.filter((c) => {
    const matchesCat = selectedCategory === 'all' || c.language === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.level.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categories: { id: LanguageCategory; labelBn: string; labelEn: string; count: number }[] = [
    { id: 'all', labelBn: 'সকল কোর্স', labelEn: 'All Courses', count: courses.length },
    { id: 'japanese', labelBn: 'জাপানি (JLPT/NAT)', labelEn: 'Japanese', count: courses.filter(c => c.language === 'japanese').length },
    { id: 'german', labelBn: 'জার্মান (Goethe A1/A2)', labelEn: 'German', count: courses.filter(c => c.language === 'german').length },
    { id: 'ielts', labelBn: 'আইইএলটিএস (IELTS 7.5+)', labelEn: 'IELTS', count: courses.filter(c => c.language === 'ielts').length },
    { id: 'korean', labelBn: 'কোরিয়ান (EPS-TOPIK)', labelEn: 'Korean', count: courses.filter(c => c.language === 'korean').length },
    { id: 'french', labelBn: 'ফ্রেঞ্চ (DELF A1)', labelEn: 'French', count: courses.filter(c => c.language === 'french').length }
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION (Dynamic Sliders & High Converting CTA) */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 via-slate-950 to-[#020617]">
        {/* Decorative lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-red-600/10 blur-3xl pointer-events-none rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              
              {/* Unity Core Tech Proposal & Accreditation Badge */}
              <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-red-500/30 text-red-300 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-inner">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>
                  {lang === 'bn' 
                    ? "ঢাকা ইন্টারন্যাশনাল ল্যাঙ্গুয়েজ স্কুল ও এন্টারপ্রাইজ LMS ইকোসিস্টেম" 
                    : "Dhaka International Language School & Enterprise LMS Ecosystem"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                {lang === 'bn' ? (
                  <>
                    জাপানি, জার্মান ও IELTS শিখে <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">
                      নিশ্চিত করুন গ্লোবাল ক্যারিয়ার
                    </span>
                  </>
                ) : (
                  <>
                    Master Japanese, German & IELTS <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">
                      For International Work & Student Visa
                    </span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                {lang === 'bn' 
                  ? "ফার্মগেট ক্যাম্পাসে সরাসরি ও অনলাইন ইন্টারেক্টিভ ক্লাস। জাপানের স্বনামধন্য 'A' ক্যাটাগরি ল্যাঙ্গুয়েজ স্কুল পার্টনারশিপ, ডিজিটাল সার্টিফিকেট, এবং পূর্ণাঙ্গ ভিসা ও COE ফাইল প্রসেসিং।"
                  : "Direct classroom training at Farmgate campus & live online batches. Partnered with Top 'A' category schools in Tokyo, Osaka & Nagoya with verifiable QR certificates and complete COE support."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onOpenAdmission()}
                  className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-xl shadow-red-950/50 flex items-center gap-2 transition-transform active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{lang === 'bn' ? 'অনলাইন ভর্তি ফরম পূরণ করুন' : 'Apply for Admission Now'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSwitchToStudentPortal('c-jp-n5')}
                  className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm sm:text-base rounded-xl flex items-center gap-2 transition-all"
                >
                  <GraduationCap className="w-4 h-4 text-red-400" />
                  <span>{lang === 'bn' ? 'স্টুডেন্ট LMS ডেমো দেখুন' : 'Explore Student LMS Hub'}</span>
                </button>
              </div>

              {/* Highlights & Guarantees */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-center sm:text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-red-400 font-mono">1,500+</div>
                  <div className="text-[11px] sm:text-xs text-slate-400">সফল জাপানে অবস্থানরত শিক্ষার্থী</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">98.4%</div>
                  <div className="text-[11px] sm:text-xs text-slate-400">জাপান এম্বাসি COE পাসের হার</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-mono">12+ Years</div>
                  <div className="text-[11px] sm:text-xs text-slate-400">অভিজ্ঞ শিক্ষক ও ভিসা মেন্টর</div>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Quick Card & Instant QR Certificate Validator */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Instant Certificate Quick Validator Box */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-amber-500/10 text-amber-400 text-[10px] font-mono px-3 py-1 rounded-bl-lg font-bold border-b border-l border-amber-500/20">
                  REAL-TIME VALIDATION
                </div>

                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-bold text-sm">{lang === 'bn' ? 'পাবলিক সার্টিফিকেট ভেরিফিকেশন' : 'Public Certificate Validator'}</span>
                </div>
                
                <p className="text-xs text-slate-400 mb-4">
                  {lang === 'bn' 
                    ? 'DILS অফিসিয়াল সার্টিফিকেট নম্বর দিন এবং আসল শিক্ষার্থীর গ্রেড ও QR অথেন্টিকেশন যাচাই করুন:'
                    : 'Enter official DILS certificate ID to verify authenticity, GPA, and digital signature:'}
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={quickCertId}
                    onChange={(e) => setQuickCertId(e.target.value)}
                    placeholder="e.g. DILS-CERT-2026-0048"
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={() => onOpenValidator(quickCertId)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1"
                  >
                    <span>যাচাই করুন</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                  <span>উদাহরণ: <button onClick={() => setQuickCertId('DILS-CERT-2026-0048')} className="text-amber-400/80 underline">DILS-CERT-2026-0048</button></span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    ব্যাংকিং গ্রেড QR সিকিউরিটি
                  </span>
                </div>
              </div>

              {/* Latest Notice Ticker Card */}
              <div className="bg-slate-950/90 border border-slate-800/90 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                  <span className="font-bold text-red-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    {lang === 'bn' ? 'সর্বশেষ নোটিশ ও অফার' : 'Latest Announcements'}
                  </span>
                  <span className="text-[10px] text-slate-500">ঢাকা ইন্টারন্যাশনাল ল্যাঙ্গুয়েজ স্কুল</span>
                </div>

                <div className="divide-y divide-slate-900 pt-1">
                  {notices.map((n) => (
                    <div key={n.id} className="py-2.5 flex items-start gap-2.5 text-xs group cursor-pointer">
                      <span className="text-[10px] bg-red-950/80 text-red-400 border border-red-800/60 px-1.5 py-0.5 rounded font-mono font-medium flex-shrink-0">
                        {n.tag}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-200 group-hover:text-red-400 transition-colors line-clamp-1 font-medium">
                          {lang === 'bn' ? n.titleBn : n.title}
                        </p>
                        <span className="text-[10px] text-slate-500">{n.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* QUICK SECTION JUMP BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800/80">
          <a
            href="#student-journey"
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/50 text-slate-300 hover:text-white text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>🎯 শিক্ষার্থীর ৭-ধাপের জার্নি</span>
          </a>
          <a
            href="#courses"
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/50 text-slate-300 hover:text-white text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-red-400" />
            <span>কোর্স ক্যাটালগ ({courses.length})</span>
          </a>
          <a
            href="#japan-visa-services"
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/50 text-slate-300 hover:text-white text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5"
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>৭-ধাপের রোডম্যাপ ও ভিসা সাফল্য</span>
          </a>
          <a
            href="#visa-calculator"
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/50 text-slate-300 hover:text-white text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>সিওই প্রবাবিলিটি ক্যালকুলেটর</span>
          </a>
          <a
            href="#faculty"
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/50 text-slate-300 hover:text-white text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>শিক্ষকমণ্ডলী ও নেতৃত্ব</span>
          </a>
          <a
            href="#campus"
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/50 text-slate-300 hover:text-white text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>ফার্মগেট ক্যাম্পাস ও যোগাযোগ</span>
          </a>
        </div>
      </div>

      {/* 2. COURSE CATALOG WITH INTERACTIVE CATEGORY FILTERS */}
      <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1">
              Language Course Catalog & Batches
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {lang === 'bn' ? 'আন্তর্জাতিক ভাষা কোর্স ও নতুন ব্যাচ সমূহ' : 'International Language Courses'}
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'bn' ? 'কোর্স বা লেভেল খুঁজুন...' : 'Search course or level...'}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-lg shadow-red-950/40'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>{lang === 'bn' ? cat.labelBn : cat.labelEn}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-red-800 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            return (
              <div
                key={course.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-red-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-950/20 group"
              >
                <div>
                  {/* Top Bar with Badge & Level */}
                  <div className="p-5 pb-3">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {course.code}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800/60">
                        {course.level}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2">
                      {lang === 'bn' ? course.titleBn : course.title}
                    </h3>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                      {lang === 'bn' ? course.descriptionBn : course.description}
                    </p>
                  </div>

                  {/* Course Details (Duration, Classes, Instructor) */}
                  <div className="px-5 py-3 bg-slate-950/60 border-y border-slate-800/80 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-red-400" />
                        সময়কাল:
                      </span>
                      <span className="font-semibold">{course.duration}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-slate-400">
                        <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                        মোট ক্লাস:
                      </span>
                      <span className="font-semibold">{course.classesCount} টি লাইভ লেকচার</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <img 
                          src={course.instructorPhoto} 
                          alt={course.instructorName} 
                          className="w-5 h-5 rounded-full object-cover border border-slate-700" 
                        />
                        শিক্ষক:
                      </span>
                      <span className="font-semibold text-slate-200">{course.instructorName}</span>
                    </div>
                  </div>

                  {/* Next Batch Info */}
                  {course.batches.length > 0 && (
                    <div className="px-5 py-2.5 bg-slate-900/40 text-[11px] text-slate-400 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        {course.batches[0].name.slice(0, 22)}...
                      </span>
                      <span className="text-emerald-400 font-semibold font-mono">
                        {course.batches[0].seatsLeft} সিট বাকি
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer: Price & Direct Actions */}
                <div className="p-5 pt-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    {course.discountPrice ? (
                      <div>
                        <span className="text-lg sm:text-xl font-black text-white font-mono">
                          ৳{course.discountPrice.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-500 line-through font-mono ml-1.5">
                          ৳{course.price.toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg sm:text-xl font-black text-white font-mono">
                        ৳{course.price.toLocaleString()}
                      </span>
                    )}
                    <span className="text-[10px] text-emerald-400 block font-medium">ইনস্টলমেন্ট সুবিধা</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCourseForModal(course)}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors"
                    >
                      সিলেবাস
                    </button>
                    <button
                      onClick={() => onOpenAdmission(course.id)}
                      className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg shadow transition-transform active:scale-95 flex items-center gap-1"
                    >
                      <span>ভর্তি</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* 2.5 STUDENT CONTINUOUS LEARNING & VISA JOURNEY (ভর্তি থেকে টোকিও ল্যান্ডিং) */}
      <section id="student-journey" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-24">
        <StudentJourney
          onOpenAdmission={() => onOpenAdmission()}
          onOpenValidator={onOpenValidator}
          lang={lang}
        />
      </section>

      {/* 3. JAPAN VISA ROADMAP, COE SUCCESS GALLERY & PARTNER INSTITUTES */}
      <div id="japan-visa-services">
        <VisaSuccessGallery onOpenAdmission={() => onOpenAdmission()} />
      </div>

      {/* 4. JAPAN VISA & COE PRE-ASSESSMENT CALCULATOR */}
      <div id="visa-calculator" className="max-w-7xl mx-auto px-4 sm:px-6">
        <VisaAssessmentCalculator />
      </div>

      {/* 5. DEDICATED TRAINERS & FACULTY CARDS */}
      <section id="faculty" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1">
            Expert Language Faculty & Senior Mentors
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {lang === 'bn' ? 'অভিজ্ঞ শিক্ষকমণ্ডলী ও ভিসা কনসালট্যান্ট' : 'Trainers & Senior Mentors'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            জাপান ও আন্তর্জাতিক সার্টিফাইড ইন্সট্রাক্টরদের অধীনে ক্লাসরুম ও অনলাইন লাইভ ট্রেনিং। সরাসরি কথা বলুন ডিরেক্টর ও ইন্সট্রাক্টরের সাথে।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((tr) => (
            <div
              key={tr.id}
              className={`bg-slate-900 border ${
                tr.id === 'tr-razzak' ? 'border-red-500/50 shadow-xl shadow-red-950/30' : tr.id === 'tr-tanvir' ? 'border-blue-500/50 shadow-xl shadow-blue-950/30' : 'border-slate-800'
              } rounded-2xl p-5 flex flex-col items-center text-center relative overflow-hidden group hover:border-slate-600 transition-all`}
            >
              {/* Badge for Top Leadership */}
              {tr.id === 'tr-razzak' && (
                <div className="absolute top-0 right-0 bg-red-600 text-white font-mono font-bold text-[9px] px-3 py-0.5 rounded-bl-lg">
                  DIRECTOR • N1
                </div>
              )}
              {tr.id === 'tr-tanvir' && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white font-mono font-bold text-[9px] px-3 py-0.5 rounded-bl-lg">
                  INSTRUCTOR • N2
                </div>
              )}

              <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 border-2 border-red-500/30 group-hover:scale-105 transition-transform shadow-lg">
                <img src={tr.photo} alt={tr.name} className="w-full h-full object-cover" />
              </div>

              <h4 className="text-base font-bold text-white">{tr.name}</h4>
              <p className="text-xs text-red-400 font-medium mb-1">{tr.title}</p>
              
              <div className="text-[11px] bg-slate-950 px-2.5 py-0.5 rounded-md text-slate-300 font-mono mb-2 border border-slate-800">
                {tr.experience}
              </div>

              <p className="text-xs text-slate-400 line-clamp-3 mb-3">
                {tr.bio}
              </p>

              {/* Direct WhatsApp and Phone CTA */}
              <div className="w-full space-y-1.5 mb-3">
                {tr.whatsapp && (
                  <a
                    href={`https://wa.me/${tr.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `হ্যালো ${tr.name}! আমি DILS ওয়েবসাইট থেকে জাপানি ভাষা কোর্স ও ভিসা সম্পর্কে পরামর্শ নিতে চাই।`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-1.5 px-2.5 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all shadow"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp এ কথা বলুন</span>
                  </a>
                )}

                {tr.phone && (
                  <a
                    href={`tel:${tr.phone}`}
                    className="w-full py-1 px-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-[11px] font-mono flex items-center justify-center gap-1 transition-all"
                  >
                    <PhoneCall className="w-3 h-3 text-red-400" />
                    <span>{tr.phone}</span>
                  </a>
                )}
              </div>

              <div className="mt-auto w-full pt-3 border-t border-slate-800/80 flex flex-wrap gap-1 justify-center">
                {tr.credentials.slice(0, 2).map((c, i) => (
                  <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SYLLABUS & COURSE DETAIL MODAL */}
      {selectedCourseForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setSelectedCourseForModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
                {selectedCourseForModal.code}
              </span>
              <span className="text-xs text-slate-400">
                {selectedCourseForModal.level}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              {lang === 'bn' ? selectedCourseForModal.titleBn : selectedCourseForModal.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              {lang === 'bn' ? selectedCourseForModal.descriptionBn : selectedCourseForModal.description}
            </p>

            {/* Syllabus breakdown */}
            <div className="space-y-4 mb-6">
              <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                সাপ্তাহিক ও মাসিক পূর্ণাঙ্গ সিলেবাস মডিউল
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCourseForModal.syllabus.map((syl, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-400">{syl.week}</span>
                      <span className="text-slate-400 font-medium">{syl.topic}</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {syl.modules.map((m, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Batch Schedule options */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6">
              <h4 className="text-xs font-bold text-slate-300 uppercase mb-3 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                আসন্ন ব্যাচ শিডিউল (ফার্মগেট ক্যাম্পাস ও অনলাইন)
              </h4>

              <div className="space-y-2">
                {selectedCourseForModal.batches.map((b) => (
                  <div key={b.id} className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-900 rounded-lg text-xs">
                    <div>
                      <strong className="text-white block">{b.name}</strong>
                      <span className="text-slate-400">{b.days} | {b.time} ({b.room})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-400 font-mono font-bold">
                        {b.seatsLeft} সিট বাকি
                      </span>
                      <button
                        onClick={() => {
                          setSelectedCourseForModal(null);
                          onOpenAdmission(selectedCourseForModal.id);
                        }}
                        className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded"
                      >
                        সিট বুকিং
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal actions */}
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedCourseForModal(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
              >
                বন্ধ করুন
              </button>
              <button
                onClick={() => {
                  setSelectedCourseForModal(null);
                  onOpenAdmission(selectedCourseForModal.id);
                }}
                className="px-5 py-2 bg-red-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <span>সরাসরি ভর্তি ফরম</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 6. CAMPUS & CONTACT FOOTER PREVIEW */}
      <section id="campus" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                Dhaka International Language School & Visa Center (DILS)
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                ফার্মগেট সেন্ট্রাল ক্যাম্পাসে সরাসরি এসে ফাইল যাচাই ও ফ্রি কাউন্সেলিং নিন
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                জাপান স্টুডেন্ট ভিসা (COE), এসএসডব্লিউ (SSW) স্পেশিফাইড স্কিল্ড ওয়ার্কার জব ভিসা, অথবা JLPT/NAT কোর্সে ভর্তির জন্য সরাসরি ডিরেক্টর রাজ্জাক স্যার (JLPT N1) অথবা তানভির কবির বিপ্লব স্যারের (JLPT N2) সাথে আলোচনা করুন।
              </p>
              
              <div className="space-y-2.5 text-xs text-slate-300 pt-1">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span><strong>অফিসিয়াল ক্যাম্পাস:</strong> {DILS_INFO.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span><strong>অফিস খোলা:</strong> {DILS_INFO.officeHours}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Facebook className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>
                    <strong>ফেসবুক পেজ:</strong>{' '}
                    <a
                      href={DILS_INFO.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      facebook.com/DhakaInterLangSchool
                    </a>
                  </span>
                </div>
              </div>

              {/* Direct Leadership Contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-red-900/50 space-y-1">
                  <div className="text-[10px] font-bold text-red-400 uppercase">পরিচালক (Director):</div>
                  <div className="font-bold text-white text-xs">{DILS_INFO.director}</div>
                  <div className="text-[11px] text-slate-400">JLPT-N1 সার্টিফাইড • ভিসা স্পেশালিস্ট</div>
                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href="https://wa.me/8801300634046?text=Hello%20Razzak%20Sir!%20I%20want%20information%20about%20Japan%20Visa%20and%20COE."
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp (+880 1300-634046)</span>
                    </a>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-blue-900/50 space-y-1">
                  <div className="text-[10px] font-bold text-blue-400 uppercase">জাপানি ভাষা শিক্ষক:</div>
                  <div className="font-bold text-white text-xs">{DILS_INFO.instructor}</div>
                  <div className="text-[11px] text-slate-400">JLPT-N2 সার্টিফাইড • হেড অব ল্যাঙ্গুয়েজ</div>
                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href="https://wa.me/8801755534997?text=Hello%20Tanvir%20Sir!%20I%20want%20to%20enroll%20in%20Japanese%20Language%20Class."
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp (017555-34997)</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

            <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-4">
              <div className="text-xs text-slate-400">জরুরি ভর্তি ও ফাইল যাচাই হটলাইন</div>
              <a 
                href={`tel:${DILS_INFO.hotline}`} 
                className="text-xl sm:text-2xl font-black text-emerald-400 font-mono block hover:underline"
              >
                {DILS_INFO.hotline}
              </a>
              <div className="text-xs text-slate-400">
                হোয়াটসঅ্যাপ: <span className="text-slate-200 font-mono">{DILS_INFO.whatsapp}</span>
              </div>
              <div className="text-xs text-slate-400">
                ইমেইল: <a href={`mailto:${DILS_INFO.email}`} className="text-red-400 hover:underline">{DILS_INFO.email}</a>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                অফিসিয়াল ওয়েবসাইট: <strong className="text-white">{DILS_INFO.website}</strong>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenAdmission()}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-transform active:scale-95"
                >
                  ফ্রি প্রি-অ্যাসেসমেন্ট আবেদন করুন
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
