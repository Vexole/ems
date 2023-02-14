const mongoose = require('mongoose');

// Model to keep track of number of entries
const CounterSchema = mongoose.Schema({
  _id: String,
  current: Number,
});

const CounterModel = mongoose.model('Counter', CounterSchema);
module.exports = CounterModel;
