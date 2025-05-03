import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Left: Logo and App Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.ygZSGm6m9cKRmCkoMHGdKgHaHa&pid=Api&P=0&h=180"
              alt="Logo"
              style={{ width: 40, height: 40, borderRadius: '50%' }}
            />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                color: 'white',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '2rem',
                letterSpacing: 1,
              }}
            >
              BookMyCAR
            </Typography>
          </Box>

          {/* Center: Navigation Links */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Button
              component={Link}
              to="/"
              sx={{
                color: 'white',
                fontWeight: 700,
                fontSize: '1.1rem',
                textTransform: 'none',
                textDecoration: 'none',
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/about"
              sx={{
                color: 'white',
                fontWeight: 700,
                fontSize: '1.1rem',
                textTransform: 'none',
                textDecoration: 'none',
              }}
            >
              About Us
            </Button>
            {user && (
              <Button
                component={Link}
                to="/booking-history"   // <-- This matches your App.js route!
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  textDecoration: 'none',
                }}
              >
                My Bookings
              </Button>
            )}
          </Box>

          {/* Right: User Info and Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user ? (
              <>
                <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
                  Welcome, {user.name || user.email}
                </Typography>
                <Tooltip title="Profile">
                  <IconButton component={Link} to="/profile" sx={{ p: 0 }}>
                    <Avatar
                      alt={user.name || 'User'}
                      src={user.profilePicture || ''}
                      sx={{ bgcolor: '#bdbdbd' }}
                    />
                  </IconButton>
                </Tooltip>
                <Button
                  onClick={handleLogout}
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    textDecoration: 'none',
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    textDecoration: 'none',
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    textDecoration: 'none',
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
