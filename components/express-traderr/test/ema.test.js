import { expect } from '@open-wc/testing';
import ExponentialMovingAverage from '../src/logic/ema.js';
import stocks from './test-data/test-data.js';

describe('ema', () => {
  it('should be able to compute for the correct multiplier or smoothing', () => {
    const ema = new ExponentialMovingAverage(stocks, 10, 'closingPrice', 'EMA');

    expect(ema.smoothing).to.be.equal(0.1818);
  });

  it('should be able to get previous day price', () => {
    const ema = new ExponentialMovingAverage(stocks, 10, 'closingPrice', 'EMA');

    expect(ema.previousPrice(1, stocks)).to.be.equal(1);
  });

  it('should be able to return 0 if there is no previous day', () => {
    const ema = new ExponentialMovingAverage(stocks, 10, 'closingPrice', 'EMA');

    expect(ema.previousPrice(0, stocks)).to.be.equal(0);
  });

  it('should be able to compute for current EMA. Period 12', () => {
    const period = 12;
    const ema = new ExponentialMovingAverage(stocks, period, 'closingPrice', 'EMA');

    expect(ema.computeCurrentEMA(1.73, 1.6739)).to.be.equal(1.6825);
  });

  it('should be able to compute for current EMA. Period 26', () => {
    const period = 26;
    const ema = new ExponentialMovingAverage(stocks, period, 'closingPrice', 'EMA');

    expect(ema.computeCurrentEMA(1.73, 1.6739)).to.be.equal(1.6781);
  });

  it('should be able to create a new property EMA', () => {
    const period = 12;
    const ema = new ExponentialMovingAverage(stocks, period, 'closingPrice', 'EMA');
    const newStockList = ema.compute();

    expect(newStockList[13]).to.have.property('EMA12');
  });

  it('should be able to create a new property EMA for stocks before specified period', () => {
    const period = 26;
    const ema = new ExponentialMovingAverage(stocks, period, 'closingPrice', 'EMA');
    const newStockList = ema.compute();

    expect(newStockList[0]).to.have.property('EMA26');
  });

  it('should be able to create a new property EMA for stocks on specified period', () => {
    const period = 26;
    const ema = new ExponentialMovingAverage(stocks, period, 'closingPrice', 'EMA');
    const newStockList = ema.compute();

    expect(newStockList[25]).to.have.property('EMA26');
  });

  it('should be able to create a new property EMA for stocks after specified period', () => {
    const period = 26;
    const ema = new ExponentialMovingAverage(stocks, period, 'closingPrice', 'EMA');
    const newStockList = ema.compute();

    expect(newStockList[28]).to.have.property('EMA26');
  });

  it('should be able to correctly compute EMA', () => {
    const period = 12;
    const ema = new ExponentialMovingAverage(stocks, period, 'closingPrice', 'EMA');
    const newStockList = ema.compute();

    expect(newStockList[12].EMA12).to.be.equal(7.4997);
  });

  it('should be able to correctly compute EMA', () => {
    const period = 12;
    const ema = new ExponentialMovingAverage(stocks, period, 'closingPrice', 'EMA');
    const newStockList = ema.compute();

    expect(newStockList[13].EMA12).to.be.equal(8.4994);
  });
});
