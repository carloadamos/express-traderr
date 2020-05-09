const mongoose = require('mongoose');

const { Schema } = mongoose;

const BackTestModel = new Schema({
  execution_id: {
    type: Number,
  },

  stock_code: {
    type: String,
  },

  bought_date: {
    type: Date,
  },

  bought_price: {
    type: Number,
  },

  sold_date: {
    type: Date,
  },

  sold_price: {
    type: Number,
  },

  units: {
    type: Number,
  },
 
  pnl: {
    type: Number,
  }, 
});

module.exports = mongoose.model('BackTestModel', BackTestModel);