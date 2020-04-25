const mongoose = require('mongoose');

const { Schema } = mongoose;

const Strategy = new Schema({
  strategy_name: {
    type: String,
  },

  strategy_buy: {
    type: Object,
  },

  strategy_sell: {
    type: Object,
  },
});

module.exports = mongoose.model('Strategy', Strategy);
