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
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  review: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0,
  },
  sellCount: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', product);
