const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    'name' : { type : String, required: true},
    'email' : { type : String, required: true},
    'password' : { type : String , required: true },
    booking_destinations: { type: String }
},{
    collection: 'users'
}
)

const User = new mongoose.model('user', userSchema)

module.exports = User