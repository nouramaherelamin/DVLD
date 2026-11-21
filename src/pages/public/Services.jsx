import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../../services/db';

export function Services() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Services (8)' },
    { id: 'Driver Licensing', label: 'Driver Licensing' },
    { id: 'Vehicle & Testing', label: 'Vehicle & Testing' },
  ];

  const filteredServices = SERVICES.filter((s) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'Driver Licensing') return s.category === 'Driver Licensing';
    return s.category !== 'Driver Licensing';
  });

  const handleOpenModal = (s) => {
    setSelectedService(s);
    setModalOpen(true);
  };

  return (
    <>
      {/* Page Hero */}
      <header className="page-hero" style={{ backgroundImage: "url('/assets/images/hero/licentra_building.png')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="hero-tag">&mdash; OUR SERVICES</div>
              <h1 className="hero-title">
                Complete Driving <span className="text-red">License Services.</span>
              </h1>
              <p className="hero-subtitle">
                At Licentra, we provide a full range of driving and vehicle licensing services to make your experience easy, fast and secure.
              </p>
              <ul className="licentra-breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li className="separator"><i className="bi bi-chevron-right"></i></li>
                <li className="current">Services</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Services Catalog */}
      <section className="py-5 bg-surface">
        <div className="container py-4">
          <div className="text-center mb-5">
            <div className="section-tag">&mdash; OUR SERVICES &mdash;</div>
            <h2 className="section-title">All Your Driving License Services in One Place</h2>
            <p className="section-subtitle">Explore our wide range of services designed to meet your needs.</p>

            {/* Filter Pills */}
            <div className="d-flex justify-content-center flex-wrap gap-2 mt-4">
              {categories.map((c) => (
                <button
                  key={c.id}
                  className={`btn btn-sm rounded-pill px-4 ${
                    activeCategory === c.id ? 'btn-danger' : 'btn-outline-secondary'
                  }`}
                  onClick={() => setActiveCategory(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="row g-4">
            {filteredServices.map((s) => (
              <div key={s.id} className="col-md-6 col-lg-3">
                <div className="service-card h-100 d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="badge bg-danger text-white">{s.code}</span>
                    <span className="badge bg-light text-navy border small">{s.badge || 'Official'}</span>
                  </div>
                  <div className="service-card-icon my-2">
                    <img
                      src={`/${s.icon}`}
                      alt={s.title}
                      onError={(e) => { e.currentTarget.src = '/assets/images/icons/01_licensed_drivers.svg'; }}
                    />
                  </div>
                  <h3 className="service-card-title">{s.title}</h3>
                  <p className="service-card-desc flex-grow-1">{s.summary}</p>
                  <div className="mt-auto border-top pt-3 d-flex align-items-center justify-content-between">
                    <div>
                      <small className="text-muted d-block" style={{ fontSize: '0.72rem' }}>Total Fee</small>
                      <strong className="text-red">{s.totalFee}</strong>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary rounded-pill py-1 px-2"
                        onClick={() => handleOpenModal(s)}
                        title="Quick View"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <Link to={`/service-details?id=${s.id}`} className="btn btn-sm btn-licentra-primary py-1 px-2 rounded-pill">
                        Details <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Steps How It Works */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center mb-5">
            <div className="section-tag">&mdash; HOW IT WORKS &mdash;</div>
            <h2 className="section-title">Get Your Driving License in 4 Easy Steps</h2>
            <p className="section-subtitle">We have digitized and simplified the entire licensing workflow.</p>
          </div>

          <div className="row g-4 position-relative justify-content-center">
            <div className="col-sm-6 col-lg-3">
              <div className="step-card">
                <div className="step-badge">01</div>
                <div className="step-icon-box">
                  <img src="/assets/images/icons/icon_14_step_submit_application.svg" alt="Step 1" />
                </div>
                <h3 className="step-title">Submit Application</h3>
                <p className="step-desc">Fill in your information and choose the service you need.</p>
                <div className="step-connector-arrow d-none d-lg-block"><i className="bi bi-arrow-right"></i></div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="step-card">
                <div className="step-badge">02</div>
                <div className="step-icon-box">
                  <img src="/assets/images/icons/icon_15_step_book_test.svg" alt="Step 2" />
                </div>
                <h3 className="step-title">Pass the Tests</h3>
                <p className="step-desc">Complete vision, theory computer exam, and practical driving test.</p>
                <div className="step-connector-arrow d-none d-lg-block"><i className="bi bi-arrow-right"></i></div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="step-card">
                <div className="step-badge">03</div>
                <div className="step-icon-box">
                  <img src="/assets/images/icons/icon_16_step_pay_fees.svg" alt="Step 3" />
                </div>
                <h3 className="step-title">Pay Fees</h3>
                <p className="step-desc">Complete the required payments securely online or at the center.</p>
                <div className="step-connector-arrow d-none d-lg-block"><i className="bi bi-arrow-right"></i></div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="step-card">
                <div className="step-badge">04</div>
                <div className="step-icon-box">
                  <img src="/assets/images/icons/icon_17_step_get_license.svg" alt="Step 4" />
                </div>
                <h3 className="step-title">Get Your License</h3>
                <p className="step-desc">Receive your new driving license and start driving safely.</p>
              </div>
            </div>
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

      {/* Service Details Modal */}
      {modalOpen && selectedService && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          role="dialog"
          onClick={(e) => {
            if (e.target.classList.contains('modal')) setModalOpen(false);
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header service-modal-header bg-navy text-white px-4 py-3">
                <h5 className="modal-title fw-bold">{selectedService.title}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setModalOpen(false)}></button>
              </div>
              <div className="modal-body service-modal-body p-4">
                <p className="text-secondary mb-4" style={{ lineHeight: '1.7' }}>
                  {selectedService.description}
                </p>
                <div className="row g-4 mb-4">
                  <div className="col-sm-6">
                    <div className="p-3 rounded-3 bg-surface border">
                      <small className="text-muted d-block mb-1">
                        <i className="bi bi-cash-stack text-red me-1"></i> Official Fees
                      </small>
                      <span className="fw-bold text-navy fs-6">{selectedService.totalFee}</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="p-3 rounded-3 bg-surface border">
                      <small className="text-muted d-block mb-1">
                        <i className="bi bi-clock-history text-red me-1"></i> Processing Time
                      </small>
                      <span className="fw-bold text-navy fs-6">{selectedService.processingTime}</span>
                    </div>
                  </div>
                </div>
                <h6 className="fw-bold text-navy mb-3">
                  <i className="bi bi-card-checklist text-red me-2"></i> Required Documents &amp; Eligibility
                </h6>
                <ul className="list-unstyled mb-4" style={{ lineHeight: 2 }}>
                  {selectedService.documents?.map((doc, idx) => (
                    <li key={idx}>
                      <i className="bi bi-check2-circle text-danger me-2"></i>
                      <strong>{doc.name}:</strong> {doc.note}
                    </li>
                  ))}
                </ul>
                <div className="text-end">
                  <button type="button" className="btn btn-secondary rounded-pill me-2" onClick={() => setModalOpen(false)}>
                    Close
                  </button>
                  <Link to={`/apply?service=${selectedService.id}`} className="btn btn-licentra-primary">
                    Proceed to Apply <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Services;

