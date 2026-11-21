import React, { useState } from 'react';

export function ChatWidgetModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Welcome to Licentra Driving & Vehicle License Department! I am your AI traffic assistant. How can I assist you today?',
    },
  ]);
  const [input, setInput] = useState('');

  const botReplies = {
    'book test':
      'To book a driving examination, navigate to the Driving Tests page and click "Book an Appointment", or visit the Citizen Portal.',
    'renewal fees':
      'Statutory private license renewal fee is EGP 650, which includes smart card production and violation clearance verification.',
    'first license docs':
      'Prerequisite documents for a First License: Valid National ID, 4 personal photos (4x6), Medical Certificate Form 287-B, and certified educational certificate.',
    'center hours':
      'Licentra testing and service centers operate Saturday through Thursday from 08:00 AM to 04:00 PM.',
    default:
      'Thank you for your inquiry. For specific procedural requests or legal questions, please visit our Help Desk or contact our support team at +20 123 456 7890.',
  };

  const handleSend = (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = botReplies.default;
      if (lower.includes('book') || lower.includes('test')) {
        reply = botReplies['book test'];
      } else if (lower.includes('renew') || lower.includes('fee')) {
        reply = botReplies['renewal fees'];
      } else if (lower.includes('first') || lower.includes('doc')) {
        reply = botReplies['first license docs'];
      } else if (lower.includes('hour') || lower.includes('center') || lower.includes('open')) {
        reply = botReplies['center hours'];
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
      tabIndex="-1"
      role="dialog"
      onClick={(e) => {
        if (e.target.classList.contains('modal')) onClose();
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4 shadow-xl overflow-hidden">
          <div className="modal-header bg-navy text-white px-4 py-3">
            <div className="d-flex align-items-center gap-2">
              <span className="user-avatar-circle" style={{ background: '#10B981' }}>
                <i className="bi bi-robot"></i>
              </span>
              <div>
                <h6 className="modal-title fw-bold mb-0">Licentra Virtual Assistant</h6>
                <small className="text-success">
                  <i className="bi bi-circle-fill" style={{ fontSize: '0.5rem' }}></i> Online 24/7
                </small>
              </div>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-0">
            <div className="chat-widget-box">
              <div
                className="chat-messages-container"
                style={{ maxHeight: '320px', overflowY: 'auto', padding: '1.25rem' }}
              >
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`chat-bubble ${m.sender === 'user' ? 'user' : 'bot'}`}
                    style={{
                      margin: '8px 0',
                      maxWidth: '85%',
                      alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                      backgroundColor: m.sender === 'user' ? 'var(--licentra-red)' : 'var(--licentra-surface)',
                      color: m.sender === 'user' ? '#fff' : 'var(--licentra-navy)',
                      padding: '10px 14px',
                      borderRadius: '14px',
                    }}
                  >
                    {m.text}
                  </div>
                ))}
              </div>
              <div
                className="chat-quick-replies d-flex flex-wrap gap-1 px-3 py-2 border-top"
                style={{ background: 'var(--licentra-surface)' }}
              >
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary rounded-pill py-0 px-2"
                  onClick={() => handleSend('How do I book a driving test?')}
                >
                  Book Test
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary rounded-pill py-0 px-2"
                  onClick={() => handleSend('What are the license renewal fees?')}
                >
                  Renewal Fees
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary rounded-pill py-0 px-2"
                  onClick={() => handleSend('What documents are needed for First License?')}
                >
                  First License Docs
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary rounded-pill py-0 px-2"
                  onClick={() => handleSend('What are test center opening hours?')}
                >
                  Center Hours
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="d-flex p-3 border-top bg-surface-card"
              >
                <input
                  type="text"
                  className="form-control rounded-pill me-2"
                  placeholder="Type your inquiry here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="btn btn-licentra-primary rounded-circle"
                  style={{ width: '42px', height: '42px', padding: 0, flexShrink: 0 }}
                  aria-label="Send message"
                >
                  <i className="bi bi-send-fill"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWidgetModal;

