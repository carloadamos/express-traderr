import SimpleMovingAverage from './sma.js';

/** * For now, I will only support 12 and 26 EMA.
 * 10, 20, 50, 100 MA
 * @param {Array} stockList Stock list.
 * @param {number} period Period of days.
 * @param {string} baseProperty Property to compute.
 * @param {string} newProperty New property to add.
 * @param {string} smaSource Source of SMA.
 */
export default class ExponentialMovingAverage {
  constructor(stockList, length, source, newProperty, smaSource) {
    this.source = source;
    this.newProperty = newProperty;
    this.length = length;
    this.smaSource = smaSource;
    this.smoothing = this._computeMultiplier();
    this.stockList = stockList;
    this._generateSMA();
  }

  /**
   * Compute for the EMA.
   * Computation for EMA:
   ** `previousEMA` = SMA (only used at the start)
   ** `smoothing` = 2 (period + 1)
   ** `previousEMA` = (`closingPrice` - `previousEMA`) * `smoothing` + `previousEMA`
   ** `currentEMA` = (`closingPrice` - `previousEMA`) * `smoothing` + `previousEMA`
   */
  /* eslint-disable no-param-reassign */
  compute() {
    const { stockList, length: period, source: baseProperty, newProperty } = this;
    let currentEMA = 0;

    return stockList.map(stock => {
      let previousEMA = 0;
      const currentIndex = stockList.indexOf(stock);

      if (currentIndex === this.length - 1) {
        currentEMA = stockList[period - 1][baseProperty.concat(period)];
      }

      /* Skip one element since we assigned the value already */
      if (currentIndex > this.length - 1) {
        previousEMA = stockList[currentIndex - 1][newProperty.concat(period)];

        currentEMA = this._computeCurrentEMA(stock[this.smaSource], previousEMA);
      }

      stock = { ...stock, [newProperty.concat(period)]: currentEMA };
      stockList[currentIndex] = stock; /* Overwrite stock */

      return stock;
    });
  }

  /**
   * Identify if stock's closing price is above SMA.
   * @param {Object} stock Stock.
   * @param {number} period Period for SMA.
   * @returns {boolean}
   */
  static priceAbove(stock, period, source) {
    return stock[source] > stock['EMA'.concat(period)];
  }

  /**
   * Compute for the current EMA.
   * @param {number} closingPrice Current closing price.
   * @param {number} previousEMA Previous EMA
   */
  _computeCurrentEMA(closingPrice, previousEMA) {
    const currentEMA = (closingPrice - previousEMA) * this.smoothing + previousEMA;

    return parseFloat(currentEMA.toFixed(4));
  }

  /**
   * Compute for multiplier.
   * Also known as `smoothing`
   */
  _computeMultiplier() {
    const multiplier = 2 / (this.length + 1);

    return parseFloat(multiplier.toFixed(4));
  }

  /**
   * Call the SMA to generate amounts.
   * This should happen at the start of computing
   * EMA and should not happen in the middle or end of the list.
   */
  _generateSMA() {
    const { stockList, length: period, smaSource: smaBasis } = this;
    if (!Object.prototype.hasOwnProperty.call(stockList[0], [smaBasis]))
      throw new Error(`Property ${smaBasis} do not exist!`);

    const sma = new SimpleMovingAverage(stockList, period, smaBasis, 'SMA');
    // Overwrite the `stockList` with the SMA property
    // Newly created list will have SMA>
    this.stockList = sma.compute();
  }
}
