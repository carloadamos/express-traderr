import SimpleMovingAverage from './sma.js';
import ExponentialMovingAverage from './ema.js';
import MovingAverageConvergenceDivergence from './macd.js';
import Strategy from './strategy.js';

const SIGNALS = Object.freeze({
  UPTREND: 'uptrend',
  PRICE_ABOVE_EMA: 'price-above-ema',
  PRICE_ABOVE_SMA: 'price-above-sma',
  MACD_CROSSOVER: 'macd-crossover',
  MACD_ABOVE_SIGNAL: 'macd-above-signal',

  DOWNTREND: 'downtrend',
  PRICE_BELOW_EMA: 'price-below-ema',
  PRICE_BELOW_SMA: 'price-below-sma',
  MACD_CROSSUNDER: 'macd-crossunder',
  MACD_BELOW_SIGNAL: 'macd-below-signal',
});

export default class BackTest {
  /**
   * You know what constructor is. Just feed me with parameters that it need.
   * @param {Array} stockList List of stocks to perform backtest on.
   * @param {String} strategy Long or short. Default to `long`.
   * @param {Array} signals Signals to look for when entering a position.
   * @param {number} fund Amount of money to invest.
   * @param {Array} dateRange Range of date for sampling..
   */
  constructor(stockList, strategy, signals, fund, dateRange) {
    this.dateRange = dateRange;
    this.fund = fund;
    this.stockList = stockList;
    this.strategy = strategy;
    this.signals = signals;
    this.history = [];
    this._initialize();
  }

  /**
   * Prepares for the backtesting.
   * This method will prepare the indicators.
   * Performs all the computations before the actual logic.
   */
  _initialize() {
    const signals = [...this.signals.buy, ...this.signals.sell];
    this.stockList = this.dateRange ? this.filterDates() : this.stockList;

    signals.forEach(signal => {
      switch (signal.code) {
        case SIGNALS.UPTREND:
        case SIGNALS.DOWNTREND:
        case SIGNALS.PRICE_ABOVE_SMA:
        case SIGNALS.PRICE_BELOW_SMA: {
          const { periods, source, newProperty } = signal;

          this._initSignalsWithSMA(periods, source, newProperty);
          break;
        }
        case SIGNALS.PRICE_ABOVE_EMA:
        case SIGNALS.PRICE_BELOW_EMA: {
          const { periods, source, newProperty, smaSource } = signal;

          this._initSignalsWithEMA(periods, source, newProperty, smaSource);
          break;
        }
        case SIGNALS.MACD_CROSSOVER:
        case SIGNALS.MACD_CROSSUNDER:
        case SIGNALS.MACD_ABOVE_SIGNAL:
        case SIGNALS.MACD_BELOW_SIGNAL: {
          const { fastLength, slowLength, source, signalLength } = signal;

          this._initSignalsWithMACD(fastLength, slowLength, source, signalLength);
          break;
        }
        default: {
          console.error(`SIGNAL [${signal.code}] is not implemented.`);
        }
      }
    });
  }

  _initSignalsWithMACD(fastLength, slowLength, source, signalLength) {
    const macd = new MovingAverageConvergenceDivergence(
      this.stockList,
      fastLength,
      slowLength,
      source,
      signalLength,
    );

    this.stockList = macd.compute();
  }

  _initSignalsWithEMA(periods, source, newProperty, smaSource) {
    const ema = new ExponentialMovingAverage(
      this.stockList,
      periods[0],
      source,
      newProperty,
      smaSource,
    );

    this.stockList = ema.compute();
  }

  _initSignalsWithSMA(periods, source, newProperty) {
    periods.forEach(period => {
      const sma = new SimpleMovingAverage(this.stockList, period, source, newProperty);
      this.stockList = sma.compute();
    });

    if (periods.length >= 2) {
      /* Always put the slow at the start of the list */
      this.stockList = SimpleMovingAverage.identifyTrend(this.stockList, periods[0], periods[1]);
    }
  }

