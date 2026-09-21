import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Building2, 
  GraduationCap, 
  ExternalLink, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  Star,
  Quote
} from 'lucide-react';
import { VISA_SUCCESS_STORIES, PARTNER_INSTITUTES, DILS_INFO } from '../data/mockData';
import { VisaSuccessStory } from '../types';

interface VisaSuccessGalleryProps {
  onOpenAdmission: () => void;
}

export const VisaSuccessGallery: React.FC<VisaSuccessGalleryProps> = ({ onOpenAdmission }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'Student Visa' | 'SSW Tokutei Ginou' | 'Tokyo' | 'Nagoya' | 'Osaka'>('all');
  const [selectedStoryModal, setSelectedStoryModal] = useState<VisaSuccessStory | null>(null);

  const filteredStories = VISA_SUCCESS_STORIES.filter((story) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'Student Visa') return story.visaType === 'Student Visa';
    if (selectedFilter === 'SSW Tokutei Ginou') return story.visaType === 'SSW Tokutei Ginou';
    if (selectedFilter === 'Tokyo') return story.destinationCity.includes('Tokyo');
    if (selectedFilter === 'Nagoya') return story.destinationCity.includes('Nagoya');
    if (selectedFilter === 'Osaka') return story.destinationCity.includes('Osaka');
    return true;
  });

  const roadmapSteps = [
    {
      step: '০১',
      titleBn: 'ভর্তি ও জাপানি ভাষা শিক্ষা',
      subtitle: 'DILS ফার্মগেট ক্যাম্পাস / অনলাইন',
      desc: 'তানভির কবির বিপ্লব স্যারের (JLPT N2) বিশেষ কেয়ার ব্যাচে হিরাগানা, কাতাকানা, কাঞ্জি ও মিন্না নো নিহোঙ্গো ১-২৫ অধ্যায় সমাপ্তকরণ।',
      badge: 'Month 1-3'
    },
    {
      step: '০২',
      titleBn: 'NAT-TEST / JLPT সনদ অর্জন',
      subtitle: 'NAT 5Q / JLPT N5 পরীক্ষা',
      desc: 'DILS-এর স্পেশাল মডেল টেস্ট ও নেগেটিভ মার্কিং এনালাইসিসের মাধ্যমে প্রথম চান্সেই ন্যাট বা জেএলপিটি পরীক্ষায় নিশ্চিত পাস।',
      badge: 'Month 4'
    },
    {
      step: '০৩',
      titleBn: 'জাপানের স্কুল ও কলেজ ইন্টারভিউ',
      subtitle: 'অনলাইন লাইভ জুম ইন্টারভিউ',
      desc: 'টোকিও, ওসাকা, নাগোয়া বা ফুকোওকার শীর্ষ শিক্ষাপ্রতিষ্ঠানের প্রিন্সিপাল ও অধ্যাপকদের সাথে অনলাইন ইন্টারভিউ প্রস্তুতি।',
      badge: 'Month 4-5'
    },
    {
      step: '০৪',
      titleBn: 'সিওই (COE) ফাইল সাবমিশন',
      subtitle: 'জাপান রিজিওনাল ইমিগ্রেশন',
      desc: 'রাজ্জাক স্যারের (JLPT N1) ১২+ বছরের অভিজ্ঞতায় স্পনসর, ব্যাংক স্টেটমেন্ট ও ট্যাক্স পেপারসের নির্ভুল ফাইল প্রেজেন্টেশন।',
      badge: 'Month 5'
    },
    {
      step: '০৫',
      titleBn: 'সিওই (COE) অনুমোদন ও ফি জমা',
      subtitle: 'Certificate of Eligibility',
      desc: 'জাপান ইমিগ্রেশন থেকে সিওই ইস্যু হওয়ার পর জাপানের স্কুলের অফিসিয়াল ব্যাংক একাউন্টে টিউশন ফি ব্যাংক ড্রাফট বা টিটি প্রেরণ।',
      badge: 'Month 6'
    },
    {
      step: '০৬',
      titleBn: 'জাপান এম্বাসি ভিসা স্ট্যাম্পিং',
      subtitle: 'ঢাকাস্থ জাপান দূতাবাস',
      desc: 'রাজ্জাক স্যারের ব্যক্তিগত তত্ত্বাবধানে ৩টি মক ইন্টারভিউ দিয়ে এম্বাসিতে পাসপোর্টে ভিসা স্টিকার স্ট্যাম্পিং নিশ্চিতকরণ।',
      badge: 'Month 7'
    },
    {
      step: '০৭',
      titleBn: 'জাপান গমন ও পার্ট-টাইম জব সহায়তা',
      subtitle: 'এয়ারপোর্ট পিকআপ ও ডরমিটরি',
      desc: 'নারিতা/হানেদা বিমানবন্দরে পিকআপ, প্রথম ১৫ দিনের মধ্যে পার্ট-টাইম জব (Baito) প্রাপ্তি এবং রেসিডেন্স কার্ড সহায়তা।',
      badge: 'Flight Day'
    }
  ];

  return (
    <div className="space-y-16">
      
      {/* 1. ROADMAP TO JAPAN (7-Step Process) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/60 text-red-400 text-xs font-bold uppercase font-mono">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ROADMAP TO JAPAN 2026 - 2027</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            বাংলাদেশ থেকে জাপানে পা রাখার ৭টি সুনির্দিষ্ট ধাপ
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            DILS-এর শতভাগ লিগ্যাল ও সিস্টেমেটিক প্রক্রিয়ায় প্রথম দিন থেকেই জানুন আপনার প্রতিটি পদক্ষেপ। কোনো গোপন ফি বা লুকানো শর্ত নেই।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roadmapSteps.map((s, idx) => (
            <div
              key={idx}
              className={`bg-slate-900 border ${
                idx === 0 ? 'border-red-500/50 bg-gradient-to-b from-red-950/20 to-slate-900' : 'border-slate-800'
              } rounded-2xl p-5 relative flex flex-col justify-between hover:border-slate-700 transition-all group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black font-mono text-red-500 group-hover:scale-110 transition-transform">
                    {s.step}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    {s.badge}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1">{s.titleBn}</h4>
                <p className="text-[11px] text-red-400 font-semibold mb-2">{s.subtitle}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>

              {idx < roadmapSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center text-[10px]">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 2. VISA SUCCESS GALLERY & REAL COE APPROVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Verified COE & Visa Success Records</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              আমাদের সফল শিক্ষার্থীদের ভিসা ও সিওই (COE) সাফল্য
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              ফার্মগেট ক্যাম্পাসে ক্লাস করে যারা আজ জাপানের শীর্ষ শহরগুলোতে পড়াশোনা ও ক্যারিয়ার গড়ছেন।
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'সকল সাফল্য' },
              { id: 'Student Visa', label: 'স্টুডেন্ট ভিসা' },
              { id: 'SSW Tokutei Ginou', label: 'এসএসডব্লিউ জব ভিসা' },
              { id: 'Tokyo', label: 'টোকিও' },
              { id: 'Nagoya', label: 'নাগোয়া' },
              { id: 'Osaka', label: 'ওসাকা' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedFilter === f.id
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-slate-900 border border-slate-800 hover:border-red-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-red-950/20"
            >
              <div className="p-5 space-y-4">
                
                {/* Student Photo & Header */}
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={story.studentPhoto}
                      alt={story.studentName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-red-500/40 shadow"
                    />
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-white text-[10px]">
                      ✓
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white">{story.studentName}</h4>
                    <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-500" />
                      {story.destinationCity}
                    </span>
                    <span className="text-[10px] bg-red-950 text-red-300 border border-red-800/80 px-1.5 py-0.2 rounded font-mono font-bold mt-0.5 inline-block">
                      {story.intake} • {story.visaType}
                    </span>
                  </div>
                </div>

                {/* Institute in Japan */}
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400">জাপানের শিক্ষাপ্রতিষ্ঠান / কোম্পানি:</div>
                  <div className="font-semibold text-slate-200">{story.institutionInJapan}</div>
                  <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400 border-t border-slate-800/60 font-mono">
                    <span>COE: {story.coeNumber}</span>
                    <span className="text-emerald-400 font-bold">{story.passingScore}</span>
                  </div>
                </div>

                {/* Testimonial Quote in Bengali */}
                <div className="text-xs text-slate-300 italic relative bg-slate-950/40 p-3 rounded-xl border border-slate-800/40">
                  <Quote className="w-4 h-4 text-red-500/40 absolute top-2 right-2" />
                  "{story.testimonialBn}"
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {story.visaProofBadge || 'ভিসা স্ট্যাম্পড'}
                </span>

                <button
                  onClick={() => setSelectedStoryModal(story)}
                  className="text-slate-300 hover:text-white font-semibold text-[11px] flex items-center gap-1 group"
                >
                  <span>বিস্তারিত ও ফিডব্যাক</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* 3. PARTNER JAPANESE INSTITUTES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1">
            Official Japanese Language Schools & Colleges
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            জাপানের অনুমোদিত পার্টনার শিক্ষাপ্রতিষ্ঠানসমূহ
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            DILS সরাসরি জাপানের মিনিস্ট্রি অব জাস্টিস অনুমোদিত ক্যাটাগরি-এ স্কুলগুলোর সাথে কাজ করে।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PARTNER_INSTITUTES.map((inst) => (
            <div
              key={inst.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4"
            >
              <div>
                <div className="w-full h-28 rounded-xl overflow-hidden mb-3 border border-slate-800">
                  <img src={inst.logo} alt={inst.name} className="w-full h-full object-cover" />
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/80 mb-1.5 inline-block">
                  {inst.city}
                </span>

                <h4 className="text-sm font-bold text-white mb-2 leading-snug">{inst.name}</h4>
                <div className="text-[11px] text-emerald-400 font-semibold mb-3">{inst.category}</div>

                <ul className="space-y-1.5 text-xs text-slate-400">
                  {inst.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <button
                  onClick={onOpenAdmission}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-colors text-center block"
                >
                  এই স্কুলে আবেদন করুন
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Detail Modal for Selected Story */}
      {selectedStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 relative space-y-4">
            <button
              onClick={() => setSelectedStoryModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <img
                src={selectedStoryModal.studentPhoto}
                alt={selectedStoryModal.studentName}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-red-500"
              />
              <div>
                <h3 className="text-lg font-bold text-white">{selectedStoryModal.studentName}</h3>
                <p className="text-xs text-emerald-400 font-semibold">{selectedStoryModal.institutionInJapan}</p>
                <span className="text-[11px] text-slate-400 font-mono">সিওই নম্বর: {selectedStoryModal.coeNumber}</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="text-slate-300 italic">"{selectedStoryModal.testimonialBn}"</div>
              <div className="text-slate-400 pt-1 border-t border-slate-800 text-[11px]">
                কোর্স: <strong>{selectedStoryModal.courseCompletedAtDils}</strong> | ইনটেক: <strong>{selectedStoryModal.intake}</strong>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <span className="text-[10px] font-bold text-red-400 uppercase">মেন্টর প্যানেলের মন্তব্য:</span>
              <p className="text-slate-300">{selectedStoryModal.mentorFeedback}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <a
                href={`https://wa.me/8801300634046?text=${encodeURIComponent(
                  `হ্যালো রাজ্জাক স্যার! আমি DILS ওয়েবসাইটে ${selectedStoryModal.studentName}-এর মতো ${selectedStoryModal.institutionInJapan} তে আবেদনের জন্য পরামর্শ নিতে চাই।`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow"
              >
                একই প্রোগ্রামে আবেদন করতে WhatsApp করুন
              </a>
              <button
                onClick={() => setSelectedStoryModal(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
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
