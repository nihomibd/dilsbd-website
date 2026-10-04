import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  CreditCard, 
  Send, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  RefreshCw, 
  Sparkles, 
  ShieldAlert, 
  Filter,
  DollarSign,
  Phone,
  MessageCircle,
  Calendar,
  Check
} from 'lucide-react';
import { SaasMetrics, AtRiskStudent } from '../../types';

export const MRRRetentionDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SaasMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'high' | 'pending' | 'contacted'>('all');
  const [sendingReminderId, setSendingReminderId] = useState<string | null>(null);
  const [reminderSuccessInfo, setReminderSuccessInfo] = useState<{ studentName: string; whatsappUrl: string } | null>(null);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/saas-metrics');
      const json = await res.json();
      if (json.success && json.data) {
        setMetrics(json.data);
      }
    } catch (err) {
      console.error('Failed to load SaaS metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleSendWhatsAppReminder = async (student: AtRiskStudent, reminderType: 'inactive' | 'renewal_due' | 'failed_payment') => {
    try {
      setSendingReminderId(student.id);
      const res = await fetch('/api/admin/students/whatsapp-reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: student.id,
          reminderType
        })
      });
      const json = await res.json();
      if (json.success && json.data?.whatsappUrl) {
        // Update local state to contacted
        setMetrics(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            atRiskStudents: prev.atRiskStudents.map(s => 
              s.id === student.id ? { ...s, contactStatus: 'contacted' } : s
            )
          };
        });

        // Open WhatsApp link in new tab
        window.open(json.data.whatsappUrl, '_blank', 'noopener,noreferrer');

        setReminderSuccessInfo({
          studentName: student.name,
          whatsappUrl: json.data.whatsappUrl
        });

        setTimeout(() => setReminderSuccessInfo(null), 5000);
      }
    } catch (err) {
      console.error('Failed to send WhatsApp reminder:', err);
    } finally {
      setSendingReminderId(null);
    }
  };

  const handleToggleContactStatus = async (studentId: string, currentStatus: 'pending' | 'contacted') => {
    const newStatus = currentStatus === 'pending' ? 'contacted' : 'pending';
    try {
      // Optimistic update
      setMetrics(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          atRiskStudents: prev.atRiskStudents.map(s => 
            s.id === studentId ? { ...s, contactStatus: newStatus } : s
          )
        };
      });

      await fetch('/api/admin/students/contact-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          contactStatus: newStatus
        })
      });
    } catch (err) {
      console.error('Failed to toggle contact status:', err);
    }
  };

  if (loading && !metrics) {
    return (
      <div className="flex flex-col items-center justify-center p-16 space-y-3 bg-slate-900/50 border border-slate-800 rounded-3xl">
        <RefreshCw className="w-8 h-8 text-red-500 animate-spin" />
        <span className="text-sm font-mono text-slate-400">মেম্বারশিপ ও এমআরআর অ্যানালিটিক্স লোড হচ্ছে...</span>
      </div>
    );
  }

  const atRiskList = metrics?.atRiskStudents || [];
  const filteredAtRisk = atRiskList.filter(s => {
    if (filterSeverity === 'all') return true;
    if (filterSeverity === 'critical') return s.riskSeverity === 'critical';
    if (filterSeverity === 'high') return s.riskSeverity === 'high';
    if (filterSeverity === 'pending') return s.contactStatus === 'pending';
    if (filterSeverity === 'contacted') return s.contactStatus === 'contacted';
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* 1. Header Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-red-950/40 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-0.5 rounded">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>EXECUTIVE SAAS & RECURRING REVENUE CRM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            মেম্বারশিপ এমআরআর ও রিটেনশন ড্যাশবোর্ড
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl">
            মাসিক পুনরাবৃত্তিমূলক রাজস্ব (MRR), পেইড মেম্বার বৃদ্ধি, এবং ঝুঁকিতে থাকা শিক্ষার্থীদের (At-Risk Students) স্বয়ংক্রিয় হোয়াটসঅ্যাপ ফলো-আপ ব্যবস্থা।
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={fetchMetrics}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2 border border-slate-700"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-red-400' : ''}`} />
            <span>রিফ্রেশ ডেটা</span>
          </button>
        </div>
      </div>

      {/* WhatsApp Toast Notification */}
      <AnimatePresence>
        {reminderSuccessInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-emerald-950 border border-emerald-500/40 rounded-2xl p-4 flex items-center justify-between text-xs text-emerald-200 shadow-xl"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>{reminderSuccessInfo.studentName}</strong>-এর জন্য পার্সোনালাইজড হোয়াটসঅ্যাপ মেসেজ রেডি এবং নতুন উইন্ডোতে ওপেন করা হয়েছে! 📲
              </span>
            </div>
            <a
              href={reminderSuccessInfo.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs underline text-emerald-400 hover:text-white font-mono shrink-0 ml-4 inline-flex items-center gap-1"
            >
              <span>আবার ওপেন করুন</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Top Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Active MRR */}
        <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">মাসিক রাজস্ব (MRR)</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              ৳{(metrics?.totalMRR || 428000).toLocaleString('en-IN')}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-400 font-mono">
              <TrendingUp className="w-3 h-3" />
              <span>+১৮.৪% MoM প্রবৃদ্ধি</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>প্রজেক্টেড ARR:</span>
            <strong className="text-slate-200">৳{(metrics?.projectedARR || 5136000).toLocaleString('en-IN')}</strong>
          </div>
        </div>

        {/* Card 2: Active Paid Members */}
        <div className="bg-slate-900 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">পেইড মেম্বার</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {(metrics?.activePaidMembers || 186)} জন
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-blue-400 font-mono">
              <span>+{(metrics?.newSubscriptionsThisMonth || 24)} নতুন মেম্বার (এই মাসে)</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>ফ্রি ট্রায়াল লার্নার:</span>
            <strong className="text-slate-200">১১৫ জন শিক্ষার্থী</strong>
          </div>
        </div>

        {/* Card 3: Churn & Payment Failures */}
        <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">রিটেনশন ও চার্ন রেট</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
              {metrics?.churnRate || 2.8}%
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-400 font-mono">
              <span>{metrics?.churnCount || 5} চার্নড মেম্বার</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>ব্যর্থ পেমেন্ট (bKash/SSL):</span>
            <strong className="text-rose-400 font-bold">{metrics?.failedPaymentsCount || 4}টি চার্জ</strong>
          </div>
        </div>

        {/* Card 4: At-Risk Students */}
        <div className="bg-slate-900 border border-slate-800 hover:border-red-500/40 rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">ঝুঁকিতে থাকা শিক্ষার্থী</span>
            <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-red-400 font-mono">
              {atRiskList.length} জন
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-red-300 font-mono">
              <span>জরুরি ফলো-আপ প্রয়োজন ⚠️</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>ফলো-আপ বাকি:</span>
            <strong className="text-amber-300">
              {atRiskList.filter(s => s.contactStatus === 'pending').length} জন শিক্ষার্থীর
            </strong>
          </div>
        </div>

      </div>

      {/* 3. Plan Revenue & Member Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-red-500" />
              <span>প্ল্যানভিত্তিক রাজস্ব বণ্টন (Plan Revenue Distribution)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Core, Pro, এবং Career ট্র্যাকের সক্রিয় সদস্য সংখ্যা ও মাসিক আয় বণ্টন
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 font-mono">মাসিক রাজস্ব মোট: </span>
            <strong className="text-base text-emerald-400 font-mono">
              ৳{(metrics?.totalMRR || 428000).toLocaleString('en-IN')} /mo
            </strong>
          </div>
        </div>

        {/* Progress bar breakdown */}
        <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex shadow-inner">
          {metrics?.planBreakdown.map((plan) => {
            if (plan.percentage === 0) return null;
            return (
              <div
                key={plan.planId}
                style={{ width: `${plan.percentage}%`, backgroundColor: plan.color }}
                className="h-full transition-all duration-500"
                title={`${plan.name}: ${plan.percentage}%`}
              />
            );
          })}
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics?.planBreakdown.filter(p => p.planId !== 'free').map((plan) => (
            <div
              key={plan.planId}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: plan.color }}></span>
                  <span>{plan.name}</span>
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  {plan.percentage}% MRR
                </span>
              </div>

              <div>
                <div className="text-xl font-black text-white font-mono">
                  ৳{plan.mrr.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  {plan.count} জন পেইড স্টুডেন্ট
                </div>
              </div>

              <div className="text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-900">
                ফি: {plan.planId === 'core' ? '৳১,৯৯৯/মাস' : plan.planId === 'pro' ? '৳৩,৪৯৯/মাস' : '৳৫,৯৯৯/মাস'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. At-Risk Retention Intervention CRM */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 bg-rose-950/80 border border-rose-800 px-2 py-0.5 rounded">
              <ShieldAlert className="w-3 h-3" />
              <span>RETENTION INTERVENTION COHORT</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              ঝুঁকিতে থাকা শিক্ষার্থীদের রিটেনশন টেবিল (At-Risk Students)
            </h3>
            <p className="text-xs text-slate-400">
              যেসব শিক্ষার্থী বিগত ৫+ দিন অনুপস্থিত অথবা আসন্ন ৭ দিনের মধ্যে রিনিউয়াল রয়েছে, তাদের দ্রুত যোগাযোগ করুন।
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-500 font-mono flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" />
              <span>ফিল্টার:</span>
            </span>

            <button
              onClick={() => setFilterSeverity('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterSeverity === 'all'
                  ? 'bg-red-600 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              সকল ({atRiskList.length})
            </button>

            <button
              onClick={() => setFilterSeverity('critical')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterSeverity === 'critical'
                  ? 'bg-rose-600 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              ক্রিটিক্যাল ({atRiskList.filter(s => s.riskSeverity === 'critical').length})
            </button>

            <button
              onClick={() => setFilterSeverity('pending')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterSeverity === 'pending'
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              বাকি আছে ({atRiskList.filter(s => s.contactStatus === 'pending').length})
            </button>

            <button
              onClick={() => setFilterSeverity('contacted')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterSeverity === 'contacted'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              যোগাযোগকৃত ({atRiskList.filter(s => s.contactStatus === 'contacted').length})
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">শিক্ষার্থী ও আইডি</th>
                <th className="py-3 px-4">প্ল্যান</th>
                <th className="py-3 px-4">নিষ্ক্রিয়তার সময়</th>
                <th className="py-3 px-4">রিনিউয়াল তারিখ</th>
                <th className="py-3 px-4">ঝুঁকির কারণ</th>
                <th className="py-3 px-4">যোগাযোগ অবস্থা</th>
                <th className="py-3 px-4 text-right">অ্যাকশন (WhatsApp)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-900/60 font-sans">
              {filteredAtRisk.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 font-mono">
                    কোনো ঝুঁকিপূর্ণ শিক্ষার্থী পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredAtRisk.map((student) => {
                  const isContacted = student.contactStatus === 'contacted';
                  const isCritical = student.riskSeverity === 'critical';

                  return (
                    <tr key={student.id} className="hover:bg-slate-800/40 transition-colors">
                      
                      {/* Name & ID */}
                      <td className="py-3.5 px-4 font-medium text-white">
                        <div className="font-bold">{student.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                          <span>{student.studentId || student.id}</span>
                          <span>•</span>
                          <span className="text-slate-400">{student.phone}</span>
                        </div>
                      </td>

                      {/* Plan Badge */}
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded inline-block ${
                          student.planId === 'career' 
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : student.planId === 'pro'
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : 'bg-blue-950 text-blue-400 border border-blue-800'
                        }`}>
                          {student.planName}
                        </span>
                      </td>

                      {/* Days Inactive */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 font-mono text-xs">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <strong className="text-amber-300">{student.daysInactive} দিন</strong>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          শেষ অ্যাক্টিভ: {student.lastActiveDate}
                        </span>
                      </td>

                      {/* Renewal Date */}
                      <td className="py-3.5 px-4 font-mono">
                        <div className="flex items-center gap-1 text-slate-200">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{student.renewalDate}</span>
                        </div>
                      </td>

                      {/* Risk Reason */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold inline-block mb-1 ${
                          isCritical
                            ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                            : 'bg-amber-950/80 text-amber-300 border border-amber-800'
                        }`}>
                          {isCritical ? 'CRITICAL RISK' : 'HIGH CHURN RISK'}
                        </span>
                        <div className="text-[11px] text-slate-300 leading-snug">
                          {student.riskReason}
                        </div>
                      </td>

                      {/* Contact Status Toggle */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleContactStatus(student.id, student.contactStatus)}
                          className={`text-[11px] font-mono px-2.5 py-1 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                            isContacted
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white'
                          }`}
                        >
                          {isContacted ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Contacted</span>
                            </>
                          ) : (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                              <span>Pending</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Action: Direct WhatsApp */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          disabled={sendingReminderId === student.id}
                          onClick={() => {
                            const type = student.riskReason.includes('পেমেন্ট') 
                              ? 'failed_payment' 
                              : student.riskReason.includes('রিনিউয়াল') 
                              ? 'renewal_due' 
                              : 'inactive';
                            handleSendWhatsAppReminder(student, type);
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-1.5"
                          title="শিক্ষার্থীকে সরাসরি ব্যক্তিগত হোয়াটসঅ্যাপ বার্তা পাঠান"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp 📲</span>
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};

export default MRRRetentionDashboard;
