import ExponentialMovingAverage from '../ema.js';
import stocks from './test-data/test-data.js';

describe('ema', () => {
  it('should be able to compute for the correct multiplier or smoothing', () => {
    const ema = new ExponentialMovingAverage(stocks, 10, 'SMA', 'EMA', 'close');

    expect(ema.smoothing).toEqual(0.1818);
  });

  it('should be able to compute for current EMA. Period 12', () => {
    const period = 12;
    const ema = new ExponentialMovingAverage(stocks, period, 'SMA', 'EMA', 'close');

    expect(ema._computeCurrentEMA(1.73, 1.6739)).toEqual(1.6825);
  });

  it('should be able to compute for current EMA. Period 26', () => {
    const period = 26;
    const ema = new ExponentialMovingAverage(stocks, period, 'SMA', 'EMA', 'close');

    expect(ema._computeCurrentEMA(1.73, 1.6739)).toEqual(1.6781);
  });

  it('should be able to create a new property EMA', () => {
    const period = 12;
    const ema = new ExponentialMovingAverage(stocks, period, 'SMA', 'EMA', 'close');
    const newStockList = ema.compute();

    expect(newStockList[13].EMA12).toBeDefined();
  });

  it('should be able to create a new property EMA for stocks before specified period', () => {
    const period = 26;
    const ema = new ExponentialMovingAverage(stocks, period, 'SMA', 'EMA', 'close');
    const newStockList = ema.compute();

    expect(newStockList[0].EMA26).toBeDefined();
  });

  it('should be able to create a new property EMA for stocks on specified period', () => {
    const period = 26;
    const ema = new ExponentialMovingAverage(stocks, period, 'SMA', 'EMA', 'close');
    const newStockList = ema.compute();

    expect(newStockList[25].EMA26).toBeDefined();
  });

  it('should be able to create a new property EMA for stocks after specified period', () => {
    const period = 26;
    const ema = new ExponentialMovingAverage(stocks, period, 'SMA', 'EMA', 'close');
    const newStockList = ema.compute();

    expect(newStockList[28].EMA26).toBeDefined();
  });

  it('should be able to correctly compute EMA for 12', () => {
    const period = 12;
    const ema = new ExponentialMovingAverage(stocks, period, 'SMA', 'EMA', 'close');
    const newStockList = ema.compute();

    expect(newStockList[12].EMA12).toEqual(2.4878);
  });

  it('should be able to correctly compute EMA for last item', () => {
    const period = 12;
    const ema = new ExponentialMovingAverage(stocks, period, 'SMA', 'EMA', 'close');
    const newStockList = ema.compute();

    expect(newStockList[stocks.length - 1].EMA12).toEqual(2.1674);
  });

  it('should be able to correctly compute EMA for 25', () => {
    const period = 12;
    const ema = new ExponentialMovingAverage(stocks, period, 'SMA', 'EMA', 'close');
    const newStockList = ema.compute();

    expect(newStockList[24].EMA12).toEqual(2.2211);
  });

  it('should be able toThrow error property does not exist', () => {
    const period = 12;
    const smaBasis = 'nonExistent';
    expect(() => {
      /* eslint-disable */
      new ExponentialMovingAverage(stocks, period, 'SMA', 'EMA', smaBasis);
    }).toThrow(Error(`Property ${smaBasis} do not exist!`));
  });
});
