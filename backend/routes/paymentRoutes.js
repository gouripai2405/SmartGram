const express = require('express');
const router = express.Router();

const Razorpay = require('razorpay');
const crypto = require('crypto');

const Payment = require('../models/Payment');
const Tax = require('../models/Tax');
const Receipt = require('../models/Receipt');

const { protect } = require('../middleware/authMiddleware');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// ==============================
// 🔥 CREATE ORDER (SECURE)
// ==============================
router.post('/create-order', protect, async (req, res) => {
  try {
    const { taxId } = req.body;

    if (!taxId) {
      return res.status(400).json({ msg: 'Tax ID required' });
    }

    const tax = await Tax.findById(taxId);

    if (!tax) {
      return res.status(404).json({ msg: 'Tax not found' });
    }

    if (tax.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    if (tax.status === 'paid') {
      return res.status(400).json({ msg: 'Already paid' });
    }

    // 🔥 ALWAYS take amount from DB (not frontend)
    const order = await razorpay.orders.create({
      amount: tax.amount * 100,
      currency: 'INR',
      receipt: `tax_${tax._id}_${Date.now()}`,
    });

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      taxId: tax._id,
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// ==============================
// 🔥 VERIFY PAYMENT (SECURE)
// ==============================
router.post('/verify', protect, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      taxId,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !taxId) {
      return res.status(400).json({ msg: 'Missing payment data' });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expected !== razorpay_signature) {
      return res.status(400).json({ msg: 'Invalid signature' });
    }

    const tax = await Tax.findById(taxId);

    if (!tax) {
      return res.status(404).json({ msg: 'Tax not found' });
    }

    if (tax.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    if (tax.status === 'paid') {
      return res.status(400).json({ msg: 'Already paid' });
    }

    // 🔥 Prevent duplicate payment records
    const existingPayment = await Payment.findOne({
      paymentId: razorpay_payment_id,
    });

    if (existingPayment) {
      return res.status(400).json({ msg: 'Duplicate payment detected' });
    }

    // 🔥 Save payment
    const payment = await Payment.create({
      userId: req.user.id,
      taxId: tax._id,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      amount: tax.amount,
      status: 'success',
    });

    // 🔥 Mark tax as paid
    tax.status = 'paid';
    await tax.save();

    // 🔥 Create receipt
    const receipt = await Receipt.create({
      userId: req.user.id,
      tax: tax._id,
      amount: tax.amount,
      paymentId: razorpay_payment_id,
    });

    res.json({
      success: true,
      receipt,
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;