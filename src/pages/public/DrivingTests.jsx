import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LicentraDB from '../../services/db';
import { useAuth } from '../../hooks/useAuth';

export default function DrivingTests() {
  const { user } = useAuth();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    testType: 'Theory Test (Computer Lab)',
    licenseClass: 'Class 3 - Private Car',
    center: 'Cairo Main Center (Nasr City)',
    date: '',
    timeSlot: '10:30 AM – 12:00 PM',
    fullName: '',
    nationalId: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Set default date to 3 days from now
    const d = new Date();
    d.setDate(d.getDate() + 3);
    const defaultDate = d.toISOString().split('T')[0];

    const currentUser = user || (typeof window !== 'undefined' && window.LicentraDB ? window.LicentraDB.getCurrentUser() : null);

    setBookingData(prev => ({
      ...prev,
      date: defaultDate,
      fullName: currentUser ? currentUser.fullName : prev.fullName,
      nationalId: currentUser ? currentUser.nationalId || '' : prev.nationalId,
    }));
  }, [user]);

  const handleOpenBooking = (type) => {
    if (type) {
      let mappedType = 'Theory Test (Computer Lab)';
      if (type.includes('Vision')) mappedType = 'Vision Screening Exam';
      else if (type.includes('Practical')) mappedType = 'Practical Driving Test (Track)';
      setBookingData(prev => ({ ...prev, testType: mappedType }));
    }
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.date) {
      if (window.showToast) window.showToast('Please select an appointment date.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      try {
        const userEmail = user?.email || (typeof window !== 'undefined' && window.LicentraDB?.getCurrentUser()?.email) || '';
        const newBooking = LicentraDB.createBooking({
          userEmail,
          applicantName: bookingData.fullName || 'Citizen Applicant',
          nationalId: bookingData.nationalId || '',
          testType: bookingData.testType,
          licenseClass: bookingData.licenseClass,
          center: bookingData.center,
          date: bookingData.date,
          timeSlot: bookingData.timeSlot,
        });

        setIsSubmitting(false);
        setShowBookingModal(false);

        if (window.showToast) {
          window.showToast(`Test booked successfully! Booking Ref: ${newBooking.id}`, 'success');
        }
      } catch (err) {
        setIsSubmitting(false);
        if (window.showToast) window.showToast('Failed to book appointment. Please try again.', 'error');
      }
    }, 600);
  };

  return (
    <div>
      {/* PAGE HERO */}
      <header className="page-hero" style={{ backgroundImage: "url('/assets/images/hero/test_car_thumb.png')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8" data-aos="fade-up">
              <div className="hero-tag">— DRIVING TESTS</div>
              <h1 className="hero-title">Test Today <span className="text-red">Drive Tomorrow.</span></h1>
              <p className="hero-subtitle">
                Book your driving test, prepare with confidence, and take the next step towards your driving license.
              </p>
              <ul className="licentra-breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li className="separator"><i className="bi bi-chevron-right"></i></li>
                <li className="current">Driving Tests</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* HIGHLIGHT PILLS */}
      <section className="py-4 bg-surface">
        <div className="container">
          <div className="row g-3">
            <div className="col-6 col-lg-3" data-aos="fade-up">
              <div className="feature-highlight-card">
                <div className="feature-highlight-icon">
                  <img src="/assets/images/icons/03_test_types_calendar.svg" alt="Easy Booking" />
                </div>
                <div>
                  <div className="feature-highlight-title">Easy Booking</div>
                  <p className="feature-highlight-desc">Schedule your test online in minutes</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="50">
              <div className="feature-highlight-card">
                <div className="feature-highlight-icon">
                  <img src="/assets/images/icons/02_license_classes_shield.svg" alt="Multiple Test Types" />
                </div>
                <div>
                  <div className="feature-highlight-title">Multiple Test Types</div>
                  <p className="feature-highlight-desc">Theory, vision, and practical tests</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-highlight-card">
                <div className="feature-highlight-icon">
                  <img src="/assets/images/icons/09_user_profile.svg" alt="Qualified Examiners" />
                </div>
                <div>
                  <div className="feature-highlight-title">Qualified Examiners</div>
                  <p className="feature-highlight-desc">Professional and certified testing team</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="150">
              <div className="feature-highlight-card">
                <div className="feature-highlight-icon">
                  <img src="/assets/images/icons/10_reliable_services_shield.svg" alt="Transparent Process" />
                </div>
                <div>
                  <div className="feature-highlight-title">Transparent Process</div>
                  <p className="feature-highlight-desc">Clear steps and fair evaluation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: TYPES OF DRIVING TESTS */}
      <section className="py-5 bg-white" id="theory-test">
        <div className="container py-4">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-tag">— OUR TESTS —</div>
            <h2 className="section-title">Types of Driving Tests</h2>
            <p className="section-subtitle">
              Complete all required tests based on your license class. Each test is designed to ensure safe and responsible drivers on the road.
            </p>
          </div>

          <div className="row g-4">
            {/* Test 1: Theory Test */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="50">
              <div className="test-type-card">
                <div className="test-type-header">
                  <div className="test-type-icon">
                    <img src="/assets/images/icons/03_test_types_calendar.svg" alt="Theory Test Icon" />
                  </div>
                  <h3 className="fw-bold text-navy fs-5 mb-2">Theory Test</h3>
                  <p className="text-muted small mb-0">
                    A computer-based test that assesses your knowledge of traffic rules, road signs, and safe driving practices.
                  </p>
                </div>
                <div className="test-type-img-wrap">
                  <img src="/assets/images/tests/theory_test_lab.png" alt="Theory Test Screen" />
                </div>
                <div className="test-type-body">
                  <ul className="test-checklist">
                    <li><i className="bi bi-check-circle-fill"></i> Multiple choice questions</li>
                    <li><i className="bi bi-check-circle-fill"></i> Traffic rules and regulations</li>
                    <li><i className="bi bi-check-circle-fill"></i> Road signs and signals</li>
                    <li><i className="bi bi-check-circle-fill"></i> Required for all license classes</li>
                  </ul>
                  <button 
                    type="button" 
                    className="btn btn-licentra-primary btn-sm w-100" 
                    onClick={() => handleOpenBooking('Theory Test')}
                  >
                    Book Theory Test <i className="bi bi-calendar-check ms-1"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Test 2: Vision Test */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100" id="vision-test">
              <div className="test-type-card">
                <div className="test-type-header">
                  <div className="test-type-icon">
                    <img src="/assets/images/icons/06_vision_eye.svg" alt="Vision Test Icon" />
                  </div>
                  <h3 className="fw-bold text-navy fs-5 mb-2">Vision Test</h3>
                  <p className="text-muted small mb-0">
                    A simple test to check your eyesight and ensure you meet the minimum visual requirements.
                  </p>
                </div>
                <div className="test-type-img-wrap">
                  <img src="/assets/images/tests/vision_test_exam.png" alt="Vision Optometry Exam" />
                </div>
                <div className="test-type-body">
                  <ul className="test-checklist">
                    <li><i className="bi bi-check-circle-fill"></i> Checks visual acuity</li>
                    <li><i className="bi bi-check-circle-fill"></i> Color vision test</li>
                    <li><i className="bi bi-check-circle-fill"></i> Required for all applicants</li>
                    <li><i className="bi bi-check-circle-fill"></i> Quick and easy process</li>
                  </ul>
                  <button 
                    type="button" 
                    className="btn btn-licentra-primary btn-sm w-100" 
                    onClick={() => handleOpenBooking('Vision Screening')}
                  >
                    Book Vision Test <i className="bi bi-calendar-check ms-1"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Test 3: Practical Test */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="150" id="practical-test">
              <div className="test-type-card">
                <div className="test-type-header">
                  <div className="test-type-icon">
                    <img src="/assets/images/icons/08_modern_systems_gear.svg" alt="Practical Test Icon" />
                  </div>
                  <h3 className="fw-bold text-navy fs-5 mb-2">Practical Test</h3>
                  <p className="text-muted small mb-0">
                    A real driving test to evaluate your driving skills, road awareness, and ability to handle different situations.
                  </p>
                </div>
                <div className="test-type-img-wrap">
                  <img src="/assets/images/tests/practical_test_track.png" alt="Practical Test Track" />
                </div>
                <div className="test-type-body">
                  <ul className="test-checklist">
                    <li><i className="bi bi-check-circle-fill"></i> On-road driving evaluation</li>
                    <li><i className="bi bi-check-circle-fill"></i> Maneuvering and parking</li>
                    <li><i className="bi bi-check-circle-fill"></i> Traffic rules compliance</li>
                    <li><i className="bi bi-check-circle-fill"></i> Assessed by certified examiners</li>
                  </ul>
                  <button 
                    type="button" 
                    className="btn btn-licentra-primary btn-sm w-100" 
                    onClick={() => handleOpenBooking('Practical Driving Test')}
                  >
                    Book Practical Test <i className="bi bi-calendar-check ms-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: BOOK YOUR TEST BANNER */}
      <section className="py-5 bg-surface">
        <div className="container py-4">
          <div className="schedule-test-banner p-4 p-lg-5" data-aos="fade-up">
            <div className="row align-items-center g-5">
              <div className="col-lg-7">
                <div className="section-tag tag-start">— BOOK YOUR TEST</div>
                <h2 className="section-title">Schedule Your <span className="text-red">Driving Test Online</span></h2>
                <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                  Choose your test type, select a convenient date and location, and get ready with confidence. Real-time slot availability across all governorates.
                </p>
                <div className="mb-4">
                  <img src="/assets/images/hero/examiner_thumb.png" alt="Licentra Test Car" className="w-100 rounded-4 shadow-sm" />
                </div>
                <button type="button" className="btn btn-licentra-primary" onClick={() => handleOpenBooking()}>
                  Book a Test Now <i className="bi bi-arrow-right"></i>
                </button>
              </div>

              <div className="col-lg-5">
                <div className="p-4 p-lg-5 bg-white rounded-4 border shadow-sm">
                  <h4 className="fw-bold text-navy mb-4"><i className="bi bi-check2-square text-red me-2"></i> What You Need to Book</h4>
                  <ul className="list-unstyled mb-0" style={{ lineHeight: '2.2', fontSize: '0.95rem' }}>
                    <li className="d-flex align-items-center gap-3">
                      <i className="bi bi-card-text text-red fs-5"></i>
                      <span>Valid National ID</span>
                    </li>
                    <li className="d-flex align-items-center gap-3">
                      <i className="bi bi-file-earmark-check text-red fs-5"></i>
                      <span>Completed Application</span>
                    </li>
                    <li className="d-flex align-items-center gap-3">
                      <i className="bi bi-credit-card text-red fs-5"></i>
                      <span>Required Fees Payment</span>
                    </li>
                    <li className="d-flex align-items-center gap-3">
                      <i className="bi bi-person-badge text-red fs-5"></i>
                      <span>Meet the Minimum Age</span>
                    </li>
                    <li className="d-flex align-items-center gap-3">
                      <i className="bi bi-geo-alt text-red fs-5"></i>
                      <span>Choose Test Type and Location</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-tag">— HOW IT WORKS —</div>
            <h2 className="section-title">Book and Take Your Driving Test in 4 Easy Steps</h2>
            <p className="section-subtitle">A seamless four-stage procedure designed for maximum efficiency.</p>
          </div>

          <div className="row g-4 position-relative justify-content-center">
            <div className="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="50">
              <div className="step-card">
                <div className="step-badge">01</div>
                <div className="step-icon-box">
                  <img src="/assets/images/icons/03_test_types_calendar.svg" alt="Choose Test Type" />
                </div>
                <h3 className="step-title">Choose Test Type</h3>
                <p className="step-desc">Select theory, vision, or practical test.</p>
                <div className="step-connector-arrow d-none d-lg-block"><i className="bi bi-arrow-right"></i></div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
              <div className="step-card">
                <div className="step-badge">02</div>
                <div className="step-icon-box">
                  <img src="/assets/images/icons/icon_15_step_book_test.svg" alt="Pick Date & Location" />
                </div>
                <h3 className="step-title">Pick Date &amp; Location</h3>
                <p className="step-desc">Choose a convenient test center and date.</p>
                <div className="step-connector-arrow d-none d-lg-block"><i className="bi bi-arrow-right"></i></div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="150">
              <div className="step-card">
                <div className="step-badge">03</div>
                <div className="step-icon-box">
                  <img src="/assets/images/icons/icon_16_step_pay_fees.svg" alt="Pay the Fees" />
                </div>
                <h3 className="step-title">Pay the Fees</h3>
                <p className="step-desc">Complete the required payment online.</p>
                <div className="step-connector-arrow d-none d-lg-block"><i className="bi bi-arrow-right"></i></div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
              <div className="step-card">
                <div className="step-badge">04</div>
                <div className="step-icon-box">
                  <img src="/assets/images/icons/icon_17_step_get_license.svg" alt="Take the Test" />
                </div>
                <h3 className="step-title">Take the Test</h3>
                <p className="step-desc">Attend your test and get your results immediately.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: TEST CENTERS */}
      <section className="py-5 bg-surface" id="test-centers">
        <div className="container py-4">
          <div className="d-flex flex-wrap align-items-end justify-content-between mb-4" data-aos="fade-up">
            <div>
              <div className="section-tag tag-start">— TEST CENTERS</div>
              <h2 className="section-title mb-0">Our Driving Test Centers</h2>
              <p className="text-muted mt-2">Find a test center near you with modern facilities and professional examiners.</p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="test-center-card h-100">
                <div className="test-center-img">
                  <img src="/assets/images/tests/cairo_center.png" alt="Cairo Main Center" />
                </div>
                <div className="test-center-info">
                  <h4 className="fw-bold text-navy fs-5 mb-1">Cairo Main Center</h4>
                  <p className="text-muted small mb-2"><i className="bi bi-geo-alt-fill text-red"></i> Nasr City, Cairo</p>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="badge bg-surface text-secondary border">Theory</span>
                    <span className="badge bg-surface text-secondary border">Vision</span>
                    <span className="badge bg-surface text-secondary border">Practical</span>
                  </div>
                  <Link to="/contact#locations" className="btn-text-arrow">View Details <i className="bi bi-arrow-right"></i></Link>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="test-center-card h-100">
                <div className="test-center-img">
                  <img src="/assets/images/tests/giza_center.png" alt="Giza Center" />
                </div>
                <div className="test-center-info">
                  <h4 className="fw-bold text-navy fs-5 mb-1">Giza Center</h4>
                  <p className="text-muted small mb-2"><i className="bi bi-geo-alt-fill text-red"></i> 6th of October, Giza</p>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="badge bg-surface text-secondary border">Theory</span>
                    <span className="badge bg-surface text-secondary border">Vision</span>
                    <span className="badge bg-surface text-secondary border">Practical</span>
                  </div>
                  <Link to="/contact#locations" className="btn-text-arrow">View Details <i className="bi bi-arrow-right"></i></Link>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="test-center-card h-100">
                <div className="test-center-img">
                  <img src="/assets/images/tests/alexandria_center.png" alt="Alexandria Center" />
                </div>
                <div className="test-center-info">
                  <h4 className="fw-bold text-navy fs-5 mb-1">Alexandria Center</h4>
                  <p className="text-muted small mb-2"><i className="bi bi-geo-alt-fill text-red"></i> Smouha, Alexandria</p>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="badge bg-surface text-secondary border">Theory</span>
                    <span className="badge bg-surface text-secondary border">Vision</span>
                    <span className="badge bg-surface text-secondary border">Practical</span>
                  </div>
                  <Link to="/contact#locations" className="btn-text-arrow">View Details <i className="bi bi-arrow-right"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQS & TIPS */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row g-5 align-items-start">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="section-tag tag-start">— FREQUENTLY ASKED QUESTIONS</div>
              <h2 className="section-title mb-4">Frequently Asked Questions</h2>

              <div className="accordion licentra-accordion" id="testFaqAccordion">
                <div className="accordion-item">
                  <h3 className="accordion-header" id="testFaq1">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTest1" aria-expanded="true" aria-controls="collapseTest1">
                      How can I book a driving test?
                    </button>
                  </h3>
                  <div id="collapseTest1" className="accordion-collapse collapse show" aria-labelledby="testFaq1" data-bs-parent="#testFaqAccordion">
                    <div className="accordion-body">
                      You can book your driving test online via our digital booking system. Simply select your license class, pick your preferred testing center and time slot, and settle the statutory exam fee online.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h3 className="accordion-header" id="testFaq2">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTest2" aria-expanded="false" aria-controls="collapseTest2">
                      What documents do I need on test day?
                    </button>
                  </h3>
                  <div id="collapseTest2" className="accordion-collapse collapse" aria-labelledby="testFaq2" data-bs-parent="#testFaqAccordion">
                    <div className="accordion-body">
                      Bring your original Egyptian National ID (or valid passport with residency visa), appointment confirmation slip, and passed medical fitness report.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h3 className="accordion-header" id="testFaq3">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTest3" aria-expanded="false" aria-controls="collapseTest3">
                      How much are the test fees?
                    </button>
                  </h3>
                  <div id="collapseTest3" className="accordion-collapse collapse" aria-labelledby="testFaq3" data-bs-parent="#testFaqAccordion">
                    <div className="accordion-body">
                      Initial test fees are included in your standard license application package. If you need to retake a practical or theoretical exam, the official re-test appointment fee is EGP 200.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h3 className="accordion-header" id="testFaq4">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTest4" aria-expanded="false" aria-controls="collapseTest4">
                      What happens if I fail the test?
                    </button>
                  </h3>
                  <div id="collapseTest4" className="accordion-collapse collapse" aria-labelledby="testFaq4" data-bs-parent="#testFaqAccordion">
                    <div className="accordion-body">
                      If you do not pass either the computer theory exam or the practical evaluation, you can schedule a re-test after a 14-day training period. You only retake the module you did not pass.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h3 className="accordion-header" id="testFaq5">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTest5" aria-expanded="false" aria-controls="collapseTest5">
                      Can I reschedule my test?
                    </button>
                  </h3>
                  <div id="collapseTest5" className="accordion-collapse collapse" aria-labelledby="testFaq5" data-bs-parent="#testFaqAccordion">
                    <div className="accordion-body">
                      Yes, you can reschedule your test appointment free of charge up to 48 hours prior to your scheduled time via your citizen dashboard.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left">
              <div className="p-4 p-lg-5 bg-surface rounded-4 border shadow-sm">
                <h3 className="fw-bold text-navy mb-4"><i className="bi bi-lightbulb-fill text-red me-2"></i> Tips for a Successful Test</h3>
                <ul className="list-unstyled mb-4" style={{ lineHeight: '2.2', fontSize: '0.95rem' }}>
                  <li><i className="bi bi-check-circle-fill text-red me-2"></i> Study the traffic rules and road signs thoroughly</li>
                  <li><i className="bi bi-check-circle-fill text-red me-2"></i> Practice driving in different traffic conditions</li>
                  <li><i className="bi bi-check-circle-fill text-red me-2"></i> Be familiar with the test track and parallel parking maneuver</li>
                  <li><i className="bi bi-check-circle-fill text-red me-2"></i> Check mirrors, lights, and seatbelt before moving</li>
                  <li><i className="bi bi-check-circle-fill text-red me-2"></i> Arrive early at the test center with required documents</li>
                </ul>
                <div className="p-3 bg-white rounded-3 border">
                  <small className="text-muted d-block mb-1">Testing Tip:</small>
                  <strong className="text-navy">95% of candidates who review the official Licentra Sign Guide pass the computer theory test on their first attempt.</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: LATEST NEWS PREVIEW */}
      <section className="py-5 bg-surface">
        <div className="container py-4">
          <div className="d-flex flex-wrap align-items-end justify-content-between mb-5" data-aos="fade-up">
            <div>
              <div className="section-tag tag-start">— LATEST NEWS</div>
              <h2 className="section-title mb-0">Driving Test Tips &amp; Updates</h2>
            </div>
            <Link to="/news" className="btn-text-arrow mt-2 mt-md-0 fw-bold">
              View All News <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="50">
              <div className="news-card">
                <div className="news-card-img-wrap">
                  <img src="/assets/images/news/safety_tips.png" alt="Test Tips" />
                  <span className="news-card-badge">Tips</span>
                </div>
                <div className="news-card-body">
                  <div className="news-card-date"><i className="bi bi-calendar3"></i> 10 Oct 2024</div>
                  <h3 className="news-card-title"><Link to="/news/article-1">Top 10 Tips to Pass Your Driving Test</Link></h3>
                  <p className="news-card-desc">Helpful tips to prepare for your theory and practical tests.</p>
                  <Link to="/news/article-1" className="btn-text-arrow mt-auto">Read More <i className="bi bi-arrow-right"></i></Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="news-card">
                <div className="news-card-img-wrap">
                  <img src="/assets/images/news/traffic_signs.png" alt="Traffic Signs" />
                  <span className="news-card-badge">Theory</span>
                </div>
                <div className="news-card-body">
                  <div className="news-card-date"><i className="bi bi-calendar3"></i> 05 Oct 2024</div>
                  <h3 className="news-card-title"><Link to="/news/article-2">New Traffic Signs Added to the Theory Test</Link></h3>
                  <p className="news-card-desc">Learn about the latest signs and rules for the driving test.</p>
                  <Link to="/news/article-2" className="btn-text-arrow mt-auto">Read More <i className="bi bi-arrow-right"></i></Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="150">
              <div className="news-card">
                <div className="news-card-img-wrap">
                  <img src="/assets/images/news/practical_tracks.png" alt="Mistakes" />
                  <span className="news-card-badge">Practical</span>
                </div>
                <div className="news-card-body">
                  <div className="news-card-date"><i className="bi bi-calendar3"></i> 28 Sep 2024</div>
                  <h3 className="news-card-title"><Link to="/news/article-3">Common Mistakes in the Practical Test</Link></h3>
                  <p className="news-card-desc">Avoid these common mistakes to increase your chances of success.</p>
                  <Link to="/news/article-3" className="btn-text-arrow mt-auto">Read More <i className="bi bi-arrow-right"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CTA BANNER */}
      <section className="cta-banner-section">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <h2 className="cta-banner-title">Ready to Take Your Driving Test?</h2>
              <p className="cta-banner-desc">
                Book your test today and get one step closer to your driving license.
              </p>
              <div className="cta-banner-btns">
                <button type="button" className="btn btn-licentra-white" onClick={() => handleOpenBooking()}>
                  Book a Test Now <i className="bi bi-arrow-right"></i>
                </button>
                <a href="#test-centers" className="btn btn-licentra-outline">
                  View Test Centers
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING MODAL */}
      {showBookingModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(10,25,47,0.7)', zIndex: 1055 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header bg-navy text-white px-4 py-3">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-calendar-check text-red me-2"></i> Book a Driving Test Appointment
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowBookingModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleBookingSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-navy">Test Type *</label>
                      <select 
                        className="form-select" 
                        value={bookingData.testType} 
                        onChange={e => setBookingData({ ...bookingData, testType: e.target.value })} 
                        required
                      >
                        <option value="Theory Test (Computer Lab)">Theory Test (Computer Lab)</option>
                        <option value="Vision Screening Exam">Vision Screening Exam</option>
                        <option value="Practical Driving Test (Track)">Practical Driving Test (Track)</option>
                        <option value="Comprehensive Package (All 3 Tests)">Comprehensive Package (All 3 Tests)</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-navy">License Class *</label>
                      <select 
                        className="form-select" 
                        value={bookingData.licenseClass} 
                        onChange={e => setBookingData({ ...bookingData, licenseClass: e.target.value })} 
                        required
                      >
                        <option value="Class 3 - Private Car">Class 3 - Private Car</option>
                        <option value="Class 1 - Light Motorcycle">Class 1 - Light Motorcycle</option>
                        <option value="Class 2 - Heavy Motorcycle">Class 2 - Heavy Motorcycle</option>
                        <option value="Class 4 - Taxi / Limousine">Class 4 - Taxi / Limousine</option>
                        <option value="Class 6 - Passenger Bus">Class 6 - Passenger Bus</option>
                        <option value="Class 7 - Heavy Truck">Class 7 - Heavy Truck</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-navy">Test Center Location *</label>
                      <select 
                        className="form-select" 
                        value={bookingData.center} 
                        onChange={e => setBookingData({ ...bookingData, center: e.target.value })} 
                        required
                      >
                        <option value="Cairo Main Center (Nasr City)">Cairo Main Center (Nasr City)</option>
                        <option value="Giza Center (6th of October)">Giza Center (6th of October)</option>
                        <option value="Alexandria Center (Smouha)">Alexandria Center (Smouha)</option>
                        <option value="Mansoura Center (Dakahlia)">Mansoura Center (Dakahlia)</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-navy">Preferred Appointment Date *</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        value={bookingData.date} 
                        onChange={e => setBookingData({ ...bookingData, date: e.target.value })} 
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-navy">Preferred Time Slot *</label>
                      <select 
                        className="form-select" 
                        value={bookingData.timeSlot} 
                        onChange={e => setBookingData({ ...bookingData, timeSlot: e.target.value })} 
                        required
                      >
                        <option value="09:00 AM – 10:30 AM">09:00 AM – 10:30 AM</option>
                        <option value="10:30 AM – 12:00 PM">10:30 AM – 12:00 PM</option>
                        <option value="12:30 PM – 02:00 PM">12:30 PM – 02:00 PM</option>
                        <option value="02:30 PM – 04:00 PM">02:30 PM – 04:00 PM</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-navy">Full Name *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter your full name" 
                        value={bookingData.fullName} 
                        onChange={e => setBookingData({ ...bookingData, fullName: e.target.value })} 
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-navy">National ID Number *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="14-digit National ID" 
                        value={bookingData.nationalId} 
                        onChange={e => setBookingData({ ...bookingData, nationalId: e.target.value })} 
                        required 
                        pattern="[0-9]{14}" 
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-surface rounded-3 border mt-4">
                    <small className="text-muted d-block"><i className="bi bi-info-circle text-red me-1"></i> Examination Notice</small>
                    <span className="small text-secondary">You must present your original National ID card upon entry. Results are certified immediately upon completion of testing.</span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <Link to="/apply#bookings" className="small text-navy fw-semibold" onClick={() => setShowBookingModal(false)}>
                      <i className="bi bi-clock-history me-1"></i> View existing bookings
                    </Link>
                    <div>
                      <button type="button" className="btn btn-secondary rounded-pill me-2" onClick={() => setShowBookingModal(false)}>Cancel</button>
                      <button type="submit" className="btn btn-licentra-primary" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span> Reserving...
                          </>
                        ) : (
                          <>
                            Confirm Appointment <i className="bi bi-arrow-right"></i>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

