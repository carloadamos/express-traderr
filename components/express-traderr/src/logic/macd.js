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

    if (!this.hasEMA(12)) {
      const ema = new ExponentialMovingAverage(this.stocks, 12, 'closingPrice');
      this.stocks = ema.compute();
    }

    if (!this.hasEMA(26)) {
      const ema = new ExponentialMovingAverage(this.stocks, 26, 'closingPrice');
      this.stocks = ema.compute();
    }

    const stockList = this.stocks.map(stock => {
      const ema12 = stock[emaProperty.concat(12)];
      const ema26 = stock[emaProperty.concat(26)];

      let macd = 0;

      if (this.stocks.indexOf(stock) >= 26) {
        macd = parseFloat((ema12 - ema26).toFixed(4));
      }

      stock = { ...stock, [property]: macd };

      return stock;
    });

    // This will have MACD_SMA9 that will be used in computing signal line.
    const stockListWithMACD = this.addMACDSMAtoStockList(stockList);

    return stockListWithMACD;
  }

  /* eslint-disable class-methods-use-this */
  addMACDSMAtoStockList(originalStocks) {
    const period = 9;
    const property = 'MACD';
    const sma = new SimpleMovingAverage(originalStocks, period, property, 'MACD_SMA');

    return sma.compute();
  }

  // computeEMA()

  /**
   *
   * @param {number} period Period of days.
   */
  hasEMA(period) {
    return this.stocks[0][emaProperty.concat(period)];
  }
}

export default MovingAverageConvergenceDivergence;
