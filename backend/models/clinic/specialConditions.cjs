const mongoose = require("mongoose");
const specialConditionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    classification: {
      type: String,
    },
    medication: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medication",
        default: [],
      },
    ],
    personnelInCharge: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    dateReceived: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
module.exports = new mongoose.model("SpecialCondition", specialConditionSchema);
