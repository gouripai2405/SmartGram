const express = require('express');
const router = express.Router();

const Support = require('../models/Support');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware'); // ✅ FIXED

// 🔹 User: Create support ticket
router.post('/', protect, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ msg: 'Message required' });
    }

    const ticket = await Support.create({
      userId: req.user.id,
      message,
    });

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// 🔹 User: View own tickets
router.get('/my', protect, async (req, res) => {
  try {
    const tickets = await Support.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// 🔹 Admin: View all tickets
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const tickets = await Support.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// 🔹 Admin: Reply / resolve ticket
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { reply } = req.body;

    const ticket = await Support.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    ticket.reply = reply || ticket.reply;
    ticket.status = 'resolved';

    await ticket.save();

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;