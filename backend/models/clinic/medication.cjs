const mongoose = require("mongoose");
const medicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    stock: [
      {
        available: [
          {
            type: String,
          },
        ],
        dateReceived: {
          type: Date,
          default: Date.now,
        },
        clearedBy: {
          name: {
            type: String,
          },
          role: { type: Number },
        },
        supplier: {
          name: {
            type: String,
          },
          address: {
            type: String,
          },
          dateSupplied: {
            type: Date,
            default: Date.now,
          },
        },
        expiryDate: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = new mongoose.model("Medication", medicationSchema);
