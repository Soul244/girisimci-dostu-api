const mongoose = require('mongoose');

async function connectDatabase(url) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Mongodb is Ready');
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = connectDatabase;
