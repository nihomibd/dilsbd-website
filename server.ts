import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

// Express JSON body parser
app.use(express.json());

// Server-side Types
interface Lead {
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

interface Invoice {
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

// Initial Data
const SEED_LEADS: Lead[] = [
  {
    id: 'lead-01',
    name: 'Kazi Farhan Sadik',
    phone: '+880 1819-456782',
    email: 'farhan.sadik@gmail.com',
    courseInterest: 'Japanese JLPT N5 (Student Visa)',
    city: 'Tokyo / Osaka',
    education: 'HSC Passed (2024)',
    targetIntake: 'April 2027 Intake',
    stage: 'new',
    assignedCounselor: 'Tanvir Kabir Biplob',
    createdAt: 'Today, 10:30 AM',
    nextFollowUp: 'Tomorrow, 11:00 AM',
    notes: ['Inquired via website Facebook ad. Interested in Farmgate campus morning batch. Budget 15k BDT.'],
    priority: 'high'
  },
  {
    id: 'lead-02',
    name: 'Shamima Akter Ritu',
    phone: '+880 1711-239845',
    email: 'shamima.ritu@yahoo.com',
    courseInterest: 'Japanese JLPT N5 & Embassy Interview',
    city: 'Tokyo / Kyoto',
    education: 'BBA Completed (DU)',
    targetIntake: 'October 2026 Intake',
    stage: 'counseling',
    assignedCounselor: 'MD. Abdur Razzak',
    createdAt: 'Yesterday, 04:15 PM',
    nextFollowUp: 'Tomorrow, 11:00 AM',
    lastCallOutcome: 'ক্যাম্পাস ভিজিট ও ডেমো ক্লাস শিডিউলড',
    notes: ['Called student on phone. Husband is working in Tokyo as IT specialist. Needs fast track N5 certificate for dependent / student status within 2 months. Scheduled campus visit this Thursday.']
  },
  {
    id: 'lead-03',
    name: 'Mahbubur Rahman',
    phone: '+880 1972-671234',
    email: 'mahbub.ctg@gmail.com',
    courseInterest: 'Japanese JLPT N4 (SSW Work Visa)',
    city: 'Nagoya / Fukuoka',
    education: 'Diploma in Electrical Engineering',
    targetIntake: 'October 2026',
    stage: 'enrolled',
    assignedCounselor: 'MD. Abdur Razzak',
    createdAt: '18-Sep-2026',
    nextFollowUp: 'Enrolled - Student ID Generated',
    notes: ['Admitted in N4 Weekend batch. Paid 1st installment 10,000 BDT via bKash. Student ID DILS-2026-0130 allocated.']
  },
  {
    id: 'lead-04',
    name: 'Tasnim Ahmed',
    phone: '+880 1622-998877',
    courseInterest: 'Japanese JLPT N3 Advanced Career Track',
    city: 'Tokyo / Yokohama',
    education: 'BSc in CSE',
    targetIntake: 'April 2027 Intake',
    stage: 'counseling',
    assignedCounselor: 'MD. Abdur Razzak',
    createdAt: '17-Sep-2026',
    nextFollowUp: 'Tomorrow',
    lastCallOutcome: 'আগ্রহী ও ভর্তি হতে প্রস্তুত',
    notes: ['Targeting JLPT N3 for Tokyo software engineering jobs. Demo class attended on Saturday. Positive feedback. Will confirm payment by Monday.']
  }
];

const SEED_INVOICES: Invoice[] = [
  {
    id: 'inv-01',
    invoiceNo: 'DILS-INV-2026-0891',
    studentName: 'MD. ABDUR RAZZAK',
    studentId: 'DILS-2026-0048',
    courseName: 'Japanese JLPT N4 Work Track',
    totalAmount: 17000,
    paidAmount: 17000,
    dueAmount: 0,
    status: 'paid',
    dueDate: '15-Sep-2026',
    installments: [
      { title: '1st Installment (At Admission)', amount: 10000, paid: true, paidDate: '01-Aug-2026', method: 'bKash Merchant' },
      { title: '2nd Installment (Final)', amount: 7000, paid: true, paidDate: '15-Sep-2026', method: 'Nagad' }
    ]
  },
  {
    id: 'inv-02',
    invoiceNo: 'DILS-INV-2026-0892',
    studentName: 'Tanvir Kabir Biplob',
    studentId: 'DILS-2026-0104',
    courseName: 'Japanese JLPT N5 Complete Mastery',
    totalAmount: 13000,
    paidAmount: 8000,
    dueAmount: 5000,
    status: 'partial',
    dueDate: '25-Sep-2026',
    installments: [
      { title: '1st Installment (Admission)', amount: 8000, paid: true, paidDate: '05-Sep-2026', method: 'bKash' },
      { title: '2nd Installment (Midterm Due)', amount: 5000, paid: false }
    ]
  },
  {
    id: 'inv-03',
    invoiceNo: 'DILS-INV-2026-0893',
    studentName: 'Nusrat Jahan Mim',
    studentId: 'DILS-2026-0112',
    courseName: 'German Goethe A1 Fast Track',
    totalAmount: 15000,
    paidAmount: 15000,
    dueAmount: 0,
    status: 'paid',
    dueDate: '10-Sep-2026',
    installments: [
      { title: 'Full Course Fee (Upfront Offer)', amount: 15000, paid: true, paidDate: '10-Sep-2026', method: 'City Bank Card' }
    ]
  }
];

const SEED_COURSES = [
  {
    id: 'c-jp-n5',
    code: 'DILS-JPN-01',
    title: 'Japanese JLPT N5 & NAT-TEST 5Q Complete Mastery',
    titleBn: 'জাপানি ভাষা JLPT N5 ও NAT-TEST 5Q প্রিপারেশন (ভিসা স্পেশাল)',
    language: 'japanese',
    level: 'JLPT N5 / NAT 5Q',
    price: 18000,
    discountPrice: 13000,
    duration: '4 Months (120 Hours)'
  },
  {
    id: 'c-jp-n4',
    code: 'DILS-JPN-02',
    title: 'Japanese JLPT N4 & SSW Tokutei Ginou Work Track',
    titleBn: 'জাপানি ভাষা JLPT N4 ও এসএসডব্লিউ (SSW) জব ভিসা ট্র্যাক',
    language: 'japanese',
    level: 'JLPT N4',
    price: 22000,
    discountPrice: 17000,
    duration: '4 Months (140 Hours)'
  },
  {
    id: 'c-jp-n3',
    code: 'DILS-JPN-03',
    title: 'Japanese JLPT N3 Advanced Career Track',
    titleBn: 'জাপানি ভাষা JLPT N3 উচ্চতর ক্যারিয়ার ট্র্যাক (জব ও স্কলারশিপ)',
    language: 'japanese',
    level: 'JLPT N3 / Business',
    price: 26000,
    discountPrice: 21000,
    duration: '5 Months (160 Hours)'
  }
];

// In-memory Server-side Persistence Store
let leadsStore: Lead[] = [...SEED_LEADS];
let invoicesStore: Invoice[] = [...SEED_INVOICES];

// Structured Request Logger
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.path} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Helper: Basic input sanitizer
function sanitizeString(str: any): string {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim();
}

/* =========================================================================
   REST API ROUTES
   ========================================================================= */

// 1. Health & Status
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'DILSBD FounderOS API Gateway',
    version: '1.0.0',
    environment: isProd ? 'production' : 'development',
    serverTime: new Date().toISOString(),
    metrics: {
      totalLeads: leadsStore.length,
      totalInvoices: invoicesStore.length,
      uptimeSeconds: Math.floor(process.uptime())
    }
  });
});

