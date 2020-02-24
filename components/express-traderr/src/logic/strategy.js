/**
 * Strategy, I'm not sure what it should do yet.
 */
/* eslint-disable class-methods-use-this */
export default class Strategy {
  /**
   * Buy a position
   */
  buy(stock, strategy) {
    console.log(`Bought stock ${stock.code} at ${stock.close}. Strategy: ${strategy}`);
  }

  /**
   * Sell a position
   */
  sell(stock, strategy) {
    console.log(`Sold stock ${stock.code} at ${stock.close}. Strategy ${strategy}`);
  }
}
