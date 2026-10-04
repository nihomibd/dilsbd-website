import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  GraduationCap, 
  Compass, 
  Sparkles, 
  Trophy, 
  Calendar, 
  Check, 
  Send, 
  RotateCcw,
  BookOpen,
  MapPin,
  Flame,
  Award
} from 'lucide-react';
import { ASSESSMENT_QUESTIONS, calculateLevelAndRoadmap } from '../data/assessmentData';
import { AssessmentResult } from '../types';

interface AssessmentLevelCheckProps {
  onBackToHome: () => void;
  onOpenAdmission: (courseId?: string) => void;
  onExploreCourses: () => void;
  onSaveLead?: (leadData: { name: string; phone: string; courseInterest: string; notes: string[] }) => void;
}

export const AssessmentLevelCheck: React.FC<AssessmentLevelCheckProps> = ({
  onBackToHome,
  onOpenAdmission,
  onExploreCourses,
  onSaveLead
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [targetGoal, setTargetGoal] = useState<string>('study');
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Lead capture on result screen
  const [studentName, setStudentName] = useState<string>('');
  const [studentPhone, setStudentPhone] = useState<string>('');
  const [isLeadSaved, setIsLeadSaved] = useState<boolean>(false);

  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const currentQ = ASSESSMENT_QUESTIONS[currentStep];

  // Web Speech API for native Japanese pronunciation
  const handlePlayAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectOption = (optionId: string) => {
    if (showFeedback && currentQ.category !== 'goal') return;

    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: optionId }));

    if (currentQ.category === 'goal') {
      const selectedOpt = currentQ.options.find(o => o.id === optionId);
      if (selectedOpt && selectedOpt.tag) {
        setTargetGoal(selectedOpt.tag);
      }
      // Last question reached, calculate result
      handleFinishAssessment(optionId);
      return;
    }

    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinishAssessment = async (lastOptionId?: string) => {
    setIsSubmitting(true);
    const answersMap = { ...selectedAnswers };
    if (lastOptionId && currentQ) {
      answersMap[currentQ.id] = lastOptionId;
    }

    // Calculate score for the academic questions (first 5 questions)
    let score = 0;
    ASSESSMENT_QUESTIONS.slice(0, 5).forEach(q => {
      const chosen = answersMap[q.id];
      const correctOpt = q.options.find(o => o.isCorrect);
      if (chosen && correctOpt && chosen === correctOpt.id) {
        score += 1;
      }
    });

    const calculated = calculateLevelAndRoadmap(score, targetGoal);
    const newResult: AssessmentResult = {
      id: `RES-${Date.now()}`,
      sessionId: `SESSION-${Math.random().toString(36).substring(2, 9)}`,
      score,
      totalQuestions: 5,
      startingLevel: calculated.startingLevel,
      levelBadge: calculated.levelBadge,
      targetGoal,
      recommendedCourseId: calculated.recommendedCourseId,
      recommendedCourseTitle: calculated.recommendedCourseTitle,
      roadmap: calculated.roadmap,
      summaryBn: calculated.summaryBn,
      createdAt: new Date().toISOString()
    };

    setAssessmentResult(newResult);

    // Save anonymously or sync to server SQLite database
    try {
      await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: newResult.sessionId,
          answers: answersMap,
          score,
          totalQuestions: 5,
          startingLevel: newResult.startingLevel,
          targetGoal,
          recommendedCourse: newResult.recommendedCourseTitle
        })
      });
    } catch (err) {
      console.warn('[Assessment] Server sync deferred:', err);
    }

    setIsSubmitting(false);
  };

  const handleSaveContactResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentPhone.trim() || !assessmentResult) return;

    if (onSaveLead) {
      onSaveLead({
        name: studentName.trim(),
        phone: studentPhone.trim(),
        courseInterest: assessmentResult.recommendedCourseTitle,
        notes: [
          `Assessment Level: ${assessmentResult.startingLevel} (${assessmentResult.score}/5)`,
          `Goal: ${assessmentResult.targetGoal}`,
          `Recommended: ${assessmentResult.recommendedCourseTitle}`
        ]
      });
    }

    setIsLeadSaved(true);
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setShowFeedback(false);
    setCurrentStep(0);
    setAssessmentResult(null);
    setIsLeadSaved(false);
    setStudentName('');
    setStudentPhone('');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800 font-sans pb-24">
      
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-red-600 transition-colors cursor-pointer py-1.5 px-2.5 rounded-lg hover:bg-stone-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোমে ফিরুন (Home)</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-900 tracking-wide font-mono uppercase">
              Free Japan Level Check 🇯🇵
            </span>
          </div>

          <div className="text-xs font-semibold text-slate-500 font-mono">
            {assessmentResult ? 'COMPLETED' : `STEP ${currentStep + 1}/${totalQuestions}`}
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        {!assessmentResult && (
          <div className="w-full bg-stone-100 h-1.5">
            <div 
              className="bg-red-600 h-full transition-all duration-300 ease-out"
              style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        
        {/* VIEW 1: ACTIVE ASSESSMENT STEPPER */}
        {!assessmentResult && (
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Encouraging Kicker */}
            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>আপনার Japanese Level এখন কোথায়?</span>
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {currentQ.questionBn}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {currentQ.question}
              </p>
            </div>

            {/* Interactive Pronunciation Feature Card (if applicable) */}
            {currentQ.japaneseText && (
              <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-sm relative overflow-hidden">
                <div className="text-3xl sm:text-5xl font-black text-slate-900 tracking-widest font-serif py-2">
                  {currentQ.japaneseText}
                </div>

                {currentQ.audioPronunciationText && (
                  <button
                    onClick={() => handlePlayAudio(currentQ.audioPronunciationText!)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 active:scale-95 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
                    title="শুদ্ধ জাপানি উচ্চারণ শুনুন"
                  >
                    <Volume2 className="w-4 h-4 text-red-600" />
                    <span>উচ্চারণ শুনুন (Listen Audio) 🔊</span>
                  </button>
                )}
              </div>
            )}

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === opt.id;
                const isCorrect = opt.isCorrect;
                
                let cardStyle = "bg-white border-2 border-stone-200 hover:border-red-400 text-slate-800";
                if (showFeedback && currentQ.category !== 'goal') {
                  if (isSelected && isCorrect) {
                    cardStyle = "bg-emerald-50 border-2 border-emerald-500 text-emerald-950 shadow-sm";
                  } else if (isSelected && !isCorrect) {
                    cardStyle = "bg-rose-50 border-2 border-rose-500 text-rose-950";
                  } else if (!isSelected && isCorrect) {
                    cardStyle = "bg-emerald-50/60 border-2 border-emerald-400 text-emerald-900";
                  }
                } else if (isSelected) {
                  cardStyle = "bg-red-50 border-2 border-red-600 text-red-950 shadow-sm";
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full p-4 sm:p-5 rounded-2xl text-left transition-all flex items-center justify-between gap-4 cursor-pointer ${cardStyle}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="w-7 h-7 rounded-xl bg-stone-100 text-slate-700 font-bold text-xs flex items-center justify-center font-mono shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{opt.text}</div>
                        {opt.textBn && <div className="text-xs text-slate-500 mt-0.5">{opt.textBn}</div>}
                      </div>
                    </div>

                    {showFeedback && currentQ.category !== 'goal' && (
                      <div>
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : isSelected ? (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        ) : null}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback Notice & Next Button */}
            {showFeedback && currentQ.category !== 'goal' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-stone-100 border border-stone-200 rounded-2xl space-y-3"
              >
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {currentQ.explanationBn}
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 active:scale-98 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>পরবর্তী প্রশ্ন →</span>
                  </button>
                </div>
              </motion.div>
            )}

          </motion.div>
        )}

        {/* VIEW 2: COMPREHENSIVE RESULT & PERSONALIZED ROADMAP */}
        {assessmentResult && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Result Header Badge Card */}
            <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-sm relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-xs font-bold text-red-600 uppercase">
                <Trophy className="w-3.5 h-3.5" />
                <span>অ্যাসেসমেন্ট রেজাল্ট ও পার্সোনালাইজড রোডম্যাপ</span>
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {assessmentResult.startingLevel}
                </h2>
                <p className="text-xs sm:text-sm font-mono font-bold text-slate-500">
                  {assessmentResult.levelBadge} • Score: {assessmentResult.score} / {assessmentResult.totalQuestions}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
                {assessmentResult.summaryBn}
              </p>

              {/* Recommended Course Box */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl max-w-md mx-auto text-left flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-red-600 uppercase font-mono block">
                    আপনার জন্য সুপারিশকৃত কোর্স
                  </span>
                  <strong className="text-sm font-bold text-slate-900 block">
                    {assessmentResult.recommendedCourseTitle}
                  </strong>
                </div>
                <button
                  onClick={() => onOpenAdmission(assessmentResult.recommendedCourseId)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs shrink-0 cursor-pointer"
                >
                  ভর্তি আবেদন 🎓
                </button>
              </div>
            </div>

            {/* VISUAL JAPAN JOURNEY ROADMAP (5 MILESTONES) */}
            <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-red-600" />
                    <span>আপনার পার্সোনালাইজড জাপান রোডম্যাপ</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    আজকের লেভেল থেকে জাপানে পৌঁছানো পর্যন্ত ধাপে ধাপে সুনির্দিষ্ট গাইডলাইন
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                {assessmentResult.roadmap.map((step, idx) => {
                  let badgeColor = "bg-stone-100 text-slate-700 border-stone-200";
                  if (step.status === 'current') {
                    badgeColor = "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20";
                  } else if (step.status === 'next') {
                    badgeColor = "bg-amber-100 text-amber-900 border-amber-300";
                  }

                  return (
                    <div 
                      key={step.step}
                      className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-stone-50 flex items-start gap-4 hover:border-stone-300 transition-all"
                    >
                      <span className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center font-mono shrink-0 border ${badgeColor}`}>
                        0{step.step}
                      </span>
                      <div className="flex-1 space-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{step.titleBn}</h4>
                          <span className="text-[11px] font-mono font-semibold text-slate-500 bg-white border border-stone-200 px-2 py-0.5 rounded">
                            {step.timeline}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{step.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTAS (PRIMARY & SECONDARY) */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-3xl p-6 sm:p-8 space-y-4 text-center shadow-xl shadow-red-600/20">
              <h3 className="text-xl sm:text-2xl font-black">
                আপনার স্বপ্নের জাপান যাত্রা শুরু করুন আজই 🇯🇵
              </h3>
              <p className="text-xs sm:text-sm text-red-100 max-w-xl mx-auto">
                আমাদের অভিজ্ঞ JLPT N1 শিক্ষক এবং সিনিয়র ভিসা কাউন্সেলরদের সাথে যুক্ত হয়ে শতভাগ আত্মবিশ্বাসে এগিয়ে যান।
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                {/* PRIMARY CTA */}
                <button
                  onClick={() => onOpenAdmission(assessmentResult.recommendedCourseId)}
                  className="px-8 py-3.5 bg-white text-red-700 hover:bg-stone-100 font-bold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Start My Japan Journey (ভর্তি আবেদন করুন)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* SECONDARY CTA */}
                <button
                  onClick={onExploreCourses}
                  className="px-6 py-3.5 bg-red-800/80 hover:bg-red-800 text-white font-bold text-sm rounded-xl border border-red-400/40 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Membership Plans (কোর্স ও ফি দেখুন)</span>
                </button>
              </div>
            </div>

            {/* SAVE RESULT & COUNSELOR CALL BACK FORM */}
            <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">
                  রোডম্যাপটি সেভ করুন ও ফ্রি কাউন্সেলিং নিন 📱
                </h4>
                <p className="text-xs text-slate-500">
                  আপনার নাম ও ফোন নম্বর দিন; আমাদের সিনিয়র মেন্টর আপনার ফলাফল দেখে উপযুক্ত ব্যাচ ও স্কলারশিপের তথ্য জানিয়ে কল করবেন।
                </p>
              </div>

              {isLeadSaved ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ধন্যবাদ! আপনার ফলাফলটি সফলভাবে সংরক্ষিত হয়েছে। আমাদের কাউন্সেলর শীঘ্রই কল করবেন।</span>
                </div>
              ) : (
                <form onSubmit={handleSaveContactResult} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="আপনার পূর্ণ নাম *"
                    className="bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-red-600"
                  />
                  <input
                    type="tel"
                    required
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    placeholder="WhatsApp নম্বর *"
                    className="bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-red-600 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>সেভ করুন ও গাইড নিন</span>
                  </button>
                </form>
              )}

              <div className="pt-2 flex justify-center">
                <button
                  onClick={handleRestart}
                  className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors cursor-pointer py-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>পুনরায় লেভেল টেস্ট দিন (Retake Assessment)</span>
                </button>
              </div>
            </div>

          </motion.div>
        )}

      </main>

    </div>
  );
};

export default AssessmentLevelCheck;
