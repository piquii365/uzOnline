const mongoose = require("mongoose");
const historySchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    history: [
      {
        scheduledAppointment: {
          type: mongoose.Schema.Types.ObjectId,
        },
        medication: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Medication",
          },
        ],
        conditions: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Condition",
          },
        ],
      },
    ],
  },
  { timestamps: true }
);
module.exports = new mongoose.Model("History", historySchema);
