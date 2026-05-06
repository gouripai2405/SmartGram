const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    taxId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tax",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "success",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);