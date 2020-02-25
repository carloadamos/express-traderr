/**
 * Compute for the moving average.
 * @param {Array} stocks Stock list
 * @param {number} period Period of days.
 * @param {string} baseProperty Basis of computation.
 * @param {string} newProp New property to write to the list.
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
        total = parseFloat((((total / period) * 100) / 100).toFixed(4));
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

  /**
   * Identify if the trend is uptrend or downtrend.
   * @param {Array} stockList Stock list.
   * @param {number} slowTrend Slow trend.
   * @param {number} fastTrend Fast trend.
   * @returns {Array}
   */
  static identifyTrend(stockList, slowTrend, fastTrend) {
    return stockList.map(stock => {
      let trend = '';

      if (stock['SMA'.concat(fastTrend)] > stock['SMA'.concat(slowTrend)]) {
        trend = 'uptrend';
      } else if (stock['SMA'.concat(fastTrend)] < stock['SMA'.concat(slowTrend)]) {
        trend = 'downtrend';
      } else {
        trend = 'notrend';
      }

      return { ...stock, trend };
    });
  }
}
