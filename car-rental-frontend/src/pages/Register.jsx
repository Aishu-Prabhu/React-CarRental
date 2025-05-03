import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, Alert} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../contexts/AuthContext';
import { generateUUID } from '../utils/uuid';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
  role: Yup.string().oneOf(['customer', 'admin']).required('Required'),
  driving_license: Yup.string().when('role', {
    is: 'customer',
    then: (schema) => schema.required('Required for customers'),
    otherwise: (schema) => schema,
  }),
});

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
  },
  card: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100',
    animation: 'fadeIn 1s ease-out',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  title: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '24px',
  },
  input: {
    width: '100%',
    margin: '10px 0',
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  inputFocus: {
    borderColor: '#3498db',
    boxShadow: '0 0 5px rgba(52, 152, 219, 0.5)',
  },
  select: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '20px',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  selectFocus: {
    borderColor: '#3498db',
    boxShadow: '0 0 5px rgba(52, 152, 219, 0.5)',
  },
  button: {
    width: '100',
    padding: '12px',
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
  link: {
    textAlign: 'center',
    marginTop: '16px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    color: '#3498db',
    textDecoration: 'none',
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
  @media (max-width: 480px) {
    .register-card {
      padding: 20px;
      max-width: 90%;
    }
    .register-title {
      font-size: 2rem;
    }
    .register-input, .register-select {
      padding: 10px;
      font-size: 0.9rem;
    }
    .register-button {
      padding: 10px;
      font-size: 0.9rem;
    }
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);
  const { login } = useContext(AuthContext);

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        <div style={styles.card} className="register-card">
          <Typography style={styles.title} className="register-title">Register</Typography>
          <Formik
            initialValues={{ name: '', email: '', password: '', role: 'customer', driving_license: '' }}
            validationSchema={RegisterSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              try {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                if (users.some((u) => u.email === values.email)) throw new Error('Email already registered.');

                const newUser = { id: generateUUID(), ...values };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                const token = Math.random().toString(36).substring(2);
                login(newUser, token);

                const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
                localStorage.removeItem('redirectAfterLogin');
                navigate(redirectPath, { replace: true });
              } catch (error) {
                console.error('Registration error:', error);
                const errorMessage = error.message || 'Registration failed. Please try again.';
                setErrorMsg(errorMessage);
                setErrors({ general: errorMessage });
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, errors, values, setFieldValue }) => (
              <Form>
                {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
                {errors.general && <Alert severity="error" sx={{ mb: 2 }}>{errors.general}</Alert>}
                <Field
                  as={TextField}
                  style={styles.input}
                  className="register-input"
                  label="Name"
                  name="name"
                  error={Boolean(errors.name)}
                  helperText={<ErrorMessage name="name" />}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                />
                <Field
                  as={TextField}
                  style={styles.input}
                  className="register-input"
                  label="Email"
                  name="email"
                  error={Boolean(errors.email)}
                  helperText={<ErrorMessage name="email" />}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                />
                <Field
                  as={TextField}
                  style={styles.input}
                  className="register-input"
                  label="Password"
                  name="password"
                  type="password"
                  error={Boolean(errors.password)}
                  helperText={<ErrorMessage name="password" />}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                />
                <Typography variant="subtitle2" sx={{ mt: 2, color: '#2c3e50' }}>Role</Typography>
                <select
                  name="role"
                  value={values.role}
                  onChange={(e) => setFieldValue('role', e.target.value)}
                  style={styles.select}
                  className="register-select"
                  onFocus={(e) => Object.assign(e.target.style, styles.selectFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.select)}
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
                {values.role === 'customer' && (
                  <Field
                    as={TextField}
                    style={styles.input}
                    className="register-input"
                    label="Driving License"
                    name="driving_license"
                    error={Boolean(errors.driving_license)}
                    helperText={<ErrorMessage name="driving_license" />}
                    onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                    onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  />
                )}
                <Button
                  type="submit"
                  style={styles.button}
                  className="register-button"
                  disabled={isSubmitting}
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
                  {isSubmitting ? 'Registering...' : 'Register'}
                </Button>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  Already have an account?{' '}
                  <Button
                    onClick={() => navigate('/login')}
                    sx={{ textTransform: 'none', color: '#3498db' }}
                    variant="text"
                  >
                    Login Here
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Register;