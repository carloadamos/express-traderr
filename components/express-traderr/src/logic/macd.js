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

  /**
   * Crossover happens when macd overtakes signal.
   * @param {Object} previousStock Previous candle.
   * @param {Object} currentStock Current candle.
   * @param {number} period Period of time for `signal`.
   */
  static crossOver(previousStock, currentStock, period) {
    const macd = 'MACD';
    const signal = 'SIGNAL'.concat(period);
    const properties = [macd, signal];
    const stocks = [previousStock, currentStock];

    stocks.forEach(stock => {
      properties.forEach(props => {
        if (!Object.prototype.hasOwnProperty.call(stock, props))
          throw new Error(`MACD CROSSOVER: ${props} does not exist!`);
      });
    });

    const preCondition = previousStock[macd] < previousStock[signal];
    const currentCondition = currentStock[macd] > currentStock[signal];

    return preCondition && currentCondition;
  }

  /**
   * Crossunder happens when macd was overtaken by signal.
   * @param {Object} previousStock Previous candle.
   * @param {Object} currentStock Current candle.
   * @param {number} period Period of time for `signal`.
   */
  static crossUnder(previousStock, currentStock, period) {
    const macd = 'MACD';
    const signal = 'SIGNAL'.concat(period);
    const properties = [macd, signal];
    const stocks = [previousStock, currentStock];

    stocks.forEach(stock => {
      properties.forEach(props => {
        if (!Object.prototype.hasOwnProperty.call(stock, props))
          throw new Error(`MACD CROSSUNDER: ${props} does not exist!`);
      });
    });

    const preCondition = previousStock[signal] < previousStock[macd];
    const currentCondition = currentStock[signal] > currentStock[macd];

    return preCondition && currentCondition;
  }

  /**
   * Compute for SMA of MACD.
   */
  _computeMACDSMA() {
    const { signalLength } = this;
    const sma = new SimpleMovingAverage(this.stockList, signalLength, 'MACD', 'MACD_SMA');

    return sma.compute();
  }

  /**
   * Compute for signal line.
   * Signal line = EMA9 of MACD.
   */
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
   * Compute for MACD.
   */
  _computeMACD() {
    const { slowLength, fastLength } = this;
    this._generateEMA(slowLength);
    this._generateEMA(fastLength);

    return this.stockList.map(stock => {
      const slowEMA = stock[emaProperty.concat(slowLength)];
      const fastEMA = stock[emaProperty.concat(fastLength)];

      let macd = 0;

      if (fastEMA !== 0 && slowEMA !== 0) {
        if (this.stockList.indexOf(stock) >= fastLength - 1) {
          macd = parseFloat((slowEMA - fastEMA).toFixed(4));
        }
      }

      stock = { ...stock, MACD: macd };

      return stock;
    });
  }

  /**
   * Generate EMA using closing price.
   * @param {number} period Period for generating EMA. Will also be used in generating SMA.
   */
  _generateEMA(period) {
    let { stockList } = this;
    /* istanbul ignore else */
    if (!Object.prototype.hasOwnProperty.call(stockList[0], 'SMA'.concat(period))) {
      const sma = new SimpleMovingAverage(stockList, period, 'close', 'SMA');
      stockList = sma.compute();
    }

    const ema = new ExponentialMovingAverage(stockList, period, 'SMA', 'EMA', 'close');
    stockList = ema.compute();
    this.stockList = stockList;
  }
}
