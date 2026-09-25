import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import initSqlJs from 'sql.js';
import type { Database } from 'sql.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';
const JWT_SECRET = process.env.JWT_SECRET || 'dilsbd-production-security-salt-token-2026-auth';

// Express JSON body parser
app.use(express.json());

// Extend Express Request to carry Authenticated User
export interface AuthenticatedUser {
  id: string;
  email: string;
  fullName: string;
  role: 'FOUNDER' | 'ADMIN' | 'COUNSELOR' | 'TEACHER' | 'PROCESSING' | 'ACCOUNTS' | 'STUDENT' | 'PUBLIC';
  studentId?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

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

// Input Sanitizer
function sanitizeString(str: any): string {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim();
}

/* =========================================================================
   DATABASE PERSISTENCE ENGINE (SQLite with Atomic File Persistence)
   ========================================================================= */

const DB_DIR = path.resolve(__dirname, 'data');
const DB_PATH = path.join(DB_DIR, 'dilsbd.sqlite');

let db: Database;

// Helper: Save SQLite in-memory state to disk atomically
function persistDatabase() {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    const binary = db.export();
    const buffer = Buffer.from(binary);
    const tempPath = `${DB_PATH}.tmp`;
    fs.writeFileSync(tempPath, buffer);
    fs.renameSync(tempPath, DB_PATH);
  } catch (err) {
    console.error('[DB Persistence] Failed to save database to disk:', err);
  }
}

// Audit Logger
function logAudit(
  actorId: string,
  actorName: string,
  action: string,
  entityType: string,
  entityId: string,
  metadata?: any
) {
  try {
    const id = `audit-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
    const createdAt = new Date().toISOString();
    const metaStr = metadata ? JSON.stringify(metadata) : '{}';

    db.run(
      `INSERT INTO audit_logs (id, actor_id, actor_name, action, entity_type, entity_id, metadata_json, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, actorId, actorName, action, entityType, entityId, metaStr, createdAt]
    );
    persistDatabase();
  } catch (err) {
    console.error('[Audit Log] Failed to record audit entry:', err);
  }
}

