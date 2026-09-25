import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  Flame, 
  Zap, 
  Headphones, 
  Sunrise, 
  CheckCircle2, 
  Lock, 
  Volume2, 
  RotateCw, 
  Brain, 
  Clock, 
  ChevronRight, 
  X, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  ShieldCheck,
  TrendingUp,
  BarChart2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AchievementBadge, SRSReviewItem, LangMode } from '../types';
import { playPronunciation } from '../utils/audioQr';

interface NihomiAchievementBadgeProps {
  studentName?: string;
  studentId?: string;
  lang?: LangMode;
  onOpenLiveClass?: () => void;
  onOpenExam?: () => void;
}

const INITIAL_BADGES: AchievementBadge[] = [
  {
    id: 'badge-early-bird',
    title: 'Early Bird Learner',
    titleBn: 'প্রভাতী শিক্ষার্থী (Early Bird)',
    description: 'Attend morning Japanese batches or complete morning voice drills before 9:00 AM.',
    descriptionBn: 'সকাল ৯টার পূর্বে মর্নিং ব্যাচে অংশগ্রহণ অথবা স্পিচ ড্রিল সম্পন্ন করা।',
    category: 'attendance',
    tier: 'bronze',
    icon: 'sunrise',
    isUnlocked: true,
    unlockedAt: '18 Sept 2026',
    progressCurrent: 10,
    progressTarget: 10,
    metricLabel: '১০টি মর্নিং সেশন সম্পন্ন',
    xpReward: 150
  },
  {
    id: 'badge-kanji-bronze',
    title: 'Kanji Master — Bronze',
    titleBn: 'কাঞ্জি মাস্টার — ব্রোঞ্জ (Bronze)',
    description: 'Master 25 essential JLPT N5 Kanji with 90%+ retention in SRS.',
    descriptionBn: 'স্পেসড রিপিটেশনে ২৫টি অপরিহার্য এন-৫ কাঞ্জি ৯০%+ ধারণক্ষমতায় আয়ত্ত করা।',
    category: 'kanji',
    tier: 'bronze',
    icon: 'kanji',
    isUnlocked: true,
    unlockedAt: '12 Sept 2026',
    progressCurrent: 25,
    progressTarget: 25,
    metricLabel: '২৫ / ২৫ কাঞ্জি',
    xpReward: 200
  },
  {
    id: 'badge-kanji-silver',
    title: 'Kanji Master — Silver',
    titleBn: 'কাঞ্জি মাস্টার — সিলভার (Silver)',
    description: 'Master 75 JLPT N5 Kanji compounds with writing and stroke recall.',
    descriptionBn: '৭৫টি কাঞ্জি ও অর্থ নিখুঁতভাবে স্টপ-ওয়াচ রিভিশনে আয়ত্ত করা।',
    category: 'kanji',
    tier: 'silver',
    icon: 'kanji',
    isUnlocked: false,
    progressCurrent: 58,
    progressTarget: 75,
    metricLabel: '৫৮ / ৭৫ কাঞ্জি (১৭টি বাকি)',
    xpReward: 500
  },
  {
    id: 'badge-kanji-gold',
    title: 'Kanji Master — Gold',
    titleBn: 'কাঞ্জি মাস্টার — গোল্ড (Gold)',
    description: 'Master 150+ JLPT N5 & N4 Kanji with complete Onyomi & Kunyomi readings.',
    descriptionBn: '১৫০+ কাঞ্জির ওন-ইওমি এবং কুন-ইওমি সহ শতভাগ স্মৃতিতে গেঁথে নেওয়া।',
    category: 'kanji',
    tier: 'gold',
    icon: 'kanji',
    isUnlocked: false,
    progressCurrent: 58,
    progressTarget: 150,
    metricLabel: '৫৮ / ১৫০ কাঞ্জি',
    xpReward: 1200
  },
  {
    id: 'badge-streak-king',
    title: 'Streak King (7-Day)',
    titleBn: 'ধারাবাহিকতা সম্রাট (Streak King)',
    description: 'Complete daily Japanese shadowing or quizzes for 7 consecutive days.',
    descriptionBn: 'টানা ৭ দিন প্ল্যাটফর্মে এসে দৈনিক অডিও শ্যাডোয়িং অথবা কুইজ প্র্যাকটিস করা।',
    category: 'streak',
    tier: 'gold',
    icon: 'flame',
    isUnlocked: false,
    progressCurrent: 6,
    progressTarget: 7,
    metricLabel: '৬ / ৭ দিন (আর মাত্র ১ দিন বাকি!)',
    xpReward: 400
  },
  {
    id: 'badge-acoustic-pioneer',
    title: 'Acoustic Pioneer',
    titleBn: 'উচ্চারণ বিশারদ (Acoustic Pioneer)',
    description: 'Clock over 10 hours of active native Japanese pronunciation & shadowing practice.',
    descriptionBn: 'নেটিভ জাপানিজ অ্যাকসেন্ট ও ডায়লগ শ্যাডোয়িং এ ১০+ ঘণ্টা অনুশীলন সম্পন্ন করা।',
    category: 'audio',
    tier: 'silver',
    icon: 'headphones',
    isUnlocked: true,
    unlockedAt: '22 Sept 2026',
    progressCurrent: 12.5,
    progressTarget: 10,
    metricLabel: '১২.৫ ঘণ্টা অডিও ড্রিল',
    xpReward: 350
  },
  {
    id: 'badge-exam-ace',
    title: 'JLPT Exam Ace',
    titleBn: 'জেএলপিটি অপটিমাইজার (Exam Ace)',
    description: 'Score 85% or higher on a timed JLPT N5 CBT Mock Exam.',
    descriptionBn: 'টাইমড জেএলপিটি এন-৫ মক টেস্টে ৮৫% এর অধিক নম্বর পেয়ে উত্তীর্ণ হওয়া।',
    category: 'exam',
    tier: 'gold',
    icon: 'zap',
    isUnlocked: true,
    unlockedAt: '24 Sept 2026',
    progressCurrent: 92,
    progressTarget: 85,
    metricLabel: 'সর্বোচ্চ স্কোর: ৯২%',
    xpReward: 600
  }
];

