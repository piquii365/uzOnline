const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema(
  {
    cardOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    currentCard: { type: mongoose.Schema.Types.ObjectId },
    visit: [
      {
        date: {
          type: Date,
          default: Date.now(),
        },
        temp: { type: String },
        weight: { type: String },
        BP: { type: String },
        purposeOfVisit: [{ type: String }],
        prescription: [{ type: String }],
        appointments: [
          {
            date: { type: Date },
            purpose: [{ type: String }],
          },
        ],
        recommendations: { type: String },
        collectedDrugs: {
          drugs: [{ type: String }],
          date: { type: Date, default: Date.now() },
          receivedFrom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Administration",
          },
        },
      },
    ],
  },
  { timestamps: true, strictPopulate: false }
);
module.exports = new mongoose.model("Card", cardSchema);
