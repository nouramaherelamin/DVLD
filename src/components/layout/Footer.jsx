import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { LicentraDB } from '../../services/db';
import { showToast } from '../common/Toast';

export function Footer() {
  const { theme } = useTheme();
  const { user, isAdmin } = useAuth();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'warning');
      return;
    }

    LicentraDB.subscribeNewsletter(newsletterEmail);
    setSubscribed(true);
    setNewsletterEmail('');
    showToast('Thank you for subscribing to official Licentra updates!', 'success');
  };

  const handleCitizenPortalClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/user/overview');
    } else {
      navigate('/login?redirect=/user/overview');
    }
  };

  const handleAdminPortalClick = (e) => {
    e.preventDefault();
    if (user && isAdmin) {
      navigate('/admin/overview');
    } else {
      navigate('/login?portal=admin&redirect=/admin/overview');
    }
  };

  return (
    <footer className="licentra-footer">
      <div className="container">
        <div className="row g-4 justify-content-between">
          {/* Column 1: Brand & About */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand mb-3">
              <img
                src={theme === 'dark' ? '/assets/images/brand/logo-white.svg' : '/assets/images/brand/logo.svg'}
                alt="Licentra Logo"
                width="220"
                height="48"
                onError={(e) => {
                  e.currentTarget.src = '/assets/images/brand/favicon.svg';
                }}
              />
            </div>
            <p className="footer-desc text-secondary mb-4">
              Driving &amp; Vehicle License Department (DVLD). Providing digital, secure, and modern
              government licensing services, computerized examination centers, and road safety regulation
              across Egypt.
            </p>
            <div className="footer-social d-flex gap-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="footer-title fw-bold text-white mb-3">Quick Links</h6>
            <ul className="footer-links list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Licensing Services</Link></li>
              <li><Link to="/license-classes">License Categories</Link></li>
              <li><Link to="/driving-tests">Driving Tests &amp; Bookings</Link></li>
              <li><Link to="/news">News &amp; Advisories</Link></li>
              <li><Link to="/contact">Contact &amp; Locations</Link></li>
            </ul>
          </div>

          {/* Column 3: Core Services */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="footer-title fw-bold text-white mb-3">Core Services</h6>
            <ul className="footer-links list-unstyled">
              <li><Link to="/service-details?id=first-license">First Driving License</Link></li>
              <li><Link to="/service-details?id=renewal">License Renewal</Link></li>
              <li><Link to="/service-details?id=replacement">Lost/Damaged Card</Link></li>
              <li><Link to="/service-details?id=detailed-license">Release Detained License</Link></li>
              <li><Link to="/service-details?id=international">International Permit</Link></li>
              <li><Link to="/service-details?id=upgrade">License Class Upgrade</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Portals */}
          <div className="col-lg-4 col-md-6">
            <h6 className="footer-title fw-bold text-white mb-3">Official Newsletter</h6>
            <p className="small text-secondary mb-3">
              Subscribe to receive the latest traffic regulations, test center updates, and road safety news.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="footer-newsletter mb-4">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={subscribed}
                  required
                />
                <button className="btn btn-licentra-primary px-3" type="submit" disabled={subscribed}>
                  {subscribed ? <i className="bi bi-check-lg"></i> : <i className="bi bi-send-fill"></i>}
                </button>
              </div>
            </form>

            <h6 className="footer-title fw-bold text-white mb-2 small text-uppercase">Portal Gateways</h6>
            <div className="d-flex flex-wrap gap-2">
              <a
                href="#citizen-portal"
                onClick={handleCitizenPortalClick}
                className="btn btn-sm btn-outline-light rounded-pill px-3"
              >
                <i className="bi bi-person-circle me-1"></i> Citizen Portal
              </a>
              <a
                href="#admin-portal"
                onClick={handleAdminPortalClick}
                className="btn btn-sm btn-outline-danger rounded-pill px-3"
              >
                <i className="bi bi-shield-lock-fill me-1"></i> Admin Portal
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom border-top mt-5 pt-4 d-flex flex-wrap justify-content-between align-items-center text-muted small">
          <div>
            &copy; {new Date().getFullYear()} Licentra &ndash; Driving &amp; Vehicle License Department (DVLD). All rights reserved.
          </div>
          <div className="d-flex gap-3 mt-2 mt-sm-0">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); showToast('Privacy Policy: Licentra protects citizen personal data in full compliance with Egyptian Data Protection Law.', 'info'); }}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); showToast('Terms of Service: By using Licentra services, you agree to official DVLD portal regulations.', 'info'); }}>Terms of Service</a>
            <span>ISO 27001 Security Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

