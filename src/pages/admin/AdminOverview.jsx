import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LicentraDB } from '../../services/db';
import { showToast } from '../../components/common/Toast';

export function AdminOverview() {
  const [stats, setStats] = useState({
    totalApplications: 2583,
    issuedLicenses: 1964,
    pendingApplications: 742,
    approvedApplications: 1421,
    upcomingTests: 487,
    totalUsers: 500120,
    passRate: 81,
  });

  const [recentApps, setRecentApps] = useState([]);
  const [upcomingTests, setUpcomingTests] = useState([]);

  useEffect(() => {
    const adminStats = LicentraDB.getAdminStats();
    setStats(adminStats);

    const apps = LicentraDB.getApplications();
    setRecentApps(apps.slice(0, 6));

    const bookings = LicentraDB.getBookings();
    setUpcomingTests(bookings.slice(0, 5));
  }, []);

  const handleOpenDrawer = (appId) => {
    if (window.LicentraDashboard && window.LicentraDashboard.openAppDrawer) {
      window.LicentraDashboard.openAppDrawer(appId);
    }
  };

  return (
    <main className="dashboard-content">
      {/* Hero Banner (matching UI reference p13.jpeg) */}
      <div className="dashboard-banner">
        <div className="dashboard-banner-tag">&mdash; EXECUTIVE OVERVIEW &mdash;</div>
        <h1>
          Welcome Back, <span>Admin!</span>
        </h1>
        <p>
          Here's what's happening at Licentra today. Track applications, tests, licenses and manage all operations in one place.
        </p>
        <div className="banner-features-pill">
          <div className="banner-feature-badge">
            <i className="bi bi-shield-check"></i> Safer Tests
          </div>
          <div className="banner-feature-badge">
            <i className="bi bi-speedometer2"></i> Better Drivers
          </div>
          <div className="banner-feature-badge">
            <i className="bi bi-geo-alt"></i> Smoother Roads
          </div>
        </div>
      </div>

      {/* 6 Metric Stat Cards (Matching UI reference p13.jpeg) */}
      <div className="row g-3 mb-4">
        {/* Total Applications */}
        <div className="col-sm-6 col-lg-4 col-xl-2">
          <div className="metric-card">
            <div className="metric-card-top">
              <div className="metric-icon-box metric-icon-red">
                <i className="bi bi-file-earmark-text-fill"></i>
              </div>
              <svg className="sparkline-svg" viewBox="0 0 80 26">
                <path d="M 0,22 Q 20,24 40,12 T 80,4" fill="none" stroke="#ED2939" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="metric-value">{stats.totalApplications.toLocaleString()}</div>
              <div className="metric-label">Total Applications</div>
            </div>
            <div className="metric-trend up">
              <i className="bi bi-arrow-up-right"></i> +12% vs last month
            </div>
          </div>
        </div>

        {/* Issued Licenses */}
        <div className="col-sm-6 col-lg-4 col-xl-2">
          <div className="metric-card">
            <div className="metric-card-top">
              <div className="metric-icon-box metric-icon-blue">
                <i className="bi bi-card-heading"></i>
              </div>
              <svg className="sparkline-svg" viewBox="0 0 80 26">
                <path d="M 0,20 Q 20,18 40,10 T 80,6" fill="none" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="metric-value">{stats.issuedLicenses.toLocaleString()}</div>
              <div className="metric-label">Issued Licenses</div>
            </div>
            <div className="metric-trend up">
              <i className="bi bi-arrow-up-right"></i> +8% vs last month
            </div>
          </div>
        </div>

        {/* Pending Applications */}
        <div className="col-sm-6 col-lg-4 col-xl-2">
          <div className="metric-card">
            <div className="metric-card-top">
              <div className="metric-icon-box metric-icon-yellow">
                <i className="bi bi-clock-history"></i>
              </div>
              <svg className="sparkline-svg" viewBox="0 0 80 26">
                <path d="M 0,10 Q 25,20 50,14 T 80,18" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="metric-value">{stats.pendingApplications.toLocaleString()}</div>
              <div className="metric-label">Pending Review</div>
            </div>
            <div className="metric-trend down">
              <i className="bi bi-arrow-down-right"></i> -8% vs last month
            </div>
          </div>
        </div>

        {/* Approved Applications */}
        <div className="col-sm-6 col-lg-4 col-xl-2">
          <div className="metric-card">
            <div className="metric-card-top">
              <div className="metric-icon-box metric-icon-green">
                <i className="bi bi-check-circle-fill"></i>
              </div>
              <svg className="sparkline-svg" viewBox="0 0 80 26">
                <path d="M 0,22 Q 25,18 50,10 T 80,4" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="metric-value">{stats.approvedApplications.toLocaleString()}</div>
              <div className="metric-label">Approved</div>
            </div>
            <div className="metric-trend up">
              <i className="bi bi-arrow-up-right"></i> +18% vs last month
            </div>
          </div>
        </div>

        {/* Upcoming Driving Tests */}
        <div className="col-sm-6 col-lg-4 col-xl-2">
          <div className="metric-card">
            <div className="metric-card-top">
              <div className="metric-icon-box metric-icon-purple">
                <i className="bi bi-calendar-check-fill"></i>
              </div>
              <svg className="sparkline-svg" viewBox="0 0 80 26">
                <path d="M 0,24 Q 25,14 50,16 T 80,8" fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="metric-value">{stats.upcomingTests.toLocaleString()}</div>
              <div className="metric-label">Upcoming Tests</div>
            </div>
            <div className="metric-trend up">
              <i className="bi bi-arrow-up-right"></i> +15% vs last month
            </div>
          </div>
        </div>

        {/* Active Registered Citizens */}
        <div className="col-sm-6 col-lg-4 col-xl-2">
          <div className="metric-card">
            <div className="metric-card-top">
              <div className="metric-icon-box metric-icon-red">
                <i className="bi bi-people-fill"></i>
              </div>
              <svg className="sparkline-svg" viewBox="0 0 80 26">
                <path d="M 0,18 Q 20,24 40,16 T 80,6" fill="none" stroke="#ED2939" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="metric-value">{stats.totalUsers.toLocaleString()}</div>
              <div className="metric-label">Registered Citizens</div>
            </div>
            <div className="metric-trend up">
              <i className="bi bi-arrow-up-right"></i> +24% vs last month
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section (Bar Chart + Donut Charts, matching p13.jpeg) */}
      <div className="row g-3 mb-4">
        {/* Monthly Applications Trend (Bar Chart) */}
        <div className="col-lg-6">
          <div className="chart-container-box">
            <div className="chart-header">
              <div>
                <h3 className="chart-title">Applications Trend</h3>
                <small className="text-muted">Monthly comparison of new vs renewal submissions</small>
              </div>
              <span className="badge bg-surface text-navy border">This Year</span>
            </div>

            <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', paddingTop: '10px' }}>
              {[
                { m: 'Jan', h: 110, r: 35 },
                { m: 'Feb', h: 130, r: 40 },
                { m: 'Mar', h: 135, r: 45 },
                { m: 'Apr', h: 105, r: 30 },
                { m: 'May', h: 145, r: 50 },
                { m: 'Jun', h: 160, r: 55 },
                { m: 'Jul', h: 180, r: 60 },
                { m: 'Aug', h: 195, r: 65 },
                { m: 'Sep', h: 205, r: 70 },
                { m: 'Oct', h: 215, r: 75 },
              ].map((item) => (
                <div key={item.m} className="text-center flex-grow-1">
                  <div style={{ height: `${item.h}px`, background: '#0B1B32', borderRadius: '4px 4px 0 0' }}>
                    <div style={{ height: `${item.r}px`, background: '#ED2939', borderRadius: '4px 4px 0 0' }}></div>
                  </div>
                  <small className="text-muted d-block mt-2" style={{ fontSize: '0.72rem' }}>
                    {item.m}
                  </small>
                </div>
              ))}
            </div>

            <div className="d-flex align-items-center justify-content-center gap-4 mt-3 small">
              <span className="d-flex align-items-center gap-1">
                <span className="badge" style={{ background: '#0B1B32', width: '10px', height: '10px', padding: 0 }}></span>{' '}
                New Applications
              </span>
              <span className="d-flex align-items-center gap-1">
                <span className="badge" style={{ background: '#ED2939', width: '10px', height: '10px', padding: 0 }}></span>{' '}
                Renewal Applications
              </span>
            </div>
          </div>
        </div>

        {/* License Classes Distribution (Donut Chart) */}
        <div className="col-lg-3 col-md-6">
          <div className="chart-container-box">
            <div className="chart-header">
              <div>
                <h3 className="chart-title">Class Distribution</h3>
                <small className="text-muted">Breakdown by category</small>
              </div>
            </div>
            <div className="text-center my-3">
              <svg width="150" height="150" viewBox="0 0 42 42" className="donut">
                <circle className="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#E2E8F0" strokeWidth="5"></circle>
                <circle className="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ED2939" strokeWidth="5" strokeDasharray="35 65" strokeDashoffset="25"></circle>
                <circle className="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#0B1B32" strokeWidth="5" strokeDasharray="28 72" strokeDashoffset="90"></circle>
                <circle className="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#0EA5E9" strokeWidth="5" strokeDasharray="20 80" strokeDashoffset="62"></circle>
                <circle className="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#F59E0B" strokeWidth="5" strokeDasharray="17 83" strokeDashoffset="42"></circle>
                <g className="donut-text">
                  <text x="50%" y="46%" className="donut-number fw-bold" textAnchor="middle" fontSize="6" fill="#0B1B32" fontWeight="700">
                    2,583
                  </text>
                  <text x="50%" y="60%" className="donut-label" textAnchor="middle" fontSize="3" fill="#64748B">
                    Applications
                  </text>
                </g>
              </svg>
            </div>
            <div className="small text-secondary" style={{ fontSize: '0.78rem' }}>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-navy fw-semibold">&bull; Class 3 (Private)</span> <span>35%</span>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-navy fw-semibold">&bull; Class 1 (Motorcycle)</span> <span>28%</span>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-navy fw-semibold">&bull; Class 6 (Bus)</span> <span>20%</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-navy fw-semibold">&bull; Class 7 (Heavy Truck)</span> <span>17%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Test Pass Rate Gauge */}
        <div className="col-lg-3 col-md-6">
          <div className="chart-container-box">
            <div className="chart-header">
              <div>
                <h3 className="chart-title">Test Pass Rate</h3>
                <small className="text-muted">Overall center evaluation</small>
              </div>
            </div>
            <div className="text-center my-3">
              <svg width="150" height="150" viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#E2E8F0" strokeWidth="5"></circle>
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10B981" strokeWidth="5" strokeDasharray="81 19" strokeDashoffset="25"></circle>
                <text x="50%" y="47%" textAnchor="middle" fontSize="7" fill="#0B1B32" fontWeight="700">
                  81%
                </text>
                <text x="50%" y="60%" textAnchor="middle" fontSize="3" fill="#10B981" fontWeight="600">
                  Pass Rate
                </text>
              </svg>
            </div>
            <div className="row g-2 text-center small mt-1">
              <div className="col-6">
                <div className="p-2 rounded bg-surface border">
                  <div className="fw-bold text-success fs-6">392</div>
                  <small className="text-muted">Passed</small>
                </div>
              </div>
              <div className="col-6">
                <div className="p-2 rounded bg-surface border">
                  <div className="fw-bold text-danger fs-6">95</div>
                  <small className="text-muted">Failed</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tables Row: Recent Applications & Upcoming Driving Tests */}
      <div className="row g-3 mb-4">
        {/* Recent Applications Table */}
        <div className="col-lg-7">
          <div className="dashboard-table-card">
            <div className="dashboard-table-header">
              <div>
                <h3 className="fw-bold text-navy mb-0 fs-6">Recent Applications</h3>
                <small className="text-muted">Latest driving license submissions</small>
              </div>
              <Link to="/admin/people-applications" className="btn btn-sm btn-outline-danger rounded-pill px-3">
                View All <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
            <div className="table-responsive">
              <table className="licentra-data-table">
                <thead>
                  <tr>
                    <th>#ID</th>
                    <th>Applicant</th>
                    <th>Class</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApps.map((a) => (
                    <tr key={a.id}>
                      <td className="fw-bold text-navy">#{a.id}</td>
                      <td>
                        <div className="fw-semibold text-navy">{a.applicantName}</div>
                        <small className="text-muted">{a.nationalId}</small>
                      </td>
                      <td>{a.licenseClass}</td>
                      <td>
                        <span
                          className={`badge ${
                            a.status === 'Approved' ? 'bg-success' : a.status === 'Rejected' ? 'bg-danger' : 'bg-warning text-dark'
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                      <td className="text-muted small">{a.submissionDate || 'Today'}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-primary py-0 px-2 rounded-pill"
                          onClick={() => handleOpenDrawer(a.id)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Upcoming Driving Tests Table */}
        <div className="col-lg-5">
          <div className="dashboard-table-card">
            <div className="dashboard-table-header">
              <div>
                <h3 className="fw-bold text-navy mb-0 fs-6">Upcoming Tests</h3>
                <small className="text-muted">Today's scheduled examinations</small>
              </div>
              <Link to="/admin/operations" className="btn btn-sm btn-outline-danger rounded-pill px-3">
                View Schedule <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
            <div className="table-responsive">
              <table className="licentra-data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Candidate</th>
                    <th>Test</th>
                    <th>Center</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingTests.map((b) => (
                    <tr key={b.id}>
                      <td className="fw-bold text-navy">#{b.id}</td>
                      <td>
                        <div className="fw-semibold text-navy">{b.applicantName}</div>
                        <small className="text-muted">{b.timeSlot}</small>
                      </td>
                      <td>{b.testType?.split(' ')[0]}</td>
                      <td className="small text-muted">{b.center?.split(' ')[0]}</td>
                      <td>
                        <span className="badge bg-success-subtle text-success">{b.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="row g-3">
        <div className="col-sm-6 col-lg-3">
          <Link to="/apply" className="metric-card p-3 d-flex align-items-center gap-3 text-decoration-none">
            <div className="metric-icon-box metric-icon-red">
              <i className="bi bi-plus-circle-fill"></i>
            </div>
            <div>
              <h6 className="fw-bold text-navy mb-0">Process Application</h6>
              <small className="text-muted">Submit citizen request</small>
            </div>
          </Link>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Link to="/driving-tests" className="metric-card p-3 d-flex align-items-center gap-3 text-decoration-none">
            <div className="metric-icon-box metric-icon-purple">
              <i className="bi bi-calendar-plus-fill"></i>
            </div>
            <div>
              <h6 className="fw-bold text-navy mb-0">Schedule Exam</h6>
              <small className="text-muted">Reserve testing slot</small>
            </div>
          </Link>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Link to="/admin/people-applications" className="metric-card p-3 d-flex align-items-center gap-3 text-decoration-none">
            <div className="metric-icon-box metric-icon-blue">
              <i className="bi bi-people-fill"></i>
            </div>
            <div>
              <h6 className="fw-bold text-navy mb-0">Manage People</h6>
              <small className="text-muted">Citizens &amp; applicants</small>
            </div>
          </Link>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Link to="/admin/operations" className="metric-card p-3 d-flex align-items-center gap-3 text-decoration-none">
            <div className="metric-icon-box metric-icon-green">
              <i className="bi bi-gear-wide-connected"></i>
            </div>
            <div>
              <h6 className="fw-bold text-navy mb-0">Operations Center</h6>
              <small className="text-muted">Centers &amp; reports</small>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default AdminOverview;

