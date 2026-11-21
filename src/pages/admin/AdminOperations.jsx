import React, { useState, useEffect } from 'react';
import { LicentraDB, TEST_CENTERS, DRIVING_TESTS } from '../../services/db';
import { showToast } from '../../components/common/Toast';

export function AdminOperations() {
  const [activeTab, setActiveTab] = useState('tests'); // 'tests' | 'appointments' | 'licenses' | 'renewals' | 'centers' | 'reports'

  const [bookings, setBookings] = useState([]);
  const [approvedApps, setApprovedApps] = useState([]);
  const [issuedLicenses, setIssuedLicenses] = useState([]);

  const loadData = () => {
    const allBookings = LicentraDB.getBookings();
    setBookings([...allBookings]);

    const allApps = LicentraDB.getApplications();
    const approved = allApps.filter((a) => a.status === 'Approved');
    setApprovedApps([...approved]);

    const allLicenses = LicentraDB.getLicenses();
    setIssuedLicenses([...allLicenses]);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleIssueSmartCard = (app) => {
    LicentraDB.issueLicense({
      userEmail: app.userEmail,
      holderName: app.applicantName,
      nationalId: app.nationalId,
      licenseClass: app.licenseClass,
      licenseCategory: 'Personal Motor Vehicle',
    });

    LicentraDB.updateApplicationStatus(app.id, 'Issued');
    showToast(`Smart Card License successfully issued for ${app.applicantName}!`, 'success');
    loadData();
  };

  const handleMarkPass = (bookingId) => {
    LicentraDB.rescheduleBooking(bookingId, undefined, undefined);
    const all = LicentraDB.getBookings();
    const b = all.find((item) => item.id === bookingId);
    if (b) {
      b.status = 'Completed';
      b.score = '38/40 (95%)';
      localStorage.setItem('licentra_db_bookings', JSON.stringify(all));
    }
    showToast(`Examination #${bookingId} marked as PASSED.`, 'success');
    loadData();
  };

  const handleMarkFail = (bookingId) => {
    const all = LicentraDB.getBookings();
    const b = all.find((item) => item.id === bookingId);
    if (b) {
      b.status = 'Failed';
      b.score = '26/40 (65%)';
      localStorage.setItem('licentra_db_bookings', JSON.stringify(all));
    }
    showToast(`Examination #${bookingId} marked as FAILED. Retest required.`, 'warning');
    loadData();
  };

  return (
    <main className="dashboard-content">
      {/* Hero Banner */}
      <div className="dashboard-page-hero">
        <div className="hero-inner-content">
          <div className="section-tag text-red">&mdash; OPERATIONS MANAGEMENT &mdash;</div>
          <h1 className="fw-bold">
            Driving Tests, Licenses<br />
            <span className="text-red">&amp; Operations Center</span>
          </h1>
          <p className="text-secondary">
            Manage test appointments, issue licenses, renewals, replacements, test centers, and generate department reports.
          </p>
        </div>
        <div className="hero-badges">
          <div><i className="bi bi-calendar-check text-red"></i> Safer Tests</div>
          <div><i className="bi bi-award text-red"></i> Better Drivers</div>
          <div><i className="bi bi-road text-red"></i> Smoother Roads</div>
        </div>
      </div>

      {/* Operations Tab Navigation */}
      <div className="operations-tabs-nav mb-4">
        {[
          { id: 'tests', label: 'Driving Tests', icon: 'bi-clipboard-check' },
          { id: 'appointments', label: 'Appointments', icon: 'bi-calendar3', badge: bookings.length },
          { id: 'licenses', label: 'License Issuance', icon: 'bi-card-heading', badge: approvedApps.length },
          { id: 'renewals', label: 'Renewals', icon: 'bi-arrow-repeat' },
          { id: 'centers', label: 'Test Centers', icon: 'bi-building' },
          { id: 'reports', label: 'Reports', icon: 'bi-bar-chart-line' },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`operations-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <i className={`bi ${tab.icon} me-1`}></i>
            {tab.label}
            {tab.badge !== undefined && (
              <span className="badge bg-danger text-white rounded-pill ms-2">{tab.badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: DRIVING TESTS */}
      {activeTab === 'tests' && (
        <div className="operations-tab-pane">
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="card h-100 p-4 rounded-4 border bg-surface-card">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="badge bg-danger text-white">Lab Exam</span>
                  <i className="bi bi-display fs-4 text-red"></i>
                </div>
                <h5 className="fw-bold text-navy mb-1">{DRIVING_TESTS.theory?.name || 'Theory Test'}</h5>
                <p className="small text-secondary mb-3">{DRIVING_TESTS.theory?.description}</p>
                <div className="border-top pt-3 small text-navy">
                  <div className="d-flex justify-content-between mb-1">
                    <span>Duration:</span> <strong>{DRIVING_TESTS.theory?.duration_minutes} Mins</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span>Passing Score:</span> <strong className="text-success">{DRIVING_TESTS.theory?.passing_score}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Fee:</span> <strong>EGP {DRIVING_TESTS.theory?.standard_fee}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 p-4 rounded-4 border bg-surface-card">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="badge bg-primary text-white">Optometry</span>
                  <i className="bi bi-eye fs-4 text-primary"></i>
                </div>
                <h5 className="fw-bold text-navy mb-1">{DRIVING_TESTS.vision?.name || 'Vision Test'}</h5>
                <p className="small text-secondary mb-3">{DRIVING_TESTS.vision?.description}</p>
                <div className="border-top pt-3 small text-navy">
                  <div className="d-flex justify-content-between mb-1">
                    <span>Duration:</span> <strong>{DRIVING_TESTS.vision?.duration_minutes} Mins</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span>Requirement:</span> <strong className="text-success">{DRIVING_TESTS.vision?.passing_score}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Fee:</span> <strong>EGP {DRIVING_TESTS.vision?.standard_fee}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 p-4 rounded-4 border bg-surface-card">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="badge bg-success text-white">Track Maneuver</span>
                  <i className="bi bi-car-front fs-4 text-success"></i>
                </div>
                <h5 className="fw-bold text-navy mb-1">{DRIVING_TESTS.practical?.name || 'Practical Test'}</h5>
                <p className="small text-secondary mb-3">{DRIVING_TESTS.practical?.description}</p>
                <div className="border-top pt-3 small text-navy">
                  <div className="d-flex justify-content-between mb-1">
                    <span>Duration:</span> <strong>{DRIVING_TESTS.practical?.duration_minutes} Mins</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span>Criteria:</span> <strong className="text-success">{DRIVING_TESTS.practical?.passing_score}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Fee:</span> <strong>EGP {DRIVING_TESTS.practical?.standard_fee}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: APPOINTMENTS */}
      {activeTab === 'appointments' && (
        <div className="dashboard-table-card">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="fw-bold text-navy mb-0">Examination Appointments Schedule</h5>
            <span className="badge bg-danger-subtle text-danger">Real-time Central Scheduling</span>
          </div>

          <div className="table-responsive">
            <table className="licentra-data-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Candidate</th>
                  <th>National ID</th>
                  <th>Test Type</th>
                  <th>Center</th>
                  <th>Date &amp; Slot</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">No appointments found.</td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b.id}>
                      <td className="fw-bold text-navy">#{b.id}</td>
                      <td className="fw-semibold text-navy">{b.applicantName}</td>
                      <td><code>{b.nationalId}</code></td>
                      <td>{b.testType}</td>
                      <td>{b.center}</td>
                      <td>
                        <div>{b.date}</div>
                        <small className="text-muted">{b.timeSlot}</small>
                      </td>
                      <td>
                        <span className={`badge ${b.status === 'Completed' ? 'bg-success' : b.status === 'Failed' ? 'bg-danger' : 'bg-info text-dark'}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="text-end">
                        {b.status !== 'Completed' && b.status !== 'Failed' && (
                          <div className="d-flex justify-content-end gap-1">
                            <button
                              className="btn btn-sm btn-success py-0 px-2 rounded-pill"
                              onClick={() => handleMarkPass(b.id)}
                              title="Mark Passed"
                            >
                              Pass
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger py-0 px-2 rounded-pill"
                              onClick={() => handleMarkFail(b.id)}
                              title="Mark Failed"
                            >
                              Fail
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
      )}

      {/* TAB 3: LICENSE ISSUANCE QUEUE */}
      {activeTab === 'licenses' && (
        <div className="dashboard-table-card">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h5 className="fw-bold text-navy mb-0">Smart Card Production Queue</h5>
              <small className="text-muted">Applications approved and cleared for biometric smart card printing</small>
            </div>
            <span className="badge bg-success text-white">
              {approvedApps.length} Ready for Production
            </span>
          </div>

          <div className="table-responsive">
            <table className="licentra-data-table">
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Applicant Name</th>
                  <th>National ID</th>
                  <th>Target Class</th>
                  <th>Clearance</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {approvedApps.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No applications currently pending physical card issuance.
                    </td>
                  </tr>
                ) : (
                  approvedApps.map((a) => (
                    <tr key={a.id}>
                      <td className="fw-bold text-navy">#{a.id}</td>
                      <td className="fw-semibold text-navy">{a.applicantName}</td>
                      <td><code>{a.nationalId}</code></td>
                      <td>{a.licenseClass}</td>
                      <td>
                        <span className="badge bg-success-subtle text-success">
                          <i className="bi bi-shield-check me-1"></i> Tests &amp; Medical Passed
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-licentra-primary py-1 px-3 rounded-pill"
                          onClick={() => handleIssueSmartCard(a)}
                        >
                          <i className="bi bi-printer-fill me-1"></i> Issue Smart Card
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: RENEWALS */}
      {activeTab === 'renewals' && (
        <div className="dashboard-table-card">
          <h5 className="fw-bold text-navy mb-3">License Renewal Operations</h5>
          <p className="text-muted small">
            Prosecution fine clearances and optometry verification for 10-year credential extensions.
          </p>
          <div className="table-responsive">
            <table className="licentra-data-table">
              <thead>
                <tr>
                  <th>Citizen</th>
                  <th>National ID</th>
                  <th>Existing License</th>
                  <th>Prosecution Fine Clearance</th>
                  <th>Medical Check</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fw-semibold text-navy">Ahmed Ali Hassan</td>
                  <td><code>29504150102345</code></td>
                  <td>Class 3 - Private Car</td>
                  <td><span className="badge bg-success-subtle text-success">Cleared (0 Fines)</span></td>
                  <td><span className="badge bg-success-subtle text-success">Form 287-B Verified</span></td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-success py-0 px-2 rounded-pill"
                      onClick={() => showToast('Renewal approved. Smart card queued for dispatch.', 'success')}
                    >
                      Approve Renewal
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: TEST CENTERS */}
      {activeTab === 'centers' && (
        <div className="row g-4">
          {TEST_CENTERS.map((tc) => (
            <div key={tc.id} className="col-md-6 col-lg-3">
              <div className="metric-card p-3 p-md-4 rounded-4 border bg-surface-card h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h5 className="fw-bold text-navy mb-0">{tc.name}</h5>
                    <span className="badge bg-success text-white">Open</span>
                  </div>
                  <p className="small text-muted mb-2">
                    <i className="bi bi-geo-alt-fill text-red me-1"></i> {tc.address}
                  </p>
                  <div className="small text-secondary mb-3">
                    <i className="bi bi-telephone text-muted me-1"></i> {tc.phone}
                  </div>
                </div>
                <div className="border-top pt-2 d-flex justify-content-between align-items-center small">
                  <span>Hours: {tc.operating_hours || '08:00 – 16:00'}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary py-0 px-2 rounded-pill"
                    onClick={() => showToast(`${tc.name} operating configuration is active.`, 'info')}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 6: REPORTS */}
      {activeTab === 'reports' && (
        <div className="dashboard-table-card">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h5 className="fw-bold text-navy mb-1">Department Operations Report</h5>
              <small className="text-muted">Monthly statistical throughput and executive summary</small>
            </div>
            <button
              className="btn btn-licentra-primary btn-sm"
              onClick={() => showToast('Monthly Operations Report (PDF) generated and downloaded.', 'success')}
            >
              <i className="bi bi-file-earmark-pdf-fill me-1"></i> Export PDF Report
            </button>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-sm-6 col-md-3">
              <div className="p-3 rounded-3 border bg-surface">
                <span className="text-muted small">Total Throughput</span>
                <div className="fs-4 fw-bold text-navy">2,583</div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="p-3 rounded-3 border bg-surface">
                <span className="text-muted small">Revenue Collected</span>
                <div className="fs-4 fw-bold text-success">EGP 2,143,890</div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="p-3 rounded-3 border bg-surface">
                <span className="text-muted small">Average Wait Time</span>
                <div className="fs-4 fw-bold text-navy">12 Mins</div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="p-3 rounded-3 border bg-surface">
                <span className="text-muted small">Citizen Satisfaction</span>
                <div className="fs-4 fw-bold text-primary">98.4%</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminOperations;

