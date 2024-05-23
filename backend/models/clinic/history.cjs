const mongoose = require("mongoose");
const historySchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Administration",
      },
    ],
    condition: [
      {
        type: String,
        lowercase: true,
      },
    ],
    prescription: [
      {
        name: { type: mongoose.Schema.Types.ObjectId, ref: "Medication" },
        collectionStatus: {
          type: String,
          enum: ["Collected", "Not Collected", "Not Available"],
        },
        amount: { type: String },
        receivedFrom: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        dateReceived: { type: Date, default: Date.now },
      },
    ],
    specialNotes: [{ type: String, lowercase: true }],
    appointments: [
      {
        date: { type: Date },
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        agenda: { type: String },
      },
    ],
  },
  { timestamps: true }
);
module.exports = new mongoose.Model("History", historySchema);
