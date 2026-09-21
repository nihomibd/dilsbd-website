import React, { useState, useEffect } from 'react';
import { PortalMode, LangMode } from '../types';
import { 
  Globe, 
  GraduationCap, 
  Users, 
  Award, 
  Building2, 
  ShieldCheck, 
  PhoneCall, 
  Sparkles,
  Menu,
  X
} from 'lucide-react';

interface HeaderProps {
  currentPortal: PortalMode;
  onSelectPortal: (portal: PortalMode) => void;
  lang: LangMode;
  onSelectLang: (lang: LangMode) => void;
  onOpenAdmission: () => void;
  onOpenValidator: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPortal,
  onSelectPortal,
  lang,
  onSelectLang,
  onOpenAdmission,
  onOpenValidator
}) => {
  const [dhakaTime, setDhakaTime] = useState<string>('');
  const [tokyoTime, setTokyoTime] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Live real-time dual clocks
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setDhakaTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Dhaka',
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
      setTokyoTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Tokyo',
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };

    updateClocks();
    const timer = setInterval(updateClocks, 1000);
    return () => clearInterval(timer);
  }, []);

  const portals: { id: PortalMode; labelBn: string; labelEn: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'website', labelBn: 'পাবলিক ওয়েবসাইট ও কোর্স', labelEn: 'Website & Courses', icon: <Globe className="w-4 h-4" /> },
    { id: 'student', labelBn: 'শিক্ষার্থী পোর্টাল (LMS)', labelEn: 'Student LMS Hub', icon: <GraduationCap className="w-4 h-4" />, badge: 'Live' },
    { id: 'instructor', labelBn: 'শিক্ষক পোর্টাল', labelEn: 'Instructor Portal', icon: <Users className="w-4 h-4" /> },
    { id: 'gradebook', labelBn: 'এক্সাম ও গ্রেডবুক', labelEn: 'Exam & Gradebook', icon: <Award className="w-4 h-4" /> },
    { id: 'admin', labelBn: 'এডমিন CRM ও ফি', labelEn: 'Admin & CRM', icon: <Building2 className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 border-b border-slate-800 backdrop-blur-md">
      {/* 1. TOP UTILITY BAR (Live Dual Clocks, Trilingual, Proposal Reference) */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-3 sm:px-6 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Dual Clocks */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 px-2.5 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-slate-200">DHAKA</span>
              <span className="font-mono text-emerald-400 font-bold">{dhakaTime || '--:--:--'}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950/80 border border-red-950/80 px-2.5 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="font-semibold text-slate-200">TOKYO</span>
              <span className="font-mono text-red-400 font-bold">{tokyoTime || '--:--:--'}</span>
            </div>

            <span className="hidden xl:inline text-slate-500 text-[11px]">
              Farmgate Campus: 7th Floor, BTI Central Plaza, 95 Green Road
            </span>
          </div>

          {/* Right actions: Phone hotline, verify QR shortcut, and Language switcher */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <button
              onClick={onOpenValidator}
              className="flex items-center gap-1 text-[11px] font-semibold text-amber-300 hover:text-amber-200 bg-amber-950/40 border border-amber-800/50 px-2 py-0.5 rounded transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'bn' ? 'সার্টিফিকেট ভেরিফাই' : 'Verify Certificate'}</span>
            </button>

            <a 
              href="tel:+8801764395945" 
              className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-red-400 transition-colors font-medium text-[11px]"
            >
              <PhoneCall className="w-3 h-3 text-red-500" />
              <span>+880 1764-395945</span>
            </a>

            {/* Trilingual Switcher */}
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-md p-0.5 text-[11px]">
              <button
                onClick={() => onSelectLang('bn')}
                className={`px-2 py-0.5 rounded font-medium transition-all ${
                  lang === 'bn' ? 'bg-red-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => onSelectLang('en')}
                className={`px-2 py-0.5 rounded font-medium transition-all ${
                  lang === 'en' ? 'bg-red-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onSelectLang('jp')}
                className={`px-2 py-0.5 rounded font-medium transition-all ${
                  lang === 'jp' ? 'bg-red-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                日本語
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 2. MAIN BRAND & 5-IN-1 PORTAL NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & Institute Identity */}
          <div 
            onClick={() => onSelectPortal('website')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shadow-lg shadow-red-950/50 border border-red-500/30 group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="text-white font-black text-lg sm:text-xl tracking-tighter">DILS</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-xl font-black tracking-tight text-white group-hover:text-red-400 transition-colors">
                  DILS Dhaka
                </span>
                <span className="bg-red-950 text-red-400 border border-red-800/80 text-[10px] px-1.5 py-0.2 rounded font-mono font-bold">
                  LMS & VISA
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium hidden xs:block">
                Dhaka International Language School & Visa Center
              </p>
            </div>
          </div>

          {/* Desktop 5-in-1 Portal Navigation Pills */}
          <nav className="hidden lg:flex items-center bg-slate-900/90 border border-slate-800 p-1 rounded-xl shadow-inner">
            {portals.map((p) => {
              const isActive = currentPortal === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPortal(p.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {p.icon}
                  <span>{lang === 'bn' ? p.labelBn : p.labelEn}</span>
                  {p.badge && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-0.5"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs: Direct Admission & Mobile toggle */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenAdmission}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 rounded-xl shadow-lg shadow-red-950/40 transition-transform active:scale-95 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              <span>{lang === 'bn' ? 'অনলাইন ভর্তি' : 'Online Admission'}</span>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation for 5 Portals */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-3 space-y-2">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2">
            5 Portals in 1 Ecosystem (UCT Architecture)
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {portals.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  onSelectPortal(p.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold ${
                  currentPortal === p.id
                    ? 'bg-red-600 text-white'
                    : 'text-slate-300 bg-slate-900/60 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  {p.icon}
                  <span>{lang === 'bn' ? p.labelBn : p.labelEn}</span>
                </div>
                {p.badge && (
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded">
                    {p.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-between gap-2">
            <button
              onClick={() => {
                onOpenValidator();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs font-semibold bg-amber-950/50 text-amber-300 border border-amber-800/60 rounded-lg"
            >
              সার্টিফিকেট ভেরিফাই
            </button>
            <a
              href="tel:+8801764395945"
              className="flex-1 py-2 text-center text-xs font-semibold bg-slate-900 text-slate-200 border border-slate-800 rounded-lg"
            >
              কল করুন
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
