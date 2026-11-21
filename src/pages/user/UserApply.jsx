import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LicentraDB, SERVICES, CLASSES } from '../../services/db';
import { showToast } from '../../components/common/Toast';

export function UserApply() {
  const { user, logout } = useAuth();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Active tab: 'new-app' | 'my-apps' | 'my-bookings'
  const [activeTab, setActiveTab] = useState(() => {
    if (location.hash === '#bookings') return 'my-bookings';
    if (location.hash === '#applications') return 'my-apps';
    return 'new-app';
  });

  // Wizard Step: 1 to 5, and 6 (success)
  const [step, setStep] = useState(1);

  // Wizard selections
  const [selectedService, setSelectedService] = useState(() => {
    const qSrv = searchParams.get('service');
    if (qSrv) {
      const match = SERVICES.find((s) => s.id === qSrv);
      if (match) return match;
    }
    return SERVICES[0];
  });

  const [selectedClass, setSelectedClass] = useState(() => {
    const qCls = searchParams.get('class');
    if (qCls) {
      const match = CLASSES.find((c) => c.id === qCls);
      if (match) return match;
    }
    return CLASSES[2]; // Default Class 3
  });

  const [phone, setPhone] = useState(user?.phone || '01012345678');
  const [governorate, setGovernorate] = useState('Cairo');
  const [address, setAddress] = useState(user?.address || 'Nasr City, District 6');
  const [successAppId, setSuccessAppId] = useState('');

  // Lists
  const [applications, setApplications] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Reschedule Modal
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [rescheduleBooking, setRescheduleBooking] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleSlot, setRescheduleSlot] = useState('10:30 AM – 12:00 PM');

  // Load user applications and bookings
  const loadData = () => {
    if (!user) return;
    const apps = LicentraDB.getApplications(user.email);
    setApplications([...apps]);
    const bks = LicentraDB.getBookings(user.email);
    setBookings([...bks]);
  };

  useEffect(() => {
    loadData();
  }, [user]);

  useEffect(() => {
    if (location.hash === '#bookings') {
      setActiveTab('my-bookings');
    } else if (location.hash === '#applications') {
      setActiveTab('my-apps');
    }
  }, [location.hash]);

  const handleNextStep1 = () => setStep(2);
  const handlePrevStep2 = () => setStep(1);
  const handleNextStep2 = () => setStep(3);
  const handlePrevStep3 = () => setStep(2);
  const handleNextStep3 = () => {
    if (!phone.trim()) {
      showToast('Please provide a valid phone number.', 'warning');
      return;
    }
    setStep(4);
  };
  const handlePrevStep4 = () => setStep(3);
  const handleNextStep4 = () => setStep(5);
  const handlePrevStep5 = () => setStep(4);

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    if (!user) return;

    const newApp = LicentraDB.submitApplication({
      userEmail: user.email,
      serviceId: selectedService.id,
      serviceName: selectedService.title,
      licenseClass: `${selectedClass.code} - ${selectedClass.name}`,
      applicantName: user.fullName,
      nationalId: user.nationalId || '29504150102345',
      phone: phone.trim(),
      totalFee: selectedService.totalFee,
      governorate,
      address,
      documents: ['National_ID.pdf', 'Medical_Report_287B.pdf', 'Personal_Photo.jpg'],
    });

    // Add activity
    LicentraDB.addActivity({
      userEmail: user.email,
      title: 'Application Submitted',
      subtitle: `${selectedService.title} (${selectedClass.code})`,
      dateText: 'Just now',
      icon: 'bi-file-earmark-check-fill',
      color: 'text-success',
    });

    setSuccessAppId(newApp.id);
    setStep(6);
    loadData();
    showToast(`Application #${newApp.id} submitted successfully!`, 'success');
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this examination appointment?')) {
      LicentraDB.cancelBooking(bookingId);
      loadData();
      showToast('Appointment has been cancelled.', 'info');
    }
  };

  const handleOpenReschedule = (b) => {
    setRescheduleBooking(b);
    setRescheduleDate(b.date);
    setRescheduleSlot(b.timeSlot || '10:30 AM – 12:00 PM');
    setRescheduleModalOpen(true);
  };

  const handleConfirmReschedule = (e) => {
    e.preventDefault();
    if (!rescheduleBooking || !rescheduleDate) {
      showToast('Please select a valid new date.', 'warning');
      return;
    }

    LicentraDB.rescheduleBooking(rescheduleBooking.id, rescheduleDate, rescheduleSlot);
    setRescheduleModalOpen(false);
    loadData();
    showToast(`Appointment #${rescheduleBooking.id} rescheduled successfully!`, 'success');
  };

  const handleLogout = () => {
    logout();
    showToast('You have been signed out.', 'info');
    navigate('/');
  };

  return (
    <>
      {/* Portal Hero Header */}
      <header className="page-hero" style={{ padding: '4rem 0 3rem' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="hero-badge">
                <i className="bi bi-person-badge-fill"></i> Official Citizen Dashboard
              </div>
              <h1 className="hero-title mb-2">
                Welcome, <span className="text-red">{user?.fullName?.split(' ')[0] || 'Citizen'}</span>
              </h1>
              <p className="hero-desc mb-3">
                Submit new licensing applications, track your ongoing requests, and manage your driving test appointments.
              </p>
              <div className="d-flex flex-wrap align-items-center gap-3">
                <span className="badge bg-white text-navy px-3 py-2 rounded-pill shadow-xs">
                  <i className="bi bi-credit-card-2-front text-red me-1"></i> National ID:{' '}
                  <strong>{user?.nationalId || '29504150102345'}</strong>
                </span>
                <span className="badge bg-white text-navy px-3 py-2 rounded-pill shadow-xs">
                  <i className="bi bi-envelope text-red me-1"></i> {user?.email}
                </span>
              </div>
            </div>
            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <button type="button" className="btn btn-licentra-outline-red" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i> Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Tabs */}
      <main className="py-5 bg-surface">
        <div className="container py-2">
          {/* Navigation Pills */}
          <ul className="nav nav-pills justify-content-center mb-5 gap-2" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link px-4 py-2 rounded-pill fw-semibold ${activeTab === 'new-app' ? 'active' : ''}`}
                onClick={() => setActiveTab('new-app')}
                type="button"
              >
                <i className="bi bi-plus-circle me-1"></i> Submit New Application
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link px-4 py-2 rounded-pill fw-semibold ${activeTab === 'my-apps' ? 'active' : ''}`}
                onClick={() => setActiveTab('my-apps')}
                type="button"
              >
                <i className="bi bi-folder2-open me-1"></i> My Applications ({applications.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link px-4 py-2 rounded-pill fw-semibold ${activeTab === 'my-bookings' ? 'active' : ''}`}
                onClick={() => setActiveTab('my-bookings')}
                type="button"
              >
                <i className="bi bi-calendar-check me-1"></i> My Test Bookings ({bookings.length})
              </button>
            </li>
          </ul>

          <div className="tab-content">
            {/* ===================================================================
                 TAB 1: SUBMIT NEW APPLICATION WIZARD
                 =================================================================== */}
            {activeTab === 'new-app' && (
              <div className="tab-pane fade show active">
                <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-surface-card">
                  {step <= 5 && (
                    <div className="stepper-nav d-none d-md-flex">
                      <div className={`stepper-item ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
                        <div className="stepper-bubble">{step > 1 ? '✔' : '1'}</div>
                        <div className="stepper-label">Select Service</div>
                      </div>
                      <div className={`stepper-item ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
                        <div className="stepper-bubble">{step > 2 ? '✔' : '2'}</div>
                        <div className="stepper-label">License Class</div>
                      </div>
                      <div className={`stepper-item ${step === 3 ? 'active' : step > 3 ? 'completed' : ''}`}>
                        <div className="stepper-bubble">{step > 3 ? '✔' : '3'}</div>
                        <div className="stepper-label">Applicant Details</div>
                      </div>
                      <div className={`stepper-item ${step === 4 ? 'active' : step > 4 ? 'completed' : ''}`}>
                        <div className="stepper-bubble">{step > 4 ? '✔' : '4'}</div>
                        <div className="stepper-label">Upload Documents</div>
                      </div>
                      <div className={`stepper-item ${step === 5 ? 'active' : ''}`}>
                        <div className="stepper-bubble">5</div>
                        <div className="stepper-label">Payment &amp; Review</div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmitApplication}>
                    {/* STEP 1: Select Service */}
                    {step === 1 && (
                      <div className="wizard-step">
                        <div className="text-center mb-4">
                          <span className="badge bg-danger-subtle text-danger px-3 py-1 rounded-pill mb-2">Step 1 of 5</span>
                          <h3 className="fw-bold text-navy">Choose the Licensing Service</h3>
                          <p className="text-muted small">Select the specific government service you wish to apply for.</p>
                        </div>

                        <div className="row g-3 justify-content-center mb-4">
                          {SERVICES.map((s) => {
                            const isSelected = s.id === selectedService.id;
                            return (
                              <div key={s.id} className="col-md-6 col-lg-3">
                                <div
                                  className={`card h-100 p-3 rounded-4 border ${isSelected ? 'border-danger bg-danger-subtle' : 'bg-surface'} service-option-card`}
                                  style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                                  onClick={() => setSelectedService(s)}
                                >
                                  <div className="d-flex align-items-center gap-2 mb-2">
                                    <span className={`badge ${isSelected ? 'bg-danger text-white' : 'bg-light text-navy'}`}>{s.code}</span>
                                    <small className="text-muted">{s.badge || 'Official'}</small>
                                  </div>
                                  <h6 className="fw-bold text-navy mb-1">{s.title}</h6>
                                  <small className="text-secondary d-block mb-3" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                                    {s.summary.substring(0, 75)}...
                                  </small>
                                  <div className="mt-auto d-flex align-items-center justify-content-between pt-2 border-top">
                                    <span className="fw-bold text-red small">{s.totalFee}</span>
                                    <i className={`bi ${isSelected ? 'bi-check-circle-fill text-danger' : 'bi-circle text-muted'}`}></i>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="d-flex justify-content-end">
                          <button type="button" className="btn btn-licentra-primary" onClick={handleNextStep1}>
                            Continue to License Class <i className="bi bi-arrow-right ms-1"></i>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Choose License Class */}
                    {step === 2 && (
                      <div className="wizard-step">
                        <div className="text-center mb-4">
                          <span className="badge bg-danger-subtle text-danger px-3 py-1 rounded-pill mb-2">Step 2 of 5</span>
                          <h3 className="fw-bold text-navy">Select Vehicle License Class</h3>
                          <p className="text-muted small">Choose the license class matching your target vehicle category.</p>
                        </div>

                        <div className="row g-3 mb-4">
                          {CLASSES.map((c) => {
                            const isSelected = c.id === selectedClass.id;
                            return (
                              <div key={c.id} className="col-md-6 col-lg-4">
                                <div
                                  className={`card h-100 p-3 rounded-4 border ${isSelected ? 'border-danger bg-danger-subtle' : 'bg-surface'} class-option-card`}
                                  style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                                  onClick={() => setSelectedClass(c)}
                                >
                                  <div className="d-flex align-items-center justify-content-between mb-2">
                                    <span className="badge bg-danger text-white">{c.code}</span>
                                    <span className="small text-muted">{c.validity}</span>
                                  </div>
                                  <h6 className="fw-bold text-navy mb-1">{c.name}</h6>
                                  <div className="small text-secondary mb-2">{c.arabicName}</div>
                                  <div className="small text-muted mb-3" style={{ fontSize: '0.8rem' }}>{c.description}</div>
                                  <div className="mt-auto d-flex align-items-center justify-content-between pt-2 border-top">
                                    <span className="small text-navy">Min Age: <strong>{c.minAge} yrs</strong></span>
                                    <i className={`bi ${isSelected ? 'bi-check-circle-fill text-danger' : 'bi-circle text-muted'}`}></i>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="d-flex justify-content-between">
                          <button type="button" className="btn btn-secondary rounded-pill" onClick={handlePrevStep2}>
                            <i className="bi bi-arrow-left me-1"></i> Back
                          </button>
                          <button type="button" className="btn btn-licentra-primary" onClick={handleNextStep2}>
                            Continue to Personal Details <i className="bi bi-arrow-right ms-1"></i>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Applicant Details */}
                    {step === 3 && (
                      <div className="wizard-step">
                        <div className="text-center mb-4">
                          <span className="badge bg-danger-subtle text-danger px-3 py-1 rounded-pill mb-2">Step 3 of 5</span>
                          <h3 className="fw-bold text-navy">Verify Applicant Details</h3>
                          <p className="text-muted small">Information has been pre-filled from your official citizen profile.</p>
                        </div>

                        <div className="row g-3 mb-4">
                          <div className="col-md-6">
                            <label className="form-label fw-semibold text-navy small">Full Name</label>
                            <input type="text" className="form-control" value={user?.fullName || ''} readOnly />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label fw-semibold text-navy small">Egyptian National ID</label>
                            <input type="text" className="form-control" value={user?.nationalId || '29504150102345'} readOnly />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label fw-semibold text-navy small">Contact Email</label>
                            <input type="email" className="form-control" value={user?.email || ''} readOnly />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label fw-semibold text-navy small">
                              Phone Number <span className="text-red">*</span>
                            </label>
                            <input
                              type="tel"
                              className="form-control"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label fw-semibold text-navy small">
                              Governorate <span className="text-red">*</span>
                            </label>
                            <select
                              className="form-select"
                              value={governorate}
                              onChange={(e) => setGovernorate(e.target.value)}
                              required
                            >
                              <option value="Cairo">Cairo (القاهرة)</option>
                              <option value="Giza">Giza (الجيزة)</option>
                              <option value="Alexandria">Alexandria (الإسكندرية)</option>
                              <option value="Dakahlia">Dakahlia (الدقهلية)</option>
                              <option value="Sharqia">Sharqia (الشرقية)</option>
                              <option value="Gharbia">Gharbia (الغربية)</option>
                              <option value="Qalyubia">Qalyubia (القليوبية)</option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label fw-semibold text-navy small">
                              Residential Address <span className="text-red">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-between">
                          <button type="button" className="btn btn-secondary rounded-pill" onClick={handlePrevStep3}>
                            <i className="bi bi-arrow-left me-1"></i> Back
                          </button>
                          <button type="button" className="btn btn-licentra-primary" onClick={handleNextStep3}>
                            Continue to Document Upload <i className="bi bi-arrow-right ms-1"></i>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 4: Document Uploads */}
                    {step === 4 && (
                      <div className="wizard-step">
                        <div className="text-center mb-4">
                          <span className="badge bg-danger-subtle text-danger px-3 py-1 rounded-pill mb-2">Step 4 of 5</span>
                          <h3 className="fw-bold text-navy">Attach Required Verification Documents</h3>
                          <p className="text-muted small">Please upload clear scanned copies or photos (PDF, PNG, JPG accepted).</p>
                        </div>

                        <div className="row g-4 mb-4">
                          <div className="col-md-4">
                            <div className="doc-upload-box text-center p-4 rounded-4 border bg-surface">
                              <i className="bi bi-file-earmark-person fs-1 text-red mb-2 d-block"></i>
                              <div className="fw-semibold text-navy mb-1">National ID Card (Both Sides)</div>
                              <small className="text-muted d-block mb-3">Front &amp; Back in one file</small>
                              <span className="badge bg-success-subtle text-success doc-status">
                                <i className="bi bi-check-circle me-1"></i> Attached: National_ID.pdf
                              </span>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="doc-upload-box text-center p-4 rounded-4 border bg-surface">
                              <i className="bi bi-heart-pulse fs-1 text-red mb-2 d-block"></i>
                              <div className="fw-semibold text-navy mb-1">Medical Report (Form 287-B)</div>
                              <small className="text-muted d-block mb-3">Accredited traffic clinic report</small>
                              <span className="badge bg-success-subtle text-success doc-status">
                                <i className="bi bi-check-circle me-1"></i> Attached: Medical_Report_287B.pdf
                              </span>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="doc-upload-box text-center p-4 rounded-4 border bg-surface">
                              <i className="bi bi-camera fs-1 text-red mb-2 d-block"></i>
                              <div className="fw-semibold text-navy mb-1">Recent Passport Photo</div>
                              <small className="text-muted d-block mb-3">4x6 cm white background</small>
                              <span className="badge bg-success-subtle text-success doc-status">
                                <i className="bi bi-check-circle me-1"></i> Attached: Personal_Photo.jpg
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between">
                          <button type="button" className="btn btn-secondary rounded-pill" onClick={handlePrevStep4}>
                            <i className="bi bi-arrow-left me-1"></i> Back
                          </button>
                          <button type="button" className="btn btn-licentra-primary" onClick={handleNextStep4}>
                            Continue to Payment &amp; Review <i className="bi bi-arrow-right ms-1"></i>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 5: Payment & Final Review */}
                    {step === 5 && (
                      <div className="wizard-step">
                        <div className="text-center mb-4">
                          <span className="badge bg-danger-subtle text-danger px-3 py-1 rounded-pill mb-2">Step 5 of 5</span>
                          <h3 className="fw-bold text-navy">Review &amp; Settle Statutory Fees</h3>
                          <p className="text-muted small">Verify your application summary and complete fee settlement.</p>
                        </div>

                        <div className="row g-4 mb-4">
                          {/* Summary Card */}
                          <div className="col-lg-7">
                            <div className="p-4 rounded-4 bg-surface border h-100">
                              <h5 className="fw-bold text-navy mb-3">Application Summary</h5>
                              <ul className="list-unstyled mb-0" style={{ lineHeight: '2.2', fontSize: '0.95rem' }}>
                                <li>
                                  <span className="text-muted">Selected Service:</span>{' '}
                                  <strong className="text-navy">{selectedService.title}</strong>
                                </li>
                                <li>
                                  <span className="text-muted">License Category:</span>{' '}
                                  <strong className="text-navy">{selectedClass.code} ({selectedClass.name})</strong>
                                </li>
                                <li>
                                  <span className="text-muted">Applicant Name:</span>{' '}
                                  <strong className="text-navy">{user?.fullName}</strong>
                                </li>
                                <li>
                                  <span className="text-muted">National ID:</span>{' '}
                                  <strong className="text-navy">{user?.nationalId || '29504150102345'}</strong>
                                </li>
                                <li>
                                  <span className="text-muted">Governorate:</span>{' '}
                                  <strong className="text-navy">{governorate}</strong>
                                </li>
                                <li>
                                  <span className="text-muted">Attached Documents:</span>{' '}
                                  <strong className="text-success"><i className="bi bi-check-all"></i> 3 Verified Files</strong>
                                </li>
                              </ul>
                            </div>
                          </div>

                          {/* Fee Payment Card */}
                          <div className="col-lg-5">
                            <div className="p-4 rounded-4 bg-navy text-white h-100 d-flex flex-column justify-content-between">
                              <div>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                  <h6 className="text-light text-uppercase fw-bold mb-0">Total Statutory Fee</h6>
                                  <i className="bi bi-credit-card fs-4 text-red"></i>
                                </div>
                                <div className="display-6 fw-bold text-white mb-3">{selectedService.totalFee}</div>
                                <small className="text-light d-block mb-3">
                                  Includes administrative stamps, biometric card production, and examination clearances.
                                </small>
                                <div className="p-3 rounded-3 bg-white text-navy small mb-3">
                                  <div className="d-flex align-items-center gap-2 mb-1">
                                    <i className="bi bi-shield-lock-fill text-success"></i>
                                    <strong>Secure Digital Payment Simulator</strong>
                                  </div>
                                  <span>Fawry, Meeza, and Visa/Mastercard processing enabled.</span>
                                </div>
                              </div>

                              <button type="submit" className="btn btn-licentra-primary w-100 py-2 mt-3">
                                Confirm &amp; Submit Application <i className="bi bi-check2-circle ms-1"></i>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-start">
                          <button type="button" className="btn btn-secondary rounded-pill" onClick={handlePrevStep5}>
                            <i className="bi bi-arrow-left me-1"></i> Back
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 6: Confirmation Screen */}
                    {step === 6 && (
                      <div className="wizard-step">
                        <div className="application-ref-card text-center mb-4 py-4">
                          <div className="display-1 text-success mb-2">
                            <i className="bi bi-check-circle-fill"></i>
                          </div>
                          <h2 className="fw-bold text-navy mb-2">Application Submitted Successfully!</h2>
                          <p className="text-secondary max-w-600 mx-auto mb-4">
                            Your official license application has been received and registered under Central Traffic Department protocol.
                          </p>
                          <div className="d-inline-block bg-white p-3 rounded-4 shadow-sm border mb-4">
                            <small className="text-muted d-block mb-1">Official Reference Number</small>
                            <span className="fs-4 fw-bold text-red">{successAppId}</span>
                          </div>
                          <div className="d-flex flex-wrap justify-content-center gap-3">
                            <Link to="/driving-tests" className="btn btn-licentra-primary">
                              <i className="bi bi-calendar2-plus me-1"></i> Book Driving Test Now
                            </Link>
                            <button
                              type="button"
                              className="btn btn-licentra-outline-red"
                              onClick={() => {
                                setActiveTab('my-apps');
                                setStep(1);
                              }}
                            >
                              <i className="bi bi-folder2-open me-1"></i> View My Applications
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            )}

            {/* ===================================================================
                 TAB 2: MY APPLICATIONS LIST
                 =================================================================== */}
            {activeTab === 'my-apps' && (
              <div className="tab-pane fade show active">
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-surface-card">
                  <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                    <div>
                      <h4 className="fw-bold text-navy mb-1">Your Submitted Applications</h4>
                      <p className="text-muted small mb-0">Track the real-time review, test clearance, and issuance status of your requests.</p>
                    </div>
                    <button
                      className="btn btn-licentra-primary btn-sm mt-3 mt-md-0"
                      onClick={() => {
                        setActiveTab('new-app');
                        setStep(1);
                      }}
                    >
                      <i className="bi bi-plus me-1"></i> New Application
                    </button>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Reference ID</th>
                          <th>Service</th>
                          <th>Class</th>
                          <th>Submitted Date</th>
                          <th>Fee Status</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center py-5 text-muted">
                              <i className="bi bi-file-earmark-x fs-1 d-block mb-2 opacity-50"></i>
                              No license applications submitted yet.
                            </td>
                          </tr>
                        ) : (
                          applications.map((app) => (
                            <tr key={app.id}>
                              <td className="fw-bold text-navy">{app.id}</td>
                              <td>{app.serviceName || app.serviceId}</td>
                              <td>{app.licenseClass}</td>
                              <td className="text-muted small">{app.submissionDate || 'Recently'}</td>
                              <td>
                                <span className="badge bg-success-subtle text-success">
                                  <i className="bi bi-check-circle me-1"></i> Paid ({app.totalFee || app.feePaid || 'EGP 830'})
                                </span>
                              </td>
                              <td>
                                <span
                                  className={`badge ${
                                    app.status === 'Approved'
                                      ? 'bg-success'
                                      : app.status === 'Rejected'
                                      ? 'bg-danger'
                                      : 'bg-warning text-dark'
                                  }`}
                                >
                                  {app.status}
                                </span>
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm btn-outline-secondary py-0 px-2 rounded-pill"
                                  onClick={() => {
                                    showToast(`Application #${app.id}: Documents verified, awaiting administrative sign-off.`, 'info');
                                  }}
                                >
                                  Details
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ===================================================================
                 TAB 3: MY TEST BOOKINGS LIST
                 =================================================================== */}
            {activeTab === 'my-bookings' && (
              <div className="tab-pane fade show active">
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-surface-card">
                  <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                    <div>
                      <h4 className="fw-bold text-navy mb-1">Your Driving Test Appointments</h4>
                      <p className="text-muted small mb-0">Review upcoming examinations, reschedule dates, or cancel reservations.</p>
                    </div>
                    <Link to="/driving-tests" className="btn btn-licentra-primary btn-sm mt-3 mt-md-0">
                      <i className="bi bi-calendar-plus me-1"></i> Book Another Test
                    </Link>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Booking Ref</th>
                          <th>Test Type</th>
                          <th>Test Center</th>
                          <th>Date &amp; Time</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center py-5 text-muted">
                              <i className="bi bi-calendar-x fs-1 d-block mb-2 opacity-50"></i>
                              You have no driving test appointments scheduled.
                            </td>
                          </tr>
                        ) : (
                          bookings.map((b) => (
                            <tr key={b.id}>
                              <td className="fw-bold text-navy">{b.id}</td>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  <i className="bi bi-display text-red"></i>
                                  <span>{b.testType}</span>
                                </div>
                              </td>
                              <td>{b.center}</td>
                              <td>
                                <div>{b.date}</div>
                                <small className="text-muted">{b.timeSlot}</small>
                              </td>
                              <td>
                                <span
                                  className={`badge ${
                                    b.status === 'Confirmed' || b.status === 'Completed'
                                      ? 'bg-success'
                                      : b.status === 'Rescheduled'
                                      ? 'bg-info text-dark'
                                      : b.status === 'Cancelled'
                                      ? 'bg-danger'
                                      : 'bg-secondary'
                                  }`}
                                >
                                  {b.status}
                                </span>
                              </td>
                              <td>
                                {b.status !== 'Cancelled' && b.status !== 'Completed' && (
                                  <div className="d-flex gap-1">
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-secondary py-0 px-2 rounded-pill"
                                      onClick={() => handleOpenReschedule(b)}
                                    >
                                      Reschedule
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-danger py-0 px-2 rounded-pill"
                                      onClick={() => handleCancelBooking(b.id)}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Reschedule Modal */}
      {rescheduleModalOpen && rescheduleBooking && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          role="dialog"
          onClick={(e) => {
            if (e.target.classList.contains('modal')) setRescheduleModalOpen(false);
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header bg-navy text-white px-4 py-3">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-clock-history text-red me-2"></i> Reschedule Test Appointment
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setRescheduleModalOpen(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleConfirmReschedule}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-navy">Selected Test</label>
                    <input
                      type="text"
                      className="form-control"
                      value={`${rescheduleBooking.testType} - ${rescheduleBooking.center}`}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-navy">
                      Select New Date <span className="text-red">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={rescheduleDate}
                      onChange={(e) => setRescheduleDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-navy">
                      Select Time Slot <span className="text-red">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={rescheduleSlot}
                      onChange={(e) => setRescheduleSlot(e.target.value)}
                      required
                    >
                      <option value="08:30 AM – 10:00 AM">08:30 AM – 10:00 AM</option>
                      <option value="10:30 AM – 12:00 PM">10:30 AM – 12:00 PM</option>
                      <option value="12:30 PM – 02:00 PM">12:30 PM – 02:00 PM</option>
                      <option value="02:30 PM – 04:00 PM">02:30 PM – 04:00 PM</option>
                    </select>
                  </div>
                  <div className="text-end pt-2">
                    <button
                      type="button"
                      className="btn btn-secondary rounded-pill me-2"
                      onClick={() => setRescheduleModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-licentra-primary">
                      Confirm Reschedule <i className="bi bi-check2"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserApply;

