const mongoose = require("mongoose");

const taxSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: false, // 🔥 IMPORTANT (avoid crashes)
    },

    type: {
      type: String,
      enum: ["House", "Water"], // 🔥 FIXED ENUM
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    dueDate: {
      type: Date,
      required: true,
    },

    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tax", taxSchema);