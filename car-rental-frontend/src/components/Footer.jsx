import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} BookMyCAR. All rights reserved.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Link href="https://www.facebook.com" target="_blank" sx={{ mx: 2 }}>
          <IconButton color="primary">
            <FaFacebook size={30} />
          </IconButton>
        </Link>
        <Link href="https://www.instagram.com" target="_blank" sx={{ mx: 2 }}>
          <IconButton color="primary">
            <FaInstagram size={30} />
          </IconButton>
        </Link>
        <Link href="mailto:contact@bookmycar.com" target="_blank" sx={{ mx: 2 }}>
          <IconButton color="primary">
            <FaEnvelope size={30} />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
