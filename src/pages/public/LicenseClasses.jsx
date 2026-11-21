import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CLASSES } from '../../services/db';

export function LicenseClasses() {
  const [comparisonOpen, setComparisonOpen] = useState(false);

  return (
    <>
      {/* Page Hero */}
      <header className="page-hero" style={{ backgroundImage: "url('/assets/images/hero/road_driving_scene.png')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="hero-tag">&mdash; LICENSE CLASSES</div>
              <h1 className="hero-title">
                Find the Right License Class <span className="text-red">for Your Journey.</span>
              </h1>
              <p className="hero-subtitle">
                Explore the different driving license categories, their requirements and the vehicles you are allowed to drive.
              </p>
              <ul className="licentra-breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li className="separator"><i className="bi bi-chevron-right"></i></li>
                <li className="current">License Classes</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Feature Highlight Cards */}
      <section className="py-4 bg-surface">
        <div className="container">
          <div className="row g-3">
            <div className="col-6 col-lg-3">
              <div className="feature-highlight-card">
                <div className="feature-highlight-icon">
                  <img src="/assets/images/icons/icon_09_first_driving_license.svg" alt="Categories" />
                </div>
                <div>
                  <div className="feature-highlight-title">Clear Categories</div>
                  <p className="feature-highlight-desc">Simple &amp; well-defined classes</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="feature-highlight-card">
                <div className="feature-highlight-icon">
                  <img src="/assets/images/icons/02_license_classes_shield.svg" alt="Requirements" />
                </div>
                <div>
                  <div className="feature-highlight-title">Detailed Requirements</div>
                  <p className="feature-highlight-desc">Know what you need for each</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="feature-highlight-card">
                <div className="feature-highlight-icon">
                  <img src="/assets/images/icons/08_modern_systems_gear.svg" alt="Choose Fit" />
                </div>
                <div>
                  <div className="feature-highlight-title">Choose What Fits</div>
                  <p className="feature-highlight-desc">From motorcycles to heavy transport</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="feature-highlight-card">
                <div className="feature-highlight-icon">
                  <img src="/assets/images/icons/04_international_globe.svg" alt="Support" />
                </div>
                <div>
                  <div className="feature-highlight-title">Here to Help</div>
                  <p className="feature-highlight-desc">Guidance at every step</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Classes Grid */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="d-flex flex-wrap align-items-end justify-content-between mb-5">
            <div>
              <div className="section-tag tag-start">&mdash; LICENSE CLASSES</div>
              <h2 className="section-title mb-0">Explore All Egyptian License Categories</h2>
            </div>
            <button
              className="btn btn-licentra-outline-red mt-3 mt-md-0"
              onClick={() => setComparisonOpen(true)}
            >
              <i className="bi bi-columns-gap me-1"></i> Compare All Classes
            </button>
          </div>

          <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center">
            {CLASSES.map((c) => (
              <div key={c.id} className="col">
                <div className="license-class-card h-100 d-flex flex-column">
                  <div className="license-class-img-box">
                    <img
                      src={`/assets/images/classes/${c.image || 'class3_private_car.png'}`}
                      alt={c.name}
                      onError={(e) => { e.currentTarget.src = '/assets/images/classes/class3_private_car.png'; }}
                    />
                  </div>
                  <div className="license-class-badge">{c.code}</div>
                  <h3 className="license-class-title">{c.name}</h3>
                  <div className="small text-secondary mb-2">{c.arabicName}</div>
                  <ul className="license-class-info-list mb-3">
                    <li><i className="bi bi-person-fill"></i> Min. Age: {c.minAge} years</li>
                    <li><i className="bi bi-clock-history"></i> Validity: {c.validity}</li>
                    <li><i className="bi bi-cash-stack"></i> Statutory Fee: EGP {c.fees}</li>
                  </ul>
                  <p className="small text-muted flex-grow-1" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                    {c.description}
                  </p>
                  <div className="d-flex gap-2 mt-auto pt-2 border-top">
                    <Link to={`/license-class-details?class=${c.id}`} className="btn btn-sm btn-outline-danger flex-grow-1 rounded-pill">
                      Details <i className="bi bi-arrow-right"></i>
                    </Link>
                    <Link to={`/apply?class=${c.id}`} className="btn btn-sm btn-licentra-primary rounded-pill px-3">
                      Apply
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner-section">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h2 className="cta-banner-title">Ready to Start Your Driving Journey?</h2>
              <p className="cta-banner-desc">
                Apply now and take the first step towards a safer and brighter future. Our digital platform is ready 24/7.
              </p>
              <div className="cta-banner-btns">
                <Link to="/apply" className="btn btn-licentra-white">
                  Apply for a License <i className="bi bi-arrow-right"></i>
                </Link>
                <Link to="/contact" className="btn btn-licentra-outline">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default LicenseClasses;

