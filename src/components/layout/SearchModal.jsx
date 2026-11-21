import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES, CLASSES, NEWS_ARTICLES } from '../../services/db';

export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Global Ctrl + K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else window.dispatchEvent(new CustomEvent('licentra:opensearch'));
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      return;
    }

    const items = [];

    // Search Services
    SERVICES.forEach((s) => {
      if (
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      ) {
        items.push({
          type: 'Service',
          title: s.title,
          subtitle: s.summary.substring(0, 80) + '...',
          link: `/service-details?id=${s.id}`,
          icon: 'bi-gear-fill',
          color: 'text-danger',
        });
      }
    });

    // Search License Classes
    CLASSES.forEach((c) => {
      if (
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      ) {
        items.push({
          type: 'License Class',
          title: `${c.code}: ${c.name}`,
          subtitle: c.description.substring(0, 80) + '...',
          link: `/license-class-details?class=${c.id}`,
          icon: 'bi-car-front-fill',
          color: 'text-primary',
        });
      }
    });

    // Search News
    NEWS_ARTICLES.forEach((n) => {
      if (
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q)
      ) {
        items.push({
          type: 'News & Media',
          title: n.title,
          subtitle: n.summary.substring(0, 80) + '...',
          link: `/news-details?id=${n.id}`,
          icon: 'bi-newspaper',
          color: 'text-success',
        });
      }
    });

    setResults(items);
  }, [query]);

  const handleSelect = (link) => {
    onClose();
    navigate(link);
  };

  if (!isOpen) return null;

  return (
    <div
      className="search-modal-backdrop active"
      style={{ display: 'flex' }}
      onClick={(e) => {
        if (e.target.classList.contains('search-modal-backdrop')) onClose();
      }}
    >
      <div className="search-modal-box">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="fw-bold text-navy mb-0">Search Licentra</h5>
          <button className="search-modal-close" onClick={onClose} aria-label="Close search">
            &times;
          </button>
        </div>
        <div className="search-modal-input-wrap mb-4">
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder="Type a service, license class, or topic..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="search-results-list" style={{ maxHeight: '360px', overflowY: 'auto' }}>
          {query.trim() === '' ? (
            <div className="text-muted small text-center py-4">
              <i className="bi bi-search fs-3 d-block mb-2 opacity-50"></i>
              Start typing to search services, vehicle classes, and traffic guidelines.
            </div>
          ) : results.length === 0 ? (
            <div className="text-muted small text-center py-4">
              <i className="bi bi-file-earmark-x fs-3 d-block mb-2 opacity-50"></i>
              No matching results found for "{query}".
            </div>
          ) : (
            results.map((res, idx) => (
              <div
                key={idx}
                className="search-result-item p-3 mb-2 rounded-3 border bg-surface"
                style={{ cursor: 'pointer', transition: 'background-color 0.15s ease' }}
                onClick={() => handleSelect(res.link)}
              >
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <span className={`badge bg-light text-navy border small`}>{res.type}</span>
                  <i className={`bi ${res.icon} ${res.color}`}></i>
                </div>
                <h6 className="fw-bold text-navy mb-1 small">{res.title}</h6>
                <p className="text-secondary mb-0 small" style={{ fontSize: '0.8rem' }}>
                  {res.subtitle}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchModal;

