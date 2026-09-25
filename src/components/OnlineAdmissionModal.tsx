import React, { useState } from 'react';
import { Course, LangMode, Lead } from '../types';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  PhoneCall, 
  Calendar, 
  BookOpen, 
  GraduationCap,
  Compass,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnlineAdmissionModalProps {
  initialCourseId?: string;
  courses: Course[];
  lang: LangMode;
  onClose: () => void;
  onAdmitted?: (studentName: string, studentId: string, leadData?: Partial<Lead>) => void;
  onGoToStudentPortal?: (courseId: string) => void;
}

export const OnlineAdmissionModal: React.FC<OnlineAdmissionModalProps> = ({
  initialCourseId,
  courses,
  lang,
  onClose,
  onAdmitted,
  onGoToStudentPortal
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId || courses[0]?.id || 'c-jp-n5');
  const [education, setEducation] = useState('HSC Passed');
  const [city, setCity] = useState('Tokyo / Japan');
  const [targetIntake, setTargetIntake] = useState('October 2026 Intake');
  const [submittedData, setSubmittedData] = useState<{ studentId: string; name: string } | null>(null);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const generatedId = `DILS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedData({ studentId: generatedId, name });
    
    if (onAdmitted) {
      onAdmitted(name, generatedId, {
        phone,
        courseInterest: selectedCourse?.title || 'Japanese Language Course',
        education,
        targetIntake,
        city
      });
    }

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedData ? (
          <div>
            <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>অনলাইন ভর্তি ও ফ্রি ভিসা অ্যাসেসমেন্ট</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              ঢাকা ইন্টারন্যাশনাল ল্যাঙ্গুয়েজ স্কুল ভর্তি ফরম
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              ফরম পূরণ করলেই পাচ্ছেন ৫,০০০ টাকা বিশেষ ছাড় ও সরাসরি ফার্মগেট ক্যাম্পাস কনসালটেন্সি।
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs mt-5">
              
              <div>
                <label className="block text-slate-300 font-semibold mb-1">আপনার পূর্ণ নাম *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Md. Tanvir Hasan"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">মোবাইল / WhatsApp নম্বর *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 01712345678"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 font-mono focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">পছন্দের ভাষা কোর্স *</label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-500"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.level})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">শিক্ষাগত যোগ্যতা</label>
                  <select
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="HSC Passed">এইচএসসি (HSC)</option>
                    <option value="Honours / Degree">স্নাতক (Bachelor / Degree)</option>
                    <option value="Masters">মাস্টার্স (Masters)</option>
                    <option value="Diploma in Engineering">ডিপ্লোমা ইন ইঞ্জিনিয়ারিং</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">টার্গেট ইনটেক</label>
                  <select
                    value={targetIntake}
                    onChange={(e) => setTargetIntake(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="October 2026 Intake">অক্টোবর ২০২৬ ইনটেক</option>
                    <option value="April 2027 Intake">এপ্রিল ২০২৭ ইনটেক</option>
                    <option value="July 2027 Intake">জুলাই ২০২৭ ইনটেক</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 text-xs sm:text-sm mt-2 flex items-center justify-center gap-2"
              >
                <span>ভর্তি নিশ্চিত করুন ও রেফারেন্স আইডি নিন</span>
              </button>
            </form>
          </div>
        ) : (
          /* Enrollment Success Confirmation */
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white">অভিনন্দন! ভর্তি সফল হয়েছে</h3>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2 text-xs">
              <div className="text-slate-400">আপনার ইউনিক শিক্ষার্থী আইডি (Student ID):</div>
              <div className="text-2xl font-black text-red-400 font-mono tracking-wider">
                {submittedData.studentId}
              </div>
              <div className="text-slate-300 pt-1">
                নাম: <strong className="text-white">{submittedData.name}</strong>
              </div>
              <div className="text-slate-300">
                কোর্স: <strong className="text-white">{selectedCourse.title}</strong>
              </div>
              <div className="text-emerald-400 text-[11px] pt-2 border-t border-slate-800">
                বিশেষ ছাড় কার্যকর হয়েছে! আমাদের অ্যাডমিশন টিম শীঘ্রই যোগাযোগ করবে।
              </div>
            </div>

            {/* Direct WhatsApp connections for Director & Instructor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <a
                href={`https://wa.me/8801300634046?text=Hello%20Razzak%20Sir!%20My%20Name:%20${encodeURIComponent(
                  submittedData.name
                )}%20Student%20ID:%20${submittedData.studentId}%20Course:%20${encodeURIComponent(
                  selectedCourse.title
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>রাজ্জাক স্যার (পরিচালক) WhatsApp</span>
              </a>

              <a
                href={`https://wa.me/8801755534997?text=Hello%20Tanvir%20Sir!%20My%20Name:%20${encodeURIComponent(
                  submittedData.name
                )}%20Student%20ID:%20${submittedData.studentId}%20Course:%20${encodeURIComponent(
                  selectedCourse.title
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>তানভির স্যার (শিক্ষক) WhatsApp</span>
              </a>
            </div>

            <div className="pt-3 flex flex-col gap-2">
              {onGoToStudentPortal && (
                <button
                  onClick={() => onGoToStudentPortal(selectedCourseId)}
                  className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span>সরাসরি স্টুডেন্ট পোর্টালে প্রবেশ করুন ও জার্নি ট্র্যাক করুন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-white py-1"
              >
                পপআপ বন্ধ করুন
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
