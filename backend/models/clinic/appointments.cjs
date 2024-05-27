const mongoose = require("mongoose");
const appointmentsSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    appointment: [
      {
        schedule: { type: mongoose.Schema.Types.ObjectId, ref: "Schedule" },
      },
    ],
  },
  { timestamps: true }
);
module.exports = new mongoose.model("Appointment", appointmentsSchema);
