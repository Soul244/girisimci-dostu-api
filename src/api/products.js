const express = require('express');
const Product = require('../database/models/Product');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      datesort: dateSort = 'desc', // asc, desc
      sellcountsort: sellCountSort, // asc, desc
      minprice: minPrice,
      maxprice: maxPrice,
      review, // array
      brand, // array
    } = req.query;

    let sort = {};
    if (sellCountSort) {
      sort = {};
      sort.sellCount = sellCountSort === 'asc' ? 1 : -1;
    }
    if (dateSort) {
      sort = {};
      sort.created = dateSort === 'asc' ? 1 : -1;
    }

    const where = {};

    if (maxPrice && minPrice) {
      where.price = {
        $gte: minPrice,
        $lte: maxPrice,
      };
    } else if (minPrice) {
      where.price = {
        $gte: minPrice,
      };
    } else if (maxPrice) {
      where.price = {
        $lte: maxPrice,
      };
    }

    if (review) {
      where.review = { $in: review };
    }
    if (brand) {
      where.brand = { $in: brand };
    }

    const products = await Product.find(where)
      .limit(limit * 1)
      .sort(sort)
      .skip((page - 1) * limit)
      .select({
        name: 1, image: 1, price: 1, review: 1,
      });

    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).select('-__v');

    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
