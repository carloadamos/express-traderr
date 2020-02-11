import { expect } from '@open-wc/testing';
import SimpleMovingAverage from '../src/logic/sma.js';
import stocks from './test-data/simple-test-data.js';

describe('moving-average', () => {
  it('should be able to acquire moving average 20 property', () => {
    const sma = new SimpleMovingAverage();
    const stocksWithMA = sma.compute(stocks, 12);

    expect(stocksWithMA[11]).to.have.property('MA12');
  });

  it('should be not be able to have property MA12 when below period', () => {
    const sma = new SimpleMovingAverage();
    const stocksWithMA = sma.compute(stocks, 12);

    expect(stocksWithMA[0]).not.to.have.property('MA12');
  });

  it('should be able to compute for moving average when days is equal to computed average', () => {
    const sma = new SimpleMovingAverage();
    const stocksWithMA = sma.compute(stocks, 20);

    expect(stocksWithMA[19].MA20).to.be.equal(210 / 20);
  });

  it('should be able to compute moving average for days greater than the computed average', () => {
    const sma = new SimpleMovingAverage();
    const stocksWithMA = sma.compute(stocks, 20);

    expect(stocksWithMA[20].MA20).to.be.equal(230 / 20);
  });
});
