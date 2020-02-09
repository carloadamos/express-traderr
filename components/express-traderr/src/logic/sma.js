/**
 * Get total price from current stock to desired days back.
 * @param {number} currentIndex Current index of the stock in list.
 * @param {Object} stocks Stock object
 * @param {number} average Divisor
 */
function _getTotalPriceInDays(currentIndex, stocks, average) {
  let totalPrice = 0;

  for (let i = 0; i < average; i += 1) {
    if (currentIndex < average - 1) break;

    totalPrice += stocks[currentIndex - i].closingPrice;
  }

  return totalPrice;
}

class SimpleMovingAverage {
  /**
   * Compute for the moving average.
   * @param {Array} stocks Stock list
   * @param {number} average Divisor
   * @returns {Array} New stock list with MA.
   */
  /* eslint-disable no-param-reassign */
  static compute(stocks, average) {
    let i = 0;
    const property = 'MA'.concat(average);

    return stocks.map(stock => {
      let totalPriceInDays = 0;

      totalPriceInDays = _getTotalPriceInDays(i, stocks, average);

      stock = { ...stock, [property]: Math.round((totalPriceInDays / average) * 100) / 100 };
      i += 1;

      return stock;
    });
  }
}

export default SimpleMovingAverage;
