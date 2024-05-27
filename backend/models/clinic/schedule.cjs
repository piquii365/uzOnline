const mongoose = require("mongoose");
const scheduleSchema = new mongoose.Schema(
  {
    scheduler: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Administration",
      required: true,
    },
    appointment: [
      {
        schedule: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
      },
    ],
  },
  { timestamps: true }
);
module.exports = new mongoose.model("Schedule", scheduleSchema);
