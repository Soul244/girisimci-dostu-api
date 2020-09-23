const express = require('express');
const Product = require('../database/models/Product');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      minPrice,
      maxPrice,
      review, // number
      brands, // array
      // header filters
      date, // asc, desc
      sales, // asc, desc
      price, // asc, desc
    } = req.query;

    let sort = {};
    if (sales) {
      sort = {};
      sort.sales = sales === 'asc' ? 1 : -1;
    }
    if (price) {
      sort = {};
      sort.price = price === 'asc' ? 1 : -1;
    }
    if (date) {
      sort = {};
      sort.created = date === 'asc' ? 1 : -1;
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
      where.reviewAvarage = { $gte: review };
    }

    if (brands) {
      where.brandName = { $in: brands };
    }

    const products = await Product.find(where)
      .limit(limit * 1)
      .sort(sort)
      .skip((page - 1) * limit)
      .select({
        name: 1, image: 1, price: 1, sales: 1, reviewAvarage: 1, reviewCount: 1, brandName: 1,
      });

    const count = await Product.countDocuments(where);
    const totalPages = Math.ceil(count / limit);

    res.json({
      products,
      productsCount: count,
      totalPages,
      currentPage: parseInt(page, 10),
      hasMore: totalPages >= parseInt(page, 10),
      count,
    });
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
