import React from 'react';
import { JapaneseCorporateLanding } from './JapaneseCorporateLanding';
import { Course, Trainer, LangMode, PortalMode, Lead, AuthUser } from '../types';

interface PortalWebsiteProps {
  courses?: Course[];
  trainers?: Trainer[];
  notices?: any[];
  lang: LangMode;
  onOpenAdmission: (courseId?: string) => void;
  onOpenValidator: (certId?: string) => void;
  onOpenAssessment?: () => void;
  onOpenMembership?: () => void;
  onSwitchToStudentPortal: (courseId: string) => void;
  onSelectPortal?: (portal: PortalMode) => void;
  onAddNewLead?: (leadData: Partial<Lead> & { name: string; phone: string }) => void;
  authUser?: AuthUser | null;
  onOpenLogin?: (targetPortal?: PortalMode) => void;
  onLogout?: () => void;
}

export const PortalWebsite: React.FC<PortalWebsiteProps> = ({
  courses,
  trainers,
  notices,
  lang,
  onOpenAdmission,
  onOpenValidator,
  onOpenAssessment,
  onOpenMembership,
  onSwitchToStudentPortal,
  onSelectPortal,
  onAddNewLead,
  authUser,
  onOpenLogin,
  onLogout
}) => {
  return (
    <JapaneseCorporateLanding
      courses={courses}
      trainers={trainers}
      notices={notices}
      lang={lang}
      onOpenAdmission={onOpenAdmission}
      onOpenValidator={onOpenValidator}
      onOpenAssessment={onOpenAssessment}
      onOpenMembership={onOpenMembership}
      onSwitchToStudentPortal={onSwitchToStudentPortal}
      onSelectPortal={onSelectPortal}
      onAddNewLead={onAddNewLead}
      authUser={authUser}
      onOpenLogin={onOpenLogin}
      onLogout={onLogout}
    />
  );
};

export default PortalWebsite;
