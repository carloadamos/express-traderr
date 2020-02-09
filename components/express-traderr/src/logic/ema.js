/** * For now, I will only support 12 and 26 EMA.
 * 10, 20, 50, 100 MA
 */
class ExponentialMovingAverage {
  constructor() {
    this.multiplier = 0;
    this.period = 0;
    this.stocks = [];
  }

  /**
   * Compute for the EMA.
   * @param {Array} stocks Stock list.
   */
  /* eslint-disable no-param-reassign */
  compute(stocks, period) {
    this.stocks = stocks;
    this.period = period;
    let i = 0;
    const property = 'EMA'.concat(this.period);
    // length is the actual size. if 21 item, length is 21
    return this.stocks.map(() => {
      if (i >= this.period - 1) {
        const prevEMA = this.previousEMA(i) || this.previousSMA(i);
        const closingPrice = this.getClosingPrice(i);
        const currentEMA = this.computeCurrentEMA(closingPrice, prevEMA);

        stocks[i] = { ...stocks[i], [property]: currentEMA };
      }
      i += 1;

      return stocks[i - 1];
    });
  }

  /**
   * Compute for the current EMA.
   * @param {number} closingPrice Current closing price.
   * @param {number} prevEMA Previous EMA
   */
  computeCurrentEMA(closingPrice, prevEMA) {
    return parseFloat(((closingPrice - prevEMA) * this.multiplier + prevEMA).toFixed(4));
  }

  /**
   * Returns the current closing price.
   * @param {number} currentIndex Current index of stock.
   */
  getClosingPrice(currentIndex) {
    return this.stocks[currentIndex].closingPrice;
  }

  /**
   * Also known as smoothing.
   */
  computeMultiplier() {
    const multiplier = 2 / (this.period + 1);
    this.multiplier = parseFloat(multiplier.toFixed(4));
  }

  /**
   * Previous EMA.
   * Only supports 12 and 26 EMA.
   * Future enhancement will make this flexible.
   * @param {number} currentIndex Current stock index
   */
  previousEMA(currentIndex) {
    if (currentIndex - 1 === -1) return 0;

    return this.period === 12
      ? this.stocks[currentIndex - 1].EMA12
      : this.stocks[currentIndex - 1].EMA26;
  }

  /**
   * Previous day price.
   * @param {currentIndex} currentIndex Current stock index.
   */
  previousPrice(currentIndex) {
    if (currentIndex - 1 === -1) return 0;
    return this.stocks[currentIndex - 1].closingPrice;
  }

  previousSMA(currentIndex) {
    if (currentIndex - 1 === -1) return 0;

    return this.period === 12
      ? this.stocks[currentIndex - 1].MA12
      : this.stocks[currentIndex - 1].MA26;
  }
}

export default ExponentialMovingAverage;
