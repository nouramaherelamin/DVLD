import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

export function Navbar({ onOpenSearch }) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeNav = () => setNavOpen(false);

  return (
    <nav className={`navbar navbar-expand-lg licentra-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={closeNav}>
          <img
            src={theme === 'dark' ? '/assets/images/brand/logo-white.svg' : '/assets/images/brand/logo.svg'}
            alt="Licentra Logo"
            width="220"
            height="48"
            onError={(e) => {
              e.currentTarget.src = '/assets/images/brand/favicon.svg';
            }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setNavOpen(!navOpen)}
          aria-expanded={navOpen}
          aria-label="Toggle navigation"
        >
          <div className="navbar-toggler-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <div className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`} id="licentraNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end onClick={closeNav}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={closeNav}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services" onClick={closeNav}>
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/license-classes" onClick={closeNav}>
                License Classes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/driving-tests" onClick={closeNav}>
                Driving Tests
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/news" onClick={closeNav}>
                News
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" onClick={closeNav}>
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <button
              className="nav-theme-btn d-lg-none me-2"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              <i className={theme === 'dark' ? 'bi bi-sun-fill text-warning' : 'bi bi-moon-stars-fill'}></i>
            </button>
            <button
              className="nav-search-btn me-2"
              title="Search website (Ctrl + K)"
              onClick={onOpenSearch}
              aria-label="Search"
            >
              <i className="bi bi-search"></i>
            </button>
            <Link
              to="/apply"
              className="btn btn-licentra-primary"
              onClick={closeNav}
            >
              Citizen Portal <i className="bi bi-person-check-fill ms-1"></i>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

