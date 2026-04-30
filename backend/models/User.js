const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['admin','citizen'], default: 'citizen' },
  villageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Village' }
})

module.exports = mongoose.model('User', userSchema)