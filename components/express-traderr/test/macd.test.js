import { expect } from '@open-wc/testing';
import ExponentialMovingAverage from '../src/logic/ema.js';
import stocks from './simple-test-data.js';

describe('moving-average', async () => {
  it('should be able to compute for the correct `fastLength`', async () => {
    const ema = new ExponentialMovingAverage();

    expect(ema.multiplier(10)).to.be.equal(0.18);
  });

  it('should be able to get previous day price', async () => {
    const ema = new ExponentialMovingAverage();

    expect(ema.previousPrice(1, stocks)).to.be.equal(1);
  });

  it('should be able to return 0 if there is no previous day', async () => {
    const ema = new ExponentialMovingAverage();

    expect(ema.previousPrice(0, stocks)).to.be.equal(0);
  });

  it('should be able to compute for EMA', async () => {
    const ema = new ExponentialMovingAverage();

    ema.compute(stocks, 12);
  });
});
