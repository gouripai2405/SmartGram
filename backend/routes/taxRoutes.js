const express = require("express");
const router = express.Router();

const Tax = require("../models/Tax");
const Payment = require("../models/Payment");
const Receipt = require("../models/Receipt");

const { protect } = require("../middleware/authMiddleware");

// 🔥 GET USER TAXES
router.get("/", protect, async (req, res) => {
  try {
    const taxes = await Tax.find({
      userId: req.user._id,
    }).populate("propertyId");

    res.json(taxes);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// 🔥 PAY TAX
router.put("/:id/pay", protect, async (req, res) => {
  try {

    const tax = await Tax.findById(req.params.id);

    if (!tax) {
      return res.status(404).json({
        msg: "Tax not found",
      });
    }

    // 🔥 SECURITY
    if (tax.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        msg: "Unauthorized",
      });
    }

    // 🔥 ALREADY PAID CHECK
    if (tax.status === "paid") {
      return res.status(400).json({
        msg: "Already paid",
      });
    }

    // 🔥 UPDATE TAX
    tax.status = "paid";
    await tax.save();

    // 🔥 CREATE PAYMENT
    const payment = await Payment.create({
      userId: req.user._id,
      taxId: tax._id,
      amount: tax.amount,
      status: "success",
    });

    // 🔥 CREATE RECEIPT
    const receipt = await Receipt.create({
      userId: req.user._id,
      tax: tax._id,
      amount: tax.amount,
      paymentId: payment._id.toString(),
    });

    res.json({
      success: true,
      msg: "Payment successful",
      payment,
      receipt,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      msg: err.message,
    });
  }
});

module.exports = router;