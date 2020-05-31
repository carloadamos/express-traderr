/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
export default class RelativeStrengthIndex {
  constructor(stockList, length, method) {
    this.stockList = stockList;
    this.length = length;
    this.method = method;
  }

  /**
   * Compute for the RSI.
   */
  compute() {
    this.stockList = this.stockList.map(stock => {
      const currentIndex = this.stockList.indexOf(stock);
      let upMove = 0;
      let downMove = 0;

      if (currentIndex !== 0) {
        const currentClose = stock.close;
        const previousClose = this.stockList[currentIndex - 1].close;

        upMove = currentClose - previousClose > 0 ? currentClose - previousClose : 0;
        downMove = currentClose - previousClose < 0 ? Math.abs(currentClose - previousClose) : 0;

        upMove = parseFloat(upMove.toFixed(4));
        downMove = parseFloat(downMove.toFixed(4));
      }

      return (stock = {
        ...stock,
        upMove,
        downMove,
      });
    });

    if (!Object.prototype.hasOwnProperty.call(this.stockList[1], 'avgU'.concat(this.length))) {
      // const sma = new SimpleMovingAverage(this.stockList, this.length, 'upMove', 'avgU');
      this.stockList = this.stockList.map(stock => {
        const currentIndex = this.stockList.indexOf(stock);
        let avgU = 0;
        let avgD = 0;

        if (currentIndex >= this.length) {
          for (let i = this.length; i >= 0; i -= 1) {
            avgU += this.stockList[currentIndex - i].upMove;
            avgD += this.stockList[currentIndex - i].downMove;
          }
          avgU /= this.length;
          avgD /= this.length;
        }

        return {
          ...stock,
          avgU,
          avgD,
        };
      });
    }

    this.stockList = this.stockList.map(stock => {
      const currentIndex = this.stockList.indexOf(stock);
      let rsi = 0;

      if (currentIndex >= this.length) {
        const rs = stock.avgU / stock.avgD;

        rsi = 100 - 100 / (1 + rs);
      }

      return {
        ...stock,
        rsi,
      };
    });

    return this.stockList;
  }
}
