const mongoose = require("mongoose");
const specialConditionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    classification: {
      type: String,
    },
    medication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medication",
    },
    personnelInCharge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dateReceived: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
module.exports = new mongoose.Model("SpecialCondition", specialConditionSchema);
