const express = require('express')
const router = express.Router()
const Support = require('../models/Support')
const { protect, adminOnly } = require('../middleware/authMiddleware')


// 🔹 User: Create support ticket
router.post('/', protect, async (req, res) => {
  const ticket = await Support.create({
    userId: req.user.id,
    message: req.body.message
  })
  res.json(ticket)
})


// 🔹 User: View own tickets
router.get('/my', protect, async (req, res) => {
  const tickets = await Support.find({ userId: req.user.id })
  res.json(tickets)
})


// 🔹 Admin: View all tickets
router.get('/', protect, adminOnly, async (req, res) => {
  const tickets = await Support.find()
  res.json(tickets)
})


// 🔹 Admin: Reply / resolve ticket
router.put('/:id', protect, adminOnly, async (req, res) => {
  const ticket = await Support.findByIdAndUpdate(
    req.params.id,
    {
      reply: req.body.reply,
      status: 'resolved'
    },
    { new: true }
  )
  res.json(ticket)
})

module.exports = router