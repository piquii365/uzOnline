const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema(
  {
    cardOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
        prescription: [
          {
            drug: { type: mongoose.Schema.Types.ObjectId, ref: "Medication" },
            quantity: { type: String },
            prescribedBy: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Administration",
            },
            routine: { type: String },
            collected: { type: String, enum: ["Yes", "No"] },
            recommendations: [{ type: String }],
          },
        ],
        appointments: [
          {
            date: { type: Date },
            purpose: [{ type: String }],
          },
        ],
        recommendations: [{ type: String }],
      },
    ],
  },
  { timestamps: true, strictPopulate: false }
);
module.exports = new mongoose.model("Card", cardSchema);
