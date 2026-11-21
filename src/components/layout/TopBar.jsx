import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { showToast } from '../common/Toast';

export function TopBar() {
  const { user, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    showToast('You have been signed out successfully.', 'info');
    navigate('/');
  };

  return (
    <div className="top-bar d-none d-md-block">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <span className="top-bar-item">
              <i className="bi bi-telephone-fill"></i>
              <a href="tel:+201234567890">+20 123 456 7890</a>
            </span>
            <span className="top-bar-item">
              <i className="bi bi-envelope-fill"></i>
              <a href="mailto:info@licentra.gov.eg">info@licentra.gov.eg</a>
            </span>
            <span className="top-bar-item">
              <i className="bi bi-geo-alt-fill"></i>
              <span>Cairo, Egypt</span>
            </span>
          </div>

          <div className="d-flex align-items-center">
            <button
              className="theme-toggle-btn me-3"
              onClick={toggleTheme}
              data-theme-toggle
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <i className={theme === 'dark' ? 'bi bi-sun-fill text-warning' : 'bi bi-moon-stars-fill'}></i>
            </button>

            {user ? (
              <div className="dropdown d-inline-block top-bar-user-dropdown ms-2">
                <button
                  className="user-menu-btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className={`user-avatar-circle ${isAdmin ? 'bg-danger text-white' : ''}`}>
                    <i className={`bi ${isAdmin ? 'bi-shield-lock-fill' : 'bi-person-fill'}`}></i>
                  </span>
                  <span className="user-name-text">{user.fullName?.split(' ')[0] || 'User'}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow-lg user-menu-dropdown border-0">
                  <li className="px-3 py-2 border-bottom">
                    <div className="fw-bold text-navy user-name-display">{user.fullName}</div>
                    <div className="small text-muted">{user.email}</div>
                    <div className={`badge ${isAdmin ? 'bg-danger text-white' : 'bg-danger-subtle text-danger'} mt-1`}>
                      {isAdmin ? 'System Administrator' : `ID: ${user.nationalId || 'Verified Citizen'}`}
                    </div>
                  </li>
                  {isAdmin ? (
                    <>
                      <li>
                        <Link className="dropdown-item py-2" to="/admin/overview">
                          <i className="bi bi-speedometer2 me-2 text-red"></i> Admin Overview
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item py-2" to="/admin/people-applications">
                          <i className="bi bi-people me-2 text-red"></i> People & Applications
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item py-2" to="/admin/operations">
                          <i className="bi bi-gear-wide-connected me-2 text-red"></i> Operations Management
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider my-1" /></li>
                      <li>
                        <Link className="dropdown-item py-2" to="/user/overview">
                          <i className="bi bi-person-badge me-2 text-primary"></i> Switch to Citizen View
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item py-2" to="/user/overview">
                          <i className="bi bi-grid-fill me-2 text-red"></i> My Overview
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item py-2" to="/apply">
                          <i className="bi bi-file-earmark-text me-2 text-red"></i> My Applications
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item py-2" to="/user/licenses">
                          <i className="bi bi-calendar-check me-2 text-red"></i> My Licenses & Appointments
                        </Link>
                      </li>
                    </>
                  )}
                  <li><hr className="dropdown-divider my-1" /></li>
                  <li>
                    <a className="dropdown-item py-2 text-danger" href="#logout" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i> Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/login" className="top-bar-btn top-bar-login me-2">
                  <i className="bi bi-person-circle"></i> Login
                </Link>
                <Link to="/register" className="top-bar-btn top-bar-register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;

