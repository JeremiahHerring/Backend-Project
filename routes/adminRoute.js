const express = require("express");
router = express.Router();
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Middleware to verify an admin
const authenticateAdminToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, "admin", (err, admin) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.admin = admin;
    next();
  });
};

// Register an admin
router.post("/register", async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await Admin.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });

    res.status(200).send("Admin Added to the Database");
  } catch (err) {
    res.json({ staus: "error", error: "Duplicate email" });
  }
});

// Admin Login
router.post("/login", async (req, res) => {
  const admin = await Admin.findOne({
    email: req.body.email,
  });

  if (!admin) {
    return res.json({ status: "error", error: "Invalid Login" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    admin.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: admin.name,
        email: admin.email,
      },
      "admin"
    );
    // Return Admin JWT if successful
    return res.json({ status: "Ok", admin: token });
  } else {
    return res.json({ status: "error", admin: false });
  }
});

// Retrieve info from one admin (admin access)
router.get("/:id", authenticateAdminToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      res.status(404).send("Admin not found");
    }
    res.status(200).send(admin);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Update admin information (admin access)
router.patch("/:id", authenticateAdminToken, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verify if the current user is the same as the user being updated
    if (req.admin.email !== email) {
      return res.status(403).send("You are not allowed to update other admins");
    }

    // Hash the new password if it's being updated
    if (password) {
      req.body.password = await bcrypt.hash(password, 10);
    }

    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!admin) {
      return res.status(404).send("User not found");
    }

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Admin (admin access)
router.delete("/:id", authenticateAdminToken, async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      res.status(404).send();
    }
    res.send(admin);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
