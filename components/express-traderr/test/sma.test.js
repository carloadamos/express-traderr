import { expect } from '@open-wc/testing';
import SimpleMovingAverage from '../src/logic/sma.js';
import stocks from './simple-test-data.js';

describe('moving-average', async () => {
  it('should be able to acquire moving average 20 property', async () => {
    const stocksWithMA = SimpleMovingAverage.compute(stocks, 20);

    expect(stocksWithMA[0]).to.have.property('MA20');
  });

  it('should be able to return 0 when average is greater than days computed', async () => {
    const stocksWithMA = SimpleMovingAverage.compute(stocks, 20);

    expect(stocksWithMA[0].MA20).to.be.equal(0);
  });

  it('should be able to compute for moving average when days is equal to computed average', async () => {
    const stocksWithMA = SimpleMovingAverage.compute(stocks, 20);

    expect(stocksWithMA[19].MA20).to.be.equal(210 / 20);
  });

  it('should be able to compute moving average for days greater than the computed average', async () => {
    const stocksWithMA = SimpleMovingAverage.compute(stocks, 20);

    expect(stocksWithMA[20].MA20).to.be.equal(230 / 20);
  });
});
