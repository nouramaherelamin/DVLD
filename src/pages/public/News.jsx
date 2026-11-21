import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import LicentraDB from '../../services/db';
import { useAuth } from '../../hooks/useAuth';

export default function News() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  // Event modal state
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventForm, setEventForm] = useState({
    name: '',
    email: '',
    phone: '',
    seats: 1,
  });

  const allArticles = useMemo(() => {
    return LicentraDB.getNews();
  }, []);

  const upcomingEvents = useMemo(() => {
    return LicentraDB.getEvents ? LicentraDB.getEvents() : [
      {
        id: 'EVT-01',
        title: 'Road Safety Awareness Workshop',
        location: 'Cairo Main Center',
        dateNum: '25',
        dateMonth: 'Oct 2024',
        time: '10:00 AM – 2:00 PM',
      },
      {
        id: 'EVT-02',
        title: 'Free Vision Test Campaign',
        location: 'Giza Test Center',
        dateNum: '10',
        dateMonth: 'Nov 2024',
        time: '9:00 AM – 4:00 PM',
      },
      {
        id: 'EVT-03',
        title: 'New Drivers Orientation Session',
        location: 'Alexandria Center',
        dateNum: '20',
        dateMonth: 'Nov 2024',
        time: '11:00 AM – 3:00 PM',
      },
    ];
  }, []);

  const filteredArticles = useMemo(() => {
    return allArticles.filter((art) => {
      const matchCat = activeCategory === 'all' || art.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.desc.toLowerCase().includes(q) ||
        (art.categoryLabel && art.categoryLabel.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [allArticles, activeCategory, searchQuery]);

  const handleOpenEventModal = (evt) => {
    const currentUser = user || (typeof window !== 'undefined' && window.LicentraDB ? window.LicentraDB.getCurrentUser() : null);
    setSelectedEvent(evt);
    setEventForm({
      name: currentUser ? currentUser.fullName : '',
      email: currentUser ? currentUser.email : '',
      phone: currentUser ? currentUser.phone || '' : '',
      seats: 1,
    });
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (!eventForm.name || !eventForm.email || !eventForm.phone) {
      if (window.showToast) window.showToast('Please fill all required fields.', 'warning');
      return;
    }

    try {
      const rec = LicentraDB.registerForEvent({
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        name: eventForm.name,
        email: eventForm.email,
        phone: eventForm.phone,
        seats: parseInt(eventForm.seats, 10),
      });

      setSelectedEvent(null);
      if (window.showToast) {
        window.showToast(`Registration confirmed! Ref #${rec.id}. Pass sent to ${eventForm.email}.`, 'success');
      }
    } catch (err) {
      if (window.showToast) window.showToast('Failed to register for event.', 'error');
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (window.showToast) window.showToast('Thank you for subscribing to Licentra updates!', 'success');
    e.target.reset();
  };

  return (
    <div>
      {/* PAGE HERO */}
      <header className="page-hero" style={{ backgroundImage: "url('/assets/images/hero/licentra_building.png')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8" data-aos="fade-up">
              <div className="hero-tag">— NEWS &amp; UPDATES</div>
              <h1 className="hero-title">Stay Informed <span className="text-red">Drive with Confidence.</span></h1>
              <p className="hero-subtitle">
                Get the latest news, announcements, and updates from Licentra about driving licenses, vehicle services, regulations, and road safety across Egypt.
              </p>
              <ul className="licentra-breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li className="separator"><i className="bi bi-chevron-right"></i></li>
                <li className="current">News</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* CATEGORY FILTER TABS BAR */}
      <section className="py-4 bg-white border-bottom">
        <div className="container">
          <div className="news-filter-tabs justify-content-center m-0" data-aos="fade-up">
            <button 
              className={`news-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              <i className="bi bi-grid-fill me-1"></i> All News
            </button>
            <button 
              className={`news-filter-btn ${activeCategory === 'announcement' ? 'active' : ''}`}
              onClick={() => setActiveCategory('announcement')}
            >
              <i className="bi bi-megaphone-fill me-1"></i> Announcements
            </button>
            <button 
              className={`news-filter-btn ${activeCategory === 'regulations' ? 'active' : ''}`}
              onClick={() => setActiveCategory('regulations')}
            >
              <i className="bi bi-file-earmark-text-fill me-1"></i> New Regulations
            </button>
            <button 
              className={`news-filter-btn ${activeCategory === 'events' ? 'active' : ''}`}
              onClick={() => setActiveCategory('events')}
            >
              <i className="bi bi-calendar-event-fill me-1"></i> Events
            </button>
            <button 
              className={`news-filter-btn ${activeCategory === 'safety' ? 'active' : ''}`}
              onClick={() => setActiveCategory('safety')}
            >
              <i className="bi bi-shield-fill-check me-1"></i> Road Safety
            </button>
            <button 
              className={`news-filter-btn ${activeCategory === 'service' ? 'active' : ''}`}
              onClick={() => setActiveCategory('service')}
            >
              <i className="bi bi-gear-fill me-1"></i> Service Updates
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 1: FEATURED NEWS */}
      <section className="py-5 bg-surface">
        <div className="container py-3">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-tag">— FEATURED NEWS —</div>
            <h2 className="section-title">Latest &amp; Important News</h2>
            <p className="section-subtitle">Stay updated with the most important announcements from Licentra.</p>
          </div>

          <div className="row g-4 align-items-stretch">
            {/* Big Featured Card */}
            <div className="col-lg-7" data-aos="fade-right">
              <div className="featured-news-main h-100">
                <img src="/assets/images/news/renewal_online.png" alt="Renewal Online" />
                <div className="featured-news-content">
                  <span className="featured-news-badge">Announcement</span>
                  <div className="small text-light mb-2"><i className="bi bi-calendar3"></i> 15 Oct 2024</div>
                  <h3 className="fw-bold text-white mb-2">New Driving License Renewal Process Now Available Online</h3>
                  <p className="text-light small mb-3">
                    Licentra introduces a faster and easier online renewal process to serve you better. Renew your driving license from home in just a few simple steps with instant digital verification.
                  </p>
                  <Link to="/news/article-1" className="btn btn-licentra-primary btn-sm">Read More <i className="bi bi-arrow-right"></i></Link>
                </div>
              </div>
            </div>

            {/* Side Horizontal Cards */}
            <div className="col-lg-5" data-aos="fade-left">
              <div className="d-flex flex-column justify-content-between h-100">
                <div className="featured-side-card">
                  <div className="featured-side-img">
                    <img src="/assets/images/news/extended_hours.png" alt="Extended Working Hours" />
                  </div>
                  <div className="featured-side-body">
                    <div className="small text-muted mb-1"><i className="bi bi-calendar3 text-red"></i> 10 Oct 2024</div>
                    <h5 className="fw-bold text-navy fs-6 mb-2">Extended Working Hours at Main Centers</h5>
                    <Link to="/news/article-2" className="btn-text-arrow">Read More <i className="bi bi-arrow-right"></i></Link>
                  </div>
                </div>

                <div className="featured-side-card">
                  <div className="featured-side-img">
                    <img src="/assets/images/news/practical_tracks.png" alt="New Test Tracks" />
                  </div>
                  <div className="featured-side-body">
                    <div className="small text-muted mb-1"><i className="bi bi-calendar3 text-red"></i> 05 Oct 2024</div>
                    <h5 className="fw-bold text-navy fs-6 mb-2">New Practical Test Tracks Now Open in Giza</h5>
                    <Link to="/news/article-3" className="btn-text-arrow">Read More <i className="bi bi-arrow-right"></i></Link>
                  </div>
                </div>

                <div className="featured-side-card mb-0">
                  <div className="featured-side-img">
                    <img src="/assets/images/news/updated_fees.png" alt="Updated Fees" />
                  </div>
                  <div className="featured-side-body">
                    <div className="small text-muted mb-1"><i className="bi bi-calendar3 text-red"></i> 28 Sep 2024</div>
                    <h5 className="fw-bold text-navy fs-6 mb-2">Updated Fees for License Services</h5>
                    <Link to="/news/article-4" className="btn-text-arrow">Read More <i className="bi bi-arrow-right"></i></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ALL NEWS & ARTICLES GRID */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between mb-5 gap-3" data-aos="fade-up">
            <div>
              <h2 className="section-title mb-1">All News &amp; Articles</h2>
              <p className="text-muted mb-0">Explore the latest news and updates.</p>
            </div>
            <div style={{ minWidth: '280px', maxWidth: '380px' }} className="w-100">
              <div className="position-relative">
                <input 
                  type="text" 
                  className="form-control rounded-pill pe-5" 
                  placeholder="Search news, topics..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {/* Main News Column */}
            <div className="col-lg-8">
              {filteredArticles.length > 0 ? (
                <div className="row g-4">
                  {filteredArticles.slice(0, visibleCount).map((art, idx) => (
                    <div key={art.id} className="col-md-6 news-grid-item" data-aos="fade-up" data-aos-delay={(idx + 1) * 50}>
                      <div className="news-card">
                        <div className="news-card-img-wrap">
                          <img src={art.image} alt={art.title} />
                          <span className="news-card-badge">{art.categoryLabel}</span>
                        </div>
                        <div className="news-card-body">
                          <div className="news-card-date"><i className="bi bi-calendar3"></i> {art.date}</div>
                          <h3 className="news-card-title">
                            <Link to={`/news/${art.id}`}>{art.title}</Link>
                          </h3>
                          <p className="news-card-desc">{art.desc}</p>
                          <Link to={`/news/${art.id}`} className="btn-text-arrow mt-auto">
                            Read More <i className="bi bi-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <i className="bi bi-newspaper display-4 text-muted d-block mb-3"></i>
                  <h5 className="fw-bold text-navy">No articles found matching your criteria</h5>
                  <p className="text-muted">Try using different search keywords or clearing the category filter.</p>
                </div>
              )}

              {filteredArticles.length > visibleCount && (
                <div className="text-center mt-4">
                  <button 
                    type="button" 
                    className="btn btn-licentra-outline-red" 
                    onClick={() => setVisibleCount(prev => prev + 6)}
                  >
                    <i className="bi bi-arrow-repeat me-1"></i> Load More Articles
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="col-lg-4" data-aos="fade-left">
              <div className="p-4 bg-surface rounded-4 border mb-4 shadow-sm">
                <h5 className="fw-bold text-navy mb-3"><i className="bi bi-fire text-red me-2"></i> Popular Topics</h5>
                <div>
                  <div className="popular-topic-item">
                    <div className="popular-topic-num">1</div>
                    <Link to="/services#renewal" className="fw-semibold text-dark">License Renewal Process</Link>
                  </div>
                  <div className="popular-topic-item">
                    <div className="popular-topic-num">2</div>
                    <Link to="/driving-tests" className="fw-semibold text-dark">Driving Test Requirements</Link>
                  </div>
                  <div className="popular-topic-item">
                    <div className="popular-topic-num">3</div>
                    <Link to="/news/article-1" className="fw-semibold text-dark">New Traffic Regulations</Link>
                  </div>
                  <div className="popular-topic-item">
                    <div className="popular-topic-num">4</div>
                    <Link to="/services#international" className="fw-semibold text-dark">International Driving License</Link>
                  </div>
                  <div className="popular-topic-item">
                    <div className="popular-topic-num">5</div>
                    <Link to="/contact#locations" className="fw-semibold text-dark">Test Center Locations</Link>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-navy text-white rounded-4 shadow-md position-relative overflow-hidden">
                <div className="d-flex align-items-center gap-2 mb-3 text-red">
                  <i className="bi bi-bell-fill fs-5"></i>
                  <strong className="text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>Important Notice</strong>
                </div>
                <h4 className="fw-bold text-white mb-2">New Regulations Effective from November 2024</h4>
                <p className="text-light small mb-3">
                  Updated driving test procedures and vehicle inspection requirements will take effect starting November 1, 2024.
                </p>
                <Link to="/services" className="btn btn-licentra-primary btn-sm mb-3">
                  Learn More <i className="bi bi-arrow-right"></i>
                </Link>
                <img src="/assets/images/hero/office_thumb.png" alt="Notice" className="w-100 rounded-3 mt-2 shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: UPCOMING EVENTS */}
      <section className="py-5 bg-surface">
        <div className="container py-4">
          <div className="d-flex flex-wrap align-items-end justify-content-between mb-5" data-aos="fade-up">
            <div>
              <div className="section-tag tag-start">— UPCOMING EVENTS</div>
              <h2 className="section-title mb-0">Upcoming Events &amp; Workshops</h2>
              <p className="text-muted mt-2">Don't miss our upcoming events, campaigns, and important dates.</p>
            </div>
            <Link to="/contact" className="btn btn-licentra-primary btn-sm mt-3 mt-md-0">
              View All Events <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          <div className="row g-4">
            {upcomingEvents.map((evt, idx) => (
              <div key={evt.id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={(idx + 1) * 50}>
                <div className="event-card">
                  <div className="event-date-box">
                    <div className="event-date-num">{evt.dateNum}</div>
                    <div className="event-date-month">{evt.dateMonth}</div>
                  </div>
                  <div>
                    <h5 className="fw-bold text-navy fs-6 mb-1">{evt.title}</h5>
                    <div className="small text-muted mb-1"><i className="bi bi-geo-alt-fill text-red"></i> {evt.location}</div>
                    <div className="small text-muted mb-2"><i className="bi bi-clock-fill text-red"></i> {evt.time}</div>
                    <button 
                      type="button" 
                      className="btn-text-arrow bg-transparent border-0 p-0"
                      onClick={() => handleOpenEventModal(evt)}
                    >
                      Register Now <i className="bi bi-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: NEWSLETTER SUBSCRIPTION BANNER */}
      <section className="py-5 bg-navy text-white">
        <div className="container py-3">
          <div className="row align-items-center g-4" data-aos="fade-up">
            <div className="col-lg-6">
              <div className="d-flex align-items-center gap-3">
                <div className="stat-icon" style={{ background: 'rgba(231,47,61,0.25)' }}>
                  <i className="bi bi-envelope-open-fill text-red fs-4"></i>
                </div>
                <div>
                  <h3 className="fw-bold text-white mb-1">Subscribe to Our Newsletter</h3>
                  <p className="text-light small mb-0">Get the latest news and updates from Licentra directly to your inbox.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <form className="newsletter-form d-flex gap-2" onSubmit={handleNewsletterSubmit}>
                <input type="email" className="form-control rounded-pill px-4" placeholder="Your email address" required aria-label="Email Address" />
                <button type="submit" className="btn btn-licentra-primary flex-shrink-0">
                  Subscribe <i className="bi bi-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA BANNER */}
      <section className="cta-banner-section">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <h2 className="cta-banner-title">Ready to Start Your Driving Journey?</h2>
              <p className="cta-banner-desc">
                Apply now and take the first step towards a safer and brighter future.
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

      {/* EVENT REGISTRATION MODAL */}
      {selectedEvent && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(10,25,47,0.7)', zIndex: 1055 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header bg-navy text-white px-4 py-3">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-calendar-event text-red me-2"></i> Register for Event
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedEvent(null)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="p-3 bg-surface rounded-3 border mb-3">
                  <h6 className="fw-bold text-navy mb-1">{selectedEvent.title}</h6>
                  <small className="text-muted d-block">
                    <i className="bi bi-calendar3 text-red me-1"></i> {selectedEvent.dateNum} {selectedEvent.dateMonth} &nbsp;|&nbsp; 
                    <i className="bi bi-geo-alt text-red me-1"></i> {selectedEvent.location}
                  </small>
                </div>
                <form onSubmit={handleEventSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-navy">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      required 
                      placeholder="Ahmed Mohamed" 
                      value={eventForm.name}
                      onChange={e => setEventForm({ ...eventForm, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-navy">Email Address *</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      required 
                      placeholder="citizen@example.com" 
                      value={eventForm.email}
                      onChange={e => setEventForm({ ...eventForm, email: e.target.value })}
                    />
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-8">
                      <label className="form-label small fw-semibold text-navy">Phone Number *</label>
                      <input 
                        type="tel" 
                        className="form-control" 
                        required 
                        placeholder="01012345678" 
                        value={eventForm.phone}
                        onChange={e => setEventForm({ ...eventForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="col-4">
                      <label className="form-label small fw-semibold text-navy">Seats *</label>
                      <select 
                        className="form-select" 
                        value={eventForm.seats}
                        onChange={e => setEventForm({ ...eventForm, seats: e.target.value })}
                      >
                        <option value="1">1 Seat</option>
                        <option value="2">2 Seats</option>
                      </select>
                    </div>
                  </div>
                  <div className="text-end pt-2">
                    <button type="button" className="btn btn-secondary rounded-pill me-2" onClick={() => setSelectedEvent(null)}>Cancel</button>
                    <button type="submit" className="btn btn-licentra-primary">Confirm Registration <i className="bi bi-check2"></i></button>
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

