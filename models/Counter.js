const mongoose = require('mongoose');

const CounterSchema = mongoose.Schema({
  _id: String,
  current: Number,
});

const CounterModel = mongoose.model('Counter', CounterSchema);
module.exports = CounterModel;
