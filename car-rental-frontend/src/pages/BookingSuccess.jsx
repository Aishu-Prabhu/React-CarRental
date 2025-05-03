import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
    backgroundSize: '200% 200%',
    animation: 'gradientShift 15s ease infinite',
    padding: '20px',
    boxSizing: 'border-box',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
    animation: 'fadeIn 1s ease-out',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '16px',
    letterSpacing: '0.5px',
    background: 'linear-gradient(to right, #4a00e0, #8e2de2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  description: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: '1.1rem',
    color: '#4a4a4a',
    marginBottom: '32px',
    lineHeight: '1.6',
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
    background: 'linear-gradient(45deg, #007bff, #00c6ff)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'transform 0.2s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0, 123, 255, 0.5)',
  },
  ripple: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.4)',
    transform: 'scale(0)',
    animation: 'ripple 0.6s linear',
    pointerEvents: 'none',
  },
};

// CSS Keyframes as a <style> tag in the component
const keyframes = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: 'translateY(20px)'; }
    to { opacity: 1; transform: 'translateY(0)'; }
  }

  @keyframes ripple {
    to { transform: scale(4); opacity: 0; }
  }

  @media (max-width: 480px) {
    .booking-card {
      padding: 20px;
      max-width: 90%;
    }
    .booking-title {
      font-size: 2rem;
    }
    .booking-description {
      font-size: 1rem;
    }
    .booking-button {
      padding: 10px 25px;
      font-size: 0.9rem;
    }
  }
`;

const BookingSuccess = () => {
  const navigate = useNavigate();

  const handleButtonClick = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    ripple.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    ripple.className = 'ripple';

    button.appendChild(ripple);
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });

    navigate('/');
  };

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        <div style={styles.card} className="booking-card">
          <h1 style={styles.title} className="booking-title">
            Booking Confirmed!
          </h1>
          <p style={styles.description} className="booking-description">
            Your booking has been successfully completed. You'll receive a confirmation soon.
          </p>
          <button
            style={styles.button}
            className="booking-button"
            onClick={handleButtonClick}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.buttonHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.button)}
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingSuccess;