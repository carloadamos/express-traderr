import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

const StrategySchema = new Schema({
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

export default model('Strategy', StrategySchema);
