const express = require('express')
const router = express.Router()
const Complaint = require('../models/Complaint')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, async (req, res) => {
  const complaint = await Complaint.create({
    ...req.body,
    userId: req.user.id
  })
  res.json(complaint)
})

router.get('/', protect, async (req, res) => {
  const complaints = await Complaint.find({ userId: req.user.id })
  res.json(complaints)
})

module.exports = router