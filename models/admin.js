// Schema for admin

const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    collection: "admins",
  }
);

const Admin = new mongoose.model("Admin", adminSchema);

module.exports = Admin;
