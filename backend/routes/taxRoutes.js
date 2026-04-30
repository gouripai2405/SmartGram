const express = require('express')
const router = express.Router()
const Tax = require('../models/Tax')
const Receipt = require('../models/Receipt')
const { protect, adminOnly } = require('../middleware/authMiddleware')


// 🔹 Get user's taxes
router.get('/', protect, async (req, res) => {
  const taxes = await Tax.find({ userId: req.user.id })
  res.json(taxes)
})


// 🔹 Admin creates tax
router.post('/', protect, adminOnly, async (req, res) => {
  const tax = await Tax.create(req.body)
  res.json(tax)
})


// 🔹 Pay tax + generate receipt
router.put('/:id/pay', protect, async (req, res) => {
  const tax = await Tax.findByIdAndUpdate(
    req.params.id,
    { status: 'paid' },
    { new: true }
  )

  const receipt = await Receipt.create({
    userId: req.user.id,
    taxId: tax._id,
    amount: tax.amount
  })

  res.json({ tax, receipt })
})

module.exports = router