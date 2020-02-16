import SimpleMovingAverage from './sma.js';
import ExponentialMovingAverage from './ema.js';

const emaProperty = 'EMA';

class MovingAverageConvergenceDivergence {
  constructor(stocks) {
    this.stocks = stocks;
  }

  /**
   * Compute for stock's MACD.
   * MACD Line
   * Signal Line
   * @param {Array} stocks Stock list.
   */
  /* eslint-disable no-param-reassign */
  compute() {
    const property = 'MACD';

    /* istanbul ignore else */
    if (!this.hasEMA(12)) {
      const ema = new ExponentialMovingAverage(this.stocks, 12, 'closingPrice', 'EMA');
      this.stocks = ema.compute();
    }

    /* istanbul ignore else */
    if (!this.hasEMA(26)) {
      const ema = new ExponentialMovingAverage(this.stocks, 26, 'closingPrice', 'EMA');
      this.stocks = ema.compute();
    }

    const stockList = this.stocks.map(stock => {
      const ema12 = stock[emaProperty.concat(12)];
      const ema26 = stock[emaProperty.concat(26)];

      let macd = 0;

      if (this.stocks.indexOf(stock) >= 25) {
        macd = parseFloat((ema12 - ema26).toFixed(4));
      }

      stock = { ...stock, [property]: macd };

      return stock;
    });

    // This will have MACD_SMA9 that will be used in computing signal line.
    const stockListWithMACD = this.computeMACDSMA(stockList);
    const finalStockList = this.computeSignalLine(stockListWithMACD);

    return finalStockList;
  }

  /* eslint-disable class-methods-use-this */
  computeMACDSMA(originalStocks) {
    const period = 9;
    const property = 'MACD';
    const sma = new SimpleMovingAverage(originalStocks, period, property, 'MACD_SMA');

    return sma.compute();
  }

  /**
   * Compute for signal line.
   * Signal line = EMA9 of MACD.
   * @param {Array} stockList Stock list with MACD_SMA9.
   */
  computeSignalLine(stockList) {
    const ema = new ExponentialMovingAverage(stockList, 9, 'MACD_SMA9', 'SIGNAL');
    return ema.compute();
  }

  /**
   *
   * @param {number} period Period of days.
   */
  hasEMA(period) {
    return this.stocks[0][emaProperty.concat(period)];
  }
}

export default MovingAverageConvergenceDivergence;
