const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const { protect } = require('../middleware/authMiddleware');

// CREATE COMPLAINT
router.post('/', protect, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ msg: 'All fields required' });
    }

    const complaint = await Complaint.create({
      title,
      description,
      userId: req.user.id,
    });

    res.json(complaint);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET USER COMPLAINTS
router.get('/', protect, async (req, res) => {
  try {
    const complaints = await Complaint.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;