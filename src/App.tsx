import React, { useState } from 'react';
import { PortalMode, LangMode } from './types';
import { Header } from './components/Header';
import { PortalWebsite } from './components/PortalWebsite';
import { PortalStudent } from './components/PortalStudent';
import { PortalInstructor } from './components/PortalInstructor';
import { PortalGradebookExams } from './components/PortalGradebookExams';
import { PortalAdminCRM } from './components/PortalAdminCRM';
import { CertificateVerificationModal } from './components/CertificateVerificationModal';
import { OnlineAdmissionModal } from './components/OnlineAdmissionModal';
import { FloatingContactWidget } from './components/FloatingContactWidget';
import { 
  INITIAL_COURSES, 
  INITIAL_LESSONS, 
  INITIAL_QUIZ_QUESTIONS, 
  INITIAL_GRADEBOOK, 
  INITIAL_CERTIFICATES, 
  INITIAL_LEADS, 
  INITIAL_INVOICES, 
  INITIAL_TRAINERS, 
  NOTICES,
  DILS_INFO
} from './data/mockData';

export default function App() {
  const [currentPortal, setCurrentPortal] = useState<PortalMode>('website');
  const [lang, setLang] = useState<LangMode>('jp');
  
  // Modals
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [selectedAdmissionCourseId, setSelectedAdmissionCourseId] = useState<string | undefined>();
  const [isValidatorOpen, setIsValidatorOpen] = useState(false);
  const [validatorCertId, setValidatorCertId] = useState<string>('DILS-CERT-2026-0048');

  // Shared state
  const [courses] = useState(INITIAL_COURSES);
  const [lessons] = useState(INITIAL_LESSONS);
  const [quizQuestions] = useState(INITIAL_QUIZ_QUESTIONS);
  const [gradebook] = useState(INITIAL_GRADEBOOK);
  const [certificates] = useState(INITIAL_CERTIFICATES);
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [invoices] = useState(INITIAL_INVOICES);
  const [trainers] = useState(INITIAL_TRAINERS);
  const [notices] = useState(NOTICES);

  const handleOpenAdmission = (courseId?: string) => {
    setSelectedAdmissionCourseId(courseId);
    setIsAdmissionOpen(true);
  };

  const handleOpenValidator = (certId?: string) => {
    if (certId) setValidatorCertId(certId);
    setIsValidatorOpen(true);
  };

  const handleSwitchToStudentPortal = (courseId: string) => {
    setCurrentPortal('student');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-red-600 selection:text-white flex flex-col justify-between">
      
      {/* 1. TOP HEADER & PORTAL NAVIGATION (Rendered on LMS Portals: Student, Instructor, Gradebook, CRM) */}
      {currentPortal !== 'website' && (
        <Header
          currentPortal={currentPortal}
          onSelectPortal={(p) => {
            setCurrentPortal(p);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          lang={lang}
          onSelectLang={setLang}
          onOpenAdmission={() => handleOpenAdmission()}
          onOpenValidator={() => handleOpenValidator('DILS-CERT-2026-0048')}
        />
      )}

      {/* 2. PORTAL BODY VIEWPORT */}
      <main className="flex-1">
        {currentPortal === 'website' && (
          <PortalWebsite
            courses={courses}
            trainers={trainers}
            notices={notices}
            lang={lang}
            onOpenAdmission={handleOpenAdmission}
            onOpenValidator={handleOpenValidator}
            onSwitchToStudentPortal={handleSwitchToStudentPortal}
            onSelectPortal={(p) => {
              setCurrentPortal(p);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPortal === 'student' && (
          <PortalStudent
            courses={courses}
            lessons={lessons}
            quizQuestions={quizQuestions}
            invoices={invoices}
            certificates={certificates}
            lang={lang}
            onOpenValidator={handleOpenValidator}
          />
        )}

        {currentPortal === 'instructor' && (
          <PortalInstructor
            courses={courses}
            lang={lang}
          />
        )}

        {currentPortal === 'gradebook' && (
          <PortalGradebookExams
            gradebook={gradebook}
            quizQuestions={quizQuestions}
            lang={lang}
            onOpenValidator={handleOpenValidator}
          />
        )}

        {currentPortal === 'admin' && (
          <PortalAdminCRM
            leads={leads}
            invoices={invoices}
            courses={courses}
            lang={lang}
          />
        )}
      </main>

      {/* 3. FOOTER (Shown for management and student portals; landing page has its own dedicated institutional footer) */}
      {currentPortal !== 'website' && (
        <footer className="border-t border-slate-900 bg-slate-950 text-xs text-slate-500 py-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-slate-900 text-xs">
              <div>
                <span className="text-white font-bold text-sm block mb-1">
                  Dhaka International Language School & Visa Center (DILS)
                </span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {DILS_INFO.address}
                </p>
                <div className="mt-2 text-[11px] text-slate-400">
                  অফিসিয়াল ওয়েবসাইট: <a href="https://www.dilsbd.com" target="_blank" rel="noreferrer" className="text-white hover:text-red-400 font-semibold underline">dilsbd.com</a>
                </div>
              </div>

              <div>
                <span className="text-white font-bold text-xs block mb-1">অফিসিয়াল যোগাযোগ ও হটলাইন</span>
                <p className="text-slate-400 text-[11px]">
                  হটলাইন: <strong className="text-emerald-400 font-mono">{DILS_INFO.hotline}</strong>
                </p>
                <p className="text-slate-400 text-[11px]">
                  WhatsApp: <strong className="text-slate-300 font-mono">{DILS_INFO.whatsapp}</strong>
                </p>
                <p className="text-slate-400 text-[11px]">
                  ইমেইল: <strong className="text-slate-300">{DILS_INFO.email}</strong>
                </p>
              </div>

              <div>
                <span className="text-white font-bold text-xs block mb-1">নেতৃত্ব ও একাডেমি মেন্টর</span>
                <p className="text-slate-400 text-[11px]">
                  পরিচালক: <strong className="text-slate-200">{DILS_INFO.director}</strong> (JLPT-N1)
                </p>
                <p className="text-slate-400 text-[11px]">
                  ইন্সট্রাক্টর: <strong className="text-slate-200">{DILS_INFO.instructor}</strong> (JLPT-N2)
                </p>
                <a
                  href={DILS_INFO.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-[11px] font-semibold mt-1 inline-block"
                >
                  ফেসবুক পেজে যুক্ত হোন →
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
              <div>
                © 2026 Dhaka International Language School (DILS). All Rights Reserved.
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <span>System: <strong className="text-slate-200">Unity Core Tech (UCT-LMS-2026-0945)</strong></span>
                <span>•</span>
                <span className="text-red-400 font-mono">dilsbd.com Production Engine</span>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* 4. FLOATING CONTACT & HELPDESK WIDGET */}
      <FloatingContactWidget
        onOpenAdmission={() => handleOpenAdmission()}
        onOpenValidator={() => handleOpenValidator('DILS-CERT-2026-0048')}
      />

      {/* 5. MODALS */}
      {isAdmissionOpen && (
        <OnlineAdmissionModal
          initialCourseId={selectedAdmissionCourseId}
          courses={courses}
          lang={lang}
          onClose={() => setIsAdmissionOpen(false)}
          onGoToStudentPortal={(courseId) => {
            setIsAdmissionOpen(false);
            setCurrentPortal('student');
          }}
        />
      )}

      {isValidatorOpen && (
        <CertificateVerificationModal
          initialCertId={validatorCertId}
          certificates={certificates}
          lang={lang}
          onClose={() => setIsValidatorOpen(false)}
        />
      )}

    </div>
  );
}
