const express = require('express');
const Brand = require('../database/models/Brand');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const brands = await Brand.find().select('-__v');
    res.json(brands);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
