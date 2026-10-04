import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Check, 
  ShieldCheck, 
  CreditCard, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  RefreshCw,
  Lock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MembershipPlan, BillingCycle, UserSubscription } from '../../types';

interface CheckoutModalProps {
  plan: MembershipPlan;
  initialCycle?: BillingCycle;
  onClose: () => void;
  onSuccess: (subscription: UserSubscription) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  plan,
  initialCycle = 'monthly',
  onClose,
  onSuccess
}) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(initialCycle);
  const [gateway, setGateway] = useState<'bkash_subscription' | 'sslcommerz' | 'sandbox'>('bkash_subscription');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
  const monthlyEquivalent = billingCycle === 'yearly' ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice;
  const yearlySavings = billingCycle === 'yearly' ? (plan.monthlyPrice * 12) - plan.yearlyPrice : 0;

  const handleSimulatePayment = async (outcome: 'SUCCESS' | 'FAILED') => {
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // 1. Checkout session initialization
      const checkoutRes = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: plan.id,
          billingCycle,
          gateway
        })
      });
      const checkoutData = await checkoutRes.json();
      const trxId = checkoutData.data?.trxId || `SANDBOX-${Date.now()}`;

      // 2. Server-Side Verification (Simulating bKash / SSLCOMMERZ callback)
      const verifyRes = await fetch('/api/payment/verify-sandbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trxId,
          outcome,
          planId: plan.id,
          billingCycle,
          gateway,
          amount: price
        })
      });

      const verifyData = await verifyRes.json();

      if (verifyRes.ok && verifyData.success) {
        setSuccessMessage('পেমেন্ট সফল হয়েছে! আপনার সাবস্ক্রিপশন অ্যাক্টিভ করা হয়েছে।');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });

        setTimeout(() => {
          onSuccess({
            id: `sub-${Date.now()}`,
            userId: 'u-student-01',
            planId: plan.id,
            planName: plan.name,
            billingCycle,
            status: 'active',
            currentPeriodEnd: verifyData.data.currentPeriodEnd,
            autoRenew: true
          });
          onClose();
        }, 1500);
      } else {
        setErrorMessage(verifyData.error || 'পেমেন্ট গেটওয়ে দ্বারা প্রক্রিয়া সম্পন্ন করা যায়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
      }
    } catch (err: any) {
      setErrorMessage('সার্ভার যোগাযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full text-white shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
      >
        
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest block">
              DILS MEMBERSHIP CHECKOUT 💳
            </span>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>{plan.name}</span>
              {plan.badge && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-600 text-white font-bold">
                  {plan.badge}
                </span>
              )}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Billing Cycle Toggle */}
          <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-2">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              মাসিক (Monthly)
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                billingCycle === 'yearly' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>বার্ষিক (Yearly)</span>
              <span className="text-[9px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-mono font-bold">
                ১৭% ছাড়
              </span>
            </button>
          </div>

          {/* Pricing Box */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">মোট প্রদেয় ফি ({billingCycle === 'yearly' ? '১ বছর' : '১ মাস'})</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-white font-mono">৳{price.toLocaleString()}</span>
                {billingCycle === 'yearly' && (
                  <span className="text-xs text-slate-400 font-mono">(৳{monthlyEquivalent.toLocaleString()}/মাস)</span>
                )}
              </div>
            </div>

            {billingCycle === 'yearly' && yearlySavings > 0 && (
              <div className="text-right">
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-1 rounded-lg block font-mono">
                  সাশ্রয়: ৳{yearlySavings.toLocaleString()} 🎉
                </span>
              </div>
            )}
          </div>

          {/* Payment Gateway Options */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 block uppercase tracking-wider font-mono">
              পেমেন্ট মাধ্যম বেছে নিন:
            </label>

            <div className="grid grid-cols-1 gap-2.5">
              <button
                type="button"
                onClick={() => setGateway('bkash_subscription')}
                className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  gateway === 'bkash_subscription'
                    ? 'bg-red-950/40 border-red-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-600/20 text-pink-400 border border-pink-500/30 flex items-center justify-center font-bold text-xs">
                    bK
                  </div>
                  <div>
                    <strong className="text-xs font-bold block">bKash Subscription (বিকাশ অটো-রিনিউ)</strong>
                    <span className="text-[11px] text-slate-400">প্রতি মাসে কোনো ঝামেলা ছাড়াই স্বয়ংক্রিয়ভাবে সক্রিয় থাকবে</span>
                  </div>
                </div>
                {gateway === 'bkash_subscription' && <Check className="w-4 h-4 text-red-400" />}
              </button>

              <button
                type="button"
                onClick={() => setGateway('sslcommerz')}
                className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  gateway === 'sslcommerz'
                    ? 'bg-red-950/40 border-red-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold block">SSLCOMMERZ Gateway</strong>
                    <span className="text-[11px] text-slate-400">ভিসা, মাস্টারকার্ড, নগদ, রকেট ও ইন্টারনেট ব্যাংকিং</span>
                  </div>
                </div>
                {gateway === 'sslcommerz' && <Check className="w-4 h-4 text-red-400" />}
              </button>

              <button
                type="button"
                onClick={() => setGateway('sandbox')}
                className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  gateway === 'sandbox'
                    ? 'bg-amber-950/40 border-amber-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xs font-mono">
                    🧪
                  </div>
                  <div>
                    <strong className="text-xs font-bold block">Sandbox Test Mode</strong>
                    <span className="text-[11px] text-slate-400">ডেভেলপার মোডে টেস্ট পেমেন্ট ও ভেরিফিকেশন সিমুলেশন</span>
                  </div>
                </div>
                {gateway === 'sandbox' && <Check className="w-4 h-4 text-amber-400" />}
              </button>
            </div>
          </div>

          {/* Sandbox Controls & Notice */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>TEST SIMULATOR CONTROLS (বিকাশ / SSLCOMMERZ)</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              এটি লাইভ পেমেন্ট গেটওয়ের নিরাপদ টেস্ট মোড। নিচে ক্লিক করে সফল বা ব্যর্থ ট্রানজেকশন সিমুলেট করুন; সিস্টেম ডাটাবেসে রসিদ ও সাবস্ক্রিপশন স্ট্যাটাস আপডেট করবে।
            </p>

            {errorMessage && (
              <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => handleSimulatePayment('SUCCESS')}
                className="py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-98 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isProcessing ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                )}
                <span>Simulate Success (সফল)</span>
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={() => handleSimulatePayment('FAILED')}
                className="py-3 bg-rose-900/60 hover:bg-rose-800 border border-rose-700/60 text-rose-200 active:scale-98 disabled:opacity-50 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Simulate Failure (ব্যর্থ)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>২৫৬-বিট এনক্রিপ্টেড পেমেন্ট প্রসেসিং</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            বন্ধ করুন (Cancel)
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default CheckoutModal;
