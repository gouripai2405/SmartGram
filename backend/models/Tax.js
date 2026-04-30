const mongoose = require('mongoose')

const taxSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  type: String,
  amount: Number,
  status: String
})

module.exports = mongoose.model('Tax', taxSchema)