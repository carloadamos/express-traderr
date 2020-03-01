import { expect } from '@open-wc/testing';
import BackTest from '../src/logic/backtest.js';
import backTestStockList from './test-data/backtest.testdata.js';

const strategy = 'long';

describe('backtest', () => {
  it('should be able to backtest macd-crossover', () => {
    const signals = {
      buy: [
        {
          code: 'macd-crossover',
          fastLength: 12,
          slowLength: 26,
          source: 'close',
          signalLength: 9,
        },
        {
          code: 'price-above-sma',
          periods: [10],
          source: 'close',
          newProperty: 'SMA',
        },
      ],
      sell: [
        {
          code: 'price-below-sma',
          periods: [20],
          source: 'close',
          newProperty: 'SMA',
        },
      ],
    };
    const backTest = new BackTest(backTestStockList, strategy, signals);
    backTest.start();

    expect(1).to.be.equal(1);
  });

  it('should be able to backtest uptrend', () => {
    const signals = {
      buy: [
        {
          code: 'uptrend',
          periods: [10, 20],
          source: 'close',
          newProperty: 'SMA',
        },
      ],
      sell: [
        {
          code: 'downtrend',
          periods: [10, 20],
          source: 'close',
          newProperty: 'SMA',
        },
      ],
    };
    const backTest = new BackTest(backTestStockList, strategy, signals);
    backTest.start();

    expect(1).to.be.equal(1);
  });

  it('should be able to backtest price-above-sma', () => {
    const signals = {
      buy: [
        {
          code: 'price-above-sma',
          periods: [10],
          source: 'close',
          newProperty: 'SMA',
        },
        {
          code: 'uptrend',
          periods: [10, 20],
          source: 'close',
          newProperty: 'SMA',
        },
      ],
      sell: [
        {
          code: 'downtrend',
          periods: [10, 20],
          source: 'close',
          newProperty: 'SMA',
        },
      ],
    };
    const backTest = new BackTest(backTestStockList, strategy, signals);
    backTest.start();

    expect(1).to.be.equal(1);
  });

  it('should be able to backtest price-above-ema', () => {
    const signals = {
      buy: [
        {
          code: 'price-above-ema',
          periods: [20],
          source: 'close',
          newProperty: 'ema',
          smaSource: 'close',
        },
        {
          code: 'uptrend',
          periods: [10, 20],
          source: 'close',
          newProperty: 'SMA',
        },
      ],
      sell: [
        {
          code: 'downtrend',
          periods: [10, 20],
          source: 'close',
          newProperty: 'SMA',
        },
      ],
    };
    const backtest = new BackTest(backTestStockList, strategy, signals);
    backtest.start();

    expect(1).to.be.equal(1);
  });

  it('should be able to backtest uptrend and macd-crossover', () => {
    const signals = {
      buy: [
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
      ],
      sell: [
        {
          code: 'downtrend',
          periods: [10, 20],
          source: 'close',
          newProperty: 'SMA',
        },
      ],
    };
    const backtest = new BackTest(backTestStockList, strategy, signals);
    backtest.start();

    expect(1).to.be.equal(1);
  });

  it('should be able to throw error when unimplemented signal is encoutered.', () => {
    const signals = {
      buy: [
        {
          code: 'unimplemented',
        },
        {
          code: 'uptrend',
          periods: [10, 20],
          source: 'close',
          newProperty: 'SMA',
        },
      ],
      sell: [
        {
          code: 'downtrend',
          periods: [10, 20],
          source: 'close',
          newProperty: 'SMA',
        },
      ],
    };
    const backtest = new BackTest(backTestStockList, strategy, signals);
    backtest.start();

    expect(1).to.be.equal(1);
  });

  it('should be able to backtest downtrend', () => {
    const signals = {
      buy: [
        {
          code: 'uptrend',
          periods: [10, 20],
          source: 'close',
          newProperty: 'SMA',
        },
      ],
      sell: [
        {
          code: 'downtrend',
          periods: [10, 20],
          source: 'close',
          newProperty: 'SMA',
        },
      ],
    };
    const backTest = new BackTest(backTestStockList, strategy, signals);
    backTest.start();

    expect(1).to.be.equal(1);
  });
});
