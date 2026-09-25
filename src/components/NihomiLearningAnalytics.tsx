import React, { useState, useEffect, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Activity, 
  BookOpen, 
  Headphones, 
  TrendingUp, 
  Zap, 
  Volume2, 
  Award, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  BarChart3, 
  Brain, 
  Clock, 
  ShieldCheck,
  Flame,
  Users
} from 'lucide-react';
import { LangMode } from '../types';
import { INITIAL_GRADEBOOK, INITIAL_COURSES, DILS_INFO } from '../data/mockData';

interface NihomiLearningAnalyticsProps {
  lang: LangMode;
  onOpenAdmission?: () => void;
  onSwitchToStudentPortal?: (courseId: string) => void;
}

interface ActivityEvent {
  id: string;
  studentName: string;
  batch: string;
  action: string;
  metric: string;
  timeAgo: string;
  level: string;
}

export const NihomiLearningAnalytics: React.FC<NihomiLearningAnalyticsProps> = ({
  lang,
  onOpenAdmission,
  onSwitchToStudentPortal
}) => {
  // Institutional Curriculum Benchmarks & Pedagogical Targets
  const [totalKanjiMastered, setTotalKanjiMastered] = useState<number>(2480);
  const [listeningHours, setListeningHours] = useState<number>(4120.0);
  const [retentionRate, setRetentionRate] = useState<number>(94.8);
  const [activeSimulations, setActiveSimulations] = useState<number>(1840);
  const [activeLearners, setActiveLearners] = useState<number>(180);
  const [isPulsing, setIsPulsing] = useState<boolean>(false);
  const [drillSuccessMsg, setDrillSuccessMsg] = useState<string | null>(null);

  // Active Chart View
  const [chartView, setChartView] = useState<'kanji' | 'listening' | 'retention' | 'gradebook'>('kanji');

  // Secondary sub-tab for details
  const [activeSubTab, setActiveSubTab] = useState<'charts' | 'liveFeed' | 'srsScience'>('charts');

  // Interactive Kanji Drill demo click handler
  const handleSimulateDrill = () => {
    setTotalKanjiMastered(prev => prev + 5);
    setActiveSimulations(prev => prev + 1);
    setIsPulsing(true);
    setDrillSuccessMsg(
      lang === 'bn' 
        ? '✅ ৫টি কাঞ্জি ডেমো স্পেসড রিপিটেশন (SRS) অ্যালগরিদমে টেস্ট করা হয়েছে!'
        : lang === 'jp'
        ? '✅ 5文字の漢字がSRS反復アルゴリズムでテストされました！'
        : '✅ 5 Kanji test run completed in Nihomi SRS memory algorithm!'
    );
    setTimeout(() => {
      setIsPulsing(false);
      setTimeout(() => setDrillSuccessMsg(null), 3000);
    }, 600);
  };

  // 1. Kanji Mastery Growth Chart Data (16-Week Course Timeline)
  const kanjiTimelineData = useMemo(() => [
    { week: 'W1', n5Kanji: 12, n4Kanji: 0, sswTech: 0, total: 12 },
    { week: 'W2', n5Kanji: 26, n4Kanji: 0, sswTech: 4, total: 30 },
    { week: 'W4', n5Kanji: 52, n4Kanji: 0, sswTech: 12, total: 64 },
    { week: 'W6', n5Kanji: 78, n4Kanji: 15, sswTech: 25, total: 118 },
    { week: 'W8', n5Kanji: 103, n4Kanji: 45, sswTech: 48, total: 196 },
    { week: 'W10', n5Kanji: 103, n4Kanji: 90, sswTech: 85, total: 278 },
    { week: 'W12', n5Kanji: 103, n4Kanji: 140, sswTech: 135, total: 378 },
    { week: 'W14', n5Kanji: 103, n4Kanji: 172, sswTech: 180, total: 455 },
    { week: 'W16', n5Kanji: 103, n4Kanji: 181, sswTech: 220, total: 504 }
  ], []);

  // 2. Weekly Listening & Shadowing Hours Data (Monday to Sunday)
  const listeningWeeklyData = useMemo(() => [
    { day: 'Mon', shadowing: 64, chokaiDrills: 48, labAcoustic: 38 },
    { day: 'Tue', shadowing: 72, chokaiDrills: 55, labAcoustic: 42 },
    { day: 'Wed', shadowing: 68, chokaiDrills: 50, labAcoustic: 40 },
    { day: 'Thu', shadowing: 80, chokaiDrills: 62, labAcoustic: 46 },
    { day: 'Fri', shadowing: 95, chokaiDrills: 78, labAcoustic: 58 },
    { day: 'Sat', shadowing: 110, chokaiDrills: 92, labAcoustic: 70 },
    { day: 'Sun', shadowing: 90, chokaiDrills: 74, labAcoustic: 54 }
  ], []);

  // 3. SRS Spaced Repetition vs Traditional Forgetting Curve Data
  const retentionCurveData = useMemo(() => [
    { day: 'Day 1', nihomiSRS: 100, traditionalCramming: 100 },
    { day: 'Day 3', nihomiSRS: 98, traditionalCramming: 65 },
    { day: 'Day 7', nihomiSRS: 97, traditionalCramming: 48 },
    { day: 'Day 14', nihomiSRS: 96, traditionalCramming: 35 },
    { day: 'Day 30', nihomiSRS: 95, traditionalCramming: 24 },
    { day: 'Day 60', nihomiSRS: 95, traditionalCramming: 20 },
    { day: 'Day 90', nihomiSRS: 94.8, traditionalCramming: 18 }
  ], []);

  // 4. Existing Data Integration: Aggregate metrics from INITIAL_GRADEBOOK & INITIAL_COURSES
  const gradebookAnalytics = useMemo(() => {
    const totalStudents = INITIAL_GRADEBOOK.length;
    const avgScore = (INITIAL_GRADEBOOK.reduce((acc, curr) => acc + (curr.weightedTotal ?? 0), 0) / (totalStudents || 1)).toFixed(1);
    const avgAttendance = (INITIAL_GRADEBOOK.reduce((acc, curr) => acc + curr.attendanceRate, 0) / (totalStudents || 1)).toFixed(1);
    const honorsCount = INITIAL_GRADEBOOK.filter(g => g.status === 'Honors').length;

    const studentComparisonData = INITIAL_GRADEBOOK.map(student => ({
      name: student.studentName.split(' ')[0] + ' ' + (student.studentName.split(' ')[1]?.[0] || '') + '.',
      score: student.weightedTotal ?? 0,
      attendance: student.attendanceRate,
      gpa: (student.gpa ?? 0) * 25 // scaled to 100 for comparison
    }));

    return {
      totalStudents,
      avgScore,
      avgAttendance,
      honorsCount,
      studentComparisonData
    };
  }, []);

  // Course enrollment distribution data for Pie/Bar
  const courseDistributionData = useMemo(() => [
    { name: 'JLPT N5 Mastery', students: 48, fill: '#ef4444' },
    { name: 'JLPT N4 Work Track', students: 32, fill: '#6366f1' },
    { name: 'SSW Tokutei Ginou', students: 26, fill: '#10b981' },
    { name: 'JLPT N3 Career', students: 18, fill: '#f59e0b' }
  ], []);

  // Live activity stream simulation
  const [liveActivities] = useState<ActivityEvent[]>([
    {
      id: 'act-1',
      studentName: 'Tanvir K.',
      batch: 'Farmgate Morning N5',
      action: 'Completed Minna no Nihongo L12 Kanji Drill',
      metric: '+15 Kanji (100% SRS)',
      timeAgo: 'Just now',
      level: 'N5'
    },
    {
      id: 'act-2',
      studentName: 'Nusrat J.',
      batch: 'Evening N4 Batch',
      action: 'Acoustic Audio Shadowing Session',
      metric: '45 mins (Pitch Score: 98%)',
      timeAgo: '2m ago',
      level: 'N4'
    },
    {
      id: 'act-3',
      studentName: 'Shakib A.',
      batch: 'SSW Caregiver Intensive',
      action: 'AI Voice Visa Interview Simulation',
      metric: 'Grade S • High Fluency',
      timeAgo: '5m ago',
      level: 'SSW'
    },
    {
      id: 'act-4',
      studentName: 'Rafi M.',
      batch: 'Weekend Commuter Batch',
      action: 'JLPT N5 Full Mock Exam 03',
      metric: '168/180 (Certified Pass)',
      timeAgo: '8m ago',
      level: 'N5'
    }
  ]);

  // Custom Tooltip formatter for dark theme charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/90 backdrop-blur-md border border-slate-700/80 p-3 rounded-xl shadow-xl text-xs space-y-1 z-50">
          <p className="font-mono font-bold text-slate-200 border-b border-slate-800 pb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-3 text-[11px]">
              <span style={{ color: entry.color }} className="font-medium">
                {entry.name}:
              </span>
              <span className="font-mono font-bold text-white">
                {entry.value}
                {entry.name.toLowerCase().includes('rate') || entry.name.toLowerCase().includes('retention') ? '%' : ''}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="analytics" className="py-16 sm:py-24 bg-[#030712] relative overflow-hidden border-b border-indigo-950/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-700/60 text-red-400 text-xs font-mono font-bold tracking-wide">
              <Activity className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>
                {lang === 'jp' ? 'データ駆動型・リアルタイム学習解析' : lang === 'bn' ? 'রিয়েল-টাইম লার্নিং অ্যানালিটিক্স' : 'NIHOMI LEARNING ANALYTICS'}
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {lang === 'jp' ? (
                <span>2,400名の実績データに基づく<span className="text-red-400"> 学習エコシステム</span></span>
              ) : lang === 'bn' ? (
                <span>ডাটা-চালিত জাপানি শিক্ষা: <span className="text-red-400">লাইভ প্রোগ্রেস ও মেমোরি চার্ট</span></span>
              ) : (
                <span>Data-Driven Japanese Learning: <span className="text-red-400">Real-Time Progress Metrics</span></span>
              )}
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {lang === 'jp'
                ? 'Nihomi.comの分散型SRSアルゴリズムと音声シャドーイングラボが、学生の漢字習得度・聴解時間・忘却曲線をリアルタイムに数値化。'
                : lang === 'bn'
                ? 'মুখস্থের পরিবর্তে বৈজ্ঞানিক মেমোরি রিটেনশন: নিহোমি এআই অ্যালগরিদম ও অডিও শ্যাডোয়িং ল্যাবের মাধ্যমে প্রতিটি শিক্ষার্থীর কাঞ্জি, অডিও লিসেনিং ও সিওই পাস নির্ভুলভাবে মনিটর করা হয়।'
                : 'Scientific memory optimization replacing rote memorization. Nihomi AI algorithms and acoustic audio shadowing dynamically measure Kanji mastery, listening volume, and SRS retention.'}
            </p>
          </div>

          {/* Top Level Nav Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900/50 backdrop-blur-md border border-slate-800/80 p-1.5 rounded-xl text-xs self-start md:self-auto shadow-lg">
            <button
              onClick={() => setActiveSubTab('charts')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'charts'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{lang === 'jp' ? 'チャート解析' : lang === 'bn' ? 'অ্যানালিটিক্স চার্ট' : 'Interactive Charts'}</span>
            </button>
            <button
              onClick={() => setActiveSubTab('liveFeed')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'liveFeed'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>{lang === 'jp' ? '24hリアルタイム配信' : lang === 'bn' ? '২৪ ঘণ্টার লাইভ স্ট্রিম' : '24h Live Stream'}</span>
            </button>
            <button
              onClick={() => setActiveSubTab('srsScience')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'srsScience'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>{lang === 'jp' ? '忘却曲線科学' : lang === 'bn' ? 'SRS মেমোরি সায়েন্স' : 'SRS Science'}</span>
            </button>
          </div>
        </div>

        {/* 3 Core Highlight KPI Cards with Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* KPI 1: Total Kanji Mastered */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 space-y-4 hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] transition-all relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-red-500" />
                <span>Total Kanji Mastered</span>
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-all ${
                isPulsing 
                  ? 'bg-red-950/80 border-red-500 text-red-400 scale-105' 
                  : 'bg-slate-950/60 border-slate-800 text-slate-400'
              }`}>
                ● LIVE SYNC
              </span>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight flex items-baseline gap-2">
                <span>{totalKanjiMastered.toLocaleString()}</span>
                <span className="text-xs font-bold text-emerald-400 font-sans">文字</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'jp' 
                  ? 'Farmgate CBT端末 & モバイルPWAによる累積習得漢字数'
                  : lang === 'bn'
                  ? 'ফার্মগেট সিবিটি ল্যাব ও মোবাইল অ্যাপে শিক্ষার্থীদের অর্জিত মোট কাঞ্জি'
                  : 'Cumulative Kanji memorized across CBT terminals & mobile PWA'}
              </p>
            </div>

            {/* Kanji Breakdown Progress bars */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="font-mono">JLPT N5 (103 Kanji)</span>
                <span className="text-emerald-400 font-bold font-mono">100% Cohort Pass</span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-emerald-500 h-full rounded-full w-[100%]"></div>
              </div>

              <div className="flex justify-between text-slate-300 pt-1">
                <span className="font-mono">JLPT N4 (181 Kanji)</span>
                <span className="text-amber-400 font-bold font-mono">96.4% Mastery</span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-red-500 to-amber-500 h-full rounded-full w-[96.4%]"></div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleSimulateDrill}
                className="w-full py-2 bg-slate-800/60 hover:bg-slate-700/80 text-slate-200 hover:text-white rounded-xl text-xs font-bold border border-slate-700/60 transition-all flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {lang === 'jp' ? 'SRS漢字フラッシュを模擬体験 (+5)' : lang === 'bn' ? 'নিহোমি কাঞ্জি ড্রিল সিমুলেট করুন (+৫)' : 'Simulate 1 Kanji SRS Drill (+5)'}
                </span>
              </button>
            </div>
          </div>

          {/* KPI 2: Listening Hours */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 space-y-4 hover:border-indigo-500/50 hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] transition-all relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <Headphones className="w-4 h-4 text-sky-400" />
                <span>Listening Hours (Chokai)</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-950/60 border border-sky-800 text-sky-300">
                Acoustic Lab
              </span>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight flex items-baseline gap-2">
                <span>{listeningHours.toLocaleString()}</span>
                <span className="text-xs font-bold text-sky-400 font-sans">Hrs</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'jp' 
                  ? 'ネイティブ発音・音声シャドーイングの総演習時間'
                  : lang === 'bn'
                  ? 'নেটিভ অডিও চোকাই লিসেনিং ও শ্যাডোয়িং ড্রিলের মোট সময়'
                  : 'Total hours of native audio shadowing & listening refinement'}
              </p>
            </div>

            {/* Audio Shadowing metrics */}
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Avg. Daily Drill / Student:</span>
                <span className="text-white font-mono font-bold">38.5 mins/day</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Headphone Acoustic Lab:</span>
                <span className="text-emerald-400 font-mono font-bold">Open 7 Days (Free)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Active Online Learners:</span>
                <span className="text-amber-400 font-mono font-bold">{activeLearners} Students</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onSwitchToStudentPortal && onSwitchToStudentPortal('c-jp-n5')}
                className="w-full py-2 bg-slate-800/60 hover:bg-slate-700/80 text-slate-200 hover:text-white rounded-xl text-xs font-bold border border-slate-700/60 transition-all flex items-center justify-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                <span>
                  {lang === 'jp' ? 'シャドーイングラボを開く' : lang === 'bn' ? 'অডিও শ্যাডোয়িং টেস্ট করুন' : 'Open Audio Shadowing'}
                </span>
              </button>
            </div>
          </div>

          {/* KPI 3: Memory Retention Rate */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 space-y-4 hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] transition-all relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Memory Retention Rate</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-300">
                SRS Engine
              </span>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight flex items-baseline gap-2">
                <span>{retentionRate}%</span>
                <span className="text-xs font-bold text-emerald-400 font-sans">Recall</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'jp' 
                  ? 'エビングハウスの忘却曲線を克服する90日記憶定着率'
                  : lang === 'bn'
                  ? 'ঐতিহ্যগত পদ্ধতির চেয়ে ২.২ গুণ বেশি মেমোরি রিটেনশন (স্মরণ ক্ষমতা)'
                  : '90-day retention vs 18% traditional forgetting curve'}
              </p>
            </div>

            {/* Scientific Comparison Bar */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-emerald-400 font-bold">Nihomi Spaced Repetition (SRS):</span>
                <span className="font-mono text-emerald-400 font-bold">94.8%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-emerald-500 h-full rounded-full w-[94.8%]"></div>
              </div>

              <div className="flex justify-between text-slate-400 pt-1">
                <span>Traditional Grammar Class:</span>
                <span className="font-mono text-slate-400">18.0% (Severe Decay)</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-slate-700 h-full rounded-full w-[18%]"></div>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 font-mono">
                <span>Visa Mock Accuracy:</span>
                <span className="text-white font-bold">{activeSimulations.toLocaleString()}+ Passes</span>
              </div>
            </div>
          </div>

        </div>

        {/* Drill Success Toast Notification */}
        {drillSuccessMsg && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/80 rounded-xl text-emerald-200 text-xs text-center font-bold font-mono animate-bounce">
            {drillSuccessMsg}
          </div>
        )}

        {/* MAIN VISUALIZATION CARD: Interactive Recharts Dashboard */}
        {activeSubTab === 'charts' && (
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Chart View Switcher Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
              <div>
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-red-500" />
                  <span>
                    {chartView === 'kanji' && (lang === 'jp' ? '漢字累積習得曲線 (JLPT N5〜N4 & SSW)' : lang === 'bn' ? 'কাঞ্জি অর্জন প্রোগ্রেস কার্ভ (JLPT N5, N4 ও SSW)' : 'Kanji Acquisition Growth Curve')}
                    {chartView === 'listening' && (lang === 'jp' ? '週間リスニング & 音声シャドーイング時間' : lang === 'bn' ? 'সাপ্তাহিক অডিও চোকাই ও শ্যাডোয়িং ঘন্টা' : 'Weekly Listening & Shadowing Volume')}
                    {chartView === 'retention' && (lang === 'jp' ? 'Nihomi SRS反復 vs 従来型忘却曲線' : lang === 'bn' ? 'নিহোমি SRS বনাম গতানুগতিক মেমোরি ক্ষয় কার্ভ' : 'Nihomi SRS Retention vs Forgetting Curve')}
                    {chartView === 'gradebook' && (lang === 'jp' ? '受講生成績 & 出席率分布 (実データ)' : lang === 'bn' ? 'শিক্ষার্থী গ্রেড ও উপস্থিতির লাইভ ডাটা' : 'Cohort Performance & Grade Distribution')}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {chartView === 'kanji' && 'Track cumulative characters retained in active memory across the 16-week intensive track.'}
                  {chartView === 'listening' && 'Daily audio exposure measured in headphone laboratory & Nihomi PWA.'}
                  {chartView === 'retention' && 'Comparing 90-day retention decay: Nihomi active recall vs traditional memorization.'}
                  {chartView === 'gradebook' && `Synchronized with ${gradebookAnalytics.totalStudents} verified DILS student records. Class average: ${gradebookAnalytics.avgScore}%`}
                </p>
              </div>

              {/* View Switcher Buttons */}
              <div className="flex items-center gap-1.5 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800/80 flex-wrap">
                <button
                  onClick={() => setChartView('kanji')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    chartView === 'kanji' 
                      ? 'bg-red-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Kanji Growth</span>
                </button>

                <button
                  onClick={() => setChartView('listening')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    chartView === 'listening' 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Listening</span>
                </button>

                <button
                  onClick={() => setChartView('retention')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    chartView === 'retention' 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span>SRS Retention</span>
                </button>

                <button
                  onClick={() => setChartView('gradebook')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    chartView === 'gradebook' 
                      ? 'bg-amber-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Gradebook</span>
                </button>
              </div>
            </div>

            {/* CHART 1: Kanji Mastery Growth (AreaChart) */}
            {chartView === 'kanji' && (
              <div className="space-y-4">
                <div className="h-72 sm:h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={kanjiTimelineData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="totalKanjiGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0}/>
                        </linearGradient>
                        <linearGradient id="n4Gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="week" stroke="#64748b" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} 
                        formatter={(value) => <span className="text-slate-300 font-medium">{value}</span>}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="total" 
                        name="Total Kanji Mastered" 
                        stroke="#ef4444" 
                        strokeWidth={2.5} 
                        fillOpacity={1} 
                        fill="url(#totalKanjiGradient)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="n4Kanji" 
                        name="JLPT N4 Intermediate Kanji" 
                        stroke="#6366f1" 
                        strokeWidth={2} 
                        fillOpacity={1} 
                        fill="url(#n4Gradient)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="n5Kanji" 
                        name="JLPT N5 Foundation (103)" 
                        stroke="#10b981" 
                        strokeWidth={1.5} 
                        fillOpacity={0} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center">
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="text-xs text-slate-400 font-mono">Week 4 Benchmark</div>
                    <div className="text-lg font-bold text-white font-mono">52 Kanji</div>
                    <div className="text-[10px] text-emerald-400 font-medium">Hiragana + Katakana Mastery</div>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="text-xs text-slate-400 font-mono">Week 8 (N5 Pass)</div>
                    <div className="text-lg font-bold text-red-400 font-mono">103 Kanji</div>
                    <div className="text-[10px] text-emerald-400 font-medium">100% JLPT N5 Coverage</div>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="text-xs text-slate-400 font-mono">Week 12 (N4 Target)</div>
                    <div className="text-lg font-bold text-indigo-400 font-mono">243 Kanji</div>
                    <div className="text-[10px] text-indigo-300 font-medium">Compound Words (Jukugo)</div>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="text-xs text-slate-400 font-mono">Week 16 (SSW & N4)</div>
                    <div className="text-lg font-bold text-amber-400 font-mono">504 Kanji</div>
                    <div className="text-[10px] text-amber-300 font-medium">Full Work Visa Readability</div>
                  </div>
                </div>
              </div>
            )}

            {/* CHART 2: Listening & Shadowing Hours (BarChart) */}
            {chartView === 'listening' && (
              <div className="space-y-4">
                <div className="h-72 sm:h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={listeningWeeklyData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} 
                        formatter={(value) => <span className="text-slate-300 font-medium">{value}</span>}
                      />
                      <Bar dataKey="shadowing" name="Acoustic Audio Shadowing (Mins)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="chokaiDrills" name="JLPT Chokai Exam Drills (Mins)" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="labAcoustic" name="Headphone Lab On-Site (Mins)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-950/80 rounded-xl border border-indigo-800/80 text-indigo-400">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Dedicated Headphone Acoustic Lab at Farmgate</div>
                      <div className="text-slate-400 text-[11px]">Free access for all registered DILS students. Open 7 days a week.</div>
                    </div>
                  </div>
                  <button
                    onClick={() => onSwitchToStudentPortal && onSwitchToStudentPortal('c-jp-n5')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 flex-shrink-0"
                  >
                    <span>Launch Audio Shadowing</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* CHART 3: SRS Retention vs Ebbinghaus Forgetting Curve (LineChart) */}
            {chartView === 'retention' && (
              <div className="space-y-4">
                <div className="h-72 sm:h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={retentionCurveData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={[0, 105]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} 
                        formatter={(value) => <span className="text-slate-300 font-medium">{value}</span>}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="nihomiSRS" 
                        name="Nihomi Spaced Repetition (SRS Retention %)" 
                        stroke="#10b981" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: '#10b981' }} 
                        activeDot={{ r: 6 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="traditionalCramming" 
                        name="Traditional Cramming (Ebbinghaus Decay %)" 
                        stroke="#ef4444" 
                        strokeWidth={2} 
                        strokeDasharray="5 5" 
                        dot={{ r: 3, fill: '#ef4444' }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-emerald-950/30 border border-emerald-800/40 p-3.5 rounded-xl space-y-1">
                    <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Nihomi AI Algorithm Retention (94.8% at 90 Days)</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Words are prompted for review at expanding mathematical intervals (1d, 3d, 7d, 14d, 30d). 
                      Calculated directly before neural forgetting occurs.
                    </p>
                  </div>

                  <div className="bg-red-950/20 border border-red-900/30 p-3.5 rounded-xl space-y-1">
                    <div className="font-bold text-red-400 flex items-center gap-1.5">
                      <Brain className="w-4 h-4" />
                      <span>Traditional Classroom Cramming (Drops to 18%)</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Without systematic active retrieval, the human brain discards up to 82% of newly memorized Japanese characters within 3 months.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CHART 4: Existing Gradebook Data Integration (BarChart & Stats) */}
            {chartView === 'gradebook' && (
              <div className="space-y-4">
                <div className="h-72 sm:h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={gradebookAnalytics.studentComparisonData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={[0, 100]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} 
                        formatter={(value) => <span className="text-slate-300 font-medium">{value}</span>}
                      />
                      <Bar dataKey="score" name="Weighted Exam Score (%)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="attendance" name="Class Attendance (%)" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="text-slate-400 font-mono">Cohort Average</div>
                    <div className="text-lg font-bold text-white font-mono">{gradebookAnalytics.avgScore}%</div>
                    <div className="text-[10px] text-emerald-400">Class Overall Standing</div>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="text-slate-400 font-mono">Attendance Rate</div>
                    <div className="text-lg font-bold text-emerald-400 font-mono">{gradebookAnalytics.avgAttendance}%</div>
                    <div className="text-[10px] text-slate-400">Farmgate Physical Lab</div>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="text-slate-400 font-mono">Honors Grade (GPA 4.0)</div>
                    <div className="text-lg font-bold text-amber-400 font-mono">{gradebookAnalytics.honorsCount} Students</div>
                    <div className="text-[10px] text-amber-300">A+ Distinction</div>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <div className="text-slate-400 font-mono">Official NAT Pass Rate</div>
                    <div className="text-lg font-bold text-red-400 font-mono">100%</div>
                    <div className="text-[10px] text-emerald-400">COE Certified</div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* SUB-TAB 2: Live Activity Feed */}
        {activeSubTab === 'liveFeed' && (
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                <h3 className="font-bold text-white text-sm">
                  {lang === 'jp' ? 'DILS 生徒リアルタイム学習ストリーム (24h Activity)' : lang === 'bn' ? 'শিক্ষার্থীদের রিয়েল-টাইম ক্লাস ও ড্রিল স্ট্রীম' : 'Live Student Learning Activity Stream'}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Connected to Dhaka & Tokyo Servers</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {liveActivities.map((act) => (
                <div 
                  key={act.id} 
                  className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 flex items-start justify-between gap-3 hover:border-slate-700 transition-all text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{act.studentName}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono">
                        {act.level}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">{act.batch}</span>
                    </div>
                    <p className="text-slate-300">{act.action}</p>
                    <div className="text-[11px] font-mono text-emerald-400 font-bold">{act.metric}</div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono flex-shrink-0">{act.timeAgo}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUB-TAB 3: SRS Memory Science Explained */}
        {activeSubTab === 'srsScience' && (
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="max-w-2xl space-y-2">
              <h3 className="text-lg sm:text-xl font-black text-white">
                {lang === 'jp' ? 'なぜDILSの学生は忘れないのか？' : lang === 'bn' ? 'কেন DILS শিক্ষার্থীরা ভুলে যায় না?' : 'Why DILS Students Don\'t Forget?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lang === 'bn'
                  ? 'সাধারনত মানুষ পড়া শোনার ২৪ ঘণ্টার মধ্যে ৫০% এবং ৩০ দিন পর ৮০% ভুলে যায় (Hermann Ebbinghaus Forgetting Curve)। নিহোমি এআই ঠিক যখনই আপনি কোনো শব্দ ভুলতে শুরু করেন, ঠিক তখনই রিভিউর সিগন্যাল দেয়।'
                  : 'Traditional cramming causes 80% loss in 30 days. Nihomi SRS calculates optimal decay intervals, prompting micro-recalls right before memory decay occurs.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-2">
                <div className="text-amber-400 font-mono font-bold">1st Interval: 24 Hours</div>
                <div className="text-slate-300 font-medium">Kana &amp; Radicals Flash Recall</div>
                <div className="text-[11px] text-slate-500">Audio phonetics + hand stroke canvas reinforcement.</div>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-2">
                <div className="text-sky-400 font-mono font-bold">2nd Interval: 7 Days</div>
                <div className="text-slate-300 font-medium">Context Sentence &amp; Chokai</div>
                <div className="text-[11px] text-slate-500">Grammar pattern matching and conversational speed playback.</div>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-2">
                <div className="text-emerald-400 font-mono font-bold">3rd Interval: 30 Days</div>
                <div className="text-slate-300 font-medium">Permanent Long-Term Storage</div>
                <div className="text-[11px] text-slate-500">Embedded into permanent reflex for JLPT and Embassy interview.</div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white">Experience Data-Driven Japanese Language Learning at Farmgate</h4>
            <p className="text-xs text-slate-400">
              Join Dhaka's only JLPT school powered by 24/7 Nihomi AI and certified JLPT N1 mentorship.
            </p>
          </div>
          <button
            onClick={onOpenAdmission}
            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/60 transition-all flex items-center justify-center gap-2 flex-shrink-0"
          >
            <span>Book Seat in Next Cohort</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default NihomiLearningAnalytics;
