import React, { useState } from 'react';
import { Course, Lesson, QuizQuestion, Invoice, CertificateRecord, LangMode } from '../types';
import { playPronunciation } from '../utils/audioQr';
import { 
  BookOpen, 
  Video, 
  Play, 
  CheckCircle, 
  Lock, 
  Download, 
  Volume2, 
  Clock, 
  Award, 
  FileText, 
  CreditCard, 
  Check, 
  AlertCircle, 
  Tv, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  RefreshCw,
  Compass,
  Milestone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StudentJourneyTracker } from './StudentJourneyTracker';

interface PortalStudentProps {
  courses: Course[];
  lessons: Lesson[];
  quizQuestions: QuizQuestion[];
  invoices: Invoice[];
  certificates: CertificateRecord[];
  lang: LangMode;
  onOpenValidator: (certId: string) => void;
}

export const PortalStudent: React.FC<PortalStudentProps> = ({
  courses,
  lessons: initialLessons,
  quizQuestions,
  invoices: initialInvoices,
  certificates,
  lang,
  onOpenValidator
}) => {
  // Tabs within student portal
  const [activeTab, setActiveTab] = useState<'journey' | 'learning' | 'live' | 'exams' | 'fees'>('journey');
  
  // Enrolled course selected
  const [activeCourseId, setActiveCourseId] = useState<string>('c-jp-n5');
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(initialLessons[0]);
  
  // Watch tracking simulation
  const [watchProgress, setWatchProgress] = useState<number>(selectedLesson.watchPercent || 0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Exam state
  const [examActive, setExamActive] = useState<boolean>(false);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Invoices state
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState<string | null>(null);

  const activeCourse = courses.find((c) => c.id === activeCourseId) || courses[0];
  const courseLessons = lessons.filter((l) => l.courseId === activeCourseId);

  // Calculate overall course progress
  const completedCount = courseLessons.filter((l) => l.isCompleted).length;
  const courseProgressPercent = courseLessons.length > 0 
    ? Math.round((completedCount / courseLessons.length) * 100) 
    : 0;

  // Simulate watch progress update
  const handleSimulateWatch = () => {
    setIsPlaying(true);
    let current = watchProgress;
    const interval = setInterval(() => {
      current += 10;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setIsPlaying(false);
        // Mark lesson completed & unlock next lesson
        markLessonCompleted(selectedLesson.id);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
      setWatchProgress(current);
    }, 400);
  };

  const markLessonCompleted = (lessonId: string) => {
    setLessons((prev) => {
      const idx = prev.findIndex((l) => l.id === lessonId);
      if (idx === -1) return prev;
      const updated = [...prev];
      updated[idx] = { ...updated[idx], isCompleted: true, watchPercent: 100 };
      
      // Unlock next lesson
      if (idx + 1 < updated.length) {
        updated[idx + 1] = { ...updated[idx + 1], isLocked: false };
      }
      return updated;
    });
  };

  const handleSelectLesson = (l: Lesson) => {
    if (l.isLocked) return;
    setSelectedLesson(l);
    setWatchProgress(l.watchPercent || 0);
  };

  // Exam logic
  const handleSelectAnswer = (optionIdx: number) => {
    setUserAnswers({ ...userAnswers, [currentQIndex]: optionIdx });
  };

  const handleNextQuestion = () => {
    if (currentQIndex < quizQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // Calculate score
      let total = 0;
      quizQuestions.forEach((q, idx) => {
        if (userAnswers[idx] === q.correctIndex) {
          total += q.marks;
        }
      });
      setScore(total);
      setExamFinished(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const resetExam = () => {
    setUserAnswers({});
    setCurrentQIndex(0);
    setExamFinished(false);
    setExamActive(true);
  };

  // Payment simulation
  const handlePayInstallment = (invoiceId: string, instIndex: number) => {
    setInvoices((prev) => {
      return prev.map((inv) => {
        if (inv.id === invoiceId) {
          const updatedInst = [...inv.installments];
          const inst = updatedInst[instIndex];
          if (!inst.paid) {
            inst.paid = true;
            inst.paidDate = 'Today via bKash';
            inst.method = 'bKash Online';
            const newPaid = inv.paidAmount + inst.amount;
            const newDue = Math.max(0, inv.totalAmount - newPaid);
            return {
              ...inv,
              paidAmount: newPaid,
              dueAmount: newDue,
              status: newDue === 0 ? 'paid' : 'partial',
              installments: updatedInst
            };
          }
        }
        return inv;
      });
    });
    setPaymentSuccessMsg('পেমেন্ট সফলভাবে সম্পন্ন হয়েছে! রসিদ জেনারেট করা হয়েছে।');
    setTimeout(() => setPaymentSuccessMsg(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* 1. STUDENT IDENTITY BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-red-600/10 to-transparent pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-red-500/50 shadow-md flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" 
                alt="Student avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">Md. Tanvir Hasan</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                  ভেরিফাইড শিক্ষার্থী (ENROLLED)
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                ID: <strong className="text-slate-200">DILS-2026-0048</strong> | ব্যাচ: N5 Complete Mastery (Sensei Tanvir Kabir Biplob)
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Dhaka International Language School & Visa Center — Farmgate Campus
              </p>
            </div>
          </div>

          {/* Quick Course Progress Summary */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 sm:px-5 flex items-center gap-4">
            <div>
              <div className="text-[11px] text-slate-400">কোর্স অগ্রগতি (Progress)</div>
              <div className="text-lg font-black text-white font-mono">{courseProgressPercent}% সম্পূর্ণ</div>
            </div>
            <div className="w-24 bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-red-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${courseProgressPercent}%` }}
              ></div>
            </div>
          </div>

        </div>

        {/* Sub Navigation Tabs for Learner Portal */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 mt-4 border-t border-slate-800 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('journey')}
            className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'journey' 
                ? 'bg-red-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>🎯 আমার ৭-ধাপের জার্নি (My Journey)</span>
            <span className="text-[9px] bg-red-950 text-red-400 px-1.5 py-0.5 rounded font-mono font-bold">ধাপ ২</span>
          </button>

          <button
            onClick={() => setActiveTab('learning')}
            className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'learning' 
                ? 'bg-red-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📚 লার্নিং হাব (Learning Hub)</span>
          </button>

          <button
            onClick={() => setActiveTab('live')}
            className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'live' 
                ? 'bg-red-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <Tv className="w-4 h-4 text-emerald-400" />
            <span>🔴 লাইভ ক্লাস ও শিডিউল</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </button>

          <button
            onClick={() => setActiveTab('exams')}
            className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'exams' 
                ? 'bg-red-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>📝 পরীক্ষা ও কুইজ (Exams & Quiz)</span>
          </button>

          <button
            onClick={() => setActiveTab('fees')}
            className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'fees' 
                ? 'bg-red-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <CreditCard className="w-4 h-4 text-rose-400" />
            <span>💳 ফি ও সার্টিফিকেট</span>
          </button>
        </div>
      </div>

      {/* 1. TAB CONTENT: STUDENT JOURNEY TRACKER */}
      {activeTab === 'journey' && (
        <StudentJourneyTracker
          mode="student_portal"
          studentName="Md. Tanvir Hasan"
          studentId="DILS-2026-0048"
          onNavigateToTab={(tab) => setActiveTab(tab)}
          onOpenValidator={onOpenValidator}
          lang={lang}
        />
      )}

      {/* 2. TAB CONTENT: LEARNING HUB */}
      {activeTab === 'learning' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Video & Lesson Content Player (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Embedded Player Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              
              {/* Responsive Video Container */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <iframe
                  src={selectedLesson.videoUrl}
                  title={selectedLesson.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video Watch Progress Tracker Bar (Anti-Skip Prevention Requirement) */}
              <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">ভিডিও ওয়াচ ট্র্যাকিং:</span>
                  <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        watchProgress >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${watchProgress}%` }}
                    ></div>
                  </div>
                  <span className="font-mono font-bold text-white">{watchProgress}%</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSimulateWatch}
                    disabled={isPlaying || watchProgress >= 100}
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold rounded-lg flex items-center gap-1.5 transition-all text-[11px]"
                  >
                    <Play className="w-3 h-3" />
                    <span>{isPlaying ? 'প্লে হচ্ছে...' : watchProgress >= 100 ? 'সম্পূর্ণ হয়েছে' : 'ওয়াচ অগ্রগতি আপডেট'}</span>
                  </button>

                  {watchProgress >= 80 && (
                    <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      পরবর্তী পাঠ আনলকড
                    </span>
                  )}
                </div>
              </div>

              {/* Lesson Details */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-red-400 bg-red-950/70 border border-red-800/60 px-2 py-0.5 rounded">
                    {selectedLesson.moduleName}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedLesson.duration}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {lang === 'bn' ? selectedLesson.titleBn : selectedLesson.title}
                </h3>

                {selectedLesson.notes && (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-amber-400 block mb-1">গুরুত্বপূর্ণ লেকচার নোটস:</strong>
                    {selectedLesson.notes}
                  </div>
                )}

                {/* Vocabulary Audio & Pronunciation Soundboard */}
                {selectedLesson.vocabList && selectedLesson.vocabList.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                        <Volume2 className="w-4 h-4 text-red-400" />
                        লেসন ভোকাবুলারি ও অডিও উচ্চারণ (Audio Pronunciation)
                      </h4>
                      <span className="text-[11px] text-slate-500">শব্দে ক্লিক করে সঠিক উচ্চারণ শুনুন</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedLesson.vocabList.map((v, i) => (
                        <div
                          key={i}
                          onClick={() => playPronunciation(v.audioText, 'ja-JP')}
                          className="bg-slate-950 hover:bg-slate-800 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all group"
                        >
                          <div>
                            <div className="font-bold text-white text-sm group-hover:text-red-400 transition-colors">
                              {v.word}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {v.meaning}
                            </div>
                          </div>
                          <button 
                            className="p-2 bg-slate-900 group-hover:bg-red-600 rounded-lg text-slate-400 group-hover:text-white transition-all"
                            title="Play audio"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PDF Worksheets Downloadable */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">লেসন ওয়ার্কশিট ও ব্যাকরণ স্লাইডস (PDF)</span>
                  <a
                    href="#download"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("PDF লেকচার শিট ডাউনলোড শুরু হচ্ছে...");
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>PDF ডাউনলোড (3.4 MB)</span>
                  </a>
                </div>

              </div>

            </div>

          </div>

          {/* Lesson Playlist & Curriculum Drawer (Right 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  কোর্স কারিকুলাম ও লেসন সমূহ ({courseLessons.length})
                </h4>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  {completedCount} সম্পূর্ণ
                </span>
              </div>

              <div className="divide-y divide-slate-800/80 mt-2 space-y-1">
                {courseLessons.map((les, index) => {
                  const isCurrent = les.id === selectedLesson.id;
                  return (
                    <div
                      key={les.id}
                      onClick={() => handleSelectLesson(les)}
                      className={`p-3 rounded-xl flex items-start gap-3 transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-red-950/50 border border-red-800/60 text-white'
                          : les.isLocked
                          ? 'opacity-50 cursor-not-allowed bg-slate-950/40 text-slate-500'
                          : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        {les.isCompleted ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        ) : les.isLocked ? (
                          <Lock className="w-4 h-4 text-slate-600" />
                        ) : (
                          <Play className="w-4 h-4 text-red-400" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0 text-xs">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="text-[10px] text-slate-400 font-mono">
                            লেসন {index + 1}
                          </span>
                          <span className="text-[10px] text-slate-500">{les.duration}</span>
                        </div>
                        <p className={`font-semibold line-clamp-2 ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                          {lang === 'bn' ? les.titleBn : les.title}
                        </p>
                        {les.isLocked && (
                          <span className="text-[10px] text-amber-500/80 block mt-1">
                            আগের লেসন সম্পন্ন করে আনলক করুন
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weekly Routine Widget */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs space-y-3">
              <h5 className="font-bold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-red-400" />
                সাপ্তাহিক লাইভ ক্লাস রুটিন
              </h5>
              <div className="space-y-1.5 text-slate-400">
                <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                  <span className="font-semibold text-slate-200">শনিবার:</span>
                  <span className="font-mono text-emerald-400">09:00 AM - 11:00 AM</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                  <span className="font-semibold text-slate-200">সোমবার:</span>
                  <span className="font-mono text-emerald-400">09:00 AM - 11:00 AM</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                  <span className="font-semibold text-slate-200">বুধবার:</span>
                  <span className="font-mono text-emerald-400">09:00 AM - 11:00 AM</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 3. TAB CONTENT: LIVE CLASS & SCHEDULE */}
      {activeTab === 'live' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Live Class Active Card */}
            <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden space-y-5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  লাইভ ক্লাস চলমান
                </span>
                <span className="text-xs font-mono text-slate-400">Room 702 / Zoom Live</span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white">
                  Japanese JLPT N4: Complex Particle Combinations & Dokkai Speed Reading
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  শিক্ষক: <strong className="text-slate-200">Sensei Tanvir Hasan</strong> | সময়: ০৯:০০ AM - ১১:০০ AM
                </p>
              </div>

              {/* 1-Click Join Buttons for Zoom / Meet */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://zoom.us"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-transform active:scale-95"
                >
                  <Tv className="w-4 h-4" />
                  <span>১-ক্লিকে Zoom ক্লাসে যোগ দিন</span>
                </a>

                <a
                  href="https://meet.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl flex items-center gap-2"
                >
                  <span>Google Meet ব্যাকআপ লিংক</span>
                </a>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl text-xs text-slate-400 flex items-center justify-between">
                <span>আজকের উপস্থিতি স্ট্যাটাস:</span>
                <span className="text-emerald-400 font-bold font-mono">উপস্থিত (Present - Marked at 09:05 AM)</span>
              </div>
            </div>

            {/* Upcoming Batch Schedules */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                পরবর্তী লাইভ ক্লাস ও রেকর্ডিং আর্কাইভ
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <strong className="text-white block">আগামীকাল বুধবার, ০৯:০০ AM</strong>
                    <span className="text-slate-400">Minna no Nihongo অধ্যায় ২৯ & কাঞ্জি রিভিউ</span>
                  </div>
                  <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                    রিমাইন্ডার সেট
                  </span>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <strong className="text-white block">রেকর্ডিং: সোমবারের ক্লাস (১৬-সেপ্টেম্বর)</strong>
                    <span className="text-slate-400">Passive Form (Rareru) & Listening Test</span>
                  </div>
                  <button 
                    onClick={() => alert("ক্লাস রেকর্ডিং লোড হচ্ছে...")}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-red-600 text-white rounded font-bold transition-all text-[11px]"
                  >
                    প্লে করুন
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. TAB CONTENT: EXAMS & QUIZZES */}
      {activeTab === 'exams' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          
          {!examActive ? (
            <div className="text-center max-w-xl mx-auto py-8 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-red-950 text-red-400 border border-red-800/80 flex items-center justify-center mx-auto shadow-lg">
                <Award className="w-8 h-8" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white">
                অনলাইন এমসিকিউ ও লিসেনিং মূল্যায়ন পরীক্ষা
              </h3>

              <p className="text-xs sm:text-sm text-slate-300">
                এই পরীক্ষায় মোট ৫টি প্রশ্ন রয়েছে (বহুনির্বাচনী, লিসেনিং অডিও টেস্ট এবং ট্রু/ফলস)। স্বয়ংক্রিয়ভাবে স্কোরকার্ড তৈরি হবে।
              </p>

              <div className="flex items-center justify-center gap-6 py-2 text-xs text-slate-400 font-mono">
                <div>পূর্ণমান: <strong className="text-white">২৫ মার্কস</strong></div>
                <div>সময়: <strong className="text-white">১০ মিনিট</strong></div>
                <div>পাস মার্কস: <strong className="text-emerald-400">৬০%</strong></div>
              </div>

              <button
                onClick={resetExam}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-xl shadow-xl transition-transform active:scale-95"
              >
                পরীক্ষা শুরু করুন (Start Live Exam)
              </button>
            </div>
          ) : examFinished ? (
            /* Exam Result Scorecard */
            <div className="text-center max-w-lg mx-auto py-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800">
                পরীক্ষা সফলভাবে সম্পন্ন হয়েছে
              </div>

              <h3 className="text-2xl font-black text-white">আপনার অফিসিয়াল স্কোরকার্ড</h3>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="text-4xl font-black text-emerald-400 font-mono">
                  {score} / 25
                </div>
                <div className="text-xs text-slate-400">
                  শতাংশ: <strong className="text-white font-mono">{Math.round((score / 25) * 100)}%</strong> | 
                  গ্রেড: <strong className="text-amber-400 font-mono">{score >= 20 ? 'A+' : score >= 15 ? 'A' : 'Pass'}</strong>
                </div>
                <p className="text-xs text-slate-300 pt-2 border-t border-slate-800">
                  আপনার ফলাফল কেন্দ্রীয় গ্রেডবুকে অন্তর্ভুক্ত করা হয়েছে।
                </p>
              </div>

              <button
                onClick={resetExam}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>পুনরায় পরীক্ষা দিন</span>
              </button>
            </div>
          ) : (
            /* Active Question Card */
            <div className="max-w-2xl mx-auto space-y-5">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
                <span className="font-mono text-red-400 font-bold">
                  প্রশ্ন {currentQIndex + 1} / {quizQuestions.length}
                </span>
                <span className="flex items-center gap-1 text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  ০৭:৪৫ মিনিট বাকি
                </span>
              </div>

              {/* Question Text */}
              <div className="space-y-2">
                <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {quizQuestions[currentQIndex].question}
                </h4>
                {quizQuestions[currentQIndex].questionBn && (
                  <p className="text-xs text-slate-400">
                    {quizQuestions[currentQIndex].questionBn}
                  </p>
                )}
              </div>

              {/* Audio prompt button if listening test */}
              {quizQuestions[currentQIndex].type === 'listening' && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-slate-300">
                    <span className="font-bold text-amber-400 block">🎧 লিসেনিং অডিও টেস্ট</span>
                    অডিও ক্লিপটি শুনুন এবং নিচের সঠিক অভিবাদনটি চিহ্নিত করুন:
                  </div>
                  <button
                    onClick={() => playPronunciation(quizQuestions[currentQIndex].audioPrompt || 'Konnichiwa', 'ja-JP')}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>অডিও শুনুন</span>
                  </button>
                </div>
              )}

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {quizQuestions[currentQIndex].options.map((opt, oIdx) => {
                  const isSelected = userAnswers[currentQIndex] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectAnswer(oIdx)}
                      className={`w-full text-left p-3.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-red-950/60 border-red-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                      }`}
                    >
                      <span>{opt}</span>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-red-500 bg-red-500 text-white' : 'border-slate-700'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <div className="flex justify-end pt-4 border-t border-slate-800">
                <button
                  onClick={handleNextQuestion}
                  disabled={userAnswers[currentQIndex] === undefined}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition-all"
                >
                  <span>{currentQIndex === quizQuestions.length - 1 ? 'ফলাফল দেখুন' : 'পরবর্তী প্রশ্ন'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* 5. TAB CONTENT: FEES & VERIFIABLE CERTIFICATES */}
      {activeTab === 'fees' && (
        <div className="space-y-8">
          
          {paymentSuccessMsg && (
            <div className="bg-emerald-950/80 border border-emerald-500 text-emerald-200 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{paymentSuccessMsg}</span>
            </div>
          )}

          {/* Invoices List */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-red-400" />
              কোর্স ফি ইনভয়েস ও কিস্তি (Installment) ট্র্যাকিং
            </h4>

            <div className="space-y-4">
              {invoices.map((inv) => (
                <div key={inv.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-mono font-bold text-white">{inv.invoiceNo}</span>
                      <p className="text-slate-400">{inv.courseName}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase font-mono ${
                        inv.status === 'paid' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}>
                        {inv.status === 'paid' ? 'সম্পূর্ণ পরিশোধিত' : 'আংশিক পরিশোধিত'}
                      </span>
                      <div className="text-slate-300 font-mono font-bold mt-1">
                        পরিশোধিত: ৳{inv.paidAmount.toLocaleString()} / ৳{inv.totalAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Installment breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-900 text-xs">
                    {inv.installments.map((inst, idx) => (
                      <div key={idx} className="bg-slate-900 p-3 rounded-lg flex items-center justify-between">
                        <div>
                          <strong className="text-white block">{inst.title}</strong>
                          <span className="text-slate-400 font-mono">৳{inst.amount.toLocaleString()}</span>
                        </div>
                        <div>
                          {inst.paid ? (
                            <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {inst.method || 'পরিশোধিত'}
                            </span>
                          ) : (
                            <button
                              onClick={() => handlePayInstallment(inv.id, idx)}
                              className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded text-[11px] shadow transition-all"
                            >
                              bKash এ দিন
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verifiable Certificate Showcase */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                আপনার ডিজিটাল ভেরিফাইড সার্টিফিকেট (Instant QR & PDF)
              </h4>
              <span className="text-xs text-amber-400 font-semibold font-mono">DILS OFFICIAL CREDENTIAL</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div key={cert.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/60">
                      {cert.certificateId}
                    </span>
                    <h5 className="font-bold text-white text-sm mt-1">{cert.courseName}</h5>
                    <p className="text-xs text-slate-400">গ্রেড: <strong className="text-emerald-400">{cert.grade}</strong> | ইস্যু: {cert.issueDate}</p>
                  </div>
                  <button
                    onClick={() => onOpenValidator(cert.certificateId)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1 flex-shrink-0"
                  >
                    <span>সার্টিফিকেট ও QR দেখুন</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
