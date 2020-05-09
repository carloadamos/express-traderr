const mongoose = require('mongoose');

const { Schema } = mongoose;

const Stock = new Schema({
  stock_code: {
    type: String,
  },

  stock_trade_date: {
    type: Date,
  },

  stock_open: {
    type: Number,
  },

  stock_high: {
    type: Number,
  },

  stock_low: {
    type: Number,
  },

  stock_close: {
    type: Number,
  },

  stock_volume: {
    type: Number,
  },
});

module.exports = mongoose.model('Stock', Stock);
