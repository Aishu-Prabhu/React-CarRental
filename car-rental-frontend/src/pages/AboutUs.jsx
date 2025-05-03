import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    minHeight: '100vh',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, #e0eafc, #cfdef3)',
    backgroundSize: '200% 200%',
    animation: 'gradientShift 15s ease infinite',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    width: '100%',
    animation: 'fadeIn 1s ease-out',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  title: {
    fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#3498db',
    textAlign: 'center',
    marginBottom: '40px',
    background: 'linear-gradient(to right, #3498db, #2980b9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  section: {
    marginBottom: '30px',
    padding: '20px',
    borderBottom: '1px solid #ecf0f1',
  },
  sectionTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1.8rem',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '15px',
  },
  content: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: '1.1rem',
    color: '#7f8c8d',
    lineHeight: '1.6',
    textAlign: 'left',
  },
  contactItem: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    color: '#7f8c8d',
    margin: '10px 0',
  },
  button: {
    display: 'inline-block',
    padding: '12px 30px',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#fff',
    background: 'linear-gradient(45deg, #2ecc71, #27ae60)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 15px rgba(46, 204, 113, 0.3)',
    marginTop: '20px',
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(46, 204, 113, 0.5)',
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
  @media (max-width: 768px) {
    .about-card {
      padding: 20px;
      max-width: 90%;
    }
    .about-title {
      font-size: 2rem;
    }
    .about-section-title {
      font-size: 1.5rem;
    }
    .about-content, .about-contact-item {
      font-size: 1rem;
    }
  }
  @media (max-width: 480px) {
    .about-card {
      padding: 15px;
    }
    .about-title {
      font-size: 1.8rem;
    }
    .about-section-title {
      font-size: 1.3rem;
    }
    .about-content, .about-contact-item {
      font-size: 0.95rem;
    }
    .about-button {
      padding: 10px 25px;
      font-size: 0.9rem;
    }
  }
`;

const AboutUs = () => {
  const navigate = useNavigate();

  const handleBackClick = (e) => {
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

    navigate('/');
  };

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        <div style={styles.card} className="about-card">
          <h1 style={styles.title} className="about-title">About BookMyCAR</h1>
          <div style={styles.section} className="about-section">
            <p style={styles.content} className="about-content">
              BookMyCAR is your trusted platform for car rentals and leasing solutions. Whether you're traveling, moving, or just exploring — we make vehicle access easy and affordable.
            </p>
          </div>
          <div style={styles.section} className="about-section">
            <h2 style={styles.sectionTitle} className="about-section-title">Our Mission</h2>
            <p style={styles.content} className="about-content">
              To revolutionize the way people move by providing fast, reliable, and budget-friendly car rental solutions across cities.
            </p>
          </div>
          <div style={styles.section} className="about-section">
            <h2 style={styles.sectionTitle} className="about-section-title">Contact Us</h2>
            <p style={styles.contactItem} className="about-contact-item">Email: support@bookmycar.com</p>
            <p style={styles.contactItem} className="about-contact-item">Phone: +1 800 123 4567</p>
            <p style={styles.contactItem} className="about-contact-item">Address: 123 Car St, Yelahanka, Bengaluru, India</p>
          </div>
          <button
            style={styles.button}
            className="about-button"
            onClick={handleBackClick}
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

export default AboutUs;