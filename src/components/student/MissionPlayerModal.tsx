import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  Trophy, 
  Award, 
  RotateCcw,
  BookOpen,
  Headphones,
  Check,
  Calendar
} from 'lucide-react';
import { DailyMission, MissionStep } from '../../types';

interface MissionPlayerModalProps {
  mission: DailyMission;
  onClose: () => void;
  onComplete: (missionId: string, xpReward: number) => void;
  nextMissionTitle?: string;
}

export const MissionPlayerModal: React.FC<MissionPlayerModalProps> = ({
  mission,
  onClose,
  onComplete,
  nextMissionTitle = 'Konbini Order 🏪 (Making requests)'
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const step: MissionStep = mission.steps[currentStepIdx];
  const totalSteps = mission.steps.length;

  const handlePlayAudio = (phrase?: string) => {
    if (!phrase) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectOption = (optionId: string) => {
    if (showFeedback) return;
    setSelectedOptionId(optionId);
    setShowFeedback(true);
  };

  const handleNextStep = () => {
    setShowFeedback(false);
    setSelectedOptionId(null);

    if (currentStepIdx < totalSteps - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      // Finished all 4 steps!
      setIsCompleted(true);
      onComplete(mission.id, mission.xpReward);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full text-white shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
      >
        
        {/* Top Header & Progress Stepper */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
              {mission.title}
            </h4>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-400">
              {isCompleted ? 'COMPLETED' : `STEP ${currentStepIdx + 1} OF ${totalSteps}`}
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4-Step Visual Progress Bar */}
        {!isCompleted && (
          <div className="grid grid-cols-4 bg-slate-950 border-b border-slate-800/80 text-[10px] font-mono font-bold text-center">
            {['1. LEARN', '2. LISTEN', '3. CHOOSE', '4. COMPLETE'].map((label, idx) => (
              <div 
                key={label}
                className={`py-2 border-b-2 transition-all ${
                  idx === currentStepIdx 
                    ? 'border-red-500 text-red-400 bg-red-500/10' 
                    : idx < currentStepIdx 
                    ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5' 
                    : 'border-transparent text-slate-600'
                }`}
              >
                {label}
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Step Body Viewport */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* ACTIVE STEPS 1 TO 4 */}
          {!isCompleted && (
            <motion.div
              key={currentStepIdx}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Step Header */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-red-400 uppercase tracking-widest block font-mono">
                  {step.titleBn}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {step.descriptionBn}
                </h3>
                <p className="text-xs text-slate-400">
                  {step.description}
                </p>
              </div>

              {/* Japanese Phrase Box (for Learn, Listen & Complete) */}
              {step.japanesePhrase && (
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center space-y-3 relative">
                  <div className="text-2xl sm:text-4xl font-black text-white font-serif tracking-wider">
                    {step.japanesePhrase}
                  </div>

                  {step.romaji && (
                    <div className="text-xs font-mono text-amber-300 font-semibold">
                      {step.romaji}
                    </div>
                  )}

                  {step.banglaMeaning && (
                    <div className="text-sm font-semibold text-slate-300">
                      {step.banglaMeaning}
                    </div>
                  )}

                  {/* Native Audio Listen Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => handlePlayAudio(step.audioText || step.japanesePhrase)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 active:scale-95 text-red-300 border border-red-500/40 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4 text-red-400" />
                      <span>উচ্চারণ শুনুন (Listen Native Audio) 🔊</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Situation Prompt & Interactive Options (for 'choose' step) */}
              {step.type === 'choose' && step.options && (
                <div className="space-y-3 pt-2">
                  {step.promptSituation && (
                    <div className="p-3.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs font-bold text-amber-300">
                      {step.promptSituation}
                    </div>
                  )}

                  <div className="space-y-2.5">
                    {step.options.map((opt, idx) => {
                      const isSelected = selectedOptionId === opt.id;
                      const isCorrect = opt.isCorrect;

                      let style = "bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200";
                      if (showFeedback) {
                        if (isSelected && isCorrect) {
                          style = "bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md";
                        } else if (isSelected && !isCorrect) {
                          style = "bg-rose-950/80 border-rose-500 text-rose-200";
                        } else if (!isSelected && isCorrect) {
                          style = "bg-emerald-950/40 border-emerald-600/60 text-emerald-300";
                        }
                      } else if (isSelected) {
                        style = "bg-red-950/80 border-red-500 text-red-200";
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(opt.id)}
                          className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${style}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-slate-900 text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <div>
                              <div className="text-xs sm:text-sm font-bold text-white">{opt.text}</div>
                              {opt.textBn && <div className="text-[11px] text-slate-400 mt-0.5">{opt.textBn}</div>}
                            </div>
                          </div>

                          {showFeedback && (
                            <div>
                              {isCorrect ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                              ) : isSelected ? (
                                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                              ) : null}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {showFeedback && step.feedbackBn && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 space-y-1"
                    >
                      <strong className="text-amber-400 block font-semibold">💡 কালচারাল নোট:</strong>
                      <p>{step.feedbackBn}</p>
                    </motion.div>
                  )}
                </div>
              )}

            </motion.div>
          )}

          {/* CELEBRATORY COMPLETION VIEW */}
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-6 py-4"
            >
              <div className="w-20 h-20 rounded-3xl bg-red-600/20 border-2 border-red-500/40 text-red-400 mx-auto flex items-center justify-center text-3xl shadow-xl">
                🏆
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
                  Mission Complete ✨
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  অভিনন্দন! আজকের মিশন সম্পন্ন!
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  আপনি সফলভাবে ৫ মিনিটের লার্নিং লুপ সম্পন্ন করে জাপানের বাস্তব যোগাযোগে আরও এক ধাপ এগিয়ে গেলেন।
                </p>
              </div>

              {/* Rewards Grid */}
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-1">
                  <div className="text-xs text-slate-400 font-mono">XP EARNED</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">+{mission.xpReward} XP</div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-1">
                  <div className="text-xs text-slate-400 font-mono">STREAK ADVANCED</div>
                  <div className="text-2xl font-black text-amber-400 font-mono flex items-center justify-center gap-1">
                    <Flame className="w-5 h-5 fill-amber-400" />
                    <span>Streak +1</span>
                  </div>
                </div>
              </div>

              {/* Tomorrow's Mission Preview */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl max-w-md mx-auto text-left flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">
                    আগামীকালের মিশন প্রিভিউ
                  </span>
                  <span className="text-xs font-bold text-white block">
                    {nextMissionTitle}
                  </span>
                </div>
                <div className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded font-mono font-semibold">
                  Tomorrow
                </div>
              </div>

            </motion.div>
          )}

        </div>

        {/* Modal Bottom Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          {!isCompleted ? (
            <>
              <button
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                পরে সম্পন্ন করুন (Skip for now)
              </button>

              <button
                onClick={handleNextStep}
                disabled={step.type === 'choose' && !showFeedback}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{currentStepIdx === totalSteps - 1 ? 'মিশন সম্পন্ন করুন ✨' : 'পরবর্তী ধাপ →'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer text-center"
            >
              ড্যাশবোর্ডে ফিরুন (Back to Dashboard)
            </button>
          )}
        </div>

      </motion.div>
    </div>
  );
};

export default MissionPlayerModal;
