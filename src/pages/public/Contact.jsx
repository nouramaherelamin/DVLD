import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LicentraDB from '../../services/db';

const LOCATIONS = {
  cairo: {
    name: 'Cairo Main Center',
    address: '123 El Tayaran St., Nasr City, Cairo',
    hours: 'Sun – Thu: 8:00 AM – 4:00 PM (Evening shift: 4:00 PM – 8:00 PM)',
    phone: '+20 123 456 7890',
    email: 'cairo@licentra.gov.eg',
    tests: 'Vision Screening, Theory Computer Lab 1 & 2, Sensor Practical Track'
  },
  giza: {
    name: 'Giza Center',
    address: 'Central Axis Road, 6th of October City, Giza',
    hours: 'Sun – Thu: 8:00 AM – 4:00 PM',
    phone: '+20 123 456 7891',
    email: 'giza@licentra.gov.eg',
    tests: 'Vision Screening, Theory Exam Hall, Light & Heavy Vehicle Maneuver Track'
  },
  alexandria: {
    name: 'Alexandria Center',
    address: '45 Victor Emmanuel Square, Smouha, Alexandria',
    hours: 'Sun – Thu: 8:00 AM – 4:00 PM',
    phone: '+20 123 456 7892',
    email: 'alex@licentra.gov.eg',
    tests: 'Vision Test, Computer Theory Lab, Motorcycle & Passenger Car Tracks'
  },
  mansoura: {
    name: 'Mansoura Center',
    address: 'El-Gomhoria St., Mansoura, Dakahlia',
    hours: 'Sun – Thu: 8:00 AM – 4:00 PM',
    phone: '+20 123 456 7893',
    email: 'mansoura@licentra.gov.eg',
    tests: 'Vision Screening, Computer Theory Lab, Standard Exam Track'
  }
};

