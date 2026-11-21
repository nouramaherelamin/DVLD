import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LicentraDB } from '../../services/db';
import { showToast } from '../../components/common/Toast';

export function Login() {
  const { user, login } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot Password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNid, setForgotNid] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');

  const isAdminPortal = searchParams.get('portal') === 'admin';
  const redirectTarget = searchParams.get('redirect');

  // If already logged in, redirect away
  useEffect(() => {
    if (user) {
      if (redirectTarget) {
        navigate(decodeURIComponent(redirectTarget), { replace: true });
      } else if (user.role === 'admin') {
        navigate('/admin/overview', { replace: true });
      } else {
        navigate('/user/overview', { replace: true });
      }
    }
  }, [user, redirectTarget, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both your email address and password.');
      return;
    }

    setLoading(true);
    try {
      const loggedIn = await login(email.trim(), password, rememberMe);
      showToast(`Welcome back, ${loggedIn.fullName}!`, 'success');

      if (redirectTarget) {
        navigate(decodeURIComponent(redirectTarget));
      } else if (loggedIn.role === 'admin') {
        navigate('/admin/overview');
      } else {
        navigate('/user/overview');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMsg('');
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail || !forgotNid || !forgotNewPassword) {
      showToast('Please fill all required fields.', 'warning');
      return;
    }
    if (forgotNewPassword.length < 8) {
      showToast('Password must be at least 8 characters.', 'warning');
      return;
    }

    const targetUser = LicentraDB.findUserByEmail(forgotEmail);
    if (!targetUser || targetUser.nationalId !== forgotNid.trim()) {
      showToast('No citizen profile matches this Email and National ID combination.', 'danger');
      return;
    }

    LicentraDB.updateUser(targetUser.id, {
      passwordHash: forgotNewPassword,
      password: forgotNewPassword,
    });

    showToast('Your password has been successfully reset! Please sign in.', 'success');
    setShowForgotModal(false);
    setEmail(forgotEmail);
    setPassword(forgotNewPassword);
  };

  return (
    <div className="auth-page-wrapper py-5">
      <div className="container">
        <div className="auth-card mx-auto">
          <div className="row g-0">
            {/* Left Decorative Sidebar */}
            <div className="col-lg-5 d-none d-lg-block">
              <div className="auth-sidebar-banner">
                <div>
                  <Link to="/" className="d-inline-block mb-4">
                    <img src="/assets/images/brand/logo-white.svg" alt="Licentra Logo" width="200" height="44" onError={(e) => { e.currentTarget.src = '/assets/images/brand/favicon.svg'; }} />
                  </Link>
                  <div className="badge bg-danger text-white rounded-pill px-3 py-1 mb-3">
                    <i className="bi bi-shield-lock-fill me-1"></i> Official Government Gateway
                  </div>
                  <h3 className="fw-bold mb-3">Welcome to Licentra Citizen Portal</h3>
                  <p className="text-light" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                    Sign in to manage your driver license applications, book computerized theory exams, review your merits, and verify vehicle registration records.
                  </p>
                </div>

                <div className="auth-sidebar-features my-4">
                  <div className="auth-sidebar-feature">
                    <i className="bi bi-check2-circle"></i>
                    <div>
                      <h6 className="fw-bold mb-0">Fast Digital Processing</h6>
                      <small className="text-light">Apply and track services in real time</small>
                    </div>
                  </div>
                  <div className="auth-sidebar-feature">
                    <i className="bi bi-calendar2-check"></i>
                    <div>
                      <h6 className="fw-bold mb-0">Instant Test Appointments</h6>
                      <small className="text-light">Reserve theory and practical driving slots</small>
                    </div>
                  </div>
                  <div className="auth-sidebar-feature">
                    <i className="bi bi-shield-check"></i>
                    <div>
                      <h6 className="fw-bold mb-0">Secure National Verification</h6>
                      <small className="text-light">Unified with Ministry of Interior records</small>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-top border-secondary-subtle small text-light opacity-75">
                  &copy; {new Date().getFullYear()} Licentra &ndash; Driving &amp; Vehicle License Department
                </div>
              </div>
            </div>

            {/* Right Login Form Column */}
            <div className="col-lg-7">
              <div className="auth-form-wrap">
                <div className="mb-4">
                  <div className="section-tag tag-start">&mdash; CITIZEN SIGN IN &mdash;</div>
                  <h2 className="fw-bold text-navy mb-1">Access Your Account</h2>
                  <p className="text-muted small">Enter your registered email address and password to continue.</p>
                </div>

                {errorMsg && (
                  <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3" role="alert">
                    <i className="bi bi-exclamation-circle me-1"></i> {errorMsg}
                  </div>
                )}

                {isAdminPortal && (
                  <div className="alert alert-warning py-2 px-3 small rounded-3 mb-3" role="alert">
                    <i className="bi bi-shield-lock-fill me-1"></i> <strong>Admin Portal Gateway:</strong> Sign in with system administrator credentials to access the Admin Management Suite.
                  </div>
                )}

                {/* Quick Demo Login Selection Card */}
                <div className="p-3 mb-4 rounded-3 border bg-surface">
                  <div className="small fw-bold text-navy mb-2">
                    <i className="bi bi-person-badge-fill text-red me-1"></i> Quick Demo Accounts (One-Click Fill):
                  </div>
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger rounded-pill"
                      onClick={() => handleDemoFill('ahmed.ali@example.com', 'Password123!')}
                    >
                      <i className="bi bi-person me-1"></i> Citizen: Ahmed Ali
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger rounded-pill"
                      onClick={() => handleDemoFill('noura.m@gmail.com', 'Password123!')}
                    >
                      <i className="bi bi-person-heart me-1"></i> Citizen: Noura Mohamed
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger rounded-pill"
                      onClick={() => handleDemoFill('admin@licentra.gov.eg', 'AdminPassword123!')}
                    >
                      <i className="bi bi-shield-lock me-1"></i> Admin: Mona Ali
                    </button>
                  </div>
                  <div className="small text-muted" style={{ fontSize: '0.75rem' }}>
                    Admin: <code>admin@licentra.gov.eg</code> (Pass: <code>AdminPassword123!</code>) &bull; Citizens: <code>ahmed.ali@example.com</code> / <code>noura.m@gmail.com</code> (Pass: <code>Password123!</code>)
                  </div>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Email Address */}
                  <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label fw-semibold text-navy small">
                      Email Address <span className="text-red">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-envelope text-muted"></i></span>
                      <input
                        type="email"
                        className="form-control"
                        id="loginEmail"
                        placeholder="e.g. name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Password with Show/Hide */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label htmlFor="loginPassword" className="form-label fw-semibold text-navy small mb-0">
                        Password <span className="text-red">*</span>
                      </label>
                      <button
                        type="button"
                        className="btn btn-link p-0 small text-red text-decoration-none fw-medium border-0"
                        onClick={() => setShowForgotModal(true)}
                        style={{ fontSize: '0.85rem' }}
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-lock text-muted"></i></span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        id="loginPassword"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                      />
                      <button
                        className="password-toggle-btn border border-start-0 rounded-end bg-surface px-3"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                      >
                        <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label small text-secondary" htmlFor="rememberMe">
                        Keep me signed in on this device
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-licentra-primary w-100 py-2 mb-3" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span> Signing In...
                      </>
                    ) : (
                      <>
                        Sign In <i className="bi bi-arrow-right ms-1"></i>
                      </>
                    )}
                  </button>

                  {/* Link to Registration */}
                  <div className="text-center text-muted small">
                    Don't have a citizen account yet?{' '}
                    <Link to="/register" className="fw-bold text-red text-decoration-none ms-1">
                      Register Now
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          role="dialog"
          onClick={(e) => {
            if (e.target.classList.contains('modal')) setShowForgotModal(false);
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header bg-navy text-white px-4 py-3">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-shield-lock text-red me-2"></i> Reset Citizen Password
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowForgotModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                <p className="text-secondary small mb-3">
                  Please enter your registered email address and 14-digit Egyptian National ID to verify your identity and set a new password.
                </p>
                <form onSubmit={handleForgotSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-navy">
                      Registered Email Address <span className="text-red">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="name@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-navy">
                      National ID (14 digits) <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="29504150102345"
                      maxLength="14"
                      value={forgotNid}
                      onChange={(e) => setForgotNid(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-navy">
                      New Password <span className="text-red">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Minimum 8 characters"
                      minLength="8"
                      value={forgotNewPassword}
                      onChange={(e) => setForgotNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-end pt-2">
                    <button
                      type="button"
                      className="btn btn-secondary rounded-pill me-2"
                      onClick={() => setShowForgotModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-licentra-primary">
                      Reset Password <i className="bi bi-check2"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

