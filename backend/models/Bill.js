const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  paidBy: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  participants: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Bill', billSchema);
