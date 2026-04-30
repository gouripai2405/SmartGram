const mongoose = require('mongoose')
const Village = require('./models/Village')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Village.create({
    sarpanch: "Patil",
    population: 3000
  })
  console.log("Seeded")
  process.exit()
})