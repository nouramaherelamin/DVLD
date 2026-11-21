/**
 * Formatter and helper utilities
 */

export function formatEGP(amount) {
  if (typeof amount === 'number') {
    return `EGP ${amount.toLocaleString('en-US')}`;
  }
  return String(amount);
}

export function formatDate(dateStr) {
  if (!dateStr) return 'N/A';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

export function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function getStatusBadgeClass(status) {
  switch (String(status).toLowerCase()) {
    case 'approved':
    case 'active':
    case 'completed':
    case 'confirmed':
      return 'bg-success text-white';
    case 'under review':
    case 'in progress':
    case 'pending':
    case 'scheduled':
    case 'new':
      return 'bg-warning text-dark';
    case 'rejected':
    case 'cancelled':
    case 'expired':
      return 'bg-danger text-white';
    default:
      return 'bg-secondary text-white';
  }
}

