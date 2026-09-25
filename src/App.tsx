import React, { useState, useEffect, useCallback } from 'react';
import { PortalMode, LangMode, Lead, Invoice, AuthUser } from './types';
import { Header } from './components/Header';
import { PortalWebsite } from './components/PortalWebsite';
import { PortalStudent } from './components/PortalStudent';
import { PortalInstructor } from './components/PortalInstructor';
import { PortalGradebookExams } from './components/PortalGradebookExams';
import { PortalAdminCRM } from './components/PortalAdminCRM';
import { CertificateVerificationModal } from './components/CertificateVerificationModal';
import { OnlineAdmissionModal } from './components/OnlineAdmissionModal';
import { FloatingContactWidget } from './components/FloatingContactWidget';
import { LoginModal } from './components/LoginModal';
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
  
  // Authentication & Session State
  const [authToken, setAuthToken] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem('dils_auth_token_v2');
    } catch {
      return null;
    }
  });

  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    try {
      const saved = sessionStorage.getItem('dils_auth_user_v2');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modals
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [targetLoginPortal, setTargetLoginPortal] = useState<PortalMode | undefined>();
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [selectedAdmissionCourseId, setSelectedAdmissionCourseId] = useState<string | undefined>();
  const [isValidatorOpen, setIsValidatorOpen] = useState(false);
  const [validatorCertId, setValidatorCertId] = useState<string>('DILS-CERT-2026-0048');

  // Authoritative State (Backed by Server Database)
  const [courses] = useState(INITIAL_COURSES);
  const [lessons] = useState(INITIAL_LESSONS);
  const [quizQuestions] = useState(INITIAL_QUIZ_QUESTIONS);
  const [gradebook] = useState(INITIAL_GRADEBOOK);
  const [certificates] = useState(INITIAL_CERTIFICATES);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [trainers] = useState(INITIAL_TRAINERS);
  const [notices] = useState(NOTICES);

  // Validate session on mount
  useEffect(() => {
    if (!authToken) return;

    fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user) {
          setAuthUser(data.user);
          try {
            sessionStorage.setItem('dils_auth_user_v2', JSON.stringify(data.user));
          } catch {}
        } else {
          // Token expired or invalid
          handleLogout();
        }
      })
      .catch(() => {
        // Network failure, retain local session
      });
  }, [authToken]);

  // Sync protected data from SQLite API when authenticated
  const fetchProtectedData = useCallback(async (token: string, user: AuthUser) => {
    // 1. Fetch leads if staff
    if (['FOUNDER', 'ADMIN', 'COUNSELOR'].includes(user.role)) {
      try {
        const res = await fetch('/api/leads', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setLeads(data.data);
        }
      } catch (err) {
        console.warn('[App] Failed to fetch authoritative leads:', err);
      }
    }

    // 2. Fetch invoices if staff or student
    if (['FOUNDER', 'ADMIN', 'ACCOUNTS', 'STUDENT'].includes(user.role)) {
      try {
        const res = await fetch('/api/invoices', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setInvoices(data.data);
        }
      } catch (err) {
        console.warn('[App] Failed to fetch authoritative invoices:', err);
      }
    }
  }, []);

  useEffect(() => {
    if (authToken && authUser) {
      fetchProtectedData(authToken, authUser);
    }
  }, [authToken, authUser, fetchProtectedData]);

  // Authentication Handlers
  const handleLoginSuccess = (user: AuthUser, token: string) => {
    setAuthUser(user);
    setAuthToken(token);
    try {
      sessionStorage.setItem('dils_auth_token_v2', token);
      sessionStorage.setItem('dils_auth_user_v2', JSON.stringify(user));
    } catch {}

    fetchProtectedData(token, user);

    // Route user into target or appropriate portal
    if (targetLoginPortal && targetLoginPortal !== 'website') {
      setCurrentPortal(targetLoginPortal);
    } else {
      if (['FOUNDER', 'ADMIN', 'COUNSELOR'].includes(user.role)) {
        setCurrentPortal('admin');
      } else if (user.role === 'STUDENT') {
        setCurrentPortal('student');
      } else if (user.role === 'TEACHER') {
        setCurrentPortal('instructor');
      } else {
        setCurrentPortal('admin');
      }
    }
    setTargetLoginPortal(undefined);
  };

  const handleLogout = async () => {
    if (authToken) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
      } catch {}
    }

    setAuthUser(null);
    setAuthToken(null);
    try {
      sessionStorage.removeItem('dils_auth_token_v2');
      sessionStorage.removeItem('dils_auth_user_v2');
    } catch {}

    setCurrentPortal('website');
  };

  // Centralized lead creation handler (Public Admission Gateway)
  const handleAddNewLead = async (newLeadData: Partial<Lead> & { name: string; phone: string }) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLeadData)
      });
      const result = await res.json();
      if (result.success && result.data) {
        setLeads(prev => [result.data, ...prev]);
        return result.data;
      }
    } catch (err) {
      console.error('[App] Failed to save lead to database:', err);
    }

    // Fallback if offline
    const fallbackLead: Lead = {
      id: newLeadData.id || `LEAD-${Date.now()}`,
      name: newLeadData.name,
      phone: newLeadData.phone,
      email: newLeadData.email || '',
      courseInterest: newLeadData.courseInterest || 'Japanese JLPT N5 Foundation',
      city: newLeadData.city || 'Dhaka',
      education: newLeadData.education || 'HSC Passed',
      targetIntake: newLeadData.targetIntake || 'October 2026 Intake',
      stage: newLeadData.stage || 'new',
      assignedCounselor: newLeadData.assignedCounselor || 'Tanvir Kabir Biplob (Senior Counselor)',
      createdAt: new Date().toISOString(),
      nextFollowUp: 'Tomorrow',
      notes: newLeadData.notes || ['Website lead entry.']
    };

    setLeads(prev => [fallbackLead, ...prev]);
    return fallbackLead;
  };

  // Updates from CRM to Database
  const handleUpdateLeads = async (updatedLeads: Lead[]) => {
    setLeads(updatedLeads);

    // If an authenticated counselor is patching a lead, sync to database
    const recentlyChanged = updatedLeads[0];
    if (recentlyChanged && authToken) {
      try {
        await fetch(`/api/leads/${recentlyChanged.id}`, {
          method: 'PATCH',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            stage: recentlyChanged.stage,
            assignedCounselor: recentlyChanged.assignedCounselor,
            nextFollowUp: recentlyChanged.nextFollowUp,
            lastCallOutcome: recentlyChanged.lastCallOutcome,
            priority: recentlyChanged.priority,
            note: recentlyChanged.notes?.[recentlyChanged.notes.length - 1]
          })
        });
      } catch (err) {
        console.warn('[App] Lead patch failed:', err);
      }
    }
  };

  const handleUpdateInvoices = async (updatedInvoices: Invoice[]) => {
    setInvoices(updatedInvoices);

    const newestInvoice = updatedInvoices[0];
    if (newestInvoice && authToken) {
      try {
        await fetch('/api/invoices', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify(newestInvoice)
        });
      } catch (err) {
        console.warn('[App] Invoice server sync deferred:', err);
      }
    }
  };

  const handleOpenAdmission = (courseId?: string) => {
    setSelectedAdmissionCourseId(courseId);
    setIsAdmissionOpen(true);
  };

  const handleOpenValidator = (certId?: string) => {
    if (certId) setValidatorCertId(certId);
    setIsValidatorOpen(true);
  };

  const handleSwitchToStudentPortal = (courseId: string) => {
    if (!authUser) {
      setTargetLoginPortal('student');
      setIsLoginOpen(true);
    } else {
      setCurrentPortal('student');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-red-600 selection:text-white flex flex-col justify-between">
      
      {/* 1. TOP HEADER & PORTAL NAVIGATION (Visible across entire application) */}
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
        authUser={authUser}
        onOpenLogin={(targetPortal) => {
          setTargetLoginPortal(targetPortal);
          setIsLoginOpen(true);
        }}
        onLogout={handleLogout}
      />

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
              if (p !== 'website' && !authUser) {
                setTargetLoginPortal(p);
                setIsLoginOpen(true);
              } else {
                setCurrentPortal(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            onAddNewLead={handleAddNewLead}
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
            onUpdateLeads={handleUpdateLeads}
            onUpdateInvoices={handleUpdateInvoices}
          />
        )}
      </main>

      {/* 3. FOOTER */}
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
              <span>Database: <strong className="text-emerald-400 font-mono">SQLite Persistent Engine</strong></span>
              <span>•</span>
              <span>Auth: <strong className="text-slate-200 font-mono">JWT / RBAC Protected</strong></span>
              <span>•</span>
              <span className="text-red-400 font-mono">dilsbd.com Production Engine</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 4. FLOATING CONTACT & HELPDESK WIDGET */}
      <FloatingContactWidget
        onOpenAdmission={() => handleOpenAdmission()}
        onOpenValidator={() => handleOpenValidator('DILS-CERT-2026-0048')}
      />

      {/* 5. MODALS */}
      {isLoginOpen && (
        <LoginModal
          isOpen={isLoginOpen}
          lang={lang}
          targetPortalName={
            targetLoginPortal === 'admin' ? 'এডমিন CRM ও ফাইন্যান্স পোর্টাল' :
            targetLoginPortal === 'student' ? 'শিক্ষার্থী LMS পোর্টাল' :
            targetLoginPortal === 'instructor' ? 'শিক্ষক পোর্টাল' :
            targetLoginPortal === 'gradebook' ? 'এক্সাম ও গ্রেডবুক' : undefined
          }
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {isAdmissionOpen && (
        <OnlineAdmissionModal
          initialCourseId={selectedAdmissionCourseId}
          courses={courses}
          lang={lang}
          onClose={() => setIsAdmissionOpen(false)}
          onAdmitted={(studentName, studentId, leadData) => {
            const courseObj = courses.find((c) => c.id === selectedAdmissionCourseId);
            handleAddNewLead({
              id: studentId,
              name: studentName,
              phone: leadData?.phone || '',
              courseInterest: courseObj?.title || leadData?.courseInterest || 'Japanese JLPT N5',
              education: leadData?.education || 'HSC Passed',
              targetIntake: leadData?.targetIntake || 'October 2026 Intake',
              city: leadData?.city || 'Dhaka',
              notes: [
                `Online Admission Form submission via website modal.`,
                `Assigned Student ID: ${studentId}`,
                `Course: ${courseObj?.title || leadData?.courseInterest || 'JLPT N5'}`
              ]
            });
          }}
          onGoToStudentPortal={(courseId) => {
            setIsAdmissionOpen(false);
            if (!authUser) {
              setTargetLoginPortal('student');
              setIsLoginOpen(true);
            } else {
              setCurrentPortal('student');
            }
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
