import React, {  useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #e0eafc, #cfdef3)',
    backgroundSize: '200% 200%',
    animation: 'gradientShift 15s ease infinite',
    padding: '20px',
    boxSizing: 'border-box',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
    animation: 'fadeIn 1s ease-out',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'transform 0.3s ease',
  },
  cardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
  },
  header: {
    fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: '2rem',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '24px',
    letterSpacing: '0.5px',
  },
  error: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1.1rem',
    color: '#e74c3c',
    marginBottom: '20px',
  },
  summary: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1.1rem',
    color: '#7f8c8d',
    marginBottom: '10px',
  },
  total: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1.2rem',
    fontWeight: '500',
    color: '#e74c3c',
    marginBottom: '20px',
  },
  button: {
    position: 'relative',
    display: 'inline-block',
    padding: '12px 30px',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#fff',
    background: '#1e90ff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'transform 0.2s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 15px rgba(30, 144, 255, 0.3)',
    width: '100%',
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(30, 144, 255, 0.5)',
  },
  ripple: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.4)',
    transform: 'scale(0)',
    animation: 'ripple 0.6s linear',
    pointerEvents: 'none',
  },
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  spinnerText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1.1rem',
    color: '#2c3e50',
  },
  spinner: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeftColor: '#3498db',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    animation: 'spin 1s linear infinite',
  },
};

const keyframes = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes ripple {
    to { transform: scale(4); opacity: 0; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @media (max-width: 480px) {
    .payment-card {
      padding: 20px;
      max-width: 90%;
    }
    .payment-header {
      font-size: 1.8rem;
    }
    .payment-error, .payment-summary, .payment-total {
      font-size: 0.95rem;
    }
    .payment-button {
      padding: 10px 25px;
      font-size: 0.9rem;
    }
    .payment-spinner {
      width: 25px;
      height: 25px;
    }
  }
`;

const Payment = () => {
  const navigate = useNavigate();
  //const { user } = useContext(AuthContext);
  const [processing, setProcessing] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const pendingBooking = JSON.parse(localStorage.getItem('pendingBooking'));
    if (pendingBooking) {
      const { start_date, end_date, cost_per_day } = pendingBooking;
      setStartDate(start_date);
      setEndDate(end_date);

      if (start_date && end_date) {
        const start = new Date(start_date);
        const end = new Date(end_date);
        const timeDifference = end - start;
        const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
        if (numberOfDays >= 0) {
          // Add 1 to include both start and end date
          const cost = (numberOfDays + 1) * cost_per_day;
          setTotalCost(cost);
        } else {
          setError('End date must be later than or equal to start date.');
        }
      }
    } else {
      setError('No booking details found.');
    }
  }, []);

  const handlePayment = () => {
    setProcessing(true);
    const pendingBooking = JSON.parse(localStorage.getItem('pendingBooking'));

    if (!pendingBooking || !pendingBooking.booking_id) {
      setError('Invalid booking details.');
      setProcessing(false);
      return;
    }

    try {
      // Update booking status to 'confirmed'
      pendingBooking.status = 'confirmed';

      // Save to bookings in localStorage
      const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
      bookings.push(pendingBooking);
      localStorage.setItem('bookings', JSON.stringify(bookings));

      // Clear pending booking
      localStorage.removeItem('pendingBooking');

      setTimeout(() => {
        navigate('/booking-success');
      }, 2000);
    } catch (err) {
      console.error('Payment error:', err);
      setError('Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        <div
          style={styles.card}
          className="payment-card"
          onMouseOver={e => Object.assign(e.currentTarget.style, styles.cardHover)}
          onMouseOut={e => Object.assign(e.currentTarget.style, styles.card)}
        >
          <h2 style={styles.header} className="payment-header">Payment Details</h2>
          {error ? (
            <p style={styles.error} className="payment-error">{error}</p>
          ) : processing ? (
            <div style={styles.spinnerContainer} className="payment-spinner-container">
              <p style={styles.spinnerText}>Processing Payment...</p>
              <div style={styles.spinner} className="payment-spinner"></div>
            </div>
          ) : (
            <>
              <p style={styles.summary} className="payment-summary">
                <strong>Start Date:</strong> {startDate || '-'}
              </p>
              <p style={styles.summary} className="payment-summary">
                <strong>End Date:</strong> {endDate || '-'}
              </p>
              <p style={styles.total} className="payment-total">
                <strong>Total Amount:</strong> ₹{totalCost}/-
              </p>
              <button
                style={styles.button}
                className="payment-button"
                onClick={handlePayment}
                onMouseOver={e => Object.assign(e.currentTarget.style, styles.buttonHover)}
                onMouseOut={e => Object.assign(e.currentTarget.style, styles.button)}
                onMouseDown={e => {
                  const button = e.currentTarget;
                  const ripple = document.createElement('span');
                  const diameter = Math.max(button.clientWidth, button.clientHeight);
                  const radius = diameter / 2;

                  ripple.style.width = ripple.style.height = `${diameter}px`;
                  ripple.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
                  ripple.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
                  ripple.className = 'ripple';

                  button.appendChild(ripple);
                  ripple.addEventListener('animationend', () => ripple.remove());
                }}
              >
                Pay Now
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Payment;
