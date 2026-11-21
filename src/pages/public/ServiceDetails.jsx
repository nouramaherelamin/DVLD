import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { SERVICES } from '../../services/db';

export function ServiceDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const serviceId = paramId || searchParams.get('id') || 'first-license';

  const [activeService, setActiveService] = useState(() => {
    return SERVICES.find((s) => s.id === serviceId) || SERVICES[0];
  });

  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const s = SERVICES.find((item) => item.id === serviceId) || SERVICES[0];
    setActiveService(s);
  }, [serviceId]);

  const handleSelectService = (sId) => {
    setSearchParams({ id: sId });
  };

  return (
    <>
      {/* Page Hero */}
      <header className="page-hero" style={{ padding: '4rem 0 3rem' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="hero-badge mb-3">
                <span>{activeService.code}</span> &bull; <span>{activeService.category}</span>
              </div>
              <h1 className="hero-title mb-3">{activeService.title}</h1>
              <p className="hero-desc mb-4">{activeService.summary}</p>
              <div className="d-flex flex-wrap gap-3">
                <Link to={`/apply?service=${activeService.id}`} className="btn btn-licentra-primary">
                  Apply for this Service <i className="bi bi-arrow-right ms-1"></i>
                </Link>
                <Link to="/services" className="btn btn-licentra-outline">
                  <i className="bi bi-grid me-1"></i> All Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-5 bg-surface">
        <div className="container py-2">
          <div className="row g-4">
            {/* Left Sidebar: 8 Services */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-surface-card details-sidebar-nav mb-4">
                <h5 className="fw-bold text-navy mb-3">
                  <i className="bi bi-list-check text-red me-2"></i> All Licensing Services
                </h5>
                <div className="list-group list-group-flush">
                  {SERVICES.map((s) => {
                    const isActive = s.id === activeService.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between p-3 rounded-3 mb-2 border ${
                          isActive ? 'bg-danger text-white border-danger' : 'bg-surface text-navy'
                        }`}
                        onClick={() => handleSelectService(s.id)}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <span className={`badge ${isActive ? 'bg-white text-danger' : 'bg-light text-navy'}`}>
                            {s.code}
                          </span>
                          <span className="small fw-semibold">{s.title}</span>
                        </div>
                        <i className={`bi bi-chevron-right ${isActive ? 'text-white' : 'text-muted'}`}></i>
                      </button>
                    );
                  })}
                </div>

                {/* Need Assistance Card */}
                <div className="p-3 mt-4 rounded-3 bg-surface border">
                  <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-headset fs-2 text-red"></i>
                    <div>
                      <h6 className="fw-bold text-navy mb-0">Need Clarification?</h6>
                      <small className="text-muted">Licentra support is available 24/7</small>
                    </div>
                  </div>
                  <Link to="/contact" className="btn btn-sm btn-outline-danger w-100 mt-3 rounded-pill">
                    Contact Traffic Desk
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Main Column */}
            <div className="col-lg-8">
              {/* Key Metrics Row */}
              <div className="row g-3 mb-4">
                <div className="col-sm-4">
                  <div className="specs-badge-box p-3 rounded-3 border bg-white h-100">
                    <small className="text-muted d-block mb-1">
                      <i className="bi bi-cash-stack text-red me-1"></i> Statutory Fees
                    </small>
                    <div className="fw-bold text-navy fs-5">{activeService.totalFee}</div>
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                      Government Stamp &amp; Card
                    </small>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="specs-badge-box p-3 rounded-3 border bg-white h-100">
                    <small className="text-muted d-block mb-1">
                      <i className="bi bi-clock-history text-red me-1"></i> Processing Time
                    </small>
                    <div className="fw-bold text-navy fs-5">{activeService.processingTime}</div>
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                      Upon passing tests
                    </small>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="specs-badge-box p-3 rounded-3 border bg-white h-100">
                    <small className="text-muted d-block mb-1">
                      <i className="bi bi-shield-check text-red me-1"></i> License Validity
                    </small>
                    <div className="fw-bold text-navy fs-5">{activeService.validity}</div>
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                      Renewable online
                    </small>
                  </div>
                </div>
              </div>

              {/* Section 1: Detailed Description */}
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-surface-card mb-4">
                <h4 className="fw-bold text-navy mb-3">Service Overview</h4>
                <p className="text-secondary" style={{ lineHeight: '1.8' }}>
                  {activeService.description}
                </p>
              </div>

              {/* Section 2: Eligibility Criteria */}
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-surface-card mb-4">
                <h4 className="fw-bold text-navy mb-3">
                  <i className="bi bi-person-check text-red me-2"></i> Eligibility Criteria
                </h4>
                <ul className="list-unstyled mb-0" style={{ lineHeight: '2.2' }}>
                  {activeService.eligibility?.map((item, idx) => (
                    <li key={idx} className="d-flex align-items-start gap-2">
                      <i className="bi bi-check-circle-fill text-danger mt-1"></i>
                      <span className="text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 3: Required Documents */}
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-surface-card mb-4">
                <h4 className="fw-bold text-navy mb-3">
                  <i className="bi bi-file-earmark-text text-red me-2"></i> Required Documents
                </h4>
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Document</th>
                        <th>Specification &amp; Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeService.documents?.map((doc, idx) => (
                        <tr key={idx}>
                          <td className="fw-semibold text-navy">{doc.name}</td>
                          <td className="text-muted small">{doc.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 4: Statutory Fees Breakdown */}
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-surface-card mb-4">
                <h4 className="fw-bold text-navy mb-3">
                  <i className="bi bi-receipt text-red me-2"></i> Official Fee Breakdown
                </h4>
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Fee Item</th>
                        <th className="text-end">Statutory Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeService.fees?.map((fee, idx) => (
                        <tr key={idx}>
                          <td className="text-navy">{fee.item}</td>
                          <td className="text-end fw-bold text-navy">EGP {fee.amount}</td>
                        </tr>
                      ))}
                      <tr className="table-light fw-bold">
                        <td className="text-red">Total Statutory Government Fee</td>
                        <td className="text-end text-red fs-5">{activeService.totalFee}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 5: Step-by-Step Procedure */}
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-surface-card mb-4">
                <h4 className="fw-bold text-navy mb-4">
                  <i className="bi bi-diagram-3 text-red me-2"></i> Application &amp; Issuance Procedure
                </h4>
                <div className="step-timeline">
                  {activeService.steps?.map((st) => (
                    <div key={st.num} className="d-flex align-items-start gap-3 mb-4">
                      <div
                        className="rounded-circle bg-danger text-white fw-bold d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ width: '38px', height: '38px' }}
                      >
                        {st.num}
                      </div>
                      <div>
                        <h6 className="fw-bold text-navy mb-1">{st.title}</h6>
                        <p className="text-secondary small mb-0" style={{ lineHeight: '1.6' }}>
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 6: FAQs */}
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-surface-card mb-4">
                <h4 className="fw-bold text-navy mb-3">
                  <i className="bi bi-question-circle text-red me-2"></i> Frequently Asked Questions
                </h4>
                <div className="accordion" id="serviceFaqAccordion">
                  {activeService.faqs?.map((faq, idx) => (
                    <div key={idx} className="accordion-item border rounded-3 mb-2 overflow-hidden">
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button ${openFaq === idx ? '' : 'collapsed'}`}
                          type="button"
                          onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                        >
                          {faq.q}
                        </button>
                      </h2>
                      {openFaq === idx && (
                        <div className="accordion-collapse collapse show">
                          <div className="accordion-body text-secondary small" style={{ lineHeight: '1.7' }}>
                            {faq.a}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Apply CTA Card */}
              <div className="p-4 p-md-5 rounded-4 bg-navy text-white text-center shadow-sm">
                <h3 className="fw-bold mb-2">Ready to submit your application?</h3>
                <p className="text-light opacity-90 max-w-600 mx-auto mb-4">
                  Upload verification documents, reserve evaluation appointments, and track your request online.
                </p>
                <Link to={`/apply?service=${activeService.id}`} className="btn btn-licentra-primary py-3 px-5 fs-6">
                  Apply for {activeService.title} <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ServiceDetails;

