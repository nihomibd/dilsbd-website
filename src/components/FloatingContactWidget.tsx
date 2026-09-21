import React, { useState } from 'react';
import { 
  PhoneCall, 
  MessageCircle, 
  X, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Mail, 
  ShieldCheck, 
  Sparkles,
  Facebook
} from 'lucide-react';
import { DILS_INFO } from '../data/mockData';

interface FloatingContactWidgetProps {
  onOpenAdmission: () => void;
  onOpenValidator: () => void;
}

export const FloatingContactWidget: React.FC<FloatingContactWidgetProps> = ({
  onOpenAdmission,
  onOpenValidator
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Expanded Popup Menu */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl p-5 text-slate-200 animate-fadeIn space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h4 className="text-sm font-bold text-white">DILS অফিসিয়াল হেল্পডেস্ক</h4>
              </div>
              <p className="text-[11px] text-slate-400">সরাসরি কথা বলুন ডিরেক্টর ও ইন্সট্রাক্টরের সাথে</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              aria-label="Close contact drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Contact 1: MD. ABDUR RAZZAK (Director) */}
          <div className="bg-slate-900/90 border border-red-950 p-3.5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold text-xs">
                  N1
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">{DILS_INFO.director}</h5>
                  <p className="text-[10px] text-red-400 font-semibold">{DILS_INFO.directorTitle}</p>
                </div>
              </div>
              <span className="text-[10px] bg-red-950 text-red-300 border border-red-800 px-1.5 py-0.5 rounded">ভিসা ও সিওই</span>
            </div>

            <p className="text-[11px] text-slate-400">
              জাপান স্টুডেন্ট ভিসা, স্পনসর ফাইল প্রসেসিং ও এম্বাসি ইন্টারভিউ পরামর্শের জন্য সরাসরি কথা বলুন।
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`https://wa.me/8801300634046?text=${encodeURIComponent('হ্যালো রাজ্জাক স্যার! আমি DILS ওয়েবসাইট থেকে জাপান স্টুডেন্ট ভিসা ও সিওই প্রসেসিং সম্পর্কে পরামর্শ নিতে চাই।')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`tel:${DILS_INFO.directorPhone}`}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all border border-slate-700"
              >
                <PhoneCall className="w-3.5 h-3.5 text-red-400" />
                <span>কল করুন</span>
              </a>
            </div>
          </div>

          {/* Contact 2: Tanvir Kabir Biplob (Japanese Instructor) */}
          <div className="bg-slate-900/90 border border-blue-950 p-3.5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-xs">
                  N2
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">{DILS_INFO.instructor}</h5>
                  <p className="text-[10px] text-blue-400 font-semibold">{DILS_INFO.instructorTitle}</p>
                </div>
              </div>
              <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-800 px-1.5 py-0.5 rounded">ক্লাস ও ব্যাচ</span>
            </div>

            <p className="text-[11px] text-slate-400">
              জাপানি ভাষা কোর্স (JLPT N5/N4), মিন্না নো নিহোঙ্গো ও ন্যাট পরীক্ষার জন্য সরাসরি যোগাযোগ করুন।
            </p>

            <a
              href={`https://wa.me/8801755534997?text=${encodeURIComponent('হ্যালো তানভির স্যার! আমি DILS ওয়েবসাইট থেকে জাপানি ভাষা কোর্স ও নতুন ব্যাচ সম্পর্কে বিস্তারিত জানতে চাই।')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow w-full"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>তানভির স্যারের WhatsApp (017555-34997)</span>
            </a>
          </div>

          {/* Institute Info & Social Links */}
          <div className="space-y-2 pt-1 text-xs border-t border-slate-800/80">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                <span>৭ম তলা, বিটিআই সেন্ট্রাল প্লাজা, ফার্মগেট</span>
              </span>
              <a
                href={DILS_INFO.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span>{DILS_INFO.email}</span>
              </span>
              <span className="font-mono text-emerald-400 font-bold">dilsbd.com</span>
            </div>
          </div>

          {/* Quick Action buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenAdmission();
              }}
              className="py-2 px-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>অনলাইন ভর্তি</span>
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenValidator();
              }}
              className="py-2 px-3 bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800/60 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>সার্টিফিকেট যাচাই</span>
            </button>
          </div>

        </div>
      )}

      {/* Floating Pill / Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-emerald-600 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl shadow-red-950/80 hover:scale-105 active:scale-95 transition-all border-2 border-white/20"
        aria-label="Direct Admission & WhatsApp Helpline"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-ping"></span>
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-[10px] uppercase font-bold text-white/80 leading-none">হেল্পডেস্ক ও ভর্তি</div>
          <div className="text-xs font-black tracking-tight leading-tight">WhatsApp / Call</div>
        </div>
      </button>
    </div>
  );
};
