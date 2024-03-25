// Schema for user

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    booking_destinations: [String],
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  },
  {
    collection: "users",
  }
);

const User = new mongoose.model("User", userSchema);

module.exports = User;
