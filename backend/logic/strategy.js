/**
 * Strategy, I'm not sure what it should do yet.
 */
/* eslint-disable class-methods-use-this */
export default class Strategy {
  /**
   * Buy a position.
   * @param {Object} stock Stock.
   * @param {string} strategy Long or short.
   * @param {number} fund Amount of money.
   */
  static buy(stock, strategy, fund) {
    const numberOfShares = Math.floor(fund / stock.close);

    return {
      action: 'BUY',
      stock,
      numberOfShares,
    };
  }

  /**
   * Sell a position.
   * @param {Object} stock Stock.
   * @param {string} strategy Long or short.
   * @param {number} boughtShares Total bought shares.
   */
  static sell(stock, strategy, boughtShares) {

    return {
      action: 'SELL',
      stock,
      boughtShares,
    };
  }
}
