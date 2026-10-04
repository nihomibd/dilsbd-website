import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, Trophy, Clock, CheckCircle2, ArrowRight, Play, Award } from 'lucide-react';
import { DailyMission, UserMissionProgress } from '../../types';

interface DailyMissionCardProps {
  mission: DailyMission;
  progress: UserMissionProgress;
  studentName?: string;
  onStartMission: () => void;
}

export const DailyMissionCard: React.FC<DailyMissionCardProps> = ({
  mission,
  progress,
  studentName = 'Student',
  onStartMission
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-900 via-slate-900 to-red-950 text-white border-2 border-red-500/30 rounded-3xl p-6 sm:p-7 shadow-xl shadow-red-950/20 relative overflow-hidden"
    >
      {/* Background Japanese Aesthetic Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-5">
        
        {/* Top Bar: Welcome Kicker & Gamified Status Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-300 font-mono">
              Welcome back, <strong className="text-white">{studentName}</strong> 🇯🇵
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-xs">
            {/* Streak Counter */}
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full font-bold font-mono">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{progress.currentStreak} Day Streak 🔥</span>
            </div>

            {/* Total XP Counter */}
            <div className="inline-flex items-center gap-1.5 bg-red-500/20 text-red-300 border border-red-500/40 px-3 py-1 rounded-full font-bold font-mono">
              <Trophy className="w-3.5 h-3.5 text-red-400" />
              <span>{progress.totalXp} XP</span>
            </div>
          </div>
        </div>

        {/* Mission Content Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-8 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-red-600/80 text-white px-2.5 py-0.5 rounded">
                TODAY'S 5-MIN MISSION
              </span>
              <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Category: {mission.category}
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>+{mission.xpReward} XP</span>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {mission.titleBn}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {mission.scenarioDescriptionBn}
            </p>

            <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-red-400" />
                <span>সময়: মাত্র ৫ মিনিট</span>
              </span>
              <span>·</span>
              <span>লেভেল: {mission.difficulty}</span>
              <span>·</span>
              <span>৪-ধাপের ইন্টারঅ্যাক্টিভ লার্নিং</span>
            </div>
          </div>

          {/* Action CTA Side */}
          <div className="md:col-span-4 flex flex-col justify-center items-start md:items-end">
            {progress.isTodayCompleted ? (
              <div className="space-y-2 text-right w-full md:w-auto">
                <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 px-4 py-2 rounded-xl text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>মিশন সম্পন্ন! ✓ (+{mission.xpReward} XP)</span>
                </div>
                <div>
                  <button
                    onClick={onStartMission}
                    className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    পুনরায় অনুশীলন করুন (Replay)
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onStartMission}
                className="w-full md:w-auto px-6 py-3.5 bg-red-600 hover:bg-red-500 active:scale-98 text-white font-bold text-sm rounded-2xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>মিশন শুরু করুন (Start)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default DailyMissionCard;
