import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Users, 
  Brain, 
  Menu, 
  X, 
  Target, 
  Cpu, 
  Zap, 
  Briefcase,
  Play,
  RotateCcw,
  Volume2,
  Headphones,
  Check,
  ChevronRight,
  MessageCircle,
  HelpCircle,
  Clock,
  ExternalLink,
  Search,
  FileCheck,
  QrCode,
  Calculator,
  Calendar,
  DollarSign,
  Receipt,
  Download,
  Smartphone,
  Activity,
  Compass
} from 'lucide-react';
import { Course, Trainer, LangMode, PortalMode, Lead } from '../types';
import { VISA_SUCCESS_STORIES } from '../data/mockData';
import { playPronunciation } from '../utils/audioQr';
import { NihomiLearningAnalytics } from './NihomiLearningAnalytics';
import { StudentJourney } from './StudentJourney';

interface JapaneseCorporateLandingProps {
  courses?: Course[];
  trainers?: Trainer[];
  notices?: any[];
  lang?: LangMode;
  onOpenAdmission?: (courseId?: string) => void;
  onOpenValidator?: (certId?: string) => void;
  onSwitchToStudentPortal?: (courseId: string) => void;
  onSelectPortal?: (portal: PortalMode) => void;
  onAddNewLead?: (leadData: Partial<Lead> & { name: string; phone: string }) => void;
}

