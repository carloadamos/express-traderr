import { expect } from '@open-wc/testing';
import BackTest from '../src/logic/backtest.js';
import stocks from './test-data/test-data.js';

const strategy = 'long';

describe('backtest', () => {
  it('should be able to backtest macd-crossover', () => {
    const signals = [
      {
        code: 'macd-crossover',
        fastLength: 12,
        slowLength: 26,
        source: 'close',
        signalLength: 9,
      },
    ];
    const backTest = new BackTest(stocks, strategy, signals);
    backTest.start();

    expect(1).to.be.equal(1);
  });

  it('should be able to backtest uptrend', () => {
    const signals = [
      {
        code: 'uptrend',
        periods: [10, 20],
        source: 'close',
        newProperty: 'SMA',
      },
    ];
    const backTest = new BackTest(stocks, strategy, signals);
    backTest.start();

    expect(1).to.be.equal(1);
  });

  it('should be able to backtest price-above-sma', () => {
    const signals = [
      {
        code: 'price-above-sma',
        periods: [10],
        source: 'close',
        newProperty: 'SMA',
      },
    ];
    const backTest = new BackTest(stocks, strategy, signals);
    backTest.start();

    expect(1).to.be.equal(1);
  });

  it('should be able to backtest price-above-ema', () => {
    const signals = [
      {
        code: 'price-above-ema',
        periods: [20],
        source: 'close',
        newProperty: 'ema',
        smaSource: 'close',
      },
    ];
    const backtest = new BackTest(stocks, strategy, signals);
    backtest.start();

    expect(1).to.be.equal(1);
  });

  it('should be able to backtest uptrend and macd-crossover', () => {
    const signals = [
      {
        code: 'uptrend',
        periods: [10, 20],
        source: 'close',
        newProperty: 'SMA',
      },
      {
        code: 'macd-crossover',
        fastLength: 12,
        slowLength: 26,
        source: 'close',
        signalLength: 9,
      },
    ];
    const backtest = new BackTest(stocks, strategy, signals);
    backtest.start();

    expect(1).to.be.equal(1);
  });
});
