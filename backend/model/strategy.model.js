const mongoose = require('mongoose');

const { Schema } = mongoose;

const Strategy = new Schema({
  strategy_id: {
    type: Number,
  },

  strategy_name: {
    type: String,
  },

  strategy_buy: {
    type: String,
  },

  strategy_sell: {
    type: String,
  },
});

module.exports = mongoose.model('Strategy', Strategy);
