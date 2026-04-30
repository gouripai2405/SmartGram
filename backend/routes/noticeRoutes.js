const express = require('express')
const router = express.Router()
const Notice = require('../models/Notice')
const { protect, adminOnly } = require('../middleware/authMiddleware')


// 🔹 Admin: Create notice
router.post('/', protect, adminOnly, async (req, res) => {
  const notice = await Notice.create(req.body)
  res.json(notice)
})


// 🔹 User: Get all notices
router.get('/', async (req, res) => {
  const notices = await Notice.find().sort({ date: -1 })
  res.json(notices)
})

module.exports = router