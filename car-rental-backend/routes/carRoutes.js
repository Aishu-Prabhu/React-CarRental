const express = require('express');
const router = express.Router();
const { getCars, addCar } = require('../controllers/carController');

// Get all cars
router.get('/', getCars);

// Add a new car (for admin)
router.post('/', addCar);

module.exports = router;
