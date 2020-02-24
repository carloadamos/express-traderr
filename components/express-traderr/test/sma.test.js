import { expect } from '@open-wc/testing';
import SimpleMovingAverage from '../src/logic/sma.js';
import stocks from './test-data/test-data.js';

describe('simple-moving-average', () => {
  it('should be able to acquire simple moving average 12 property. Below period.', () => {
    const sma = new SimpleMovingAverage(stocks, 12, 'close', 'SMA');
    const stocksWithSMA = sma.compute();

    expect(stocksWithSMA[0]).to.have.property('SMA12');
  });

  it('should be able to acquire simple moving average 12 property. Exact period.', () => {
    const sma = new SimpleMovingAverage(stocks, 12, 'close', 'SMA');
    const stocksWithSMA = sma.compute();

    expect(stocksWithSMA[11]).to.have.property('SMA12');
  });

  it('should be able to acquire simple moving average 12 property. Above period.', () => {
    const sma = new SimpleMovingAverage(stocks, 12, 'close', 'SMA');
    const stocksWithSMA = sma.compute();

    expect(stocksWithSMA[stocks.length - 1]).to.have.property('SMA12');
  });

  it('should be able to have property SMA12 but with 0 amount', () => {
    const sma = new SimpleMovingAverage(stocks, 12, 'close', 'SMA');
    const stocksWithMA = sma.compute();

    expect(stocksWithMA[0].SMA12).to.be.equal(0);
  });

  it('should be able to have property SMA12 not equal to 0', () => {
    const sma = new SimpleMovingAverage(stocks, 12, 'close', 'SMA');
    const newStocks = sma.compute();

    expect(newStocks[11].SMA12).to.be.not.equal(0);
    expect(newStocks[stocks.length - 1].SMA12).to.be.not.equal(0);
  });

  it('should be able to compute for moving average when days is equal to computed average', () => {
    const sma = new SimpleMovingAverage(stocks, 20, 'close', 'SMA');
    const stocksWithMA = sma.compute();

    expect(stocksWithMA[19].SMA20).to.be.equal(2.4235);
  });

  it('should be able to compute moving average for days greater than the computed average', () => {
    const sma = new SimpleMovingAverage(stocks, 20, 'close', 'SMA');
    const stockList = sma.compute();

    expect(stockList[stocks.length - 1].SMA20).to.be.equal(2.219);
  });

  it('should be able to throw error when stock has no baseproperty', () => {
    const sma = new SimpleMovingAverage(stocks, 20, 'nonExisting', 'SMA');
    expect(() => {
      sma.compute();
    }).to.throw('nonExisting20 property do not exist!');
  });
});
