class ExponentialMovingAverage {
  /**
   * Compute for the EMA.
   * @param {Array} stocks Stock list.
   */
  /* eslint-disable class-methods-use-this */
  compute(stocks, period) {
    for (let i = 0; i < stocks.length; i += 1) {
      if (i >= period) {
        console.log(i, stocks[i]);

        // const { closingPrice } = stocks[i];
        // const smoothing = this.multiplier(12);
        // const previousClosingPrice = this.previousPrice(i, stocks);
      }
    }
  }

  /**
   * Also known as smoothing.
   * @param {number} period Period to be calculated. e.g. 12, 26
   */
  /* eslint-disable class-methods-use-this */
  multiplier(period) {
    const multiplier = 2 / (period + 1);
    return Math.round(multiplier * 100) / 100;
  }

  /* eslint-disable class-methods-use-this */
  previousPrice(currentIndex, stocks) {
    if (currentIndex - 1 === -1) return 0;

    return stocks[currentIndex - 1].closingPrice;
  }
}

export default ExponentialMovingAverage;
