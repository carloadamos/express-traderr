import SimpleMovingAverage from './sma.js';

/** * For now, I will only support 12 and 26 EMA.
 * 10, 20, 50, 100 MA
 * @param {Array} stockList Stock list.
 * @param {number} period Period of days.
 * @param {string} baseProperty Property to compute.
 * @param {string} newProperty New property to add.
 */
export default class ExponentialMovingAverage {
  constructor(stockList, period, baseProperty, newProperty, smaBasis) {
    this.baseProperty = baseProperty;
    this.newProperty = newProperty;
    this.period = period;
    this.smaBasis = smaBasis;
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
    const { stockList, period, baseProperty, newProperty } = this;
    let currentEMA = 0;

    return stockList.map(stock => {
      let previousEMA = 0;
      const currentIndex = stockList.indexOf(stock);

      if (currentIndex === this.period - 1) {
        currentEMA = stockList[period - 1][baseProperty.concat(period)];
      }

      /* Skip one element since we assigned the value already */
      if (currentIndex > this.period - 1) {
        previousEMA = stockList[currentIndex - 1][newProperty.concat(period)];

        currentEMA = this.computeCurrentEMA(stock[this.smaBasis], previousEMA);
      }

      stock = { ...stock, [newProperty.concat(period)]: currentEMA };
      /* Overwrite stock */
      stockList[currentIndex] = stock;

      return stock;
    });
  }

  /**
   * Compute for the current EMA.
   * @param {number} closingPrice Current closing price.
   * @param {number} previousEMA Previous EMA
   */
  computeCurrentEMA(closingPrice, previousEMA) {
    const currentEMA = (closingPrice - previousEMA) * this.smoothing + previousEMA;
    return parseFloat(currentEMA.toFixed(4));
  }

  /**
   * Also known as smoothing.
   */
  _computeMultiplier() {
    const multiplier = 2 / (this.period + 1);
    return parseFloat(multiplier.toFixed(4));
  }

  /**
   * Call the SMA to generate amounts.
   * This should happen at the start of computing
   * EMA and should not happen in the middle or end of the list.
   */
  _generateSMA() {
    const { stockList, period, smaBasis } = this;
    if (!Object.prototype.hasOwnProperty.call(stockList[0], [smaBasis]))
      throw new Error(`Property ${smaBasis} do not exist!`);

    const sma = new SimpleMovingAverage(stockList, period, smaBasis, 'SMA');
    // Overwrite the `stockList` with the SMA property
    this.stockList = sma.compute();
  }
}
