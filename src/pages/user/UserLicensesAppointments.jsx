import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LicentraDB, TEST_CENTERS } from '../../services/db';
import { showToast } from '../../components/common/Toast';

export function UserLicensesAppointments() {
  const { user } = useAuth();
  const [licenses, setLicenses] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Book test form
  const [bookTestType, setBookTestType] = useState('Practical Test (Track Maneuver)');
  const [bookCenter, setBookCenter] = useState('Cairo Main Center');
  const [bookDate, setBookDate] = useState('');
  const [bookSlot, setBookSlot] = useState('09:00 AM – 10:30 AM');

  // Modals
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrVal, setQrVal] = useState('');
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [scoreData, setScoreData] = useState(null);

  // Reschedule
  const [showReschedule, setShowReschedule] = useState(false);
  const [targetBooking, setTargetBooking] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newSlot, setNewSlot] = useState('10:30 AM – 12:00 PM');

  const loadData = () => {
    if (!user) return;
    const lics = LicentraDB.getLicenses(user.email);
    setLicenses([...lics]);
    const bks = LicentraDB.getBookings(user.email);
    setBookings([...bks]);
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    if (!bookDate) {
      showToast('Please select a valid appointment date.', 'warning');
      return;
    }

    const conflict = bookings.find((b) => b.date === bookDate && b.status !== 'Cancelled');
    if (conflict) {
      showToast('You already have an examination scheduled on this date.', 'warning');
      return;
    }

    const newBooking = LicentraDB.createBooking({
      userEmail: user.email,
      applicantName: user.fullName,
      nationalId: user.nationalId || '29504150102345',
      testType: bookTestType,
      licenseClass: 'Class 3 - Private Car',
      center: bookCenter,
      date: bookDate,
      timeSlot: bookSlot,
    });

    LicentraDB.addActivity({
      userEmail: user.email,
      title: 'Driving test booked',
      subtitle: `${bookTestType} at ${bookCenter}`,
      dateText: 'Just now',
      icon: 'bi-calendar-plus-fill',
      color: 'text-primary',
    });

    showToast(`Test Appointment #${newBooking.id} confirmed!`, 'success');
    setBookDate('');
    loadData();
  };

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      LicentraDB.cancelBooking(id);
      showToast('Booking cancelled.', 'info');
      loadData();
    }
  };

  const handleOpenReschedule = (b) => {
    setTargetBooking(b);
    setNewDate(b.date);
    setNewSlot(b.timeSlot || '10:30 AM – 12:00 PM');
    setShowReschedule(true);
  };

  const handleConfirmReschedule = (e) => {
    e.preventDefault();
    if (!targetBooking || !newDate) {
      showToast('Please select a new date.', 'warning');
      return;
    }

    LicentraDB.rescheduleBooking(targetBooking.id, newDate, newSlot);
    showToast(`Appointment #${targetBooking.id} rescheduled successfully!`, 'success');
    setShowReschedule(false);
    loadData();
  };

  return (
    <div className="container py-5">
      <div className="mb-4">
        <span className="badge bg-danger text-white rounded-pill px-3 py-1 mb-2">
          <i className="bi bi-award-fill me-1"></i> Credentials &amp; Examinations
        </span>
        <h2 className="fw-bold text-navy mb-1">My Licenses &amp; Test Appointments</h2>
        <p className="text-muted small mb-0">View your issued driving credentials, scheduled examinations, and reserve new evaluation slots.</p>
      </div>

      {/* Licenses Section */}
      <div className="mb-5">
        <h4 className="fw-bold text-navy mb-3"><i className="bi bi-card-heading text-red me-2"></i> Issued Driving Licenses</h4>
        <div className="row g-4">
          {licenses.length === 0 ? (
            <div className="col-12">
              <div className="p-4 rounded-4 border bg-surface text-center">
                <i className="bi bi-card-heading fs-1 text-muted d-block mb-2"></i>
                <h6 className="fw-bold text-navy mb-1">No Licenses Issued Yet</h6>
                <p className="small text-muted mb-0">You have not been issued an Egyptian driving license under this account.</p>
              </div>
            </div>
          ) : (
            licenses.map((lic) => (
              <div key={lic.id} className="col-lg-6">
                <div className="license-card-mockup">
                  <div className="license-card-watermark"><i className="bi bi-shield-check"></i></div>
                  <div className="license-card-header">
                    <div className="license-flag-chip">
                      <div className="license-chip-gold"></div>
                      <div>
                        <div className="license-country-title">EGYPT DRIVING LICENSE</div>
                        <div className="small text-muted" style={{ fontSize: '0.65rem' }}>TRAFFIC POLICE ACCREDITED</div>
                      </div>
                    </div>
                    <span className={`status-pill status-${lic.status === 'Active' ? 'approved' : 'rejected'}`}>
                      {lic.status}
                    </span>
                  </div>
                  <div className="license-card-body">
                    <div className="license-holder-photo">
                      <img
                        src="/assets/images/team/member_mona_ali.png"
                        alt="Holder"
                        onError={(e) => {
                          e.currentTarget.src = '/assets/images/brand/favicon.svg';
                        }}
                      />
                    </div>
                    <div className="license-details-grid">
                      <div className="license-detail-item">
                        <span className="label">Category</span>
                        <span className="val text-navy">{lic.licenseClass}</span>
                      </div>
                      <div className="license-detail-item">
                        <span className="label">License No.</span>
                        <span className="val text-red">{lic.licenseNumber}</span>
                      </div>
                      <div className="license-detail-item">
                        <span className="label">Issue Date</span>
                        <span className="val">{lic.issueDate}</span>
                      </div>
                      <div className="license-detail-item">
                        <span className="label">Expiry Date</span>
                        <span className="val">{lic.expiryDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="license-card-footer">
                    <div className="license-barcode">|||| ||||| || ||||||</div>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary py-0 px-2 rounded-pill"
                        onClick={() => {
                          setQrVal(lic.licenseNumber);
                          setShowQrModal(true);
                        }}
                      >
                        <i className="bi bi-qr-code"></i> View QR
                      </button>
                      <button
                        className="btn btn-sm btn-licentra-primary py-0 px-2 rounded-pill"
                        onClick={() => showToast(`Downloading PDF license card #${lic.licenseNumber}...`, 'success')}
                      >
                        <i className="bi bi-file-earmark-pdf"></i> PDF Card
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Appointments & Booking Section */}
      <div className="row g-4">
        {/* Appointments List */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-surface-card h-100">
            <h4 className="fw-bold text-navy mb-3"><i className="bi bi-calendar-check text-red me-2"></i> Scheduled Driving Tests</h4>
            <div className="appointments-list">
              {bookings.length === 0 ? (
                <div className="text-center py-5 text-muted small">
                  <i className="bi bi-calendar-x fs-1 d-block mb-2 opacity-50"></i>
                  You have no driving test appointments scheduled.
                </div>
              ) : (
                bookings.map((b) => (
                  <div key={b.id} className="p-3 mb-3 rounded-3 border bg-surface d-flex flex-wrap align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-3 p-2 bg-danger-subtle text-danger"
                        style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}
                      >
                        <i className={`bi ${b.testType?.includes('Practical') ? 'bi-car-front-fill' : 'bi-display'}`}></i>
                      </div>
                      <div>
                        <div className="d-flex align-items-center gap-2">
                          <h6 className="fw-bold text-navy mb-0">{b.testType}</h6>
                          <span
                            className={`badge ${
                              b.status === 'Confirmed' || b.status === 'Completed'
                                ? 'bg-success'
                                : b.status === 'Rescheduled'
                                ? 'bg-info text-dark'
                                : b.status === 'Cancelled'
                                ? 'bg-danger'
                                : 'bg-secondary'
                            }`}
                          >
                            {b.status}
                          </span>
                        </div>
                        <div className="small text-muted mt-1">
                          <i className="bi bi-geo-alt me-1"></i> {b.center} &bull; <i className="bi bi-calendar me-1"></i> {b.date} &bull; <i className="bi bi-clock me-1"></i> {b.timeSlot}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      {b.status === 'Completed' ? (
                        <button
                          className="btn btn-sm btn-outline-success rounded-pill px-3"
                          onClick={() => {
                            setScoreData(b);
                            setShowScoreModal(true);
                          }}
                        >
                          <i className="bi bi-award-fill me-1"></i> View Result
                        </button>
                      ) : b.status === 'Confirmed' || b.status === 'Scheduled' || b.status === 'Rescheduled' ? (
                        <>
                          <button
                            className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                            onClick={() => handleOpenReschedule(b)}
                          >
                            Reschedule
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger rounded-pill px-3"
                            onClick={() => handleCancel(b.id)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : null}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Booking Form */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-surface-card">
            <h4 className="fw-bold text-navy mb-3"><i className="bi bi-plus-circle text-red me-2"></i> Book Examination Slot</h4>
            <form onSubmit={handleBookSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-semibold text-navy">Examination Type</label>
                <select
                  className="form-select"
                  value={bookTestType}
                  onChange={(e) => setBookTestType(e.target.value)}
                >
                  <option value="Computerized Theory Examination">Computerized Theory Examination (Lab)</option>
                  <option value="Vision & Medical Screening">Vision &amp; Optometry Screening</option>
                  <option value="Practical Track Evaluation">Practical Track Evaluation (In-Vehicle)</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-navy">Testing Center</label>
                <select
                  className="form-select"
                  value={bookCenter}
                  onChange={(e) => setBookCenter(e.target.value)}
                >
                  {TEST_CENTERS.map((tc) => (
                    <option key={tc.id} value={tc.name}>
                      {tc.name} ({tc.city})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-navy">Preferred Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={bookDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setBookDate(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold text-navy">Time Slot</label>
                <select
                  className="form-select"
                  value={bookSlot}
                  onChange={(e) => setBookSlot(e.target.value)}
                >
                  <option value="08:30 AM – 10:00 AM">08:30 AM – 10:00 AM</option>
                  <option value="10:30 AM – 12:00 PM">10:30 AM – 12:00 PM</option>
                  <option value="12:30 PM – 02:00 PM">12:30 PM – 02:00 PM</option>
                  <option value="02:30 PM – 04:00 PM">02:30 PM – 04:00 PM</option>
                </select>
              </div>

              <button type="submit" className="btn btn-licentra-primary w-100 py-2">
                Confirm Examination Slot <i className="bi bi-calendar2-check ms-1"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      {showReschedule && targetBooking && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          role="dialog"
          onClick={(e) => {
            if (e.target.classList.contains('modal')) setShowReschedule(false);
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header bg-navy text-white px-4 py-3">
                <h5 className="modal-title fw-bold">Reschedule Examination</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowReschedule(false)}></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleConfirmReschedule}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-navy">Test Information</label>
                    <input type="text" className="form-control" value={`${targetBooking.testType} - ${targetBooking.center}`} readOnly />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-navy">New Date</label>
                    <input type="date" className="form-control" value={newDate} onChange={(e) => setNewDate(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-navy">New Time Slot</label>
                    <select className="form-select" value={newSlot} onChange={(e) => setNewSlot(e.target.value)}>
                      <option value="08:30 AM – 10:00 AM">08:30 AM – 10:00 AM</option>
                      <option value="10:30 AM – 12:00 PM">10:30 AM – 12:00 PM</option>
                      <option value="12:30 PM – 02:00 PM">12:30 PM – 02:00 PM</option>
                    </select>
                  </div>
                  <div className="text-end">
                    <button type="button" className="btn btn-secondary rounded-pill me-2" onClick={() => setShowReschedule(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-licentra-primary">
                      Confirm New Slot
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Modal */}
      {showQrModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          role="dialog"
          onClick={(e) => {
            if (e.target.classList.contains('modal')) setShowQrModal(false);
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden text-center p-4">
              <h5 className="fw-bold text-navy mb-2">License Verification QR</h5>
              <div className="p-4 bg-light rounded-4 d-inline-block mx-auto mb-3 border">
                <i className="bi bi-qr-code text-navy" style={{ fontSize: '7rem' }}></i>
              </div>
              <div className="small fw-bold text-red mb-4">Pass: {qrVal}</div>
              <button className="btn btn-secondary rounded-pill px-4" onClick={() => setShowQrModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Score Result Modal */}
      {showScoreModal && scoreData && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          role="dialog"
          onClick={(e) => {
            if (e.target.classList.contains('modal')) setShowScoreModal(false);
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden p-4 text-center">
              <div className="display-4 text-success mb-2"><i className="bi bi-patch-check-fill"></i></div>
              <h4 className="fw-bold text-navy mb-1">Official Test Clearance</h4>
              <p className="text-muted small mb-4">{scoreData.testType} &bull; {scoreData.center}</p>
              <div className="p-3 bg-surface rounded-3 border mb-4">
                <div className="fs-3 fw-bold text-success mb-1">PASSED</div>
                <div className="small text-muted">Evaluation Score: <strong>38/40 (95%)</strong></div>
              </div>
              <button className="btn btn-secondary rounded-pill px-4" onClick={() => setShowScoreModal(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserLicensesAppointments;