export const JapaneseCorporateLanding: React.FC<JapaneseCorporateLandingProps> = ({
  courses,
  trainers,
  notices,
  lang: initialLang = 'jp',
  onOpenAdmission,
  onOpenValidator,
  onSwitchToStudentPortal,
  onSelectPortal,
  onAddNewLead,
}) => {
  // Multilingual First: Default is Japanese ('jp')
  const [currentLang, setCurrentLang] = useState<LangMode>(initialLang || 'jp');
  
  // Real-time Dual Clocks
  const [dhakaTime, setDhakaTime] = useState<string>('');
  const [tokyoTime, setTokyoTime] = useState<string>('');
  
  // Navigation & Modal States
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState<boolean>(false);
  const [fastAdmissionOpen, setFastAdmissionOpen] = useState<boolean>(false);
  const [quickTestOpen, setQuickTestOpen] = useState<boolean>(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState<boolean>(false);

  // Transparent Tuition Calculator States
  const [calcCourse, setCalcCourse] = useState<'n5' | 'n4' | 'ssw' | 'combo'>('n5');
  const [calcIntake, setCalcIntake] = useState<'April 2027' | 'October 2027' | 'July 2027'>('April 2027');
  const [includeBooks, setIncludeBooks] = useState<boolean>(true);
  const [includeExamFee, setIncludeExamFee] = useState<boolean>(true);

  // Active Interactive Nihomi Feature Tab
  const [activeNihomiFeature, setActiveNihomiFeature] = useState<'sensei' | 'srs' | 'radar' | 'mock'>('sensei');

  // Interactive Nihomi AI Voice/Chat Simulation index
  const [aiChatIndex, setAiChatIndex] = useState(0);

  // Alumni COE Filter state
  const [alumniFilter, setAlumniFilter] = useState<'All' | 'Tokyo' | 'Osaka' | 'Nagoya' | 'Kyoto'>('All');

  // PWA Install State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [showPwaModal, setShowPwaModal] = useState<boolean>(false);

  // Partner Inquiry Form State
  const [partnerForm, setPartnerForm] = useState({
    orgName: '',
    orgType: 'language_school',
    contactPerson: '',
    email: '',
    locationInJapan: 'Tokyo',
    notes: '',
    submitted: false
  });

  // Fast Student Admission Drawer Form
  const [selectedCourseId, setSelectedCourseId] = useState<string>('c-jp-n5');
  const [selectedBatchTime, setSelectedBatchTime] = useState<string>('Morning (10:00 AM)');
  const [admissionForm, setAdmissionForm] = useState({
    fullName: '',
    phone: '',
    submitted: false
  });

  // Nihomi 30-Second Quick Test State
  const [testCurrentQ, setTestCurrentQ] = useState(0);
  const [testScore, setTestScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const testQuestions = [
    {
      qJp: '「日本」の読み方と意味は？',
      qEn: 'What is the reading and meaning of 「日本」?',
      qBn: '「日本」শব্দটির উচ্চারণ ও অর্থ কী?',
      audio: 'にほん',
      options: [
        { text: 'にほん (Nihon) - Japan', isCorrect: true },
        { text: 'がくせい (Gakusei) - Student', isCorrect: false },
        { text: 'せんせい (Sensei) - Teacher', isCorrect: false },
        { text: 'ほん (Hon) - Book', isCorrect: false }
      ]
    },
    {
      qJp: '正しい助詞を選んでください：わたし ___ がくせい です。',
      qEn: 'Choose the correct topic particle: Watashi ___ gakusei desu.',
      qBn: 'সঠিক টপিক মার্কার পার্টিকল বেছে নিন: わたし ___ がくせい です。',
      audio: 'わたしはがくせいです',
      options: [
        { text: 'は (wa)', isCorrect: true },
        { text: 'が (ga)', isCorrect: false },
        { text: 'を (wo)', isCorrect: false },
        { text: 'に (ni)', isCorrect: false }
      ]
    },
    {
      qJp: '最も丁寧な「ありがとうございます」の意味は？',
      qEn: 'What does the polite phrase 「ありがとうございます」 mean?',
      qBn: 'জাপানি সম্মানসূচক বাক্য 「ありがとうございます」 এর অর্থ কী?',
      audio: 'ありがとうございます',
      options: [
        { text: 'Thank you very much (অনেক ধন্যবাদ)', isCorrect: true },
        { text: 'Good morning (শুভ সকাল)', isCorrect: false },
        { text: 'Good afternoon (শুভ অপরাহ্ন)', isCorrect: false },
        { text: 'Goodbye (বিদায়)', isCorrect: false }
      ]
    }
  ];

  // Sync dual clocks
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setDhakaTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      );
      setTokyoTime(
        now.toLocaleTimeString('ja-JP', {
          timeZone: 'Asia/Tokyo',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
      );
    };
    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (initialLang) setCurrentLang(initialLang);
  }, [initialLang]);

  // PWA Event Listener
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallPwa = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      setShowPwaModal(true);
    }
  };

  // Filtered alumni stories
  const filteredAlumni = VISA_SUCCESS_STORIES.filter(s => {
    if (alumniFilter === 'All') return true;
    return s.destinationCity.toLowerCase().includes(alumniFilter.toLowerCase());
  });

  // Ultra-concise, minimalist translation dictionary (Zero Fluff, Fast to Read)
  const t = {
    top: {
      dhaka: currentLang === 'jp' ? 'ダッカ本部' : currentLang === 'bn' ? 'ঢাকা' : 'DHAKA',
      tokyo: currentLang === 'jp' ? '東京窓口' : currentLang === 'bn' ? 'টোকিও' : 'TOKYO',
      verify: currentLang === 'jp' ? '証明書照会' : currentLang === 'bn' ? 'যাচাই' : 'Verify QR',
      partnerBtn: currentLang === 'jp' ? '日本の提携校ポータル' : currentLang === 'bn' ? 'পার্টনার পোর্টাল' : 'Partner Portal',
    },
    nav: {
      features: currentLang === 'jp' ? 'Nihomi機能' : currentLang === 'bn' ? 'নিহোমি ফিচার' : 'Nihomi Features',
      analytics: currentLang === 'jp' ? '学習解析' : currentLang === 'bn' ? 'অ্যানালিটিক্স' : 'Analytics',
      journey: currentLang === 'jp' ? '留学5段階' : currentLang === 'bn' ? 'স্টুডেন্ট জার্নি' : 'Student Journey',
      leadership: currentLang === 'jp' ? '指導責任者' : currentLang === 'bn' ? 'প্রধান শিক্ষক' : 'Faculty Head',
      programs: currentLang === 'jp' ? 'プログラム' : currentLang === 'bn' ? 'কোর্সসমূহ' : 'Programs',
      alumni: currentLang === 'jp' ? 'COE実績' : currentLang === 'bn' ? 'সিওই অর্জন' : 'COE Wall',
      campuses: currentLang === 'jp' ? '校舎・拠点' : currentLang === 'bn' ? 'ক্যাম্পাস' : 'Campuses',
      calculator: currentLang === 'jp' ? '費用試算' : currentLang === 'bn' ? 'ফি ক্যালকুলেটর' : 'Tuition Calc',
      schedule: currentLang === 'jp' ? '時間割' : currentLang === 'bn' ? 'রুটিন' : 'Routine',
      quickTest: currentLang === 'jp' ? '30秒AIテスト' : currentLang === 'bn' ? '৩০ সে. এআই টেস্ট' : '30s AI Test',
      inquire: currentLang === 'jp' ? '提携相談' : currentLang === 'bn' ? 'যোগাযোগ' : 'Inquire',
      studentApp: currentLang === 'jp' ? 'スピード入学' : currentLang === 'bn' ? 'ভর্তি হন' : 'Fast Admission',
    },
    calculator: {
      tag: 'TRANSPARENT TUITION',
      title: currentLang === 'jp' ? '学費・諸費用シミュレーター (明朗会計)' : currentLang === 'bn' ? 'কোর্স ফি ও ভিসা খরচ ক্যালকুলেটর' : 'Zero Hidden Costs Tuition Simulator',
      subtitle: currentLang === 'jp' 
        ? '隠れた追加費用なし。Nihomi AIライセンスや面接指導もすべて内包。' 
        : currentLang === 'bn'
        ? 'কোনো গোপন চার্জ নেই। Nihomi AI আনলিমিটেড লাইসেন্স ও এম্বাসি ফাইল অডিট সম্পূর্ণ ফ্রি।'
        : 'Transparent breakdown with 24/7 Nihomi AI access and embassy file review included.',
    },
    hero: {
      badge: currentLang === 'jp' ? '日バ連携・規律とAIの日本語教育' : currentLang === 'bn' ? 'শৃঙ্খলা ও এআই নির্ভর জাপানিজ ইনস্টিটিউট' : 'DISCIPLINED JAPANESE + NIHOMI AI',
      titleJp: 'バングラデシュと日本を繋ぐ、最も規律ある日本語学校',
      subtitle: currentLang === 'jp' 
        ? 'JLPT N1認定講師の対面規律指導 × Nihomi.com 24/7 AI学習エンジン' 
        : currentLang === 'bn'
        ? 'জেএলপিটি এন১ ফ্যাকাল্টির কঠোর নিয়মানুবর্তিতা ও Nihomi.com এআই লার্নিং'
        : 'JLPT N1-Led Physical Discipline × Nihomi.com 24/7 AI Engine',
      ctaPartner: currentLang === 'jp' ? '提携校・受入企業のご相談' : currentLang === 'bn' ? 'পার্টনারশিপ আবেদন' : 'Partner School Consultation',
      ctaStudent: currentLang === 'jp' ? '即時コース申込み (2クリック)' : currentLang === 'bn' ? 'দ্রুত ভর্তি ফরম' : 'Instant Course Enrollment',
      chips: [
        { label: 'COE 適合率 100%', sub: 'Immigration Compliant' },
        { label: '渡日実績 1,500名+', sub: 'Dispatched to Japan' },
        { label: 'JLPT N1 直轄指導', sub: 'Master Instructor Led' },
        { label: 'Nihomi AI 24/7', sub: 'Memory Retention Engine' }
      ]
    },
    leadership: {
      tag: currentLang === 'jp' ? '指導責任者' : currentLang === 'bn' ? 'প্রধান শিক্ষক ও পরিচালক' : 'ACADEMIC LEADERSHIP',
      title: currentLang === 'jp' ? '卓越した実績と信頼の指導体制' : currentLang === 'bn' ? 'অভিজ্ঞতা ও আন্তর্জাতিক মানের জাপানিজ পাঠদান' : 'Excellence & Authentic Japanese Discipline',
      name: currentLang === 'jp' ? 'Md. Abdur Razzak (アブドゥル・ラザック)' : currentLang === 'bn' ? 'মোহাম্মদ আব্দুর রাজ্জাক (JLPT N1)' : 'Md. Abdur Razzak',
      role: currentLang === 'jp' ? '日本語科 主任教授 / Managing Director, DILS' : currentLang === 'bn' ? 'হেড অব জাপানিজ ডিপার্টমেন্ট ও ম্যানেজিং ডিরেক্টর, ডিআইএলএস' : 'Head of Japanese Department | Managing Director, DILS',
      quote: currentLang === 'jp'
        ? '「言葉の習得だけでなく、時間厳守・礼儀作法（お辞儀と報連相）を徹底教育。日本社会に深く信頼される誠実な若者を育てます。」'
        : currentLang === 'bn'
        ? '“শুধুমাত্র ভাষা নয়; সময়ানুবর্তিতা, শিষ্টাচার (ওজিগি) ও কর্মসংস্কৃতিতে সৎ তরুণ গড়ে তোলাই আমাদের লক্ষ্য।”'
        : '“We instill punctuality, respect, and authentic business etiquette (Ojigi & Ho-Ren-So) to nurture sincere youths trusted by Japanese society.”',
      badges: [
        { title: '12+ Years Japan Experience', desc: '東京・大阪の日本語学校と長年連携' },
        { title: 'Zero Document Forgery', desc: '100% 正当な書類審査・入管法令遵守' },
        { title: 'Daily Ojigi & Etiquette', desc: '毎朝のお辞儀(15°/30°/45°)と挨拶訓練' }
      ]
    },
    nihomiSection: {
      tag: 'POWERED BY NIHOMI.COM',
      title: currentLang === 'jp' ? '本校に導入されている Nihomi.com のコア機能' : currentLang === 'bn' ? 'ডিআইএলএস এ ব্যবহৃত নিহোমি.কম এর মূল এআই ফিচারসমূহ' : 'Nihomi.com Core Features Embedded at DILS',
      subtitle: currentLang === 'jp' 
        ? '教室での対面指導を、AIが24時間365日復習・定着させます。' 
        : currentLang === 'bn' 
        ? 'ক্লাসরুমের পড়া ভুলে যাওয়া রোধে ২৪/৭ সক্রিয় নিহোমি এআই প্রযুক্তি।'
        : 'Eliminating the forgetting curve with automated, round-the-clock AI reinforcement.',
      features: [
        {
          id: 'sensei',
          icon: Brain,
          badge: 'FEATURE 01',
          nameJp: '24/7 AI会話・リアルタイム文法添削',
          nameEn: 'AI Sensei: 24/7 Speaking Partner',
          nameBn: '২৪/৭ এআই কথোপকথন ও তাৎক্ষণিক ব্যাকরণ সংশোধন',
          summary: currentLang === 'jp' 
            ? 'バングラデシュ人学習者の発音と文法誤りを即時検知し、自然な日本語へ修正。' 
            : currentLang === 'bn'
            ? 'ভয়েস ও চ্যাটে কথা বললে এআই সাথে সাথে ভুল পার্টিকল ও উচ্চারণ শুধরে দেয়।'
            : 'Detects audio pronunciation and particle slips instantly with natural correction.'
        },
        {
          id: 'srs',
          icon: Zap,
          badge: 'FEATURE 02',
          nameJp: 'SRS 忘却曲線フラッシュカード',
          nameEn: 'Spaced Repetition (SRS) Engine',
          nameBn: 'এসআরএস স্পেসড মেমোরি ফ্ল্যাশ কার্ড',
          summary: currentLang === 'jp' 
            ? '忘却曲線に基づき、忘れそうな単語・漢字(2,000字)を最適な間隔で自動出題。' 
            : currentLang === 'bn'
            ? 'ফরগেটিং কার্ভ অনুসারে ঠিক যে শব্দ ভুলে যেতে পারেন, তা মোবাইল স্ক্রিনে রিকল ড্রিল করায়।'
            : 'Schedules review of Kanji & vocab at the mathematically optimal forgetting interval.'
        },
        {
          id: 'radar',
          icon: Target,
          badge: 'FEATURE 03',
          nameJp: '弱点自動追跡レーダー',
          nameEn: 'Smart Mistake Radar',
          nameBn: 'মিস্টেক ট্র্যাকার ও দুর্বলতা রেডার',
          summary: currentLang === 'jp' 
            ? '助詞（は/が/に/で）や動詞活用（て形・ない形）の苦手箇所をAIが可視化。' 
            : currentLang === 'bn'
            ? 'পার্টিকল ও ভার্ব ফর্মে যে ভুলগুলো বারবার হয় তা আলাদা করে প্র্যাকটিস করায়।'
            : 'Diagnoses repeat mistakes in particles and verb forms for focused mastery.'
        },
        {
          id: 'mock',
          icon: Cpu,
          badge: 'FEATURE 04',
          nameJp: 'JLPT 本番仕様タイマー模試',
          nameEn: 'JLPT CBT Exam Simulator',
          nameBn: 'জেএলপিটি কম্পিউটার-বেসড মক এক্সাম',
          summary: currentLang === 'jp' 
            ? 'N5〜N2の本番と同時間・配点で採点し、合格判定と弱点分野を即時レポート。' 
            : currentLang === 'bn'
            ? 'এন৫ থেকে এন২ রিয়েল টাইমড মক টেস্ট এবং তৎক্ষণাৎ স্কোর ও পাস প্রেডিকশন।'
            : 'Full timed N5–N2 tests with instant pass-fail probability metrics.'
        }
      ]
    },
    programs: {
      tag: 'CURRICULUM',
      title: currentLang === 'jp' ? '提供プログラム (無駄のない4つの重点指導)' : currentLang === 'bn' ? '৪টি মূল জাপানিজ প্রোগ্রাম' : 'Core Programs (Minimalist Standard)',
      items: [
        {
          id: 'c-jp-n5',
          num: '01',
          name: currentLang === 'jp' ? 'JLPT N5 基礎合格コース' : 'JLPT N5 Beginner Foundation',
          desc: currentLang === 'jp' ? 'N5過去問集中分析・ひらがな・カタカナ・基本文法' : 'Hiragana, Katakana, basic grammar & N5 mock drill.',
          pills: ['JLPT N5', 'NAT-TEST 5Q', 'Daily Nihomi AI'],
          fee: '৳12,000 / 3 Months'
        },
        {
          id: 'c-jp-n4',
          num: '02',
          name: currentLang === 'jp' ? 'JLPT N4 中級特訓コース' : 'JLPT N4 Intermediate Mastery',
          desc: currentLang === 'jp' ? '複合動詞・敬語・聴解集中音響スタジオ' : 'Compound verbs, keigo intro & acoustic listening lab.',
          pills: ['JLPT N4', 'Listening Labs', 'COE Ready'],
          fee: '৳14,000 / 3 Months'
        },
        {
          id: 'c-jp-ssw',
          num: '03',
          name: currentLang === 'jp' ? '特定技能 (SSW) 育成コース' : 'Specified Skilled Worker (SSW)',
          desc: currentLang === 'jp' ? '介護・外食・製造の専門用語と5S職場規律' : 'Caregiving & food service technical vocab with 5S.',
          pills: ['Caregiving', 'Food Service', 'Direct Interview'],
          fee: '৳15,000 / 3 Months'
        },
        {
          id: 'c-jp-biz',
          num: '04',
          name: currentLang === 'jp' ? '日本ビジネスマナー・お辞儀' : 'Business Etiquette & Ojigi',
          desc: currentLang === 'jp' ? '毎朝のお辞儀(15°/30°/45°)と報連相の実践' : 'Precise bowing posture and Ho-Ren-So daily reporting.',
          pills: ['15°/30°/45° Bow', 'Ho-Ren-So', 'Time Punctuality'],
          fee: '৳8,000 / 1 Month'
        }
      ]
    },
    alumniSection: {
      tag: 'COE & VISA TRACK RECORD',
      title: currentLang === 'jp' ? '在留資格認定証明書 (COE) 交付実績' : currentLang === 'bn' ? 'সফল শিক্ষার্থীদের সিওই ও ভিসা গ্যালারি' : 'Verified Alumni COE & Visa Wall',
      subtitle: currentLang === 'jp' 
        ? '日本の各地方出入国在留管理局より認可された真正な実績。' 
        : currentLang === 'bn' 
        ? 'টোকিও, ওসাকা, নাগোয়ার অনুমোদিত শিক্ষাপ্রতিষ্ঠানে শিক্ষার্থীদের সত্যনিষ্ঠ সফলতা।'
        : 'Genuine COE certifications authorized by Japanese Regional Immigration Bureaus.',
    },
    verifySection: {
      tag: 'ZERO-FORGERY SECURITY',
      title: currentLang === 'jp' ? '暗号化QRコードによる真正性検証システム' : currentLang === 'bn' ? 'ক্রিপ্টোগ্রাফিক কিউআর ভেরিফিকেশন ও জিরো-ফোরজারি' : 'Cryptographic QR Verification System',
      desc: currentLang === 'jp'
        ? 'DILS発行の修了証・推薦状はすべて暗号化QRコードを搭載。日本の入管審査官および提携校様が即座に原本確認可能。'
        : currentLang === 'bn'
        ? 'ডিআইএলএস এর প্রতিটি সার্টিফিকেট কিউআর কোডযুক্ত, যা জাপানি ইমিগ্রেশন ও পার্টনার স্কুলগুলো ১ সেকেন্ডেই অনলাইনে যাচাই করতে পারে।'
        : 'Every DILS certificate carries a tamper-proof cryptographic QR code verified instantly by Japanese Immigration and partner schools.',
    },
    steps: {
      tag: 'B2B PARTNERSHIP',
      title: currentLang === 'jp' ? '日本の教育機関様との連携ステップ' : currentLang === 'bn' ? 'জাপানিজ পার্টনারশিপের ৪টি সহজ ধাপ' : '4-Step Partnership Workflow',
      items: [
        { step: '01', title: 'Zoom Consultation', descJp: 'ご要望や定員のオンライン面談' },
        { step: '02', title: 'Candidate Screening', descJp: '成績・出席率・意欲の厳格な選考' },
        { step: '03', title: 'Direct Interview', descJp: '日本の先生方とのオンライン直接面接' },
        { step: '04', title: 'COE & Pre-Departure', descJp: '在留資格申請とNihomi渡日前特訓' }
      ]
    }
  };

  // Simulated AI dialogue samples
  const dialogueSamples = [
    {
      student: 'わたし は がくせい です。(Watashi wa gakusei desu.)',
      audioWord: 'わたしはがくせいです',
      sensei: 'すばらしい！助詞「は」の使い方が正しいです。(Excellent! Correct particle!)',
      accuracy: '98% Speech Accuracy'
    },
    {
      student: 'あした とうきょう に いきます。(Ashita Tokyo ni ikimasu.)',
      audioWord: 'あしたとうきょうにいきます',
      sensei: 'パーフェクト！行き先を示す「に」が自然です。(Natural destination particle!)',
      accuracy: '100% Pronunciation Score'
    },
    {
      student: 'きのう えいが を みました。(Kinou eiga wo mimashita.)',
      audioWord: 'きのうえいがをみました',
      sensei: '合格！過去形「〜ました」も完璧です。(Past tense form mastered!)',
      accuracy: '96% JLPT N5 Benchmark'
    }
  ];

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddNewLead && (partnerForm.contactPerson || partnerForm.orgName)) {
      onAddNewLead({
        id: `PARTNER-${Date.now()}`,
        name: partnerForm.contactPerson ? `${partnerForm.contactPerson} (${partnerForm.orgName || 'Japan Partner'})` : partnerForm.orgName,
        phone: partnerForm.email || 'N/A',
        email: partnerForm.email,
        city: partnerForm.locationInJapan || 'Tokyo',
        courseInterest: `Partner Inquiry (${partnerForm.orgType})`,
        stage: 'counseling',
        notes: [
          `Japanese Institutional Partnership Inquiry`,
          `Organization: ${partnerForm.orgName || 'N/A'} (${partnerForm.orgType})`,
          `Location: ${partnerForm.locationInJapan}`,
          `Note: ${partnerForm.notes || 'None provided'}`
        ]
      });
    }

    setPartnerForm(prev => ({ ...prev, submitted: true }));
    setTimeout(() => {
      setPartnerModalOpen(false);
      setPartnerForm({
        orgName: '',
        orgType: 'language_school',
        contactPerson: '',
        email: '',
        locationInJapan: 'Tokyo',
        notes: '',
        submitted: false
      });
    }, 2000);
  };

  const handleFastAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!admissionForm.fullName || !admissionForm.phone) return;

    if (onAddNewLead) {
      const prog = t.programs.items.find(p => p.id === selectedCourseId);
      onAddNewLead({
        id: `FAST-${Date.now()}`,
        name: admissionForm.fullName,
        phone: admissionForm.phone,
        courseInterest: prog ? prog.name : selectedCourseId,
        targetIntake: `${selectedBatchTime} Batch`,
        city: 'Dhaka (Farmgate Campus)',
        stage: 'new',
        notes: [
          `Fast 2-Click Admission drawer submission from landing page.`,
          `Preferred Batch: ${selectedBatchTime}`,
          `Course: ${prog ? prog.name : selectedCourseId}`
        ]
      });
    }

    setAdmissionForm(prev => ({ ...prev, submitted: true }));
    setTimeout(() => {
      setFastAdmissionOpen(false);
      setAdmissionForm({ fullName: '', phone: '', submitted: false });
    }, 2500);
  };

  const handleAnswerQuestion = (index: number) => {
    setSelectedChoice(index);
    const isCorrect = testQuestions[testCurrentQ].options[index].isCorrect;
    if (isCorrect) setTestScore(prev => prev + 1);

    setTimeout(() => {
      if (testCurrentQ + 1 < testQuestions.length) {
        setTestCurrentQ(prev => prev + 1);
        setSelectedChoice(null);
      } else {
        setTestCompleted(true);
      }
    }, 800);
  };

  const resetTest = () => {
    setTestCurrentQ(0);
    setTestScore(0);
    setSelectedChoice(null);
    setTestCompleted(false);
  };

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 font-sans selection:bg-red-600 selection:text-white relative overflow-x-hidden antialiased">
      
      {/* =========================================================================
          1. GLOBAL TOP UTILITY BAR (Live Dual Clocks & Minimalist Language Switcher)
         ========================================================================= */}
      <div className="bg-[#050915] border-b border-indigo-950/80 px-4 sm:px-8 py-2 text-xs text-slate-300 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Dual Clocks (Tokyo & Dhaka) */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 bg-indigo-950/40 border border-red-500/30 px-2.5 py-0.5 rounded-full text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              <span className="font-semibold text-slate-300">{t.top.tokyo}:</span>
              <span className="font-mono text-red-400 font-bold">{tokyoTime || '09:00'}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-indigo-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-slate-300">{t.top.dhaka}:</span>
              <span className="font-mono text-emerald-400 font-bold">{dhakaTime || '06:00'}</span>
            </div>

            <span className="hidden md:inline text-slate-400 text-[11px] font-mono border-l border-slate-800 pl-3">
              Farmgate Campus, 95 Green Road, Dhaka
            </span>
          </div>

          {/* Right Actions: QR Verify, Partner Login, Switcher */}
          <div className="flex items-center gap-2.5 ml-auto">
            <button
              onClick={() => onOpenValidator && onOpenValidator('DILS-CERT-2026-0048')}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-950/30 border border-amber-800/50 px-2 py-0.5 rounded hover:bg-amber-900/30 transition-colors"
            >
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>{t.top.verify}</span>
            </button>

            <button
              onClick={() => setPartnerModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-white bg-indigo-900/50 hover:bg-indigo-800/70 border border-indigo-700/50 px-2.5 py-0.5 rounded transition-all"
            >
              <Building2 className="w-3 h-3 text-red-400" />
              <span>{t.top.partnerBtn}</span>
            </button>

            <button
              onClick={handleInstallPwa}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/60 px-2 py-0.5 rounded transition-all"
              title="Install DILS Mobile App"
            >
              <Smartphone className="w-3 h-3 text-amber-400" />
              <span>{currentLang === 'jp' ? 'アプリ導入' : currentLang === 'bn' ? 'অ্যাপ ইনস্টল' : 'App Install'}</span>
            </button>

            {/* Trilingual Pill Switcher */}
            <div className="flex items-center bg-[#0B142A] border border-indigo-900/70 rounded p-0.5">
              <button
                onClick={() => setCurrentLang('jp')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                  currentLang === 'jp' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                日本語
              </button>
              <button
                onClick={() => setCurrentLang('en')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                  currentLang === 'en' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setCurrentLang('bn')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                  currentLang === 'bn' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>

        </div>
      </div>


      {/* =========================================================================
          2. MINIMALIST APPLE/MUJI NAVIGATION
         ========================================================================= */}
      <nav className="sticky top-0 z-40 bg-[#070D1E]/95 backdrop-blur-xl border-b border-indigo-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 to-indigo-950 flex items-center justify-center border border-red-500/40">
              <span className="text-white font-black text-base font-serif">DILS</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black tracking-tight text-white">DILS Dhaka</span>
                <span className="bg-red-950 text-red-400 border border-red-800 text-[9px] px-1.5 py-0.2 rounded font-mono font-bold">
                  JAPAN
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">ダッカ国際語学学校</p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-5 text-xs font-semibold text-slate-300">
            <a href="#nihomi-features" className="hover:text-red-400 transition-colors flex items-center gap-1">
              <Brain className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.nav.features}</span>
            </a>
            <a href="#analytics" className="hover:text-red-400 transition-colors flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-red-400" />
              <span>{t.nav.analytics}</span>
            </a>
            <a href="#student-journey" className="hover:text-red-400 transition-colors flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.nav.journey}</span>
            </a>
            <button 
              onClick={() => { resetTest(); setQuickTestOpen(true); }}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.nav.quickTest}</span>
            </button>
            <a href="#leadership" className="hover:text-red-400 transition-colors">
              {t.nav.leadership}
            </a>
            <a href="#programs" className="hover:text-red-400 transition-colors">
              {t.nav.programs}
            </a>
            <a href="#cost-calculator" className="hover:text-red-400 transition-colors flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5 text-red-400" />
              <span>{t.nav.calculator}</span>
            </a>
            <button
              onClick={() => setScheduleModalOpen(true)}
              className="hover:text-amber-300 text-slate-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.nav.schedule}</span>
            </button>
            <a href="#alumni-coe" className="hover:text-red-400 transition-colors flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-red-400" />
              <span>{t.nav.alumni}</span>
            </a>
            <a href="#campuses" className="hover:text-red-400 transition-colors">
              {t.nav.campuses}
            </a>
          </div>

          {/* Nav Right CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => setPartnerModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-100 bg-[#0E1B38] hover:bg-[#14264E] border border-indigo-700/60 rounded-lg transition-all"
            >
              {t.nav.inquire}
            </button>
            <button
              onClick={() => setFastAdmissionOpen(true)}
              className="px-4 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-md shadow-red-950/60 transition-all flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.nav.studentApp}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-indigo-950/60 border border-indigo-800 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#060B19]/98 border-b border-indigo-950 px-6 py-4 space-y-3 text-xs font-semibold">
            <a href="#nihomi-features" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-200">
              {t.nav.features}
            </a>
            <a href="#analytics" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-red-400 font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-red-400" />
              <span>{t.nav.analytics}</span>
            </a>
            <a href="#student-journey" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-emerald-400 font-bold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.nav.journey}</span>
            </a>
            <button 
              onClick={() => { setMobileMenuOpen(false); resetTest(); setQuickTestOpen(true); }}
              className="w-full text-left py-1 text-amber-400 font-bold flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{t.nav.quickTest}</span>
            </button>
            <a href="#leadership" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-200">
              {t.nav.leadership}
            </a>
            <a href="#programs" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-200">
              {t.nav.programs}
            </a>
            <a href="#cost-calculator" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-200">
              {t.nav.calculator}
            </a>
            <button 
              onClick={() => { setMobileMenuOpen(false); setScheduleModalOpen(true); }}
              className="w-full text-left py-1 text-amber-300 font-semibold flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.nav.schedule} (ক্লাস রুটিন)</span>
            </button>
            <a href="#alumni-coe" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-200">
              {t.nav.alumni}
            </a>
            <a href="#campuses" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-slate-200">
              {t.nav.campuses}
            </a>
            <button 
              onClick={() => { setMobileMenuOpen(false); handleInstallPwa(); }}
              className="w-full text-left py-1.5 text-amber-300 font-bold flex items-center gap-2 border-t border-indigo-950 pt-2"
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentLang === 'jp' ? 'DILS公式アプリをスマホに導入 (PWA)' : currentLang === 'bn' ? 'মোবাইলে DILS অ্যাপ ইনস্টল করুন (PWA)' : 'Install DILS App on Phone (PWA)'}</span>
            </button>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); setPartnerModalOpen(true); }}
                className="w-full py-2.5 bg-[#0E1B38] text-white rounded-lg border border-indigo-700 font-bold"
              >
                {t.nav.inquire}
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); setFastAdmissionOpen(true); }}
                className="w-full py-2.5 bg-red-600 text-white rounded-lg font-bold"
              >
                {t.nav.studentApp}
              </button>
            </div>
          </div>
        )}
      </nav>


      {/* =========================================================================
          3. MINIMALIST HERO (Clean, High-Impact, Scannable)
         ========================================================================= */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-indigo-950/70">
        
        {/* Subtle Cyber Grid & Ambient Red Glow */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-red-600/10 rounded-full blur-[140px]"></div>
          <div 
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          ></div>
          <div className="absolute top-16 right-10 text-slate-900/20 font-serif text-8xl font-black select-none pointer-events-none">
            規律
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10 text-center space-y-7">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-mono font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.hero.badge}</span>
          </div>

          {/* High-Impact Headline */}
          <div className="space-y-3 max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-serif">
              {t.hero.titleJp}
            </h1>
            <p className="text-sm sm:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Fast CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setPartnerModalOpen(true)}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/60 transition-all flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              <span>{t.hero.ctaPartner}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setFastAdmissionOpen(true)}
              className="px-5 py-3 bg-[#0E1B38] hover:bg-[#152750] text-slate-200 font-bold text-xs rounded-xl border border-indigo-700/60 transition-colors flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-red-400" />
              <span>{t.hero.ctaStudent}</span>
            </button>

            <button
              onClick={() => { resetTest(); setQuickTestOpen(true); }}
              className="px-4 py-3 bg-amber-950/40 hover:bg-amber-900/40 text-amber-300 font-bold text-xs rounded-xl border border-amber-600/40 transition-colors flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Try 30s Nihomi Test</span>
            </button>
          </div>

          {/* 4 Minimalist Metric Chips with Glassmorphism */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6">
            {t.hero.chips.map((c, i) => (
              <div 
                key={i} 
                className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-3.5 text-left shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all"
              >
                <div className="text-sm font-black text-white font-mono">{c.label}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{c.sub}</div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          4. NIHOMI.COM EMBEDDED FEATURES (Interactive Voice & Simulation Display)
         ========================================================================= */}
      <section id="nihomi-features" className="py-16 sm:py-24 bg-[#050A18] border-b border-indigo-950 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-950 text-red-400 text-[11px] font-mono font-bold">
                <Brain className="w-3 h-3 text-amber-400" />
                <span>{t.nihomiSection.tag}</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                {t.nihomiSection.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                {t.nihomiSection.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={() => { resetTest(); setQuickTestOpen(true); }}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Take 30s Live Quiz</span>
              </button>

              <button
                onClick={() => onSwitchToStudentPortal && onSwitchToStudentPortal('c-jp-n5')}
                className="px-3.5 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-lg text-xs font-bold shadow-md shadow-red-950/60 flex items-center gap-1.5"
              >
                <span>Launch LMS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Feature Tabs + Live Preview Window with Glassmorphism */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl">
            
            {/* Top Bar */}
            <div className="bg-slate-950/70 border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-slate-400 pl-2">nihomi.com/engine • DILS Integrated AI</span>
              </div>
              <span className="text-emerald-400 font-bold text-[10px]">AI ENGINE CONNECTED</span>
            </div>

            {/* Feature Selectors Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-800/80 bg-slate-950/40">
              {t.nihomiSection.features.map((feat) => {
                const IconComponent = feat.icon;
                const isActive = activeNihomiFeature === feat.id;
                return (
                  <button
                    key={feat.id}
                    onClick={() => setActiveNihomiFeature(feat.id as any)}
                    className={`p-3.5 text-left border-r border-slate-800/80 transition-all ${
                      isActive 
                        ? 'bg-red-600/20 border-b-2 border-b-red-500 text-white' 
                        : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-red-400 font-bold mb-1">
                      <IconComponent className="w-3.5 h-3.5" />
                      <span>{feat.badge}</span>
                    </div>
                    <div className="text-xs font-bold text-white line-clamp-1">
                      {currentLang === 'jp' ? feat.nameJp : currentLang === 'bn' ? feat.nameBn : feat.nameEn}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feature Interactive Showcase Body */}
            <div className="p-6 sm:p-8 bg-slate-950/40 min-h-[300px] flex flex-col justify-center">
              
              {/* Feature 1: AI Sensei Voice / Chat Simulation with Live Sound */}
              {activeNihomiFeature === 'sensei' && (
                <div className="space-y-4 max-w-2xl mx-auto w-full">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Brain className="w-4 h-4 text-red-400" />
                      <span>AI Sensei Dialogue &amp; Speech Feedback</span>
                    </span>
                    <button
                      onClick={() => setAiChatIndex((prev) => (prev + 1) % dialogueSamples.length)}
                      className="text-[11px] text-red-400 hover:underline flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Next Dialogue Demo</span>
                    </button>
                  </div>

                  {/* Chat bubbles */}
                  <div className="space-y-3">
                    <div className="bg-[#0B1530] border border-indigo-900 rounded-xl p-3 text-xs flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold">
                        YOU
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="font-medium text-white flex items-center justify-between">
                          <span>{dialogueSamples[aiChatIndex].student}</span>
                          <button
                            onClick={() => playPronunciation(dialogueSamples[aiChatIndex].audioWord, 'ja-JP')}
                            className="p-1 text-slate-400 hover:text-amber-400 rounded transition-colors"
                            title="Hear Audio"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">Bangla-Speaker Student Input</div>
                      </div>
                    </div>

                    <div className="bg-red-950/30 border border-red-800/60 rounded-xl p-3 text-xs flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-[10px] font-bold text-white">
                        AI
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="font-medium text-amber-300">{dialogueSamples[aiChatIndex].sensei}</div>
                        <div className="text-[10px] text-emerald-400 font-mono font-bold">
                          ✓ {dialogueSamples[aiChatIndex].accuracy}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 pt-1">
                    {t.nihomiSection.features[0].summary}
                  </p>
                </div>
              )}

              {/* Feature 2: Spaced Repetition Flashcards */}
              {activeNihomiFeature === 'srs' && (
                <div className="space-y-4 max-w-xl mx-auto w-full text-center">
                  <div className="bg-[#091228] border border-indigo-800 rounded-2xl p-6 shadow-inner space-y-3">
                    <div className="text-[10px] font-mono text-red-400 uppercase tracking-wider">
                      SRS FLASHCARD • JLPT N5 GOI
                    </div>
                    <div className="text-4xl font-black text-white font-serif tracking-widest flex items-center justify-center gap-3">
                      <span>学生 (がくせい)</span>
                      <button
                        onClick={() => playPronunciation('がくせい', 'ja-JP')}
                        className="p-1.5 text-slate-400 hover:text-amber-400 bg-indigo-950 rounded-full"
                        title="Hear Audio"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-sm font-semibold text-slate-300">
                      Meaning: Student (ছাত্র / ছাত্রী)
                    </div>
                    <div className="text-xs text-emerald-400 font-mono font-bold">
                      Optimal Recall Scheduled in: 3 days (Memory Strength: 92%)
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    {t.nihomiSection.features[1].summary}
                  </p>
                </div>
              )}

              {/* Feature 3: Mistake Radar */}
              {activeNihomiFeature === 'radar' && (
                <div className="space-y-3 max-w-xl mx-auto w-full">
                  <div className="text-xs font-bold text-white flex justify-between">
                    <span>Weakness Diagnosis Radar</span>
                    <span className="text-red-400 font-mono text-[11px]">Auto-Targeting Failed Items</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                        <span>Particles 「は」 vs 「が」</span>
                        <span className="text-emerald-400 font-mono">94% Mastered</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#050916]">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                        <span>Te-form Conjunction (〜てから / 〜てはいけません)</span>
                        <span className="text-amber-400 font-mono">88% (Practicing)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#050916]">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                        <span>Acoustic Listening (Direction &amp; Clock Traps)</span>
                        <span className="text-indigo-400 font-mono">91% Accuracy</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#050916]">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: '91%' }}></div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 pt-2 text-center">
                    {t.nihomiSection.features[2].summary}
                  </p>
                </div>
              )}

              {/* Feature 4: JLPT CBT Mock Simulator */}
              {activeNihomiFeature === 'mock' && (
                <div className="space-y-4 max-w-xl mx-auto w-full text-center">
                  <div className="bg-[#070D1E] border border-indigo-900 rounded-xl p-5 space-y-2">
                    <div className="text-xs font-mono text-emerald-400 font-bold">
                      JLPT N5 MOCK EXAM SIMULATOR
                    </div>
                    <div className="text-3xl font-black text-white font-mono">
                      Score: 168 / 180 (93.3%)
                    </div>
                    <div className="inline-block px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded text-xs font-bold font-mono">
                      PREDICTED RESULT: PASS (AA)
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    {t.nihomiSection.features[3].summary}
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          4.5 NIHOMI LEARNING ANALYTICS (Real-Time Student Progress Telemetry)
         ========================================================================= */}
      <NihomiLearningAnalytics
        lang={currentLang}
        onOpenAdmission={() => setFastAdmissionOpen(true)}
        onSwitchToStudentPortal={onSwitchToStudentPortal}
      />


      {/* =========================================================================
          5. ACADEMIC LEADERSHIP & TRUST (Razzak Sir: Crisp, High-Trust)
         ========================================================================= */}
      <section id="leadership" className="py-16 sm:py-20 bg-[#070D1E] border-b border-indigo-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center space-y-1">
            <span className="text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
              {t.leadership.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.leadership.title}
            </h2>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-2xl hover:border-slate-700/80 transition-all">
            
            {/* Portrait Crest */}
            <div className="flex-shrink-0 text-center space-y-2">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-red-600 to-indigo-950 border-2 border-red-500/40 flex items-center justify-center text-white font-black text-3xl shadow-lg relative mx-auto">
                AR
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded bg-red-600 text-white font-serif text-[10px] font-bold flex items-center justify-center border border-red-400">
                  印
                </span>
              </div>
              <div className="px-2 py-0.5 bg-amber-500 text-slate-950 font-black text-[10px] font-mono rounded">
                JLPT N1 HIGHEST
              </div>
            </div>

            {/* Profile Info & 1-line Quote */}
            <div className="space-y-3 flex-1 text-center md:text-left">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white font-serif">
                  {t.leadership.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {t.leadership.role}
                </p>
              </div>

              <blockquote className="text-xs sm:text-sm text-slate-200 font-medium italic border-l-2 border-red-500/80 pl-3">
                {t.leadership.quote}
              </blockquote>

              {/* 3 Crisp Badges with Glassmorphism */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                {t.leadership.badges.map((b, i) => (
                  <div key={i} className="bg-slate-950/60 backdrop-blur-sm border border-slate-800/80 rounded-xl p-2.5 text-xs shadow-sm">
                    <div className="font-bold text-white text-[11px]">{b.title}</div>
                    <div className="text-[10px] text-slate-400">{b.desc}</div>
                  </div>
                ))}
              </div>

              {/* Instant WhatsApp direct consult button */}
              <div className="pt-2">
                <a
                  href="https://wa.me/8801300634046?text=Hello%20Sensei%20Razzak,%20I%20would%20like%20to%20consult%20about%20Japan%20Language%20Course%20and%20Visa%20at%20DILS."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600/20 border border-emerald-500/50 hover:bg-emerald-600/30 text-emerald-300 rounded-lg text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct WhatsApp with Sensei Razzak: +880 1300-634046</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          6. CORE PROGRAMS (Fast 1-Click Enrollment)
         ========================================================================= */}
      <section id="programs" className="py-16 sm:py-20 bg-[#050A18] border-b border-indigo-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center space-y-1">
            <span className="text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
              {t.programs.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.programs.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.programs.items.map((p, idx) => (
              <div
                key={idx}
                className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-xl hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black font-mono text-red-500/70">{p.num}</span>
                    <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                      {p.fee}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{p.name}</h4>
                  <p className="text-xs text-slate-400 leading-snug">{p.desc}</p>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1">
                    {p.pills.map((pill, pi) => (
                      <span key={pi} className="text-[10px] font-mono bg-slate-950/60 border border-slate-800/60 px-2 py-0.5 rounded text-slate-300">
                        {pill}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCourseId(p.id);
                      setFastAdmissionOpen(true);
                    }}
                    className="w-full py-2 bg-red-600/90 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          6.2 5-STEP STUDENT JOURNEY ROADMAP (Swipeable Carousel with Snap-X)
         ========================================================================= */}
      <section id="student-journey" className="py-16 sm:py-24 bg-[#030712] border-b border-indigo-950/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <StudentJourney
            lang={currentLang}
            onOpenAdmission={() => setFastAdmissionOpen(true)}
            onOpenValidator={(certId) => onOpenValidator && onOpenValidator(certId)}
          />
        </div>
      </section>


      {/* =========================================================================
          6.5 TRANSPARENT TUITION & VISA COST CALCULATOR (Zero Hidden Costs)
         ========================================================================= */}
      <section id="cost-calculator" className="py-16 sm:py-20 bg-[#060B1A] border-b border-indigo-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-red-400 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" />
                <span>{t.calculator.tag}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {t.calculator.title}
              </h2>
              <p className="text-xs text-slate-400">
                {t.calculator.subtitle}
              </p>
            </div>

            <button
              onClick={() => setScheduleModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-950/70 border border-indigo-800 text-amber-300 text-xs font-bold rounded-lg hover:bg-indigo-900 transition-colors self-start md:self-auto"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentLang === 'jp' ? '週間時間割を見る' : 'View Class Timetable & Routine'}</span>
            </button>
          </div>

          {/* Calculator Card with Glassmorphism */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl hover:border-slate-700/80 transition-all">
            
            {/* Step 1: Select Target Goal */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                1. Select Course Target (কোর্স লক্ষ্য নির্বাচন করুন)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {[
                  { id: 'n5', name: 'JLPT N5 Foundation', hours: '150 Hours', fee: 12000, courseCode: 'c-jp-n5' },
                  { id: 'n4', name: 'JLPT N4 Intermediate', hours: '160 Hours', fee: 14000, courseCode: 'c-jp-n4' },
                  { id: 'ssw', name: 'SSW Tokutei Ginou', hours: '180 Hours', fee: 15000, courseCode: 'c-jp-ssw' },
                  { id: 'combo', name: 'N5+N4 Complete Pack', hours: '310 Hours (Save ৳4,000)', fee: 22000, courseCode: 'c-jp-n5' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCalcCourse(item.id as any);
                      setSelectedCourseId(item.courseCode);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      calcCourse === item.id
                        ? 'bg-red-600/20 border-red-500 text-white shadow-md'
                        : 'bg-slate-950/60 backdrop-blur-sm border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.hours}</div>
                    <div className="text-xs font-mono font-bold text-amber-400 mt-1">৳{item.fee.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Intake & Add-ons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
              
              {/* Intake */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                  2. Targeted Japan Intake (ইনটেক)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['April 2027', 'October 2027', 'July 2027'].map((intake) => (
                    <button
                      key={intake}
                      onClick={() => setCalcIntake(intake as any)}
                      className={`p-2 rounded-xl border text-center text-xs font-bold transition-all ${
                        calcIntake === intake
                          ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm'
                          : 'bg-slate-950/60 backdrop-blur-sm text-slate-400 border-slate-800/80 hover:text-slate-200'
                      }`}
                    >
                      {intake}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons checkboxes */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                  3. Transparent Materials &amp; Registration
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 p-2 bg-slate-950/60 backdrop-blur-sm rounded-xl border border-slate-800/80 text-xs cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={includeBooks}
                      onChange={(e) => setIncludeBooks(e.target.checked)}
                      className="accent-red-600 rounded"
                    />
                    <span className="text-slate-200">Original Japanese Textbooks Pack (Minna no Nihongo)</span>
                    <span className="ml-auto font-mono text-amber-400 font-bold">+৳1,500</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-slate-950/60 backdrop-blur-sm rounded-xl border border-slate-800/80 text-xs cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={includeExamFee}
                      onChange={(e) => setIncludeExamFee(e.target.checked)}
                      className="accent-red-600 rounded"
                    />
                    <span className="text-slate-200">Official NAT-TEST / JLPT Exam Registration</span>
                    <span className="ml-auto font-mono text-amber-400 font-bold">+৳3,500</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Step 3: Transparent Breakdown Summary */}
            <div className="bg-slate-950/70 backdrop-blur-sm rounded-2xl p-5 border border-slate-800/80 space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-slate-800/80">
                <span className="text-slate-400">COST ITEM BREAKDOWN</span>
                <span className="text-slate-400">AMOUNT (BDT)</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Classroom Tuition (150-310h Intensive Live Coaching)</span>
                  <span className="font-mono font-bold text-white">
                    ৳{(calcCourse === 'n5' ? 12000 : calcCourse === 'n4' ? 14000 : calcCourse === 'ssw' ? 15000 : 22000).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Nihomi.com 24/7 AI Cloud Practice License (Unlimited)</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-400">
                    ৳0 FREE <span className="line-through text-slate-600 text-[10px]">৳3,000</span>
                  </span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Sensei Razzak's 1-on-1 Visa Mock &amp; Document Audit</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-400">
                    ৳0 INCLUDED <span className="line-through text-slate-600 text-[10px]">৳5,000</span>
                  </span>
                </div>

                {includeBooks && (
                  <div className="flex justify-between text-slate-300">
                    <span>Original Japanese Textbooks &amp; Audio CDs</span>
                    <span className="font-mono font-bold text-amber-400">৳1,500</span>
                  </div>
                )}

                {includeExamFee && (
                  <div className="flex justify-between text-slate-300">
                    <span>NAT-TEST / JLPT Official Exam Direct Fee</span>
                    <span className="font-mono font-bold text-amber-400">৳3,500</span>
                  </div>
                )}
              </div>

              {/* Total & Installments */}
              {(() => {
                const baseTuition = calcCourse === 'n5' ? 12000 : calcCourse === 'n4' ? 14000 : calcCourse === 'ssw' ? 15000 : 22000;
                const total = baseTuition + (includeBooks ? 1500 : 0) + (includeExamFee ? 3500 : 0);
                const firstInst = Math.round(baseTuition * 0.6) + (includeBooks ? 1500 : 0);
                const secondInst = total - firstInst;

                return (
                  <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase">Total Estimated Investment</div>
                      <div className="text-2xl font-black text-white font-mono flex items-baseline gap-2">
                        <span>৳{total.toLocaleString()}</span>
                        <span className="text-[11px] text-emerald-400 font-sans font-bold">100% Transparent</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Installments: 1st ৳{firstInst.toLocaleString()} (At admission) • 2nd ৳{secondInst.toLocaleString()} (After 45 days)
                      </div>
                    </div>

                    <button
                      onClick={() => setFastAdmissionOpen(true)}
                      className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/60 transition-all flex items-center justify-center gap-2"
                    >
                      <Receipt className="w-4 h-4" />
                      <span>Lock My Seat with this Plan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })()}

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          7. ALUMNI COE & VISA SUCCESS WALL (Minimalist High-Trust Cards)
         ========================================================================= */}
      <section id="alumni-coe" className="py-16 sm:py-20 bg-[#070D1E] border-b border-indigo-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                {t.alumniSection.tag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {t.alumniSection.title}
              </h2>
              <p className="text-xs text-slate-400">
                {t.alumniSection.subtitle}
              </p>
            </div>

            {/* City Filter Pills */}
            <div className="flex items-center gap-1.5 bg-[#0A132C] border border-indigo-900 rounded-lg p-1 text-xs">
              {['All', 'Tokyo', 'Osaka', 'Nagoya', 'Kyoto'].map((city) => (
                <button
                  key={city}
                  onClick={() => setAlumniFilter(city as any)}
                  className={`px-2.5 py-1 rounded font-bold text-[11px] transition-all ${
                    alumniFilter === city 
                      ? 'bg-red-600 text-white' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredAlumni.map((alumni) => (
              <div 
                key={alumni.id}
                className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 space-y-3 shadow-lg hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={alumni.studentPhoto} 
                      alt={alumni.studentName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700/60 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{alumni.studentName}</h4>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>COE 交付済</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-2 bg-slate-950/60 backdrop-blur-sm rounded-xl border border-slate-800/80 text-[11px] space-y-1">
                    <div className="font-semibold text-slate-200 line-clamp-1">{alumni.institutionInJapan}</div>
                    <div className="text-[10px] text-slate-400 flex items-center justify-between">
                      <span>{alumni.destinationCity}</span>
                      <span className="text-amber-400 font-mono font-bold">{alumni.intake}</span>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 bg-slate-950/60 px-2 py-1 rounded-lg border border-slate-800/60 flex items-center justify-between">
                    <span>{alumni.coeNumber}</span>
                    <span className="text-red-400 font-bold">{alumni.visaType}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                  <span className="text-emerald-400 font-mono">{alumni.passingScore}</span>
                  <button 
                    onClick={() => onOpenValidator && onOpenValidator('DILS-CERT-2026-0048')}
                    className="text-slate-400 hover:text-white flex items-center gap-0.5"
                    title="Audit Record"
                  >
                    <span>Audit</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          8. ZERO-FORGERY CRYPTOGRAPHIC QR VERIFICATION (High B2B Trust)
         ========================================================================= */}
      <section id="verify-system" className="py-16 sm:py-20 bg-[#050A18] border-b border-indigo-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl hover:border-slate-700/80 transition-all">
            
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 text-[11px] font-mono font-bold border border-emerald-800/50">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.verifySection.tag}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-serif">
                {t.verifySection.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.verifySection.desc}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="bg-slate-950/60 backdrop-blur-sm p-2.5 rounded-xl border border-slate-800/80 text-left">
                  <div className="text-[10px] text-slate-400 font-mono">Digital Signature</div>
                  <div className="text-xs font-bold text-white font-mono">SHA-256 Auth</div>
                </div>
                <div className="bg-slate-950/60 backdrop-blur-sm p-2.5 rounded-xl border border-slate-800/80 text-left">
                  <div className="text-[10px] text-slate-400 font-mono">Immigration Bureau</div>
                  <div className="text-xs font-bold text-emerald-400 font-mono">Instant Valid</div>
                </div>
                <div className="bg-slate-950/60 backdrop-blur-sm p-2.5 rounded-xl border border-slate-800/80 text-left col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-slate-400 font-mono">Personal Stamp</div>
                  <div className="text-xs font-bold text-red-400 font-mono">Razzak 落款印</div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center gap-3 bg-slate-950/70 backdrop-blur-sm p-6 rounded-2xl border border-slate-800/80 text-center shadow-xl">
              <div className="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center shadow-inner">
                <QrCode className="w-24 h-24 text-slate-950" />
              </div>
              <div className="text-[10px] font-mono text-slate-300">
                ID: DILS-CERT-2026-0048
              </div>
              <button
                onClick={() => onOpenValidator && onOpenValidator('DILS-CERT-2026-0048')}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Test Live QR Audit</span>
              </button>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          9. DUAL CAMPUS PRESENCE (Dhaka Farmgate HQ & Tokyo Liaison Desk)
         ========================================================================= */}
      <section id="campuses" className="py-16 sm:py-20 bg-[#070D1E] border-b border-indigo-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center space-y-1">
            <span className="text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
              GLOBAL HUBS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dhaka Headquarters &amp; Tokyo Liaison Desk
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Dhaka Campus Card */}
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 space-y-4 shadow-xl hover:border-slate-700/80 transition-all">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-red-500" />
                  <h3 className="text-base font-bold text-white">Dhaka Farmgate Campus (ダッカ本部校)</h3>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                  HEADQUARTERS
                </span>
              </div>

              <div className="text-xs text-slate-300 space-y-1.5">
                <p className="font-semibold text-white">
                  7th Floor, BTI Central Plaza, 95 Green Road, Farmgate, Dhaka 1215
                </p>
                <p className="text-slate-400 text-[11px]">
                  (Opposite to Government Science College, Farmgate intersection)
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
                <div className="bg-slate-950/60 backdrop-blur-sm p-2.5 rounded-xl border border-slate-800/80">
                  <div className="font-bold text-white">Audio Lab</div>
                  <div className="text-[10px] text-slate-400">Acoustic Drills</div>
                </div>
                <div className="bg-slate-950/60 backdrop-blur-sm p-2.5 rounded-xl border border-slate-800/80">
                  <div className="font-bold text-white">CBT Room</div>
                  <div className="text-[10px] text-slate-400">Nihomi Terminals</div>
                </div>
                <div className="bg-slate-950/60 backdrop-blur-sm p-2.5 rounded-xl border border-slate-800/80">
                  <div className="font-bold text-white">Mock Studio</div>
                  <div className="text-[10px] text-slate-400">Visa Interviews</div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">Hotline: 01764-395945</span>
                <button
                  onClick={() => setFastAdmissionOpen(true)}
                  className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
                >
                  <span>Book Campus Visit</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tokyo Liaison Card */}
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 space-y-4 shadow-xl hover:border-slate-700/80 transition-all">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">Tokyo Liaison Desk (東京連絡窓口)</h3>
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800">
                  JAPAN DESK
                </span>
              </div>

              <div className="text-xs text-slate-300 space-y-1.5">
                <p className="font-semibold text-white">
                  Shinjuku-ku, Tokyo 160-0023, Japan (東京都新宿区)
                </p>
                <p className="text-slate-400 text-[11px]">
                  Direct coordination desk for Japanese language academies &amp; supervising organizations.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
                <div className="bg-slate-950/60 backdrop-blur-sm p-2.5 rounded-xl border border-slate-800/80">
                  <div className="font-bold text-white">B2B Zoom</div>
                  <div className="text-[10px] text-slate-400">School Liaison</div>
                </div>
                <div className="bg-slate-950/60 backdrop-blur-sm p-2.5 rounded-xl border border-slate-800/80">
                  <div className="font-bold text-white">COE Dispatch</div>
                  <div className="text-[10px] text-slate-400">Immigration Check</div>
                </div>
                <div className="bg-slate-950/60 backdrop-blur-sm p-2.5 rounded-xl border border-slate-800/80">
                  <div className="font-bold text-white">Arrival Care</div>
                  <div className="text-[10px] text-slate-400">Airport Welcome</div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">Email: tokyo@dilsbd.com</span>
                <button
                  onClick={() => setPartnerModalOpen(true)}
                  className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
                >
                  <span>Connect Tokyo Desk</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          10. B2B PARTNERSHIP FLOW (4 Steps)
         ========================================================================= */}
      <section id="partners" className="py-16 bg-[#050A18] border-b border-indigo-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center space-y-1">
            <span className="text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
              {t.steps.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.steps.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {t.steps.items.map((s, i) => (
              <div key={i} className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 space-y-1.5 shadow-md hover:border-red-500/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all">
                <span className="text-xs font-mono font-bold text-red-400">STEP {s.step}</span>
                <div className="text-xs font-bold text-white">{s.title}</div>
                <div className="text-[11px] text-slate-400">{s.descJp}</div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setPartnerModalOpen(true)}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{currentLang === 'jp' ? '提携のお問い合わせフォーム' : 'Inquire for Partnership'}</span>
            </button>
          </div>

        </div>
      </section>


      {/* =========================================================================
          11. CORPORATE FOOTER (Tokyo & Dhaka Representation)
         ========================================================================= */}
      <footer className="bg-[#030712] border-t border-indigo-950 text-slate-400 text-xs py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="space-y-1">
            <div className="text-white font-bold text-sm">
              ダッカ国際語学学校 • Dhaka International Language School (DILS)
            </div>
            <div className="text-[11px] text-slate-400">
              Tokyo Desk: Shinjuku-ku, Tokyo 160-0023 | Dhaka: BTI Central Plaza, 95 Green Road, Farmgate
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <a href="mailto:tokyo@dilsbd.com" className="hover:text-red-400 transition-colors">
              tokyo@dilsbd.com
            </a>
            <span>•</span>
            <a href="https://wa.me/8801300634046" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
              WhatsApp: +880 1300-634046
            </a>
          </div>

        </div>
      </footer>


      {/* =========================================================================
          12. FLOATING 1-CLICK WHATSAPP BUTTON (Bottom-Right)
         ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/8801300634046?text=Hello%20Sensei%20Razzak,%20I%20am%20interested%20in%20DILS%20Japanese%20Language%20and%20Visa."
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-full shadow-2xl font-bold text-xs border border-emerald-400/40 transition-transform hover:scale-105"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>


      {/* =========================================================================
          13. FAST 2-CLICK ADMISSION SLIDE-OVER DRAWER
         ========================================================================= */}
      <AnimatePresence>
        {fastAdmissionOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-[#0A132C] border-l border-indigo-800 w-full max-w-md h-full flex flex-col justify-between p-6 shadow-2xl overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-indigo-900">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-red-500" />
                    <h3 className="text-base font-black text-white font-serif">
                      Quick Admission • ভর্তি আবেদন
                    </h3>
                  </div>
                  <button
                    onClick={() => setFastAdmissionOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {!admissionForm.submitted ? (
                  <form onSubmit={handleFastAdmissionSubmit} className="space-y-4 pt-4 text-xs">
                    {/* Course Selection */}
                    <div>
                      <label className="block text-slate-300 font-bold mb-1.5">
                        Select Course (কোর্স নির্বাচন করুন)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {t.programs.items.map((prog) => (
                          <button
                            type="button"
                            key={prog.id}
                            onClick={() => setSelectedCourseId(prog.id)}
                            className={`p-2.5 rounded-xl border text-left transition-all ${
                              selectedCourseId === prog.id
                                ? 'bg-red-600/20 border-red-500 text-white'
                                : 'bg-[#060B19] border-indigo-950 text-slate-300 hover:border-indigo-800'
                            }`}
                          >
                            <div className="font-bold text-[11px]">{prog.name}</div>
                            <div className="text-[10px] text-amber-400 font-mono mt-0.5">{prog.fee}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Batch Timing */}
                    <div>
                      <label className="block text-slate-300 font-bold mb-1.5">
                        Preferred Batch (ব্যাচ সময়)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Morning (10:00 AM)', 'Evening (06:00 PM)', 'Friday Only'].map((batch) => (
                          <button
                            type="button"
                            key={batch}
                            onClick={() => setSelectedBatchTime(batch)}
                            className={`p-2 rounded-lg border text-center text-[10px] font-bold ${
                              selectedBatchTime === batch
                                ? 'bg-indigo-600 text-white border-indigo-400'
                                : 'bg-[#060B19] text-slate-400 border-indigo-950'
                            }`}
                          >
                            {batch}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Student Full Name */}
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">
                        Student Full Name (আপনার পূর্ণ নাম) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tanvir Kabir"
                        value={admissionForm.fullName}
                        onChange={(e) => setAdmissionForm({ ...admissionForm, fullName: e.target.value })}
                        className="w-full bg-[#060B19] border border-indigo-900 rounded-lg px-3 py-2.5 text-white text-xs focus:outline-none focus:border-red-500"
                      />
                    </div>

                    {/* WhatsApp Phone */}
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">
                        WhatsApp / Contact Number (মোবাইল নম্বর) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="017XXXXXXXX"
                        value={admissionForm.phone}
                        onChange={(e) => setAdmissionForm({ ...admissionForm, phone: e.target.value })}
                        className="w-full bg-[#060B19] border border-indigo-900 rounded-lg px-3 py-2.5 text-white text-xs focus:outline-none focus:border-red-500"
                      />
                    </div>

                    {/* Campus Location Confirmation */}
                    <div className="p-3 bg-[#060B19] rounded-xl border border-indigo-950 text-slate-400 text-[11px] space-y-1">
                      <div className="font-bold text-slate-200">Campus: Farmgate, Dhaka</div>
                      <div>BTI Central Plaza (7th Floor), 95 Green Road.</div>
                      <div className="text-emerald-400 font-mono text-[10px]">
                        ✓ Unlimited 24/7 Nihomi AI Access Included
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-950/60 text-xs transition-all"
                    >
                      Confirm Enrollment (ভর্তি নিশ্চিত করুন)
                    </button>
                  </form>
                ) : (
                  <div className="py-12 text-center space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h4 className="text-lg font-black text-white font-serif">ভর্তি আবেদন গৃহীত হয়েছে!</h4>
                    <p className="text-xs text-slate-300">
                      ধন্যবাদ {admissionForm.fullName}। আমাদের অ্যাডমিশন কো-অর্ডিনেটর এবং রাজ্জাক স্যার শীঘ্রই আপনার নম্বরে যোগাযোগ করবেন।
                    </p>
                    <a
                      href={`https://wa.me/8801300634046?text=Hi%20Sensei%20Razzak,%20I%20just%20submitted%20my%20admission%20form%20for%20${selectedCourseId}%20at%20DILS.%20My%20name%20is%20${admissionForm.fullName}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp এ দ্রুত আপডেট নিন</span>
                    </a>
                  </div>
                )}
              </div>

              <div className="text-[10px] text-slate-500 text-center pt-4 border-t border-indigo-950">
                DILS Dhaka • Verified Japanese Language Institution
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* =========================================================================
          14. 30-SECOND NIHOMI QUICK-TEST POPUP (Gamified Live Practice)
         ========================================================================= */}
      <AnimatePresence>
        {quickTestOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0A132C] border border-indigo-800 rounded-2xl p-6 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setQuickTestOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {!testCompleted ? (
                <div className="space-y-4 text-xs">
                  {/* Test Header */}
                  <div className="flex items-center justify-between border-b border-indigo-900 pb-3">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span className="font-bold text-white text-sm">Nihomi 30s Quick Test</span>
                    </div>
                    <span className="font-mono text-xs text-red-400 font-bold">
                      Q {testCurrentQ + 1} / {testQuestions.length}
                    </span>
                  </div>

                  {/* Question Box */}
                  <div className="bg-[#060B19] border border-indigo-950 p-4 rounded-xl space-y-2 text-center">
                    <p className="text-sm font-bold text-white">
                      {testQuestions[testCurrentQ].qJp}
                    </p>
                    <p className="text-xs text-slate-400">
                      {testQuestions[testCurrentQ].qBn}
                    </p>
                    <button
                      onClick={() => playPronunciation(testQuestions[testCurrentQ].audio, 'ja-JP')}
                      className="inline-flex items-center gap-1 text-[11px] text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-600/30 hover:bg-amber-900/40"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Hear Japanese Audio</span>
                    </button>
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    {testQuestions[testCurrentQ].options.map((opt, oi) => {
                      const isChosen = selectedChoice === oi;
                      return (
                        <button
                          key={oi}
                          onClick={() => handleAnswerQuestion(oi)}
                          className={`w-full p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                            isChosen
                              ? opt.isCorrect
                                ? 'bg-emerald-950/80 border-emerald-500 text-white'
                                : 'bg-red-950/80 border-red-500 text-white'
                              : 'bg-[#0B1530] border-indigo-900/60 text-slate-200 hover:border-indigo-700'
                          }`}
                        >
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="py-4 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 font-black text-xl">
                    {Math.round((testScore / testQuestions.length) * 100)}%
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white font-serif">
                      Your Nihomi Readiness Score: {testScore}/{testQuestions.length}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      {testScore === 3
                        ? 'অসাধারণ! আপনি সরাসরি JLPT N5 অথবা N4 ব্যাচে ভর্তি হওয়ার জন্য সম্পূর্ণ প্রস্তুত।'
                        : 'ভালো চেষ্টা! DILS Farmgate ক্লাসরুমে মাত্র ৩ মাসেই আপনি ফুল কনফিডেন্স পাবেন।'}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setQuickTestOpen(false);
                        setFastAdmissionOpen(true);
                      }}
                      className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl"
                    >
                      Apply with Discount
                    </button>
                    <button
                      onClick={resetTest}
                      className="px-4 py-2.5 bg-indigo-950 text-slate-300 text-xs font-bold rounded-xl border border-indigo-800"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* =========================================================================
          15. B2B PARTNER INQUIRY MODAL (Fast & Concise)
         ========================================================================= */}
      <AnimatePresence>
        {partnerModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-[#0A132C] border border-indigo-800 rounded-2xl p-6 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setPartnerModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {!partnerForm.submitted ? (
                <form onSubmit={handlePartnerSubmit} className="space-y-3.5 text-xs text-left">
                  <div>
                    <h3 className="text-base font-black text-white font-serif">
                      {currentLang === 'jp' ? '日本の教育機関・企業様 提携相談' : 'Institutional Partner Inquiry'}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Connect directly with Md. Abdur Razzak and our Tokyo desk.
                    </p>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Organization / School Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 東京国際日本語学校"
                      value={partnerForm.orgName}
                      onChange={(e) => setPartnerForm({ ...partnerForm, orgName: e.target.value })}
                      className="w-full bg-[#060B19] border border-indigo-900 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Contact Person *</label>
                      <input
                        type="text"
                        required
                        placeholder="Name"
                        value={partnerForm.contactPerson}
                        onChange={(e) => setPartnerForm({ ...partnerForm, contactPerson: e.target.value })}
                        className="w-full bg-[#060B19] border border-indigo-900 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Official Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="email@school.jp"
                        value={partnerForm.email}
                        onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                        className="w-full bg-[#060B19] border border-indigo-900 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Requirements / Intake</label>
                    <textarea
                      rows={2}
                      placeholder="e.g., April/October intake requirement..."
                      value={partnerForm.notes}
                      onChange={(e) => setPartnerForm({ ...partnerForm, notes: e.target.value })}
                      className="w-full bg-[#060B19] border border-indigo-900 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg shadow-md"
                  >
                    {currentLang === 'jp' ? '提携相談を送信' : 'Submit Consultation Request'}
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Inquiry Received</h4>
                  <p className="text-xs text-slate-300">
                    Thank you. Sensei Razzak and Tokyo liaison will respond promptly.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* =========================================================================
          16. WEEKLY CLASS ROUTINE & TIMETABLE MODAL
         ========================================================================= */}
      <AnimatePresence>
        {scheduleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0A132C] border border-indigo-800 rounded-2xl p-6 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setScheduleModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4 text-xs">
                {/* Modal Header */}
                <div className="border-b border-indigo-900 pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-black text-white font-serif">
                      Class Timetable &amp; Routine • সাপ্তাহিক ক্লাস রুটিন
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    DILS Farmgate Campus • 7th Floor, BTI Central Plaza, 95 Green Road, Dhaka
                  </p>
                </div>

                {/* 3 Batches Cards */}
                <div className="space-y-2.5">
                  <div className="bg-[#060B19] border border-indigo-950 p-3.5 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">Morning Batch (সকালের ব্যাচ)</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        10:00 AM – 12:00 PM
                      </span>
                    </div>
                    <div className="text-[11px] text-amber-400 font-medium">Sunday, Tuesday, Thursday (রবি, মঙ্গল, বৃহস্পতি)</div>
                    <div className="text-[10px] text-slate-400">
                      Best suited for college &amp; university students aiming for the next upcoming JLPT/NAT intake.
                    </div>
                  </div>

                  <div className="bg-[#060B19] border border-indigo-950 p-3.5 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">Evening Executive Batch (সান্ধ্য ব্যাচ)</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        06:00 PM – 08:00 PM
                      </span>
                    </div>
                    <div className="text-[11px] text-amber-400 font-medium">Sunday, Tuesday, Thursday (রবি, মঙ্গল, বৃহস্পতি)</div>
                    <div className="text-[10px] text-slate-400">
                      Designed for IT engineers, graduates &amp; working professionals preparing for Japan work visas.
                    </div>
                  </div>

                  <div className="bg-[#060B19] border border-indigo-950 p-3.5 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">Weekend Super-Intensive (উইকেন্ড স্পেশাল)</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        09:00 AM – 01:00 PM (4h)
                      </span>
                    </div>
                    <div className="text-[11px] text-amber-400 font-medium">Friday &amp; Saturday (শুক্র ও শনিবার)</div>
                    <div className="text-[10px] text-slate-400">
                      High-velocity course for distant commuters with complete textbook, Nihomi drill &amp; mock exams.
                    </div>
                  </div>
                </div>

                {/* Additional Free Labs */}
                <div className="bg-indigo-950/30 border border-indigo-900/60 p-3 rounded-xl flex items-center justify-between text-[11px]">
                  <div>
                    <div className="font-bold text-slate-200">Acoustic Audio Shadowing Lab</div>
                    <div className="text-[10px] text-slate-400">Open 7 days (09:00 AM – 08:00 PM) with high-fidelity headphones</div>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">100% Free Access</span>
                </div>

                {/* Action buttons */}
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => {
                      setScheduleModalOpen(false);
                      setFastAdmissionOpen(true);
                    }}
                    className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Choose Batch &amp; Enroll</span>
                  </button>
                  <button
                    onClick={() => setScheduleModalOpen(false)}
                    className="px-4 py-2.5 bg-[#060B19] text-slate-300 font-bold text-xs rounded-xl border border-indigo-900"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          17. PWA INSTALL MODAL (iOS & Android Installation Guide)
         ========================================================================= */}
      <AnimatePresence>
        {showPwaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0A132C] border border-amber-600/40 rounded-2xl p-6 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setShowPwaModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-2 border-b border-indigo-900 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-bold text-white text-sm">
                    DILS
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">
                      {currentLang === 'jp' ? 'DILS公式アプリのインストール' : currentLang === 'bn' ? 'DILS মোবাইল অ্যাপ ইনস্টল করুন' : 'Install DILS Official App'}
                    </h3>
                    <p className="text-[10px] text-slate-400">PWA • Fast • Zero Storage Lag</p>
                  </div>
                </div>

                <div className="space-y-3 text-slate-300">
                  <div className="bg-[#060B19] p-3 rounded-xl border border-indigo-950 space-y-1.5">
                    <div className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Android (Chrome / Edge / Firefox)</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Tap the <strong>three vertical dots (⋮)</strong> at the top right of your browser, then select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                    </p>
                  </div>

                  <div className="bg-[#060B19] p-3 rounded-xl border border-indigo-950 space-y-1.5">
                    <div className="font-bold text-sky-400 flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5" />
                      <span>iOS (iPhone / iPad Safari)</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Tap the <strong>Share button (box with arrow ↑)</strong> at the bottom of Safari, scroll down, and tap <strong>"Add to Home Screen"</strong>.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setShowPwaModal(false)}
                    className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    Got It! • বুঝেছি
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default JapaneseCorporateLanding;
