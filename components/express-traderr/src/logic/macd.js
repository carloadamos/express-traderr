import SimpleMovingAverage from './sma.js';

class MovingAverageConvergenceDivergence {
  constructor() {
    this.stocks = [];
  }

  /**
   * Compute for stock's MACD.
   * MACD Line
   * Signal Line
   * @param {Array} stocks Stock list.
   */
  /* eslint-disable no-param-reassign */
  compute(stocks) {
    const property = 'MACD';
    this.stocks = stocks;

    const stockList = this.stocks.map(stock => {
      const ema12 = stock.EMA12;
      const ema26 = stock.EMA26;
      let macd = 0;

      if (stocks.indexOf(stock) >= 26) {
        macd = ema12 - ema26;
      }

      stock = { ...stock, [property]: macd };

      return stock;
    });

    const stockListWithMACD = this._addMACDSMAtoStockList(stockList);

    return stockListWithMACD;
  }

  /* eslint-disable class-methods-use-this */
  _addMACDSMAtoStockList(originalStocks) {
    const sma = new SimpleMovingAverage();
    const period = 9;
    const property = 'MACD';

    return sma.compute(originalStocks, period, property, 'MACD_SMA9');
  }
}

export default MovingAverageConvergenceDivergence;
