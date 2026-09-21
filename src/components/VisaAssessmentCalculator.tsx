import React, { useState } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  MessageCircle, 
  Clock, 
  Calendar, 
  Building2, 
  HelpCircle 
} from 'lucide-react';
import { DILS_INFO } from '../data/mockData';

export const VisaAssessmentCalculator: React.FC = () => {
  const [education, setEducation] = useState<'hsc' | 'diploma' | 'degree' | 'masters'>('hsc');
  const [passingYear, setPassingYear] = useState<number>(2024);
  const [gpa, setGpa] = useState<string>('3.50+');
  const [currentJapanese, setCurrentJapanese] = useState<'beginner' | 'learning_n5' | 'passed_n5' | 'passed_n4'>('learning_n5');
  const [targetIntake, setTargetIntake] = useState<'april_2026' | 'october_2026' | 'july_2026' | 'ssw_work'>('october_2026');
  const [sponsor, setSponsor] = useState<'parents' | 'siblings' | 'self' | 'relative'>('parents');
  const [calculated, setCalculated] = useState<boolean>(true);

  // Compute calculated metrics
  const getAssessment = () => {
    let score = 88;
    let visaRoute = 'Japan Student Visa (Japanese Language School 1.5 - 2 Years)';
    let timeline = '6 to 8 Months';
    let recommendations: string[] = [];

    if (education === 'hsc') {
      score += 4;
      recommendations.push('এইচএসসি পরবর্তী জাপানের ল্যাঙ্গুয়েজ স্কুল হয়ে ভোকেশনাল কলেজ (Senmon Gakko) বা ইউনিভার্সিটিতে ব্যাচেলর ডিগ্রি অর্জন।');
    } else if (education === 'diploma') {
      score += 7;
      recommendations.push('ডিপ্লোমা ইন ইঞ্জিনিয়ারিং পাস শিক্ষার্থীদের জন্য সরাসরি জাপানের টেকনিক্যাল কলেজ ও হাই-স্যালারি আইটি/মেকানিক্যাল জবের সুযোগ।');
    } else if (education === 'degree' || education === 'masters') {
      score += 9;
      visaRoute = targetIntake === 'ssw_work' 
        ? 'Japan SSW Tokutei Ginou Direct Work Visa (5 Years Renewable)'
        : 'Student Visa to Direct Japanese Corporate Job Transition';
      timeline = '4 to 6 Months';
      recommendations.push('গ্র্যাজুয়েটদের জন্য জাপানের ল্যাঙ্গুয়েজ স্কুল শেষে সরাসরি মাল্টিন্যাশনাল কোম্পানিতে জব ভিসা (Engineering / Humanities) কনভার্সন।');
    }

    if (currentJapanese === 'passed_n5' || currentJapanese === 'passed_n4') {
      score += 5;
    } else if (currentJapanese === 'beginner') {
      score -= 2;
      recommendations.push('DILS ফার্মগেট ক্যাম্পাসে অবিলম্বে JLPT N5 / NAT 5Q স্পেশাল ব্যাচে ভর্তি হয়ে ভাষা কোর্স শুরু করা বাধ্যতামূলক।');
    }

    if (sponsor === 'parents') {
      score += 3;
    }

    // Cap score at 99%
    const finalScore = Math.min(score, 99);

    return {
      score: finalScore,
      visaRoute,
      timeline,
      recommendations,
      estimatedLanguageMonths: currentJapanese === 'passed_n5' ? '২ মাস (N4 প্রিপারেশন)' : '৩.৫ - ৪ মাস (N5 কমপ্লিট)',
      intakeName: targetIntake === 'april_2026' ? 'এপ্রিল ২০২৬ ইনটেক' : targetIntake === 'october_2026' ? 'অক্টোবর ২০২৬ ইনটেক' : targetIntake === 'july_2026' ? 'জুলাই ২০২৬ ইনটেক' : 'এসএসডব্লিউ সরাসরি জব ভিসা'
    };
  };

  const result = getAssessment();

  const getWhatsAppMessage = (mentor: 'razzak' | 'tanvir') => {
    const mentorName = mentor === 'razzak' ? 'রাজ্জাক স্যার' : 'তানভির স্যার';
    const text = `হ্যালো ${mentorName}! আমি DILS অনলাইন প্রি-অ্যাসেসমেন্ট করেছি:\n` +
      `- শিক্ষাগত যোগ্যতা: ${education.toUpperCase()}\n` +
      `- পাসিং ইয়ার: ${passingYear}\n` +
      `- জিপিএ: ${gpa}\n` +
      `- বর্তমান জাপানি লেভেল: ${currentJapanese}\n` +
      `- টার্গেট ইনটেক: ${result.intakeName}\n` +
      `- প্রবাবিলিটি স্কোর: ${result.score}%\n\n` +
      `দয়া করে আমার জাপান ফাইল প্রসেসিং এবং অ্যাডমিশন বিষয়ে পরামর্শ দেবেন।`;
    return encodeURIComponent(text);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 blur-3xl pointer-events-none rounded-full"></div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/60 text-red-400 text-xs font-bold font-mono">
            <Calculator className="w-3.5 h-3.5" />
            <span>JAPAN VISA & COE SMART CALCULATOR</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            আপনার জাপান ভিসা ও সিওই (COE) পাওয়ার সম্ভাবনা কতটুকু?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            আপনার শিক্ষাগত যোগ্যতা ও জাপানি ভাষার অবস্থা নির্বাচন করুন। রাজ্জাক স্যার (JLPT N1) এবং তানভির স্যারের (JLPT N2) তত্ত্বাবধানে সঠিক পাথওয়ে জেনে নিন।
          </p>
        </div>

        {/* Input Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* 1. Education */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              ১. সর্বশেষ শিক্ষাগত যোগ্যতা:
            </label>
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-semibold"
            >
              <option value="hsc">এইচএসসি (HSC / Alim)</option>
              <option value="diploma">ডিপ্লোমা ইন ইঞ্জিনিয়ারিং (Diploma)</option>
              <option value="degree">স্নাতক / অনার্স (BSc / BBA / BA)</option>
              <option value="masters">মাস্টার্স (Masters / MBA / MSc)</option>
            </select>
          </div>

          {/* 2. Passing Year */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              ২. পাসের সাল (Passing Year):
            </label>
            <select
              value={passingYear}
              onChange={(e) => setPassingYear(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-semibold"
            >
              <option value={2026}>২০২৬ (চলতি ব্যাচ)</option>
              <option value={2025}>২০২৫</option>
              <option value={2024}>২০২৪</option>
              <option value={2023}>২০২৩</option>
              <option value={2022}>২০২২</option>
              <option value={2021}>২০২১ বা পূর্ববর্তী (Study Gap)</option>
            </select>
          </div>

          {/* 3. GPA / Result */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              ৩. ফলাফল / জিপিএ (GPA):
            </label>
            <select
              value={gpa}
              onChange={(e) => setGpa(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-semibold"
            >
              <option value="4.00+">GPA 4.00 - 5.00 (Outstanding)</option>
              <option value="3.50+">GPA 3.50 - 3.99 (Very Good)</option>
              <option value="3.00+">GPA 3.00 - 3.49 (Standard)</option>
              <option value="2.50+">GPA 2.50 - 2.99 (Eligible)</option>
            </select>
          </div>

          {/* 4. Japanese Language Status */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              ৪. বর্তমান জাপানি ভাষার লেভেল:
            </label>
            <select
              value={currentJapanese}
              onChange={(e) => setCurrentJapanese(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-semibold"
            >
              <option value="beginner">একদম নতুন (কিছুই পারি না)</option>
              <option value="learning_n5">N5 শিখছি / হিরাগানা-কাতাকানা পারি</option>
              <option value="passed_n5">NAT 5Q / JLPT N5 পাস করেছি</option>
              <option value="passed_n4">JLPT N4 / NAT 4Q পাস করেছি</option>
            </select>
          </div>

          {/* 5. Target Intake */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              ৫. টার্গেট ইনটেক বা ভিসা টাইপ:
            </label>
            <select
              value={targetIntake}
              onChange={(e) => setTargetIntake(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-semibold"
            >
              <option value="october_2026">অক্টোবর ২০২৬ ইনটেক (মূল ইনটেক)</option>
              <option value="april_2026">এপ্রিল ২০২৬ ইনটেক (দ্রুততম)</option>
              <option value="july_2026">জুলাই ২০২৬ ইনটেক</option>
              <option value="ssw_work">এসএসডব্লিউ (SSW) জব ভিসা (৫ বছর)</option>
            </select>
          </div>

          {/* 6. Financial Sponsor */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              ৬. আর্থিক স্পনসর (Financial Sponsor):
            </label>
            <select
              value={sponsor}
              onChange={(e) => setSponsor(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-semibold"
            >
              <option value="parents">পিতা বা মাতা (Parents)</option>
              <option value="siblings">আপন বড় ভাই বা বোন (Sibling)</option>
              <option value="self">নিজে চাকরিজীবী / স্বয়ংসম্পূর্ণ</option>
              <option value="relative">মামা / চাচা / নিকটাত্মীয়</option>
            </select>
          </div>

        </div>

        {/* Assessment Result Output Card */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                AI PRE-ASSESSMENT REPORT (DHAKA REGION)
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                আপনার সিওই (COE) ও ভিসা সাফল্যের সম্ভাবনা
              </h3>
              <p className="text-xs text-slate-400">
                টার্গেট: <strong className="text-slate-200">{result.intakeName}</strong>
              </p>
            </div>

            {/* Score Pill */}
            <div className="flex items-center gap-3 bg-slate-900/90 border border-red-500/50 px-5 py-3 rounded-2xl shadow-inner">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">ভিসা প্রোবাবিলিটি</span>
                <span className="text-xs font-bold text-emerald-400">অত্যন্ত সম্ভাবনাময়</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-emerald-400 font-mono">
                {result.score}%
              </div>
            </div>
          </div>

          {/* Details Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-red-400" />
                সুপারিশকৃত পাথওয়ে:
              </span>
              <strong className="text-white block text-[13px]">{result.visaRoute}</strong>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                প্রসেসিং টাইমলাইন:
              </span>
              <strong className="text-white block text-[13px]">{result.timeline}</strong>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                প্রয়োজনীয় ভাষা প্রস্তুতি:
              </span>
              <strong className="text-white block text-[13px]">{result.estimatedLanguageMonths}</strong>
            </div>
          </div>

          {/* Guidance Recommendations */}
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              ডিআইএলএস মেন্টর প্যানেলের এক্সক্লুসিভ গাইডলাইন:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>জাপান এম্বাসির ভাইবা ও সিওই ফাইল পেপারের ১০০% জেনুইন স্পনসর ডকুমেন্টেশন নিশ্চিত করবে DILS।</span>
              </li>
            </ul>
          </div>

          {/* Direct CTA options */}
          <div className="pt-2 border-t border-slate-800">
            <div className="text-center text-xs font-bold text-slate-400 mb-3">
              এই রেজাল্ট নিয়ে সরাসরি হোয়াটসঅ্যাপে পরামর্শ নিন:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option 1: WhatsApp Director */}
              <a
                href={`https://wa.me/8801300634046?text=${getWhatsAppMessage('razzak')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg shadow-emerald-950/40"
              >
                <MessageCircle className="w-4 h-4" />
                <span>রাজ্জাক স্যার (JLPT N1) - WhatsApp</span>
              </a>

              {/* Option 2: WhatsApp Instructor */}
              <a
                href={`https://wa.me/8801755534997?text=${getWhatsAppMessage('tanvir')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg shadow-blue-950/40"
              >
                <MessageCircle className="w-4 h-4" />
                <span>তানভির স্যার (JLPT N2) - WhatsApp</span>
              </a>
            </div>

            <div className="text-center text-[11px] text-slate-500 mt-3">
              হটলাইন: <strong className="text-slate-300 font-mono">01764-395945</strong> | ফার্মগেট ক্যাম্পাস: ৭ম তলা (লিফট-৬), বিটিআই সেন্ট্রাল প্লাজা
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
