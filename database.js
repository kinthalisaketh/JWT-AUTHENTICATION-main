require('dotenv').config();
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/test';

// See the difference between putting mongo URI in string format in .env
// console.log(process.env);
// console.log(process.env.MONGO_URI);
// console.log(MONGO_URI);

exports.mongoConnect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Successfully connected to database');
    })
    .catch((error) => {
      console.log('database connection failed. exiting now...');
      console.error(error);
      process.exit(1);
    });
};
