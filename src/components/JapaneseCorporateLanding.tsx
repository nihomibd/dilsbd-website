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
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  Users, 
  FileCheck, 
  Brain, 
  BookOpen, 
  Clock, 
  ChevronRight, 
  Menu, 
  X, 
  Globe2, 
  MessageSquareText, 
  Target, 
  Compass, 
  Cpu, 
  Zap, 
  Check, 
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { Course, Trainer, LangMode } from '../types';

interface JapaneseCorporateLandingProps {
  courses?: Course[];
  trainers?: Trainer[];
  notices?: any[];
  lang?: LangMode;
  onOpenAdmission?: (courseId?: string) => void;
  onOpenValidator?: (certId?: string) => void;
  onSwitchToStudentPortal?: (courseId: string) => void;
}

export const JapaneseCorporateLanding: React.FC<JapaneseCorporateLandingProps> = ({
  courses = [],
  lang: initialLang = 'jp',
  onOpenAdmission,
  onOpenValidator,
  onSwitchToStudentPortal,
}) => {
  // Multilingual First: Default is Japanese ('jp')
  const [currentLang, setCurrentLang] = useState<LangMode>(initialLang || 'jp');
  
  // Real-time Dual Clocks
  const [dhakaTime, setDhakaTime] = useState<string>('');
  const [tokyoTime, setTokyoTime] = useState<string>('');
  
  // Navigation & UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState<boolean>(false);
  const [activeAITab, setActiveAITab] = useState<'infrastructure' | 'radar' | 'srs'>('infrastructure');
  
  // Partner Inquiry Form State
  const [partnerForm, setPartnerForm] = useState({
    orgName: '',
    orgType: 'language_school',
    contactPerson: '',
    email: '',
    phone: '',
    locationInJapan: 'Tokyo',
    notes: '',
    submitted: false
  });

  // Sync dual clocks every second
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setDhakaTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
      setTokyoTime(
        now.toLocaleTimeString('ja-JP', {
          timeZone: 'Asia/Tokyo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
      );
    };
    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update currentLang when prop changes
  useEffect(() => {
    if (initialLang) setCurrentLang(initialLang);
  }, [initialLang]);

  // Multilingual Dictionary
  const t = {
    top: {
      dhaka: currentLang === 'jp' ? 'ダッカ本部' : currentLang === 'bn' ? 'ঢাকা ক্যাম্পাস' : 'DHAKA HQ',
      tokyo: currentLang === 'jp' ? '東京窓口' : currentLang === 'bn' ? 'টোকিও অফিস' : 'TOKYO DESK',
      verifyBtn: currentLang === 'jp' ? '修了証明書照会' : currentLang === 'bn' ? 'সার্টিফিকেট যাচাই' : 'Verify Certificate',
      partnerLogin: currentLang === 'jp' ? '日本の提携校ポータル' : currentLang === 'bn' ? 'জাপান পার্টনার পোর্টাল' : 'Partner School Portal',
    },
    nav: {
      partners: currentLang === 'jp' ? '日本の提携校' : currentLang === 'bn' ? 'জাপানের পার্টনার' : 'Partners in Japan',
      curriculum: currentLang === 'jp' ? 'カリキュラム' : currentLang === 'bn' ? 'কারিকুলাম' : 'Curriculum',
      aiEcosystem: currentLang === 'jp' ? 'AIエコシステム' : currentLang === 'bn' ? 'এআই ইকোসিস্টেম' : 'AI Ecosystem',
      leadership: currentLang === 'jp' ? '主任講師紹介' : currentLang === 'bn' ? 'প্রধান শিক্ষক' : 'Leadership',
      services: currentLang === 'jp' ? '提供プログラム' : currentLang === 'bn' ? 'কোর্স ও সার্ভিস' : 'Services',
      about: currentLang === 'jp' ? '当校について' : currentLang === 'bn' ? 'আমাদের পরিচিতি' : 'About Us',
      partnerCta: currentLang === 'jp' ? '提携のお問い合わせ' : currentLang === 'bn' ? 'পার্টনারশিপ আবেদন' : 'Become a Partner',
      studentLms: currentLang === 'jp' ? '学生LMSログイン' : currentLang === 'bn' ? 'শিক্ষার্থী এলএমএস' : 'Student LMS',
    },
    hero: {
      tag: currentLang === 'jp' ? '日バ連携・次世代日本語教育機関' : currentLang === 'bn' ? 'জাপান-বাংলাদেশ নেক্সট-জেন ইনস্টিটিউট' : 'JAPAN-BANGLADESH NEXT-GEN INSTITUTE',
      titleJp: 'バングラデシュと日本を繋ぐ、次世代の日本語学校',
      subtitleEn: 'Bridging Bangladesh and Japan: The Next-Generation Japanese Language School',
      subtitleBn: 'বাংলাদেশ ও জাপানের মাঝে আস্থার সেতু: পরবর্তী প্রজন্মের জাপানিজ ভাষা ইনস্টিটিউট',
      desc: currentLang === 'jp'
        ? '厳格な生活規律とJLPT N1認定講師による対面指導に、24時間365日のAIパーソナライズド学習を融合。日本の教育機関・受入企業の皆様に、最も信頼される現地パートナー。'
        : currentLang === 'bn'
        ? 'জেএলপিটি এন১ সার্টিফাইড ফ্যাকাল্টির কঠোর নিয়মানুবর্তিতা এবং ২৪/৭ এআই লার্নিং এর সমন্বয়ে গড়া—জাপানের শিক্ষাপ্রতিষ্ঠান ও কর্পোরেশনের সর্বাধিক বিশ্বস্ত অংশীদার।'
        : 'Providing highly disciplined, JLPT N1-led physical classes combined with 24/7 AI-driven practice. The most reliable partner for Japanese institutions.',
      ctaPrimary: currentLang === 'jp' ? '提携校・受入機関のご相談' : currentLang === 'bn' ? 'পার্টনার স্কুল আবেদন' : 'Become a Partner School',
      ctaSecondary: currentLang === 'jp' ? '学生入学案内 (ファームゲート校)' : currentLang === 'bn' ? 'স্টুডেন্ট অ্যাডমিশন' : 'Student Admissions',
      stats: [
        {
          val: '100%',
          labelJp: '法務省・出入国在留管理庁 法令遵守',
          labelEn: 'Immigration Legal Compliance',
          labelBn: '১০০% ইমিগ্রেশন আইন ও সিওই সম্মতি'
        },
        {
          val: '1,500+',
          labelJp: '日本国内進学・特定技能 渡日実績',
          labelEn: 'Dispatched Alumni in Japan',
          labelBn: '১,৫০০+ শিক্ষার্থী জাপানে সফলভাবে কর্মরত ও অধ্যয়নরত'
        },
        {
          val: 'JLPT N1',
          labelJp: '日本語科 主任専任講師による直轄監修',
          labelEn: 'N1 Master Instructor Led',
          labelBn: 'জেএলপিটি এন১ ফ্যাকাল্টির সরাসরি তত্ত্বাবধান'
        },
        {
          val: '24/7 AI',
          labelJp: 'Nihomi.com 忘却曲線克服トラッキング',
          labelEn: 'Continuous AI Practice Engine',
          labelBn: 'নিহোমি এআই রিয়েল-টাইম মেমোরি ট্র্যাকিং'
        }
      ]
    },
    leadership: {
      eyebrow: currentLang === 'jp' ? '指導陣紹介 / LEADERSHIP & TRUST' : currentLang === 'bn' ? 'নির্ভরযোগ্য অ্যাকাডেমিক নেতৃত্ব' : 'ACADEMIC LEADERSHIP & TRUST',
      title: currentLang === 'jp' ? '卓越した実績と信頼の指導体制' : currentLang === 'bn' ? 'অভিজ্ঞতা ও আন্তর্জাতিক মানের জাপানিজ পাঠদান' : 'Guided by Excellence & Experience',
      name: currentLang === 'jp' ? 'Md. Abdur Razzak (アブドゥル・ラザック)' : currentLang === 'bn' ? 'মোহাম্মদ আব্দুর রাজ্জাক (JLPT N1)' : 'Md. Abdur Razzak',
      role: currentLang === 'jp' ? '日本語科 主任教授 / Managing Director, DILS' : currentLang === 'bn' ? 'হেড অব জাপানিজ ডিপার্টমেন্ট ও ম্যানেজিং ডিরেক্টর, ডিআইএলএস' : 'Head of Japanese Department | Managing Director, DILS',
      quote: currentLang === 'jp'
        ? '「語学の習得にとどまらず、日本の企業文化や時間厳守、挨拶といった礼儀作法（報連相・お辞儀）を徹底教育。日本社会で即戦力として心から愛される誠実な若者を育て、両国の強固な架け橋となります。」'
        : currentLang === 'bn'
        ? '“শুধুমাত্র ভাষা শিক্ষাই নয়; জাপানি কর্মসংস্কৃতি, সময়ানুবর্তিতা ও ব্যবসায়িক শিষ্টাচার (ওজিগি ও হোরেনসো) আমাদের মূল নীতি। আমরা নিষ্ঠাবান মানবসম্পদ গড়ে তুলছি যারা জাপানের মাটিতে আস্থার সাথে অবদান রাখবে।”'
        : '“Beyond mere language acquisition, we instill Japanese corporate discipline, punctuality, and authentic business etiquette (Ojigi). We nurture sincere Bangladeshi youth into trusted global professionals ready to contribute to Japanese society.”',
      pillars: [
        {
          titleJp: '12年以上の査証・教育指導実績',
          titleEn: '12+ Years Specialized Expertise',
          titleBn: '১২+ বছরের বিশেষায়িত জাপান ভিসা ও একাডেমি অভিজ্ঞতা',
          descJp: '東京・大阪・京都をはじめ日本全国の日本語学校・専門学校・大学と連携し、1,500名以上の在留資格認定証明書 (COE) 取得を指導。',
          descEn: 'Collaborated with prestigious institutions across Tokyo, Osaka, and Kyoto, mentoring 1,500+ successful COE holders.',
          descBn: 'টোকিও, ওসাকা, কিয়োটোর শীর্ষ স্কুলগুলোর সাথে সরাসরি পার্টনারশিপে ১,৫০০+ সফল শিক্ষার্থীর সিওই অর্জন।'
        },
        {
          titleJp: '厳正な書類審査・不法就労防止',
          titleEn: 'Zero-Document Forgery Guarantee',
          titleBn: 'শতভাগ স্বচ্ছ ডকুমেন্টেশন ও জিরো রিজেকশন নীতি',
          descJp: '経費支弁書・就学理由書の徹底した個別精査を実施。虚偽申告を徹底排除し、日本の入管審査における最高水準の信頼を保持。',
          descEn: 'Personal audit of every student financial profile and Statement of Purpose to maintain pristine immigration integrity.',
          descBn: 'প্রতিটি শিক্ষার্থীর স্টেটমেন্ট অব পারপাস ও ব্যাংক ফাইল রাজ্জাক স্যারের সরাসরি অডিটের মাধ্যমে অনুমোদিত হয়।'
        },
        {
          titleJp: '毎日の対面・規律・礼儀作法指導',
          titleEn: 'Daily Strict Classroom Discipline',
          titleBn: 'দৈনিক সকালের অভিবাদন, ওজিগি ও জাপানি নিয়মানুবর্তিতা',
          descJp: '無断遅刻欠席の厳禁、毎朝の「お辞儀 (15°/30°/45°)」実習、敬語・丁寧語の徹底指導により、渡日前から日本社会への適応力を育成。',
          descEn: 'Strict attendance enforcement, morning bowing drills (Ojigi), and corporate keigo training ensure immediate adaptability.',
          descBn: 'ক্লাসে সময়মতো উপস্থিতি, প্রতিদিনের ওজিগি প্র্যাকটিস ও ব্যবসায়িক জাপানি শিষ্টাচার শিক্ষার্থীদের প্রথম থেকেই প্রস্তুত করে।'
        }
      ]
    },
    ecosystem: {
      badge: currentLang === 'jp' ? 'ハイブリッド教育の革新' : currentLang === 'bn' ? 'হাইব্রিড শিক্ষার যুগান্তকারী রূপরেখা' : 'HYBRID EDUCATION INNOVATION',
      title: currentLang === 'jp' ? 'DILS × Nihomi.com AIパワード・エコシステム' : currentLang === 'bn' ? 'ডিআইএলএস ফিজিক্যাল লার্নিং + নিহোমি ২৪/৭ এআই' : 'Our AI-Powered Ecosystem (DILS + Nihomi.com)',
      desc: currentLang === 'jp'
        ? 'ファームゲート校での徹底した対面指導・生活規律と、Nihomi.comの最先端AI記憶定着システムがシームレスに同期。学生の忘却を防ぎ、合格率と定着率をデータで証明します。'
        : currentLang === 'bn'
        ? 'ফার্মগেট ক্যাম্পাসের সরাসরি ক্লাসরুম ডিসিপ্লিন এবং Nihomi.com এর এআই ভিত্তিক স্মৃতি-ধরে-রাখার প্রযুক্তির অনবদ্য সমন্বয়। আমরা শুধু পড়াই না, ডেটার সাহায্যে প্রতিটি শিক্ষার্থীর ফলাফল নিশ্চিত করি।'
        : 'Physical classroom discipline at DILS Farmgate campus seamlessly synchronizes with continuous AI learning on Nihomi.com. We don’t just teach; we track, predict, and ensure student success using data.',
      tabs: {
        infra: currentLang === 'jp' ? '教育インフラ構成' : currentLang === 'bn' ? 'ইনফ্রাস্ট্রাকচার ম্যাপ' : 'System Architecture',
        radar: currentLang === 'jp' ? 'リアルタイム弱点分析' : currentLang === 'bn' ? 'মিস্টেক রেডার' : 'Weakness Radar',
        srs: currentLang === 'jp' ? '忘却曲線克服 (SRS)' : currentLang === 'bn' ? 'এসআরএস ভোকাব' : 'SRS Retention Curve'
      }
    },
    services: {
      badge: currentLang === 'jp' ? '提供プログラム & B2Bソリューション' : currentLang === 'bn' ? 'আমাদের বিশেষায়িত প্রোগ্রামসমূহ' : 'SERVICES & EXPERTISE',
      title: currentLang === 'jp' ? '日本の教育機関・受入機関向け 4大重点プログラム' : currentLang === 'bn' ? 'জাপানের শীর্ষ স্ট্যান্ডার্ডে ৪টি বিশেষায়িত কারিকুলাম' : 'Our Specialized Japanese Programs (MUJI Standard)',
      desc: currentLang === 'jp'
        ? '日本の出入国在留管理法および企業実務に完全準拠した、無駄のない洗練された指導体系。'
        : currentLang === 'bn'
        ? 'জাপান সরকারের নিয়মাবলী এবং প্রাতিষ্ঠানিক স্ট্যান্ডার্ডের সাথে শতভাগ সামঞ্জস্য রেখে তৈরি প্রিমিয়াম কারিকুলাম।'
        : 'Carefully curated minimalist curricula compliant with Japanese Immigration and corporate workplace standards.',
      items: [
        {
          num: '01',
          titleJp: 'JLPT & NAT-TEST 徹底合格対策',
          titleEn: 'JLPT & NAT-TEST Preparation',
          titleBn: 'জেএলপিটি ও ন্যাট-টেস্ট স্পেশাল প্রিপারেশন',
          subtitleJp: 'N5からN2まで、過去問分析と聴解集中特訓',
          subtitleEn: 'Comprehensive N5 to N2 Mastery with Acoustic Listening Labs',
          subtitleBn: 'এন৫ থেকে এন২ পর্যন্ত রিয়েল প্রশ্নপত্র সমাধান ও লিসেনিং ড্রিল',
          features: [
            currentLang === 'jp' ? '最新出題傾向に準拠した模擬試験を毎週実施' : currentLang === 'bn' ? 'প্রতি সপ্তাহে ফুল-লেংথ টাইমড মক টেস্ট' : 'Weekly full-length timed mock examinations',
            currentLang === 'jp' ? 'ネイティブ音源による音響スタジオ聴解トレーニング' : currentLang === 'bn' ? 'স্টুডিও কোয়ালিটি জাপানিজ অডিও ল্যাব প্র্যাকটিস' : 'Studio acoustic listening comprehension drills',
            currentLang === 'jp' ? '漢字2,000字・語彙10,000語の書き取り・筆順指導' : currentLang === 'bn' ? 'কাঞ্জি স্ট্রোক-অর্ডার ও সঠিক অর্থ মুখস্থকরণ' : 'Rigorous Kanji stroke-order and vocabulary retention'
          ]
        },
        {
          num: '02',
          titleJp: '特定技能 (SSW) 専門育成プログラム',
          titleEn: 'Specified Skilled Worker (SSW) Training',
          titleBn: 'স্পেসিফাইড স্কিল্ড ওয়ার্কার (SSW) ট্রেনিং',
          subtitleJp: '介護・外食・ビルクリーニング・製造業向け特化教育',
          subtitleEn: 'Caregiving, Food Service, and Building Maintenance Readiness',
          subtitleBn: 'কেয়ারগিভার, ফুড সার্ভিস এবং টেকনিক্যাল ট্রেড প্রস্তুতি',
          features: [
            currentLang === 'jp' ? '各業界専門用語および技能評価試験の直前対策' : currentLang === 'bn' ? 'ইন্ডাস্ট্রি-স্পেসিফিক জাপানিজ শব্দভাণ্ডার' : 'Industry-specific technical vocabulary training',
            currentLang === 'jp' ? '日本の職場安全基準・5S活動（整理・整頓・清掃・清潔・躾）の体得' : currentLang === 'bn' ? 'জাপানিজ ৫-এস (5S) ওয়ার্কপ্লেস স্ট্যান্ডার্ড শিক্ষা' : '5S Japanese workplace hygiene & safety doctrine',
            currentLang === 'jp' ? '登録支援機関・監理団体との直接オンライン面接支援' : currentLang === 'bn' ? 'জাপানি কোম্পানির সাথে সরাসরি অনলাইন ইন্টারভিউ সাপোর্ট' : 'Direct online interview coordination with Japanese firms'
          ]
        },
        {
          num: '03',
          titleJp: '在留資格認定証明書 (COE) 完全法令遵守',
          titleEn: 'COE & Visa Processing (100% Legal Compliance)',
          titleBn: 'সিওই ও ভিসা প্রসেসিং (১০০% আইনি স্বচ্ছতা)',
          subtitleJp: '書類偽造を一切排除した最高水準の適正申請',
          subtitleEn: 'Zero-Document Forgery Guarantee & Ministry Audit Standards',
          subtitleBn: 'কোনো ভুয়া ডকুমেন্ট ছাড়া ১০০% বৈধ কাগজপত্র প্রক্রিয়াকরণ',
          features: [
            currentLang === 'jp' ? '日本語科主任講師による経費支弁書・就学理由書の全件検閲' : currentLang === 'bn' ? 'রাজ্জাক স্যারের তত্ত্বাবধানে এসওপি ফাইল নিরীক্ষণ' : 'Rigorous 1-on-1 vetting of student sponsor profiles',
            currentLang === 'jp' ? '日本大使館面接および入管電話確認の模擬質疑応答訓練' : currentLang === 'bn' ? 'এম্বাসি ইন্টারভিউ ও ভেরিফিকেশন কল প্র্যাকটিস' : 'Embassy interview and immigration phone-call drills',
            currentLang === 'jp' ? '提携校へ透明性の高いデジタル書類共有システム' : currentLang === 'bn' ? 'জাপান পার্টনারদের জন্য নিরাপদ ক্লাউড ডকুমেন্ট অ্যাক্সেস' : 'Encrypted cloud document dispatch to Japanese schools'
          ]
        },
        {
          num: '04',
          titleJp: '日本ビジネスマナー & お辞儀・報連相教育',
          titleEn: 'Business Etiquette & Ojigi (Bowing) Training',
          titleBn: 'জাপানিজ বিজনেস এটিকেট ও ওজিগি (নমস্কার) শিক্ষা',
          subtitleJp: '日本社会に即座に溶け込む礼儀正しい人格形成',
          subtitleEn: 'Cultural Adaptation, Respect & Corporate Communication',
          subtitleBn: 'জাপানি কর্পোরেট কালচার, শ্রদ্ধা ও আদব-কায়দা প্রশিক্ষণ',
          features: [
            currentLang === 'jp' ? '会釈(15°)・敬礼(30°)・最敬礼(45°)の角度測定訓練' : currentLang === 'bn' ? '১৫°, ৩০° ও ৪৫° কোণে নিখুঁত ওজিগি ড্রিল' : 'Precise 15°, 30°, and 45° bowing posture drills',
            currentLang === 'jp' ? '「報告・連絡・相談」(報連相) の実務シミュレーション' : currentLang === 'bn' ? 'হোরেনসো (রিপোর্ট-যোগাযোগ-পরামর্শ) রিয়েল প্র্যাকটিস' : 'Hands-on Ho-Ren-So daily business reporting drills',
            currentLang === 'jp' ? '日本式のゴミ分別・時間厳守・共同生活ルール指導' : currentLang === 'bn' ? 'জাপানের বর্জ্য ব্যবস্থাপনা ও সার্বক্ষণিক সময়ানুবর্তিতা' : 'Japanese domestic etiquette: recycling & absolute punctuality'
          ]
        }
      ]
    },
    partnersSection: {
      badge: currentLang === 'jp' ? '提携ネットワーク' : currentLang === 'bn' ? 'পার্টনারশিপ প্ল্যাটফর্ম' : 'PARTNERSHIP NETWORK',
      title: currentLang === 'jp' ? '日本の教育機関・監理団体の皆様へ' : currentLang === 'bn' ? 'জাপানিজ ল্যাঙ্গুয়েজ স্কুল পার্টনারদের জন্য' : 'To Japanese Language Schools & Sponsoring Institutions',
      desc: currentLang === 'jp'
        ? 'DILSダッカは、優秀で誠実、かつ日本のマナーを身につけたバングラデシュ人材を継続的にご紹介する現地直轄アカデミーです。'
        : currentLang === 'bn'
        ? 'আমরা জাপানের যেকোনো প্রতিষ্ঠানের জন্য দায়িত্বশীল, সুশৃঙ্খল ও জাপানি কালচারে অভ্যস্ত শিক্ষার্থীদের সরাসরি সমন্বয় করি।'
        : 'DILS Dhaka is your trusted, on-the-ground institution producing disciplined, culturally trained students tailored for your intake.',
      steps: [
        {
          step: 'STEP 01',
          titleJp: 'オンライン個別面談',
          titleEn: 'Institutional Video Conference',
          titleBn: 'অনলাইন পার্টনারশিপ মিটিং',
          descJp: '日本の貴校担当者様とZoom等でご要望（定員、求める人材像、学費条件）を協議。'
        },
        {
          step: 'STEP 02',
          titleJp: '事前スクリーニング・推薦',
          titleEn: 'Rigorous Candidate Screening',
          titleBn: 'যোগ্য শিক্ষার্থী বাছাই ও ইন্টারভিউ',
          descJp: '成績・出席率・経費支弁能力の審査をクリアした厳選候補者を推薦。'
        },
        {
          step: 'STEP 03',
          titleJp: 'オンライン面接・採用内定',
          titleEn: 'Live Student Online Interview',
          titleBn: 'জাপানিজ টিচারদের সরাসরি ইন্টারভিউ',
          descJp: '貴校の先生方と学生の直接面接を実施。合否判定と学習課題の設定。'
        },
        {
          step: 'STEP 04',
          titleJp: '渡日前AI強化学習 & 訪日',
          titleEn: 'Pre-Departure AI Sprint & Dispatch',
          titleBn: 'নিহোমি এআই প্র্যাকটিস ও সফলভাবে জাপান গমন',
          descJp: 'COE交付後もNihomi.comで渡日直前まで学習を継続。空港到着時から即適応。'
        }
      ]
    },
    footer: {
      title: currentLang === 'jp' ? 'ダッカ国際語学学校 (DILS)' : currentLang === 'bn' ? 'ঢাকা ইন্টারন্যাশনাল ল্যাঙ্গুয়েজ স্কুল (ডিআইএলএস)' : 'Dhaka International Language School (DILS)',
      sub: currentLang === 'jp' ? 'バングラデシュ国ダッカ市認定・日本語教育および渡日支援機関' : currentLang === 'bn' ? 'জাপানিজ ল্যাঙ্গুয়েজ লার্নিং অ্যান্ড জাপান ভিসা প্রিপারেশন সেন্টার' : 'Japanese Language Education & Japan Visa Preparation Center',
      dhakaOffice: currentLang === 'jp' ? '【ダッカ本部校】' : currentLang === 'bn' ? '【ফার্মগেট মেইন ক্যাম্পাস】' : '【Dhaka Headquarters】',
      dhakaAddress: '7th Floor, BTI Central Plaza, 95 Green Road, Farmgate, Dhaka 1215, Bangladesh',
      tokyoOffice: currentLang === 'jp' ? '【東京連絡窓口】' : currentLang === 'bn' ? '【টোকিও রিপ্রেজেন্টেটিভ ডেস্ক】' : '【Tokyo Liaison Desk】',
      tokyoAddress: 'Shinjuku-ku, Tokyo 160-0023, Japan (東京都新宿区西新宿)',
      trustBadges: [
        currentLang === 'jp' ? '法務省 出入国在留管理庁 基準適合校' : currentLang === 'bn' ? 'জাপান ইমিগ্রেশন কমপ্লায়েন্ট স্ট্যান্ডার্ড' : 'Japan Immigration Compliant Standard',
        currentLang === 'jp' ? 'JLPT・NAT-TEST 公式対策認定校' : currentLang === 'bn' ? 'জেএলপিটি ও ন্যাট-টেস্ট রেজিস্টার্ড কোচিং' : 'Registered JLPT / NAT-TEST Center',
        currentLang === 'jp' ? '100% 真正証明書発行・QR照会' : currentLang === 'bn' ? '১০০% ভেরিফায়েবল কিউআর সার্টিফিকেট' : '100% Cryptographic QR Verifiable Credentials'
      ],
      copyright: '© 2026 Dhaka International Language School (DILS). All Rights Reserved. Powered by Nihomi.com AI Engine.'
    }
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerForm(prev => ({ ...prev, submitted: true }));
    setTimeout(() => {
      setPartnerModalOpen(false);
      setPartnerForm({
        orgName: '',
        orgType: 'language_school',
        contactPerson: '',
        email: '',
        phone: '',
        locationInJapan: 'Tokyo',
        notes: '',
        submitted: false
      });
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 font-sans selection:bg-red-600 selection:text-white relative overflow-x-hidden antialiased">
      
      {/* =========================================================================
          1. GLOBAL TOP UTILITY BAR (Live Dual Clocks, Trilingual Switcher, Partner Login)
         ========================================================================= */}
      <div className="bg-[#050915] border-b border-indigo-950/80 px-4 sm:px-8 py-2 text-xs text-slate-300 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Dual Clocks (Tokyo & Dhaka) */}
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-4">
            
            {/* Tokyo Live Clock */}
            <div className="inline-flex items-center gap-1.5 bg-indigo-950/50 border border-red-500/30 px-3 py-1 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="font-semibold text-slate-200 tracking-wider">
                {t.top.tokyo} (JST):
              </span>
              <span className="font-mono text-red-400 font-bold tracking-tight">
                {tokyoTime || '09:00:00'}
              </span>
            </div>

            {/* Dhaka Live Clock */}
            <div className="inline-flex items-center gap-1.5 bg-indigo-950/50 border border-emerald-500/30 px-3 py-1 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-slate-200 tracking-wider">
                {t.top.dhaka} (BST):
              </span>
              <span className="font-mono text-emerald-400 font-bold tracking-tight">
                {dhakaTime || '06:00:00 AM'}
              </span>
            </div>

            <span className="hidden xl:inline text-slate-400 text-[11px] font-medium pl-2 border-l border-slate-800">
              Farmgate Campus: 7th Floor, BTI Central Plaza, 95 Green Road, Dhaka
            </span>
          </div>

          {/* Right Actions: Certificate Verification, Partner Portal, Trilingual Switcher */}
          <div className="flex items-center gap-3 ml-auto">
            
            {/* Quick Certificate Verify Button */}
            <button
              onClick={() => onOpenValidator && onOpenValidator('DILS-CERT-2026-0048')}
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 hover:text-amber-200 bg-amber-950/40 border border-amber-800/60 px-2.5 py-1 rounded-md transition-all hover:bg-amber-900/40"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.top.verifyBtn}</span>
            </button>

            {/* Partner Portal Shortcut */}
            <button
              onClick={() => setPartnerModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-indigo-900/60 hover:bg-indigo-800/80 border border-indigo-700/60 px-2.5 py-1 rounded-md transition-all shadow-sm"
            >
              <Building2 className="w-3.5 h-3.5 text-red-400" />
              <span>{t.top.partnerLogin}</span>
            </button>

            {/* PROMINENT MULTILINGUAL SWITCHER (日本語 | English | বাংলা) */}
            <div className="flex items-center bg-[#0B142A] border border-indigo-900/80 rounded-lg p-0.5 shadow-inner">
              <button
                onClick={() => setCurrentLang('jp')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  currentLang === 'jp'
                    ? 'bg-red-600 text-white shadow-md shadow-red-950/60'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
                title="日本語 (Japanese)"
              >
                日本語
              </button>

              <button
                onClick={() => setCurrentLang('en')}
                className={`px-2 py-1 rounded-md text-xs font-semibold transition-all ${
                  currentLang === 'en'
                    ? 'bg-red-600 text-white shadow-md shadow-red-950/60'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
                title="English"
              >
                EN
              </button>

              <button
                onClick={() => setCurrentLang('bn')}
                className={`px-2 py-1 rounded-md text-xs font-semibold transition-all ${
                  currentLang === 'bn'
                    ? 'bg-red-600 text-white shadow-md shadow-red-950/60'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
                title="বাংলা (Bangla)"
              >
                বাংলা
              </button>
            </div>

          </div>

        </div>
      </div>


      {/* =========================================================================
          2. MAIN CORPORATE NAVIGATION BAR (Apple / MUJI Minimalist Aesthetic)
         ========================================================================= */}
      <nav className="sticky top-0 z-40 bg-[#070D1E]/95 backdrop-blur-xl border-b border-indigo-950/60 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-6">
          
          {/* Logo & Institute Brand */}
          <a href="#" className="flex items-center gap-3.5 group select-none">
            {/* Minimalist Japanese Crest Logo */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 via-red-700 to-indigo-950 flex items-center justify-center shadow-lg shadow-red-950/40 border border-red-500/40 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl tracking-tighter font-serif">DILS</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-red-400 transition-colors">
                  DILS Dhaka
                </span>
                <span className="bg-red-950/90 text-red-400 border border-red-800/80 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold tracking-wide">
                  JAPAN 100%
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                ダッカ国際語学学校 • Dhaka International Language School
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#partners" className="hover:text-white hover:text-red-400 transition-colors py-1">
              {t.nav.partners}
            </a>
            <a href="#curriculum" className="hover:text-white hover:text-red-400 transition-colors py-1">
              {t.nav.curriculum}
            </a>
            <a href="#ecosystem" className="hover:text-white hover:text-red-400 transition-colors py-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.nav.aiEcosystem}</span>
            </a>
            <a href="#leadership" className="hover:text-white hover:text-red-400 transition-colors py-1 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-red-400" />
              <span>{t.nav.leadership}</span>
            </a>
            <a href="#services" className="hover:text-white hover:text-red-400 transition-colors py-1">
              {t.nav.services}
            </a>
            <a href="#about-us" className="hover:text-white hover:text-red-400 transition-colors py-1">
              {t.nav.about}
            </a>
          </div>

          {/* Nav Right CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setPartnerModalOpen(true)}
              className="px-4 py-2.5 text-xs font-bold text-slate-100 bg-[#0E1B38] hover:bg-[#14264E] border border-indigo-700/60 hover:border-red-500/60 rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              <Building2 className="w-3.5 h-3.5 text-red-400" />
              <span>{t.nav.partnerCta}</span>
            </button>

            <button
              onClick={() => onSwitchToStudentPortal && onSwitchToStudentPortal('c-jp-n5')}
              className="px-5 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg shadow-red-950/60 transition-transform active:scale-95 flex items-center gap-2"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.nav.studentLms}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-indigo-950/60 border border-indigo-800 text-slate-300 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#060B19]/98 border-b border-indigo-950 px-6 py-6 space-y-4 backdrop-blur-2xl">
            <div className="flex flex-col space-y-3 text-sm font-medium">
              <a 
                href="#partners" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-red-400 py-1.5"
              >
                {t.nav.partners}
              </a>
              <a 
                href="#curriculum" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-red-400 py-1.5"
              >
                {t.nav.curriculum}
              </a>
              <a 
                href="#ecosystem" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-red-400 py-1.5 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{t.nav.aiEcosystem}</span>
              </a>
              <a 
                href="#leadership" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-red-400 py-1.5 flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-red-400" />
                <span>{t.nav.leadership}</span>
              </a>
              <a 
                href="#services" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-red-400 py-1.5"
              >
                {t.nav.services}
              </a>
              <a 
                href="#about-us" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-red-400 py-1.5"
              >
                {t.nav.about}
              </a>
            </div>

            <div className="pt-4 border-t border-indigo-950/80 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setPartnerModalOpen(true);
                }}
                className="w-full py-3 bg-[#0E1B38] text-slate-100 font-bold text-xs rounded-xl border border-indigo-700/60 flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Building2 className="w-4 h-4 text-red-400" />
                <span>{t.nav.partnerCta}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSwitchToStudentPortal && onSwitchToStudentPortal('c-jp-n5');
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/60 flex items-center justify-center gap-2 min-h-[44px]"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{t.nav.studentLms}</span>
              </button>
            </div>
          </div>
        )}
      </nav>


      {/* =========================================================================
          3. HERO SECTION (The B2B Trust Hook & Futuristic Cultural Backdrop)
         ========================================================================= */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
        
        {/* Futuristic Cultural Background: Subtle Torii Gate & Mount Fuji Sunrise silhouette with AI digital grid lines */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          
          {/* Glowing Red Sun & Ambient Nebula */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] sm:w-[800px] sm:h-[450px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute top-40 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none"></div>

          {/* Cyber Digital Mesh Grid */}
          <div 
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
              backgroundSize: '48px 48px'
            }}
          ></div>

          {/* Subtle Silhouette of Mount Fuji & Torii Gate (SVG Canvas) */}
          <svg 
            className="absolute bottom-0 left-0 right-0 w-full h-72 sm:h-96 text-[#0A132C]/60 opacity-70"
            viewBox="0 0 1440 320" 
            fill="currentColor"
            preserveAspectRatio="none"
          >
            {/* Mountain Slope */}
            <path d="M0,320L360,210L680,80L760,80L1080,220L1440,320L1440,320L0,320Z"></path>
          </svg>

          {/* Stylized Torii Silhouette Overlay */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-red-500/10 font-serif text-[180px] sm:text-[260px] font-black leading-none opacity-40">
            ⛩️
          </div>

          {/* Japanese Calligraphy Watermark (誠: Sincerity / 信: Trust) */}
          <div className="absolute top-20 right-6 sm:right-16 text-slate-800/20 font-serif text-8xl sm:text-9xl font-black select-none">
            信誠
          </div>
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">
          
          <div className="max-w-4xl space-y-6">
            
            {/* Japanese Institution Trust Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/70 border border-red-500/40 text-red-400 text-xs font-mono font-bold tracking-wider uppercase shadow-inner"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.hero.tag}</span>
            </motion.div>

            {/* B2B Primary Headline: Japanese first with English & Bangla Sub-headlines */}
            <div className="space-y-3">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.2] font-serif"
              >
                {t.hero.titleJp}
              </motion.h1>

              <div className="space-y-1">
                <p className="text-base sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">
                  {t.hero.subtitleEn}
                </p>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  {t.hero.subtitleBn}
                </p>
              </div>
            </div>

            {/* Sub-headline Paragraph */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl"
            >
              {t.hero.desc}
            </motion.p>

            {/* Action Buttons (CTAs) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {/* Primary CTA: Become a Partner School */}
              <button
                onClick={() => setPartnerModalOpen(true)}
                className="min-h-[48px] px-8 py-3.5 bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-sm rounded-xl shadow-xl shadow-red-950/60 transition-all duration-300 active:scale-95 flex items-center gap-2.5"
              >
                <Building2 className="w-4 h-4 text-white" />
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA: Student Admissions */}
              <button
                onClick={() => onOpenAdmission && onOpenAdmission()}
                className="min-h-[48px] px-6 py-3.5 bg-[#0E1B38]/90 hover:bg-[#152750] text-slate-100 font-bold text-sm rounded-xl border border-indigo-700/60 hover:border-red-500/60 transition-all duration-200 flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-red-400" />
                <span>{t.hero.ctaSecondary}</span>
              </button>
            </motion.div>

          </div>

          {/* 4 Trust Metric Cards Grid (Apple-style clean frosted containers) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-4">
            {t.hero.stats.map((stat, idx) => (
              <div 
                key={idx}
                className="bg-[#0B1530]/60 backdrop-blur-md border border-indigo-900/50 hover:border-red-500/40 rounded-2xl p-5 shadow-lg transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="text-2xl sm:text-3xl font-black text-white font-mono group-hover:text-red-400 transition-colors flex items-center gap-2">
                  <span>{stat.val}</span>
                  {idx === 0 && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
                  {idx === 1 && <Users className="w-5 h-5 text-amber-400" />}
                  {idx === 2 && <Award className="w-5 h-5 text-red-400" />}
                  {idx === 3 && <Brain className="w-5 h-5 text-indigo-400" />}
                </div>
                <div className="mt-2 space-y-0.5">
                  <div className="text-xs font-bold text-slate-200">
                    {currentLang === 'jp' ? stat.labelJp : currentLang === 'bn' ? stat.labelBn : stat.labelEn}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {currentLang === 'jp' ? stat.labelEn : stat.labelJp}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          4. LEADERSHIP & TRUST (Razzak Sir's Japanese Faculty Section)
         ========================================================================= */}
      <section id="leadership" className="py-20 bg-[#050A18] border-t border-b border-indigo-950 relative overflow-hidden">
        
        {/* Subtle Watermark */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-900/30 font-serif font-black text-[220px] pointer-events-none select-none">
          師
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">
          
          {/* Section Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/80 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.leadership.eyebrow}</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {t.leadership.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-400">
              Head of Japanese Department &amp; Managing Director • 12+ Years Direct Japan Specialization
            </p>
          </div>

          {/* Highly Respectful Profile Card */}
          <div className="bg-[#0B1530]/80 backdrop-blur-xl border border-indigo-900/70 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group hover:border-red-500/40 transition-all duration-300">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Portrait & Official Japanese Seal (4 cols) */}
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
                
                <div className="relative">
                  {/* Outer Glowing Ring */}
                  <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 p-1 shadow-[0_0_40px_rgba(220,38,38,0.3)]">
                    <div className="w-full h-full rounded-[22px] bg-[#070D1E] flex flex-col items-center justify-center relative overflow-hidden border border-indigo-900">
                      
                      {/* Stylized Executive Portrait Crest */}
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-red-700 via-rose-800 to-indigo-950 text-white font-black text-3xl sm:text-4xl flex items-center justify-center shadow-lg border border-red-500/30">
                        AR
                      </div>
                      
                      <div className="mt-2 text-center">
                        <span className="text-xs font-mono font-bold text-white block">MD. ABDUR RAZZAK</span>
                        <span className="text-[10px] text-amber-400 font-mono">DIRECTOR, DILS DHAKA</span>
                      </div>

                      {/* Authentic Japanese Red Stamp (落款印 Hanko) */}
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-md bg-red-600/90 text-white font-serif text-[11px] font-bold flex items-center justify-center border border-red-400 shadow-sm transform rotate-6">
                        印
                      </div>
                    </div>
                  </div>

                  {/* Certified JLPT N1 Crest Pill */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-red-600 text-slate-950 font-black text-[11px] font-mono rounded-full shadow-lg border border-amber-300 flex items-center gap-1.5 whitespace-nowrap">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
                    <span>JLPT N1 HIGHEST RANK</span>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white font-serif">
                    {t.leadership.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-300 mt-1">
                    {t.leadership.role}
                  </p>
                  <p className="text-[11px] text-red-400 font-mono font-semibold mt-0.5">
                    Authorized Japan Immigration Consultant • Farmgate HQ
                  </p>
                </div>
              </div>

              {/* Right Column: Quote & Trust Pillars (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Formal Quote Box */}
                <div className="bg-[#060B19] border border-indigo-900/80 rounded-2xl p-5 sm:p-7 relative shadow-inner">
                  <span className="text-4xl text-red-500/30 font-serif absolute top-2 left-4 select-none">“</span>
                  <blockquote className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed pl-5 border-l-2 border-red-500/60 font-serif">
                    {t.leadership.quote}
                  </blockquote>
                  <div className="text-right pt-2">
                    <span className="text-xs font-mono text-slate-400">
                      — <strong>Md. Abdur Razzak</strong>, Head of Japanese Department &amp; JLPT N1 Instructor
                    </span>
                  </div>
                </div>

                {/* 3 Core Trust Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {t.leadership.pillars.map((p, idx) => (
                    <div 
                      key={idx}
                      className="bg-[#070E22] border border-indigo-950 rounded-xl p-4 space-y-1.5 hover:border-indigo-700 transition-colors"
                    >
                      <div className="text-red-400 font-bold text-xs flex items-center gap-1.5 font-mono">
                        {idx === 0 && <Users className="w-3.5 h-3.5" />}
                        {idx === 1 && <FileCheck className="w-3.5 h-3.5" />}
                        {idx === 2 && <GraduationCap className="w-3.5 h-3.5" />}
                        <span>PILLAR 0{idx + 1}</span>
                      </div>
                      <div className="text-xs font-bold text-white">
                        {currentLang === 'jp' ? p.titleJp : currentLang === 'bn' ? p.titleBn : p.titleEn}
                      </div>
                      <div className="text-[11px] text-slate-400 leading-snug">
                        {currentLang === 'jp' ? p.descJp : currentLang === 'bn' ? p.descBn : p.descEn}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Consultation Triggers */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => setPartnerModalOpen(true)}
                    className="min-h-[44px] px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/60 transition-transform active:scale-95 flex items-center gap-2"
                  >
                    <span>{currentLang === 'jp' ? 'ラザック先生とのオンライン協議予約' : 'Schedule Direct Meeting with Sensei Razzak'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href="https://wa.me/8801300634046"
                    target="_blank"
                    rel="noreferrer"
                    className="min-h-[44px] px-5 py-2.5 bg-[#081128] hover:bg-[#0E1C40] text-emerald-400 border border-indigo-900 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Direct: +880 1300-634046</span>
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          5. THE FUTURE OF LEARNING: OUR AI-POWERED ECOSYSTEM (DILS + Nihomi.com)
             High-Tech Infrastructure Diagram & Predictive Student Analytics
         ========================================================================= */}
      <section id="ecosystem" className="py-20 sm:py-28 bg-[#070D1E] border-b border-indigo-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12 sm:space-y-16">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/70 border border-red-800/80 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.ecosystem.badge}</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {t.ecosystem.title}
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {t.ecosystem.desc}
            </p>
          </div>

          {/* High-Tech Interactive Ecosystem Showcase Frame */}
          <div className="bg-[#0A132C]/80 backdrop-blur-xl border border-indigo-900/80 rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Top Frame Status Bar */}
            <div className="bg-[#050916] border-b border-indigo-950 px-5 py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                <span className="text-xs font-mono text-slate-400 pl-2">
                  infrastructure://dils.farmgate.dhaka ➔ nihomi.com/ai-sync-hub
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>REAL-TIME LEARNER DATA SYNC</span>
              </div>
            </div>

            {/* In-App Tab Selectors */}
            <div className="bg-[#070E22]/90 border-b border-indigo-950 p-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveAITab('infrastructure')}
                className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeAITab === 'infrastructure'
                    ? 'bg-red-600 text-white shadow-md shadow-red-950/60'
                    : 'text-slate-400 hover:text-white hover:bg-indigo-950/50'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>{t.ecosystem.tabs.infra}</span>
              </button>

              <button
                onClick={() => setActiveAITab('radar')}
                className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeAITab === 'radar'
                    ? 'bg-red-600 text-white shadow-md shadow-red-950/60'
                    : 'text-slate-400 hover:text-white hover:bg-indigo-950/50'
                }`}
              >
                <Target className="w-4 h-4" />
                <span>{t.ecosystem.tabs.radar}</span>
              </button>

              <button
                onClick={() => setActiveAITab('srs')}
                className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeAITab === 'srs'
                    ? 'bg-red-600 text-white shadow-md shadow-red-950/60'
                    : 'text-slate-400 hover:text-white hover:bg-indigo-950/50'
                }`}
              >
                <Brain className="w-4 h-4" />
                <span>{t.ecosystem.tabs.srs}</span>
              </button>
            </div>

            {/* Interactive Viewport Body */}
            <div className="p-6 sm:p-10 min-h-[420px] flex flex-col justify-center bg-gradient-to-b from-[#0A132C]/40 to-[#060B19]">
              
              {/* TAB 1: High-Tech Infrastructure Map */}
              {activeAITab === 'infrastructure' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                    
                    {/* Step 1: DILS Farmgate Campus */}
                    <div className="bg-[#070D1E] border border-indigo-900 rounded-2xl p-5 space-y-3 relative">
                      <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center font-mono font-bold text-sm">
                        01
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        {currentLang === 'jp' ? 'ファームゲート対面校' : currentLang === 'bn' ? 'ফার্মগেট ক্যাম্পাস ক্লাস' : 'In-Person Classroom'}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {currentLang === 'jp'
                          ? 'JLPT N1認定講師による厳格な講義、発音矯正、お辞儀・生活マナー指導を実施。'
                          : currentLang === 'bn'
                          ? 'এন১ ইন্সট্রাক্টরের অধীনে সরাসরি ক্লাস, উচ্চারণ ড্রিল ও ওজিগি নিয়মানুবর্তিতা।'
                          : 'Rigorous 150h in-person immersion, pronunciation labs, and strict attendance discipline.'}
                      </p>
                      <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        Attendance: 98.4%
                      </div>
                    </div>

                    {/* Step 2: Instant Cloud Sync Engine */}
                    <div className="bg-[#070D1E] border border-indigo-900 rounded-2xl p-5 space-y-3 relative">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-mono font-bold text-sm">
                        02
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        {currentLang === 'jp' ? 'Nihomi クラウド同期' : currentLang === 'bn' ? 'ক্লাউড ডেটা সিঙ্ক' : 'Nihomi Cloud Sync'}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {currentLang === 'jp'
                          ? '毎回の出欠記録・小テスト採点・弱点文法データが学生のNihomi IDへ即時反映。'
                          : currentLang === 'bn'
                          ? 'ক্লাস টেস্ট ও হোমওয়ার্ক স্কোর সরাসরি নিহোমি কেন্দ্রীয় অ্যাকাউন্টে সিঙ্ক।'
                          : 'Daily physical test grades and attendance stream into the student’s unified digital record.'}
                      </p>
                      <div className="text-[10px] font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800">
                        Sync Latency: &lt;1.2s
                      </div>
                    </div>

                    {/* Step 3: 24/7 AI Retention Engine */}
                    <div className="bg-[#070D1E] border border-indigo-900 rounded-2xl p-5 space-y-3 relative">
                      <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
                        03
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        {currentLang === 'jp' ? '24/7 AI記憶定着エンジン' : currentLang === 'bn' ? '২৪/৭ এআই মেমোরি ইঞ্জিন' : '24/7 AI Retention'}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {currentLang === 'jp'
                          ? 'エビングハウスの忘却曲線に基づき、復習が必要な単語・文法をスマホへ自動通知。'
                          : currentLang === 'bn'
                          ? 'ফরগেটিং কার্ভের উপর ভিত্তি করে রাতে স্মার্টফোনে অটোমেটিক রিকল প্র্যাকটিস।'
                          : 'Spaced Repetition System (SRS) forces daily recall on smartphone for high retention.'}
                      </p>
                      <div className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                        Retention Rate: 92.8%
                      </div>
                    </div>

                    {/* Step 4: Japanese Partner School Verification */}
                    <div className="bg-[#070D1E] border border-red-500/50 rounded-2xl p-5 space-y-3 relative shadow-lg shadow-red-950/40">
                      <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-mono font-bold text-sm">
                        04
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        {currentLang === 'jp' ? '提携校向け透明性レポート' : currentLang === 'bn' ? 'জাপান পার্টনার ড্যাশবোর্ড' : 'B2B Partner Verification'}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {currentLang === 'jp'
                          ? '日本の受入機関は、渡日前の学生の学習進捗・出席率・JLPT合格予測を随時確認可能。'
                          : currentLang === 'bn'
                          ? 'জাপানের স্কুল কর্তৃপক্ষ সরাসরি শিক্ষার্থীর প্রস্তুতি ও উপস্থিতির রেকর্ড পর্যবেক্ষণ করতে পারে।'
                          : 'Japanese partner schools can inspect student performance logs before issuing admission.'}
                      </p>
                      <div className="text-[10px] font-mono text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800">
                        COE Success: 100%
                      </div>
                    </div>

                  </div>

                  <div className="bg-[#050916] border border-indigo-950 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                    <div className="text-slate-300">
                      <strong className="text-white">Core Principle:</strong> One Student ➔ One DILS ID ➔ One Continuous Learning Journey (Classroom + Cloud AI).
                    </div>
                    <button
                      onClick={() => setPartnerModalOpen(true)}
                      className="px-4 py-2 bg-indigo-900/60 hover:bg-indigo-800 text-white rounded-lg border border-indigo-700 font-bold transition-colors whitespace-nowrap"
                    >
                      {currentLang === 'jp' ? '学校様向けデータ連携の相談' : 'Request Institutional Demo'}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: Real-time Weakness Radar */}
              {activeAITab === 'radar' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        {currentLang === 'jp' ? '学生学習進捗 & 合格予測レーダー (JLPT N5・NAT-TEST 5級)' : 'Student JLPT Competency Radar'}
                      </h4>
                      <p className="text-xs text-slate-400">
                        Aggregated from 150 hours of physical class quizzes and Nihomi AI drills.
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-mono font-bold">
                      EXAM READINESS: 94.2% READY
                    </span>
                  </div>

                  {/* Progress Breakdown Bars */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                        <span>Kanji &amp; Vocabulary (文字・語彙 Goi)</span>
                        <span className="text-emerald-400 font-bold">96% (Mastered: 110 Kanji, 800 Words)</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-[#050916] overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: '96%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                        <span>Grammar &amp; Particles (文法・助詞 Bunpou: は/が, に/で)</span>
                        <span className="text-amber-400 font-bold">89% (Active Recall Reinforcement)</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-[#050916] overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full" style={{ width: '89%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                        <span>Acoustic Listening (聴解 Chokai - Native Speed Drills)</span>
                        <span className="text-emerald-400 font-bold">93% (Passed Benchmark)</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-[#050916] overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" style={{ width: '93%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                        <span>Business Manners &amp; Ojigi (お辞儀・報連相・挨拶)</span>
                        <span className="text-red-400 font-bold">100% Certified by Razzak Sir</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-[#050916] overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-600 to-rose-400 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#060B19] border border-indigo-950 rounded-xl p-4 text-xs text-slate-300 flex items-center justify-between">
                    <span>
                      <strong className="text-amber-300">Data-Driven Assurance:</strong> Japanese partners receive transparent digital scorecards ensuring zero surprises upon student landing in Japan.
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 3: SRS Retention Curve */}
              {activeAITab === 'srs' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        {currentLang === 'jp' ? 'エビングハウスの忘却曲線を克服する「Nihomi SRS」' : 'Ebbinghaus Forgetting Curve Defeat'}
                      </h4>
                      <p className="text-xs text-slate-400">
                        Comparing traditional passive rote learning vs. DILS + Nihomi continuous spaced repetition.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-red-400 bg-red-950/80 px-2.5 py-1 rounded border border-red-800">
                      SRS RETENTION: +68% GAIN
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#050916] border border-red-950/80 rounded-xl p-4 space-y-2">
                      <div className="text-red-400 font-mono font-bold text-xs">
                        ❌ Traditional Rote Cramming (一般的な丸暗記)
                      </div>
                      <div className="text-2xl font-black text-slate-400 font-mono">
                        21% Retention
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Students forget 79% of Kanji and grammar within 30 days of lecture without spaced recall.
                      </p>
                    </div>

                    <div className="bg-[#050916] border border-emerald-500/40 rounded-xl p-4 space-y-2 shadow-lg">
                      <div className="text-emerald-400 font-mono font-bold text-xs">
                        ✅ DILS Classroom + Nihomi AI (ハイブリッド学習)
                      </div>
                      <div className="text-2xl font-black text-emerald-400 font-mono">
                        89% Retention
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Continuous active recall intervals (1d ➔ 3d ➔ 7d ➔ 21d) lock vocabulary into long-term memory.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Callout Bar */}
            <div className="bg-[#050A18] border-t border-indigo-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5 text-center sm:text-left">
                <div className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                  CONTINUOUS DATA-DRIVEN JAPAN READINESS
                </div>
                <div className="text-xs text-slate-400">
                  Built specifically for Bangladeshi candidates preparing for Japanese institutions.
                </div>
              </div>

              <button
                onClick={() => onSwitchToStudentPortal && onSwitchToStudentPortal('c-jp-n5')}
                className="min-h-[44px] px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/60 transition-transform active:scale-95 flex items-center gap-2"
              >
                <span>Launch Student Practice Hub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          6. SERVICES & EXPERTISE (Clean MUJI-Style Grid)
             1. JLPT & NAT-TEST
             2. Specified Skilled Worker (SSW)
             3. COE & Visa Processing (100% Legal Compliance)
             4. Business Etiquette & Ojigi (Bowing) Training
         ========================================================================= */}
      <section id="services" className="py-20 sm:py-28 bg-[#050A18] border-b border-indigo-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12 sm:space-y-16">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-800/80 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t.services.badge}</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {t.services.title}
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {t.services.desc}
            </p>
          </div>

          {/* Clean Minimalist 4-Card MUJI-Style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {t.services.items.map((svc, idx) => (
              <div
                key={idx}
                className="bg-[#0B1530]/50 backdrop-blur-md border border-indigo-900/60 hover:border-red-500/50 rounded-3xl p-7 sm:p-9 flex flex-col justify-between shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="space-y-5">
                  
                  {/* Card Header: Number & Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-red-500/60 group-hover:text-red-400 transition-colors">
                      {svc.num}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#050916] border border-indigo-900 text-slate-300 text-[11px] font-mono">
                      JAPAN STANDARD
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-red-400 transition-colors">
                      {currentLang === 'jp' ? svc.titleJp : currentLang === 'bn' ? svc.titleBn : svc.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium">
                      {currentLang === 'jp' ? svc.subtitleJp : currentLang === 'bn' ? svc.subtitleBn : svc.subtitleEn}
                    </p>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-300">
                    {svc.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Bottom Card Action */}
                <div className="pt-6 mt-6 border-t border-indigo-950 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    Dhaka Farmgate &amp; Tokyo Curriculum
                  </span>
                  <button
                    onClick={() => setPartnerModalOpen(true)}
                    className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5 transition-colors"
                  >
                    <span>{currentLang === 'jp' ? '詳細シラバス請求' : 'Request Syllabus'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          7. OUR PARTNERS IN JAPAN & 4-STEP RECRUITMENT FLOW
         ========================================================================= */}
      <section id="partners" className="py-20 bg-[#070D1E] border-b border-indigo-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12 sm:space-y-16">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-800/80 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.partnersSection.badge}</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {t.partnersSection.title}
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {t.partnersSection.desc}
            </p>
          </div>

          {/* 4-Step Partnership Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {t.partnersSection.steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#0B1530]/50 border border-indigo-900/60 rounded-2xl p-6 space-y-3 hover:border-red-500/40 transition-all group"
              >
                <div className="text-xs font-mono font-bold text-red-400 bg-red-950/60 px-2.5 py-1 rounded-md border border-red-800/60 inline-block">
                  {step.step}
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                  {currentLang === 'jp' ? step.titleJp : currentLang === 'bn' ? step.titleBn : step.titleEn}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.descJp}
                </p>
              </div>
            ))}
          </div>

          {/* Institutional Consultation CTA Banner */}
          <div className="bg-gradient-to-r from-red-950/90 via-[#0E1E45] to-[#0A132C] border border-red-500/40 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-black text-white font-serif">
              {currentLang === 'jp'
                ? '新規提携校・受入企業様を随時募集しております'
                : 'Partner with DILS Dhaka for Disciplined Japanese Talent'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {currentLang === 'jp'
                ? '東京窓口またはダッカ現地とのZoomオンライン面談にて、詳細なカリキュラムや学生プロファイルをご案内いたします。'
                : 'Schedule a Zoom conference with our Tokyo liaison or Dhaka headquarters to review student records and tailored pre-departure batches.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setPartnerModalOpen(true)}
                className="min-h-[44px] px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/60 transition-transform active:scale-95 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>{currentLang === 'jp' ? '提携校・受入のご相談はこちら' : 'Schedule Partner Consultation'}</span>
              </button>

              <a
                href="mailto:tokyo@dilsbd.com"
                className="min-h-[44px] px-6 py-3 bg-[#070D1E] hover:bg-[#0B1530] text-slate-200 border border-indigo-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-red-400" />
                <span>tokyo@dilsbd.com</span>
              </a>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          8. CORPORATE FOOTER (Tokyo & Dhaka Representation, Trust Badges, Copyright)
         ========================================================================= */}
      <footer id="about-us" className="bg-[#030712] border-t border-indigo-950 text-slate-400 text-xs pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
            
            {/* Column 1: Brand & Ethos (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-indigo-950 flex items-center justify-center font-serif font-black text-white text-lg">
                  DILS
                </div>
                <div>
                  <h4 className="text-base font-black text-white tracking-tight">
                    {t.footer.title}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {t.footer.sub}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                Strictly dedicated to Japanese language, cultural discipline, and immigration compliance. Bridging Bangladeshi talent with Japanese corporate standards through physical masterclasses and continuous AI memory tracking.
              </p>

              {/* Trust Badges */}
              <div className="space-y-1.5 pt-2">
                {t.footer.trustBadges.map((badge, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 text-[11px] text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Dual Office Locations (Tokyo & Dhaka) (4 cols) */}
            <div className="md:col-span-4 space-y-4">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                OFFICES &amp; CAMPUSES
              </h5>

              {/* Tokyo Desk */}
              <div className="space-y-1 border-l-2 border-red-500/80 pl-3">
                <div className="text-white font-bold text-xs flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>{t.footer.tokyoOffice}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {t.footer.tokyoAddress}
                </p>
                <div className="text-[11px] font-mono text-red-400 pt-0.5">
                  Email: tokyo@dilsbd.com
                </div>
              </div>

              {/* Dhaka Campus */}
              <div className="space-y-1 border-l-2 border-emerald-500/80 pl-3 pt-2">
                <div className="text-white font-bold text-xs flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.footer.dhakaOffice}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {t.footer.dhakaAddress}
                </p>
                <div className="text-[11px] font-mono text-emerald-400 pt-0.5">
                  Hotline / WhatsApp: +880 1300-634046
                </div>
              </div>
            </div>

            {/* Column 3: Quick Navigation & Services (3 cols) */}
            <div className="md:col-span-3 space-y-3">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                QUICK ACCESS
              </h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#leadership" className="hover:text-red-400 transition-colors">
                    Sensei Abdur Razzak (JLPT N1)
                  </a>
                </li>
                <li>
                  <a href="#curriculum" className="hover:text-red-400 transition-colors">
                    JLPT N5 - N2 Curriculum
                  </a>
                </li>
                <li>
                  <a href="#ecosystem" className="hover:text-red-400 transition-colors">
                    Nihomi.com AI Practice Engine
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => onOpenValidator && onOpenValidator('DILS-CERT-2026-0048')}
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    Verify Student Certificate (QR)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setPartnerModalOpen(true)}
                    className="text-red-400 hover:text-red-300 font-bold transition-colors text-left"
                  >
                    Institutional Partnership Form
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="pt-8 border-t border-indigo-950/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <div>{t.footer.copyright}</div>
            <div className="flex items-center gap-4">
              <span className="hover:text-slate-300 cursor-pointer">Privacy Policy (個人情報保護方針)</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer">Terms of Service (利用規約)</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer">COE Compliance Standards</span>
            </div>
          </div>

        </div>
      </footer>


      {/* =========================================================================
          9. INTERACTIVE B2B PARTNER SCHOOL MODAL
             Institutional inquiry for Japanese Language Schools & Supervising Orgs
         ========================================================================= */}
      <AnimatePresence>
        {partnerModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0A132C] border border-indigo-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative text-left"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setPartnerModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-indigo-950/60"
              >
                <X className="w-5 h-5" />
              </button>

              {!partnerForm.submitted ? (
                <form onSubmit={handlePartnerSubmit} className="space-y-4">
                  
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-red-400 mb-1">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>JAPANESE INSTITUTION INQUIRY (提携相談)</span>
                    </div>
                    <h3 className="text-xl font-black text-white font-serif">
                      {currentLang === 'jp' ? '日本の教育機関・受入企業様 お問い合わせ' : 'Partner School Consultation'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Connect directly with Md. Abdur Razzak and our Tokyo representative.
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Institution / Company Name (学校名・企業名) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 東京国際日本語学校 / Tokyo Japanese Language Institute"
                        value={partnerForm.orgName}
                        onChange={(e) => setPartnerForm({ ...partnerForm, orgName: e.target.value })}
                        className="w-full bg-[#060B19] border border-indigo-900 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-medium mb-1">
                          Organization Type (区分) *
                        </label>
                        <select
                          value={partnerForm.orgType}
                          onChange={(e) => setPartnerForm({ ...partnerForm, orgType: e.target.value })}
                          className="w-full bg-[#060B19] border border-indigo-900 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500 text-xs"
                        >
                          <option value="language_school">日本語学校 (Language School)</option>
                          <option value="supervising_org">監理団体 / 登録支援機関</option>
                          <option value="vocational">専門学校 / 大学 (College / University)</option>
                          <option value="enterprise">日本企業 (Direct Enterprise)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-300 font-medium mb-1">
                          Location in Japan (所在地)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 東京都新宿区, 大阪市"
                          value={partnerForm.locationInJapan}
                          onChange={(e) => setPartnerForm({ ...partnerForm, locationInJapan: e.target.value })}
                          className="w-full bg-[#060B19] border border-indigo-900 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-medium mb-1">
                          Contact Person (ご担当者様名) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 山田 太郎 / Tanaka"
                          value={partnerForm.contactPerson}
                          onChange={(e) => setPartnerForm({ ...partnerForm, contactPerson: e.target.value })}
                          className="w-full bg-[#060B19] border border-indigo-900 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-medium mb-1">
                          Official Email (メールアドレス) *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="partner@school.ac.jp"
                          value={partnerForm.email}
                          onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                          className="w-full bg-[#060B19] border border-indigo-900 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        Specific Request / Intake Terms (ご要望・受入希望人数)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g., Requesting online Zoom briefing with Sensei Razzak for October / April intake..."
                        value={partnerForm.notes}
                        onChange={(e) => setPartnerForm({ ...partnerForm, notes: e.target.value })}
                        className="w-full bg-[#060B19] border border-indigo-900 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 text-xs"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/60 transition-transform active:scale-95 flex items-center justify-center gap-2 min-h-[44px]"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{currentLang === 'jp' ? '提携相談・Zoom面談を送信' : 'Submit Institutional Request'}</span>
                    </button>
                    <p className="text-[10px] text-center text-slate-400 mt-2">
                      Our Tokyo liaison or Farmgate headquarters will reply within 24 business hours.
                    </p>
                  </div>

                </form>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-black text-white font-serif">
                    {currentLang === 'jp' ? 'お問い合わせを受け付けました' : 'Institutional Inquiry Received'}
                  </h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Thank you. We have recorded your request. Sensei Abdur Razzak and our Tokyo desk will review your requirements and follow up promptly.
                  </p>
                </div>
              )}

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default JapaneseCorporateLanding;
