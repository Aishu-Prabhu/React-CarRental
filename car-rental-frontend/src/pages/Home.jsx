import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const cars = [
  { id: 1, name: 'Tata Nexon EV', year: 2023, price: 3000, description: 'Electric SUV', image: 'https://english.cdn.zeenews.com/sites/default/files/2023/09/07/1277268-tata-nexon.ev.jpg' },
  { id: 2, name: 'Mahindra Thar', year: 2023, price: 4500, description: '4x4 Offroader', image: 'https://tse1.mm.bing.net/th?id=OIP.2jZuvOLpQoJsFL-XC4By0QHaEK&pid=Api&P=0&h=180' },
  { id: 3, name: 'Hyundai Creta', year: 2022, price: 2800, description: 'Popular family SUV', image: 'https://tse2.mm.bing.net/th?id=OIP.0saf42GMfatFSk0MYWenxQHaEK&pid=Api&P=0&h=180' },
  { id: 4, name: 'Maruti Suzuki Swift', year: 2021, price: 1500, description: 'fun-to-drive hatchback for city rides', image: 'https://tse2.mm.bing.net/th?id=OIP.CmjMBxKM8vAxZ62scALlVAHaEo&pid=Api&P=0&h=180' },
  { id: 5, name: 'Kia Seltos', year: 2023, price: 3200, description: 'stylish SUV with excellent ride quality', image: 'https://wallpaperaccess.com/full/5483457.jpg' },
];


const styles = {
  container: {
    minHeight: '100vh',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
  },
  title: {
    fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: '40px',
    background: 'linear-gradient(to right, #2c3e50, #3498db)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    background: '#fff',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    animation: 'fadeIn 0.8s ease-out',
    position: 'relative',
  },
  cardHover: {
    transform: 'translateY(-10px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
  },
  imageWrapper: {
    position: 'relative',
    overflow: 'hidden',
    height: '180px',
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
  content: {
    padding: '20px',
  },
  carName: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '8px',
  },
  description: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    color: '#666',
    marginBottom: '12px',
  },
  price: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1.1rem',
    fontWeight: '500',
    color: '#e74c3c',
    marginBottom: '16px',
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
    marginBottom: '20px',
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(46, 204, 113, 0.5)',
  },
};


const keyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: 'translateY(20px)'; }
    to { opacity: 1; transform: 'translateY(0)'; }
  }

  @media (max-width: 768px) {
    .home-title {
      font-size: 2rem;
    }
    .car-grid {
      grid-template-columns: 'repeat(auto-fill, minmax(250px, 1fr))';
      gap: 20px;
    }
    .car-card {
      margin: 0 10px;
    }
    .car-name {
      font-size: 1.3rem;
    }
    .car-description, .car-price {
      font-size: 0.95rem;
    }
    .car-button {
      padding: 10px 25px;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .home-title {
      font-size: 1.8rem;
    }
    .car-grid {
      grid-template-columns: '1fr';
      gap: 15px;
    }
    .car-image-wrapper {
      height: 160px;
    }
  }
`;


const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookNow = (carId) => {
    if (isAuthenticated) {
      navigate(`/booking/${carId}`);
    } else {
      localStorage.setItem('redirectAfterLogin', `/booking/${carId}`);
      navigate('/login');
    }
  };

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        {/* Search Bar */}
        <div style={{
          position: 'relative',
          maxWidth: 400,
          margin: '0 auto 30px auto',
        }}>
          <input
            type="text"
            placeholder="Search car..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 40px 12px 16px',
              fontSize: 16,
              borderRadius: 25,
              border: '1px solid #ccc',
              outline: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              fontFamily: "'Poppins', sans-serif",
            }}
            aria-label="Search cars"
          />
          <span style={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 20,
            color: '#888',
            pointerEvents: 'none',
          }}>🔍</span>
        </div>

        <h1 style={styles.title} className="home-title">Available Cars</h1>
        {filteredCars.length > 0 ? (
          <div style={styles.grid} className="car-grid">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                style={styles.card}
                className="car-card"
                onMouseOver={(e) => {
                  Object.assign(e.currentTarget.style, styles.cardHover);
                  e.currentTarget.querySelector('.car-image').style.transform = styles.imageHover.transform;
                }}
                onMouseOut={(e) => {
                  Object.assign(e.currentTarget.style, styles.card);
                  e.currentTarget.querySelector('.car-image').style.transform = 'scale(1)';
                }}
              >
                <div style={styles.imageWrapper} className="car-image-wrapper">
                  <img
                    src={car.image}
                    alt={car.name}
                    style={styles.image}
                    className="car-image"
                  />
                </div>
                <div style={styles.content}>
                  <h3 style={styles.carName} className="car-name">{car.name}</h3>
                  <p style={styles.description} className="car-description">{car.description}</p>
                  <p style={styles.price} className="car-price">Price: ₹{car.price}/day</p>
                  <button
                    style={styles.button}
                    className="car-button"
                    onClick={() => handleBookNow(car.id)}
                    onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.buttonHover)}
                    onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.button)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{
            textAlign: 'center',
            fontSize: 18,
            color: '#999',
            marginTop: 40,
          }}>
            No results found.
          </p>
        )}
      </div>
    </>
  );
};

export default Home;
