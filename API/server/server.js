require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { configureServer } = require('./bootstrapServer');

/*
 * Instantiate the express app, and configure the middleware for it, and
 * Make connection to the MongoDB
 */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

configureServer(app);

(async function start() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true });
    app.listen(process.env.PORT || 4000, () => {
      console.log(`App started on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());
