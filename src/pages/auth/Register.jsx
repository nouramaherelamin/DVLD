import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { isValidEgyptianNID, evaluatePassword, isValidEmail } from '../../utils/validation';
import { showToast } from '../../components/common/Toast';

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const pwdScore = evaluatePassword(password);
  let strengthLabel = '';
  let strengthClass = '';
  if (password.length > 0) {
    if (pwdScore.score <= 1) {
      strengthLabel = 'Weak';
      strengthClass = 'bg-danger text-danger';
    } else if (pwdScore.score === 2) {
      strengthLabel = 'Fair';
      strengthClass = 'bg-warning text-warning';
    } else if (pwdScore.score === 3) {
      strengthLabel = 'Good';
      strengthClass = 'bg-info text-info';
    } else {
      strengthLabel = 'Strong';
      strengthClass = 'bg-success text-success';
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !email.trim() || !phone.trim() || !nationalId.trim() || !password) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    if (!isValidEgyptianNID(nationalId)) {
      setErrorMsg('Invalid Egyptian National ID. Must be 14 digits starting with 2 or 3 and contain a valid birth date.');
      return;
    }

    if (!pwdScore.valid) {
      setErrorMsg('Password is too weak. Must be at least 8 characters and include uppercase, numbers, and symbols.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Password confirmation does not match the entered password.');
      return;
    }

    if (!agreeTerms) {
      setErrorMsg('You must agree to the Terms of Service and Privacy Policy to proceed.');
      return;
    }

    setLoading(true);
    try {
      const newUser = await register({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        nationalId: nationalId.trim(),
        password,
      });

      showToast(`Welcome to Licentra, ${newUser.fullName}! Your citizen account has been created.`, 'success');
      navigate('/user/overview');
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
                    <i className="bi bi-person-plus-fill me-1"></i> Citizen Account Registration
                  </div>
                  <h3 className="fw-bold mb-3">Create Your Official Citizen Portal Profile</h3>
                  <p className="text-light" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                    Join over 500,000 citizens experiencing streamlined government licensing services in Egypt. Complete your profile once to access all traffic services.
                  </p>
                </div>

                <div className="auth-sidebar-features my-4">
                  <div className="auth-sidebar-feature">
                    <i className="bi bi-shield-lock"></i>
                    <div>
                      <h6 className="fw-bold mb-0">Encrypted Government Identity</h6>
                      <small className="text-light">Your National ID is protected with high-level encryption</small>
                    </div>
                  </div>
                  <div className="auth-sidebar-feature">
                    <i className="bi bi-card-checklist"></i>
                    <div>
                      <h6 className="fw-bold mb-0">One Profile for All Services</h6>
                      <small className="text-light">Apply for cars, bikes, commercial permits, or renewals</small>
                    </div>
                  </div>
                  <div className="auth-sidebar-feature">
                    <i className="bi bi-bell"></i>
                    <div>
                      <h6 className="fw-bold mb-0">Automated SMS &amp; Email Alerts</h6>
                      <small className="text-light">Receive real-time updates on application and test statuses</small>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-top border-secondary-subtle small text-light opacity-75">
                  Licentra &ndash; Driving &amp; Vehicle License Department &copy; {new Date().getFullYear()}
                </div>
              </div>
            </div>

            {/* Right Registration Form Column */}
            <div className="col-lg-7">
              <div className="auth-form-wrap">
                <div className="mb-4">
                  <div className="section-tag tag-start">&mdash; NEW CITIZEN PROFILE &mdash;</div>
                  <h2 className="fw-bold text-navy mb-1">Create an Account</h2>
                  <p className="text-muted small">Please provide accurate personal information matching your Egyptian National ID.</p>
                </div>

                {errorMsg && (
                  <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3" role="alert">
                    <i className="bi bi-exclamation-circle me-1"></i> {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  {/* Full Name */}
                  <div className="mb-3">
                    <label htmlFor="regFullName" className="form-label fw-semibold text-navy small">
                      Full Name (as on National ID) <span className="text-red">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-person text-muted"></i></span>
                      <input
                        type="text"
                        className="form-control"
                        id="regFullName"
                        placeholder="e.g. Mohamed Ahmed Hassan"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Email & Phone (2 cols) */}
                  <div className="row g-3 mb-3">
                    <div className="col-sm-6">
                      <label htmlFor="regEmail" className="form-label fw-semibold text-navy small">
                        Email Address <span className="text-red">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text"><i className="bi bi-envelope text-muted"></i></span>
                        <input
                          type="email"
                          className="form-control"
                          id="regEmail"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="regPhone" className="form-label fw-semibold text-navy small">
                        Mobile Number <span className="text-red">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text"><i className="bi bi-telephone text-muted"></i></span>
                        <input
                          type="tel"
                          className="form-control"
                          id="regPhone"
                          placeholder="01012345678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* National ID (14 digits) */}
                  <div className="mb-3">
                    <label htmlFor="regNationalId" className="form-label fw-semibold text-navy small">
                      Egyptian National ID Number <span className="text-red">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-credit-card-2-front text-muted"></i></span>
                      <input
                        type="text"
                        className="form-control"
                        id="regNationalId"
                        placeholder="14-digit National ID number"
                        maxLength="14"
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-text text-muted" style={{ fontSize: '0.75rem' }}>
                      Must be exactly 14 numerical digits printed on your official Egyptian ID card.
                    </div>
                  </div>

                  {/* Password & Confirm Password (2 cols) */}
                  <div className="row g-3 mb-2">
                    <div className="col-sm-6">
                      <label htmlFor="regPassword" className="form-label fw-semibold text-navy small">
                        Password <span className="text-red">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text"><i className="bi bi-lock text-muted"></i></span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="form-control"
                          id="regPassword"
                          placeholder="Min. 8 characters"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
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
                      {password.length > 0 && (
                        <div className="d-flex align-items-center justify-content-between mt-1">
                          <div
                            className="progress flex-grow-1 me-2"
                            style={{ height: '5px' }}
                          >
                            <div
                              className={`progress-bar ${strengthClass.split(' ')[0]}`}
                              style={{ width: `${(pwdScore.score / 4) * 100}%` }}
                            ></div>
                          </div>
                          <small className={`fw-semibold ${strengthClass.split(' ')[1]}`} style={{ fontSize: '0.7rem' }}>
                            {strengthLabel}
                          </small>
                        </div>
                      )}
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="regConfirmPassword" className="form-label fw-semibold text-navy small">
                        Confirm Password <span className="text-red">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text"><i className="bi bi-shield-check text-muted"></i></span>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          className="form-control"
                          id="regConfirmPassword"
                          placeholder="Re-enter password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        <button
                          className="password-toggle-btn border border-start-0 rounded-end bg-surface px-3"
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          aria-label="Toggle password visibility"
                        >
                          <i className={`bi ${showConfirmPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions Checkbox */}
                  <div className="form-check my-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="regTermsCheck"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      required
                    />
                    <label className="form-check-label small text-secondary" htmlFor="regTermsCheck">
                      I confirm that the information provided is correct and agree to the{' '}
                      <button
                        type="button"
                        className="btn btn-link p-0 text-red text-decoration-none fw-semibold border-0 align-baseline"
                        onClick={() => setShowTermsModal(true)}
                        style={{ fontSize: '0.875rem' }}
                      >
                        Licentra Terms of Service
                      </button>{' '}
                      and Privacy Policy.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-licentra-primary w-100 py-2 mb-3" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span> Creating Account...
                      </>
                    ) : (
                      <>
                        Complete Citizen Registration <i className="bi bi-arrow-right ms-1"></i>
                      </>
                    )}
                  </button>

                  {/* Link to Login */}
                  <div className="text-center text-muted small">
                    Already have a registered account?{' '}
                    <Link to="/login" className="fw-bold text-red text-decoration-none ms-1">
                      Sign In
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          role="dialog"
          onClick={(e) => {
            if (e.target.classList.contains('modal')) setShowTermsModal(false);
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header bg-navy text-white px-4 py-3">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-journal-text text-red me-2"></i> Terms of Service &amp; Privacy Policy
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowTermsModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4" style={{ maxHeight: '450px', overflowY: 'auto', fontSize: '0.9rem', lineHeight: '1.7' }}>
                <h6 className="fw-bold text-navy">1. Government Identity Verification</h6>
                <p className="text-secondary">
                  By registering on the Licentra portal, you declare that all submitted personal identification details, including your 14-digit Egyptian National ID number, match official government registry records. Providing false, expired, or fraudulent identity information constitutes a punishable offense under Egyptian penal and traffic legislation.
                </p>

                <h6 className="fw-bold text-navy">2. Digital Appointment &amp; Service Compliance</h6>
                <p className="text-secondary">
                  Test reservations (Theory, Vision, and Practical driving assessments) are personal and non-transferable. Candidates must arrive at accredited testing facilities at least 15 minutes prior to their reserved session with physical original documentation.
                </p>

                <h6 className="fw-bold text-navy">3. Security &amp; Data Protection</h6>
                <p className="text-secondary">
                  Licentra employs cryptographic protocols to safeguard citizen data. Credentials and passwords are encrypted and never shared with commercial third parties. You are responsible for keeping your login credentials confidential.
                </p>
              </div>
              <div className="modal-footer px-4 py-2 bg-surface">
                <button
                  type="button"
                  className="btn btn-licentra-primary"
                  onClick={() => {
                    setAgreeTerms(true);
                    setShowTermsModal(false);
                  }}
                >
                  I Understand &amp; Agree
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;

