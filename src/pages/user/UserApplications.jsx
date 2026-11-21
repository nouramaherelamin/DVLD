import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LicentraDB, SERVICES, CLASSES } from '../../services/db';
import { showToast } from '../../components/common/Toast';

export function UserApplications() {
  const { user } = useAuth();
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Renewal & Replacement modal state
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [showReplacementModal, setShowReplacementModal] = useState(false);
  const [renewalClass, setRenewalClass] = useState('Class 3 - Private Car');
  const [replacementReason, setReplacementReason] = useState('Damaged Card');

  const loadApps = () => {
    if (!user) return;
    const userApps = LicentraDB.getApplications(user.email);
    setApps([...userApps]);
  };

  useEffect(() => {
    loadApps();
  }, [user]);

  const handleOpenDetails = (app) => {
    setSelectedApp(app);
    setShowDetailModal(true);
  };

  const handleRenewalSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    const newApp = LicentraDB.submitApplication({
      userEmail: user.email,
      serviceId: 'renewal',
      serviceName: 'License Renewal',
      licenseClass: renewalClass,
      applicantName: user.fullName,
      nationalId: user.nationalId || '29504150102345',
      phone: user.phone || '+20 123 456 7890',
      totalFee: 'EGP 650',
      documents: ['Expired_License.pdf', 'Fine_Clearance.pdf'],
    });

    LicentraDB.addActivity({
      userEmail: user.email,
      title: 'Renewal Application Submitted',
      subtitle: renewalClass,
      dateText: 'Just now',
      icon: 'bi-arrow-repeat',
      color: 'text-warning',
    });

    showToast(`Renewal Application #${newApp.id} submitted successfully!`, 'success');
    setShowRenewalModal(false);
    loadApps();
  };

  const handleReplacementSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    const newApp = LicentraDB.submitApplication({
      userEmail: user.email,
      serviceId: 'replacement',
      serviceName: `License Replacement (${replacementReason})`,
      licenseClass: 'Class 3 - Private Car',
      applicantName: user.fullName,
      nationalId: user.nationalId || '29504150102345',
      phone: user.phone || '+20 123 456 7890',
      totalFee: 'EGP 450',
      documents: ['National_ID.pdf', 'Police_Report.pdf'],
    });

    LicentraDB.addActivity({
      userEmail: user.email,
      title: 'Replacement Request Submitted',
      subtitle: replacementReason,
      dateText: 'Just now',
      icon: 'bi-card-heading',
      color: 'text-info',
    });

    showToast(`Replacement Request #${newApp.id} submitted!`, 'success');
    setShowReplacementModal(false);
    loadApps();
  };

  return (
    <div className="container py-5">
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
        <div>
          <span className="badge bg-danger text-white rounded-pill px-3 py-1 mb-2">
            <i className="bi bi-file-earmark-text-fill me-1"></i> Citizen Services
          </span>
          <h2 className="fw-bold text-navy mb-1">My License Applications</h2>
          <p className="text-muted small mb-0">Track review, medical clearance, and issuance for all submitted requests.</p>
        </div>
        <div className="d-flex gap-2 mt-3 mt-md-0">
          <button className="btn btn-outline-danger btn-sm" onClick={() => setShowRenewalModal(true)}>
            <i className="bi bi-arrow-repeat me-1"></i> Renew License
          </button>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => setShowReplacementModal(true)}>
            <i className="bi bi-card-heading me-1"></i> Replace Lost/Damaged
          </button>
          <Link to="/apply" className="btn btn-licentra-primary btn-sm">
            <i className="bi bi-plus-lg me-1"></i> New Application
          </Link>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 p-4 bg-surface-card">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 licentra-data-table">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Reference ID</th>
                <th>Service &amp; Category</th>
                <th>Submission Date</th>
                <th>Fee Paid</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apps.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    <i className="bi bi-file-earmark-x fs-1 d-block mb-2 opacity-50"></i>
                    You haven't submitted any license applications yet.
                  </td>
                </tr>
              ) : (
                apps.map((app, idx) => (
                  <tr key={app.id}>
                    <td className="fw-bold text-navy">{idx + 1}</td>
                    <td className="fw-semibold text-navy">{app.id}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-car-front-fill text-red"></i>
                        <div>
                          <div className="fw-semibold text-navy">{app.serviceName || app.serviceId}</div>
                          <small className="text-muted">{app.licenseClass}</small>
                        </div>
                      </div>
                    </td>
                    <td className="text-muted small">{app.submissionDate || 'Recently'}</td>
                    <td>
                      <span className="badge bg-success-subtle text-success">
                        {app.totalFee || app.feePaid || 'EGP 830'}
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
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-primary py-0 px-2 rounded-pill"
                        onClick={() => handleOpenDetails(app)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailModal && selectedApp && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          role="dialog"
          onClick={(e) => {
            if (e.target.classList.contains('modal')) setShowDetailModal(false);
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header bg-navy text-white px-4 py-3">
                <h5 className="modal-title fw-bold">Application #{selectedApp.id}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowDetailModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="list-group list-group-flush small mb-3">
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-muted">Applicant Name</span>
                    <strong className="text-navy">{selectedApp.applicantName}</strong>
                  </div>
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-muted">National ID</span>
                    <strong className="text-navy">{selectedApp.nationalId}</strong>
                  </div>
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-muted">Service</span>
                    <strong className="text-navy">{selectedApp.serviceName || selectedApp.serviceId}</strong>
                  </div>
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-muted">License Category</span>
                    <strong className="text-navy">{selectedApp.licenseClass}</strong>
                  </div>
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-muted">Submitted Date</span>
                    <strong className="text-navy">{selectedApp.submissionDate || 'Recently'}</strong>
                  </div>
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-muted">Current Status</span>
                    <span className={`badge ${selectedApp.status === 'Approved' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {selectedApp.status}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-surface rounded-3 border">
                  <h6 className="fw-bold text-navy mb-2 small">Verification Status</h6>
                  <div className="d-flex align-items-center gap-2 small text-success">
                    <i className="bi bi-shield-check"></i> Identity and medical requirements confirmed.
                  </div>
                </div>
              </div>
              <div className="modal-footer px-4 py-2 bg-surface">
                <button className="btn btn-secondary rounded-pill" onClick={() => setShowDetailModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Renewal Modal */}
      {showRenewalModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          role="dialog"
          onClick={(e) => {
            if (e.target.classList.contains('modal')) setShowRenewalModal(false);
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header bg-navy text-white px-4 py-3">
                <h5 className="modal-title fw-bold">Online License Renewal</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowRenewalModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleRenewalSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-navy">License Category</label>
                    <select
                      className="form-select"
                      value={renewalClass}
                      onChange={(e) => setRenewalClass(e.target.value)}
                    >
                      {CLASSES.map((c) => (
                        <option key={c.id} value={`${c.code} - ${c.name}`}>
                          {c.code} - {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="p-3 bg-surface rounded-3 border mb-3 small">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Statutory Renewal Fee:</span>
                      <strong>EGP 650</strong>
                    </div>
                    <div className="text-muted">Includes fine clearance check &amp; smart card production.</div>
                  </div>
                  <div className="text-end">
                    <button type="button" className="btn btn-secondary rounded-pill me-2" onClick={() => setShowRenewalModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-licentra-primary">
                      Submit Renewal Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Replacement Modal */}
      {showReplacementModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          role="dialog"
          onClick={(e) => {
            if (e.target.classList.contains('modal')) setShowReplacementModal(false);
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header bg-navy text-white px-4 py-3">
                <h5 className="modal-title fw-bold">Request License Replacement</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowReplacementModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleReplacementSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-navy">Reason for Replacement</label>
                    <select
                      className="form-select"
                      value={replacementReason}
                      onChange={(e) => setReplacementReason(e.target.value)}
                    >
                      <option value="Damaged Card">Damaged / Defective Smart Card</option>
                      <option value="Lost Card">Lost / Misplaced Card</option>
                      <option value="Stolen Card">Stolen Card (Police Declaration Attached)</option>
                    </select>
                  </div>
                  <div className="p-3 bg-surface rounded-3 border mb-3 small">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Replacement Card Fee:</span>
                      <strong>EGP 450</strong>
                    </div>
                  </div>
                  <div className="text-end">
                    <button type="button" className="btn btn-secondary rounded-pill me-2" onClick={() => setShowReplacementModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-licentra-primary">
                      Submit Replacement
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

export default UserApplications;

