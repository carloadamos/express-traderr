import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

const StockSchema = new Schema({
  code: {
    type: String,
  },

  trade_date: {
    type: Date,
  },

  open: {
    type: Number,
  },

  high: {
    type: Number,
  },

  low: {
    type: Number,
  },

  close: {
    type: Number,
  },

  volume: {
    type: Number,
  },
});

export default model('Stock', StockSchema);
