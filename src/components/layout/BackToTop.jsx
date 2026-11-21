import React, { useState, useEffect } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`back-to-top ${visible ? 'active' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to Top"
      style={{ display: visible ? 'flex' : 'none' }}
    >
      <i className="bi bi-arrow-up"></i>
    </button>
  );
}

export default BackToTop;

