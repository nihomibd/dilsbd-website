import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  KeyRound, 
  X, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  Sparkles,
  User,
  GraduationCap,
  Building2,
  PhoneCall
} from 'lucide-react';
import { AuthUser, LangMode } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  lang: LangMode;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser, token: string) => void;
  targetPortalName?: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  lang,
  onClose,
  onLoginSuccess,
  targetPortalName
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      setErrorMsg('ইমেইল বা ফোন এবং পাসওয়ার্ড উভয়ই প্রদান করুন।');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim() })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'লগইন ব্যর্থ হয়েছে। সঠিক তথ্য প্রদান করুন।');
        setIsLoading(false);
        return;
      }

      onLoginSuccess(data.user, data.token);
      onClose();
    } catch (err: any) {
      setErrorMsg('সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি। পুনরায় চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickCredential = (quickEmail: string, quickPass: string) => {
    setEmail(quickEmail);
    setPassword(quickPass);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 sm:p-8 space-y-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white">
            {lang === 'bn' ? 'নিরাপদ পোর্টাল লগইন' : 'Secure Portal Sign In'}
          </h3>
          <p className="text-xs text-slate-400">
            {targetPortalName ? (
              <span><strong>{targetPortalName}</strong> অ্যাক্সেস করতে অনুগ্রহ করে লগইন করুন।</span>
            ) : (
              <span>DILSBD প্রাতিষ্ঠানিক একাউন্টে প্রবেশ করুন।</span>
            )}
          </p>
        </div>

        {/* Quick Role Fillers for One-Click Testing */}
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
            ⚡ দ্রুত টেস্ট ক্রেডেনশিয়াল (1-Click Fill)
          </span>
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            <button
              type="button"
              onClick={() => handleQuickCredential('counselor@dilsbd.com', 'dils2026!counselor')}
              className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800 text-left transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-3 h-3 text-red-400" />
              <span className="truncate font-semibold">কাউন্সেলর (CRM)</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickCredential('founder@dilsbd.com', 'dils2026!founder')}
              className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800 text-left transition-colors flex items-center gap-1.5"
            >
              <Building2 className="w-3 h-3 text-amber-400" />
              <span className="truncate font-semibold">ফাউন্ডার (Owner)</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickCredential('accounts@dilsbd.com', 'dils2026!accounts')}
              className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800 text-left transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span className="truncate font-semibold">অ্যাকাউন্টস (Finance)</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickCredential('student@dilsbd.com', 'dils2026!student')}
              className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800 text-left transition-colors flex items-center gap-1.5"
            >
              <GraduationCap className="w-3 h-3 text-sky-400" />
              <span className="truncate font-semibold">শিক্ষার্থী (Student)</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-xs text-red-300 flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>ইমেইল অথবা ফোন নম্বর</span>
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. counselor@dilsbd.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 font-mono"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-slate-400" />
              <span>পাসওয়ার্ড</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 font-mono"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-red-600 hover:bg-red-500 active:scale-98 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                <span>যাচাই করা হচ্ছে...</span>
              </span>
            ) : (
              <>
                <span>লগইন করুন</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-[11px] text-slate-500">
          🔒 সুরক্ষিত JWT সেশন ও এন্ড-টু-এন্ড এনক্রিপ্টেড ক্রেডেনশিয়াল
        </div>

      </div>
    </div>
  );
};
