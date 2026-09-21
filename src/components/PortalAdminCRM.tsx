import React, { useState } from 'react';
import { Lead, Invoice, Course, LangMode } from '../types';
import { 
  Building2, 
  Users, 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  Plus, 
  DollarSign, 
  Search, 
  PhoneCall, 
  Sparkles, 
  ChevronRight,
  Shield,
  IdCard,
  Download,
  RotateCw,
  Upload
} from 'lucide-react';
import html2canvas from 'html2canvas-pro';

interface PortalAdminCRMProps {
  leads: Lead[];
  invoices: Invoice[];
  courses: Course[];
  lang: LangMode;
}

export const PortalAdminCRM: React.FC<PortalAdminCRMProps> = ({
  leads: initialLeads,
  invoices: initialInvoices,
  courses,
  lang
}) => {
  const [activeTab, setActiveTab] = useState<'crm' | 'finance' | 'batches' | 'idStudio'>('crm');
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);

  // Quick new lead state
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadCourse, setNewLeadCourse] = useState('Japanese JLPT N5 (Student Visa)');
  const [leadSuccessMsg, setLeadSuccessMsg] = useState<string | null>(null);

  // PVC ID Card Studio state
  const [cardRole, setCardRole] = useState<'Student' | 'Instructor' | 'Director' | 'Staff'>('Director');
  const [cardName, setCardName] = useState('MD. ABDUR RAZZAK');
  const [cardId, setCardId] = useState('DILS-DIR-2026-001');
  const [cardBlood, setCardBlood] = useState('B+');
  const [cardDept, setCardDept] = useState('Japanese Language & Visa Administration');
  const [cardPhoto, setCardPhoto] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80');
  const [isFlipped, setIsFlipped] = useState(false);

  // Financial summary
  const totalRevenue = invoices.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalCollected = invoices.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalDue = invoices.reduce((acc, curr) => acc + curr.dueAmount, 0);

  // Move lead stage
  const updateLeadStage = (leadId: string, newStage: 'new' | 'counseling' | 'enrolled') => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l))
    );
  };

  // Convert lead to enrolled student
  const handleEnrollLead = (lead: Lead) => {
    const generatedStudentId = `DILS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setLeads((prev) =>
      prev.map((l) =>
        l.id === lead.id
          ? {
              ...l,
              stage: 'enrolled',
              notes: [...l.notes, `অফিসিয়াল ভর্তি সম্পন্ন। Student ID: ${generatedStudentId} বরাদ্দ করা হয়েছে।`]
            }
          : l
      )
    );
    setLeadSuccessMsg(`শিক্ষার্থী সফলভাবে ভর্তি করা হয়েছে! ইউনিক স্টুডেন্ট আইডি: ${generatedStudentId}`);
    setTimeout(() => setLeadSuccessMsg(null), 4000);
  };

  const handleAddNewLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadPhone) return;
    const newEntry: Lead = {
      id: `lead-${Date.now()}`,
      name: newLeadName,
      phone: newLeadPhone,
      courseInterest: newLeadCourse,
      city: 'Dhaka',
      education: 'HSC / Degree',
      targetIntake: 'Next Intake 2026/2027',
      stage: 'new',
      assignedCounselor: 'Jannat Ara Akhi',
      createdAt: 'Just now',
      nextFollowUp: 'Tomorrow',
      notes: ['সরাসরি ওয়েব লিড থেকে যুক্ত করা হয়েছে।']
    };
    setLeads([newEntry, ...leads]);
    setNewLeadName('');
    setNewLeadPhone('');
    setLeadSuccessMsg('নতুন লিড CRM পাইপলাইনে যুক্ত করা হয়েছে!');
    setTimeout(() => setLeadSuccessMsg(null), 3000);
  };

  // Handle ID Card Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCardPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Download ID Card side
  const downloadCardSide = async (side: 'front' | 'back') => {
    const targetElement = document.getElementById(side === 'front' ? 'id-card-front' : 'id-card-back');
    if (!targetElement) return;
    try {
      const canvas = await html2canvas(targetElement, {
        scale: 3,
        backgroundColor: null
      });
      const link = document.createElement('a');
      link.download = `DILS_PVC_Card_${cardName.replace(/\s+/g, '_')}_${side.toUpperCase()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('ID Card download error:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* 1. ADMIN HUB HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
              Central Admin Control Hub & CRM
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              অ্যাডমিশন সিআরএম, ফিন্যান্স ও ইনস্টিটিউট ম্যানেজমেন্ট
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              ঢাকা ইন্টারন্যাশনাল ল্যাঙ্গুয়েজ স্কুল — সুপার অ্যাডমিন কন্ট্রোল প্যানেল
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('crm')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'crm' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              লিড CRM পাইপলাইন
            </button>
            <button
              onClick={() => setActiveTab('finance')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'finance' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              ফি ও ইনভয়েস
            </button>
            <button
              onClick={() => setActiveTab('batches')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'batches' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              ব্যাচ শিডিউলার
            </button>
            <button
              onClick={() => setActiveTab('idStudio')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'idStudio' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              স্মার্ট PVC আইডি স্টুডিও
            </button>
          </div>
        </div>

        {/* Global Financial & Lead Metric Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">মোট সম্ভাব্য লিড</span>
            <div className="text-xl font-black text-white font-mono">{leads.length} জন</div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">মোট আদায়কৃত ফি</span>
            <div className="text-xl font-black text-emerald-400 font-mono">৳{totalCollected.toLocaleString()}</div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">বকেয়া ফি (Due)</span>
            <div className="text-xl font-black text-amber-400 font-mono">৳{totalDue.toLocaleString()}</div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">সক্রিয় ব্যাচ</span>
            <div className="text-xl font-black text-red-400 font-mono">৬টি ব্যাচ</div>
          </div>
        </div>
      </div>

      {leadSuccessMsg && (
        <div className="bg-emerald-950/80 border border-emerald-500 text-emerald-200 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{leadSuccessMsg}</span>
        </div>
      )}

      {/* 2. TAB: LEAD CRM PIPELINE (New -> Counseling -> Enrolled) */}
      {activeTab === 'crm' && (
        <div className="space-y-6">
          
          {/* Quick Add Lead Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-red-400" />
              নতুন ভর্তি লিড ইনপুট করুন (Add Lead to Pipeline)
            </h4>

            <form onSubmit={handleAddNewLead} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <input
                type="text"
                value={newLeadName}
                onChange={(e) => setNewLeadName(e.target.value)}
                placeholder="প্রার্থীর নাম (e.g. Asif Mahmud)"
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500"
                required
              />
              <input
                type="text"
                value={newLeadPhone}
                onChange={(e) => setNewLeadPhone(e.target.value)}
                placeholder="মোবাইল নম্বর (e.g. 017xxxxxxxx)"
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 font-mono"
                required
              />
              <select
                value={newLeadCourse}
                onChange={(e) => setNewLeadCourse(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
              >
                <option value="Japanese JLPT N5 (Student Visa)">Japanese JLPT N5 (Student Visa)</option>
                <option value="Japanese JLPT N4 (SSW Work Visa)">Japanese JLPT N4 (SSW Work Visa)</option>
                <option value="Japanese JLPT N3 (Career & Engineering)">Japanese JLPT N3 (Career & Engineering)</option>
                <option value="Spoken Japanese & Embassy Interview">Spoken Japanese & Embassy Interview</option>
              </select>
              <button
                type="submit"
                className="py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow text-xs transition-transform active:scale-95"
              >
                + পাইপলাইনে যুক্ত করুন
              </button>
            </form>
          </div>

          {/* CRM 3-Stage Pipeline Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Stage 1: New Leads */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  নতুন লিড (New Inquiries)
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded">
                  {leads.filter((l) => l.stage === 'new').length}
                </span>
              </div>

              <div className="space-y-3">
                {leads
                  .filter((l) => l.stage === 'new')
                  .map((lead) => (
                    <div key={lead.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-white text-sm">{lead.name}</strong>
                        <span className="text-[10px] text-slate-500">{lead.createdAt}</span>
                      </div>

                      <div className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
                        <PhoneCall className="w-3 h-3" />
                        {lead.phone}
                      </div>

                      <div className="text-slate-300 text-[11px] bg-slate-900 p-2 rounded">
                        কোর্স: <strong className="text-amber-400">{lead.courseInterest}</strong>
                      </div>

                      <div className="flex justify-end gap-1.5 pt-2 border-t border-slate-900">
                        <button
                          onClick={() => updateLeadStage(lead.id, 'counseling')}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded text-[11px] flex items-center gap-1"
                        >
                          <span>কাউন্সেলিং এ নিন</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Stage 2: In Counseling */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  কাউন্সেলিং চলছে (Counseling)
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded">
                  {leads.filter((l) => l.stage === 'counseling').length}
                </span>
              </div>

              <div className="space-y-3">
                {leads
                  .filter((l) => l.stage === 'counseling')
                  .map((lead) => (
                    <div key={lead.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-white text-sm">{lead.name}</strong>
                        <span className="text-[10px] text-amber-400">ফলোআপ: {lead.nextFollowUp}</span>
                      </div>

                      <div className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
                        <PhoneCall className="w-3 h-3" />
                        {lead.phone}
                      </div>

                      <p className="text-[11px] text-slate-400 italic">
                        "{lead.notes[lead.notes.length - 1]}"
                      </p>

                      <div className="flex justify-between items-center gap-1.5 pt-2 border-t border-slate-900">
                        <span className="text-[10px] text-slate-500">কাউন্সেলর: {lead.assignedCounselor}</span>
                        <button
                          onClick={() => handleEnrollLead(lead)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-[11px] flex items-center gap-1 shadow"
                        >
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          <span>ভর্তি নিশ্চিত করুন</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Stage 3: Enrolled Students */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  ভর্তি সম্পন্ন (Enrolled)
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-950 px-2 py-0.5 rounded">
                  {leads.filter((l) => l.stage === 'enrolled').length}
                </span>
              </div>

              <div className="space-y-3">
                {leads
                  .filter((l) => l.stage === 'enrolled')
                  .map((lead) => (
                    <div key={lead.id} className="bg-slate-950 border border-emerald-900/50 rounded-xl p-3.5 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-white text-sm">{lead.name}</strong>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                          ভর্তি সম্পন্ন
                        </span>
                      </div>

                      <div className="text-slate-300 text-[11px]">
                        কোর্স: <strong>{lead.courseInterest}</strong>
                      </div>

                      <div className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded">
                        {lead.notes[lead.notes.length - 1]}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 3. TAB: FINANCE & INVOICES */}
      {activeTab === 'finance' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-red-400" />
                কোর্স ফি ইনভয়েস, কিস্তি ও আয়-ব্যয় রেকর্ড
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                bKash, Nagad ও ব্যাংক গেটওয়ের স্বয়ংক্রিয় রিকনসিলিয়েশন ও রসিদ
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono">
                  <th className="py-3 px-3">ইনভয়েস নং</th>
                  <th className="py-3 px-3">শিক্ষার্থীর নাম</th>
                  <th className="py-3 px-3">কোর্স</th>
                  <th className="py-3 px-3 text-right">মোট ফি</th>
                  <th className="py-3 px-3 text-right">আদায়</th>
                  <th className="py-3 px-3 text-right">বকেয়া (Due)</th>
                  <th className="py-3 px-3 text-center">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-950/40">
                    <td className="py-3 px-3 font-mono font-bold text-red-400">
                      {inv.invoiceNo}
                    </td>
                    <td className="py-3 px-3 font-bold text-white">
                      {inv.studentName}
                      <span className="text-[10px] text-slate-500 block font-mono">{inv.studentId}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      {inv.courseName}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-white">
                      ৳{inv.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">
                      ৳{inv.paidAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-amber-400">
                      ৳{inv.dueAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        inv.status === 'paid' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}>
                        {inv.status === 'paid' ? 'পরিশোধিত' : 'আংশিক বাকি'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. TAB: BATCH & COHORT SCHEDULER */}
      {activeTab === 'batches' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-400" />
              ক্যাম্পাস ও অনলাইন ব্যাচ শিডিউলার (Farmgate Campus)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.flatMap((c) => c.batches).map((batch) => (
              <div key={batch.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-white text-sm">{batch.name}</strong>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {batch.seatsLeft} সিট বাকি
                  </span>
                </div>
                <div className="text-slate-400">
                  দিন: <strong className="text-slate-200">{batch.days}</strong> | সময়: <strong className="text-slate-200">{batch.time}</strong>
                </div>
                <div className="text-slate-500">
                  রুম / প্ল্যাটফর্ম: <span className="text-red-400 font-mono">{batch.room}</span> | শুরুর তারিখ: {batch.startDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. TAB: SMART PVC ID STUDIO (Integrated 3D Card Generator) */}
      {activeTab === 'idStudio' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h3 className="text-xl font-black text-white flex items-center justify-center gap-2">
              <IdCard className="w-6 h-6 text-red-400" />
              স্মার্ট পিভিসি (PVC) স্টুডেন্ট ও স্টাফ আইডি স্টুডিও
            </h3>
            <p className="text-xs text-slate-400">
              রিয়েল-টাইম ছবি আপলোড, কিউআর কোড জেনারেশন এবং প্রিন্ট-রেডি পিএনজি ডাউনলোড
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Controls */}
            <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">কার্ড টাইপ / রোল</label>
                <select
                  value={cardRole}
                  onChange={(e) => setCardRole(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Director">পরিচালক (Director)</option>
                  <option value="Student">শিক্ষার্থী (Student)</option>
                  <option value="Instructor">শিক্ষক (Instructor)</option>
                  <option value="Staff">কর্মকর্তা (Staff)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">নাম</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">আইডি নম্বর</label>
                  <input
                    type="text"
                    value={cardId}
                    onChange={(e) => setCardId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">রক্তের গ্রুপ</label>
                  <input
                    type="text"
                    value={cardBlood}
                    onChange={(e) => setCardBlood(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">বিভাগ / কোর্স</label>
                <input
                  type="text"
                  value={cardDept}
                  onChange={(e) => setCardDept(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">ছবি পরিবর্তন করুন</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-500 cursor-pointer"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>কার্ড উল্টান ({isFlipped ? 'সামনে' : 'পেছনে'})</span>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive 3D PVC Card Preview */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-4">
              
              {/* The PVC Card Front */}
              <div
                id="id-card-front"
                className={`w-72 sm:w-80 h-[460px] bg-gradient-to-b from-slate-950 via-slate-900 to-black rounded-3xl p-5 border-2 border-red-500/40 shadow-2xl relative flex flex-col justify-between overflow-hidden ${
                  isFlipped ? 'hidden' : 'block'
                }`}
              >
                {/* Holographic header stripe */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-amber-400 to-rose-600"></div>

                {/* Header with DILS Brand */}
                <div className="text-center pt-2">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-xs">
                      DILS
                    </div>
                    <span className="font-extrabold text-white text-sm tracking-tight">DILS DHAKA</span>
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Dhaka International Language School
                  </div>
                </div>

                {/* Photo & Badge */}
                <div className="flex flex-col items-center my-auto">
                  <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-red-500 shadow-xl mb-3">
                    <img src={cardPhoto} alt={cardName} className="w-full h-full object-cover" />
                  </div>

                  <span className="px-3 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider bg-red-950 text-red-400 border border-red-800">
                    {cardRole}
                  </span>

                  <h4 className="text-base font-black text-white mt-1 text-center">{cardName}</h4>
                  <p className="text-[11px] text-slate-400 text-center">{cardDept}</p>
                </div>

                {/* Card Footer Details */}
                <div className="bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">ID NO:</span>
                    <strong className="text-red-400 font-mono">{cardId}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">BLOOD GRP:</span>
                    <strong className="text-white font-mono">{cardBlood}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">CAMPUS:</span>
                    <strong className="text-slate-200">FARMGATE, DHAKA</strong>
                  </div>
                </div>
              </div>

              {/* The PVC Card Back */}
              <div
                id="id-card-back"
                className={`w-72 sm:w-80 h-[460px] bg-gradient-to-b from-slate-950 via-slate-900 to-black rounded-3xl p-5 border-2 border-red-500/40 shadow-2xl relative flex flex-col justify-between overflow-hidden ${
                  isFlipped ? 'block' : 'hidden'
                }`}
              >
                <div className="text-center pt-2">
                  <div className="text-xs font-bold text-white">TERMS & CONDITIONS</div>
                  <div className="text-[9px] text-slate-400 mt-1 leading-tight">
                    This card is non-transferable property of Dhaka International Language School & Visa Center. If found, please return to Farmgate Campus.
                  </div>
                </div>

                {/* Simulated Barcode & Security Strip */}
                <div className="my-auto space-y-4 text-center">
                  <div className="h-10 bg-black rounded flex items-center justify-center text-white font-mono text-[10px] tracking-widest border border-slate-800">
                    ||| | |||| | ||||| || |||||| | |||
                  </div>

                  <div className="text-[10px] text-slate-400">
                    <div>হটলাইন: +880 1764-395945</div>
                    <div>৭ম তলা, বিটিআই সেন্ট্রাল প্লাজা, ফার্মগেট, ঢাকা</div>
                  </div>
                </div>

                {/* Signature */}
                <div className="pt-2 border-t border-slate-800 flex justify-between items-end text-[10px] text-slate-400">
                  <div>AUTHORIZED ISSUER</div>
                  <div className="font-serif italic text-white font-bold text-xs">Abdur Razzak</div>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => downloadCardSide('front')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>সামনের দিক ডাউনলোড (PNG)</span>
                </button>
                <button
                  onClick={() => downloadCardSide('back')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>পেছনের দিক ডাউনলোড (PNG)</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
