const express = require('express')
router = express.Router()
const Booking = require('../models/booking')

// Create a booking
router.post('/', async (req, res) => {
    const booking = new Booking(req.body)
    try {
        await booking.save()
        res.status(201).send(booking)
    } catch (error) {
        res.status(500).send(error)
    }
})




module.exports = router