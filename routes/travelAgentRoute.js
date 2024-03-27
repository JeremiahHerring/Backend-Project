// Contains all travel agent routes

const express = require("express");
router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TravelAgent = require("../models/travelAgent");
const Booking = require("../models/booking");

// Middleware to verify travelAgent JWT token
const authenticateTravelAgentToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, "travel", (err, travel_agent) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.travelAgent = travel_agent;
    next();
  });
};

// Register a travel agent
router.post("/register", async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);

    // Create the TravelAgent
    const travelAgent = await TravelAgent.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
      specializations: req.body.specializations,
    });

    // Check if the provided booking ID exists
    const booking = await Booking.findById(req.body.managed_bookings);
    if (!booking) {
      throw new Error("Booking not found");
    }

    // Associate the booking with the travel agent
    booking.travel_agent = travelAgent._id;
    await booking.save();

    // Update the travel agent with the managed booking ID
    travelAgent.managed_bookings.push(booking._id);
    await travelAgent.save();

    res
      .status(200)
      .send("Travel Agent Added to the Database and Assigned to a Booking");
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// Travel Agent Login
router.post("/login", async (req, res) => {
  const travelAgent = await TravelAgent.findOne({ email: req.body.email });

  if (!travelAgent) {
    return res.json({ status: "error", error: "Invalid Login" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    travelAgent.password
  );
  // Create travel agent jwt
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: travelAgent.name,
        email: travelAgent.email,
      },
      "travel"
    );

    return res.json({ status: "Ok", travelAgent: token });
  } else {
    return res.json({ status: "error", travelAgent: false });
  }
});

// Retrieve info from one travel agent (travel agent access)
router.get("/:id", authenticateTravelAgentToken, async (req, res) => {
  try {
    const travelAgent = await TravelAgent.findById(req.params.id);
    if (!travelAgent) {
      res.status(404).send("Travel agent not found");
    }
    res.status(200).send(travelAgent);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Update travel agent information (travel agent access)
router.patch("/:id", authenticateTravelAgentToken, async (req, res) => {
  try {
    const { email, password, managed_bookings } = req.body;

    // Verify if the current travel agent is the same as the user being updated
    if (req.travelAgent.email !== email) {
      return res
        .status(403)
        .send("You are not allowed to update other travel agents");
    }

    // Hash the new password if it's being updated
    if (password) {
      req.body.password = await bcrypt.hash(password, 10);
    }

    // If managed_bookings is updated, update travel agent ID in bookings
    if (managed_bookings) {
      await Booking.updateMany(
        { _id: { $in: managed_bookings } }, // Update all bookings with matching IDs
        { $set: { travel_agent: req.params.id } } // Set travel_agent field to travel agent's ID
      );
    }

    // Update travel agent information
    const travelAgent = await TravelAgent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!travelAgent) {
      return res.status(404).send("User not found");
    }

    res.status(200).send(travelAgent);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


// Delete travel agent (travel agent access)
router.delete("/:id", authenticateTravelAgentToken, async (req, res) => {
  try {
    const travelAgent = await TravelAgent.findByIdAndDelete(req.params.id);
    if (!travelAgent) {
      res.status(404).send();
    }
    res.send(travelAgent);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
