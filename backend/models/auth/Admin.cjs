const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Doctor", "Receptionist", "Nurse", "Pharmacist"],
    default: "Nurse",
  },
  email: {
    type: String,
    email: true,
    required: true,
    lowercase: true,
  },
  address: {
    type: String,
  },
  phoneNumber: { type: String },
  IDNumber: { type: String },
  refreshToken: {
    token: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      expires: 30 * 8600,
    },
  },
  fullName: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    default: "Male",
  },
});

module.exports = new mongoose.model("Administration", adminSchema);
