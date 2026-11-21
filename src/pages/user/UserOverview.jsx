import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LicentraDB } from '../../services/db';
import { showToast } from '../../components/common/Toast';

export function UserOverview() {
  const { user, updateProfile } = useAuth();
  const [stats, setStats] = useState({
    totalLicenses: 0,
    totalApplications: 0,
    upcomingAppointments: 0,
    completedAppointments: 0,
  });
  const [activeLicense, setActiveLicense] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [activities, setActivities] = useState([]);

  // Modals
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editAddress, setEditAddress] = useState(user?.address || '');
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrCodeVal, setQrCodeVal] = useState('');

  const loadOverview = () => {
    if (!user) return;
    const userStats = LicentraDB.getUserStats(user.email);
    setStats(userStats);

    const lics = LicentraDB.getLicenses(user.email);
    const active = lics.find((l) => l.status === 'Active') || lics[0] || null;
    setActiveLicense(active);

    const notifs = LicentraDB.getNotifications(user.email);
    setNotifications(notifs);

    const acts = LicentraDB.getRecentActivities(user.email);
    setActivities(acts);
  };

  useEffect(() => {
    loadOverview();
    if (user) {
      setEditPhone(user.phone || '');
      setEditAddress(user.address || '');
    }
  }, [user]);

  const handleMarkAllRead = () => {
    if (!user) return;
    LicentraDB.markAllNotificationsRead(user.email);
    loadOverview();
    showToast('All notifications marked as read.', 'info');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!user) return;

    updateProfile({
      phone: editPhone.trim(),
      address: editAddress.trim(),
    });

    showToast('Profile information updated successfully!', 'success');
    setShowEditModal(false);
  };

  const handleShowQr = (licNum) => {
    setQrCodeVal(licNum || 'EG-2987654321');
    setShowQrModal(true);
  };

  const handleDownloadPdf = (licNum) => {
    showToast(`Smart Card PDF pass generated for license #${licNum || 'EG-2987654321'}. Starting download...`, 'success');
  };

  return (
    <div className="container py-5">
      {/* Welcome Banner */}
      <div className="p-4 p-md-5 rounded-4 bg-navy text-white mb-4 position-relative overflow-hidden shadow-sm">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <span className="badge bg-danger text-white rounded-pill px-3 py-1 mb-2">
              <i className="bi bi-person-badge-fill me-1"></i> Citizen Digital ID
            </span>
            <h2 className="fw-bold mb-2">Welcome Back, {user?.fullName?.split(' ')[0] || 'Citizen'}!</h2>
            <p className="text-light opacity-90 mb-0 max-w-600">
              Your official Licentra digital dashboard. Manage active licenses, track your ongoing applications, and review upcoming driving exam schedules.
            </p>
          </div>
          <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
            <button className="btn btn-licentra-primary" onClick={() => setShowEditModal(true)}>
              <i className="bi bi-pencil-square me-1"></i> Update Contact Info
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="row g-3 mb-5">
        <div className="col-sm-6 col-lg-3">
          <div className="metric-card p-3 p-md-4 rounded-4 border bg-surface h-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small fw-semibold">Active Licenses</span>
              <div className="metric-icon-box bg-danger-subtle text-danger p-2 rounded-3">
                <i className="bi bi-card-heading fs-5"></i>
              </div>
            </div>
            <h3 className="fw-bold text-navy mb-0">{stats.totalLicenses}</h3>
            <small className="text-muted">Issued driving credentials</small>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="metric-card p-3 p-md-4 rounded-4 border bg-surface h-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small fw-semibold">Applications</span>
              <div className="metric-icon-box bg-primary-subtle text-primary p-2 rounded-3">
                <i className="bi bi-folder2-open fs-5"></i>
              </div>
            </div>
            <h3 className="fw-bold text-navy mb-0">{stats.totalApplications}</h3>
            <small className="text-muted">Submitted citizen requests</small>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="metric-card p-3 p-md-4 rounded-4 border bg-surface h-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small fw-semibold">Upcoming Tests</span>
              <div className="metric-icon-box bg-warning-subtle text-warning p-2 rounded-3">
                <i className="bi bi-calendar3 fs-5"></i>
              </div>
            </div>
            <h3 className="fw-bold text-navy mb-0">{stats.upcomingAppointments}</h3>
            <small className="text-muted">Confirmed exam bookings</small>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="metric-card p-3 p-md-4 rounded-4 border bg-surface h-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small fw-semibold">Completed Tests</span>
              <div className="metric-icon-box bg-success-subtle text-success p-2 rounded-3">
                <i className="bi bi-award fs-5"></i>
              </div>
            </div>
            <h3 className="fw-bold text-navy mb-0">{stats.completedAppointments}</h3>
            <small className="text-muted">Cleared examinations</small>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Column: Smart Card & Citizen Profile */}
        <div className="col-lg-6">
          {/* Active License Card */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-surface-card mb-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="fw-bold text-navy mb-0">Active Driver License</h5>
              <span className="badge bg-danger-subtle text-danger">Digital Smart Card</span>
            </div>

            {activeLicense ? (
              <div className="license-card-mockup">
                <div className="license-card-watermark"><i className="bi bi-shield-shaded"></i></div>
                <div className="license-card-header">
                  <div className="license-flag-chip">
                    <div className="license-chip-gold"></div>
                    <div>
                      <div className="license-country-title">ARAB REPUBLIC OF EGYPT</div>
                      <div className="small text-muted" style={{ fontSize: '0.65rem' }}>DRIVING &amp; VEHICLE LICENSE DEPARTMENT</div>
                    </div>
                  </div>
                  <span className="status-pill status-approved">
                    <i className="bi bi-check-circle-fill"></i> Active
                  </span>
                </div>
                <div className="license-card-body">
                  <div className="license-holder-photo">
                    <img
                      src="/assets/images/team/member_mona_ali.png"
                      alt="Holder"
                      onError={(e) => {
                        e.currentTarget.src = '/assets/images/brand/favicon.svg';
                      }}
                    />
                  </div>
                  <div className="license-details-grid">
                    <div className="license-detail-item">
                      <span className="label">Full Name</span>
                      <span className="val text-navy">{activeLicense.holderName || user?.fullName}</span>
                    </div>
                    <div className="license-detail-item">
                      <span className="label">National ID</span>
                      <span className="val text-navy">{activeLicense.nationalId || user?.nationalId || '29504150102345'}</span>
                    </div>
                    <div className="license-detail-item">
                      <span className="label">License Class</span>
                      <span className="val text-navy">{activeLicense.licenseClass || 'Class 3 - Private Car'}</span>
                    </div>
                    <div className="license-detail-item">
                      <span className="label">License No.</span>
                      <span className="val text-red">{activeLicense.licenseNumber || 'EG-2987654321'}</span>
                    </div>
                    <div className="license-detail-item">
                      <span className="label">Issue Date</span>
                      <span className="val">{activeLicense.issueDate || '15 Mar 2023'}</span>
                    </div>
                    <div className="license-detail-item">
                      <span className="label">Expiration Date</span>
                      <span className="val">{activeLicense.expiryDate || '15 Mar 2033'}</span>
                    </div>
                  </div>
                </div>
                <div className="license-card-footer">
                  <div className="license-barcode">||||| | |||| ||| |||||| | |||||</div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary py-0 px-2 rounded-pill"
                      onClick={() => handleShowQr(activeLicense.licenseNumber)}
                    >
                      <i className="bi bi-qr-code"></i> QR Pass
                    </button>
                    <button
                      className="btn btn-sm btn-licentra-primary py-0 px-2 rounded-pill"
                      onClick={() => handleDownloadPdf(activeLicense.licenseNumber)}
                    >
                      <i className="bi bi-download"></i> PDF Card
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-4 border bg-surface text-center">
                <i className="bi bi-card-heading fs-1 text-muted d-block mb-2"></i>
                <h6 className="fw-bold text-navy mb-1">No Active Licenses Found</h6>
                <p className="small text-muted mb-3">You do not currently hold an issued driving license.</p>
                <Link to="/apply" className="btn btn-sm btn-licentra-primary rounded-pill">
                  Apply for a License
                </Link>
              </div>
            )}
          </div>

          {/* Citizen Profile Details Card */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-surface-card">
            <h5 className="fw-bold text-navy mb-3">Official Citizen Record</h5>
            <div className="list-group list-group-flush small">
              <div className="list-group-item d-flex justify-content-between px-0 bg-transparent">
                <span className="text-muted"><i className="bi bi-person me-2"></i> Full Name</span>
                <span className="fw-bold text-navy">{user?.fullName}</span>
              </div>
              <div className="list-group-item d-flex justify-content-between px-0 bg-transparent">
                <span className="text-muted"><i className="bi bi-credit-card-2-front me-2"></i> Egyptian National ID</span>
                <span className="fw-bold text-navy">{user?.nationalId || '29504150102345'}</span>
              </div>
              <div className="list-group-item d-flex justify-content-between px-0 bg-transparent">
                <span className="text-muted"><i className="bi bi-envelope me-2"></i> Email Address</span>
                <span className="fw-bold text-navy">{user?.email}</span>
              </div>
              <div className="list-group-item d-flex justify-content-between px-0 bg-transparent">
                <span className="text-muted"><i className="bi bi-telephone me-2"></i> Mobile Number</span>
                <span className="fw-bold text-navy">{user?.phone || '+20 123 456 7890'}</span>
              </div>
              <div className="list-group-item d-flex justify-content-between px-0 bg-transparent">
                <span className="text-muted"><i className="bi bi-geo-alt me-2"></i> Address</span>
                <span className="fw-bold text-navy">{user?.address || 'Nasr City, Cairo, Egypt'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Notifications & Activity Timeline */}
        <div className="col-lg-6">
          {/* Notifications Card */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-surface-card mb-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <h5 className="fw-bold text-navy mb-0">Notifications</h5>
                {notifications.some((n) => !n.isRead) && (
                  <span className="badge bg-danger rounded-pill">New</span>
                )}
              </div>
              <button className="btn btn-sm btn-link text-decoration-none p-0 text-red" onClick={handleMarkAllRead}>
                Mark All Read
              </button>
            </div>

            <div className="notifications-list">
              {notifications.length === 0 ? (
                <div className="text-center py-4 text-muted small">No notifications at this time.</div>
              ) : (
                notifications.slice(0, 5).map((n) => (
                  <div key={n.id} className={`notification-item p-3 mb-2 rounded-3 border bg-surface d-flex gap-3 ${!n.isRead ? 'border-danger-subtle' : ''}`}>
                    <div
                      className={`notif-icon-box rounded-circle p-2 ${
                        n.type === 'application'
                          ? 'bg-danger-subtle text-danger'
                          : n.type === 'appointment'
                          ? 'bg-primary-subtle text-primary'
                          : 'bg-success-subtle text-success'
                      }`}
                      style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <i className={`bi ${n.type === 'application' ? 'bi-file-earmark-check' : n.type === 'appointment' ? 'bi-calendar-check' : 'bi-bell'}`}></i>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center justify-content-between">
                        <h6 className="fw-bold text-navy mb-0 small">{n.title}</h6>
                        <span className="text-muted" style={{ fontSize: '0.7rem' }}>{n.timeAgo || 'Recently'}</span>
                      </div>
                      <p className="text-secondary small mb-0 mt-1">{n.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-surface-card">
            <h5 className="fw-bold text-navy mb-3">Recent Activity Timeline</h5>
            <div className="activity-timeline">
              {activities.length === 0 ? (
                <div className="text-center py-3 text-muted small">No recent activity logged.</div>
              ) : (
                activities.slice(0, 5).map((act) => (
                  <div key={act.id} className="d-flex align-items-start gap-3 mb-3 pb-2 border-bottom">
                    <div
                      className={`rounded-circle p-2 bg-surface border ${act.color || 'text-primary'}`}
                      style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <i className={`bi ${act.icon || 'bi-check'}`}></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold text-navy mb-0 small">{act.title}</h6>
                      <div className="text-muted small">{act.subtitle}</div>
                      <small className="text-muted" style={{ fontSize: '0.7rem' }}>{act.dateText}</small>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          role="dialog"
          onClick={(e) => {
            if (e.target.classList.contains('modal')) setShowEditModal(false);
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header bg-navy text-white px-4 py-3">
                <h5 className="modal-title fw-bold">Update Profile Contact Info</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowEditModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleSaveProfile}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-navy">Mobile Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-navy">Residential Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-end pt-2">
                    <button
                      type="button"
                      className="btn btn-secondary rounded-pill me-2"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-licentra-primary">
                      Save Changes <i className="bi bi-check2"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Pass Modal */}
      {showQrModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          role="dialog"
          onClick={(e) => {
            if (e.target.classList.contains('modal')) setShowQrModal(false);
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden text-center p-4">
              <h5 className="fw-bold text-navy mb-2">Digital License QR Pass</h5>
              <p className="text-muted small mb-4">
                Scan this cryptographically signed code at any Egyptian traffic authority checkpoint.
              </p>
              <div className="p-4 bg-light rounded-4 d-inline-block mx-auto mb-3 border">
                <i className="bi bi-qr-code text-navy" style={{ fontSize: '7rem' }}></i>
              </div>
              <div className="small fw-bold text-red mb-4">Pass Identifier: {qrCodeVal}</div>
              <div>
                <button className="btn btn-secondary rounded-pill px-4" onClick={() => setShowQrModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserOverview;

