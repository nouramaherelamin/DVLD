import React, { useState, useEffect } from 'react';
import { LicentraDB } from '../../services/db';
import { showToast } from '../../components/common/Toast';

export function AdminPeopleApplications() {
  const [activeTab, setActiveTab] = useState('apps'); // 'apps' | 'people'
  const [apps, setApps] = useState([]);
  const [users, setUsers] = useState([]);

  // Application filters
  const [appFilter, setAppFilter] = useState('all');
  const [appSearch, setAppSearch] = useState('');

  // People search
  const [peopleSearch, setPeopleSearch] = useState('');

  // User Profile Modal
  const [selectedCitizen, setSelectedCitizen] = useState(null);
  const [showCitizenModal, setShowCitizenModal] = useState(false);

  const loadData = () => {
    const allApps = LicentraDB.getApplications();
    setApps([...allApps]);
    const allUsers = LicentraDB.getAllUsers();
    setUsers([...allUsers]);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenDrawer = (appId) => {
    if (window.LicentraDashboard && window.LicentraDashboard.openAppDrawer) {
      window.LicentraDashboard.openAppDrawer(appId);
    }
  };

  const handleApprove = (appId) => {
    LicentraDB.updateApplicationStatus(appId, 'Approved');
    showToast(`Application #${appId} marked as Approved.`, 'success');
    loadData();
  };

  const handleReject = (appId) => {
    LicentraDB.updateApplicationStatus(appId, 'Rejected', 'Document discrepancy');
    showToast(`Application #${appId} marked as Rejected.`, 'warning');
    loadData();
  };

  const handleViewCitizen = (u) => {
    setSelectedCitizen(u);
    setShowCitizenModal(true);
  };

  // Filtered applications
  const filteredApps = apps.filter((a) => {
    const matchesFilter =
      appFilter === 'all' ||
      a.status?.toLowerCase().replace(/\s+/g, '') === appFilter.toLowerCase().replace(/\s+/g, '');
    const q = appSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      a.id?.toLowerCase().includes(q) ||
      a.applicantName?.toLowerCase().includes(q) ||
      a.nationalId?.toLowerCase().includes(q) ||
      a.licenseClass?.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  // Filtered people
  const filteredPeople = users.filter((u) => {
    const q = peopleSearch.toLowerCase().trim();
    return (
      !q ||
      u.fullName?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.nationalId?.toLowerCase().includes(q) ||
      u.phone?.toLowerCase().includes(q)
    );
  });

  return (
    <main className="dashboard-content">
      {/* Hero Banner */}
      <div className="dashboard-page-hero">
        <div className="hero-inner-content">
          <div className="section-tag text-red">&mdash; PEOPLE &amp; APPLICATIONS &mdash;</div>
          <h1 className="fw-bold">
            Manage Drivers, Applicants<br />
            <span className="text-red">and Applications</span>
          </h1>
          <p className="text-secondary">
            View, search, and manage all citizen applications and registered user accounts.
          </p>
        </div>
        <div className="hero-badges">
          <div><i className="bi bi-shield-check text-red"></i> Secure Access</div>
          <div><i className="bi bi-search text-red"></i> Advanced Search</div>
          <div><i className="bi bi-person-check text-red"></i> User Management</div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="admin-tab-switcher mb-4">
        <button
          id="tabBtnApps"
          className={`admin-tab-btn ${activeTab === 'apps' ? 'active' : ''}`}
          onClick={() => setActiveTab('apps')}
        >
          <i className="bi bi-file-earmark-text me-2"></i>License Applications
          <span className="badge bg-danger text-white ms-2 rounded-pill" id="appsCountBadge">
            {apps.length}
          </span>
        </button>
        <button
          id="tabBtnPeople"
          className={`admin-tab-btn ${activeTab === 'people' ? 'active' : ''}`}
          onClick={() => setActiveTab('people')}
        >
          <i className="bi bi-people-fill me-2"></i>Registered Citizens
          <span className="badge bg-danger text-white ms-2 rounded-pill" id="peopleCountBadge">
            {users.length}
          </span>
        </button>
      </div>

      {/* TAB 1: APPLICATIONS */}
      {activeTab === 'apps' && (
        <div className="dashboard-table-card">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
            {/* Status Filters */}
            <div className="d-flex flex-wrap gap-2">
              {['all', 'under review', 'approved', 'rejected'].map((cat) => (
                <button
                  key={cat}
                  className={`btn btn-sm rounded-pill px-3 ${
                    appFilter === cat ? 'btn-danger' : 'btn-outline-secondary'
                  }`}
                  onClick={() => setAppFilter(cat)}
                >
                  {cat === 'all'
                    ? 'All Applications'
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ maxWidth: '300px', width: '100%' }}>
              <input
                type="text"
                className="form-control form-control-sm rounded-pill"
                placeholder="Search by ID, name, NID..."
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="licentra-data-table">
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Applicant Name</th>
                  <th>National ID</th>
                  <th>License Category</th>
                  <th>Date</th>
                  <th>Fee</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">
                      No matching applications found.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((a) => (
                    <tr key={a.id}>
                      <td className="fw-bold text-navy">#{a.id}</td>
                      <td>
                        <div className="fw-semibold text-navy">{a.applicantName}</div>
                        <small className="text-muted">{a.userEmail}</small>
                      </td>
                      <td><code>{a.nationalId}</code></td>
                      <td>{a.licenseClass}</td>
                      <td className="text-muted small">{a.submissionDate || 'Recently'}</td>
                      <td>
                        <span className="badge bg-success-subtle text-success">
                          {a.totalFee || a.feePaid || 'EGP 830'}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            a.status === 'Approved'
                              ? 'bg-success'
                              : a.status === 'Rejected'
                              ? 'bg-danger'
                              : 'bg-warning text-dark'
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-1">
                          <button
                            className="btn btn-sm btn-outline-primary py-0 px-2 rounded-pill"
                            onClick={() => handleOpenDrawer(a.id)}
                            title="View Full Drawer"
                          >
                            Details
                          </button>
                          {a.status !== 'Approved' && (
                            <button
                              className="btn btn-sm btn-success py-0 px-2 rounded-pill"
                              onClick={() => handleApprove(a.id)}
                              title="Approve"
                            >
                              <i className="bi bi-check-lg"></i>
                            </button>
                          )}
                          {a.status !== 'Rejected' && (
                            <button
                              className="btn btn-sm btn-outline-danger py-0 px-2 rounded-pill"
                              onClick={() => handleReject(a.id)}
                              title="Reject"
                            >
                              <i className="bi bi-x-lg"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: REGISTERED CITIZENS */}
      {activeTab === 'people' && (
        <div className="dashboard-table-card">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
            <h5 className="fw-bold text-navy mb-0">Registered Egyptian Citizens</h5>
            <div style={{ maxWidth: '300px', width: '100%' }}>
              <input
                type="text"
                className="form-control form-control-sm rounded-pill"
                placeholder="Search citizen name, email, NID..."
                value={peopleSearch}
                onChange={(e) => setPeopleSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="licentra-data-table">
              <thead>
                <tr>
                  <th>Citizen Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>National ID</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPeople.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      No citizens match the search query.
                    </td>
                  </tr>
                ) : (
                  filteredPeople.map((u) => (
                    <tr key={u.id || u.email}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <span className="user-avatar-circle" style={{ width: '32px', height: '32px' }}>
                            <i className="bi bi-person-fill"></i>
                          </span>
                          <span className="fw-semibold text-navy">{u.fullName}</span>
                        </div>
                      </td>
                      <td>{u.email}</td>
                      <td>{u.phone || 'N/A'}</td>
                      <td><code>{u.nationalId}</code></td>
                      <td>
                        <span className={`badge ${u.role === 'admin' ? 'bg-danger text-white' : 'bg-light text-navy border'}`}>
                          {u.role === 'admin' ? 'Admin' : 'Citizen'}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-success-subtle text-success">
                          <i className="bi bi-check-circle me-1"></i> Verified
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-danger py-0 px-2 rounded-pill"
                          onClick={() => handleViewCitizen(u)}
                        >
                          View Profile
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

      {/* Citizen Profile Modal */}
      {showCitizenModal && selectedCitizen && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          role="dialog"
          onClick={(e) => {
            if (e.target.classList.contains('modal')) setShowCitizenModal(false);
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header bg-navy text-white px-4 py-3">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-person-badge text-red me-2"></i> Citizen Profile Record
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowCitizenModal(false)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="applicant-avatar" style={{ width: '56px', height: '56px', fontSize: '1.5rem' }}>
                    <i className="bi bi-person-fill"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold text-navy mb-0">{selectedCitizen.fullName}</h5>
                    <small className="text-muted">{selectedCitizen.email}</small>
                    <div className="mt-1">
                      <span className="badge bg-success">Ministry of Interior Verified</span>
                    </div>
                  </div>
                </div>

                <div className="list-group list-group-flush small mb-3">
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-muted">National ID</span>
                    <strong className="text-navy">{selectedCitizen.nationalId}</strong>
                  </div>
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-muted">Phone Number</span>
                    <strong className="text-navy">{selectedCitizen.phone || '+20 123 456 7890'}</strong>
                  </div>
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-muted">Registered Role</span>
                    <strong className="text-navy text-capitalize">{selectedCitizen.role || 'citizen'}</strong>
                  </div>
                  <div className="list-group-item d-flex justify-content-between px-0">
                    <span className="text-muted">Governorate</span>
                    <strong className="text-navy">Cairo</strong>
                  </div>
                </div>
              </div>
              <div className="modal-footer px-4 py-2 bg-surface">
                <button
                  className="btn btn-secondary rounded-pill"
                  onClick={() => setShowCitizenModal(false)}
                >
                  Close Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminPeopleApplications;