const INITIAL_SRS_CARDS: SRSReviewItem[] = [
  {
    id: 'srs-01',
    kanji: '日',
    furigana: 'ひ / にち',
    romaji: 'hi / nichi',
    meaningBn: 'দিন, সূর্য, জাপান (Day / Sun / Japan)',
    meaningEn: 'Day, Sun, Japan',
    jlptLevel: 'N5',
    exampleSentenceJp: '日本へ行きます。',
    exampleSentenceBn: 'আমি জাপানে যাব। (Nihon e ikimasu)',
    intervalDays: 7,
    reviewState: 'review_due',
    retentionPercent: 88
  },
  {
    id: 'srs-02',
    kanji: '本',
    furigana: 'ほん / もと',
    romaji: 'hon / moto',
    meaningBn: 'বই, মূল উৎস (Book / Origin)',
    meaningEn: 'Book, Origin',
    jlptLevel: 'N5',
    exampleSentenceJp: '日本語の本を読みます。',
    exampleSentenceBn: 'জাপানি ভাষার বই পড়ছি। (Nihongo no hon o yomimasu)',
    intervalDays: 14,
    reviewState: 'review_due',
    retentionPercent: 94
  },
  {
    id: 'srs-03',
    kanji: '学',
    furigana: 'がく / まな・ぶ',
    romaji: 'gaku / mana-bu',
    meaningBn: 'শেখা, পড়াশোনা (Study / Learn)',
    meaningEn: 'Study, Learn, School',
    jlptLevel: 'N5',
    exampleSentenceJp: '大学で勉強します。',
    exampleSentenceBn: 'বিশ্ববিদ্যালয়ে পড়াশোনা করি। (Daigaku de benkyou shimasu)',
    intervalDays: 4,
    reviewState: 'learning',
    retentionPercent: 78
  },
  {
    id: 'srs-04',
    kanji: '生',
    furigana: 'せい / なま / い・きる',
    romaji: 'sei / nama / i-kiru',
    meaningBn: 'জীবন, জন্ম, শিক্ষার্থী (Life / Student)',
    meaningEn: 'Life, Genuine, Student',
    jlptLevel: 'N5',
    exampleSentenceJp: '留学生です。',
    exampleSentenceBn: 'আমি একজন বিদেশি শিক্ষার্থী। (Ryuugakusei desu)',
    intervalDays: 30,
    reviewState: 'mastered',
    retentionPercent: 98
  },
  {
    id: 'srs-05',
    kanji: '先',
    furigana: 'せん / さき',
    romaji: 'sen / saki',
    meaningBn: 'পূর্ববর্তী, আগে, শিক্ষক (Previous / Ahead / Teacher)',
    meaningEn: 'Before, Ahead, Teacher',
    jlptLevel: 'N5',
    exampleSentenceJp: '先生、おはようございます。',
    exampleSentenceBn: 'শিক্ষক মহাশয়, সুপ্রভাত। (Sensei, ohayou gozaimasu)',
    intervalDays: 21,
    reviewState: 'mastered',
    retentionPercent: 96
  },
  {
    id: 'srs-06',
    kanji: '友',
    furigana: 'とも / ゆう',
    romaji: 'tomo / yuu',
    meaningBn: 'বন্ধু (Friend)',
    meaningEn: 'Friend',
    jlptLevel: 'N5',
    exampleSentenceJp: '友達と東京へ行きます。',
    exampleSentenceBn: 'বন্ধুর সাথে টোকিও যাব। (Tomodachi to Toukyou e ikimasu)',
    intervalDays: 2,
    reviewState: 'new',
    retentionPercent: 65
  }
];

