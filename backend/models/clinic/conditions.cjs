const mongoose = require("mongoose");
const conditionsSchema = new mongoose.Schema(
  {
    dieses: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = new mongoose.model("Condition", conditionsSchema);
