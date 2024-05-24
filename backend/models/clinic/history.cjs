const mongoose = require("mongoose");
const historySchema = new mongoose.Schema(
  {
    cards: [
      {
        date: { type: Date, default: Date.now() },
        cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
      },
    ],
  },
  { timestamps: true }
);
module.exports = new mongoose.model("History", historySchema);
