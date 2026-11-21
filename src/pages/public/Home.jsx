import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, CLASSES } from '../../services/db';

export function Home() {
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const previewServices = SERVICES.slice(0, 5);

  const handleOpenServiceModal = (s) => {
    setSelectedService(s);
    setModalOpen(true);
  };

  return (
    <>
      {/* =========================================================================
           HOME HERO SECTION
           ========================================================================= */}
      <header className="home-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="home-hero-badge">
                <i className="bi bi-shield-fill-check"></i> Official Driving &amp; Vehicle License Department
              </div>
              <h1 className="home-hero-title">
                Drive Your Future With <span className="text-red">Confidence.</span>
              </h1>
              <p className="home-hero-desc">
                Licentra provides easy, fast and secure services for driving licenses, tests and vehicle licensing to make your journey safer and smoother.
              </p>
              <div className="home-hero-btns">
                <Link to="/apply" className="btn btn-licentra-primary">
                  Apply for a License <i className="bi bi-arrow-right"></i>
                </Link>
                <Link to="/services" className="btn btn-licentra-outline">
                  Explore Services
                </Link>
              </div>
            </div>
          </div>

          {/* Hero Counter Banner Overlay */}
          <div className="hero-stats-banner row g-3 mt-4">
            <div className="col-6 col-lg-3">
              <div className="hero-stat-item">
                <div className="stat-icon">
                  <img src="/assets/images/icons/01_licensed_drivers.svg" alt="Drivers Icon" />
                </div>
                <div>
                  <div className="stat-number">500K+</div>
                  <div className="stat-label">Licensed Drivers</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="hero-stat-item">
                <div className="stat-icon">
                  <img src="/assets/images/icons/02_license_classes_shield.svg" alt="Classes Icon" />
                </div>
                <div>
                  <div className="stat-number">7</div>
                  <div className="stat-label">License Classes</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="hero-stat-item">
                <div className="stat-icon">
                  <img src="/assets/images/icons/03_test_types_calendar.svg" alt="Tests Icon" />
                </div>
                <div>
                  <div className="stat-number">3</div>
                  <div className="stat-label">Types of Tests</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="hero-stat-item">
                <div className="stat-icon">
                  <img src="/assets/images/icons/04_international_globe.svg" alt="International Icon" />
                </div>
                <div>
                  <div className="stat-number" style={{ fontSize: '1.35rem', marginTop: '4px' }}>International</div>
                  <div className="stat-label">License Accreditation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
           SECTION 1: OUR SERVICES (PREVIEW)
           ========================================================================= */}
      <section className="py-5 bg-surface">
        <div className="container py-4">
          <div className="text-center mb-5">
            <div className="section-tag">&mdash; OUR SERVICES &mdash;</div>
            <h2 className="section-title">All Your Driving License Services in One Place</h2>
            <p className="section-subtitle">Choose the service you need and start your application easily.</p>
          </div>

          <div className="row g-4 justify-content-center">
            {previewServices.map((s) => (
              <div key={s.id} className="col-md-6 col-lg-4">
                <div className="service-card">
                  <div className="service-card-icon">
                    <img src={`/${s.icon}`} alt={s.title} onError={(e) => { e.currentTarget.src = '/assets/images/icons/01_licensed_drivers.svg'; }} />
                  </div>
                  <h3 className="service-card-title">{s.title}</h3>
                  <p className="service-card-desc">{s.summary}</p>
                  <Link to={`/service-details?id=${s.id}`} className="btn-text-arrow">
                    Learn More <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/services" className="btn btn-licentra-primary">
              View All 8 Services <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
           SECTION 2: LICENSE CLASSES PREVIEW
           ========================================================================= */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center mb-5">
            <div className="section-tag">&mdash; LICENSE CLASSES &mdash;</div>
            <h2 className="section-title">Choose the Right License Class for You</h2>
            <p className="section-subtitle">Explore the different driving license categories and their requirements.</p>
          </div>

          <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center">
            {CLASSES.map((c) => (
              <div key={c.id} className="col">
                <div className="license-class-card">
                  <div className="license-class-img-box">
                    <img src={`/assets/images/classes/${c.image || 'class3_private_car.png'}`} alt={c.name} onError={(e) => { e.currentTarget.src = '/assets/images/classes/class3_private_car.png'; }} />
                  </div>
                  <div className="license-class-badge">{c.code}</div>
                  <h3 className="license-class-title">{c.name}</h3>
                  <ul className="license-class-info-list">
                    <li><i className="bi bi-person-fill"></i> Min. Age: {c.minAge}</li>
                    <li><i className="bi bi-clock-history"></i> Validity: {c.validity}</li>
                    <li><i className="bi bi-cash-stack"></i> Fees: EGP {c.fees}</li>
                  </ul>
                  <Link to={`/license-class-details?class=${c.id}`} className="btn-text-arrow justify-content-center mt-auto">
                    Details <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
           SECTION 3: HOW IT WORKS (4 EASY STEPS)
           ========================================================================= */}
      <section className="py-5 bg-surface">
        <div className="container py-4">
          <div className="text-center mb-5">
            <div className="section-tag">&mdash; HOW IT WORKS &mdash;</div>
            <h2 className="section-title">Get Your Driving License in 4 Easy Steps</h2>
            <p className="section-subtitle">We have digitized and simplified the entire licensing workflow.</p>
          </div>

          <div className="row g-4 position-relative justify-content-center">
            {/* Step 1 */}
            <div className="col-sm-6 col-lg-3">
              <div className="step-card">
                <div className="step-badge">01</div>
                <div className="step-icon-box">
                  <img src="/assets/images/icons/icon_14_step_submit_application.svg" alt="Step 1" onError={(e) => { e.currentTarget.src = '/assets/images/icons/01_licensed_drivers.svg'; }} />
                </div>
                <h3 className="step-title">Submit Application</h3>
                <p className="step-desc">Fill in your information and choose the service you need.</p>
                <div className="step-connector-arrow d-none d-lg-block"><i className="bi bi-arrow-right"></i></div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-sm-6 col-lg-3">
              <div className="step-card">
                <div className="step-badge">02</div>
                <div className="step-icon-box">
                  <img src="/assets/images/icons/icon_15_step_book_test.svg" alt="Step 2" onError={(e) => { e.currentTarget.src = '/assets/images/icons/03_test_types_calendar.svg'; }} />
                </div>
                <h3 className="step-title">Pass the Tests</h3>
                <p className="step-desc">Complete vision, theory computer exam, and practical driving test.</p>
                <div className="step-connector-arrow d-none d-lg-block"><i className="bi bi-arrow-right"></i></div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-sm-6 col-lg-3">
              <div className="step-card">
                <div className="step-badge">03</div>
                <div className="step-icon-box">
                  <img src="/assets/images/icons/icon_16_step_pay_fees.svg" alt="Step 3" onError={(e) => { e.currentTarget.src = '/assets/images/icons/02_license_classes_shield.svg'; }} />
                </div>
                <h3 className="step-title">Pay Fees</h3>
                <p className="step-desc">Complete the required payments securely online or at the center.</p>
                <div className="step-connector-arrow d-none d-lg-block"><i className="bi bi-arrow-right"></i></div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="col-sm-6 col-lg-3">
              <div className="step-card">
                <div className="step-badge">04</div>
                <div className="step-icon-box">
                  <img src="/assets/images/icons/icon_17_step_get_license.svg" alt="Step 4" onError={(e) => { e.currentTarget.src = '/assets/images/icons/08_modern_systems_gear.svg'; }} />
                </div>
                <h3 className="step-title">Get Your License</h3>
                <p className="step-desc">Receive your new driving license and start driving safely.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
           SECTION 4: DEPARTMENT COUNTERS STRIP
           ========================================================================= */}
      <section className="py-4 bg-navy text-white">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-6 col-lg-3">
              <div className="d-flex align-items-center gap-3">
                <div className="stat-icon" style={{ background: 'rgba(231,47,61,0.2)' }}>
                  <img src="/assets/images/icons/01_licensed_drivers.svg" alt="Drivers" />
                </div>
                <div>
                  <div className="stat-number text-white">500K+</div>
                  <div className="stat-label text-light">Licensed Drivers</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="d-flex align-items-center gap-3">
                <div className="stat-icon" style={{ background: 'rgba(231,47,61,0.2)' }}>
                  <img src="/assets/images/icons/02_license_classes_shield.svg" alt="Classes" />
                </div>
                <div>
                  <div className="stat-number text-white">7</div>
                  <div className="stat-label text-light">License Classes</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="d-flex align-items-center gap-3">
                <div className="stat-icon" style={{ background: 'rgba(231,47,61,0.2)' }}>
                  <img src="/assets/images/icons/03_test_types_calendar.svg" alt="Tests" />
                </div>
                <div>
                  <div className="stat-number text-white">3</div>
                  <div className="stat-label text-light">Types of Tests</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="d-flex align-items-center gap-3">
                <div className="stat-icon" style={{ background: 'rgba(231,47,61,0.2)' }}>
                  <img src="/assets/images/icons/08_modern_systems_gear.svg" alt="Years" />
                </div>
                <div>
                  <div className="stat-number text-white">28+</div>
                  <div className="stat-label text-light">Years of Service</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
           SECTION 5: ABOUT LICENTRA PREVIEW
           ========================================================================= */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="section-tag tag-start">&mdash; ABOUT LICENTRA</div>
              <h2 className="section-title">
                Making Roads Safer for a <span className="text-red">Better Tomorrow</span>
              </h2>
              <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                Licentra is committed to providing efficient, reliable and modern driving license and vehicle licensing services, ensuring safer roads for everyone. Through digitized administrative portals, standardized testing centers, and courteous service, we empower millions of drivers every year.
              </p>

              <div className="row g-3 mb-4">
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-shield-check text-red fs-4"></i>
                    <div>
                      <h6 className="fw-bold mb-1">Safe Drivers</h6>
                      <small className="text-muted">Safer Communities</small>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-people-fill text-red fs-4"></i>
                    <div>
                      <h6 className="fw-bold mb-1">Modern Services</h6>
                      <small className="text-muted">Digital &amp; Easy Access</small>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-gear-wide-connected text-red fs-4"></i>
                    <div>
                      <h6 className="fw-bold mb-1">Professional Team</h6>
                      <small className="text-muted">Here to Serve You</small>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-award-fill text-red fs-4"></i>
                    <div>
                      <h6 className="fw-bold mb-1">Trusted Department</h6>
                      <small className="text-muted">For a Safer Tomorrow</small>
                    </div>
                  </div>
                </div>
              </div>

              <Link to="/about" className="btn btn-licentra-primary">
                Learn More About Licentra <i className="bi bi-arrow-right"></i>
              </Link>
            </div>

            <div className="col-lg-6">
              <div className="home-about-mosaic">
                <img src="/assets/images/hero/licentra_building.png" alt="Licentra Building" className="home-about-img-main" />
                <div className="home-about-badge-card d-none d-sm-block">
                  <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-award fs-1 text-red"></i>
                    <div>
                      <h5 className="fw-bold mb-0">ISO 9001:2015</h5>
                      <small className="text-muted">Certified Public Management</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
           SECTION 6: TESTIMONIALS
           ========================================================================= */}
      <section className="py-5 bg-surface">
        <div className="container py-4">
          <div className="d-flex flex-wrap align-items-end justify-content-between mb-4">
            <div>
              <div className="section-tag tag-start">&mdash; TESTIMONIALS</div>
              <h2 className="section-title mb-0">What People Say About Licentra</h2>
            </div>
          </div>

          <div className="row g-4">
            {[
              {
                name: 'Sara Mohamed',
                badge: 'First Time License',
                avatar: '/assets/images/team/sara_mohamed_t.png',
                quote: 'The application process was very simple and fast. The staff were helpful and professional. I got my license in record time!',
              },
              {
                name: 'Ahmed Ali',
                badge: 'Commercial License',
                avatar: '/assets/images/team/ahmed_ali.png',
                quote: 'A modern and organized system. Booking the computer theory exam and practical driving test was very easy and convenient.',
              },
              {
                name: 'Nourhan Khaled',
                badge: 'License Renewal',
                avatar: '/assets/images/team/nourhan_khaled.png',
                quote: 'Great experience! The website made renewal requirements completely clear and online payment worked without a hitch.',
              },
            ].map((t, idx) => (
              <div key={idx} className="col-md-4">
                <div className="testimonial-card h-100">
                  <div className="testimonial-stars mb-2 text-warning">
                    <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i>
                  </div>
                  <p className="testimonial-quote mb-4">"{t.quote}"</p>
                  <div className="testimonial-user d-flex align-items-center gap-3 mt-auto">
                    <img src={t.avatar} alt={t.name} className="testimonial-user-avatar" onError={(e) => { e.currentTarget.src = '/assets/images/brand/favicon.svg'; }} />
                    <div>
                      <div className="testimonial-user-name fw-bold text-navy">{t.name}</div>
                      <div className="testimonial-user-badge text-muted small">{t.badge}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
           SECTION 7: LATEST NEWS PREVIEW
           ========================================================================= */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="d-flex flex-wrap align-items-end justify-content-between mb-5">
            <div>
              <div className="section-tag tag-start">&mdash; LATEST NEWS</div>
              <h2 className="section-title mb-0">Latest News &amp; Articles</h2>
            </div>
            <Link to="/news" className="btn-text-arrow mt-2 mt-md-0 fw-bold">
              View All News <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="news-card">
                <div className="news-card-img-wrap">
                  <img src="/assets/images/news/safety_tips.png" alt="Driving Safety Tips" />
                  <span className="news-card-badge">Road Safety</span>
                </div>
                <div className="news-card-body">
                  <div className="news-card-date">
                    <i className="bi bi-calendar3"></i> 10 Oct 2024
                  </div>
                  <h3 className="news-card-title">
                    <Link to="/news-details?id=article-2">10 Essential Driving Safety Tips for New Drivers</Link>
                  </h3>
                  <p className="news-card-desc">
                    Learn the most important tips to stay safe on the road, manage weather conditions, and avoid blind spots.
                  </p>
                  <Link to="/news-details?id=article-2" className="btn-text-arrow mt-auto">
                    Read More <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="news-card">
                <div className="news-card-img-wrap">
                  <img src="/assets/images/news/practical_tracks.png" alt="Upcoming Changes" />
                  <span className="news-card-badge">Regulations</span>
                </div>
                <div className="news-card-body">
                  <div className="news-card-date">
                    <i className="bi bi-calendar3"></i> 05 Oct 2024
                  </div>
                  <h3 className="news-card-title">
                    <Link to="/news-details?id=article-3">Upcoming Changes in License Renewal Process</Link>
                  </h3>
                  <p className="news-card-desc">
                    New updates to make the renewal process faster, easier, and accessible 100% online through digital verification.
                  </p>
                  <Link to="/news-details?id=article-3" className="btn-text-arrow mt-auto">
                    Read More <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="news-card">
                <div className="news-card-img-wrap">
                  <img src="/assets/images/news/international_license.png" alt="International License" />
                  <span className="news-card-badge">International</span>
                </div>
                <div className="news-card-body">
                  <div className="news-card-date">
                    <i className="bi bi-calendar3"></i> 28 Sep 2024
                  </div>
                  <h3 className="news-card-title">
                    <Link to="/news-details?id=article-6">How to Apply for an International Driving License</Link>
                  </h3>
                  <p className="news-card-desc">
                    Everything you need to know before driving abroad: eligibility, accepted countries, and required documentation.
                  </p>
                  <Link to="/news-details?id=article-6" className="btn-text-arrow mt-auto">
                    Read More <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
           SECTION 8: CTA BANNER
           ========================================================================= */}
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
              <div className="modal-header service-modal-header bg-navy text-white">
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

export default Home;

