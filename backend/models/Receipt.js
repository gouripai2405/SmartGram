const mongoose = require('mongoose')

const receiptSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  taxId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Receipt', receiptSchema)