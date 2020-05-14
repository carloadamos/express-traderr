import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

const TransactionHistory = new Schema({
  code: {
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

export default model('TransactionHistory', TransactionHistory);