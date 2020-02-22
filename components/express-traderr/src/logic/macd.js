import SimpleMovingAverage from './sma.js';
import ExponentialMovingAverage from './ema.js';

const emaProperty = 'EMA';

export default class MovingAverageConvergenceDivergence {
  constructor(stockList, fastLength, slowLength, source, signalLength) {
    this.fastLength = fastLength;
    this.signalLength = signalLength;
    this.slowLength = slowLength;
    this.source = source;
    this.stockList = stockList;
  }

  /**
   * Compute for stock's MACD.
   * MACD Line
   * Signal Line
   * @param {Array} stocks Stock list.
   */
  /* eslint-disable no-param-reassign */
  compute() {
    this.stockList = this._computeMACD();

    this.stockList = this._computeMACDSMA();

    this.stockList = this._computeSignalLine();

    return this.stockList;
  }

  /* eslint-disable class-methods-use-this */
  _computeMACDSMA() {
    const { signalLength } = this;
    const sma = new SimpleMovingAverage(this.stockList, signalLength, 'MACD', 'MACD_SMA');

    return sma.compute();
  }

  /**
   * Compute for signal line.
   * Signal line = EMA9 of MACD.
   * @param {Array} stockList Stock list with MACD_SMA9. */
  _computeSignalLine() {
    const { signalLength } = this;
    const ema = new ExponentialMovingAverage(
      this.stockList,
      signalLength,
      'MACD_SMA',
      'SIGNAL',
      'MACD',
    );

    return ema.compute();
  }

  /**
   *
   * @param {number} period Period of days.
   */
  hasEMA(period) {
    return this.stocks[0][emaProperty.concat(period)];
  }

  _computeMACD() {
    const { slowLength, fastLength } = this;
    this._generateEMA(slowLength);
    this._generateEMA(fastLength);

    return this.stockList.map(stock => {
      const slowEMA = stock[emaProperty.concat(slowLength)];
      const fastEMA = stock[emaProperty.concat(fastLength)];

      let macd = 0;

      if (this.stockList.indexOf(stock) >= fastLength - 1) {
        macd = parseFloat((slowEMA - fastEMA).toFixed(4));
      }

      stock = { ...stock, MACD: macd };

      return stock;
    });
  }

  _generateEMA(period) {
    let { stockList } = this;
    if (!Object.prototype.hasOwnProperty.call(stockList[0], 'SMA'.concat(period))) {
      const sma = new SimpleMovingAverage(stockList, period, 'close', 'SMA');
      stockList = sma.compute();
    }

    const ema = new ExponentialMovingAverage(stockList, period, 'SMA', 'EMA', 'close');
    stockList = ema.compute();
    this.stockList = stockList;
  }
}
