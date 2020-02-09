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
  static compute(stocks) {
    const property = 'MACD';

    const newStocks = stocks.map(stock => {
      if (stocks.indexOf(stock) >= 26) {
        const ema12 = stock.EMA12;
        const ema26 = stock.EMA26;
        const macd = ema12 - ema26;

        stock = { ...stock, [property]: macd };
      }
      return stock;
    });

    return newStocks;
  }
}

export default MovingAverageConvergenceDivergence;
