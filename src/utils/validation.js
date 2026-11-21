/**
 * Validation utility functions for Licentra
 */

/**
 * Validates Egyptian 14-digit National ID
 * Rules:
 * - Exactly 14 digits
 * - Starts with 2 (born 1900-1999) or 3 (born 2000-2099)
 * - Digits 2-3: year
 * - Digits 4-5: month (01-12)
 * - Digits 6-7: day (01-31)
 */
export function isValidEgyptianNID(nid) {
  if (!nid) return false;
  const clean = String(nid).trim();
  if (!/^[23][0-9]{13}$/.test(clean)) return false;

  const century = clean[0] === '2' ? '19' : '20';
  const year = century + clean.substring(1, 3);
  const month = parseInt(clean.substring(3, 5), 10);
  const day = parseInt(clean.substring(5, 7), 10);

  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  // Additional calendar validation
  const dateObj = new Date(parseInt(year, 10), month - 1, day);
  if (
    dateObj.getFullYear() !== parseInt(year, 10) ||
    dateObj.getMonth() !== month - 1 ||
    dateObj.getDate() !== day
  ) {
    return false;
  }

  return true;
}

/**
 * Password Policy Evaluator
 * - Minimum 8 characters
 * - Uppercase letter
 * - Number
 * - Special character
 */
export function evaluatePassword(pwd) {
  if (!pwd || pwd.length < 8) return { valid: false, score: 0 };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return { valid: score >= 3, score };
}

/**
 * Validates Egyptian Mobile Phone (+20 or 01X)
 */
export function isValidEgyptianPhone(phone) {
  if (!phone) return false;
  const clean = String(phone).replace(/\s+/g, '').replace(/-/g, '');
  return /^((\+20|0020)?0?1[0125][0-9]{8})$/.test(clean);
}

/**
 * Validates Email Address format
 */
export function isValidEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