export default function Contact() {
  const [selectedLocation, setSelectedLocation] = useState('cairo');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChat = (e) => {
    e.preventDefault();
    if (window.openLicentraChat) {
      window.openLicentraChat();
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message, phone } = contactForm;

    if (!name.trim() || !email.trim() || !subject || !message.trim()) {
      if (window.showToast) window.showToast('Please fill in all required fields marked with *', 'warning');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      if (window.showToast) window.showToast('Please enter a valid email address.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      let ticketId = 'TKT-' + Math.floor(100000 + Math.random() * 900000);

      try {
        const saved = LicentraDB.saveContactMessage({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          subject,
          message: message.trim()
        });
        if (saved) ticketId = saved.id;
      } catch (err) {
        console.error('Contact message saving error:', err);
      }

      setIsSubmitting(false);
      if (window.showToast) {
        window.showToast(`Thank you, ${name}! Your inquiry has been submitted. Reference ID: ${ticketId}`, 'success');
      }

      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 600);
  };

  const activeLocInfo = LOCATIONS[selectedLocation] || LOCATIONS.cairo;

  return (
    <div>
      {/* PAGE HERO */}
      <header className="page-hero" style={{ backgroundImage: "url('/assets/images/hero/licentra_building.png')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8" data-aos="fade-up">
              <div className="hero-tag">— CONTACT US</div>
              <h1 className="hero-title">We're Here to <span className="text-red">Help You Drive Forward.</span></h1>
              <p className="hero-subtitle">
                Have questions, need support, or want to visit one of our centers? Get in touch with our team — we're always ready to assist you.
              </p>
              <ul className="licentra-breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li className="separator"><i className="bi bi-chevron-right"></i></li>
                <li className="current">Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* 4 CONTACT CHANNELS */}
      <section className="py-5 bg-surface">
        <div className="container">
          <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-lg-4">
            <div className="col" data-aos="fade-up" data-aos-delay="50">
              <div className="contact-channel-card">
                <div className="contact-channel-icon">
                  <img src="/assets/images/icons/icon_05_contact_phone.svg" alt="Phone Icon" />
                </div>
                <h4 className="fw-bold text-navy fs-5 mb-1">Call Us</h4>
                <p className="fw-semibold text-red mb-1"><a href="tel:+201234567890">+20 123 456 7890</a></p>
                <small className="text-muted">Sun – Thu: 8:00 AM – 4:00 PM</small>
              </div>
            </div>

            <div className="col" data-aos="fade-up" data-aos-delay="100">
              <div className="contact-channel-card">
                <div className="contact-channel-icon">
                  <img src="/assets/images/icons/icon_06_contact_email.svg" alt="Email Icon" />
                </div>
                <h4 className="fw-bold text-navy fs-5 mb-1">Email Us</h4>
                <p className="fw-semibold text-red mb-1"><a href="mailto:info@licentra.gov.eg">info@licentra.gov.eg</a></p>
                <small className="text-muted">We reply within 24 hours</small>
              </div>
            </div>

            <div className="col" data-aos="fade-up" data-aos-delay="150">
              <div className="contact-channel-card">
                <div className="contact-channel-icon">
                  <img src="/assets/images/icons/11_customer_support_headset.svg" alt="Live Chat Icon" />
                </div>
                <h4 className="fw-bold text-navy fs-5 mb-1">Live Chat</h4>
                <p className="fw-semibold text-red mb-1"><a href="#chat" onClick={handleOpenChat}>Chat with our support team</a></p>
                <small className="text-muted">Get instant assistance</small>
              </div>
            </div>

            <div className="col" data-aos="fade-up" data-aos-delay="200">
              <div className="contact-channel-card">
                <div className="contact-channel-icon">
                  <img src="/assets/images/icons/10_reliable_services_shield.svg" alt="Support Icon" />
                </div>
                <h4 className="fw-bold text-navy fs-5 mb-1">Customer Support</h4>
                <p className="fw-semibold text-red mb-1">Dedicated team to help you</p>
                <small className="text-muted">Mon – Thu: 8:00 AM – 4:00 PM</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: SEND US A MESSAGE & CUSTOMER SERVICE REP */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row g-5 align-items-stretch">
            {/* Form Column */}
            <div className="col-lg-7" data-aos="fade-right">
              <div className="section-tag tag-start">— SEND US A MESSAGE</div>
              <h2 className="section-title">Get <span className="text-red">in Touch</span></h2>
              <p className="text-muted mb-4">Fill out the form below and our team will get back to you as soon as possible.</p>

              <form onSubmit={handleContactSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-navy small">Full Name *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-surface border-end-0"><i className="bi bi-person text-muted"></i></span>
                      <input 
                        type="text" 
                        className="form-control border-start-0" 
                        placeholder="Enter your full name" 
                        value={contactForm.name}
                        onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                        required 
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-navy small">Email Address *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-surface border-end-0"><i className="bi bi-envelope text-muted"></i></span>
                      <input 
                        type="email" 
                        className="form-control border-start-0" 
                        placeholder="Enter your email" 
                        value={contactForm.email}
                        onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                        required 
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-navy small">Phone Number</label>
                    <div className="input-group">
                      <span className="input-group-text bg-surface border-end-0"><i className="bi bi-telephone text-muted"></i></span>
                      <input 
                        type="tel" 
                        className="form-control border-start-0" 
                        placeholder="Enter your phone number" 
                        value={contactForm.phone}
                        onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-navy small">Subject *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-surface border-end-0"><i className="bi bi-folder text-muted"></i></span>
                      <select 
                        className="form-select border-start-0" 
                        value={contactForm.subject}
                        onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                        required
                      >
                        <option value="" disabled>Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Driving Test Booking">Driving Test Booking</option>
                        <option value="License Renewal">License Renewal</option>
                        <option value="Replacement License">Replacement License</option>
                        <option value="Technical Support">Technical Support</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold text-navy small">Your Message *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-surface border-end-0 align-items-start pt-2"><i className="bi bi-pencil text-muted"></i></span>
                      <textarea 
                        className="form-control border-start-0" 
                        rows="5" 
                        placeholder="Write your message here..." 
                        value={contactForm.message}
                        onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-12 mt-4">
                    <button type="submit" className="btn btn-licentra-primary" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span> Submitting...
                        </>
                      ) : (
                        <>
                          Send Message <i className="bi bi-arrow-right"></i>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Customer Service Rep Card */}
            <div className="col-lg-5" data-aos="fade-left">
              <div className="contact-agent-card">
                <div className="contact-agent-img">
                  <img src="/assets/images/hero/support_rep.png" alt="Licentra Customer Service Agent" />
                </div>
                <div className="contact-agent-body">
                  <div className="d-flex align-items-center gap-2 mb-2 text-white">
                    <i className="bi bi-chat-square-dots-fill text-red fs-4"></i>
                    <h4 className="fw-bold text-white mb-0">Need Immediate Assistance?</h4>
                  </div>
                  <p className="text-light small mb-4">
                    Our customer service team is ready to help you with your inquiries about licenses, tests, or any of our services.
                  </p>
                  <div>
                    <button type="button" className="btn btn-licentra-primary w-100" onClick={handleOpenChat}>
                      Start Live Chat <i className="bi bi-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: VISIT OUR OFFICES */}
      <section className="py-5 bg-surface" id="locations">
        <div className="container py-4">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-tag">— VISIT OUR OFFICES —</div>
            <h2 className="section-title">Our Locations</h2>
            <p className="section-subtitle">Find the nearest Licentra center and visit us during working hours.</p>
          </div>

          <div className="row g-4 align-items-stretch">
            {/* 1. Center List */}
            <div className="col-lg-4" data-aos="fade-right">
              <div className="d-flex flex-column h-100 justify-content-between">
                <button 
                  type="button" 
                  className={`location-item-btn ${selectedLocation === 'cairo' ? 'active' : ''}`}
                  onClick={() => setSelectedLocation('cairo')}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="stat-icon" style={{ width: '42px', height: '42px' }}>
                      <i className="bi bi-geo-alt-fill text-red"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold location-name mb-1">Cairo Main Center</h6>
                      <small className="text-muted d-block">Nasr City, Cairo</small>
                      <small className="text-muted">Sun – Thu: 8:00 AM – 4:00 PM</small>
                    </div>
                  </div>
                  <i className="bi bi-chevron-right text-muted"></i>
                </button>

                <button 
                  type="button" 
                  className={`location-item-btn ${selectedLocation === 'giza' ? 'active' : ''}`}
                  onClick={() => setSelectedLocation('giza')}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="stat-icon" style={{ width: '42px', height: '42px' }}>
                      <i className="bi bi-geo-alt-fill text-red"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold location-name mb-1">Giza Center</h6>
                      <small className="text-muted d-block">6th of October, Giza</small>
                      <small className="text-muted">Sun – Thu: 8:00 AM – 4:00 PM</small>
                    </div>
                  </div>
                  <i className="bi bi-chevron-right text-muted"></i>
                </button>

                <button 
                  type="button" 
                  className={`location-item-btn ${selectedLocation === 'alexandria' ? 'active' : ''}`}
                  onClick={() => setSelectedLocation('alexandria')}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="stat-icon" style={{ width: '42px', height: '42px' }}>
                      <i className="bi bi-geo-alt-fill text-red"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold location-name mb-1">Alexandria Center</h6>
                      <small className="text-muted d-block">Smouha, Alexandria</small>
                      <small className="text-muted">Sun – Thu: 8:00 AM – 4:00 PM</small>
                    </div>
                  </div>
                  <i className="bi bi-chevron-right text-muted"></i>
                </button>

                <button 
                  type="button" 
                  className={`location-item-btn ${selectedLocation === 'mansoura' ? 'active' : ''}`}
                  onClick={() => setSelectedLocation('mansoura')}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="stat-icon" style={{ width: '42px', height: '42px' }}>
                      <i className="bi bi-geo-alt-fill text-red"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold location-name mb-1">Mansoura Center</h6>
                      <small className="text-muted d-block">El-Gomhoria St., Mansoura</small>
                      <small className="text-muted">Sun – Thu: 8:00 AM – 4:00 PM</small>
                    </div>
                  </div>
                  <i className="bi bi-chevron-right text-muted"></i>
                </button>
              </div>
            </div>

            {/* 2. Stylized Map View */}
            <div className="col-lg-4" data-aos="fade-up">
              <div className="location-map-wrap d-flex flex-column align-items-center justify-content-center p-4 text-center">
                <i className="bi bi-pin-map-fill text-red display-2 mb-3"></i>
                <h5 className="fw-bold text-navy">Interactive GPS Network</h5>
                <p className="text-muted small mb-3">4 Central Headquarters &amp; 27 Regional Citizen Service Units connected across Egypt.</p>
                <span className="badge bg-red px-3 py-2 rounded-pill"><i className="bi bi-check-circle me-1"></i> All Centers Open Now</span>
              </div>
            </div>

            {/* 3. Details Card */}
            <div className="col-lg-4" data-aos="fade-left">
              <div className="location-details-card">
                <h4 className="fw-bold text-navy mb-3">{activeLocInfo.name}</h4>
                <ul className="list-unstyled mb-4" style={{ fontSize: '0.9rem', lineHeight: 2 }}>
                  <li><i className="bi bi-geo-alt-fill text-red me-2"></i> {activeLocInfo.address}</li>
                  <li><i className="bi bi-clock-fill text-red me-2"></i> {activeLocInfo.hours}</li>
                  <li><i className="bi bi-telephone-fill text-red me-2"></i> {activeLocInfo.phone}</li>
                  <li><i className="bi bi-envelope-fill text-red me-2"></i> {activeLocInfo.email}</li>
                  <li><i className="bi bi-shield-check text-red me-2"></i> <strong>Services:</strong> {activeLocInfo.tests}</li>
                </ul>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(activeLocInfo.address)}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-licentra-outline-red w-100"
                >
                  <i className="bi bi-arrow-up-right me-1"></i> Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DARK HELP BANNER */}
      <section className="py-5 bg-navy text-white">
        <div className="container py-3">
          <div className="row align-items-center g-4">
            <div className="col-lg-7" data-aos="fade-right">
              <h3 className="fw-bold text-white mb-2">Can't Find What You're Looking For?</h3>
              <p className="text-light mb-4">Check our FAQ section or contact our support team for more assistance.</p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#faqs" className="btn btn-licentra-primary">
                  View FAQs <i className="bi bi-arrow-right"></i>
                </a>
                <a href="mailto:support@licentra.gov.eg" className="btn btn-licentra-outline">
                  Contact Support
                </a>
              </div>
            </div>

            <div className="col-lg-5" data-aos="fade-left">
              <div className="row g-3">
                <div className="col-6">
                  <div className="p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <i className="bi bi-lightning-charge-fill text-red fs-4 d-block mb-1"></i>
                    <h6 className="fw-bold text-white mb-0" style={{ fontSize: '0.9rem' }}>Quick Response</h6>
                    <small className="text-light" style={{ fontSize: '0.75rem' }}>We reply within 24 hours</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <i className="bi bi-chat-dots-fill text-red fs-4 d-block mb-1"></i>
                    <h6 className="fw-bold text-white mb-0" style={{ fontSize: '0.9rem' }}>Multiple Channels</h6>
                    <small className="text-light" style={{ fontSize: '0.75rem' }}>Phone, Email, Live Chat</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <i className="bi bi-people-fill text-red fs-4 d-block mb-1"></i>
                    <h6 className="fw-bold text-white mb-0" style={{ fontSize: '0.9rem' }}>Experienced Team</h6>
                    <small className="text-light" style={{ fontSize: '0.75rem' }}>Professional and friendly</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <i className="bi bi-shield-check text-red fs-4 d-block mb-1"></i>
                    <h6 className="fw-bold text-white mb-0" style={{ fontSize: '0.9rem' }}>Comprehensive Help</h6>
                    <small className="text-light" style={{ fontSize: '0.75rem' }}>Help with all services</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: QUICK ANSWERS (FAQS) */}
      <section className="py-5 bg-white" id="faqs">
        <div className="container py-4">
          <div className="d-flex flex-wrap align-items-end justify-content-between mb-5" data-aos="fade-up">
            <div>
              <div className="section-tag tag-start">— FREQUENTLY ASKED QUESTIONS</div>
              <h2 className="section-title mb-0">Quick Answers</h2>
              <p className="text-muted mt-2">Find answers to common questions. If you need more help, feel free to contact us.</p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="50">
              <div className="accordion licentra-accordion" id="contactFaqCol1">
                <div className="accordion-item">
                  <h3 className="accordion-header" id="cfaqH1">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#cfaqC1" aria-expanded="true" aria-controls="cfaqC1">
                      What are the working hours of Licentra centers?
                    </button>
                  </h3>
                  <div id="cfaqC1" className="accordion-collapse collapse show" aria-labelledby="cfaqH1" data-bs-parent="#contactFaqCol1">
                    <div className="accordion-body">
                      All official Licentra service centers operate Sunday through Thursday from 8:00 AM to 4:00 PM. Electronic appointment booking services and citizen portals remain operational online 24 hours a day, 7 days a week.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h3 className="accordion-header" id="cfaqH2">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#cfaqC2" aria-expanded="false" aria-controls="cfaqC2">
                      Can I change my appointment date after booking?
                    </button>
                  </h3>
                  <div id="cfaqC2" className="accordion-collapse collapse" aria-labelledby="cfaqH2" data-bs-parent="#contactFaqCol1">
                    <div className="accordion-body">
                      Yes. You can reschedule your test appointment up to 48 hours prior to your booked slot without any administrative fees through your citizen dashboard.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h3 className="accordion-header" id="cfaqH3">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#cfaqC3" aria-expanded="false" aria-controls="cfaqC3">
                      How long does it take to issue a replacement license?
                    </button>
                  </h3>
                  <div id="cfaqC3" className="accordion-collapse collapse" aria-labelledby="cfaqH3" data-bs-parent="#contactFaqCol1">
                    <div className="accordion-body">
                      A replacement license for a lost or damaged card is processed within 24 to 48 hours. If express courier delivery is selected, it will arrive at your registered address within 2 business days.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <div className="accordion licentra-accordion" id="contactFaqCol2">
                <div className="accordion-item">
                  <h3 className="accordion-header" id="cfaqH4">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#cfaqC4" aria-expanded="true" aria-controls="cfaqC4">
                      What payment methods are accepted online?
                    </button>
                  </h3>
                  <div id="cfaqC4" className="accordion-collapse collapse show" aria-labelledby="cfaqH4" data-bs-parent="#contactFaqCol2">
                    <div className="accordion-body">
                      We accept all major credit and debit cards (Visa, MasterCard, Meeza) as well as Fawry reference payment and digital smart wallets.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h3 className="accordion-header" id="cfaqH5">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#cfaqC5" aria-expanded="false" aria-controls="cfaqC5">
                      How do I submit feedback or file a complaint?
                    </button>
                  </h3>
                  <div id="cfaqC5" className="accordion-collapse collapse" aria-labelledby="cfaqH5" data-bs-parent="#contactFaqCol2">
                    <div className="accordion-body">
                      You can send a message using the form above selecting "General Inquiry" or email complaints directly to <a href="mailto:support@licentra.gov.eg">support@licentra.gov.eg</a> with your application reference ID.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h3 className="accordion-header" id="cfaqH6">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#cfaqC6" aria-expanded="false" aria-controls="cfaqC6">
                      Are driving test examinations available on Saturdays?
                    </button>
                  </h3>
                  <div id="cfaqC6" className="accordion-collapse collapse" aria-labelledby="cfaqH6" data-bs-parent="#contactFaqCol2">
                    <div className="accordion-body">
                      Currently, driving examinations and test tracks operate Sunday through Thursday. Any special weekend test sessions will be officially announced on our News page.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

