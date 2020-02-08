import { expect } from '@open-wc/testing';
import MovingAverage from '../src/logic/moving-average.js';
import stocks from './stocks.js';

describe('moving-average', async () => {
  it('should be able to compute for the 20 moving average', async () => {
    const average = MovingAverage.compute(stocks, 20);

    expect(average).to.be.equal(15);
  });
});
