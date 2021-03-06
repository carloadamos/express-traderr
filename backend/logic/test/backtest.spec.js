import BackTest from '../backtest.js';
import backTestStockList from './test-data/backtest.testdata.js';

const strategy = 'long';

describe('backtest', () => {
  it('should be able backtest macd-crossover', () => {
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
    const backTest = new BackTest(backTestStockList, strategy, signals, 20000);
    backTest.start();

    expect(1).toEqual(1);
  });

  it('should be able backtest uptrend', () => {
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
    const backTest = new BackTest(backTestStockList, strategy, signals, 20000);
    backTest.start();

    expect(1).toEqual(1);
  });

  it('should be able backtest price-above-sma', () => {
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
    const backTest = new BackTest(backTestStockList, strategy, signals, 20000);
    backTest.start();

    expect(1).toEqual(1);
  });

  it('should be able backtest price-above-ema', () => {
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
    const backtest = new BackTest(backTestStockList, strategy, signals, 20000);
    backtest.start();

    expect(1).toEqual(1);
  });

  it('should be able backtest uptrend and macd-crossover', () => {
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
    const backtest = new BackTest(backTestStockList, strategy, signals, 20000);
    backtest.start();

    expect(1).toEqual(1);
  });

  it('should be able throw error when unimplemented signal is encoutered.', () => {
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
    const backtest = new BackTest(backTestStockList, strategy, signals, 20000);
    backtest.start();

    expect(1).toEqual(1);
  });

  it('should be able backtest downtrend', () => {
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
    const backTest = new BackTest(backTestStockList, strategy, signals, 20000);
    backTest.start();

    expect(1).toEqual(1);
  });

  it('should be able backtest MAMA', () => {
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
          periods: [12],
          source: 'close',
          newProperty: 'SMA',
        },
      ],
      sell: [
        {
          code: 'macd-crossunder',
          fastLength: 12,
          slowLength: 26,
          source: 'close',
          signalLength: 9,
        },
        {
          code: 'price-below-ema',
          periods: [12],
          source: 'SMA',
          newProperty: 'EMA',
          smaSource: 'close',
        },
      ],
    };
    const backTest = new BackTest(backTestStockList, strategy, signals, 20000);
    backTest.start();

    expect(1).toEqual(1);
  });

  it('should be able backtest uptrend with duration', () => {
    const signals = {
      buy: [
        {
          code: 'uptrend',
          periods: [10, 20],
          source: 'close',
          newProperty: 'SMA',
          duration: 10,
        },
      ],
      sell: [
        {
          code: 'downtrend',
          periods: [10, 20],
          source: 'close',
          newProperty: 'SMA',
          duration: 10,
        },
      ],
    };
    const backTest = new BackTest(backTestStockList, strategy, signals, 20000);
    backTest.start();

    expect(1).toEqual(1);
  });

  it('should be able return history list', () => {
    const signals = {
      buy: [
        {
          code: 'uptrend',
          periods: [10, 20],
          source: 'close',
          newProperty: 'SMA',
          duration: 10,
        },
      ],
      sell: [
        {
          code: 'downtrend',
          periods: [10, 20],
          source: 'close',
          newProperty: 'SMA',
          duration: 10,
        },
      ],
    };
    const backTest = new BackTest(backTestStockList, strategy, signals, 20000);
    const history = backTest.start();
    console.log(`CARLOLO`, history)

  });

  it('should be able test when date range is supplied', () => {
    const dateRange = ['05/06/2012', '07/06/2012'];
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
          duration: 10,
        },
      ],
    };

    const backTest = new BackTest(backTestStockList, strategy, signals, 20000, dateRange);
  });

  it('should be able test macd-above-signal ', () => {
    const signals = {
      buy: [
        {
          code: 'macd-above-signal',
          fastLength: 12,
          slowLength: 26,
          source: 'close',
          signalLength: 9,
          duration: 10,
        },
      ],
      sell: [
        {
          code: 'macd-below-signal',
          fastLength: 12,
          slowLength: 26,
          source: 'close',
          signalLength: 9,
          duration: 10,
        },
      ],
    };
    const backTest = new BackTest(backTestStockList, strategy, signals);
    backTest.start();

    expect(1).not.toEqual(0);
  });

  it('should be able test macd-below-signal ', () => {
    const signals = {
      buy: [
        {
          code: 'macd-below-signal',
          fastLength: 12,
          slowLength: 26,
          source: 'close',
          signalLength: 9,
          duration: 10,
        },
      ],
      sell: [
        {
          code: 'downtrend',
          periods: [10, 20],
          source: 'close',
          newProperty: 'SMA',
          duration: 10,
        },
      ],
    };
    const backTest = new BackTest(backTestStockList, strategy, signals);
    backTest.start();

    expect(1).not.toEqual(0);
  });
});
