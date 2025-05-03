const db = require('../db');

// Create booking
exports.createBooking = (req, res) => {
  const { user_id, car_id, from_date, to_date } = req.body;

  if (!user_id || !car_id || !from_date || !to_date) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Check if car is available for the given dates (simplified)
  const checkAvailabilityQuery = `
    SELECT * FROM bookings 
    WHERE car_id = ? AND status = 'booked' 
    AND (from_date <= ? AND to_date >= ?)
  `;

  db.query(checkAvailabilityQuery, [car_id, to_date, from_date], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length > 0) {
      return res.status(400).json({ message: 'Car is already booked for the selected dates' });
    }

    // Insert booking
    const insertBookingQuery = `
      INSERT INTO bookings (user_id, car_id, from_date, to_date, status) 
      VALUES (?, ?, ?, ?, 'booked')
    `;

    db.query(insertBookingQuery, [user_id, car_id, from_date, to_date], (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      res.status(201).json({ message: 'Booking created successfully' });
    });
  });
};

// Get bookings for a user
exports.getUserBookings = (req, res) => {
  const userId = req.query.user_id;

  if (!userId) return res.status(400).json({ message: 'Please provide user_id as query parameter' });

  const query = `
    SELECT b.*, c.make, c.model, c.registration_no 
    FROM bookings b 
    JOIN cars c ON b.car_id = c.id 
    WHERE b.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json(results);
  });
};
