import React from 'react';
import { JapaneseCorporateLanding } from './JapaneseCorporateLanding';
import { Course, Trainer, LangMode, PortalMode } from '../types';

interface PortalWebsiteProps {
  courses?: Course[];
  trainers?: Trainer[];
  notices?: any[];
  lang: LangMode;
  onOpenAdmission: (courseId?: string) => void;
  onOpenValidator: (certId?: string) => void;
  onSwitchToStudentPortal: (courseId: string) => void;
  onSelectPortal?: (portal: PortalMode) => void;
}

export const PortalWebsite: React.FC<PortalWebsiteProps> = ({
  courses,
  trainers,
  notices,
  lang,
  onOpenAdmission,
  onOpenValidator,
  onSwitchToStudentPortal,
  onSelectPortal
}) => {
  return (
    <JapaneseCorporateLanding
      courses={courses}
      trainers={trainers}
      notices={notices}
      lang={lang}
      onOpenAdmission={onOpenAdmission}
      onOpenValidator={onOpenValidator}
      onSwitchToStudentPortal={onSwitchToStudentPortal}
      onSelectPortal={onSelectPortal}
    />
  );
};

export default PortalWebsite;
