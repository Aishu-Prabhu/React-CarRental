const db = require('../db');

// Get all cars
exports.getCars = (req, res) => {
  const query = 'SELECT * FROM cars';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json(results);
  });
};

// Add a new car
exports.addCar = (req, res) => {
  const { make, model, year, registration_no, availability } = req.body;

  if (!make || !model || !year || !registration_no) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const query = 'INSERT INTO cars (make, model, year, registration_no, availability) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [make, model, year, registration_no, availability ?? true], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(201).json({ message: 'Car added successfully' });
  });
};
