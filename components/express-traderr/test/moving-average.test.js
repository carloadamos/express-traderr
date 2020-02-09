import { expect } from '@open-wc/testing';
import MovingAverage from '../src/logic/moving-average.js';
import stocks from './stocks.js';

describe('moving-average', async () => {
  it('should be able to acquire moving average 20 property', async () => {
    const stocksWithMA = MovingAverage.compute(stocks, 20);

    expect(stocksWithMA[0]).to.have.property('MA20');
  });

  it('should be able to correctly compute for moving average', async () => {
    const stocksWithMA = MovingAverage.compute(stocks, 20);

    // < 20
    expect(stocksWithMA[0].MA20).to.be.equal(1 / 20);

    // === 20
    expect(stocksWithMA[19].MA20).to.be.equal(210 / 20);

    // > 20
    expect(stocksWithMA[20].MA20).to.be.equal(230 / 20);
  });
});
