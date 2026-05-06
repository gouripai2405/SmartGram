const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tag: { type: String, required: true },
    desc: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String },
    icon: { type: String, default: '📢' },
    location: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notice', noticeSchema);