class SimpleMovingAverage {
  constructor() {
    this.basis = '';
    this.period = 0;
    this.stocks = [];
  }

  /**
   * Compute for the moving average.
   * @param {Array} stocks Stock list
   * @param {number} period Period of days.
   * @param {string} basis Basis of computation.
   * @returns {Array} Stock list with SMA.
   */
  /* eslint-disable no-param-reassign */
  compute(stocks, period, basis, newProp) {
    this.basis = basis;
    this.stocks = stocks;
    this.period = period;
    let i = 0;

    return this.stocks.map(stock => {
      let totalPriceInDays = 0;

      if (i >= this.period - 1) {
        totalPriceInDays = this._getTotalPriceInSpanOfDays(i);
      }

      stock = { ...stock, [newProp]: Math.round((totalPriceInDays / this.period) * 100) / 100 };
      i += 1;

      return stock;
    });
  }

  /**
   * Get total price from current stock to desired days back.
   * @param {number} currentIndex Current index of the stock in list.
   */
  /* eslint-disable class-methods-use-this */
  _getTotalPriceInSpanOfDays(currentIndex) {
    let totalPrice = 0;

    for (let i = 0; i < this.period; i += 1) {
      totalPrice += this.stocks[currentIndex - i][this.basis];
    }

    return totalPrice;
  }
}

export default SimpleMovingAverage;
