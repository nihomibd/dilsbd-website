export type LanguageCategory = 'all' | 'japanese' | 'german' | 'ielts' | 'french' | 'korean' | 'english';

export type PortalMode = 'website' | 'student' | 'instructor' | 'gradebook' | 'admin' | 'validator';

export type LangMode = 'bn' | 'en' | 'jp';

export interface Course {
  id: string;
  code: string;
  title: string;
  titleBn: string;
  language: LanguageCategory;
  level: string; // e.g., 'JLPT N5', 'Goethe A1', 'Band 7.5+'
  price: number;
  discountPrice?: number;
  duration: string;
  classesCount: number;
  instructorName: string;
  instructorTitle: string;
  instructorPhoto: string;
  featured?: boolean;
  syllabus: {
    week: string;
    topic: string;
    modules: string[];
  }[];
  batches: {
    id: string;
    name: string;
    days: string;
    time: string;
    room: string;
    seatsLeft: number;
    totalSeats: number;
    startDate: string;
  }[];
  description: string;
  descriptionBn: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  moduleName: string;
  title: string;
  titleBn: string;
  duration: string;
  videoUrl: string; // YouTube/Vimeo/MP4
  isLocked: boolean;
  isCompleted: boolean;
  watchPercent: number;
  pdfUrl?: string;
  notes?: string;
  vocabList?: { word: string; reading: string; meaning: string; audioText: string }[];
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionBn?: string;
  type: 'mcq' | 'listening' | 'true_false';
  audioPrompt?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  marks: number;
}

export interface GradebookEntry {
  id: string;
  studentId: string;
  studentName: string;
  courseName: string;
  courseCode: string;
  batch: string;
  photoUrl: string;
  assignmentsScore: number; // Max 100 (20% weight)
  quizzesScore: number;     // Max 100 (20% weight)
  attendanceRate: number;   // Max 100 (10% weight)
  midtermScore: number;     // Max 100 (20% weight)
  finalExamScore: number;   // Max 100 (30% weight)
  // Auto calculated fields
  weightedTotal?: number;
  gpa?: number;
  letterGrade?: string;
  status?: 'Pass' | 'Fail' | 'Honors';
}

export interface CertificateRecord {
  id: string;
  certificateId: string; // e.g. DILS-CERT-2026-0048
  studentName: string;
  studentId: string;
  courseName: string;
  level: string;
  grade: string;
  gpa: number;
  issueDate: string;
  expiryDate?: string;
  instructorName: string;
  directorName: string;
  verificationUrl: string;
  studentPhoto: string;
  status: 'Active & Verified' | 'Revoked';
  qrData: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  courseInterest: string;
  city: string;
  education: string;
  targetIntake: string;
  stage: 'new' | 'counseling' | 'enrolled';
  assignedCounselor: string;
  createdAt: string;
  nextFollowUp: string;
  notes: string[];
  lastCallOutcome?: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  studentName: string;
  studentId: string;
  courseName: string;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  status: 'paid' | 'partial' | 'due';
  dueDate: string;
  installments: {
    title: string;
    amount: number;
    paid: boolean;
    paidDate?: string;
    method?: string;
  }[];
}

export interface Trainer {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experience: string;
  languages: string[];
  photo: string;
  bio: string;
  credentials: string[];
  phone?: string;
  whatsapp?: string;
  email?: string;
  jlptLevel?: string;
}

export interface VisaSuccessStory {
  id: string;
  studentName: string;
  studentPhoto: string;
  visaType: 'Student Visa' | 'SSW Tokutei Ginou' | 'Engineering Visa';
  intake: string;
  destinationCity: string;
  institutionInJapan: string;
  courseCompletedAtDils: string;
  coeNumber: string;
  testimonial: string;
  testimonialBn: string;
  mentorFeedback: string;
  passingScore?: string;
  departureYear: string;
  visaProofBadge?: string;
}

export interface PartnerInstitute {
  id: string;
  name: string;
  city: string;
  category: string;
  logo: string;
  features: string[];
}

export interface StudentJourneyStage {
  id: string;
  stepNumber: number;
  title: string;
  titleBn: string;
  category: 'onboarding' | 'language' | 'exam' | 'certificate' | 'visa_processing' | 'embassy' | 'departure';
  status: 'completed' | 'current' | 'upcoming';
  progressPercent: number;
  mentor: string;
  mentorRole: string;
  estimatedDuration: string;
  keyDeliverable: string;
  description: string;
  descriptionBn: string;
  studentActionRequired: string;
  studentActionRequiredBn: string;
  actionButtonText?: string;
  actionType?: 'learning' | 'exam' | 'certificate' | 'counseling' | 'whatsapp';
  whatsappNumber?: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  category: 'attendance' | 'kanji' | 'streak' | 'audio' | 'exam';
  tier?: 'bronze' | 'silver' | 'gold';
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  progressCurrent: number;
  progressTarget: number;
  metricLabel: string;
  xpReward: number;
}

export interface SRSReviewItem {
  id: string;
  kanji: string;
  furigana: string;
  romaji: string;
  meaningBn: string;
  meaningEn: string;
  jlptLevel: 'N5' | 'N4' | 'N3';
  exampleSentenceJp: string;
  exampleSentenceBn: string;
  intervalDays: number;
  reviewState: 'new' | 'learning' | 'review_due' | 'mastered';
  retentionPercent: number;
}

