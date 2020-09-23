const mongoose = require('mongoose');

const product = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  price: {
    type: Number,
    required: true,
  },
  reviewCount: {
    type: Number,
    min: 0,
    default: 0,
  },
  reviewAvarage: {
    type: Number,
    min: 0,
    default: 0,
  },
  sales: {
    type: Number,
    min: 0,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', product);
