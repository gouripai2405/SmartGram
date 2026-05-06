const express = require('express');
const router = express.Router();

const Notice = require('../models/Notice');
// const { protect } = require('../middleware/authMiddleware'); // 🔒 enable later

// ==============================
// GET ALL NOTICES (PUBLIC)
// ==============================
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.status(200).json(notices);
  } catch (err) {
    console.error('GET NOTICES ERROR:', err);
    res.status(500).json({ msg: 'Failed to fetch notices' });
  }
});


// ==============================
// CREATE NOTICE (FOR NOW PUBLIC)
// ==============================
router.post('/', async (req, res) => {
  try {
    const { title, tag, desc, date, time, icon, location } = req.body;

    // ✅ Basic validation
    if (!title || !tag || !desc || !date) {
      return res.status(400).json({
        msg: 'title, tag, desc and date are required',
      });
    }

    const notice = await Notice.create({
      title,
      tag,
      desc,
      date,
      time,
      icon,
      location,
    });

    res.status(201).json(notice);
  } catch (err) {
    console.error('CREATE NOTICE ERROR:', err);
    res.status(500).json({ msg: 'Failed to create notice' });
  }
});


// ==============================
// DELETE NOTICE (OPTIONAL)
// ==============================
router.delete('/:id', async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ msg: 'Notice not found' });
    }

    await notice.deleteOne();

    res.json({ msg: 'Notice deleted successfully' });
  } catch (err) {
    console.error('DELETE NOTICE ERROR:', err);
    res.status(500).json({ msg: 'Failed to delete notice' });
  }
});


// ==============================
// FUTURE: ADMIN PROTECTION
// ==============================
// Later you can do:
// router.post('/', protect, isAdmin, ...)

module.exports = router;