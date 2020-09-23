const mongoose = require('mongoose');

const review = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  review: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0,
  },
  comment: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', review);
