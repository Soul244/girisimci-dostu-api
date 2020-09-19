const faker = require('faker');
const Product = require('../database/models/Product');

async function insertMockData(count) {
  try {
    const mockData = [];
    for (let index = 0; index < count; index++) {
      mockData.push({
        name: faker.commerce.productName(),
        details: faker.random.words(12),
        image: faker.random.image(),
        brand: faker.company.companyName(),
        price: faker.commerce.price(),
        review: faker.random.number({ min: 0, max: 5 }),
        sellCount: faker.random.number({ min: 0, max: 1500 }),
        created: faker.date.past(),
      });
    }
    await Product.insertMany(mockData);
    console.log('Mock data inserted');
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = insertMockData;
