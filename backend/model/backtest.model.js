import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

const BacktestSchema = new Schema({
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

export default model('BackTestModel', BacktestSchema);