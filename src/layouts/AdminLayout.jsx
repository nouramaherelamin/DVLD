import React, { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { showToast, ToastContainer } from '../components/common/Toast';
import { LicentraDB } from '../services/db';

export function AdminLayout() {
  const { user, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [drawerTab, setDrawerTab] = useState('details');
  const navigate = useNavigate();
  const location = useLocation();

  // Authentication & RBAC Guard
  useEffect(() => {
    if (!user) {
      showToast('Administrative privileges required. Please sign in.', 'warning');
      const target = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?portal=admin&redirect=${target}`, { replace: true });
    } else if (user.role !== 'admin') {
      showToast('Access Denied: Administrative privileges required.', 'danger');
      navigate('/user/overview', { replace: true });
    }
  }, [user, navigate, location]);

  // Provide global drawer openers for legacy/inline clicks
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!window.LicentraDashboard) window.LicentraDashboard = {};
      window.LicentraDashboard.openAppDrawer = (appId) => {
        const app = LicentraDB.getApplicationById(appId);
        if (app) {
          setSelectedApp(app);
          setDrawerTab('details');
          setDrawerOpen(true);
        }
      };
      window.LicentraDashboard.closeAppDrawer = () => {
        setDrawerOpen(false);
      };
    }
  }, []);

  const handleLogout = (e) => {
    e?.preventDefault();
    logout();
    showToast('You have been signed out from Admin Portal.', 'info');
    navigate('/');
  };

  const currentDateStr = new Date().toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'show' : ''}`}>
        <div className="sidebar-header">
          <Link to="/admin/overview" className="sidebar-brand">
            <img
              src={theme === 'dark' ? '/assets/images/brand/logo-white.svg' : '/assets/images/brand/logo.svg'}
              alt="Licentra Logo"
              onError={(e) => {
                e.currentTarget.src = '/assets/images/brand/favicon.svg';
              }}
            />
            <div className="sidebar-brand-text">
              <h4>Licentra</h4>
              <span>Driving &amp; Vehicle License</span>
            </div>
          </Link>
        </div>

        <ul className="sidebar-menu">
          <li className="sidebar-menu-category">Main Menu</li>
          <li className="sidebar-menu-item">
            <NavLink
              to="/admin/overview"
              className={({ isActive }) => `sidebar-menu-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sidebar-menu-link-content">
                <i className="bi bi-speedometer2"></i>
                <span>Overview</span>
              </span>
            </NavLink>
          </li>
          <li className="sidebar-menu-item">
            <NavLink
              to="/admin/people-applications"
              className={({ isActive }) => `sidebar-menu-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sidebar-menu-link-content">
                <i className="bi bi-people-fill"></i>
                <span>People &amp; Applications</span>
              </span>
            </NavLink>
          </li>
          <li className="sidebar-menu-item">
            <NavLink
              to="/admin/operations"
              className={({ isActive }) => `sidebar-menu-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sidebar-menu-link-content">
                <i className="bi bi-gear-wide-connected"></i>
                <span>Operations Management</span>
              </span>
            </NavLink>
          </li>

          <li className="sidebar-menu-category">Portals &amp; Public</li>
          <li className="sidebar-menu-item">
            <Link to="/user/overview" className="sidebar-menu-link" onClick={() => setSidebarOpen(false)}>
              <span className="sidebar-menu-link-content">
                <i className="bi bi-person-badge"></i>
                <span>Citizen Portal View</span>
              </span>
            </Link>
          </li>
          <li className="sidebar-menu-item">
            <Link to="/" className="sidebar-menu-link" onClick={() => setSidebarOpen(false)}>
              <span className="sidebar-menu-link-content">
                <i className="bi bi-globe"></i>
                <span>Public Website</span>
              </span>
            </Link>
          </li>
          <li className="sidebar-menu-item">
            <a href="#logout" className="sidebar-menu-link text-danger" onClick={handleLogout}>
              <span className="sidebar-menu-link-content">
                <i className="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </span>
            </a>
          </li>
        </ul>

        {/* Bottom Support Card */}
        <div className="sidebar-help-widget">
          <div className="help-widget-card">
            <div className="help-widget-icon">
              <i className="bi bi-headset"></i>
            </div>
            <h6>Need Help?</h6>
            <p>Contact department IT &amp; administrative dispatch support.</p>
            <Link to="/contact" className="btn-help-chat">
              <i className="bi bi-chat-dots-fill"></i> Support Desk
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Dashboard Container */}
      <div className="dashboard-main">
        {/* Topbar Header */}
        <header className="dashboard-header">
          <div className="d-flex align-items-center">
            <button
              className="mobile-sidebar-toggle"
              aria-label="Toggle Navigation"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className="bi bi-list"></i>
            </button>
            <div className="dashboard-search-wrap">
              <i className="bi bi-search dashboard-search-icon"></i>
              <input
                type="text"
                className="dashboard-search-input"
                placeholder="Search applications, citizens, licenses..."
                onChange={(e) => {
                  const q = e.target.value.toLowerCase();
                  document.querySelectorAll('.licentra-data-table tbody tr').forEach((row) => {
                    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
                  });
                }}
              />
            </div>
          </div>

          <div className="dashboard-header-actions">
            <div className="header-date-badge">
              <i className="bi bi-calendar3 text-red"></i>
              <span>{currentDateStr}</span>
            </div>

            <button
              className="header-action-btn"
              onClick={toggleTheme}
              title="Toggle Dark/Light Mode"
              aria-label="Toggle Theme"
            >
              <i className={theme === 'dark' ? 'bi bi-sun-fill text-warning' : 'bi bi-moon-stars-fill'}></i>
            </button>

            <div className="dropdown">
              <button
                className="header-action-btn"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                title="Notifications"
              >
                <i className="bi bi-bell-fill"></i>
                <span className="header-notif-dot"></span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0" style={{ width: '320px' }}>
                <li className="px-3 py-2 border-bottom fw-bold text-navy">Department Alerts</li>
                <li className="p-3 small text-muted">No urgent administrative alerts pending.</li>
              </ul>
            </div>

            {/* User Menu Dropdown */}
            <div className="dropdown">
              <button
                className="header-user-btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="header-user-avatar">
                  <i className="bi bi-shield-lock-fill"></i>
                </div>
                <div className="header-user-info d-none d-md-block">
                  <div className="header-user-name">{user.fullName || 'Administrator'}</div>
                  <div className="header-user-role">System Administrator</div>
                </div>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0">
                <li className="px-3 py-2 border-bottom">
                  <div className="fw-bold text-navy">{user.fullName}</div>
                  <small className="text-muted">{user.email}</small>
                </li>
                <li>
                  <Link className="dropdown-item py-2" to="/admin/people-applications">
                    <i className="bi bi-people me-2 text-red"></i> People &amp; Applications
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item py-2" to="/admin/operations">
                    <i className="bi bi-gear me-2 text-red"></i> Operations Management
                  </Link>
                </li>
                <li><hr className="dropdown-divider my-1" /></li>
                <li>
                  <a className="dropdown-item py-2 text-danger" href="#logout" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i> Sign Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <Outlet />
      </div>

      {/* Application Drawer */}
      <div
        className={`drawer-backdrop ${drawerOpen ? 'show' : ''}`}
        id="drawerBackdrop"
        onClick={() => setDrawerOpen(false)}
      ></div>
      <aside className={`dashboard-drawer ${drawerOpen ? 'show' : ''}`} id="applicationDetailsDrawer">
        <div className="drawer-header">
          <h3 className="drawer-title">Application Details</h3>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close drawer">
            &times;
          </button>
        </div>
        <div className="drawer-body" id="drawerAppContent">
          {selectedApp && (
            <div>
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="applicant-avatar" style={{ width: '56px', height: '56px', fontSize: '1.5rem' }}>
                  <i className="bi bi-person-fill"></i>
                </div>
                <div>
                  <h5 className="fw-bold text-navy mb-0">{selectedApp.applicantName}</h5>
                  <small className="text-muted">Application #{selectedApp.id}</small>
                  <div className="mt-1">
                    <span className={`badge ${selectedApp.status === 'Approved' ? 'bg-success' : selectedApp.status === 'Rejected' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                      {selectedApp.status}
                    </span>
                  </div>
                </div>
              </div>

              <ul className="nav nav-pills nav-fill mb-3 bg-surface p-1 rounded-3" role="tablist">
                <li className="nav-item">
                  <button
                    className={`nav-link py-1 small rounded-2 ${drawerTab === 'details' ? 'active' : ''}`}
                    onClick={() => setDrawerTab('details')}
                  >
                    Details
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link py-1 small rounded-2 ${drawerTab === 'docs' ? 'active' : ''}`}
                    onClick={() => setDrawerTab('docs')}
                  >
                    Documents
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link py-1 small rounded-2 ${drawerTab === 'timeline' ? 'active' : ''}`}
                    onClick={() => setDrawerTab('timeline')}
                  >
                    Timeline
                  </button>
                </li>
              </ul>

              {drawerTab === 'details' && (
                <div className="list-group list-group-flush small">
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-muted"><i className="bi bi-credit-card-2-front me-2"></i> National ID</span>
                    <span className="fw-bold text-navy">{selectedApp.nationalId || 'N/A'}</span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-muted"><i className="bi bi-car-front me-2"></i> License Class</span>
                    <span className="fw-bold text-navy">{selectedApp.licenseClass}</span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-muted"><i className="bi bi-telephone me-2"></i> Phone</span>
                    <span className="fw-bold text-navy">{selectedApp.phone || 'N/A'}</span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-muted"><i className="bi bi-envelope me-2"></i> Email</span>
                    <span className="fw-bold text-navy">{selectedApp.userEmail || 'N/A'}</span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-muted"><i className="bi bi-calendar me-2"></i> Submission Date</span>
                    <span className="fw-bold text-navy">{selectedApp.submissionDate || 'Recently'}</span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-muted"><i className="bi bi-cash me-2"></i> Fee Paid</span>
                    <span className="fw-bold text-success">{selectedApp.totalFee || selectedApp.feePaid || 'EGP 830'}</span>
                  </div>
                </div>
              )}

              {drawerTab === 'docs' && (
                <div className="p-2">
                  {(selectedApp.documents || ['National_ID.pdf', 'Medical_Report_287B.pdf', 'Personal_Photo.jpg']).map((doc, idx) => (
                    <div key={idx} className="p-2 mb-2 rounded border bg-surface d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-file-earmark-pdf text-danger fs-5"></i>
                        <span className="small fw-medium">{doc}</span>
                      </div>
                      <span className="badge bg-success text-white">Verified</span>
                    </div>
                  ))}
                </div>
              )}

              {drawerTab === 'timeline' && (
                <div className="p-2 small">
                  <div className="mb-3 border-start border-danger ps-3">
                    <div className="fw-bold text-navy">Application Submitted</div>
                    <div className="text-muted">{selectedApp.submissionDate || 'Recently'}</div>
                  </div>
                  <div className="mb-3 border-start border-danger ps-3">
                    <div className="fw-bold text-navy">Documents Verified</div>
                    <div className="text-muted">Automated OCR Screening Passed</div>
                  </div>
                  <div className="border-start border-danger ps-3">
                    <div className="fw-bold text-navy">Current Status: {selectedApp.status}</div>
                    <div className="text-muted">Licentra Traffic Directorate Processing</div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="d-flex gap-2 mt-4 pt-3 border-top">
                <button
                  className="btn btn-sm btn-success flex-grow-1"
                  onClick={() => {
                    LicentraDB.updateApplicationStatus(selectedApp.id, 'Approved');
                    setSelectedApp({ ...selectedApp, status: 'Approved' });
                    showToast(`Application #${selectedApp.id} marked as Approved.`, 'success');
                  }}
                >
                  <i className="bi bi-check-circle me-1"></i> Approve
                </button>
                <button
                  className="btn btn-sm btn-outline-danger flex-grow-1"
                  onClick={() => {
                    LicentraDB.updateApplicationStatus(selectedApp.id, 'Rejected', 'Document discrepancy');
                    setSelectedApp({ ...selectedApp, status: 'Rejected' });
                    showToast(`Application #${selectedApp.id} marked as Rejected.`, 'warning');
                  }}
                >
                  <i className="bi bi-x-circle me-1"></i> Reject
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      <ToastContainer />
    </div>
  );
}

export default AdminLayout;

