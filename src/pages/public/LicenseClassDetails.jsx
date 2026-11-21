import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import { CLASSES } from '../../services/db';

export function LicenseClassDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { classId: paramClassId } = useParams();

  const classKey = paramClassId || searchParams.get('class') || 'class-3';

  const [activeClass, setActiveClass] = useState(() => {
    return CLASSES.find((c) => c.id === classKey) || CLASSES[2];
  });

  const [comparisonOpen, setComparisonOpen] = useState(false);

  useEffect(() => {
    const found = CLASSES.find((c) => c.id === classKey) || CLASSES[2];
    setActiveClass(found);
  }, [classKey]);

  const handleSelectClass = (cId) => {
    setSearchParams({ class: cId });
  };

  return (
    <>
      {/* Page Hero */}
      <header className="page-hero" style={{ padding: '4rem 0 3rem' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="hero-badge mb-3">
                <span>{activeClass.code}</span> &bull; <span>{activeClass.category}</span>
              </div>
              <h1 className="hero-title mb-2">{activeClass.name}</h1>
              <p className="text-light fs-5 mb-3" style={{ fontWeight: 300 }}>
                {activeClass.arabicName}
              </p>
              <p className="hero-desc mb-4">{activeClass.description}</p>
              <div className="d-flex flex-wrap gap-3">
                <Link to={`/apply?class=${activeClass.id}`} className="btn btn-licentra-primary">
                  Apply for this Class <i className="bi bi-arrow-right ms-1"></i>
                </Link>
                <button
                  type="button"
                  className="btn btn-licentra-outline"
                  onClick={() => setComparisonOpen(true)}
                >
                  <i className="bi bi-table me-1"></i> Compare All Classes
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-5 bg-surface">
        <div className="container py-2">
          <div className="row g-4">
            {/* Left Sidebar: 7 Classes */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-surface-card details-sidebar-nav mb-4">
                <h5 className="fw-bold text-navy mb-3">
                  <i className="bi bi-car-front text-red me-2"></i> All Vehicle Classes
                </h5>
                <div className="list-group list-group-flush">
                  {CLASSES.map((c) => {
                    const isActive = c.id === activeClass.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between p-3 rounded-3 mb-2 border ${
                          isActive ? 'bg-danger text-white border-danger' : 'bg-surface text-navy'
                        }`}
                        onClick={() => handleSelectClass(c.id)}
                      >
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <span className={`badge ${isActive ? 'bg-white text-danger' : 'bg-danger text-white'}`}>
                              {c.code}
                            </span>
                            <span className="small fw-semibold">{c.name}</span>
                          </div>
                          <small className={isActive ? 'text-light opacity-75' : 'text-muted'}>
                            {c.arabicName}
                          </small>
                        </div>
                        <i className={`bi bi-chevron-right ${isActive ? 'text-white' : 'text-muted'}`}></i>
                      </button>
                    );
                  })}
                </div>

                {/* Compare Trigger Card */}
                <div className="p-3 mt-4 rounded-3 bg-surface border text-center">
                  <i className="bi bi-columns-gap fs-1 text-red mb-2 d-block"></i>
                  <h6 className="fw-bold text-navy mb-1">Side-by-Side Comparison</h6>
                  <small className="text-muted d-block mb-3">Compare age, validity, fees, and requirements</small>
                  <button className="btn btn-licentra-outline-red w-100" onClick={() => setComparisonOpen(true)}>
                    Open Matrix View
                  </button>
                </div>
              </div>
            </div>

            {/* Right Main Details Column */}
            <div className="col-lg-8">
              {/* Class Illustration Banner */}
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-surface-card mb-4 text-center">
                <div className="p-4 rounded-4 mb-3 d-inline-block" style={{ background: 'var(--licentra-surface)', maxWidth: '480px', width: '100%' }}>
                  <img
                    src={`/assets/images/classes/${activeClass.image || 'class3_private_car.png'}`}
                    alt={activeClass.name}
                    className="img-fluid"
                    style={{ maxHeight: '220px', objectFit: 'contain' }}
                    onError={(e) => { e.currentTarget.src = '/assets/images/classes/class3_private_car.png'; }}
                  />
                </div>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-pill">
                    <i className="bi bi-person me-1"></i> Min. Age: <strong>{activeClass.minAge} Years</strong>
                  </span>
                  <span className="badge bg-info-subtle text-info px-3 py-2 rounded-pill">
                    <i className="bi bi-clock-history me-1"></i> Validity: <strong>{activeClass.validity}</strong>
                  </span>
                  <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                    <i className="bi bi-cash me-1"></i> Statutory Fee: <strong>EGP {activeClass.fees}</strong>
                  </span>
                </div>
              </div>

              {/* Section 1: Allowed Vehicle Types & Scope */}
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-surface-card mb-4">
                <h4 className="fw-bold text-navy mb-3">
                  <i className="bi bi-check2-circle text-red me-2"></i> Allowed Vehicle Types &amp; Scope
                </h4>
                <p className="text-secondary mb-3" style={{ lineHeight: '1.8' }}>
                  {activeClass.allowedVehicles || activeClass.description}
                </p>
                <div className="p-3 rounded-3 bg-surface border">
                  <strong className="text-navy small d-block mb-1">
                    <i className="bi bi-speedometer2 text-red me-1"></i> Engine / Weight Capacity:
                  </strong>
                  <span className="text-muted small">{activeClass.ccLimit}</span>
                </div>
              </div>

              {/* Section 2: Prerequisites & Requirements */}
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-surface-card mb-4">
                <h4 className="fw-bold text-navy mb-3">
                  <i className="bi bi-card-checklist text-red me-2"></i> Mandatory Requirements
                </h4>
                <ul className="list-unstyled mb-0" style={{ lineHeight: '2.2' }}>
                  {(
                    activeClass.requirements || [
                      `Applicant must be at least ${activeClass.minAge} years old at the date of submission.`,
                      'Valid Egyptian National ID card or certified foreign residency visa.',
                      'Certified Medical Fitness Certificate (Form 287-B) verifying visual acuity.',
                      'Passing score in computerized theory road signs exam.',
                      'Successful completion of closed-track practical maneuvering test.',
                    ]
                  ).map((req, idx) => (
                    <li key={idx} className="d-flex align-items-start gap-2">
                      <i className="bi bi-check-circle-fill text-danger mt-1"></i>
                      <span className="text-secondary">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 3: Required Exams */}
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-surface-card mb-4">
                <h4 className="fw-bold text-navy mb-3">
                  <i className="bi bi-award text-red me-2"></i> Evaluation Examinations
                </h4>
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="p-3 rounded-3 border bg-surface text-center">
                      <i className="bi bi-display fs-2 text-danger mb-2 d-block"></i>
                      <h6 className="fw-bold text-navy mb-1">Computer Theory</h6>
                      <small className="text-muted">40 Questions &bull; 80% Pass</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 rounded-3 border bg-surface text-center">
                      <i className="bi bi-eye fs-2 text-primary mb-2 d-block"></i>
                      <h6 className="fw-bold text-navy mb-1">Vision Screening</h6>
                      <small className="text-muted">6/9 Visual Acuity</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 rounded-3 border bg-surface text-center">
                      <i className="bi bi-car-front fs-2 text-success mb-2 d-block"></i>
                      <h6 className="fw-bold text-navy mb-1">Practical Track</h6>
                      <small className="text-muted">Maneuver &amp; Parking</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Apply CTA Card */}
              <div className="p-4 p-md-5 rounded-4 bg-navy text-white text-center shadow-sm">
                <h3 className="fw-bold mb-2">Apply for {activeClass.name} ({activeClass.code})</h3>
                <p className="text-light opacity-90 max-w-600 mx-auto mb-4">
                  Start your digital license application online and schedule your driving test appointment.
                </p>
                <Link to={`/apply?class=${activeClass.id}`} className="btn btn-licentra-primary py-3 px-5 fs-6">
                  Apply for {activeClass.code} <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Comparison Modal */}
      {comparisonOpen && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          role="dialog"
          onClick={(e) => {
            if (e.target.classList.contains('modal')) setComparisonOpen(false);
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content border-0 rounded-4 shadow-xl overflow-hidden">
              <div className="modal-header bg-navy text-white px-4 py-3">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-columns-gap text-red me-2"></i> Side-by-Side License Comparison Matrix
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setComparisonOpen(false)}></button>
              </div>
              <div className="modal-body p-4 table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Class</th>
                      <th>Category &amp; Arabic</th>
                      <th>Min. Age</th>
                      <th>Validity</th>
                      <th>Capacity / CC</th>
                      <th>Statutory Fees</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CLASSES.map((c) => (
                      <tr key={c.id}>
                        <td className="fw-bold text-navy">{c.code}</td>
                        <td>
                          <div className="fw-semibold text-navy">{c.name}</div>
                          <small className="text-muted">{c.arabicName}</small>
                        </td>
                        <td><span className="badge bg-light text-navy border">{c.minAge} Years</span></td>
                        <td>{c.validity}</td>
                        <td className="small text-secondary">{c.ccLimit}</td>
                        <td className="fw-bold text-red">EGP {c.fees}</td>
                        <td className="text-end">
                          <Link to={`/apply?class=${c.id}`} className="btn btn-sm btn-licentra-primary rounded-pill px-3">
                            Apply Now
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer px-4 py-2 bg-surface">
                <button className="btn btn-secondary rounded-pill" onClick={() => setComparisonOpen(false)}>
                  Close Matrix
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LicenseClassDetails;

