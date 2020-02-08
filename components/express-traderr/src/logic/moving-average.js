class MovingAverage {
  /**
   * Compute for the moving average.
   * @param {Array} stocks Stock list
   * @param {Number} average Divisor
   */
  static compute(stocks, average) {
    let totalPrice = 0;

    stocks.forEach(stock => {
      totalPrice += stock.closingPrice;
    });

    return totalPrice / average;
  }
}

export default MovingAverage;
