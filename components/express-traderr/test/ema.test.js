import { expect } from '@open-wc/testing';
import ExponentialMovingAverage from '../src/logic/ema.js';
import stocks from './test-data/ema-test-data.js';

describe('moving-average', async () => {
  it('should be able to compute for the correct multiplier or smoothing', async () => {
    const ema = new ExponentialMovingAverage();
    ema.period = 10;
    ema.computeMultiplier();

    expect(ema.multiplier).to.be.equal(0.1818);
  });

  it('should be able to get previous day price', async () => {
    const ema = new ExponentialMovingAverage();
    ema.stocks = stocks;

    expect(ema.previousPrice(1, stocks)).to.be.equal(1);
  });

  it('should be able to return 0 if there is no previous day', async () => {
    const ema = new ExponentialMovingAverage();
    ema.stocks = stocks;

    expect(ema.previousPrice(0, stocks)).to.be.equal(0);
  });

  it('should be able to compute for current EMA', async () => {
    const ema = new ExponentialMovingAverage();
    ema.period = 12;
    ema.computeMultiplier();

    expect(ema.computeCurrentEMA(1.73, 1.6739)).to.be.equal(1.6825);
  });

  it('should be able to create a new property EMA', async () => {
    const ema = new ExponentialMovingAverage();
    const newStockList = ema.compute(stocks, 12);

    expect(newStockList[13]).to.have.property('EMA12');
  });
});