  /**
   * Start backtest process.
   * signal: macd-crossover, uptrend
   */
  start() {
    let unIdentifiedBuySignalEncountered = false;
    let unIdentifiedSellSignalEncountered = false;

    this.stockList.forEach(stock => {
      const buySignal = this.signals.buy ? this.signals.buy : [];
      const sellSignal = this.signals.sell ? this.signals.sell : [];
      const buyPerfectScore = buySignal ? buySignal.length : 0;
      const sellPerfectScore = sellSignal ? sellSignal.length : 0;
      let buyScore = 0;
      let sellScore = 0;

      if (this.availableAction() === 'Nothing' || this.availableAction() === 'BUY') {
        buySignal.forEach(signal => {
          const currentIndex = this.stockList.indexOf(stock);

          if (!unIdentifiedBuySignalEncountered) {
            switch (signal.code) {
              case SIGNALS.MACD_CROSSOVER: {
                buyScore = this.macdCrossOver(currentIndex, stock, signal, buyScore);

                break;
              }
              case SIGNALS.MACD_ABOVE_SIGNAL: {
                buyScore = this.macdAboveSignal(currentIndex, stock, signal, buyScore);

                break;
              }
              case SIGNALS.UPTREND: {
                buyScore = this.upTrend(currentIndex, stock, signal, buyScore);
                break;
              }
              case SIGNALS.PRICE_ABOVE_EMA: {
                buyScore = ExponentialMovingAverage.priceAbove(stock, signal.periods[0], 'close')
                  ? (buyScore += 1)
                  : buyScore;
                break;
              }
              case SIGNALS.PRICE_ABOVE_SMA: {
                buyScore = SimpleMovingAverage.priceAbove(stock, signal.periods[0], 'close')
                  ? (buyScore += 1)
                  : buyScore;
                break;
              }
              default: {
                console.error(`BUY SIGNAL: [${signal.code}] is not implemented!`);
                unIdentifiedBuySignalEncountered = true;
              }
            }
          }
        });

        if (buySignal.length !== 0 && buyScore === buyPerfectScore) {
          this.history = [...this.history, Strategy.buy(stock, 'long', this.fund)];
        }
      }

      if (this.availableAction() === 'SELL') {
        sellSignal.forEach(signal => {
          const currentIndex = this.stockList.indexOf(stock);

          /* istanbul ignore else */
          if (!unIdentifiedSellSignalEncountered) {
            switch (signal.code) {
              case SIGNALS.MACD_CROSSUNDER: {
                /* istanbul ignore else */
                sellScore = this.crossUnder(currentIndex, stock, signal, sellScore);
                break;
              }
              case SIGNALS.MACD_BELOW_SIGNAL: {
                sellScore = this.macdBelowSignal(stock, currentIndex, signal, sellScore);

                break;
              }
              case SIGNALS.DOWNTREND: {
                sellScore = this.downTrend(stock, currentIndex, signal, sellScore);

                break;
              }
              case SIGNALS.PRICE_BELOW_EMA: {
                sellScore = ExponentialMovingAverage.priceBelow(stock, signal.periods[0], 'close')
                  ? (sellScore += 1)
                  : sellScore;
                break;
              }
              case SIGNALS.PRICE_BELOW_SMA: {
                sellScore = SimpleMovingAverage.priceBelow(stock, signal.periods[0], 'close')
                  ? (sellScore += 1)
                  : sellScore;
                break;
              }
              default: {
                console.error(`SELL SIGNAL: [${signal.code}] is not implemented!`);
                unIdentifiedSellSignalEncountered = true;
              }
            }
          }
        });

        /**
         * Temporary code for checking the P/L
         * TODO: create a transastion list for this.
         */
        if (sellSignal.length !== 0 && sellScore === sellPerfectScore) {
          const boughtStock = this.history[this.history.length - 1].stock;
          const boughtShares = this.history[this.history.length - 1].numberOfShares;
          const soldStock = stock;

          const oneDay = 24 * 60 * 60 * 1000;
          const firstDate = stock.tradeDate;
          const secondDate = 
            this.history[this.history.length - 1].stock.tradeDate;
          const difference = Math.round(Math.abs((firstDate - secondDate) / oneDay));
          const boughtPrice = boughtStock.close;
          const soldPrice = soldStock.close;

          const totalBought = boughtPrice * boughtShares;
          const totalSold = soldPrice * boughtShares;
          const percentIncrease = ((totalSold - totalBought) / totalBought) * 100;

          this.history = [...this.history, Strategy.sell(stock, 'long', boughtShares)];
          console.log(
            `P/L: ${parseFloat(
              stock.close - this.history[this.history.length - 2].stock.close,
            ).toFixed(4)} Holding Days: ${difference}`,
          );
          console.log(
            `Total bought price: ${totalBought}  Total sold price: ${totalSold}   Percentage: ${percentIncrease}`,
          );
        }
      }
    });

    return this.history;
  }

