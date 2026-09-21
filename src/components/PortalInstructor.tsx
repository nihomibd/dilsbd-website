import React, { useState } from 'react';
import { Course, AttendanceRecord, LangMode } from '../types';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileUp, 
  Send, 
  Award, 
  BookOpen, 
  Check, 
  AlertCircle 
} from 'lucide-react';

interface PortalInstructorProps {
  courses: Course[];
  lang: LangMode;
}

export const PortalInstructor: React.FC<PortalInstructorProps> = ({ courses, lang }) => {
  const [selectedBatch, setSelectedBatch] = useState<string>('b-jp-01');
  const [attendanceDate, setAttendanceDate] = useState<string>('2026-09-19');

  // Attendance roster state
  const [roster, setRoster] = useState<AttendanceRecord[]>([
    { studentId: 'DILS-2026-0048', studentName: 'MD. ABDUR RAZZAK', status: 'present', remarks: 'Active learner' },
    { studentId: 'DILS-2026-0104', studentName: 'Tanvir Kabir Biplob', status: 'present', remarks: 'Good pronunciation' },
    { studentId: 'DILS-2026-0112', studentName: 'Nusrat Jahan Mim', status: 'late', remarks: 'Joined 15m late' },
    { studentId: 'DILS-2026-0118', studentName: 'Shahriar Ahmed Rifat', status: 'present', remarks: 'Quiz score 95%' },
    { studentId: 'DILS-2026-0125', studentName: 'Mehedi Hasan Alvi', status: 'absent', remarks: 'Sick leave requested' }
  ]);

  const [announcementText, setAnnouncementText] = useState<string>('');
  const [announcements, setAnnouncements] = useState<string[]>([
    'আগামী বুধবার অধ্যায় ১ থেকে ১০ পর্যন্ত কাঞ্জি সারপ্রাইজ কুইজ অনুষ্ঠিত হবে। সবাই প্রস্তুতি নিন।',
    'NAT-TEST আবেদনকারীদের রেজিস্ট্রেশন কপি আজকের মধ্যে সাবমিট করার নির্দেশ দেয়া হলো।'
  ]);

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const toggleStatus = (studentId: string, newStatus: 'present' | 'absent' | 'late') => {
    setRoster((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, status: newStatus } : r))
    );
  };

  const handleSaveAttendance = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    setAnnouncements([announcementText.trim(), ...announcements]);
    setAnnouncementText('');
  };

  const presentCount = roster.filter((r) => r.status === 'present').length;
  const lateCount = roster.filter((r) => r.status === 'late').length;
  const absentCount = roster.filter((r) => r.status === 'absent').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* 1. INSTRUCTOR HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-red-500/40 shadow-lg flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" 
              alt="Instructor" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white">Sensei Tanvir Hasan</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
                SENIOR FACULTY
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              JLPT N1 Certified | হেড অব জাপানিজ ল্যাঙ্গুয়েজ ডিপার্টমেন্ট
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              নিয়োজিত ব্যাচ: ৩টি (মোট শিক্ষার্থী: ৭৪ জন)
            </p>
          </div>
        </div>

        {/* Batch Selector */}
        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
          <Calendar className="w-4 h-4 text-red-400" />
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
          >
            <option value="b-jp-01" className="bg-slate-900">Morning Batch N5-A (Farmgate)</option>
            <option value="b-jp-02" className="bg-slate-900">Evening Batch N5-B (Online)</option>
            <option value="b-jp4-01" className="bg-slate-900">Weekend Fast Track N4</option>
          </select>
        </div>
      </div>

      {/* 2. DIGITAL DAILY ATTENDANCE MARKING (Present/Absent/Late) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
              Digital Daily Attendance Roster
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              ডিজিটাল দৈনিক হাজিরা খাতা (Attendance Tracking)
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
            />
            <button
              onClick={handleSaveAttendance}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>সংরক্ষণ করুন</span>
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-950/80 border border-emerald-500 text-emerald-200 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>উপস্থিতি তথ্য কেন্দ্রীয় ডাটাবেসে সফলভাবে সংরক্ষিত হয়েছে!</span>
          </div>
        )}

        {/* Quick Attendance Counters */}
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div className="bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-xl">
            <div className="text-xl font-black text-emerald-400 font-mono">{presentCount}</div>
            <span className="text-slate-400">উপস্থিত (Present)</span>
          </div>
          <div className="bg-amber-950/40 border border-amber-800/60 p-3 rounded-xl">
            <div className="text-xl font-black text-amber-400 font-mono">{lateCount}</div>
            <span className="text-slate-400">বিলম্বে (Late)</span>
          </div>
          <div className="bg-rose-950/40 border border-rose-800/60 p-3 rounded-xl">
            <div className="text-xl font-black text-rose-400 font-mono">{absentCount}</div>
            <span className="text-slate-400">অনুপস্থিত (Absent)</span>
          </div>
        </div>

        {/* Student Roster Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono">
                <th className="py-3 px-2">রোল / Student ID</th>
                <th className="py-3 px-2">শিক্ষার্থীর নাম</th>
                <th className="py-3 px-2 text-center">উপস্থিতি স্ট্যাটাস</th>
                <th className="py-3 px-2">মন্তব্য (Remarks)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {roster.map((student) => (
                <tr key={student.studentId} className="hover:bg-slate-950/40 transition-colors">
                  <td className="py-3 px-2 font-mono font-bold text-red-400">
                    {student.studentId}
                  </td>
                  <td className="py-3 px-2 font-bold text-white">
                    {student.studentName}
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => toggleStatus(student.studentId, 'present')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          student.status === 'present'
                            ? 'bg-emerald-600 text-white shadow'
                            : 'bg-slate-950 text-slate-400 hover:text-white'
                        }`}
                      >
                        P
                      </button>
                      <button
                        onClick={() => toggleStatus(student.studentId, 'late')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          student.status === 'late'
                            ? 'bg-amber-600 text-white shadow'
                            : 'bg-slate-950 text-slate-400 hover:text-white'
                        }`}
                      >
                        L
                      </button>
                      <button
                        onClick={() => toggleStatus(student.studentId, 'absent')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          student.status === 'absent'
                            ? 'bg-rose-600 text-white shadow'
                            : 'bg-slate-950 text-slate-400 hover:text-white'
                        }`}
                      >
                        A
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-slate-400">
                    {student.remarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* 3. ASSIGNMENT CREATION & BATCH ANNOUNCEMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Upload Class Notes & Assignment */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileUp className="w-4 h-4 text-red-400" />
            ক্লাস নোটস, অডিও ও অ্যাসাইনমেন্ট আপলোড
          </h4>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">অ্যাসাইনমেন্ট বা নোটসের শিরোনাম</label>
              <input
                type="text"
                placeholder="e.g. Minna no Nihongo Lesson 5 Te-form Practice Sheet"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white placeholder-slate-500"
              />
            </div>

            <div className="border-2 border-dashed border-slate-700 hover:border-red-500/50 rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-950/40">
              <FileUp className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <div className="text-slate-300 font-bold">PDF ফাইল বা MP3 অডিও ড্রপ করুন</div>
              <p className="text-[11px] text-slate-500 mt-0.5">সর্বোচ্চ ফাইল সাইজ: ২৫ MB</p>
            </div>

            <button
              onClick={() => alert("ফাইল আপলোড প্রক্রিয়া সম্পন্ন হয়েছে!")}
              className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow text-xs transition-transform active:scale-95"
            >
              ব্যাচ শিক্ষার্থীদের জন্য পাবলিশ করুন
            </button>
          </div>
        </div>

        {/* Batch Announcements */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Send className="w-4 h-4 text-emerald-400" />
            ব্যাচ ঘোষণা ও নোটিশ ব্রডকাস্ট (SMS / ইন-অ্যাপ)
          </h4>

          <form onSubmit={handlePostAnnouncement} className="space-y-3">
            <textarea
              rows={3}
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="ব্যাচের সকল শিক্ষার্থীর ড্যাশবোর্ডে ও SMS এ জরুরি নোটিশ পাঠান..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            ></textarea>

            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 ml-auto"
            >
              <Send className="w-3.5 h-3.5" />
              <span>নোটিশ ব্রডকাস্ট করুন</span>
            </button>
          </form>

          <div className="divide-y divide-slate-800 pt-2 space-y-2">
            {announcements.map((text, idx) => (
              <div key={idx} className="pt-2 text-xs text-slate-300">
                <span className="text-[10px] text-slate-500 block mb-0.5">সম্প্রতি পোস্টকৃত নোটিশ:</span>
                {text}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
