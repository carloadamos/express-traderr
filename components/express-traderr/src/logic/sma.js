/**
 * Compute for the moving average.
 * @param {Array} stocks Stock list
 * @param {number} period Period of days.
 * @param {string} propertyToCompute Basis of computation.
 * @param {string} newProp New property to write to the list.
 * Will be appended with the period. e.g 'SMA' + 20 = 'SMA20'
 * @returns {Array} Stock list with SMA.
 */
class SimpleMovingAverage {
  constructor(stocks, period, basis, newProp) {
    this.newProperty = newProp;
    this.period = period;
    this.propertyToCompute = basis;
    this.stocks = stocks;
  }

  /**
   * Compute for the moving average.
   * @param {Array} stocks Stock list
   * @param {number} period Period of days.
   * @param {string} propertyToCompute Basis of computation.
   * @returns {Array} Stock list with SMA.
   */
  /* eslint-disable no-param-reassign */
  compute() {
    let i = 0;

    return this.stocks.map(stock => {
      let totalPriceInSpanOfDays = 0;

      if (i >= this.period - 1) {
        totalPriceInSpanOfDays = this._getTotalPriceInSpanOfDays(stock);
        totalPriceInSpanOfDays = Math.round((totalPriceInSpanOfDays / this.period) * 100) / 100;
      }

      stock = {
        ...stock,
        [this.newProperty.concat(this.period)]: totalPriceInSpanOfDays,
      };
      i += 1;

      return stock;
    });
  }

  /**
   * Get total price from current stock to desired days back
   * based on period.
   * @param {number} stock Current stock in list.
   */
  /* eslint-disable class-methods-use-this */
  _getTotalPriceInSpanOfDays(stock) {
    let totalPrice = 0;
    const currentIndex = this.stocks.indexOf(stock);

    for (let i = 0; i < this.period; i += 1) {
      totalPrice += this.stocks[currentIndex - i][this.propertyToCompute];
    }

    return totalPrice;
  }
}

export default SimpleMovingAverage;
