import React, { useState } from 'react';
import { STUDENT_JOURNEY_STAGES, DILS_INFO } from '../data/mockData';
import { StudentJourneyStage, LangMode } from '../types';
import { 
  CheckCircle2, 
  CircleDot, 
  Clock, 
  ArrowRight, 
  User, 
  Calendar, 
  Award, 
  FileText, 
  Send, 
  Compass, 
  BookOpen, 
  Plane, 
  ExternalLink,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface StudentJourneyTrackerProps {
  mode: 'student_portal' | 'website_overview';
  studentName?: string;
  studentId?: string;
  onNavigateToTab?: (tab: 'learning' | 'live' | 'exams' | 'fees') => void;
  onOpenAdmission?: () => void;
  onOpenValidator?: (certId: string) => void;
  lang?: LangMode;
}

export const StudentJourneyTracker: React.FC<StudentJourneyTrackerProps> = ({
  mode,
  studentName = 'Md. Tanvir Hasan',
  studentId = 'DILS-2026-0048',
  onNavigateToTab,
  onOpenAdmission,
  onOpenValidator,
  lang = 'bn'
}) => {
  const [stages] = useState<StudentJourneyStage[]>(STUDENT_JOURNEY_STAGES);
  const [selectedStageId, setSelectedStageId] = useState<string>(
    mode === 'student_portal' ? 'stage-02' : 'stage-01'
  );

  const activeStage = stages.find((s) => s.id === selectedStageId) || stages[1];

  // Calculate overall journey progress
  const completedStages = stages.filter((s) => s.status === 'completed').length;
  const currentStage = stages.find((s) => s.status === 'current');
  const totalJourneyProgress = Math.round(
    ((completedStages + (currentStage ? currentStage.progressPercent / 100 : 0)) / stages.length) * 100
  );

  const getStageIcon = (category: StudentJourneyStage['category']) => {
    switch (category) {
      case 'onboarding':
        return <User className="w-4 h-4" />;
      case 'language':
        return <BookOpen className="w-4 h-4" />;
      case 'exam':
        return <FileText className="w-4 h-4" />;
      case 'certificate':
        return <Award className="w-4 h-4" />;
      case 'visa_processing':
        return <Compass className="w-4 h-4" />;
      case 'embassy':
        return <Send className="w-4 h-4" />;
      case 'departure':
        return <Plane className="w-4 h-4" />;
      default:
        return <CircleDot className="w-4 h-4" />;
    }
  };

  const handleAction = (stage: StudentJourneyStage) => {
    if (stage.actionType === 'learning' && onNavigateToTab) {
      onNavigateToTab('learning');
    } else if (stage.actionType === 'exam' && onNavigateToTab) {
      onNavigateToTab('exams');
    } else if (stage.actionType === 'certificate' && onOpenValidator) {
      onOpenValidator('DILS-CERT-2026-0048');
    } else if (stage.actionType === 'counseling' && onOpenAdmission) {
      onOpenAdmission();
    } else if (stage.whatsappNumber) {
      const url = `https://wa.me/${stage.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
        `হ্যালো! আমি ${studentName} (ID: ${studentId})। ${stage.titleBn} সম্পর্কে জানতে চাই।`
      )}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6">
      
      {/* Top Header Card */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/80 text-red-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>
              {mode === 'student_portal' 
                ? 'আপনার লাইভ জাপান লার্নিং ও ভিসা জার্নি ট্র্যাকার' 
                : 'একজন শিক্ষার্থীর সম্পূর্ণ জাপান জার্নি (ভর্তি থেকে টোকিও ল্যান্ডিং)'}
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
            {mode === 'student_portal' ? (
              <span>শিক্ষার্থী: <strong className="text-red-400">{studentName}</strong> (আইডি: {studentId})</span>
            ) : (
              <span>৭টি স্পষ্ট ধাপে শূন্য থেকে জাপানে সফল ক্যারিয়ার</span>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {mode === 'student_portal'
              ? 'ভর্তি থেকে শুরু করে জাপানি ভাষা শিক্ষা, ন্যাট-টেস্ট, সিওই ফাইল প্রসেসিং এবং এম্বাসি ভিসা ইন্টারভিউ পর্যন্ত আপনার প্রতিটি পদক্ষেপের রিয়েল-টাইম স্টেটাস।'
              : 'DILS-এ একজন শিক্ষার্থীর যাত্রা কীভাবে শুরু হয় এবং ধাপে ধাপে কীভাবে তানভির স্যার ও রাজ্জাক স্যারের সার্বিক তত্ত্বাবধানে সে জাপানে পৌঁছায়।'}
          </p>
        </div>

        {/* Live Journey Progress Meter */}
        <div className="bg-slate-950 border border-slate-800/90 rounded-2xl p-4 flex items-center gap-5 min-w-[260px]">
          <div>
            <div className="text-[11px] font-medium text-slate-400">সামগ্রিক জার্নি অগ্রগতি</div>
            <div className="text-2xl font-black font-mono text-emerald-400">
              {mode === 'student_portal' ? `${totalJourneyProgress}%` : '৭টি ধাপ'}
            </div>
            <div className="text-[10px] text-slate-500">
              {mode === 'student_portal' ? 'ধাপ ২ (ভাষা শিক্ষা) চলমান' : '১০০% স্বচ্ছ ও নির্ভরযোগ্য'}
            </div>
          </div>

          <div className="flex-1 space-y-1.5">
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 h-full rounded-full transition-all duration-700"
                style={{ width: mode === 'student_portal' ? `${totalJourneyProgress}%` : '100%' }}
              ></div>
            </div>
            <div className="text-[10px] text-right font-mono text-slate-400">
              {mode === 'student_portal' ? `ধাপ ${completedStages + 1} / ৭` : '৭ / ৭ মাইলস্টোন'}
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Interactive Milestone Stepper (Scrollable on Mobile) */}
      <div className="overflow-x-auto pb-3 scrollbar-none">
        <div className="flex items-center min-w-[760px] justify-between relative px-2">
          {/* Stepper Track Line */}
          <div className="absolute top-5 left-8 right-8 h-1 bg-slate-800 -z-0"></div>

          {stages.map((stage, idx) => {
            const isSelected = selectedStageId === stage.id;
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';

            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className="group relative z-10 flex flex-col items-center focus:outline-none text-center px-1"
                style={{ width: `${100 / stages.length}%` }}
              >
                {/* Step Circle */}
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-lg ${
                    isCompleted
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-950/80'
                      : isCurrent
                      ? 'bg-red-600 text-white ring-4 ring-red-950 animate-pulse'
                      : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500'
                  } ${isSelected ? 'scale-110 ring-red-500' : ''}`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <span>{stage.stepNumber}</span>
                  )}
                </div>

                {/* Stage Title */}
                <div className="mt-2.5 max-w-[100px]">
                  <span 
                    className={`block text-[11px] font-bold leading-tight transition-colors line-clamp-2 ${
                      isSelected
                        ? 'text-white'
                        : isCurrent
                        ? 'text-red-400'
                        : isCompleted
                        ? 'text-emerald-400'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    ধাপ {stage.stepNumber}
                  </span>
                  <span className="block text-[10px] text-slate-500 truncate mt-0.5">
                    {stage.category === 'language' ? 'ভাষা ক্লাস' : stage.category === 'visa_processing' ? 'সিওই ফাইল' : stage.titleBn.split(',')[0]}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="mt-1">
                  {isCompleted && (
                    <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800/80 px-1.5 py-0.2 rounded font-mono">
                      সম্পন্ন
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-[9px] bg-red-950 text-red-400 border border-red-800/80 px-1.5 py-0.2 rounded font-mono font-bold animate-pulse">
                      চলমান {stage.progressPercent}%
                    </span>
                  )}
                  {!isCompleted && !isCurrent && (
                    <span className="text-[9px] bg-slate-950 text-slate-500 border border-slate-800 px-1.5 py-0.2 rounded font-mono">
                      অপেক্ষমাণ
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed View of the Selected Milestone */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-7 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Stage Information (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold font-mono">
                মাইলস্টোন ০{activeStage.stepNumber}
              </span>
              
              <span className={`text-xs px-2.5 py-0.5 rounded-md font-mono font-bold ${
                activeStage.status === 'completed'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : activeStage.status === 'current'
                  ? 'bg-red-950 text-red-400 border border-red-800'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}>
                {activeStage.status === 'completed' ? '✅ ধাপটি সফলভাবে সম্পন্ন হয়েছে' : activeStage.status === 'current' ? '🔄 বর্তমানে এই ধাপে কাজ চলছে' : '⏳ পরবর্তী পদক্ষেপ'}
              </span>

              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {activeStage.estimatedDuration}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              {activeStage.titleBn}
            </h3>
            <p className="text-xs font-mono text-slate-400">
              {activeStage.title}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              {activeStage.descriptionBn}
            </p>

            {/* Key Deliverable Box */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
              <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-red-400" />
                <span>এই ধাপের প্রধান আউটপুট ও প্রাপ্তি:</span>
              </div>
              <p className="text-xs font-semibold text-slate-200">
                {activeStage.keyDeliverable}
              </p>
            </div>

            {/* What the student needs to do right now */}
            <div className="bg-amber-950/30 border border-amber-900/50 rounded-xl p-3.5 space-y-1">
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>এখন আপনার করণীয় (Action Required):</span>
              </div>
              <p className="text-xs text-amber-200/90 font-medium">
                {activeStage.studentActionRequiredBn}
              </p>
            </div>

          </div>

          {/* Mentor & Actions Card (Right 4 cols) */}
          <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                দায়িত্বপ্রাপ্ত মেন্টর ও তত্ত্বাবধায়ক:
              </div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <User className="w-4 h-4 text-red-400" />
                <span>{activeStage.mentor}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                {activeStage.mentorRole}
              </div>
            </div>

            {/* Progress Bar for this Stage */}
            <div className="space-y-1 pt-2 border-t border-slate-800">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">এই ধাপের অগ্রগতি:</span>
                <span className="font-mono font-bold text-white">{activeStage.progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    activeStage.status === 'completed'
                      ? 'bg-emerald-500'
                      : activeStage.status === 'current'
                      ? 'bg-red-500'
                      : 'bg-slate-700'
                  }`}
                  style={{ width: `${activeStage.progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Interactive Action Buttons */}
            <div className="space-y-2 pt-2">
              {activeStage.actionButtonText && (
                <button
                  onClick={() => handleAction(activeStage)}
                  className="w-full py-2.5 px-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <span>{activeStage.actionButtonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Direct WhatsApp link to assigned mentor */}
              {activeStage.whatsappNumber && (
                <a
                  href={`https://wa.me/${activeStage.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `হ্যালো! আমি DILS থেকে ${studentName} (ID: ${studentId})। ${activeStage.titleBn} সংক্রান্ত বিষয়ে কথা বলতে চাই।`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>মেন্টরের সাথে WhatsApp এ কথা বলুন</span>
                </a>
              )}
            </div>

            <div className="text-[10px] text-slate-500 text-center">
              অফিসিয়াল ক্যাম্পাস: {DILS_INFO.address.split(',')[0]}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
