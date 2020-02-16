import SimpleMovingAverage from './sma.js';

const emaProperty = 'EMA';
const smaProperty = 'SMA';

/** * For now, I will only support 12 and 26 EMA.
 * 10, 20, 50, 100 MA
 * @param {Array} stocks Stock list.
 * @param {number} period Period of days.
 */
class ExponentialMovingAverage {
  constructor(stocks, period, propertyToCompute) {
    this.hasInitialEma = false;
    this.period = period;
    this.propertyToCompute = propertyToCompute;
    this.smoothing = 0;
    this.stocks = stocks;

    this.computeMultiplier();
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
    const property = 'EMA'.concat(this.period);
    let currentEMA = 0;

    if (!this.hasPreviousSMA()) {
      this.generateSMA();
    }

    return this.stocks.map(stock => {
      const currentIndex = this.stocks.indexOf(stock);

      if (currentIndex >= this.period) {
        const ema = this.stocks[currentIndex - 1][property];
        const prevEMA = ema || this.previousSMA(stock);
        const { closingPrice } = stock;

        currentEMA = this.computeCurrentEMA(closingPrice, prevEMA);
        this.hasInitialEma = true;
      }

      stock = { ...stock, [property]: currentEMA };
      this.stocks[currentIndex] = stock;

      return stock;
    });
  }

  /**
   * Compute for the current EMA.
   * @param {number} closingPrice Current closing price.
   * @param {number} prevEMA Previous EMA
   */
  computeCurrentEMA(closingPrice, prevEMA) {
    return parseFloat(((closingPrice - prevEMA) * this.smoothing + prevEMA).toFixed(4));
  }

  /**
   * Also known as smoothing.
   */
  computeMultiplier() {
    const multiplier = 2 / (this.period + 1);
    this.smoothing = parseFloat(multiplier.toFixed(4));
  }

  /**
   * Call the SMA to generate amounts.
   * This should happen at the start of computing
   * EMA and should not happen in the middle or end of the list.
   */
  generateSMA() {
    const sma = new SimpleMovingAverage(this.stocks, this.period, this.propertyToCompute, 'SMA');
    this.stocks = sma.compute();
  }

  /**
   * Check if list has SMA values.
   * @returns {boolean}
   */
  hasPreviousSMA() {
    const smaAmount = this.stocks[0][smaProperty.concat(this.period)];

    return !!smaAmount;
  }

  /**
   * Previous EMA.
   * Only supports 12 and 26 EMA.
   * Future enhancement will make this flexible.
   * @param {Object} stock Current stock.
   */
  previousSMA(stock) {
    if (!this.hasInitialEma) {
      const currentIndex = this.stocks.indexOf(stock);
      const currentEma = this.stocks[currentIndex - 1][smaProperty.concat(this.period)];

      stock = { ...stock, [emaProperty.concat(this.period)]: currentEma };
      this.stocks[currentIndex - 1] = stock;

      return currentEma;
    }

    return 0;
  }

  /**
   * Previous day price.
   * @param {currentIndex} currentIndex Current stock index.
   */
  previousPrice(currentIndex) {
    if (currentIndex - 1 === -1) return 0;
    return this.stocks[currentIndex - 1].closingPrice;
  }
}

export default ExponentialMovingAverage;
