/**
 * Compute for the moving average.
 * @param {Array} stockList Stock list
 * @param {number} length Period of days.
 * @param {string} source Basis of computation.
 * @param {string} newProperty New property to write to the list.
 * @returns {Array} Stock list with SMA.
 */
export default class SimpleMovingAverage {
  constructor(stockList, length, source, newProperty) {
    this.source = source;
    this.newProperty = newProperty;
    this.length = length;
    this.stockList = stockList;
  }

  /**
   * Compute simple moving average and write new property.
   * @returns {Array} Stock list with SMA.
   */
  /* eslint-disable no-param-reassign */
  compute() {
    const { newProperty, length, stockList } = this;

    if (Object.prototype.hasOwnProperty.call(stockList[0], [newProperty.concat(length)]))
      return stockList;

    return stockList.map(stock => {
      let total = 0;
      const currentIndex = stockList.indexOf(stock);

      if (currentIndex >= length - 1) {
        total = this._getTotal(stock);
        total = parseFloat((((total / length) * 100) / 100).toFixed(4));
      }

      stock = {
        ...stock,
        [newProperty.concat(length)]: total,
      };

      return stock;
    });
  }

  /**
   * Identify if the trend is uptrend or downtrend.
   * @param {Array} stockList Stock list.
   * @param {number} slowTrend Slow trend.
   * @param {number} fastTrend Fast trend.
   * @returns {Array} Stock array with trend property.
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

  /**
   * Identify if stock's closing price is above SMA.
   * @param {Object} stock Stock.
   * @param {number} period Period for SMA.
   * @returns {boolean}
   */
  static priceAbove(stock, period, source) {
    return stock[source] > stock['SMA'.concat(period)];
  }

  /**
   * Identify if trend is uptrend.
   * @param {Object} stock Stock.
   * @returns {boolean}
   */
  static upTrend(stock) {
    return stock.trend === 'uptrend';
  }

  /**
   * Get total of `baseProperty` from current stock to desired `period` back.
   * @param {number} stock Current stock in list.
   * @returns {number} Total amount.
   */
  /* eslint-disable class-methods-use-this */
  _getTotal(stock) {
    const { stockList, length, source } = this;
    let total = 0;
    const currentIndex = stockList.indexOf(stock);

    if (!Object.prototype.hasOwnProperty.call(stock, [this.source]))
      throw new Error(`${source.concat(length)} property do not exist!`);

    /* Increase number of decrement to current index to compute total */
    for (let i = 0; i < length; i += 1) {
      total += stockList[currentIndex - i][source];
    }

    return total;
  }
}
