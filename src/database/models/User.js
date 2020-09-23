const mongoose = require('mongoose');

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', user);
