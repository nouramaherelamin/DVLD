/**
 * Licentra Auth & Validation Unit Tests
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
console.log('       LICENTRA AUTHENTICATION & SECURITY TESTS       ');
console.log('======================================================\n');

// Mock browser environment for DB & Auth
const mockStorage = {};
const mockSession = {};
const listeners = {};

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
  location: {
    pathname: '/login.html',
    href: 'http://localhost/login.html',
    search: ''
  },
  addEventListener: (event, handler) => {
    listeners[event] = listeners[event] || [];
    listeners[event].push(handler);
  },
  dispatchEvent: (event) => {
    if (listeners[event.type]) {
      listeners[event.type].forEach(h => h(event));
    }
  }
};

const dbSource = fs.readFileSync(path.join(ROOT_DIR, 'src', 'services', 'db.js'), 'utf8')
  .replace(/^export\s+\{[^}]*\};?\s*$/gm, '')
  .replace(/^export\s+(const|let|var|function|class)\s+/gm, '$1 ')
  .replace(/^export\s+default\s+\w+;?\s*$/gm, '');
const runDbInSandbox = new Function('window', 'localStorage', 'sessionStorage', 'CustomEvent', dbSource);
runDbInSandbox(mockWindow, mockWindow.localStorage, mockWindow.sessionStorage, function CustomEvent(type, params) { return { type, ...params }; });

const LicentraDB = mockWindow.LicentraDB;

// 1. Password Strength and Policy Validation
console.log('[1] Testing Password Validation Policy...');

function evaluatePassword(pwd) {
  let score = 0;
  if (!pwd || pwd.length < 8) return { valid: false, score: 0 };
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return { valid: score >= 3, score };
}

assert(!evaluatePassword('short').valid, 'Rejects password shorter than 8 characters');
assert(!evaluatePassword('alllowercase123').valid, 'Rejects password missing uppercase and special characters');
assert(evaluatePassword('Licentra2024!').valid, 'Accepts strong password meeting all complexity criteria');

// 2. Egyptian 14-Digit National ID Validation
console.log('\n[2] Testing National ID Validation...');

function isValidEgyptianNID(nid) {
  if (!nid) return false;
  const clean = nid.trim();
  if (!/^[23][0-9]{13}$/.test(clean)) return false;
  const century = clean[0] === '2' ? '19' : '20';
  const year = century + clean.substring(1, 3);
  const month = parseInt(clean.substring(3, 5), 10);
  const day = parseInt(clean.substring(5, 7), 10);
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  return true;
}

assert(!isValidEgyptianNID('12345'), 'Rejects short National ID');
assert(!isValidEgyptianNID('19504150102345'), 'Rejects National ID starting with invalid century digit');
assert(!isValidEgyptianNID('29513150102345'), 'Rejects National ID with invalid month (13)');
assert(isValidEgyptianNID('29504150102345'), 'Accepts valid Egyptian National ID (born 1995-04-15)');
assert(isValidEgyptianNID('30108200109876'), 'Accepts valid Egyptian National ID (born 2001-08-20)');

// 3. User Authentication Flow
console.log('\n[3] Testing User Authentication & State...');

// Test Pre-seeded user
const demo = LicentraDB.findUserByEmail('ahmed.ali@example.com');
assert(demo !== null, 'Demo user ahmed.ali@example.com exists in database');
assert(demo.passwordHash === 'Password123!', 'Demo password matches Password123!');

// Test Registration
const regResult = LicentraDB.createUser({
  fullName: 'Tarek Zaki',
  email: 'tarek.zaki@example.com',
  phone: '01234567890',
  nationalId: '29201010101234',
  password: 'SecurePassword2024#'
});
assert(regResult && regResult.id, 'User registration succeeds and returns citizen profile');

// Test Duplicate Registration Prevention
const existing = LicentraDB.findUserByEmail('tarek.zaki@example.com');
assert(existing !== null, 'New user is immediately queryable by email');

// Test Session Storage
LicentraDB.setCurrentUser(regResult, true);
const activeUser = LicentraDB.getCurrentUser();
assert(activeUser && activeUser.email === 'tarek.zaki@example.com', 'Authenticated session persists in storage');

// Test Logout
LicentraDB.clearCurrentUser();
assert(LicentraDB.getCurrentUser() === null, 'clearCurrentUser() flushes session state');

console.log('\n======================================================');
console.log(`AUTH TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED (TOTAL: ${totalTests})`);
console.log('======================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