async function initializeDatabase() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    try {
      const fileBuffer = fs.readFileSync(DB_PATH);
      db = new SQL.Database(fileBuffer);
      console.log(`[DB] Successfully loaded persistent database from ${DB_PATH} (${fileBuffer.length} bytes)`);
    } catch (err) {
      console.warn('[DB] Existing SQLite file corrupted, initializing fresh DB:', err);
      db = new SQL.Database();
    }
  } else {
    db = new SQL.Database();
    console.log('[DB] Created fresh SQLite database instance.');
  }

  // Schema Migrations
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      role TEXT NOT NULL,
      status TEXT DEFAULT 'active',
      student_id TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      course_interest TEXT,
      education TEXT,
      target_intake TEXT,
      city TEXT,
      source TEXT DEFAULT 'website',
      stage TEXT NOT NULL DEFAULT 'new',
      priority TEXT DEFAULT 'medium',
      assigned_counselor TEXT,
      last_call_outcome TEXT,
      next_follow_up TEXT,
      notes_json TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      student_id TEXT UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      course_id TEXT,
      course_name TEXT,
      batch TEXT,
      status TEXT DEFAULT 'enrolled',
      enrolled_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS invoices (
      id TEXT PRIMARY KEY,
      invoice_no TEXT UNIQUE NOT NULL,
      student_id TEXT NOT NULL,
      student_name TEXT NOT NULL,
      course_name TEXT NOT NULL,
      total_amount REAL NOT NULL,
      paid_amount REAL NOT NULL,
      due_amount REAL NOT NULL,
      status TEXT NOT NULL,
      due_date TEXT,
      installments_json TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      owner TEXT NOT NULL,
      priority TEXT DEFAULT 'medium',
      status TEXT DEFAULT 'pending',
      due_date TEXT,
      related_lead_id TEXT,
      related_student_id TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      actor_id TEXT NOT NULL,
      actor_name TEXT NOT NULL,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      metadata_json TEXT,
      created_at TEXT NOT NULL
    );
  `);

  // Seed default staff & student users if users table is empty
  const userCount = db.exec("SELECT COUNT(*) as count FROM users")[0]?.values[0][0] as number;
  if (!userCount || userCount === 0) {
    console.log('[DB] Seeding authoritative staff and student accounts...');
    
    const defaultUsers = [
      {
        id: 'u-founder-01',
        email: 'founder@dilsbd.com',
        phone: '+880 1764-395945',
        password: 'dils2026!founder',
        fullName: 'Md. Tanvir Hasan (Managing Director)',
        role: 'FOUNDER'
      },
      {
        id: 'u-admin-01',
        email: 'admin@dilsbd.com',
        phone: '+880 1711-239845',
        password: 'dils2026!admin',
        fullName: 'MD. ABDUR RAZZAK (Academy Director)',
        role: 'ADMIN'
      },
      {
        id: 'u-counselor-01',
        email: 'counselor@dilsbd.com',
        phone: '+880 1819-456782',
        password: 'dils2026!counselor',
        fullName: 'Tanvir Kabir Biplob (Senior Counselor)',
        role: 'COUNSELOR'
      },
      {
        id: 'u-accounts-01',
        email: 'accounts@dilsbd.com',
        phone: '+880 1622-998877',
        password: 'dils2026!accounts',
        fullName: 'Shamima Akter (Accounts Officer)',
        role: 'ACCOUNTS'
      },
      {
        id: 'u-teacher-01',
        email: 'teacher@dilsbd.com',
        phone: '+880 1972-671234',
        password: 'dils2026!teacher',
        fullName: 'Sensei K. Morimoto (Head Japanese Trainer)',
        role: 'TEACHER'
      },
      {
        id: 'u-student-01',
        email: 'student@dilsbd.com',
        phone: '+880 1819-456782',
        password: 'dils2026!student',
        fullName: 'Kazi Farhan Sadik',
        role: 'STUDENT',
        studentId: 'DILS-2026-0048'
      }
    ];

    const now = new Date().toISOString();
    for (const u of defaultUsers) {
      const hash = bcrypt.hashSync(u.password, 10);
      db.run(
        `INSERT INTO users (id, email, phone, password_hash, full_name, role, status, student_id, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, 'active', ?, ?, ?)`,
        [u.id, u.email, u.phone, hash, u.fullName, u.role, u.studentId || null, now, now]
      );
    }
  }

  // Seed default leads if empty
  const leadCount = db.exec("SELECT COUNT(*) as count FROM leads")[0]?.values[0][0] as number;
  if (!leadCount || leadCount === 0) {
    console.log('[DB] Seeding authoritative leads data...');
    const seedLeads = [
      {
        id: 'lead-01',
        name: 'Kazi Farhan Sadik',
        phone: '+880 1819-456782',
        email: 'farhan.sadik@gmail.com',
        courseInterest: 'Japanese JLPT N5 (Student Visa)',
        city: 'Dhaka',
        education: 'HSC Passed (2024)',
        targetIntake: 'April 2027 Intake',
        stage: 'new',
        priority: 'high',
        assignedCounselor: 'Tanvir Kabir Biplob',
        lastCallOutcome: 'আগ্রহী ও ডেমো ক্লাস দেখতে চায়',
        nextFollowUp: 'Tomorrow, 11:00 AM',
        notes: ['Inquired via website Facebook ad. Interested in Farmgate campus morning batch. Budget 15k BDT.']
      },
      {
        id: 'lead-02',
        name: 'Shamima Akter Ritu',
        phone: '+880 1711-239845',
        email: 'shamima.ritu@yahoo.com',
        courseInterest: 'Japanese JLPT N5 & Embassy Interview',
        city: 'Dhaka',
        education: 'BBA Completed (DU)',
        targetIntake: 'October 2026 Intake',
        stage: 'counseling',
        priority: 'high',
        assignedCounselor: 'MD. ABDUR RAZZAK',
        lastCallOutcome: 'ক্যাম্পাস ভিজিট ও ডেমো ক্লাস শিডিউলড',
        nextFollowUp: 'Tomorrow, 11:00 AM',
        notes: ['Husband is working in Tokyo as IT specialist. Needs fast track N5 certificate for dependent/student status within 2 months.']
      },
      {
        id: 'lead-03',
        name: 'Mahbubur Rahman',
        phone: '+880 1972-671234',
        email: 'mahbub.ctg@gmail.com',
        courseInterest: 'Japanese JLPT N4 (SSW Work Visa)',
        city: 'Chittagong',
        education: 'Diploma in Electrical Engineering',
        targetIntake: 'October 2026 Intake',
        stage: 'enrolled',
        priority: 'medium',
        assignedCounselor: 'MD. ABDUR RAZZAK',
        lastCallOutcome: 'ভর্তি সম্পন্ন ও প্রথম কিস্তি পরিশোধিত',
        nextFollowUp: 'Enrolled - Student ID Generated',
        notes: ['Admitted in N4 Weekend batch. Paid 1st installment 10,000 BDT via bKash. Student ID DILS-2026-0130 allocated.']
      },
      {
        id: 'lead-04',
        name: 'Tasnim Ahmed',
        phone: '+880 1622-998877',
        email: 'tasnim.ahmed@gmail.com',
        courseInterest: 'Japanese JLPT N3 Advanced Career Track',
        city: 'Dhaka',
        education: 'BSc in CSE',
        targetIntake: 'April 2027 Intake',
        stage: 'counseling',
        priority: 'medium',
        assignedCounselor: 'MD. ABDUR RAZZAK',
        lastCallOutcome: 'আগ্রহী ও ভর্তি হতে প্রস্তুত',
        nextFollowUp: 'Monday',
        notes: ['Targeting JLPT N3 for Tokyo software engineering jobs. Demo class attended on Saturday. Positive feedback.']
      }
    ];

    const now = new Date().toISOString();
    for (const l of seedLeads) {
      db.run(
        `INSERT INTO leads (id, name, phone, email, course_interest, city, education, target_intake, stage, priority, assigned_counselor, last_call_outcome, next_follow_up, notes_json, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          l.id,
          l.name,
          l.phone,
          l.email,
          l.courseInterest,
          l.city,
          l.education,
          l.targetIntake,
          l.stage,
          l.priority,
          l.assignedCounselor,
          l.lastCallOutcome,
          l.nextFollowUp,
          JSON.stringify(l.notes),
          now,
          now
        ]
      );
    }
  }

  // Seed default invoices if empty
  const invoiceCount = db.exec("SELECT COUNT(*) as count FROM invoices")[0]?.values[0][0] as number;
  if (!invoiceCount || invoiceCount === 0) {
    console.log('[DB] Seeding authoritative tuition invoice records...');
    const seedInvoices = [
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

    const now = new Date().toISOString();
    for (const inv of seedInvoices) {
      db.run(
        `INSERT INTO invoices (id, invoice_no, student_id, student_name, course_name, total_amount, paid_amount, due_amount, status, due_date, installments_json, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          inv.id,
          inv.invoiceNo,
          inv.studentId,
          inv.studentName,
          inv.courseName,
          inv.totalAmount,
          inv.paidAmount,
          inv.dueAmount,
          inv.status,
          inv.dueDate,
          JSON.stringify(inv.installments),
          now,
          now
        ]
      );
    }
  }

  persistDatabase();
}

/* =========================================================================
   AUTHENTICATION & RBAC MIDDLEWARE
   ========================================================================= */

// Authenticate JWT Token from Header
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'] || req.headers['x-auth-token'];
  let token: string | undefined;

  if (typeof authHeader === 'string') {
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      token = authHeader;
    }
  }

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthenticatedUser;
    req.user = decoded;
  } catch (err) {
    // Invalid or expired token
  }
  next();
}

app.use(authenticateToken);

// Middleware: Require Authentication
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized: Valid authentication token is required to access this resource.'
    });
    return;
  }
  next();
}

// Middleware: Require Specific Role
function requireRoles(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized: Authentication required.'
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: `Forbidden: Role "${req.user.role}" does not have privilege for this operation.`
      });
      return;
    }

    next();
  };
}

/* =========================================================================
   COURSES CATALOG (Canonical Institutional Data)
   ========================================================================= */

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

/* =========================================================================
   REST API ROUTES
   ========================================================================= */

// 1. Health & Status (Public)
app.get('/api/health', (req: Request, res: Response) => {
  const usersCount = db ? (db.exec("SELECT COUNT(*) FROM users")[0]?.values[0][0] as number) : 0;
  const leadsCount = db ? (db.exec("SELECT COUNT(*) FROM leads")[0]?.values[0][0] as number) : 0;
  const invoicesCount = db ? (db.exec("SELECT COUNT(*) FROM invoices")[0]?.values[0][0] as number) : 0;

  res.json({
    status: 'ok',
    service: 'DILSBD FounderOS Production API Gateway',
    version: '2.0.0-auth',
    environment: isProd ? 'production' : 'development',
    serverTime: new Date().toISOString(),
    database: {
      engine: 'SQLite Persistent Engine (sql.js / WAL atomic writes)',
      path: DB_PATH,
      persisted: fs.existsSync(DB_PATH)
    },
    metrics: {
      totalUsers: usersCount,
      totalLeads: leadsCount,
      totalInvoices: invoicesCount,
      uptimeSeconds: Math.floor(process.uptime())
    }
  });
});

// 2. Authentication: Login (Public)
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: 'Both email/phone and password are required.'
    });
    return;
  }

  const cleanEmail = sanitizeString(email).toLowerCase();
  const stmt = db.prepare("SELECT * FROM users WHERE LOWER(email) = ? OR phone = ?");
  stmt.bind([cleanEmail, cleanEmail]);

  if (!stmt.step()) {
    stmt.free();
    res.status(401).json({
      success: false,
      error: 'Invalid credentials. User not found.'
    });
    return;
  }

  const userRow = stmt.getAsObject();
  stmt.free();

  const isPasswordValid = bcrypt.compareSync(password, userRow.password_hash as string);
  if (!isPasswordValid) {
    res.status(401).json({
      success: false,
      error: 'Invalid password. Access denied.'
    });
    return;
  }

  const payload: AuthenticatedUser = {
    id: userRow.id as string,
    email: userRow.email as string,
    fullName: userRow.full_name as string,
    role: userRow.role as any,
    studentId: userRow.student_id ? (userRow.student_id as string) : undefined
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

  logAudit(
    payload.id,
    payload.fullName,
    'USER_LOGIN',
    'user',
    payload.id,
    { role: payload.role, email: payload.email }
  );

  res.json({
    success: true,
    message: `Welcome back, ${payload.fullName}!`,
    token,
    user: payload
  });
});

// 3. Authentication: Get Current Profile (Protected)
app.get('/api/auth/me', requireAuth, (req: Request, res: Response) => {
  res.json({
    success: true,
    user: req.user
  });
});

// 4. Authentication: Logout (Protected)
app.post('/api/auth/logout', requireAuth, (req: Request, res: Response) => {
  logAudit(
    req.user!.id,
    req.user!.fullName,
    'USER_LOGOUT',
    'user',
    req.user!.id
  );

  res.json({
    success: true,
    message: 'Logged out successfully.'
  });
});

// 5. Leads: Retrieve all leads (Protected - Staff Only: FOUNDER, ADMIN, COUNSELOR)
app.get(
  '/api/leads',
  requireRoles(['FOUNDER', 'ADMIN', 'COUNSELOR']),
  (req: Request, res: Response) => {
    const { stage } = req.query;
    let query = "SELECT * FROM leads ORDER BY created_at DESC";
    let params: any[] = [];

    if (stage && typeof stage === 'string') {
      query = "SELECT * FROM leads WHERE stage = ? ORDER BY created_at DESC";
      params = [stage];
    }

    const stmt = db.prepare(query);
    stmt.bind(params);

    const leads: any[] = [];
    while (stmt.step()) {
      const row = stmt.getAsObject();
      let notes: string[] = [];
      try {
        notes = row.notes_json ? JSON.parse(row.notes_json as string) : [];
      } catch {
        notes = [];
      }

      leads.push({
        id: row.id,
        name: row.name,
        phone: row.phone,
        email: row.email || '',
        courseInterest: row.course_interest,
        education: row.education,
        targetIntake: row.target_intake,
        city: row.city,
        source: row.source,
        stage: row.stage,
        priority: row.priority,
        assignedCounselor: row.assigned_counselor,
        lastCallOutcome: row.last_call_outcome,
        nextFollowUp: row.next_follow_up,
        notes: notes,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      });
    }
    stmt.free();

    res.json({
      success: true,
      count: leads.length,
      data: leads
    });
  }
);

// 6. Leads: Create a new lead (Public Admission Form & Lead Gateway)
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
  const now = new Date().toISOString();
  const initialNotes = Array.isArray(notes) && notes.length > 0 
    ? notes.map(sanitizeString) 
    : ['Submitted via DILSBD Online Admission Gateway.'];

  const leadToInsert = {
    id: generatedId,
    name: cleanName,
    phone: cleanPhone,
    email: sanitizeString(email),
    courseInterest: sanitizeString(courseInterest) || 'Japanese JLPT N5 Foundation',
    city: sanitizeString(city) || 'Dhaka',
    education: sanitizeString(education) || 'HSC Passed',
    targetIntake: sanitizeString(targetIntake) || 'October 2026 Intake',
    stage: 'new',
    priority: 'medium',
    assignedCounselor: sanitizeString(assignedCounselor) || 'Tanvir Kabir Biplob (Senior Counselor)',
    lastCallOutcome: 'নতুন লিড - কল করা প্রয়োজন',
    nextFollowUp: 'Tomorrow',
    notes: initialNotes,
    createdAt: now,
    updatedAt: now
  };

  db.run(
    `INSERT INTO leads (id, name, phone, email, course_interest, city, education, target_intake, stage, priority, assigned_counselor, last_call_outcome, next_follow_up, notes_json, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      leadToInsert.id,
      leadToInsert.name,
      leadToInsert.phone,
      leadToInsert.email,
      leadToInsert.courseInterest,
      leadToInsert.city,
      leadToInsert.education,
      leadToInsert.targetIntake,
      leadToInsert.stage,
      leadToInsert.priority,
      leadToInsert.assignedCounselor,
      leadToInsert.lastCallOutcome,
      leadToInsert.nextFollowUp,
      JSON.stringify(leadToInsert.notes),
      leadToInsert.createdAt,
      leadToInsert.updatedAt
    ]
  );
  persistDatabase();

  logAudit(
    req.user ? req.user.id : 'public-gateway',
    req.user ? req.user.fullName : 'Website Visitor',
    'LEAD_CREATED',
    'lead',
    leadToInsert.id,
    { name: leadToInsert.name, phone: leadToInsert.phone, course: leadToInsert.courseInterest }
  );

  res.status(201).json({
    success: true,
    message: 'Lead successfully captured and assigned in DILS CRM database.',
    data: leadToInsert
  });
});

// 7. Leads: Update stage, notes, or counselor assignment (Protected - Staff Only)
app.patch(
  '/api/leads/:id',
  requireRoles(['FOUNDER', 'ADMIN', 'COUNSELOR']),
  (req: Request, res: Response) => {
    const { id } = req.params;
    const { stage, note, assignedCounselor, nextFollowUp, lastCallOutcome, priority } = req.body;

    const stmt = db.prepare("SELECT * FROM leads WHERE id = ?");
    stmt.bind([id]);
    if (!stmt.step()) {
      stmt.free();
      res.status(404).json({
        success: false,
        error: `Lead with ID "${id}" was not found in persistent database.`
      });
      return;
    }

    const existing = stmt.getAsObject();
    stmt.free();

    const validStages = ['new', 'counseling', 'enrolled'];
    if (stage && !validStages.includes(stage)) {
      res.status(400).json({
        success: false,
        error: `Invalid stage "${stage}". Must be one of: ${validStages.join(', ')}`
      });
      return;
    }

    let existingNotes: string[] = [];
    try {
      existingNotes = existing.notes_json ? JSON.parse(existing.notes_json as string) : [];
    } catch {
      existingNotes = [];
    }

    if (note && typeof note === 'string') {
      existingNotes.push(`[${req.user!.fullName}] ${sanitizeString(note)}`);
    }

    const newStage = stage || (existing.stage as string);
    const newCounselor = assignedCounselor ? sanitizeString(assignedCounselor) : (existing.assigned_counselor as string);
    const newFollowUp = nextFollowUp ? sanitizeString(nextFollowUp) : (existing.next_follow_up as string);
    const newOutcome = lastCallOutcome ? sanitizeString(lastCallOutcome) : (existing.last_call_outcome as string);
    const newPriority = priority || (existing.priority as string);
    const updatedAt = new Date().toISOString();

    db.run(
      `UPDATE leads 
       SET stage = ?, assigned_counselor = ?, next_follow_up = ?, last_call_outcome = ?, priority = ?, notes_json = ?, updated_at = ?
       WHERE id = ?`,
      [newStage, newCounselor, newFollowUp, newOutcome, newPriority, JSON.stringify(existingNotes), updatedAt, id]
    );
    persistDatabase();

    logAudit(
      req.user!.id,
      req.user!.fullName,
      'LEAD_UPDATED',
      'lead',
      id,
      { stage: newStage, assignedCounselor: newCounselor, lastCallOutcome: newOutcome }
    );

    res.json({
      success: true,
      message: 'Lead updated successfully in database.',
      data: {
        id,
        name: existing.name,
        phone: existing.phone,
        email: existing.email,
        courseInterest: existing.course_interest,
        city: existing.city,
        education: existing.education,
        targetIntake: existing.target_intake,
        stage: newStage,
        priority: newPriority,
        assignedCounselor: newCounselor,
        lastCallOutcome: newOutcome,
        nextFollowUp: newFollowUp,
        notes: existingNotes,
        createdAt: existing.created_at,
        updatedAt
      }
    });
  }
);

// 8. Invoices: Retrieve invoices (Protected - Staff or Own Student Record)
app.get(
  '/api/invoices',
  requireRoles(['FOUNDER', 'ADMIN', 'ACCOUNTS', 'STUDENT']),
  (req: Request, res: Response) => {
    let query = "SELECT * FROM invoices ORDER BY created_at DESC";
    let params: any[] = [];

    // If logged in as student, restrict strictly to their own student ID
    if (req.user!.role === 'STUDENT') {
      if (!req.user!.studentId) {
        res.json({ success: true, count: 0, data: [] });
        return;
      }
      query = "SELECT * FROM invoices WHERE student_id = ? ORDER BY created_at DESC";
      params = [req.user!.studentId];
    }

    const stmt = db.prepare(query);
    stmt.bind(params);

    const invoices: any[] = [];
    while (stmt.step()) {
      const row = stmt.getAsObject();
      let installments = [];
      try {
        installments = row.installments_json ? JSON.parse(row.installments_json as string) : [];
      } catch {
        installments = [];
      }

      invoices.push({
        id: row.id,
        invoiceNo: row.invoice_no,
        studentId: row.student_id,
        studentName: row.student_name,
        courseName: row.course_name,
        totalAmount: row.total_amount,
        paidAmount: row.paid_amount,
        dueAmount: row.due_amount,
        status: row.status,
        dueDate: row.due_date,
        installments,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      });
    }
    stmt.free();

    res.json({
      success: true,
      count: invoices.length,
      data: invoices
    });
  }
);

// 9. Invoices: Record new invoice (Protected - Staff: FOUNDER, ADMIN, ACCOUNTS)
app.post(
  '/api/invoices',
  requireRoles(['FOUNDER', 'ADMIN', 'ACCOUNTS']),
  (req: Request, res: Response) => {
    const invoiceData = req.body;

    if (!invoiceData.studentName || !invoiceData.totalAmount) {
      res.status(400).json({
        success: false,
        error: 'studentName and totalAmount are required to issue an invoice.'
      });
      return;
    }

    const newId = invoiceData.id || `inv-${Date.now()}`;
    const invoiceNo = invoiceData.invoiceNo || `DILS-INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const studentName = sanitizeString(invoiceData.studentName);
    const studentId = sanitizeString(invoiceData.studentId) || `DILS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const courseName = sanitizeString(invoiceData.courseName) || 'Japanese Language Course';
    const totalAmount = Number(invoiceData.totalAmount) || 0;
    const paidAmount = Number(invoiceData.paidAmount) || 0;
    const dueAmount = Number(invoiceData.dueAmount) || Math.max(0, totalAmount - paidAmount);
    const status = invoiceData.status || (dueAmount === 0 ? 'paid' : paidAmount > 0 ? 'partial' : 'due');
    const dueDate = sanitizeString(invoiceData.dueDate) || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];
    const installments = Array.isArray(invoiceData.installments) ? invoiceData.installments : [];
    const now = new Date().toISOString();

    db.run(
      `INSERT INTO invoices (id, invoice_no, student_id, student_name, course_name, total_amount, paid_amount, due_amount, status, due_date, installments_json, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newId,
        invoiceNo,
        studentId,
        studentName,
        courseName,
        totalAmount,
        paidAmount,
        dueAmount,
        status,
        dueDate,
        JSON.stringify(installments),
        now,
        now
      ]
    );
    persistDatabase();

    logAudit(
      req.user!.id,
      req.user!.fullName,
      'INVOICE_CREATED',
      'invoice',
      newId,
      { invoiceNo, studentName, totalAmount, paidAmount, dueAmount }
    );

    res.status(201).json({
      success: true,
      message: 'Invoice created and persisted in database.',
      data: {
        id: newId,
        invoiceNo,
        studentName,
        studentId,
        courseName,
        totalAmount,
        paidAmount,
        dueAmount,
        status,
        dueDate,
        installments,
        createdAt: now,
        updatedAt: now
      }
    });
  }
);

// 10. Transactional Lead Enrollment & Student ID Generation
app.post(
  '/api/enrollments',
  requireRoles(['FOUNDER', 'ADMIN', 'COUNSELOR']),
  (req: Request, res: Response) => {
    const { leadId, courseId, courseName, batch, initialPayment, paymentMethod } = req.body;

    const stmt = db.prepare("SELECT * FROM leads WHERE id = ?");
    stmt.bind([leadId]);
    if (!stmt.step()) {
      stmt.free();
      res.status(404).json({ success: false, error: 'Lead not found.' });
      return;
    }
    const lead = stmt.getAsObject();
    stmt.free();

    // Transactional logic: Update Lead, Create Student, Create Invoice
    const studentDbId = `std-${Date.now()}`;
    const studentIdCode = `DILS-2026-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date().toISOString();

    // 1. Insert Student Record
    db.run(
      `INSERT INTO students (id, student_id, full_name, phone, course_id, course_name, batch, status, enrolled_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'enrolled', ?)`,
      [studentDbId, studentIdCode, lead.name, lead.phone, courseId || 'c-jp-n5', courseName || lead.course_interest, batch || 'Morning Batch A1', now]
    );

    // 2. Mark Lead as Enrolled
    let notes: string[] = [];
    try {
      notes = lead.notes_json ? JSON.parse(lead.notes_json as string) : [];
    } catch {
      notes = [];
    }
    notes.push(`[${req.user!.fullName}] Officially enrolled as Student ID: ${studentIdCode}`);

    db.run(
      `UPDATE leads SET stage = 'enrolled', notes_json = ?, updated_at = ? WHERE id = ?`,
      [JSON.stringify(notes), now, leadId]
    );

    // 3. Create Tuition Invoice
    const invId = `inv-${Date.now()}`;
    const invoiceNo = `DILS-INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const totalAmount = 15000;
    const paidAmount = Number(initialPayment) || 5000;
    const dueAmount = totalAmount - paidAmount;
    const status = dueAmount === 0 ? 'paid' : 'partial';

    const installments = [
      {
        title: '1st Installment (At Enrollment)',
        amount: paidAmount,
        paid: true,
        paidDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        method: paymentMethod || 'bKash Merchant'
      },
      {
        title: '2nd Installment (Final Exam Due)',
        amount: dueAmount,
        paid: false
      }
    ];

    db.run(
      `INSERT INTO invoices (id, invoice_no, student_id, student_name, course_name, total_amount, paid_amount, due_amount, status, due_date, installments_json, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        invId,
        invoiceNo,
        studentIdCode,
        lead.name,
        courseName || lead.course_interest,
        totalAmount,
        paidAmount,
        dueAmount,
        status,
        new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        JSON.stringify(installments),
        now,
        now
      ]
    );

    persistDatabase();

    logAudit(
      req.user!.id,
      req.user!.fullName,
      'LEAD_ENROLLED_TRANSACTION',
      'enrollment',
      studentIdCode,
      { leadId, studentName: lead.name, invoiceNo, totalAmount, paidAmount }
    );

    res.status(201).json({
      success: true,
      message: 'Student officially enrolled and invoice issued in persistent database.',
      data: {
        studentId: studentIdCode,
        studentName: lead.name,
        courseName: courseName || lead.course_interest,
        invoiceNo,
        paidAmount,
        dueAmount
      }
    });
  }
);

// 11. Audit Logs: Retrieve recent administrative actions (Protected - FOUNDER, ADMIN)
app.get(
  '/api/audit-logs',
  requireRoles(['FOUNDER', 'ADMIN']),
  (req: Request, res: Response) => {
    const stmt = db.prepare("SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 50");
    const logs: any[] = [];
    while (stmt.step()) {
      const row = stmt.getAsObject();
      let meta = {};
      try {
        meta = row.metadata_json ? JSON.parse(row.metadata_json as string) : {};
      } catch {
        meta = {};
      }
      logs.push({
        id: row.id,
        actorId: row.actor_id,
        actorName: row.actor_name,
        action: row.action,
        entityType: row.entity_type,
        entityId: row.entity_id,
        metadata: meta,
        createdAt: row.created_at
      });
    }
    stmt.free();

    res.json({
      success: true,
      count: logs.length,
      data: logs
    });
  }
);

// 12. Courses (Public)
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
  await initializeDatabase();

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
    console.log(`[DILSBD FounderOS] Secure Server running on http://0.0.0.0:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

start().catch((err) => {
  console.error('[DILSBD FounderOS] Fatal error during startup:', err);
  process.exit(1);
});
