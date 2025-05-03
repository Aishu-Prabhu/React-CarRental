// src/components/CarCard.jsx
import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';

const CarCard = ({ car, onViewDetails }) => {
  // car: { id, name, image, year, description }

  return (
    <Card sx={{ maxWidth: 345, m: 1 }}>
      {car.image && (
        <CardMedia
          component="img"
          height="140"
          image={car.image}
          alt={car.name}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {car.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Year: {car.year}
        </Typography>
        {car.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {car.description}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onViewDetails(car.id)}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default CarCard;
