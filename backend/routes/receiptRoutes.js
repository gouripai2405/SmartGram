const express = require('express');
const router = express.Router();

const Receipt = require('../models/Receipt');
const { protect } = require('../middleware/authMiddleware');

// 🔥 GET RECEIPTS FOR USER
router.get('/', protect, async (req, res) => {
  try {
    const { tax } = req.query;

    let query = { userId: req.user._id };

    // 🔥 If taxId is provided → filter
    if (tax) {
      query.tax = tax;
    }

    const receipts = await Receipt.find(query)
      .populate('tax')
      .sort({ createdAt: -1 });

    res.json(receipts);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;