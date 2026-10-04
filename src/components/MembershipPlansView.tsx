import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Flame, 
  Award, 
  HelpCircle,
  Zap,
  Globe2
} from 'lucide-react';
import { MEMBERSHIP_PLANS, getPlanById } from '../data/membershipPlans';
import { MembershipPlan, BillingCycle, UserSubscription } from '../types';
import { CheckoutModal } from './payment/CheckoutModal';

interface MembershipPlansViewProps {
  onBack: () => void;
  onSelectPlan?: (planId: string) => void;
  currentSubscription?: UserSubscription | null;
  onSubscriptionUpdated?: (subscription: UserSubscription) => void;
}

export const MembershipPlansView: React.FC<MembershipPlansViewProps> = ({
  onBack,
  currentSubscription,
  onSubscriptionUpdated
}) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<MembershipPlan | null>(null);

  const handleOpenCheckout = (plan: MembershipPlan) => {
    if (plan.id === 'free') {
      alert('আপনি বর্তমানে স্টার্টার ফ্রি প্ল্যানে অ্যাক্সেস করতে পারেন।');
      return;
    }
    setSelectedPlanForCheckout(plan);
  };

  const handleCheckoutSuccess = (sub: UserSubscription) => {
    if (onSubscriptionUpdated) {
      onSubscriptionUpdated(sub);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer py-1.5 px-2.5 rounded-lg hover:bg-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ফিরে যান (Back)</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-xs font-bold text-white tracking-wide font-mono uppercase">
              DILS Membership Plans 💳
            </span>
          </div>

          <div className="text-xs font-mono text-slate-400">
            {currentSubscription ? `Active: ${currentSubscription.planName}` : 'All Plans'}
          </div>
        </div>
      </header>

      {/* Hero Headline & Toggle */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-widest bg-red-950/60 border border-red-800/80 px-3.5 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>জাপানি ভাষা ও ভিসা প্রস্তুতির আধুনিক মেম্বারশিপ</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          একটি মেম্বারশিপে আপনার স্বপ্নের <span className="text-red-500">জাপান যাত্রা</span> নিশ্চিত করুন
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          প্রতিদিনের ৫-মিনিটের ইন্টারেক্টিভ লুপ, লাইভ স্পিকিং ক্লাব, এআই টিউটর এবং ১০০% বিশ্বস্ত ভিসা পেপারওয়ার্ক সাপোর্ট।
        </p>

        {/* Monthly / Yearly Billing Toggle */}
        <div className="pt-4 flex items-center justify-center">
          <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-1 shadow-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              মাসিক (Monthly)
            </button>

            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                billingCycle === 'yearly' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>বার্ষিক (Yearly)</span>
              <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-md font-mono">
                ~১৭% ছাড়
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEMBERSHIP_PLANS.map((plan) => {
            const isPopular = plan.isPopular;
            const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
            const monthlyEquivalent = billingCycle === 'yearly' ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice;
            const isCurrent = currentSubscription?.planId === plan.id;

            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -5 }}
                className={`rounded-3xl p-6 flex flex-col justify-between transition-all relative ${
                  isPopular 
                    ? 'bg-gradient-to-b from-slate-900 to-red-950/60 border-2 border-red-500 shadow-2xl shadow-red-900/30' 
                    : 'bg-slate-900 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popular or Custom Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{plan.descriptionBn}</p>
                  </div>

                  {/* Price */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white font-mono">
                        {price === 0 ? '৳০' : `৳${price.toLocaleString()}`}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        /{billingCycle === 'yearly' ? 'বছর' : 'মাস'}
                      </span>
                    </div>

                    {billingCycle === 'yearly' && price > 0 && (
                      <div className="text-[11px] text-amber-400 font-mono mt-0.5">
                        ৳{monthlyEquivalent.toLocaleString()}/মাস হিসেবে সাশ্রয়ী
                      </div>
                    )}
                  </div>

                  {/* Feature List */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                      অন্তর্ভুক্ত সুবিধাসমূহ:
                    </span>
                    {plan.featuresBn.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-8">
                  {isCurrent ? (
                    <button
                      disabled
                      className="w-full py-3 rounded-xl bg-slate-800 text-slate-400 font-bold text-xs cursor-default flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>আপনার বর্তমান প্ল্যান</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenCheckout(plan)}
                      className={`w-full py-3 rounded-xl font-bold text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 ${
                        isPopular
                          ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30'
                          : 'bg-slate-800 hover:bg-slate-700 text-white'
                      }`}
                    >
                      <span>{plan.id === 'free' ? 'ফ্রি শুরু করুন' : 'প্ল্যান বেছে নিন (Subscribe)'}</span>
                    </button>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FAQ & Trust Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">মেম্বারশিপ ও পেমেন্ট সম্পর্কিত প্রশ্ন</h2>
          <p className="text-xs text-slate-400">আপনার যেকোনো জিজ্ঞাসা ও স্বচ্ছ পলিসি</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1.5">
            <strong className="text-xs text-white block">bKash Subscription কীভাবে কাজ করে?</strong>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              বিকাশ অটো-রিনিউ দিয়ে একবার অনুমোদন দিলে প্রতি মাসে স্বয়ংক্রিয়ভাবে নবায়ন হবে। বিকাশ অ্যাপের সাবস্ক্রিপশন মেনু বা আপনার স্টুডেন্ট পোর্টাল থেকে যেকোনো মুহূর্তে এক ক্লিকেই বাতিল করা যায়।
            </p>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1.5">
            <strong className="text-xs text-white block">SSLCOMMERZ দিয়ে কী কী পেমেন্ট নেওয়া যায়?</strong>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              বাংলাদেশের যেকোনো ব্যাংক কার্ড (Visa, Mastercard, Amex), নগদ, রকেট এবং ইন্টারনেট ব্যাংকিংয়ের মাধ্যমে নিরাপদে পরিশোধ করা যায়।
            </p>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1.5">
            <strong className="text-xs text-white block">প্ল্যান আপগ্রেড বা পরিবর্তন করা যাবে?</strong>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              হ্যাঁ, Core থেকে Pro বা Career ট্র্যাকে যেকোনো সময় আপগ্রেড করা যায়। অব্যবহৃত দিনের ব্যালেন্স স্বয়ংক্রিয়ভাবে সমন্বয় হবে।
            </p>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1.5">
            <strong className="text-xs text-white block">ভিসা প্রক্রিয়াকরণে কী ধরণের সহযোগিতা পাবো?</strong>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Pro এবং Career ট্র্যাকের শিক্ষার্থীরা সরাসরি জাপান ইমিগ্রেশনের সিওই (COE) ডকুমেন্ট অডিট এবং অভিজ্ঞ কাউন্সেলরের ব্যক্তিগত ভিসা নির্দেশনা পান।
            </p>
          </div>
        </div>
      </section>

      {/* Active Checkout Modal */}
      {selectedPlanForCheckout && (
        <CheckoutModal
          plan={selectedPlanForCheckout}
          initialCycle={billingCycle}
          onClose={() => setSelectedPlanForCheckout(null)}
          onSuccess={handleCheckoutSuccess}
        />
      )}

    </div>
  );
};

export default MembershipPlansView;