export const NihomiAchievementBadge: React.FC<NihomiAchievementBadgeProps> = ({
  studentName = 'Md. Tanvir Hasan',
  studentId = 'DILS-2026-0048',
  lang = 'bn',
  onOpenLiveClass,
  onOpenExam
}) => {
  const [badges, setBadges] = useState<AchievementBadge[]>(INITIAL_BADGES);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unlocked' | 'locked' | 'kanji'>('all');
  
  // SRS Memory drill modal state
  const [isSRSModalOpen, setIsSRSModalOpen] = useState<boolean>(false);
  const [srsCards, setSrsCards] = useState<SRSReviewItem[]>(INITIAL_SRS_CARDS);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);
  const [reviewedCount, setReviewedCount] = useState<number>(0);
  const [rememberedCount, setRememberedCount] = useState<number>(0);
  const [totalXPEarned, setTotalXPEarned] = useState<number>(0);
  
  // Badge unlock spotlight modal
  const [spotlightBadge, setSpotlightBadge] = useState<AchievementBadge | null>(null);

  // Aggregated SRS Metrics
  const masteredCount = 65;
  const learningCount = 45;
  const reviewDueCount = 18;
  const newCount = 32;
  const totalKanjiInSystem = masteredCount + learningCount + reviewDueCount + newCount;
  const retentionRate = 92.4;

  const unlockedCount = badges.filter(b => b.isUnlocked).length;
  const totalXP = badges.reduce((acc, b) => b.isUnlocked ? acc + b.xpReward : acc, 0) + totalXPEarned;

  const handleCelebrateBadge = (badge: AchievementBadge) => {
    setSpotlightBadge(badge);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleStartSRS = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSessionCompleted(false);
    setReviewedCount(0);
    setRememberedCount(0);
    setIsSRSModalOpen(true);
  };

  const handleCardFeedback = (remembered: boolean) => {
    const currentCard = srsCards[currentCardIndex];
    setReviewedCount(prev => prev + 1);

    if (remembered) {
      setRememberedCount(prev => prev + 1);
      setTotalXPEarned(prev => prev + 15);
      // Play brief audio reinforcement
      playPronunciation(currentCard.kanji);
    }

    if (currentCardIndex + 1 < srsCards.length) {
      setIsFlipped(false);
      setCurrentCardIndex(prev => prev + 1);
    } else {
      setSessionCompleted(true);
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 }
      });
      // Check if streak badge or kanji badge can be unlocked
      setBadges(prev => prev.map(b => {
        if (b.id === 'badge-streak-king' && b.progressCurrent < b.progressTarget) {
          const updatedVal = b.progressCurrent + 1;
          const unlocked = updatedVal >= b.progressTarget;
          return {
            ...b,
            progressCurrent: updatedVal,
            isUnlocked: unlocked,
            unlockedAt: unlocked ? 'Just now' : undefined,
            metricLabel: unlocked ? '৭ / ৭ দিন সম্পন্ন! (Unlocked)' : `${updatedVal} / ৭ দিন`
          };
        }
        return b;
      }));
    }
  };

  const filteredBadges = badges.filter(b => {
    if (selectedFilter === 'unlocked') return b.isUnlocked;
    if (selectedFilter === 'locked') return !b.isUnlocked;
    if (selectedFilter === 'kanji') return b.category === 'kanji';
    return true;
  });

  const getTierColor = (tier?: string) => {
    switch (tier) {
      case 'gold':
        return 'from-amber-500/20 via-yellow-500/10 to-transparent border-amber-500/50 text-amber-300';
      case 'silver':
        return 'from-slate-400/20 via-slate-300/10 to-transparent border-slate-400/50 text-slate-200';
      case 'bronze':
      default:
        return 'from-orange-700/20 via-amber-800/10 to-transparent border-orange-600/50 text-orange-300';
    }
  };

  const renderBadgeIcon = (icon: string, unlocked: boolean) => {
    switch (icon) {
      case 'sunrise':
        return <Sunrise className={`w-6 h-6 ${unlocked ? 'text-amber-400' : 'text-slate-600'}`} />;
      case 'flame':
        return <Flame className={`w-6 h-6 ${unlocked ? 'text-rose-500' : 'text-slate-600'}`} />;
      case 'headphones':
        return <Headphones className={`w-6 h-6 ${unlocked ? 'text-sky-400' : 'text-slate-600'}`} />;
      case 'zap':
        return <Zap className={`w-6 h-6 ${unlocked ? 'text-yellow-400' : 'text-slate-600'}`} />;
      case 'kanji':
      default:
        return <span className={`text-xl font-bold font-serif ${unlocked ? 'text-amber-300' : 'text-slate-600'}`}>漢</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. PERSONAL MEMORY RADAR & FORGETTING CURVE SHIELD */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left Column: Heading & SRS Retention Metrics */}
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-mono font-bold flex items-center gap-1.5 uppercase tracking-wider">
                <Brain className="w-3.5 h-3.5 text-red-400" />
                Nihomi SRS Memory Radar v2.4
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                স্মৃতি ধারণক্ষমতা: {retentionRate}%
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              ব্যক্তিগত কাঞ্জি ও ভোকাবুলারি মেমোরি রাডার
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              জার্মান মনোবিজ্ঞানী হারমান এবিংহাউসের বিস্মরণ বক্ররেখা (Forgetting Curve) রোধ করতে নিহোমির স্পেসড রিপিটেশন অ্যালগরিদম কাজ করে। প্রতিদিন মাত্র ৫ মিনিট রিভিশন দিয়ে স্থায়ী স্মৃতিতে জাপানি কাঞ্জি সংরক্ষণ করুন।
            </p>

            {/* SRS 4-State Visual Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="bg-slate-950/80 border border-emerald-900/60 p-3 rounded-2xl">
                <span className="text-[10px] text-emerald-400 font-bold block mb-0.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  মাস্টার্ড (Mastered)
                </span>
                <div className="text-xl font-black text-white font-mono">{masteredCount} টি</div>
                <span className="text-[10px] text-slate-500">স্থায়ী মেমোরি</span>
              </div>

              <div className="bg-slate-950/80 border border-amber-900/60 p-3 rounded-2xl">
                <span className="text-[10px] text-amber-400 font-bold block mb-0.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  লার্নিং (Learning)
                </span>
                <div className="text-xl font-black text-white font-mono">{learningCount} টি</div>
                <span className="text-[10px] text-slate-500">অনুশীলন চলছে</span>
              </div>

              <div className="bg-slate-950/80 border border-rose-900/60 p-3 rounded-2xl">
                <span className="text-[10px] text-rose-400 font-bold block mb-0.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                  রিভিউ বাকি (Due)
                </span>
                <div className="text-xl font-black text-rose-300 font-mono">{reviewDueCount} টি</div>
                <span className="text-[10px] text-rose-400/80">আজই করতে হবে</span>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 font-bold block mb-0.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                  নতুন (New)
                </span>
                <div className="text-xl font-black text-white font-mono">{newCount} টি</div>
                <span className="text-[10px] text-slate-500">পরবর্তী অধ্যায়ে</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Review Action Trigger */}
          <div className="bg-slate-950 border border-red-900/40 rounded-2xl p-5 sm:p-6 text-center space-y-4 lg:w-80 shrink-0 shadow-xl">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 shadow-inner">
              <Clock className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs text-slate-400 block">আজকের নির্ধারিত দৈনিক রিভিশন</span>
              <strong className="text-white font-bold text-base block mt-0.5">১৮টি কাঞ্জি কার্ড বাকি আছে</strong>
              <span className="text-[11px] text-emerald-400 font-mono mt-1 block">সম্ভাব্য সময়: মাত্র ৪–৫ মিনিট</span>
            </div>

            <button
              onClick={handleStartSRS}
              className="w-full py-3 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>দৈনিক ৫-মিনিট রিভিশন শুরু করুন</span>
            </button>

            <p className="text-[10px] text-slate-500">
              💡 রিভিশন সম্পন্ন করলে কাঞ্জি সিলভার ব্যাজ ও +১৫০ XP যুক্ত হবে।
            </p>
          </div>

        </div>
      </div>

      {/* 2. DYNAMIC ACHIEVEMENT BADGES GALLERY */}
      <div className="space-y-6">
        
        {/* Gallery Title & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>নিহোমি অ্যাচিভমেন্ট ব্যাজ ও রিওয়ার্ডস</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {unlockedCount} / {badges.length} Unlocked
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              ধারাবাহিক পড়াশোনা, মক টেস্ট স্কোর ও সঠিক উচ্চারণের মাধ্যমে ব্যাজ আনলক করুন।
            </p>
          </div>

          {/* XP & Filter Tabs */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-amber-500/30 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-mono">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400">অর্জিত XP:</span>
              <strong className="text-amber-300 font-black">{totalXP} XP</strong>
            </div>

            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1 text-xs">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  selectedFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                সকল
              </button>
              <button
                onClick={() => setSelectedFilter('unlocked')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  selectedFilter === 'unlocked' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                আনলকড ({unlockedCount})
              </button>
              <button
                onClick={() => setSelectedFilter('kanji')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  selectedFilter === 'kanji' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                কাঞ্জি টায়ার
              </button>
            </div>
          </div>
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBadges.map((badge) => {
            const isFinished = badge.isUnlocked;
            const percent = Math.min(100, Math.round((badge.progressCurrent / badge.progressTarget) * 100));

            return (
              <div
                key={badge.id}
                className={`relative rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                  isFinished 
                    ? `bg-gradient-to-b ${getTierColor(badge.tier)} shadow-lg hover:shadow-xl hover:scale-[1.01]` 
                    : 'bg-slate-950/70 border-slate-800/80 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Top Badge Card Strip */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-inner ${
                    isFinished 
                      ? 'bg-slate-900 border-amber-500/40 text-amber-300' 
                      : 'bg-slate-900/60 border-slate-800 text-slate-600'
                  }`}>
                    {renderBadgeIcon(badge.icon, isFinished)}
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-800">
                      +{badge.xpReward} XP
                    </span>
                    {badge.tier && (
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold mt-1">
                        {badge.tier} Tier
                      </span>
                    )}
                  </div>
                </div>

                {/* Badge Info */}
                <div className="space-y-1.5 flex-1">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{badge.titleBn}</span>
                    {isFinished ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                    {badge.descriptionBn}
                  </p>
                </div>

                {/* Progress or Completion Strip */}
                <div className="pt-4 mt-3 border-t border-slate-800/60 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono">{badge.metricLabel}</span>
                    <span className={`font-mono font-bold ${isFinished ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {percent}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFinished ? 'bg-gradient-to-r from-amber-500 to-emerald-400' : 'bg-red-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>

                  {/* Action Link or Unlocked Date */}
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    {isFinished ? (
                      <>
                        <span className="text-[10px] text-slate-500">
                          {badge.unlockedAt ? `অর্জিত: ${badge.unlockedAt}` : 'আনলকড'}
                        </span>
                        <button
                          onClick={() => handleCelebrateBadge(badge)}
                          className="text-amber-400 hover:text-amber-300 font-semibold text-[10px] flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>উদযাপন</span>
                        </button>
                      </>
                    ) : (
                      <span className="text-[10px] text-slate-500 italic">
                        নিয়মিত অনুশীলনে স্বয়ংক্রিয় আনলক হবে
                      </span>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* 3. INTERACTIVE 5-MINUTE SRS REVIEW MODAL */}
      {isSRSModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-red-600/20 text-red-400">
                  <Brain className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-base font-bold text-white">দৈনিক স্পেসড রিপিটেশন রিভিশন</h4>
                  <span className="text-xs text-slate-400 font-mono">
                    কার্ড {currentCardIndex + 1} / {srsCards.length}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsSRSModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!sessionCompleted ? (
              <div className="space-y-6">
                
                {/* Progress Bar inside Drill */}
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div 
                    className="bg-red-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${((currentCardIndex) / srsCards.length) * 100}%` }}
                  ></div>
                </div>

                {/* The Flashcard Container */}
                <div 
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 sm:p-8 min-h-[220px] flex flex-col items-center justify-center text-center cursor-pointer transition-all shadow-inner relative group select-none"
                >
                  <span className="absolute top-3 left-3 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                    JLPT {srsCards[currentCardIndex].jlptLevel}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playPronunciation(srsCards[currentCardIndex].kanji);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="উচ্চারণ শুনুন"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                  </button>

                  {/* Main Character Display */}
                  <div className="text-6xl sm:text-7xl font-bold font-serif text-white tracking-widest my-2 drop-shadow-md">
                    {srsCards[currentCardIndex].kanji}
                  </div>

                  {!isFlipped ? (
                    <div className="text-xs text-slate-500 mt-2 flex items-center gap-1 group-hover:text-slate-300 transition-colors">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>অর্থ ও উচ্চারণ দেখতে কার্ডে চাপুন (Tap to reveal)</span>
                    </div>
                  ) : (
                    <div className="space-y-2 mt-2 animate-in fade-in zoom-in-95 duration-200">
                      <div className="text-base sm:text-lg font-bold text-amber-300 font-mono">
                        {srsCards[currentCardIndex].furigana}
                        <span className="text-xs text-slate-400 ml-2">({srsCards[currentCardIndex].romaji})</span>
                      </div>
                      <div className="text-sm font-bold text-white">
                        {srsCards[currentCardIndex].meaningBn}
                      </div>
                      <div className="text-xs text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800/80">
                        {srsCards[currentCardIndex].exampleSentenceJp} — <span className="text-slate-300">{srsCards[currentCardIndex].exampleSentenceBn}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* SRS Response Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => handleCardFeedback(false)}
                    className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-rose-300 hover:text-rose-200 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 border border-rose-900/40 shadow transition-all active:scale-98"
                  >
                    <ThumbsDown className="w-4 h-4 text-rose-400" />
                    <span>ভুলে গেছি (Review Soon)</span>
                  </button>

                  <button
                    onClick={() => handleCardFeedback(true)}
                    className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all active:scale-98"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>মনে আছে (+15 XP)</span>
                  </button>
                </div>

              </div>
            ) : (
              /* Session Completion Screen */
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-black text-white">অসাধারণ প্রস্তুতি!</h4>
                  <p className="text-xs text-slate-400">
                    আজকের ৫-মিনিটের স্পেসড রিপিটেশন রিভিশন সম্পন্ন হয়েছে।
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">মোট রিভিশন:</span>
                    <strong className="text-white font-mono text-sm">{reviewedCount} টি</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">সঠিক উত্তর:</span>
                    <strong className="text-emerald-400 font-mono text-sm">{rememberedCount} টি</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">অর্জিত বোনাস:</span>
                    <strong className="text-amber-400 font-mono text-sm">+{totalXPEarned} XP</strong>
                  </div>
                </div>

                <p className="text-[11px] text-emerald-400">
                  ✅ আপনার মেমোরি রাডারে স্মৃতি ধারণক্ষমতা বৃদ্ধি পেয়ে <strong>{retentionRate + 0.6}%</strong> হয়েছে।
                </p>

                <button
                  onClick={() => setIsSRSModalOpen(false)}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-all"
                >
                  লার্নিং পোর্টালে ফিরে যান
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 4. BADGE SPOTLIGHT CELEBRATION MODAL */}
      {spotlightBadge && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl w-full max-w-md p-6 text-center space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSpotlightBadge(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center text-amber-300 shadow-xl shadow-amber-500/10 mt-2">
              {renderBadgeIcon(spotlightBadge.icon, true)}
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800">
                Official Achievement Credential
              </span>
              <h3 className="text-xl font-black text-white mt-2">{spotlightBadge.titleBn}</h3>
              <p className="text-xs text-slate-400 mt-1">{spotlightBadge.descriptionBn}</p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-around text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">অর্জিত রিওয়ার্ড</span>
                <strong className="text-amber-300 font-bold">+{spotlightBadge.xpReward} XP</strong>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <span className="text-slate-500 block text-[10px]">শিক্ষার্থী</span>
                <strong className="text-white">{studentName}</strong>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  confetti({ particleCount: 70, spread: 80 });
                }}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow"
              >
                <Sparkles className="w-4 h-4" />
                <span>কনফেটি উল্লাস</span>
              </button>
              <button
                onClick={() => setSpotlightBadge(null)}
                className="py-2.5 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl"
              >
                বন্ধ করুন
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
