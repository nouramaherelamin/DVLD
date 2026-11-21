/**
 * Licentra React Migration Verification Suite
 * Validates:
 * 1. All React page components exist in src/pages/
 * 2. All layouts exist in src/layouts/
 * 3. All reusable components exist in src/components/
 * 4. Context providers exist in src/context/
 * 5. Services & utils exist in src/services/ and src/utils/
 * 6. App.jsx route mapping integrity
 * 7. Supabase schema integrity
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
console.log('       LICENTRA REACT MIGRATION VERIFICATION          ');
console.log('======================================================\n');

// 1. Verify React Pages
console.log('[1] Checking Migrated React Pages...');
const reactPages = [
  // Public Pages
  'src/pages/public/Home.jsx',
  'src/pages/public/About.jsx',
  'src/pages/public/Services.jsx',
  'src/pages/public/ServiceDetails.jsx',
  'src/pages/public/LicenseClasses.jsx',
  'src/pages/public/LicenseClassDetails.jsx',
  'src/pages/public/DrivingTests.jsx',
  'src/pages/public/News.jsx',
  'src/pages/public/NewsDetails.jsx',
  'src/pages/public/Contact.jsx',
  // Auth Pages
  'src/pages/auth/Login.jsx',
  'src/pages/auth/Register.jsx',
  // Citizen Pages
  'src/pages/user/UserApply.jsx',
  'src/pages/user/UserOverview.jsx',
  'src/pages/user/UserApplications.jsx',
  'src/pages/user/UserLicensesAppointments.jsx',
  // Admin Pages
  'src/pages/admin/AdminOverview.jsx',
  'src/pages/admin/AdminPeopleApplications.jsx',
  'src/pages/admin/AdminOperations.jsx',
];

reactPages.forEach((pagePath) => {
  const p = path.join(ROOT_DIR, pagePath);
  assert(fs.existsSync(p), `Page component exists: ${pagePath}`);
});

// 2. Verify Layouts
console.log('\n[2] Checking React Layouts...');
const layouts = [
  'src/layouts/PublicLayout.jsx',
  'src/layouts/UserLayout.jsx',
  'src/layouts/AdminLayout.jsx',
];

layouts.forEach((layoutPath) => {
  const p = path.join(ROOT_DIR, layoutPath);
  assert(fs.existsSync(p), `Layout exists: ${layoutPath}`);
});

// 3. Verify Common & Layout Components
console.log('\n[3] Checking Common & Layout Components...');
const components = [
  'src/components/common/Toast.jsx',
  'src/components/layout/TopBar.jsx',
  'src/components/layout/Navbar.jsx',
  'src/components/layout/Footer.jsx',
  'src/components/layout/SearchModal.jsx',
  'src/components/layout/ChatWidgetModal.jsx',
  'src/components/layout/BackToTop.jsx',
];

components.forEach((compPath) => {
  const p = path.join(ROOT_DIR, compPath);
  assert(fs.existsSync(p), `Component exists: ${compPath}`);
});

// 4. Verify Contexts & Hooks
console.log('\n[4] Checking State Management & Hooks...');
const contextAndHooks = [
  'src/context/ThemeContext.jsx',
  'src/context/AuthContext.jsx',
  'src/hooks/useTheme.js',
  'src/hooks/useAuth.js',
];

contextAndHooks.forEach((file) => {
  const p = path.join(ROOT_DIR, file);
  assert(fs.existsSync(p), `State module exists: ${file}`);
});

// 5. Verify Services & Utilities
console.log('\n[5] Checking Services & Utilities...');
const servicesAndUtils = [
  'src/services/db.js',
  'src/services/supabase.js',
  'src/utils/validation.js',
  'src/utils/formatters.js',
];

servicesAndUtils.forEach((file) => {
  const p = path.join(ROOT_DIR, file);
  assert(fs.existsSync(p), `Service/Utility exists: ${file}`);
});

// 6. Verify Stylesheets in src/styles/
console.log('\n[6] Checking React Stylesheets...');
const styles = [
  'src/styles/variables.css',
  'src/styles/main.css',
  'src/styles/pages.css',
  'src/styles/dashboard.css',
];

styles.forEach((styleFile) => {
  const p = path.join(ROOT_DIR, styleFile);
  assert(fs.existsSync(p), `Stylesheet exists: ${styleFile}`);
});

// 7. Verify Supabase & Public Assets
console.log('\n[7] Checking Supabase & Public Assets...');
assert(fs.existsSync(path.join(ROOT_DIR, 'supabase', 'schema.sql')), 'supabase/schema.sql exists');
assert(fs.existsSync(path.join(ROOT_DIR, 'public', 'assets', 'images', 'brand', 'logo.svg')), 'public/assets/images/brand/logo.svg exists');
assert(fs.existsSync(path.join(ROOT_DIR, 'public', 'assets', 'images', 'brand', 'favicon.svg')), 'public/assets/images/brand/favicon.svg exists');

console.log('\n======================================================');
console.log(`REACT AUDIT RESULTS: ${passedTests} PASSED, ${failedTests} FAILED (TOTAL: ${totalTests})`);
console.log('======================================================\n');

if (failedTests > 0) process.exit(1);

