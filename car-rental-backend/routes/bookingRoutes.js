// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // This is the promise pool

router.post('/', async (req, res) => {
  const { car_name, cost_per_day, start_date, end_date, user_id } = req.body;
  const booking_date = new Date();

  try {
    const [result] = await db.query(
      'INSERT INTO bookings (car_name, cost_per_day, start_date, end_date, booking_date) VALUES (?, ?, ?, ?, ?)',
      [car_name, cost_per_day, start_date, end_date, booking_date, user_id]
    );

    if (result.affectedRows === 1) {
      res.status(201).json({ message: 'Booking saved successfully' });
    } else {
      res.status(500).json({ message: 'Failed to save booking' });
    }
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