// 2. Leads: Retrieve all leads
app.get('/api/leads', (req: Request, res: Response) => {
  const { stage } = req.query;
  let results = [...leadsStore];

  if (stage && typeof stage === 'string') {
    results = results.filter(l => l.stage === stage);
  }

  res.json({
    success: true,
    count: results.length,
    data: results
  });
});

// 3. Leads: Create a new lead (Server-side Validation)
app.post('/api/leads', (req: Request, res: Response) => {
  const { 
    name, 
    phone, 
    email, 
    courseInterest, 
    city, 
    education, 
    targetIntake, 
    assignedCounselor, 
    notes 
  } = req.body;

  // Validation
  const errors: string[] = [];
  const cleanName = sanitizeString(name);
  const cleanPhone = sanitizeString(phone);

  if (!cleanName || cleanName.length < 2) {
    errors.push('Full name is required and must be at least 2 characters.');
  }

  // Allow Bangladesh phone formats, Japanese phone formats, and international
  const phoneDigits = cleanPhone.replace(/\D/g, '');
  if (!cleanPhone || phoneDigits.length < 6) {
    errors.push('Valid contact phone number is required (at least 6 digits).');
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: errors
    });
    return;
  }

  const generatedId = req.body.id || `DILS-LEAD-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

  const newLead: Lead = {
    id: generatedId,
    name: cleanName,
    phone: cleanPhone,
    email: sanitizeString(email),
    courseInterest: sanitizeString(courseInterest) || 'Japanese JLPT N5 Foundation',
    city: sanitizeString(city) || 'Dhaka',
    education: sanitizeString(education) || 'HSC Passed',
    targetIntake: sanitizeString(targetIntake) || 'October 2026 Intake',
    stage: 'new',
    assignedCounselor: sanitizeString(assignedCounselor) || 'Md. Abdur Razzak (Director)',
    createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    nextFollowUp: 'Tomorrow',
    notes: Array.isArray(notes) && notes.length > 0 ? notes.map(sanitizeString) : ['Submitted via DILSBD Online Admission Gateway.']
  };

  leadsStore = [newLead, ...leadsStore];

  res.status(201).json({
    success: true,
    message: 'Lead successfully captured and assigned in DILS CRM.',
    data: newLead
  });
});

// 4. Leads: Update stage, notes, or counselor assignment
app.patch('/api/leads/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { stage, note, assignedCounselor, nextFollowUp, lastCallOutcome, priority } = req.body;

  const leadIndex = leadsStore.findIndex(l => l.id === id);
  if (leadIndex === -1) {
    res.status(404).json({
      success: false,
      error: `Lead with ID "${id}" was not found.`
    });
    return;
  }

  const existing = leadsStore[leadIndex];
  const validStages = ['new', 'counseling', 'enrolled'];

  if (stage && !validStages.includes(stage)) {
    res.status(400).json({
      success: false,
      error: `Invalid stage "${stage}". Must be one of: ${validStages.join(', ')}`
    });
    return;
  }

  const updatedNotes = [...existing.notes];
  if (note && typeof note === 'string') {
    updatedNotes.push(sanitizeString(note));
  }

  const updatedLead: Lead = {
    ...existing,
    stage: stage || existing.stage,
    assignedCounselor: assignedCounselor ? sanitizeString(assignedCounselor) : existing.assignedCounselor,
    nextFollowUp: nextFollowUp ? sanitizeString(nextFollowUp) : existing.nextFollowUp,
    lastCallOutcome: lastCallOutcome ? sanitizeString(lastCallOutcome) : existing.lastCallOutcome,
    priority: priority || existing.priority,
    notes: updatedNotes
  };

  leadsStore[leadIndex] = updatedLead;

  res.json({
    success: true,
    message: 'Lead updated successfully.',
    data: updatedLead
  });
});

// 5. Invoices: Retrieve all student tuition invoices
app.get('/api/invoices', (req: Request, res: Response) => {
  res.json({
    success: true,
    count: invoicesStore.length,
    data: invoicesStore
  });
});

// 6. Invoices: Record new invoice
app.post('/api/invoices', (req: Request, res: Response) => {
  const invoiceData: Invoice = req.body;

  if (!invoiceData.studentName || !invoiceData.totalAmount) {
    res.status(400).json({
      success: false,
      error: 'studentName and totalAmount are required to issue an invoice.'
    });
    return;
  }

  const newInvoice: Invoice = {
    id: invoiceData.id || `inv-${Date.now()}`,
    invoiceNo: invoiceData.invoiceNo || `DILS-INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    studentName: sanitizeString(invoiceData.studentName),
    studentId: sanitizeString(invoiceData.studentId) || `DILS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    courseName: sanitizeString(invoiceData.courseName) || 'Japanese Language Course',
    totalAmount: Number(invoiceData.totalAmount) || 0,
    paidAmount: Number(invoiceData.paidAmount) || 0,
    dueAmount: Number(invoiceData.dueAmount) || 0,
    status: invoiceData.status || 'partial',
    dueDate: sanitizeString(invoiceData.dueDate) || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    installments: Array.isArray(invoiceData.installments) ? invoiceData.installments : []
  };

  invoicesStore = [newInvoice, ...invoicesStore];

  res.status(201).json({
    success: true,
    message: 'Invoice created successfully.',
    data: newInvoice
  });
});

// 7. Courses: Retrieve active programs
app.get('/api/courses', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: SEED_COURSES
  });
});

/* =========================================================================
   VITE DEV MIDDLEWARE OR PRODUCTION STATIC SERVING
   ========================================================================= */

async function start() {
  if (!isProd) {
    // Development: Mount Vite in middleware mode
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production: Serve static assets from dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[DILSBD FounderOS] Server running on http://0.0.0.0:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

start().catch((err) => {
  console.error('[DILSBD FounderOS] Fatal error during startup:', err);
  process.exit(1);
});
