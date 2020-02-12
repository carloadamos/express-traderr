import { expect } from '@open-wc/testing';
import SimpleMovingAverage from '../src/logic/sma.js';
import stocks from './test-data/simple-test-data.js';

describe('sma', () => {
  it('should be able to acquire moving average 20 property', () => {
    const sma = new SimpleMovingAverage();
    const stocksWithMA = sma.compute(stocks, 12, 'closingPrice', 'SMA12');

    expect(stocksWithMA[11]).to.have.property('SMA12');
  });

  it('should be be able to have property SMA12 but with 0 amount', () => {
    const sma = new SimpleMovingAverage();
    const stocksWithMA = sma.compute(stocks, 12, 'closingPrice', 'SMA12');

    expect(stocksWithMA[0].SMA12).to.be.equal(0);
  });

  it('should be able to compute for moving average when days is equal to computed average', () => {
    const sma = new SimpleMovingAverage();
    const stocksWithMA = sma.compute(stocks, 20, 'closingPrice', 'SMA20');

    expect(stocksWithMA[19].SMA20).to.be.equal(210 / 20);
  });

  it('should be able to compute moving average for days greater than the computed average', () => {
    const sma = new SimpleMovingAverage();
    const stocksWithMA = sma.compute(stocks, 20, 'closingPrice', 'SMA20');

    expect(stocksWithMA[20].SMA20).to.be.equal(230 / 20);
  });
});
