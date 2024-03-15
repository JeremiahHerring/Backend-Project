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

        // Update user with the booking destination and push booking ID into bookings array
        await User.findOneAndUpdate(
            { email: req.user.email }, // Find user by email
            { 
                $set: { booking_destinations: booking.destination },
                $push: { bookings: booking._id }
            },
            { new: true } // Return the updated document
        );

        res.status(201).send(booking);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        // Find and delete the booking
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).send(); // Send 404 if booking not found
        }

        // Remove booking reference from the user's bookings array
        await User.findOneAndUpdate(
            { email: req.user.email },
            {   
                $pull: { bookings: booking._id },
                $unset: { booking_destinations: "" } 
            }
        );

        res.status(200).send(booking); // Send 200 with deleted booking
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send("Internal Server Error"); // Send a generic error response
    }
});

// Retrieve All Bookings (Only admin should be able to do this)
router.get('/', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, 'admin');
        if (!decoded) {
            return res.status(403).json({ status: 'error', error: 'User does not have access' });
        }

        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
});

module.exports = router