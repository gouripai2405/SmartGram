const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    type: String,
    location: String,
    area: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);