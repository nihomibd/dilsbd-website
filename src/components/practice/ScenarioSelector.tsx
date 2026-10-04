import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  MapPin, 
  User, 
  Lock, 
  ArrowRight, 
  Bot, 
  Mic,
  Award
} from 'lucide-react';
import { AISpeakingScenario, UserSubscription } from '../../types';
import { AI_SCENARIOS } from '../../data/aiScenariosData';

interface ScenarioSelectorProps {
  onSelectScenario: (scenario: AISpeakingScenario) => void;
  subscription?: UserSubscription | null;
  onUpgradeToPro?: () => void;
}

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  onSelectScenario,
  subscription,
  onUpgradeToPro
}) => {
  const isFreePlan = subscription?.planId === 'free';

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-red-950/60 via-slate-900 to-slate-900 border border-red-500/30 rounded-2xl p-6 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 bg-red-950 border border-red-800/80 px-2.5 py-0.5 rounded">
            <Bot className="w-3.5 h-3.5" />
            <span>NIHOMI AI JAPANESE SPEAKING LAB 🎙️</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            জাপানের বাস্তব পরিস্থিতিতে স্পিকিং প্র্যাকটিস
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            টোকিওতে পা রেখে যেকোনো দোকানে, স্টেশনে বা ইন্টারভিউতে দ্বিধাহীনভাবে কথা বলুন। আমাদের এআই পার্টনার আপনাকে রিয়েল-টাইম জাপানি ফিডব্যাক দেবে।
          </p>
        </div>

        {isFreePlan && (
          <div className="bg-amber-950/60 border border-amber-500/40 rounded-xl p-3 text-right shrink-0">
            <span className="text-[10px] font-mono text-amber-300 font-bold block">
              FREE PLAN PREVIEW (১টি সেশন ফ্রি)
            </span>
            <button
              onClick={onUpgradeToPro}
              className="mt-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow transition-all cursor-pointer inline-flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>আনলিমিটেড আনলক করুন</span>
            </button>
          </div>
        )}
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AI_SCENARIOS.map((scenario, idx) => {
          const isLocked = isFreePlan && idx > 0;

          return (
            <motion.div
              key={scenario.id}
              whileHover={{ y: isLocked ? 0 : -3 }}
              className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                isLocked 
                  ? 'bg-slate-950/60 border-slate-800/80 opacity-70' 
                  : 'bg-slate-900 border-slate-800 hover:border-red-500/50 shadow-lg'
              }`}
            >
              <div className="space-y-3">
                
                {/* Top Badges */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl p-2 bg-slate-950 rounded-xl border border-slate-800 inline-block">
                    {scenario.characterAvatar}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {scenario.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
                      {scenario.difficulty}
                    </span>
                  </div>
                </div>

                {/* Scenario Title & Description */}
                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                    {scenario.titleBn}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {scenario.title}
                  </p>
                </div>

                {/* Role & Location Meta */}
                <div className="space-y-1 text-xs text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>কথা বলবেন: <strong className="text-slate-200">{scenario.roleJapanese}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>স্থান: <strong className="text-slate-200">{scenario.location}</strong></span>
                  </div>
                </div>

                {/* First Phrase Preview */}
                <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl text-xs space-y-0.5">
                  <span className="text-[10px] text-slate-500 font-mono block">INITIAL GREETING:</span>
                  <div className="font-bold text-slate-200 font-serif">"{scenario.initialPrompt.japanese}"</div>
                  <div className="text-[11px] text-slate-400">{scenario.initialPrompt.bangla}</div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-4 mt-2 border-t border-slate-800/60">
                {isLocked ? (
                  <button
                    onClick={onUpgradeToPro}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pro মেম্বারশিপে আনলক করুন</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectScenario(scenario)}
                    className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-red-600/20 cursor-pointer transition-all active:scale-98"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>অনুশীলন শুরু করুন (Start Speaking)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
};

export default ScenarioSelector;
