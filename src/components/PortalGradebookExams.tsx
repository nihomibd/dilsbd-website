import React, { useState } from 'react';
import { GradebookEntry, QuizQuestion, LangMode, CertificateRecord } from '../types';
import { 
  Award, 
  BookOpen, 
  Calculator, 
  CheckCircle, 
  HelpCircle, 
  Plus, 
  Search, 
  Sparkles, 
  Sliders, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';

interface PortalGradebookExamsProps {
  gradebook: GradebookEntry[];
  quizQuestions: QuizQuestion[];
  lang: LangMode;
  onOpenValidator: (certId: string) => void;
}

export const PortalGradebookExams: React.FC<PortalGradebookExamsProps> = ({
  gradebook: initialGradebook,
  quizQuestions,
  lang,
  onOpenValidator
}) => {
  const [gradebook, setGradebook] = useState<GradebookEntry[]>(initialGradebook);
  const [activeTab, setActiveTab] = useState<'gradebook' | 'questionBank' | 'calculator'>('gradebook');
  const [searchStudent, setSearchStudent] = useState('');

  // Interactive Live DILS Formula Calculator state
  const [calcAssignments, setCalcAssignments] = useState(90);
  const [calcQuizzes, setCalcQuizzes] = useState(85);
  const [calcAttendance, setCalcAttendance] = useState(95);
  const [calcMidterm, setCalcMidterm] = useState(88);
  const [calcFinal, setCalcFinal] = useState(92);

  // Compute weighted score based on DILS formula:
  // Assignments (20%) + Quizzes (20%) + Attendance (10%) + Midterm (20%) + Final (30%)
  const computeWeightedScore = (a: number, q: number, att: number, m: number, f: number) => {
    const total = (a * 0.20) + (q * 0.20) + (att * 0.10) + (m * 0.20) + (f * 0.30);
    const rounded = Math.round(total * 10) / 10;
    let gpa = 0;
    let letter = 'F';
    let status: 'Pass' | 'Fail' | 'Honors' = 'Pass';

    if (rounded >= 90) {
      gpa = 4.0;
      letter = 'A+';
      status = 'Honors';
    } else if (rounded >= 80) {
      gpa = 3.75;
      letter = 'A';
    } else if (rounded >= 70) {
      gpa = 3.25;
      letter = 'B+';
    } else if (rounded >= 60) {
      gpa = 2.75;
      letter = 'B';
    } else if (rounded >= 50) {
      gpa = 2.0;
      letter = 'Pass';
    } else {
      gpa = 0.0;
      letter = 'Fail';
      status = 'Fail';
    }

    return { total: rounded, gpa, letter, status };
  };

  const calculatedResult = computeWeightedScore(
    calcAssignments,
    calcQuizzes,
    calcAttendance,
    calcMidterm,
    calcFinal
  );

  const filteredGradebook = gradebook.filter(
    (g) =>
      g.studentName.toLowerCase().includes(searchStudent.toLowerCase()) ||
      g.studentId.toLowerCase().includes(searchStudent.toLowerCase()) ||
      g.courseName.toLowerCase().includes(searchStudent.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* 1. HEADER & FORMULA BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
              DILS Academic Standard (Section 8)
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              সেন্ট্রালাইজড গ্রেডবুক ও ওয়েটেড অ্যাসেসমেন্ট অ্যানালিটিক্স
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              স্বয়ংক্রিয় জিপিএ (GPA) ও লেটার গ্রেড ক্যালকুলেশন সিস্টেম
            </p>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('gradebook')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'gradebook' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              সেন্ট্রাল গ্রেডবুক
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'calculator' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              লাইভ ফর্মুলা সিমুলেটর
            </button>
            <button
              onClick={() => setActiveTab('questionBank')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'questionBank' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              প্রশ্ন ব্যাংক পুল ({quizQuestions.length})
            </button>
          </div>
        </div>

        {/* Official DILS Formula Formula Box */}
        <div className="p-4 bg-slate-950 border border-red-900/40 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-300">
            <span className="font-bold text-red-400 block sm:inline mr-2">অফিসিয়াল ওয়েটেড সূত্র:</span>
            <span className="font-mono text-slate-200">
              অ্যাসাইনমেন্ট (২০%) + কুইজ (২০%) + হাজিরা (১০%) + মিডটার্ম (২০%) + ফাইনাল প্রফিশিয়েন্সি পরীক্ষা (৩০%)
            </span>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
            Auto GPA & Grade (A+, A, B, Pass/Fail)
          </span>
        </div>
      </div>

      {/* 2. TAB: CENTRAL GRADEBOOK TABLE */}
      {activeTab === 'gradebook' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              ব্যাচ ও শিক্ষার্থী ভিত্তিক সেন্ট্রাল গ্রেডশীট
            </h3>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                placeholder="শিক্ষার্থী নাম বা আইডি খুঁজুন..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono">
                  <th className="py-3 px-3">শিক্ষার্থী</th>
                  <th className="py-3 px-3">কোর্স ও ব্যাচ</th>
                  <th className="py-3 px-2 text-center">অ্যাসাইনমেন্ট (20%)</th>
                  <th className="py-3 px-2 text-center">কুইজ (20%)</th>
                  <th className="py-3 px-2 text-center">হাজিরা (10%)</th>
                  <th className="py-3 px-2 text-center">মিডটার্ম (20%)</th>
                  <th className="py-3 px-2 text-center">ফাইনাল (30%)</th>
                  <th className="py-3 px-3 text-center">মোট / GPA</th>
                  <th className="py-3 px-3 text-center">সার্টিফিকেট</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredGradebook.map((entry) => {
                  const calc = computeWeightedScore(
                    entry.assignmentsScore,
                    entry.quizzesScore,
                    entry.attendanceRate,
                    entry.midtermScore,
                    entry.finalExamScore
                  );
                  return (
                    <tr key={entry.id} className="hover:bg-slate-950/40 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={entry.photoUrl}
                            alt={entry.studentName}
                            className="w-8 h-8 rounded-full object-cover border border-slate-700"
                          />
                          <div>
                            <strong className="text-white block">{entry.studentName}</strong>
                            <span className="font-mono text-red-400 text-[11px]">{entry.studentId}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-slate-200 block font-semibold">{entry.courseName}</span>
                        <span className="text-[11px] text-slate-500">{entry.batch}</span>
                      </td>
                      <td className="py-3 px-2 text-center font-mono text-slate-300">
                        {entry.assignmentsScore}
                      </td>
                      <td className="py-3 px-2 text-center font-mono text-slate-300">
                        {entry.quizzesScore}
                      </td>
                      <td className="py-3 px-2 text-center font-mono text-slate-300">
                        {entry.attendanceRate}%
                      </td>
                      <td className="py-3 px-2 text-center font-mono text-slate-300">
                        {entry.midtermScore}
                      </td>
                      <td className="py-3 px-2 text-center font-mono text-slate-300">
                        {entry.finalExamScore}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div className="font-mono font-bold text-emerald-400 text-sm">
                          {calc.total}%
                        </div>
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                          {calc.letter} ({calc.gpa.toFixed(2)})
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => onOpenValidator('DILS-CERT-2026-0048')}
                          className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-bold rounded shadow transition-all flex items-center gap-1 mx-auto"
                        >
                          <ShieldCheck className="w-3 h-3" />
                          <span>QR কার্ড</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. TAB: LIVE FORMULA SIMULATOR */}
      {activeTab === 'calculator' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="max-w-xl mx-auto space-y-6">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-white flex items-center justify-center gap-2">
                <Calculator className="w-5 h-5 text-red-400" />
                ইন্টারেক্টিভ ওয়েটেড গ্রেড সিমুলেটর
              </h3>
              <p className="text-xs text-slate-400">
                নিচের স্লাইডারগুলো পরিবর্তন করে সাথে সাথে স্বয়ংক্রিয় জিপিএ ও লেটার গ্রেড রূপান্তর পর্যবেক্ষণ করুন:
              </p>
            </div>

            {/* Sliders */}
            <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs">
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 font-semibold">অ্যাসাইনমেন্ট স্কোর (ওয়েট ২০%):</span>
                  <span className="font-mono text-red-400 font-bold">{calcAssignments} / 100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={calcAssignments}
                  onChange={(e) => setCalcAssignments(Number(e.target.value))}
                  className="w-full accent-red-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 font-semibold">কুইজ পরীক্ষা স্কোর (ওয়েট ২০%):</span>
                  <span className="font-mono text-red-400 font-bold">{calcQuizzes} / 100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={calcQuizzes}
                  onChange={(e) => setCalcQuizzes(Number(e.target.value))}
                  className="w-full accent-red-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 font-semibold">ক্লাস উপস্থিতি রেট (ওয়েট ১০%):</span>
                  <span className="font-mono text-emerald-400 font-bold">{calcAttendance}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={calcAttendance}
                  onChange={(e) => setCalcAttendance(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 font-semibold">মিডটার্ম এক্সাম স্কোর (ওয়েট ২০%):</span>
                  <span className="font-mono text-amber-400 font-bold">{calcMidterm} / 100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={calcMidterm}
                  onChange={(e) => setCalcMidterm(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 font-semibold">ফাইনাল ল্যাঙ্গুয়েজ প্রফিশিয়েন্সি এক্সাম (ওয়েট ৩০%):</span>
                  <span className="font-mono text-blue-400 font-bold">{calcFinal} / 100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={calcFinal}
                  onChange={(e) => setCalcFinal(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

            </div>

            {/* Calculated Result Output Box */}
            <div className="bg-gradient-to-br from-red-950/80 via-slate-950 to-slate-900 border border-red-800/80 rounded-2xl p-6 text-center space-y-2 shadow-xl">
              <div className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                DILS OFFICIAL CALCULATED RESULT
              </div>
              <div className="text-4xl sm:text-5xl font-black text-white font-mono">
                {calculatedResult.total}%
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <span className="text-lg font-bold text-amber-300">
                  গ্রেড: <strong className="text-xl font-mono">{calculatedResult.letter}</strong>
                </span>
                <span className="text-slate-400">|</span>
                <span className="text-lg font-bold text-emerald-400">
                  GPA: <strong className="text-xl font-mono">{calculatedResult.gpa.toFixed(2)}</strong> / 4.00
                </span>
              </div>
              <p className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                স্ট্যাটাস: <strong className="text-emerald-400">{calculatedResult.status}</strong>
              </p>
            </div>

          </div>
        </div>
      )}

      {/* 4. TAB: QUESTION BANK POOL */}
      {activeTab === 'questionBank' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-red-400" />
                সেন্ট্রাল প্রশ্ন ব্যাংক ও পুল (Central Question Bank)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                কোর্স, লেভেল (JLPT N5, N4, N3, NAT-TEST, SSW) ও টপিক ভিত্তিক পুনর্ব্যবহারযোগ্য প্রশ্নমালা
              </p>
            </div>

            <button
              onClick={() => alert("র্যান্ডম এক্সাম প্রশ্নপত্র সফলভাবে জেনারেট হয়েছে!")}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>১-ক্লিকে র্যান্ডম এক্সাম জেনারেট</span>
            </button>
          </div>

          <div className="space-y-3">
            {quizQuestions.map((q, idx) => (
              <div key={q.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-red-400 font-bold">
                    প্রশ্ন {idx + 1} ({q.type.toUpperCase()})
                  </span>
                  <span className="font-mono text-slate-400">{q.marks} মার্কস</span>
                </div>

                <p className="text-white font-semibold text-sm">
                  {q.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={`p-2 rounded-lg ${
                        oIdx === q.correctIndex
                          ? 'bg-emerald-950/60 border border-emerald-700 text-emerald-300 font-bold'
                          : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      {opt} {oIdx === q.correctIndex && '✓ (সঠিক উত্তর)'}
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-slate-500 pt-1">
                  ব্যাখ্যা: {q.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
