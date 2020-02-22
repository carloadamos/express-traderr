/**
 * Compute for the moving average.
 * @param {Array} stocks Stock list
 * @param {number} period Period of days.
 * @param {string} baseProperty Basis of computation.
 * @param {string} newProp New property to write to the list.
 * Will be appended with the period. e.g 'SMA' + 20 = 'SMA20'
 * @returns {Array} Stock list with SMA.
 */
export default class SimpleMovingAverage {
  constructor(stockList, period, baseProperty, newProperty) {
    this.baseProperty = baseProperty;
    this.newProperty = newProperty;
    this.period = period;
    this.stockList = stockList;
  }

  /**
   * Compute simple moving average and write new property.
   * @param {Array} stocks Stock list
   * @returns {Array} Stock list with SMA.
   */
  /* eslint-disable no-param-reassign */
  compute() {
    const { newProperty, period, stockList } = this;

    return stockList.map(stock => {
      let total = 0;
      const currentIndex = stockList.indexOf(stock);

      if (currentIndex >= period - 1) {
        total = this._getTotal(stock);
        total = Math.round((total / period) * 100) / 100;
      }

      stock = {
        ...stock,
        [newProperty.concat(period)]: total,
      };

      return stock;
    });
  }

  /**
   * Get total of `baseProperty` from current stock to desired `period` back.
   * @param {number} stock Current stock in list.
   */
  /* eslint-disable class-methods-use-this */
  _getTotal(stock) {
    const { stockList, period, baseProperty } = this;
    let total = 0;
    const currentIndex = stockList.indexOf(stock);

    if (!Object.prototype.hasOwnProperty.call(stock, [this.baseProperty]))
      throw new Error(`${baseProperty.concat(period)} property do not exist!`);

    /* Increase number of decrement to current index to compute total */
    for (let i = 0; i < period; i += 1) {
      total += stockList[currentIndex - i][baseProperty];
    }

    return total;
  }
}
