const express = require('express')
router = express.Router()
const Booking = require('../models/booking')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, 'secret123', (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
}

// Create a booking (protected route)
router.post('/', authenticateToken, async (req, res) => {
    const bookingData = req.body;
    bookingData.user = req.user.email; // Associate booking with user's email
    
    try {
        const booking = new Booking(bookingData);
        await booking.save();

    // Update user with the booking destination
    await User.findOneAndUpdate(
        { email: req.user.email }, // Find user by email
        { $set: { booking_destinations: booking.destination } }, // Update destination field
        { new: true } // Return the updated document
    );
        res.status(201).send(booking);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router