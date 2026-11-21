/**
 * Licentra QA & Verification Test Suite — React Migration Edition
 * Validates:
 * 1. React JSX pages exist in src/pages/
 * 2. All public images exist in public/assets/images/
 * 3. CSS Design Tokens & Dark Mode in src/styles/variables.css
 * 4. Core React service and context files exist
 * 5. Database repository methods and persistence operations (src/services/db.js)
 * 6. Supabase schema integrity (supabase/schema.sql)
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  \x1b[32m✔\x1b[0m ${testName}`);
  } else {
    failedTests++;
    console.error(`  \x1b[31m✖\x1b[0m ${testName}`);
    if (details) console.error(`    \x1b[33mDetails:\x1b[0m ${details}`);
  }
}

console.log('\n======================================================');
console.log('   LICENTRA VERIFICATION & FUNCTIONAL AUDIT SUITE    ');
console.log('        React.js Migration Edition                   ');
console.log('======================================================\n');

// ─────────────────────────────────────────────────────────────────────────────
// 1. Check all React JSX pages exist in src/pages/
// ─────────────────────────────────────────────────────────────────────────────
console.log('[1] Checking React JSX Pages in src/pages/...');

const requiredPages = [
  // Public pages
  ['src/pages/public/Home.jsx',               'Home page'],
  ['src/pages/public/About.jsx',              'About page'],
  ['src/pages/public/Services.jsx',           'Services page'],
  ['src/pages/public/ServiceDetails.jsx',     'Service Details page'],
  ['src/pages/public/LicenseClasses.jsx',     'License Classes page'],
  ['src/pages/public/LicenseClassDetails.jsx','License Class Details page'],
  ['src/pages/public/DrivingTests.jsx',       'Driving Tests page'],
  ['src/pages/public/News.jsx',               'News page'],
  ['src/pages/public/NewsDetails.jsx',        'News Details page'],
  ['src/pages/public/Contact.jsx',            'Contact page'],
  // Auth pages
  ['src/pages/auth/Login.jsx',                'Login page'],
  ['src/pages/auth/Register.jsx',             'Register page'],
  // User / Citizen pages
  ['src/pages/user/UserOverview.jsx',         'User Overview (Citizen Dashboard)'],
  ['src/pages/user/UserApply.jsx',            'User Apply (Application Wizard)'],
  ['src/pages/user/UserApplications.jsx',     'User Applications page'],
  ['src/pages/user/UserLicensesAppointments.jsx', 'User Licenses & Appointments page'],
  // Admin pages
  ['src/pages/admin/AdminOverview.jsx',       'Admin Overview (Admin Dashboard)'],
  ['src/pages/admin/AdminPeopleApplications.jsx', 'Admin People & Applications page'],
  ['src/pages/admin/AdminOperations.jsx',     'Admin Operations page'],
];

requiredPages.forEach(([relPath, label]) => {
  const filePath = path.join(ROOT_DIR, relPath);
  assert(fs.existsSync(filePath), `React page exists: ${label} (${relPath})`);
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. Check core React architecture files exist
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n[2] Checking Core React Architecture Files...');

const coreFiles = [
  ['src/App.jsx',                        'App.jsx (router root)'],
  ['src/main.jsx',                       'main.jsx (Vite entry)'],
  ['src/context/AuthContext.jsx',        'AuthContext'],
  ['src/context/ThemeContext.jsx',       'ThemeContext'],
  ['src/hooks/useAuth.js',              'useAuth hook'],
  ['src/hooks/useTheme.js',             'useTheme hook'],
  ['src/services/db.js',               'LicentraDB service (src/services/db.js)'],
  ['src/services/supabase.js',         'Supabase client service'],
  ['src/utils/validation.js',          'Validation utilities'],
  ['src/utils/formatters.js',          'Formatter utilities'],
  ['src/layouts/PublicLayout.jsx',     'PublicLayout'],
  ['src/layouts/UserLayout.jsx',       'UserLayout'],
  ['src/layouts/AdminLayout.jsx',      'AdminLayout'],
  ['src/components/layout/Navbar.jsx', 'Navbar component'],
  ['src/components/layout/Footer.jsx', 'Footer component'],
  ['src/components/layout/TopBar.jsx', 'TopBar component'],
  ['src/styles/variables.css',         'CSS Design Tokens (src/styles/variables.css)'],
  ['src/styles/main.css',              'Main stylesheet (src/styles/main.css)'],
  ['src/styles/pages.css',             'Pages stylesheet (src/styles/pages.css)'],
  ['src/styles/dashboard.css',         'Dashboard stylesheet (src/styles/dashboard.css)'],
  ['vite.config.mjs',                  'Vite configuration'],
  ['index.html',                       'index.html (Vite entry shell)'],
];

coreFiles.forEach(([relPath, label]) => {
  const filePath = path.join(ROOT_DIR, relPath);
  assert(fs.existsSync(filePath), `Core file exists: ${label}`);
});

// Verify index.html is the Vite shell (not the old HTML page)
const indexContent = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
assert(indexContent.includes('id="root"'), 'index.html has React root mount point (<div id="root">)');
assert(indexContent.includes('/src/main.jsx'), 'index.html loads Vite entry /src/main.jsx');

// ─────────────────────────────────────────────────────────────────────────────
// 3. Check public images directory (Vite static assets)
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n[3] Checking Images and Media Assets in public/assets/images/...');

const publicImagesDir = path.join(ROOT_DIR, 'public', 'assets', 'images');
assert(fs.existsSync(publicImagesDir), 'public/assets/images/ directory exists');

const imageCount = fs.existsSync(publicImagesDir)
  ? (function countFiles(dir) {
      let n = 0;
      for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        n += fs.statSync(full).isDirectory() ? countFiles(full) : 1;
      }
      return n;
    })(publicImagesDir)
  : 0;

assert(imageCount >= 50, `public/assets/images/ contains sufficient image assets (Found: ${imageCount})`);

// ─────────────────────────────────────────────────────────────────────────────
// 4. Validate CSS Design Tokens & Dark Mode support
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n[4] Checking CSS Design Tokens (src/styles/variables.css)...');

const cssVariablesPath = path.join(ROOT_DIR, 'src', 'styles', 'variables.css');

assert(fs.existsSync(cssVariablesPath), 'src/styles/variables.css exists');

if (fs.existsSync(cssVariablesPath)) {
  const variablesContent = fs.readFileSync(cssVariablesPath, 'utf8');
  assert(variablesContent.includes('[data-theme="dark"]'), 'Dark mode variables [data-theme="dark"] defined');
  assert(variablesContent.includes('--licentra-red: #E72F3D'), 'Primary Brand Red color token defined (--licentra-red: #E72F3D)');
  assert(variablesContent.includes('--licentra-navy: #0A192F'), 'Secondary Executive Navy color token defined (--licentra-navy: #0A192F)');
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Test Data Layer (LicentraDB from src/services/db.js in Node environment)
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n[5] Testing LicentraDB Database Operations (src/services/db.js)...');

// src/services/db.js uses ES module export syntax. We strip the export lines
// and run the core IIFE-style body in a sandboxed Function context identical
// to the original test approach, so no transpiler is needed.
const dbSource = fs.readFileSync(path.join(ROOT_DIR, 'src', 'services', 'db.js'), 'utf8')
  // Strip ES module export statements so the file runs as a plain script
  .replace(/^export\s+\{[^}]*\};?\s*$/gm, '')
  .replace(/^export\s+(const|let|var|function|class)\s+/gm, '$1 ')
  .replace(/^export\s+default\s+\w+;?\s*$/gm, '');

// Create mock localStorage, sessionStorage & window for Node environment
const mockStorage = {};
const mockSession = {};
const mockWindow = {
  localStorage: {
    getItem: (k) => mockStorage[k] || null,
    setItem: (k, v) => { mockStorage[k] = String(v); },
    removeItem: (k) => { delete mockStorage[k]; },
    clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }
  },
  sessionStorage: {
    getItem: (k) => mockSession[k] || null,
    setItem: (k, v) => { mockSession[k] = String(v); },
    removeItem: (k) => { delete mockSession[k]; },
    clear: () => { Object.keys(mockSession).forEach(k => delete mockSession[k]); }
  },
  dispatchEvent: () => {}
};

try {
  const runDbInSandbox = new Function('window', 'localStorage', 'sessionStorage', 'CustomEvent', dbSource);
  runDbInSandbox(mockWindow, mockWindow.localStorage, mockWindow.sessionStorage, function CustomEvent(event, params) { return { event, params }; });
} catch (e) {
  console.error('  \x1b[31m✖\x1b[0m Failed to execute src/services/db.js in sandbox:', e.message);
  failedTests++;
  totalTests++;
}

const LicentraDB = mockWindow.LicentraDB;
assert(typeof LicentraDB === 'object' && LicentraDB !== null, 'LicentraDB successfully initialized from src/services/db.js');

if (LicentraDB) {
  // Test DB Catalogs
  const services = LicentraDB.getServices();
  assert(Array.isArray(services) && services.length === 8, `getServices() returns 8 services (Count: ${services.length})`);

  const classes = LicentraDB.getClasses();
  assert(Array.isArray(classes) && classes.length === 7, `getClasses() returns 7 classes (Count: ${classes.length})`);

  const centers = LicentraDB.getTestCenters();
  assert(Array.isArray(centers) && centers.length === 4, `getTestCenters() returns 4 centers (Count: ${centers.length})`);

  const drivingTests = LicentraDB.getDrivingTests();
  assert(drivingTests && drivingTests.theory && drivingTests.vision && drivingTests.practical, 'getDrivingTests() returns theory, vision, and practical specifications');

  // Test User Operations
  const defaultUser = LicentraDB.findUserByEmail('ahmed.ali@example.com');
  assert(defaultUser !== null && defaultUser.fullName === 'Ahmed Ali Hassan', 'Default citizen user is pre-seeded');

  const createdUser = LicentraDB.createUser({
    fullName: 'Sara Mahmoud Ibrahim',
    email: 'sara.m@example.com',
    phone: '01012345678',
    nationalId: '29810150102345',
    password: 'Password123!'
  });
  assert(createdUser && createdUser.email === 'sara.m@example.com', 'createUser() creates new citizen account');

  const lookupByNid = LicentraDB.findUserByNationalId('29810150102345');
  assert(lookupByNid !== null && lookupByNid.email === 'sara.m@example.com', 'findUserByNationalId() retrieves user by 14-digit National ID');

  // Test Session State
  LicentraDB.setCurrentUser(createdUser, true);
  const sessionUser = LicentraDB.getCurrentUser();
  assert(sessionUser && sessionUser.email === 'sara.m@example.com', 'setCurrentUser() & getCurrentUser() preserve authenticated session');

  // Test Application Submission
  const app = LicentraDB.submitApplication({
    userEmail: 'sara.m@example.com',
    serviceId: 'first-license',
    serviceName: 'First Driving License',
    licenseClass: 'Class 3 - Private Car',
    applicantName: 'Sara Mahmoud Ibrahim',
    nationalId: '29810150102345',
    phone: '01012345678',
    totalFee: 'EGP 1,550'
  });
  assert(app && (app.id.startsWith('LIC-APP-') || app.id.startsWith('APP-')), `submitApplication() persists application with ID: ${app?.id}`);

  const userApps = LicentraDB.getApplications('sara.m@example.com');
  assert(userApps.length === 1 && userApps[0].id === app.id, 'getApplications() retrieves user applications');

  // Test Booking, Rescheduling & Cancellation
  const booking = LicentraDB.createBooking({
    userEmail: 'sara.m@example.com',
    applicantName: 'Sara Mahmoud Ibrahim',
    nationalId: '29810150102345',
    testType: 'Theory Test (Computer Lab)',
    licenseClass: 'Class 3 - Private Car',
    center: 'Cairo Main Center',
    date: '2024-11-15',
    timeSlot: '10:30 AM – 12:00 PM'
  });
  assert(booking && (booking.id.startsWith('BK-') || booking.id.startsWith('BKG-')), `createBooking() persists test booking with ID: ${booking?.id}`);

  const rescheduled = LicentraDB.rescheduleBooking(booking.id, '2024-11-20', '12:30 PM – 02:00 PM');
  assert(rescheduled && rescheduled.date === '2024-11-20' && rescheduled.status === 'Rescheduled', 'rescheduleBooking() updates appointment date, time, and status');

  const cancelled = LicentraDB.cancelBooking(booking.id);
  assert(cancelled && cancelled.status === 'Cancelled', 'cancelBooking() updates booking status to Cancelled');

  // Test Contact Form, Newsletter & Event Registration
  const contactMsg = LicentraDB.saveContactMessage({
    name: 'Kareem Tarek',
    email: 'kareem@example.com',
    phone: '01122334455',
    subject: 'License Upgrade Inquiry',
    message: 'How do I upgrade from Class 3 to Class 4?'
  });
  assert(contactMsg && contactMsg.id.startsWith('TKT-'), `saveContactMessage() persists contact inquiry with ID: ${contactMsg?.id}`);

  const sub = LicentraDB.subscribeNewsletter('citizen@example.com');
  assert(sub === true, 'subscribeNewsletter() registers subscriber in repository');

  const eventReg = LicentraDB.registerForEvent({
    eventId: 'EVT-01',
    eventTitle: 'Road Safety Awareness Workshop',
    name: 'Sara Mahmoud',
    email: 'sara.m@example.com',
    phone: '01012345678',
    seats: 2
  });
  assert(eventReg && eventReg.id.startsWith('EVT-REG-'), `registerForEvent() registers attendee with ID: ${eventReg?.id}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Verify Database SQL Migration Script (supabase/schema.sql)
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n[6] Checking PostgreSQL / Supabase Schema File (supabase/schema.sql)...');
const sqlPath = path.join(ROOT_DIR, 'supabase', 'schema.sql');
assert(fs.existsSync(sqlPath), 'supabase/schema.sql exists for production Supabase configuration');

if (fs.existsSync(sqlPath)) {
  const sqlContent = fs.readFileSync(sqlPath, 'utf8');
  assert(sqlContent.includes('CREATE TABLE IF NOT EXISTS public.profiles'), 'SQL schema creates profiles table');
  assert(sqlContent.includes('CREATE TABLE IF NOT EXISTS public.applications'), 'SQL schema creates applications table');
  assert(sqlContent.includes('CREATE TABLE IF NOT EXISTS public.test_bookings'), 'SQL schema creates test_bookings table');
  assert(sqlContent.includes('ENABLE ROW LEVEL SECURITY'), 'SQL schema configures Row-Level Security (RLS)');
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. Verify no legacy HTML pages remain at root (except index.html Vite shell)
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n[7] Verifying Legacy Files Have Been Removed...');

const legacyFiles = [
  'about.html',
  'services.html',
  'service-details.html',
  'license-classes.html',
  'license-class-details.html',
  'driving-tests.html',
  'news.html',
  'news-details.html',
  'contact.html',
  'login.html',
  'register.html',
  'apply.html',
  'admin-overview.html',
  'admin-people-applications.html',
  'admin-operations.html',
  'index.original.html',
  'supabase_schema.sql',
];

legacyFiles.forEach(f => {
  const filePath = path.join(ROOT_DIR, f);
  assert(!fs.existsSync(filePath), `Legacy file removed: ${f}`);
});

// Verify legacy assets/css and assets/js directories are gone
assert(!fs.existsSync(path.join(ROOT_DIR, 'assets', 'css')), 'Legacy assets/css/ directory removed');
assert(!fs.existsSync(path.join(ROOT_DIR, 'assets', 'js')), 'Legacy assets/js/ directory removed');

// ─────────────────────────────────────────────────────────────────────────────
// Summary
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n======================================================');
console.log(`AUDIT RESULTS: ${passedTests} PASSED, ${failedTests} FAILED (TOTAL: ${totalTests})`);
console.log('======================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
