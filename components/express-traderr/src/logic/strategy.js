/**
 * Strategy, I'm not sure what it should do yet.
 */
/* eslint-disable class-methods-use-this */
export default class Strategy {
  /**
   * Buy a position.
   */
  static buy(stock, strategy) {
    console.info(`Bought stock ${stock.code} at ${stock.close}. Strategy: ${strategy}`);
    return {
      action: 'buy',
      stock,
    };
  }

  /**
   * Sell a position.
   */
  static sell(stock, strategy) {
    console.info(`Sold stock ${stock.code} at ${stock.close}. Strategy ${strategy}`);
    return {
      action: 'sell',
      stock,
    };
  }
}
