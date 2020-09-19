const express = require('express');
const Product = require('../database/models/Product');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const products = await Product.find()
      .limit(limit * 1)
      .sort({ created: -1 })
      .skip((page - 1) * limit)
      .select({ name: 1, image: 1, price: 1 });

    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
