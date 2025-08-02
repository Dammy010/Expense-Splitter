const mongoose = require('mongoose');

const shareSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
    trim: true,
  },
  to: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount must be positive'],
  },
  isSettled: {
    type: Boolean,
    default: false,
  },
  billId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bill',
    required: true,
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model('Share', shareSchema);
