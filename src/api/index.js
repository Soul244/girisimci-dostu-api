const express = require('express');

const router = express.Router();

const products = require('./products');
const brands = require('./brands');

router.use('/products', products);
router.use('/brands', brands);

module.exports = router;
