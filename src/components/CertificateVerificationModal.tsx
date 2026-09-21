import React, { useState, useEffect } from 'react';
import { CertificateRecord, LangMode } from '../types';
import { generateQrDataUrl } from '../utils/audioQr';
import { 
  ShieldCheck, 
  Download, 
  CheckCircle2, 
  X, 
  Search, 
  Calendar, 
  Award, 
  Share2, 
  Printer 
} from 'lucide-react';
import html2canvas from 'html2canvas-pro';

interface CertificateVerificationModalProps {
  initialCertId?: string;
  certificates: CertificateRecord[];
  lang: LangMode;
  onClose: () => void;
}

export const CertificateVerificationModal: React.FC<CertificateVerificationModalProps> = ({
  initialCertId = 'DILS-CERT-2026-0048',
  certificates,
  lang,
  onClose
}) => {
  const [certQuery, setCertQuery] = useState<string>(initialCertId);
  const [activeCert, setActiveCert] = useState<CertificateRecord | undefined>(
    certificates.find((c) => c.certificateId.toLowerCase() === initialCertId.toLowerCase()) || certificates[0]
  );
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  useEffect(() => {
    if (activeCert) {
      generateQrDataUrl(activeCert.qrData).then((url) => setQrDataUrl(url));
    }
  }, [activeCert]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = certificates.find(
      (c) => c.certificateId.trim().toLowerCase() === certQuery.trim().toLowerCase()
    );
    setActiveCert(found);
    setDownloadError(null);
  };

  const handleDownloadCertificate = async () => {
    const element = document.getElementById('dils-official-certificate');
    if (!element) return;
    setIsDownloading(true);
    setDownloadError(null);
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      });
      const link = document.createElement('a');
      link.download = `${activeCert?.certificateId || 'DILS_Certificate'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Certificate download error:', err);
      setDownloadError('সার্টিফিকেট ডাউনলোড করতে সাময়িক সমস্যা হয়েছে। স্ক্রিনশট বা রিফ্রেশ করে আবার চেষ্টা করুন।');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto p-4 sm:p-7 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Live Search */}
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>অফিসিয়াল সার্টিফিকেট ভেরিফিকেশন ও অথেন্টিকেশন পোর্টাল</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            পাবলিক সার্টিফিকেট ও কিউআর কোড যাচাইকারী
          </h3>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2 mt-4">
            <input
              type="text"
              value={certQuery}
              onChange={(e) => setCertQuery(e.target.value)}
              placeholder="সার্টিফিকেট নম্বর দিন (e.g. DILS-CERT-2026-0048)"
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition-all"
            >
              <Search className="w-4 h-4" />
              <span>যাচাই করুন</span>
            </button>
          </form>
        </div>

        {/* Verification Status Banner */}
        {activeCert ? (
          <div className="bg-emerald-950/70 border border-emerald-500/60 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-emerald-300 block">AUTHENTIC & ACTIVE VERIFIED CREDENTIAL</span>
                <span className="text-slate-300 font-mono text-[11px]">
                  ID: {activeCert.certificateId} | ইস্যুর তারিখ: {activeCert.issueDate}
                </span>
              </div>
            </div>

            <button
              onClick={handleDownloadCertificate}
              disabled={isDownloading}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'জেনারেট হচ্ছে...' : 'প্রিন্ট / PNG ডাউনলোড'}</span>
            </button>
          </div>
        ) : (
          <div className="bg-rose-950/60 border border-rose-800 rounded-2xl p-5 text-center text-xs text-rose-300">
            এই নম্বরের কোনো সার্টিফিকেট পাওয়া যায়নি। অনুগ্রহ করে সঠিক সার্টিফিকেট নম্বর দিন।
          </div>
        )}

        {downloadError && (
          <div className="bg-amber-950/70 border border-amber-500/80 rounded-xl p-3 text-xs text-amber-200">
            ⚠️ {downloadError}
          </div>
        )}

        {/* The Official DILS Certificate Card (Rendered for view & download) */}
        {activeCert && (
          <div className="border border-slate-700 rounded-2xl p-2 sm:p-4 bg-slate-950 overflow-x-auto">
            
            <div
              id="dils-official-certificate"
              className="min-w-[650px] bg-gradient-to-br from-amber-50/95 via-white to-amber-50/90 text-slate-900 rounded-xl p-8 sm:p-10 border-8 border-double border-amber-600/40 relative shadow-2xl overflow-hidden font-serif select-none"
            >
              {/* Corner Watermarks */}
              <div className="absolute top-4 left-4 text-xs font-mono font-bold text-amber-900/40">DILS-VERIFIED</div>
              <div className="absolute top-4 right-4 text-xs font-mono font-bold text-amber-900/40">{activeCert.certificateId}</div>
              
              {/* Center Background Seal Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <div className="w-96 h-96 rounded-full border-8 border-amber-900 flex items-center justify-center text-8xl font-black">
                  DILS
                </div>
              </div>

              {/* Certificate Header */}
              <div className="text-center space-y-2 relative z-10">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-700 text-white flex items-center justify-center font-black text-xl shadow">
                    DILS
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 font-sans">
                      Dhaka International Language School
                    </h2>
                    <p className="text-xs text-slate-600 font-sans tracking-widest uppercase">
                      Approved Language Training & Visa Center • Farmgate Campus, Dhaka
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <span className="text-xs font-sans uppercase tracking-widest text-amber-800 font-bold bg-amber-100 px-4 py-1 rounded-full border border-amber-300">
                    Certificate of Academic Achievement
                  </span>
                </div>

                <p className="text-xs text-slate-500 italic pt-2">
                  This is to officially certify that
                </p>

                {/* Student Name */}
                <h1 className="text-3xl sm:text-4xl font-extrabold text-red-800 font-sans py-1">
                  {activeCert.studentName}
                </h1>

                <p className="text-xs text-slate-600 max-w-xl mx-auto font-sans leading-relaxed">
                  having successfully satisfied all academic assessments, examinations, and attendance requirements, is hereby awarded this certificate of proficiency in
                </p>

                {/* Course Name & Grade */}
                <div className="py-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
                    {activeCert.courseName}
                  </h3>
                  <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-amber-100 rounded-lg text-xs font-sans text-amber-900 font-bold border border-amber-300">
                    <span>Graduated with: <strong>{activeCert.grade}</strong></span>
                    <span>(GPA: {activeCert.gpa.toFixed(2)} / 4.00)</span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Encrypted QR Code & Signatures */}
              <div className="grid grid-cols-3 items-end pt-8 mt-6 border-t-2 border-amber-700/20 relative z-10">
                
                {/* Signature 1: Senior Instructor */}
                <div className="text-center font-sans text-xs">
                  <div className="h-8 flex items-end justify-center font-serif italic text-slate-700 text-sm font-bold">
                    Tanvir Hasan
                  </div>
                  <div className="border-t border-slate-400 pt-1 font-semibold text-slate-800">
                    {activeCert.instructorName}
                  </div>
                  <div className="text-[10px] text-slate-500">Head of Language Faculty</div>
                </div>

                {/* Center: Live Encrypted QR Code */}
                <div className="flex flex-col items-center justify-center font-sans">
                  {qrDataUrl && (
                    <div className="p-1 bg-white border border-slate-300 rounded-lg shadow-sm">
                      <img src={qrDataUrl} alt="Certificate QR Code" className="w-20 h-20" />
                    </div>
                  )}
                  <span className="text-[9px] font-mono text-slate-500 mt-1">SCAN TO VERIFY</span>
                </div>

                {/* Signature 2: Director Abdur Razzak */}
                <div className="text-center font-sans text-xs">
                  <div className="h-8 flex items-end justify-center font-serif italic text-red-800 text-sm font-bold">
                    Abdur Razzak
                  </div>
                  <div className="border-t border-slate-400 pt-1 font-semibold text-slate-800">
                    {activeCert.directorName}
                  </div>
                  <div className="text-[10px] text-slate-500">Managing Director, DILS</div>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