  macdBelowSignal(stock, currentIndex, signal, sellScore) {
    const { stockList } = this;
    const currentStock = stock;
    let score = sellScore;
    /* istanbul ignore else */
    if (currentIndex >= signal.duration) {
      score = MovingAverageConvergenceDivergence.belowSignal(
        stockList,
        currentStock,
        signal.signalLength,
        signal.duration,
      )
        ? (score += 1)
        : score;
    }
    return score;
  }

  crossUnder(currentIndex, stock, signal, sellScore) {
    let score = sellScore;

    if (currentIndex !== 0) {
      const previousStock = this.stockList[currentIndex - 1];
      const currentStock = stock;

      score = MovingAverageConvergenceDivergence.crossUnder(
        previousStock,
        currentStock,
        signal.signalLength,
      )
        ? (score += 1)
        : score;
    }
    return score;
  }

  macdAboveSignal(currentIndex, stock, signal, buyScore) {
    const { stockList } = this;
    const currentStock = stock;
    let score = buyScore;

    /* istanbul ignore else */
    if (currentIndex >= signal.duration) {
      score = MovingAverageConvergenceDivergence.aboveSignal(
        stockList,
        currentStock,
        signal.signalLength,
        signal.duration,
      )
        ? (score += 1)
        : score;
    }
    return score;
  }

  macdCrossOver(currentIndex, stock, signal, buyScore) {
    let score = buyScore;

    if (currentIndex !== 0) {
      const previousStock = this.stockList[currentIndex - 1];
      const currentStock = stock;
      score = MovingAverageConvergenceDivergence.crossOver(
        previousStock,
        currentStock,
        signal.signalLength,
      )
        ? (score += 1)
        : score;
    }
    return score;
  }

  /* eslint-disable class-methods-use-this */
  upTrend(currentIndex, stock, signal, buyScore) {
    const { duration } = signal;
    let qualified = true;
    let score = buyScore;

    if (duration) {
      if (currentIndex - 1 >= duration) {
        for (let i = duration; i >= 0; i -= 1) {
          if (!SimpleMovingAverage.upTrend(stock)) {
            qualified = false;
            break;
          }
        }
      } else {
        qualified = false;
      }
    } else {
      qualified = SimpleMovingAverage.upTrend(stock);
    }

    score = qualified ? (score += 1) : score;

    return score;
  }

  /* eslint-disable class-methods-use-this */
  downTrend(currentIndex, stock, signal, sellScore) {
    const { duration } = signal;
    let qualified = true;
    let score = sellScore;

    if (duration) {
      if (currentIndex - 1 >= duration) {
        for (let i = duration; i >= 0; i -= 1) {
          if (!SimpleMovingAverage.downTrend(stock)) {
            qualified = false;
            break;
          }
        }
      } else {
        qualified = false;
      }
    } else {
      qualified = SimpleMovingAverage.downTrend(stock);
    }

    score = qualified ? (score += 1) : score;

    return score;
  }

  availableAction() {
    if (this.history.length === 0) return 'Nothing';

    return this.history[this.history.length - 1].action === 'BUY' ? 'SELL' : 'BUY';
  }

  filterDates() {
    if (this.dateRange.length === 2) {
      const startDate = this.dateRange[0];
      const endDate = this.dateRange[1];

      return this.stockList.filter(
        stock =>
          stock.tradeDate >= startDate &&
          stock.tradeDate <= endDate,
      );
    }

    return this.stockList;
  }
}