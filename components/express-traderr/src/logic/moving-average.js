/**
 * Get total price from current stock to desired days back.
 * @param {number} currentIndex Current index of the stock in list.
 * @param {Object} stocks Stock object
 * @param {number} average Divisor
 */
function _getTotalPriceInDays(currentIndex, stocks, average) {
  let totalPrice = 0;

  for (let i = 0; i < average; i += 1) {
    if (currentIndex - i === -1) break;

    totalPrice += stocks[currentIndex - i].closingPrice;
  }

  return totalPrice;
}

class MovingAverage {
  /**
   * Compute for the moving average.
   * @param {Array} stocks Stock list
   * @param {Number} average Divisor
   */
  static compute(stocks, average) {
    let i = 0;

    stocks.forEach(() => {
      let totalPriceInDays = 0;

      totalPriceInDays = _getTotalPriceInDays(i, stocks, average);
      console.log(
        `${stocks[i].code} ${stocks[i].closingPrice} MA ${average}: ${Math.round(
          (totalPriceInDays / average) * 100,
        ) / 100}`,
      );

      i += 1;
    });

    // return Math.round((totalPrice / average) * 100) / 100;
  }
}

export default MovingAverage;
