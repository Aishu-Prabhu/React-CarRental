import React, { useContext } from 'react';
import { Container, Typography, Avatar, Paper } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">You need to log in to view your profile.</Typography>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 4,
        padding: '20px',
        background: 'linear-gradient(135deg, #e0eafc, #cfdef3)',
        backgroundSize: '200% 200%',
        animation: '$gradientShift 15s ease infinite',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
          animation: '$fadeIn 1s ease-out',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <Avatar
          alt={user.name || 'User'}
          src={user.profilePicture || ''}
          sx={{
            width: 100,
            height: 100,
            border: '3px solid transparent',
            backgroundImage: 'linear-gradient(white, white), linear-gradient(45deg, #3498db, #2ecc71)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'content-box, border-box',
            '&:hover': {
              transform: 'scale(1.1)',
              transition: 'transform 0.3s ease',
            },
          }}
        />
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#2c3e50',
            marginBottom: '5px',
            '&:hover': {
              color: '#3498db',
              transition: 'color 0.3s ease',
            },
          }}
        >
          {user.name || 'User'}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontSize: '1rem',
            color: '#7f8c8d',
            '&:hover': {
              color: '#2980b9',
              transition: 'color 0.3s ease',
            },
          }}
        >
          {user.email}
        </Typography>
      </Paper>
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (max-width: 480px) {
            .MuiPaper-root {
              padding: 15px;
              max-width: 90%;
            }
            .MuiAvatar-root {
              width: 80px;
              height: 80px;
            }
            .MuiTypography-h4 {
              font-size: 1.3rem;
            }
            .MuiTypography-body1 {
              font-size: 0.9rem;
            }
          }
        `}
      </style>
    </Container>
  );
};

export default Profile;