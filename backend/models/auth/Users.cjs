const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Username already registered"],
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      email: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please provide password"],
    },
    regNumber: {
      type: String,
      required: [true, "Please provide reg number"],
      uppercase: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Female",
    },
    age: {
      type: Number,
      min: 19,
      max: 75,
    },
    roles: {
      student: {
        type: Number,
        default: 1000,
      },
      doctor: Number,
      nurse: Number,
      pharmacist: Number,
      admin: Number,
      super: Number,
    },
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
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    nextOfKin: {
      name: { type: String },
      phoneNumber: { type: String },
      address: { type: String },
      relationship: { type: String },
    },
    medicalHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "History",
      },
    ],
    specialConditions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SpecialCondition" },
    ],
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    Medication: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medication",
      },
    ],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("User", usersSchema);
