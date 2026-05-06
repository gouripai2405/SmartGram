const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

const Tax = require('../models/Tax');
const Complaint = require('../models/Complaint');
const Notice = require('../models/Notice');
const User = require('../models/User');
const Payment = require('../models/Payment');
const Property = require('../models/Property');

// 🔥 APPLY ADMIN SECURITY
router.use(protect, adminOnly);



// ==============================
// 🔥 ADMIN STATS
// ==============================
router.get('/stats', async (req, res) => {
  try {
    const users = await User.countDocuments();
    const taxes = await Tax.countDocuments();
    const payments = await Payment.countDocuments();

    const revenueData = await Payment.aggregate([
      { $match: { status: 'success' } },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    const revenue = revenueData[0]?.total || 0;

    res.json({ users, taxes, payments, revenue });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});



// ==============================
// 🔥 PROPERTY MANAGEMENT
// ==============================

// CREATE PROPERTY
router.post('/properties', async (req, res) => {
  try {
    const { userId, type, location, area } = req.body;

    if (!userId || !type || !location) {
      return res.status(400).json({ msg: 'Required fields missing' });
    }

    const property = await Property.create({
      userId,
      type,
      location,
      area,
    });

    res.json(property);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET ALL PROPERTIES
router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find()
      .populate('userId', 'name email');

    res.json(properties);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});



// ==============================
// 🔥 TAX MANAGEMENT (LINKED TO PROPERTY)
// ==============================

// GET ALL TAXES
router.get('/taxes', async (req, res) => {
  try {
    const taxes = await Tax.find()
      .populate('userId', 'name email')
      .populate('propertyId'); // 🔥 important

    res.json(taxes);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// CREATE TAX (CORRECT LINKING)
router.post('/taxes', async (req, res) => {
  try {
    const { userId, propertyId, type, amount, dueDate } = req.body;

    if (!userId || !propertyId || !type || !amount || !dueDate) {
      return res.status(400).json({ msg: 'All fields required' });
    }

    // 🔥 validate property belongs to user
    const property = await Property.findOne({
      _id: propertyId,
      userId: userId,
    });

    if (!property) {
      return res.status(400).json({ msg: 'Invalid property for user' });
    }

    const tax = await Tax.create({
      userId,
      propertyId,
      type,
      amount,
      dueDate,
    });

    res.json(tax);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});



// ==============================
// 🔥 COMPLAINT MANAGEMENT
// ==============================

router.get('/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('userId', 'name email');

    res.json(complaints);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put('/complaints/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ msg: 'Not found' });
    }

    complaint.status = req.body.status || complaint.status;
    await complaint.save();

    res.json(complaint);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});



// ==============================
// 🔥 NOTICE MANAGEMENT
// ==============================

router.post('/notices', async (req, res) => {
  try {
    const notice = await Notice.create(req.body);
    res.json(notice);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get('/notices', async (req, res) => {
  try {
    const notices = await Notice.find()
      .sort({ createdAt: -1 });

    res.json(notices);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.delete('/notices/:id', async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});



module.exports = router;