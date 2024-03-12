const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    'booking_date' : { type : Date , default: Date.now },
    'destination' : { type : String, required: true},
    'arrival_date' : { type : Date , required: true },
    'departure_date' : { type : Date , required: true }
},{
    collection: 'bookings'
}
)

const Booking = new mongoose.model('Booking', bookingSchema)

module.exports = Booking