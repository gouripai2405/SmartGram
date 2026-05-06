const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const { protect } = require('../middleware/authMiddleware');

// GET user properties
router.get('/', protect, async (req, res) => {
  try {
    const properties = await Property.find({ userId: req.user.id });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// CREATE property (testing/admin)
router.post('/', protect, async (req, res) => {
  try {
    const property = await Property.create({
      userId: req.user.id,
      ...req.body,
    });

    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;