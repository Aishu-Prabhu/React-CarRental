import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { generateUUID } from '../utils/uuid';

const cars = [
  {
    id: 1,
    name: 'Tata Nexon EV',
    year: 2023,
    price: 3000,
    description: 'Electric SUV',
    image: 'https://english.cdn.zeenews.com/sites/default/files/2023/09/07/1277268-tata-nexon.ev.jpg',
  },
  {
    id: 2,
    name: 'Mahindra Thar',
    year: 2023,
    price: 4500,
    description: '4x4 Offroader',
    image: 'https://tse1.mm.bing.net/th?id=OIP.2jZuvOLpQoJsFL-XC4By0QHaEK&pid=Api&P=0&h=180',
  },
  {
    id: 3,
    name: 'Hyundai Creta',
    year: 2022,
    price: 2800,
    description: 'Popular family SUV',
    image: 'https://tse2.mm.bing.net/th?id=OIP.0saf42GMfatFSk0MYWenxQHaEK&pid=Api&P=0&h=180',
  },
  {
    id: 4,
    name: 'Maruti Suzuki Swift',
    year: 2021,
    price: 1500,
    description: 'fun-to-drive hatchback for city rides',
    image: 'https://tse2.mm.bing.net/th?id=OIP.CmjMBxKM8vAxZ62scALlVAHaEo&pid=Api&P=0&h=180',
  },
  {
    id: 5,
    name: 'Kia Seltos',
    year: 2023,
    price: 3200,
    description: 'stylish SUV with excellent ride quality',
    image: 'https://wallpaperaccess.com/full/5483457.jpg',
  },
];

// Define styles with advanced CSS
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
    maxWidth: '400px',
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
  imageWrapper: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '15px',
    marginBottom: '20px',
    height: '200px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  imageHover: {
    transform: 'scale(1.1)',
  },
  carName: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#34495e',
    marginBottom: '8px',
  },
  description: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    color: '#7f8c8d',
    marginBottom: '16px',
  },
  price: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1.2rem',
    fontWeight: '500',
    color: '#e74c3c',
    marginBottom: '20px',
  },
  label: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    color: '#2c3e50',
    textAlign: 'left',
    marginBottom: '8px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  inputFocus: {
    borderColor: '#3498db',
    boxShadow: '0 0 5px rgba(52, 152, 219, 0.5)',
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
    background: 'linear-gradient(45deg, #2ecc71, #27ae60)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'transform 0.2s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 15px rgba(46, 204, 113, 0.3)',
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
  error: {
    color: '#e74c3c',
    marginBottom: '12px',
    textAlign: 'center',
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
    .booking-header {
      font-size: 1.8rem;
    }
    .car-name {
      font-size: 1.3rem;
    }
    .car-description, .car-price, .booking-label {
      font-size: 0.95rem;
    }
    .booking-input {
      padding: 10px;
      font-size: 0.9rem;
    }
    .booking-button {
      padding: 10px 25px;
      font-size: 0.9rem;
    }
  }
`;

export default function Booking() {
  const { id } = useParams();
  const car = cars.find((c) => c.id === parseInt(id));
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  if (!car) return <div>Car not found</div>;

  const handleBooking = () => {
    if (!user) {
      localStorage.setItem('redirectAfterLogin', `/booking/${id}`);
      navigate('/login');
      return;
    }
    if (!startDate || !endDate) {
      setError('Please select both start and end dates.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (startDate < today) {
      setError('Start date cannot be in the past.');
      return;
    }
    if (endDate < startDate) {
      setError('End date must be after start date.');
      return;
    }

    try {
      const bookingDetails = {
        booking_id: generateUUID(),
        car_name: car.name,
        cost_per_day: car.price,
        start_date: startDate,
        end_date: endDate,
        user_id: user.id,
        status: 'pending', 
        booking_date: new Date().toISOString(),
      };

     
      localStorage.setItem('pendingBooking', JSON.stringify(bookingDetails));

    
      navigate('/payment');
    } catch (err) {
      console.error('Booking error:', err);
      setError('Booking failed. Please try again.');
    }
  };

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        <div
          style={styles.card}
          className="booking-card"
          onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
          onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.card)}
        >
          <h2 style={styles.header} className="booking-header">Book Your Car</h2>
          <div style={styles.imageWrapper} className="booking-image-wrapper">
            <img
              src={car.image}
              alt={car.name}
              style={styles.image}
              onMouseOver={(e) => (e.currentTarget.style.transform = styles.imageHover.transform)}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </div>
          <h3 style={styles.carName}>{car.name}</h3>
          <p style={styles.description}>{car.description}</p>
          <p style={styles.price}>Price per day: ₹{car.price}</p>
          {error && <p style={styles.error}>{error}</p>}
          <label style={styles.label} className="booking-label">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={styles.input}
            className="booking-input"
            onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
            onBlur={(e) => Object.assign(e.target.style, styles.input)}
            min={new Date().toISOString().split('T')[0]}
          />
          <label style={styles.label} className="booking-label">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={styles.input}
            className="booking-input"
            onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
            onBlur={(e) => Object.assign(e.target.style, styles.input)}
            min={startDate}
          />
          <button
            style={styles.button}
            className="booking-button"
            onClick={handleBooking}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.buttonHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.button)}
            onMouseDown={(e) => {
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
            Confirm Booking
          </button>
        </div>
      </div>
    </>
  );
}