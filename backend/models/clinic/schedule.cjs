const mongoose = require("mongoose");
const scheduleSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },
    startTime: { type: String },
    duration: { type: String },
    agenda: {
      type: String,
    },
    participants: {
      studentParticipants: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      ],
      administrationParticipants: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Administration" },
      ],
      otherParticipants: [{ type: String }],
    },
  },
  { timestamps: true, strictPopulate: false }
);
module.exports = new mongoose.models("Schedule", scheduleSchema);
