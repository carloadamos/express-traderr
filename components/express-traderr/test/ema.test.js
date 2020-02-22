import { expect } from '@open-wc/testing';
import ExponentialMovingAverage from '../src/logic/ema.js';
import stocks from './test-data/test-data.js';

describe('ema', () => {
  // it('should be able to compute for the correct multiplier or smoothing', () => {
  //   const ema = new ExponentialMovingAverage(stocks, 10, 'SMA', 'EMA');

  //   expect(ema.smoothing).to.be.equal(0.1818);
  // });

  // it('should be able to compute for current EMA. Period 12', () => {
  //   const period = 12;
  //   const ema = new ExponentialMovingAverage(stocks, period, 'SMA', 'EMA');

  //   expect(ema.computeCurrentEMA(1.73, 1.6739)).to.be.equal(1.6825);
  // });

  // it('should be able to compute for current EMA. Period 26', () => {
  //   const period = 26;
  //   const ema = new ExponentialMovingAverage(stocks, period, 'SMA', 'EMA');

  //   expect(ema.computeCurrentEMA(1.73, 1.6739)).to.be.equal(1.6781);
  // });

  // it('should be able to create a new property EMA', () => {
  //   const period = 12;
  //   const ema = new ExponentialMovingAverage(stocks, period, 'SMA', 'EMA');
  //   const newStockList = ema.compute();

  //   expect(newStockList[13]).to.have.property('EMA12');
  // });

  // it('should be able to create a new property EMA for stocks before specified period', () => {
  //   const period = 26;
  //   const ema = new ExponentialMovingAverage(stocks, period, 'SMA', 'EMA');
  //   const newStockList = ema.compute();

  //   expect(newStockList[0]).to.have.property('EMA26');
  // });

  // it('should be able to create a new property EMA for stocks on specified period', () => {
  //   const period = 26;
  //   const ema = new ExponentialMovingAverage(stocks, period, 'SMA', 'EMA');
  //   const newStockList = ema.compute();

  //   expect(newStockList[25]).to.have.property('EMA26');
  // });

  // it('should be able to create a new property EMA for stocks after specified period', () => {
  //   const period = 26;
  //   const ema = new ExponentialMovingAverage(stocks, period, 'SMA', 'EMA');
  //   const newStockList = ema.compute();

  //   expect(newStockList[28]).to.have.property('EMA26');
  // });

  it('should be able to correctly compute EMA for 12', () => {
    const period = 12;
    const ema = new ExponentialMovingAverage(stocks, period, 'SMA', 'EMA');
    const newStockList = ema.compute();
    console.log(newStockList);

    expect(newStockList[12].EMA12).to.be.equal(7.4997);
  });

  it('should be able to correctly compute EMA for 13', () => {
    const period = 12;
    const ema = new ExponentialMovingAverage(stocks, period, 'SMA', 'EMA');
    const newStockList = ema.compute();

    expect(newStockList[13].EMA12).to.be.equal(8.4994);
  });
});
