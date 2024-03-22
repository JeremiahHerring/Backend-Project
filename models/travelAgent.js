// Schema for travel agent

const mongoose = require("mongoose");

const travelAgentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specializations: [String],
    managed_bookings: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  },
  {
    collection: "travel_agents",
  }
);

const TravelAgent = mongoose.model("TravelAgent", travelAgentSchema);

module.exports = TravelAgent;
