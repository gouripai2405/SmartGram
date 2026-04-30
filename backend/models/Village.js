const mongoose = require('mongoose')

const villageSchema = new mongoose.Schema({
  name: { type: String, default: "Wakare" },
  district: { type: String, default: "Kolhapur" },
  state: { type: String, default: "Maharashtra" },
  sarpanch: String,
  population: Number
})

module.exports = mongoose.model('Village', villageSchema)