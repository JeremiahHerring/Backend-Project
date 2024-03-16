const express = require('express')
router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const TravelAgent = require('../models/travelAgent')
const Booking = require('../models/booking')

// Register a travel agent
router.post('/register', async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);

        // Create the TravelAgent
        const travelAgent = await TravelAgent.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
            specializations: req.body.specializations
        });

        // Check if the provided booking ID exists
        const booking = await Booking.findById(req.body.managed_bookings);
        if (!booking) {
            throw new Error('Booking not found');
        }

        // Associate the booking with the travel agent
        booking.travel_agent = travelAgent._id;
        await booking.save();

        // Update the travel agent with the managed booking ID
        travelAgent.managed_bookings.push(booking._id);
        await travelAgent.save();

        res.status(200).send("Travel Agent Added to the Database and Assigned to a Booking");
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});



module.exports = router