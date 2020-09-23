const faker = require('faker');
const Brand = require('../database/models/Brand');
const Product = require('../database/models/Product');
const Review = require('../database/models/Review');
const User = require('../database/models/User');

async function insertMockBrands(count) {
  const mockBrands = [];
  for (let index = 0; index < count; index++) {
    mockBrands.push({ name: faker.company.companyName(), details: faker.random.words(12) });
  }
  return Brand.insertMany(mockBrands);
}

async function insertMockProducts(count, brands) {
  const mockProducts = [];
  for (let index = 0; index < count; index++) {
    const brand = brands[faker.random.number({ min: 0, max: brands.length - 1 })];
    mockProducts.push({
      name: faker.commerce.productName(),
      details: faker.random.words(12),
      image: faker.random.image(),
      brandName: brand.name,
      brand: brand._id,
      price: faker.commerce.price(),
      sales: faker.random.number({ min: 0, max: 1500 }),
      created: faker.date.past(),
    });
  }
  return Product.insertMany(mockProducts);
}

async function insertMockUsers(count) {
  const mockUsers = [];
  for (let index = 0; index < count; index++) {
    mockUsers.push({
      name: faker.name.findName(),
    });
  }
  return User.insertMany(mockUsers);
}

async function insertMockReviews({
  maxReviewCount, products, users,
}) {
  const mockReviews = [];
  for await (const product of products) {
    const reviewCount = faker.random.number({ min: 0, max: maxReviewCount });
    const reviewStats = {};
    const reviews = [];
    for (let secondIndex = 0; secondIndex < reviewCount; secondIndex++) {
      const review = faker.random.number({ min: 1, max: 5 });
      reviews.push(review);
      reviewStats.reviewCount = reviews.length;
      reviewStats.reviewAvarage = parseFloat(reviews.reduce(
        (a, b) => a + b,
      ) / reviews.length).toFixed(2);

      mockReviews.push({
        product,
        user: users[faker.random.number({ min: 0, max: users.length - 1 })],
        review,
        comment: Math.random() > 0.5 ? faker.random.words(6) : '',
      });
    }
    await Product.findOneAndUpdate({ _id: product._id }, reviewStats);
  }

  await Review.insertMany(mockReviews);
}

async function insertMockData(
  productCount = 150, userCount = 50, brandCount = 12, maxReviewCount = 50,
) {
  try {
    const brands = await insertMockBrands(brandCount);
    const products = await insertMockProducts(productCount, brands);
    const users = await insertMockUsers(userCount);
    await insertMockReviews({
      maxReviewCount, products, users,
    });
    console.log('Mock data inserted');
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = insertMockData;
