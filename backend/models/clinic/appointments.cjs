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
        subject: {
          type: String,
        },
        timeScheduled: {
          type: Date,
        },
        specialNotes: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
        otherParticipants: {
          name: {
            type: String,
          },
          role: {
            type: Number,
          },
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = new mongoose.model("Appointment", appointmentsSchema);
