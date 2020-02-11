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

    const stockList = stocks.map(stock => {
      if (stocks.indexOf(stock) >= 26) {
        const ema12 = stock.EMA12;
        const ema26 = stock.EMA26;
        const macd = ema12 - ema26;

        stock = { ...stock, [property]: macd };
      }
      return stock;
    });

    const stockListWithMACD = this._addMACDSMAtoStockList(stockList);
    console.log(stockListWithMACD);

    return stockList;
  }

  _addMACDSMAtoStockList(originalStocks) {
    const period = 9;
    const property = 'SMA'.concat(period);

    return originalStocks.map(stock => {
      if (originalStocks.indexOf(stock) >= period - 1) {
        const totalMACDInDays = this._getTotalMACDInDays(
          originalStocks.indexOf(stock),
          originalStocks,
          period,
        );

        stock = { ...stock, [property]: Math.round((totalMACDInDays / period) * 100) / 100 };
      }
      return stock;
    });
  }

  /* eslint-disable class-methods-use-this */
  _getTotalMACDInDays(currentIndex, stocks, period) {
    let totalPrice = 0;

    for (let i = 0; i < period; i += 1) {
      if (currentIndex < period - 1) break;

      totalPrice += stocks[currentIndex - i].closingPrice;
    }

    return totalPrice;
  }
}

export default MovingAverageConvergenceDivergence;
