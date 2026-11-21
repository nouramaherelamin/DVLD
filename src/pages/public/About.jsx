import React from 'react';
import { Link } from 'react-router-dom';

export function About() {
  const leaders = [
    {
      name: 'Ahmed Hassan',
      role: 'Department Director',
      img: '/assets/images/team/ahmed_hassan.png',
      email: 'director@licentra.gov.eg',
    },
    {
      name: 'Mona Ali',
      role: 'Operations Manager',
      img: '/assets/images/team/mona_ali.png',
      email: 'operations@licentra.gov.eg',
    },
    {
      name: 'Karim Tarek',
      role: 'Technical Manager',
      img: '/assets/images/team/karim_tarek.png',
      email: 'technical@licentra.gov.eg',
    },
    {
      name: 'Sara Mohamed',
      role: 'Customer Service Manager',
      img: '/assets/images/team/sara_mohamed.png',
      email: 'support-lead@licentra.gov.eg',
    },
  ];

  return (
    <>
      {/* Page Hero */}
      <header className="page-hero" style={{ backgroundImage: "url('/assets/images/hero/licentra_building.png')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="hero-tag">&mdash; ABOUT US</div>
              <h1 className="hero-title">
                Building Safer <span className="text-red">Roads Together.</span>
              </h1>
              <p className="hero-subtitle">
                At Licentra, we are committed to providing efficient, reliable, and modern driving license and vehicle licensing services, ensuring safer roads for everyone.
              </p>
              <ul className="licentra-breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li className="separator"><i className="bi bi-chevron-right"></i></li>
                <li className="current">About</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Section 1: Our Story */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="story-image-wrap">
                <img
                  src="/assets/images/hero/license_card_in_car.png"
                  alt="Licentra Driver License Card"
                  className="w-100 rounded-4"
                  onError={(e) => { e.currentTarget.src = '/assets/images/brand/favicon.svg'; }}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="section-tag tag-start">&mdash; OUR STORY</div>
              <h2 className="section-title">About <span className="text-red">Licentra</span></h2>
              <h5 className="fw-semibold text-muted mb-3">Driving &amp; Vehicle License Department</h5>
              <p className="text-secondary mb-4" style={{ lineHeight: '1.7' }}>
                Licentra is the official platform for managing driving license and vehicle licensing services. We aim to simplify the licensing process through modern systems, digital services, and a customer-focused approach, ensuring a smooth and transparent experience for all citizens.
              </p>

              <div className="d-flex flex-column gap-3 mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="stat-icon" style={{ width: '44px', height: '44px' }}>
                    <img src="/assets/images/icons/10_reliable_services_shield.svg" alt="Shield" />
                  </div>
                  <div>
                    <strong className="text-navy d-block">Safe Drivers</strong>
                    <small className="text-muted">Safer Communities</small>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="stat-icon" style={{ width: '44px', height: '44px' }}>
                    <img src="/assets/images/icons/09_user_profile.svg" alt="Services" />
                  </div>
                  <div>
                    <strong className="text-navy d-block">Modern Services</strong>
                    <small className="text-muted">Digital &amp; Easy Access</small>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="stat-icon" style={{ width: '44px', height: '44px' }}>
                    <img src="/assets/images/icons/02_license_classes_shield.svg" alt="Trust" />
                  </div>
                  <div>
                    <strong className="text-navy d-block">Trusted Department</strong>
                    <small className="text-muted">For a Safer Tomorrow</small>
                  </div>
                </div>
              </div>

              <Link to="/services" className="btn btn-licentra-primary">
                Our Services <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Stats Strip */}
      <section className="py-4 bg-surface">
        <div className="container">
          <div className="stats-strip">
            <div className="row g-4 align-items-center">
              <div className="col-6 col-lg-3">
                <div className="stat-item">
                  <div className="stat-icon">
                    <img src="/assets/images/icons/01_licensed_drivers.svg" alt="Drivers" />
                  </div>
                  <div>
                    <div className="stat-number">500K+</div>
                    <div className="stat-label">Licensed Drivers</div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="stat-item">
                  <div className="stat-icon">
                    <img src="/assets/images/icons/02_license_classes_shield.svg" alt="Classes" />
                  </div>
                  <div>
                    <div className="stat-number">7</div>
                    <div className="stat-label">License Classes</div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="stat-item">
                  <div className="stat-icon">
                    <img src="/assets/images/icons/03_test_types_calendar.svg" alt="Tests" />
                  </div>
                  <div>
                    <div className="stat-number">3</div>
                    <div className="stat-label">Types of Tests</div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="stat-item">
                  <div className="stat-icon">
                    <img src="/assets/images/icons/04_international_globe.svg" alt="International" />
                  </div>
                  <div>
                    <div className="stat-number" style={{ fontSize: '1.35rem', marginTop: '4px' }}>International</div>
                    <div className="stat-label">License Accreditation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Mission, Vision, and Values */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="value-card h-100">
                <div className="value-icon-box">
                  <img src="/assets/images/icons/05_mission_target.svg" alt="Target" />
                </div>
                <h3 className="fw-bold text-navy mb-3">Our Mission</h3>
                <p className="text-muted" style={{ lineHeight: '1.7' }}>
                  To provide reliable and efficient driving license and vehicle licensing services using modern technology while ensuring safety, transparency, and customer satisfaction.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="value-card h-100">
                <div className="value-icon-box">
                  <img src="/assets/images/icons/06_vision_eye.svg" alt="Vision" />
                </div>
                <h3 className="fw-bold text-navy mb-3">Our Vision</h3>
                <p className="text-muted" style={{ lineHeight: '1.7' }}>
                  To be a leading and innovative department in driving and vehicle licensing, contributing to safer roads and smarter transportation for a better future.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="value-card h-100">
                <div className="value-icon-box">
                  <img src="/assets/images/icons/07_values_diamond.svg" alt="Values" />
                </div>
                <h3 className="fw-bold text-navy mb-3">Our Values</h3>
                <ul className="list-unstyled mb-0" style={{ lineHeight: 2, fontSize: '0.95rem' }}>
                  <li><i className="bi bi-check-circle-fill text-red me-2"></i> Safety First</li>
                  <li><i className="bi bi-check-circle-fill text-red me-2"></i> Integrity and Transparency</li>
                  <li><i className="bi bi-check-circle-fill text-red me-2"></i> Customer Focus</li>
                  <li><i className="bi bi-check-circle-fill text-red me-2"></i> Innovation</li>
                  <li><i className="bi bi-check-circle-fill text-red me-2"></i> Continuous Improvement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Why Choose Licentra */}
      <section className="py-5 bg-surface">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <div className="section-tag tag-start">&mdash; WHY CHOOSE LICENTRA</div>
              <h2 className="section-title">Why Choose <span className="text-red">Licentra?</span></h2>
              <p className="text-muted" style={{ lineHeight: '1.7' }}>
                We are committed to delivering a better licensing experience through modern systems, digitized records, and dedicated public support.
              </p>
            </div>

            <div className="col-lg-7">
              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="p-4 bg-white rounded-4 border shadow-sm h-100">
                    <div className="stat-icon mb-3">
                      <img src="/assets/images/icons/08_modern_systems_gear.svg" alt="Gear" />
                    </div>
                    <h5 className="fw-bold text-navy mb-2">Modern Systems</h5>
                    <p className="text-muted small mb-0">Fast, secure and easy-to-use online services.</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-4 bg-white rounded-4 border shadow-sm h-100">
                    <div className="stat-icon mb-3">
                      <img src="/assets/images/icons/09_user_profile.svg" alt="Team" />
                    </div>
                    <h5 className="fw-bold text-navy mb-2">Professional Team</h5>
                    <p className="text-muted small mb-0">Trained staff to serve you with care.</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-4 bg-white rounded-4 border shadow-sm h-100">
                    <div className="stat-icon mb-3">
                      <img src="/assets/images/icons/10_reliable_services_shield.svg" alt="Services" />
                    </div>
                    <h5 className="fw-bold text-navy mb-2">Reliable Services</h5>
                    <p className="text-muted small mb-0">Accurate and transparent processes.</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-4 bg-white rounded-4 border shadow-sm h-100">
                    <div className="stat-icon mb-3">
                      <img src="/assets/images/icons/11_customer_support_headset.svg" alt="Support" />
                    </div>
                    <h5 className="fw-bold text-navy mb-2">Continuous Support</h5>
                    <p className="text-muted small mb-0">We are here to help you at every step.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Department Showcase */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row g-0 rounded-4 overflow-hidden shadow-lg border">
            <div className="col-lg-6">
              <img
                src="/assets/images/hero/licentra_building.png"
                alt="Licentra Department Building"
                className="w-100 h-100 object-fit-cover"
                style={{ minHeight: '380px' }}
                onError={(e) => { e.currentTarget.src = '/assets/images/brand/favicon.svg'; }}
              />
            </div>
            <div className="col-lg-6">
              <div className="department-showcase-box">
                <div className="showcase-tag">&mdash; OUR DEPARTMENT</div>
                <h3>A Modern Department for a <span className="text-red">Safer Tomorrow</span></h3>
                <p>
                  Licentra works continuously to develop its services and infrastructure, using the latest technology and international standards to ensure safe and organized road systems.
                </p>
                <div>
                  <Link to="/services" className="btn btn-licentra-primary">
                    Learn More About Us <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Leadership Team */}
      <section className="py-5 bg-surface" id="leadership">
        <div className="container py-4">
          <div className="text-center mb-5">
            <div className="section-tag">&mdash; OUR TEAM &mdash;</div>
            <h2 className="section-title">Meet Our Leadership Team</h2>
            <p className="section-subtitle">A dedicated team working to provide the best services for a safer community.</p>
          </div>

          <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-lg-4">
            {leaders.map((lead, idx) => (
              <div key={idx} className="col">
                <div className="team-card h-100">
                  <div className="team-avatar-box">
                    <img src={lead.img} alt={lead.name} onError={(e) => { e.currentTarget.src = '/assets/images/brand/favicon.svg'; }} />
                  </div>
                  <h4 className="team-name">{lead.name}</h4>
                  <div className="team-role">{lead.role}</div>
                  <div className="team-social-links">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="team-social-btn" aria-label="LinkedIn">
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a href={`mailto:${lead.email}`} className="team-social-btn" aria-label="Email">
                      <i className="bi bi-envelope-fill"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: CTA Banner */}
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
    </>
  );
}

export default About;

