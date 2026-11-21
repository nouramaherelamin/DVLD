import React, { useState, useEffect } from 'react';

let toastDispatch = null;

export function showToast(message, type = 'info') {
  if (toastDispatch) {
    toastDispatch({ id: Date.now(), message, type });
  } else {
    console.log(`[Toast ${type}]: ${message}`);
  }
}

if (typeof window !== 'undefined') {
  window.showToast = showToast;
}

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastDispatch = (newToast) => {
      setToasts((prev) => [...prev, newToast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 4000);
    };

    return () => {
      toastDispatch = null;
    };
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
      }}
    >
      {toasts.map((toast) => {
        let bg = 'bg-primary text-white';
        let icon = 'bi-info-circle-fill';
        if (toast.type === 'success') {
          bg = 'bg-success text-white';
          icon = 'bi-check-circle-fill';
        } else if (toast.type === 'warning') {
          bg = 'bg-warning text-dark';
          icon = 'bi-exclamation-triangle-fill';
        } else if (toast.type === 'danger' || toast.type === 'error') {
          bg = 'bg-danger text-white';
          icon = 'bi-x-circle-fill';
        }

        return (
          <div
            key={toast.id}
            className={`shadow-lg rounded-3 p-3 d-flex align-items-center justify-content-between ${bg}`}
            role="alert"
            style={{ minWidth: '280px', animation: 'fadeIn 0.25s ease' }}
          >
            <div className="d-flex align-items-center gap-2">
              <i className={`bi ${icon} fs-5`}></i>
              <span className="small fw-medium">{toast.message}</span>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white ms-2"
              onClick={() => removeToast(toast.id)}
              aria-label="Close"
              style={{ filter: toast.type === 'warning' ? 'invert(1)' : 'none' }}
            ></button>
          </div>
        );
      })}
    </div>
  );
}

export default ToastContainer;

