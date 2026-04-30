const mongoose = require('mongoose')

const supportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  status: { type: String, default: 'open' }, // open, resolved
  reply: String,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Support', supportSchema)